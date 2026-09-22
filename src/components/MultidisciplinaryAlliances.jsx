import React from 'react';
import { FlaskConical, Truck, Globe, Flame, ShieldCheck, Sparkles, Award, ArrowUpRight, CheckCircle2, Building2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';

const iconMap = {
  FlaskConical,
  Truck,
  Globe,
  Flame,
  Sparkles
};

const AllianceLogo = ({ logoUrl, name, Icon }) => {
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    setImgError(false);
  }, [logoUrl]);

  if (!logoUrl || imgError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Icon className="w-8 h-8 text-navy-900" />
      </div>
    );
  }

  return (
    <img 
      src={logoUrl} 
      alt={`${name} logo`} 
      className="w-full h-full object-contain p-1"
      onError={() => setImgError(true)}
    />
  );
};

export const MultidisciplinaryAlliances = () => {
  const { alliances } = useCms();

  const allianceEntities = Array.isArray(alliances) && alliances.length > 0 ? alliances : [];

  return (
    <section id="especialidades" className="py-20 md:py-24 relative bg-navy-950 border-t border-slate-800/80 overflow-hidden">
      
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-energy-cyan/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-flame-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-energy-sky font-heading">
            <span className="w-1.5 h-1.5 bg-energy-cyan rotate-45" />
            <span>Especialidades Técnicas • Integración Multidisciplinaria</span>
            <span className="h-px w-8 bg-gradient-to-r from-energy-cyan/60 to-transparent" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight">
            Alianza Estratégica & <span className="animate-gradient-text">Consorcio Operativo</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Recuperación de Pozos y Optimización Química, Logística y Soporte Integral 24/7 y Mantenimiento.
          </p>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light max-w-2xl mx-auto pt-1">
            Nuestra propuesta de valor se basa en la integración de ingeniería, procura internacional, logística pesada y química de producción, respaldada por más de 20 años de trayectoria y presencia estratégica a nivel nacional.
          </p>
        </div>

        {/* 4 Multidisciplinary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {allianceEntities.map((entity) => {
            const Icon = iconMap[entity.icon] || Sparkles;
            const highlights = Array.isArray(entity.highlights) ? entity.highlights : [];
            return (
              <div
                key={entity.id}
                className="bg-navy-900/60 backdrop-blur-md rounded-[2.5rem] border border-energy-sky/15 overflow-hidden group hover:border-energy-cyan/40 transition-all duration-500 hover:-translate-y-2 shadow-2xl relative"
              >
                {/* Background Inner Glow */}
                <div className="absolute -top-20 -right-20 w-44 h-44 bg-energy-cyan/15 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="p-8 sm:p-10 relative z-10 flex flex-col h-full">
                  {/* Top Bar: Pedestal Blanco para Logo + Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                    
                    {/* Pedestal Blanco */}
                    <div className="bg-white rounded-2xl p-3 w-48 h-20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform duration-500 flex-shrink-0">
                      <AllianceLogo 
                        logoUrl={entity.logoUrl} 
                        name={entity.name} 
                        Icon={Icon} 
                      />
                    </div>

                    {/* Geometric Badge (No Pill) */}
                    <div className="mt-2 sm:mt-0">
                      <span className="px-3.5 py-1.5 rounded-lg bg-navy-950/90 border border-energy-sky/30 text-energy-sky text-[10px] font-black uppercase tracking-widest shadow-md whitespace-nowrap block text-center sm:inline-block font-heading">
                        {entity.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Category */}
                  <div className="mb-4">
                    <h3 className="text-2xl sm:text-3xl font-black font-heading text-white group-hover:text-energy-sky transition-colors">
                      {entity.name}
                    </h3>
                    <span className="text-xs font-bold text-slate-400 font-sans tracking-widest block mt-1.5 uppercase">
                      {entity.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed font-light mb-8">
                    {entity.desc}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-4 pt-6 border-t border-white/10 mt-auto">
                    {highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 opacity-90" />
                        <span className="font-light leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Synergy Bottom Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-metallic/30 shadow-gold-glow flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-400 flex-shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black font-heading text-white">
                Sinergia Operativa Integral en Venezuela
              </h4>
              <p className="text-xs text-slate-300 font-light mt-0.5">
                Capacidad técnica integrada para respuesta inmediata en Oriente, Faja del Orinoco y Occidente.
              </p>
            </div>
          </div>

          <a
            href="#formulario-cotizacion"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-flame-500 via-orange-600 to-amber-500 hover:from-flame-600 hover:to-amber-600 text-white font-black text-xs shadow-flame-glow flex items-center justify-center gap-2 transition-all whitespace-nowrap font-heading transform hover:scale-[1.02]"
          >
            <span>Consultar Disponibilidad</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default MultidisciplinaryAlliances;
