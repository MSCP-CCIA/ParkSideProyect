from fastapi import FastAPI, UploadFile, File, HTTPException
"""
from models.schemas import PlateDetection, PlateRecognition, ParkingRecord
from services.detection import detect_movement, detect_plate
from services.ocr import recognize_plate
from db.crud import check_plate, create_parking_record, update_exit_time
"""

app = FastAPI()

# Ruta para detectar movimiento y verificar si hay una placa
@app.post("/detect-movement")
async def detect_movement_endpoint(file: UploadFile = File(...)):
    file_readed = await file.read()
    return file_readed

# Ruta para reconocer el texto de la placa
@app.post("/recognize-plate")
async def recognize_plate_endpoint(file: UploadFile = File(...)):
    cropped_plate = await file.read()
    return cropped_plate

# Ruta para validar si la placa está registrada
@app.get("/validate-plate")
async def validate_plate(plate: str):
    plate_data = "La placa", plate, "no está registrada"
    return plate_data

# Ruta para crear un registro de parqueo
@app.post("/create-parking-record")
async def create_parking_record_endpoint(record: str):
    record_id = "INSERT INTO ... VALUES ...", record
    return record

# Ruta para registrar la salida del vehículo
@app.put("/exit-parking")
async def exit_parking(record_id: str, timestamp: str):
    success = "UPDATE ... SET", timestamp, "WHERE ...", record_id
    return success

"""
# Ruta para detectar movimiento y verificar si hay una placa
@app.post("/detect-movement")
async def detect_movement_endpoint(file: UploadFile = File(...)):
    frame = await file.read()@app.post("/detect-movement")
async def detect_movement_endpoint(file: UploadFile = File(...)):
    frame = await file.read()
    movement_detected, plate_img = detect_movement(frame)
    
    if movement_detected:
        if plate_img is not None:
            return {"movement_detected": True, "plate_detected": True}
        else:
            return {"movement_detected": True, "plate_detected": False}
    else:
        return {"movement_detected": False}

# Ruta para reconocer el texto de la placa
@app.post("/recognize-plate", response_model=PlateRecognition)
async def recognize_plate_endpoint(file: UploadFile = File(...)):
    cropped_plate = await file.read()
    plate_text = recognize_plate(cropped_plate)
    
    if plate_text:
        return {"plate_text": plate_text}
    else:
        raise HTTPException(status_code=404, detail="No se pudo reconocer la placa")

# Ruta para validar si la placa está registrada
@app.get("/validate-plate", response_model=PlateDetection)
async def validate_plate(plate: str):
    plate_data = check_plate(plate)
    
    if plate_data:
        return plate_data
    else:
        return {"plate": plate, "registered": False}

# Ruta para crear un registro de parqueo
@app.post("/create-parking-record", response_model=ParkingRecord)
async def create_parking_record_endpoint(record: ParkingRecord):
    record_id = create_parking_record(record)
    return {"record_id": record_id, "message": "Registro de parqueo creado exitosamente"}

# Ruta para registrar la salida del vehículo
@app.put("/exit-parking")
async def exit_parking(record_id: str, timestamp: str):
    success = update_exit_time(record_id, timestamp)
    if success:
        return {"message": "Salida registrada exitosamente"}
    else:
        raise HTTPException(status_code=404, detail="Registro no encontrado")
"""
