import uuid
from datetime import date
from sqlmodel import Field, Relationship, SQLModel

from backend.app.models.parking import Parking


class HistoricalRateCreate(SQLModel):
    car_rate: int
    motorbike_rate: int
    start_date: date = None
    end_date: date = None


class HistoricalRateUpdate(SQLModel):
    car_rate: int
    motorbike_rate: int
    start_date: date = None
    end_date: date = None


class HistoricalRate(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    owner_id: uuid.UUID = Field(foreign_key="parking.id", nullable=False, ondelete="CASCADE")
    owner: Parking | None = Relationship(back_populates="historical_rates")


class HistoricalRatePublic(SQLModel):
    id: uuid.UUID


class HistoricalRatesPublic(SQLModel):
    data: list[HistoricalRatePublic]
    count: int
