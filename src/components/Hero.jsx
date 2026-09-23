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
                poster="/images/IMG_7549.jpg"
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 drop-shadow-[0_4px_16px_rgba(255,255,255,0.2)] drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
              {currentHero.titleGradient}
            </span> <br className="block sm:hidden" />
            {currentHero.titlePart2}
          </h1>

          {/* Subheading */}
          <p className="text-xs sm:text-base md:text-lg text-white font-medium leading-relaxed max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,1)] drop-shadow-[0_1px_4px_rgba(0,0,0,1)] px-4">
            {currentHero.subtitle}
          </p>

          {/* 4 Interactive Pillars Horizontal Links - Clean Text (No Pills) */}
          <div className="hidden sm:flex flex-wrap justify-center items-center gap-4 sm:gap-8 w-full max-w-3xl pt-2">
            {[
              { title: currentHero.pillar1 || 'Química de Producción', icon: FlaskConical, href: '#servicios' },
              { title: currentHero.pillar2 || 'Intervención de Pozos', icon: Flame, href: '#servicios' },
              { title: currentHero.pillar3 || 'Logística Pesada', icon: Truck, href: '#servicios' },
              { title: currentHero.pillar4 || 'Ingeniería Procura', icon: Globe, href: '#servicios' }
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <React.Fragment key={idx}>
                  <a
                    href={pillar.href}
                    className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors duration-300 group drop-shadow-md"
                  >
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-flame-500 group-hover:scale-110 transition-all flex-shrink-0" />
                    <span className="tracking-wide">{pillar.title}</span>
                  </a>
                  {idx < 3 && <span className="text-slate-600 font-bold">•</span>}
                </React.Fragment>
              );
            })}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#formulario-cotizacion"
              className="px-8 py-3 rounded-xl text-sm font-black text-navy-950 bg-white hover:bg-slate-100 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 font-heading tracking-widest uppercase"
            >
              <span>Cotización Técnica</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenDossier}
              className="px-8 py-3 rounded-xl text-sm font-black text-white bg-navy-900/60 hover:bg-navy-800 border border-white/20 hover:border-white/40 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 font-heading tracking-widest uppercase group shadow-lg"
            >
              <FileText className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              <span>Dossier 2026</span>
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
              className="relative overflow-hidden p-4 sm:p-5 rounded-2xl border border-white/5 hover:border-flame-500/30 bg-navy-950/40 backdrop-blur-2xl transition-all duration-500 group shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)] hover:-translate-y-1"
            >
              {/* Subtle top glow */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 group-hover:via-flame-500/50 to-transparent transition-colors duration-500" />
              
              <div className="flex items-center justify-between gap-1 mb-1">
                <div className="flex items-baseline font-black font-heading text-white tracking-tight overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className="text-xl sm:text-2xl text-slate-300 font-extrabold mr-0.5 group-hover:text-white group-hover:scale-110 transition-all">{kpi.prefix}</span>
                  <span className="text-xl sm:text-3xl font-black drop-shadow-lg group-hover:text-white transition-colors">
                    <AnimatedCounter targetValue={kpi.value} decimals={kpi.id === 'viscosidad' ? 1 : 0} />
                  </span>
                  <span className="text-xs font-bold text-slate-400 ml-1">{kpi.suffix}</span>
                </div>
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold font-heading text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                {kpi.label}
              </div>
              <div className="text-[10px] text-slate-500 font-sans mt-1.5 line-clamp-2 leading-relaxed">
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
