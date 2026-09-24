import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { Logo } from './Logo';
import { 
  Phone, Mail, Instagram, Shield, 
  Lock, Eye, Activity, ShieldCheck, Globe2, Radio
} from 'lucide-react';

export const Footer = () => {
  const { companyInfo, visitStats } = useCms();
  const currentYear = new Date().getFullYear();

  // Ensure default values are used if companyInfo is empty or missing fields
  const defaults = {
    name: 'CYSOS ENERGY, C.A.',
    rif: 'J-40031863-7',
    address: 'Av. Alirio Ugarte Pelayo, Complejo CCP, Centro Médico Norte, piso 1. Oficina 01-18 Maturín, Edo. Monagas',
    phone1: '0412-9486249',
    email1: 'gerencia@cysosenergy.com',
    email2: 'OPERACIONES@CYSOS.ENERGY'
  };

  const safeInfo = { ...defaults };
  if (companyInfo) {
    Object.keys(companyInfo).forEach(key => {
      if (companyInfo[key]) safeInfo[key] = companyInfo[key];
    });
  }
  if (safeInfo.rif === 'J-50478054-4' || safeInfo.rif === 'J-50346383-1' || !safeInfo.rif) {
    safeInfo.rif = 'J-40031863-7';
  }

  // Animate the visit count from 0 to target
  const targetVisitsCount = Number(visitStats?.totalVisits || 1);
  const [animatedVisits, setAnimatedVisits] = useState(0);

  useEffect(() => {
    if (targetVisitsCount <= 0) return;
    
    let startTime = null;
    const duration = 2500; // 2.5 seconds professional roll-up
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // EaseOutExpo function for a realistic slowing-down effect at the end
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setAnimatedVisits(Math.floor(easeOut * targetVisitsCount));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetVisitsCount]);

  // Format real visit count into 6 individual digital digits
  const formattedDigits = String(animatedVisits).padStart(6, '0').split('');

  return (
    <footer className="relative bg-navy-950 border-t border-slate-900 pt-16 pb-24 font-sans mt-12">
      
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-flame-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Main Section: 2 Clean Areas */}
        <div className="flex flex-col md:flex-row justify-between gap-12 lg:gap-16 pb-12 border-b border-slate-800/50">
          
          {/* Brand & Identity */}
          <div className="space-y-6 max-w-sm">
            <Logo className="h-12 w-auto" />
            <p className="text-sm text-slate-400 font-light leading-relaxed pr-4">
              Ingeniería, procura, construcción y servicios petroleros especializados en optimización reológica EOR y logística pesada.
            </p>
            <div className="flex flex-col gap-2 text-xs text-slate-500 font-medium tracking-wide">
              <span>RIF: {safeInfo.rif}</span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-flame-500/70" />
                Normas ISO 9001 & SI-HO-S
              </span>
            </div>
          </div>

          {/* Minimal Links */}
          <div className="space-y-6 md:min-w-[250px]">
            <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] font-heading">
              Accesos Rápidos
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Química de Producción EOR', href: '#servicios' },
                { label: 'Intervención de Pozos & Flush By', href: '#servicios' },
                { label: 'Logística Pesada & Grúas', href: '#servicios' },
                { label: 'Galería de Operaciones', href: '#operaciones' },
                { label: 'Subir al Inicio', href: '#hero' }
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-flame-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-8 pb-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <p className="text-xs text-slate-400 font-medium tracking-wide">
            © {currentYear} <span className="text-white font-bold uppercase tracking-widest">CYSOS ENERGY, C.A.</span>
          </p>
          
          {/* Ultra-subtle Visitor Counter */}
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono tracking-[0.2em] uppercase">
            <Activity className="w-4 h-4 text-flame-500" />
            <span>Visitas:</span>
            <span className="text-white font-bold">{String(animatedVisits).padStart(6, '0')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
