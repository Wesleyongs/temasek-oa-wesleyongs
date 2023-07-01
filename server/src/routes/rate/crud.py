from src.routes.rate import models
import datetime as dt
import time
from src.routes.rate import schemas
from typing import List


async def create_rates(db, rate_objects: List[schemas.Rate]):
    db.add_all(rate_objects)
    db.commit()
    db.close()
    return rate_objects


async def get_rates(db, start_datetime, end_datetime, base_currency, target_currency):
    query = db.query(models.Rate).filter(
        models.Rate.timestamp.between(start_datetime, end_datetime),
        models.Rate.base_currency == base_currency.value,
        models.Rate.target_currency == target_currency.value,
    )
    rates = query.all()
    return rates
