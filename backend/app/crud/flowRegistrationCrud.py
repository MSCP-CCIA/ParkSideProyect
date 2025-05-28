from fastapi import HTTPException, status
from sqlmodel import Session, select, desc
from app.models.parkingRegistration import *
from app.models.vehicle import Vehicle

# ------------------------- ML and Employee Actions ------------------------- #

def get_customer_vehicle(*, session: Session, request: EntryOrUpdateVehicleRequest) -> Vehicle:
    try:
        statement = select(Vehicle).where(
            (Vehicle.plate == request.plate)
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

def create_parking_registration(*, session: Session, request: EntryOrUpdateVehicleRequest) -> ParkingRegistration | None:
    try:
        statement = (select(ParkingRegistration)
                     .where((Vehicle.plate == request.plate))
                     .order_by(desc(ParkingRegistration.entry_datetime)))
        parkingRegistration = session.exec(statement).first()
        if not parkingRegistration or parkingRegistration.exit_datetime is not None:
            register = EntryVehicle(
                entry_datetime=datetime.now(),
                exit_datetime=None,
                plate=request.plate
            )
            db_obj = ParkingRegistration.model_validate(
                register
            )
            session.add(db_obj)
            session.commit()
            session.refresh(db_obj)
            return db_obj
        return None
    except HTTPException as e:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al crear el registro de parqueo: {str(e)}"
        )

def update_parking_registration(*, session: Session, request: EntryOrUpdateVehicleRequest) -> ParkingRegistration:
    try:
        statement = select(ParkingRegistration).where(
            (ParkingRegistration.plate == request.plate) &
            (ParkingRegistration.exit_datetime == None)  # Aún no ha salido
        ).order_by(ParkingRegistration.entry_datetime.desc())
        parking_registration = session.exec(statement).first()
        if not parking_registration:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Registro de parqueo no encontrado o ya cerrado"
            )
        parking_registration.exit_datetime = datetime.now()

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
