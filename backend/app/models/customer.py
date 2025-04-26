import uuid
from typing import TYPE_CHECKING, Optional, List
from sqlalchemy import BigInteger, Column
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.parking import Parking
    from app.models.card import Card
    from app.models.vehicle import Vehicle

class Customer(SQLModel, table=True):
    id: int = Field(sa_column=Column(BigInteger, primary_key=True))
    full_name: str = Field(index=True)
    email: str = Field(index=True)
    password_hash: str
    is_active: bool = Field(default=True)
    parking_id: int = Field(foreign_key="parking.id")

    parking: "Parking" = Relationship(back_populates="customers")
    cards: List["Card"] = Relationship(back_populates="customer")
    vehicles: List["Vehicle"] = Relationship(back_populates="customer")

class TokenPayload(SQLModel):
    sub: Optional[str] = None
