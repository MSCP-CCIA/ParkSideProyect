from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.models.card import *
from app.models.paymentGateway import *
from app.api.deps import (transform_card_create_model,
                          transform_paymentwateway_create_model,
                          transform_paymentwateway_update_model,
                          generate_card_id)


# ------------------------- Customer Actions ------------------------- #

def create_card(*, session: Session, request: CreateCardRequest) -> Card:
    try:
        pg_dict = transform_paymentwateway_create_model(request=request)
        pg_obj = PaymentGateway.model_validate(pg_dict)

        card_dict=transform_card_create_model(request=request, token=pg_obj.token)
        card_obj = Card.model_validate(card_dict)

        session.add(pg_obj)
        session.add(card_obj)
        session.commit()
        session.refresh(pg_obj)
        session.refresh(card_obj)
        return card_obj
    except HTTPException:
        session.rollback()
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"No se pudo completar el registro de pasarela + tarjeta: {e}"
        )


def update_card_crud(*, session: Session, request: UpdateCardRequest) -> Card:
    try:
        card_id = generate_card_id(last_four_number=request.last_four_digits, customer_id=request.customer_id)
        statement_card = select(Card).where(
            (Card.id == card_id) &
            (Card.customer_id == request.customer_id)
        )
        card = session.exec(statement_card).first()
        statement_pg = select(PaymentGateway).where(
            PaymentGateway.token == card.token
        )
        pg = session.exec(statement_pg).first()

        if not card or not pg:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tarjeta no encontrada"
            )

        pg_dict = transform_paymentwateway_update_model(request=request, paymentGateway=pg)
        for field, value in pg_dict.items():
            setattr(pg, field, value)

        session.add(pg)
        session.commit()
        session.refresh(card)
        return card
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al actualizar la tarjeta: {str(e)}"
        )


def get_card_crud(*, session: Session, request: SearchCardRequest) -> tuple[Card, str, str]:
    try:
        card_id = generate_card_id(last_four_number=request.last_four_digits, customer_id=request.customer_id)
        statement = select(Card).where(
            (Card.id == card_id) &
            (Card.customer_id == request.customer_id)
        )
        card = session.exec(statement).first()
        statement_pg = select(PaymentGateway).where(
            PaymentGateway.token == card.token
        )
        pg = session.exec(statement_pg).first()

        if not card or not pg:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tarjeta no encontrada"
            )
        exp_month = pg.exp_month if pg.exp_month >= 10 else str(f"0{pg.exp_month}")
        expiration_date = f"{exp_month}/{pg.exp_year}"
        return card, expiration_date, pg.card_owner_name
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener la tarjeta: {str(e)}"
        )


def get_cards_crud(*, session: Session, request: SearchCardsRequest) -> List[Card]:
    try:
        statement = select(Card).where(Card.customer_id == request.customer_id)
        result = session.exec(statement).all()
        if not result:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontraron tarjetas para este cliente"
            )
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener las tarjetas: {str(e)}"
        )


def delete_card_crud(*, session: Session, request: DeleteCardRequest) -> bool:
    try:
        card_id = generate_card_id(last_four_number=request.last_four_digits, customer_id=request.customer_id)
        statement = select(Card).where(
            (Card.id == card_id) &
            (Card.customer_id == request.customer_id)
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
