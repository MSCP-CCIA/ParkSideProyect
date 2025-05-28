from fastapi import APIRouter
from app.crud.paymentCrud import *
from app.api.deps import SessionDep

router = APIRouter(prefix="/payment", tags=["payment"])

"""
@router.post("/", response_model=PaymentPublic)
def process_payment(payment_in: PaymentCreate, session: SessionDep):
    return crud.create_payment(session=session, payment_in=payment_in)

@router.get("/parking/{parking_registration_id}", response_model=List[PaymentPublic])
def get_payments_for_parking(parking_registration_id: int, session: SessionDep):
    payments = crud.get_payments_by_parking(session=session, parking_registration_id=parking_registration_id)
    if not payments:
        raise HTTPException(status_code=404, detail="No payments found for this parking lot")
    return payments

@router.get("/{payment_id}", response_model=PaymentPublic)
def get_payment_by_id(payment_id: int, session: SessionDep):
    payment = crud.get_payment_by_id(session=session, payment_id=payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment
"""

@router.post("/get-payment-report", response_model=SearchPaymentReportResponse)
def get_payment_report(session: SessionDep, request: SearchPaymentReportRequest) -> SearchPaymentReportResponse:
    try:
        return get_payment_report_crud(session=session, request=request)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al obtener el reporte: {str(e)}"
        )

