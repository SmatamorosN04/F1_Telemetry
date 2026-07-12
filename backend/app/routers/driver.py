from fastapi import APIRouter, HTTPException
from app.services.hyprace_client import fetch_hyprace_drivers_bulk

router = APIRouter(prefix="/api/drivers", tags=["Drivers"])

@router.get("/hub")
async def get_drivershub():
    try: 
        data = await fetch_hyprace_drivers_bulk(total_drivers=150)
        return { "status": "success", "source": "hyprace-historical", "result": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/active")
async def get_active_drivers():
    try: 
        data = await fetch_hyprace_drivers_bulk(total_drivers=150)
        active_items = [
            d for d in data.get("items", [])
            if d.get("deathDate") is None and d.get("number") is not None and d.get("tla") is not None
        ]

        return {
            "status":"success",
            "source": "hyprace-active-grid",
            "result":{
                "items": active_items,
                "totalCount": len(active_items)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al compilar la parrilla actual: {str(e)}")