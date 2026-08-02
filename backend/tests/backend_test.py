"""Backend API tests for TRU SYDS LLC."""
import os
import uuid
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://stage-vision-3d.preview.emergentagent.com").rstrip("/")
# Fallback: read from frontend .env
if "BACKEND_URL" not in os.environ:
    try:
        with open("/app/frontend/.env") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
    except Exception:
        pass

API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Health ---
def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    assert "message" in r.json()


# --- Contact ---
def test_contact_create_and_list(client):
    unique = f"TEST_{uuid.uuid4().hex[:8]}"
    payload = {"name": f"Tester {unique}", "email": f"{unique}@test.com",
               "subject": "Hi", "message": "Hello world"}
    r = client.post(f"{API}/contact", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["success"] is True
    assert "id" in data
    cid = data["id"]

    r2 = client.get(f"{API}/contact")
    assert r2.status_code == 200
    items = r2.json()
    assert any(m["id"] == cid for m in items)
    match = next(m for m in items if m["id"] == cid)
    assert match["email"] == payload["email"]
    assert match["message"] == payload["message"]


# --- Newsletter ---
def test_newsletter_new_and_duplicate(client):
    email = f"TEST_{uuid.uuid4().hex[:8]}@test.com"
    r1 = client.post(f"{API}/newsletter", json={"email": email})
    assert r1.status_code == 200
    d1 = r1.json()
    assert d1["success"] is True
    assert d1["already_subscribed"] is False

    r2 = client.post(f"{API}/newsletter", json={"email": email})
    assert r2.status_code == 200
    d2 = r2.json()
    assert d2["already_subscribed"] is True


# --- Payments ---
def test_checkout_ticket_hotc(client):
    r = client.post(f"{API}/payments/checkout", json={
        "lookup_key": "ticket_hotc", "quantity": 2,
        "origin_url": BASE_URL, "email": "TEST_buyer@test.com"
    })
    assert r.status_code == 200, r.text
    data = r.json()
    assert "checkout_url" in data and data["checkout_url"].startswith("https://")
    assert "session_id" in data
    # Status should be pending
    sid = data["session_id"]
    s = client.get(f"{API}/payments/status/{sid}")
    assert s.status_code == 200
    sd = s.json()
    assert sd["session_id"] == sid
    assert sd["payment_status"] in ("pending", "unpaid")
    assert sd["amount"] == 6000  # $30 x 2 assumption -- validate against setup


def test_checkout_donation_50(client):
    r = client.post(f"{API}/payments/checkout", json={
        "lookup_key": "donate_50", "quantity": 1, "origin_url": BASE_URL
    })
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["checkout_url"].startswith("https://")


def test_checkout_invalid_lookup(client):
    r = client.post(f"{API}/payments/checkout", json={
        "lookup_key": "invalid_key_xyz", "quantity": 1, "origin_url": BASE_URL
    })
    assert r.status_code == 500
