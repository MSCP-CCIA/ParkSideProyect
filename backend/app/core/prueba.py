from fastapi import HTTPException
from sqlmodel import Session, create_engine, select
from app.core.config import settings
from app.models.vehicle import Vehicle

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))


def get_all_vehicles():
    with Session(engine) as session:
        statement = select(Vehicle)
        results = session.exec(statement)
        vehicles = results.all()
        for user in vehicles:
            print(user)


def get_vehicle_by_plate(plate: str, customer_id: int):
    with Session(engine) as session:
        statement = select(Vehicle).where(
            (Vehicle.plate == plate) & (Vehicle.customer_id == customer_id)
        )
        vehicle = session.exec(statement).first()
        if not vehicle:
            raise HTTPException(
                status_code=404,
                detail="Vehículo no encontrado"
            )
        return vehicle


def add_vehicle(vehicle: Vehicle):
    with Session(engine) as session:
        session.add(vehicle)
        session.commit()


if __name__ == "__main__":
    # get_all_vehicles()

    # vehicle = Vehicle(plate="AAA123", type="Carro", customer_id=1000000001)
    # add_vehicle(vehicle)

    print(get_vehicle_by_plate("AAA333", 1000000002))

