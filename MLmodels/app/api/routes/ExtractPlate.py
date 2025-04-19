from urllib.request import Request
from fastapi import APIRouter, FastAPI
from MLmodels.Inference.ocr_processor import Service
import shutil
import os
from fastapi.responses import JSONResponse

router = APIRouter()
app = FastAPI()


UPLOAD_DIR = "temp_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/extract-plate")
async def extract_plate(request: Request):
    Service()