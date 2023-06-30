from apscheduler.schedulers.background import BackgroundScheduler
import asyncio
from src.database.database import SessionLocal
from src.routes.task1 import task1
from src.database.database import get_db

def update_rates_scheduler():
    print("Updating rates...")
    try:
        # Await the update_rates function
        asyncio.run(task1.update_rates(get_db()))
    except Exception as e:
        raise Exception("Failed to update rates: " + str(e))

def init_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(update_rates_scheduler, 'cron', second='*/10')
    scheduler.start()