import React, { useState } from 'react';
import { ShieldCheck, PhoneCall, FileText, ChevronRight, MapPin, X } from 'lucide-react';

export const TopOperationalTicker = ({ onOpenDossier }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Estado operativo y avisos de Cysos Energy"
      className="w-full relative z-50 bg-navy-950/85 backdrop-blur-xl border-b border-white/5 text-xs py-2 px-3 sm:px-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)] select-none overflow-hidden"
    >
      {/* Subtle Animated Gradient Glow behind the ticker */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-flame-500/5 to-transparent opacity-50 animate-pulse" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-slate-200 relative z-10">
        
        {/* Left: Operational Status & Live Beacon */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-hidden text-left flex-shrink min-w-0">
          
          {/* Premium Active Status */}
          <div className="inline-flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-md flex-shrink-0 shadow-[inset_0_0_10px_rgba(16,185,129,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-400 font-heading whitespace-nowrap">
              Operaciones 100% Activas
            </span>
          </div>

          <span className="hidden md:inline-block text-slate-600/50">|</span>

          {/* Premium Location */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-slate-400 whitespace-nowrap font-medium">
            <MapPin className="w-3.5 h-3.5 text-flame-500 flex-shrink-0" />
            <span>Faja Petrolífera del Orinoco</span>
          </div>

          <span className="hidden xl:inline-block text-slate-600/50">|</span>

          {/* Premium Certifications */}
          <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-slate-400 whitespace-nowrap font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <span>RACDA • ISO 9001 • SI-HO-S</span>
          </div>
        </div>

        {/* Right: Emergency Hotline + Dossier Action + Close */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          <a
            href="tel:+584129486249"
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-200 hover:text-energy-sky transition-colors px-2 py-0.5 rounded hover:bg-white/5 whitespace-nowrap"
            title="Línea de Guardia Operativa Cysos Energy"
          >
            <PhoneCall className="w-3 h-3 text-flame-500" />
            <span className="font-heading">Guardia: 0412-9486249</span>
          </a>

          <a
            href="tel:+584129486249"
            className="sm:hidden inline-flex items-center justify-center w-7 h-7 rounded-md bg-white/5 hover:bg-white/10 text-flame-400 hover:text-energy-sky transition-colors"
            title="Llamar a Guardia: 0412-9486249"
            aria-label="Llamar a Guardia Operativa"
          >
            <PhoneCall className="w-3 h-3" />
          </a>

          <span className="text-slate-600 hidden md:inline">•</span>

          <button
            onClick={onOpenDossier}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-md bg-gradient-to-r from-energy-cyan/20 to-flame-500/20 hover:from-energy-cyan/30 hover:to-flame-500/30 border border-energy-sky/30 text-[10px] sm:text-[11px] font-bold text-energy-sky hover:text-white transition-all whitespace-nowrap active:scale-95"
          >
            <FileText className="w-3 h-3 text-energy-sky flex-shrink-0" />
            <span>Dossier <span className="hidden xs:inline">Corporativo</span></span>
            <ChevronRight className="w-3 h-3 text-energy-sky flex-shrink-0" />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-500 hover:text-slate-300 p-1 ml-0.5 transition-colors flex-shrink-0"
            title="Cerrar aviso"
            aria-label="Cerrar barra informativa"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};

export default TopOperationalTicker;

