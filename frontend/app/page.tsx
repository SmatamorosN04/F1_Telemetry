'use client'

import Navbar from "@/src/components/Navbar"
import Footer from "@/src/components/Footer"
import Link from "next/link"
import { HelpCircle, Cpu, Sliders, BarChart3, ChevronRight, Terminal } from "lucide-react"


export default function Home(){
    return(
        <main className="min-h-screen w-screen bg-slate-950 text-slate-200 font-mono flex flex-col overflow-x-hidden">
            <Navbar/>

            <section className="px-6 py-16 max-w-2xl font-sans leading-relaxed">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-linear-to-r from-white via-slate-200 to-slate-500">
                La ciencia detras de la velocidad
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl font-sans leading-relaxed">
                En la Fórmula 1, cada milisegundo cuenta. Un monoplaza genera más de 1.5 GB de datos de telemetría pura en cada vuelta a través de cientos de sensores integrados. Esta plataforma traduce ese flujo de datos masivo en gráficos comprensibles de grado de ingeniería.
            </p>
            <div className=" flex gap-4 mt-2">
                <Link href="/telemetry" className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded text-xs tracking-widest flex items-center gap-2 transition-all">
                 IR AL PIT WALL <ChevronRight size={14}/>
                </Link>
                <Link href="/drivers" className="border border-slate-800 hover:border-slate-700 bg-slate-900/40 text-slate-300 font-bold px-6 py-3 rounded text-xs tracking-widest transition-all">
                 VER PILOTOS
                </Link>
            </div>
            </section>

            <section className="max-w-5xl w-full mx-auto px-6 py-12 flex flex-col gap-8">
                <div className="text-center md:text-left">
                    <h2 className="text-xl font-black tracking-tight uppercase flex items-center justify-center md:justify-start gap-2">
                        <HelpCircle size={18} className="text-red-500"/> Como Funciona este Dashboard?
                    </h2>
                    <p className="text-xs text-slate-500 font-sans mt-1">Sigue estos 3 pasos para ver los datos oficiales de la FIA</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900/40 border border-slate-900  p-5 rounded-lg flex flex-col gap-3">
                        <div className="h-8 w-8 rounded bg-red-950/40 border border-red-900/50 flex items-center justify-center text-red-500 font-bold text-xs">
                        01
                        </div>
                        <h3 className="text-sm font-bold text-slate-100 uppercase flex items-center gap-1.5">
                            <Cpu size={14} className="text-sky-400"></Cpu> Captura de Datos Crudos
                        </h3>
                        <p className="text-xs text-slate-400 font-sans leading-relaxed">
                            El sistema se conecta directamente con la API de OpenF1 para extraer las tramas de la sesion y del piloto seleccionado en tiempo real 
                        </p>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-lg flex flex-col gap-3">
                     <div className="h-8 w-8 rounded bg-red-950/40 border border-red-900/50 flex items-center justify-center text-red-500 font-bold text-xs">
                      02
                     </div>
                     <h3 className="text-sm font-bold text-slate-100 uppercase flex items-center gap-1.5">
                        Nuestro motor en FastAPI procesa las marcas de tiempo y las velocidades 
                     </h3>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-lg flex flex-col gap-3">
                     03
                    
                    <h3 className="text-sm font-bold text-slate-100 uppercase flex items-center gap-1.5">
                        <BarChart3 size={14} className="text-emerald-400"/>Analisis Sincronizado
                    </h3>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        AL desplazar el cursor sobre las graficas del canal izquiero, el visor numerico MoTeC derecho actualizara en tiempo real marcha, RPM, acelerador y freno del coche en esa posicion exacta 
                    </p>
                </div>
                </div>
            </section>


            <Footer/>
        </main>
    )
}
