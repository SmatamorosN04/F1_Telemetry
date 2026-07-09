import os 
import httpx
from typing import List, Dict, Any

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY", "08f521f513mshe8a79567a567f03p136735jsn27c342520b98")
RAPIDAPI_HOST = "hyprace-api.p.rapidapi.com"

HEADERS = {
    "x-rapidapi-key": RAPIDAPI_KEY,
    "x-rapidapi-host": RAPIDAPI_HOST,
    "Content-Type": "application/json"
}

async def fetch_hyprace_drivers(page:int = 1, page_size: int = 25) -> Dict[str, Any]:

    async with httpx.AsyncClient() as client:
        url = f"https://{RAPIDAPI_HOST}/v2/drivers?pageNumber={page}&pageSize={page_size}"
        try: 
            response = await client.get(url, headers=HEADERS, timeout=10.0)
            response.raise_for_status()
            return response.json()
        except Exception as e: 
            print("Error al conectar con la API")
            return{}