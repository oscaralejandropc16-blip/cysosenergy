import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { Logo } from './Logo';
import { Instagram, ExternalLink, Heart, MessageCircle, Play, X } from 'lucide-react';

export const InstagramGallery = () => {
  const { mediaItems } = useCms();
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveVideoModal(null);
      }
    };
    if (activeVideoModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeVideoModal]);

  const displayedPosts = mediaItems && mediaItems.length > 0 ? mediaItems : [
    {
      id: 1,
      url: '/images/ig_well_testing.png',
      type: 'photo',
      caption: 'SERVICIO CON EQUIPOS DE WELL TESTING A POZOS PETROLEROS EN VENEZUELA ⛽⚡'
    },
    {
      id: 2,
      url: '/images/ig_valve_safety.png',
      type: 'video',
      videoUrl: '/videos/IMG_7557.mp4',
      caption: 'MANIOBRAS DE SEGURIDAD Y VÁLVULA DE CONTROL EN MANIFOLD DE PRUEBAS.'
    },
    {
      id: 3,
      url: '/images/ig_crude_sample.png',
      type: 'photo',
      caption: 'Muestra reológica de crudo pesado previo a la dosificación de reductor CYSOS EOR System. 🛢️'
    },
    {
      id: 4,
      url: '/images/ig_manifold.png',
      type: 'video',
      videoUrl: '/videos/IMG_7557.mp4',
      caption: 'Inspección técnica y maniobra de alineación en múltiple de producción en Faja del Orinoco.'
    },
    {
      id: 5,
      url: '/images/IMG_7549.jpg',
      type: 'video',
      videoUrl: '/videos/IMG_7557.mp4',
      caption: 'Operación de inyección continua de reductores de viscosidad CYSOS EOR System en yacimiento.'
    },
    {
      id: 6,
      url: '/images/IMG_7701.jpg',
      type: 'photo',
      caption: 'Equipo multidisciplinario de profesionales e ingenieros CYSOS ENERGY en operaciones de campo.'
    }
  ];

  return (
    <section className="py-24 relative bg-navy-950 border-t border-slate-800 overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-metallic/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-metallic/40 text-gold-400 text-xs font-extrabold uppercase tracking-wider shadow-gold-glow">
            <Instagram className="w-4 h-4 text-flame-500" />
            <span>Feed Oficial @cysosenergy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Últimas Publicaciones de <span className="text-gradient-flame">Instagram</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light">
            Siga nuestras maniobras de campo, operaciones de laboratorio y novedades corporativas en <strong className="text-white">@cysosenergy</strong>.
          </p>
        </div>

        {/* Profile Card Banner */}
        <div className="luxury-glass p-6 sm:p-8 rounded-3xl border border-gold-metallic/30 mb-12 shadow-2xl max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-5">
              <a
                href="https://instagram.com/cysosenergy/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-br from-flame-500 via-orange-500 to-gold-500 shadow-gold-glow flex-shrink-0 group hover:scale-105 transition-transform flex items-center justify-center overflow-hidden"
              >
                <div className="w-full h-full rounded-full bg-navy-950 flex items-center justify-center p-2.5 border border-navy-900 overflow-hidden">
                  <Logo showText={false} className="w-10 h-10 flex items-center justify-center" />
                </div>
              </a>

              <div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://instagram.com/cysosenergy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-extrabold font-heading text-white hover:text-gold-400 transition-colors"
                  >
                    cysosenergy
                  </a>
                  <span className="w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center text-white text-[10px] font-bold">✓</span>
                </div>
                <p className="text-xs font-bold text-slate-300">Cysos Energy</p>
                <p className="text-xs text-slate-400 font-light max-w-md mt-1">
                  Servicios petroleros. Soluciones integrales y estratégicas para la industria energética.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-end gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-6 text-center">
                <div>
                  <span className="text-base font-extrabold text-white block">18</span>
                  <span className="text-[10px] text-slate-400 uppercase">Posts</span>
                </div>
                <div>
                  <span className="text-base font-extrabold text-white block">3,073</span>
                  <span className="text-[10px] text-slate-400 uppercase">Seguidores</span>
                </div>
                <div>
                  <span className="text-base font-extrabold text-white block">20</span>
                  <span className="text-[10px] text-slate-400 uppercase">Seguidos</span>
                </div>
              </div>

              <a
                href="https://instagram.com/cysosenergy/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 hover:from-flame-600 hover:to-gold-700 shadow-flame-glow flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <Instagram className="w-4 h-4" />
                <span>Seguir @cysosenergy</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

        {/* 6-Grid High-Definition Photographic Media Showcase */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 animate-fadeIn">
          {displayedPosts.map((post) => (
            <div
              key={post.id}
              className="luxury-card rounded-2xl overflow-hidden border border-slate-800 relative group cursor-pointer aspect-square shadow-xl block"
              onClick={() => post.type === 'video' ? setActiveVideoModal(post) : window.open('https://instagram.com/cysosenergy/', '_blank')}
            >
              <img
                src={post.url}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-[0.9]"
              />

              {post.type === 'video' && (
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/75 backdrop-blur-md flex items-center justify-center text-white shadow-lg border border-white/20">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-navy-950/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-flame-500 fill-flame-500" />
                    <span>340</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-gold-400" />
                    <span>18</span>
                  </div>
                </div>

                <p className="text-xs font-light text-slate-200 line-clamp-3 leading-relaxed">
                  {post.caption}
                </p>

                <div className="flex items-center gap-2 text-xs font-extrabold text-gold-400 bg-navy-900/90 py-2.5 px-3.5 rounded-xl border border-gold-metallic/30 justify-center">
                  <Instagram className="w-4 h-4 text-gold-400" />
                  <span>Ver en Instagram ↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Real Video Player Modal */}
      {activeVideoModal && (
        <div 
          onClick={() => setActiveVideoModal(null)}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-navy-950/95 backdrop-blur-2xl animate-fadeIn cursor-pointer"
        >
          {/* Floating Close Button Top Right */}
          <button
            onClick={() => setActiveVideoModal(null)}
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
                  {activeVideoModal.title || 'CYSOS ENERGY - Operaciones en Campo @cysosenergy'}
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
              <video controls autoPlay className="w-full h-full object-contain" poster={activeVideoModal.url}>
                <source src={activeVideoModal.videoUrl || '/videos/IMG_7557.mp4'} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default InstagramGallery;
