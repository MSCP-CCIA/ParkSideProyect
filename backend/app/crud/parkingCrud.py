from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.models.parking import *
from app.models.employee import Employee


def get_parking(*, session: Session, searchParkingRequest: SearchParkingRequest) -> Parking:
    try:
        employee = session.exec(select(Employee).where(Employee.id == searchParkingRequest.employee_id)).first()
        if not employee:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Empleado no encontrado"
            )
        statement = select(Parking).where(
            (Parking.name == searchParkingRequest.name) &
            (Parking.id == employee.parking_id)
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