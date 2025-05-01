from fastapi import HTTPException, status
from sqlmodel import Session, select
from app.models.card import *
from app.api.deps import transform_card_create_model
from app.core.security import encrypt_value


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


def get_card(*, session: Session, json: SearchCardRequest) -> Card:
    try:
        statement = select(Card).where(
            (Card.card_number_hash == encrypt_value(str(json.card_number))) & (Card.customer_id == json.customer_id)
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


def get_cards(*, session: Session, json: SearchCardsRequest) -> List[Card]:
    try:
        statement = select(Card).where(Card.customer_id == json.customer_id)
        vehicles = session.exec(statement).all()
        if not vehicles:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontraron vehículos para este cliente"
            )
        return vehicles
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener los vehículos: {str(e)}"
        )

"""
def delete_customer_vehicle(*, session: Session, json: DeleteVehicleRequest) -> bool:
    try:
        statement = select(Vehicle).where(
            (Vehicle.plate == json.plate) & (Vehicle.customer_id == json.customer_id)
        )
        vehicle = session.exec(statement).first()
        if not vehicle:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehículo no encontrado para eliminar"
            )
        session.delete(vehicle)
        session.commit()
        return True
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al eliminar el vehículo: {str(e)}"
        )
"""
