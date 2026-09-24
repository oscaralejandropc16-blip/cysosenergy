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
              <Compass className="w-3.5 h-3.5 text-slate-300" />
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

      <div className="flex flex-col gap-6 sm:gap-8">
        
        {/* Top: Vector Radar Map OR Live Google Maps Satellite Embed */}
        <div className="relative aspect-[16/10] sm:aspect-[21/9] lg:aspect-[16/10] bg-navy-950/90 rounded-2xl border border-slate-800/90 p-2 flex items-center justify-center overflow-hidden shadow-inner">
          
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
              <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>GPS Oficial: Complejo CCP, Maturín</span>
              </div>
            </div>
          ) : (
            /* HIGH-TECH ABSTRACT RADAR (Corporate & Premium) */
            <div className="relative w-full h-full flex items-center justify-center bg-[#060B14] overflow-hidden rounded-xl border border-slate-800/60 shadow-inner">
              
              {/* Radar Grid Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

              {/* Concentric Radar Circles */}
              <div className="absolute w-[800px] h-[800px] rounded-full border border-slate-800/40" />
              <div className="absolute w-[600px] h-[600px] rounded-full border border-slate-700/40" />
              <div className="absolute w-[400px] h-[400px] rounded-full border border-slate-600/40" />
              <div className="absolute w-[200px] h-[200px] rounded-full border border-slate-500/40 border-dashed animate-[spin_40s_linear_infinite]" />
              
              {/* Radar Sweep Line */}
              <div className="absolute w-[400px] h-[400px] rounded-full overflow-hidden origin-center">
                <div className="absolute top-1/2 right-1/2 w-[400px] h-[400px] origin-bottom-right bg-gradient-to-tr from-flame-500/0 via-flame-500/10 to-flame-500/40 animate-[spin_4s_linear_infinite]" />
              </div>
              
              {/* Crosshairs */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-[1px] bg-slate-800/60" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-[1px] bg-slate-800/60" />
              </div>

              {/* Sede Beacon in Center */}
              <div 
                className="absolute flex items-center justify-center cursor-pointer group"
                onClick={() => window.open(hub.googleMapsUrl, '_blank')}
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              >
                {/* Ping effects */}
                <div className="absolute w-24 h-24 rounded-full border border-flame-500/30 animate-ping opacity-75" />
                <div className="absolute w-12 h-12 rounded-full bg-flame-500/20 animate-pulse" />
                
                {/* Core Dot */}
                <div className="w-4 h-4 rounded-full bg-flame-500 shadow-[0_0_15px_rgba(234,88,12,0.8)] border-2 border-white relative z-10 group-hover:scale-125 transition-transform duration-300" />
                
                {/* Tech Data Tag */}
                <div className="absolute left-6 top-6 bg-slate-900/95 backdrop-blur-md border border-slate-700 px-3.5 py-2 rounded-lg shadow-2xl flex flex-col min-w-max pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 z-20">
                  <span className="text-[10px] font-heading font-black text-flame-400 uppercase tracking-wider mb-0.5">Centro de Control</span>
                  <span className="text-xs font-sans font-bold text-white">Maturín, VEN</span>
                  <span className="text-[9px] font-mono text-slate-400 mt-1 flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-slate-500" />
                    9.7456° N, 63.1832° W
                  </span>
                </div>
              </div>

              {/* Bottom Info Ribbon */}
              <div className="absolute bottom-3 left-4 text-[11px] text-slate-400 font-sans tracking-wide flex items-center gap-2 bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-800 shadow-md hidden sm:flex">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Toque la baliza central para abrir en Google Maps</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom: Selected Hub Technical Info Card (Premium Design - No Yellow) */}
        <div className="w-full space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-800 space-y-4 relative shadow-xl">
            
            {/* Header Area */}
            <div className="flex items-start justify-between border-b border-slate-800/80 pb-4">
              <div className="space-y-1.5">
                <span className="px-2.5 py-0.5 rounded-md bg-flame-500/10 text-flame-400 text-[10px] font-black uppercase tracking-wider border border-flame-500/20 font-heading flex items-center gap-1.5 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-flame-400 animate-pulse" />
                  {hub.status}
                </span>
                <h4 className="text-lg sm:text-xl font-black font-heading text-white pt-1">
                  {hub.name}
                </h4>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  {hub.state}
                </span>
              </div>

              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-flame-400 flex-shrink-0 shadow-inner hidden sm:flex">
                <Building2 className="w-5 h-5" />
              </div>
            </div>

            {/* Location & Registry List */}
            <div className="space-y-4 text-xs pt-2">
              <div className="flex items-start gap-3 text-slate-300">
                <div className="p-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-flame-400 flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="leading-relaxed font-sans">{hub.address}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex-shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-emerald-400 font-bold font-mono tracking-wide">
                  RIF: {hub.rif || 'J-40031863-7'}
                </span>
              </div>
            </div>

            {/* Technical Focus */}
            <div className="pt-3 border-t border-slate-800">
              <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                <strong className="text-slate-300 font-semibold font-heading mr-1">Instalación Principal:</strong>
                {hub.focus}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default OperationalMapShowcase;
