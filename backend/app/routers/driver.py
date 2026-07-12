from fastapi import APIRouter, HTTPException
from app.services.hyprace_client import fetch_hyprace_drivers_bulk

router = APIRouter(prefix="/api/drivers", tags=["Drivers"])

@router.get("/hub")
async def get_drivers_hub(page: int = 1, page_size: int = 25):
 
    try:
        data = await fetch_hyprace_drivers_bulk(total_drivers=100)
        
        if not data or "items" not in data:
            raise HTTPException(status_code=404, detail="La API externa no retornó elementos válidos")
            
        return {
            "status": "success",
            "source": "hyprace-v2-bulk",
            "result": {
                "items": data["items"],
                "totalCount": data.get("total", len(data["items"])),
                "pageNumber": page,
                "pageSize": page_size
            }
        }
        
    except HTTPException as http_ex:
        raise http_ex
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Fallo crítico en el procesamiento del Hub de Pilotos: {str(e)}"
        )