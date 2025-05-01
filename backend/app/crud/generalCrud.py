import uuid
from typing import Any
from sqlmodel import Session, select
from app.core.security import get_hash, verify_hash
from app.models.customer import Customer, UserCreate, User, UserUpdate, create_customer_model_from_usercreate



def create_customer(db: Session, user_in: UserCreate) -> Customer:
    db_customer = create_customer_model_from_usercreate(user_in)
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer


################################################################################################################
########################################### Modelos a mover ####################################################
################################################################################################################

def create_user(*, session: Session, user_create: UserCreate) -> User:
    db_obj = User.model_validate(
        user_create, update={"hashed_password": get_hash(user_create.password)}
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj


def update_user(*, session: Session, db_user: User, user_in: UserUpdate) -> Any:
    user_data = user_in.model_dump(exclude_unset=True)
    extra_data = {}
    if "password" in user_data:
        password = user_data["password"]
        hashed_password = get_hash(password)
        extra_data["hashed_password"] = hashed_password
    db_user.sqlmodel_update(user_data, update=extra_data)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.exec(statement).first()
    return session_user


def authenticate(*, session: Session, email: str, password: str) -> User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_hash(password, db_user.hashed_password):
        return None
    return db_user



