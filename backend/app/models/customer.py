from typing import TYPE_CHECKING, Optional, List
from pydantic import BaseModel
from sqlalchemy import BigInteger, Column
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.parking import Parking
    from app.models.card import Card
    from app.models.vehicle import Vehicle

# Modelo de base de datos
class Customer(SQLModel, table=True):
    id: int = Field(sa_column=Column(BigInteger, primary_key=True))
    #
    full_name: str = Field(index=True)
    email: str = Field(index=True)
    password_hash: str
    is_active: bool = Field(default=True)
    parking_id: int = Field(foreign_key="parking.id")

    parking: Optional["Parking"] = Relationship(back_populates="customers")
    cards: List["Card"] = Relationship(back_populates="customer")
    vehicles: List["Vehicle"] = Relationship(back_populates="customer")

class CreateCustomerRequest1(BaseModel):
    id: int
    #
    full_name: str
    email: str
    password: str
    is_active: bool = True
    parking_id: int = 1

class CreateCustomerRequest2(BaseModel):
    id: int
    #
    full_name: str
    email: str
    password_hash: str
    is_active: bool = True
    parking_id: int = 1

class UpdateCustomerRequest(BaseModel):
    id: int
    full_name: str
    #password: str

class SearchCustomerRequest(BaseModel):
    email: str
    password: str

class SearchCustomerResponse(BaseModel):
    id: int
    token: str

class SearchCustomersRequest(BaseModel):
    email: str
    password: str

class SearchCustomers(BaseModel):
    id: int
    full_name: str
    #
    email: str
    is_active: bool

class SearchCustomersResponse(BaseModel):
    customers: List[SearchCustomers]

class SearchMyInformationRequest(BaseModel):
    id: int

class SearchMyInformationResponse(BaseModel):
    id: int
    full_name: str
    email: str
    password_hash: str
