import React from 'react';
import { useHalloween } from '../context/HalloweenContext';
import { Sparkles } from 'lucide-react';

export const HalloweenToggle = ({ compact = false, className = '' }) => {
  const { isHalloween, toggleHalloween } = useHalloween();

  if (compact) {
    return (
      <button
        onClick={toggleHalloween}
        type="button"
        title={isHalloween ? "Desactivar temática de Halloween" : "Activar temática de Halloween"}
        className={`relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all duration-300 border ${
          isHalloween
            ? 'bg-gradient-to-r from-orange-600/80 to-purple-600/80 hover:from-orange-500 hover:to-purple-500 text-white border-orange-400/50 shadow-[0_0_12px_rgba(255,107,0,0.5)]'
            : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border-slate-700'
        } ${className}`}
      >
        <span className={`text-sm transition-transform duration-300 ${isHalloween ? 'scale-110 rotate-6 animate-pulse' : 'opacity-50'}`}>
          🎃
        </span>
        <span className="hidden sm:inline text-[11px] uppercase tracking-wider font-heading">
          {isHalloween ? 'Halloween ON' : 'Halloween OFF'}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleHalloween}
      type="button"
      className={`group relative flex items-center gap-2.5 px-3 py-1.5 rounded-xl border text-xs font-bold font-heading transition-all duration-300 ${
        isHalloween
          ? 'bg-gradient-to-r from-orange-950/80 via-purple-950/60 to-slate-900 border-orange-500/50 text-orange-200 shadow-[0_0_15px_rgba(255,107,0,0.35)]'
          : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:border-orange-500/30 hover:text-slate-200'
      } ${className}`}
    >
      <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-sm transition-all duration-300 ${
        isHalloween ? 'bg-orange-500/20 text-orange-400 shadow-[0_0_8px_rgba(255,107,0,0.6)] animate-bounce' : 'bg-slate-800 text-slate-500'
      }`}>
        🎃
      </div>
      <div className="flex flex-col text-left leading-tight">
        <span className={`text-[10px] uppercase tracking-wider font-extrabold ${isHalloween ? 'text-orange-400' : 'text-slate-400'}`}>
          Temática de Octubre
        </span>
        <span className={`text-xs ${isHalloween ? 'text-white' : 'text-slate-300'}`}>
          {isHalloween ? 'Modo Halloween Activo' : 'Modo Estándar'}
        </span>
      </div>
      <div className={`ml-1 w-2 h-2 rounded-full transition-all duration-300 ${
        isHalloween ? 'bg-orange-400 shadow-[0_0_8px_#ff7700] animate-ping' : 'bg-slate-600'
      }`} />
    </button>
  );
};
