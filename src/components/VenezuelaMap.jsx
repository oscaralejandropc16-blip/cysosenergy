import React, { useState } from 'react';
import { MapPin, Shield, CheckCircle2, PhoneCall, Globe2, Sparkles, ArrowRight } from 'lucide-react';

export const VenezuelaMap = () => {
  const [activeBasin, setActiveBasin] = useState('orinoco');

  const basins = {
    orinoco: {
      name: 'Faja Petrolífera del Orinoco "Hugo Chávez"',
      tag: 'Mayor Reserva Mundial de Crudo Extrapesado',
      image: '/images/hero_oilfield.png',
      location: 'Bloques Carabobo, Junín, Ayacucho y Boyacá (Anzoátegui / Monagas / Guárico)',
      apiRange: '8.0° - 10.5° API (Crudo Extrapesado)',
      services: [
        'Inyección continua de reductores de viscosidad CYSOS EOR System',
        'Estimulación química en matriz de pozo sin taladro',
        'Almacenamiento y logística pesada de aditivos químicos',
        'Pruebas de restauración de presión y Well Testing de superficie'
      ],
      kpi: '8,500 cPs -> 320 cPs (Reducción Eficiente)'
    },
    maracaibo: {
      name: 'Cuenca Maracaibo - Zulia',
      tag: 'Yacimientos Históricos y Facilidades de Lago',
      image: '/images/IMG_7702.jpg',
      location: 'Costa Oriental del Lago, Campo Boscán, Tía Juana, Lagunillas',
      apiRange: '10.0° - 18.0° API (Crudo Pesado)',
      services: [
        'Inyección de demulsificantes y clarificadores de agua de producción',
        'Coiled Tubing y sustitución de fluidos en tubería continua',
        'Procura internacional de tuberías y repuestos hidráulicos',
        'Tratamiento antiasfalténico y prevención de incrustaciones'
      ],
      kpi: '100% Tratamiento de Emulsiones Complejas'
    },
    oriental: {
      name: 'Cuenca Oriental (Anzoátegui & Monagas)',
      tag: 'Infraestructura de Transporte y Oleoductos',
      image: '/images/IMG_7549.jpg',
      location: 'El Tigre, Maturín, San Tomé, Complejo Industrial Jose',
      apiRange: '12.0° - 24.0° API (Crudo Mediano y Pesado)',
      services: [
        'Reducción de fricción en líneas de recolección y oleoductos principales',
        'Inyección de biocidas e inhibidores de corrosión',
        'Servicios integrales de laboratorio reológico y pruebas de pozo',
        'Logística y transporte pesado en cisternas autorizadas'
      ],
      kpi: 'Logística Activa 24/7 en Anzoátegui y Monagas'
    }
  };

  const current = basins[activeBasin];

  return (
    <section id="cobertura" className="py-20 md:py-24 relative bg-navy-950 border-t border-slate-800/80 overflow-hidden">
      
      {/* Glow Backdrop */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-gold-metallic/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-metallic/40 text-gold-400 text-xs font-black uppercase tracking-wider shadow-gold-glow font-heading">
            <MapPin className="w-4 h-4 text-flame-500" />
            <span>Presencia Operativa en Venezuela</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
            Cobertura Operativa en <span className="animate-gradient-text">Cuencas Petroleras</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base font-light">
            Bases operativas, personal técnico y logística desplegada en los principales distritos petroleros de Venezuela.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="inline-flex p-1.5 bg-navy-900/90 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-xl gap-1">
            {[
              { id: 'orinoco', label: 'Faja del Orinoco' },
              { id: 'maracaibo', label: 'Cuenca Maracaibo / Zulia' },
              { id: 'oriental', label: 'Cuenca Oriental' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveBasin(tab.id)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 font-heading ${
                  activeBasin === tab.id
                    ? 'bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 text-white shadow-flame-glow scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-navy-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Photographic Showcase Card */}
        <div className="luxury-glass rounded-3xl border border-gold-metallic/35 overflow-hidden shadow-2xl grid lg:grid-cols-12 items-center">
          
          {/* Photographic Banner */}
          <div className="lg:col-span-6 relative h-72 sm:h-80 lg:h-full min-h-[320px] group overflow-hidden">
            <img
              src={current.image}
              alt={current.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.82]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy-950" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-full bg-navy-950/90 text-gold-400 text-xs font-black uppercase border border-gold-metallic/40 backdrop-blur-md font-heading">
                {current.tag}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 lg:hidden">
              <h3 className="text-lg sm:text-xl font-black font-heading text-white">{current.name}</h3>
            </div>
          </div>

          {/* Basin Information */}
          <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 space-y-6">
            <div>
              <span className="text-xs text-gold-400 font-black uppercase tracking-wider block mb-1 font-heading">
                {current.apiRange}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-heading text-white mb-2">
                {current.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-flame-500 flex-shrink-0" />
                <span>{current.location}</span>
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-heading">
                Operaciones Desplegadas en esta Cuenca:
              </h4>
              <ul className="space-y-2">
                {current.services.map((srv, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                    <span className="font-light">{srv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block font-heading">Desempeño Comprobado:</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-400">{current.kpi}</span>
              </div>
              <a
                href="#contacto"
                className="px-5 py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 hover:from-flame-600 hover:to-gold-700 shadow-flame-glow flex items-center justify-center gap-2 font-heading"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Solicitar Cobertura</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
