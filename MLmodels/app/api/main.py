from fastapi import FastAPI
from routes import ExtractPlate

app = FastAPI()

app.include_router(ExtractPlate.router)