import asyncio

import uvicorn
from apscheduler.schedulers.background import BackgroundScheduler
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database.database import SessionLocal
from fastapi.responses import RedirectResponse
from fastapi import FastAPI
# local
from src.routes.api import router as api_router
from src.routes.task1 import task1

description = """ Nothing for now
"""
app = FastAPI(title="Python Backend Microservices",
              docs_url="/docs",
              description=description,
              contact={
                  "name": "Wesley Ong",
                  "url": "https://wesleyongs.com",
                  "email": "wesleyispro@gmail.com",
              },
              license_info={
                  "name": "Repo",
                  "url": "https://github.com/Wesleyongs/fastapi-personal-project", },)


app.include_router(api_router)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", include_in_schema=False)
async def docs_redirect():
    return RedirectResponse(url='/docs')


def update_rates_scheduler():
    try:
        asyncio.run(task1.update_rates(SessionLocal()))
    except Exception as e:
        raise Exception("Failed to update rates: " + str(e))


@app.on_event('startup')
def init_data():
    scheduler = BackgroundScheduler()
    scheduler.add_job(update_rates_scheduler, 'cron', minute='*')
    scheduler.start()


if __name__ == "__main__":
    uvicorn.run("src.main:app", reload=True)
