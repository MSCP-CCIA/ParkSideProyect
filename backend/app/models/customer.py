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
    full_name: str = Field(index=True)
    email: str = Field(index=True)
    document_type: str
    password_hash: str
    is_active: bool = Field(default=True)
    parking_id: int = Field(foreign_key="parking.id")

    parking: "Parking" = Relationship(back_populates="customers")
    cards: List["Card"] = Relationship(back_populates="customer")
    vehicles: List["Vehicle"] = Relationship(back_populates="customer")

# ------------------------- Customer Actions ------------------------- #

# Create Customer

class CreateCustomerRequest(BaseModel):
    id: int
    full_name: str
    email: str
    document_type: str
    password: str
    is_active: bool = True
    parking_id: int = 1

# Update Customer

class UpdateCustomerRequest(BaseModel):
    id: int
    full_name: str
    #password: str

# Search Customer (Login)

class SearchCustomerRequest(BaseModel):
    email: str
    password: str

class SearchCustomerResponse(BaseModel):
    id: int
    token: str

# Get Customer Information

class SearchMyInformationRequest(BaseModel):
    id: int

class SearchMyInformationResponse(BaseModel):
    id: int
    document_type: str
    full_name: str
    email: str

# ------------------------- Employee Actions ------------------------- #

# Get Customer by ID

class SearchCustomerByIdRequest(BaseModel):
    employee_id: int
    customer_id: int

class SearchCustomersResponse(BaseModel):
    id: int
    full_name: str
    email: str
    document_type: str
    is_active: bool

# Update Customer State

class UpdateCustomerStateRequest(BaseModel):
    employee_id: int
    customer_id: int