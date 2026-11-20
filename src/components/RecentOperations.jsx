import React, { useState, useEffect } from 'react';
import { 
  Play, X, MapPin, Building, ShieldCheck, ArrowRight, 
  ExternalLink, CheckCircle2, Video, Camera, Sparkles, Image as ImageIcon
} from 'lucide-react';

const OPERATIONS_DATA = [
  {
    id: 'op-0',
    category: 'Facilidades y Pozos',
    title: 'Instalación y Prueba de Separador de Producción con Mechurrio',
    client: 'OPERADORA MIXTA ORIENTE',
    date: 'Febrero 2026',
    location: 'Campo Quiriquire, Edo. Monagas',
    status: 'Concluido con Éxito',
    metricLabel: 'Equipo Operado',
    metricValue: 'Separador de Alta Presión & Mechurrio',
    description: 'Maniobra de instalación, conexionado de tuberías y prueba de combustión controlada en separador de prueba de superficie.',
    imageUrl: '/images/IMG_7549.jpg',
    videoUrl: '/videos/IMG_7557.mp4', // Video real de esta obra
    tag: 'Video de Obra en Campo'
  },
  {
    id: 'op-1',
    category: 'Química EOR',
    title: 'Inyección Continua de Reductor de Viscosidad CyS-Redux',
    client: 'PDVSA PETROJUNÍN / ENI',
    date: 'Febrero 2026',
    location: 'Faja del Orinoco - Bloque Carabobo',
    status: 'En Ejecución 24/7',
    metricLabel: 'Eficiencia Reológica',
    metricValue: '15,200 cP → 210 cP (98.6% fluidez)',
    description: 'Dosificación automatizada ininterrumpida de agente fluidizante en cabezal de pozo extrapesado (8.2° API).',
    imageUrl: '/images/cysos_skid_operador.jpg',
    videoUrl: null, // Pendiente por video del cliente
    tag: 'Registro Fotográfico'
  },
  {
    id: 'op-2',
    category: 'Logística Pesada',
    title: 'Izamiento Crítico y Montaje de Líneas con Grúa 110T',
    client: 'HALLIBURTON DE VENEZUELA',
    date: 'Febrero 2026',
    location: 'Base Maturín / Campo Morichal',
    status: 'Concluido con Éxito',
    metricLabel: 'Seguridad HSE',
    metricValue: '0 Incidentes LTI • 48 hrs seguras',
    description: 'Maniobra de izamiento de alto tonelaje para posicionamiento de cabezales y líneas de alta presión en macolla.',
    imageUrl: '/images/IMG_7702.jpg',
    videoUrl: null, // Pendiente por video del cliente
    tag: 'Registro Fotográfico'
  },
  {
    id: 'op-3',
    category: 'Logística Pesada',
    title: 'Despacho y Transporte Pesado en Corredor San Roque - Faja',
    client: 'SLB (SCHLUMBERGER)',
    date: 'Enero - Febrero 2026',
    location: 'Troncal Oriente - Faja del Orinoco',
    status: 'Operación en Marcha',
    metricLabel: 'Logística Terrestre',
    metricValue: '14 Viajes Seguros • Guía RACDA',
    description: 'Traslado seguro de aditivos minerales y productos químicos en chutos batea y tolva bajo control satelital.',
    imageUrl: '/images/logistics_trucks.png',
    videoUrl: null, // Pendiente por video del cliente
    tag: 'Registro Fotográfico'
  },
  {
    id: 'op-4',
    category: 'Certificaciones',
    title: 'Puesta en Marcha de Unidad de Dosificación CyS Modelo 2026-I',
    client: 'PDVSA PETROMIRANDA / ROSNEFT',
    date: 'Enero 2026',
    location: 'División Junín - Campo San Diego',
    status: 'Homologado SAPI & RACDA',
    metricLabel: 'Prueba Hidrostática',
    metricValue: 'Certificación 3,000 PSI OK',
    description: 'Inspección de calidad y calibración de caudalímetro electromagnético en gabinete skid sellado.',
    imageUrl: '/images/cysos_placa_tecnica.jpg',
    videoUrl: null, // Pendiente por video del cliente
    tag: 'Registro Fotográfico'
  },
  {
    id: 'op-5',
    category: 'Intervención de Pozos',
    title: 'Mantenimiento Preventivo y Flushing en Sistema BCP con Flush By',
    client: 'OPERADORA MIXTA ORIENTE',
    date: 'Enero 2026',
    location: 'Campo Quiriquire, Edo. Monagas',
    status: 'Concluido con Éxito',
    metricLabel: 'Tiempo de Retorno',
    metricValue: 'Pozo Reactivado en < 18 Horas',
    description: 'Despliegue rápido de unidad Flush By para pulling de varillas de succión y restablecimiento de flujo.',
    imageUrl: '/images/ig_well_testing.png',
    videoUrl: null, // Pendiente por video del cliente
    tag: 'Registro Fotográfico'
  }
];

const CATEGORIES = ['Todas', 'Facilidades y Pozos', 'Logística Pesada', 'Química EOR', 'Intervención de Pozos'];

export const RecentOperations = ({ onOpenDossier }) => {
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [activeMediaModal, setActiveMediaModal] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveMediaModal(null);
    };
    if (activeMediaModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeMediaModal]);

  const filteredOperations = activeFilter === 'Todas'
    ? OPERATIONS_DATA
    : OPERATIONS_DATA.filter((op) => op.category === activeFilter);

  return (
    <section id="obras" className="py-20 sm:py-24 relative bg-navy-950 border-t border-slate-800/80 overflow-hidden">
      
      {/* Anchor for backward compatibility */}
      <div id="operaciones-recientes" className="absolute -top-24 left-0" />

      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-energy-cyan/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-flame-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-flame-400 font-heading">
            <span className="w-2 h-2 rounded-full bg-flame-500 animate-ping" />
            <span>Evidencia en Campo • Venezuela 2026</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight">
            Nuestras Obras & <span className="text-flame-500">Operaciones en Acción</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Capacidad de ejecución técnica comprobada. Observe los registros audiovisuales y fotográficos de nuestras cuadrillas y maquinaria en campo.
          </p>
        </div>

        {/* Featured Video Highlight Card - Only for the real verified video */}
        <div className="mb-12 rounded-3xl overflow-hidden border border-slate-700/80 bg-gradient-to-br from-navy-900/90 to-navy-950/90 shadow-2xl p-5 sm:p-7 relative group">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Video Preview Box with Play Overlay */}
            <div 
              onClick={() => setActiveMediaModal(OPERATIONS_DATA[0])}
              className="lg:col-span-7 relative h-60 sm:h-72 md:h-80 rounded-2xl overflow-hidden cursor-pointer group/video border border-slate-700/60 bg-black shadow-inner"
            >
              <img
                src="/images/IMG_7549.jpg"
                alt="Operaciones en Campo"
                className="w-full h-full object-cover group-hover/video:scale-105 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
              
              {/* Center Glowing Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-flame-500 text-white flex items-center justify-center shadow-flame-glow group-hover/video:scale-110 group-hover/video:bg-flame-400 transition-all duration-300">
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white translate-x-0.5" />
                </div>
              </div>

              {/* Video Badge */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2 bg-navy-950/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-bold text-white">
                <Video className="w-3.5 h-3.5 text-flame-500" />
                <span>Video de Obra Verificado</span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                <span className="flex items-center gap-1.5 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-flame-500" />
                  Campo Quiriquire, Edo. Monagas
                </span>
                <span className="font-bold text-flame-400 text-xs flex items-center gap-1">
                  Reproducir Video ▶
                </span>
              </div>
            </div>

            {/* Video Scope Description */}
            <div className="lg:col-span-5 space-y-3.5">
              <span className="text-[11px] uppercase tracking-widest font-black text-flame-400 font-heading">
                Obra en Ejecución Destacada
              </span>
              <h3 className="text-lg sm:text-2xl font-black font-heading text-white leading-snug">
                Instalación y Puesta en Marcha de Separador con Mechurrio
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                Registro audiovisual oficial de cuadrillas técnicas ejecutando conexionado de facilidades de superficie, pruebas de alivio y combustión en mechurrio.
              </p>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="p-2.5 rounded-xl bg-navy-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Seguridad HSE</span>
                  <span className="text-xs font-black text-emerald-400 flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Cero Horas LTI
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-navy-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Disponibilidad</span>
                  <span className="text-xs font-black text-white mt-0.5 block">
                    Guardia 24 Horas
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => setActiveMediaModal(OPERATIONS_DATA[0])}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-flame-500 to-orange-600 hover:from-flame-400 hover:to-orange-500 text-white font-bold text-xs sm:text-sm font-heading shadow-flame-glow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Ver Video de la Obra</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-black transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-flame-500 to-orange-600 text-white shadow-flame-glow scale-105'
                  : 'bg-navy-900/80 text-slate-300 hover:text-white hover:bg-navy-800 border border-slate-700/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Operations & Works Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredOperations.map((op, idx) => {
            const hasVideo = Boolean(op.videoUrl);
            return (
              <div
                key={op.id}
                className="relative rounded-2xl overflow-hidden bg-navy-900/60 backdrop-blur-xl border border-slate-700/60 hover:border-flame-500/50 transition-all duration-500 flex flex-col group hover:-translate-y-1 hover:shadow-xl animate-fadeIn"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Media Preview Container */}
                <div 
                  onClick={() => setActiveMediaModal(op)}
                  className="relative h-48 w-full overflow-hidden bg-navy-950 cursor-pointer group/thumb"
                >
                  <img
                    src={op.imageUrl}
                    alt={op.title}
                    className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-700 filter brightness-90 group-hover/thumb:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
                  
                  {/* Floating Action Badge on Card */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-85 group-hover/thumb:opacity-100 transition-opacity">
                    {hasVideo ? (
                      <div className="w-11 h-11 rounded-full bg-flame-500 text-white flex items-center justify-center shadow-flame-glow group-hover/thumb:scale-110 transition-all duration-300">
                        <Play className="w-4 h-4 fill-white translate-x-0.5" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-navy-950/80 border border-white/20 text-white flex items-center justify-center shadow-lg group-hover/thumb:scale-110 group-hover/thumb:border-flame-500 transition-all duration-300">
                        <Camera className="w-4 h-4 text-slate-200" />
                      </div>
                    )}
                  </div>

                  {/* Format tag */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold font-heading uppercase flex items-center gap-1 backdrop-blur-md ${
                      hasVideo 
                        ? 'bg-flame-500/90 text-white' 
                        : 'bg-navy-950/80 text-slate-300 border border-white/10'
                    }`}>
                      {hasVideo ? <Video className="w-3 h-3" /> : <Camera className="w-3 h-3" />}
                      <span>{hasVideo ? 'Video' : 'Fotografía'}</span>
                    </span>
                  </div>

                  {/* Date & Location overlay */}
                  <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-[11px] text-slate-200">
                    <span className="flex items-center gap-1 font-bold truncate max-w-[65%]">
                      <MapPin className="w-3 h-3 text-flame-500 flex-shrink-0" />
                      {op.location.split(',')[0]}
                    </span>
                    <span className="font-bold text-slate-400 text-[10px]">
                      {op.date}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-black uppercase text-flame-400 tracking-wider font-heading">
                      {op.client}
                    </div>
                    <h3 className="text-sm font-black font-heading text-white leading-snug group-hover:text-flame-400 transition-colors">
                      {op.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light line-clamp-2">
                      {op.description}
                    </p>
                  </div>

                  {/* Metric Strip */}
                  <div className="pt-2.5 border-t border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] uppercase font-bold text-slate-400 font-heading">
                        {op.metricLabel}:
                      </span>
                      <span className="font-extrabold text-white text-[11px]">
                        {op.metricValue}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-0.5">
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                        <ShieldCheck className="w-3 h-3" />
                        Cero Incidentes
                      </span>

                      <button
                        onClick={() => setActiveMediaModal(op)}
                        className="text-flame-400 hover:text-flame-300 text-xs font-bold flex items-center gap-1 font-heading cursor-pointer transition-colors"
                      >
                        <span>{hasVideo ? 'Ver Video' : 'Ver Registro'}</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Action Bottom Banner */}
        <div className="mt-12 bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-slate-700/80 rounded-3xl p-5 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-black font-heading text-white">
              ¿Requiere programar una obra o servicio técnico este mes?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Nuestras cuadrillas y flota pesada están disponibles para despliegue inmediato en Oriente y Occidente.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center flex-shrink-0">
            <button
              onClick={onOpenDossier}
              className="px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-navy-800 border border-slate-700 hover:border-flame-500/50 text-xs font-bold font-heading text-slate-200 hover:text-white transition-all cursor-pointer"
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

      {/* FULLY RESPONSIVE CINEMATIC MODAL (FITS LAPTOP SCREENS PERFECTLY) */}
      {activeMediaModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveMediaModal(null)}
        >
          <div 
            className="relative w-full max-w-3xl max-h-[88vh] flex flex-col bg-navy-950 rounded-2xl border border-slate-700/80 overflow-hidden shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header (Fixed, always visible) */}
            <div className="flex items-center justify-between px-4 py-2.5 sm:px-5 sm:py-3 bg-navy-900 border-b border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-2 min-w-0 pr-2">
                {activeMediaModal.videoUrl ? (
                  <Video className="w-4 h-4 text-flame-500 flex-shrink-0" />
                ) : (
                  <Camera className="w-4 h-4 text-energy-sky flex-shrink-0" />
                )}
                <span className="text-xs sm:text-sm font-bold font-heading text-white truncate">
                  {activeMediaModal.title}
                </span>
              </div>
              <button
                onClick={() => setActiveMediaModal(null)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Media Stage (Bounded height, never cuts off) */}
            <div className="relative flex-1 min-h-0 bg-black flex items-center justify-center overflow-hidden">
              {activeMediaModal.videoUrl ? (
                <video
                  src={activeMediaModal.videoUrl}
                  controls
                  autoPlay
                  className="max-h-[50vh] sm:max-h-[54vh] w-auto max-w-full object-contain mx-auto"
                >
                  Su navegador no soporta el formato de video.
                </video>
              ) : (
                <img
                  src={activeMediaModal.imageUrl}
                  alt={activeMediaModal.title}
                  className="max-h-[50vh] sm:max-h-[54vh] w-auto max-w-full object-contain mx-auto"
                />
              )}
            </div>

            {/* Modal Details Footer (Fixed, always visible) */}
            <div className="px-4 py-2.5 sm:px-5 sm:py-3 bg-navy-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
              <div className="space-y-0.5 min-w-0">
                <div className="text-[11px] font-bold text-flame-400 uppercase tracking-wider font-heading truncate">
                  {activeMediaModal.client} • {activeMediaModal.location}
                </div>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {activeMediaModal.description}
                </p>
              </div>

              <a
                href="#formulario-cotizacion"
                onClick={() => setActiveMediaModal(null)}
                className="px-4 py-2 rounded-xl bg-flame-500 hover:bg-flame-600 text-white text-xs font-black font-heading transition-colors whitespace-nowrap text-center flex-shrink-0 shadow-flame-glow"
              >
                Cotizar este Servicio
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default RecentOperations;
