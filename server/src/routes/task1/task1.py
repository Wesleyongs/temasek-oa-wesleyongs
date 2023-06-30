# Import
from fastapi import APIRouter, Depends, APIRouter, Query, Path
from sqlalchemy.orm import Session
from typing import List
import requests
from fastapi.responses import JSONResponse

# Local Variables
# from src.routes.twoFA import crud
from src.routes.task1 import schemas
# from src.database.database import Base, SessionLocal, engine, get_db

# APIRouter creates path operations for item module
router = APIRouter(
    prefix="/",
    tags=[""],
    responses={404: {"description": "Not found"}},
)


@router.get("/rates")
async def get_exchange_rates(base: schemas.BaseCurrency = Query(default=schemas.BaseCurrency.fiat)):
    print(base)
    if base == "fiat":
        selected_currency_list = schemas.FiatCurrency.__annotations__.keys()
        other_currency_list = schemas.CryptoCurrency.__annotations__.keys()
    elif base == "crypto":
        selected_currency_list = schemas.CryptoCurrency.__annotations__.keys()
        other_currency_list = schemas.FiatCurrency.__annotations__.keys()
    else:
        return JSONResponse(status_code=404, content={
            "message": "Invalid base currency"})
    response = {}
    for currency in selected_currency_list:
        all_exchange_rates = await get_coinbase_exchange_rates(currency)
        response[currency] = {
            key: value for key, value in all_exchange_rates.items() if key in other_currency_list}
        print(response[currency])
    return response


async def get_coinbase_exchange_rates(currency):
    try:
        response = requests.get(
            f"https://api.coinbase.com/v2/exchange-rates?currency={currency}")
        response.raise_for_status()  # Raise an exception for non-2xx status codes
        data = response.json()
        return data['data']['rates']
    except requests.exceptions.RequestException as err:
        # Handle connection or request-related errors
        print(f"A request exception occurred: {err}")
    except ValueError as err:
        # Handle JSON decoding errors
        print(f"JSON decoding error occurred: {err}")
    except Exception as err:
        # Handle other exceptions
        print(f"An error occurred: {err}")

# @router.post("/", response_model=schemas.TwoFA)
# def post_twofa(id: int = Query(default=1, description="user_id, set as 1 for this example"), to_number=Query(default="+6581633116", description="Enter your mobile here with country code, please do not spam SMS"), db: Session = Depends(get_db)):
#     """
#     1. Creates 2FA code
#     2. Writes to DB
#     3. Sends via SMS
#     4. Return status
#     """
#     return crud.create_2FA(id, to_number, db)
# @router.get("/verify", response_model=schemas.Verify)
# def verify_twofa(code: int = Query(description="6digit OTP that was sent to your mobile"), id: int = Query(default=1, description="user_id, set as 1 for this example"), db: Session = Depends(get_db)):
#     """
#     Verify OTP that u had created in the previous step
#     Do note that user_id has to match and the OPT is only valid for 60seconds
#     """
#     return crud.verify_twofa(id, code, db)
