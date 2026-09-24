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
        
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950 pointer-events-none" />

        {/* Main Grid: 3 Balanced Columns to prevent wasted space */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800/50 relative z-10">
          
          {/* Brand & Identity */}
          <div className="space-y-4 text-center md:text-left group cursor-default">
            <div className="relative inline-block">
              {/* Glow Behind Logo */}
              <div className="absolute inset-0 bg-flame-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Logo className="h-10 w-auto mx-auto md:mx-0 relative z-10 drop-shadow-md group-hover:drop-shadow-[0_0_15px_rgba(234,88,12,0.3)] transition-all duration-500" />
            </div>
            
            <p className="text-xs text-slate-400 font-light leading-relaxed transition-colors duration-500 group-hover:text-slate-300">
              Ingeniería, procura, construcción y servicios petroleros especializados.
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-3 text-[10px] text-slate-500 font-medium tracking-wide">
              <span className="group-hover:text-flame-400/80 transition-colors duration-300">RIF: {safeInfo.rif}</span>
              <span className="hidden md:block w-1 h-1 rounded-full bg-slate-700" />
              <span className="flex items-center gap-1.5 group-hover:text-slate-400 transition-colors duration-300">
                <Shield className="w-3 h-3 text-flame-500/50 group-hover:text-flame-500 transition-colors duration-500" />
                ISO 9001 & SI-HO-S
              </span>
            </div>
          </div>

          {/* Center: Visitor Counter (Animated Dashboard Style) */}
          <div className="flex flex-col items-center justify-center space-y-3 py-4 md:py-0 group cursor-default relative">
             {/* Hover Ambient Glow */}
             <div className="absolute inset-0 bg-flame-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
             
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-heading flex items-center gap-2 group-hover:text-flame-400 transition-colors duration-500">
               <span className="w-1.5 h-1.5 rounded-full bg-flame-500 animate-[pulse_2s_ease-in-out_infinite] group-hover:scale-150 transition-transform duration-500" />
               Métricas de Visitas
             </span>
             
             <div className="flex items-center gap-1 font-mono text-xl font-black text-flame-400 relative">
               {formattedDigits.map((digit, idx) => (
                 <div 
                   key={idx} 
                   className="relative overflow-hidden bg-slate-900 px-2.5 py-1.5 rounded-md border border-slate-700/50 shadow-inner flex items-center justify-center min-w-[28px] group-hover:border-flame-500/30 transition-colors duration-500"
                 >
                   {/* Digit Shimmer Sweep */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                   <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(234,88,12,0.6)] transition-all duration-300">
                     {digit}
                   </span>
                 </div>
               ))}
             </div>
          </div>

          {/* Right: Minimal Links with Arrow Animations */}
          <div className="space-y-4 text-center md:text-right flex flex-col items-center md:items-end relative z-10">
            <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] font-heading flex items-center gap-2">
              <div className="w-6 h-px bg-flame-500/50 hidden md:block" />
              Accesos Rápidos
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Química de Producción', href: '#servicios' },
                { label: 'Intervención de Pozos', href: '#servicios' },
                { label: 'Logística Pesada', href: '#servicios' },
                { label: 'Galería de Operaciones', href: '#operaciones' },
                { label: 'Subir al Inicio', href: '#hero' },
              ].map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    className="group flex items-center justify-center md:justify-end gap-2 text-xs text-slate-400 hover:text-flame-400 transition-all duration-300"
                  >
                    <span className="w-0 h-px bg-flame-500 transition-all duration-300 group-hover:w-4 hidden md:block" />
                    <span className="group-hover:-translate-x-1 md:group-hover:translate-x-0 transition-transform duration-300">
                      {link.label}
                    </span>
                    <span className="w-0 h-px bg-flame-500 transition-all duration-300 group-hover:w-4 md:hidden" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-6 flex justify-center md:justify-start relative z-10">
          <p className="text-[10px] text-slate-500 font-medium tracking-wide flex items-center gap-2">
            © {currentYear} <span className="text-slate-300 font-bold uppercase hover:text-flame-400 transition-colors cursor-default">CYSOS ENERGY, C.A.</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
