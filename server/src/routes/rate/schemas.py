import datetime as dt
from typing import Dict, List, Optional
from enum import Enum
import time
from pydantic import BaseModel, Field, validator


class CurrencyTypes(str, Enum):
    fiat = "fiat"
    crypto = "crypto"


class Currencies(str, Enum):
    USD = "USD"
    SGD = "SGD"
    EUR = "EUR"
    BTC = "BTC"
    DOGE = "DOGE"
    ETH = "ETH"


#  Payloads


class HistoricalRatesParams(BaseModel):
    start_timestamp: int = Field(1685577600000, le=9 * 10**13)
    end_timestamp: int = int(time.time() * 1000)
    base_currency: Currencies = "USD"
    target_currency: Currencies = "BTC"


# Responses


class HistoricalRatesReponse(BaseModel):
    timestamp: int
    value: float


class FiatCurrency(BaseModel):
    USD: str
    SGD: str
    EUR: str


class CryptoCurrency(BaseModel):
    BTC: str
    DOGE: str
    ETH: str



class Rate(BaseModel):
    base_currency: str
    target_currency: str
    rate: float

    class Config:
        orm_mode = True
