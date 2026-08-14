import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, Building, User, Instagram, ExternalLink, MessageSquare, Sparkles } from 'lucide-react';

export const ContactForm = () => {
  const { addMessage } = useCms();
  const [submitted, setSubmitted] = useState(false);
  const [createdId, setCreatedId] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Química de Producción y Optimización',
    location: 'Faja Petrolífera del Orinoco',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        service: 'Química de Producción y Optimización',
        location: 'Faja Petrolífera del Orinoco',
        message: ''
      });
    }, 600);
  };

  return (
    <section id="contacto" className="py-24 relative bg-navy-950 border-t border-slate-800/80 overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-flame-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-metallic/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Official Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-metallic/40 shadow-gold-glow mb-4">
                <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-gold-400">
                  Atención Técnica Corporativa
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
                Solicitudes de <span className="animate-gradient-text">Cotización Técnica</span>
              </h2>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3 font-light">
                Nuestro equipo de ingenieros y gerencia operativa está disponible para brindar asesoría reológica, análisis de pozo y cotizaciones en Venezuela.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              
              <div className="luxury-card p-5 rounded-2xl border border-gold-metallic/25 flex items-center gap-4 hover:border-gold-metallic transition-all shadow-lg group">
                <div className="w-12 h-12 rounded-2xl bg-flame-500/20 border border-flame-500/40 flex items-center justify-center text-flame-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-flame-500" />
                </div>
                <div>
                  <span className="text-[10px] text-gold-400 font-extrabold uppercase tracking-wider block">Teléfonos Directos de Atención</span>
                  <a href="tel:+584140596012" className="text-sm font-extrabold text-white hover:text-gold-300 transition-colors block">
                    0414-0596012 / 0412-4817113
                  </a>
                  <span className="text-[11px] text-slate-400">Atención 24/7 para campos petroleros</span>
                </div>
              </div>

              <div className="luxury-card p-5 rounded-2xl border border-gold-metallic/25 flex items-center gap-4 hover:border-gold-metallic transition-all shadow-lg group">
                <div className="w-12 h-12 rounded-2xl bg-gold-metallic/20 border border-gold-metallic/40 flex items-center justify-center text-gold-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <span className="text-[10px] text-gold-400 font-extrabold uppercase tracking-wider block">Correo Electrónico Oficial</span>
                  <a href="mailto:MANAGER@CYSOS.ENERGY" className="text-sm font-extrabold text-white hover:text-gold-300 transition-colors block">
                    MANAGER@CYSOS.ENERGY
                  </a>
                  <span className="text-[11px] text-slate-400">contacto@cysosenergy.com.ve</span>
                </div>
              </div>

              <div className="luxury-card p-5 rounded-2xl border border-pink-500/30 flex items-center gap-4 hover:border-pink-500/60 transition-all shadow-lg group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-amber-500 flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-pink-400 font-extrabold uppercase tracking-wider block">Instagram Oficial</span>
                  <a href="https://instagram.com/cysosenergy/" target="_blank" rel="noopener noreferrer" className="text-sm font-extrabold text-white hover:text-pink-300 transition-colors flex items-center gap-1.5">
                    <span>@cysosenergy</span>
                    <ExternalLink className="w-3.5 h-3.5 text-pink-400" />
                  </a>
                  <span className="text-[11px] text-slate-400">Noticias de campo y actualizaciones</span>
                </div>
              </div>

              <div className="luxury-card p-5 rounded-2xl border border-gold-metallic/25 flex items-center gap-4 hover:border-gold-metallic transition-all shadow-lg group">
                <div className="w-12 h-12 rounded-2xl bg-navy-900 border border-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-flame-500" />
                </div>
                <div>
                  <span className="text-[10px] text-gold-400 font-extrabold uppercase tracking-wider block">Sede Operativa Principal</span>
                  <span className="text-xs font-bold text-white block">C.C. Terrazas del Norte II, Maturín, Edo. Monagas, Venezuela</span>
                  <span className="text-[11px] text-slate-400">Bases operativas en Anzoátegui, Monagas y Zulia</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-7 luxury-glass p-8 sm:p-10 rounded-3xl border border-gold-metallic/35 shadow-2xl relative">
            
            {submitted ? (
              <div className="py-12 text-center space-y-6 animate-fadeIn">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-lg animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-extrabold uppercase border border-emerald-500/40">
                    Solicitud Registrada #{createdId}
                  </span>
                  <h3 className="text-2xl font-extrabold font-heading text-white">¡Solicitud Transmitida con Éxito!</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto font-light">
                    Su mensaje ha sido enviado directamente a la gerencia técnica de CYSOS ENERGY. Un ingeniero asignado se pondrá en contacto a la brevedad.
                  </p>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-7 py-3.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-flame-500 to-gold-600 shadow-flame-glow hover:scale-105 transition-transform"
                  >
                    Enviar Otra Solicitud
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <h3 className="text-xl font-extrabold font-heading text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-gold-400" />
                    <span>Formulario de Requerimiento Técnico</span>
                  </h3>
                  <span className="text-[10px] text-gold-400 font-extrabold uppercase tracking-wider">* CAMPOS REQUERIDOS</span>
                </div>

                {/* Name & Company */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-extrabold text-slate-200 mb-1.5 block">Nombre y Apellido *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Ej. Ing. Roberto Silva"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full modern-input rounded-xl py-3 pl-10 pr-4 text-xs font-medium placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-extrabold text-slate-200 mb-1.5 block">Empresa / Cliente *</label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="company"
                        required
                        placeholder="Ej. PDVSA / Consorcio"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full modern-input rounded-xl py-3 pl-10 pr-4 text-xs font-medium placeholder-slate-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-extrabold text-slate-200 mb-1.5 block">Correo Electrónico *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="correo@empresa.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full modern-input rounded-xl py-3 pl-10 pr-4 text-xs font-medium placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-extrabold text-slate-200 mb-1.5 block">Teléfono / WhatsApp *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="0414-0596012"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full modern-input rounded-xl py-3 pl-10 pr-4 text-xs font-medium placeholder-slate-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Select & Location */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-extrabold text-slate-200 mb-1.5 block">Servicio Requerido *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full modern-input rounded-xl py-3 px-3 text-xs font-semibold"
                    >
                      <option value="Química de Producción y Optimización" className="bg-navy-950 text-white">Química de Producción y Optimización</option>
                      <option value="Intervención y Recuperación de Pozos (Workover & Flush By)" className="bg-navy-950 text-white">Intervención y Recuperación de Pozos (Workover & Flush By)</option>
                      <option value="Logística, Izamiento y Transporte Pesado (110 Ton)" className="bg-navy-950 text-white">Logística, Izamiento y Transporte Pesado (110 Ton)</option>
                      <option value="Ingeniería, Procura y Suministros ISO 9001" className="bg-navy-950 text-white">Ingeniería, Procura y Suministros ISO 9001</option>
                      <option value="Otro Requerimiento Especial" className="bg-navy-950 text-white">Otro Requerimiento Especial</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-extrabold text-slate-200 mb-1.5 block">Campo / Cuenca Petrolera *</label>
                    <input
                      type="text"
                      name="location"
                      required
                      placeholder="Ej. Faja Petrolífera del Orinoco"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full modern-input rounded-xl py-3 px-4 text-xs font-medium placeholder-slate-500"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-extrabold text-slate-200 mb-1.5 block">Detalle de la Solicitud / Especificaciones Técnicas *</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder="Describa la condición del pozo, tipo de crudo (°API), requerimientos de reactivos químicos, grúas o logística pesada..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full modern-input rounded-xl p-3.5 text-xs font-medium placeholder-slate-500"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 hover:from-flame-600 hover:to-gold-700 shadow-flame-glow flex items-center justify-center gap-2.5 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01] active:scale-95 disabled:opacity-50 group"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitiendo Solicitud...</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      <span>Enviar Solicitud Técnica</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
