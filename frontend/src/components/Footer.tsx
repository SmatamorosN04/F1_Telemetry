
import {  Terminal } from "lucide-react"

export default function Footer(){
    return(
        <footer className="w-full bg-slate-950/40 border-t border-white/10 backdrop-blur-2xl px-6 py-6 mt-12 relative z-10">
                <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <div className="flex flex-col gap-1">
                        <div className="text-xs font-black tracking-wider text-slate-300 flex items-center justify-center md:justify-start gap-1.5">
                            <span className="bg-white/10 text-red-500 px-1.5 py-0.5 rounded text-[9px] font-black border border-white/10">LIVE</span>
                            F1 PRO TELEMETRY
                        </div>
                        <p className="text-[10px] text-slate-500 font-sans">
                            Auditoría de flujos analíticos de automovilismo. Desarrollado con Next.js, FastAPI y OpenF1 Data API.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 text-[10px] text-slate-400">
                        <div className="flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500" />
                            <span className="text-slate-500">SYSTEM: ONLINE</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500">
                            <Terminal size={11} />
                            <span>Sergio DEv</span>
                        </div>
                        <div className="text-slate-600">
                            © {new Date().getFullYear()} F1PT
                        </div>
                    </div>
                </div>
            </footer>
    )
}