import React, { useState } from 'react';
import { PhoneCall, X, Send, ShieldAlert, Sparkles, MessageSquare, Clock, MapPin, User, Building } from 'lucide-react';

const WhatsAppIcon = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const SERVICES_OPTIONS = [
  { id: 'quimica', label: 'Química EOR / Reductor de Viscosidad', icon: '🧪' },
  { id: 'logistica', label: 'Logística Pesada (Chutos, Bateas, Tolvas)', icon: '🚜' },
  { id: 'pozos', label: 'Intervención de Pozos / Flush By 24/7', icon: '⚡' },
  { id: 'gruas', label: 'Grúas Telescópicas & Izamiento 110T', icon: '🏗️' },
  { id: 'procura', label: 'Procura Internacional IPC & Tuberías', icon: '📦' }
];

export const FloatingOperationsWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(SERVICES_OPTIONS[0].label);
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const phone = '584129486249';
    let text = `*SOLICITUD OPERATIVA / COTIZACIÓN URGENTE - CYSOS ENERGY*\n\n`;
    text += `📌 *Servicio Requerido:* ${selectedService}\n`;
    if (companyName.trim()) text += `🏢 *Empresa / Solicitante:* ${companyName.trim()}\n`;
    if (location.trim()) text += `📍 *Ubicación / Campo:* ${location.trim()}\n`;
    if (notes.trim()) text += `📝 *Detalles:* ${notes.trim()}\n`;
    text += `\n_Enviado desde portal oficial www.cysosenergy.com_`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans">
      {/* Expanded Interactive Card */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-3rem)] sm:w-96 bg-navy-900/95 border border-gold-metallic/50 rounded-3xl p-5 shadow-2xl backdrop-blur-2xl animate-fadeIn text-white">
          
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg">
                <WhatsAppIcon size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-black text-sm text-white">Mesa Operativa CYSOS</h4>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <p className="text-[11px] text-emerald-400 font-medium">Guardia activa • Respuesta en &lt; 5 min</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-white/10 transition-colors"
              aria-label="Cerrar ventana de contacto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSendWhatsApp} className="mt-4 space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1 uppercase tracking-wide">
                Seleccione Requerimiento:
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-navy-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
              >
                {SERVICES_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.label} className="bg-navy-950 text-white">
                    {opt.icon} {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-medium text-slate-400 mb-1">
                  Empresa / Contacto
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Ej. PDVSA / Contratista"
                    className="w-full bg-navy-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-slate-400 mb-1">
                  Campo / Base
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ej. Morichal / Maturín"
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-slate-400 mb-1">
                Nota rápida o urgencia (opcional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej. Requerimos cotización de 3 chutos tolva para mañana..."
                className="w-full bg-navy-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-heading font-black text-xs shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
              >
                <WhatsAppIcon size={18} />
                <span>Contactar Guardia por WhatsApp</span>
              </button>

              <a
                href="tel:+584129486249"
                className="w-full py-2 px-4 rounded-xl bg-navy-950 hover:bg-navy-850 border border-slate-700 hover:border-gold-400/40 text-slate-300 hover:text-white font-heading font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-flame-500" />
                <span>Llamar Directo: 0412-9486249</span>
              </a>
            </div>
          </form>

        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir mesa operativa WhatsApp"
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-4 py-3 rounded-full shadow-2xl border border-emerald-400/40 transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        
        <WhatsAppIcon size={20} className="group-hover:rotate-12 transition-transform duration-300" />
        
        <span className="font-heading font-black text-xs uppercase tracking-wider hidden sm:inline">
          {isOpen ? 'Cerrar Despacho' : 'Guardia 24/7 • WhatsApp'}
        </span>
      </button>
    </div>
  );
};
