from fastapi import APIRouter, HTTPException, status
from app.models.message import Message
from app.crud.cardCrud import *
from app.api.deps import SessionDep

router = APIRouter(prefix="/cards", tags=["cards"])

# ------------------------- Customer Actions ------------------------- #

@router.post("/register-card/", response_model=Message)
def register_card(session: SessionDep, request: CreateCardRequest) -> Message:
    try:
        create_card(session=session, request=request)
        return Message(message="Registro de tarjeta exitoso")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/get-card/", response_model=SearchCardResponse)
def get_card(session: SessionDep, request: SearchCardRequest) -> SearchCardResponse:
    try:
        card, expiration_date, full_name_customer = get_card_crud(session=session, request=request)
        if not card:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tarjeta no encontrada"
            )
        return SearchCardResponse(
            last_four_digits=card.last_four_digits,
            card_type=card.card_type,
            full_name_customer=full_name_customer,
            expiration_date=expiration_date
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al buscar la tarjeta"
        )


@router.post("/get-cards/", response_model=SearchCardsResponse)
def get_cards(session: SessionDep, request: SearchCardsRequest) -> SearchCardsResponse:
    try:
        cards = get_cards_crud(session=session, request=request)
        if not cards:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tarjetas no encontradas"
            )
        cards_response = [
            SearchCard(
                last_four_digits=card.last_four_digits,
                card_type=card.card_type
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
def update_card(session: SessionDep, request: UpdateCardRequest) -> Message:
    try:
        update_card_crud(session=session, request=request)
        return Message(message="Actualización de tarjeta exitosa")
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al actualizar la tarjeta"
        )


@router.delete("/delete-card/", response_model=Message)
def delete_card(session: SessionDep, request: DeleteCardRequest):
    try:
        if delete_card_crud(session=session, request=request):
            return Message(message="Tarjeta eliminada correctamente")
        return Message(message="La tarjeta no ha sido eliminada")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tarjeta no encontrada"
        )
