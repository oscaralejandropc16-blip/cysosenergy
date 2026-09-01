import React, { useState } from 'react';
import { ShieldCheck, PhoneCall, Mail, FileText, ChevronRight, Sparkles, Clock, MapPin, X } from 'lucide-react';

export const TopOperationalTicker = ({ onOpenDossier }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Estado operativo y avisos de Cysos Energy"
      className="relative z-50 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border-b border-gold-metallic/30 text-xs py-2 px-3 sm:px-6 shadow-luxury"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-slate-200">
        
        {/* Left: Operational Status & Live Beacon */}
        <div className="flex items-center gap-3 overflow-hidden text-center md:text-left flex-wrap justify-center">
          <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 font-heading">
              Estado Operacional: 100% Activo 24/7
            </span>
          </div>

          <span className="hidden lg:inline-block text-slate-600">|</span>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
            <span>Faja del Orinoco & Base Maturín</span>
          </div>

          <span className="hidden xl:inline-block text-slate-600">|</span>

          <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="text-slate-300">RACDA N° 2026-I • SAPI • PDVSA SI-HO-S</span>
          </div>
        </div>

        {/* Right: Emergency Hotline + Dossier Action */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
          <a
            href="tel:+584129486249"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-200 hover:text-gold-300 transition-colors px-2 py-0.5 rounded hover:bg-white/5"
            title="Línea de Guardia Operativa Cysos Energy"
          >
            <PhoneCall className="w-3 h-3 text-flame-500" />
            <span className="font-heading">Guardia: 0412-9486249</span>
          </a>

          <span className="text-slate-600 hidden sm:inline">•</span>

          <button
            onClick={onOpenDossier}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-gold-500/20 to-flame-500/20 hover:from-gold-500/30 hover:to-flame-500/30 border border-gold-metallic/50 text-[11px] font-bold text-gold-300 hover:text-white transition-all transform hover:scale-105"
          >
            <FileText className="w-3 h-3 text-gold-400" />
            <span>Dossier Corporativo 2026</span>
            <ChevronRight className="w-3 h-3 text-gold-400" />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-500 hover:text-slate-300 p-0.5 ml-1 transition-colors"
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
