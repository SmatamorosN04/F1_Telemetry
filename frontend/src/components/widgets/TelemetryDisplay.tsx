'use client'

import { Milestone } from "lucide-react"
import { TelemetryPoint } from "@/src/services/api"

interface TelemetryDisplayProps {
    currentMetrics: TelemetryPoint;
}

export default function TelemetryDisplay({ currentMetrics}: TelemetryDisplayProps) {
    return (
        <div className="w-[320px] bg-slate-900 p-4 flex flex-col gap-4 shrink-0 overflow-y-auto">

            <div className="border-b border-slate-800 pb-2">
                <div className="text-xs text-slate-400 tracking-wider">TELEMETRY CHANNELS</div>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                    <Milestone size={10}/> DIST_POS: {currentMetrics.distance.toFixed(1)} m
                </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded text-center relative overflow-hidden">
                <div className=" text-xs text-slate-500 absolute top-2 left-2 font-bold tracking-widest">GEAR</div>
                <span className="text-6xl font-black font-sans text-amber-400">
                    {currentMetrics.gear === 0 ? 'N' : currentMetrics.gear}
                </span>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-3 rounded ">
                <div className="text-xs text-slate-400 mb-1 font-bold">ENGINE TACHOMETER</div>
                <div className="text-2xl font-bold font-mono tracking-tight text-purple-400 ">
                    {currentMetrics.rpm}<span className="text-xs text-slate-600">RPM</span>
                </div>
                <div className="w-full bg-slate-800 h-2 mt-2 rounded-full overflow-hidden">
                    <div 
                    className="bg-linear-to-r from-purple-500 via-amber-500 to-red-600 h-full transition-all duration-100"
                    style={{ width: `${Math.min((currentMetrics.rpm / 12500) * 100, 100)}%`}}
                    ></div>
                </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-3 rounded flex-1 flex flex-col min-h-45">
                <div className="text-xs text-slate-400 mb-3 font-bold">LIVE PEDAL CHANNELS</div>

                <div className="flex-1 flex gap-6 justify-center px-4">

                    <div className="flex flex-col items-center flex-1">
                        <div className="w-full bg-slate-800 rounded flex-1 flex flex-col justify-end overflow-hidden relative border border-slate-700/40 ">
                            <div className="bg-emerald-500 w-full transition-all duration-100"
                            style={{ height: `${currentMetrics.throttle}`}}/>
                            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-900 drop-shadow-md">
                                {currentMetrics.throttle}
                            </span>
                        </div>
                        <span className="text-xs text-emerald-400 font-bold mt-1">THR</span>
                    </div>

                    <div className="flex flex-col items-center flex-1">
                        <div className="w-full bg-slate-800 rounded flex-1 flex flex-col justify-end overflow-hidden relative border border-slate-700/40">
                         <div className="bg-rose-500 w-full transition-all duration-100" style={{height: `${currentMetrics.brake}`}}/>
                         <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-900 drop-shadow-md">
                            {currentMetrics.brake}%
                         </span>
                        </div>
                        <span className="text-xs text-rose-500 font-bold mt-1">BRK</span>
                    </div>
                </div>
                </div>           

        </div>
    );
}