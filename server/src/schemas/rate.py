from typing import List
from enum import Enum
import time
from pydantic import BaseModel, Field


class CurrencyTypes(str, Enum):
    fiat = "fiat"
    crypto = "crypto"


class FiatCurrency(BaseModel):
    USD: str
    SGD: str
    EUR: str


class CryptoCurrency(BaseModel):
    BTC: str
    DOGE: str
    ETH: str


#  Payloads
class Currencies(str, Enum):
    USD = "USD"
    SGD = "SGD"
    EUR = "EUR"
    BTC = "BTC"
    DOGE = "DOGE"
    ETH = "ETH"


class HistoricalRatesParams(BaseModel):
    start_timestamp: int = Field(1685577600000, le=9 * 10**13)
    end_timestamp: int = int(time.time() * 1000)
    base_currency: Currencies = "USD"
    target_currency: Currencies = "BTC"


# Task 1 Responses
class CurrencyConversionCrypto(BaseModel):
    USD: str
    SGD: str
    EUR: str


class ExchangeRatesResponseCrypto(BaseModel):
    BTC: CurrencyConversionCrypto
    DOGE: CurrencyConversionCrypto
    ETH: CurrencyConversionCrypto


class CurrencyConversionFiat(BaseModel):
    BTC: str
    DOGE: str
    ETH: str


class ExchangeRatesResponseFiat(BaseModel):
    USD: CurrencyConversionFiat
    SGD: CurrencyConversionFiat
    EUR: CurrencyConversionFiat


# TASK 2 schemas & Responses
class Rate(BaseModel):
    base_currency: str
    target_currency: str
    rate: float

    class Config:
        orm_mode = True

class Message(BaseModel):
    msg:str

# TASK 3 Responses


class HistoricalRate(BaseModel):
    timestamp: int
    value: str


class HistoricalRatesResponse(BaseModel):
    results: List[HistoricalRate]
