import httpx 
from typing import List, Dict, Any

BASE_URL = "https://api.openf1.org/v1"

async def get_session_info(session_key: int) -> Dict[str, Any]:
    async with httpx.AsyncClient() as client:
        url = f"{BASE_URL}/sessions?session_key={session_key}"
        response = await client.get(url)
        response.raise_for_status()
        sessions = response.json()
        return sessions[0] if sessions else {}

async def get_driver_telemetry(session_key: int, driver_number: int, lap_number: int = None) -> List[Dict[str, Any]]:
    async with httpx.AsyncClient() as client:
        url = f"{BASE_URL}/car_data"
        
        query_params = {
            "session_key": session_key,
            "driver_number": driver_number,
            "date_gte": "2023-03-05T15:10:00",
            "date_lte": "2023-03-05T15:15:00"
        }

        response = await client.get(url, params=query_params, timeout=15.0)
        response.raise_for_status()
        
        data = response.json()
        return data if isinstance(data, list) else []
    
async def get_latest_sessions() -> List[Dict[str, Any]]:
    """Trae las últimas 5 sesiones que tienen registros en la API."""
    async with httpx.AsyncClient() as client:
        url = f"{BASE_URL}/sessions"
        response = await client.get(url)
        response.raise_for_status()
        sessions = response.json()
        return sessions[-5:] if sessions else []
    

