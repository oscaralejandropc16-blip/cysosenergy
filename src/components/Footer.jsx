import React from 'react';
import { Logo } from './Logo';
import { Mail, Phone, MapPin, Instagram, ShieldCheck, ChevronRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-navy-950 text-slate-300 relative border-t border-slate-800 overflow-hidden pt-16 pb-12">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-metallic/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-flame-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* MAIN FOOTER CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* 4-COLUMN BALANCED ARCHITECTURE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Col 1 (4 cols): Brand Profile & Certification Badge */}
          <div className="lg:col-span-4 space-y-5">
            <Logo isDark={true} />
            
            <p className="text-xs text-slate-300 font-light leading-relaxed max-w-sm">
              CYSOS ENERGY, C.A. - Soluciones integrales de ingeniería, procura internacional, logística de izamiento pesado (110 ton), intervención de pozos (Workover/Flush By) y química de producción petrolera en Venezuela.
            </p>

            <div className="bg-navy-900/90 p-4 rounded-2xl border border-slate-800 space-y-2 max-w-sm">
              <div className="flex items-center gap-2 text-xs font-extrabold text-gold-400 uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Normativas ISO 9001 & SI-HO-S</span>
              </div>
              <p className="text-[11px] text-slate-400 font-light leading-snug">
                Garantía de calidad auditada y certificación de seguridad industrial PDVSA en todas nuestras maniobras.
              </p>
            </div>
          </div>

          {/* Col 2 (2 cols): Rapid Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-extrabold font-heading text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-flame-500" />
              <span>Navegación</span>
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {[
                { name: 'Inicio', href: '#inicio' },
                { name: 'Misión & Visión', href: '#mision-vision' },
                { name: 'Operaciones de Campo', href: '#operaciones' },
                { name: 'Portafolio ISO 9001', href: '#servicios' },
                { name: 'Calculadora EOR', href: '#calculadora' },
                { name: 'Cuencas Petroleras', href: '#cobertura' },
                { name: 'Contacto', href: '#contacto' }
              ].map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="text-slate-300 hover:text-gold-400 transition-colors flex items-center gap-1.5 group">
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 (3 cols): 4 Core Divisions */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold font-heading text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span>Divisiones IPC</span>
            </h4>
            <div className="space-y-2.5">
              {[
                { title: 'Química de Producción EOR', sub: 'Reductores, Desmulsificantes, Xileno' },
                { title: 'Workover & Flush By 24/7', sub: 'Taladros 350-750 HP, Bombas BCP/ESP' },
                { title: 'Izamiento Pesado 110 Ton', sub: 'Grúas Telescópicas & Chutos Vacuum' },
                { title: 'Procura Internacional USA', sub: 'Tuberías ERW/RTP, Válvulas API, BOP' }
              ].map((div, idx) => (
                <div key={idx} className="bg-navy-900/60 p-2.5 rounded-xl border border-slate-800/80 hover:border-gold-metallic/40 transition-colors">
                  <span className="text-xs font-extrabold text-white block">{div.title}</span>
                  <span className="text-[10px] text-slate-400 font-light block">{div.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4 (3 cols): Official HQ Contact Info */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold font-heading text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Sede Principal</span>
            </h4>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 bg-navy-900/80 p-3 rounded-xl border border-slate-800">
                <MapPin className="w-4 h-4 text-flame-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-200 font-bold block">Oficinas Corporativas</span>
                  <span className="text-[11px] text-slate-400 font-light leading-snug">C.C. Terrazas del Norte II, Maturín, Edo. Monagas, Venezuela</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-navy-900/80 p-3 rounded-xl border border-slate-800">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Central Telefónica</span>
                  <a href="tel:+584140596012" className="text-xs font-extrabold text-white hover:text-gold-300">
                    0414-0596012 / 0412-4817113
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-navy-900/80 p-3 rounded-xl border border-slate-800">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Correo Oficial</span>
                  <a href="mailto:MANAGER@CYSOS.ENERGY" className="text-xs font-extrabold text-gold-400 hover:underline">
                    MANAGER@CYSOS.ENERGY
                  </a>
                </div>
              </div>

              <a
                href="https://instagram.com/cysosenergy/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-flame-900/40 border border-pink-500/30 hover:border-pink-500/60 transition-all text-xs font-bold text-white group"
              >
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>@cysosenergy</span>
                </div>
                <span className="text-[10px] text-pink-400 group-hover:translate-x-1 transition-transform">Seguir ↗</span>
              </a>
            </div>
          </div>

        </div>

        {/* CLEAN BOTTOM BAR (NO EXTRA FLAME DROP, NO VISIBLE CMS BUTTON) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
          <p>© {new Date().getFullYear()} CYSOS ENERGY, C.A. RIF: J-50478054-4. Todos los derechos reservados.</p>
          
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500">Venezuela • Faja del Orinoco • Zulia</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
