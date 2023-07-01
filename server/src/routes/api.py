from fastapi import APIRouter
from src.routes.rate import rate
from src.routes.futureServices import furtureServices

router = APIRouter()
router.include_router(rate.router)
router.include_router(furtureServices.router)
