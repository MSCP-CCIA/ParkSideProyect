from fastapi import APIRouter
from app.models.message import Message
from app.crud.flowRegistrationCrud import *
from app.api.deps import SessionDep
from app.models.parkingRegistration import EntryOrUpdateVehicleRequest

router = APIRouter(prefix="/flow", tags=["flowRegistration"])

# ------------------------- ML Actions ------------------------- #

@router.post("/entry-register/", response_model=Message)
def entry_register(session: SessionDep, json: EntryOrUpdateVehicleRequest | dict) -> Message:
    try:
        vehicle = get_customer_vehicle(session=session, json=json)
        if vehicle:
            if create_parking_registration(session=session,json=json):
                return Message(message="Registro de parqueo creado exitosamente")
            return Message(message="El vehículo ya está parqueado")
        return Message(message="El vehículo no existe")
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al registrar la entrada al parqueadero"
        )

@router.post("/exit-register/", response_model=Message)
def exit_register(session: SessionDep, json: EntryOrUpdateVehicleRequest) -> Message:
    try:
        vehicle = get_customer_vehicle(session=session, json=json)
        if vehicle:
            update_parking_registration(session=session,json=json)
            return Message(message="Actualización de parqueo realizada exitosamente")
        return Message(message="El vehículo no existe")
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al actualizar el registro de parqueo"
        )



