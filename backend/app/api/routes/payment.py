from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from typing import List

from app.api.deps import SessionDep
from app.schemas.payment import PaymentCreate, PaymentUpdate, PaymentPublic
from app import crud

router = APIRouter(prefix="/payments", tags=["payments"])

@router.post("/", response_model=PaymentPublic)
def process_payment(payment_in: PaymentCreate, session: SessionDep):
    return crud.create_payment(session=session, payment_in=payment_in)

@router.get("/parking/{parking_registration_id}", response_model=List[PaymentPublic])
def get_payments_for_parking(parking_registration_id: int, session: SessionDep):
    payments = crud.get_payments_by_parking(session=session, parking_registration_id=parking_registration_id)
    if not payments:
        raise HTTPException(status_code=404, detail="No payments found for this parking lot")
    return payments

@router.get("/{payment_id}", response_model=PaymentPublic)
def get_payment_by_id(payment_id: int, session: SessionDep):
    payment = crud.get_payment_by_id(session=session, payment_id=payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment
