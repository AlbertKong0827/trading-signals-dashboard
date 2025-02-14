from sqlalchemy.orm import Session
from ..models.trading_signal import TradingSignal, AgentSignal
from ..models.schemas import TradingSignalSchema
from ..routes.websocket import send_trading_signal_to_clients  # Import WebSocket broadcaster
from ..models.database import get_db
from fastapi import Depends
import os
import subprocess
import json

async def generate_trading_signal(ticker:str, db: Session = Depends(get_db)):
    """Runs AI system to generate a trading signal for the given ticker."""
    print(f"Received request: {ticker}")
    try:
        # Run the AI system
        subprocess.run(
            ["poetry", "run", "python", "src/main.py", "--ticker", ticker],
            capture_output=True,
            text=True,
            check=True
        )

        # Path to AI output JSON file
        json_path = f"src/data/model_output/trade_signal_{ticker}.json"

        # Ensure the file exists
        if not os.path.exists(json_path):
            return {"error": "AI system did not generate expected JSON output"}

        # Load the AI output JSON file
        with open(json_path, "r") as f:
            ai_data = json.load(f)

        # Validate and store in the database
        trading_signal = TradingSignalSchema(**ai_data)
        new_signal = await create_trading_signal(trading_signal,db)


        # Push update to WebSockets
        await send_trading_signal_to_clients(ai_data)

        return {"message": "Trading signal generated", "signal_id": new_signal.id, "data": ai_data}

    except subprocess.CalledProcessError as e:
        return {"error": f"AI system failed: {e.stderr}"}
    except json.JSONDecodeError:
        return {"error": "AI output file is not valid JSON"}

async def create_trading_signal(signal_data: TradingSignalSchema, db: Session = Depends(get_db)):
    db_signal = TradingSignal(
        action=signal_data.action,
        quantity=signal_data.quantity,
        confidence=signal_data.confidence,
        reasoning=signal_data.reasoning
    )
    db.add(db_signal)
    db.commit()
    db.refresh(db_signal)

    for agent in signal_data.agent_signals:
        db_agent_signal = AgentSignal(
            trading_signal_id=db_signal.id,
            agent=agent.agent,
            signal=agent.signal,
            confidence=agent.confidence
        )
        db.add(db_agent_signal)
    
    db.commit()

    # Broadcast the new signal to WebSocket clients
    signal_json = {
        "action": db_signal.action,
        "confidence": db_signal.confidence,
        "reasoning": db_signal.reasoning,
        "agent_signals": [
            {"agent": a.agent, "signal": a.signal, "confidence": a.confidence}
            for a in db_signal.agent_signals
        ]
    }
    import asyncio
    asyncio.create_task(send_trading_signal_to_clients(signal_json))  # Push update to WebSockets
    await send_trading_signal_to_clients(signal_json)


    return db_signal

async def get_trading_signals(db: Session):
    return db.query(TradingSignal).all()