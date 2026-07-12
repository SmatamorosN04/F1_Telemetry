import { Hash, Calendar} from "lucide-react";
import { Driver } from "@/src/services/api";
import { countryCodeToFlag } from "@/src/utils/flags";

export default function DriverCard({driver}: {driver: Driver}) {
    const flag = countryCodeToFlag(driver.country?.alphaTwoCode);
    const birthYear = driver.birthDate ? new Date(driver.birthDate).getFullYear(): null;
    const isDeceased = !!driver.deathDate

    return (
        <div className="group relative bg-linear-to-b from-slate-900/70 to-slate-950/50 backdrop-blur-xl border border-white/10 hover:border-red-500/40 rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0,0.25)] hover:-translate-y-0.5 flex flex-col gap-2 overflow-hidden ">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

            <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-black uppercase tracking-tight text-slate-100 leading-tight">
                    {driver.firstName} <span className="text-white">{driver.lastName}</span>
                </h3>
                {driver.number != null && (
                    <span className="shrink-0 text-xs font-black text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Hash size={9}/>
                        {driver.number}
                    </span>
                )}
            </div>

            {driver.tla && (
                <span className="w-fit text-xs font-black tracking-widest text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded">
                    {driver.tla}
                </span>
            )}

            <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between gap-2">
             <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono truncate">
                <span className="text-base leading-none">{flag}</span>
                <span className="truncate">{driver.country?.name ?? "-"}</span>
             </span>

             {birthYear && (
                <span className="shrink-0 flex items-center gap-1 text-xs text-slate-500 font-mono">
                    <Calendar size={9}/>
                    {birthYear}
                    {isDeceased && (
                        <span className="text-slate-600">
                            -{new Date(driver.deathDate!).getFullYear()}
                        </span>
                    )}
                </span>
             )}
            </div>
        </div>
    )
};