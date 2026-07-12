'use client'

import { useState, useEffect } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { api, Driver } from "@/src/services/api";
import SkeletonCard from "@/src/components/drivers/SkeletonCard";
import DriverCard from "@/src/components/drivers/DriverCard";
import { Users, Search, Flag, AlertTriangle, RefreshCw } from "lucide-react"

export default function DriverPage() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState<"current" | "historical">("current")

  async function loadDriver() {
    setLoading(true)
    setError(null)
    try { 
      const data = await api.getDriversHub(1, 100)
      setDrivers(data?.result?.items || [])
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDriver()
  }, [])

  const filtered = drivers.filter((d) => {
    const matchesSearch = search.trim() === "" ||
      `${d.firstName} ${d.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      d.tla?.toLowerCase().includes(search.toLowerCase()) ||
      d.country?.name?.toLowerCase().includes(search.toLowerCase());

    // Si el piloto no ha fallecido y tiene un número de carrera, va a la parrilla actual. Si no, a históricos.
    const isCurrentGrid = d.deathDate == null && d.number != null;
    const matchesTab = activeTab === "current" ? isCurrentGrid : !isCurrentGrid;

    return matchesSearch && matchesTab;
  });

  return (
    <main className="min-h-screen w-screen bg-slate-950 text-slate-200 font-mono flex flex-col overflow-x-hidden selection:bg-red-600 selection:text-white relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_80%,transparent_100%)] opacity-20 pointer-events-none"/>
      <div className="absolute top-[5%] left-[5%] w-[40vw] h-[40vw] bg-red-600/10 blur-[100px] rounded-full pointer-events-none"/>
      <div className="absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] bg-sky-500/10 blur-[110px] rounded-full pointer-events-none"/>
    
      <div className="relative z-10 flex flex-col flex-1">
        <Navbar/>

        <section className="px-6 py-12 max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 ">
            <div>
              <p className="text-xs text-red-500 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                <Flag size={12}/> Base de datos Oficial
              </p>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 leading-none">
                Pit Wall Drivers
              </h1>
              <p className="text-slate-400 text-xs font-sans mt-2 max-w-lg leading-relaxed">
                Directorio sincronizado desde el backend con las telemetrías y escuderías.
              </p>
            </div>

            {!loading && !error && (
              <div className="shrink-0 flex items-center gap-2 bg-slate-900/60 border border-white/10 rounded-xl px-4 py-2 ">
                <Users size={14} className="text-sky-400"/>
                <span className="text-xs font-bold text-slate-300">
                  {filtered.length} <span className="text-slate-500">mostrados</span>
                </span>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/5  w-fit">
              <button 
                onClick={() => setActiveTab("current")}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === "current"
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Parrilla Actual
              </button>
              <button 
                onClick={() => setActiveTab("historical")}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === "historical"
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Campeones e Históricos
              </button>
            </div>

            <div className="relative w-full max-w-xs">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
              <input
                type="text"
                placeholder="Buscar piloto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-900/60 border border-white/10 focus:border-red-500/50 outline-none text-slate-200 placeholder-slate-600 text-xs px-4 py-2.5 pl-9 rounded-xl transition-colors"
              />
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 max-w-6xl mx-auto w-full flex-1">
          {error && (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-400" />
              </div>
              <p className="text-xs text-slate-500 font-sans">{error}</p>
              <button onClick={loadDriver} className="flex items-center gap-2 text-xs font-bold bg-slate-800 border border-white/10 px-4 py-2 rounded-lg">
                <RefreshCw size={12} /> Reintentar
              </button>
            </div>
          )}

          {loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <Search size={24} className="text-slate-600" />
              <p className="text-sm text-slate-500">No se encontraron registros coincidentes.</p>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((driver) => (
                <DriverCard key={driver.id} driver={driver} />
              ))}
            </div>
          )}
        </section>

        <Footer /> 
      </div>
    </main>
  )
}