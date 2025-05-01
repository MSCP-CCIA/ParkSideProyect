from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.models.card import *
from app.api.deps import transform_card_create_model, transform_card_update_model


def create_card(*, session: Session, json: CreateCardRequest1) -> Card:
    try:
        json = transform_card_create_model(json)
        db_obj = Card.model_validate(
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
            detail=f"Error al crear la tarjeta: {str(e)}"
        )


def get_card_crud(*, session: Session, json: SearchCardRequest) -> Card:
    try:
        statement = select(Card).where(
            (Card.card_number_hash == json.card_number_hash) &
            (Card.customer_id == json.customer_id)
        )
        card = session.exec(statement).first()
        if not card:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tarjeta no encontrada"
            )
        return card
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener la tarjeta: {str(e)}"
        )


def get_cards_crud(*, session: Session, json: SearchCardsRequest) -> List[Card]:
    try:
        statement = select(Card).where(Card.customer_id == json.customer_id)
        cards = session.exec(statement).all()
        if not cards:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontraron tarjetas para este cliente"
            )
        return cards
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener las tarjetas: {str(e)}"
        )


def update_card_crud(*, session: Session, json: UpdateCardRequest) -> Card:
    try:
        json = transform_card_update_model(json)
        statement = select(Card).where(
            (Card.card_number_hash == json.card_number_hash) &
            (Card.customer_id == json.customer_id)
        )
        card = session.exec(statement).first()
        if not card:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tarjeta no encontrada"
            )
        update_data = json.model_dump(exclude_unset=True, exclude={"card_number", "customer_id"})
        for field, value in update_data.items():
            setattr(card, field, value)
        session.add(card)
        session.commit()
        session.refresh(card)
        return card
    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al actualizar la tarjeta: {str(e)}"
        )


def delete_card_crud(*, session: Session, json: DeleteCardRequest) -> bool:
    try:
        statement = select(Card).where(
            (Card.card_number_hash == json.card_number_hash) &
            (Card.customer_id == json.customer_id)
        )
        card = session.exec(statement).first()
        if not card:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tarjeta no encontrada para eliminar"
            )
        session.delete(card)
        session.commit()
        return True
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al eliminar la tarjeta: {str(e)}"
        )
