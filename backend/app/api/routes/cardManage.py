from fastapi import APIRouter
from app.models.message import Message
from app.crud.cardCrud import *
from app.api.deps import SessionDep
from app.core.security import encrypt_value, decrypt_value

router = APIRouter(prefix="/cards", tags=["cards"])


@router.post("/register-card/", response_model=Message)
def register_vehicle(session: SessionDep, json: CreateCardRequest) -> Message:
    try:
        create_card(session=session, json=json)
        return Message(message="Registro de tarjeta exitoso")
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al registrar la tarjeta"
        )


@router.post("/get-card", response_model=SearchCardResponse)
def get_card(session: SessionDep, json: SearchCardRequest) -> SearchCardResponse:
    try:
        card = get_card(session=session, json=json)
        if not card:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tarjeta no encontrada"
            )
        return SearchCardResponse(
            card_number=int(decrypt_value(card.card_number_hash)),
            full_name_customer=card.full_name_customer,
            month=card.expiration_date.month,
            year=card.expiration_date.year
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al buscar el vehiclo"
        )


@router.post("/get-cards", response_model=SearchCardsResponse)
def get_cards(session: SessionDep, json: SearchCardsRequest) -> SearchCardsResponse:
    try:
        vehicles = get_customer_vehicles(session=session, json=json)
        if not vehicles:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehículos no encontrados"
            )
        vehicles_response = [
            SearchVehicleResponse(
                plate=vehicle.plate,
                type=vehicle.type
            )
            for vehicle in vehicles
        ]
        return SearchCardsResponse(vehicles=vehicles_response)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al buscar los vehículos: {str(e)}"
        )

"""
@router.delete("/delete-vehicle-{plate}", response_model=Message)
def delete_vehicle(session: SessionDep, json: DeleteVehicleRequest):
    try:
        if delete_customer_vehicle(session=session, json=json):
            return Message(message="Vehiculo eliminado correctamente")
        return Message(message="El vehiculo no ha sido eliminado")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vehículo no encontrado"
        )
"""