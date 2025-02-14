from typing import List
from fastapi import WebSocket

active_connections: List[WebSocket] = []

async def connect(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)

def disconnect(websocket: WebSocket):
    active_connections.remove(websocket)

async def send_trading_signal_to_clients(signal_data):
    for connection in active_connections:
        await connection.send_json(signal_data)