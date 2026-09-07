import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-slate-700 via-black to-[#050505] shadow-[0_0_20px_rgba(251,191,36,0.3)] border-2 border-gold-500/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:border-gold-400 active:scale-95 group animate-fadeIn flex items-center justify-center overflow-hidden -rotate-45 rounded-[50%_0_50%_50%]"
    >
      {/* Petroleum Gloss Effect (Brighter) */}
      <div className="absolute inset-0 bg-gradient-to-bl from-white/40 via-white/5 to-transparent opacity-100" />
      
      {/* Icon Container (Counter-rotate) */}
      <div className="relative flex items-center justify-center w-full h-full text-gold-400 group-hover:text-white transition-colors duration-300 rotate-45">
        <div className="group-hover:-translate-y-1 transition-transform duration-300">
          <ChevronUp className="w-6 h-6" strokeWidth={3} />
        </div>
      </div>
    </button>
  );
};
