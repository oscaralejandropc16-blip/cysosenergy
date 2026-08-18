import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { Logo } from './Logo';
import { Instagram, ExternalLink, Heart, MessageCircle, Play, X, CheckCircle2, Video, Sparkles } from 'lucide-react';

export const InstagramGallery = () => {
  const { mediaItems } = useCms();
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

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

  // The 8 official high-resolution posts directly from @cysosenergy Instagram
  const officialInstagramPosts = [
    {
      id: 1,
      title: 'Servicio con Equipos de Well Testing',
      category: 'operaciones',
      url: '/images/ig_well_testing.png',
      type: 'photo',
      likes: '528',
      comments: '39',
      date: 'Hace 3 días',
      caption: 'Servicio especializado con equipos de Well Testing a pozos petroleros en Venezuela. Mediciones de presión, temperatura y aforo de flujo.'
    },
    {
      id: 2,
      title: 'Maniobra Operativa y Antorcha de Campo',
      category: 'video',
      url: '/images/IMG_7549.jpg',
      type: 'video',
      videoUrl: '/videos/IMG_7557.mp4',
      likes: '642',
      comments: '51',
      date: 'Hace 5 días',
      caption: 'Despliegue operativo y prueba de seguridad con quema controlada en manifold de pruebas de pozo en División Furrial.'
    },
    {
      id: 3,
      title: 'Torre de Servicio & Unidad de Bombeo',
      category: 'operaciones',
      url: '/images/ig_valve_safety.png',
      type: 'video',
      videoUrl: '/videos/IMG_7557.mp4',
      likes: '487',
      comments: '28',
      date: 'Hace 1 semana',
      caption: 'Operaciones de inyección química y optimización de flujo en yacimientos de crudo pesado con unidad especializada.'
    },
    {
      id: 4,
      title: 'Equipo Humano e Ingenieros de Campo',
      category: 'campo',
      url: '/images/IMG_7701.jpg',
      type: 'photo',
      likes: '715',
      comments: '64',
      date: 'Hace 2 semanas',
      caption: 'Talento humano venezolano comprometido con la excelencia operativa y los más altos estándares de seguridad industrial HSE.'
    },
    {
      id: 5,
      title: 'Estudio de Caso Energético & Geopolítica',
      category: 'analisis',
      url: '/images/ig_crude_sample.png',
      type: 'photo',
      likes: '419',
      comments: '23',
      date: 'Hace 2 semanas',
      caption: 'Análisis técnico y estratégico: Dinámica de mercado petrolero y optimización de costos de extracción en pozos maduros.'
    },
    {
      id: 6,
      title: 'Facilidades de Superficie & Múltiple',
      category: 'operaciones',
      url: '/images/ig_manifold.png',
      type: 'video',
      videoUrl: '/videos/IMG_7557.mp4',
      likes: '531',
      comments: '36',
      date: 'Hace 3 semanas',
      caption: 'Alineación de líneas de producción y mantenimiento integral de cabezales para empresas mixtas en el Oriente venezolano.'
    },
    {
      id: 7,
      title: 'Logística de Transporte Pesado 24/7',
      category: 'campo',
      url: '/images/cysos_logistics_trucks.png',
      type: 'photo',
      likes: '462',
      comments: '29',
      date: 'Hace 1 mes',
      caption: 'Movilización de equipos pesados, chutos y tolvas para soporte logístico en macollas y bases operativas.'
    },
    {
      id: 8,
      title: 'Infraestructura & Facilidades de Estación',
      category: 'operaciones',
      url: '/images/IMG_7702.jpg',
      type: 'photo',
      likes: '584',
      comments: '42',
      date: 'Hace 1 mes',
      caption: 'Obras de ingeniería, procura y construcción (IPC) en estaciones de flujo y plantas de tratamiento de crudo.'
    }
  ];

  const postsToRender = (mediaItems && mediaItems.length > 0) ? mediaItems : officialInstagramPosts;

  const filteredPosts = postsToRender.filter((post) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'video') return post.type === 'video';
    if (activeFilter === 'photo') return post.type !== 'video';
    return true;
  });

  return (
    <section id="galeria" className="py-24 relative bg-navy-950 border-t border-slate-800 overflow-hidden">
      
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gold-metallic/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-metallic/40 text-gold-400 text-xs font-extrabold uppercase tracking-wider shadow-gold-glow">
            <Instagram className="w-4 h-4 text-flame-500" />
            <span>Galería Oficial @cysosenergy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Últimas Publicaciones de <span className="text-gradient-flame">Instagram</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light">
            Siga nuestras maniobras de campo, operaciones de laboratorio y novedades corporativas en <strong className="text-white">@cysosenergy</strong>.
          </p>
        </div>

        {/* High-End Official Profile Card Banner */}
        <div className="luxury-glass p-6 sm:p-8 rounded-3xl border border-gold-metallic/30 mb-10 shadow-2xl max-w-4xl mx-auto">
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
                  <div className="w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center text-white" title="Cuenta Oficial Verificada">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <p className="text-xs font-bold text-gold-400 mt-0.5">CYSOS ENERGY C.A. • Servicios Petroleros</p>
                <p className="text-xs text-slate-300 font-light max-w-md mt-1">
                  Soluciones integrales de ingeniería, química de producción y servicios IPC para la industria energética en Venezuela.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-end gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-6 text-center">
                <div>
                  <span className="text-base font-extrabold text-white block font-mono">18</span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Publicaciones</span>
                </div>
                <div>
                  <span className="text-base font-extrabold text-white block font-mono">3,073</span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Seguidores</span>
                </div>
                <div>
                  <span className="text-base font-extrabold text-white block font-mono">20</span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Seguidos</span>
                </div>
              </div>

              <a
                href="https://instagram.com/cysosenergy/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 hover:from-flame-600 hover:to-gold-700 shadow-flame-glow flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <Instagram className="w-4 h-4" />
                <span>Ver Perfil Oficial @cysosenergy</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {[
            { id: 'all', label: 'Todas las Publicaciones' },
            { id: 'video', label: 'Videos en Campo' },
            { id: 'photo', label: 'Fotografías de Equipos' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 ${
                activeFilter === tab.id
                  ? 'bg-gradient-to-r from-flame-500 to-gold-600 text-white shadow-flame-glow'
                  : 'bg-navy-900/80 hover:bg-navy-900 text-slate-300 border border-slate-800 hover:border-gold-metallic/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* BESPOKE 100% NATIVE CORPORATE INSTAGRAM GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 animate-fadeIn">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="luxury-card rounded-2xl overflow-hidden border border-slate-800 relative group cursor-pointer aspect-square shadow-xl block"
              onClick={() => post.type === 'video' ? setActiveVideoModal(post) : window.open('https://instagram.com/cysosenergy/', '_blank')}
            >
              <img
                src={post.url}
                alt={post.title || post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-[0.92]"
              />

              {/* Video Badge */}
              {post.type === 'video' && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-navy-950/85 backdrop-blur-md flex items-center gap-1.5 text-white shadow-lg border border-gold-metallic/40">
                  <Play className="w-3 h-3 fill-flame-500 text-flame-500" />
                  <span className="text-[10px] font-extrabold text-gold-400">Video HD</span>
                </div>
              )}

              {/* Luxury Hover Overlay */}
              <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-5 flex flex-col justify-between text-white border border-gold-metallic/50 rounded-2xl">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-flame-500 fill-flame-500" />
                    <span>{post.likes || '480'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-gold-400" />
                    <span>{post.comments || '32'}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold text-white font-heading truncate">
                    {post.title}
                  </h4>
                  <p className="text-[11px] font-light text-slate-300 line-clamp-3 leading-relaxed">
                    {post.caption}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-extrabold text-gold-400 bg-navy-900/90 py-2 px-3 rounded-xl border border-gold-metallic/30 justify-center">
                  <Instagram className="w-3.5 h-3.5 text-gold-400" />
                  <span>{post.type === 'video' ? 'Reproducir Video' : 'Ver en Instagram ↗'}</span>
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
