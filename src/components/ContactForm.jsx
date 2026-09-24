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

        {/* 3 HIGH-IMPACT EXECUTIVE CHANNEL PODS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 relative z-20">
          
          {/* Pod 1: WhatsApp */}
          <a
            href="https://wa.me/584129486249"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 rounded-2xl bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 hover:border-[#25D366]/50 transition-all overflow-hidden flex flex-col justify-between h-full"
          >
            {/* Background Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/0 to-[#25D366]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#25D366]/20 rounded-2xl blur-[50px] group-hover:bg-[#25D366]/30 transition-colors duration-500" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#25D366] to-[#1DA851] p-0.5 shadow-lg shadow-[#25D366]/20">
                  <div className="w-full h-full bg-[#0f172a] rounded-[10px] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#25D366]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#25D366]/10 border border-[#25D366]/20">
                  <span className="w-1.5 h-1.5 rounded-sm bg-[#25D366] animate-pulse" />
                  <span className="text-[10px] font-bold text-[#25D366] uppercase tracking-wider font-heading">Online 24/7</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-slate-400 font-medium mb-1 font-sans">Despacho & Operaciones</h4>
                <div className="text-xl font-bold text-white tracking-wide font-heading">0412-9486249</div>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 group-hover:text-[#25D366] transition-colors font-sans">Iniciar chat de WhatsApp</span>
              <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all transform group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* Pod 2: Gmail */}
          <a
            href="mailto:gerencia@cysosenergy.com"
            className="group relative p-6 rounded-2xl bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 hover:border-[#EA4335]/50 transition-all overflow-hidden flex flex-col justify-between h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#EA4335]/0 to-[#EA4335]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#EA4335]/20 rounded-2xl blur-[50px] group-hover:bg-[#EA4335]/30 transition-colors duration-500" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EA4335] to-[#B31412] p-0.5 shadow-lg shadow-[#EA4335]/20">
                  <div className="w-full h-full bg-[#0f172a] rounded-[10px] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#EA4335]">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                    </svg>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-[#EA4335]/10 border border-[#EA4335]/20">
                  <span className="text-[10px] font-bold text-[#EA4335] uppercase tracking-wider font-heading">Gerencia</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-slate-400 font-medium mb-1 font-sans">Correo Corporativo</h4>
                <div className="text-sm sm:text-base lg:text-lg font-bold text-white tracking-wide break-all font-heading">gerencia@cysosenergy.com</div>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 group-hover:text-[#EA4335] transition-colors font-sans">Enviar email directo</span>
              <div className="w-8 h-8 rounded-lg bg-[#EA4335]/10 flex items-center justify-center text-[#EA4335] group-hover:bg-[#EA4335] group-hover:text-white transition-all transform group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* Pod 3: Instagram */}
          <a
            href="https://instagram.com/cysosenergy"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 rounded-2xl bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 hover:border-[#E1306C]/50 transition-all overflow-hidden flex flex-col justify-between h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#E1306C]/0 to-[#E1306C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#E1306C]/20 rounded-2xl blur-[50px] group-hover:bg-[#E1306C]/30 transition-colors duration-500" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F56040] p-0.5 shadow-lg shadow-[#E1306C]/20">
                  <div className="w-full h-full bg-[#0f172a] rounded-[10px] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#E1306C]">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-[#E1306C]/10 border border-[#E1306C]/20">
                  <span className="text-[10px] font-bold text-[#E1306C] uppercase tracking-wider font-heading">Red Social</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-slate-400 font-medium mb-1 font-sans">Perfil Oficial</h4>
                <div className="text-lg font-bold text-white tracking-wide font-heading">@cysosenergy</div>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 group-hover:text-[#E1306C] transition-colors font-sans">Ir a Instagram</span>
              <div className="w-8 h-8 rounded-lg bg-[#E1306C]/10 flex items-center justify-center text-[#E1306C] group-hover:bg-[#E1306C] group-hover:text-white transition-all transform group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </a>

        </div>

        {/* MODERN UNIFIED TECHNICAL QUOTATION FORM */}
        <div id="formulario-cotizacion" className="max-w-4xl mx-auto scroll-mt-28">
          <div className="luxury-glass p-6 sm:p-10 rounded-3xl border border-slate-800/90 shadow-2xl relative">
            
            {/* Form Top Title */}
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 pb-6 border-b border-slate-800/80">
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
                Solicite Propuesta Técnica & Cotización
              </h3>
              <p className="text-sm text-slate-400 font-light">
                Nuestros ingenieros comerciales le contactarán en menos de 24 horas con una propuesta adaptada a su yacimiento.
              </p>
            </div>

            {/* SUCCESS CONFIRMATION MODAL */}
            {submitted ? (
              <div className="py-12 px-6 rounded-2xl bg-slate-900 border border-emerald-500/40 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-white font-heading">¡Requerimiento Recibido!</h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-light">
                    Su solicitud ha sido registrada bajo el ticket <strong className="text-flame-400 font-mono">#{createdId}</strong>.
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
              <form onSubmit={handleSubmit} className="space-y-5 relative">
                
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

                {/* 2-Column Grid for Personal Data */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Name */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-4 h-4 text-slate-500 group-focus-within:text-flame-400 transition-colors" />
                    </div>
                    <input type="text" name="name" required placeholder="Nombre y Cargo *" value={formData.name} onChange={handleChange} className="w-full modern-glass-input rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-white placeholder-slate-500 outline-none" />
                  </div>

                  {/* Company */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Building2 className="w-4 h-4 text-slate-500 group-focus-within:text-flame-400 transition-colors" />
                    </div>
                    <input type="text" name="company" required placeholder="Empresa / Consorcio *" value={formData.company} onChange={handleChange} className="w-full modern-glass-input rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-white placeholder-slate-500 outline-none" />
                  </div>

                  {/* Email */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-slate-500 group-focus-within:text-flame-400 transition-colors" />
                    </div>
                    <input type="email" name="email" required placeholder="Correo Corporativo *" value={formData.email} onChange={handleChange} className="w-full modern-glass-input rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-white placeholder-slate-500 outline-none" />
                  </div>

                  {/* Phone */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="w-4 h-4 text-slate-500 group-focus-within:text-flame-400 transition-colors" />
                    </div>
                    <input type="tel" name="phone" required placeholder="Teléfono / WhatsApp *" value={formData.phone} onChange={handleChange} className="w-full modern-glass-input rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-white placeholder-slate-500 outline-none" />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Activity className="w-4 h-4 text-slate-500 group-focus-within:text-flame-400 transition-colors" />
                  </div>
                  <select name="service" value={formData.service} onChange={handleChange} className="w-full modern-glass-input rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-white placeholder-slate-500 outline-none appearance-none cursor-pointer">
                    <option value="Química de Producción EOR" className="bg-slate-900">Especialidad: Química de Producción EOR</option>
                    <option value="Well Testing & Aforo de Pozos" className="bg-slate-900">Especialidad: Well Testing & Aforo</option>
                    <option value="Intervención de Pozos & Flush By" className="bg-slate-900">Especialidad: Intervención de Pozos (Flush By / Pulling)</option>
                    <option value="Logística Pesada & Grúas 110T" className="bg-slate-900">Especialidad: Logística Pesada & Izamiento</option>
                  </select>
                </div>

                {/* Message Details */}
                <div className="relative group">
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <FileText className="w-4 h-4 text-slate-500 group-focus-within:text-flame-400 transition-colors" />
                  </div>
                  <textarea name="details" rows={4} placeholder="Detalles del requerimiento (tipo de crudo, caudal, condiciones del pozo)..." value={formData.details} onChange={handleChange} className="w-full modern-glass-input rounded-xl py-4 pl-11 pr-4 text-sm font-medium text-white placeholder-slate-500 leading-relaxed outline-none resize-none"></textarea>
                </div>

                {/* Submit Action */}
                <button type="submit" disabled={loading} className="group relative w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest text-white bg-gradient-to-r from-flame-600 to-orange-500 hover:from-flame-500 hover:to-orange-400 transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2 overflow-hidden">
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
                
                {/* Micro Footer Trust Badges */}
                <div className="flex items-center justify-center gap-6 mt-4 opacity-70">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5" /> Confidencialidad
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5" /> Respuesta 24H
                  </div>
                </div>

              </form>
            )}
          </div>
        </div>

        {/* INTERACTIVE OPERATIONAL RADAR & GOOGLE MAPS SHOWCASE */}
        <OperationalMapShowcase
          mapViewMode={mapViewMode}
          setMapViewMode={setMapViewMode}
          currentHub={currentHub}
        />

      </div>
    </section>
  );
};

export default ContactForm;
