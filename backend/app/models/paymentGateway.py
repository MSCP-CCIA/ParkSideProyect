from typing import TYPE_CHECKING, Optional, List

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.card import Card


class PaymentGateway(SQLModel, table=True):
    __tablename__ = "payment_gateway"

    token: Optional[str] = Field(default=None, primary_key=True)
    pan: int
    cvc: int
    exp_month: int
    exp_year: int
    card_owner_name: str

    # «Una pasarela tiene muchas tarjetas»
    cards: List["Card"] = Relationship(back_populates="payment_gateway")

