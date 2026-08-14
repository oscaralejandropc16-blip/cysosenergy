import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Award, ShieldCheck, Sparkles, ChevronRight, X, ExternalLink, Building2 } from 'lucide-react';

export const PartnersCarousel = () => {
  const { partners } = useCms();
  const [selectedClient, setSelectedClient] = useState(null);

  const safePartners = Array.isArray(partners) && partners.length > 0 ? partners : [
    {
      id: 'halliburton',
      name: 'HALLIBURTON',
      sub: 'Servicios de Yacimiento',
      contract: 'Alquiler de Equipos Livianos y Pesados en Base Maturín.',
      type: 'Multinacional USA',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Halliburton_logo.svg/320px-Halliburton_logo.svg.png'
    },
    {
      id: 'slb',
      name: 'SLB (Schlumberger)',
      sub: 'Líder Mundial en Tecnología',
      contract: 'Servicio de Transporte Pesado de Chutos, Bateas y Tolvas (3 años).',
      type: 'Multinacional USA',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/SLB_Logo_2022.svg/320px-SLB_Logo_2022.svg.png'
    },
    {
      id: 'pdvsa-petrojunin',
      name: 'PDVSA PETROJUNÍN',
      sub: 'Alianza ENI • Faja del Orinoco',
      contract: 'Servicios de Asfaltado, Inyección de Reductor de Viscosidad y Equipos Misceláneos.',
      type: 'Empresa Mixta PDVSA',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/PDVSA_Logo.svg/320px-PDVSA_Logo.svg.png'
    },
    {
      id: 'pdvsa-petromiranda',
      name: 'PDVSA PETROMIRANDA',
      sub: 'Alianza Rosneft • División Junín',
      contract: 'Saneamiento de Suelos y Cuerpos de Agua Afectados por Derrame de DCO.',
      type: 'Empresa Mixta PDVSA',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/PDVSA_Logo.svg/320px-PDVSA_Logo.svg.png'
    }
  ];

  // Repeat the list to create infinite seamless marquee flow
  const marqueeItems = [...safePartners, ...safePartners, ...safePartners];

  return (
    <section className="py-20 relative bg-navy-950 overflow-hidden border-b border-slate-800">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gold-metallic/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-900 border border-gold-metallic/30 text-gold-400 text-xs font-extrabold uppercase tracking-wider mb-3 shadow-gold-glow">
              <Award className="w-3.5 h-3.5 text-flame-500" />
              <span>Clientes & Aliados Estratégicos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight">
              Empresas que Confían en <span className="animate-gradient-text">CYSOS ENERGY</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-light max-w-md">
            Trayectoria comprobada con corporaciones multinacionales, empresas mixtas y entes estatales de Venezuela.
          </p>
        </div>
      </div>

      {/* CONTINUOUS INFINITE TICKER MARQUEE */}
      <div className="relative w-full overflow-hidden py-6 border-y border-slate-800/80 bg-navy-900/60 backdrop-blur-md">
        
        {/* Left and Right Fade Masks for smooth edge blending */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-navy-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-navy-950 to-transparent z-20 pointer-events-none" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-5 items-center cursor-pointer">
          {marqueeItems.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              onClick={() => setSelectedClient(partner)}
              className="flex-shrink-0 group/card bg-navy-900/90 hover:bg-navy-850 p-4 sm:p-5 rounded-2xl border border-slate-800 hover:border-gold-metallic/60 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-gold-glow flex items-center gap-4 min-w-[320px] sm:min-w-[360px]"
            >
              {/* HIGH-CONTRAST WHITE BADGE FOR ALL BRAND LOGOS */}
              <div className="w-24 sm:w-28 h-14 sm:h-16 rounded-xl bg-white/95 border border-white/90 flex items-center justify-center p-2.5 flex-shrink-0 shadow-lg group-hover/card:scale-105 group-hover/card:bg-white transition-all">
                {partner.logoUrl ? (
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                ) : (
                  <Building2 className="w-7 h-7 text-navy-900" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black font-heading text-white truncate group-hover/card:text-gold-400 transition-colors">
                    {partner.name}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-300 truncate font-medium mt-0.5">{partner.sub}</p>
                <span className="inline-block text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-gold-metallic/15 text-gold-400 border border-gold-metallic/30 mt-1">
                  {partner.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INTERACTIVE CLIENT DETAIL MODAL */}
      {selectedClient && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-950/90 backdrop-blur-xl animate-fadeIn">
          <div className="luxury-glass w-full max-w-lg rounded-3xl border border-gold-metallic/40 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 rounded-2xl bg-white border border-white/80 p-2.5 flex items-center justify-center shadow-lg">
                  {selectedClient.logoUrl ? (
                    <img src={selectedClient.logoUrl} alt={selectedClient.name} className="w-full h-full object-contain" />
                  ) : (
                    <Building2 className="w-8 h-8 text-navy-900" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold font-heading text-white">{selectedClient.name}</h3>
                  <span className="text-xs text-gold-400 font-bold">{selectedClient.type}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 rounded-xl bg-navy-900 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 bg-navy-900/80 p-5 rounded-2xl border border-slate-800">
              <span className="text-[10px] text-gold-400 uppercase font-extrabold tracking-wider block">
                Alcance y Objeto del Contrato:
              </span>
              <p className="text-sm text-slate-200 leading-relaxed font-light">
                {selectedClient.contract}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedClient(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 text-white font-extrabold text-xs shadow-flame-glow"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default PartnersCarousel;
