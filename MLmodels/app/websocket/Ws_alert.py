from fastapi import APIRouter, WebSocket
from MLmodels.app.websocket.connection_manager import manager

ws_router = APIRouter()

@ws_router.websocket("/ws/alerts")
async def websocket_alerts(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except:
        manager.disconnect(websocket)
