from datetime import datetime
from typing import List, Dict, Any

def calculate_distance_and_interpolate(car_data: List[Dict[str, Any]], step_meters: float = 10.0) -> List[Dict[str, Any]]:
    if not car_data or len(car_data) < 2: 
        return []

    processed_points = []
    accumulated_distance = 0.0

    sorted_data = sorted(car_data, key=lambda x: x.get("date", ""))

    for i in range(len(sorted_data)):
        current = sorted_data[i]

        if i == 0: 
            processed_points.append({
                "distance": 0.0,
                "speed": float(current.get("speed", 0)),
                "rpm": int(current.get("rpm", 0)),
                "gear": int(current.get("gear", 0)),
                "throttle": float(current.get("throttle", 0)),
                "brake": float(current.get("brake", 0))
            })
            continue

        prev = sorted_data[i - 1]

        t_prev = datetime.fromisoformat(prev["date"].replace("Z", "+00:00"))
        t_curr = datetime.fromisoformat(current["date"].replace("Z", "+00:00"))
        dt = (t_curr - t_prev).total_seconds()

        if dt <= 0:
            continue

        v_prev = float(prev.get("speed", 0)) / 3.6
        v_curr = float(current.get("speed", 0)) / 3.6
        v_avg = (v_prev + v_curr) / 2.0

        distance_delta = v_avg * dt
        accumulated_distance += distance_delta

        processed_points.append({
            "distance": accumulated_distance,
            "speed": float(current.get("speed", 0)),
            "rpm": int(current.get("rpm", 0)),
            "gear": int(current.get("gear", 0)),
            "throttle": float(current.get("throttle", 0)),
            "brake": float(current.get("brake", 0))
        })

    # --- SÁCAME DEL BUCLE FOR ---
    if not processed_points: 
        return []

    total_distance = processed_points[-1]["distance"]
    interpolated_telemetry = []

    target_distance = 0.0
    idx = 0

    while target_distance <= total_distance: 
        while idx < len(processed_points) - 1 and processed_points[idx + 1]["distance"] < target_distance:
            idx += 1

        p1 = processed_points[idx]
        p2 = processed_points[idx + 1] if idx < len(processed_points) - 1 else p1
        
        dist_range = p2["distance"] - p1["distance"]
        factor = (target_distance - p1["distance"]) / dist_range if dist_range > 0 else 0.0

        interp_speed = p1["speed"] + factor * (p2["speed"] - p1["speed"])
        interp_rpm = p1["rpm"] + factor * (p2["rpm"] - p1["rpm"])
        interp_throttle = p1["throttle"] + factor * (p2["throttle"] - p1["throttle"])

        interp_gear = p1["gear"] if factor < 0.5 else p2["gear"]
        interp_brake = p1["brake"] if factor < 0.5 else p2["brake"]

        interpolated_telemetry.append({
            "distance": round(target_distance, 2),
            "speed": round(interp_speed, 1),
            "rpm": int(interp_rpm),
            "gear": int(interp_gear),
            "throttle": round(interp_throttle, 1),
            "brake": int(interp_brake)
        })

        target_distance += step_meters

    return interpolated_telemetry