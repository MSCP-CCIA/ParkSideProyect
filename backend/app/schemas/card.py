from pydantic import BaseModel, Field
from datetime import date, datetime

class CardCreate(BaseModel):
    card_number: str = Field(..., min_length=16, max_length=16)
    cardholder_name: str
    expiration_date: date
    cvv: str = Field(..., min_length=3, max_length=3)
    card_type: str

class CardPublic(BaseModel):
    id: int
    full_name_customer: str
    expiration_date: date
    card_type: str

    class Config:
        from_attributes = True

class TransactionCreate(BaseModel):
    card_id: int
    amount: float
    merchant: str

class TransactionResponse(BaseModel):
    transaction_id: int
    card_id: int
    amount: float
    merchant: str
    timestamp: datetime
    status: str
