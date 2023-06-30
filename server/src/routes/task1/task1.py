# Import
from fastapi import APIRouter, Depends, APIRouter, Query, Path
from sqlalchemy.orm import Session
from typing import List
import requests
from fastapi.responses import JSONResponse
from urllib3 import HTTPResponse
from sqlalchemy.orm.session import Session
import sys

# Local Variables
from src.routes.task1 import crud
from src.routes.task1 import schemas
from src.database.database import get_db


# APIRouter creates path operations for item module
router = APIRouter(
    prefix="",
    tags=[""],
    responses={404: {"description": "Not found"}},
)

fiat_currency_list = schemas.FiatCurrency.__annotations__.keys()
crypto_currency_list = schemas.CryptoCurrency.__annotations__.keys()


@router.get("/rates")
async def get_exchange_rates(base: schemas.BaseCurrency = Query(default=schemas.BaseCurrency.fiat)):
    print(base)
    if base == "fiat":
        selected_currency_list = fiat_currency_list
        other_currency_list = crypto_currency_list
    elif base == "crypto":
        selected_currency_list = crypto_currency_list
        other_currency_list = fiat_currency_list
    else:
        return JSONResponse(status_code=404, content={
            "message": "Invalid base currency"})
    response = {}
    for currency in selected_currency_list:
        exchange_rates = await get_coinbase_exchange_rates(currency, other_currency_list)
        response[currency] = exchange_rates
    return response


@router.get("/update_rates/")
async def handle_update_rates(db: Session = Depends(get_db)):
    await update_rates(db)
    return JSONResponse(status_code=200, content={
        "message": "Successfully created"
    })


async def update_rates(db):
    try:
        fiat_rates = await get_coinbase_exchange_rates("USD", crypto_currency_list)
        for currency, rate in fiat_rates.items():
            crud.create_rate(db, "USD", currency, rate)
        crypto_rates = await get_coinbase_exchange_rates("USD", fiat_currency_list)
        for currency, rate in crypto_rates.items():
            crud.create_rate(db, "BTC", currency, rate)
    except Exception as e:
        raise Exception("Failed to update rates: " + str(e))


async def get_coinbase_exchange_rates(currency, other_currency_list):
    try:
        response = requests.get(
            f"https://api.coinbase.com/v2/exchange-rates?currency={currency}")
        response.raise_for_status()  # Raise an exception for non-2xx status codes
        data = response.json()
        all_exchange_rates = data['data']['rates']
        return {
            key: value for key, value in all_exchange_rates.items() if key in other_currency_list}
    except requests.exceptions.RequestException as err:
        # Handle connection or request-related errors
        print(f"A request exception occurred: {err}")
    except ValueError as err:
        # Handle JSON decoding errors
        print(f"JSON decoding error occurred: {err}")
    except Exception as err:
        # Handle other exceptions
        print(f"An error occurred: {err}")
