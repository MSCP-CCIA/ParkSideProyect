import uuid
from datetime import datetime
from decimal import Decimal
from typing import Optional, TYPE_CHECKING

from sqlalchemy import Column, BigInteger
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.parking_registration import ParkingRegistrations
    from app.models.employee import Employees

class PaymentCreate(SQLModel):
    payment_datetime: datetime
    quantity: int
    payment_method: str = Field(default=None, max_length=255)

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

class PaymentPublic(SQLModel):
    id: uuid.UUID

class PaymentsPublic(SQLModel):
    data: list[PaymentPublic]
    count: int
