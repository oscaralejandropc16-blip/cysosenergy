import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, Building2, User, 
  Instagram, ExternalLink, MessageSquare, Sparkles, Navigation, 
  Activity, ShieldCheck, Flame, Radio, ArrowRight, PhoneCall, Check
} from 'lucide-react';

export const ContactForm = () => {
  const { addMessage, companyInfo } = useCms();
  const [submitted, setSubmitted] = useState(false);
  const [createdId, setCreatedId] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedHub, setSelectedHub] = useState('maturin');

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Química de Producción y Optimización EOR',
    location: 'Faja Petrolífera del Orinoco (Junín / Carabobo)',
    message: ''
  });

  const operationalHubs = {
    maturin: {
      name: 'Sede Central & Base Maturín',
      state: 'Monagas, Venezuela',
      address: 'C.C. Terrazas del Norte II, Maturín, Edo. Monagas',
      coords: { x: 74, y: 38 }, // Percentage on SVG Map
      phone: '0414-0596012 / 0412-4817113',
      email: 'MANAGER@CYSOS.ENERGY',
      status: 'Operativo 24/7',
      focus: 'Centro de Comando, Laboratorio Reológico & Base Operativa de Well Testing'
    },
    faja: {
      name: 'Faja Petrolífera del Orinoco',
      state: 'División Junín / Carabobo / Ayacucho',
      address: 'Macollas y Estaciones de Flujo en FPO',
      coords: { x: 68, y: 55 },
      phone: '0414-0596012',
      email: 'OPERACIONES@CYSOS.ENERGY',
      status: 'Despliegue Activo',
      focus: 'Inyección Continua de Reductor de Viscosidad & Pruebas de Pozo'
    },
    eltigre: {
      name: 'Base Logística Oriental',
      state: 'El Tigre / San Tomé, Anzoátegui',
      address: 'Zona Industrial El Tigre, Edo. Anzoátegui',
      coords: { x: 62, y: 44 },
      phone: '0412-4817113',
      email: 'LOGISTICA@CYSOS.ENERGY',
      status: 'Flota Disponible',
      focus: 'Transporte Pesado, Chutos, Bateas y Cisternas de Químicos'
    },
    zulia: {
      name: 'Base Occidente / Lago',
      state: 'Maracaibo / Costa Oriental, Zulia',
      address: 'Costa Oriental del Lago & Campo Boscán',
      coords: { x: 26, y: 34 },
      phone: '0414-0596012',
      email: 'OCCIDENTE@CYSOS.ENERGY',
      status: 'Soporte Técnico',
      focus: 'Tratamiento de Crudos Pesados, Demulsificantes & Coiled Tubing'
    }
  };

  const currentHub = operationalHubs[selectedHub];

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
        service: 'Química de Producción y Optimización EOR',
        location: 'Faja Petrolífera del Orinoco (Junín / Carabobo)',
        message: ''
      });
    }, 600);
  };

  return (
    <section id="contacto" className="py-24 relative bg-navy-950 border-t border-slate-800 overflow-hidden">
      
      {/* Dynamic Ambient Background Illumination */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gold-metallic/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-flame-500/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-metallic/40 shadow-gold-glow">
            <Radio className="w-4 h-4 text-flame-500 animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-gold-400">
              Centro de Operaciones & Requerimientos 24/7
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Presencia Nacional y <span className="text-gradient-flame">Contacto Directo</span>
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Seleccione una base en el mapa interactivo o envíe su requerimiento técnico para recibir propuesta y asesoría de nuestros ingenieros.
          </p>
        </div>

        {/* TOP INTERACTIVE RADAR MAP & BASE HUB SHOWCASE */}
        <div className="luxury-glass p-6 sm:p-10 rounded-3xl border border-gold-metallic/35 mb-14 shadow-2xl relative overflow-hidden">
          
          {/* Header of Map Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-flame-500/20 border border-flame-500/40 flex items-center justify-center text-flame-500">
                <Navigation className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold font-heading text-white">
                  Mapa Operativo Georreferenciado • Venezuela
                </h3>
                <span className="text-xs text-gold-400 font-bold">
                  Haga clic en cualquier punto para enfocar la base y autocompletar la cotización
                </span>
              </div>
            </div>

            {/* Hub Selector Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: 'maturin', label: 'Maturín (Sede)' },
                { id: 'faja', label: 'Faja del Orinoco' },
                { id: 'eltigre', label: 'El Tigre' },
                { id: 'zulia', label: 'Zulia / Occidente' }
              ].map((hub) => (
                <button
                  key={hub.id}
                  onClick={() => handleSelectHub(hub.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-300 flex items-center gap-1.5 ${
                    selectedHub === hub.id
                      ? 'bg-gradient-to-r from-flame-500 to-gold-600 text-white shadow-flame-glow scale-105'
                      : 'bg-navy-900 text-slate-300 border border-slate-800 hover:border-gold-metallic/40 hover:text-white'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${selectedHub === hub.id ? 'bg-white animate-ping' : 'bg-gold-400'}`} />
                  <span>{hub.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Vector Futuristic Interactive Map of Venezuela */}
            <div className="lg:col-span-7 relative aspect-[16/10] bg-navy-950/80 rounded-2xl border border-slate-800 p-4 flex items-center justify-center overflow-hidden group">
              
              {/* Radar Grid Lines Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-30 pointer-events-none" />
              
              {/* Holographic Radar Pulse Animation */}
              <div className="absolute w-[500px] h-[500px] border border-gold-metallic/10 rounded-full animate-pulse-glow pointer-events-none" />
              <div className="absolute w-[300px] h-[300px] border border-flame-500/15 rounded-full animate-ping pointer-events-none" style={{ animationDuration: '4s' }} />

              {/* Vector Silhouette of Venezuela */}
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full filter drop-shadow-[0_10px_30px_rgba(249,115,22,0.25)] relative z-10 select-none"
              >
                <defs>
                  <linearGradient id="vzla-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E293B" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#0F172A" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#050A14" stopOpacity="1" />
                  </linearGradient>
                </defs>

                {/* Venezuela Map Precise Contour Path */}
                <path
                  d="M 175 140 
                     C 210 130, 245 125, 280 145 
                     C 310 160, 350 150, 390 140 
                     C 430 130, 480 120, 520 135 
                     C 560 150, 610 130, 650 150 
                     C 680 165, 710 190, 720 225 
                     C 730 260, 710 300, 680 340 
                     C 650 380, 620 420, 590 460 
                     C 560 500, 520 540, 480 560 
                     C 440 580, 400 560, 370 520 
                     C 340 480, 310 440, 280 400 
                     C 250 360, 220 330, 190 300 
                     C 160 270, 140 230, 145 190 
                     C 150 160, 160 145, 175 140 Z"
                  fill="url(#vzla-gradient)"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  className="transition-all duration-500 hover:stroke-flame-500"
                />

                {/* Marine Territorial Water Lines */}
                <path
                  d="M 200 110 Q 450 80 700 120"
                  stroke="#38BDF8"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  opacity="0.4"
                />
                <text x="400" y="100" fill="#38BDF8" fontSize="12" fontFamily="sans-serif" opacity="0.6" textAnchor="middle" fontWeight="bold">
                  MAR CARIBE • CUENCAS COSTERAS
                </text>

                {/* Radar Connection Energy Beams between Hubs */}
                <line x1="592" y1="228" x2="544" y2="330" stroke="#F97316" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
                <line x1="544" y1="330" x2="496" y2="264" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
                <line x1="496" y1="264" x2="208" y2="204" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />

                {/* INTERACTIVE RADAR BEACONS */}
                {Object.entries(operationalHubs).map(([key, hub]) => {
                  const isSelected = selectedHub === key;
                  const posX = (hub.coords.x * 800) / 100;
                  const posY = (hub.coords.y * 600) / 100;

                  return (
                    <g
                      key={key}
                      onClick={() => handleSelectHub(key)}
                      className="cursor-pointer group/pin"
                    >
                      {/* Outer Glowing Ping */}
                      <circle
                        cx={posX}
                        cy={posY}
                        r={isSelected ? 22 : 14}
                        fill={isSelected ? '#F97316' : '#F59E0B'}
                        opacity={isSelected ? 0.35 : 0.2}
                        className="animate-ping"
                      />

                      {/* Middle Ring */}
                      <circle
                        cx={posX}
                        cy={posY}
                        r={isSelected ? 14 : 9}
                        fill={isSelected ? '#EA580C' : '#D97706'}
                        stroke="#FFFFFF"
                        strokeWidth={isSelected ? 2.5 : 1.5}
                        className="transition-all duration-300 group-hover/pin:scale-125"
                      />

                      {/* Core Center Dot */}
                      <circle
                        cx={posX}
                        cy={posY}
                        r={isSelected ? 6 : 4}
                        fill="#FFFFFF"
                      />

                      {/* Label Tag on Map */}
                      <rect
                        x={posX + 12}
                        y={posY - 14}
                        width={hub.name.length * 7 + 16}
                        height="22"
                        rx="6"
                        fill="#050A14"
                        stroke={isSelected ? '#F97316' : '#475569'}
                        strokeWidth="1"
                        opacity="0.95"
                      />
                      <text
                        x={posX + 20}
                        y={posY + 1}
                        fill={isSelected ? '#FACC15' : '#F8FAFC'}
                        fontSize="11"
                        fontFamily="sans-serif"
                        fontWeight="bold"
                      >
                        {hub.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-3 left-4 text-[10px] text-slate-400 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Geolocalización CYSOS en Tiempo Real</span>
              </div>
            </div>

            {/* Right: Selected Hub Technical Info Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-navy-900/90 border border-gold-metallic/40 shadow-xl space-y-4 relative">
                
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="px-2.5 py-1 rounded-md bg-flame-500/20 text-flame-400 text-[10px] font-extrabold uppercase tracking-wider border border-flame-500/30">
                      {currentHub.status}
                    </span>
                    <h4 className="text-xl font-extrabold font-heading text-white pt-1">
                      {currentHub.name}
                    </h4>
                    <span className="text-xs font-bold text-gold-400 block">{currentHub.state}</span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-gold-metallic/20 border border-gold-metallic/40 flex items-center justify-center text-gold-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2.5 text-slate-300">
                    <MapPin className="w-4 h-4 text-flame-500 flex-shrink-0 mt-0.5" />
                    <span>{currentHub.address}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-300">
                    <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <a href={`tel:${currentHub.phone.split('/')[0].trim()}`} className="text-white font-bold hover:text-gold-400 transition-colors">
                      {currentHub.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-300">
                    <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <a href={`mailto:${currentHub.email}`} className="text-gold-400 font-mono font-bold hover:underline">
                      {currentHub.email}
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold block mb-1">
                    Especialidad Operativa en esta Región:
                  </span>
                  <p className="text-xs text-slate-200 font-light leading-relaxed">
                    {currentHub.focus}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const formElement = document.getElementById('formulario-cotizacion');
                    if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-flame-500 to-gold-600 text-white font-extrabold text-xs shadow-flame-glow flex items-center justify-center gap-2 transition-all transform hover:scale-102"
                >
                  <span>Solicitar Cotización para esta Base</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: DIRECT CONTACT CARDS + MODERN INTERACTIVE QUOTATION FORM */}
        <div id="formulario-cotizacion" className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Corporate Channels & Quick WhatsApp */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="luxury-glass p-6 rounded-3xl border border-slate-800 space-y-4">
              <span className="text-xs text-gold-400 font-extrabold uppercase tracking-wider block">
                Canales Corporativos Inmediatos
              </span>
              
              <div className="space-y-3">
                
                {/* WhatsApp Direct 1-Click Card */}
                <a
                  href="https://wa.me/584140596012?text=Estimados%20CYSOS%20ENERGY,%20solicito%20información%20técnica%20sobre%20sus%20servicios."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between hover:bg-emerald-900/50 hover:border-emerald-400 transition-all group shadow-lg"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-emerald-glow group-hover:scale-110 transition-transform">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider block">WhatsApp Operativo 24/7</span>
                      <span className="text-sm font-extrabold text-white">0414-0596012</span>
                      <p className="text-[11px] text-slate-300">Respuesta técnica inmediata</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Official Email Card */}
                <a
                  href="mailto:MANAGER@CYSOS.ENERGY"
                  className="p-4 rounded-2xl bg-navy-900/80 border border-gold-metallic/30 flex items-center justify-between hover:bg-navy-900 hover:border-gold-metallic transition-all group shadow-lg"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-gold-metallic/20 border border-gold-metallic/40 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-gold-400 font-extrabold uppercase tracking-wider block">Correo Gerencial</span>
                      <span className="text-xs font-mono font-extrabold text-white block">MANAGER@CYSOS.ENERGY</span>
                      <p className="text-[11px] text-slate-400">Recepción de pliegos y licitaciones</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Instagram Direct Card */}
                <a
                  href="https://instagram.com/cysosenergy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-navy-900/80 border border-slate-800 flex items-center justify-between hover:bg-navy-900 hover:border-flame-500 transition-all group shadow-lg"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-flame-500 to-rose-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-flame-400 font-extrabold uppercase tracking-wider block">Instagram Oficial</span>
                      <span className="text-xs font-bold text-white">@cysosenergy</span>
                      <p className="text-[11px] text-slate-400">Fotos de campo y actualizaciones</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </a>

              </div>
            </div>

            {/* HSE & Reliability Guarantee Badge */}
            <div className="luxury-glass p-5 rounded-2xl border border-slate-800 text-center space-y-1.5">
              <div className="flex items-center justify-center gap-2 text-xs font-extrabold text-gold-400">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Garantía de Calidad ISO 9001 & Seguridad HSE</span>
              </div>
              <p className="text-[11px] text-slate-400 font-light">
                Procedimientos certificados bajo norma técnica PDVSA SI-HO-S para maniobras críticas.
              </p>
            </div>

          </div>

          {/* Right Column: Modern High-End Technical Quotation Form */}
          <div className="lg:col-span-7">
            <div className="luxury-glass p-8 sm:p-10 rounded-3xl border border-gold-metallic/40 shadow-2xl relative">
              
              {/* Form Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold font-heading text-white">
                    Formulario de Requerimiento Técnico
                  </h3>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    Complete los datos del pozo o servicio para generar una propuesta formal.
                  </p>
                </div>
                <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider">
                  * Campos requeridos
                </span>
              </div>

              {/* SUCCESS CONFIRMATION MODAL OVERLAY */}
              {submitted ? (
                <div className="p-8 rounded-2xl bg-navy-900 border border-emerald-500/50 text-center space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-emerald-glow">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xl font-extrabold text-white">¡Solicitud Técnica Recibida!</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                      Su requerimiento ha sido registrado en nuestro sistema con el ticket <strong className="text-gold-400 font-mono">#{createdId}</strong>. Nuestro equipo de ingenieros le contactará vía WhatsApp / Email en menos de 24 horas.
                    </p>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-flame-500 to-gold-600 text-white text-xs font-extrabold shadow-flame-glow"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Select Service Interactive Chips */}
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-slate-200 block">
                      Seleccione el Servicio Requerido:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'Química de Producción y Optimización EOR', label: 'Química EOR' },
                        { id: 'Well Testing & Aforo de Pozos', label: 'Well Testing' },
                        { id: 'Intervención de Pozos & Flush By', label: 'Flush By / Pulling' },
                        { id: 'Logística Pesada & Grúas 110T', label: 'Logística Pesada' }
                      ].map((srv) => (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => handleSelectService(srv.id)}
                          className={`p-2.5 rounded-xl text-[11px] font-extrabold text-center transition-all ${
                            formData.service === srv.id
                              ? 'bg-gradient-to-r from-flame-500 to-gold-600 text-white shadow-flame-glow border border-white/20 scale-102'
                              : 'bg-navy-900/90 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          {srv.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Nombre y Apellido *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Ej. Ing. Roberto Silva"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full modern-input rounded-xl p-3 text-xs text-white placeholder-slate-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Empresa / Consorcio *</label>
                      <input
                        type="text"
                        name="company"
                        required
                        placeholder="Ej. PDVSA / Empresa Mixta"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full modern-input rounded-xl p-3 text-xs text-white placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Correo Electrónico Corporativo *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="contacto@empresa.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full modern-input rounded-xl p-3 text-xs text-white placeholder-slate-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Teléfono / WhatsApp *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="0414-0596012"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full modern-input rounded-xl p-3 text-xs text-white placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Ubicación Operativa / Cuenca *</label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full modern-input rounded-xl p-3 text-xs text-gold-400 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Detalle del Requerimiento Técnico *</label>
                    <textarea
                      name="message"
                      required
                      rows="3"
                      placeholder="Describa la condición del pozo, tipo de crudo (°API), caudal BPD, requerimientos de reactivos químicos o soporte logístico..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full modern-input rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 leading-relaxed"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 hover:from-flame-600 hover:to-gold-700 shadow-flame-glow transition-all transform hover:scale-[1.015] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Enviando requerimiento...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Solicitud Técnica</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactForm;
