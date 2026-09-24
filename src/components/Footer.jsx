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
    <footer className="relative bg-navy-950 border-t border-slate-800/80 pt-20 pb-10 overflow-hidden font-sans mt-12">
      
      {/* Dynamic Background Glow & Top Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-flame-500/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-flame-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-12 border-b border-slate-800/60">
          
          {/* Col 1: Corporate Branding */}
          <div className="md:col-span-12 lg:col-span-4 space-y-6">
            <div className="flex flex-col items-start gap-4">
              <Logo className="h-14 w-auto" />
              {/* RIF without Pill */}
              <div className="flex items-center gap-2 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-flame-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest font-heading">
                  RIF: {safeInfo.rif}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed font-light pr-4">
              Empresa venezolana de ingeniería, procura, construcción y servicios petroleros especializados en optimización reológica EOR, estimulación de pozos y logística pesada de izamiento.
            </p>

            {/* ISO without Pill */}
            <div className="flex items-center gap-2 text-slate-400">
              <Shield className="w-4 h-4 text-flame-500" />
              <span className="text-xs font-bold uppercase tracking-widest font-heading">
                Normas ISO 9001 & SI-HO-S
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links / Divisions */}
          <div className="md:col-span-4 lg:col-span-3 space-y-6 pt-2">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] font-heading flex items-center gap-3">
              Divisiones
              <div className="h-px bg-slate-800 flex-1" />
            </h4>
            <ul className="space-y-4">
              {[
                { label: 'Química de Producción EOR', href: '#servicios' },
                { label: 'Intervención de Pozos & Flush By', href: '#servicios' },
                { label: 'Logística Pesada & Grúas', href: '#servicios' },
                { label: 'Ingeniería & Procura API', href: '#servicios' },
                { label: 'Calculadora Reológica', href: '#calculadora' },
                { label: 'Galería de Operaciones', href: '#operaciones' }
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="group flex items-center gap-3 text-sm text-slate-400 hover:text-flame-400 transition-all">
                    <div className="w-1.5 h-1.5 rounded-sm bg-slate-700 group-hover:bg-flame-500 group-hover:scale-125 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Ubicación Única */}
          <div className="md:col-span-4 lg:col-span-2 space-y-6 pt-2">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] font-heading flex items-center gap-3">
              Sede Central
              <div className="h-px bg-slate-800 flex-1" />
            </h4>
            <div className="flex flex-col gap-2">
              <span className="text-flame-500 font-bold text-xs uppercase tracking-widest">Maturín, Edo. Monagas</span>
              <p className="text-slate-400 font-light leading-relaxed text-sm">
                {safeInfo.address}
              </p>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Av.+Alirio+Ugarte+Pelayo,+Complejo+CCP,+Centro+Medico+Norte,+Maturin,+Monagas,+Venezuela"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-flame-400 text-xs font-bold mt-2 group transition-colors uppercase tracking-wider"
              >
                <span>Google Maps</span>
                <Globe2 className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              </a>
            </div>
          </div>

          {/* Col 4: Hotline & Direct Channels */}
          <div className="md:col-span-4 lg:col-span-3 space-y-6 pt-2">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] font-heading flex items-center gap-3">
              Contacto 24/7
              <div className="h-px bg-slate-800 flex-1" />
            </h4>
            
            <div className="flex flex-col gap-5">
              
              <a href={`https://wa.me/${safeInfo.phone1.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" 
                 className="group flex items-start gap-4 transition-all">
                <div className="mt-1 flex-shrink-0 text-slate-500 group-hover:text-flame-500 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Despacho Inmediato</span>
                  <span className="block text-base font-bold text-slate-200 group-hover:text-flame-400 transition-colors font-heading">{safeInfo.phone1}</span>
                </div>
              </a>

              <a href={`mailto:${safeInfo.email1}`} 
                 className="group flex items-start gap-4 transition-all">
                <div className="mt-1 flex-shrink-0 text-slate-500 group-hover:text-flame-500 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Gerencia & RFQ</span>
                  <span className="block text-sm font-bold text-slate-200 group-hover:text-flame-400 transition-colors truncate font-heading">{safeInfo.email1}</span>
                </div>
              </a>
              
              <a href="https://instagram.com/cysosenergy" target="_blank" rel="noopener noreferrer"
                 className="group flex items-start gap-4 transition-all">
                <div className="mt-1 flex-shrink-0 text-slate-500 group-hover:text-flame-500 transition-colors">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Operaciones en Vivo</span>
                  <span className="block text-sm font-bold text-slate-200 group-hover:text-flame-400 transition-colors font-heading">@cysosenergy</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* SIMPLE VISITOR COUNTER - Elegant Redesign */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
          
          {/* Left: Counter Title */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-flame-500 flex-shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-black uppercase tracking-widest font-heading text-white">
                Métricas de Alcance
              </h5>
              <p className="text-[11px] text-slate-400 font-light mt-0.5">
                Visitas orgánicas al portal corporativo
              </p>
            </div>
          </div>

          {/* Right: Digital High-Precision Odometer Digit Reels */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hidden sm:block">
              Total Acumulado:
            </span>
            <div className="flex items-center gap-1">
              {formattedDigits.map((digit, idx) => (
                <div
                  key={idx}
                  className="w-6 h-8 sm:w-7 sm:h-9 rounded-md bg-slate-950 border border-slate-800 flex items-center justify-center text-flame-500 font-mono font-black text-sm sm:text-base shadow-inner relative overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-1/2 h-px bg-slate-800/50 pointer-events-none" />
                  <span className="relative z-10 drop-shadow-[0_0_5px_rgba(234,88,12,0.4)]">
                    {digit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium text-center md:text-left">
            © {currentYear} <span className="text-slate-400 font-bold uppercase tracking-wide font-heading">CYSOS ENERGY, C.A.</span> Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
