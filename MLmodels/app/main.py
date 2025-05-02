from fastapi import FastAPI
from app.api.routes.ExtractPlate import router

app = FastAPI()

app.include_router(router)