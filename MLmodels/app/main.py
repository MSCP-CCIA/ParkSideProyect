from fastapi import FastAPI
from MLmodels.app.api.routes.ExtractPlate import router

app = FastAPI()

app.include_router(router)