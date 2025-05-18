from fastapi import APIRouter
from app.models.message import Message
from app.crud.cardCrud import *
from app.api.deps import SessionDep

router = APIRouter(prefix="/cards", tags=["cards"])

# ------------------------- Customer Actions ------------------------- #

@router.post("/register-card/", response_model=Message)
def register_card(session: SessionDep, json: CreateCardRequest1) -> Message:
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
        card = get_card_crud(session=session, json=json)
        if not card:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tarjeta no encontrada"
            )
        return SearchCardResponse(
            card_number_hash=card.card_number_hash,
            full_name_customer=card.full_name_customer,
            month=card.expiration_date.month,
            year=card.expiration_date.year
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al buscar la tarjeta"
        )


@router.post("/get-cards", response_model=SearchCardsResponse)
def get_cards(session: SessionDep, json: SearchCardsRequest) -> SearchCardsResponse:
    try:
        cards = get_cards_crud(session=session, json=json)
        if not cards:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tarjetas no encontradas"
            )
        cards_response = [
            SearchCardResponse(
                card_number_hash=card.card_number_hash,
                full_name_customer=card.full_name_customer,
                month=card.expiration_date.month,
                year=card.expiration_date.year
            )
            for card in cards
        ]
        return SearchCardsResponse(cards=cards_response)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al buscar las tarjetas: {str(e)}"
        )


@router.post("/update-card/", response_model=Message)
def update_card(session: SessionDep, json: UpdateCardRequest) -> Message:
    try:
        update_card_crud(session=session, json=json)
        return Message(message="Actualización de tarjeta exitosa")
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al actualizar la tarjeta"
        )


@router.delete("/delete-card", response_model=Message)
def delete_card(session: SessionDep, json: DeleteCardRequest):
    try:
        if delete_card_crud(session=session, json=json):
            return Message(message="Tarjeta eliminada correctamente")
        return Message(message="La tarjeta no ha sido eliminada")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tarjeta no encontrada"
        )
