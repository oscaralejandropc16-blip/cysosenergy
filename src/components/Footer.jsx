import React from 'react';
import { Logo } from './Logo';
import { Mail, Phone, MapPin, Instagram, ShieldCheck, ExternalLink, ArrowUp, ChevronRight } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 text-slate-400 relative border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      
      {/* Subtle Ambient Light (Static & Soft) */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-gold-metallic/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Main 4-Column Clean Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/70">
          
          {/* Col 1 (4 cols): Company Identity & RIF */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#inicio" className="inline-block transition-transform hover:scale-102">
              <Logo isDark={true} />
            </a>
            
            <p className="text-xs text-slate-400 leading-relaxed font-light max-w-sm">
              Soluciones integrales en ingeniería IPC, procura internacional, logística pesada, intervención de pozos y química de producción petrolera en Venezuela.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-900 border border-slate-800 text-[11px] text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Normativas ISO 9001 & Seguridad SI-HO-S</span>
            </div>

            <div className="text-[11px] text-slate-500 font-mono">
              RIF: J-50478054-4 • Maturín, Venezuela
            </div>
          </div>

          {/* Col 2 (2 cols): Clean Navigation */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { name: 'Inicio', href: '#inicio' },
                { name: 'Misión & Visión', href: '#mision-vision' },
                { name: 'Operaciones de Campo', href: '#operaciones' },
                { name: 'Portafolio de Servicios', href: '#servicios' },
                { name: 'Calculadora EOR', href: '#calculadora' },
                { name: 'Cuencas Petroleras', href: '#cobertura' },
                { name: 'Contacto & Cotización', href: '#contacto' }
              ].map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item.href} 
                    className="text-slate-400 hover:text-gold-400 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 (3 cols): Clean Services List */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Divisiones IPC
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { title: 'Química de Producción EOR', desc: 'Reductores permanentes y desmulsificantes' },
                { title: 'Well Testing & Aforo de Flujo', desc: 'Medición de presión y temperatura' },
                { title: 'Workover & Flush By 24/7', desc: 'Mantenimiento y estimulación sin taladro' },
                { title: 'Izamiento Pesado 110 Ton', desc: 'Grúas telescópicas y cisternas' },
                { title: 'Procura Internacional USA', desc: 'Tuberías ERW/RTP y válvulas API' }
              ].map((srv, idx) => (
                <li key={idx} className="space-y-0.5">
                  <span className="text-slate-200 font-semibold block">{srv.title}</span>
                  <span className="text-[11px] text-slate-500 font-light block">{srv.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 (3 cols): HQ & Contact Channels */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Sede Principal & Contacto
            </h4>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-flame-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  C.C. Terrazas del Norte II, Maturín, Edo. Monagas, Venezuela.
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-400">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="tel:+584140596012" className="text-slate-200 hover:text-gold-400 transition-colors font-medium">
                  0414-0596012 / 0412-4817113
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-400">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="mailto:MANAGER@CYSOS.ENERGY" className="text-gold-400 hover:underline font-mono font-medium">
                  MANAGER@CYSOS.ENERGY
                </a>
              </div>

              {/* Sleek Instagram Channel Link */}
              <div className="pt-2">
                <a
                  href="https://instagram.com/cysosenergy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-navy-900 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:border-flame-500 transition-all"
                >
                  <Instagram className="w-4 h-4 text-flame-500" />
                  <span>@cysosenergy</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-light">
          <p>© {new Date().getFullYear()} CYSOS ENERGY, C.A. Todos los derechos reservados.</p>
          
          <div className="flex items-center gap-6">
            <span>Venezuela • Faja del Orinoco • Monagas • Zulia</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-navy-900 border border-slate-800 text-slate-400 hover:text-gold-400 hover:border-gold-metallic/40 transition-colors"
              title="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
