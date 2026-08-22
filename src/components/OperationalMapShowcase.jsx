import React from 'react';
import { Navigation, Compass, Map as MapIcon, Globe, ExternalLink, ArrowRight, Building2, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

export const OperationalMapShowcase = ({
  mapViewMode,
  setMapViewMode,
  currentHub
}) => {
  const defaultHub = {
    name: 'Sede Central & Corporativa',
    company: 'CYSOS ENERGY, C.A.',
    state: 'Maturín, Estado Monagas, Venezuela',
    address: 'Av. Alirio Ugarte Pelayo, Complejo CCP, Centro Médico Norte, piso 1. Oficina 01-18 Maturín, Edo. Monagas',
    coords: { x: 74, y: 36 },
    phone: '0412-9486249',
    email: 'gerencia@cysosenergy.com',
    rif: 'J-40031863-7',
    status: 'Sede Única Oficial 24/7',
    focus: 'Centro de Mando Administrativo, Laboratorio Reológico EOR, Operaciones de Campo e Ingeniería IPC',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Av.+Alirio+Ugarte+Pelayo,+Complejo+CCP,+Centro+Medico+Norte,+Maturin,+Monagas,+Venezuela',
    embedMapQuery: 'Av.+Alirio+Ugarte+Pelayo,+Complejo+CCP,+Centro+Medico+Norte,+Maturin,+Monagas,+Venezuela'
  };

  const hub = currentHub || defaultHub;

  return (
    <div id="bases-operativas" className="luxury-glass p-5 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden scroll-mt-28">
      
      {/* Header of Map Card with View Mode Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-flame-500/10 border border-flame-500/30 flex items-center justify-center text-flame-500 flex-shrink-0">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black font-heading text-white">
              Ubicación Georreferenciada • Sede Corporativa
            </h3>
            <span className="text-xs text-slate-400 font-light">
              Av. Alirio Ugarte Pelayo, Complejo CCP, Centro Médico Norte, piso 1. Oficina 01-18 Maturín, Edo. Monagas
            </span>
          </div>
        </div>

        {/* View Mode Toggle: Radar vs Google Maps Satellite */}
        <div className="flex items-center gap-2">
          <div className="p-1 bg-navy-900 rounded-xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setMapViewMode('radar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 font-heading ${
                mapViewMode === 'radar'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-gold-400" />
              <span>Radar Vectorial</span>
            </button>

            <button
              onClick={() => setMapViewMode('satellite')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 font-heading ${
                mapViewMode === 'satellite'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5 text-flame-500" />
              <span>Google Maps Satelital</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        
        {/* Left: Vector Radar Map OR Live Google Maps Satellite Embed */}
        <div className="lg:col-span-7 relative aspect-[16/10] bg-navy-950/90 rounded-2xl border border-slate-800/90 p-2 sm:p-4 flex items-center justify-center overflow-hidden shadow-inner">
          
          {mapViewMode === 'satellite' ? (
            /* LIVE GOOGLE MAPS EMBED */
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <iframe
                title="CYSOS Google Maps"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={`https://maps.google.com/maps?q=${hub.embedMapQuery}&t=k&z=17&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full filter contrast-105 brightness-95 rounded-xl"
              />
              <div className="absolute top-3 left-3 bg-navy-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>GPS Oficial: Complejo CCP, Maturín</span>
              </div>
            </div>
          ) : (
            /* HIGH-PRECISION VECTOR RADAR MAP OF VENEZUELA WITH SINGLE MATURIN HQ BEACON */
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-20 pointer-events-none" />

              {/* Accurate Silhouette of Venezuela */}
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] relative z-10 select-none"
              >
                <defs>
                  <linearGradient id="vzla-clean-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E293B" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#0B132B" stopOpacity="0.95" />
                  </linearGradient>

                  <radialGradient id="maturin-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#EA580C" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Accurate Venezuela Geographic Contour Path */}
                <path
                  d="M 120 180 
                     C 135 150, 160 130, 190 125 
                     C 210 120, 230 140, 240 160 
                     C 255 130, 280 100, 300 120 
                     C 320 135, 340 150, 370 145 
                     C 410 140, 450 135, 490 140 
                     C 530 145, 570 135, 600 140 
                     C 630 145, 660 160, 680 185 
                     C 700 210, 720 230, 710 260 
                     C 700 290, 680 320, 650 360 
                     C 620 400, 590 440, 570 480 
                     C 550 520, 520 560, 480 570 
                     C 440 580, 400 550, 370 510 
                     C 340 470, 320 430, 290 390 
                     C 260 350, 230 320, 190 280 
                     C 150 240, 110 210, 120 180 Z"
                  fill="url(#vzla-clean-gradient)"
                  stroke="#D97706"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />

                {/* Orinoco River Energy Line */}
                <path
                  d="M 370 510 Q 500 370 680 260"
                  stroke="#38BDF8"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.4"
                />

                {/* SINGLE PRECISE BEACON IN MATURIN (x: 592, y: 216) */}
                <g
                  onClick={() => window.open(hub.googleMapsUrl, '_blank')}
                  className="cursor-pointer group"
                >
                  {/* Expanding Radar Wave */}
                  <circle cx="592" cy="216" r="45" fill="url(#maturin-glow)">
                    <animate attributeName="r" values="20;55;20" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
                  </circle>

                  <circle cx="592" cy="216" r="28" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3">
                    <animate attributeName="r" values="15;38;15" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2.5s" repeatCount="indefinite" />
                  </circle>

                  {/* Outer Pin Body */}
                  <circle
                    cx="592"
                    cy="216"
                    r="14"
                    fill="#EA580C"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    className="transition-transform duration-200 group-hover:scale-110 shadow-lg"
                  />

                  {/* Core Center Dot */}
                  <circle cx="592" cy="216" r="5" fill="#FFFFFF" />

                  {/* Label Tag on Map */}
                  <rect
                    x="614"
                    y="200"
                    width="170"
                    height="32"
                    rx="8"
                    fill="#050A14"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    opacity="0.95"
                    className="shadow-xl"
                  />
                  <text
                    x="624"
                    y="221"
                    fill="#FACC15"
                    fontSize="12"
                    fontFamily="system-ui, sans-serif"
                    fontWeight="bold"
                    className="select-none font-heading"
                  >
                    📍 Sede Central • Maturín
                  </text>
                </g>
              </svg>

              <div className="absolute bottom-3 left-4 text-[11px] text-slate-400 font-sans tracking-wide flex items-center gap-2 bg-navy-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Toque la baliza para abrir la ubicación exacta en Google Maps</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Selected Hub Technical Info Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-navy-900/95 border border-slate-800 space-y-4 relative">
            
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-md bg-flame-500/10 text-flame-400 text-[11px] font-black uppercase tracking-wider border border-flame-500/20 font-heading flex items-center gap-1.5 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-flame-400 animate-pulse" />
                  {hub.status}
                </span>
                <h4 className="text-lg sm:text-xl font-black font-heading text-white pt-1">
                  {hub.name}
                </h4>
                <span className="text-xs text-gold-400 font-bold block">{hub.state}</span>
              </div>

              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-gold-400 flex-shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-flame-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed font-light">{hub.address}</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href={`tel:+584129486249`} className="text-white font-medium hover:text-gold-400 transition-colors font-sans tracking-wide">
                  {hub.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href={`mailto:${hub.email}`} className="text-gold-400 font-sans tracking-wide font-medium hover:underline">
                  {hub.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-emerald-400 font-bold font-mono text-[11px] tracking-wide">
                  RIF: {hub.rif || 'J-40031863-7'}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-black block mb-1 font-heading">
                Instalación Principal:
              </span>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {hub.focus}
              </p>
            </div>

            {/* Direct Google Maps Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href={hub.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-colors font-heading"
              >
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>Ver en Google Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <button
                type="button"
                onClick={() => {
                  const formElement = document.getElementById('formulario-cotizacion');
                  if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
                }}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-flame-500 via-orange-600 to-amber-500 hover:from-flame-600 hover:to-amber-600 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all font-heading"
              >
                <span>Cotizar Proyecto</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
