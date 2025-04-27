from datetime import datetime
from decimal import Decimal
from typing import Optional, TYPE_CHECKING
from sqlalchemy import Column, BigInteger
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.parking_registration import ParkingRegistration
    from app.models.employee import Employee

class Payment(SQLModel, table=True):
    id: int = Field(sa_column=Column(BigInteger, primary_key=True))
    status: str
    status_detail: str
    payment_method: str
    payment_type: str
    transaction_amount: Decimal
    installments: int = Field(default=1)
    date_created: datetime = Field(default_factory=datetime.utcnow)
    date_approved: datetime = Field(default_factory=datetime.utcnow)
    parking_registration_id: int = Field(foreign_key="parkingregistration.id")
    employee_id: Optional[int] = Field(default=None, foreign_key="employee.id")

    parking_registration: "ParkingRegistration" = Relationship(back_populates="payment")
    employee: Optional["Employee"] = Relationship(back_populates="payments")
