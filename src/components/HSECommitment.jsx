import React from 'react';
import { ShieldCheck, Leaf, Award, CheckCircle2, HeartHandshake, Sparkles, FileCheck } from 'lucide-react';

export const HSECommitment = () => {
  return (
    <section className="py-20 md:py-24 relative bg-navy-950 border-t border-slate-800/80 overflow-hidden">
      
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text & Certifications */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-emerald-500/40 text-emerald-400 text-xs font-black uppercase tracking-wider shadow-emerald-glow font-heading">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Compromiso de Seguridad, Salud y Ambiente</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
              Política de Seguridad <span className="text-gradient-gold">HSE & ISO Compliance</span>
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-light">
              En CYSOS ENERGY la seguridad de nuestro personal y la preservación del ecosistema son prioridades inquebrantables. Operamos bajo las más estrictas normativas nacionales e internacionales del sector hidrocarburos.
            </p>

            {/* Certifications Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {[
                { title: 'Norma PDVSA SI-HO-S', desc: 'Seguridad Industrial & Higiene' },
                { title: 'ISO 9001:2015', desc: 'Gestión de Calidad Certificada' },
                { title: 'ISO 14001:2015', desc: 'Gestión y Cuidado Ambiental' }
              ].map((cert, idx) => (
                <div key={idx} className="luxury-card p-4 rounded-2xl border border-slate-800 space-y-1 group hover:border-emerald-500/40">
                  <Award className="w-5 h-5 text-gold-400 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xs font-black font-heading text-white">{cert.title}</h4>
                  <p className="text-[10px] text-slate-400 font-light">{cert.desc}</p>
                </div>
              ))}
            </div>

            {/* HSE Bullets */}
            <div className="space-y-2.5 pt-2">
              {[
                'Cero Accidentes con Pérdida de Tiempo (LTI) en operaciones continuas',
                'Química biodegradable de bajo impacto ambiental para mantos acuíferos',
                'Capacitación y certificación permanente en manejo de materiales HAZMAT',
                'Planes de contingencia y respuesta rápida ante emergencias 24/7'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="font-light">{text}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: High Resolution Photographic Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="luxury-glass p-4 sm:p-5 rounded-3xl border border-emerald-500/30 shadow-2xl space-y-4">
              
              <div className="relative h-60 sm:h-64 rounded-2xl overflow-hidden group">
                <img
                  src="/images/cysos_placa_tecnica.jpg"
                  alt="Placa Técnica y Registro Legal CYSOS ENERGY"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.92]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[11px] font-black text-white bg-navy-950/90 px-3 py-1 rounded-xl border border-white/10 backdrop-blur-md font-heading">
                  📋 Placa de Fabricación: Modelo CyS 2026-I • RACDA • SAPI
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="relative h-28 sm:h-32 rounded-xl overflow-hidden group">
                  <img
                    src="/images/cysos_ingeniero_auditoria.jpg"
                    alt="Auditoría y Control en Pozo"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.92]"
                  />
                  <div className="absolute inset-0 bg-navy-950/40" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-black text-white bg-navy-950/90 px-2 py-0.5 rounded-lg font-heading">
                    Auditoría en Pozo
                  </span>
                </div>

                <div className="relative h-28 sm:h-32 rounded-xl overflow-hidden group">
                  <img
                    src="/images/cysos_tote_quimico.jpg"
                    alt="Manejo Seguro de Químicos"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.92]"
                  />
                  <div className="absolute inset-0 bg-navy-950/40" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-black text-white bg-navy-950/90 px-2 py-0.5 rounded-lg font-heading">
                    Manejo Seguro de Insumos
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HSECommitment;
