from src.routes.task1 import models
import datetime as dt
import time


def create_rate(db, base, currency_name, rate):
    currency_id = get_currency_id(db, currency_name)
    rate = models.Rate(base=base,
                       currency_id=currency_id, rate=rate)
    db.add(rate)
    db.commit()
    db.close()


def get_currency_id(db, currency_name):
    currency = db.query(models.Currency).filter(
        models.Currency.name == currency_name).first()
    if currency:
        return currency.id
    else:
        raise ValueError(f"Currency '{currency_name}' not found")
