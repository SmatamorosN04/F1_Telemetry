'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex justify-between items-center shrink-0 font-mono">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-lg font-black tracking-tighter text-red-500 flex items-center gap-2">
          <span className="bg-red-600 text-slate-950 px-1.5 py-0.5 rounded text-xs font-black">F1</span>
          PRO TELEMETRY
        </Link>
      </div>
      
      <div className="flex items-center gap-6 text-xs font-bold tracking-wider uppercase">
        <Link href="/" className="text-slate-400 hover:text-white transition-colors">
          Inicio
        </Link>
        <Link href="/drivers" className="text-slate-400 hover:text-white transition-colors">
          Pilotos
        </Link>
        <Link href="/telemetry" className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded transition-colors">
          ANALIZAR TELEMETRÍA 🏎️
        </Link>
      </div>
    </nav>
  );
}