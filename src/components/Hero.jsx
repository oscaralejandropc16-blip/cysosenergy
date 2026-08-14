import React, { useState, useEffect, useRef } from 'react';
import { useCms } from '../context/CmsContext';
import { Activity, FlaskConical, Truck, Globe, Flame } from 'lucide-react';

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
    }, 500);

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

  const currentHero = heroContent || {
    videoUrl: '/videos/IMG_7557.mp4',
    posterUrl: '/images/IMG_7549.jpg',
    badgeText: 'Soluciones Integrales para la Industria Energética • Venezuela',
    titlePart1: 'Creamos Soluciones y',
    titleGradient: 'Resolvemos Desafíos',
    titlePart2: 'para la Industria Petrolera',
    subtitle: 'Integración de Ingeniería IPC, Procura Internacional, Logística Pesada y Química de Producción.',
    pillar1: 'Química de Producción',
    pillar2: 'Procura Internacional',
    pillar3: 'Logística Pesada',
    pillar4: 'Ingeniería IPC'
  };

  const safeKpis = Array.isArray(kpis) ? kpis : [];

  return (
    <section id="inicio" className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-navy-950 overflow-hidden min-h-[90vh] flex flex-col justify-between">
      
      {/* DYNAMIC CMS VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          key={currentHero.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          poster={currentHero.posterUrl}
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] scale-105 transform"
        >
          <source src={currentHero.videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/65" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gold-metallic/10 rounded-full blur-[180px] pointer-events-none animate-pulse-glow" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-8 animate-slide-up">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-navy-900/90 border border-gold-metallic/40 backdrop-blur-md shadow-gold-glow">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-flame-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-flame-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              {currentHero.badgeText}
            </span>
          </div>

          {/* Official Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading text-white tracking-tight leading-[1.1] drop-shadow-lg">
            {currentHero.titlePart1} <span className="animate-gradient-text">{currentHero.titleGradient}</span> {currentHero.titlePart2}
          </h1>

          {/* Official Subheading */}
          <p className="text-lg sm:text-xl text-slate-100 leading-relaxed max-w-3xl font-light drop-shadow-md">
            {currentHero.subtitle}
          </p>

          {/* 4 Pillars Horizontal Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl pt-2">
            <div className="bg-navy-900/90 p-3.5 rounded-2xl border border-slate-700/80 backdrop-blur-md flex items-center justify-center gap-2.5 text-xs font-extrabold text-slate-100 hover:border-gold-metallic transition-all shadow-lg">
              <FlaskConical className="w-4 h-4 text-flame-500 flex-shrink-0" />
              <span>{currentHero.pillar1}</span>
            </div>
            <div className="bg-navy-900/90 p-3.5 rounded-2xl border border-slate-700/80 backdrop-blur-md flex items-center justify-center gap-2.5 text-xs font-extrabold text-slate-100 hover:border-gold-metallic transition-all shadow-lg">
              <Globe className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>{currentHero.pillar2}</span>
            </div>
            <div className="bg-navy-900/90 p-3.5 rounded-2xl border border-slate-700/80 backdrop-blur-md flex items-center justify-center gap-2.5 text-xs font-extrabold text-slate-100 hover:border-gold-metallic transition-all shadow-lg">
              <Truck className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{currentHero.pillar3}</span>
            </div>
            <div className="bg-navy-900/90 p-3.5 rounded-2xl border border-slate-700/80 backdrop-blur-md flex items-center justify-center gap-2.5 text-xs font-extrabold text-slate-100 hover:border-gold-metallic transition-all shadow-lg">
              <Flame className="w-4 h-4 text-flame-500 flex-shrink-0" />
              <span>{currentHero.pillar4}</span>
            </div>
          </div>

        </div>
      </div>

      {/* REAL-TIME ANIMATED KPI STATS TICKER BAR */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 pt-8 border-t border-slate-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
          {safeKpis.map((kpi) => (
            <div
              key={kpi.id}
              className="luxury-glass p-4 sm:p-5 rounded-2xl border border-gold-metallic/40 transition-all duration-500 transform hover:scale-105 group relative overflow-hidden bg-navy-900/90 backdrop-blur-xl shadow-gold-glow"
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <div className="flex items-baseline font-black font-heading text-white tracking-tight overflow-hidden text-ellipsis whitespace-nowrap">
                  <span className="text-xl sm:text-2xl lg:text-3xl text-gold-400 font-extrabold">{kpi.prefix}</span>
                  <span className="text-xl sm:text-2xl lg:text-3xl">
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

              <h4 className="text-xs font-extrabold text-gold-400 uppercase tracking-wider line-clamp-1">{kpi.label}</h4>
              <p className="text-[11px] text-slate-200 font-medium mt-1 line-clamp-2 leading-tight drop-shadow">{kpi.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Hero;
