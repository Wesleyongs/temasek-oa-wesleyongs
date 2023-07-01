import json
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Load configuration from JSON file
with open("src/config.json") as config_file:
    SQLALCHEMY_DATABASE_URL = json.load(config_file)["db_url"]

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# db
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
