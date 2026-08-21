import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { 
  Users, ShieldCheck, Award, Sparkles, Play, X, CheckCircle2, 
  ChevronRight, ChevronLeft, Maximize2, Filter, Eye, Camera
} from 'lucide-react';

export const HumanOperations = () => {
  const { companyInfo } = useCms();
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setVisibleCount(6);
  };

  const gallery = [
    {
      id: 1,
      title: 'Inyección Química Continua en Macollas de Crudo Pesado',
      categoryTag: 'quimica',
      categoryName: 'Inyección & Skids',
      image: '/images/cysos_campo_balancin.jpg',
      desc: 'Despliegue operativo y dosificación automatizada de reductores de viscosidad junto a unidades de bombeo mecánico en yacimientos de la Faja del Orinoco.'
    },
    {
      id: 2,
      title: 'Equipo Técnico y Supervisores Certificados en Campo',
      categoryTag: 'equipo',
      categoryName: 'Talento Humano',
      image: '/images/cysos_equipo_uniformes.jpg',
      desc: 'Personal técnico calificado con indumentaria oficial y equipos de protección, operando bajo estrictas normas de seguridad PDVSA SI-HO-S e ISO 9001.'
    },
    {
      id: 3,
      title: 'Suministro de Reductor Permanente de Viscosidad Lipesa 7225 V',
      categoryTag: 'quimica',
      categoryName: 'Inyección & Skids',
      image: '/images/cysos_quimica_lipesa.jpg',
      desc: 'Almacenamiento y manejo seguro de aditivos químicos formulados para reducción reológica de hasta 92% y ahorro sustancial de diluyente.'
    },
    {
      id: 4,
      title: 'Logística de Transporte y Carga con Brazo Hidráulico',
      categoryTag: 'logistica',
      categoryName: 'Logística & Transporte',
      image: '/images/cysos_logistica_camion.jpg',
      desc: 'Unidades de transporte pesado equipadas con brazos hidráulicos para izamiento y distribución autónoma de insumos químicos en locaciones petroleras.'
    },
    {
      id: 5,
      title: 'Skid Automatizado de Inyección Química Continua CyS 2026-I',
      categoryTag: 'quimica',
      categoryName: 'Inyección & Skids',
      image: '/images/cysos_skid_completo.jpg',
      desc: 'Unidad de superficie de alta resistencia con gabinete de seguridad, extintor y conexiones industriales para dosificación precisa sin interrupción.'
    },
    {
      id: 6,
      title: 'Auditoría Operacional y Toma de Parámetros Reológicos en Pozo',
      categoryTag: 'equipo',
      categoryName: 'Talento Humano',
      image: '/images/cysos_ingeniero_auditoria.jpg',
      desc: 'Ingenieros de yacimiento registrando presiones de cabezal, temperaturas de línea y comportamiento dinámico del fluido tratado.'
    },
    {
      id: 7,
      title: 'Homologación Legal, Registro RACDA y Certificación SAPI',
      categoryTag: 'legal',
      categoryName: 'Cumplimiento Legal',
      image: '/images/cysos_placa_tecnica.jpg',
      desc: 'Equipos fabricados en 2026 con capacidad certificada de 50 GLN/HORA, registro ambiental RACDA y propiedad intelectual ante el SAPI.'
    },
    {
      id: 8,
      title: 'Supervisión Técnica Permanente en Estaciones de Inyección',
      categoryTag: 'equipo',
      categoryName: 'Talento Humano',
      image: '/images/cysos_supervisor_skid.jpg',
      desc: 'Supervisores e inspectores en sitio garantizando continuidad operacional, control de dosificación y seguridad industrial.'
    },
    {
      id: 9,
      title: 'Distribución y Entrega de Tambores Químicos en Macolla',
      categoryTag: 'logistica',
      categoryName: 'Logística & Transporte',
      image: '/images/cysos_camion_tambores_campo.jpg',
      desc: 'Flota operativa trasladando tambores de Reductor de Viscosidad y Desemulsionante directo a pozos activos en la Faja del Orinoco.'
    },
    {
      id: 10,
      title: 'Presencia e Identidad Corporativa en Campo de Producción',
      categoryTag: 'equipo',
      categoryName: 'Talento Humano',
      image: '/images/cysos_casco_pov.jpg',
      desc: 'Visión de primera persona del personal de supervisión técnica operando en campos petroleros nacionales.'
    }
  ];

  const categories = [
    { id: 'all', label: 'Todas las Fotos', count: gallery.length },
    { id: 'quimica', label: 'Inyección Química & Skids', count: gallery.filter(g => g.categoryTag === 'quimica').length },
    { id: 'equipo', label: 'Talento Humano', count: gallery.filter(g => g.categoryTag === 'equipo').length },
    { id: 'logistica', label: 'Logística & Transporte', count: gallery.filter(g => g.categoryTag === 'logistica').length },
    { id: 'legal', label: 'Cumplimiento SAPI / RACDA', count: gallery.filter(g => g.categoryTag === 'legal').length },
  ];

  const filteredGallery = activeCategory === 'all'
    ? gallery
    : gallery.filter(item => item.categoryTag === activeCategory);

  // Keyboard navigation & escape listener for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPhotoIndex(null);
        setIsVideoOpen(false);
      }
      if (e.key === 'ArrowRight' && selectedPhotoIndex !== null) {
        setSelectedPhotoIndex((prev) => (prev + 1) % filteredGallery.length);
      }
      if (e.key === 'ArrowLeft' && selectedPhotoIndex !== null) {
        setSelectedPhotoIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
      }
    };

    if (selectedPhotoIndex !== null || isVideoOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedPhotoIndex, isVideoOpen, filteredGallery.length]);

  const openLightbox = (index) => {
    setSelectedPhotoIndex(index);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev + 1) % filteredGallery.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  };

  return (
    <section id="operaciones" className="py-20 md:py-24 relative bg-navy-950 border-t border-slate-800/80 overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-gold-metallic/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-flame-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-4 sm:space-y-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 shadow-[0_0_20px_rgba(250,204,21,0.1)]">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[11px] font-black uppercase text-gold-400 tracking-widest font-heading">
              Galería Oficial de Operaciones en Campo
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight">
            Nuestro Talento Humano y <span className="animate-gradient-text">Equipos en Acción</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base font-light px-2 sm:px-0">
            Fotografías 100% auténticas de nuestros skids de inyección continua, personal certificado y flota pesada en la Faja del Orinoco y cuencas venezolanas.
          </p>

          {/* Video Button Trigger */}
          <div className="pt-3 sm:pt-2 flex justify-center">
            <button
              onClick={() => setIsVideoOpen(true)}
              className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-2.5 rounded-2xl bg-gradient-to-r from-flame-500 to-gold-600 hover:from-flame-600 hover:to-gold-700 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-flame-glow transition-all transform hover:scale-105 font-heading w-full sm:w-auto justify-center"
            >
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              <span>Ver Video Oficial de Maniobra en Pozo</span>
            </button>
          </div>
        </div>

        {/* Modern Filter System */}
        <div className="flex justify-start sm:justify-center mb-8 sm:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex overflow-x-auto hide-scrollbar sm:flex-wrap items-center gap-2 p-2 rounded-2xl bg-navy-950/50 backdrop-blur-md border border-slate-800/80 snap-x snap-mandatory pb-2 sm:pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-black font-heading transition-all whitespace-nowrap flex items-center gap-2 snap-center flex-shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-flame-500 to-gold-600 text-white shadow-flame-glow scale-[1.02]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeCategory === cat.id ? 'bg-black/30 text-white' : 'bg-navy-950 text-slate-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Balanced Photo Grid (3 cols on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 animate-fadeIn">
          {filteredGallery.slice(0, visibleCount).map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-3xl overflow-hidden luxury-glass border border-slate-800/80 hover:border-gold-400/60 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-950">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-[0.9] group-hover:brightness-100"
                />
                
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />

                {/* Category Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-xl bg-navy-950/80 backdrop-blur-md border border-white/10 text-gold-400 text-[10px] font-black uppercase tracking-wider font-heading flex items-center gap-1.5 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-flame-500 animate-pulse" />
                    {item.categoryName}
                  </span>
                </div>

                {/* Zoom Icon Button */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-9 h-9 rounded-xl bg-navy-950/90 border border-gold-400/40 text-gold-400 flex items-center justify-center shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Card Footer Content */}
              <div className="p-5 sm:p-6 bg-navy-950/90 border-t border-slate-800/60 space-y-2 flex-1 flex flex-col justify-between">
                <h3 className="text-base sm:text-lg font-black font-heading text-white group-hover:text-gold-400 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs font-bold text-gold-400 font-heading">
                  <span className="flex items-center gap-1 text-[11px] group-hover:underline">
                    <Eye className="w-3.5 h-3.5 text-flame-500" />
                    <span>Ver en alta resolución</span>
                  </span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredGallery.length && (
          <div className="flex justify-center mb-16 sm:mb-20 animate-fadeIn">
            <button
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="px-8 py-3.5 rounded-2xl bg-navy-900/80 hover:bg-navy-800 text-gold-400 text-xs font-black uppercase tracking-widest font-heading border border-gold-400/30 hover:border-gold-400 transition-all shadow-[0_0_20px_rgba(250,204,21,0.05)] flex items-center gap-2 transform hover:-translate-y-1"
            >
              <span>Ver más fotos operativas</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Operational Highlights Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {[
            { label: 'Especialistas Certificados', value: '100%', sub: 'Ingenieros & Técnicos' },
            { label: 'Normas SI-HO-S & Calidad', value: 'ISO 9001', sub: 'Certificación HSE' },
            { label: 'Disponibilidad de Flota', value: '24/7/365', sub: 'Respuesta Inmediata' },
            { label: 'Cobertura Nacional', value: '3 Cuencas', sub: 'Oriente, Occidente y Sur' }
          ].map((stat, idx) => (
            <div key={idx} className="luxury-glass p-4 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-white/5 hover:border-gold-400/30 text-center space-y-2 group transition-colors duration-500 relative overflow-hidden bg-[#0a1224]/40 flex flex-col justify-center min-h-[140px]">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-2xl sm:text-4xl font-black font-heading text-white group-hover:text-gold-400 transition-colors drop-shadow-md">
                {stat.value}
              </div>
              <div className="text-xs font-black text-gold-400 font-heading tracking-wide">{stat.label}</div>
              <div className="text-[11px] text-slate-400 font-medium">{stat.sub}</div>
            </div>
          ))}
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {selectedPhotoIndex !== null && filteredGallery[selectedPhotoIndex] && (
        <div
          onClick={() => setSelectedPhotoIndex(null)}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-navy-950/95 backdrop-blur-2xl animate-fadeIn cursor-pointer"
        >
          {/* Close Button Top Right */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="fixed top-5 right-5 sm:top-7 sm:right-7 z-[160] px-4 py-2 rounded-full bg-flame-600 hover:bg-flame-500 text-white font-black text-xs shadow-flame-glow flex items-center gap-2 transition-all transform hover:scale-105"
            title="Cerrar (Esc)"
          >
            <X className="w-5 h-5" />
            <span className="hidden sm:inline">Cerrar (Esc)</span>
          </button>

          {/* Prev Arrow */}
          <button
            onClick={prevPhoto}
            className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 z-[160] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-navy-900/80 border border-gold-400/30 text-white hover:text-gold-400 hover:bg-navy-850 flex items-center justify-center shadow-2xl transition-all transform hover:scale-110"
            title="Foto Anterior"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={nextPhoto}
            className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-[160] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-navy-900/80 border border-gold-400/30 text-white hover:text-gold-400 hover:bg-navy-850 flex items-center justify-center shadow-2xl transition-all transform hover:scale-110"
            title="Foto Siguiente"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Lightbox Modal Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="luxury-glass w-full max-w-5xl rounded-[2.5rem] border border-gold-metallic/40 overflow-hidden relative shadow-2xl cursor-default my-auto max-h-[92vh] flex flex-col bg-navy-950"
          >
            {/* High-Res Image Showcase */}
            <div className="relative w-full max-h-[60vh] sm:max-h-[68vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={filteredGallery[selectedPhotoIndex].image}
                alt={filteredGallery[selectedPhotoIndex].title}
                className="w-full h-full object-contain max-h-[60vh] sm:max-h-[68vh]"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-gold-400 text-xs font-black uppercase tracking-wider font-heading">
                  Foto {selectedPhotoIndex + 1} de {filteredGallery.length}
                </span>
              </div>
            </div>

            {/* Photo Metadata Footer */}
            <div className="p-6 sm:p-8 bg-navy-950 border-t border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-flame-500/20 border border-flame-500/40 text-flame-400 text-[10px] font-black uppercase tracking-widest font-heading">
                  {filteredGallery[selectedPhotoIndex].categoryName}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                {filteredGallery[selectedPhotoIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {filteredGallery[selectedPhotoIndex].desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* GALLERY VIDEO MODAL */}
      {isVideoOpen && (
        <div 
          onClick={() => setIsVideoOpen(false)}
          className="fixed inset-0 z-[160] flex items-center justify-center p-4 sm:p-6 bg-navy-950/95 backdrop-blur-2xl animate-fadeIn cursor-pointer"
        >
          <button
            onClick={() => setIsVideoOpen(false)}
            className="fixed top-5 right-5 sm:top-7 sm:right-7 z-[170] px-4 py-2.5 rounded-full bg-flame-600 hover:bg-flame-500 text-white font-black text-xs shadow-flame-glow flex items-center gap-2 transition-all transform hover:scale-105"
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
                poster="/images/cysos_casco_pov.jpg"
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
