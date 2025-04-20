from datetime import date
from typing import TYPE_CHECKING, Optional
from sqlmodel import Field, Relationship, SQLModel


if TYPE_CHECKING:
    from app.models.customer import Customer


class Card(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    card_number_hash: str
    full_name_customer: str
    cvc_code_hash: str
    expiration_date: date
    card_type: str
    customer_id: int = Field(foreign_key="customer.id")
    customer: "Customer" = Relationship(back_populates="cards")
