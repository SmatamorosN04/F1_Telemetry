const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

// ─── Telemetry ────────────────────────────────────────────────────────────────

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


export interface DriverCountry {
    id: string;
    name: string;
    alphaTwoCode: string;
    alphaThreeCode: string;
    numCode: number;
}

export interface Driver {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    deathDate?: string;
    tla?: string;        // Three-letter abbreviation (e.g. "HAM")
    number?: number;     // Racing number
    country: DriverCountry;
}

export interface DriversHubResponse {
    status: string;
    source: string;
    result: {
        items: Driver[];
        totalCount?: number;
        pageNumber?: number;
        pageSize?: number;
    };
}

// ─── API client ───────────────────────────────────────────────────────────────

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
    },

    getActiveDrivers: async (): Promise<DriversHubResponse> => {
        const response = await fetch(`${API_BASE_URL}/api/drivers/active`)
        if (!response.ok){
            throw new Error(`Error al obtener la parrilla activa: ${response.statusText}`);
        }
        return response.json();
    },

    getDriversHub: async (
        page: number = 1,
        pageSize: number = 25
    ): Promise<DriversHubResponse> => {
        const response = await fetch(
            `${API_BASE_URL}/api/drivers/hub?page=${page}&page_size=${pageSize}`
        );
        if (!response.ok) {
            throw new Error(`Error al obtener pilotos: ${response.statusText}`);
        }
        return response.json();
    },
}