import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Calendar, Clock, ArrowRight, TrendingUp, Radio, Newspaper, Sparkles, ArrowUpRight } from 'lucide-react';

export const NewsSection = ({ onOpenFullPressRoom, onOpenArticle }) => {
  const { news = [] } = useCms();
  const [activeCategory, setActiveCategory] = useState('all');

  if (!news || news.length === 0) return null;

  // Filter news based on tab
  const filteredNews = activeCategory === 'all'
    ? news
    : activeCategory === 'venezuela'
      ? news.filter(n => (n.category || '').toLowerCase() === 'venezuela')
      : news.filter(n => (n.category || '').toLowerCase() === 'mundial');

  // Lead dominant story (item 0) and secondary stories (items 1 to 4)
  const leadStory = filteredNews[0] || news[0];
  const secondaryStories = filteredNews.slice(1, 5);
  const displaySecondary = secondaryStories.length > 0 
    ? secondaryStories 
    : news.filter(n => n.id !== leadStory.id).slice(0, 4);

  const handleCardClick = (item) => {
    if (onOpenArticle) {
      onOpenArticle(item.id);
    } else {
      window.location.hash = `#noticia/${item.id}`;
    }
  };

  const handleOpenPressRoom = () => {
    if (onOpenFullPressRoom) {
      onOpenFullPressRoom();
    } else {
      window.location.hash = '#sala-de-prensa-completa';
    }
  };

  // Live petroleum benchmarks for the animated ticker tape
  const marketTickers = [
    { label: 'BRENT', price: '$84.45 USD', change: '+1.8%', isUp: true },
    { label: 'WTI', price: '$80.10 USD', change: '+1.3%', isUp: true },
    { label: 'MEREY 16', price: '$68.90 USD', change: '+2.4%', isUp: true },
    { label: 'CESTA OPEP', price: '$86.20 USD', change: '+0.7%', isUp: true },
    { label: 'PRODUCCIÓN VE', price: '940.000 BPD', change: '+4.2%', isUp: true },
    { label: 'META 2026', price: '1.300.000 BPD', change: 'En curso', isUp: true },
  ];

  const breakingAlerts = [
    'Continental Resources acuerda desarrollo del Bloque Ayacucho 2 en la Faja del Orinoco',
    'PDVSA proyecta cerrar 2026 en 1.3M bpd y avanzar a 1.5M en 2027',
    'TotalEnergies formaliza memorando para cooperación estratégica en hidrocarburos',
    'Repsol asume control operativo de Petroquiriquire para triplicar extracción en Monagas',
    'Eni formaliza Contrato Productivo de Hidrocarburos por 25 años en Junín 5'
  ];

  return (
    <section id="sala-de-prensa" className="py-20 bg-gradient-to-b from-navy-950 via-[#071124] to-navy-950 border-t border-slate-800/80 relative overflow-hidden">
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-flame-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER - Executive Modern Editorial (Clean Outfit & Inter Fonts) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 pb-6 border-b border-slate-800/70">
          <div>
            <div className="inline-flex items-center gap-2.5 text-xs font-heading font-bold tracking-wider uppercase text-flame-400 mb-2.5">
              <span className="w-2 h-2 bg-flame-500 rounded-sm" />
              <span>Actualidad & Análisis Energético</span>
              <span className="h-px w-10 bg-gradient-to-r from-flame-500/60 to-transparent" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight leading-tight">
              Sala de <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-flame-400">Prensa</span>
            </h2>
            
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed font-sans">
              Monitoreo editorial y técnico sobre la reactivación de la Faja del Orinoco, acuerdos multinacionales y mercados petroleros globales.
            </p>
          </div>

          {/* Clean Executive Category Segmented Switcher (No Pills, No Harsh Yellow) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl self-start md:self-auto backdrop-blur-md">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-flame-500 text-white shadow-lg shadow-flame-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Todos ({news.length})
            </button>
            <button
              onClick={() => setActiveCategory('venezuela')}
              className={`px-4 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeCategory === 'venezuela'
                  ? 'bg-flame-500 text-white shadow-lg shadow-flame-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Nacional
            </button>
            <button
              onClick={() => setActiveCategory('mundial')}
              className={`px-4 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeCategory === 'mundial'
                  ? 'bg-flame-500 text-white shadow-lg shadow-flame-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Global
            </button>
          </div>
        </div>

        {/* LIVE PETROLEUM TICKER TAPE (Continuous Marquee Animation - Clean Typography) */}
        <div className="mb-10 bg-slate-950/90 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="flex items-stretch flex-col sm:flex-row">
            
            {/* Ticker Lead Badge - Clean Alert Red */}
            <div className="px-4 py-2.5 bg-red-600 flex items-center justify-between sm:justify-start gap-2.5 text-white font-heading text-xs font-bold tracking-wider uppercase flex-shrink-0 z-10 border-b sm:border-b-0 sm:border-r border-red-700">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
              </span>
              <div className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>DESPACHO EN VIVO</span>
              </div>
            </div>

            {/* Continuous Marquee Rail - Clean Inter Font */}
            <div className="overflow-hidden relative flex items-center py-2.5 px-3 bg-slate-950/80 flex-grow">
              <div className="animate-news-ticker flex items-center gap-8 whitespace-nowrap">
                {/* Benchmark items */}
                {marketTickers.map((ticker, idx) => (
                  <div key={`tick-1-${idx}`} className="inline-flex items-center gap-2 font-sans text-xs text-slate-300">
                    <span className="font-heading font-bold text-white">{ticker.label}</span>
                    <span className="text-slate-200 font-semibold">{ticker.price}</span>
                    <span className="text-emerald-400 flex items-center text-xs font-semibold">
                      <TrendingUp className="w-3 h-3 inline mr-0.5" />
                      {ticker.change}
                    </span>
                    <span className="text-slate-700 mx-2">|</span>
                  </div>
                ))}
                
                {/* Breaking headlines */}
                {breakingAlerts.map((alert, idx) => (
                  <div key={`alert-1-${idx}`} className="inline-flex items-center gap-2 font-sans text-xs text-slate-300">
                    <span className="text-flame-400 font-heading font-bold uppercase tracking-wider text-xs">⚡ ÚLTIMA HORA:</span>
                    <span className="text-slate-200 hover:text-white transition-colors">{alert}</span>
                    <span className="text-slate-700 mx-2">◆</span>
                  </div>
                ))}

                {/* Duplicated for seamless infinite loop */}
                {marketTickers.map((ticker, idx) => (
                  <div key={`tick-2-${idx}`} className="inline-flex items-center gap-2 font-sans text-xs text-slate-300">
                    <span className="font-heading font-bold text-white">{ticker.label}</span>
                    <span className="text-slate-200 font-semibold">{ticker.price}</span>
                    <span className="text-emerald-400 flex items-center text-xs font-semibold">
                      <TrendingUp className="w-3 h-3 inline mr-0.5" />
                      {ticker.change}
                    </span>
                    <span className="text-slate-700 mx-2">|</span>
                  </div>
                ))}

                {breakingAlerts.map((alert, idx) => (
                  <div key={`alert-2-${idx}`} className="inline-flex items-center gap-2 font-sans text-xs text-slate-300">
                    <span className="text-flame-400 font-heading font-bold uppercase tracking-wider text-xs">⚡ ÚLTIMA HORA:</span>
                    <span className="text-slate-200 hover:text-white transition-colors">{alert}</span>
                    <span className="text-slate-700 mx-2">◆</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ASYMMETRICAL EDITORIAL BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ============================================================== */}
          {/* LEFT: DOMINANT HERO LEAD STORY (7 COLS)                          */}
          {/* ============================================================== */}
          {leadStory && (
            <div className="lg:col-span-7 flex flex-col">
              <article
                onClick={() => handleCardClick(leadStory)}
                className="group relative flex flex-col h-full bg-slate-950/90 rounded-2xl overflow-hidden border border-slate-800 hover:border-flame-500/50 transition-all duration-500 shadow-2xl hover:shadow-flame-500/10 cursor-pointer"
              >
                {/* Big Cinematic Image Container */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900">
                  <img
                    src={leadStory.mediaUrl}
                    alt={leadStory.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Dark Editorial Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/40 pointer-events-none" />

                  {/* Top Badges & Meta - Modern Geometric Style */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 text-xs font-heading font-bold bg-flame-600 text-white rounded-md uppercase tracking-wider shadow-md flex items-center gap-1.5">
                        Reporte Destacado
                      </span>
                      <span className="px-2.5 py-1 text-xs font-sans font-semibold bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-md text-slate-200">
                        {leadStory.tag}
                      </span>
                    </div>

                    <span className={`px-2.5 py-1 text-xs font-sans font-semibold backdrop-blur-md rounded-md border ${
                      (leadStory.category || '').toLowerCase() === 'mundial'
                        ? 'bg-blue-950/90 text-blue-300 border-blue-500/30'
                        : 'bg-emerald-950/90 text-emerald-300 border-emerald-500/30'
                    }`}>
                      {(leadStory.category || '').toLowerCase() === 'mundial' ? 'Global' : 'Nacional'}
                    </span>
                  </div>

                  {/* Source tag & reading time over image bottom */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-sans text-slate-300 pointer-events-none">
                    {leadStory.source && (
                      <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-slate-300">
                        Fuente: {leadStory.source}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-flame-400" />
                      4 min lectura
                    </span>
                  </div>
                </div>

                {/* Lead Story Narrative Content */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between bg-gradient-to-b from-slate-950 to-slate-900/90">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-sans text-slate-400 mb-3">
                      <Calendar className="w-3.5 h-3.5 text-flame-400" />
                      <span>{leadStory.date}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-flame-400 font-medium">Análisis Estratégico</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white font-heading leading-tight mb-4 group-hover:text-flame-400 transition-colors duration-300">
                      {leadStory.title}
                    </h3>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6 font-sans">
                      {leadStory.summary || leadStory.content}
                    </p>
                  </div>

                  {/* Interactive Action Footer */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 text-flame-400 font-heading font-bold text-sm sm:text-base group-hover:text-flame-300 transition-colors">
                      <span>Leer informe completo</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>

                    <span className="text-xs font-sans text-slate-400 group-hover:text-white transition-colors flex items-center gap-1">
                      Página dedicada
                      <ArrowUpRight className="w-3.5 h-3.5 text-flame-400" />
                    </span>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* ============================================================== */}
          {/* RIGHT: SECONDARY EDITORIAL FEEDS (5 COLS)                       */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Header for Secondary Feed */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-slate-200">
                <Newspaper className="w-4 h-4 text-flame-400" />
                <span>Despacho Continuo de Noticias</span>
              </div>
              <span className="text-xs font-sans text-slate-400">
                {displaySecondary.length} reportes clave
              </span>
            </div>

            {/* Stacked Secondary News Cards */}
            {displaySecondary.map((item) => {
              const isMundial = (item.category || '').toLowerCase() === 'mundial';

              return (
                <article
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className="group flex flex-col sm:flex-row lg:flex-col xl:flex-row bg-slate-950/90 rounded-xl overflow-hidden border border-slate-800 hover:border-flame-500/40 transition-all duration-300 shadow-xl hover:shadow-flame-500/10 cursor-pointer flex-1"
                >
                  {/* Thumbnail Container */}
                  <div className="relative sm:w-2/5 lg:w-full xl:w-2/5 aspect-video sm:aspect-auto lg:aspect-video xl:aspect-auto overflow-hidden bg-slate-900 flex-shrink-0 min-h-[140px]">
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Micro-badge */}
                    <div className="absolute top-2.5 left-2.5 pointer-events-none">
                      <span className={`px-2 py-0.5 text-[10px] font-sans font-semibold backdrop-blur-md rounded border ${
                        isMundial 
                          ? 'bg-blue-950/85 text-blue-300 border-blue-500/30' 
                          : 'bg-emerald-950/85 text-emerald-300 border-emerald-500/30'
                      }`}>
                        {isMundial ? 'Global' : 'Nacional'}
                      </span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-sans text-slate-400 mb-2">
                        <Calendar className="w-3 h-3 text-flame-400" />
                        <span>{item.date}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-300 truncate max-w-[130px] font-medium">{item.tag}</span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-white font-heading leading-snug mb-2 group-hover:text-flame-400 transition-colors line-clamp-2">
                        {item.title}
                      </h4>

                      <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed font-sans mb-3">
                        {item.summary || item.content}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/80 text-xs font-sans">
                      <span className="text-flame-400 group-hover:text-flame-300 font-heading font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Leer artículo</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                      {item.source && (
                        <span className="text-[11px] text-slate-500 truncate max-w-[130px]">
                          {item.source}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}

          </div>

        </div>

        {/* BOTTOM NEWSROOM DISPATCH STRIP & CTA */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-flame-500/10 border border-flame-500/20 flex items-center justify-center text-flame-400 flex-shrink-0 hidden sm:flex">
              <Newspaper className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white font-heading">
                Centro de Documentación & Sala de Prensa Completa
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm font-sans mt-0.5">
                Consulte nuestro catálogo de reportes petroleros, notas de campo y análisis de mercado con buscador y filtros por categoría.
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenPressRoom}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-flame-600 via-flame-500 to-orange-500 hover:from-flame-500 hover:to-orange-400 text-white font-heading font-bold text-sm sm:text-base tracking-wide shadow-xl shadow-flame-500/25 hover:shadow-flame-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer group flex-shrink-0 w-full sm:w-auto"
          >
            <span>Saber más • Explorar Sala de Prensa Completa</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default NewsSection;
