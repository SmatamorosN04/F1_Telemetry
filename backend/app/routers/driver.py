from fastapi import APIRouter, HTTPException
from app.services.hyprace_client import fetch_hyprace_drivers

router = APIRouter(prefix="/api/drivers", tags=["Drivers"])

@router.get("/hub")
async def get_drivers_hub():
    data = await fetch_hyprace_drivers(page=1,page_size=25)

    if not data:
        raise HTTPException(status_code=500, detail="No se pudieron obtener datos de la API externa")
        
    return {
        "status": "success",
        "source": "hyprace-v2",
        "result": data
    }