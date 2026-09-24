import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { OperationalMapShowcase } from './OperationalMapShowcase';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, Building2, User, 
  Instagram, ExternalLink, MessageSquare, Sparkles, Navigation, 
  Activity, ShieldCheck, Flame, Radio, ArrowRight, PhoneCall, Check,
  Compass, Map as MapIcon, Globe, Clock, FileText, CheckCircle, Zap,
  Beaker, Truck, Wrench
} from 'lucide-react';

export const ContactForm = () => {
  const { addMessage, companyInfo } = useCms();
  const [submitted, setSubmitted] = useState(false);
  const [createdId, setCreatedId] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaParams, setCaptchaParams] = useState({ num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1 });
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [selectedHub, setSelectedHub] = useState('maturin');
  const [mapViewMode, setMapViewMode] = useState('radar');

  const operationalHub = {
    name: 'Sede Central & Corporativa',
    company: 'CYSOS ENERGY, C.A.',
    state: 'Maturín, Estado Monagas, Venezuela',
    address: 'Av. Alirio Ugarte Pelayo, Complejo CCP, Centro Médico Norte, piso 1. Oficina 01-18 Maturín, Edo. Monagas',
    coords: { x: 74, y: 36 },
    phone: '0412-9486249',
    email: 'gerencia@cysosenergy.com',
    rif: 'J-40031863-7',
    status: 'Sede Única Oficial 24/7',
    focus: 'Centro de Mando Administrativo, Laboratorio Reológico EOR, Operaciones de Campo e Ingeniería IPC',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Av.+Alirio+Ugarte+Pelayo,+Complejo+CCP,+Centro+Medico+Norte,+Maturin,+Monagas,+Venezuela',
    embedMapQuery: 'Av.+Alirio+Ugarte+Pelayo,+Complejo+CCP,+Centro+Medico+Norte,+Maturin,+Monagas,+Venezuela'
  };

  const currentHub = operationalHub;

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Química de Producción EOR',
    location: 'Sede Central Maturín, Monagas (Av. Alirio Ugarte Pelayo, Complejo CCP)',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectService = (serviceName) => {
    setFormData((prev) => ({ ...prev, service: serviceName }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const result = addMessage(formData);
      setCreatedId(result.id);
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: 'Química de Producción EOR',
        location: 'Sede Central & Base Maturín (Monagas, Venezuela)',
        message: ''
      });
    }, 500);
  };

  return (
    <section id="contacto" className="py-20 md:py-24 relative bg-navy-950 border-t border-slate-800/80 overflow-hidden">
      
      {/* Subtle Ambient Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gold-metallic/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Section Header - Modern Geometric Editorial (No Pills) */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-xs font-bold uppercase text-slate-300 tracking-[0.25em] font-heading">
            Centro de Operaciones & Requerimientos Técnicos
          </p>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
            Canales de Contacto & <span className="text-flame-500">Cotizaciones</span>
          </h2>
          
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
            Respuesta inmediata 24/7 para empresas operadoras, consorcios mixtos y proyectos en cuencas venezolanas.
          </p>
        </div>

        {/* BENTO DASHBOARD LAYOUT */}
        <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 relative z-20">
          
          {/* LEFT PANEL: MAIN CONTACT FORM (Takes 5 columns) */}
          <div className="lg:col-span-5 w-full flex flex-col">
            <div id="formulario-cotizacion" className="luxury-glass p-6 sm:p-8 rounded-3xl border border-slate-800/90 shadow-2xl relative flex-1 scroll-mt-28 flex flex-col justify-center">
              
              {/* Form Top Title */}
              <div className="text-center sm:text-left space-y-2 mb-6 pb-5 border-b border-slate-800/80">
                <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                  Cotización & Propuesta
                </h3>
                <p className="text-[13px] text-slate-400 font-light">
                  Nuestros ingenieros comerciales le contactarán en menos de 24 horas con una propuesta.
                </p>
              </div>

              {/* SUCCESS CONFIRMATION MODAL */}
              {submitted ? (
                <div className="py-12 px-6 rounded-2xl bg-slate-900 border border-emerald-500/40 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-white font-heading">¡Recibido!</h4>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-light">
                      Su ticket es el <strong className="text-flame-400 font-mono">#{createdId}</strong>.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors font-heading"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 relative flex-1 flex flex-col">
                  
                  <style>{`
                    .modern-glass-input {
                      background: rgba(15, 23, 42, 0.6);
                      border: 1px solid rgba(255, 255, 255, 0.08);
                      transition: all 0.3s ease;
                    }
                    .modern-glass-input:focus {
                      background: rgba(15, 23, 42, 0.9);
                      border-color: rgba(234, 88, 12, 0.5);
                      box-shadow: 0 0 15px rgba(234, 88, 12, 0.15);
                    }
                  `}</style>

                  {/* Name */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-4 h-4 text-slate-500 group-focus-within:text-flame-400 transition-colors" />
                    </div>
                    <input type="text" name="name" required placeholder="Nombre y Cargo *" value={formData.name} onChange={handleChange} className="w-full modern-glass-input rounded-xl py-3 pl-11 pr-4 text-[13px] font-medium text-white placeholder-slate-500 outline-none" />
                  </div>

                  {/* Company */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Building2 className="w-4 h-4 text-slate-500 group-focus-within:text-flame-400 transition-colors" />
                    </div>
                    <input type="text" name="company" required placeholder="Empresa / Consorcio *" value={formData.company} onChange={handleChange} className="w-full modern-glass-input rounded-xl py-3 pl-11 pr-4 text-[13px] font-medium text-white placeholder-slate-500 outline-none" />
                  </div>

                  {/* 2-Column for Email & Phone */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-slate-500 group-focus-within:text-flame-400 transition-colors" />
                      </div>
                      <input type="email" name="email" required placeholder="Correo *" value={formData.email} onChange={handleChange} className="w-full modern-glass-input rounded-xl py-3 pl-11 pr-3 text-[13px] font-medium text-white placeholder-slate-500 outline-none" />
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="w-4 h-4 text-slate-500 group-focus-within:text-flame-400 transition-colors" />
                      </div>
                      <input type="tel" name="phone" required placeholder="Teléfono *" value={formData.phone} onChange={handleChange} className="w-full modern-glass-input rounded-xl py-3 pl-11 pr-3 text-[13px] font-medium text-white placeholder-slate-500 outline-none" />
                    </div>
                  </div>

                  {/* Service Dropdown */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Activity className="w-4 h-4 text-slate-500 group-focus-within:text-flame-400 transition-colors" />
                    </div>
                    <select name="service" value={formData.service} onChange={handleChange} className="w-full modern-glass-input rounded-xl py-3 pl-11 pr-4 text-[13px] font-medium text-white placeholder-slate-500 outline-none appearance-none cursor-pointer">
                      <option value="Química de Producción EOR" className="bg-slate-900">Química de Producción EOR</option>
                      <option value="Well Testing & Aforo de Pozos" className="bg-slate-900">Well Testing & Aforo</option>
                      <option value="Intervención de Pozos & Flush By" className="bg-slate-900">Intervención (Flush By / Pulling)</option>
                      <option value="Logística Pesada & Grúas 110T" className="bg-slate-900">Logística Pesada & Izamiento</option>
                    </select>
                  </div>

                  {/* Message Details */}
                  <div className="relative group flex-1 min-h-[100px]">
                    <div className="absolute top-3.5 left-4 pointer-events-none">
                      <FileText className="w-4 h-4 text-slate-500 group-focus-within:text-flame-400 transition-colors" />
                    </div>
                    <textarea name="details" placeholder="Detalles del requerimiento (tipo de crudo, caudal, etc)..." value={formData.details} onChange={handleChange} className="w-full h-full modern-glass-input rounded-xl py-3 pl-11 pr-4 text-[13px] font-medium text-white placeholder-slate-500 leading-relaxed outline-none resize-none"></textarea>
                  </div>

                  {/* Submit Action */}
                  <button type="submit" disabled={loading} className="group relative w-full py-3.5 mt-2 rounded-xl text-sm font-black uppercase tracking-widest text-white bg-gradient-to-r from-flame-600 to-orange-500 hover:from-flame-500 hover:to-orange-400 transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2 overflow-hidden shrink-0">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-[-30deg] group-hover:animate-[shimmer-sweep_2s_infinite]" />
                    {loading ? (
                      <span className="flex items-center gap-2 relative z-10">
                        <span className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                        <span>Procesando...</span>
                      </span>
                    ) : (
                      <>
                        <span className="relative z-10">Enviar Requerimiento</span>
                        <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  
                </form>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: MAP & COMMUNICATION PODS (Takes 7 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
            
            {/* TOP: Radar Map Showcase */}
            <div className="w-full flex-1 min-h-[300px]">
              <OperationalMapShowcase
                mapViewMode={mapViewMode}
                setMapViewMode={setMapViewMode}
                currentHub={currentHub}
                hideInfoCard={true}
              />
            </div>

            {/* BOTTOM: 3 High-Impact Executive Channel Pods */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 shrink-0">
              
              {/* Pod 1: WhatsApp */}
              <a
                href="https://wa.me/584129486249"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-2xl luxury-glass border border-slate-800/80 hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all overflow-hidden flex flex-col justify-between min-h-[140px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:scale-110 transition-transform mb-3">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h4 className="text-[9px] uppercase font-black tracking-widest text-emerald-400 font-heading mb-0.5">Operaciones</h4>
                  <div className="text-sm font-bold text-white tracking-wide font-heading">0412-9486249</div>
                </div>
                <div className="relative z-10 mt-3 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="group-hover:text-emerald-400 transition-colors">Chat Directo</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
              </a>

              {/* Pod 2: Email */}
              <a
                href="mailto:gerencia@cysosenergy.com"
                className="group relative p-4 rounded-2xl luxury-glass border border-slate-800/80 hover:border-flame-500/50 hover:bg-slate-800/50 transition-all overflow-hidden flex flex-col justify-between min-h-[140px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-flame-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-flame-500 shadow-[0_0_15px_rgba(249,115,22,0.15)] group-hover:scale-110 transition-transform mb-3">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h4 className="text-[9px] uppercase font-black tracking-widest text-flame-400 font-heading mb-0.5">Gerencia</h4>
                  <div className="text-sm font-bold text-white tracking-wide truncate font-heading">gerencia@cysosenergy.com</div>
                </div>
                <div className="relative z-10 mt-3 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="group-hover:text-flame-400 transition-colors">Enviar Correo</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:text-flame-400 group-hover:translate-x-1 transition-all" />
                </div>
              </a>

              {/* Pod 3: Instagram */}
              <a
                href="https://instagram.com/cysosenergy"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-2xl luxury-glass border border-slate-800/80 hover:border-pink-500/50 hover:bg-slate-800/50 transition-all overflow-hidden flex flex-col justify-between min-h-[140px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.15)] group-hover:scale-110 transition-transform mb-3">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <h4 className="text-[9px] uppercase font-black tracking-widest text-pink-400 font-heading mb-0.5">Red Social</h4>
                  <div className="text-sm font-bold text-white tracking-wide font-heading">@cysosenergy</div>
                </div>
                <div className="relative z-10 mt-3 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="group-hover:text-pink-400 transition-colors">Ir al Perfil</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:text-pink-400 group-hover:translate-x-1 transition-all" />
                </div>
              </a>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactForm;
