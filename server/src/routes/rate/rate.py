from typing import Dict, List

import requests
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from src.database.database import get_db
from src.routes.rate import crud, helpers, models, schemas

router = APIRouter(
    prefix="", tags=["rates"], responses={404: {"description": "Not found"}}
)

currency_list = (
    schemas.FiatCurrency.__annotations__.keys()
    | schemas.CryptoCurrency.__annotations__.keys()
)


@router.get("/rates")
async def handle_get_exchange_rates(
    base: schemas.CurrencyTypes = Query(default=schemas.CurrencyTypes.fiat),
):
    try:
        selected_currency_list = currency_list - (
            schemas.FiatCurrency.__annotations__.keys()
            if base == "crypto"
            else schemas.CryptoCurrency.__annotations__.keys()
        )
        other_currency_list = currency_list - selected_currency_list

        response = {}
        for base_currency in selected_currency_list:
            exchange_rates = await get_coinbase_exchange_rates(
                base_currency, other_currency_list
            )
            response[base_currency] = exchange_rates

        return response

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error retrieving exchange rates from CB: {e}"
        )


@router.put("/update_rates/")
async def handle_update_rates(db: Session = Depends(get_db)):
    try:
        res = await update_rates(db)
        return {"msg": f"Ingested {len(res)} rows"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error ingesting CB rates: {e}")


@router.get("/historical-rates")
async def get_rates(
    params: schemas.HistoricalRatesParams = Depends(),
    db: Session = Depends(get_db),
) -> Dict["result", List[schemas.HistoricalRatesReponse]]:
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
                schemas.HistoricalRatesReponse(
                    timestamp=int(rate.timestamp.timestamp() * 1000), value=rate.rate
                )
            )

        return {"result": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


async def update_rates(db: Session):
    rate_objects = []
    for base_currency in currency_list:
        exchange_rates = await get_coinbase_exchange_rates(base_currency, currency_list)
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


async def get_coinbase_exchange_rates(currency, other_currency_list):
    response = requests.get(
        f"https://api.coinbase.com/v2/exchange-rates?currency={currency}"
    )
    response.raise_for_status()
    data = response.json()
    all_exchange_rates = data["data"]["rates"]
    return {
        key: value
        for key, value in all_exchange_rates.items()
        if key in other_currency_list
    }
