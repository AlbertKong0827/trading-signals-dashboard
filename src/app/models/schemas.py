from pydantic import BaseModel
from typing import List

class AgentSignalSchema(BaseModel):
    agent: str
    signal: str
    confidence: float

class TradingSignalSchema(BaseModel):
    action: str
    quantity: int
    confidence: float
    agent_signals: List[AgentSignalSchema]
    reasoning: str

    class Config:
        orm_mode = True  # Allows conversion from SQLAlchemy models