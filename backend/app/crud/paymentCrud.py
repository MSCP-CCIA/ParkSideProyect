from zoneinfo import ZoneInfo
from app.models.payment import *
from fastapi import HTTPException, status
from sqlmodel import Session, select, desc
from app.models.vehicle import Vehicle
from app.models.customer import Customer
from app.models.parkingRegistration import ParkingRegistration
from app.api.deps import get_parking_employee

LOCAL_ZONE = ZoneInfo("America/Bogota")

"""
def create_payment(session: Session, payment_in: PaymentCreate) -> Payment:
    db_payment = Payment.model_validate(payment_in)
    session.add(db_payment)
    session.commit()
    session.refresh(db_payment)
    return db_payment

def get_payment_by_id(session: Session, payment_id: int) -> Optional[Payment]:
    return session.get(Payment, payment_id)

def get_payments_by_parking(session: Session, parking_registration_id: int) -> List[Payment]:
    statement = select(Payment).where(Payment.parking_registration_id == parking_registration_id)
    return session.exec(statement).all()

def update_payment(session: Session, db_payment: Payment, payment_in: PaymentUpdate) -> Payment:
    update_data = payment_in.model_dump(exclude_unset=True)
    db_payment.sqlmodel_update(update_data)
    session.add(db_payment)
    session.commit()
    session.refresh(db_payment)
    return db_payment
"""

# ------------------------- Customer Actions ------------------------- #

def get_movements_history_crud(*, session: Session, request: SearchMovementsHistoryRequest) -> SearchMovementsHistoryResponse:
    try:
        statement = (select(Payment.date_approved, Vehicle.plate, Payment.transaction_amount)
                     .select_from(Payment)
                     .join(ParkingRegistration).where((Payment.parking_registration_id == ParkingRegistration.id) &
                                                      (Payment.status == "Aprobado"))
                     .join(Vehicle).where(ParkingRegistration.plate == Vehicle.plate)
                     .join(Customer).where((Vehicle.customer_id == request.customer_id))
                     .order_by(desc(Payment.date_approved)))
        db_response = session.exec(statement).all()
        if not db_response:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuario no encontrado"
            )
        response = [
            SearchMovementsHistory(
                date_approved=i.date_approved.astimezone(LOCAL_ZONE).strftime("%Y-%m-%d"),
                plate=i.plate,
                payment=i.transaction_amount
            )
            for i in db_response
        ]
        return SearchMovementsHistoryResponse(movements=response)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener el vehículo: {str(e)}"
        )

# ------------------------- Employee Actions ------------------------- #

def get_payment_report_crud(*, session: Session, request: SearchPaymentReportRequest) -> SearchPaymentReportResponse:
    try:
        parking_id = get_parking_employee(session=session, employee_id=request.employee_id)
        statement = (select(Customer.id, Customer.full_name, Payment.date_created, Payment.transaction_amount, Payment.status)
                     .select_from(Payment)
                     .join(ParkingRegistration).where(Payment.parking_registration_id == ParkingRegistration.id)
                     .join(Vehicle).where(ParkingRegistration.plate == Vehicle.plate)
                     .join(Customer).where((Vehicle.customer_id == request.customer_id) & (Customer.parking_id == parking_id))
                     .order_by(desc(Payment.date_created)))
        db_response = session.exec(statement).all()
        if not db_response:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuario no encontrado"
            )
        response = [
            SearchPaymentReport(
                customer_id=i.id,
                customer_full_name=i.full_name,
                date_created=i.date_created.astimezone(LOCAL_ZONE).strftime("%Y-%m-%d"),
                transaction_amount=i.transaction_amount,
                status=i.status
            )
            for i in db_response
        ]
        return SearchPaymentReportResponse(payment_report=response)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener el vehículo: {str(e)}"
        )
