from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import select, Session
from typing import List
from datetime import datetime
from cryptography.fernet import Fernet

from app.api.deps import SessionDep, CurrentUser
from app.schemas.card import CardCreate, TransactionCreate, TransactionResponse, CardPublic
from app.schemas.common import Message
from app.models.card import Card
from app.models.customer import Customer
from app.core.config import settings

router = APIRouter(prefix="/cards", tags=["cards"])

fernet = Fernet(settings.SECRET_KEY.encode())

# Helpers
def encrypt_value(value: str) -> str:
    return fernet.encrypt(value.encode()).decode()

def decrypt_value(value: str) -> str:
    return fernet.decrypt(value.encode()).decode()


@router.post("/register", response_model=CardPublic)
def register_card(card_in: CardCreate, session: SessionDep, current_user: CurrentUser):
    """
    Register a new card linked to the current customer.
    """
    db_card = Card(
        card_number_hash=encrypt_value(card_in.card_number),
        full_name_customer=card_in.cardholder_name,
        cvc_code_hash=encrypt_value(card_in.cvv),
        expiration_date=card_in.expiration_date,
        card_type=card_in.card_type,
        customer_id=current_user.id,
    )
    session.add(db_card)
    session.commit()
    session.refresh(db_card)
    return db_card


@router.get("/", response_model=List[CardPublic])
def list_cards(session: SessionDep, current_user: CurrentUser):
    """
    List all cards of the current customer.
    """
    statement = select(Card).where(Card.customer_id == current_user.id)
    cards = session.exec(statement).all()
    return cards
