import datetime as dt
from typing import Optional
from enum import Enum

from pydantic import BaseModel


class Verify(BaseModel):
    status_code: int
    message: str

    class Config:
        orm_mode = True


class TwoFA(BaseModel):
    status_code: int
    message: str

    class Config:
        orm_mode = True


class BaseCurrency(str, Enum):
    fiat = "fiat"
    crypto = "crypto"

# Response schema for the crypto base currency


class FiatCurrency(BaseModel):
    USD: str
    SGD: str
    EUR: str


class CryptoCurrency(BaseModel):
    BTC: str
    DOGE: str
    ETH: str


class CryptoExchangeRatesResponse(BaseModel):
    BTC: CryptoCurrency
    DOGE: CryptoCurrency
    ETH: CryptoCurrency

# Response schema for the fiat base currency


class FiatExchangeRatesResponse(BaseModel):
    USD: FiatCurrency
    SGD: FiatCurrency
    EUR: FiatCurrency
