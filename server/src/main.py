import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# local
from src.routes.api import router as api_router

description = """ Nothing for now
"""
app = FastAPI(title="Python Backend Microservices",
              description=description,
              contact={
                  "name": "Wesley Ong",
                  "url": "https://wesleyongs.com",
                  "email": "wesleyispro@gmail.com",
              },
              license_info={
                  "name": "GitHub Repo",
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


@app.get("/")
async def root():
    return {"message": "path /docs for swagger documentation"}


if __name__ == "__main__":
    uvicorn.run("src.main:app", reload=True)
