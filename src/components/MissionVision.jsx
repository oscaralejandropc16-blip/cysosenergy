import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Target, Compass, Award, HeartHandshake, ShieldCheck, UserCheck, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

export const MissionVision = () => {
  const { companyInfo } = useCms();
  const [activeTab, setActiveTab] = useState('mision');

  const safeInfo = companyInfo || {
    mision: `Brindar soluciones integrales en ingeniería, procura internacional, logística pesada, intervención de pozos y química de producción petrolera, con un equipo altamente capacitado de profesionales, técnicos y personal operativo. Nos comprometemos a ejecutar proyectos con los más altos estándares de calidad (ISO 9001) y seguridad HSE (PDVSA SI-HO-S), garantizando respuesta oportuna, efectividad y protección ambiental en Venezuela.`,
    vision: `Consolidarnos como la empresa venezolana líder en ingeniería, procura, construcción y servicios petroleros especializados, destacada por la innovación en soluciones para la recuperación de pozos, inyección de reductores de viscosidad y logística de izamiento pesado, garantizando la confianza de nuestros clientes y el crecimiento económico del país.`
  };

  return (
    <section id="mision-vision" className="py-20 md:py-24 relative bg-navy-950 border-y border-slate-800/80 overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-metallic/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-flame-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with High Contrast */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-metallic/40 shadow-gold-glow">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
            <span className="text-xs font-black uppercase tracking-wider text-gold-400 font-heading">
              Identidad Institucional Oficial
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
            Misión, Visión y <span className="animate-gradient-text">Valores Corporativos</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base font-light">
            Marco estratégico que rige nuestras operaciones de ingeniería y servicios petroleros en Venezuela.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="inline-flex p-1.5 bg-navy-900/90 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-xl gap-1">
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
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 font-heading ${
                    isActive
                      ? 'bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 text-white shadow-flame-glow scale-105'
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
        <div className="max-w-6xl mx-auto">
          
          {/* MISION TAB */}
          {activeTab === 'mision' && (
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 animate-fadeIn items-center">
              {/* Text Area */}
              <div className="order-2 lg:order-1 luxury-glass p-8 sm:p-10 rounded-[2.5rem] border border-gold-metallic/30 shadow-2xl relative overflow-hidden group hover:border-gold-400/50 transition-colors duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                
                <div className="flex items-center gap-5 mb-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-flame-500 to-gold-600 p-[2px] shadow-flame-glow flex-shrink-0">
                    <div className="w-full h-full bg-[#0a1224] rounded-[14px] flex items-center justify-center text-gold-400">
                      <Target className="w-8 h-8" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">Nuestra Misión</h3>
                    <p className="text-[11px] text-gold-400 font-black tracking-widest uppercase font-heading mt-1">CYSOS ENERGY, C.A.</p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line relative z-10">
                  {safeInfo.mision}
                </p>

                <div className="mt-8 pt-6 border-t border-slate-800 grid sm:grid-cols-2 gap-4 relative z-10">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-navy-950/50 border border-slate-800/50 group/item hover:border-gold-400/30 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.8)] flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-200 group-hover/item:text-gold-400 transition-colors">Ingeniería IPC Especializada</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-navy-950/50 border border-slate-800/50 group/item hover:border-gold-400/30 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.8)] flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-200 group-hover/item:text-gold-400 transition-colors">Reducción de Viscosidad</span>
                  </div>
                </div>
              </div>

              {/* Image Area */}
              <div className="order-1 lg:order-2 relative group h-72 sm:h-96 lg:h-full min-h-[400px] rounded-[2.5rem] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gold-500/10 mix-blend-overlay z-10" />
                <img 
                  src="/assets/mision_bg.jpg" 
                  alt="Misión Cysos Energy" 
                  className="w-full h-full object-cover transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-700 ease-out" 
                />
                
                <div className="absolute bottom-6 left-6 right-6 z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <div className="luxury-glass p-5 rounded-2xl border border-white/10 backdrop-blur-xl bg-navy-950/60 border-l-2 border-l-gold-400">
                    <div>
                      <p className="text-white font-bold text-sm font-heading">Operaciones de Alto Nivel</p>
                      <p className="text-slate-300 text-xs mt-1">Ejecución impecable en campos de crudo pesado y extrapesado a nivel nacional.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISION TAB */}
          {activeTab === 'vision' && (
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 animate-fadeIn items-center">
              
              {/* Image Area */}
              <div className="order-1 relative group h-72 sm:h-96 lg:h-full min-h-[400px] rounded-[2.5rem] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-flame-500/10 mix-blend-overlay z-10" />
                <img 
                  src="/assets/vision_bg.jpg" 
                  alt="Visión Cysos Energy" 
                  className="w-full h-full object-cover transform group-hover:scale-105 group-hover:-rotate-1 transition-all duration-700 ease-out" 
                />
                
                <div className="absolute bottom-6 left-6 right-6 z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <div className="luxury-glass p-5 rounded-2xl border border-white/10 backdrop-blur-xl bg-navy-950/60 border-l-2 border-l-flame-500">
                    <div>
                      <p className="text-white font-bold text-sm font-heading">Liderazgo Corporativo 2030</p>
                      <p className="text-slate-300 text-xs mt-1">Consolidación tecnológica e innovación en la industria petrolera venezolana.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="order-2 luxury-glass p-8 sm:p-10 rounded-[2.5rem] border border-gold-metallic/30 shadow-2xl relative overflow-hidden group hover:border-flame-500/50 transition-colors duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-flame-500/5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                
                <div className="flex items-center gap-5 mb-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-flame-600 p-[2px] shadow-gold-glow flex-shrink-0">
                    <div className="w-full h-full bg-[#0a1224] rounded-[14px] flex items-center justify-center text-gold-400">
                      <Compass className="w-8 h-8" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">Nuestra Visión</h3>
                    <p className="text-[11px] text-flame-500 font-black tracking-widest uppercase font-heading mt-1">Liderazgo & Expansión</p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line relative z-10">
                  {safeInfo.vision}
                </p>

                <div className="mt-8 pt-6 border-t border-slate-800 grid sm:grid-cols-2 gap-4 relative z-10">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-navy-950/50 border border-slate-800/50 group/item hover:border-flame-500/30 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-flame-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)] flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-200 group-hover/item:text-flame-500 transition-colors">Innovación Tecnológica</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-navy-950/50 border border-slate-800/50 group/item hover:border-flame-500/30 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-flame-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)] flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-200 group-hover/item:text-flame-500 transition-colors">Sostenibilidad Ambiental</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* VALORES TAB */}
          {activeTab === 'valores' && (
            <div className="grid md:grid-cols-3 gap-5 animate-fadeIn">
              {[
                {
                  title: 'Compromiso con el Cliente',
                  desc: 'Entender a profundidad las exigencias de cada campo petrolero y superar las expectativas operativas con respuesta oportuna 24/7.',
                  icon: HeartHandshake,
                  color: 'from-flame-500 to-orange-600'
                },
                {
                  title: 'Responsabilidad & Seguridad',
                  desc: 'Ejecución rigurosa con altos estándares de seguridad HSE (PDVSA SI-HO-S), calidad ISO 9001 y respeto absoluto por el medio ambiente.',
                  icon: ShieldCheck,
                  color: 'from-gold-500 to-gold-700'
                },
                {
                  title: 'Profesionalismo e Innovación',
                  desc: 'Equipo multidisciplinario altamente capacitado, tecnología química de vanguardia y ética inquebrantable en la gestión de hidrocarburos.',
                  icon: UserCheck,
                  color: 'from-orange-500 to-flame-600'
                }
              ].map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div
                    key={idx}
                    className="luxury-card p-6 sm:p-7 rounded-3xl border border-slate-800 flex flex-col justify-between hover:border-gold-metallic/50 transition-all duration-300 group"
                  >
                    <div>
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${val.color} flex items-center justify-center text-white mb-5 shadow-flame-glow group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-black font-heading text-white mb-2">{val.title}</h4>
                      <p className="text-slate-300 text-xs leading-relaxed font-light">{val.desc}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 text-[11px] text-gold-400 font-bold font-heading">
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

export default MissionVision;
