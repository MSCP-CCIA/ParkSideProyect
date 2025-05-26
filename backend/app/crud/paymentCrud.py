from sqlmodel import Session, select
from typing import Optional, List

from app.models.payment import Payment
from app.schemas.payment import PaymentCreate, PaymentUpdate

def create_payment(session: Session, payment_in: PaymentCreate) -> Payment:
    db_payment = Payment.model_validate(payment_in)
    session.add(db_payment)
    session.commit()
    session.refresh(db_payment)
    return db_payment

def get_payment_by_id(session: Session, payment_id: int) -> Optional[Payment]:
    return session.get(Payment, payment_id)

def get_payments_by_parking(session: Session, parking_registration_id: int) -> List[Payment]:
    statement = select(Payment).where(Payment.parking_registration_id == parking_registration_id)
    return session.exec(statement).all()

def update_payment(session: Session, db_payment: Payment, payment_in: PaymentUpdate) -> Payment:
    update_data = payment_in.model_dump(exclude_unset=True)
    db_payment.sqlmodel_update(update_data)
    session.add(db_payment)
    session.commit()
    session.refresh(db_payment)
    return db_payment
