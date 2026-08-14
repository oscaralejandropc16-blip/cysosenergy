import React, { useState } from 'react';
import { Sliders, CheckCircle2, FileSpreadsheet, Sparkles, Activity } from 'lucide-react';

export const ViscosityCalculator = () => {
  const [apiGravity, setApiGravity] = useState(8.5);
  const [initialViscosity, setInitialViscosity] = useState(18000);
  const [dosagePpm, setDosagePpm] = useState(750);
  const [pipeTemp, setPipeTemp] = useState(45);

  const reductionFactor = Math.min(0.988, 0.70 + (dosagePpm / 2500) * 0.28);
  const finalViscosity = Math.max(85, Math.round(initialViscosity * (1 - reductionFactor)));
  const reductionPercentage = ((1 - finalViscosity / initialViscosity) * 100).toFixed(1);
  const flowRateGain = Math.round((initialViscosity / finalViscosity) * 35);
  const naphthaSavingsPct = (reductionFactor * 42).toFixed(1);

  return (
    <section id="calculadora" className="py-24 relative bg-navy-950 border-t border-slate-800/80 overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold-metallic/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-flame-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-metallic/40 shadow-gold-glow">
            <Sliders className="w-4 h-4 text-gold-400" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-gold-400">
              Simulador de Ingeniería EOR CYSOS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Calculadora de <span className="text-gradient-flame">Reducción de Viscosidad</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light">
            Estime el impacto en la reología del crudo pesado y extrapesado al aplicar los aditivos reductores de viscosidad de CYSOS ENERGY.
          </p>
        </div>

        {/* Interactive Tool Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 luxury-glass p-8 rounded-3xl border border-gold-metallic/30 shadow-2xl space-y-6">
            <h3 className="text-xl font-extrabold font-heading text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-flame-500" />
              <span>Parámetros de Operación del Pozo / Oleoducto</span>
            </h3>

            {/* Slider 1: API Gravity */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="text-slate-200 font-bold">Gravedad API del Crudo:</label>
                <span className="text-gold-400 font-extrabold font-mono bg-navy-950 px-3 py-1 rounded-lg border border-gold-metallic/40">
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
                <span>6° API (Extrapesado)</span>
                <span>10° API (Límite Faja)</span>
                <span>14° API (Pesado)</span>
              </div>
            </div>

            {/* Slider 2: Initial Viscosity */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="text-slate-200 font-bold">Viscosidad Inicial del Crudo (cPs):</label>
                <span className="text-gold-400 font-extrabold font-mono bg-navy-950 px-3 py-1 rounded-lg border border-gold-metallic/40">
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
                <span>2,000 cPs</span>
                <span>25,000 cPs</span>
                <span>50,000 cPs</span>
              </div>
            </div>

            {/* Slider 3: Dosage PPM */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="text-slate-200 font-bold">Dosis de Aditivo Reductor CYSOS (PPM):</label>
                <span className="text-flame-500 font-extrabold font-mono bg-navy-950 px-3 py-1 rounded-lg border border-flame-500/40">
                  {dosagePpm} PPM
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="2000"
                step="50"
                value={dosagePpm}
                onChange={(e) => setDosagePpm(parseInt(e.target.value))}
                className="w-full h-2.5 bg-navy-900 rounded-lg appearance-none cursor-pointer accent-flame-500"
              />
            </div>

            {/* Slider 4: Temperature */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="text-slate-200 font-bold">Temperatura de Bombeo (°C):</label>
                <span className="text-white font-extrabold font-mono bg-navy-950 px-3 py-1 rounded-lg border border-slate-700">
                  {pipeTemp}°C ({(pipeTemp * 1.8 + 32).toFixed(0)}°F)
                </span>
              </div>
              <input
                type="range"
                min="25"
                max="80"
                step="1"
                value={pipeTemp}
                onChange={(e) => setPipeTemp(parseInt(e.target.value))}
                className="w-full h-2.5 bg-navy-900 rounded-lg appearance-none cursor-pointer accent-flame-500"
              />
            </div>

            <div className="p-4 rounded-2xl bg-navy-950/90 border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-gold-400 flex-shrink-0" />
              <span>
                Simulación preliminar basada en reometría de laboratorio. Para pruebas específicas con muestra de crudo de su pozo, contacte a nuestro equipo técnico.
              </span>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 luxury-glass p-8 rounded-3xl border border-gold-metallic/30 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-extrabold font-heading text-white">Resultados de Simulación EOR</h3>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider">
                  Optimización Fluida
                </span>
              </div>

              {/* Result Card 1: Viscosity Comparison */}
              <div className="bg-navy-950/90 p-5 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Viscosidad Post-Tratamiento CYSOS:
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-black font-heading text-emerald-400">
                    {finalViscosity.toLocaleString('es-VE')}
                  </span>
                  <span className="text-sm font-bold text-slate-400">cPs</span>
                  <span className="ml-auto text-xs font-extrabold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 px-3 py-1 rounded-lg border border-emerald-400/30">
                    -{reductionPercentage}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  De {initialViscosity.toLocaleString('es-VE')} cPs a solo {finalViscosity.toLocaleString('es-VE')} cPs.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-navy-950/90 p-4 rounded-2xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Aumento en Tasa de Flujo</span>
                  <span className="text-xl font-extrabold text-gold-400 font-mono">+{flowRateGain}% BPD</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Mayor capacidad de bombeo</span>
                </div>

                <div className="bg-navy-950/90 p-4 rounded-2xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Ahorro en Diluyente</span>
                  <span className="text-xl font-extrabold text-flame-500 font-mono">-{naphthaSavingsPct}% Nafta</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Menor costo operativo</span>
                </div>
              </div>

              {/* Advantages List */}
              <div className="space-y-2">
                {[
                  'Menor pérdida de carga en oleoductos y líneas de flujo',
                  'Permite transporte a temperatura ambiente',
                  'Disminución del desgaste mecánico en bombas de cavidad progresiva (BCP)'
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Request Full Analysis CTA */}
            <div className="pt-6 mt-6 border-t border-slate-800">
              <a
                href="#contacto"
                className="w-full py-4 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 hover:from-flame-600 hover:to-gold-700 shadow-flame-glow flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Solicitar Estudio de Laboratorio Gratuito</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
