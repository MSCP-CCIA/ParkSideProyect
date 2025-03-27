import uuid
from datetime import datetime
from sqlmodel import Field, Relationship, SQLModel

from backend.app.models.parking_registration import ParkingRegistration
from backend.app.models.user import User


class PaymentCreate(SQLModel):
    payment_datetime: datetime
    quantity: int
    payment_method: str = Field(default=None, max_length=255)


class Payment(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    payment_datetime: datetime
    quantity: int
    payment_method: str = Field(default=None, max_length=255)
    owner_id: uuid.UUID = Field(
        foreign_key="parking.id", nullable=False, ondelete="CASCADE")
    owner: ParkingRegistration | None = Relationship(back_populates="payment")


class PaymentPublic(SQLModel):
    id: uuid.UUID


class PaymentsPublic(SQLModel):
    data: list[PaymentPublic]
    count: int
