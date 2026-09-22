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
      className="fixed bottom-6 right-6 z-30 w-11 h-11 sm:w-12 sm:h-12 bg-navy-950/95 hover:bg-navy-850 shadow-luxury border border-slate-700 hover:border-flame-500 text-slate-300 hover:text-flame-400 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 group animate-fadeIn flex items-center justify-center backdrop-blur-md"
    >
      <div className="group-hover:-translate-y-0.5 transition-transform duration-200">
        <ChevronUp className="w-5 h-5" strokeWidth={2.5} />
      </div>
    </button>
  );
};
