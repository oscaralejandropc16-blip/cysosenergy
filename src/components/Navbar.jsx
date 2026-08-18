import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, PhoneCall, ChevronRight } from 'lucide-react';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: '12px 16px',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          backgroundColor: '#0A1220',
          border: '1px solid rgba(212,175,55,0.45)',
          borderRadius: '16px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.95)',
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a href="#inicio" style={{ flexShrink: 0 }}>
          <Logo isDark={true} />
        </a>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: '#CBD5E1',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: 'Outfit, system-ui, sans-serif',
                padding: '6px 12px',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'color 0.2s, background 0.2s',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#CBD5E1';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:block">
          <a
            href="#contacto"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 20px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #F97316, #EA580C)',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 800,
              fontFamily: 'Outfit, system-ui, sans-serif',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(249,115,22,0.4)',
              letterSpacing: '0.03em',
            }}
          >
            <PhoneCall style={{ width: '14px', height: '14px' }} />
            <span>Solicitar Cotización</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              padding: '8px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#E2E8F0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? <X style={{ width: '20px', height: '20px' }} /> : <Menu style={{ width: '20px', height: '20px' }} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div
          style={{
            maxWidth: '1280px',
            margin: '8px auto 0',
            backgroundColor: '#0A1220',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '16px',
            padding: '12px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.9)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '10px',
                color: '#CBD5E1',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: 'Outfit, system-ui, sans-serif',
                textDecoration: 'none',
                marginBottom: '2px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#CBD5E1';
              }}
            >
              <span>{link.name}</span>
              <ChevronRight style={{ width: '14px', height: '14px', color: '#64748B' }} />
            </a>
          ))}

          <a
            href="#contacto"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '8px',
              padding: '11px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #F97316, #EA580C)',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 800,
              fontFamily: 'Outfit, system-ui, sans-serif',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(249,115,22,0.35)',
            }}
          >
            <PhoneCall style={{ width: '14px', height: '14px' }} />
            <span>Solicitar Cotización Técnica</span>
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
