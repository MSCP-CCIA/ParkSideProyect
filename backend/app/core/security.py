from datetime import datetime, timedelta, timezone
from typing import Any, Optional
from cryptography.fernet import Fernet, InvalidToken
from fastapi import HTTPException
from passlib.context import CryptContext
from app.core.config import settings
import jwt
import hashlib
from cryptography.fernet import Fernet, InvalidToken
import os
from jose import JWTError, jwt


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ALGORITHM = "HS256"

fernet = Fernet(settings.SECRET_KEYF.encode())


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


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

"""
# ================= Clave Fernet =================
#   - Debe ser una cadena Base64 de 32 bytes.
#   - Genera una sola vez: Fernet.generate_key().decode()
FERNET_KEY = os.environ["SECRET_KEYF"]
fernet = Fernet(FERNET_KEY.encode())

# ============== Funciones de tarjeta ============

def encrypt_cardf(pan: str) -> str:
    Devuelve un token con formato:
        <first4>:<ciphertext>:<last4>
    first4 = pan[:4]
    last4  = pan[-4:]
    ciphertext_b64 = fernet.encrypt(pan.encode()).decode()
    return f"{first4}:{ciphertext_b64}:{last4}"

def decrypt_cardf(token: str) -> str:
    Recibe el string devuelto por encrypt_card y
    devuelve el PAN en texto claro.
    try:
        first4, ciphertext_b64, last4 = token.split(":")
    except ValueError:
        raise ValueError("Token malformado")

    pan = fernet.decrypt(ciphertext_b64.encode()).decode()

    # Defensa extra: comprobar coherencia
    if not (pan.startswith(first4) and pan.endswith(last4)):
        raise InvalidToken("Incongruencia en los dígitos visibles")

    return pan
"""