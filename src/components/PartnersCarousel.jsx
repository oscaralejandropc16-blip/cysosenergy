import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { Award, ShieldCheck, Sparkles, ChevronRight, X, ExternalLink, Building2, FileCheck2, ArrowUpRight } from 'lucide-react';

export const PartnersCarousel = () => {
  const { partners } = useCms();
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedClient(null);
      }
    };
    if (selectedClient) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedClient]);

  const safePartners = Array.isArray(partners) && partners.length > 0 ? partners : [
    {
      id: 'halliburton',
      name: 'HALLIBURTON',
      sub: 'Servicios de Yacimiento & Wellbore',
      contract: 'Alquiler y suministro de equipos pesados, unidades de transporte y soporte técnico de superficie en Base Maturín.',
      type: 'Multinacional USA',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Halliburton_logo.svg/320px-Halliburton_logo.svg.png'
    },
    {
      id: 'slb',
      name: 'SLB (Schlumberger)',
      sub: 'Líder Mundial en Tecnología Petrolera',
      contract: 'Servicio integral de transporte pesado con chutos, tolvas y cisternas para lodos y químicos en pozos de exploración y desarrollo (3 años continuos).',
      type: 'Multinacional USA',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/SLB_Logo_2022.svg/320px-SLB_Logo_2022.svg.png'
    },
    {
      id: 'pdvsa-petrojunin',
      name: 'PDVSA PETROJUNÍN',
      sub: 'Alianza ENI • Faja del Orinoco',
      contract: 'Servicios de asfaltado, inyección continua de reductores de viscosidad EOR y suministro de equipos misceláneos de pozo en División Junín.',
      type: 'Empresa Mixta PDVSA',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/PDVSA_Logo.svg/320px-PDVSA_Logo.svg.png'
    },
    {
      id: 'pdvsa-petromiranda',
      name: 'PDVSA PETROMIRANDA',
      sub: 'Alianza Rosneft • División Junín',
      contract: 'Saneamiento ambiental integral de suelos y cuerpos de agua, succión con unidades vacuum y manejo de fluidos en macollas petroleras.',
      type: 'Empresa Mixta PDVSA',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/PDVSA_Logo.svg/320px-PDVSA_Logo.svg.png'
    }
  ];

  // Repeat the list to create infinite seamless marquee flow
  const marqueeItems = [...safePartners, ...safePartners, ...safePartners];

  return (
    <section className="py-20 md:py-24 relative bg-navy-950 overflow-hidden border-b border-slate-800/80">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gold-metallic/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 shadow-[0_0_20px_rgba(250,204,21,0.1)]">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-[11px] font-black uppercase text-gold-400 tracking-widest font-heading">
                Clientes & Aliados
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
              Empresas que confían en <span className="animate-gradient-text bg-gradient-to-r from-gold-400 via-orange-400 to-flame-500 bg-clip-text text-transparent block mt-1 sm:inline sm:mt-0">CYSOS ENERGY</span>
            </h2>
          </div>
          <p className="text-sm text-slate-400 font-light max-w-md leading-relaxed md:text-right border-l md:border-l-0 md:border-r-2 border-gold-400/30 pl-4 md:pl-0 md:pr-6">
            Trayectoria comprobada operando junto a corporaciones multinacionales y empresas mixtas del sector hidrocarburos.
          </p>
        </div>
      </div>

      {/* CONTINUOUS INFINITE TICKER MARQUEE */}
      <div className="relative w-full overflow-hidden py-12 border-y border-slate-800/40 bg-gradient-to-b from-[#050A14] via-[#081020] to-[#050A14] backdrop-blur-xl">
        
        {/* Massive Fade Masks for cinematic edge blending */}
        <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-64 bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-64 bg-gradient-to-l from-navy-950 via-navy-950/80 to-transparent z-20 pointer-events-none" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-8 sm:gap-10 items-center cursor-pointer px-4">
          {marqueeItems.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              onClick={() => setSelectedClient(partner)}
              className="flex-shrink-0 group/card relative p-6 sm:p-8 rounded-[2.5rem] bg-[#050A14]/60 backdrop-blur-2xl border border-white/5 hover:border-gold-500/30 transition-all duration-700 overflow-hidden flex items-center gap-6 min-w-[400px] sm:min-w-[480px] shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_rgba(250,204,21,0.08)]"
            >
              {/* Ultra-Premium Background Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 via-transparent to-gold-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-500/10 rounded-full blur-[50px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none transform group-hover/card:scale-150" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-flame-500/10 rounded-full blur-[40px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 pointer-events-none" />

              {/* Glass Floating Logo Container */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center p-4 flex-shrink-0 shadow-2xl group-hover/card:scale-105 group-hover/card:-rotate-3 transition-transform duration-700 backdrop-blur-md overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-white rounded-3xl opacity-[0.85] group-hover/card:opacity-100 transition-opacity duration-500" />
                {partner.logoUrl ? (
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="w-full h-full object-contain filter drop-shadow-sm relative z-10 scale-100 group-hover/card:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <Building2 className="w-12 h-12 text-slate-800 relative z-10" />
                )}
              </div>

              {/* Text & Meta Information */}
              <div className="flex-1 min-w-0 relative z-10 flex flex-col justify-center">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="text-lg sm:text-xl font-black font-heading text-white truncate group-hover/card:text-gold-400 transition-colors duration-500 tracking-tight">
                    {partner.name}
                  </h4>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover/card:bg-gold-500 group-hover/card:border-gold-500 group-hover/card:text-navy-950 transition-all duration-500 text-slate-400 flex-shrink-0 transform group-hover/card:rotate-45 group-hover/card:scale-110 shadow-lg">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                
                <p className="text-xs sm:text-sm text-slate-400/90 truncate font-light mb-4 tracking-wide group-hover/card:text-slate-300 transition-colors duration-500">
                  {partner.sub}
                </p>
                
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 border border-white/5 group-hover/card:border-gold-500/20 group-hover/card:bg-black/60 transition-all duration-500 shadow-inner w-fit">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
                  <span className="text-[10px] font-bold uppercase text-slate-300 group-hover/card:text-gold-400 font-heading tracking-[0.2em] transition-colors duration-500">
                    {partner.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INTERACTIVE CLIENT DETAIL MODAL - ULTRA-LUXURY REDESIGN */}
      {selectedClient && (
        <div 
          onClick={() => setSelectedClient(null)}
          className="fixed inset-0 z-[140] flex items-center justify-center p-4 sm:p-6 bg-navy-950/90 backdrop-blur-2xl animate-fadeIn cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-[2.5rem] bg-[#070e22]/95 backdrop-blur-3xl border border-gold-metallic/40 p-6 sm:p-10 space-y-7 shadow-[0_20px_80px_rgba(0,0,0,0.85)] relative cursor-default overflow-hidden animate-scaleUp"
          >
            {/* Ambient Multi-Mesh Lighting */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-flame-500/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Top Bar with Integrated Close Button */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 text-[10px] font-black uppercase tracking-widest font-heading shadow-inner">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                <span>Alianza Corporativa Estratégica</span>
              </div>

              <button
                onClick={() => setSelectedClient(null)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-flame-600 border border-white/10 hover:border-flame-500 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
                title="Cerrar ventana (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Header: Logo and Corporate Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 relative z-10">
              {/* Refined Glass/Glossy Logo Container */}
              <div className="w-28 h-24 sm:w-36 sm:h-28 rounded-3xl bg-white p-3.5 flex items-center justify-center shadow-2xl flex-shrink-0 border border-white/30 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-100" />
                {selectedClient.logoUrl ? (
                  <img 
                    src={selectedClient.logoUrl} 
                    alt={selectedClient.name} 
                    className="w-full h-full object-contain filter drop-shadow-sm relative z-10 scale-100" 
                  />
                ) : (
                  <Building2 className="w-12 h-12 text-slate-800 relative z-10" />
                )}
              </div>

              <div className="space-y-2 flex-1 min-w-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-navy-900/90 border border-gold-400/30 text-[10px] font-black uppercase text-gold-400 tracking-wider font-heading">
                  <Award className="w-3.5 h-3.5 text-flame-500" />
                  <span>{selectedClient.type || 'Cliente Homologado'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight leading-tight">
                  {selectedClient.name}
                </h3>
                {selectedClient.sub && (
                  <p className="text-xs text-slate-300 font-light leading-snug">
                    {selectedClient.sub}
                  </p>
                )}
              </div>
            </div>

            {/* Contract & Operational Scope Box */}
            <div className="relative z-10 rounded-3xl bg-navy-950/90 border border-slate-800 p-6 sm:p-7 space-y-3.5 shadow-inner">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 flex-shrink-0 shadow-gold-glow">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs uppercase font-black tracking-widest text-white font-heading block">
                    Alcance Operativo del Contrato
                  </span>
                  <span className="text-[10px] text-slate-400 font-light">Servicios y equipos suministrados por CYSOS ENERGY</span>
                </div>
              </div>
              
              <p className="text-sm text-slate-200 leading-relaxed font-light pl-1 pt-1 border-t border-slate-800/80">
                {selectedClient.contract}
              </p>

              {/* Operational Metadata Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] flex-shrink-0" />
                  <span>Estatus: <strong className="text-white font-bold">Contrato Ejecutado / Vigente</strong></span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(250,204,21,0.8)] flex-shrink-0" />
                  <span>Estándar: <strong className="text-white font-bold">Homologación PDVSA</strong></span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 w-full sm:w-auto">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-[11px] font-bold text-emerald-300 font-heading">Normas PDVSA SI-HO-S & Calidad ISO 9001</span>
              </div>

              <button
                onClick={() => setSelectedClient(null)}
                className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 hover:from-flame-600 hover:to-gold-700 text-white font-black text-xs uppercase tracking-wider font-heading transition-all shadow-flame-glow transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default PartnersCarousel;
