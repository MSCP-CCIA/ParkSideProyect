from fastapi import APIRouter, FastAPI, UploadFile, File, HTTPException
from MLmodels.Inference.ocr_processor import Service
import shutil
import os


router = APIRouter()



UPLOAD_DIR = "temp_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/extract-plate")
async def extract_plate(file: UploadFile = File(...)):
    try:
        temp_path = f"temp_{file.filename}"
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        result = Service(temp_path)
        os.remove(temp_path)

        if result:
            return {"plate": result}
        else:
            raise HTTPException(status_code=422, detail="No se pudo reconocer la placa")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))