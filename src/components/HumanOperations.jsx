import React, { useState } from 'react';
import { Users, ShieldCheck, Award, Sparkles, Play, X } from 'lucide-react';

export const HumanOperations = () => {
  const [activePhoto, setActivePhoto] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="px-3 py-1 rounded-full bg-flame-500 text-white text-[10px] font-extrabold uppercase tracking-wider">
                  {gallery[activePhoto].category}
                </span>
                <h3 className="text-2xl font-extrabold font-heading text-white">
                  {gallery[activePhoto].title}
                </h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed max-w-xl">
                  {gallery[activePhoto].desc}
                </p>
              </div>
            </div>
          </div>

          {/* Thumbnails & Video Selector */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-base font-bold font-heading text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Imágenes y Video Registrados en Campo</span>
            </h3>

            {/* Video Special Card Trigger */}
            <div
              onClick={() => setIsVideoOpen(true)}
              className="p-4 rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-4 border bg-gradient-to-r from-flame-500/20 to-gold-600/20 border-flame-500/40 hover:border-gold-400 shadow-flame-glow group"
            >
              <div className="relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-black">
                <img src="/images/IMG_7549.jpg" alt="Video thumb" className="w-full h-full object-cover opacity-75" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="w-6 h-6 fill-white text-white group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-gold-400 uppercase tracking-wider">🎥 Video Registrado en Campo</span>
                <h4 className="text-xs font-bold text-white">Ver Maniobra de Operación en Video</h4>
                <p className="text-[11px] text-slate-300 font-light">Grabación real de inyección y bombeo de fluidos.</p>
              </div>
            </div>

            {/* Photo Cards */}
            {gallery.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActivePhoto(idx)}
                className={`p-3.5 rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-4 border ${
                  activePhoto === idx
                    ? 'luxury-glass border-gold-metallic shadow-gold-glow scale-[1.02]'
                    : 'bg-navy-900/60 border-slate-800 hover:border-slate-700 hover:bg-navy-900'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-16 rounded-xl object-cover flex-shrink-0"
                />
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gold-400 uppercase">{item.category}</span>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Corporate Values Pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="luxury-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-flame-500/20 border border-flame-500/40 flex items-center justify-center text-flame-500">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold font-heading text-white">Formación Técnica Continua</h4>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Capacitación constante en reología de crudos, normativas de pozo y estándares de calidad para todo el equipo operativo.
            </p>
          </div>

          <div className="luxury-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gold-metallic/20 border border-gold-metallic/40 flex items-center justify-center text-gold-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold font-heading text-white">Cultura HSE en Campo</h4>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Prioridad absoluta en el cuidado de la salud, seguridad del trabajador y preservación del entorno ambiental en cada maniobra.
            </p>
          </div>

          <div className="luxury-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold font-heading text-white">Desarrollo Sostenible</h4>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Compromiso técnico y social en las áreas de influencia directa de las cuencas petroleras donde prestamos servicios.
            </p>
          </div>
        </div>

      </div>

      {/* GALLERY VIDEO MODAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-950/95 backdrop-blur-xl animate-fadeIn">
          <div className="luxury-glass w-full max-w-4xl rounded-3xl border border-gold-metallic/40 overflow-hidden relative shadow-2xl">
            
            <div className="flex items-center justify-between p-4 bg-navy-950 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-flame-500 fill-flame-500" />
                <h3 className="font-heading font-bold text-white text-base">CYSOS ENERGY - Video de Maniobra Operativa</h3>
              </div>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-2 rounded-xl bg-navy-850 text-slate-400 hover:text-white"
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
