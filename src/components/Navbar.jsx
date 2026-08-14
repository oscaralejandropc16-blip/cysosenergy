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
    window.addEventListener('scroll', handleScroll);
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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'luxury-glass py-3 px-6 shadow-luxury'
            : 'bg-navy-900/80 backdrop-blur-md py-4 px-6 border border-white/10'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#inicio">
            <Logo isDark={true} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-2 text-xs xl:text-sm font-semibold text-slate-300 hover:text-gold-400 hover:bg-white/5 rounded-xl transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Primary Action */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="#contacto"
              className="px-5 py-2.5 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-flame-500 to-gold-600 hover:from-flame-600 hover:to-gold-700 shadow-flame-glow transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Solicitar Cotización</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-navy-800 text-slate-300 hover:text-white border border-slate-700"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-slate-800 flex flex-col space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-gold-400 hover:bg-white/5 rounded-xl flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 text-center text-xs font-bold text-white bg-gradient-to-r from-flame-500 to-gold-600 rounded-xl shadow-flame-glow flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Solicitar Cotización Técnica</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
