from typing import TYPE_CHECKING, Optional, List
from sqlalchemy import BigInteger, Column

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.card import Card


class PaymentGateway(SQLModel, table=True):
    token: Optional[str] = Field(default=None, primary_key=True)
    pan: int = Field(sa_column=Column(BigInteger, unique=True))
    cvc: int
    exp_month: int
    exp_year: int
    card_owner_name: str

    # «Una pasarela tiene muchas tarjetas»
    cards: Optional["Card"] = Relationship(back_populates="paymentGateway")

