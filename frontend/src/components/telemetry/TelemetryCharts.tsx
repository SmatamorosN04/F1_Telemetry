'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Gauge, Activity, Sliders } from 'lucide-react';
import { TelemetryPoint } from '@/src/services/api';

interface TelemetryChartsProps{
    data: TelemetryPoint[];
    currentMetrics: TelemetryPoint;
    onMouseMove: (e: any) => void;
}

export default function TelemetryCharts ({ data, currentMetrics, onMouseMove}: TelemetryChartsProps){
    return (
        <div className='flex-1 flex-col p-2 gap-2 overflow-y-auto bg-slate-950 border-r border-slate-900'>

            <div className='bg-slate-900/60 border border-slate-800/80 rounded p-2 flex flex-col h-[28%] min-h-40'>
                <div className='flex justify-between items-center text-xs text-slate-400 px-2 mb-1 '>
                    <span className='flex items-center gap-1 '>
                        <Gauge size={12} className='text-sky-400'/> Speed Channel
                    </span>
                    <span className='text-sky-400 font-bold'>{currentMetrics.speed.toFixed(0)}</span>
                </div>
                <div className='flex-1 w-full'>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{top:5, right: 10, left: -25, bottom: 0}} onMouseMove={onMouseMove}>
                            <CartesianGrid strokeDasharray="1 5" stroke='#1e293b'/>
                            <XAxis dataKey="distance" hide={true}/>
                            <YAxis stroke='#475569' fontSize={10} domain={[0, 340]}/>
                            <Line  type="monotone" dataKey="speed" stroke='#38bdf8' strokeWidth={1.5} dot={false} animationDuration={300}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className='bg-slate-900/60 border-slate-800/80 rounded p-2 flex flex-col h-[20%] min-h-40'>
            <div className="flex justify-between items-center text-[10px] text-slate-400 px-2 mb-1">
          <span className="flex items-center gap-1">
            <Activity size={12} className="text-purple-400" /> ENGINE RPM
          </span>
          <span className="text-purple-400 font-bold">{currentMetrics.rpm} RPM</span>
        </div>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: -25, bottom: 0 }} onMouseMove={onMouseMove}>
              <CartesianGrid strokeDasharray="1 5" stroke="#1e293b" />
              <XAxis dataKey="distance" hide={true} />
              <YAxis stroke="#475569" fontSize={10} domain={[4000, 13000]} />
              <Line type="monotone" dataKey="rpm" stroke="#c084fc" strokeWidth={1.5} dot={false} animationDuration={300} />
            </LineChart>
          </ResponsiveContainer>
        </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded p-2 flex flex-col h-[28%] min-h-[160px]">
        <div className="flex justify-between items-center text-[10px] text-slate-400 px-2 mb-1">
          <span className="flex items-center gap-1">
            <Sliders size={12} className="text-emerald-400" /> PEDAL INPUTS (%)
          </span>
          <div className="flex gap-3">
            <span className="text-emerald-400">THR: {currentMetrics.throttle}%</span>
            <span className="text-rose-500">BRK: {currentMetrics.brake}%</span>
          </div>
        </div>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: -25, bottom: 0 }} onMouseMove={onMouseMove}>
              <CartesianGrid strokeDasharray="1 5" stroke="#1e293b" />
              <XAxis dataKey="distance" stroke="#475569" fontSize={10} tickLine={false} />
              <YAxis stroke="#475569" fontSize={10} domain={[0, 100]} />
              <Line type="monotone" dataKey="throttle" stroke="#34d399" strokeWidth={1.5} dot={false} animationDuration={300} />
              <Line type="monotone" dataKey="brake" stroke="#f43f5e" strokeWidth={1.5} dot={false} animationDuration={300} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="text-[9px] text-slate-500 text-right pr-2">Eje X: Distancia (Metros)</div>
      </div>

        </div>
    )
}