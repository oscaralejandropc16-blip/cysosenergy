import React, { useState } from 'react';
import { ShieldCheck, Award, FileCheck2, CheckCircle2, Info, ChevronRight, Lock } from 'lucide-react';

const BADGES = [
  {
    id: 'sapi',
    title: 'SAPI Homologado',
    code: 'Registro CyS 2026-I',
    desc: 'Patente y modelo industrial de gabinetes de dosificación química registrados oficialmente ante el SAPI.',
    authority: 'Servicio Autónomo de la Propiedad Intelectual',
    color: 'border-gold-500/40 text-gold-400 bg-gold-950/30',
    icon: Award
  },
  {
    id: 'racda',
    title: 'Registro RACDA Oficial',
    code: 'Sustancias Peligrosas',
    desc: 'Permiso y acreditación ambiental para el manejo, transporte y dosificación de productos químicos en yacimientos.',
    authority: 'Ministerio del Poder Popular para el Ecosocialismo',
    color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30',
    icon: ShieldCheck
  },
  {
    id: 'sihos',
    title: 'Norma PDVSA SI-HO-S',
    code: 'Seguridad Integral',
    desc: 'Adherencia estricta a los manuales y procedimientos de Seguridad Industrial, Higiene Ocupacional y Ambiente.',
    authority: 'PDVSA Petróleos de Venezuela S.A.',
    color: 'border-flame-500/40 text-flame-400 bg-flame-950/30',
    icon: Lock
  },
  {
    id: 'iso',
    title: 'ISO 9001 & 14001',
    code: 'Calidad & Ecosistema',
    desc: 'Prácticas y lineamientos de gestión de calidad en operaciones de campo y minimización de impacto ambiental.',
    authority: 'Estándares Internacionales ISO',
    color: 'border-sky-500/40 text-sky-400 bg-sky-950/30',
    icon: FileCheck2
  }
];

export const TrustBadgesStrip = ({ onOpenDossier }) => {
  const [activeBadge, setActiveBadge] = useState(null);

  return (
    <div className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="luxury-glass p-4 sm:p-6 rounded-3xl border border-gold-metallic/35 shadow-luxury bg-navy-900/90 backdrop-blur-2xl">
        
        {/* Strip Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-300 font-heading">
              Garantía Normativa & Homologaciones Oficiales en Venezuela
            </span>
          </div>

          <button
            onClick={onOpenDossier}
            className="text-[11px] font-bold text-gold-400 hover:text-white flex items-center gap-1 transition-colors self-start sm:self-auto font-heading"
          >
            <span>Ver Fichas en Dossier 2026</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
          {BADGES.map((b) => {
            const Icon = b.icon;
            const isSelected = activeBadge === b.id;
            return (
              <div
                key={b.id}
                onClick={() => setActiveBadge(isSelected ? null : b.id)}
                className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${b.color} ${
                  isSelected ? 'ring-2 ring-gold-400/50 scale-[1.02]' : 'hover:scale-[1.02]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-navy-950/80 border border-white/10 text-white font-heading">
                      {b.code}
                    </span>
                  </div>

                  <h4 className="text-xs font-black font-heading text-white">{b.title}</h4>
                  <p className="text-[10px] text-slate-300 font-light mt-1 line-clamp-2 leading-tight">
                    {b.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-400 font-medium">
                  <span className="truncate">{b.authority}</span>
                  <Info className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors flex-shrink-0 ml-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Drawer if clicked */}
        {activeBadge && (
          <div className="mt-4 p-4 rounded-2xl bg-navy-950/90 border border-gold-metallic/30 text-xs text-slate-300 animate-fadeIn flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-gold-400 font-heading">
                {BADGES.find(b => b.id === activeBadge)?.title}:
              </span>{' '}
              {BADGES.find(b => b.id === activeBadge)?.desc} Todas las certificaciones se encuentran debidamente auditadas y respaldadas para licitaciones con empresas mixtas y operadoras transnacionales.
            </div>
            <button
              onClick={() => setActiveBadge(null)}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold text-[10px] uppercase font-heading flex-shrink-0"
            >
              Cerrar
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
