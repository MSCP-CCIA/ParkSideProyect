import uuid
from typing import TYPE_CHECKING, Optional, List
from sqlalchemy import BigInteger, Column
from sqlmodel import Field, Relationship, SQLModel
from app.core.security import get_hash

if TYPE_CHECKING:
    from app.models.parking import Parking
    from app.models.card import Card
    from app.models.vehicle import Vehicle

# Modelo de base de datos
class Customer(SQLModel, table=True):
    id: int = Field(sa_column=Column(BigInteger, primary_key=True))
    full_name: str = Field(index=True)
    email: str = Field(index=True)
    password_hash: str
    is_active: bool = Field(default=True)
    parking_id: int = Field(foreign_key="parking.id")

    parking: Optional["Parking"] = Relationship(back_populates="customers")
    cards: List["Card"] = Relationship(back_populates="customer")
    vehicles: List["Vehicle"] = Relationship(back_populates="customer")


