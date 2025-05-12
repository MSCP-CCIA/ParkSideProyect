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

class SearchCustomerVehicleRequest(BaseModel):
    plate: str
    customer_id: int

class SearchCustomerVehicleResponse(BaseModel):
    type: str
    plate: str

class SearchCustomerVehiclesRequest(BaseModel):
    customer_id: int

class SearchVehiclesResponse(BaseModel):
    vehicles: List[SearchCustomerVehicleResponse]

class SearchAllCustomersVehiclesRequest(BaseModel):
    employee_id: int

class SearchAllCustomersVehicles(BaseModel):
    customer_id: int
    full_name: str
    vehicle_type: str
    email: str
    plate: str

class SearchAllCustomersVehiclesResponse(BaseModel):
    vehicles: List[SearchAllCustomersVehicles]

class DeleteVehicleRequest(BaseModel):
    customer_id: int
    plate: str
