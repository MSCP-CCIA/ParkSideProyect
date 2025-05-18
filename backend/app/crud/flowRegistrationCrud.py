from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.models.parkingRegistration import *
from app.models.vehicle import Vehicle

# ------------------------- ML Actions ------------------------- #

def get_customer_vehicle(*, session: Session, json: EntryVehicleRequest) -> Vehicle:
    try:
        statement = select(Vehicle).where(
            (Vehicle.plate == json.plate)
        )
        vehicle = session.exec(statement).first()
        if not vehicle:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehículo no encontrado"
            )
        return vehicle
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener el vehículo: {str(e)}"
        )

def create_parking_registration(*, session: Session, json: EntryVehicleRequest) -> ParkingRegistration:
    try:
        entry_datetime=datetime.utcnow()
        register = EntryVehicle(
            entry_datetime=entry_datetime,
            exit_datetime=entry_datetime,
            plate=json.plate
        )
        db_obj = ParkingRegistration.model_validate(
            register
        )
        session.add(db_obj)
        session.commit()
        session.refresh(db_obj)
        return db_obj
    except HTTPException as e:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al crear el registro de parqueo: {str(e)}"
        )

def update_parking_registration(*, session: Session, json: EntryVehicleRequest) -> ParkingRegistration:
    try:
        statement = select(ParkingRegistration).where(
            (ParkingRegistration.plate == json.plate) &
            (ParkingRegistration.entry_datetime == ParkingRegistration.exit_datetime)  # Aún no ha salido
        ).order_by(ParkingRegistration.entry_datetime.desc())
        parking_registration = session.exec(statement).first()
        if not parking_registration:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Registro de parqueo no encontrado o ya cerrado"
            )
        parking_registration.exit_datetime = datetime.utcnow()

        session.add(parking_registration)
        session.commit()
        session.refresh(parking_registration)
        return parking_registration
    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al actualizar el registro de parqueo: {str(e)}"
        )
