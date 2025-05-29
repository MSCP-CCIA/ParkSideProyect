from datetime import date
from typing import Optional, TYPE_CHECKING, List

from pydantic import BaseModel
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.parking import Parking

class HistoricalRate(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    car_rate: int
    motorbike_rate: int
    start_date: date
    end_date: Optional[date] = None

    parking_id: int = Field(foreign_key="parking.id")
    parking: "Parking" = Relationship(back_populates="historical_rates")

# ------------------------- Employee Actions ------------------------- #

# Create new Rate

class CreateHistoricalRateRequest(BaseModel):
    employee_id: int
    car_rate: int | None
    motorbike_rate: int | None
    start_date: date

class CreateHistoricalRate(BaseModel):
    car_rate: int
    motorbike_rate: int
    start_date: date
    parking_id: int

# Search 1 Rate in the DB

class SearchHistoricalRateRequest(BaseModel):
    employee_id: int
    start_date: date

class SearchHistoricalRateResponse(BaseModel):
    car_rate: int
    motorbike_rate: int
    start_date: date
    end_date: date | None

# Search All Rates in the DB

class SearchHistoricalRatesRequest(BaseModel):
    employee_id: int

class SearchHistoricalRatesResponse(BaseModel):
    historicalRates: List[SearchHistoricalRateResponse]