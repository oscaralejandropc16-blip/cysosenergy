import React, { useEffect } from 'react';
import { Logo } from './Logo';
import { ViscosityCalculator } from './ViscosityCalculator';
import { GlobalMarketTicker } from './GlobalMarketTicker';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { 
  ArrowLeft, Sliders, ShieldCheck, CheckCircle2, 
  FlaskConical, Gauge, TrendingDown, Send, FileText, ArrowRight
} from 'lucide-react';

export const SimulatorPage = ({ onReturnToHome, onOpenDossier }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 font-sans selection:bg-flame-500 selection:text-white">
      {/* Real-time ticker */}
      <GlobalMarketTicker />

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 bg-navy-950/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Back Button & Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={onReturnToHome}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-navy-900/90 hover:bg-navy-800 text-slate-200 hover:text-white border border-slate-700/80 text-xs font-bold font-heading transition-all cursor-pointer group shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-flame-500 group-hover:-translate-x-1 transition-transform" />
              <span>Volver al Inicio</span>
            </button>

            <div className="h-6 w-px bg-slate-800 hidden sm:block" />

            <div onClick={onReturnToHome} className="cursor-pointer">
              <Logo isDark={true} />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDossier}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-850 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-bold font-heading transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-flame-500" />
              <span>Dossier Técnico (PDF)</span>
            </button>

            <a
              href="#contacto"
              onClick={onReturnToHome}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-flame-500 to-orange-600 hover:from-flame-400 hover:to-orange-500 text-white text-xs font-black font-heading shadow-flame-glow transition-all"
            >
              Cotizar Química
            </a>
          </div>

        </div>
      </header>

      <main className="relative z-10 pt-2 pb-16">
        {/* The Calculator Engine */}
        <ViscosityCalculator />

        {/* Technical Validation Guide */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="rounded-3xl bg-navy-900/70 border border-slate-800 p-6 sm:p-10 space-y-8 shadow-2xl">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-flame-400 font-heading">
                Respaldado por Normas API & Ensayos de Laboratorio
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                ¿Cómo interpretar los resultados de este simulador?
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-navy-950/80 border border-slate-800/80 space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-flame-500/10 border border-flame-500/30 flex items-center justify-center text-flame-500">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold font-heading text-white">
                  Reducción de Viscosidad Dinámica
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  El reductor CyS desarticula las redes asfáltenicas y parafínicas, transformando crudos inmóviles de 18.000 cPs en fluidos bombeables de 200 a 4.000 cPs.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-navy-950/80 border border-slate-800/80 space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Gauge className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold font-heading text-white">
                  Alivio de Presión en Oleoductos
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Al disminuir la fricción hidrodinámica interna, la contrapresión en cabezal de pozo se reduce entre 30 y 50 PSI, protegiendo bombas y tuberías.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-navy-950/80 border border-slate-800/80 space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-energy-cyan/10 border border-energy-cyan/30 flex items-center justify-center text-energy-cyan">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold font-heading text-white">
                  Ahorro Sustancial de Diluyente
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Permite reducir hasta un 38% el volumen de nafta o crudo liviano requerido para mezclar el crudo en macollas, generando ahorros millonarios en OPEX.
                </p>
              </div>
            </div>

            {/* Final Banner CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border border-flame-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <h4 className="text-base sm:text-lg font-black font-heading text-white">
                  ¿Desea ensayar una muestra física de su crudo en nuestro laboratorio?
                </h4>
                <p className="text-xs text-slate-300">
                  Nuestros ingenieros químicos realizan pruebas de compatibilidad y curvas reológicas certificadas sin costo inicial.
                </p>
              </div>

              <button
                onClick={() => {
                  if (onReturnToHome) onReturnToHome();
                  setTimeout(() => {
                    window.location.hash = '#contacto';
                  }, 100);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-flame-500 to-orange-600 hover:from-flame-600 hover:to-orange-700 text-white font-bold text-xs sm:text-sm font-heading shadow-flame-glow transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer"
              >
                <span>Solicitar Ensayo en Laboratorio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default SimulatorPage;
