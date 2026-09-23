import React, { useState } from 'react';
import { 
  Activity, CheckCircle2, Clock, MapPin, Building, 
  ArrowRight, ShieldCheck, Flame, FlaskConical, Truck, Award, ExternalLink 
} from 'lucide-react';

const OPERATIONS_DATA = [
  {
    id: 'op-0',
    category: 'Estimulación y Limpieza',
    title: 'Limpieza de Pozo con Solvente Mutual y Surfactantes',
    client: 'OPERADORA MIXTA ORIENTE',
    date: 'Febrero 2026',
    location: 'Campo Quiriquire, Edo. Monagas',
    status: 'Concluido con Éxito',
    statusType: 'completed',
    metricLabel: 'Separador de Alta',
    metricValue: 'Intervención con Separador de Alta Presión',
    description: 'Trabajo de estimulación y limpieza profunda de formación utilizando paquetes químicos especializados para remoción de daño.',
    imageUrl: '/images/cysos_quimica_lipesa.jpg',
    tag: 'Estimulación Química'
  },
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

const CATEGORIES = ['Todas', 'Estimulación y Limpieza', 'Química EOR', 'Logística Pesada', 'Intervención de Pozos', 'Certificaciones'];

export const RecentOperations = ({ onOpenDossier }) => {
  const [activeFilter, setActiveFilter] = useState('Todas');

  const filteredOperations = activeFilter === 'Todas'
    ? OPERATIONS_DATA
    : OPERATIONS_DATA.filter((op) => op.category === activeFilter);

  return (
    <section id="operaciones-recientes" className="py-20 md:py-24 relative bg-navy-950 border-t border-slate-800/80 overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-energy-cyan/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-flame-500/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-energy-sky font-heading">
            <span className="w-1.5 h-1.5 bg-energy-cyan rotate-45" />
            <span>Bitácora Operativa 2026 • Registro en Campo</span>
            <span className="h-px w-8 bg-gradient-to-r from-energy-cyan/60 to-transparent" />
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
                  ? 'bg-gradient-to-r from-flame-500 via-orange-600 to-flame-600 text-white shadow-flame-glow scale-105'
                  : 'bg-navy-900/80 text-slate-300 hover:text-white hover:bg-navy-800 border border-slate-700/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Operations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredOperations.map((op, idx) => (
            <div
              key={op.id}
              className="relative rounded-2xl overflow-hidden bg-navy-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-flame-500/40 transition-all duration-500 flex flex-col group hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(249,115,22,0.15)] animate-fadeIn"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {/* Image Preview Container (No Pills) */}
              <div className="relative h-56 w-full overflow-hidden bg-navy-950">
                <img
                  src={op.imageUrl}
                  alt={op.title}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 filter brightness-[0.85] group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-90" />
                
                {/* Clean Status Indicator (No Box) */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] animate-pulse ${
                    op.statusType === 'active' ? 'bg-emerald-400 text-emerald-400'
                    : op.statusType === 'completed' ? 'bg-sky-400 text-sky-400'
                    : 'bg-flame-400 text-flame-400'
                  }`} />
                  <span className={`text-[10px] font-black uppercase tracking-[0.15em] font-heading drop-shadow-md ${
                    op.statusType === 'active' ? 'text-emerald-400'
                    : op.statusType === 'completed' ? 'text-sky-300'
                    : 'text-flame-400'
                  }`}>
                    {op.status}
                  </span>
                </div>

                {/* Date / Location Clean Text (No Box) */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white drop-shadow-md">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-flame-500" />
                      {op.location.split('-')[0]}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-300 tracking-widest text-right">
                    {op.date}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-gradient-to-b from-transparent to-navy-950/80">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-flame-500 tracking-[0.2em] font-heading">
                    <span className="w-3 h-px bg-flame-500" />
                    Cliente: {op.client}
                  </div>
                  <h3 className="text-sm sm:text-base font-black font-heading text-white group-hover:text-flame-400 transition-colors duration-300 leading-snug">
                    {op.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light opacity-90 group-hover:opacity-100 transition-opacity">
                    {op.description}
                  </p>
                </div>

                {/* Metric Strip (Clean, border-only separator) */}
                <div className="pt-4 border-t border-slate-700/50 space-y-3">
                  <div className="flex items-center justify-between text-xs group-hover:bg-white/5 px-2 py-1.5 -mx-2 rounded transition-colors duration-300">
                    <span className="text-[10px] uppercase font-bold text-slate-400 font-heading tracking-wider">
                      {op.metricLabel}
                    </span>
                    <span className="font-extrabold text-white text-[11px] text-right">
                      {op.metricValue}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-3 h-3" />
                      Cero LTI
                    </span>
                    
                    <a
                      href="#formulario-cotizacion"
                      className="text-flame-500 hover:text-flame-400 font-bold flex items-center gap-1 transition-colors uppercase tracking-wider"
                    >
                      <span>Ver Detalles</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Action Bottom Banner */}
        <div className="mt-12 bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-energy-sky/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
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
              className="px-5 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-800 border border-slate-700 hover:border-energy-sky/60 text-xs font-bold font-heading text-energy-sky hover:text-white transition-all"
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
