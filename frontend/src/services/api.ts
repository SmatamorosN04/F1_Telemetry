const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export interface TelemetryPoint {
    distance:number;
    speed: number;
    rpm: number;
    gear: number;
    throttle: number;
    brake: number;
}

export interface distanceTelemetryResponse{
    session_key: number;
    driver_number: number;
    total_points: number;
    step_meters: number;
    telemetry: TelemetryPoint[];
}

export const api = {
    getDistanceTelemetry: async (
        sessionKey: number,
        driverNumber: number,
        step: number = 10
    ): Promise<distanceTelemetryResponse> => {
const response = await fetch(
      `${API_BASE_URL}/api/telemetry/distance?session_key=${sessionKey}&driver=${driverNumber}&step=${step}`
    );

    if (!response.ok) {
      throw new Error(`Error al conectar con el motor de telemetría: ${response.statusText}`);
    }
    
    return response.json();
  
    }
}