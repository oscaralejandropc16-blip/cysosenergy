import React from 'react';
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

  // Format real visit count into 6 individual digital digits (e.g., 0 0 0 0 0 1)
  const totalVisitsCount = Number(visitStats?.totalVisits || 1);
  const formattedDigits = String(totalVisitsCount).padStart(6, '0').split('');

  return (
    <footer className="relative bg-[#03060E] border-t border-slate-800/80 pt-20 pb-10 overflow-hidden font-sans">
      
      {/* Dynamic Background Glow & Top Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-12 border-b border-slate-800/60">
          
          {/* Col 1: Corporate Branding & RIF */}
          <div className="md:col-span-12 lg:col-span-4 space-y-6">
            <div className="flex flex-col items-start gap-5">
              <Logo className="h-16 w-auto" />
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 shadow-[0_0_15px_rgba(250,204,21,0.05)]">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                <span className="text-[11px] text-gold-400 font-bold uppercase tracking-widest font-heading">
                  RIF: {safeInfo.rif}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed font-light pr-4">
              Empresa venezolana de ingeniería, procura, construcción y servicios petroleros especializados en optimización reológica EOR, estimulación de pozos y logística pesada de izamiento.
            </p>

            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-navy-900/40 border border-emerald-500/20">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-widest font-heading">
                Normas ISO 9001 & SI-HO-S
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links / Divisions */}
          <div className="md:col-span-4 lg:col-span-3 space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-widest font-heading flex items-center gap-3">
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
                  <a href={link.href} className="group flex items-center gap-3 text-sm text-slate-400 hover:text-gold-400 transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-gold-400 group-hover:scale-125 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Ubicación Única */}
          <div className="md:col-span-4 lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest font-heading flex items-center gap-3">
              Ubicación Única
              <div className="h-px bg-slate-800 flex-1" />
            </h4>
            <div className="flex flex-col gap-1.5 text-xs">
              <span className="text-sm font-bold text-white">Sede Central</span>
              <span className="text-gold-400 font-bold text-[11px] uppercase tracking-wide">Maturín, Edo. Monagas</span>
              <p className="text-slate-400 font-light leading-relaxed text-[11px]">
                {safeInfo.address}
              </p>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Av.+Alirio+Ugarte+Pelayo,+Complejo+CCP,+Centro+Medico+Norte,+Maturin,+Monagas,+Venezuela"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-[11px] font-bold mt-1 group"
              >
                <span>Ver en Google Maps</span>
                <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
            </div>
          </div>

          {/* Col 4: Hotline & Direct Channels */}
          <div className="md:col-span-4 lg:col-span-3 space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-widest font-heading flex items-center gap-3">
              Contacto 24/7
              <div className="h-px bg-slate-800 flex-1" />
            </h4>
            
            <div className="flex flex-col gap-2">
              <a href={`https://wa.me/${safeInfo.phone1.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" 
                 className="group flex items-center gap-4 p-3 -ml-3 rounded-2xl hover:bg-emerald-500/5 transition-colors border border-transparent hover:border-emerald-500/20">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Despacho Inmediato</span>
                  <span className="block text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{safeInfo.phone1}</span>
                </div>
              </a>

              <a href={`mailto:${safeInfo.email1}`} 
                 className="group flex items-center gap-4 p-3 -ml-3 rounded-2xl hover:bg-gold-400/5 transition-colors border border-transparent hover:border-gold-400/20">
                <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:bg-gold-400/20 transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Gerencia & RFQ</span>
                  <span className="block text-sm font-bold text-slate-200 group-hover:text-gold-400 transition-colors truncate">{safeInfo.email1}</span>
                </div>
              </a>
              
              <a href="https://instagram.com/cysosenergy" target="_blank" rel="noopener noreferrer"
                 className="group flex items-center gap-4 p-3 -ml-3 rounded-2xl hover:bg-flame-500/5 transition-colors border border-transparent hover:border-flame-500/20">
                <div className="w-10 h-10 rounded-full bg-flame-500/10 flex items-center justify-center text-flame-400 group-hover:scale-110 group-hover:bg-flame-500/20 transition-all">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Operaciones en Vivo</span>
                  <span className="block text-sm font-bold text-slate-200 group-hover:text-flame-400 transition-colors">@cysosenergy</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* EXECUTIVE TELEMETRY & REAL-TIME VISITS POD */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-navy-950/90 via-slate-900/70 to-navy-950/90 border border-slate-800/90 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden group hover:border-gold-500/30 transition-all duration-300">
          
          {/* Subtle Cyber Grid & Ambient Gradient Accent */}
          <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-32 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left: Counter Title & Live Status */}
            <div className="flex items-center gap-4 text-left w-full lg:w-auto">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-500/10 via-amber-500/20 to-flame-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shadow-[0_0_20px_rgba(245,158,11,0.15)] flex-shrink-0">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black uppercase tracking-wider font-heading text-white">
                    Tráfico Corporativo en Vivo
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    En Línea
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-light">
                  Monitoreo de accesos y sesiones activas verificadas en la plataforma
                </p>
              </div>
            </div>

            {/* Center: Digital High-Precision Odometer Digit Reels */}
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-black/60 p-2.5 sm:px-4 sm:py-2.5 rounded-2xl border border-slate-800/80 shadow-inner w-full lg:w-auto justify-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-heading flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-gold-400" />
                <span>Visitas Reales:</span>
              </span>

              {/* Monospace Hardware Digit Display */}
              <div className="flex items-center gap-1">
                {formattedDigits.map((digit, idx) => (
                  <div
                    key={idx}
                    className="w-7 h-9 sm:w-8 sm:h-10 rounded-lg bg-gradient-to-b from-slate-900 via-navy-950 to-black border border-slate-700/80 flex items-center justify-center text-white font-mono font-black text-sm sm:text-base shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_2px_6px_rgba(0,0,0,0.8)] text-gold-300 relative overflow-hidden"
                  >
                    {/* Digit Divider Line */}
                    <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/40 pointer-events-none" />
                    <span className="relative z-10 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                      {digit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Security & Reliability Badge */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-start lg:justify-end text-xs text-slate-400">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-slate-200 font-bold text-[11px]">Conexión Segura TLS</span>
                <span className="block text-[10px] text-slate-500">Cloud Sync 24/7</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate-500 font-medium text-center md:text-left">
            © {currentYear} <span className="text-slate-300 font-bold">CYSOS ENERGY, C.A.</span> Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-6">
            <a href="#cysos-panel" className="group flex items-center gap-2 text-[11px] font-bold text-slate-500 hover:text-gold-400 transition-colors uppercase tracking-widest">
              <Lock className="w-3.5 h-3.5" />
              <span>Portal Empleados</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
