'use client'

import { useEffect, useState } from "react";
import {api, TelemetryPoint} from '@/src/services/api'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Gauge, Activity, Milestone } from "lucide-react";

export default function Home(){
  const [data, setData] = useState<TelemetryPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null> (null);

  useEffect(() => {
    async function loadTelemetry() {
      try{
        setLoading(true)
        const response = await api.getDistanceTelemetry(9159, 14, 10);
        setData(response.telemetry);
      } catch (err: any){
        setError(err.message)
      } finally{
        setLoading(false)
      }
    }
    loadTelemetry()
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-slate-400 font-mono">Cargando datos del Pit Wall...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-red-400 font-mono p-4">
        <div className="border border-red-900/50 bg-red-950/20 p-6 rounded-lg max-w-md">
          <p className="font-bold">❌ Error de Conexión:</p>
          <p className="text-sm mt-2 text-slate-300">{error}</p>
        </div>
      </div>
    );
  }

  const latestPoint  = data[data.length - 1] || {speed: 0, rpm: 0, distance: 0};

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
        <header className="border-b border-slate-800 pb-4 mb-6">
          <h1 className="text-2xl font-black tracking-wider text-red--500 font-mono">F1 PIT WALL TELEMETRY</h1>
          <p className="text-xs text-slate-400 font-mono">Sesion 9159 carlos Sainz</p>

        </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
          <Gauge className="text-red-500 h-8 w-8"/>
          <div>
            <p className="text-xs text-slate-400 font-mono">Velocidad Maxima Muestreada</p>
            <p className="text-2xl font-bold font-mono">{Math.max(...data.map(p => p.speed))} <span className="text-xs text-slate-500">KM/H</span></p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center">
          <Activity className="text-amber-500 h-8 w-8"/>
          <div>
            <p className="text-xs text-slate-400 font-mono">RPM Promedy</p>
            <p className="text-2xl font-bold font-mono">
              {Math.round(data.reduce((acc, p) => acc + p.rpm, 0) / data.length)}
            </p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
          <Milestone className="text-blue-500 h-8 w-8 "/>
          <div>
            <p className="text-xs text-slate-400 font-mono">Distancia del Segmento</p>
            <p className="text-2xl font-bold font-mono">{latestPoint.distance}<span className="text-xs text-slate-500">metros</span></p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-2xl ">
        <h2 className="text-sm font-semibold font-mono text-slate-300 mb-4 tracking-wide">
          ANALISIS DE VELOCIDAD VS DISTANCIA 
        </h2>

        <div className="h-100 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
              <XAxis
                dataKey="distance"
                stroke="#64748b"
                fontFamily="monospace"
                fontSize={12}
                label={{value: "Distancia (Metros)", position: 'insideBottomRight', offset: -5, fill: "#64748b"}}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', fontFamily: 'monospace'}}
              />
              <Legend verticalAlign="top" height={36}/>
              <Line 
                name="Piloto #55 Carlos"
                type= "monotone"
                dataKey="speed"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6}}
              />
              </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  )
}
