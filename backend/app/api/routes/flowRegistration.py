from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, timedelta

app = FastAPI()

# Base de datos ficticia
fake_db = {"vehicles": {}, "logs": []}

# Modelos
class Vehicle(BaseModel):
    plate: str
    owner: str
    vehicle_type: str

class EntryLog(BaseModel):
    plate: str
    entry_time: datetime

class ExitLog(BaseModel):
    plate: str
    exit_time: datetime
    fee: float

# Helpers
RATE_PER_HOUR = 5.0

def calculate_fee(entry_time: datetime, exit_time: datetime) -> float:
    duration = exit_time - entry_time
    hours = duration.total_seconds() / 3600
    return round(hours * RATE_PER_HOUR, 2)

# Endpoints

@app.post("/entry")
def vehicle_entry(entry_log: EntryLog):
    if entry_log.plate not in fake_db["vehicles"]:
        raise HTTPException(status_code=404, detail="Vehicle not registered")
    fake_db["logs"].append(entry_log.dict())
    return {"msg": "Entry recorded", "entry_time": entry_log.entry_time}

@app.post("/exit")
def vehicle_exit(plate: str):
    entry_log = next((log for log in fake_db["logs"] if log["plate"] == plate), None)
    if not entry_log:
        raise HTTPException(status_code=404, detail="No entry record found")
    exit_time = datetime.utcnow()
    fee = calculate_fee(entry_log["entry_time"], exit_time)
    fake_db["logs"].remove(entry_log)
    return ExitLog(plate=plate, exit_time=exit_time, fee=fee)

@app.get("/vehicles", response_model=List[Vehicle])

def list_vehicles():
    return list(fake_db["vehicles"].values())

@app.get("/logs", response_model=List[EntryLog])

def list_logs():
    return fake_db["logs"]
