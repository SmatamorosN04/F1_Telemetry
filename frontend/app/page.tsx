'use client'

import Navbar from "@/src/components/Navbar"
import Footer from "@/src/components/Footer"
import Link from "next/link"
import { HelpCircle, Cpu, Sliders, BarChart3, ChevronRight, Terminal } from "lucide-react"

export default function Home(){
    return(
        <main className="min-h-screen w-screen bg-slate-950 text-slate-200 font-mono flex flex-col justify-between overflow-x-hidden selection:bg-red-600 selection:text-white relative">
            
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_80%,transparent_100%)] opacity-20 pointer-events-none" />

            <div className="absolute top-[10%] left-[5%] w-[50vw] h-[50vw] bg-red-600/15 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] right-[5%] w-[45vw] h-[45vw] bg-sky-500/15 blur-[110px] rounded-full pointer-events-none" />

            <div className="w-full flex flex-col relative z-10">
                <Navbar/>

                <section className="px-6 py-20 max-w-4xl mx-auto flex flex-col gap-5 w-full text-center md:text-left items-center md:items-start">
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-linear-to-b from-white via-slate-200 to-slate-500 leading-none">
                        La ciencia detras de la velocidad
                    </h1>
                    <p className="text-slate-400 text-sm max-w-2xl font-sans leading-relaxed">
                        En la Fórmula 1, cada milisegundo cuenta. Un monoplaza genera más de 1.5 GB de datos de telemetría pura en cada vuelta a través de cientos de sensores integrados. Esta plataforma traduce ese flujo de datos masivo en gráficos comprensibles de grado de ingeniería.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-3 w-full sm:w-auto">
                        <Link href="/telemetry" className="bg-red-600/80 hover:bg-red-600 backdrop-blur-md border border-red-500/30 text-white font-bold px-6 py-3 rounded-lg text-xs tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-950/30 hover:scale-[1.02]">
                         IR AL PIT WALL <ChevronRight size={14}/>
                        </Link>
                        <Link href="/drivers" className="border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-slate-300 font-bold px-6 py-3 rounded-lg text-xs tracking-widest transition-all text-center">
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
                        <div className="bg-linear-to-b from-slate-900/50 to-slate-950/30 backdrop-blur-2xl p-6 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border border-white/10 border-t-white/20 border-l-white/20 hover:border-white/30 hover:from-slate-900/60 hover:to-slate-950/40 transition-all duration-300 group">
                            <div className="h-8 w-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-xs shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
                            01
                            </div>
                            <div className="mt-4">
                                <h3 className="text-sm font-bold text-slate-100 uppercase flex items-center gap-1.5 mb-1.5">
                                    <Cpu size={14} className="text-sky-400" /> Captura de Datos Crudos
                                </h3>
                                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                                    El sistema se conecta directamente con la API de OpenF1 para extraer las tramas de la sesion y del piloto seleccionado en tiempo real.
                                </p>
                            </div>
                        </div>

                        <div className="bg-linear-to-b from-slate-900/50 to-slate-950/30 backdrop-blur-2xl p-6 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border border-white/10 border-t-white/20 border-l-white/20 hover:border-white/30 hover:from-slate-900/60 hover:to-slate-950/40 transition-all duration-300 group">
                            <div className="h-8 w-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-xs shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
                            02
                            </div>
                            <div className="mt-4">
                                <h3 className="text-sm font-bold text-slate-100 uppercase flex items-center gap-1.5 mb-1.5">
                                    <Sliders size={14} className="text-purple-400" /> Procesamiento en FastAPI
                                </h3>
                                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                                    Nuestro motor en FastAPI procesa las marcas de tiempo y las velocidades medias para interpolar y fijar puntos métricos constantes.
                                </p>
                            </div>
                        </div>

                        <div className="bg-linear-to-b from-slate-900/50 to-slate-950/30 backdrop-blur-2xl p-6 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border border-white/10 border-t-white/20 border-l-white/20 hover:border-white/30 hover:from-slate-900/60 hover:to-slate-950/40 transition-all duration-300 group">
                            <div className="h-8 w-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-xs shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
                            03
                            </div>
                            <div className="mt-4">
                                <h3 className="text-sm font-bold text-slate-100 uppercase flex items-center gap-1.5 mb-1.5">
                                    <BarChart3 size={14} className="text-emerald-400"/>Analisis Sincronizado
                                </h3>
                                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                                    Al desplazar el cursor sobre las graficas del canal izquierdo, el visor numerico MoTeC derecho actualizara en tiempo real marcha, RPM, acelerador y freno del coche en esa posicion exacta.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
                <Footer/>
        </main>
    )
}