from fastapi import HTTPException, status
from sqlmodel import Session, select, desc
from app.models.historicalRate import *
from app.api.deps import get_parking_employee

# ------------------------- Employee Actions ------------------------- #

def create_rate(*, session: Session, json: CreateHistoricalRateRequest) -> HistoricalRate:
    try:
        parking_id = get_parking_employee(session=session, employee_id=json.employee_id)
        statement = select(HistoricalRate).where(
            (HistoricalRate.parking_id == parking_id) &
            (HistoricalRate.end_date == None)
        ).order_by(desc(HistoricalRate.start_date))

        previous_rate = session.exec(statement).first()
        if previous_rate:
            if previous_rate.start_date < json.start_date:
                previous_rate.end_date = json.start_date
                session.add(previous_rate)
            else:
                raise HTTPException(
                    status_code=400,
                    detail="La fecha de las nuevas tarifas debe ser mayor a la fecha de inicio de las últimas tarifas."
                )

        db_obj = HistoricalRate.model_validate(
            CreateHistoricalRate(
                car_rate=json.car_rate,
                motorbike_rate=json.motorbike_rate,
                start_date=json.start_date,
                parking_id=parking_id
            )
        )
        session.add(db_obj)
        session.commit()
        session.refresh(db_obj)
        return db_obj
    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al crear la tarifa: {str(e)}"
        )


def get_historical_rate_per_date(*, session: Session, json: SearchHistoricalRateRequest) -> HistoricalRate:
    try:
        parking_id = get_parking_employee(session=session, employee_id=json.employee_id)
        statement = select(HistoricalRate).where(
            (HistoricalRate.parking_id == parking_id) & (HistoricalRate.start_date == json.start_date)
        )
        historicalRate = session.exec(statement).first()
        if not historicalRate:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tarifa histórica no encontrada"
            )
        return historicalRate
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener la tafifa histórica: {str(e)}"
        )


def get_historical_rates(*, session: Session, json: SearchHistoricalRatesRequest) -> List[HistoricalRate]:
    try:
        parking_id = get_parking_employee(session=session, employee_id=json.employee_id)
        statement = (select(HistoricalRate)
                     .where(HistoricalRate.parking_id == parking_id)
                     .order_by(desc(HistoricalRate.start_date)))
        historicalRates = session.exec(statement).all()
        if not historicalRates:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No se encontraron tarifas para este parqueadero"
            )
        return historicalRates
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener las tarifas: {str(e)}"
        )