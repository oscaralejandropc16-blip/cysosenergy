import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, PhoneCall, ChevronRight } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Misión & Visión', href: '#mision-vision' },
    { name: 'Operaciones', href: '#operaciones' },
    { name: 'Servicios IPC', href: '#servicios' },
    { name: 'Calculadora EOR', href: '#calculadora' },
    { name: 'Cuencas', href: '#cobertura' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] px-3 sm:px-6 lg:px-8 py-3 sm:py-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl sm:rounded-3xl transition-all duration-300 relative ${
          isScrolled
            ? 'bg-[#080F1E]/95 backdrop-blur-2xl py-2.5 px-5 sm:px-7 border border-amber-500/50 shadow-[0_16px_40px_rgba(0,0,0,0.9)]'
            : 'bg-[#080F1E]/90 backdrop-blur-2xl py-3.5 px-5 sm:px-7 border border-amber-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#inicio" className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <Logo isDark={true} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs xl:text-[13px] font-semibold text-slate-200 hover:text-amber-400 hover:bg-white/5 rounded-xl transition-all duration-200 tracking-wide font-heading"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Primary Action */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="#contacto"
              className="px-5 py-2.5 text-xs font-extrabold text-white rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-[0_4px_16px_rgba(249,115,22,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2 font-heading"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Solicitar Cotización</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 backdrop-blur-md text-slate-200 hover:text-white border border-white/15 transition-colors"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-white/10 flex flex-col space-y-1.5 animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-200 hover:text-amber-400 hover:bg-white/10 rounded-xl flex items-center justify-between transition-colors font-heading"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-xs font-extrabold text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 rounded-xl shadow-md flex items-center justify-center gap-2 font-heading"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Solicitar Cotización Técnica</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
