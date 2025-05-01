from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.models.parkingRegistration import *

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

def create_parking_registration(*, session: Session, json: EntryVehicleResponse):
    try:
        db_obj = ParkingRegistration.model_validate(
            json
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

def update_parking_registration(*, session: Session, json: EntryVehicleResponse):