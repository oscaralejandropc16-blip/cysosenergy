import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useHalloween } from '../context/HalloweenContext';

export const GlobalMarketTicker = () => {
  const { isHalloween } = useHalloween();
  const [blink, setBlink] = useState(false);
  const [brent, setBrent] = useState(106.75);
  const [wti, setWti] = useState(94.36);
  
  const [brentTrend, setBrentTrend] = useState('up');
  const [wtiTrend, setWtiTrend] = useState('up');
  
  const API_NINJAS_KEY = 'zEpNoe8ZEVv9s7vkWZsHZiuC2a83Mt8wH4MeEcyl'; 
  
  // Real-time BCV rates
  const [usdBcv, setUsdBcv] = useState('...');
  const [eurBcv, setEurBcv] = useState('...');
  
  // Fetch real BCV and Oil rates on mount
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

      if (API_NINJAS_KEY !== 'TU_API_KEY_AQUI') {
        try {
          const [brentRes, wtiRes] = await Promise.all([
            fetch('https://api.api-ninjas.com/v1/commodityprice?name=brent_crude_oil', {
              headers: { 'X-Api-Key': API_NINJAS_KEY }
            }),
            fetch('https://api.api-ninjas.com/v1/commodityprice?name=wti_crude_oil', {
              headers: { 'X-Api-Key': API_NINJAS_KEY }
            })
          ]);
          
          if (brentRes.ok) {
            const brentData = await brentRes.json();
            setBrent(brentData.price);
          }
          if (wtiRes.ok) {
            const wtiData = await wtiRes.json();
            setWti(wtiData.price);
          }
        } catch (error) {
          console.error('Error fetching Oil rates:', error);
        }
      }
    };
    fetchRates();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      if (API_NINJAS_KEY === 'TU_API_KEY_AQUI') {
        const brentDelta = (Math.random() * 0.4 - 0.2);
        const wtiDelta = (Math.random() * 0.4 - 0.2);
        setBrent(prev => +(prev + brentDelta).toFixed(2));
        setWti(prev => +(prev + wtiDelta).toFixed(2));
        setBrentTrend(Math.random() > 0.5 ? 'up' : 'down');
        setWtiTrend(Math.random() > 0.5 ? 'up' : 'down');
      }
      setTimeout(() => setBlink(false), 800);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const TickerItems = () => (
    <div className="flex items-center gap-6 px-6 flex-shrink-0 whitespace-nowrap min-w-max">
      {/* Halloween Festive Badge */}
      {isHalloween && (
        <>
          <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-500/40 text-orange-300 font-extrabold text-[11px] shadow-[0_0_10px_rgba(255,107,0,0.3)]">
            <span className="text-xs animate-bounce">🎃</span>
            <span className="font-heading tracking-wide">EDICIÓN HALLOWEEN 2026: OPERACIONES SIN SUSTOS</span>
          </div>
          <div className="w-px h-4 bg-orange-500/30 flex-shrink-0" />
        </>
      )}

      <div className="flex items-center gap-2 flex-shrink-0">
        <div className={`w-2 h-2 rounded-full ${blink ? (isHalloween ? 'bg-orange-400 animate-ping' : 'bg-emerald-400 animate-ping') : (isHalloween ? 'bg-orange-500 shadow-[0_0_8px_rgba(255,107,0,0.8)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]')}`} />
        <span className="font-heading font-black text-slate-300 tracking-wider">MERCADOS EN VIVO</span>
      </div>

      <div className="w-px h-4 bg-slate-700 flex-shrink-0" />

      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="font-bold text-slate-400">BRENT (UK)</span>
        <span className={`font-mono font-black transition-colors ${blink ? (brentTrend === 'up' ? 'text-emerald-400' : 'text-rose-500') : 'text-white'}`}>${brent}</span>
        {brentTrend === 'up' ? (
          <TrendingUp className={`w-3 h-3 text-emerald-500 transition-all ${blink ? '-translate-y-0.5' : ''}`} />
        ) : (
          <TrendingDown className={`w-3 h-3 text-rose-500 transition-all ${blink ? 'translate-y-0.5' : ''}`} />
        )}
      </div>

      <div className="w-px h-4 bg-slate-700 flex-shrink-0" />

      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="font-bold text-slate-400">WTI (USA)</span>
        <span className={`font-mono font-black transition-colors ${blink ? (wtiTrend === 'up' ? 'text-emerald-400' : 'text-rose-500') : 'text-white'}`}>${wti}</span>
        {wtiTrend === 'up' ? (
          <TrendingUp className={`w-3 h-3 text-emerald-500 transition-all ${blink ? '-translate-y-0.5' : ''}`} />
        ) : (
          <TrendingDown className={`w-3 h-3 text-rose-500 transition-all ${blink ? 'translate-y-0.5' : ''}`} />
        )}
      </div>

      <div className="w-px h-4 bg-slate-700 flex-shrink-0" />

      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="font-bold text-slate-400">USD BCV</span>
        <span className="font-mono font-black text-white">Bs. {usdBcv}</span>
        <span className={`text-[10px] px-1 rounded border ${isHalloween ? 'text-orange-400 bg-orange-400/10 border-orange-500/30' : 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20'}`}>OFICIAL</span>
      </div>

      <div className="w-px h-4 bg-slate-700 flex-shrink-0" />

      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="font-bold text-slate-400">EUR BCV</span>
        <span className="font-mono font-black text-white">Bs. {eurBcv}</span>
        <span className={`text-[10px] px-1 rounded border ${isHalloween ? 'text-orange-400 bg-orange-400/10 border-orange-500/30' : 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20'}`}>OFICIAL</span>
      </div>

      <div className="w-px h-4 bg-slate-700 flex-shrink-0" />

      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="font-bold text-slate-400">CESTA OPEP</span>
        <span className="font-mono font-black text-white">$104.50</span>
      </div>
      
      <div className="w-px h-4 bg-slate-700 flex-shrink-0" />

      {isHalloween && (
        <>
          <div className="flex items-center gap-2 flex-shrink-0 text-purple-300 font-semibold">
            <span>🦇</span>
            <span>QUÍMICA EOR: DISOLVIENDO ASFALTENOS MONSTRUOSOS</span>
          </div>
          <div className="w-px h-4 bg-purple-500/30 flex-shrink-0" />
        </>
      )}
    </div>
  );

  return (
    <div className={`w-full backdrop-blur-md border-b text-xs py-1.5 shadow-lg overflow-hidden relative z-[60] flex items-center justify-between transition-colors duration-500 ${
      isHalloween 
        ? 'bg-[#0a0512]/95 border-orange-500/30 shadow-[0_4px_20px_rgba(255,107,0,0.15)]' 
        : 'bg-navy-950/95 border-white/10'
    }`}>
      {/* Subtle Glow */}
      <div className={`absolute inset-0 pointer-events-none ${
        isHalloween 
          ? 'bg-gradient-to-r from-orange-500/10 via-purple-500/5 to-orange-500/10' 
          : 'bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5'
      }`} />
      
      <style>
        {`
          @keyframes wallstreet-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-track {
            display: flex;
            width: max-content;
            animation: wallstreet-scroll 35s linear infinite;
          }
          .ticker-track:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      
      {/* Constrained Ticker Window */}
      <div className="overflow-hidden w-full relative">
        <div className="ticker-track">
          <TickerItems />
          <TickerItems />
          <TickerItems />
          <TickerItems />
        </div>
      </div>
    </div>
  );
};
