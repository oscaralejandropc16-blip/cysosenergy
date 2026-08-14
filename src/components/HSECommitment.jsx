import React from 'react';
import { ShieldCheck, Leaf, Award, CheckCircle2, HeartHandshake } from 'lucide-react';

export const HSECommitment = () => {
  return (
    <section className="py-24 relative bg-navy-950 border-t border-slate-800 overflow-hidden">
      
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Certifications */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-emerald-500/40 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Compromiso de Seguridad, Salud y Ambiente</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
              Política de Seguridad <span className="text-gradient-gold">HSE & ISO Compliance</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              En CYSOS ENERGY la seguridad de nuestro personal y la preservación del ecosistema son prioridades inquebrantables. Operamos bajo las más estrictas normativas nacionales e internacionales del sector hidrocarburos.
            </p>

            {/* Certifications Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              {[
                { title: 'Norma PDVSA SI-HO-S', desc: 'Seguridad Industrial & Higiene' },
                { title: 'ISO 9001:2015', desc: 'Gestión de Calidad Certificada' },
                { title: 'ISO 14001:2015', desc: 'Gestión y Cuidado Ambiental' }
              ].map((cert, idx) => (
                <div key={idx} className="luxury-card p-4 rounded-2xl border border-slate-800 space-y-1">
                  <Award className="w-5 h-5 text-gold-400" />
                  <h4 className="text-xs font-extrabold text-white">{cert.title}</h4>
                  <p className="text-[10px] text-slate-400">{cert.desc}</p>
                </div>
              ))}
            </div>

            {/* HSE Bullets */}
            <div className="space-y-2.5 pt-2">
              {[
                'Cero Accidentes con Pérdida de Tiempo (LTI) en operaciones de campo',
                'Química biodegradable y respetuosa con los mantos acuíferos',
                'Capacitación constante en manejo de materiales peligrosos (HAZMAT)',
                'Planes de contingencia y respuesta rápida 24/7'
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: High Resolution Photographic Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="luxury-glass p-4 rounded-3xl border border-emerald-500/30 shadow-2xl space-y-4">
              
              <div className="relative h-64 rounded-2xl overflow-hidden group">
                <img
                  src="/images/lab_tech.png"
                  alt="Laboratorio Químico CYSOS ENERGY"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white bg-navy-950/90 px-3 py-1 rounded-lg border border-white/10 backdrop-blur-md">
                  Laboratorio de Control de Calidad y Ensayos Reológicos
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-32 rounded-xl overflow-hidden group">
                  <img
                    src="/images/engineers_team.png"
                    alt="Ingenieros en campo"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-navy-950/40" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-navy-950/90 px-2 py-0.5 rounded">
                    Personal Técnico HSE
                  </span>
                </div>

                <div className="relative h-32 rounded-xl overflow-hidden group">
                  <img
                    src="/images/IMG_7701.jpg"
                    alt="Seguridad en maniobras"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-navy-950/40" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-navy-950/90 px-2 py-0.5 rounded">
                    Inspección de Pozo
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
