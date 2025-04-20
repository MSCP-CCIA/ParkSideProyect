from sqlmodel import Session, create_engine, select

from app.core.config import settings
from app.models_prueba import Vehicle

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))


def get_all_users():
    with Session(engine) as session:
        statement = select(Vehicle)
        results = session.exec(statement)
        users = results.all()
        for user in users:
            print(user)


if __name__ == "__main__":
    get_all_users()
