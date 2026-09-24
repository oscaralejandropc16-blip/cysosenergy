import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export const GlobalMarketTicker = () => {
  const [blink, setBlink] = useState(false);
  const [brent, setBrent] = useState(84.45);
  const [wti, setWti] = useState(80.10);
  
  // Real-time BCV rates
  const [usdBcv, setUsdBcv] = useState('...');
  const [eurBcv, setEurBcv] = useState('...');
  
  // Fetch real BCV rates on mount
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const [usdRes, eurRes] = await Promise.all([
          fetch('https://ve.dolarapi.com/v1/dolares/oficial'),
          fetch('https://ve.dolarapi.com/v1/euros/oficial')
        ]);
        if (usdRes.ok) {
          const usdData = await usdRes.json();
          setUsdBcv(usdData.promedio.toFixed(2).replace('.', ','));
        }
        if (eurRes.ok) {
          const eurData = await eurRes.json();
          setEurBcv(eurData.promedio.toFixed(2).replace('.', ','));
        }
      } catch (error) {
        console.error('Error fetching BCV rates:', error);
      }
    };
    fetchRates();
    
    // Poll every 30 minutes
    const interval = setInterval(fetchRates, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate fast-moving oil market
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
          <span className="font-mono font-black text-white">Bs. {usdBcv}</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1 rounded">OFICIAL</span>
        </div>

        <div className="w-px h-4 bg-slate-700 flex-shrink-0" />

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-bold text-slate-400">EUR BCV</span>
          <span className="font-mono font-black text-white">Bs. {eurBcv}</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1 rounded">OFICIAL</span>
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
