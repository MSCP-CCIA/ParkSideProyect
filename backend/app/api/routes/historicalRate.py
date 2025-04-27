from fastapi import APIRouter
from app.models.message import Message
from app.crud.historicalRateCrud import *
from app.api.deps import SessionDep

router = APIRouter(prefix="/historicalRate", tags=["historicalRate"])


@router.post("/register-rate/", response_model=Message)
def register_rate(session: SessionDep, json: CreateHistoricalRateRequest) -> Message:
    try:
        create_rate(session=session, json=json)
        return Message(message="Registro de tarifa exitoso")
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al registrar la tarifa"
        )


@router.post("/{date}", response_model=SearchHistoricalRateResponse)
def get_vehicle(session: SessionDep, json: SearchHistoricalRateRequest) -> SearchHistoricalRateResponse:
    try:
        historicalRate = get_historical_rate_per_date(session=session, json=json)
        if not historicalRate:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Registro de tarifa no encontrado"
            )
        return SearchHistoricalRateResponse(
            car_rate=historicalRate.car_rate,
            motorbike_rate=historicalRate.motorbike_rate,
            start_date=historicalRate.start_date,
            end_date=historicalRate.end_date,
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="Error inesperado al buscar el registro de tarifa"
        )


@router.post("", response_model=SearchHistoricalRatesResponse)
def get_vehicles(session: SessionDep, json: SearchHistoricalRatesRequest) -> SearchHistoricalRatesResponse:
    try:
        historicalRates = get_historical_rates(session=session, json=json)
        if not historicalRates:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Historico de tarifas no encontrado"
            )
        historicalRates_response = [
            SearchHistoricalRateResponse(
                car_rate=historicalRate.car_rate,
                motorbike_rate=historicalRate.motorbike_rate,
                start_date=historicalRate.start_date,
                end_date=historicalRate.end_date,
            )
            for historicalRate in historicalRates
        ]
        return SearchHistoricalRatesResponse(historicalRates=historicalRates_response)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al buscar los vehículos: {str(e)}"
        )