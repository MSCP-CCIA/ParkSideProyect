# app/tests/test_payments.py
from fastapi.testclient import TestClient
from app.main import app

def test_pay_redirect(monkeypatch):
    monkeypatch.setattr(
        "app.services.mercadopago.create_preference",
        lambda order: "https://sandbox.mercadopago.com/fake-url"
    )
    client = TestClient(app)
    r = client.post("/api/v1/payments/pay/999", allow_redirects=False)
    assert r.status_code == 303
    assert r.headers["location"].startswith("https://sandbox.mercadopago.com")
