
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi import FastAPI

# local
from src.routes.api import router as api_router
from src.scheduler import init_scheduler


import json

# Load configuration from JSON file
with open("src/config.json") as config_file:
    fastapi_config = json.load(config_file)["fastapi"]


app = FastAPI(**fastapi_config)


app.include_router(api_router)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Redirect to swagger
@app.get("/", include_in_schema=False)
async def docs_redirect():
    return RedirectResponse(url="/docs")


# Start scheduler
@app.on_event("startup")
def init_data():
    init_scheduler()


if __name__ == "__main__":
    uvicorn.run("src.main:app", reload=True)
