import os 
import httpx
import asyncio
from typing import List, Dict, Any

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY", "08f521f513mshe8a79567a567f03p136735jsn27c342520b98")
RAPIDAPI_HOST = "hyprace-api.p.rapidapi.com"

HEADERS = {
    "x-rapidapi-key": RAPIDAPI_KEY,
    "x-rapidapi-host": RAPIDAPI_HOST,
    "Content-Type": "application/json"
}

async def fetch_single_page(client: httpx.AsyncClient, page: int, page_size: int) -> List[Any]:
    url = f"https://{RAPIDAPI_HOST}/v2/drivers?pageNumber={page}&pageSize={page_size}"
    try:
        response = await client.get(url, headers=HEADERS, timeout=10.0)
        if response.status_code == 200:
            data = response.json()
            return data.get("items", [])
        print(f"⚠️ Error en página {page}: status {response.status_code}")
        return []
    except Exception as e:
        print(f"❌ Error de conexión en página {page}: {e}")
        return []
    
async def fetch_hyprace_drivers_bulk(total_drivers: int = 100) -> Dict[str, Any]:
    page_size = 25
    total_pages = max(1, total_drivers // page_size)

    async with httpx.AsyncClient() as client:
        tasks = [fetch_single_page(client, page, page_size) for page in range(1, total_pages + 1)]
        pages_results = await asyncio.gather(*tasks)

        unified_items = []
        for items in pages_results:
            unified_items.extend(items)
        
        return {
            "items": unified_items,
            "total": len(unified_items)
        }