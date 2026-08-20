import React from 'react';
import { FlaskConical, Truck, Globe, Flame, ShieldCheck, Sparkles, Award, ArrowUpRight, CheckCircle2, Building2 } from 'lucide-react';

export const MultidisciplinaryAlliances = () => {
  const allianceEntities = [
    {
      id: 'cysos',
      name: 'Cysos Energy',
      category: 'Química de Producción & EOR',
      desc: 'Optimización del transporte de crudos pesados mediante tecnologías de reducción de viscosidad.',
      highlights: ['Reducción de viscosidad hasta 92%', 'Ahorro de diluyente hasta 38%', 'Desemulsionante de alta eficiencia'],
      badge: 'Líder en Tecnología Química',
      icon: FlaskConical,
      color: 'from-flame-500 via-orange-600 to-amber-500',
      glow: 'bg-flame-500/20',
      borderGlow: 'hover:border-flame-500/50'
    },
    {
      id: 'mg-services',
      name: 'MG Services Group',
      category: 'Logística, Izamiento & Carga Pesada',
      desc: '17 años de experiencia en transporte de carga pesada y equipos de izamiento con grúas de hasta 110 toneladas.',
      highlights: ['Grúas telescópicas hasta 110 Ton', 'Flota de chutos vacuum y bateas', 'Movimiento de tierra y jumbo 320'],
      badge: '17 Años de Experiencia',
      icon: Truck,
      color: 'from-amber-400 via-gold-500 to-orange-600',
      glow: 'bg-gold-400/20',
      borderGlow: 'hover:border-gold-400/50'
    },
    {
      id: 'shekinah',
      name: 'Shekinah Group',
      category: 'Sourcing Internacional & Procura USA',
      desc: 'Sourcing directo desde USA y soporte técnico especializado con garantía local en Venezuela.',
      highlights: ['Importación directa desde USA', 'Tuberías ERW y válvulas API', 'Control de presión y bombas triplex'],
      badge: 'Alianza Global USA',
      icon: Globe,
      color: 'from-emerald-400 via-teal-500 to-cyan-600',
      glow: 'bg-emerald-400/20',
      borderGlow: 'hover:border-emerald-400/50'
    },
    {
      id: 'nwrm',
      name: 'Inversiones Nwrm',
      category: 'Intervención & Rehabilitación de Pozos',
      desc: 'Rehabilitación y reparación de pozos con taladros de Workover y Pulling de 350 HP a 750 HP.',
      highlights: ['Taladros de 350 HP a 750 HP', 'Mantenimiento de sistemas BCP/ESP', 'Operaciones de subsuelo 24/7'],
      badge: 'Capacidad de 350-750 HP',
      icon: Flame,
      color: 'from-orange-500 via-red-600 to-flame-600',
      glow: 'bg-red-500/20',
      borderGlow: 'hover:border-red-500/50'
    }
  ];

  return (
    <section id="especialidades" className="py-20 md:py-24 relative bg-navy-950 border-t border-slate-800/80 overflow-hidden">
      
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gold-metallic/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-flame-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-metallic/40 text-gold-400 text-xs font-black uppercase tracking-wider shadow-gold-glow font-heading">
            <Award className="w-4 h-4 text-flame-500" />
            <span>Especialidades Técnicas • Integración Multidisciplinaria</span>
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
          {allianceEntities.map((entity, idx) => {
            const Icon = entity.icon;
            return (
              <div
                key={entity.id}
                className={`luxury-glass p-6 sm:p-8 rounded-3xl border border-slate-800/90 shadow-2xl relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 ${entity.borderGlow}`}
              >
                {/* Background Inner Glow */}
                <div className={`absolute -top-20 -right-20 w-44 h-44 ${entity.glow} rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                {/* Abstract Watermark Number */}
                <div className="absolute top-4 right-6 text-7xl sm:text-8xl font-black text-slate-800/20 font-heading select-none pointer-events-none group-hover:text-gold-400/10 transition-colors duration-500">
                  0{idx + 1}
                </div>

                <div className="relative z-10 space-y-5">
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${entity.color} p-0.5 shadow-lg flex items-center justify-center flex-shrink-0`}>
                      <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-gold-400" />
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-navy-900 border border-slate-700/80 text-[11px] font-black uppercase tracking-wider text-gold-300 font-heading">
                      {entity.badge}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black font-heading text-white group-hover:text-gold-400 transition-colors">
                      {entity.name}
                    </h3>
                    <span className="text-xs font-bold text-slate-400 font-sans tracking-wide block mt-0.5">
                      {entity.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light border-t border-slate-800/80 pt-4">
                    {entity.desc}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2 pt-1">
                    {entity.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="font-light">{item}</span>
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
