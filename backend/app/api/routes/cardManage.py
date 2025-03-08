from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from cryptography.fernet import Fernet

# Configuración básica
SECRET_KEY = Fernet.generate_key()
fernet = Fernet(SECRET_KEY)

app = FastAPI()

# Base de datos ficticia
fake_db = {"transactions": []}

# Modelos
class Card(BaseModel):
    card_number: str = Field(..., min_length=16, max_length=16)
    cardholder_name: str
    expiration_date: str
    cvv: str = Field(..., min_length=3, max_length=3)
    balance: float

class Transaction(BaseModel):
    card_number: str
    amount: float
    merchant: str
    timestamp: datetime = datetime.utcnow()
    status: str = "pending"

class TransactionResponse(BaseModel):
    transaction_id: int
    card_number: str
    amount: float
    merchant: str
    timestamp: datetime
    status: str

# Helpers

def encrypt_card_number(card_number: str) -> str:
    return fernet.encrypt(card_number.encode()).decode()

def decrypt_card_number(encrypted_card_number: str) -> str:
    return fernet.decrypt(encrypted_card_number.encode()).decode()


def validate_card(card: Card):
    if card.expiration_date < datetime.now().strftime("%Y-%m"):
        raise HTTPException(status_code=400, detail="Card expired")
    return True

# Endpoints

@app.post("/register-card")
def register_card(card: Card):
    encrypted_number = encrypt_card_number(card.card_number)
    fake_db[encrypted_number] = card.dict()
    fake_db[encrypted_number]["card_number"] = encrypted_number
    return {"msg": "Card registered successfully"}

@app.post("/create-transaction", response_model=TransactionResponse)
def create_transaction(transaction: Transaction):
    encrypted_number = encrypt_card_number(transaction.card_number)
    card = fake_db.get(encrypted_number)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    if card["balance"] < transaction.amount:
        raise HTTPException(status_code=400, detail="Insufficient funds")
    card["balance"] -= transaction.amount
    transaction_id = len(fake_db["transactions"]) + 1
    transaction.status = "completed"
    fake_db["transactions"].append(transaction.dict())
    return {"transaction_id": transaction_id, **transaction.dict()}

@app.get("/transactions", response_model=List[TransactionResponse])
def get_transactions():
    return fake_db["transactions"]

@app.get("/card-balance/{card_number}")
def get_card_balance(card_number: str):
    encrypted_number = encrypt_card_number(card_number)
    card = fake_db.get(encrypted_number)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    return {"balance": card["balance"]}