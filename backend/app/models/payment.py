import uuid
from datetime import datetime
from typing import Optional, TYPE_CHECKING
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.parking_registration import ParkingRegistration

class PaymentCreate(SQLModel):
    payment_datetime: datetime
    quantity: int
    payment_method: str = Field(default=None, max_length=255)

class Payment(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    payment_datetime: datetime
    quantity: int
    payment_method: str = Field(default=None, max_length=255)

    parking_registration_id: uuid.UUID = Field(
        foreign_key="parkingregistration.id", nullable=False
    )
    parking_registration: Optional["ParkingRegistration"] = Relationship(back_populates="payment")


class PaymentPublic(SQLModel):
    id: uuid.UUID

class PaymentsPublic(SQLModel):
    data: list[PaymentPublic]
    count: int
