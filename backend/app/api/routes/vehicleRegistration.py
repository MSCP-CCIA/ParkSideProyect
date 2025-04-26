from typing import List

from fastapi import FastAPI, HTTPException, status, APIRouter

from app.models.message import Message
from app.models.vehicle import (RegisterVehicleRequest, SearchVehicleRequest, SearchVehicleResponse,
                                SearchVehiclesRequest, SearchVehiclesResponse)
from app.crud.vehicleCrud import *
from app.api.deps import SessionDep

router = APIRouter(prefix="/vehicle", tags=["vehicleRegistration"])


@router.post("/register-vehicle/", response_model=Message)
def register_vehicle(session: SessionDep, registerVehicleRequest: RegisterVehicleRequest) -> Message:
    try:
        create_vehicle(session=session, registerVehicleRequest=registerVehicleRequest)
        return Message(message="Registro de vehículo exitoso")
    except Exception as e:
        # Cualquier otro error se considera un error interno
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al registrar el vehículo"
        )


@router.post("/{customer}/get-vehicle-{plate}", response_model=SearchVehicleResponse)
def get_vehicle(session: SessionDep, searchVehicleRequest: SearchVehicleRequest) -> SearchVehicleResponse:
    try:
        vehicle = get_customer_vehicle(session=session, searchVehicleRequest=searchVehicleRequest)
        if not vehicle:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cliente o vehículo no encontrado"
            )
        return SearchVehicleResponse(
            type = vehicle.type,
            plate = vehicle.plate
        )
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al buscar el vehiclo"
        )


@router.post("/{customer_id}/get-vehicles", response_model=SearchVehiclesResponse)
def get_vehicles(session: SessionDep, searchVehiclesRequest: SearchVehiclesRequest) -> SearchVehiclesResponse:
    try:
        vehicles = get_customer_vehicles(session=session, searchVehiclesRequest=searchVehiclesRequest)
        if not vehicles:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Cliente o vehículos no encontrados"
            )
        vehicles_response = [
            SearchVehicleResponse(
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


@router.delete("/{customer_id}/delete-vehicle-{plate}", response_model=Message)
def delete_vehicle(session: SessionDep, deleteVehicleRequest: DeleteVehicleRequest):
    try:
        if delete_customer_vehicle(session=session, deleteVehicleRequest=deleteVehicleRequest):
            return Message(message="Vehiculo eliminado correctamente")
        return Message(message="El vehiculo no ha sido eliminado")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehículo no encontrado"
        )

