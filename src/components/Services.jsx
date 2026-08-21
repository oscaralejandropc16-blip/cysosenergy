import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCms } from '../context/CmsContext';
import { 
  Flame, Zap, Activity, ArrowUpRight, CheckCircle2, X, PhoneCall, 
  FlaskConical, Truck, Globe, Award, ShieldCheck, Play, Sparkles, 
  LayoutGrid, ChevronRight, CheckCircle, Sparkle, Gauge
} from 'lucide-react';

export const Services = () => {
  const { mediaItems = [], services = [] } = useCms();
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState('intervencion');
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [isFleetModalOpen, setIsFleetModalOpen] = useState(false);

  // Extract fleet items from CMS
  const fleetItems = mediaItems.filter(item => 
    item.category?.includes('Logística') || item.id?.includes('truck')
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveVideoModal(null);
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
  }, [activeVideoModal, selectedService, isFleetModalOpen]);

  // Fallback map for icons if they are stored as strings
  const IconMap = {
    FlaskConical, Flame, Truck, Globe
  };

  // Ensure services are loaded before rendering details, fallback to empty object if not found
  const currentDivision = services.find(s => s.id === activeTab) || services[0] || { items: [] };

  return (
    <section id="servicios" className="py-20 md:py-24 relative bg-navy-950 border-t border-slate-800/80 overflow-hidden">
      
      {/* Glow Backdrop */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-gold-metallic/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-flame-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 shadow-[0_0_20px_rgba(250,204,21,0.1)]">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[11px] font-black uppercase text-gold-400 tracking-widest font-heading">
              Portafolio Integral de Soluciones Petroleras ISO 9001
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
            Nuestras 4 Divisiones de <span className="animate-gradient-text">Servicios Especializados</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base font-light">
            Soluciones de alta ingeniería química, reacondicionamiento de pozos, logística pesada y procura internacional para maximizar la producción de hidrocarburos.
          </p>
        </div>

        {/* Division Tab Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {services.map((tab) => {
            const Icon = IconMap[tab.icon] || FlaskConical;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-3.5 sm:p-5 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3.5 w-full ${
                  isActive
                    ? 'bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 border-gold-metallic text-white shadow-flame-glow sm:scale-105'
                    : 'luxury-card border-slate-800 text-slate-300 hover:border-gold-400/40 hover:text-white bg-[#0a1224]/60'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isActive ? 'bg-navy-950 text-gold-400 shadow-inner' : 'bg-navy-900 text-gold-400 border border-slate-700'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs uppercase tracking-wider text-gold-300 font-bold block mb-0.5 opacity-80">
                    División {services.indexOf(tab) + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-black font-heading leading-tight block truncate">
                    {tab.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Division Showcase Card */}
        <div className="luxury-glass rounded-[2.5rem] border border-gold-metallic/35 overflow-hidden shadow-2xl grid lg:grid-cols-12 items-stretch bg-navy-950/80">
          
          {/* Left Side: Photographic/Video Showcase & Highlights */}
          <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-full flex flex-col justify-between p-6 sm:p-8 overflow-hidden group">
            {/* Media Background */}
            <div className="absolute inset-0 z-0">
              {currentDivision.bgVideoUrl ? (
                <video
                  src={currentDivision.bgVideoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.75]"
                />
              ) : (
                <img
                  src={currentDivision.image}
                  alt={currentDivision.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.75]"
                />
              )}
              {/* Elegant Gradients to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/30" />
            </div>

            {/* Top Badge */}
            <div className="relative z-10 flex flex-wrap gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-navy-950/90 text-gold-400 text-xs font-black uppercase border border-gold-metallic/40 backdrop-blur-md font-heading shadow-lg">
                {currentDivision.category}
              </span>
            </div>

            {/* Middle Feature Highlights Overlay (Only for Química) */}
            {activeTab === 'quimica' && (
              <div className="relative z-10 my-auto space-y-2 py-4">
                <div className="p-3 rounded-2xl bg-navy-950/85 backdrop-blur-md border border-gold-400/30 shadow-xl space-y-1">
                  <div className="flex items-center gap-2 text-gold-400 text-xs font-black font-heading">
                    <Sparkles className="w-4 h-4 text-flame-500" />
                    <span>Rendimiento Comprobado en Campo:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-200">
                    <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-flame-400 font-bold block text-xs">Hasta 38%</span>
                      <span className="text-slate-400 text-[10px]">Ahorro Diluyente</span>
                    </div>
                    <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-gold-400 font-bold block text-xs">Hasta 92%</span>
                      <span className="text-slate-400 text-[10px]">Reducción Viscosidad</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Video Trigger Button */}
            <div className="relative z-10 pt-4">
              <button
                onClick={() => setActiveVideoModal({
                  url: currentDivision.videoUrl || currentDivision.bgVideoUrl || '/videos/maniobra.mp4',
                  title: `CYSOS ENERGY - ${currentDivision.name}: ${currentDivision.title}`
                })}
                className="w-full px-4 py-3 rounded-2xl bg-navy-950/90 hover:bg-navy-900 text-white text-xs font-black flex items-center justify-center gap-2.5 border border-gold-metallic/40 shadow-xl backdrop-blur-md transition-all group/vbtn hover:border-gold-metallic hover:scale-[1.02] font-heading"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-r from-flame-500 to-gold-600 flex items-center justify-center shadow-flame-glow group-hover/vbtn:scale-110 transition-transform flex-shrink-0">
                  <Play className="w-3.5 h-3.5 fill-white translate-x-0.5 text-white" />
                </div>
                <span className="tracking-wide">Ver Registro Operativo en Video</span>
              </button>
            </div>
          </div>

          {/* Right Side: Detailed Service Items Showcase (No truncation, fully readable) */}
          <div className="lg:col-span-7 p-5 sm:p-8 md:p-10 space-y-5 sm:space-y-6 flex flex-col justify-between">
            
            {/* Header Description */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                <span className="text-[10px] sm:text-xs text-gold-400 font-black uppercase tracking-wider font-heading">
                  Especificaciones Técnicas & Formulación
                </span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black font-heading text-white leading-tight">
                {currentDivision.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed pt-1">
                {currentDivision.summary}
              </p>
            </div>

            {/* Sub-Items Cards Grid (Complete, No Cutoffs) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-2">
              {currentDivision.items.map((item, idx) => {
                const isFeatured = idx < 2 && activeTab === 'quimica';
                return (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-2 ${
                      isFeatured 
                        ? 'bg-[#0f172a]/95 border-gold-400/50 shadow-[0_4px_20px_rgba(250,204,21,0.1)] hover:border-gold-400' 
                        : 'bg-navy-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isFeatured ? 'text-gold-400' : 'text-flame-500'}`} />
                        <h4 className="text-[13px] sm:text-sm font-black text-white font-heading leading-snug">
                          {item.name}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-300 font-light leading-relaxed pl-6">
                        {item.desc}
                      </p>
                    </div>
                    {isFeatured && (
                      <div className="pl-6 pt-1">
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-gold-400 font-heading bg-gold-400/10 px-2 py-0.5 rounded-md border border-gold-400/20">
                          <Sparkle className="w-2.5 h-2.5" /> Formulación de Alto Rendimiento
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action CTA & Certifications Footer */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3.5 py-2 rounded-xl border border-emerald-500/20 w-fit">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Normas PDVSA SI-HO-S & Calidad ISO 9001</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {activeTab === 'logistica' && fleetItems.length > 0 && (
                  <button
                    onClick={() => setIsFleetModalOpen(true)}
                    className="px-5 py-3 rounded-xl text-xs font-black text-gold-400 bg-navy-900/60 border border-gold-400/30 hover:bg-gold-400/10 hover:border-gold-400/60 shadow-[0_0_15px_rgba(250,204,21,0.05)] flex items-center justify-center gap-2 font-heading transition-all whitespace-nowrap"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span>Catálogo de Flota ({fleetItems.length} Equipos)</span>
                  </button>
                )}
                <a
                  href="#formulario-cotizacion"
                  className="px-6 py-3 rounded-xl text-xs font-black text-white bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 hover:from-flame-600 hover:to-gold-700 shadow-flame-glow flex items-center justify-center gap-2 font-heading transition-all whitespace-nowrap transform hover:scale-[1.02]"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Solicitar Propuesta Técnica</span>
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
            <div 
              onClick={(e) => e.stopPropagation()}
              className="luxury-glass w-full max-w-4xl rounded-3xl border border-gold-metallic/40 overflow-hidden relative shadow-2xl cursor-default flex flex-col"
            >
              <div className="flex items-center justify-between p-4 bg-navy-950 border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-flame-500 fill-flame-500" />
                  <h3 className="font-heading font-black text-white text-sm sm:text-base">
                    {typeof activeVideoModal === 'object' ? activeVideoModal.title : 'CYSOS ENERGY - Registro Operativo'}
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
                {(() => {
                  const videoSource = typeof activeVideoModal === 'object' ? activeVideoModal.url : activeVideoModal;
                  if (videoSource.includes('youtube') || videoSource.includes('youtu.be')) {
                    return (
                      <iframe 
                        src={videoSource}
                        title="Video Operativo" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full"
                      />
                    );
                  }
                  return (
                    <video controls autoPlay className="w-full h-full object-contain" poster={currentDivision.image || "/images/cysos_campo_balancin.jpg"}>
                      <source src={videoSource} type="video/mp4" />
                    </video>
                  );
                })()}
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
            <div 
              onClick={(e) => e.stopPropagation()}
              className="luxury-glass w-full max-w-6xl max-h-[90vh] rounded-3xl border border-gold-metallic/30 overflow-hidden relative shadow-[0_0_100px_rgba(250,204,21,0.1)] cursor-default flex flex-col bg-[#020617]/90 backdrop-blur-3xl"
            >
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
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 filter brightness-90 group-hover:brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/40 to-transparent opacity-90" />
                        
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

export default Services;
