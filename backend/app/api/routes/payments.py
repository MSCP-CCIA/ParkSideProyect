from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.responses import RedirectResponse
from app.services import mercadopago as mp
from app.core.config import settings
from app import crud, models, schemas

router = APIRouter()

@router.post("/pay/{order_id}", status_code=303)
def pay_order(order_id: int, db=Depends(crud.get_db)):
    order = crud.orders.get(db, id=order_id)
    if not order:
        raise HTTPException(404, "Order not found")
    preference_url = mp.create_preference(order)
    return RedirectResponse(preference_url)

@router.post("/webhook/mp")
async def mp_webhook(request: Request, token: str):
    if token != settings.MP_WEBHOOK_SECRET:
        raise HTTPException(status_code=401, detail="Invalid token")
    body = await request.json()
    if body.get("type") == "payment":
        payment = mp.get_payment(body["data"]["id"])
        crud.orders.update_status_from_mp(request.app.state.db, payment)
    return {"status": "ok"}
