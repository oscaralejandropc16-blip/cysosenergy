import React, { useState, useEffect } from 'react';
import { Users, ShieldCheck, Award, Sparkles, Play, X } from 'lucide-react';

export const HumanOperations = () => {
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
      title: 'Operaciones de Inyección de Reductores de Viscosidad y Bombeo',
      category: 'Operación Real CYSOS ENERGY',
      image: '/images/IMG_7549.jpg',
      desc: 'Despliegue operativo con unidades especializadas para inyección química y optimización de flujo en yacimientos de crudo pesado.'
    },
    {
      title: 'Equipo de Ingenieros y Especialistas de Campo',
      category: 'Talento Humano Venezolano',
      image: '/images/IMG_7701.jpg',
      desc: 'Personal técnico capacitado bajo estrictas normas internacionales de seguridad HSE, calidad y compromiso operativo.'
    },
    {
      title: 'Infraestructura de Superficie y Facilidades de Producción',
      category: 'Proyectos IPC & Mantenimiento',
      image: '/images/IMG_7702.jpg',
      desc: 'Obras de ingeniería, procura y construcción para estaciones de flujo, manifolds y alineación de macollas petroleras.'
    }
  ];

  return (
    <section id="operaciones" className="py-24 relative bg-navy-950 border-t border-slate-800 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-metallic/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-metallic/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Galería Oficial de Operaciones Reales</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Nuestro Talento Humano y <span className="text-gradient-flame">Equipos en Campo</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light">
            Fotografías y material audiovisual real de los proyectos y maniobras operativas ejecutadas por CYSOS ENERGY en Venezuela.
          </p>
        </div>

        {/* Main Photographic Feature Showcase */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Main Selected Image Showcase */}
          <div className="lg:col-span-7 relative group rounded-3xl overflow-hidden luxury-glass border border-gold-metallic/30 shadow-2xl">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={gallery[activePhoto].image}
                alt={gallery[activePhoto].title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent pointer-events-none" />

              {/* Tag Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-navy-950/80 backdrop-blur-md border border-gold-metallic/40 text-gold-400 text-xs font-bold uppercase tracking-wider shadow-lg">
                  {gallery[activePhoto].category}
                </span>
              </div>

              {/* Play Video Trigger Button */}
              <button
                onClick={() => setIsVideoOpen(true)}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-gradient-to-r from-flame-500 to-gold-600 text-white flex items-center justify-center shadow-flame-glow hover:scale-110 transition-transform duration-300 group/btn z-10"
                aria-label="Reproducir video de operaciones"
              >
                <Play className="w-7 h-7 fill-current translate-x-0.5" />
              </button>

              {/* Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
                <h3 className="text-xl font-bold font-heading text-white">
                  {gallery[activePhoto].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl">
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
                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-4 ${
                  activePhoto === index
                    ? 'bg-navy-900 border-gold-metallic/60 shadow-gold-glow translate-x-2'
                    : 'bg-navy-900/40 border-slate-800 hover:border-slate-700 hover:bg-navy-900/70'
                }`}
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-slate-700">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {activePhoto === index && (
                    <div className="absolute inset-0 bg-gold-500/20" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold text-white truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-light truncate mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Operational Highlights Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Especialistas Certificados', value: '100%', sub: 'Ingenieros & Técnicos' },
            { label: 'Normas SI-HO-S', value: 'ISO 9001', sub: 'Certificación HSE' },
            { label: 'Disponibilidad de Flota', value: '24/7/365', sub: 'Respuesta Inmediata' },
            { label: 'Cobertura Nacional', value: '3 Cuencas', sub: 'Oriente, Occidente y Sur' }
          ].map((stat, idx) => (
            <div key={idx} className="luxury-glass p-5 rounded-2xl border border-slate-800 text-center space-y-1">
              <div className="text-xl sm:text-2xl font-black font-heading text-white">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-gold-400">{stat.label}</div>
              <div className="text-[10px] text-slate-400">{stat.sub}</div>
            </div>
          ))}
        </div>

      </div>

      {/* GALLERY VIDEO MODAL WITH HIGH-Z-INDEX BACKDROP AND EASY CLOSE BUTTON */}
      {isVideoOpen && (
        <div 
          onClick={() => setIsVideoOpen(false)}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-navy-950/95 backdrop-blur-2xl animate-fadeIn cursor-pointer"
        >
          {/* Floating Close Button Top Right */}
          <button
            onClick={() => setIsVideoOpen(false)}
            className="fixed top-5 right-5 sm:top-7 sm:right-7 z-[130] px-4 py-2.5 rounded-full bg-flame-600 hover:bg-flame-500 text-white font-extrabold text-xs shadow-flame-glow flex items-center gap-2 transition-all transform hover:scale-105"
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
                <h3 className="font-heading font-bold text-white text-sm sm:text-base">
                  CYSOS ENERGY - Video de Maniobra Operativa en Campo
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
                controls
                autoPlay
                className="w-full h-full object-contain"
                poster="/images/IMG_7549.jpg"
              >
                <source src="/videos/IMG_7557.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default HumanOperations;
