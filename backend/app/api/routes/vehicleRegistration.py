from fastapi import APIRouter
from app.models.message import Message
from app.crud.vehicleCrud import *
from app.api.deps import SessionDep

router = APIRouter(prefix="/vehicle", tags=["vehicleRegistration"])

# ------------------------- Customer Actions ------------------------- #

@router.post("/register-vehicle/", response_model=Message)
def register_vehicle(session: SessionDep, json: CreateVehicleRequest) -> Message:
    try:
        create_vehicle(session=session, json=json)
        return Message(message="Registro de vehículo exitoso")
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al registrar el vehículo"
        )


@router.post("/get-vehicle", response_model=SearchCustomerVehicleResponse)
def get_vehicle(session: SessionDep, json: SearchCustomerVehicleRequest) -> SearchCustomerVehicleResponse:
    try:
        vehicle = get_customer_vehicle(session=session, json=json)
        if not vehicle:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehículo no encontrado"
            )
        return SearchCustomerVehicleResponse(
            type = vehicle.type,
            plate = vehicle.plate
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al buscar el vehiclo"
        )


@router.post("/get-customer-vehicles", response_model=SearchVehiclesResponse)
def get_vehicles(session: SessionDep, json: SearchCustomerVehiclesRequest) -> SearchVehiclesResponse:
    try:
        vehicles = get_customer_vehicles(session=session, json=json)
        if not vehicles:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehículos no encontrados"
            )
        vehicles_response = [
            SearchCustomerVehicleResponse(
                plate=vehicle.plate,
                type=vehicle.type
            )
            for vehicle in vehicles
        ]
        return SearchVehiclesResponse(vehicles=vehicles_response)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al buscar los vehículos: {str(e)}"
        )


@router.delete("/delete-vehicle", response_model=Message)
def delete_vehicle(session: SessionDep, json: DeleteVehicleRequest) -> Message:
    try:
        if delete_customer_vehicle(session=session, json=json):
            return Message(message="Vehiculo eliminado correctamente")
        return Message(message="El vehiculo no ha sido eliminado")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehículo no encontrado"
        )

# ------------------------- Employee Actions ------------------------- #

@router.post("/get-all-customers-vehicles", response_model=SearchAllCustomersVehiclesResponse)
def get_all_customer_vehicles(session: SessionDep, json: SearchAllCustomersVehiclesRequest) -> SearchAllCustomersVehiclesResponse:
    try:
        return get_all_customer_vehicles_crud(session=session, json=json)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al buscar los vehículos: {str(e)}"
        )


@router.post("/get-vehicle-by-plate-entry", response_model=SearchRegistrationByPlateResponse)
def get_vehicle_by_plate_entry(session: SessionDep, json: SearchRegistrationByPlateRequest) -> SearchRegistrationByPlateResponse:
    try:
        return get_registrations_by_plate_entry_crud(session=session, json=json)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al buscar el vehículo: {str(e)}"
        )

"""
@router.post("/get-vehicle-by-plate-exit", response_model=SearchRegistrationByPlateResponse)
def get_vehicle_by_plate_entry(session: SessionDep, json: SearchRegistrationByPlateRequest) -> SearchRegistrationByPlateResponse:
    try:
        return get_registrations_by_plate_exit_crud(session=session, json=json)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al buscar el vehículo: {str(e)}"
        )
"""

@router.post("/get-occupation-report", response_model=SearchOccupationReportResponse)
def get_occupation_report(session: SessionDep, json: SearchOccupationReportRequest) -> SearchOccupationReportResponse:
    try:
        return get_occupation_report_crud(session=session, json=json)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al obtener el reporte"
        )
