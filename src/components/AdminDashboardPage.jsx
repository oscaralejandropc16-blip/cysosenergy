import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Logo } from './Logo';
import { 
  Lock, Mail, MessageSquare, Trash2, CheckCircle2, Search, Filter, 
  LogOut, Edit3, Image as ImageIcon, Key, Plus, ArrowLeft, Building, 
  MapPin, Phone, Video, Layers, Sparkles, Sliders, Briefcase, FileText, 
  Play, Eye, HelpCircle, Check, RefreshCw
} from 'lucide-react';

export const AdminDashboardPage = ({ onReturnToWeb }) => {
  const { 
    isLoggedIn, loginAdmin, logoutAdmin,
    heroContent = {}, updateHeroContent,
    partners = [], updatePartner, addPartner, deletePartner,
    messages = [], updateMessageStatus, deleteMessage,
    kpis = [], updateKpi,
    mediaItems = [], updateMediaItem, addMediaItem, deleteMediaItem,
    services = [], updateService,
    companyInfo = {}, updateCompanyInfoText 
  } = useCms();

  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('hero');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  // Helper to trigger a visual saved confirmation
  const triggerSaveNotification = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  // New Media Form State
  const [newMedia, setNewMedia] = useState({
    title: '',
    url: '',
    videoUrl: '',
    caption: '',
    type: 'photo',
    category: 'operaciones'
  });

  // New Partner Form State
  const [newPartner, setNewPartner] = useState({
    name: '',
    sub: '',
    contract: '',
    type: 'Empresa Mixta PDVSA',
    logoUrl: ''
  });

  const safeMediaItems = Array.isArray(mediaItems) ? mediaItems : [];
  const safePartners = Array.isArray(partners) ? partners : [];
  const safeMessages = Array.isArray(messages) ? messages : [];
  const safeKpis = Array.isArray(kpis) ? kpis : [];
  const safeServices = Array.isArray(services) ? services : [];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const res = loginAdmin(password);
    if (!res.success) {
      setLoginError(res.error);
    } else {
      setLoginError('');
    }
  };

  const handleAddMedia = (e) => {
    e.preventDefault();
    if (!newMedia.title || !newMedia.url) return;
    addMediaItem(newMedia);
    setNewMedia({
      title: '',
      url: '',
      videoUrl: '',
      caption: '',
      type: 'photo',
      category: 'operaciones'
    });
    triggerSaveNotification();
  };

  const handleAddPartner = (e) => {
    e.preventDefault();
    if (!newPartner.name) return;
    addPartner(newPartner);
    setNewPartner({
      name: '',
      sub: '',
      contract: '',
      type: 'Empresa Mixta PDVSA',
      logoUrl: ''
    });
    triggerSaveNotification();
  };

  const filteredMessages = safeMessages.filter((msg) => {
    if (!msg) return false;
    const matchesFilter = filterStatus === 'all' || msg.status === filterStatus;
    const matchesSearch = 
      (msg.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (msg.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (msg.service || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (msg.location || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = safeMessages.filter((m) => m && m.status === 'pending').length;
  const respondedCount = safeMessages.filter((m) => m && m.status === 'responded').length;

  const openWhatsAppReply = (msg) => {
    const cleanPhone = (msg.phone || '').replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Estimado(a) ${msg.name}, recibimos su solicitud en CYSOS ENERGY C.A. para ${msg.company} sobre "${msg.service}". Le contactamos para coordinar la propuesta técnica.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-navy-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-metallic/10 rounded-full blur-[180px] pointer-events-none" />

        <div className="luxury-glass w-full max-w-md p-8 sm:p-10 rounded-3xl border border-gold-metallic/40 shadow-2xl relative z-10 text-center space-y-6">
          <button
            onClick={onReturnToWeb}
            className="inline-flex items-center gap-2 text-xs font-extrabold text-gold-400 hover:text-white bg-navy-900 px-3.5 py-1.5 rounded-full border border-slate-800 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la Web Pública</span>
          </button>

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-flame-500 via-orange-600 to-gold-600 text-white flex items-center justify-center shadow-flame-glow mx-auto animate-float">
            <Key className="w-8 h-8 text-white" />
          </div>

          <div className="space-y-2">
            <Logo showText={true} isDark={true} className="justify-center" />
            <h2 className="text-2xl font-extrabold font-heading text-white pt-2">Panel CMS de Control</h2>
            <p className="text-xs text-slate-300 font-light">
              Exclusivo para la administración de CYSOS ENERGY C.A. Ingrese la clave corporativa para editar contenido, imágenes y mensajes.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Contraseña de acceso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full modern-input rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none text-center font-bold tracking-widest border border-gold-metallic/30"
              />
              {loginError && <p className="text-xs text-red-400 font-extrabold mt-2">{loginError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 hover:from-flame-600 hover:to-gold-700 shadow-flame-glow transition-all transform hover:scale-[1.02]"
            >
              Ingresar al CMS
            </button>
          </form>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <Lock className="w-3.5 h-3.5 text-gold-400" />
            <span>Acceso Privado Cifrado • CYSOS ENERGY</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 text-white flex flex-col font-sans relative">
      
      {/* SUCCESS TOAST NOTIFICATION */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-[100] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn border border-emerald-400">
          <Check className="w-5 h-5" />
          <span className="text-xs font-extrabold">¡Cambio guardado y sincronizado con la web pública!</span>
        </div>
      )}

      {/* FULL PAGE HEADER */}
      <header className="bg-navy-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button
              onClick={onReturnToWeb}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-950 border border-slate-800 text-gold-400 hover:text-white hover:border-gold-metallic text-xs font-extrabold transition-all shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Volver a la Web Pública</span>
            </button>
            
            <span className="h-6 w-px bg-slate-800 hidden sm:block" />
            <Logo showText={true} isDark={true} className="hidden sm:flex" />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-metallic/15 border border-gold-metallic/30 text-gold-400 text-xs font-extrabold uppercase shadow-gold-glow">
              <Lock className="w-3.5 h-3.5 text-flame-500" />
              <span>Gestión Global de Contenido Activa</span>
            </div>

            <button
              onClick={logoutAdmin}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-850 hover:bg-red-950 text-slate-300 hover:text-red-400 border border-slate-800 text-xs font-extrabold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>

        </div>
      </header>

      {/* WORKSPACE LAYOUT */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 grid lg:grid-cols-12 gap-8">
        
        {/* SIDE NAVIGATION */}
        <aside className="lg:col-span-3 space-y-3">
          <div className="luxury-glass p-3 rounded-2xl border border-slate-800 space-y-1">
            {[
              { id: 'hero', label: '1. Portada & Video Inicial', icon: Video, count: null, help: 'El video y textos que abren la web' },
              { id: 'partners', label: '2. Clientes & Logos', icon: Layers, count: safePartners.length, help: 'Carrusel de empresas asociadas' },
              { id: 'media', label: '3. Fotos & Videos de Campo', icon: ImageIcon, count: safeMediaItems.length, help: 'Galería de fotos de Instagram' },
              { id: 'services', label: '4. Servicios & Divisiones', icon: Briefcase, count: safeServices.length, help: 'Las 4 divisiones operativas' },
              { id: 'kpis', label: '5. Cifras & Métricas (+450)', icon: Sliders, count: safeKpis.length, help: 'Números que se mueven en la web' },
              { id: 'empresa', label: '6. Misión, Visión & Contacto', icon: FileText, count: null, help: 'Teléfonos, emails y dirección' },
              { id: 'inbox', label: '7. Bandeja de Cotizaciones', icon: MessageSquare, count: pendingCount, help: 'Mensajes enviados por clientes' }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex flex-col p-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 text-white shadow-flame-glow'
                      : 'text-slate-300 hover:text-white hover:bg-navy-900'
                  }`}
                >
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-extrabold">{tab.label}</span>
                    </div>
                    {tab.count !== null && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        isActive ? 'bg-navy-950 text-gold-400' : 'bg-navy-900 text-slate-400 border border-slate-800'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] text-left mt-1 font-light ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                    {tab.help}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="bg-navy-900/80 p-4 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-1 font-light">
            <span className="font-bold text-gold-400 block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-flame-500" />
              <span>¿Cómo funciona?</span>
            </span>
            <p className="leading-relaxed text-[11px]">
              Escribe en cualquier casilla y los cambios se guardan y reflejan automáticamente en la página web pública.
            </p>
          </div>
        </aside>

        {/* MAIN WORKSPACE CONTENT AREA */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: HERO & VIDEO MANAGER (CLEAR & INTUITIVE) */}
          {activeTab === 'hero' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* EXPLANATORY HEADER */}
              <div className="p-5 rounded-2xl bg-navy-900/90 border border-gold-metallic/30 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-white text-sm">¿Qué es esta sección?</h4>
                  <p className="text-slate-300 font-light leading-relaxed">
                    Aquí controlas el **video de fondo de operaciones**, la **foto de portada** y los **textos principales** que las personas ven al entrar a la página web de CYSOS ENERGY.
                  </p>
                </div>
              </div>

              {/* LIVE INTERACTIVE VISUAL PREVIEW */}
              <div className="luxury-glass p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-gold-400 uppercase tracking-wider flex items-center gap-2">
                    <Eye className="w-4 h-4 text-flame-500" />
                    <span>Así se ve tu portada en la página web en este momento:</span>
                  </span>
                </div>

                <div className="aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden bg-black border border-slate-800 relative shadow-2xl flex flex-col justify-center items-center text-center p-6">
                  <video
                    key={heroContent.videoUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={heroContent.posterUrl || '/images/IMG_7549.jpg'}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.70]"
                  >
                    <source src={heroContent.videoUrl || '/videos/IMG_7557.mp4'} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/60 pointer-events-none" />

                  {/* Dynamic Headline Preview on top of video */}
                  <div className="relative z-10 max-w-xl space-y-2 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-navy-900/90 text-gold-400 text-[10px] font-bold border border-gold-metallic/40 inline-block">
                      {heroContent.badgeText || 'Soluciones Integrales para la Industria Energética'}
                    </span>
                    <h3 className="text-base sm:text-xl font-black text-white leading-tight drop-shadow-lg">
                      {heroContent.titlePart1} <span className="text-flame-400">{heroContent.titleGradient}</span> {heroContent.titlePart2}
                    </h3>
                    <p className="text-[11px] text-slate-200 line-clamp-2 drop-shadow">
                      {heroContent.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* CLEAR & EASY FORM FIELDS */}
              <div className="luxury-glass p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <h3 className="text-base font-extrabold font-heading text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-flame-500" />
                    <span>Editar Video y Textos de la Portada</span>
                  </h3>
                </div>

                <div className="space-y-4">
                  
                  {/* Field 1: Video */}
                  <div className="p-4 rounded-2xl bg-navy-900 border border-slate-800 space-y-2">
                    <label className="text-xs font-extrabold text-white block">
                      📹 Video de Fondo (Ruta o URL del archivo MP4):
                    </label>
                    <input
                      type="text"
                      value={heroContent.videoUrl || ''}
                      onChange={(e) => {
                        updateHeroContent('videoUrl', e.target.value);
                        triggerSaveNotification();
                      }}
                      placeholder="Ej. /videos/IMG_7557.mp4 o https://..."
                      className="w-full modern-input rounded-xl p-3 text-xs font-mono text-gold-400 font-bold"
                    />
                    <p className="text-[11px] text-slate-400 font-light">
                      💡 El video oficial grabado en campo se encuentra en: <code className="text-gold-400">/videos/IMG_7557.mp4</code>.
                    </p>
                  </div>

                  {/* Field 2: Static Cover Photo */}
                  <div className="p-4 rounded-2xl bg-navy-900 border border-slate-800 space-y-2">
                    <label className="text-xs font-extrabold text-white block">
                      🖼️ Foto de Portada (Imagen estática previa al video):
                    </label>
                    <input
                      type="text"
                      value={heroContent.posterUrl || ''}
                      onChange={(e) => {
                        updateHeroContent('posterUrl', e.target.value);
                        triggerSaveNotification();
                      }}
                      placeholder="/images/IMG_7549.jpg"
                      className="w-full modern-input rounded-xl p-3 text-xs font-mono text-slate-300"
                    />
                  </div>

                  {/* Field 3: Title */}
                  <div className="p-4 rounded-2xl bg-navy-900 border border-slate-800 space-y-3">
                    <label className="text-xs font-extrabold text-white block">
                      ✍️ Título Principal de la Portada:
                    </label>
                    
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div>
                        <span className="text-[10px] text-slate-400 block mb-1">Inicio de la frase:</span>
                        <input
                          type="text"
                          value={heroContent.titlePart1 || ''}
                          onChange={(e) => {
                            updateHeroContent('titlePart1', e.target.value);
                            triggerSaveNotification();
                          }}
                          className="w-full modern-input rounded-xl p-2.5 text-xs text-white font-bold"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] text-flame-400 block mb-1">Palabras en dorado/naranja:</span>
                        <input
                          type="text"
                          value={heroContent.titleGradient || ''}
                          onChange={(e) => {
                            updateHeroContent('titleGradient', e.target.value);
                            triggerSaveNotification();
                          }}
                          className="w-full modern-input rounded-xl p-2.5 text-xs text-flame-400 font-extrabold"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 block mb-1">Final de la frase:</span>
                        <input
                          type="text"
                          value={heroContent.titlePart2 || ''}
                          onChange={(e) => {
                            updateHeroContent('titlePart2', e.target.value);
                            triggerSaveNotification();
                          }}
                          className="w-full modern-input rounded-xl p-2.5 text-xs text-white font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Field 4: Subtitle */}
                  <div className="p-4 rounded-2xl bg-navy-900 border border-slate-800 space-y-2">
                    <label className="text-xs font-extrabold text-white block">
                      📝 Subtítulo / Párrafo Explicativo:
                    </label>
                    <textarea
                      rows="2"
                      value={heroContent.subtitle || ''}
                      onChange={(e) => {
                        updateHeroContent('subtitle', e.target.value);
                        triggerSaveNotification();
                      }}
                      className="w-full modern-input rounded-xl p-3 text-xs text-slate-200"
                    ></textarea>
                  </div>

                  {/* Field 5: 4 Pillars */}
                  <div className="p-4 rounded-2xl bg-navy-900 border border-slate-800 space-y-3">
                    <label className="text-xs font-extrabold text-white block">
                      🏛️ Los 4 Botones / Especialidades que aparecen debajo del título:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <span className="text-[10px] text-slate-400 block mb-1">Botón 1:</span>
                        <input
                          type="text"
                          value={heroContent.pillar1 || ''}
                          onChange={(e) => {
                            updateHeroContent('pillar1', e.target.value);
                            triggerSaveNotification();
                          }}
                          className="w-full modern-input rounded-lg p-2 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block mb-1">Botón 2:</span>
                        <input
                          type="text"
                          value={heroContent.pillar2 || ''}
                          onChange={(e) => {
                            updateHeroContent('pillar2', e.target.value);
                            triggerSaveNotification();
                          }}
                          className="w-full modern-input rounded-lg p-2 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block mb-1">Botón 3:</span>
                        <input
                          type="text"
                          value={heroContent.pillar3 || ''}
                          onChange={(e) => {
                            updateHeroContent('pillar3', e.target.value);
                            triggerSaveNotification();
                          }}
                          className="w-full modern-input rounded-lg p-2 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block mb-1">Botón 4:</span>
                        <input
                          type="text"
                          value={heroContent.pillar4 || ''}
                          onChange={(e) => {
                            updateHeroContent('pillar4', e.target.value);
                            triggerSaveNotification();
                          }}
                          className="w-full modern-input rounded-lg p-2 text-xs font-bold"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PARTNERS & CLIENT CAROUSEL */}
          {activeTab === 'partners' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="p-5 rounded-2xl bg-navy-900/90 border border-gold-metallic/30 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-white text-sm">¿Qué es esta sección?</h4>
                  <p className="text-slate-300 font-light leading-relaxed">
                    Aquí puedes modificar, agregar o eliminar los clientes del **carrusel infinito en movimiento** (Halliburton, SLB, PDVSA, etc.).
                  </p>
                </div>
              </div>

              {/* Add New Partner */}
              <div className="luxury-glass p-6 sm:p-8 rounded-3xl border border-gold-metallic/30 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <h3 className="text-base font-extrabold font-heading text-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-flame-500" />
                    <span>Agregar Nuevo Cliente al Carrusel</span>
                  </h3>
                </div>

                <form onSubmit={handleAddPartner} className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Nombre de la Empresa / Cliente *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. BAKER HUGHES"
                      value={newPartner.name}
                      onChange={(e) => setNewPartner((p) => ({ ...p, name: e.target.value }))}
                      className="w-full modern-input rounded-xl p-3 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Subtítulo / Especialidad</label>
                    <input
                      type="text"
                      placeholder="Ej. Servicios de Fluidos de Perforación"
                      value={newPartner.sub}
                      onChange={(e) => setNewPartner((p) => ({ ...p, sub: e.target.value }))}
                      className="w-full modern-input rounded-xl p-3 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Tipo de Cliente / Badge</label>
                    <input
                      type="text"
                      placeholder="Ej. Multinacional / Empresa Mixta"
                      value={newPartner.type}
                      onChange={(e) => setNewPartner((p) => ({ ...p, type: e.target.value }))}
                      className="w-full modern-input rounded-xl p-3 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">URL o Ruta del Logo (PNG / SVG)</label>
                    <input
                      type="text"
                      placeholder="https://... o /images/logo.png"
                      value={newPartner.logoUrl}
                      onChange={(e) => setNewPartner((p) => ({ ...p, logoUrl: e.target.value }))}
                      className="w-full modern-input rounded-xl p-3 text-xs font-mono text-gold-400"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-300 block mb-1">Objeto / Alcance del Contrato</label>
                    <textarea
                      rows="2"
                      placeholder="Descripción del contrato u operaciones conjuntas..."
                      value={newPartner.contract}
                      onChange={(e) => setNewPartner((p) => ({ ...p, contract: e.target.value }))}
                      className="w-full modern-input rounded-xl p-3 text-xs"
                    ></textarea>
                  </div>

                  <div className="sm:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 shadow-flame-glow flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Guardar Cliente en el Carrusel</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Current Partners List */}
              <div className="space-y-4">
                <h3 className="text-base font-extrabold font-heading text-white">Clientes Registrados con Vista Previa ({safePartners.length})</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {safePartners.map((partner) => (
                    <div key={partner.id} className="luxury-glass p-5 rounded-2xl border border-slate-800 space-y-4">
                      
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-12 rounded-xl bg-navy-950 border border-slate-700 flex items-center justify-center p-1.5 overflow-hidden flex-shrink-0 shadow-inner">
                            {partner.logoUrl ? (
                              <img src={partner.logoUrl} alt={partner.name} className="max-w-full max-h-full object-contain filter brightness-110" />
                            ) : (
                              <Building className="w-6 h-6 text-gold-400" />
                            )}
                          </div>
                          <div>
                            <input
                              type="text"
                              value={partner.name}
                              onChange={(e) => {
                                updatePartner(partner.id, 'name', e.target.value);
                                triggerSaveNotification();
                              }}
                              className="modern-input rounded-lg px-2.5 py-1 text-xs font-extrabold text-white"
                            />
                            <span className="text-[10px] text-gold-400 block mt-0.5">{partner.type}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            deletePartner(partner.id);
                            triggerSaveNotification();
                          }}
                          className="p-2 rounded-xl bg-navy-900 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors"
                          title="Eliminar cliente"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-0.5">Ruta / URL del Logo:</label>
                          <input
                            type="text"
                            value={partner.logoUrl || ''}
                            onChange={(e) => {
                              updatePartner(partner.id, 'logoUrl', e.target.value);
                              triggerSaveNotification();
                            }}
                            className="w-full modern-input rounded-lg p-2 text-xs font-mono text-gold-400"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400 block mb-0.5">Subtítulo:</label>
                          <input
                            type="text"
                            value={partner.sub || ''}
                            onChange={(e) => {
                              updatePartner(partner.id, 'sub', e.target.value);
                              triggerSaveNotification();
                            }}
                            className="w-full modern-input rounded-lg p-2 text-xs text-slate-300"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400 block mb-0.5">Contrato / Descripción:</label>
                          <textarea
                            rows="2"
                            value={partner.contract || ''}
                            onChange={(e) => {
                              updatePartner(partner.id, 'contract', e.target.value);
                              triggerSaveNotification();
                            }}
                            className="w-full modern-input rounded-lg p-2 text-xs text-slate-300"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: MEDIA & GALLERY */}
          {activeTab === 'media' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="luxury-glass p-6 sm:p-8 rounded-3xl border border-gold-metallic/30 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <h3 className="text-base font-extrabold font-heading text-white flex items-center gap-2">
                    <Plus className="w-5 h-5 text-flame-500" />
                    <span>Agregar Foto o Video a la Galería</span>
                  </h3>
                </div>

                <form onSubmit={handleAddMedia} className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Título de la Publicación *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Maniobra en Pozo Faja del Orinoco"
                      value={newMedia.title}
                      onChange={(e) => setNewMedia((prev) => ({ ...prev, title: e.target.value }))}
                      className="w-full modern-input rounded-xl p-3 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Ruta de la Imagen / Poster *</label>
                    <input
                      type="text"
                      required
                      placeholder="/images/IMG_7701.jpg o URL..."
                      value={newMedia.url}
                      onChange={(e) => setNewMedia((prev) => ({ ...prev, url: e.target.value }))}
                      className="w-full modern-input rounded-xl p-3 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Tipo</label>
                    <select
                      value={newMedia.type}
                      onChange={(e) => setNewMedia((prev) => ({ ...prev, type: e.target.value }))}
                      className="w-full modern-input rounded-xl p-3 text-xs bg-navy-950 text-white"
                    >
                      <option value="photo">Fotografía</option>
                      <option value="video">Video MP4</option>
                    </select>
                  </div>

                  {newMedia.type === 'video' && (
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Ruta de Video MP4</label>
                      <input
                        type="text"
                        placeholder="/videos/IMG_7557.mp4"
                        value={newMedia.videoUrl}
                        onChange={(e) => setNewMedia((prev) => ({ ...prev, videoUrl: e.target.value }))}
                        className="w-full modern-input rounded-xl p-3 text-xs"
                      />
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-300 block mb-1">Leyenda / Caption</label>
                    <textarea
                      rows="2"
                      placeholder="Descripción de la maniobra..."
                      value={newMedia.caption}
                      onChange={(e) => setNewMedia((prev) => ({ ...prev, caption: e.target.value }))}
                      className="w-full modern-input rounded-xl p-3 text-xs"
                    ></textarea>
                  </div>

                  <div className="sm:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 shadow-flame-glow flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Guardar en la Galería</span>
                    </button>
                  </div>
                </form>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {safeMediaItems.map((item) => (
                  <div key={item.id} className="luxury-glass p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="aspect-video rounded-xl overflow-hidden bg-black relative border border-slate-800 shadow-md">
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-gold-400">
                        {item.type === 'video' ? '🎥 Video' : '📷 Foto'}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">Título:</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            updateMediaItem(item.id, 'title', e.target.value);
                            triggerSaveNotification();
                          }}
                          className="w-full modern-input rounded-lg p-2 text-xs font-bold text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">Ruta de Imagen:</label>
                        <input
                          type="text"
                          value={item.url}
                          onChange={(e) => {
                            updateMediaItem(item.id, 'url', e.target.value);
                            triggerSaveNotification();
                          }}
                          className="w-full modern-input rounded-lg p-2 text-xs font-mono text-gold-400"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">Leyenda:</label>
                        <textarea
                          rows="2"
                          value={item.caption}
                          onChange={(e) => {
                            updateMediaItem(item.id, 'caption', e.target.value);
                            triggerSaveNotification();
                          }}
                          className="w-full modern-input rounded-lg p-2 text-xs font-light text-slate-300"
                        ></textarea>
                      </div>
                    </div>

                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => {
                          deleteMediaItem(item.id);
                          triggerSaveNotification();
                        }}
                        className="px-3 py-1 rounded-lg bg-navy-900 hover:bg-red-950 text-slate-400 hover:text-red-400 text-xs font-bold border border-slate-800 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES & DIVISIONS */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid gap-6">
                {safeServices.map((srv) => (
                  <div key={srv.id} className="luxury-glass p-6 rounded-3xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <input
                        type="text"
                        value={srv.name}
                        onChange={(e) => {
                          updateService(srv.id, 'name', e.target.value);
                          triggerSaveNotification();
                        }}
                        className="modern-input rounded-xl px-3 py-1.5 text-sm font-extrabold text-white w-full max-w-md"
                      />
                      <span className="text-xs text-gold-400 font-bold uppercase">{srv.id}</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <label className="text-slate-400 font-bold block">Tagline / Subtítulo Técnico:</label>
                      <input
                        type="text"
                        value={srv.tagline || ''}
                        onChange={(e) => {
                          updateService(srv.id, 'tagline', e.target.value);
                          triggerSaveNotification();
                        }}
                        className="w-full modern-input rounded-xl p-3 text-xs text-gold-400 font-bold"
                      />

                      <label className="text-slate-400 font-bold block pt-2">Descripción Completa del Servicio:</label>
                      <textarea
                        rows="3"
                        value={srv.description || ''}
                        onChange={(e) => {
                          updateService(srv.id, 'description', e.target.value);
                          triggerSaveNotification();
                        }}
                        className="w-full modern-input rounded-xl p-3 text-xs text-slate-200 leading-relaxed"
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: KPIS & METRICS */}
          {activeTab === 'kpis' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid sm:grid-cols-2 gap-5">
                {safeKpis.map((kpi) => (
                  <div key={kpi.id} className="luxury-glass p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={kpi.label}
                        onChange={(e) => {
                          updateKpi(kpi.id, 'label', e.target.value);
                          triggerSaveNotification();
                        }}
                        className="modern-input rounded-lg px-2.5 py-1 text-xs font-extrabold text-gold-400 uppercase tracking-wider"
                      />
                      <span className="text-[10px] text-slate-500 font-mono">{kpi.id}</span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Valor Numérico:</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={kpi.prefix || ''}
                          onChange={(e) => {
                            updateKpi(kpi.id, 'prefix', e.target.value);
                            triggerSaveNotification();
                          }}
                          placeholder="Prefix"
                          className="w-16 modern-input rounded-xl p-2 text-xs font-bold text-gold-400 text-center"
                        />
                        <input
                          type="number"
                          step="any"
                          value={kpi.value}
                          onChange={(e) => {
                            updateKpi(kpi.id, 'value', parseFloat(e.target.value) || 0);
                            triggerSaveNotification();
                          }}
                          className="flex-1 modern-input rounded-xl p-2 text-sm text-white font-extrabold text-center"
                        />
                        <input
                          type="text"
                          value={kpi.suffix || ''}
                          onChange={(e) => {
                            updateKpi(kpi.id, 'suffix', e.target.value);
                            triggerSaveNotification();
                          }}
                          placeholder="Suffix"
                          className="w-16 modern-input rounded-xl p-2 text-xs font-bold text-gold-400 text-center"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 block mb-1">Descripción Corta:</label>
                      <input
                        type="text"
                        value={kpi.desc || ''}
                        onChange={(e) => {
                          updateKpi(kpi.id, 'desc', e.target.value);
                          triggerSaveNotification();
                        }}
                        className="w-full modern-input rounded-lg p-2 text-xs text-slate-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: COMPANY & CONTACT INFO */}
          {activeTab === 'empresa' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="luxury-glass p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
                <h3 className="text-base font-extrabold font-heading text-white">Datos de Contacto & Corporativos</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Teléfonos Oficiales</label>
                    <input
                      type="text"
                      value={companyInfo.telefonos || ''}
                      onChange={(e) => {
                        updateCompanyInfoText('telefonos', e.target.value);
                        triggerSaveNotification();
                      }}
                      className="w-full modern-input rounded-xl p-3 text-xs text-emerald-400 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Correo Electrónico Oficial</label>
                    <input
                      type="text"
                      value={companyInfo.email || ''}
                      onChange={(e) => {
                        updateCompanyInfoText('email', e.target.value);
                        triggerSaveNotification();
                      }}
                      className="w-full modern-input rounded-xl p-3 text-xs text-gold-400 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Dirección de Sede Principal</label>
                    <input
                      type="text"
                      value={companyInfo.direccion || ''}
                      onChange={(e) => {
                        updateCompanyInfoText('direccion', e.target.value);
                        triggerSaveNotification();
                      }}
                      className="w-full modern-input rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">RIF de la Empresa</label>
                    <input
                      type="text"
                      value={companyInfo.rif || 'J-50478054-4'}
                      onChange={(e) => {
                        updateCompanyInfoText('rif', e.target.value);
                        triggerSaveNotification();
                      }}
                      className="w-full modern-input rounded-xl p-3 text-xs text-slate-300 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Misión Corporativa:</label>
                    <textarea
                      rows="4"
                      value={companyInfo.mision || ''}
                      onChange={(e) => {
                        updateCompanyInfoText('mision', e.target.value);
                        triggerSaveNotification();
                      }}
                      className="w-full modern-input rounded-xl p-3 text-xs text-slate-200 leading-relaxed"
                    ></textarea>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Visión Corporativa:</label>
                    <textarea
                      rows="4"
                      value={companyInfo.vision || ''}
                      onChange={(e) => {
                        updateCompanyInfoText('vision', e.target.value);
                        triggerSaveNotification();
                      }}
                      className="w-full modern-input rounded-xl p-3 text-xs text-slate-200 leading-relaxed"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: INBOX (CALM, MINIMALIST & EYE-FRIENDLY) */}
          {activeTab === 'inbox' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="bg-navy-900/60 p-4 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar cotización por nombre, empresa o servicio..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-navy-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-600"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400 font-medium">Estado:</span>
                  {[
                    { id: 'all', label: `Todos (${safeMessages.length})` },
                    { id: 'pending', label: `Pendientes (${pendingCount})` },
                    { id: 'responded', label: `Atendidos (${respondedCount})` }
                  ].map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setFilterStatus(st.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        filterStatus === st.id
                          ? 'bg-slate-200 text-slate-900 shadow-sm'
                          : 'bg-navy-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {filteredMessages.length === 0 ? (
                <div className="py-20 text-center text-slate-500 space-y-2">
                  <MessageSquare className="w-10 h-10 mx-auto text-slate-600 stroke-1" />
                  <p className="text-sm font-medium">No hay cotizaciones registradas con ese criterio.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-6 rounded-2xl border transition-all ${
                        msg.status === 'pending'
                          ? 'bg-navy-900/70 border-slate-700/80 shadow-md'
                          : 'bg-navy-950/60 border-slate-800/60 opacity-85'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-slate-400 bg-navy-950 px-2.5 py-1 rounded-md border border-slate-800">
                            {msg.id}
                          </span>
                          <div>
                            <h4 className="text-base font-bold text-white leading-tight">{msg.name}</h4>
                            <span className="text-xs text-slate-400 font-medium">{msg.company}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400">{msg.createdAt}</span>
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              msg.status === 'pending'
                                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {msg.status === 'pending' ? 'Por Atender' : 'Atendido'}
                          </span>
                        </div>
                      </div>

                      <div className="py-4 grid sm:grid-cols-2 gap-3 text-xs text-slate-300 leading-relaxed">
                        <div>
                          <span className="text-slate-400 block text-[11px]">Servicio Solicitado:</span>
                          <strong className="text-white font-semibold">{msg.service}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px]">Ubicación / Campo:</span>
                          <span className="text-slate-200">{msg.location}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px]">Correo Electrónico:</span>
                          <a href={`mailto:${msg.email}`} className="text-slate-200 hover:text-white hover:underline">{msg.email}</a>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[11px]">Teléfono de Contacto:</span>
                          <a href={`tel:${msg.phone}`} className="text-slate-200 hover:text-white hover:underline">{msg.phone}</a>
                        </div>
                      </div>

                      <div className="p-4 bg-navy-950/80 rounded-xl border border-slate-800/80 text-xs text-slate-300 font-light italic leading-relaxed mb-4">
                        "{msg.message}"
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/60">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openWhatsAppReply(msg)}
                            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Responder por WhatsApp</span>
                          </button>

                          <a
                            href={`mailto:${msg.email}?subject=Cotización%20CYSOS%20ENERGY%20-%20${msg.service}`}
                            className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-slate-300 text-xs font-medium flex items-center gap-2 border border-slate-700 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span>Enviar Email</span>
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              updateMessageStatus(msg.id, msg.status === 'pending' ? 'responded' : 'pending');
                              triggerSaveNotification();
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-navy-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium flex items-center gap-1.5 border border-slate-800 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>{msg.status === 'pending' ? 'Marcar Atendido' : 'Marcar Pendiente'}</span>
                          </button>

                          <button
                            onClick={() => {
                              deleteMessage(msg.id);
                              triggerSaveNotification();
                            }}
                            className="p-2 rounded-lg bg-navy-900 hover:bg-red-950 text-slate-500 hover:text-red-400 border border-slate-800 transition-colors"
                            title="Eliminar registro"
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

        </main>

      </div>
    </div>
  );
};

export default AdminDashboardPage;
