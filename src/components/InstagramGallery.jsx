import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { Logo } from './Logo';
import { Instagram, ExternalLink, Play, X, CheckCircle2 } from 'lucide-react';

export const InstagramGallery = () => {
  const { mediaItems = [], companyInfo = {} } = useCms();
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  // Dynamically load the real Tagembed Live Instagram Feed script
  useEffect(() => {
    const scriptId = 'tagembed-embed-script';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://widget.tagembed.com/embed.min.js';
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Keyboard accessibility (ESC key to close video)
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

  return (
    <section id="galeria" className="py-24 relative bg-navy-950 border-t border-slate-800 overflow-hidden">
      
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gold-metallic/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-metallic/40 text-gold-400 text-xs font-extrabold uppercase tracking-wider shadow-gold-glow">
            <Instagram className="w-4 h-4 text-flame-500" />
            <span>Feed Oficial @cysosenergy en Tiempo Real</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Últimas Publicaciones de <span className="text-gradient-flame">Instagram</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light">
            Siga nuestras maniobras de campo, operaciones de laboratorio y novedades corporativas en <strong className="text-white">@cysosenergy</strong>. Sincronización automática en vivo.
          </p>
        </div>

        {/* High-End Official Profile Card Banner - EXACT INSTAGRAM REPLICA */}
        <div className="luxury-glass p-6 sm:p-8 rounded-3xl border border-gold-metallic/30 mb-8 shadow-2xl max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-5">
              {/* EXACT Profile Avatar Replica from Instagram: Crisp White Circle with Full CYSOS Logo */}
              <a
                href="https://instagram.com/cysosenergy/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-flame-500 via-rose-500 to-amber-400 shadow-gold-glow flex-shrink-0 group hover:scale-105 transition-transform flex items-center justify-center"
                title="Ver perfil oficial en Instagram"
              >
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-1 shadow-inner overflow-hidden">
                  <img 
                    src={companyInfo?.logoUrl || '/images/cysos_instagram_avatar.svg'} 
                    alt="Cysos Energy Instagram" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </a>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <a
                    href="https://instagram.com/cysosenergy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-black font-heading text-white hover:text-gold-400 transition-colors"
                  >
                    cysosenergy
                  </a>
                  <div className="w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center text-white" title="Cuenta Oficial Verificada">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-xs font-extrabold text-gold-400">Cysos Energy • Servicios petroleros</p>
                <p className="text-xs text-slate-300 font-light max-w-md leading-relaxed">
                  Soluciones integrales y estratégicas para la industria energética. Eficiencia, tecnología y seguridad en cada proyecto.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
              <a
                href="https://instagram.com/cysosenergy/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3 rounded-2xl text-xs font-black text-white bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 hover:from-flame-600 hover:to-gold-700 shadow-flame-glow flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
              >
                <Instagram className="w-4 h-4" />
                <span>Seguir en Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

        {/* REAL LIVE INSTAGRAM FEED - DOUBLE PRECISION CROP TO ERADICATE WATERMARK AND SHARE BUTTON */}
        <div className="luxury-glass rounded-3xl border border-gold-metallic/30 shadow-2xl overflow-hidden p-0 relative">
          <div className="w-full overflow-hidden" style={{ maxHeight: '545px' }}>
            <div 
              className="tagembed-widget" 
              style={{ 
                width: '100%', 
                height: '675px', 
                marginTop: '-52px', 
                marginBottom: '-80px', 
                overflow: 'hidden',
                background: 'transparent'
              }} 
              data-widget-id="332601" 
              data-website="1"
            />
          </div>
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
                  {activeVideoModal.title || activeVideoModal.caption || 'CYSOS ENERGY - Operaciones en Campo @cysosenergy'}
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
