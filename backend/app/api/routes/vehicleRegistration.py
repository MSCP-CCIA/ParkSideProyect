from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict

app = FastAPI()

# Base de datos ficticia para vehículos
vehicle_db: Dict[str, Dict[str, Dict]] = {}

class Vehicle(BaseModel):
    plate: str
    owner: str
    vehicle_type: str

@app.post("/register-vehicle/{parking_id}")
def register_vehicle(parking_id: str, vehicle: Vehicle):
    if parking_id not in vehicle_db:
        vehicle_db[parking_id] = {}
    if vehicle.plate in vehicle_db[parking_id]:
        raise HTTPException(status_code=400, detail="Vehicle already registered")
    vehicle_db[parking_id][vehicle.plate] = vehicle.dict()
    return {"msg": "Vehicle registered successfully", "parking_id": parking_id, "vehicle": vehicle}

@app.get("/get-vehicle/{parking_id}/{plate}")
def get_vehicle(parking_id: str, plate: str):
    if parking_id not in vehicle_db or plate not in vehicle_db[parking_id]:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle_db[parking_id][plate]

@app.get("/vehicles/{parking_id}")
def list_vehicles(parking_id: str):
    if parking_id not in vehicle_db:
        raise HTTPException(status_code=404, detail="No vehicles found for this parking lot")
    return vehicle_db[parking_id]

@app.delete("/delete-vehicle/{parking_id}/{plate}")
def delete_vehicle(parking_id: str, plate: str):
    if parking_id not in vehicle_db or plate not in vehicle_db[parking_id]:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    del vehicle_db[parking_id][plate]
    return {"msg": "Vehicle deleted successfully", "parking_id": parking_id, "plate": plate}