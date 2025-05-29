from datetime import datetime
from typing import TYPE_CHECKING, List

from pydantic import BaseModel
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.customer import Customer

class Vehicle(SQLModel, table=True):
    plate: str = Field(primary_key=True)
    type: str
    customer_id: int = Field(foreign_key="customer.id")

    customer: "Customer" = Relationship(back_populates="vehicles")

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

# Get All Customer's Vehicles

class SearchCustomerVehiclesRequest(BaseModel):
    customer_id: int

class SearchVehiclesResponse(BaseModel):
    vehicles: List[SearchCustomerVehicleResponse]

# Delete Customer's Vehicle

class DeleteVehicleRequest(BaseModel):
    customer_id: int
    plate: str

# ------------------------- Employee Actions ------------------------- #

# Get All Customer's Vehicles

class SearchAllCustomerVehiclesRequest(BaseModel):
    employee_id: int
    customer_id: int

class SearchAllCustomerVehicles(BaseModel):
    customer_id: int
    full_name: str
    vehicle_type: str
    email: str
    plate: str

class SearchAllCustomerVehiclesResponse(BaseModel):
    vehicles: List[SearchAllCustomerVehicles]

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
