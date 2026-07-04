from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.services.openf1_client import get_session_info, get_driver_telemetry, get_latest_sessions
from app.services.interpolator import calculate_distance_and_interpolate

app = FastAPI(
    title="F1 Pit Wall Telemetry API",
    description="Backend para análisis y comparación de telemetría de Fórmula 1 usando OpenF1",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "online", "message": "F1 telemetry Engine ON"}

@app.get("/api/session/{session_key}")
async def session_details(session_key: int):
    try:
        data = await get_session_info(session_key)
        if not data:
            raise HTTPException(status_code=404, detail="Sesión no encontrada")
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/sessions/latest")
async def latest_sessions():
    try:
        return await get_latest_sessions()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/telemetry/raw")
async def raw_telemetry(session_key: int, driver: int):
    try:
        data = await get_driver_telemetry(session_key, driver)
        return data[:100]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/telemetry/distance")
async def distance_telemetry(session_key: int, driver: int, step: float = 10.0):
    try:
        raw_data = await get_driver_telemetry(session_key, driver)
        if not raw_data:
            raise HTTPException(status_code=404, detail="No se encontraron datos")
        
        sample_data = raw_data[:500]
        interpolated_data = calculate_distance_and_interpolate(sample_data, step_meters=step)
        
        return {
            "session_key": session_key,
            "driver_number": driver,
            "total_points": len(interpolated_data),
            "step_meters": step,
            "telemetry": interpolated_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))