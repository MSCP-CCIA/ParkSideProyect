from datetime import datetime
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

# ------------------------- Customer Actions ------------------------- #

# Create Vehicle

class CreateVehicleRequest(BaseModel):
    plate: str
    type: str
    customer_id: int

# Get 1 Customer's Vehicle

class SearchCustomerVehicleRequest(BaseModel):
    plate: str
    customer_id: int

class SearchCustomerVehicleResponse(BaseModel):
    type: str
    plate: str

class SearchCustomerVehiclesRequest(BaseModel):
    customer_id: int

# Get All Customer's Vehicles

class SearchVehiclesResponse(BaseModel):
    vehicles: List[SearchCustomerVehicleResponse]

class DeleteVehicleRequest(BaseModel):
    customer_id: int
    plate: str

# ------------------------- Employee Actions ------------------------- #

# Get All Customers' Vehicles -> Need update Get All Customer's Vehicles

class SearchAllCustomersVehiclesRequest(BaseModel):
    employee_id: int
    # customer_id

class SearchAllCustomersVehicles(BaseModel):
    customer_id: int
    full_name: str
    vehicle_type: str
    email: str
    plate: str

class SearchAllCustomersVehiclesResponse(BaseModel):
    vehicles: List[SearchAllCustomersVehicles]

# Search Registrations for Entry and Exit

class SearchRegistrationByPlateRequest(BaseModel):
    employee_id: int
    plate: str

class SearchRegistrationByPlateResponse(BaseModel):
    customer_id: int
    customer_full_name: str
    vehicle_type: str
    customer_email: str
    vehicle_plate: str

# Get Occupation Report for Employee

class SearchOccupationReportRequest(BaseModel):
    employee_id: int
    plate: str

class SearchOccupationReport(BaseModel):
    plate: str
    customer_full_name: str
    entry_date: str
    entry_time: str
    exit_date: str | None
    exit_time: str | None

class SearchOccupationReportResponse(BaseModel):
    occupation_report: List[SearchOccupationReport]
