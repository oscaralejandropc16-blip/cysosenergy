import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Logo } from './Logo';
import { PhoneCall, ChevronRight, Send, Instagram, Linkedin } from 'lucide-react';

const WhatsAppIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Misión', href: '#mision-vision' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Simulador EOR', href: '#calculadora' },
    { name: 'Cuencas', href: '#cobertura' },
    { name: 'HSE', href: '#hse' },
    { name: 'Sala de Prensa', href: '#sala-de-prensa' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const navbar = (
    <div
      className="cysos-nav-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        zIndex: 50,
        padding: '20px 16px 14px 16px',
        boxSizing: 'border-box',
        pointerEvents: 'none',
      }}
    >
      {/* Barra principal flotante - Luminous Sapphire Glass */}
      <div
        className="cysos-nav-bar"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          background: 'rgba(14, 36, 66, 0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(56, 189, 248, 0.22)',
          borderRadius: '14px',
          boxShadow: '0 20px 45px -10px rgba(10, 25, 47, 0.75), 0 0 25px rgba(14, 165, 233, 0.1)',
          padding: '8px 12px 8px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          pointerEvents: 'auto',
          position: 'relative',
          zIndex: 50,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: scrolled ? 'translateY(-4px)' : 'translateY(0)',
          opacity: scrolled ? 0.96 : 1,
        }}
      >
        {/* Logo */}
        <a
          href="#inicio"
          style={{ textDecoration: 'none', flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <Logo isDark={true} />
        </a>

        {/* Links desktop */}
        <nav
          className="cysos-nav-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="cysos-link"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Redes Sociales - Desktop */}
          <div className="cysos-social-desktop" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '4px' }}>
            <a href="https://instagram.com/cysosenergy" target="_blank" rel="noreferrer" className="cysos-social-icon" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://linkedin.com/company/cysosenergy" target="_blank" rel="noreferrer" className="cysos-social-icon" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://wa.me/584129486249" target="_blank" rel="noreferrer" className="cysos-social-icon" aria-label="WhatsApp">
              <WhatsAppIcon size={18} />
            </a>
          </div>

          {/* Teléfono - solo desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+584129486249"
              className="cysos-tel"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'rgba(255,255,255,0.9)',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                transition: 'all 0.3s ease',
              }}
            >
              <div className="cysos-pulse-dot"></div>
              <span>0412-9486249</span>
            </a>
          </div>

          {/* CTA Button */}
          <a
            href="#contacto"
            className="cysos-cta btn-modern"
          >
            <Send size={16} className="btn-icon" />
            <span>Cotizar Proyecto</span>
          </a>

          {/* Hamburguesa móvil */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="cysos-hamburger"
            aria-label="Menú de navegación"
            style={{
              background: isMobileMenuOpen ? 'rgba(255,255,255,0.1)' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              width: '44px',
              height: '44px',
              cursor: 'pointer',
              display: 'none', // oculto en desktop
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ position: 'relative', width: '20px', height: '20px' }}>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'open-1' : ''}`} style={{ top: '4px' }}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'open-2' : ''}`} style={{ top: '14px' }}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Menú móvil Full Screen */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'rgba(2, 6, 23, 0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          padding: '110px 20px 30px',
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
          opacity: isMobileMenuOpen ? 1 : 0,
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          touchAction: 'none',
          overscrollBehavior: 'contain',
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-link"
              style={{
                transitionDelay: `${isMobileMenuOpen ? i * 0.05 : 0}s`
              }}
            >
              <span className="mobile-link-text">{link.name}</span>
              <ChevronRight size={20} className="mobile-link-icon" />
            </a>
          ))}
        </div>

        <div className="mobile-menu-footer" style={{ transitionDelay: '0.3s' }}>
          {/* Redes Sociales Móvil */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            <a href="https://instagram.com/cysosenergy" target="_blank" rel="noreferrer" className="mobile-social-icon">
              <Instagram size={24} />
            </a>
            <a href="https://linkedin.com/company/cysosenergy" target="_blank" rel="noreferrer" className="mobile-social-icon">
              <Linkedin size={24} />
            </a>
            <a href="https://wa.me/584129486249" target="_blank" rel="noreferrer" className="mobile-social-icon">
              <WhatsAppIcon size={24} />
            </a>
          </div>
          {/* Mobile Footer */}
          <div className="p-6 border-t border-slate-800 bg-black/50 space-y-4">
            <div className="flex items-center gap-3 text-flame-500 font-bold text-sm">
              <PhoneCall className="w-4 h-4" />
              <span>0412-9486249</span>
            </div>
            <a href="#contacto" className="w-full btn-modern flex justify-center py-3" onClick={() => setIsMobileMenuOpen(false)}>
              Cotizar Proyecto
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .cysos-link {
          position: relative;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          font-family: 'Outfit', sans-serif;
          padding: 8px 16px;
          border-radius: 6px;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .cysos-link::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }
        .cysos-link:hover {
          color: #fff;
        }
        .cysos-link:hover::before {
          opacity: 1;
          transform: scale(1);
        }

        .cysos-pulse-dot {
          width: 8px;
          height: 8px;
          background-color: #f97316;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7);
          animation: pulse-ring 2s infinite cubic-bezier(0.66, 0, 0, 1);
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(249, 115, 22, 0); }
          100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
        }

        .cysos-tel:hover {
          color: #f97316 !important;
        }

        .cysos-social-icon {
          color: rgba(255,255,255,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cysos-social-icon:hover {
          color: #f97316;
          background: rgba(249, 115, 22, 0.12);
          border-color: rgba(249, 115, 22, 0.4);
          transform: translateY(-2px);
        }

        .mobile-social-icon {
          color: rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          transition: all 0.3s ease;
        }
        .mobile-social-icon:hover {
          color: #f97316;
          background: rgba(249, 115, 22, 0.15);
          transform: scale(1.05);
        }

        .btn-modern {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%);
          color: #ffffff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          padding: 10px 22px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Outfit', sans-serif;
          box-shadow: 0 10px 20px -10px rgba(249, 115, 22, 0.5);
          position: relative;
          overflow: hidden;
        }
        .btn-modern::after {
          content: '';
          position: absolute;
          top: -50%; left: -50%; width: 200%; height: 200%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
          transform: rotate(45deg) translateX(-100%);
          transition: all 0.6s ease;
        }
        .btn-modern:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 25px -10px rgba(249, 115, 22, 0.65);
        }
        .btn-modern:hover::after {
          transform: rotate(45deg) translateX(100%);
        }
        .btn-icon {
          transition: transform 0.3s ease;
        }
        .btn-modern:hover .btn-icon {
          transform: rotate(15deg) scale(1.1);
        }

        .hamburger-line {
          position: absolute;
          left: 0;
          width: 20px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hamburger-line.open-1 {
          transform: rotate(45deg);
          top: 9px !important;
        }
        .hamburger-line.open-2 {
          transform: rotate(-45deg);
          top: 9px !important;
        }

        .mobile-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-size: 20px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          border-radius: 16px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          transform: translateX(-20px);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-menu-overlay.open .mobile-link {
          transform: translateX(0);
          opacity: 1;
        }
        .mobile-link:hover {
          background: rgba(251, 191, 36, 0.1);
          border-color: rgba(251, 191, 36, 0.2);
          color: #fff;
        }
        .mobile-link-icon {
          color: rgba(255,255,255,0.3);
          transition: all 0.3s ease;
        }
        .mobile-link:hover .mobile-link-icon {
          color: #fbbf24;
          transform: translateX(4px);
        }

        .mobile-menu-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-menu-overlay.open .mobile-menu-footer {
          transform: translateY(0);
          opacity: 1;
        }

        .mobile-tel-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          color: rgba(255,255,255,0.9);
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
        }
        .mobile-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          background: linear-gradient(135deg, #f97316, #ea580c);
          border-radius: 16px;
          color: #fff;
          text-decoration: none;
          font-size: 16px;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
          box-shadow: 0 10px 20px -10px rgba(249, 115, 22, 0.5);
        }

        @media (min-width: 1024px) {
          .cysos-nav-desktop { display: flex !important; }
          .cysos-hamburger   { display: none !important; }
          .cysos-cta         { display: flex !important; }
          .cysos-tel         { display: flex !important; }
        }
        @media (max-width: 1279px) and (min-width: 1024px) {
          .cysos-tel { display: none !important; }
        }
        @media (max-width: 1023px) {
          .cysos-nav-desktop { display: none !important; }
          .cysos-social-desktop { display: none !important; }
          .cysos-hamburger   { display: flex !important; }
          .cysos-cta         { display: none !important; }
          .cysos-tel         { display: none !important; }
        }
      `}</style>
    </div>
  );

  return navbar;
};

export default Navbar;
