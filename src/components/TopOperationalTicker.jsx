import React, { useState } from 'react';
import { ShieldCheck, PhoneCall, FileText, ChevronRight, MapPin, X } from 'lucide-react';

export const TopOperationalTicker = ({ onOpenDossier }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Estado operativo y avisos de Cysos Energy"
      className="w-full bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border-b border-energy-sky/20 text-xs py-1.5 sm:py-2 px-2.5 sm:px-6 shadow-luxury select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-slate-200">
        
        {/* Left: Operational Status & Live Beacon */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden text-left flex-shrink min-w-0">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-emerald-950/80 border border-emerald-500/40 px-2 sm:px-2.5 py-0.5 rounded-md flex-shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] sm:text-[10px] font-black uppercase tracking-wider text-emerald-300 font-heading whitespace-nowrap">
              <span className="hidden sm:inline">ESTADO OPERACIONAL: </span>100% ACTIVO 24/7
            </span>
          </div>

          <span className="hidden md:inline-block text-slate-600">|</span>

          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-slate-300 whitespace-nowrap">
            <MapPin className="w-3.5 h-3.5 text-energy-sky flex-shrink-0" />
            <span>Faja del Orinoco & Base Maturín</span>
          </div>

          <span className="hidden xl:inline-block text-slate-600">|</span>

          <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-slate-300 whitespace-nowrap">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="text-slate-300">RACDA N° 2026-I • SAPI • PDVSA SI-HO-S</span>
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

