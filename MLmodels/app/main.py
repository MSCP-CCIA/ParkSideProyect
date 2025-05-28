from fastapi import FastAPI
from MLmodels.app.api.routes.ExtractPlate import router
from MLmodels.app.websocket.Ws_alert import ws_router

app = FastAPI()

app.include_router(router)
app.include_router(ws_router)