from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal
from typing import Optional

class PaymentCreate(BaseModel):
    status: str
    status_detail: str
    payment_method: str
    payment_type: str
    transaction_amount: Decimal
    installments: Optional[int] = 1
    parking_registration_id: int
    employee_id: Optional[int] = None

class PaymentUpdate(BaseModel):
    status: Optional[str] = None
    status_detail: Optional[str] = None
    payment_method: Optional[str] = None
    payment_type: Optional[str] = None
    transaction_amount: Optional[Decimal] = None
    installments: Optional[int] = None
    employee_id: Optional[int] = None

class PaymentPublic(BaseModel):
    id: int
    status: str
    status_detail: str
    payment_method: str
    payment_type: str
    transaction_amount: Decimal
    installments: int
    date_created: datetime
    date_approved: datetime
    parking_registration_id: int
    employee_id: Optional[int]

    class Config:
        from_attributes = True
