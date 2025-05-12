from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.models.parking import *
from app.api.deps import get_parking_employee


def get_parking(*, session: Session, json: SearchParkingRequest) -> Parking:
    try:
        parking_id = get_parking_employee(session=session, employee_id=json.employee_id)
        statement = select(Parking).where(
            (Parking.id == parking_id)
        )
        parking = session.exec(statement).first()
        if not parking:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Parqueadero no encontrado"
            )
        return parking
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener el parqueadero: {str(e)}"
        )