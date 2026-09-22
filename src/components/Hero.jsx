import React, { useState, useEffect, useRef } from 'react';
import { useCms } from '../context/CmsContext';
import { Activity, FlaskConical, Truck, Globe, Flame, ShieldCheck, ArrowRight, Settings, ChevronDown, FileText } from 'lucide-react';

// Robust Animated Counter Component triggering smooth counting up from 0
const AnimatedCounter = ({ targetValue, decimals = 0, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp = null;
          let animationFrame;

          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeOutProgress * targetValue;
            setCount(currentVal);

            if (progress < 1) {
              animationFrame = window.requestAnimationFrame(step);
            }
          };

          animationFrame = window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    const fallbackTimer = setTimeout(() => {
      if (!hasAnimated.current) {
        hasAnimated.current = true;
        setCount(targetValue);
      }
    }, 400);

    return () => {
      if (counterRef.current) observer.unobserve(counterRef.current);
      clearTimeout(fallbackTimer);
    };
  }, [targetValue, duration]);

  const formattedNumber = decimals > 0
    ? count.toLocaleString('es-VE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : Math.floor(count).toLocaleString('es-VE');

  return <span ref={counterRef}>{formattedNumber}</span>;
};

export const Hero = ({ onOpenDossier }) => {
  const { kpis, heroContent } = useCms();
  const currentHero = heroContent || {
    videoUrl: '/videos/IMG_7557.mp4',
    posterUrl: '/images/IMG_7549.jpg',
    badgeText: 'Soluciones Integrales para la Industria Energética • Venezuela',
    titlePart1: 'Creamos Soluciones y',
    titleGradient: 'Resolvemos Desafíos',
    titlePart2: 'para la Industria Petrolera',
    subtitle: 'Integración de Ingeniería IPC, Procura Internacional, Logística Pesada y Química de Producción.',
    pillar1: 'Química de Producción',
    pillar2: 'Intervención de Pozos',
    pillar3: 'Logística Pesada',
    pillar4: 'Ingeniería Procura'
  };

  const safeKpis = Array.isArray(kpis) && kpis.length > 0 ? kpis : [
    { id: 'pozos', label: 'POZOS INTERVENIDOS', value: 450, prefix: '+', suffix: '', desc: 'En campos de crudo pesado y tradicional' },
    { id: 'viscosidad', label: 'REDUCCIÓN VISCOSIDAD', value: 98.4, prefix: '', suffix: '%', desc: 'Eficiencia en transporte de hidrocarburos' },
    { id: 'horas', label: 'HORAS SIN ACCIDENTES', value: 1250000, prefix: '+', suffix: 'hrs', desc: 'Certificación HSE de clase mundial' },
    { id: 'bpd', label: 'BARRILES FLUIDIZADOS', value: 120000, prefix: '+', suffix: 'BPD', desc: 'Optimización de flujo en oleoductos' }
  ];

  return (
    <section id="inicio" className="relative pt-24 pb-6 sm:pt-28 sm:pb-8 bg-navy-950 min-h-screen flex flex-col justify-between overflow-hidden">
      
      {/* DYNAMIC CMS CINEMATIC VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          dangerouslySetInnerHTML={{
            __html: `
              <video
                autoplay
                loop
                muted
                playsinline
                preload="auto"
                class="w-full h-full object-cover object-center filter brightness-[1.05] contrast-[1.05] saturate-[1.1] transform"
              >
                <source src="/videos/IMG_7557.mp4" type="video/mp4" />
              </video>
            `
          }}
          className="w-full h-full"
        />
        
        {/* Soft edge gradient: darkens top for navbar and bottom for KPI bar, keeping the entire center video completely clear and vivid */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-transparent to-navy-950/85 pointer-events-none" />
        
        {/* Subtle Ambient Industrial Warmth */}
        <div className="absolute bottom-1/3 right-1/4 translate-x-1/4 w-[400px] h-[400px] bg-flame-500/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto pt-4 pb-4">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-3.5 sm:space-y-4 animate-fadeIn relative">
          
          {/* Gentle localized text shadow cushion behind headline for crystal-clear readability without dimming the video */}
          <div className="absolute -inset-4 sm:-inset-6 bg-black/25 rounded-3xl blur-xl pointer-events-none -z-10" />

          {/* Main Headline - High Vitality & Maximum Contrast */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight leading-[1.15] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_6px_rgba(0,0,0,1)] px-2">
            {currentHero.titlePart1} <br className="block sm:hidden" />
            <span className="text-flame-500 drop-shadow-[0_4px_16px_rgba(249,115,22,0.5)] drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
              {currentHero.titleGradient}
            </span> <br className="block sm:hidden" />
            {currentHero.titlePart2}
          </h1>

          {/* Subheading */}
          <p className="text-xs sm:text-base md:text-lg text-white font-medium leading-relaxed max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,1)] drop-shadow-[0_1px_4px_rgba(0,0,0,1)] px-4">
            {currentHero.subtitle}
          </p>

          {/* 4 Interactive Pillars Horizontal Grid - Engineering Telemetry Cards */}
          <div className="hidden sm:grid sm:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-3xl pt-1">
            {[
              { title: currentHero.pillar1 || 'Química de Producción', icon: FlaskConical, href: '#servicios' },
              { title: currentHero.pillar2 || 'Intervención de Pozos', icon: Flame, href: '#servicios' },
              { title: currentHero.pillar3 || 'Logística Pesada', icon: Truck, href: '#servicios' },
              { title: currentHero.pillar4 || 'Ingeniería Procura', icon: Globe, href: '#servicios' }
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <a
                  key={idx}
                  href={pillar.href}
                  className="bg-navy-900/90 hover:bg-navy-850 p-2.5 sm:p-3 rounded-lg border border-slate-700/80 hover:border-flame-500/60 backdrop-blur-xl flex items-center justify-center gap-2 text-xs font-bold text-slate-200 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 shadow-md group"
                >
                  <Icon className="w-4 h-4 text-flame-500 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="truncate">{pillar.title}</span>
                </a>
              );
            })}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href="#formulario-cotizacion"
              className="px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-black text-white bg-gradient-to-r from-flame-500 via-flame-600 to-orange-600 hover:from-flame-400 hover:to-orange-500 shadow-flame-glow transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 font-heading tracking-wide"
            >
              <span>Solicitar Cotización Técnica</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenDossier}
              className="px-5 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-bold text-slate-200 hover:text-white bg-navy-900/90 hover:bg-navy-850 border border-slate-700/80 hover:border-flame-500/50 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 font-heading shadow-md group"
            >
              <FileText className="w-4 h-4 text-slate-300 group-hover:text-flame-500 transition-colors" />
              <span>Dossier 2026 (PDF)</span>
            </button>

            <a
              href="#calculadora"
              className="px-5 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-bold text-slate-200 hover:text-white bg-navy-900/90 hover:bg-navy-850 border border-slate-700/80 hover:border-flame-500/50 backdrop-blur-md transition-all duration-300 flex items-center gap-2 font-heading group"
            >
              <Settings className="w-4 h-4 text-slate-300 group-hover:text-flame-500 transition-colors" />
              <span>Simulador EOR</span>
            </a>
          </div>

        </div>
      </div>

      {/* REAL-TIME ANIMATED KPI STATS BAR - ENGINEERED TELEMETRY TILES */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-3 pt-3 border-t border-slate-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
          {safeKpis.map((kpi) => (
            <div
              key={kpi.id}
              className="p-3 sm:p-3.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-navy-900/85 backdrop-blur-md transition-all duration-300 group shadow-md"
            >
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <div className="flex items-baseline font-black font-heading text-white tracking-tight overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className="text-lg sm:text-xl text-flame-500 font-extrabold">{kpi.prefix}</span>
                  <span className="text-lg sm:text-xl font-black">
                    <AnimatedCounter targetValue={kpi.value} decimals={kpi.id === 'viscosidad' ? 1 : 0} />
                  </span>
                  <span className="text-xs font-bold text-slate-300 ml-1">{kpi.suffix}</span>
                </div>
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold font-heading text-slate-300 uppercase tracking-wider group-hover:text-flame-400 transition-colors">
                {kpi.label}
              </div>
              <div className="text-[10px] text-slate-400 font-sans mt-0.5 line-clamp-1">
                {kpi.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Hero;
