import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, Printer, Download, ShieldCheck, CheckCircle2, Award, 
  MapPin, PhoneCall, Mail, Building, FileText, Globe, Truck, 
  FlaskConical, Flame, ArrowRight, Activity 
} from 'lucide-react';
import { Logo } from './Logo';

export const DossierModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-navy-950/85 backdrop-blur-xl overflow-y-auto">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Dossier Container */}
      <div className="relative z-10 w-full max-w-4xl bg-navy-900 border border-gold-metallic/40 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Action Bar (hidden in print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-navy-950 border-b border-slate-800 print:hidden flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-gold-400 font-heading">
              Dossier Técnico Corporativo 2026 • Cysos Energy
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-black text-xs font-heading shadow-md transition-all transform hover:scale-105"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar en PDF</span>
            </button>

            <a
              href="#formulario-cotizacion"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-flame-500 hover:bg-flame-600 text-white font-bold text-xs font-heading transition-all"
            >
              <span>Solicitar Cotización</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-1"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div id="cysos-corporate-dossier" className="p-6 sm:p-10 overflow-y-auto space-y-8 text-slate-200">
          
          {/* Header Section */}
          <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Logo isDark={true} />
              </div>
              <p className="text-xs font-bold text-gold-400 uppercase tracking-wider font-heading">
                Soluciones Integrales para la Industria Energética Petrolera
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                RIF: J-40031863-7 • Registro RACDA N° 2026-I • Homologación SAPI
              </p>
            </div>

            <div className="bg-navy-950/80 p-4 rounded-2xl border border-slate-800 text-xs space-y-1 sm:text-right max-w-xs">
              <div className="flex items-center sm:justify-end gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-flame-500 flex-shrink-0" />
                <span className="truncate">Torre CCP, Maturín, Edo. Monagas</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5 text-slate-300">
                <PhoneCall className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span>+58 412-9486249</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>gerencia@cysosenergy.com</span>
              </div>
            </div>
          </div>

          {/* Key Metric Highlights Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-navy-950/60 p-4 rounded-2xl border border-gold-metallic/20">
            <div className="text-center p-2 border-r border-slate-800">
              <div className="text-2xl font-black text-gold-400 font-heading">+450</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Pozos Intervenidos</div>
            </div>
            <div className="text-center p-2 sm:border-r border-slate-800">
              <div className="text-2xl font-black text-emerald-400 font-heading">98.4%</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Reducción Viscosidad</div>
            </div>
            <div className="text-center p-2 border-r border-slate-800">
              <div className="text-2xl font-black text-flame-500 font-heading">+1.25M</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Horas Sin Accidentes</div>
            </div>
            <div className="text-center p-2">
              <div className="text-2xl font-black text-white font-heading">+120K</div>
              <div className="text-[10px] uppercase font-bold text-slate-400">BPD Fluidizados</div>
            </div>
          </div>

          {/* 4 Core Divisions Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-gold-400 font-heading flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Capacidad Operativa y Divisiones Técnicas</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              
              {/* Division 1 */}
              <div className="p-4 rounded-2xl bg-navy-950/90 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-gold-400 font-black text-xs font-heading">
                  <FlaskConical className="w-4 h-4 text-flame-500" />
                  <span>1. Química de Producción & EOR</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                  Suministro e inyección continua de reductores permanentes de viscosidad (CyS-Redux), secuestrantes de H2S, desmulsificantes e inhibidores de corrosión. Gabinetes y Skids de dosificación automatizados Modelo CyS 2026-I homologados.
                </p>
              </div>

              {/* Division 2 */}
              <div className="p-4 rounded-2xl bg-navy-950/90 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-gold-400 font-black text-xs font-heading">
                  <Truck className="w-4 h-4 text-flame-500" />
                  <span>2. Logística Pesada & Izamiento (17 Equipos)</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                  Flota propia de chutos, bateas, tolvas minerales, vacuums, low-boys y grúas telescópicas de alta capacidad (60 a 110 Ton). Certificados para transporte de sustancias peligrosas bajo normativa RACDA.
                </p>
              </div>

              {/* Division 3 */}
              <div className="p-4 rounded-2xl bg-navy-950/90 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-gold-400 font-black text-xs font-heading">
                  <Flame className="w-4 h-4 text-flame-500" />
                  <span>3. Intervención de Pozos & Flush By</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                  Unidades Flush By operativas 24/7 para cambio de bombas de cavidad progresiva (BCP), pulling rápido, varillas de succión y mantenimiento correctivo de pozos sin requerir taladro convencional.
                </p>
              </div>

              {/* Division 4 */}
              <div className="p-4 rounded-2xl bg-navy-950/90 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-gold-400 font-black text-xs font-heading">
                  <Globe className="w-4 h-4 text-flame-500" />
                  <span>4. Procura Internacional & Construcción IPC</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                  Gestión integral de procura con socios en Houston, Panamá y Europa. Tuberías API OCTG, válvulas de alta presión, bombas de inyección y componentes críticos para oleoductos e instalaciones de superficie.
                </p>
              </div>

            </div>
          </div>

          {/* Strategic Alliances & Contract Experience */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-black uppercase tracking-widest text-gold-400 font-heading flex items-center gap-2">
              <Award className="w-4 h-4 text-gold-400" />
              <span>Contratos Vigentes y Experiencia Comprobada</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-navy-950/60 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">HALLIBURTON DE VENEZUELA</div>
                  <div className="text-[11px] text-slate-400">Alquiler de equipos pesados y livianos en Base Operativa Maturín.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-navy-950/60 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">SLB (SCHLUMBERGER)</div>
                  <div className="text-[11px] text-slate-400">Servicio de transporte pesado de carga en chutos, tolvas y bateas (Contrato a 3 años).</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-navy-950/60 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">PDVSA PETROJUNÍN (ALIANZA ENI)</div>
                  <div className="text-[11px] text-slate-400">Inyección de reductores de viscosidad y acondicionamiento en Faja del Orinoco.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-navy-950/60 border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">PDVSA PETROMIRANDA (ALIANZA ROSNEFT)</div>
                  <div className="text-[11px] text-slate-400">Saneamiento ambiental y manejo de fluidos en División Junín.</div>
                </div>
              </div>
            </div>
          </div>

          {/* HSE Commitment & Legal Registrations Footer */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <div className="space-y-1 text-center sm:text-left">
              <div><strong>Normativa de Seguridad:</strong> PDVSA SI-HO-S • ISO 9001:2015 Compliance</div>
              <div><strong>Permisología Ambiental:</strong> RACDA Vigente 2026 • Manejo de Sustancias Peligrosas</div>
            </div>

            <div className="text-center sm:text-right">
              <div className="text-white font-bold font-heading">CYSOS ENERGY C.A. • 2026</div>
              <div className="text-gold-400">Maturín • Faja Petrolífera del Orinoco • Venezuela</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );

  return createPortal(modalContent, document.body);
};
