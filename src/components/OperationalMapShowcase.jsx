import React from 'react';
import { Navigation, Compass, Map as MapIcon, Globe, ExternalLink, ArrowRight, Building2, MapPin, Phone, Mail } from 'lucide-react';

export const OperationalMapShowcase = ({
  operationalHubs,
  selectedHub,
  handleSelectHub,
  mapViewMode,
  setMapViewMode,
  currentHub
}) => {
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
              Despliegue Operativo Georreferenciado • Venezuela
            </h3>
            <span className="text-xs text-slate-400 font-light">
              Toque cualquier baliza para abrir su ubicación exacta en Google Maps
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

      {/* Hub Selector Pills */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        {[
          { id: 'maturin', label: 'Maturín (Sede Principal)' },
          { id: 'faja', label: 'Faja del Orinoco' },
          { id: 'eltigre', label: 'El Tigre / San Tomé' },
          { id: 'zulia', label: 'Zulia / Costa Oriental' }
        ].map((hub) => (
          <button
            key={hub.id}
            onClick={() => handleSelectHub(hub.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 font-heading ${
              selectedHub === hub.id
                ? 'bg-gradient-to-r from-flame-500 via-orange-600 to-amber-500 text-white shadow-md'
                : 'bg-navy-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${selectedHub === hub.id ? 'bg-white' : 'bg-gold-400'}`} />
            <span>{hub.label}</span>
          </button>
        ))}
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
                src={`https://maps.google.com/maps?q=${currentHub.embedMapQuery}&t=k&z=13&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full filter contrast-105 brightness-95 rounded-xl"
              />
              <div className="absolute top-3 left-3 bg-navy-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>GPS en Vivo: {currentHub.name}</span>
              </div>
            </div>
          ) : (
            /* HIGH-PRECISION VECTOR RADAR MAP OF VENEZUELA */
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

                {/* Laser Connections Between Hubs */}
                <line x1="592" y1="216" x2="536" y2="312" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                <line x1="536" y1="312" x2="496" y2="264" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                <line x1="496" y1="264" x2="200" y2="192" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />

                {/* INTERACTIVE RADAR BEACONS */}
                {Object.entries(operationalHubs).map(([key, hub]) => {
                  const isSelected = selectedHub === key;
                  const posX = (hub.coords.x * 800) / 100;
                  const posY = (hub.coords.y * 600) / 100;

                  return (
                    <g
                      key={key}
                      onClick={() => {
                        handleSelectHub(key);
                        window.open(hub.googleMapsUrl, '_blank');
                      }}
                      className="cursor-pointer group"
                    >
                      {/* Solid Invisible Hit Target */}
                      <circle cx={posX} cy={posY} r={30} fill="transparent" />

                      {/* Outer Pin Body */}
                      <circle
                        cx={posX}
                        cy={posY}
                        r={isSelected ? 13 : 8}
                        fill={isSelected ? '#EA580C' : '#D97706'}
                        stroke="#FFFFFF"
                        strokeWidth={isSelected ? 2.5 : 1.5}
                        className="pointer-events-none transition-colors duration-200 group-hover:fill-flame-400"
                      />

                      {/* Core Center Dot */}
                      <circle cx={posX} cy={posY} r={isSelected ? 4.5 : 3} fill="#FFFFFF" className="pointer-events-none" />

                      {/* Label Tag on Map */}
                      <rect
                        x={posX + 14}
                        y={posY - 14}
                        width={hub.name.length * 7.5 + 20}
                        height="24"
                        rx="6"
                        fill="#050A14"
                        stroke={isSelected ? '#F59E0B' : '#475569'}
                        strokeWidth="1.2"
                        className="pointer-events-none"
                        opacity="0.95"
                      />
                      <text
                        x={posX + 22}
                        y={posY + 2}
                        fill={isSelected ? '#FACC15' : '#FFFFFF'}
                        fontSize="11"
                        fontFamily="system-ui, sans-serif"
                        fontWeight="bold"
                        className="pointer-events-none select-none font-heading"
                      >
                        📍 {hub.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-3 left-4 text-[11px] text-slate-400 font-sans tracking-wide flex items-center gap-2 bg-navy-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Toque cualquier baliza para abrir en Google Maps</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Selected Hub Technical Info Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-navy-900/95 border border-slate-800 space-y-4 relative">
            
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-md bg-flame-500/10 text-flame-400 text-[11px] font-black uppercase tracking-wider border border-flame-500/20 font-heading">
                  {currentHub.status}
                </span>
                <h4 className="text-lg sm:text-xl font-black font-heading text-white pt-1">
                  {currentHub.name}
                </h4>
                <span className="text-xs text-gold-400 font-bold block">{currentHub.state}</span>
              </div>

              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-gold-400 flex-shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-flame-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed font-light">{currentHub.address}</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href={`tel:${currentHub.phone.split('/')[0].trim()}`} className="text-white font-medium hover:text-gold-400 transition-colors font-sans tracking-wide">
                  {currentHub.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href={`mailto:${currentHub.email}`} className="text-gold-400 font-sans tracking-wide font-medium hover:underline">
                  {currentHub.email}
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-black block mb-1 font-heading">
                Especialidad Operativa en esta Región:
              </span>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {currentHub.focus}
              </p>
            </div>

            {/* Direct Google Maps Button */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href={currentHub.googleMapsUrl}
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
                <span>Cotizar en esta Base</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
