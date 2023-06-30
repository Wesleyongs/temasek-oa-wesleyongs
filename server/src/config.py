from functools import lru_cache
from pydantic import BaseSettings


class Settings(BaseSettings):
    db_url = "postgresql://wesleyispro:4Nod3avuDsYZ@ep-solitary-limit-758159.ap-southeast-1.aws.neon.tech/neondb"

    class Config:
        env_prefix = "APP_"

@lru_cache()
def get_setting():
    return Settings()