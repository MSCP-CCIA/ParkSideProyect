from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Literal
from datetime import datetime

app = FastAPI()

# Base de datos ficticia para pagos
payment_db = []
class Payment(BaseModel):
    parking_id: str
    plate: str
    amount: float
    payment_method: Literal['card', 'bank_transfer']
    transaction_id: str
    timestamp: datetime = datetime.utcnow()

@app.post("/process-payment")
def process_payment(payment: Payment):
    payment_db.append(payment.dict())
    return {"msg": "Payment processed successfully", "transaction_id": payment.transaction_id}

@app.get("/payments/{parking_id}")
def get_payments(parking_id: str):
    payments = [p for p in payment_db if p['parking_id'] == parking_id]
    if not payments:
        raise HTTPException(status_code=404, detail="No payments found for this parking lot")
    return payments

@app.get("/payment/{transaction_id}")
def get_payment(transaction_id: str):
    payment = next((p for p in payment_db if p['transaction_id'] == transaction_id), None)
    if not payment:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return payment