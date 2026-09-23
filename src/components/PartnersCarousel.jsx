import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCms } from '../context/CmsContext';
import { 
  Award, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Building2, 
  FileCheck2, 
  ArrowUpRight,
  MoveHorizontal 
} from 'lucide-react';

export const PartnersCarousel = () => {
  const { partners } = useCms();
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDraggingState, setIsDraggingState] = useState(false);

  const trackRef = useRef(null);
  const singleSetWidthRef = useRef(0);
  const scrollPos = useRef(0);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const hasMoved = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const momentumVelocity = useRef(0);
  const glideTarget = useRef(null);
  const autoSpeed = 0.75; // Pixels per frame at 60fps (~45px/s)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedClient(null);
      }
    };
    if (selectedClient) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedClient]);

  const safePartners = Array.isArray(partners) && partners.length > 0 ? partners : [
    {
      id: 'halliburton',
      name: 'HALLIBURTON',
      sub: 'Servicios de Yacimiento & Wellbore',
      contract: 'Alquiler y suministro de equipos pesados, unidades de transporte y soporte técnico de superficie en Base Maturín.',
      type: 'Multinacional USA',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Halliburton_logo.svg/320px-Halliburton_logo.svg.png'
    },
    {
      id: 'slb',
      name: 'SLB (Schlumberger)',
      sub: 'Líder Mundial en Tecnología Petrolera',
      contract: 'Servicio integral de transporte pesado con chutos, tolvas y cisternas para lodos y químicos en pozos de exploración y desarrollo (3 años continuos).',
      type: 'Multinacional USA',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/SLB_Logo_2022.svg/320px-SLB_Logo_2022.svg.png'
    },
    {
      id: 'pdvsa-petrojunin',
      name: 'PDVSA PETROJUNÍN',
      sub: 'Alianza ENI • Faja del Orinoco',
      contract: 'Servicios de asfaltado, inyección continua de reductores de viscosidad EOR y suministro de equipos misceláneos de pozo en División Junín.',
      type: 'Empresa Mixta PDVSA',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/PDVSA_Logo.svg/320px-PDVSA_Logo.svg.png'
    },
    {
      id: 'pdvsa-petromiranda',
      name: 'PDVSA PETROMIRANDA',
      sub: 'Alianza Rosneft • División Junín',
      contract: 'Saneamiento ambiental integral de suelos y cuerpos de agua, succión con unidades vacuum y manejo de fluidos en macollas petroleras.',
      type: 'Empresa Mixta PDVSA',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/PDVSA_Logo.svg/320px-PDVSA_Logo.svg.png'
    }
  ];

  // Repeat 4 times to ensure seamless infinite looping on all screen sizes
  const marqueeItems = [...safePartners, ...safePartners, ...safePartners, ...safePartners];

  // Calculate single set width dynamically
  const updateMetrics = useCallback(() => {
    if (trackRef.current) {
      // 4 sets total, so one set is scrollWidth / 4
      singleSetWidthRef.current = trackRef.current.scrollWidth / 4;
    }
  }, []);

  useEffect(() => {
    updateMetrics();
    window.addEventListener('resize', updateMetrics);

    // Re-measure after images/fonts settle
    const timeout = setTimeout(updateMetrics, 500);

    let animationFrameId;
    let lastTimestamp = performance.now();

    const animate = (timestamp) => {
      const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
      lastTimestamp = timestamp;
      const singleWidth = singleSetWidthRef.current;

      if (singleWidth > 0 && trackRef.current) {
        if (glideTarget.current !== null) {
          // Smooth glide toward target offset (from arrow clicks)
          const diff = glideTarget.current - scrollPos.current;
          if (Math.abs(diff) < 0.8) {
            scrollPos.current = glideTarget.current;
            glideTarget.current = null;
          } else {
            scrollPos.current += diff * Math.min(12 * dt, 0.35);
          }
        } else if (!isDragging.current) {
          if (Math.abs(momentumVelocity.current) > 0.05) {
            // Apply inertial momentum after drag/swipe release
            scrollPos.current += momentumVelocity.current * dt * 60;
            momentumVelocity.current *= Math.pow(0.92, dt * 60);
          } else {
            momentumVelocity.current = 0;
            // Constant auto-scroll speed if not hovered
            if (!isHovered.current) {
              scrollPos.current += autoSpeed * dt * 60;
            }
          }
        }

        // Wrap-around seamlessly
        if (singleWidth > 0) {
          while (scrollPos.current >= singleWidth) {
            scrollPos.current -= singleWidth;
            if (glideTarget.current !== null) glideTarget.current -= singleWidth;
          }
          while (scrollPos.current < 0) {
            scrollPos.current += singleWidth;
            if (glideTarget.current !== null) glideTarget.current += singleWidth;
          }
        }

        trackRef.current.style.transform = `translate3d(${-scrollPos.current}px, 0, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateMetrics);
      clearTimeout(timeout);
    };
  }, [updateMetrics, safePartners]);

  // Arrow glide controls
  const handleGlide = (direction) => {
    glideTarget.current = (glideTarget.current ?? scrollPos.current) + (direction === 'next' ? 380 : -380);
    momentumVelocity.current = 0;
  };

  // Touch Handlers for Mobile Swiping
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    isDragging.current = true;
    setIsDraggingState(true);
    hasMoved.current = false;
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    lastX.current = e.touches[0].clientX;
    lastTime.current = performance.now();
    momentumVelocity.current = 0;
    glideTarget.current = null;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current || e.touches.length !== 1) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - lastX.current;
    const totalDeltaX = currentX - startX.current;

    if (Math.abs(totalDeltaX) > 6) {
      hasMoved.current = true;
    }

    scrollPos.current -= deltaX;
    const now = performance.now();
    const dt = (now - lastTime.current) / 1000;
    if (dt > 0.001) {
      momentumVelocity.current = (-deltaX / dt) / 60;
    }
    lastX.current = currentX;
    lastTime.current = now;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    setIsDraggingState(false);
    setTimeout(() => {
      hasMoved.current = false;
    }, 120);
  };

  // Mouse Drag Handlers for Desktop
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    isDragging.current = true;
    setIsDraggingState(true);
    hasMoved.current = false;
    startX.current = e.clientX;
    lastX.current = e.clientX;
    lastTime.current = performance.now();
    momentumVelocity.current = 0;
    glideTarget.current = null;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const currentX = e.clientX;
    const deltaX = currentX - lastX.current;
    if (Math.abs(currentX - startX.current) > 6) {
      hasMoved.current = true;
    }
    scrollPos.current -= deltaX;
    const now = performance.now();
    const dt = (now - lastTime.current) / 1000;
    if (dt > 0.001) {
      momentumVelocity.current = (-deltaX / dt) / 60;
    }
    lastX.current = currentX;
    lastTime.current = now;
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      setIsDraggingState(false);
      setTimeout(() => {
        hasMoved.current = false;
      }, 120);
    }
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      setIsDraggingState(false);
    }
    isHovered.current = false;
    setTimeout(() => {
      hasMoved.current = false;
    }, 120);
  };

  const handleCardClick = (partner) => {
    if (hasMoved.current) return; // Prevent triggering modal when user swiped
    setSelectedClient(partner);
  };

  return (
    <section className="py-20 md:py-24 relative bg-navy-950 overflow-hidden border-b border-slate-800/80">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-flame-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-slate-300 font-heading">
              <span className="w-1.5 h-1.5 bg-flame-500 rotate-45" />
              <span>Clientes & Aliados Estratégicos</span>
              <span className="h-px w-8 bg-gradient-to-r from-flame-500/60 to-transparent" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
              Empresas que confían en <span className="text-flame-500 block mt-1 sm:inline sm:mt-0">CYSOS ENERGY</span>
            </h2>
            
            {/* Mobile swipe gesture guide */}
            <div className="flex sm:hidden items-center gap-2 text-xs text-slate-300 font-heading font-medium bg-navy-900 border border-slate-700 px-3 py-1 rounded-lg w-fit">
              <MoveHorizontal className="w-3.5 h-3.5 animate-pulse text-flame-500" />
              <span>Desliza con tu dedo para explorar</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-end lg:items-center gap-4">
            <p className="text-sm text-slate-300 font-light max-w-md leading-relaxed md:text-right border-l md:border-l-0 md:border-r-2 border-slate-700 pl-4 md:pl-0 md:pr-6">
              Trayectoria comprobada operando junto a corporaciones multinacionales y empresas mixtas del sector hidrocarburos.
            </p>

            {/* Interactive Carousel Navigation Buttons */}
            <div className="flex items-center gap-2 pt-2 sm:pt-0">
              <button
                type="button"
                onClick={() => handleGlide('prev')}
                aria-label="Ver anterior"
                className="w-10 h-10 rounded-2xl bg-navy-900 hover:bg-navy-850 border border-slate-700 hover:border-flame-500/60 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 active:scale-90 shadow-lg backdrop-blur-md"
                title="Deslizar anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handleGlide('next')}
                aria-label="Ver siguiente"
                className="w-10 h-10 rounded-2xl bg-navy-900 hover:bg-navy-850 border border-slate-700 hover:border-flame-500/60 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 active:scale-90 shadow-lg backdrop-blur-md"
                title="Deslizar siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTINUOUS TOUCH & DRAG INTERACTIVE TICKER */}
      <div 
        className={`relative w-full overflow-hidden py-10 sm:py-12 border-y border-slate-800/60 bg-gradient-to-b from-navy-950 via-navy-900/60 to-navy-950 backdrop-blur-xl touch-pan-y select-none ${
          isDraggingState ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {/* Cinematic Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 lg:w-64 bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 lg:w-64 bg-gradient-to-l from-navy-950 via-navy-950/80 to-transparent z-20 pointer-events-none" />

        <div 
          ref={trackRef}
          className="flex w-max gap-6 sm:gap-10 items-center px-4 will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          {marqueeItems.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              onClick={() => handleCardClick(partner)}
              className="flex-shrink-0 group/card relative p-5 sm:p-6 rounded-3xl bg-[#0a1122]/40 backdrop-blur-3xl border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden flex items-center gap-5 sm:gap-6 w-[280px] sm:w-[420px] shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] select-none cursor-pointer"
            >
              {/* Premium Sweep Gradient Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/card:opacity-100 -translate-x-full group-hover/card:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none" />
              
              {/* Sleek Floating Glass Logo */}
              <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center p-3 sm:p-4 shadow-inner group-hover/card:bg-white/5 transition-all duration-500 backdrop-blur-md overflow-hidden pointer-events-none">
                {partner.logoUrl ? (
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    loading="lazy"
                    draggable={false}
                    className="w-full h-full object-contain filter drop-shadow-lg relative z-10 scale-100 group-hover/card:scale-105 transition-transform duration-700 select-none pointer-events-none"
                  />
                ) : (
                  <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-slate-700 relative z-10" />
                )}
              </div>

              {/* Minimalist Corporate Typography */}
              <div className="flex-1 min-w-0 relative z-10 flex flex-col justify-center pointer-events-none">
                <div className="flex justify-between items-start w-full">
                  <h4 className="text-sm sm:text-lg font-black font-heading text-slate-200 truncate group-hover/card:text-white transition-colors duration-500 tracking-tight">
                    {partner.name}
                  </h4>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover/card:text-white transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-all duration-300" />
                </div>
                
                <p className="text-[10px] sm:text-xs text-slate-400 font-medium mt-0.5 mb-3 truncate group-hover/card:text-slate-300 transition-colors duration-500">
                  {partner.sub}
                </p>
                
                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 w-fit">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover/card:bg-slate-300 transition-colors duration-500" />
                  <span className="text-[8px] sm:text-[9px] font-bold uppercase text-slate-400 tracking-[0.15em] group-hover/card:text-slate-200 transition-colors duration-500">
                    {partner.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INTERACTIVE CLIENT DETAIL MODAL - ULTRA-LUXURY REDESIGN */}
      {selectedClient && (
        <div 
          onClick={() => setSelectedClient(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden custom-scrollbar rounded-[2.5rem] bg-[#070e22]/95 backdrop-blur-3xl border border-slate-700/80 p-5 sm:p-10 space-y-5 sm:space-y-7 shadow-[0_20px_80px_rgba(0,0,0,0.85)] relative cursor-default animate-scaleUp"
          >
            {/* Subtle Ambient Warmth */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-flame-500/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Top Bar with Integrated Close Button */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-navy-900 border border-slate-700 text-slate-300 text-[10px] font-heading font-bold uppercase tracking-widest shadow-inner">
                <span className="w-1.5 h-1.5 rounded-sm bg-flame-500" />
                <span>Alianza Corporativa Estratégica</span>
              </div>

              <button
                onClick={() => setSelectedClient(null)}
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-flame-600 border border-white/10 hover:border-flame-500 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg"
                title="Cerrar ventana (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Header: Logo and Corporate Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 relative z-10">
              {/* Refined Glass/Glossy Logo Container */}
              <div className="w-28 h-24 sm:w-36 sm:h-28 rounded-3xl bg-white p-3.5 flex items-center justify-center shadow-2xl flex-shrink-0 border border-white/30 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-100" />
                {selectedClient.logoUrl ? (
                  <img 
                    src={selectedClient.logoUrl} 
                    alt={selectedClient.name} 
                    draggable={false}
                    className="w-full h-full object-contain filter drop-shadow-sm relative z-10 scale-100 select-none" 
                  />
                ) : (
                  <Building2 className="w-12 h-12 text-slate-800 relative z-10" />
                )}
              </div>

              <div className="space-y-2 flex-1 min-w-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-navy-900/90 border border-slate-700 text-[10px] font-black uppercase text-slate-200 tracking-wider font-heading">
                  <Award className="w-3.5 h-3.5 text-flame-500" />
                  <span>{selectedClient.type || 'Cliente Homologado'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight leading-tight">
                  {selectedClient.name}
                </h3>
                {selectedClient.sub && (
                  <p className="text-xs text-slate-300 font-light leading-snug">
                    {selectedClient.sub}
                  </p>
                )}
              </div>
            </div>

            {/* Contract & Operational Scope Box */}
            <div className="relative z-10 rounded-3xl bg-navy-950/90 border border-slate-700/80 p-6 sm:p-7 space-y-3.5 shadow-inner">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-flame-500/10 border border-flame-500/30 flex items-center justify-center text-flame-500 flex-shrink-0 shadow-flame-glow">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs uppercase font-black tracking-widest text-white font-heading block">
                    Alcance Operativo del Contrato
                  </span>
                  <span className="text-[10px] text-slate-400 font-light">Servicios y equipos suministrados por CYSOS ENERGY</span>
                </div>
              </div>
              
              <p className="text-sm text-slate-200 leading-relaxed font-light pl-1 pt-1 border-t border-slate-800/80">
                {selectedClient.contract}
              </p>

              {/* Operational Metadata Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-navy-900/80 border border-white/5 text-[11px] text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-sm bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] flex-shrink-0" />
                  <span>Estatus: <strong className="text-white font-bold">Contrato Ejecutado / Vigente</strong></span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-navy-900/80 border border-white/5 text-[11px] text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-sm bg-energy-cyan shadow-[0_0_8px_rgba(14,165,233,0.8)] flex-shrink-0" />
                  <span>Estándar: <strong className="text-white font-bold">Homologación PDVSA</strong></span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 w-full sm:w-auto">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-[11px] font-bold text-emerald-300 font-heading">Normas PDVSA SI-HO-S & Calidad ISO 9001</span>
              </div>

              <button
                onClick={() => setSelectedClient(null)}
                className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-flame-500 via-orange-600 to-flame-600 hover:from-flame-600 hover:to-orange-700 text-white font-black text-xs uppercase tracking-wider font-heading transition-all shadow-flame-glow transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default PartnersCarousel;

