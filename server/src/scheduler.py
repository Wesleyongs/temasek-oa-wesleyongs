import logging
import asyncio
from apscheduler.schedulers.background import BackgroundScheduler
from src.routes.rate import rate
from src.database.database import SessionLocal

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s - %(message)s",
    filename="scheduler.log",
    filemode="a",
)

logger = logging.getLogger("scheduler")


def update_rates_scheduler():
    try:
        asyncio.run(rate.update_rates(SessionLocal()))
        logger.info("Rates updated successfully")
    except Exception as e:
        logger.error("Failed to update rates: %s", str(e), exc_info=True)


def init_scheduler():
    # Create and configure the scheduler
    scheduler = BackgroundScheduler()
    scheduler.add_job(update_rates_scheduler, "cron", minute="*/5")

    # Start the scheduler
    scheduler.start()
    logger.info("Scheduler started successfully")
