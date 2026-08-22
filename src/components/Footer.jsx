import React from 'react';
import { useCms } from '../context/CmsContext';
import { Logo } from './Logo';
import { 
  Phone, Mail, Instagram, Shield, 
  Lock 
} from 'lucide-react';

export const Footer = () => {
  const { companyInfo } = useCms();
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

  return (
    <footer className="relative bg-[#050A14] border-t border-slate-800/60 pt-20 pb-8 overflow-hidden font-sans">
      
      {/* Dynamic Background Glow & Top Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-slate-800/60">
          
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

          {/* Col 3: Bases Operativas */}
          <div className="md:col-span-4 lg:col-span-2 space-y-6">
            <h4 className="text-xs font-black text-white uppercase tracking-widest font-heading flex items-center gap-3">
              Bases
              <div className="h-px bg-slate-800 flex-1" />
            </h4>
            <ul className="space-y-5">
              {[
                { city: 'Maturín', state: 'Monagas (HQ)' },
                { city: 'FPO', state: 'Junín / Carabobo' },
                { city: 'El Tigre', state: 'Anzoátegui' },
                { city: 'Costa Oriental', state: 'Zulia' }
              ].map((loc, idx) => (
                <li key={idx} className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold text-slate-200">{loc.city}</span>
                  <span className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">{loc.state}</span>
                </li>
              ))}
            </ul>
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

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
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
