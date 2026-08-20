import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { Users, ShieldCheck, Award, Sparkles, Play, X, CheckCircle2, ChevronRight } from 'lucide-react';

export const HumanOperations = () => {
  const { companyInfo } = useCms();
  const [activePhoto, setActivePhoto] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsVideoOpen(false);
      }
    };
    if (isVideoOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isVideoOpen]);

  const gallery = [
    {
      title: 'Inyección Química Continua en Macollas de Crudo Pesado',
      category: 'Operación Real CYSOS ENERGY',
      image: '/images/cysos_campo_balancin.jpg',
      desc: 'Despliegue operativo y dosificación automatizada de reductores de viscosidad junto a unidades de bombeo mecánico en yacimientos de la Faja del Orinoco.'
    },
    {
      title: 'Equipo Técnico y Supervisores Certificados en Campo',
      category: 'Talento Humano Venezolano',
      image: '/images/cysos_equipo_uniformes.jpg',
      desc: 'Personal técnico calificado con indumentaria oficial y equipos de protección, operando bajo estrictas normas de seguridad PDVSA SI-HO-S e ISO 9001.'
    },
    {
      title: 'Suministro de Reductor Permanente de Viscosidad Lipesa 7225 V',
      category: 'Química de Producción Especializada',
      image: '/images/cysos_quimica_lipesa.jpg',
      desc: 'Almacenamiento y manejo seguro de aditivos químicos formulados para reducción reológica de hasta 92% y ahorro sustancial de diluyente.'
    },
    {
      title: 'Logística de Transporte y Carga con Brazo Hidráulico',
      category: 'Flota & Equipos de Izamiento',
      image: '/images/cysos_logistica_camion.jpg',
      desc: 'Unidades de transporte pesado equipadas con brazos hidráulicos para izamiento y distribución autónoma de insumos químicos en locaciones petroleras.'
    },
    {
      title: 'Skid Automatizado de Inyección Química Continua CyS 2026-I',
      category: 'Tecnología Propietaria',
      image: '/images/cysos_skid_completo.jpg',
      desc: 'Unidad de superficie de alta resistencia con gabinete de seguridad, extintor y conexiones industriales para dosificación precisa sin interrupción.'
    },
    {
      title: 'Auditoría Operacional y Toma de Parámetros Reológicos en Pozo',
      category: 'Control de Calidad en Campo',
      image: '/images/cysos_ingeniero_auditoria.jpg',
      desc: 'Ingenieros de yacimiento registrando presiones de cabezal, temperaturas de línea y comportamiento dinámico del fluido tratado.'
    },
    {
      title: 'Homologación Legal, Registro RACDA y Certificación SAPI',
      category: 'Cumplimiento Normativo',
      image: '/images/cysos_placa_tecnica.jpg',
      desc: 'Equipos fabricados en 2026 con capacidad certificada de 50 GLN/HORA, registro ambiental RACDA y propiedad intelectual ante el SAPI.'
    }
  ];

  return (
    <section id="operaciones" className="py-20 md:py-24 relative bg-navy-950 border-t border-slate-800/80 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-metallic/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-metallic/40 text-gold-400 text-xs font-black uppercase tracking-wider shadow-gold-glow font-heading">
            <Users className="w-4 h-4 text-flame-500" />
            <span>Galería Oficial de Operaciones Reales</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
            Nuestro Talento Humano y <span className="animate-gradient-text">Equipos en Campo</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base font-light">
            Fotografías y material audiovisual real de los proyectos y maniobras operativas ejecutadas por CYSOS ENERGY en cuencas venezolanas.
          </p>
        </div>

        {/* Main Photographic Feature Showcase */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
          
          {/* Main Selected Image Showcase */}
          <div className="lg:col-span-7 relative group rounded-[2.5rem] overflow-hidden luxury-glass border border-gold-metallic/30 shadow-[0_0_50px_rgba(0,0,0,0.6)] hover:border-gold-400/50 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/5 to-transparent z-10 pointer-events-none" />
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
              <img
                src={gallery[activePhoto].image}
                alt={gallery[activePhoto].title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 filter brightness-[0.85] group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/60 to-transparent z-10 pointer-events-none" />

              {/* Tag Badge */}
              <div className="absolute top-6 left-6 z-20">
                <span className="px-4 py-2 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 text-gold-400 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg font-heading flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-flame-500 animate-pulse shadow-flame-glow" />
                  {gallery[activePhoto].category}
                </span>
              </div>

              {/* Play Video Trigger Button */}
              <button
                onClick={() => setIsVideoOpen(true)}
                className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-[#0a1224]/80 backdrop-blur-md border border-gold-400/50 text-gold-400 flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:scale-110 hover:bg-gold-400 hover:text-navy-950 hover:shadow-[0_0_40px_rgba(250,204,21,0.6)] transition-all duration-300 group/btn z-20"
                aria-label="Reproducir video de operaciones"
              >
                <Play className="w-8 h-8 fill-current translate-x-0.5" />
              </button>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-white mb-3 leading-tight drop-shadow-md break-words">
                  {gallery[activePhoto].title}
                </h3>
                <p className="text-sm text-slate-300 font-light max-w-xl leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                  {gallery[activePhoto].desc}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Thumbnails Selector List */}
          <div className="lg:col-span-5 space-y-4">
            {gallery.map((item, index) => (
              <div
                key={index}
                onClick={() => setActivePhoto(index)}
                className={`group relative p-5 rounded-[2rem] border transition-all duration-500 cursor-pointer flex items-center gap-5 overflow-hidden ${
                  activePhoto === index
                    ? 'bg-[#0a1224] border-gold-400/40 shadow-[0_10px_40px_rgba(0,0,0,0.5)] translate-x-0 sm:-translate-x-4'
                    : 'bg-[#050A14]/50 border-white/5 hover:border-white/10 hover:bg-[#0a1224]/50'
                }`}
              >
                {/* Active Indicator Glow */}
                {activePhoto === index && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-[40px] pointer-events-none" />
                )}

                <div className={`relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border transition-all duration-500 ${
                  activePhoto === index ? 'border-gold-400/50 shadow-gold-glow scale-105' : 'border-slate-800 group-hover:border-slate-600'
                }`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-500"
                  />
                  {activePhoto === index && (
                    <div className="absolute inset-0 bg-gold-500/20 mix-blend-overlay" />
                  )}
                </div>

                <div className="flex-1 min-w-0 z-10">
                  <div className="flex items-center gap-2 mb-1.5">
                    {activePhoto === index && <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.8)] flex-shrink-0" />}
                    <span className={`text-[10px] font-black uppercase tracking-widest block font-heading ${
                      activePhoto === index ? 'text-gold-400' : 'text-slate-500 group-hover:text-slate-400'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                  <h4 className={`text-sm sm:text-base font-black truncate font-heading transition-colors duration-300 ${
                    activePhoto === index ? 'text-white' : 'text-slate-300 group-hover:text-white'
                  }`}>
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-light line-clamp-2 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Right Arrow Indicator */}
                <div className={`absolute right-4 text-gold-400 transition-all duration-500 ${
                  activePhoto === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Operational Highlights Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: 'Especialistas Certificados', value: '100%', sub: 'Ingenieros & Técnicos' },
            { label: 'Normas SI-HO-S & Calidad', value: 'ISO 9001', sub: 'Certificación HSE' },
            { label: 'Disponibilidad de Flota', value: '24/7/365', sub: 'Respuesta Inmediata' },
            { label: 'Cobertura Nacional', value: '3 Cuencas', sub: 'Oriente, Occidente y Sur' }
          ].map((stat, idx) => (
            <div key={idx} className="luxury-glass p-6 sm:p-8 rounded-[2rem] border border-white/5 hover:border-gold-400/30 text-center space-y-2 group transition-colors duration-500 relative overflow-hidden bg-[#0a1224]/40">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-3xl sm:text-4xl font-black font-heading text-white group-hover:text-gold-400 transition-colors drop-shadow-md">
                {stat.value}
              </div>
              <div className="text-xs font-black text-gold-400 font-heading tracking-wide">{stat.label}</div>
              <div className="text-[11px] text-slate-400 font-medium">{stat.sub}</div>
            </div>
          ))}
        </div>

      </div>

      {/* GALLERY VIDEO MODAL */}
      {isVideoOpen && (
        <div 
          onClick={() => setIsVideoOpen(false)}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-navy-950/95 backdrop-blur-2xl animate-fadeIn cursor-pointer"
        >
          {/* Floating Close Button Top Right */}
          <button
            onClick={() => setIsVideoOpen(false)}
            className="fixed top-5 right-5 sm:top-7 sm:right-7 z-[130] px-4 py-2.5 rounded-full bg-flame-600 hover:bg-flame-500 text-white font-black text-xs shadow-flame-glow flex items-center gap-2 transition-all transform hover:scale-105"
            title="Cerrar Video (Esc)"
          >
            <X className="w-5 h-5" />
            <span className="hidden sm:inline">Cerrar Video (Esc)</span>
          </button>

          <div 
            onClick={(e) => e.stopPropagation()}
            className="luxury-glass w-full max-w-4xl rounded-3xl border border-gold-metallic/40 overflow-hidden relative shadow-2xl cursor-default"
          >
            <div className="flex items-center justify-between p-4 bg-navy-950 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-flame-500 fill-flame-500" />
                <h3 className="font-heading font-black text-white text-sm sm:text-base">
                  CYSOS ENERGY - Maniobra de Alivio y Operación en Línea de Producción
                </h3>
              </div>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-2 rounded-xl bg-navy-850 hover:bg-red-950 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <video
                key={companyInfo?.operationsVideoUrl || "/videos/maniobra.mp4"}
                controls
                autoPlay
                className="w-full h-full object-contain"
                poster="/images/IMG_7549.jpg"
              >
                <source src={companyInfo?.operationsVideoUrl || "/videos/maniobra.mp4"} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default HumanOperations;
