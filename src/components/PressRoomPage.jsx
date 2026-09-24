import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { Logo } from './Logo';
import { 
  Calendar, Tag, Globe, ChevronRight, Newspaper, 
  ArrowLeft, Search, X, BookOpen, Clock, Radio, 
  Flame, TrendingUp, ArrowRight, ShieldCheck, Share2, Sparkles
} from 'lucide-react';

export const PressRoomPage = ({ onReturnToHome, onOpenArticle, onOpenDossier }) => {
  const { news = [] } = useCms();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'venezuela', 'mundial'
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const countVenezuela = (news || []).filter(
    (i) => (i.category || 'venezuela').toLowerCase() === 'venezuela'
  ).length;

  const countMundial = (news || []).filter(
    (i) => (i.category || '').toLowerCase() === 'mundial'
  ).length;

  // Filtered list
  const filteredNews = (news || []).filter((item) => {
    // Tab filter
    if (activeTab !== 'all') {
      const cat = (item.category || 'venezuela').toLowerCase();
      if (cat !== activeTab.toLowerCase()) return false;
    }

    // Search query filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchTitle = (item.title || '').toLowerCase().includes(query);
      const matchContent = (item.content || '').toLowerCase().includes(query);
      const matchSummary = (item.summary || '').toLowerCase().includes(query);
      const matchTag = (item.tag || '').toLowerCase().includes(query);
      const matchSource = (item.source || '').toLowerCase().includes(query);
      return matchTitle || matchContent || matchSummary || matchTag || matchSource;
    }

    return true;
  });

  // CNN Lead Story & Right Rail
  const leadStory = filteredNews[0] || news[0];
  const sideStories = filteredNews.slice(1, 4);
  const remainingStories = filteredNews.slice(4);

  // Venezuela stories & Global stories for thematic blocks
  const venezuelaNews = (news || []).filter(i => (i.category || 'venezuela').toLowerCase() === 'venezuela');
  const globalNews = (news || []).filter(i => (i.category || '').toLowerCase() === 'mundial');

  const handleCardClick = (item) => {
    if (onOpenArticle) {
      onOpenArticle(item.id);
    } else {
      window.location.hash = `#noticia/${item.id}`;
    }
  };

  const breakingAlerts = [
    'Continental Resources acuerda desarrollo del Bloque Ayacucho 2 en la Faja del Orinoco',
    'PDVSA proyecta cerrar 2026 en 1.3M bpd y avanzar a 1.5M en 2027',
    'Brent supera los $100 ante tensiones en el Estrecho de Ormuz',
    'TotalEnergies formaliza memorando para cooperación estratégica en hidrocarburos',
    'Repsol asume control operativo de Petroquiriquire para triplicar extracción en Monagas'
  ];

  return (
    <div className="min-h-screen bg-[#060B14] text-slate-100 font-sans selection:bg-red-600 selection:text-white flex flex-col">
      
      {/* ============================================================== */}
      {/* 1. CNN-STYLE EXECUTIVE TOPBAR & LOGO HEADER                   */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 bg-[#070F1E]/95 backdrop-blur-xl border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={onReturnToHome}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white font-heading font-bold text-xs sm:text-sm transition-all duration-200 group cursor-pointer"
              aria-label="Volver a la página principal"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Volver al Inicio</span>
            </button>

            <div className="hidden sm:block h-6 w-px bg-slate-800" />

            <div className="cursor-pointer" onClick={onReturnToHome}>
              <Logo isDark={true} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-red-950/80 border border-red-500/40 text-red-400 text-xs font-heading font-bold tracking-wider">
              <span className="w-2 h-2 rounded-sm bg-red-500 animate-pulse" />
              NOTICIAS EN DIRECTO
            </span>

            {onOpenDossier && (
              <button
                onClick={onOpenDossier}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-flame-600 hover:bg-flame-500 text-white font-heading font-bold text-xs shadow-lg shadow-flame-600/20 transition-all cursor-pointer"
              >
                Dossier Corporativo
              </button>
            )}
          </div>
        </div>

        {/* CNN-STYLE RED BREAKING NEWS TICKER */}
        <div className="bg-[#CC0000] text-white overflow-hidden border-t border-red-700 shadow-md">
          <div className="max-w-7xl mx-auto flex items-stretch">
            <div className="bg-[#990000] px-4 py-2 flex items-center gap-2 font-heading font-black text-xs uppercase tracking-wider flex-shrink-0 z-10 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <span>ÚLTIMA HORA</span>
            </div>

            <div className="overflow-hidden relative flex items-center py-2 px-3 flex-grow bg-[#CC0000]">
              <div className="animate-news-ticker flex items-center gap-8 whitespace-nowrap text-xs font-sans font-medium text-white">
                {breakingAlerts.map((alert, idx) => (
                  <div key={`ticker-a-${idx}`} className="inline-flex items-center gap-2">
                    <span className="font-bold text-amber-200">DESARROLLO:</span>
                    <span className="hover:underline cursor-pointer">{alert}</span>
                    <span className="text-red-300 mx-2">■</span>
                  </div>
                ))}
                {/* Loop duplicate */}
                {breakingAlerts.map((alert, idx) => (
                  <div key={`ticker-b-${idx}`} className="inline-flex items-center gap-2">
                    <span className="font-bold text-amber-200">DESARROLLO:</span>
                    <span className="hover:underline cursor-pointer">{alert}</span>
                    <span className="text-red-300 mx-2">■</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. CNN PORTAL NAVIGATION & FILTER BAR                          */}
      {/* ============================================================== */}
      <section className="bg-slate-950/90 border-b border-slate-800 py-4 sticky top-[116px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* CNN Section Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => { setActiveTab('all'); setSearchQuery(''); }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Portada ({news.length})
            </button>

            <button
              onClick={() => { setActiveTab('venezuela'); }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'venezuela'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Petróleo Venezuela ({countVenezuela})
            </button>

            <button
              onClick={() => { setActiveTab('mundial'); }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'mundial'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Mercado OPEP+ & Mundo ({countMundial})
            </button>
          </nav>

          {/* Search Input Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en el portal..."
              className="w-full pl-10 pr-10 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-400 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. MAIN CNN EDITORIAL CONTENT                                  */}
      {/* ============================================================== */}
      <main className="flex-grow py-8 sm:py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* SEARCH RESULT BANNER (If searching) */}
          {searchQuery && (
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <span className="text-sm font-sans text-slate-300">
                Mostrando <strong className="text-white">{filteredNews.length}</strong> reportes para "{searchQuery}"
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-red-400 hover:underline font-heading font-bold"
              >
                Limpiar búsqueda
              </button>
            </div>
          )}

          {/* EMPTY STATE */}
          {filteredNews.length === 0 && (
            <div className="py-20 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <Newspaper className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white font-heading">No se encontraron reportes</h3>
              <p className="text-slate-400 text-sm font-sans">
                No hay coincidencias para los criterios seleccionados. Intente con otros términos como "Faja", "PDVSA", "Brent" o "TotalEnergies".
              </p>
              <button
                onClick={() => { setActiveTab('all'); setSearchQuery(''); }}
                className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-heading font-bold text-xs uppercase"
              >
                Ver Todas las Noticias
              </button>
            </div>
          )}

          {/* ========================================================== */}
          {/* A. CNN LEAD FRONT PAGE HERO & RIGHT RAIL                   */}
          {/* ========================================================== */}
          {filteredNews.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-slate-800 pb-12">
              
              {/* DOMINANT LEAD STORY (8 COLS) */}
              {leadStory && (
                <article
                  onClick={() => handleCardClick(leadStory)}
                  className="lg:col-span-8 group bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 hover:border-red-500/50 transition-all duration-300 cursor-pointer shadow-2xl"
                >
                  {/* Big Cinematic Photo */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                    <img
                      src={leadStory.mediaUrl}
                      alt={leadStory.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/30 pointer-events-none" />
                    
                    {/* CNN Breaking Tag */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 text-xs font-heading font-black uppercase tracking-wider bg-red-600 text-white rounded-md shadow-lg flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-sm bg-white animate-pulse" />
                        REPORTE PRINCIPAL
                      </span>
                      <span className="px-2.5 py-1 text-xs font-sans font-semibold bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-md text-slate-200">
                        {leadStory.tag}
                      </span>
                    </div>

                    {/* Source & Read Time Bottom Overlay */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-sans text-slate-300">
                      {leadStory.source && (
                        <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-slate-300">
                          Fuente: {leadStory.source}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-red-400" />
                        4 min de lectura
                      </span>
                    </div>
                  </div>

                  {/* Headline & Takeaways Box */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-sans text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-red-400" />
                      <span>{leadStory.date}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-red-400 font-heading font-semibold uppercase tracking-wider">Cobertura Especial</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-heading leading-tight group-hover:text-red-400 transition-colors">
                      {leadStory.title}
                    </h2>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                      {leadStory.summary || leadStory.content}
                    </p>

                    {/* CNN Key Takeaways Callout */}
                    <div className="p-4 rounded-xl bg-slate-900/90 border-l-4 border-red-600 space-y-2 text-xs sm:text-sm font-sans text-slate-200">
                      <div className="font-heading font-bold text-red-400 uppercase tracking-wider text-xs">Puntos Clave del Reporte:</div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">▪</span>
                        <span>Acuerdo bilateral con PDVSA para inversión y rescate de infraestructura en la Faja Petrolífera del Orinoco.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">▪</span>
                        <span>Área con reservas estimadas en más de 30.000 millones de barriles de crudo pesado y extrapesado.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">▪</span>
                        <span>Requerimiento inmediato de química de fluidización, taladros de perforación y logística pesada.</span>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-red-400 font-heading font-bold group-hover:text-red-300 flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform">
                        <span>Leer cobertura completa</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                      <span className="text-slate-400 font-sans">Página editorial dedicada &rsaquo;</span>
                    </div>
                  </div>
                </article>
              )}

              {/* CNN RIGHT RAIL: "LO MÁS DESTACADO" (4 COLS) */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                
                {/* Header with Red Accents */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-red-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-red-600" />
                    <h3 className="font-heading font-black text-sm uppercase tracking-wider text-white">
                      Lo Más Destacado
                    </h3>
                  </div>
                  <span className="text-xs font-sans text-red-400 font-semibold">Tiempo Real</span>
                </div>

                {/* Stacked Rail News Items */}
                <div className="space-y-4">
                  {sideStories.map((item, idx) => (
                    <article
                      key={item.id}
                      onClick={() => handleCardClick(item)}
                      className="group p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-red-500/40 transition-all cursor-pointer shadow-lg flex gap-4 items-start"
                    >
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                        <img
                          src={item.mediaUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-heading font-bold text-white uppercase">
                          #{idx + 1}
                        </span>
                      </div>

                      <div className="flex-grow space-y-1.5">
                        <div className="flex items-center gap-2 text-[11px] font-sans text-slate-400">
                          <span className="text-red-400 font-heading font-semibold">{item.tag}</span>
                          <span>•</span>
                          <span>{item.date}</span>
                        </div>

                        <h4 className="text-xs sm:text-sm font-heading font-bold text-white leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
                          {item.title}
                        </h4>

                        <span className="inline-flex items-center gap-1 text-xs text-red-400 font-heading font-semibold group-hover:translate-x-1 transition-transform">
                          <span>Ver reporte</span>
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </article>
                  ))}
                </div>

                {/* CNN Business Market Widget */}
                <div className="mt-2 p-5 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      Petróleo & Energía Hoy
                    </span>
                    <span className="text-[11px] font-sans text-slate-500">Mercados 24h</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                      <div className="text-slate-400 font-heading text-[11px]">BRENT</div>
                      <div className="text-white font-bold text-sm">$84.45</div>
                      <div className="text-emerald-400 font-semibold text-[11px]">▲ +1.8%</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                      <div className="text-slate-400 font-heading text-[11px]">WTI</div>
                      <div className="text-white font-bold text-sm">$80.10</div>
                      <div className="text-emerald-400 font-semibold text-[11px]">▲ +1.3%</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                      <div className="text-slate-400 font-heading text-[11px]">MEREY 16</div>
                      <div className="text-white font-bold text-sm">$68.90</div>
                      <div className="text-emerald-400 font-semibold text-[11px]">▲ +2.4%</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                      <div className="text-slate-400 font-heading text-[11px]">CESTA OPEP</div>
                      <div className="text-white font-bold text-sm">$86.20</div>
                      <div className="text-emerald-400 font-semibold text-[11px]">▲ +0.7%</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* B. MORE NEWS GRID (Remaining Articles)                     */}
          {/* ========================================================== */}
          {remainingStories.length > 0 && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-red-600" />
                  <h3 className="font-heading font-black text-base uppercase tracking-wider text-white">
                    Más Reportes & Despachos de Campo
                  </h3>
                </div>
                <span className="text-xs font-sans text-slate-400">
                  {remainingStories.length} artículos adicionales
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingStories.map((item) => {
                  const isMundial = (item.category || '').toLowerCase() === 'mundial';

                  return (
                    <article
                      key={item.id}
                      onClick={() => handleCardClick(item)}
                      className="group flex flex-col bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-red-500/40 transition-all duration-300 shadow-xl cursor-pointer"
                    >
                      {/* Image Media Container */}
                      <div className="relative aspect-video overflow-hidden bg-slate-900">
                        <img 
                          src={item.mediaUrl} 
                          alt={item.title} 
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 pointer-events-none" />

                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                          <span className="px-2 py-0.5 text-xs font-semibold bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded text-slate-200 flex items-center gap-1 font-sans">
                            <Tag className="w-3 h-3 text-red-400" />
                            {item.tag}
                          </span>

                          <span className={`px-2 py-0.5 text-xs font-semibold backdrop-blur-md rounded border font-sans ${
                            isMundial 
                              ? 'bg-blue-950/85 text-blue-300 border-blue-500/30' 
                              : 'bg-emerald-950/85 text-emerald-300 border-emerald-500/30'
                          }`}>
                            {isMundial ? '🌍 Global' : '🇻🇪 Venezuela'}
                          </span>
                        </div>

                        {item.source && (
                          <div className="absolute bottom-2 left-3 right-3">
                            <span className="text-xs font-sans text-slate-300 bg-black/80 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
                              Fuente: {item.source}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Content Box */}
                      <div className="p-5 flex flex-col flex-grow justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-sans text-slate-400 mb-2.5">
                            <Calendar className="w-3.5 h-3.5 text-red-400" />
                            <span>{item.date}</span>
                          </div>

                          <h4 className="text-base font-bold text-white mb-2.5 line-clamp-2 leading-snug group-hover:text-red-400 transition-colors font-heading">
                            {item.title}
                          </h4>

                          <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed font-sans">
                            {item.summary || item.content}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                          <span className="text-red-400 font-bold text-xs sm:text-sm group-hover:text-red-300 transition-colors flex items-center gap-1 font-heading">
                            <span>Leer artículo</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <span className="text-xs font-sans text-slate-500 group-hover:text-slate-400 transition-colors">
                            Página dedicada &rsaquo;
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* C. CNN FOOTER CALLOUT & RETURN STRIP                      */}
          {/* ========================================================== */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start text-xs font-heading font-bold text-red-400 uppercase tracking-wider">
                <span className="w-2 h-2 bg-red-600 rounded-sm" />
                <span>CYSOS ENERGY • Centro de Inteligencia Operativa</span>
              </div>
              <h3 className="text-xl font-bold text-white font-heading">
                ¿Desea volver al portal principal de CYSOS ENERGY?
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-sans">
                Explore nuestras soluciones químicas de fluidización, intervención de pozos y proyectos IPC.
              </p>
            </div>

            <button
              onClick={onReturnToHome}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl shadow-red-600/25 hover:-translate-y-0.5 cursor-pointer flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Página Principal</span>
            </button>
          </div>

        </div>
      </main>

      {/* Footer minimal */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-center text-xs text-slate-500 font-sans">
        <p>&copy; 2026 CYSOS ENERGY, C.A. • División de Información Técnica y Sala de Prensa • Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default PressRoomPage;
