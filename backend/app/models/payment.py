from datetime import datetime, date
from decimal import Decimal
from pydantic import BaseModel
from typing import Optional, TYPE_CHECKING, List
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from app.models.parkingRegistration import ParkingRegistration
    from app.models.employee import Employee

class Payment(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    status: str
    status_detail: str
    payment_method: str
    payment_type: str
    transaction_amount: Decimal
    installments: int = Field(default=1)
    date_created: datetime = Field(default_factory=datetime.now)
    date_approved: Optional[datetime]

    parking_registration_id: int = Field(foreign_key="parkingregistration.id")
    employee_id: Optional[int] = Field(default=None, foreign_key="employee.id")

    parking_registration: "ParkingRegistration" = Relationship(back_populates="payment")
    employee: Optional["Employee"] = Relationship(back_populates="payments")

# ------------------------- Employee Actions ------------------------- #

# Get Occupation Report for Employee

class SearchPaymentReportRequest(BaseModel):
    employee_id: int
    customer_id: int

class SearchPaymentReport(BaseModel):
    customer_id: int
    customer_full_name: str
    date_created: date
    transaction_amount: float
    status: str

class SearchPaymentReportResponse(BaseModel):
    payment_report: List[SearchPaymentReport]
