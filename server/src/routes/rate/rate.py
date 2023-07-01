from typing import Union
import json
import requests
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from src.database.database import get_db
from src.routes.rate import crud, helpers, models, schemas

router = APIRouter(
    prefix="", tags=["rates"], responses={404: {"description": "Not found"}}
)

# Load configuration from JSON file
with open("src/config.json") as config_file:
    COINBASE_URL = json.load(config_file)["coinbase_url"]

CURRENCY_DICT = {
    "fiat": list(schemas.FiatCurrency.__annotations__.keys()),
    "crypto": list(schemas.CryptoCurrency.__annotations__.keys()),
}
CURRENCY_LIST = CURRENCY_DICT["fiat"] + CURRENCY_DICT["crypto"]


@router.get(
    "/rates",
    response_model=Union[
        schemas.ExchangeRatesResponseFiat, schemas.ExchangeRatesResponseCrypto
    ],
)
async def handle_get_exchange_rates(
    base: schemas.CurrencyTypes = Query(default=schemas.CurrencyTypes.fiat),
):
    try:
        selected_CURRENCY_LIST = CURRENCY_DICT[base]
        other_CURRENCY_LIST = (
            CURRENCY_DICT["fiat"] if base == "crypto" else CURRENCY_DICT["crypto"]
        )

        response = {}
        for base_currency in selected_CURRENCY_LIST:
            exchange_rates = await get_coinbase_exchange_rates(
                base_currency, other_CURRENCY_LIST
            )
            response[base_currency] = exchange_rates

        return response

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error retrieving exchange rates from CB: {e}"
        )


@router.put("/update_rates/", response_model=schemas.Message)
async def handle_update_rates(db: Session = Depends(get_db)):
    try:
        res = await update_rates(db)
        return {"msg": f"Ingested {len(res)} rows"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error ingesting CB rates: {e}")


@router.get("/historical-rates", response_model=schemas.HistoricalRatesResponse)
async def handle_get_historical_rates(
    params: schemas.HistoricalRatesParams = Depends(),
    db: Session = Depends(get_db),
):
    try:
        rates = await crud.get_rates(
            db,
            helpers.unix_int_to_ts(params.start_timestamp),
            helpers.unix_int_to_ts(params.end_timestamp),
            params.base_currency,
            params.target_currency,
        )
        response = []
        for rate in rates:
            response.append(
                schemas.HistoricalRate(
                    timestamp=int(rate.timestamp.timestamp() * 1000), value=rate.rate
                )
            )
        return schemas.HistoricalRatesResponse(results=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def update_rates(db: Session):
    rate_objects = []
    for base_currency in CURRENCY_LIST:
        exchange_rates = await get_coinbase_exchange_rates(base_currency, CURRENCY_LIST)
        for target_currency, rate in exchange_rates.items():
            rate_objects.append(
                models.Rate(
                    base_currency=base_currency,
                    target_currency=target_currency,
                    rate=rate,
                )
            )
    await crud.create_rates(db, rate_objects)
    return rate_objects


async def get_coinbase_exchange_rates(currency, currency_list):
    response = requests.get(f"{COINBASE_URL}{currency}")
    data = response.json()
    all_exchange_rates = data["data"]["rates"]
    return {
        key: value for key, value in all_exchange_rates.items() if key in currency_list
    }
