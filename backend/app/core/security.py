from datetime import datetime, timedelta, timezone
from typing import Any
from cryptography.fernet import Fernet, InvalidToken
from passlib.context import CryptContext
from app.core.config import settings
import jwt
import hashlib


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ALGORITHM = "HS256"

fernet = Fernet(settings.SECRET_KEY.encode())


def create_access_token(subject: str | Any, expires_delta: timedelta) -> str:
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_hash(plain_txt: str, hashed_txt: str) -> bool:
    return pwd_context.verify(plain_txt, hashed_txt)


def get_hash(plain_txt: str) -> str:
    return pwd_context.hash(plain_txt)

def hash_card_number(card_number: str) -> str:
    end = card_number[-4:]
    first = card_number[:4]
    return first + hashlib.sha256(card_number.encode()).hexdigest() + end

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def encrypt_value(value: str) -> str:
    return fernet.encrypt(value.encode()).decode()

def decrypt_value(value: str) -> str:
    try:
        return fernet.decrypt(value).decode()
    except InvalidToken:
        raise ValueError("El valor no pudo ser descifrado: token inválido.")
