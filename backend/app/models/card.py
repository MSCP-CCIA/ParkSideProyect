from datetime import date
from typing import TYPE_CHECKING, Optional, List

from pydantic import BaseModel
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.customer import Customer
    from app.models.paymentGateway import PaymentGateway


class Card(SQLModel, table=True):
    __tablename__ = "card"

    id: Optional[int] = Field(default=None, primary_key=True)
    card_type: str
    last_four_digits: int
    # foreign keys
    customer_id: int = Field(foreign_key="customer.id")
    token: str = Field(foreign_key="paymentgateway.token")

    # relaciones
    customer: "Customer" = Relationship(back_populates="cards")
    paymentgateway: "PaymentGateway" = Relationship(back_populates="cards")


# Register a new card

class CreateCardRequest1(BaseModel):
    card_number: int
    full_name_customer: str
    month: int
    year: int
    cvc: int
    card_type: str
    customer_id: int

# Update card

class UpdateCardRequest(BaseModel):
    card_number_hash: str
    full_name_customer: str
    month: int
    year: int
    cvc: int
    card_type: str
    customer_id: int

# Json Transformation for Register a new card and Update a card

class CreateOrUpdateCardRequest(BaseModel):
    card_number_hash: str
    full_name_customer: str
    cvc_code_hash: str
    expiration_date: date
    card_type: str
    customer_id: int

# Search a customer's card

class SearchCardRequest(BaseModel):
    card_number_hash: str
    customer_id: int

class SearchCardResponse(BaseModel):
    card_number_hash: str
    full_name_customer: str
    month: int
    year: int

# Search all customer's cards

class SearchCardsRequest(BaseModel):
    customer_id: int

class SearchCardsResponse(BaseModel):
    cards: List[SearchCardResponse]

# Delete a customer's card

class DeleteCardRequest(BaseModel):
    card_number_hash: str
    customer_id: int

