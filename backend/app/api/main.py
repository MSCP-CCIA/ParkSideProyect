from fastapi import APIRouter

from app.api.routes import (vehicleRegistration,
                            flowRegistration,
                            cardManage,
                            customer,
                            historicalRate,
                            parkingManage,
                            employee,
                            payment)

api_router = APIRouter()
api_router.include_router(employee.router)
api_router.include_router(customer.router)
api_router.include_router(vehicleRegistration.router)
api_router.include_router(flowRegistration.router)
api_router.include_router(cardManage.router)
api_router.include_router(payment.router)
api_router.include_router(historicalRate.router)
api_router.include_router(parkingManage.router)
