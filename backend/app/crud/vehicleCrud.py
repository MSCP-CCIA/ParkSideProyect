from zoneinfo import ZoneInfo
from fastapi import HTTPException, status
from sqlmodel import Session, select, desc
from app.models.vehicle import *
from app.models.customer import Customer
from app.models.parkingRegistration import ParkingRegistration
from app.api.deps import get_parking_employee

LOCAL_ZONE = ZoneInfo("America/Bogota")

# ------------------------- Customer Actions ------------------------- #

def create_vehicle(*, session: Session, request: CreateVehicleRequest) -> Vehicle:
    try:
        db_obj = Vehicle.model_validate(
            request
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


def get_customer_vehicle(*, session: Session, request: SearchCustomerVehicleRequest) -> Vehicle:
    try:
        statement = select(Vehicle).where(
            (Vehicle.plate == request.plate) & (Vehicle.customer_id == request.customer_id)
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


def get_customer_vehicles(*, session: Session, request: SearchCustomerVehiclesRequest) -> List[Vehicle]:
    try:
        statement = select(Vehicle).where(Vehicle.customer_id == request.customer_id)
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


def delete_customer_vehicle(*, session: Session, request: DeleteVehicleRequest) -> bool:
    try:
        statement = select(Vehicle).where(
            (Vehicle.plate == request.plate) & (Vehicle.customer_id == request.customer_id)
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


def get_all_customer_vehicles_crud(*, session: Session, request: SearchAllCustomerVehiclesRequest) -> SearchAllCustomerVehiclesResponse:
    try:
        parking_id = get_parking_employee(session=session, employee_id=request.employee_id)
        statement = (select(Customer.id, Customer.full_name, Vehicle.type, Customer.email, Vehicle.plate)
                     .join(Customer).where((Customer.id == request.customer_id) & (Customer.parking_id == parking_id)))
        response = session.exec(statement).all()
        if not response:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontraron vehículos para este cliente"
            )
        full_response = [
            SearchAllCustomerVehicles(
                customer_id=i.id,
                full_name=i.full_name,
                vehicle_type=i.type,
                email=i.email,
                plate=i.plate
            )
            for i in response
        ]
        return SearchAllCustomerVehiclesResponse(vehicles=full_response)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener los vehículos: {str(e)}"
        )


def get_registrations_by_plate_entry_crud(*, session: Session, request: SearchRegistrationByPlateRequest) -> SearchRegistrationByPlateResponse:
    try:
        parking_id = get_parking_employee(session=session, employee_id=request.employee_id)
        statement = (select(Customer.id, Customer.full_name, Vehicle.type, Customer.email, Vehicle.plate)
                     .join(Customer).where((Customer.parking_id == parking_id) & (Vehicle.plate == request.plate)))
        db_response = session.exec(statement).first()
        if not db_response:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehículo no encontrado"
            )
        response = SearchRegistrationByPlateResponse(
            customer_id=db_response.id,
            customer_full_name=db_response.full_name,
            vehicle_type=db_response.type,
            customer_email=db_response.email,
            vehicle_plate=db_response.plate
        )
        return response
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener el vehículo: {str(e)}"
        )


def get_registrations_by_plate_exit_crud(*, session: Session, request: SearchRegistrationByPlateRequest) -> SearchRegistrationByPlateResponse:
    try:
        parking_id = get_parking_employee(session=session, employee_id=request.employee_id)
        statement = (select(Customer.id, Customer.full_name, Vehicle.type, Customer.email, Vehicle.plate)
                     .join(Customer).where((Customer.parking_id == parking_id) & (Vehicle.plate == request.plate)))
        db_response = session.exec(statement).first()
        if not db_response:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehículo no encontrado"
            )
        response = SearchRegistrationByPlateResponse(
            customer_id=db_response.id,
            customer_full_name=db_response.full_name,
            vehicle_type=db_response.type,
            customer_email=db_response.email,
            vehicle_plate=db_response.plate
        )
        return response
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener el vehículo: {str(e)}"
        )


def get_occupation_report_crud(*, session: Session, request: SearchOccupationReportRequest) -> SearchOccupationReportResponse:
    try:
        parking_id = get_parking_employee(session=session, employee_id=request.employee_id)
        statement = (select(Vehicle.plate, Customer.full_name, ParkingRegistration.entry_datetime, ParkingRegistration.exit_datetime)
                     .join(Customer).where((Customer.parking_id == parking_id) & (Vehicle.plate == request.plate))
                     .join(ParkingRegistration).where(ParkingRegistration.plate == request.plate)
                     .order_by(desc(ParkingRegistration.entry_datetime)))
        db_response = session.exec(statement).all()
        if not db_response:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehículo no encontrado"
            )
        response = [
            SearchOccupationReport(
                plate=i.plate,
                customer_full_name=i.full_name,
                entry_date=i.entry_datetime.astimezone(LOCAL_ZONE).strftime("%Y-%m-%d"),
                entry_time=i.entry_datetime.astimezone(LOCAL_ZONE).strftime("%H:%M:%S"),
                exit_date=i.exit_datetime.astimezone(LOCAL_ZONE).strftime("%Y-%m-%d") if i.exit_datetime else None,
                exit_time=i.exit_datetime.astimezone(LOCAL_ZONE).strftime("%H:%M:%S") if i.exit_datetime else None
            )
            for i in db_response
        ]
        return SearchOccupationReportResponse(occupation_report=response)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener el vehículo: {str(e)}"
        )
