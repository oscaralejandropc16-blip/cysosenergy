import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Target, Compass, Award, HeartHandshake, ShieldCheck, UserCheck, CheckCircle } from 'lucide-react';

export const MissionVision = () => {
  const { companyInfo } = useCms();
  const [activeTab, setActiveTab] = useState('mision');

  return (
    <section id="mision-vision" className="py-24 relative bg-navy-950 border-y border-slate-800/80 overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-metallic/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-flame-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with High Contrast */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-metallic/40 shadow-gold-glow">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Identidad Institucional Oficial
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Misión, Visión y <span className="text-gradient-flame">Valores Corporativos</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light">
            Marco estratégico que rige nuestras operaciones de ingeniería y servicios petroleros en Venezuela.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-2 bg-navy-900/90 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-md">
            {[
              { id: 'mision', label: 'Nuestra Misión', icon: Target },
              { id: 'vision', label: 'Nuestra Visión', icon: Compass },
              { id: 'valores', label: 'Valores Corporativos', icon: Award },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-flame-500 to-gold-600 text-white shadow-flame-glow scale-105'
                      : 'text-slate-300 hover:text-white hover:bg-navy-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gold-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Box */}
        <div className="max-w-4xl mx-auto">
          
          {/* MISION TAB */}
          {activeTab === 'mision' && (
            <div className="luxury-glass p-8 sm:p-12 rounded-3xl border border-gold-metallic/30 relative overflow-hidden shadow-2xl animate-fadeIn">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-flame-500 to-gold-600 p-0.5 shadow-flame-glow">
                  <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center text-gold-400">
                    <Target className="w-7 h-7" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold font-heading text-white">Nuestra Misión</h3>
                  <p className="text-xs text-gold-400 font-extrabold tracking-wider uppercase">CYSOS ENERGY, C.A.</p>
                </div>
              </div>

              <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-normal whitespace-pre-line">
                {companyInfo.mision}
              </p>

              <div className="mt-8 pt-6 border-t border-slate-800 grid sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
                  <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>Ingeniería IPC Especializada</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
                  <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>Reducción de Viscosidad</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
                  <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>Alto Compromiso Social</span>
                </div>
              </div>
            </div>
          )}

          {/* VISION TAB */}
          {activeTab === 'vision' && (
            <div className="luxury-glass p-8 sm:p-12 rounded-3xl border border-gold-metallic/30 relative overflow-hidden shadow-2xl animate-fadeIn">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500 to-flame-600 p-0.5 shadow-gold-glow">
                  <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center text-gold-400">
                    <Compass className="w-7 h-7" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold font-heading text-white">Nuestra Visión</h3>
                  <p className="text-xs text-gold-400 font-extrabold tracking-wider uppercase">Liderazgo & Expansión Internacional</p>
                </div>
              </div>

              <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-normal whitespace-pre-line">
                {companyInfo.vision}
              </p>

              <div className="mt-8 pt-6 border-t border-slate-800 grid sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
                  <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>Líder en Crudos Pesados</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
                  <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>Well Testing & Coiled Tubing</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
                  <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span>Armonía Ambiental</span>
                </div>
              </div>
            </div>
          )}

          {/* VALORES TAB */}
          {activeTab === 'valores' && (
            <div className="grid md:grid-cols-3 gap-6 animate-fadeIn">
              {[
                {
                  title: 'Compromiso con el Cliente',
                  desc: 'Entender a profundidad las exigencias de cada campo petrolero y superar las expectativas operativas con respuesta oportuna.',
                  icon: HeartHandshake,
                  color: 'from-flame-500 to-orange-600'
                },
                {
                  title: 'Responsabilidad',
                  desc: 'Ejecución rigurosa con altos estándares de seguridad HSE, calidad y respeto absoluto por el medio ambiente.',
                  icon: ShieldCheck,
                  color: 'from-gold-500 to-gold-700'
                },
                {
                  title: 'Profesionalismo',
                  desc: 'Equipo multidisciplinario capacitado con tecnología innovadora y ética en la gestión del sector hidrocarburos.',
                  icon: UserCheck,
                  color: 'from-orange-500 to-flame-600'
                }
              ].map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div
                    key={idx}
                    className="luxury-card p-8 rounded-3xl border border-slate-800 flex flex-col justify-between hover:border-gold-metallic/50 transition-all duration-300"
                  >
                    <div>
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${val.color} flex items-center justify-center text-white mb-6 shadow-flame-glow`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-extrabold font-heading text-white mb-3">{val.title}</h4>
                      <p className="text-slate-200 text-sm leading-relaxed font-light">{val.desc}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-gold-400 font-bold">
                      <span>Cultura Corporativa CYSOS</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
