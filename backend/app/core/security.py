from datetime import datetime, timedelta, timezone
from typing import Any
from typing import Tuple
from passlib.context import CryptContext
from app.core.config import settings
import jwt
import hashlib
from cryptography.fernet import Fernet, InvalidToken
import os


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ALGORITHM = "HS256"


fernet = Fernet(settings.SECRET_KEYF.encode())


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



# ============== Funciones de tarjeta ============

# ---------- ENCRIPTAR ----------
def encrypt_card(pan: str) -> str:
    """
    Cifra todo el PAN y devuelve solo el token Fernet (string base64).
    """
    return fernet.encrypt(pan.encode()).decode()


# ---------- DESENCRIPTAR ----------
def decrypt_card(token: str) -> Tuple[str, str]:
    """
    Devuelve (pan_completo, primeros4+ultimos4).
    Soporta tokens nuevos (solo Fernet) y tokens legados first:cipher:last.
    """
    # Detectar formato
    if token.count(":") == 2:                # legado
        first4, cipher_b64, last4 = token.split(":")
    else:                                    # nuevo
        cipher_b64 = token
        first4 = last4 = None

    # Desencriptar
    try:
        pan = fernet.decrypt(cipher_b64.encode()).decode()
    except InvalidToken:
        raise InvalidToken("Token Fernet inválido")

    # Verificar coherencia si venía first/last
    if first4 and last4 and not (pan.startswith(first4) and pan.endswith(last4)):
        raise InvalidToken("Incongruencia dígitos visibles")

    # Generar string con primeros4+ultimos4
    visible = f"{pan[:4]}{pan[-4:]}"
    return pan, visible
