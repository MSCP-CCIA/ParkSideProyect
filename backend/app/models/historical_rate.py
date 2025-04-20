import uuid
from datetime import date
from typing import Optional, TYPE_CHECKING
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