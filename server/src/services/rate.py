import json
from typing import Dict, List

import requests
from sqlalchemy.orm import Session
from src.crud import crud_rate
from src.models import rate as models
from src.schemas import rate as schemas

# Load configuration from JSON file
with open("src/config.json") as config_file:
    COINBASE_URL = json.load(config_file)["coinbase_url"]

CURRENCY_DICT = {
    "fiat": list(schemas.FiatCurrency.__annotations__.keys()),
    "crypto": list(schemas.CryptoCurrency.__annotations__.keys()),
}
CURRENCY_LIST = CURRENCY_DICT["fiat"] + CURRENCY_DICT["crypto"]


async def get_coinbase_exchange_rates(
    currency: str, currency_list: List[str]
) -> Dict[str, float]:
    response = requests.get(f"{COINBASE_URL}{currency}")
    data = response.json()
    all_exchange_rates = data["data"]["rates"]
    return {
        key: value for key, value in all_exchange_rates.items() if key in currency_list
    }


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
    await crud_rate.create_rates(db, rate_objects)
    return rate_objects


async def get_exchange_rates(base: str) -> Dict[str, Dict[str, str]]:
    selected_currency_list = CURRENCY_DICT[base]
    other_currency_list = (
        CURRENCY_DICT["fiat"] if base == "crypto" else CURRENCY_DICT["crypto"]
    )

    response = {}
    for base_currency in selected_currency_list:
        exchange_rates = await get_coinbase_exchange_rates(
            base_currency, other_currency_list
        )
        response[base_currency] = exchange_rates
    return response
