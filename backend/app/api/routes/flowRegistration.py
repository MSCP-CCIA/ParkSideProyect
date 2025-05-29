from fastapi import APIRouter
from app.models.message import Message
from app.crud.flowRegistrationCrud import *
from app.api.deps import SessionDep
from app.models.parkingRegistration import EntryOrUpdateVehicleRequest

router = APIRouter(prefix="/flow", tags=["flowRegistration"])

# ------------------------- ML & Employee Actions ------------------------- #

@router.post("/entry-register", response_model=Message)
def entry_register(session: SessionDep, request: EntryOrUpdateVehicleRequest | dict) -> Message:
    try:
        vehicle = get_customer_vehicle(session=session, request=request)
        if vehicle:
            if create_parking_registration(session=session,request=request):
                return Message(message="Registro de parqueo creado exitosamente")
            return Message(message="El vehículo ya está parqueado")
        return Message(message="El vehículo no existe")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al registrar la entrada al parqueadero: {e}"
        )

@router.post("/exit-register", response_model=Message)
def exit_register(session: SessionDep, request: EntryOrUpdateVehicleRequest) -> Message:
    try:
        vehicle = get_customer_vehicle(session=session, request=request)
        if vehicle:
            update_parking_registration(session=session,request=request)
            return Message(message="Actualización de parqueo realizada exitosamente")
        return Message(message="El vehículo no existe")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al actualizar el registro de parqueo: {e}"
        )



