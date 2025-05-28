from datetime import date
from typing import TYPE_CHECKING, Optional, List
from sqlalchemy import Column, Integer, BigInteger

from pydantic import BaseModel
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.customer import Customer
    from app.models.paymentGateway import PaymentGateway


class Card(SQLModel, table=True):
    id: int = Field(sa_column=Column(BigInteger, primary_key=True))
    card_type: str
    last_four_digits: int
    customer_id: int = Field(foreign_key="customer.id")
    token: str = Field(foreign_key="paymentgateway.token")

    customer: "Customer" = Relationship(back_populates="cards")
    paymentGateway: "PaymentGateway" = Relationship(back_populates="cards")


# Register a new card

class CreateCardRequest(BaseModel):
    card_number: int
    full_name_customer: str
    month: int
    year: int
    cvc: int
    card_type: str
    customer_id: int

# Search a customer's card

class SearchCardRequest(BaseModel):
    last_four_digits: int
    customer_id: int

class SearchCardResponse(BaseModel):
    last_four_digits: int
    card_type: str
    full_name_customer: str
    expiration_date: str

# Search all customer's cards

class SearchCardsRequest(BaseModel):
    customer_id: int

class SearchCard(BaseModel):
    last_four_digits: int
    card_type: str

class SearchCardsResponse(BaseModel):
    cards: List[SearchCard]

# Update card

class UpdateCardRequest(BaseModel):
    last_four_digits: int
    full_name_customer: str
    month: int
    year: int
    cvc: int
    customer_id: int

# Delete a customer's card

class DeleteCardRequest(BaseModel):
    last_four_digits: int
    customer_id: int

