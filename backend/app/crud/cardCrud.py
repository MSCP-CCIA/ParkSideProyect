from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.models.card import *
from app.models.paymentGateway import *
from app.api.deps import transform_card_create_model, transform_card_update_model, transform_paymentwateway_create_model


# ------------------------- Customer Actions ------------------------- #

def create_paymentgateway(
    *, session: Session, json: CreateCardRequest
) -> PaymentGateway:
    try:

        pg_dict = transform_paymentwateway_create_model(json)
        pg_obj = PaymentGateway.model_validate(pg_dict)
        session.add(pg_obj)
        session.commit()
        session.refresh(pg_obj)

        # Generar id de Card a partir de customer_id + últimos 4 dígitos
        last_four_str = str(json.card_number)[-4:].zfill(4)
        card_id = int(f"{json.customer_id}{last_four_str}")

        card_dict = {
            "id":               card_id,
            "customer_id":      json.customer_id,
            "token":            pg_obj.token,
            "card_type":        json.card_type,
            "last_four_digits": int(last_four_str),
        }

        card_obj = Card.model_validate(card_dict)
        session.add(card_obj)
        session.commit()
        session.refresh(card_obj)

        return pg_obj

    except HTTPException:
        session.rollback()
        raise
    except Exception as e:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"No se pudo completar el registro de pasarela + tarjeta: {e}"
        )

def create_card(*, session: Session, json: CreateCardRequest) -> Card:
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
