from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict

app = FastAPI()

# Base de datos ficticia para tarifas
rate_db: Dict[str, Dict[str, float]] = {}

class Rate(BaseModel):
    vehicle_type: str
    rate_per_hour: float

@app.post("/set-rate/{parking_id}")
def set_rate(parking_id: str, rate: Rate):
    if parking_id not in rate_db:
        rate_db[parking_id] = {}
    rate_db[parking_id][rate.vehicle_type] = rate.rate_per_hour
    return {"msg": "Rate set successfully", "parking_id": parking_id, "rate": rate}

@app.get("/get-rate/{parking_id}/{vehicle_type}")
def get_rate(parking_id: str, vehicle_type: str):
    if parking_id not in rate_db or vehicle_type not in rate_db[parking_id]:
        raise HTTPException(status_code=404, detail="Rate not found")
    return {"vehicle_type": vehicle_type, "rate_per_hour": rate_db[parking_id][vehicle_type]}

@app.get("/rates/{parking_id}")
def list_rates(parking_id: str):
    if parking_id not in rate_db:
        raise HTTPException(status_code=404, detail="No rates found for this parking lot")
    return rate_db[parking_id]

@app.delete("/delete-rate/{parking_id}/{vehicle_type}")
def delete_rate(parking_id: str, vehicle_type: str):
    if parking_id not in rate_db or vehicle_type not in rate_db[parking_id]:
        raise HTTPException(status_code=404, detail="Rate not found")
    del rate_db[parking_id][vehicle_type]
    return {"msg": "Rate deleted successfully", "parking_id": parking_id, "vehicle_type": vehicle_type}