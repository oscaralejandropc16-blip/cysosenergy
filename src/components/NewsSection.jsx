import React from 'react';
import { useCms } from '../context/CmsContext';
import { Calendar, Tag, Play } from 'lucide-react';

export const NewsSection = () => {
  const { news } = useCms();

  if (!news || news.length === 0) return null;

  return (
    <section id="noticias" className="py-20 bg-navy-900 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 text-xs font-black uppercase tracking-widest">
            Actualidad
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-heading tracking-tight">
            Noticias & <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-flame-500">Operaciones</span>
          </h2>
          <p className="text-slate-400">
            Mantente al día con nuestros últimos proyectos, tecnologías implementadas y logros en el campo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <article key={item.id} className="group flex flex-col bg-navy-950 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-colors shadow-lg">
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                {item.mediaType === 'video' ? (
                  <>
                    <video 
                      src={item.mediaUrl} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      muted loop playsInline autoPlay
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur border border-white/20 flex items-center justify-center">
                        <Play className="w-5 h-5 text-white ml-1" />
                      </div>
                    </div>
                  </>
                ) : (
                  <img 
                    src={item.mediaUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-bold bg-black/60 backdrop-blur border border-white/10 rounded-full text-white flex items-center gap-1.5">
                    <Tag className="w-3 h-3 text-gold-400" />
                    {item.tag}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  {item.date}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">
                  {item.content}
                </p>
                <div className="mt-auto">
                  <button className="text-gold-400 font-bold text-sm hover:text-gold-300 transition-colors flex items-center gap-2">
                    Leer más <span className="text-lg leading-none">&rsaquo;</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
