from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from datetime import datetime

app = FastAPI()
# Base de datos ficticia para la API de gestión
parking_db = {}

class ParkingLot(BaseModel):
    id: str
    name: str
    capacity: int
    location: str

@app.post("/create-parking")
def create_parking(parking: ParkingLot):
    if parking.id in parking_db:
        raise HTTPException(status_code=400, detail="Parking lot already exists")
    parking_db[parking.id] = parking.dict()
    return {"msg": "Parking lot created successfully"}

@app.get("/parkings", response_model=List[ParkingLot])
def list_parkings():
    return list(parking_db.values())

@app.get("/parking/{parking_id}")
def get_parking(parking_id: str):
    parking = parking_db.get(parking_id)
    if not parking:
        raise HTTPException(status_code=404, detail="Parking lot not found")
    return parking

@app.delete("/delete-parking/{parking_id}")
def delete_parking(parking_id: str):
    if parking_id not in parking_db:
        raise HTTPException(status_code=404, detail="Parking lot not found")
    del parking_db[parking_id]
    return {"msg": "Parking lot deleted successfully"}