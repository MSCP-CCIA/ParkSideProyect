from fastapi import APIRouter, FastAPI, UploadFile, File, HTTPException
from MLmodels.Inference.ocr_processor import Service
import httpx
import shutil
import os
from MLmodels.Utils.message import Message
from MLmodels.app.websocket.connection_manager import manager


router = APIRouter()

UPLOAD_DIR = "temp_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/extract-plate",response_model=Message)
async def extract_plate(file: UploadFile = File(...),)-> Message:
    try:
        temp_path = f"temp_{file.filename}"
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        result = Service(temp_path)
        os.remove(temp_path)

        if result:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "http://localhost:8000/api/v1/flow/entry-register/",
                    json={"plate": result},
                )
            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=f"Error al registrar la placa: {response.text}"
                )
            return Message(message="Placa enviada exitosamente")
        else:
            await manager.send_alert("Placa no reconocida. Operador requerido")
            raise HTTPException(status_code=422, detail="No se pudo reconocer la placa")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))