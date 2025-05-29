from fastapi import APIRouter
from app.crud.paymentCrud import *
from app.api.deps import SessionDep

router = APIRouter(prefix="/payment", tags=["payment"])

# ------------------------- Customer Actions ------------------------- #

@router.post("/get-movements-history", response_model=SearchMovementsHistoryResponse)
def get_movements_history(session: SessionDep, request: SearchMovementsHistoryRequest) -> SearchMovementsHistoryResponse:
    try:
        return get_movements_history_crud(session=session, request=request)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al obtener el historial de movimientos: {str(e)}"
        )

# ------------------------- Employee Actions ------------------------- #

@router.post("/get-payment-report", response_model=SearchPaymentReportResponse)
def get_payment_report(session: SessionDep, request: SearchPaymentReportRequest) -> SearchPaymentReportResponse:
    try:
        return get_payment_report_crud(session=session, request=request)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al obtener el reporte: {str(e)}"
        )

