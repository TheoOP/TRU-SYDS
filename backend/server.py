from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import stripe

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Stripe
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY") or "sk_test_emergent"
STRIPE_WEBHOOK_SECRET = os.environ.get("STRIPE_WEBHOOK_SECRET", "")

app = FastAPI()
api_router = APIRouter(prefix="/api")


def now_iso():
    return datetime.now(timezone.utc).isoformat()


# ---------------- Models ----------------
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = ""
    message: str


class ContactMessage(ContactCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=now_iso)


class NewsletterCreate(BaseModel):
    email: EmailStr


class CheckoutRequest(BaseModel):
    lookup_key: str
    quantity: int = Field(1, ge=1, le=100)
    origin_url: str
    email: Optional[str] = None


# ---------------- Routes: content ----------------
@api_router.get("/")
async def root():
    return {"message": "TRU SYDS LLC API"}


@api_router.post("/contact")
async def create_contact(payload: ContactCreate):
    msg = ContactMessage(**payload.model_dump())
    await db.contact_messages.insert_one(msg.model_dump())
    return {"success": True, "id": msg.id}


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contacts():
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


@api_router.post("/newsletter")
async def subscribe_newsletter(payload: NewsletterCreate):
    existing = await db.newsletter_subscribers.find_one({"email": payload.email})
    if existing:
        return {"success": True, "already_subscribed": True}
    await db.newsletter_subscribers.insert_one({
        "id": str(uuid.uuid4()),
        "email": payload.email,
        "created_at": now_iso(),
    })
    return {"success": True, "already_subscribed": False}


# ---------------- Routes: payments (Stripe Flow A) ----------------
@api_router.post("/payments/checkout")
async def create_checkout(req: CheckoutRequest):
    prices = stripe.Price.list(lookup_keys=[req.lookup_key], active=True, limit=1).data
    if not prices:
        raise HTTPException(500, f"Price not found: {req.lookup_key}")
    price = prices[0]
    kwargs = dict(
        line_items=[{"price": price.id, "quantity": req.quantity}],
        mode="payment",
        success_url=f"{req.origin_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{req.origin_url}/payment/cancel",
        metadata={"lookup_key": req.lookup_key, "email": req.email or ""},
    )
    session = stripe.checkout.Session.create(**kwargs)
    await db.payment_transactions.insert_one({
        "session_id": session.id, "email": req.email, "lookup_key": req.lookup_key,
        "amount": (price.unit_amount or 0) * req.quantity, "currency": price.currency,
        "quantity": req.quantity,
        "status": "initiated", "payment_status": "pending",
        "created_at": now_iso(), "updated_at": now_iso(),
    })
    return {"checkout_url": session.url, "session_id": session.id}


@api_router.get("/payments/status/{session_id}")
async def get_status(session_id: str):
    record = await db.payment_transactions.find_one({"session_id": session_id})
    if not record:
        raise HTTPException(404, "Transaction not found")
    if record.get("payment_status") != "paid":
        try:
            s = stripe.checkout.Session.retrieve(session_id)
            if s.payment_status == "paid" or s.status == "complete":
                await db.payment_transactions.update_one(
                    {"session_id": session_id, "payment_status": {"$ne": "paid"}},
                    {"$set": {"status": "completed", "payment_status": "paid",
                              "stripe_payment_intent_id": s.payment_intent,
                              "updated_at": now_iso()}},
                )
                record = await db.payment_transactions.find_one({"session_id": session_id})
        except stripe.error.StripeError:
            pass
    return {"session_id": record["session_id"], "status": record["status"],
            "payment_status": record["payment_status"], "amount": record.get("amount"),
            "lookup_key": record.get("lookup_key")}


@api_router.post("/stripe/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig = request.headers.get("stripe-signature", "")
    try:
        event = stripe.Webhook.construct_event(payload, sig, STRIPE_WEBHOOK_SECRET)
    except stripe.error.SignatureVerificationError:
        raise HTTPException(400, "Invalid signature")
    obj, t = event["data"]["object"], event["type"]
    if t == "checkout.session.completed":
        await db.payment_transactions.update_one(
            {"session_id": obj["id"], "payment_status": {"$ne": "paid"}},
            {"$set": {"status": "completed", "payment_status": obj.get("payment_status", "paid"),
                      "stripe_payment_intent_id": obj.get("payment_intent"),
                      "updated_at": now_iso()}},
        )
    elif t == "checkout.session.expired":
        await db.payment_transactions.update_one({"session_id": obj["id"]},
            {"$set": {"status": "expired", "payment_status": "expired", "updated_at": now_iso()}})
    return {"status": "ok"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
