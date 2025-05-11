import mercadopago
from app.core.config import settings

sdk = mercadopago.SDK(settings.MP_ACCESS_TOKEN)

def create_preference(order) -> str:
    pref = { ... }                      # mismos campos que antes
    res  = sdk.preference().create(pref)
    return res["response"]["sandbox_init_point"]   # o init_point en producción

def get_payment(payment_id: int):
    return sdk.payment().get(payment_id)["response"]
