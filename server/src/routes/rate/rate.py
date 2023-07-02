from typing import Union
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from src.database.database import get_db
from src.utils.timestamp_format import unix_int_to_ts
from src.crud import crud_rate
from src.schemas import rate as schemas
from src.services import rate as services

router = APIRouter(
    prefix="", tags=["rates"], responses={404: {"description": "Not found"}}
)


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
        response = await services.get_exchange_rates(base)
        return response

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error retrieving exchange rates from CB: {e}"
        )


@router.put("/update_rates/", response_model=schemas.Message)
async def handle_update_rates(db: Session = Depends(get_db)):
    try:
        res = await services.update_rates(db)
        return {"msg": f"Ingested {len(res)} rows"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error ingesting CB rates: {e}")


@router.get("/historical-rates", response_model=schemas.HistoricalRatesResponse)
async def handle_get_historical_rates(
    params: schemas.HistoricalRatesParams = Depends(),
    db: Session = Depends(get_db),
):
    try:
        rates = await crud_rate.get_rates(
            db,
            unix_int_to_ts(params.start_timestamp),
            unix_int_to_ts(params.end_timestamp),
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
