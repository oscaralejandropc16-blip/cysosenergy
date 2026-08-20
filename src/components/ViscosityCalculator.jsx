import React, { useState } from 'react';
import { Sliders, CheckCircle2, FileSpreadsheet, Sparkles, Activity, Gauge, TrendingDown, ArrowRight } from 'lucide-react';

export const ViscosityCalculator = () => {
  const [activeChemTab, setActiveChemTab] = useState('reductor'); // 'reductor' | 'desemulsionante'
  const [apiGravity, setApiGravity] = useState(8.5);
  const [initialViscosity, setInitialViscosity] = useState(18000);
  const [dosagePpm, setDosagePpm] = useState(1000);
  const [pipeTemp, setPipeTemp] = useState(45);

  // Exact technical model based on field specs: max 92% reduction, 38% diluent savings, 30-50 PSI relief
  const reductionFactor = Math.min(0.92, 0.72 + ((dosagePpm - 800) / 700) * 0.20);
  const finalViscosity = Math.max(85, Math.round(initialViscosity * (1 - reductionFactor)));
  const reductionPercentage = ((1 - finalViscosity / initialViscosity) * 100).toFixed(1);
  const flowRateGain = Math.round((initialViscosity / finalViscosity) * 28);
  const diluentSavingsPct = Math.min(38, (reductionFactor * 41.3)).toFixed(1);
  const pressureReliefPsi = Math.round(30 + ((dosagePpm - 800) / 700) * 20);

  return (
    <section id="calculadora" className="py-20 md:py-24 relative bg-navy-950 border-t border-slate-800/80 overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold-metallic/10 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-flame-500/10 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-metallic/40 shadow-gold-glow">
            <Sliders className="w-4 h-4 text-gold-400" />
            <span className="text-xs font-black uppercase tracking-wider text-gold-400 font-heading">
              Tecnología Química para Crudos Pesados y Extrapesados (XP)
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
            Ingeniería Reológica & <span className="animate-gradient-text">Optimización EOR</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base font-light">
            Formulaciones químicas avanzadas con validación a escala industrial para reducción de viscosidad, ahorro de diluyente y deshidratación acelerada.
          </p>

          {/* Technology Selector Tabs */}
          <div className="flex flex-col sm:flex-row p-1.5 rounded-2xl bg-navy-900/90 border border-slate-800 backdrop-blur-xl mt-4 gap-1">
            <button
              onClick={() => setActiveChemTab('reductor')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black font-heading transition-all ${
                activeChemTab === 'reductor'
                  ? 'bg-gradient-to-r from-flame-500 to-gold-600 text-white shadow-flame-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Reductor Permanente & Demulsificante
            </button>
            <button
              onClick={() => setActiveChemTab('desemulsionante')}
              className={`px-5 py-2.5 rounded-xl text-xs font-black font-heading transition-all ${
                activeChemTab === 'desemulsionante'
                  ? 'bg-gradient-to-r from-flame-500 to-gold-600 text-white shadow-flame-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Desemulsionante de Alto Rendimiento (97%)
            </button>
          </div>
        </div>

        {activeChemTab === 'reductor' ? (
          /* TAB 1: VISCOSITY REDUCER SIMULATOR */
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-stretch animate-fadeIn">
            
            {/* Controls Column */}
            <div className="lg:col-span-7 luxury-glass p-6 sm:p-8 rounded-3xl border border-gold-metallic/35 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h3 className="text-lg sm:text-xl font-black font-heading text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-flame-500" />
                  <span>Simulador Reológico (Skid Inyección Continua)</span>
                </h3>
                <span className="px-3 py-1 rounded-full bg-flame-500/10 border border-flame-500/30 text-flame-400 text-[10px] font-black uppercase font-heading">
                  Crudos XP 8° - 12° API
                </span>
              </div>

              {/* Slider 1: API Gravity */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                  <label className="text-slate-200 font-bold">Gravedad API del Crudo:</label>
                  <span className="text-gold-400 font-black font-sans tracking-wide bg-navy-950 px-3 py-1 rounded-lg border border-gold-metallic/40">
                    {apiGravity.toFixed(1)}° API ({apiGravity < 10 ? 'Extrapesado Faja' : 'Pesado'})
                  </span>
                </div>
                <input
                  type="range"
                  min="6.0"
                  max="14.0"
                  step="0.1"
                  value={apiGravity}
                  onChange={(e) => setApiGravity(parseFloat(e.target.value))}
                  className="w-full h-2.5 bg-navy-900 rounded-lg appearance-none cursor-pointer accent-flame-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>6°<span className="hidden sm:inline"> API (Extrapesado)</span></span>
                  <span className="hidden sm:block">8.5° API (Faja del Orinoco)</span>
                  <span>14°<span className="hidden sm:inline"> API (Pesado)</span></span>
                </div>
              </div>

              {/* Slider 2: Initial Viscosity */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                  <label className="text-slate-200 font-bold">Viscosidad Inicial del Crudo (cPs):</label>
                  <span className="text-gold-400 font-black font-sans tracking-wide bg-navy-950 px-3 py-1 rounded-lg border border-gold-metallic/40">
                    {initialViscosity.toLocaleString('es-VE')} cPs
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="50000"
                  step="500"
                  value={initialViscosity}
                  onChange={(e) => setInitialViscosity(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-navy-900 rounded-lg appearance-none cursor-pointer accent-flame-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>2,000<span className="hidden sm:inline"> cPs</span></span>
                  <span className="hidden sm:block">18,000 cPs (Típico Faja)</span>
                  <span>50,000<span className="hidden sm:inline"> cPs</span></span>
                </div>
              </div>

              {/* Slider 3: Dosage PPM */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                  <label className="text-slate-200 font-bold">Tasa de Inyección Skids Automatizados (PPM):</label>
                  <span className="text-flame-500 font-black font-sans tracking-wide bg-navy-950 px-3 py-1 rounded-lg border border-flame-500/40">
                    {dosagePpm} PPM
                  </span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="1500"
                  step="25"
                  value={dosagePpm}
                  onChange={(e) => setDosagePpm(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-navy-900 rounded-lg appearance-none cursor-pointer accent-flame-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>800<span className="hidden sm:inline"> PPM (Mínimo)</span></span>
                  <span className="hidden sm:block">1,000 PPM (Recomendado)</span>
                  <span>1,500<span className="hidden sm:inline"> PPM (Máx)</span></span>
                </div>
              </div>

              {/* Technical Specifications Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-gold-400 font-heading font-black text-xs">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Doble Efecto Simultáneo</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-light">
                    Rompimiento rápido de emulsiones y mantenimiento de especificaciones comerciales.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-navy-950/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-heading font-black text-xs">
                    <Gauge className="w-3.5 h-3.5" />
                    <span>Alivio de Presión Hidráulica</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-light">
                    Reducción de 30 a 50+ PSI en cabezales y líneas de transferencia.
                  </p>
                </div>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 luxury-glass p-6 sm:p-8 rounded-3xl border border-gold-metallic/35 shadow-2xl flex flex-col justify-between">
              <div className="space-y-5">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
                  <h3 className="text-base sm:text-lg font-black font-heading text-white">Impacto Operacional Validado</h3>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black uppercase tracking-wider font-heading">
                    Hasta 92% Eficiencia
                  </span>
                </div>

                {/* Result Card 1: Viscosity Comparison */}
                <div className="bg-navy-950/90 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-heading">
                    Viscosidad Post-Tratamiento CYSOS:
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-emerald-400">
                      {finalViscosity.toLocaleString('es-VE')}
                    </span>
                    <span className="text-sm font-bold text-slate-400">cPs</span>
                    <span className="ml-auto text-xs font-black text-white bg-gradient-to-r from-emerald-500 to-emerald-600 px-3 py-1 rounded-lg border border-emerald-400/30 font-heading">
                      -{reductionPercentage}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-light">
                    Reducción de {initialViscosity.toLocaleString('es-VE')} cPs a solo {finalViscosity.toLocaleString('es-VE')} cPs.
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-navy-950/90 p-4 rounded-2xl border border-slate-800">
                    <span className="text-[10px] uppercase font-black text-slate-400 block mb-1 font-heading">Ahorro en Diluyente</span>
                    <span className="text-lg sm:text-xl font-black text-flame-500 font-sans tracking-wide">Hasta -{diluentSavingsPct}%</span>
                    <span className="text-[10px] text-slate-400 block mt-1 font-light">Menos nafta por macolla</span>
                  </div>

                  <div className="bg-navy-950/90 p-4 rounded-2xl border border-slate-800">
                    <span className="text-[10px] uppercase font-black text-slate-400 block mb-1 font-heading">Alivio en Cabezal</span>
                    <span className="text-lg sm:text-xl font-black text-gold-400 font-sans tracking-wide">-{pressureReliefPsi} PSI</span>
                    <span className="text-[10px] text-slate-400 block mt-1 font-light">Protección de bombas BCP</span>
                  </div>
                </div>

                {/* Advantages List */}
                <div className="space-y-2">
                  {[
                    'Disminución sustancial en tasas de inyección por macolla',
                    'Mantenimiento de estabilidad hidráulica y continuidad de flujo',
                    'Aplicación directa con skids automatizados (800 - 1.500 ppm)'
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="font-light">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Request Full Analysis CTA */}
              <div className="pt-5 mt-5 border-t border-slate-800">
                <a
                  href="#contacto"
                  className="w-full py-3.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 hover:from-flame-600 hover:to-gold-700 shadow-flame-glow flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 font-heading tracking-wide"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Solicitar Ensayo Reológico sin Costo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>
        ) : (
          /* TAB 2: HIGH PERFORMANCE DEMULSIFIER SHOWCASE */
          <div className="luxury-glass p-6 sm:p-10 rounded-3xl border border-gold-metallic/35 shadow-2xl space-y-8 animate-fadeIn">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider font-heading">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>97% Eficiencia Global Comprobada</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
                  Desemulsionante de Alto Rendimiento
                </h3>

                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  Aditivo químico avanzado formulado para la deshidratación acelerada y el rompimiento eficiente de emulsiones de agua en petróleo en estaciones de tratamiento y recolección de crudo.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-2">
                    <span className="text-xs font-black uppercase text-gold-400 font-heading block">
                      Corte de Agua (BS&W):
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black font-heading text-white">7.0%</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                      <span className="text-2xl font-black font-heading text-emerald-400">0.8% - 1.0%</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-light">
                      Cumplimiento riguroso de estándares de crudo fiscalizado.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-navy-950/80 border border-slate-800 space-y-2">
                    <span className="text-xs font-black uppercase text-flame-500 font-heading block">
                      Baja Demanda Térmica:
                    </span>
                    <div className="text-2xl font-black font-heading text-white">
                      100°F - 110°F
                    </div>
                    <p className="text-[11px] text-slate-400 font-light">
                      Sin sobrecalentamiento en planta, optimizando consumo energético.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4 bg-navy-950/90 p-6 sm:p-8 rounded-3xl border border-slate-800">
                <h4 className="text-base font-black font-heading text-white border-b border-slate-800 pb-3">
                  Parámetros Técnicos Validados en Campo
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-800/60">
                    <span className="text-slate-400 font-medium">Dosificación Optimizada:</span>
                    <span className="font-bold text-gold-400 font-mono">82 a 90 PPM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800/60">
                    <span className="text-slate-400 font-medium">Definición Interfacial:</span>
                    <span className="font-bold text-emerald-400">Nítida (Sin emulsión intermedia)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800/60">
                    <span className="text-slate-400 font-medium">Validación a Escala Industrial:</span>
                    <span className="font-bold text-white font-mono">1.500 BCNPD (60% agua entrada)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400 font-medium">Efluentes Acuosos:</span>
                    <span className="font-bold text-emerald-400">Libres de hidrocarburo</span>
                  </div>
                </div>

                <a
                  href="#contacto"
                  className="w-full py-3 rounded-xl text-xs font-black text-white bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 hover:from-flame-600 hover:to-gold-700 shadow-flame-glow flex items-center justify-center gap-2 transition-all font-heading tracking-wide mt-4"
                >
                  <span>Solicitar Propuesta Técnica de Deshidratación</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ViscosityCalculator;
