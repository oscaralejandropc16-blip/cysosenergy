import React, { useState, useEffect, useRef } from 'react';
import { useCms } from '../context/CmsContext';
import { Activity, FlaskConical, Truck, Globe, Flame, ShieldCheck, ArrowRight, Settings, ChevronDown } from 'lucide-react';

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

export const Hero = () => {
  const { kpis, heroContent } = useCms();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, [heroContent]);

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
    <section id="inicio" className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-navy-950 min-h-screen flex flex-col justify-between overflow-hidden">
      
      {/* DYNAMIC CMS CINEMATIC VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          key={currentHero.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          poster={currentHero.posterUrl}
          className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05] scale-105 transform"
        >
          <source src={currentHero.videoUrl} type="video/mp4" />
        </video>
        
        {/* Radial Dark Vignette Overlay - muy sutil para no tapar el video */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-navy-950/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-navy-950/60" />
        
        {/* Ambient Warm Energy Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gold-metallic/10 rounded-full blur-[180px] pointer-events-none animate-pulse-glow" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto pt-6 pb-8">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-6 sm:space-y-8 animate-fadeIn">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-navy-900/90 border border-gold-metallic/50 backdrop-blur-xl shadow-gold-glow">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-flame-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-flame-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-gold-400 font-heading">
              {currentHero.badgeText}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading text-white tracking-tight leading-[1.08] drop-shadow-2xl">
            {currentHero.titlePart1} <span className="animate-gradient-text">{currentHero.titleGradient}</span> {currentHero.titlePart2}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-slate-100 leading-relaxed max-w-3xl font-normal drop-shadow-md">
            {currentHero.subtitle}
          </p>

          {/* 4 Interactive Pillars Horizontal Grid */}
          <div className="hidden sm:grid sm:grid-cols-4 gap-2.5 sm:gap-3.5 w-full max-w-3xl pt-2">
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
                  className="bg-navy-900/90 hover:bg-navy-850 p-3 sm:p-3.5 rounded-2xl border border-slate-700/80 hover:border-gold-metallic/70 backdrop-blur-xl flex items-center justify-center gap-2 text-xs font-extrabold text-slate-100 hover:text-amber-400 transition-all duration-300 transform hover:-translate-y-1 shadow-lg group"
                >
                  <Icon className="w-4 h-4 text-flame-500 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="truncate">{pillar.title}</span>
                </a>
              );
            })}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href="#contacto"
              className="px-7 py-3.5 rounded-xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-flame-glow transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 font-heading tracking-wide"
            >
              <span>Solicitar Cotización Técnica</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#calculadora"
              className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-slate-200 hover:text-white bg-navy-900/90 hover:bg-navy-800 border border-slate-700 hover:border-gold-metallic/50 backdrop-blur-md transition-all duration-300 flex items-center gap-2 font-heading"
            >
              <Settings className="w-4 h-4 text-gold-400" />
              <span>Simulador EOR</span>
            </a>
          </div>

        </div>
      </div>

      {/* REAL-TIME ANIMATED KPI STATS TICKER HUD BAR */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6 pt-6 border-t border-slate-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 lg:gap-5">
          {safeKpis.map((kpi) => (
            <div
              key={kpi.id}
              className="luxury-glass p-4 sm:p-5 rounded-2xl border border-gold-metallic/35 transition-all duration-500 transform hover:scale-[1.03] group relative overflow-hidden bg-navy-900/90 backdrop-blur-xl shadow-gold-glow"
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <div className="flex items-baseline font-black font-heading text-white tracking-tight overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className="text-xl sm:text-2xl lg:text-3xl text-gold-400 font-extrabold">{kpi.prefix}</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-black">
                    <AnimatedCounter targetValue={kpi.value} decimals={kpi.id === 'viscosidad' ? 1 : 0} />
                  </span>
                  {kpi.suffix && (
                    <span className="text-xs sm:text-sm lg:text-base font-extrabold text-gold-400 ml-1">
                      {kpi.suffix}
                    </span>
                  )}
                </div>
                <Activity className="w-4 h-4 text-gold-400 opacity-90 flex-shrink-0 group-hover:scale-125 transition-transform" />
              </div>

              <h4 className="text-xs font-black font-heading text-gold-400 uppercase tracking-wider line-clamp-1">{kpi.label}</h4>
              <p className="text-[11px] text-slate-200 font-medium mt-1 line-clamp-2 leading-tight drop-shadow">{kpi.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Hero;
