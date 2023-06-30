from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, Float, DateTime, Numeric, BigInteger
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import relationship
import datetime as dt

from src.database.database import Base


class Currency(Base):
    __tablename__ = 'currencies'

    id = Column(Integer, primary_key=True)
    name = Column(String(55), nullable=False)
    type = Column(String(55), nullable=False)

    def __init__(self, **kwds):
        self.__dict__.update(kwds)


class Rate(Base):
    __tablename__ = 'rates'

    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime, default=dt.datetime.utcnow)
    base = Column(String(3), nullable=False)
    currency_id = Column(Integer, ForeignKey('currencies.id'))
    rate = Column(Float, nullable=False)

    currency = relationship('Currency')

    def __init__(self, **kwds):
        self.__dict__.update(kwds)

    def __str__(self):
        return f"Rate: timestamp={self.timestamp}, base={self.base}, currency_id={self.currency_id}, rate={self.rate}"
