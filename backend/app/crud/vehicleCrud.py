from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.models.vehicle import *
from app.models.customer import Customer
from app.api.deps import get_parking_employee

# ------------------------- Customer Actions ------------------------- #

def create_vehicle(*, session: Session, json: CreateVehicleRequest) -> Vehicle:
    try:
        db_obj = Vehicle.model_validate(
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
            detail=f"Error al crear el vehículo: {str(e)}"
        )


def get_customer_vehicle(*, session: Session, json: SearchCustomerVehicleRequest) -> Vehicle:
    try:
        statement = select(Vehicle).where(
            (Vehicle.plate == json.plate) & (Vehicle.customer_id == json.customer_id)
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


def get_customer_vehicles(*, session: Session, json: SearchCustomerVehiclesRequest) -> List[Vehicle]:
    try:
        statement = select(Vehicle).where(Vehicle.customer_id == json.customer_id)
        vehicles = session.exec(statement).all()
        if not vehicles:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontraron vehículos para este cliente"
            )
        return vehicles
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener los vehículos: {str(e)}"
        )


def delete_customer_vehicle(*, session: Session, json: DeleteVehicleRequest) -> bool:
    try:
        statement = select(Vehicle).where(
            (Vehicle.plate == json.plate) & (Vehicle.customer_id == json.customer_id)
        )
        vehicle = session.exec(statement).first()
        if not vehicle:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehículo no encontrado para eliminar"
            )
        session.delete(vehicle)
        session.commit()
        return True
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al eliminar el vehículo: {str(e)}"
        )


# ------------------------- Employee Actions ------------------------- #


def get_all_customer_vehicles(*, session: Session, json: SearchAllCustomersVehiclesRequest) -> SearchAllCustomersVehiclesResponse:
    try:
        parking_id = get_parking_employee(session=session, employee_id=json.employee_id)
        statement = (select(Customer.id, Customer.full_name, Vehicle.type, Customer.email, Vehicle.plate)
                     .join(Customer).where(Customer.parking_id == parking_id))
        response = session.exec(statement).all()
        if not response:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontraron vehículos para este cliente"
            )
        full_response = [
            SearchAllCustomersVehicles(
                customer_id=i.id,
                full_name=i.full_name,
                vehicle_type=i.type,
                email=i.email,
                plate=i.plate
            )
            for i in response
        ]
        return SearchAllCustomersVehiclesResponse(vehicles=full_response)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener los vehículos: {str(e)}"
        )


def get_registrations_by_plate_crud(*, session: Session, json: SearchRegistrationsByPlateRequest) -> SearchRegistrationsByPlateResponse:
    try:
        statement = select(Vehicle).where((Vehicle.plate == json.plate))
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