import uuid
from datetime import datetime
from typing import Optional, TYPE_CHECKING
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.parking_registration import ParkingRegistration
    from app.models.employee import Employee

class PaymentCreate(SQLModel):
    payment_datetime: datetime
    quantity: int
    payment_method: str = Field(default=None, max_length=255)

class Payment(SQLModel, table=True):
    id: int = Field(primary_key=True)
    status: str
    status_detail: str
    payment_method: str
    payment_type: str
    transaction_amount: float
    installments: int = Field(default=1)
    date_created: datetime = Field(default_factory=datetime.now)
    date_approved: datetime = Field(default_factory=datetime.now)
    parking_registration_id: int = Field(foreign_key="parkingregistration.id")
    employee_id: Optional[int] = Field(default=None, foreign_key="employee.id")
    parking_registration: ParkingRegistration = Relationship(back_populates="payment")
    employee: Optional[Employee] = Relationship(back_populates="payments")

class PaymentPublic(SQLModel):
    id: uuid.UUID

class PaymentsPublic(SQLModel):
    data: list[PaymentPublic]
    count: int
