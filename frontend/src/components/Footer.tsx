
import {  Terminal } from "lucide-react"

export default function Footer(){
    return(
        <footer className="w-full bg-slate-900/30 border-t border-slate-900 px-6 py-6 not-only:mt-12">
                <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <div className="flex flex-col gap-1">
                        <div className="text-xs font-black tracking-wider text-slate-300 flex items-center justify-center md:justify-start gap-1.5">
                            <span className="bg-slate-800 text-red-500 px-1 py-0.5 rounded text-xs font-black border border-slate-700">LIVE</span>
                        F1 PRO TELEMETRY
                        </div>
                        <p className="text-xs text-slate-500 font-sans">
                            Auditoria de flujos analiticos de automovilismo. 
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 text-[10px] text-slate-400">
                        <div className="flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-slate-500">SYSTEM: ONLINE</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500">
                            <Terminal size={11} />
                            <span>SERGIO.DEV</span>
                        </div>
                        <div className="text-slate-600">
                            © {new Date().getFullYear()} F1PT
                        </div>
                    </div>
                </div>
            </footer>
    )
}