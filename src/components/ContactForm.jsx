import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, Building2, User, 
  Instagram, ExternalLink, MessageSquare, Sparkles, Navigation, 
  Activity, ShieldCheck, Flame, Radio, ArrowRight, PhoneCall, Check,
  Compass, Map as MapIcon, Globe
} from 'lucide-react';

export const ContactForm = () => {
  const { addMessage, companyInfo } = useCms();
  const [submitted, setSubmitted] = useState(false);
  const [createdId, setCreatedId] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedHub, setSelectedHub] = useState('maturin');
  const [mapViewMode, setMapViewMode] = useState('radar'); // 'radar' or 'satellite'

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

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Química de Producción y Optimización EOR',
    location: 'Sede Central & Base Maturín (Monagas, Venezuela)',
    message: ''
  });

  return (
    <section id="contacto" className="py-24 relative bg-navy-950 border-t border-slate-800 overflow-hidden">
      
      {/* Dynamic Ambient Background Illumination */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gold-metallic/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-flame-500/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-metallic/40 shadow-gold-glow">
            <Radio className="w-4 h-4 text-flame-500 animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-gold-400">
              Centro de Operaciones & Geolocalización GPS
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Presencia Nacional en <span className="text-gradient-flame">Google Maps</span>
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Haga clic en cualquiera de nuestras bases en el mapa para abrir la ruta en <strong className="text-white">Google Maps</strong> o solicitar cotización técnica de inmediato.
          </p>
        </div>

        {/* TOP INTERACTIVE RADAR & GOOGLE MAPS SHOWCASE */}
        <div className="luxury-glass p-6 sm:p-10 rounded-3xl border border-gold-metallic/35 mb-14 shadow-2xl relative overflow-hidden">
          
          {/* Header of Map Card with View Mode Switch */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-flame-500/20 border border-flame-500/40 flex items-center justify-center text-flame-500 shadow-flame-glow">
                <Navigation className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold font-heading text-white">
                  Mapa de Operaciones CYSOS • Venezuela
                </h3>
                <span className="text-xs text-gold-400 font-bold">
                  Toque cualquier punto para abrir su ubicación exacta en Google Maps
                </span>
              </div>
            </div>

            {/* View Mode Toggle: Radar vs Google Maps Satellite */}
            <div className="flex items-center gap-2">
              <div className="p-1 bg-navy-900 rounded-xl border border-slate-700 flex items-center gap-1">
                <button
                  onClick={() => setMapViewMode('radar')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                    mapViewMode === 'radar'
                      ? 'bg-gradient-to-r from-flame-500 to-gold-600 text-white shadow-flame-glow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Radar Vectorial</span>
                </button>

                <button
                  onClick={() => setMapViewMode('satellite')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                    mapViewMode === 'satellite'
                      ? 'bg-gradient-to-r from-flame-500 to-gold-600 text-white shadow-flame-glow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
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
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 flex items-center gap-2 ${
                  selectedHub === hub.id
                    ? 'bg-gradient-to-r from-flame-500 to-gold-600 text-white shadow-flame-glow scale-105'
                    : 'bg-navy-900 text-slate-300 border border-slate-800 hover:border-gold-metallic/40 hover:text-white'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${selectedHub === hub.id ? 'bg-white animate-ping' : 'bg-gold-400'}`} />
                <span>{hub.label}</span>
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Vector Radar Map OR Live Google Maps Satellite Embed */}
            <div className="lg:col-span-7 relative aspect-[16/10] bg-navy-950/90 rounded-2xl border border-slate-800 p-2 sm:p-4 flex items-center justify-center overflow-hidden group shadow-2xl">
              
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
                  <div className="absolute top-3 left-3 bg-navy-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gold-metallic/40 text-[11px] font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>GPS en Vivo: {currentHub.name}</span>
                  </div>
                </div>
              ) : (
                /* HIGH-PRECISION VECTOR RADAR MAP OF VENEZUELA */
                <div className="relative w-full h-full flex items-center justify-center">
                  
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-30 pointer-events-none" />
                  
                  {/* Glowing Holographic Radar Rings */}
                  <div className="absolute w-[450px] h-[450px] border border-gold-metallic/10 rounded-full animate-pulse-glow pointer-events-none" />
                  <div className="absolute w-[280px] h-[280px] border border-flame-500/15 rounded-full animate-ping pointer-events-none" style={{ animationDuration: '3.5s' }} />

                  {/* Accurate Silhouette of Venezuela with recognizable geographic features */}
                  <svg
                    viewBox="0 0 800 600"
                    className="w-full h-full filter drop-shadow-[0_12px_36px_rgba(249,115,22,0.3)] relative z-10 select-none"
                  >
                    <defs>
                      <linearGradient id="vzla-geo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1E293B" stopOpacity="0.9" />
                        <stop offset="40%" stopColor="#0F172A" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#030712" stopOpacity="1" />
                      </linearGradient>
                    </defs>

                    {/* Accurate Venezuela Geographic Contour Path (Lago de Maracaibo, Paraguaná, Paria, Delta) */}
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
                      fill="url(#vzla-geo-gradient)"
                      stroke="#F59E0B"
                      strokeWidth="2.5"
                      strokeDasharray="5 3"
                    />

                    {/* Orinoco River Energy Line */}
                    <path
                      d="M 370 510 Q 500 370 680 260"
                      stroke="#38BDF8"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      opacity="0.5"
                    />
                    <text x="540" y="380" fill="#38BDF8" fontSize="11" opacity="0.6" fontWeight="bold">
                      CUENCA RÍO ORINOCO
                    </text>

                    {/* Laser Connections Between Hubs */}
                    <line x1="592" y1="216" x2="536" y2="312" stroke="#F97316" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
                    <line x1="536" y1="312" x2="496" y2="264" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
                    <line x1="496" y1="264" x2="200" y2="192" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" opacity="0.5" />

                    {/* INTERACTIVE RADAR BEACONS THAT OPEN GOOGLE MAPS */}
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
                          className="cursor-pointer group/pin"
                        >
                          {/* Animated Radar Ping */}
                          <circle
                            cx={posX}
                            cy={posY}
                            r={isSelected ? 26 : 16}
                            fill={isSelected ? '#F97316' : '#F59E0B'}
                            opacity={isSelected ? 0.4 : 0.2}
                            className="animate-ping"
                          />

                          {/* Outer Pin Body */}
                          <circle
                            cx={posX}
                            cy={posY}
                            r={isSelected ? 16 : 10}
                            fill={isSelected ? '#EA580C' : '#D97706'}
                            stroke="#FFFFFF"
                            strokeWidth={isSelected ? 3 : 2}
                            className="transition-all duration-300 group-hover/pin:scale-125"
                          />

                          {/* Pin Core */}
                          <circle
                            cx={posX}
                            cy={posY}
                            r={isSelected ? 6 : 4}
                            fill="#FFFFFF"
                          />

                          {/* Interactive Pin Tag */}
                          <rect
                            x={posX + 14}
                            y={posY - 15}
                            width={hub.name.length * 7.5 + 24}
                            height="24"
                            rx="8"
                            fill="#050A14"
                            stroke={isSelected ? '#F97316' : '#64748B'}
                            strokeWidth="1.5"
                            opacity="0.95"
                          />
                          <text
                            x={posX + 22}
                            y={posY + 1.5}
                            fill={isSelected ? '#FACC15' : '#FFFFFF'}
                            fontSize="11.5"
                            fontFamily="sans-serif"
                            fontWeight="bold"
                          >
                            📍 {hub.name}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  <div className="absolute bottom-3 left-4 text-[11px] text-slate-400 font-mono flex items-center gap-2 bg-navy-900/80 px-3 py-1 rounded-lg border border-slate-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Toque cualquier baliza para abrir en Google Maps</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Selected Hub Technical Info Card with Direct Google Maps GPS Button */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 sm:p-8 rounded-2xl bg-navy-900/95 border border-gold-metallic/40 shadow-2xl space-y-5 relative">
                
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-md bg-flame-500/20 text-flame-400 text-xs font-extrabold uppercase tracking-wider border border-flame-500/30">
                      {currentHub.status}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-extrabold font-heading text-white pt-1">
                      {currentHub.name}
                    </h4>
                    <span className="text-xs font-extrabold text-gold-400 block">{currentHub.state}</span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-gold-metallic/20 border border-gold-metallic/40 flex items-center justify-center text-gold-400 shadow-gold-glow">
                    <Building2 className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-start gap-2.5 text-slate-300">
                    <MapPin className="w-4 h-4 text-flame-500 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{currentHub.address}</span>
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

                {/* DIRECT GOOGLE MAPS GPS BUTTON */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href={currentHub.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-emerald-glow flex items-center justify-center gap-2 transition-all transform hover:scale-102"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Ver en Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      const formElement = document.getElementById('formulario-cotizacion');
                      if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-flame-500 to-gold-600 text-white font-extrabold text-xs shadow-flame-glow flex items-center justify-center gap-2 transition-all transform hover:scale-102"
                  >
                    <span>Cotizar en esta Base</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

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
                    <label className="text-xs font-bold text-slate-300 block mb-1">Ubicación Operativa / Base Seleccionada *</label>
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
