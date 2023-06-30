from fastapi import APIRouter
from src.routes.task1 import task1
# from src.routes.task2 import task2
# from src.routes.task3 import task3

router = APIRouter()
router.include_router(task1.router)
# router.include_router(task2.router)
# router.include_router(task3.router)
