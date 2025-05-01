from http.client import responses
from fastapi import APIRouter
from app.models.message import Message
from app.crud.flowRegistrationCrud import *
from app.api.deps import SessionDep
from app.models.parkingRegistration import EntryVehicleRequest
import httpx

router = APIRouter(prefix="/flow", tags=["flowRegistration"])


@router.post("/entry-register/", response_model=Message)
def entry_register(session: SessionDep, json: EntryVehicleRequest) -> Message:
    try:
        vehicle = get_customer_vehicle(session=session, json=json)
        if vehicle:
            entry_datetime = datetime.utcnow()
            register = EntryVehicleResponse(
                entry_datetime=entry_datetime,
                exit_datetime=None,
                plate=json.plate
            )
            create_parking_registration(session=session,json=register)
            return Message(message="Registro de parqueo creado exitosamente")
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al registrar la entrada al parqueadero"
        )

@router.post("/exit-register/", response_model=Message)
def entry_register(session: SessionDep, json: EntryVehicleRequest) -> Message:
    try:
        vehicle = get_customer_vehicle(session=session, json=json)
        if vehicle:
            entry_datetime = datetime.utcnow()
            register = EntryVehicleResponse(
                entry_datetime=entry_datetime,
                exit_datetime=None,
                plate=json.plate
            )
            create_parking_registration(session=session,json=register)
            return Message(message="Registro de parqueo creado exitosamente")
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al registrar el vehículo"
        )



