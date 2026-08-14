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
      className="fixed bottom-6 right-6 z-50 p-3.5 rounded-2xl bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 hover:from-flame-600 hover:to-gold-700 text-white shadow-flame-glow border border-gold-metallic/40 transition-all duration-300 transform hover:scale-110 active:scale-95 group flex items-center justify-center animate-fadeIn"
    >
      <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
    </button>
  );
};
