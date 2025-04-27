from typing import TYPE_CHECKING, List

from pydantic import BaseModel
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.customer import Customer
    from app.models.parkingRegistration import ParkingRegistration

class Vehicle(SQLModel, table=True):
    plate: str = Field(primary_key=True)
    type: str
    customer_id: int = Field(foreign_key="customer.id")

    customer: "Customer" = Relationship(back_populates="vehicles")
    parking_registrations: List["ParkingRegistration"] = Relationship(back_populates="vehicle")

class CreateVehicleRequest(BaseModel):
    plate: str
    type: str
    customer_id: int

class SearchVehicleRequest(BaseModel):
    plate: str
    customer_id: int

class SearchVehicleResponse(BaseModel):
    type: str
    plate: str

class SearchVehiclesRequest(BaseModel):
    customer_id: int

class SearchVehiclesResponse(BaseModel):
    vehicles: List[SearchVehicleResponse]

class DeleteVehicleRequest(BaseModel):
    customer_id: int
    plate: str
