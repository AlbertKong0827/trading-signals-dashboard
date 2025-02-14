from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from typing import List
from sqlalchemy.orm import Session
from src.app.models.schemas import TradingSignalSchema
from src.app.repositories.trading_signal import create_trading_signal, get_trading_signals, generate_trading_signal
from ..routes.websocket import connect, disconnect
from ..models.database import get_db

import subprocess
import json

router = APIRouter()

@router.post("/generate-signal/")
async def generate_signal(ticker: str, db: Session = Depends(get_db)):
    return await generate_trading_signal(ticker, db)

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except:
        disconnect(websocket)

@router.post("/trading-signal/")
async def create_signal(signal: TradingSignalSchema, db: Session = Depends(get_db)):
    return await create_trading_signal(signal_data=signal, db=db)

@router.get("/trading-signals/")
async def get_signals(db: Session = Depends(get_db)):
    return await get_trading_signals(db=db)
