from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class TradingSignal(Base):
    __tablename__ = "trading_signals"

    id = Column(Integer, primary_key=True, index=True)
    action = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    confidence = Column(Float, nullable=False)
    reasoning = Column(String, nullable=False)

    # Relationship with Agent Signals
    agent_signals = relationship("AgentSignal", back_populates="trading_signal")

class AgentSignal(Base):
    __tablename__ = "agent_signals"

    id = Column(Integer, primary_key=True, index=True)
    trading_signal_id = Column(Integer, ForeignKey("trading_signals.id"))
    agent = Column(String, nullable=False)
    signal = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)

    trading_signal = relationship("TradingSignal", back_populates="agent_signals")