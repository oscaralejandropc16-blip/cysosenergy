import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { Logo } from './Logo';
import { 
  X, Lock, ShieldCheck, Mail, MessageSquare, Trash2, CheckCircle2, 
  Search, Filter, LogOut, Edit3, AlertCircle, Sparkles, Key
} from 'lucide-react';

export const CmsAdminModal = () => {
  const { 
    isAdminOpen, setIsAdminOpen, isLoggedIn, loginAdmin, logoutAdmin,
    messages, updateMessageStatus, deleteMessage, kpis, updateKpi,
    companyInfo, updateCompanyInfoText 
  } = useCms();

  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('inbox');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Global Listener for Secret URL Hash (#admin) or Secret Keyboard Shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const handleUrlHashAndKey = (e) => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        setIsAdminOpen(true);
      }

      if ((e.ctrlKey || e.altKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
      setIsAdminOpen(true);
    }

    window.addEventListener('hashchange', handleUrlHashAndKey);
    window.addEventListener('keydown', handleUrlHashAndKey);
    return () => {
      window.removeEventListener('hashchange', handleUrlHashAndKey);
      window.removeEventListener('keydown', handleUrlHashAndKey);
    };
  }, [setIsAdminOpen]);

  if (!isAdminOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const res = loginAdmin(password);
    if (!res.success) {
      setLoginError(res.error);
    } else {
      setLoginError('');
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesFilter = filterStatus === 'all' || msg.status === filterStatus;
    const matchesSearch = 
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = messages.filter((m) => m.status === 'pending').length;
  const respondedCount = messages.filter((m) => m.status === 'responded').length;

  const openWhatsAppReply = (msg) => {
    const cleanPhone = msg.phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Estimado(a) ${msg.name}, recibimos su solicitud en CYSOS ENERGY C.A. para ${msg.company} sobre "${msg.service}". Le contactamos para coordinar la propuesta técnica.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-950/90 backdrop-blur-2xl animate-fadeIn overflow-y-auto">
      <div className="luxury-glass w-full max-w-5xl rounded-3xl border border-gold-metallic/40 shadow-2xl relative overflow-hidden flex flex-col my-auto max-h-[90vh] bg-navy-950 text-white">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-navy-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Logo showText={true} isDark={true} />
            <span className="h-4 w-px bg-slate-700" />
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gold-metallic/15 border border-gold-metallic/30 text-gold-400 text-xs font-extrabold uppercase shadow-gold-glow">
              <Lock className="w-3.5 h-3.5 text-flame-500" />
              <span>Acceso Restringido - Equipo Interno</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <button
                onClick={logoutAdmin}
                className="text-xs font-bold text-slate-300 hover:text-red-400 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-850 border border-slate-700 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Salir</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl bg-navy-850 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* LOGIN VIEW */}
        {!isLoggedIn ? (
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-flame-500 via-orange-600 to-gold-600 text-white flex items-center justify-center shadow-flame-glow animate-float">
              <Key className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold font-heading text-white">Portal CMS Corporativo</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Exclusivo para la gerencia y equipo operativo de CYSOS ENERGY. Ingrese la clave corporativa para gestionar las cotizaciones recibidas.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
              <div className="space-y-1.5">
                <input
                  type="password"
                  placeholder="Contraseña de acceso"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full modern-input rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none text-center font-bold tracking-widest border border-gold-metallic/30"
                />
                {loginError && <p className="text-xs text-red-400 font-extrabold mt-1">{loginError}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 hover:from-flame-600 hover:to-gold-700 shadow-flame-glow transition-all transform hover:scale-[1.02]"
              >
                Ingresar al CMS Interno
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <Lock className="w-3.5 h-3.5 text-gold-400" />
              <span>Acceso Privado Cifrado • CYSOS ENERGY</span>
            </div>
          </div>
        ) : (
          /* CMS ADMIN DASHBOARD CONTENT */
          <div className="flex-1 flex flex-col overflow-hidden bg-navy-950 text-white">
            
            {/* Navigation Bar */}
            <div className="flex items-center justify-between px-6 py-3 bg-navy-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                {[
                  { id: 'inbox', label: `Bandeja de Mensajes (${pendingCount} pendientes)` },
                  { id: 'kpis', label: 'Métricas & KPIs' },
                  { id: 'empresa', label: 'Misión y Visión' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-flame-500 to-gold-600 text-white shadow-flame-glow'
                        : 'text-slate-300 hover:text-white hover:bg-navy-800'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-4 text-xs font-bold">
                <span className="text-slate-300">Total: <strong className="text-white">{messages.length}</strong></span>
                <span className="text-amber-400">Pendientes: {pendingCount}</span>
                <span className="text-emerald-400">Atendidos: {respondedCount}</span>
              </div>
            </div>

            {/* TAB 1: INBOX */}
            {activeTab === 'inbox' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-navy-900 p-4 rounded-2xl border border-slate-800 shadow-lg">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Buscar por cliente, empresa, servicio..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full modern-input rounded-xl py-2 pl-10 pr-4 text-xs font-medium placeholder-slate-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gold-400" />
                    <span className="text-xs text-slate-300 font-extrabold">Filtrar:</span>
                    {['all', 'pending', 'responded'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setFilterStatus(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold capitalize ${
                          filterStatus === st
                            ? 'bg-gradient-to-r from-flame-500 to-gold-600 text-white shadow-flame-glow'
                            : 'bg-navy-950 text-slate-300 hover:text-white border border-slate-800'
                        }`}
                      >
                        {st === 'all' ? 'Todos' : st === 'pending' ? 'Pendientes 🟡' : 'Atendidos 🟢'}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredMessages.length === 0 ? (
                  <div className="py-16 text-center text-slate-400 space-y-2">
                    <MessageSquare className="w-10 h-10 mx-auto text-slate-500" />
                    <p className="text-sm font-medium">No hay mensajes registrados.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {filteredMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-6 rounded-2xl border transition-all shadow-lg ${
                          msg.status === 'pending'
                            ? 'border-gold-metallic/50 bg-navy-900/90'
                            : 'border-slate-800 bg-navy-950/90'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-gold-400 bg-navy-950 px-2.5 py-0.5 rounded-full border border-slate-800">
                              {msg.id}
                            </span>
                            <h4 className="text-base font-extrabold text-white">{msg.name}</h4>
                            <span className="text-xs text-flame-400 font-bold">({msg.company})</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-400">{msg.createdAt}</span>
                            <span
                              className={`px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                                msg.status === 'pending'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              }`}
                            >
                              {msg.status === 'pending' ? 'Pendiente' : 'Atendido'}
                            </span>
                          </div>
                        </div>

                        <div className="py-3 grid sm:grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-slate-400 font-semibold">Servicio Requerido: </span>
                            <span className="text-white font-extrabold">{msg.service}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-semibold">Ubicación / Campo: </span>
                            <span className="text-gold-400 font-bold">{msg.location}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-semibold">Correo: </span>
                            <a href={`mailto:${msg.email}`} className="text-gold-400 font-bold hover:underline">{msg.email}</a>
                          </div>
                          <div>
                            <span className="text-slate-400 font-semibold">Teléfono: </span>
                            <a href={`tel:${msg.phone}`} className="text-emerald-400 font-bold hover:underline">{msg.phone}</a>
                          </div>
                        </div>

                        <div className="p-3.5 bg-navy-950 rounded-xl border border-slate-800 text-xs text-slate-200 font-light italic mb-4">
                          "{msg.message}"
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openWhatsAppReply(msg)}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg"
                            >
                              <MessageSquare className="w-4 h-4" />
                              <span>Responder por WhatsApp</span>
                            </button>

                            <a
                              href={`mailto:${msg.email}?subject=Respuesta%20CYSOS%20ENERGY%20-%20Cotización%20${msg.service}`}
                              className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-850 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700"
                            >
                              <Mail className="w-4 h-4 text-gold-400" />
                              <span>Enviar Email</span>
                            </a>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateMessageStatus(msg.id, msg.status === 'pending' ? 'responded' : 'pending')}
                              className="px-3.5 py-2 rounded-xl bg-navy-900 hover:bg-navy-850 text-slate-300 text-xs font-bold flex items-center gap-1.5 border border-slate-800"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>{msg.status === 'pending' ? 'Marcar Atendido' : 'Marcar Pendiente'}</span>
                            </button>

                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="p-2 rounded-xl bg-navy-900 hover:bg-red-950 text-slate-400 hover:text-red-400 transition-colors border border-slate-800"
                              title="Eliminar mensaje"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: KPIS */}
            {activeTab === 'kpis' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                <div className="p-4 rounded-2xl bg-gold-metallic/10 border border-gold-metallic/30 text-xs text-gold-400 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-flame-500 flex-shrink-0" />
                  <span>
                    Las métricas modificadas aquí se actualizarán automáticamente en vivo en la página pública.
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {kpis.map((kpi) => (
                    <div key={kpi.id} className="luxury-glass p-6 rounded-2xl border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-gold-400 uppercase tracking-wider">{kpi.label}</span>
                        <span className="text-[10px] text-slate-400 font-mono">ID: {kpi.id}</span>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Valor Actual:</label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-gold-400">{kpi.prefix}</span>
                          <input
                            type="number"
                            step="any"
                            value={kpi.value}
                            onChange={(e) => updateKpi(kpi.id, e.target.value)}
                            className="flex-1 modern-input rounded-xl px-4 py-2 text-sm text-white font-extrabold border border-gold-metallic/30"
                          />
                          <span className="text-sm font-extrabold text-gold-400">{kpi.suffix}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 font-light italic">{kpi.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: EMPRESA */}
            {activeTab === 'empresa' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                <div className="luxury-glass p-6 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-flame-500" />
                    <span>Texto Oficial de la Misión Corporativa:</span>
                  </h4>
                  <textarea
                    rows="5"
                    value={companyInfo.mision}
                    onChange={(e) => updateCompanyInfoText('mision', e.target.value)}
                    className="w-full modern-input rounded-xl p-4 text-xs text-slate-200 leading-relaxed"
                  ></textarea>
                </div>

                <div className="luxury-glass p-6 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-gold-400" />
                    <span>Texto Oficial de la Visión Corporativa:</span>
                  </h4>
                  <textarea
                    rows="5"
                    value={companyInfo.vision}
                    onChange={(e) => updateCompanyInfoText('vision', e.target.value)}
                    className="w-full modern-input rounded-xl p-4 text-xs text-slate-200 leading-relaxed"
                  ></textarea>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
