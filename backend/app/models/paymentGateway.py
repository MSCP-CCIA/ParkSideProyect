from typing import TYPE_CHECKING, Optional

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.card import Card


class PaymentGateway(SQLModel, table=True):
    token: Optional[int] = Field(default=None, primary_key=True)
    pan: int
    cvc: int
    exp_month: int
    exp_year: int
    card_owner_name: str

    cards: "Card" = Relationship(back_populates="payment_gateway")
