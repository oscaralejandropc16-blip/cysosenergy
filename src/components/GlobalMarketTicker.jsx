import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export const GlobalMarketTicker = () => {
  const [blink, setBlink] = useState(false);
  const [brent, setBrent] = useState(84.45);
  const [wti, setWti] = useState(80.10);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setBrent(prev => Number((prev + (Math.random() - 0.5) * 0.15).toFixed(2)));
      setWti(prev => Number((prev + (Math.random() - 0.5) * 0.15).toFixed(2)));
      setTimeout(() => setBlink(false), 800);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-navy-950 border-b border-slate-800 text-xs py-1.5 px-4 shadow-lg overflow-hidden relative z-[60]">
      <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap">
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className={`w-2 h-2 rounded-full ${blink ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500'}`} />
          <span className="font-heading font-black text-slate-300 tracking-wider">MERCADOS EN VIVO</span>
        </div>

        <div className="w-px h-4 bg-slate-700 flex-shrink-0" />

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-bold text-slate-400">BRENT (UK)</span>
          <span className={`font-mono font-black ${blink ? 'text-emerald-400' : 'text-white'} transition-colors`}>${brent}</span>
          <TrendingUp className="w-3 h-3 text-emerald-500" />
        </div>

        <div className="w-px h-4 bg-slate-700 flex-shrink-0" />

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-bold text-slate-400">WTI (USA)</span>
          <span className={`font-mono font-black ${blink ? 'text-emerald-400' : 'text-white'} transition-colors`}>${wti}</span>
          <TrendingUp className="w-3 h-3 text-emerald-500" />
        </div>

        <div className="w-px h-4 bg-slate-700 flex-shrink-0" />

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-bold text-slate-400">USD BCV</span>
          <span className="font-mono font-black text-white">Bs. 854,46</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1 rounded">+0.1%</span>
        </div>

        <div className="w-px h-4 bg-slate-700 flex-shrink-0" />

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-bold text-slate-400">EUR BCV</span>
          <span className="font-mono font-black text-white">Bs. 974,06</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1 rounded">+0.2%</span>
        </div>

        <div className="w-px h-4 bg-slate-700 flex-shrink-0" />

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-bold text-slate-400">CESTA OPEP</span>
          <span className="font-mono font-black text-white">$86.20</span>
        </div>
      </div>
    </div>
  );
};
