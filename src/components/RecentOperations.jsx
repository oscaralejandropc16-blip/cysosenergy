import React, { useState } from 'react';
import { 
  Activity, CheckCircle2, Clock, MapPin, Building, 
  ArrowRight, ShieldCheck, Flame, FlaskConical, Truck, Award, ExternalLink 
} from 'lucide-react';

const OPERATIONS_DATA = [
  {
    id: 'op-1',
    category: 'Química EOR',
    title: 'Inyección Continua de Reductor de Viscosidad CyS-Redux en Macolla Carabobo',
    client: 'PDVSA PETROJUNÍN / ENI',
    date: 'Febrero 2026',
    location: 'Faja Petrolífera del Orinoco - Bloque Carabobo',
    status: 'En Ejecución (24/7)',
    statusType: 'active',
    metricLabel: 'Eficiencia Reológica',
    metricValue: '15,200 cP → 210 cP (98.6% fluidez)',
    description: 'Dosificación automatizada ininterrumpida de agente fluidizante en cabezal de pozo extrapesado (8.2° API). Eliminación de sobrepresión en oleoducto de recolección.',
    imageUrl: '/images/cysos_skid_operador.jpg',
    tag: 'EOR & Viscosidad'
  },
  {
    id: 'op-2',
    category: 'Logística Pesada',
    title: 'Maniobra de Izamiento Crítico y Montaje de Líneas con Grúa Telescópica 110T',
    client: 'HALLIBURTON DE VENEZUELA',
    date: 'Febrero 2026',
    location: 'Base Operativa Maturín / Campo Morichal',
    status: 'Concluido con Éxito',
    statusType: 'completed',
    metricLabel: 'Seguridad HSE',
    metricValue: '0 Incidentes LTI • 48 hrs seguras',
    description: 'Maniobra de izamiento de alto tonelaje para posicionamiento de cabezales y líneas de alta presión en macolla. Riguroso plan de izaje certificado.',
    imageUrl: '/images/IMG_7702.jpg',
    tag: 'Izamiento Pesado'
  },
  {
    id: 'op-3',
    category: 'Logística Pesada',
    title: 'Despacho de Insumos y Transporte Pesado en Corredor San Roque - Faja',
    client: 'SLB (SCHLUMBERGER)',
    date: 'Enero - Febrero 2026',
    location: 'Troncal Oriente - Faja del Orinoco',
    status: 'Operación en Marcha',
    statusType: 'active',
    metricLabel: 'Logística Terrestre',
    metricValue: '14 Viajes Seguros • Guía RACDA',
    description: 'Traslado seguro de aditivos minerales y productos químicos en chutos batea y tolva bajo estricta normativa ambiental RACDA y control satelital.',
    imageUrl: '/images/logistics_trucks.png',
    tag: 'Transporte RACDA'
  },
  {
    id: 'op-4',
    category: 'Certificaciones',
    title: 'Puesta en Marcha de Unidad de Dosificación CyS Modelo 2026-I',
    client: 'PDVSA PETROMIRANDA / ROSNEFT',
    date: 'Enero 2026',
    location: 'División Junín - Campo San Diego',
    status: 'Homologado SAPI & RACDA',
    statusType: 'verified',
    metricLabel: 'Presión de Prueba',
    metricValue: 'Prueba Hidrostática a 3,000 PSI OK',
    description: 'Inspección de calidad y calibración de caudalímetro electromagnético en gabinete skid sellado con registro de patente industrial CyS.',
    imageUrl: '/images/cysos_placa_tecnica.jpg',
    tag: 'Calidad Industrial'
  },
  {
    id: 'op-5',
    category: 'Intervención de Pozos',
    title: 'Mantenimiento Preventivo y Flushing en Sistema BCP con Flush By',
    client: 'OPERADORA MIXTA ORIENTE',
    date: 'Enero 2026',
    location: 'Campo Quiriquire, Edo. Monagas',
    status: 'Concluido con Éxito',
    statusType: 'completed',
    metricLabel: 'Tiempo de Retorno',
    metricValue: 'Pozo Reactivado en < 18 Horas',
    description: 'Despliegue rápido de unidad Flush By para pulling de varillas de succión y limpieza de arena en sarta de fondo, restableciendo producción de barriles netos.',
    imageUrl: '/images/ig_well_testing.png',
    tag: 'Flush By 24/7'
  }
];

const CATEGORIES = ['Todas', 'Química EOR', 'Logística Pesada', 'Intervención de Pozos', 'Certificaciones'];

export const RecentOperations = ({ onOpenDossier }) => {
  const [activeFilter, setActiveFilter] = useState('Todas');

  const filteredOperations = activeFilter === 'Todas'
    ? OPERATIONS_DATA
    : OPERATIONS_DATA.filter((op) => op.category === activeFilter);

  return (
    <section id="operaciones-recientes" className="py-20 md:py-24 relative bg-navy-950 border-t border-slate-800/80 overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-metallic/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-flame-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-flame-500/10 border border-flame-500/20 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
            <span className="w-2 h-2 rounded-full bg-flame-500 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-widest text-flame-500 font-heading">
              Bitácora Operativa 2026 • Registro en Campo
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
            Operaciones Recientes & <span className="animate-gradient-text">Casos de Éxito</span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-light">
            Transparencia y resultados comprobables. Conozca las intervenciones técnicas ejecutadas por nuestros ingenieros y cuadrillas en la Faja del Orinoco y Oriente de Venezuela.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-heading font-black transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-gold-500 to-flame-500 text-navy-950 shadow-gold-glow scale-105'
                  : 'bg-navy-900/80 text-slate-300 hover:text-white hover:bg-navy-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Operations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOperations.map((op) => (
            <div
              key={op.id}
              className="luxury-card rounded-3xl overflow-hidden border border-slate-800 hover:border-gold-metallic/50 transition-all duration-500 flex flex-col group hover:-translate-y-1.5 shadow-xl"
            >
              {/* Image Preview Container */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-navy-900">
                <img
                  src={op.imageUrl}
                  alt={op.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-black/30" />
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider backdrop-blur-md font-heading ${
                    op.statusType === 'active'
                      ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/50'
                      : op.statusType === 'completed'
                      ? 'bg-sky-950/90 text-sky-300 border border-sky-500/50'
                      : 'bg-amber-950/90 text-amber-300 border border-amber-500/50'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {op.status}
                  </span>
                </div>

                {/* Date / Location pill */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white font-medium drop-shadow">
                  <span className="bg-navy-950/80 px-2 py-0.5 rounded border border-white/10 font-heading">
                    {op.date}
                  </span>
                  <span className="bg-navy-950/80 px-2 py-0.5 rounded border border-white/10 truncate max-w-[170px]">
                    📍 {op.location.split('-')[0]}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 bg-navy-950/90">
                <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase text-gold-400 tracking-wider font-heading">
                    Cliente: {op.client}
                  </div>
                  <h3 className="text-sm sm:text-base font-black font-heading text-white group-hover:text-gold-300 transition-colors leading-snug">
                    {op.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {op.description}
                  </p>
                </div>

                {/* Metric Strip */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs bg-navy-900/80 px-3 py-2 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 font-heading">
                      {op.metricLabel}:
                    </span>
                    <span className="font-extrabold text-gold-400 text-[11px] text-right">
                      {op.metricValue}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="inline-flex items-center gap-1 text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Protocolo HSE Cero LTI</span>
                    </span>
                    
                    <a
                      href="#formulario-cotizacion"
                      className="text-gold-400 hover:text-white font-bold flex items-center gap-1 transition-colors"
                    >
                      <span>Cotizar similar</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Action Bottom Banner */}
        <div className="mt-12 bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-metallic/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-black font-heading text-white">
              ¿Requiere programar una intervención operativa este mes?
            </h4>
            <p className="text-xs text-slate-300">
              Nuestro equipo técnico y flota pesada están disponibles para despliegue inmediato en Oriente y Occidente.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center flex-shrink-0">
            <button
              onClick={onOpenDossier}
              className="px-5 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-800 border border-slate-700 hover:border-gold-metallic/60 text-xs font-bold font-heading text-gold-300 hover:text-white transition-all"
            >
              Consultar Dossier Técnico
            </button>

            <a
              href="#formulario-cotizacion"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-flame-500 to-orange-600 hover:from-flame-600 hover:to-orange-700 text-white text-xs font-black font-heading shadow-flame-glow transition-all transform hover:scale-105"
            >
              Solicitar Cotización de Cuadrilla
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
