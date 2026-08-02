"""Idempotent Stripe catalog setup for TRU SYDS LLC.
Creates ticket + donation products/prices in the claimable sandbox.
Run: python setup_stripe.py
"""
import os
import stripe
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent / ".env")
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY") or "sk_test_emergent"

# Event admission tax code (live events / theatre); donations general.
CATALOG = [
    {
        "emergent_product_id": "ticket_hotc",
        "name": "In the Heart of the Cross - General Admission",
        "prices": [
            {"lookup_key": "ticket_hotc", "amount": 3000, "currency": "usd"},
        ],
    },
    {
        "emergent_product_id": "donation_trusyds",
        "name": "Support TRU SYDS LLC (Donation)",
        "prices": [
            {"lookup_key": "donate_25", "amount": 2500, "currency": "usd"},
            {"lookup_key": "donate_50", "amount": 5000, "currency": "usd"},
            {"lookup_key": "donate_100", "amount": 10000, "currency": "usd"},
            {"lookup_key": "donate_250", "amount": 25000, "currency": "usd"},
        ],
    },
]


def ensure_tax_settings():
    s = stripe.tax.Settings.retrieve()
    if s.head_office and getattr(s.head_office, "address", None):
        return
    stripe.tax.Settings.modify(
        head_office={"address": {"country": "US", "line1": "1196 Deansway Dr",
            "city": "Pataskala", "state": "OH", "postal_code": "43062"}},
        defaults={"tax_behavior": "exclusive"},
    )


def get_or_create_product(entry):
    for p in stripe.Product.list(active=True).auto_paging_iter():
        if p.to_dict().get("metadata", {}).get("emergent_product_id") == entry["emergent_product_id"]:
            return p
    return stripe.Product.create(
        name=entry["name"], tax_code=entry.get("tax_code"),
        metadata={"managed_by": "emergent", "emergent_product_id": entry["emergent_product_id"]},
    )


def main():
    try:
        ensure_tax_settings()
    except Exception as e:
        print("tax settings skipped:", e)
    for entry in CATALOG:
        product = get_or_create_product(entry)
        for p in entry["prices"]:
            existing = stripe.Price.list(lookup_keys=[p["lookup_key"]], active=True, limit=1).data
            if existing and (existing[0].unit_amount != p["amount"] or existing[0].currency != p["currency"]):
                stripe.Price.modify(existing[0].id, active=False)
                existing = []
            if not existing:
                stripe.Price.create(
                    product=product.id, unit_amount=p["amount"], currency=p["currency"],
                    lookup_key=p["lookup_key"], transfer_lookup_key=True,
                )
                print(f"created price {p['lookup_key']}")
            else:
                print(f"price exists {p['lookup_key']}")
    print("Catalog setup complete.")


if __name__ == "__main__":
    main()
