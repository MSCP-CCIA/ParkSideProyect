from fastapi import APIRouter

from app.api.routes import vehicleRegistration, customers, cardManage, payment, login, historicalRate, parkingManage
from app.core.config import settings

api_router = APIRouter()
api_router.include_router(login.router)
api_router.include_router(payment.router)
api_router.include_router(cardManage.router)
api_router.include_router(customers.router)
api_router.include_router(vehicleRegistration.router)
api_router.include_router(historicalRate.router)
api_router.include_router(parkingManage.router)
#api_router.include_router(login.router)
#api_router.include_router(users.router)
#api_router.include_router(utils.router)
#api_router.include_router(items.router)


if settings.ENVIRONMENT == "local":
    api_router.include_router(vehicleRegistration.router)
