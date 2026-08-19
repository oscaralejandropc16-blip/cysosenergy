import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCms } from '../context/CmsContext';
import { Flame, Zap, Activity, ArrowUpRight, CheckCircle2, X, PhoneCall, FlaskConical, Truck, Globe, Award, ShieldCheck, Play, Sparkles, LayoutGrid } from 'lucide-react';

export const Services = () => {
  const { mediaItems = [] } = useCms();
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState('quimica');
  const [activeVideoModal, setActiveVideoModal] = useState(false);
  const [isFleetModalOpen, setIsFleetModalOpen] = useState(false);

  // Extract fleet items from CMS
  const fleetItems = mediaItems.filter(item => 
    item.category?.includes('Logística') || item.id?.includes('truck')
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveVideoModal(false);
        setIsFleetModalOpen(false);
        setSelectedService(null);
      }
    };
    if (activeVideoModal || selectedService || isFleetModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeVideoModal, selectedService]);

  const portfolioDivisions = {
    quimica: {
      category: 'División 1: Química de Producción & Optimización EOR',
      title: 'Formulación, Suministro e Inyección de Químicos Especializados',
      image: '/images/lab_tech.png',
      icon: FlaskConical,
      summary: 'Servicio integral de suministro e inyección continua de especialidades químicas diseñadas para maximizar la tasa de producción (BPD), recuperar pozos y proteger activos bajo norma ISO 9001.',
      items: [
        { name: 'Reductor Permanente de Viscosidad', desc: 'Formulado para actuar en la fase de hidrocarburos, reduciendo la viscosidad en crudos 8° - 12° API.' },
        { name: 'Desmulsificantes & Rompedores Tipo Slug', desc: 'Para una separación ultrarrápida de fases agua-aceite en estaciones de flujo y deshidratadores.' },
        { name: 'Dispersantes de Parafinas y Asfaltenos', desc: 'Previene la deposición orgánica en sartas tubulares, bombas BCP y oleoductos.' },
        { name: 'Ácidos Especializados (HCl, Acético, HCl+HF)', desc: 'Para tratamientos de acidificación de matriz, descalcificación y estimulación profunda sin taladro.' },
        { name: 'Sistemas de Limpieza con Xileno & Solvente', desc: 'Remoción de depósitos pesados y humectación de sólidos en zonas de disparo.' },
        { name: 'Inhibidores de Corrosión e Incrustación', desc: 'Preservación de la integridad mecánica de tubulares, bombas ESP y líneas de flujo.' },
        { name: 'Secuestrantes de H2S & Antiespumantes', desc: 'Gestión de gases ácidos H2S y control de espuma en separadores multifásicos.' },
        { name: 'Reductores de Fricción en Línea', desc: 'Mejora el caudal de bombeo y disminuye la caída de presión en líneas de transporte.' }
      ]
    },
    intervencion: {
      category: 'División 2: Intervención y Recuperación de Pozos',
      title: 'Workover, Pulling y Unidades Flush By 24/7',
      image: '/images/coiled_tubing.png',
      icon: Flame,
      summary: 'Reacondicionamiento total de pozos con taladros de alta potencia (350 HP a 750 HP), unidades Flush By autotransportables y mantenimiento técnico de sistemas BCP/ESP.',
      items: [
        { name: 'Taladros de Workover y Pulling (350 a 750 HP)', desc: 'Rehabilitación y reparación total de pozos con taladros certificados de alta capacidad.' },
        { name: 'Unidad Flush By 24/7 Autotransportable', desc: 'Operaciones de subsuelo 24/7 con personal certificado para intervenciones rápidas y completación.' },
        { name: 'Reparación de Sistemas BCP & Bombas ESP', desc: 'Mantenimiento especializado de Bombas de Cavidad Progresiva y Electrosumergibles.' },
        { name: 'Limpieza Mecánica Especializada', desc: 'Herramientas como molinos, escariadores y magnetos para eliminación de residuos.' },
        { name: 'Mantenimiento de Generadores Industriales', desc: 'Soporte técnico a plantas de generación Caterpillar y motores marinos.' }
      ]
    },
    logistica: {
      category: 'División 3: Logística, Izamiento y Transporte Pesado',
      title: 'Grúas Telescópicas hasta 110 Toneladas y Maquinaria Pesada',
      image: '/images/logistics_trucks.png',
      videoUrl: 'https://www.youtube.com/embed/gyQT5aQS8_8?autoplay=1&mute=1&loop=1&playlist=gyQT5aQS8_8',
      icon: Truck,
      summary: 'Flota especializada para transporte pesado de fluidos, lodos y químicos, grúas telescópicas de gran tonelaje y maquinaria pesada CAT para movimiento de tierra.',
      items: [
        { name: 'Chutos Vacuum & Cisternas Certificadas', desc: 'Transporte de fluidos de perforación, aguas de producción y químicos a granel.' },
        { name: 'Chutos Tolva, Volqueta, Batea & Low-Boy', desc: 'Transporte de minerales, cemento, barita, tuberías y cargas sobredimensionadas.' },
        { name: 'Grúas Telescópicas (60 Ton, 70 Ton y 110 Ton)', desc: 'Equipos de izamiento pesado certificados para maniobras críticas en taladros.' },
        { name: 'Brazos Hidráulicos (7 Ton a 35 Ton)', desc: 'Instalados en camiones de carga para izamiento autónomo en bases operativas.' },
        { name: 'Excavadora Jumbo 320 CAT & Payloaders', desc: 'Movimiento de tierra, adecuación de locaciones y saneamiento ambiental.' },
        { name: 'Side Boom (Pluma Lateral) & Super Vactor', desc: 'Tendido de líneas de oleoductos y mantenimiento de redes industriales.' }
      ]
    },
    procura: {
      category: 'División 4: Ingeniería, Procura y Suministros ISO 9001',
      title: 'Sourcing Internacional y Control de Presión API',
      image: '/images/IMG_7702.jpg',
      icon: Globe,
      summary: 'Importación directa con alianzas globales en USA, suministro de tuberías certificadas, válvulas API, motores Cummins y equipos periféricos de campo.',
      items: [
        { name: 'Sourcing Internacional de Tuberías ERW / Sin Costura', desc: 'Importación directa de tubulares y tuberías flexibles reforzadas RTP 2" y 4".' },
        { name: 'Válvulas API & Motores Cummins', desc: 'Importación e instalación de válvulas de alta presión y motores industriales para bombeo.' },
        { name: 'Control de Presión (Preventores BOP & Chokes)', desc: 'Alquiler y venta de preventores, chokes manuales, mangueras Chiksan y bombas triplex.' },
        { name: 'Campers Habitacionales & Torres de Luz', desc: 'Campers climatizados para personal de campo, torres de iluminación y generadores.' }
      ]
    }
  };

  const currentDivision = portfolioDivisions[activeTab];

  return (
    <section id="servicios" className="py-20 md:py-24 relative bg-navy-950 border-t border-slate-800/80 overflow-hidden">
      
      {/* Glow Backdrop */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-gold-metallic/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-metallic/40 text-gold-400 text-xs font-black uppercase tracking-wider shadow-gold-glow font-heading">
            <Award className="w-4 h-4 text-flame-500" />
            <span>Portafolio Integral de Servicios ISO 9001</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
            Nuestras 4 Divisiones de <span className="animate-gradient-text">Servicios Petroleros</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base font-light">
            Especialidades técnicas e integración multidisciplinaria para el sector hidrocarburos e industria en Venezuela.
          </p>
        </div>

        {/* Division Tab Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-10 sm:mb-12">
          {[
            { id: 'quimica', name: 'Química de Producción', icon: FlaskConical },
            { id: 'intervencion', name: 'Intervención de Pozos', icon: Flame },
            { id: 'logistica', name: 'Logística & Izamiento', icon: Truck },
            { id: 'procura', name: 'Procura ISO 9001', icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3 ${
                  isActive
                    ? 'bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 border-gold-metallic text-white shadow-flame-glow scale-[1.02]'
                    : 'luxury-card border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isActive ? 'bg-navy-950 text-gold-400' : 'bg-navy-900 text-gold-400 border border-slate-700'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-black font-heading">{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Division Showcase Card */}
        <div className="luxury-glass rounded-3xl border border-gold-metallic/35 overflow-hidden shadow-2xl grid lg:grid-cols-12 items-stretch">
          
          {/* Left Side: Photographic Banner Header */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full group overflow-hidden">
            <img
              src={currentDivision.image}
              alt={currentDivision.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.82]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy-950" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-full bg-navy-950/90 text-gold-400 text-xs font-black uppercase border border-gold-metallic/40 backdrop-blur-md font-heading">
                {currentDivision.category}
              </span>
            </div>

            <button
              onClick={() => setActiveVideoModal(currentDivision.videoUrl || '/videos/IMG_7557.mp4')}
              className="absolute bottom-6 left-6 px-4 py-2.5 rounded-xl bg-navy-950/90 hover:bg-navy-900 text-white text-xs font-black flex items-center gap-2.5 border border-gold-metallic/40 shadow-xl backdrop-blur-md transition-all group/vbtn hover:border-gold-metallic hover:scale-102 font-heading"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-flame-500 to-gold-600 flex items-center justify-center shadow-flame-glow group-hover/vbtn:scale-110 transition-transform">
                <Play className="w-3 h-3 fill-white translate-x-0.5 text-white" />
              </div>
              <span className="tracking-wide">Registro Operativo en Video</span>
            </button>
          </div>

          {/* Right Side: Detailed Service Items List */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 space-y-6 flex flex-col justify-between">
            <div>
              <span className="text-xs text-gold-400 font-black uppercase tracking-wider block mb-1 font-heading">
                Portafolio Oficial Brochure CYSOS 2026
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-heading text-white">
                {currentDivision.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light mt-2 leading-relaxed">
                {currentDivision.summary}
              </p>
            </div>

            {/* Sub-Items List */}
            <div className="grid sm:grid-cols-2 gap-3 pt-1 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
              {currentDivision.items.map((item, idx) => (
                <div key={idx} className="bg-navy-950/90 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <h4 className="text-xs font-black text-white line-clamp-1 font-heading">{item.name}</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 font-light leading-snug line-clamp-2">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-5 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 w-fit">
                <ShieldCheck className="w-4 h-4" />
                <span>Garantía de Calidad Auditada ISO 9001</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                {activeTab === 'logistica' && fleetItems.length > 0 && (
                  <button
                    onClick={() => setIsFleetModalOpen(true)}
                    className="flex-1 sm:flex-none px-6 py-3 sm:py-2.5 rounded-xl text-xs font-black text-gold-400 bg-navy-900/40 border border-gold-400/30 hover:bg-gold-400/10 hover:border-gold-400/60 shadow-[0_0_15px_rgba(250,204,21,0.05)] flex items-center justify-center gap-2 font-heading transition-all whitespace-nowrap"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span>Catálogo de Flota</span>
                  </button>
                )}
                <a
                  href="#contacto"
                  className="flex-1 sm:flex-none px-6 py-3 sm:py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 hover:from-flame-600 hover:to-gold-700 shadow-flame-glow flex items-center justify-center gap-2 font-heading transition-all whitespace-nowrap"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Solicitar Cotización</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Video Player Modal via Portal */}
        {activeVideoModal && createPortal(
          <div 
            onClick={() => setActiveVideoModal(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-navy-950/95 backdrop-blur-2xl animate-fadeIn cursor-pointer"
          >
            {/* Floating Close Button Top Right (Removed to avoid redundancy) */}

            <div 
              onClick={(e) => e.stopPropagation()}
              className="luxury-glass w-full max-w-4xl rounded-3xl border border-gold-metallic/40 overflow-hidden relative shadow-2xl cursor-default flex flex-col"
            >
              <div className="flex items-center justify-between p-4 bg-navy-950 border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-flame-500 fill-flame-500" />
                  <h3 className="font-heading font-black text-white text-sm sm:text-base">
                    CYSOS ENERGY - Registro Operativo
                  </h3>
                </div>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="p-2 rounded-xl bg-navy-850 hover:bg-red-950 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                {activeVideoModal.includes('youtube') || activeVideoModal.includes('youtu.be') ? (
                  <iframe 
                    src={activeVideoModal}
                    title="Video Operativo" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <video controls autoPlay className="w-full h-full object-contain" poster="/images/IMG_7549.jpg">
                    <source src={activeVideoModal} type="video/mp4" />
                  </video>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}

        {/* Fleet Catalog Modal via Portal */}
        {isFleetModalOpen && createPortal(
          <div 
            onClick={() => setIsFleetModalOpen(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-navy-950/95 backdrop-blur-2xl animate-fadeIn cursor-pointer"
          >
            {/* Floating Close Button Top Right (Removed to avoid redundancy) */}

            <div 
              onClick={(e) => e.stopPropagation()}
              className="luxury-glass w-full max-w-6xl max-h-[90vh] rounded-3xl border border-gold-metallic/30 overflow-hidden relative shadow-[0_0_100px_rgba(250,204,21,0.1)] cursor-default flex flex-col bg-[#020617]/90 backdrop-blur-3xl"
            >
              {/* Inner ambient glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                    <LayoutGrid className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-white text-lg sm:text-xl tracking-tight">
                      Catálogo Visual de <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-200">Flota y Maquinaria</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">Equipos Propios Certificados</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsFleetModalOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-flame-500 hover:text-white border border-white/10 hover:border-flame-500 text-slate-400 transition-all flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {fleetItems.map((item, idx) => (
                    <div key={idx} className="group relative rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-gold-400/30 transition-all duration-500 flex flex-col hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                      <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
                        <img 
                          src={item.url} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 filter brightness-90 group-hover:brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/40 to-transparent opacity-90" />
                        
                        {/* Premium Tag */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[9px] font-black text-white uppercase tracking-[0.2em] font-heading">
                            Unidad Operativa
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1 relative z-10 -mt-8">
                        <h4 className="text-lg sm:text-xl font-black text-white font-heading mb-2 leading-tight drop-shadow-md group-hover:text-gold-400 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-400 font-light line-clamp-3 leading-relaxed mt-auto">
                          {item.caption || item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {fleetItems.length === 0 && (
                  <div className="py-32 text-center flex flex-col items-center justify-center text-slate-400">
                    <Truck className="w-20 h-20 mb-6 opacity-20" />
                    <p className="text-lg font-light">No hay equipos de flota registrados en el CMS.</p>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}

      </div>
    </section>
  );
};
