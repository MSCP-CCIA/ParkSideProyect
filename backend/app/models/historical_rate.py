import uuid
from datetime import date
from typing import Optional, TYPE_CHECKING
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.parking import Parkings

class HistoricalRateCreate(SQLModel):
    car_rate: int
    motorbike_rate: int
    start_date: Optional[date] = None
    end_date: Optional[date] = None


class HistoricalRateUpdate(SQLModel):
    car_rate: int
    motorbike_rate: int
    start_date: Optional[date] = None
    end_date: Optional[date] = None


class HistoricalRates(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    car_rate: int
    motorbike_rate: int
    start_date: date
    end_date: Optional[date] = None
    parking_id: int = Field(foreign_key="parkings.id")

    parking: "Parkings" = Relationship(back_populates="historical_rates")


class HistoricalRatePublic(SQLModel):
    id: uuid.UUID


class HistoricalRatesPublic(SQLModel):
    data: list[HistoricalRatePublic]
    count: int
