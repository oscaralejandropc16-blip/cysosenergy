import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { Logo } from './Logo';
import { 
  Calendar, Tag, Globe, ArrowLeft, Share2, ExternalLink, 
  ChevronRight, Newspaper, Check, Copy, BookOpen, ShieldCheck 
} from 'lucide-react';

export const ArticleDetailPage = ({ articleId, onReturnToPressRoom, onReturnToHome, onOpenArticle, onOpenDossier }) => {
  const { news = [] } = useCms();
  const [copied, setCopied] = useState(false);

  // Scroll to top whenever article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [articleId]);

  // Find the current article
  const article = news.find((item) => item.id === articleId) || news[0];

  if (!article) {
    return (
      <div className="min-h-screen bg-navy-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Artículo no encontrado</h2>
        <button
          onClick={onReturnToPressRoom}
          className="px-6 py-3 rounded-lg bg-gold-500 text-slate-950 font-bold"
        >
          Volver a Sala de Prensa
        </button>
      </div>
    );
  }

  const isMundial = (article.category || '').toLowerCase() === 'mundial';

  // Related articles (excluding current)
  const relatedArticles = news.filter((item) => item.id !== article.id).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`*${article.title}*\n\nLee el reporte en CYSOS ENERGY:\n${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 font-sans selection:bg-flame-500 selection:text-white flex flex-col">
      {/* Top Corporate Navigation Bar */}
      <header className="sticky top-0 z-40 bg-navy-950/95 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={onReturnToPressRoom}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-400/40 text-slate-300 hover:text-gold-300 font-semibold text-xs sm:text-sm transition-all duration-200 group cursor-pointer"
              aria-label="Volver a Sala de Prensa"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden xs:inline">Volver a </span>Sala de Prensa
            </button>

            <button
              onClick={onReturnToHome}
              className="hidden md:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <span>Inicio</span>
            </button>

            <div className="hidden sm:block h-6 w-px bg-slate-800" />

            <div className="cursor-pointer" onClick={onReturnToHome}>
              <Logo isDark={true} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-heading font-bold">
              <span className="w-1.5 h-1.5 rounded-sm bg-emerald-400 animate-pulse" />
              REPORTE VERIFICADO
            </span>

            {onOpenDossier && (
              <button
                onClick={onOpenDossier}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-flame-500 to-orange-600 text-white font-bold text-xs hover:brightness-110 shadow-flame-glow transition-all font-heading"
              >
                Dossier 2026
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Article Container */}
      <main className="flex-grow py-10 sm:py-16 relative">
        {/* Ambient subtle glow */}
        <div className="absolute top-20 left-1/3 w-[600px] h-[500px] bg-energy-cyan/5 rounded-3xl blur-[160px] pointer-events-none" />

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-sans font-medium text-slate-400 flex-wrap">
            <button onClick={onReturnToHome} className="hover:text-energy-sky transition-colors">
              Inicio
            </button>
            <span>/</span>
            <button onClick={onReturnToPressRoom} className="hover:text-energy-sky transition-colors">
              Sala de Prensa
            </button>
            <span>/</span>
            <span className="text-flame-400 truncate max-w-[240px] sm:max-w-xs">{article.tag}</span>
          </nav>

          {/* Meta Badges Header */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-2.5 py-1 rounded text-xs font-sans font-semibold bg-slate-900/90 border border-slate-700 text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-flame-400" />
              {article.tag}
            </span>

            <span className={`px-2.5 py-1 rounded text-xs font-sans font-semibold uppercase tracking-wider border ${
              isMundial 
                ? 'bg-blue-950/80 text-blue-300 border-blue-500/40' 
                : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
            }`}>
              {isMundial ? '🌍 Mercado Mundial & OPEP+' : '🇻🇪 Sector Petrolero Venezuela'}
            </span>

            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans ml-auto">
              <Calendar className="w-3.5 h-3.5 text-flame-400" />
              <span>{article.date}</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Source Attribution Strip */}
          {article.source && (
            <div className="flex items-center justify-between py-3 border-y border-slate-800 text-xs text-slate-400 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Compilación y Fuente Oficial:</span>
                <span className="font-semibold text-slate-200 font-sans">{article.source}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                  title="Compartir por WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                  title="Copiar enlace"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado' : 'Copiar link'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Featured Editorial Photo */}
          <div className="relative aspect-video sm:aspect-[21/10] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
            <img 
              src={article.mediaUrl} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60" />
          </div>

          {/* Executive Summary Lead */}
          {article.summary && (
            <div className="p-6 sm:p-8 rounded-xl bg-navy-900/80 border-l-4 border-gold-400 border border-slate-800 shadow-xl">
              <p className="text-base sm:text-xl font-medium text-slate-100 leading-relaxed font-sans">
                {article.summary}
              </p>
            </div>
          )}

          {/* Article Full Body */}
          <div className="text-slate-300 text-base sm:text-lg leading-relaxed space-y-6 pt-2 font-sans font-light">
            <p>{article.content}</p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed border-t border-slate-800 pt-6">
              Este reporte forma parte del monitoreo continuo de inteligencia energética desarrollado por <strong>CYSOS ENERGY, C.A.</strong> con el propósito de respaldar la toma de decisiones operativas y estratégicas en proyectos de reacondicionamiento de pozos, inyección de fluidizantes químicos y soporte logístico en la industria petrolera nacional e internacional.
            </p>
          </div>

          {/* Article Action Footer */}
          <div className="py-8 border-y border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleShareWhatsApp}
                className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartir noticia</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-2 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Enlace copiado' : 'Copiar enlace'}</span>
              </button>
            </div>

            <button
              onClick={onReturnToPressRoom}
              className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-gold-400 hover:text-gold-300 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ver todas las noticias en Sala de Prensa</span>
            </button>
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="pt-10 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-black text-white font-heading tracking-tight">
                  Otras Noticias de la Sala de Prensa
                </h3>
                <button
                  onClick={onReturnToPressRoom}
                  className="text-xs font-bold text-gold-400 hover:underline flex items-center gap-1"
                >
                  <span>Ver archivo completo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onOpenArticle(item.id)}
                    className="group bg-navy-900/60 rounded-xl overflow-hidden border border-slate-800 hover:border-energy-cyan/40 transition-all duration-300 cursor-pointer flex flex-col"
                  >
                    <div className="relative aspect-video overflow-hidden bg-slate-900">
                      <img 
                        src={item.mediaUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-0.5 rounded text-[9px] font-heading font-bold bg-navy-950/90 text-energy-sky border border-white/10">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <span className="text-[10px] font-sans text-slate-400 mb-1">{item.date}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-energy-sky transition-colors line-clamp-2 leading-snug mb-3 font-heading">
                        {item.title}
                      </h4>
                      <span className="mt-auto text-[11px] font-bold text-energy-sky flex items-center gap-1 group-hover:translate-x-1 transition-transform font-heading">
                        <span>Leer artículo</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Commercial Inquiry Banner */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-950 border border-energy-sky/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-white font-heading">
                ¿Requiere soluciones técnicas en estas cuencas?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-light">
                CYSOS ENERGY cuenta con skids automatizados de inyección continua, reductor permanente de viscosidad y cuadrillas certificadas para despliegue inmediato.
              </p>
            </div>
            <button
              onClick={onReturnToHome}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-flame-500 to-orange-600 text-white font-bold text-sm hover:brightness-110 shadow-flame-glow transition-all flex-shrink-0 cursor-pointer font-heading"
            >
              Contactar a CYSOS ENERGY
            </button>
          </div>

        </article>
      </main>

      {/* Footer */}
      <footer className="bg-navy-950 border-t border-slate-800 py-8 text-center text-xs text-slate-400 font-sans">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 CYSOS ENERGY, C.A. — RIF: J-40031863-7. Sala de Prensa Oficial.</p>
        </div>
      </footer>
    </div>
  );
};

export default ArticleDetailPage;
