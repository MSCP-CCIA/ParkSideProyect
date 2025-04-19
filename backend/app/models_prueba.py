from datetime import date, datetime
from decimal import Decimal
from typing import Optional, List

from sqlalchemy import BigInteger, Column
from sqlmodel import Field, Relationship, SQLModel


class Parkings(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    places: int
    address: str
    enterprise: str

    historical_rates: List["HistoricalRates"] = Relationship(back_populates="parking")
    users: List["Users"] = Relationship(back_populates="parking")
    employees: List["Employees"] = Relationship(back_populates="parking")


class ParkingCreate(SQLModel):
    name: str
    places: int
    address: str
    enterprise: str


class HistoricalRates(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    car_rate: int
    motorbike_rate: int
    start_date: date
    end_date: Optional[date] = None
    parking_id: int = Field(foreign_key="parkings.id")

    parking: "Parkings" = Relationship(back_populates="historical_rates")


class HistoricalRateCreate(SQLModel):
    car_rate: int
    motorbike_rate: int
    start_date: date
    end_date: Optional[date] = None
    parking_id: int


class Users(SQLModel, table=True):
    id: int = Field(sa_column=Column(BigInteger, primary_key=True))
    full_name: str = Field(index=True)
    email: str = Field(index=True)
    password_hash: str
    is_active: bool = Field(default=True)
    parking_id: int = Field(foreign_key="parkings.id")

    parking: "Parkings" = Relationship(back_populates="users")
    cards: List["Cards"] = Relationship(back_populates="user")
    vehicles: List["Vehicles"] = Relationship(back_populates="user")


class UsersCreate(SQLModel):
    id: int
    full_name: str
    email: str
    password_hash: str
    is_active: bool = True
    parking_id: int


class Employees(SQLModel, table=True):
    id: int = Field(sa_column=Column(BigInteger, primary_key=True))
    full_name: str = Field(index=True)
    email: str = Field(index=True)
    password_hash: str
    phone: int
    job_position: str
    is_active: bool = Field(default=True)
    parking_id: int = Field(foreign_key="parkings.id")

    parking: "Parkings" = Relationship(back_populates="employees")
    payments: List["Payments"] = Relationship(back_populates="employee")


class EmployeesCreate(SQLModel):
    id: int
    full_name: str
    email: str
    password_hash: str
    phone: int
    job_position: str
    is_active: bool = True
    parking_id: int


class Cards(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    card_number_hash: str
    full_name_user: str
    cvc_code_hash: str
    expiration_date: date
    card_type: str
    user_id: int = Field(foreign_key="users.id")

    user: "Users" = Relationship(back_populates="cards")


class CardsCreate(SQLModel):
    card_number_hash: str
    full_name_user: str
    cvc_code_hash: str
    expiration_date: date
    card_type: str
    user_id: int


class Vehicles(SQLModel, table=True):
    plate: str = Field(primary_key=True)
    type: str
    model: str
    color: str
    user_id: int = Field(foreign_key="users.id")

    user: "Users" = Relationship(back_populates="vehicles")
    parking_registrations: List["ParkingRegistrations"] = Relationship(back_populates="vehicle")


class VehiclesCreate(SQLModel):
    plate: str
    type: str
    model: str
    color: str
    user_id: int


class ParkingRegistrations(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    entry_datetime: datetime = Field(default_factory=datetime.now)
    exit_datetime: datetime = Field(default_factory=datetime.now)
    plate: str = Field(foreign_key="vehicles.plate")

    vehicle: "Vehicles" = Relationship(back_populates="parking_registrations")
    payment: Optional["Payments"] = Relationship(back_populates="parking_registration")


class ParkingRegistrationsCreate(SQLModel):
    plate: str


class Payments(SQLModel, table=True):
    id: int = Field(sa_column=Column(BigInteger, primary_key=True))
    status: str
    status_detail: str
    payment_method: str
    payment_type: str
    transaction_amount: Decimal
    installments: int = Field(default=1)
    date_created: datetime = Field(default_factory=datetime.now)
    date_approved: datetime = Field(default_factory=datetime.now)
    parking_registration_id: int = Field(foreign_key="parkingregistrations.id")
    employee_id: Optional[int] = Field(default=None, foreign_key="employees.id")
    parking_registration: "ParkingRegistrations" = Relationship(back_populates="payment")
    employee: Optional["Employees"] = Relationship(back_populates="payments")


class PaymentsCreate(SQLModel):
    id: int
    status: str
    status_detail: str
    payment_method: str
    payment_type: str
    transaction_amount: Decimal
    installments: int = 1
    parking_registration_id: int
    employee_id: Optional[int] = None