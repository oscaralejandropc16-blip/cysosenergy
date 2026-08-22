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
  const [selectedHub, setSelectedHub] = useState('maturin');
  const [mapViewMode, setMapViewMode] = useState('radar');

  const operationalHubs = {
    maturin: {
      name: 'Sede Central & Base Maturín',
      state: 'Monagas, Venezuela',
      address: 'Av. Alirio Ugarte Pelayo, Complejo CCP, Centro Médico Norte, piso 1, Oficina 01-18, Maturín, Edo. Monagas',
      coords: { x: 74, y: 36 },
      phone: '0412-9486249',
      email: 'gerencia@cysosenergy.com',
      status: 'Sede Principal 24/7',
      focus: 'Centro de Comando, Laboratorio Reológico & Base Operativa de Well Testing',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Complejo+CCP,+Centro+Medico+Norte,+Maturin,+Monagas,+Venezuela',
      embedMapQuery: 'Complejo+CCP,+Centro+Medico+Norte,+Maturin,+Monagas,+Venezuela'
    },
    faja: {
      name: 'Faja Petrolífera del Orinoco',
      state: 'División Junín / Carabobo / Ayacucho',
      address: 'Macollas y Estaciones de Flujo en FPO',
      coords: { x: 67, y: 52 },
      phone: '0412-9486249',
      email: 'OPERACIONES@CYSOS.ENERGY',
      status: 'Despliegue de Campo',
      focus: 'Inyección Continua de Reductor de Viscosidad & Pruebas de Pozo',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Faja+Petrolifera+del+Orinoco,+Venezuela',
      embedMapQuery: 'Faja+Petrolifera+del+Orinoco,+Venezuela'
    },
    eltigre: {
      name: 'Base Logística Oriental',
      state: 'El Tigre / San Tomé, Anzoátegui',
      address: 'Zona Industrial El Tigre, Edo. Anzoátegui',
      coords: { x: 62, y: 44 },
      phone: '0412-9486249',
      email: 'LOGISTICA@CYSOS.ENERGY',
      status: 'Flota Disponible',
      focus: 'Transporte Pesado, Chutos, Bateas y Cisternas de Químicos',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Zona+Industrial+El+Tigre,+Anzoategui,+Venezuela',
      embedMapQuery: 'Zona+Industrial+El+Tigre,+Anzoategui,+Venezuela'
    },
    zulia: {
      name: 'Base Occidente / Lago',
      state: 'Maracaibo / Costa Oriental, Zulia',
      address: 'Costa Oriental del Lago & Campo Boscán',
      coords: { x: 25, y: 32 },
      phone: '0412-9486249',
      email: 'OCCIDENTE@CYSOS.ENERGY',
      status: 'Soporte Técnico',
      focus: 'Tratamiento de Crudos Pesados, Demulsificantes & Coiled Tubing',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Costa+Oriental+del+Lago,+Zulia,+Venezuela',
      embedMapQuery: 'Costa+Oriental+del+Lago,+Zulia,+Venezuela'
    }
  };

  const currentHub = operationalHubs[selectedHub];

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Química de Producción EOR',
    location: 'Sede Central & Base Maturín (Monagas, Venezuela)',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectService = (serviceName) => {
    setFormData((prev) => ({ ...prev, service: serviceName }));
  };

  const handleSelectHub = (hubKey) => {
    setSelectedHub(hubKey);
    setFormData((prev) => ({ ...prev, location: operationalHubs[hubKey].name + ' (' + operationalHubs[hubKey].state + ')' }));
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
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 shadow-[0_0_20px_rgba(250,204,21,0.1)]">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[11px] font-black uppercase text-gold-400 tracking-widest font-heading">
              Centro de Operaciones & Requerimientos Técnicos
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
            Canales de Contacto & <span className="animate-gradient-text">Cotizaciones</span>
          </h2>
          
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-light">
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
            className="group relative p-6 rounded-3xl bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 hover:border-[#25D366]/50 transition-all overflow-hidden flex flex-col justify-between h-full"
          >
            {/* Background Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/0 to-[#25D366]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#25D366]/20 rounded-full blur-[50px] group-hover:bg-[#25D366]/30 transition-colors duration-500" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#1DA851] p-0.5 shadow-lg shadow-[#25D366]/20">
                  <div className="w-full h-full bg-[#0f172a] rounded-[14px] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#25D366]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/10 border border-[#25D366]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-[10px] font-black text-[#25D366] uppercase tracking-wider font-heading">Online 24/7</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-slate-400 font-medium mb-1">Despacho & Operaciones</h4>
                <div className="text-xl font-black text-white tracking-wide">0412-9486249</div>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 group-hover:text-[#25D366] transition-colors">Iniciar chat de WhatsApp</span>
              <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all transform group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* Pod 2: Gmail */}
          <a
            href="mailto:gerencia@cysosenergy.com"
            className="group relative p-6 rounded-3xl bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 hover:border-[#EA4335]/50 transition-all overflow-hidden flex flex-col justify-between h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#EA4335]/0 to-[#EA4335]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#EA4335]/20 rounded-full blur-[50px] group-hover:bg-[#EA4335]/30 transition-colors duration-500" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EA4335] to-[#B31412] p-0.5 shadow-lg shadow-[#EA4335]/20">
                  <div className="w-full h-full bg-[#0f172a] rounded-[14px] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#EA4335]">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                    </svg>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#EA4335]/10 border border-[#EA4335]/20">
                  <span className="text-[10px] font-black text-[#EA4335] uppercase tracking-wider font-heading">Gerencia</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-slate-400 font-medium mb-1">Correo Corporativo</h4>
                <div className="text-sm sm:text-base lg:text-lg font-black text-white tracking-wide break-all font-heading">gerencia@cysosenergy.com</div>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 group-hover:text-[#EA4335] transition-colors">Enviar email directo</span>
              <div className="w-8 h-8 rounded-full bg-[#EA4335]/10 flex items-center justify-center text-[#EA4335] group-hover:bg-[#EA4335] group-hover:text-white transition-all transform group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* Pod 3: Instagram */}
          <a
            href="https://instagram.com/cysosenergy"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 rounded-3xl bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 hover:border-[#E1306C]/50 transition-all overflow-hidden flex flex-col justify-between h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#E1306C]/0 to-[#E1306C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#E1306C]/20 rounded-full blur-[50px] group-hover:bg-[#E1306C]/30 transition-colors duration-500" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F56040] p-0.5 shadow-lg shadow-[#E1306C]/20">
                  <div className="w-full h-full bg-[#0f172a] rounded-[14px] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#E1306C]">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#E1306C]/10 border border-[#E1306C]/20">
                  <span className="text-[10px] font-black text-[#E1306C] uppercase tracking-wider font-heading">Red Social</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm text-slate-400 font-medium mb-1">Perfil Oficial</h4>
                <div className="text-lg font-black text-white tracking-wide">@cysosenergy</div>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 group-hover:text-[#E1306C] transition-colors">Ir a Instagram</span>
              <div className="w-8 h-8 rounded-full bg-[#E1306C]/10 flex items-center justify-center text-[#E1306C] group-hover:bg-[#E1306C] group-hover:text-white transition-all transform group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </a>

        </div>

        {/* MODERN UNIFIED TECHNICAL QUOTATION FORM */}
        <div id="formulario-cotizacion" className="max-w-4xl mx-auto scroll-mt-28">
          <div className="luxury-glass p-6 sm:p-10 md:p-12 rounded-3xl border border-slate-800/90 shadow-2xl relative">
            
            {/* Form Top Title */}
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-slate-800/80">
              <span className="text-xs font-black uppercase tracking-wider text-gold-400 font-heading">
                Requerimiento Técnico Formal
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
                Solicite Propuesta Técnica & Cotización
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light">
                Complete el formulario a continuación y nuestros ingenieros le enviarán un pliego formal adaptado a su yacimiento.
              </p>
            </div>

            {/* SUCCESS CONFIRMATION MODAL */}
            {submitted ? (
              <div className="py-12 px-6 rounded-2xl bg-navy-900 border border-emerald-500/40 text-center space-y-5 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-emerald-glow">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-white font-heading">¡Requerimiento Técnico Recibido!</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-light">
                    Su solicitud ha sido registrada en el sistema de despacho bajo el ticket <strong className="text-gold-400 font-sans tracking-wide">#{createdId}</strong>. Nuestro equipo de ingenieros de campo le contactará en menos de 24 horas.
                  </p>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-colors font-heading"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative">
                
                <style>{`
                  @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                  .animate-stagger-1 { animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both; }
                  .animate-stagger-2 { animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both; }
                  .animate-stagger-3 { animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both; }
                  .animate-stagger-4 { animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both; }
                  
                  .input-glow-wrapper {
                    position: relative;
                    border-radius: 12px;
                  }
                  .input-glow-wrapper::before {
                    content: '';
                    position: absolute;
                    inset: -2px;
                    border-radius: 14px;
                    background: linear-gradient(135deg, rgba(251,191,36,0.5), rgba(249,115,22,0.5));
                    z-index: -1;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                  }
                  .input-glow-wrapper:focus-within::before {
                    opacity: 1;
                    animation: pulse-border 2s infinite;
                  }
                  @keyframes pulse-border {
                    0%, 100% { opacity: 0.8; }
                    50% { opacity: 0.4; }
                  }
                  
                  .modern-glass-input {
                    background: rgba(15, 23, 42, 0.6);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    transition: all 0.3s ease;
                  }
                  .modern-glass-input:focus {
                    background: rgba(15, 23, 42, 0.8);
                    border-color: rgba(251, 191, 36, 0.4);
                    box-shadow: 0 0 20px rgba(251, 191, 36, 0.1);
                  }
                `}</style>

                {/* Step 1: Service Selection */}
                <div className="space-y-3 animate-stagger-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-gold-400 text-xs font-black font-sans tracking-wide border border-slate-700">1</span>
                    <label className="text-sm font-black text-white block font-heading tracking-wide">
                      Seleccione la Especialidad
                    </label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'Química de Producción EOR', label: 'Química EOR', icon: Beaker },
                      { id: 'Well Testing & Aforo de Pozos', label: 'Well Testing', icon: Activity },
                      { id: 'Intervención de Pozos & Flush By', label: 'Flush By / Pulling', icon: Wrench },
                      { id: 'Logística Pesada & Grúas 110T', label: 'Logística Pesada', icon: Truck }
                    ].map((srv) => {
                      const Icon = srv.icon;
                      const isSelected = formData.service === srv.id;
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => handleSelectService(srv.id)}
                          className={`group relative p-4 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
                            isSelected
                              ? 'bg-gradient-to-br from-flame-500/20 to-amber-500/20 border-flame-500/50 shadow-[0_0_20px_rgba(249,115,22,0.2)]'
                              : 'bg-navy-900/50 border-slate-800 hover:border-slate-600 hover:bg-navy-800/80'
                          } border`}
                        >
                          <div className={`p-2.5 rounded-xl transition-colors duration-300 ${
                            isSelected ? 'bg-gradient-to-br from-flame-500 to-amber-500 text-white shadow-md' : 'bg-slate-800 text-slate-400 group-hover:text-gold-400'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`text-[11px] sm:text-xs font-black text-center font-heading transition-colors ${
                            isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                          }`}>
                            {srv.label}
                          </span>
                          
                          {/* Active Indicator Dot */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Contact Info Grid */}
                <div className="space-y-4 pt-4 border-t border-slate-800/60 animate-stagger-2">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-gold-400 text-xs font-black font-sans tracking-wide border border-slate-700">2</span>
                    <label className="text-sm font-black text-white block font-heading tracking-wide">
                      Información del Solicitante
                    </label>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="input-glow-wrapper group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="w-4 h-4 text-slate-500 group-focus-within:text-flame-400 transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Nombre y Cargo *"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full modern-glass-input rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-white placeholder-slate-500/80 outline-none"
                      />
                    </div>

                    <div className="input-glow-wrapper group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Building2 className="w-4 h-4 text-slate-500 group-focus-within:text-flame-400 transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="company"
                        required
                        placeholder="Empresa / Consorcio *"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full modern-glass-input rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-white placeholder-slate-500/80 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="input-glow-wrapper group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-slate-500 group-focus-within:text-flame-400 transition-colors" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Correo Corporativo *"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full modern-glass-input rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-white placeholder-slate-500/80 outline-none"
                      />
                    </div>

                    <div className="input-glow-wrapper group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="w-4 h-4 text-slate-500 group-focus-within:text-flame-400 transition-colors" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Teléfono / WhatsApp *"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full modern-glass-input rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-white placeholder-slate-500/80 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 3: Location & Details */}
                <div className="space-y-4 pt-4 border-t border-slate-800/60 animate-stagger-3">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-gold-400 text-xs font-black font-sans tracking-wide border border-slate-700">3</span>
                    <label className="text-sm font-black text-white block font-heading tracking-wide">
                      Requerimiento Técnico
                    </label>
                  </div>

                  <div className="input-glow-wrapper group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MapPin className="w-4 h-4 text-slate-500 group-focus-within:text-flame-400 transition-colors" />
                    </div>
                    <input
                      type="text"
                      name="location"
                      required
                      placeholder="Ubicación Operativa *"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full modern-glass-input rounded-xl py-3.5 pl-11 pr-4 text-sm font-semibold tracking-wide text-amber-400 outline-none"
                    />
                  </div>

                  <div className="input-glow-wrapper group">
                    <div className="absolute top-4 left-4 flex items-start pointer-events-none">
                      <FileText className="w-4 h-4 text-slate-500 group-focus-within:text-flame-400 transition-colors" />
                    </div>
                    <textarea
                      name="message"
                      required
                      rows="4"
                      placeholder="Describa la condición del pozo, tipo de crudo (°API), caudal BPD, requerimientos específicos..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full modern-glass-input rounded-xl py-4 pl-11 pr-4 text-sm font-medium text-slate-200 placeholder-slate-500/80 leading-relaxed outline-none resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-6 animate-stagger-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full py-4 rounded-xl text-[13px] font-black uppercase tracking-wider text-white bg-gradient-to-r from-flame-500 via-orange-600 to-amber-500 hover:from-flame-400 hover:to-amber-400 overflow-hidden transition-all shadow-[0_10px_20px_-10px_rgba(249,115,22,0.6)] hover:shadow-[0_15px_30px_-10px_rgba(249,115,22,0.8)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none font-heading flex items-center justify-center gap-2"
                  >
                    {/* Sweep highlight animation */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[-30deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
                    
                    {loading ? (
                      <span className="flex items-center gap-2 relative z-10">
                        <span className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                        <span>Procesando...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 relative z-10">
                        <span>Enviar Requerimiento Oficial</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </span>
                    )}
                  </button>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6">
                    <div className="flex items-center gap-2.5 text-xs font-bold text-slate-300 font-heading tracking-wider uppercase">
                      <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.15)]">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="mt-0.5">Confidencialidad Total</span>
                    </div>
                    
                    <div className="flex items-center gap-2.5 text-xs font-bold text-slate-300 font-heading tracking-wider uppercase">
                      <div className="w-7 h-7 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.15)]">
                        <Clock className="w-4 h-4 text-amber-400" />
                      </div>
                      <span className="mt-0.5">Respuesta &lt; 24 Horas</span>
                    </div>
                  </div>
                </div>

              </form>
            )}

          </div>
        </div>

        {/* INTERACTIVE OPERATIONAL RADAR & GOOGLE MAPS SHOWCASE */}
        <OperationalMapShowcase
          operationalHubs={operationalHubs}
          selectedHub={selectedHub}
          handleSelectHub={handleSelectHub}
          mapViewMode={mapViewMode}
          setMapViewMode={setMapViewMode}
          currentHub={currentHub}
        />

      </div>
    </section>
  );
};

export default ContactForm;
