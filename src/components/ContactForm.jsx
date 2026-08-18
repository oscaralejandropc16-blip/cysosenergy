import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, Building2, User, 
  Instagram, ExternalLink, MessageSquare, Sparkles, Navigation, 
  Activity, ShieldCheck, Flame, Radio, ArrowRight, PhoneCall, Check,
  Compass, Map as MapIcon, Globe, Clock, FileText, CheckCircle, Zap
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
      address: 'C.C. Terrazas del Norte II, Maturín, Edo. Monagas',
      coords: { x: 74, y: 36 },
      phone: '0414-0596012 / 0412-4817113',
      email: 'MANAGER@CYSOS.ENERGY',
      status: 'Sede Principal 24/7',
      focus: 'Centro de Comando, Laboratorio Reológico & Base Operativa de Well Testing',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=C.C.+Terrazas+del+Norte+II,+Maturin,+Monagas,+Venezuela',
      embedMapQuery: 'C.C.+Terrazas+del+Norte+II,+Maturin,+Monagas,+Venezuela'
    },
    faja: {
      name: 'Faja Petrolífera del Orinoco',
      state: 'División Junín / Carabobo / Ayacucho',
      address: 'Macollas y Estaciones de Flujo en FPO',
      coords: { x: 67, y: 52 },
      phone: '0414-0596012',
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
      phone: '0412-4817113',
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
      phone: '0414-0596012',
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
    }, 600);
  };

  return (
    <section id="contacto" className="py-24 relative bg-navy-950 border-t border-slate-800/80 overflow-hidden">
      
      {/* Subtle Ambient Light (Static) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gold-metallic/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-slate-700/80 text-gold-400 text-xs font-bold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 text-flame-500 animate-pulse" />
            <span>Centro de Operaciones & Requerimientos Técnicos</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Canales de Contacto & <span className="text-gradient-flame">Cotizaciones</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
            Respuesta inmediata 24/7 para empresas operadoras, consorcios mixtos y proyectos en cuencas venezolanas.
          </p>
        </div>

        {/* TOP INTERACTIVE RADAR & GOOGLE MAPS SHOWCASE */}
        <div className="luxury-glass p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
          
          {/* Header of Map Card with View Mode Switch */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-flame-500/10 border border-flame-500/30 flex items-center justify-center text-flame-500">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading text-white">
                  Despliegue Operativo Georreferenciado • Venezuela
                </h3>
                <span className="text-xs text-slate-400 font-normal">
                  Toque cualquier punto para abrir su ubicación exacta en Google Maps
                </span>
              </div>
            </div>

            {/* View Mode Toggle: Radar vs Google Maps Satellite */}
            <div className="flex items-center gap-2">
              <div className="p-1 bg-navy-900 rounded-xl border border-slate-800 flex items-center gap-1">
                <button
                  onClick={() => setMapViewMode('radar')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    mapViewMode === 'radar'
                      ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-gold-400" />
                  <span>Radar Vectorial</span>
                </button>

                <button
                  onClick={() => setMapViewMode('satellite')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    mapViewMode === 'satellite'
                      ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5 text-flame-500" />
                  <span>Google Maps Satelital</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hub Selector Pills */}
          <div className="flex items-center gap-2 flex-wrap mb-6">
            {[
              { id: 'maturin', label: 'Maturín (Sede Principal)' },
              { id: 'faja', label: 'Faja del Orinoco' },
              { id: 'eltigre', label: 'El Tigre / San Tomé' },
              { id: 'zulia', label: 'Zulia / Costa Oriental' }
            ].map((hub) => (
              <button
                key={hub.id}
                onClick={() => handleSelectHub(hub.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  selectedHub === hub.id
                    ? 'bg-gradient-to-r from-flame-500 to-amber-500 text-white shadow-md'
                    : 'bg-navy-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${selectedHub === hub.id ? 'bg-white' : 'bg-gold-400'}`} />
                <span>{hub.label}</span>
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Vector Radar Map OR Live Google Maps Satellite Embed */}
            <div className="lg:col-span-7 relative aspect-[16/10] bg-navy-950/90 rounded-2xl border border-slate-800/90 p-2 sm:p-4 flex items-center justify-center overflow-hidden shadow-inner">
              
              {mapViewMode === 'satellite' ? (
                /* LIVE GOOGLE MAPS EMBED */
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <iframe
                    title="CYSOS Google Maps"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={`https://maps.google.com/maps?q=${currentHub.embedMapQuery}&t=k&z=13&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full filter contrast-105 brightness-95 rounded-xl"
                  />
                  <div className="absolute top-3 left-3 bg-navy-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>GPS en Vivo: {currentHub.name}</span>
                  </div>
                </div>
              ) : (
                /* HIGH-PRECISION VECTOR RADAR MAP OF VENEZUELA */
                <div className="relative w-full h-full flex items-center justify-center">
                  
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-20 pointer-events-none" />

                  {/* Accurate Silhouette of Venezuela */}
                  <svg
                    viewBox="0 0 800 600"
                    className="w-full h-full filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] relative z-10 select-none"
                  >
                    <defs>
                      <linearGradient id="vzla-clean-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1E293B" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#0F172A" stopOpacity="0.95" />
                      </linearGradient>
                    </defs>

                    {/* Accurate Venezuela Geographic Contour Path */}
                    <path
                      d="M 120 180 
                         C 135 150, 160 130, 190 125 
                         C 210 120, 230 140, 240 160 
                         C 255 130, 280 100, 300 120 
                         C 320 135, 340 150, 370 145 
                         C 410 140, 450 135, 490 140 
                         C 530 145, 570 135, 600 140 
                         C 630 145, 660 160, 680 185 
                         C 700 210, 720 230, 710 260 
                         C 700 290, 680 320, 650 360 
                         C 620 400, 590 440, 570 480 
                         C 550 520, 520 560, 480 570 
                         C 440 580, 400 550, 370 510 
                         C 340 470, 320 430, 290 390 
                         C 260 350, 230 320, 190 280 
                         C 150 240, 110 210, 120 180 Z"
                      fill="url(#vzla-clean-gradient)"
                      stroke="#D97706"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />

                    {/* Orinoco River Energy Line */}
                    <path
                      d="M 370 510 Q 500 370 680 260"
                      stroke="#38BDF8"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      opacity="0.4"
                    />

                    {/* Laser Connections Between Hubs */}
                    <line x1="592" y1="216" x2="536" y2="312" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                    <line x1="536" y1="312" x2="496" y2="264" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                    <line x1="496" y1="264" x2="200" y2="192" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />

                    {/* INTERACTIVE RADAR BEACONS */}
                    {Object.entries(operationalHubs).map(([key, hub]) => {
                      const isSelected = selectedHub === key;
                      const posX = (hub.coords.x * 800) / 100;
                      const posY = (hub.coords.y * 600) / 100;

                      return (
                        <g
                          key={key}
                          onClick={() => {
                            handleSelectHub(key);
                            window.open(hub.googleMapsUrl, '_blank');
                          }}
                          className="cursor-pointer group"
                        >
                          {/* Solid Invisible Hit Target */}
                          <circle cx={posX} cy={posY} r={30} fill="transparent" />

                          {/* Outer Pin Body */}
                          <circle
                            cx={posX}
                            cy={posY}
                            r={isSelected ? 13 : 8}
                            fill={isSelected ? '#EA580C' : '#D97706'}
                            stroke="#FFFFFF"
                            strokeWidth={isSelected ? 2.5 : 1.5}
                            className="pointer-events-none transition-colors duration-200 group-hover:fill-flame-400"
                          />

                          {/* Core Center Dot */}
                          <circle cx={posX} cy={posY} r={isSelected ? 4.5 : 3} fill="#FFFFFF" className="pointer-events-none" />

                          {/* Label Tag on Map */}
                          <rect
                            x={posX + 14}
                            y={posY - 14}
                            width={hub.name.length * 7.5 + 20}
                            height="24"
                            rx="6"
                            fill="#050A14"
                            stroke={isSelected ? '#F59E0B' : '#475569'}
                            strokeWidth="1.2"
                            className="pointer-events-none"
                            opacity="0.95"
                          />
                          <text
                            x={posX + 22}
                            y={posY + 2}
                            fill={isSelected ? '#FACC15' : '#FFFFFF'}
                            fontSize="11"
                            fontFamily="system-ui, sans-serif"
                            fontWeight="bold"
                            className="pointer-events-none select-none"
                          >
                            📍 {hub.name}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  <div className="absolute bottom-3 left-4 text-[11px] text-slate-400 font-mono flex items-center gap-2 bg-navy-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Toque cualquier baliza para abrir en Google Maps</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Selected Hub Technical Info Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-navy-900/95 border border-slate-800 space-y-4 relative">
                
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-md bg-flame-500/10 text-flame-400 text-[11px] font-bold uppercase tracking-wider border border-flame-500/20">
                      {currentHub.status}
                    </span>
                    <h4 className="text-xl font-bold font-heading text-white pt-1">
                      {currentHub.name}
                    </h4>
                    <span className="text-xs text-gold-400 font-semibold block">{currentHub.state}</span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-gold-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2.5 text-slate-300">
                    <MapPin className="w-4 h-4 text-flame-500 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{currentHub.address}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-300">
                    <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <a href={`tel:${currentHub.phone.split('/')[0].trim()}`} className="text-white font-medium hover:text-gold-400 transition-colors">
                      {currentHub.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5 text-slate-300">
                    <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <a href={`mailto:${currentHub.email}`} className="text-gold-400 font-mono font-medium hover:underline">
                      {currentHub.email}
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                    Especialidad Operativa en esta Región:
                  </span>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {currentHub.focus}
                  </p>
                </div>

                {/* Direct Google Maps Button */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <a
                    href={currentHub.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>Ver en Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      const formElement = document.getElementById('formulario-cotizacion');
                      if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-flame-500 to-amber-500 hover:from-flame-600 hover:to-amber-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Cotizar en esta Base</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* 3 HIGH-IMPACT EXECUTIVE CHANNEL PODS (CLEAN BENTO ROW) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Pod 1: WhatsApp 24/7 */}
          <a
            href="https://wa.me/584140596012?text=Estimados%20CYSOS%20ENERGY,%20solicito%20información%20técnica%20sobre%20sus%20servicios."
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-navy-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all group flex flex-col justify-between space-y-4 shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <PhoneCall className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>En Línea 24/7</span>
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium block">Mesa Operativa de Campo</span>
              <span className="text-base font-bold text-white font-mono block">0414-0596012</span>
              <p className="text-xs text-slate-400 font-light">Atención y despacho inmediato de cuadrillas y químicas.</p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:text-emerald-300 pt-2 border-t border-slate-800">
              <span>Abrir WhatsApp Directo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Pod 2: Official Corporate Email */}
          <a
            href="mailto:MANAGER@CYSOS.ENERGY"
            className="p-6 rounded-2xl bg-navy-900/90 border border-slate-800 hover:border-gold-metallic/50 transition-all group flex flex-col justify-between space-y-4 shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-gold-metallic/10 border border-gold-metallic/30 flex items-center justify-center text-gold-400">
                <Mail className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-gold-metallic/10 text-gold-400 text-[10px] font-bold border border-gold-metallic/20">
                Licitaciones & RFQ
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium block">Gerencia General de Operaciones</span>
              <span className="text-sm font-bold text-white font-mono block">MANAGER@CYSOS.ENERGY</span>
              <p className="text-xs text-slate-400 font-light">Recepción de pliegos, contratos y auditorías técnicas.</p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-gold-400 group-hover:text-gold-300 pt-2 border-t border-slate-800">
              <span>Redactar Correo Gerencial</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Pod 3: Instagram Channel */}
          <a
            href="https://instagram.com/cysosenergy/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-navy-900/90 border border-slate-800 hover:border-flame-500/50 transition-all group flex flex-col justify-between space-y-4 shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-flame-500/10 border border-flame-500/30 flex items-center justify-center text-flame-400">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-flame-500/10 text-flame-400 text-[10px] font-bold border border-flame-500/20">
                Cuenta Oficial
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium block">Canal Multimedia en Vivo</span>
              <span className="text-base font-bold text-white block">@cysosenergy</span>
              <p className="text-xs text-slate-400 font-light">Registros audiovisuales y maniobras en yacimiento.</p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-flame-400 group-hover:text-flame-300 pt-2 border-t border-slate-800">
              <span>Seguir en Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

        </div>

        {/* MODERN UNIFIED TECHNICAL QUOTATION FORM */}
        <div id="formulario-cotizacion" className="max-w-4xl mx-auto">
          <div className="luxury-glass p-8 sm:p-12 rounded-3xl border border-slate-800/90 shadow-2xl relative">
            
            {/* Form Top Title */}
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-10 pb-8 border-b border-slate-800/80">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                Requerimiento Técnico Formal
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                Solicite Propuesta Técnica & Cotización
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light">
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
                  <h4 className="text-2xl font-bold text-white">¡Requerimiento Técnico Recibido!</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-light">
                    Su solicitud ha sido registrada en el sistema de despacho bajo el ticket <strong className="text-gold-400 font-mono">#{createdId}</strong>. Nuestro equipo de ingenieros de campo le contactará en menos de 24 horas.
                  </p>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-colors"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Step 1: Service Selection */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-200 block">
                    1. Seleccione la Especialidad Petrolera:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'Química de Producción EOR', label: 'Química EOR' },
                      { id: 'Well Testing & Aforo de Pozos', label: 'Well Testing' },
                      { id: 'Intervención de Pozos & Flush By', label: 'Flush By / Pulling' },
                      { id: 'Logística Pesada & Grúas 110T', label: 'Logística Pesada' }
                    ].map((srv) => (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => handleSelectService(srv.id)}
                        className={`p-3 rounded-xl text-xs font-bold text-center transition-all ${
                          formData.service === srv.id
                            ? 'bg-gradient-to-r from-flame-500 to-amber-500 text-white shadow-md'
                            : 'bg-navy-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        {srv.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Contact Info Grid */}
                <div className="space-y-4 pt-2">
                  <label className="text-xs font-bold text-slate-200 block">
                    2. Información del Solicitante & Empresa:
                  </label>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1 font-medium">Nombre y Cargo *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Ej. Ing. Roberto Silva (Gerente de Producción)"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full modern-input rounded-xl p-3 text-xs text-white placeholder-slate-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1 font-medium">Empresa / Consorcio *</label>
                      <input
                        type="text"
                        name="company"
                        required
                        placeholder="Ej. PDVSA / Empresa Mixta / Contratista"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full modern-input rounded-xl p-3 text-xs text-white placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1 font-medium">Correo Electrónico Corporativo *</label>
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
                      <label className="text-[11px] text-slate-400 block mb-1 font-medium">Teléfono / WhatsApp de Contacto *</label>
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
                </div>

                {/* Step 3: Location & Details */}
                <div className="space-y-4 pt-2">
                  <label className="text-xs font-bold text-slate-200 block">
                    3. Ubicación y Especificaciones del Trabajo:
                  </label>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1 font-medium">Ubicación Operativa / Base Petrolera *</label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full modern-input rounded-xl p-3 text-xs text-gold-400 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1 font-medium">Detalle del Requerimiento Técnico *</label>
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
                </div>

                {/* Submit Action */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-flame-500 via-orange-600 to-amber-500 hover:from-flame-600 hover:to-amber-600 shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Procesando requerimiento técnico...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Requerimiento a Gerencia</span>
                      </>
                    )}
                  </button>
                  
                  <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-light mt-3">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Confidencialidad Garantizada</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold-400" />
                      <span>Respuesta técnica &lt; 24h</span>
                    </span>
                  </div>
                </div>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactForm;
