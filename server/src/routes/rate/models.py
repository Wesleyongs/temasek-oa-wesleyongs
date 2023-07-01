from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
)
import datetime as dt

from src.database.database import Base


class Currency(Base):
    __tablename__ = "currencies"

    id = Column(Integer, primary_key=True)
    name = Column(String(55), nullable=False)
    type = Column(String(55), nullable=False)

    def __init__(self, **kwds):
        self.__dict__.update(kwds)


class Rate(Base):
    __tablename__ = "rates"

    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime, default=dt.datetime.utcnow)
    base_currency = Column(String(5), nullable=False)
    target_currency = Column(String(5), nullable=False)
    rate = Column(Float, nullable=False)

    def __init__(self, **kwds):
        self.__dict__.update(kwds)

    def to_string(self):
        return f"Rate(id={self.id}, timestamp={self.timestamp}, base_currency={self.base_currency}, target_currency={self.target_currency}, rate={self.rate})"
