from fastapi import APIRouter

router = APIRouter(
    prefix="/futureServices",
    tags=["futureServices"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def foo():
    return "Additional routes for future services"
