import React, { useState, useRef } from 'react';
import { useCms } from '../context/CmsContext';
import { Logo } from './Logo';
import { 
  Lock, Mail, MessageSquare, Trash2, CheckCircle2, Search, Filter, 
  LogOut, Edit3, Image as ImageIcon, Key, Plus, ArrowLeft, Building, 
  MapPin, Phone, Video, Layers, Sparkles, Sliders, Briefcase, FileText, 
  Play, Eye, HelpCircle, Check, Upload, FolderOpen, X, CheckCircle, AlertTriangle, AtSign
} from 'lucide-react';

import { uploadToCloudinary, CLOUDINARY_CONFIG } from '../services/cloudinaryService';

export const AdminDashboardPage = ({ onReturnToWeb }) => {
  const { 
    isLoggedIn, loginAdmin, logoutAdmin,
    mediaLibrary = [], addMediaToLibrary, deleteMediaFromLibrary,
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
  const [activeTab, setActiveTab] = useState('partners');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [saveToast, setSaveToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('¡Cambio guardado y sincronizado con la web pública!');

  // Cloudinary Upload Progress State
  const [uploadingStatus, setUploadingStatus] = useState({ isUploading: false, progress: 0, fileName: '' });

  // WordPress-like Media Library Selector Modal State
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState(null); // { callback: (url) => void, filterType?: 'image' | 'video' }
  const [mediaFilter, setMediaFilter] = useState('all');

  // Confirmation Modal for Deletions
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { type: 'media'|'partner'|'library'|'message', id: string, title: string }

  // Helper to trigger a visual saved confirmation
  const triggerSaveNotification = (customMsg = '¡Cambio guardado y sincronizado con la web pública!') => {
    setToastMessage(customMsg);
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
    }, 3500);
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

  const safeMediaLibrary = Array.isArray(mediaLibrary) ? mediaLibrary : [];
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

  // Handle uploading a file directly to Cloudinary (25 GB Cloud Storage)
  const handleFileUpload = async (e, targetCallback = null) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    setUploadingStatus({ isUploading: true, progress: 5, fileName: file.name });

    try {
      // 1. Upload directly to Cloudinary Cloud CDN (25 GB permanent storage)
      const cloudinaryResult = await uploadToCloudinary(file, (percent) => {
        setUploadingStatus({ isUploading: true, progress: percent, fileName: file.name });
      });

      const permanentCloudUrl = cloudinaryResult.secure_url || cloudinaryResult.url;

      // 2. Add to CMS Media Library with the permanent Cloudinary CDN URL
      addMediaToLibrary({
        name: file.name,
        type: isVideo ? 'video' : 'image',
        url: permanentCloudUrl,
        tag: 'Nube Cloudinary 25GB'
      });

      // 3. Assign to the requested element (hero, partner, gallery, etc.)
      if (targetCallback) {
        targetCallback(permanentCloudUrl);
      }

      setUploadingStatus({ isUploading: false, progress: 100, fileName: '' });
      triggerSaveNotification(`✅ ¡${isVideo ? 'Video' : 'Foto'} subido y optimizado en la Nube de Cloudinary!`);
    } catch (error) {
      console.warn('Fallo en Cloudinary, usando respaldo local:', error);
      // Fallback to local DataURL if offline
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const dataUrl = uploadEvent.target.result;
        addMediaToLibrary({
          name: file.name,
          type: isVideo ? 'video' : 'image',
          url: dataUrl,
          tag: 'Respaldo Local'
        });
        if (targetCallback) {
          targetCallback(dataUrl);
        }
        setUploadingStatus({ isUploading: false, progress: 100, fileName: '' });
        triggerSaveNotification('¡Archivo cargado localmente!');
      };
      reader.readAsDataURL(file);
    }
  };

  const openMediaPicker = (callback, filterType = 'all') => {
    setMediaPickerTarget({ callback, filterType });
    setMediaPickerOpen(true);
  };

  const selectMediaItem = (url) => {
    if (mediaPickerTarget && mediaPickerTarget.callback) {
      mediaPickerTarget.callback(url);
    }
    setMediaPickerOpen(false);
    triggerSaveNotification();
  };

  const confirmDelete = () => {
    if (!deleteConfirm) return;
    const { type, id } = deleteConfirm;
    if (type === 'partner') {
      deletePartner(id);
    } else if (type === 'media') {
      deleteMediaItem(id);
    } else if (type === 'library') {
      deleteMediaFromLibrary(id);
    } else if (type === 'message') {
      deleteMessage(id);
    }
    setDeleteConfirm(null);
    triggerSaveNotification();
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
      
      {/* CLOUDINARY UPLOADING PROGRESS OVERLAY */}
      {uploadingStatus.isUploading && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-navy-950/95 backdrop-blur-2xl animate-fadeIn">
          <div className="luxury-glass w-full max-w-md rounded-3xl border border-gold-metallic/50 p-6 sm:p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-flame-500 via-orange-600 to-gold-600 text-white flex items-center justify-center mx-auto shadow-flame-glow animate-pulse">
              <Upload className="w-8 h-8 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-extrabold font-heading text-white">Subiendo a la Nube (Cloudinary 25 GB)</h3>
              <p className="text-xs text-gold-400 font-bold truncate max-w-xs mx-auto">
                {uploadingStatus.fileName}
              </p>
              <p className="text-[11px] text-slate-300 font-light">
                Comprimiendo y optimizando archivo para carga instantánea en teléfonos y computadoras...
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-3 bg-navy-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-flame-500 via-orange-500 to-gold-500 rounded-full transition-all duration-300 shadow-flame-glow"
                  style={{ width: `${uploadingStatus.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>Almacenamiento Cloudinary CDN</span>
                <span className="font-bold text-white">{uploadingStatus.progress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS TOAST NOTIFICATION */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-[130] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn border border-emerald-400">
          <Check className="w-5 h-5" />
          <span className="text-xs font-extrabold">{toastMessage}</span>
        </div>
      )}

      {/* CONFIRMATION MODAL FOR DELETIONS */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-navy-950/90 backdrop-blur-xl animate-fadeIn">
          <div className="luxury-glass w-full max-w-md rounded-3xl border border-red-500/40 p-6 sm:p-8 text-center space-y-5 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-red-500/15 text-red-400 flex items-center justify-center mx-auto border border-red-500/30">
              <AlertTriangle className="w-7 h-7" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-extrabold text-white">¿Deseas eliminar este elemento?</h3>
              <p className="text-xs text-slate-300 font-light">
                Estás a punto de quitar <strong className="text-white">"{deleteConfirm.title}"</strong>.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="px-5 py-2.5 rounded-xl bg-navy-900 text-slate-300 hover:text-white text-xs font-bold border border-slate-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold shadow-lg flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Sí, Eliminar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WORDPRESS-STYLE MEDIA LIBRARY SELECTOR MODAL */}
      {mediaPickerOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-navy-950/90 backdrop-blur-xl animate-fadeIn">
          <div className="luxury-glass w-full max-w-4xl max-h-[85vh] rounded-3xl border border-gold-metallic/40 p-6 sm:p-8 flex flex-col shadow-2xl space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gold-metallic/20 text-gold-400">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold font-heading text-white">Biblioteca de Medios</h3>
                  <p className="text-xs text-slate-400">Selecciona un archivo existente o sube uno nuevo desde tu computadora</p>
                </div>
              </div>

              <button
                onClick={() => setMediaPickerOpen(false)}
                className="p-2 rounded-xl bg-navy-900 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Upload Zone & Filter */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <label className="cursor-pointer px-5 py-2.5 rounded-xl bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 hover:from-flame-600 hover:to-gold-700 text-white text-xs font-extrabold flex items-center gap-2 shadow-flame-glow transition-transform hover:scale-105">
                <Upload className="w-4 h-4" />
                <span>Subir Foto o Video desde mi PC</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => handleFileUpload(e, selectMediaItem)}
                  className="hidden"
                />
              </label>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Filtrar:</span>
                {['all', 'image', 'video'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setMediaFilter(f)}
                    className={`px-3 py-1 rounded-lg font-bold text-xs capitalize ${
                      mediaFilter === f ? 'bg-gold-metallic text-navy-950' : 'bg-navy-900 text-slate-400'
                    }`}
                  >
                    {f === 'all' ? 'Todos' : f === 'image' ? 'Fotos/Logos' : 'Videos'}
                  </button>
                ))}
              </div>
            </div>

            {/* Media Grid */}
            <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[50vh]">
              {safeMediaLibrary
                .filter((item) => mediaFilter === 'all' || item.type === mediaFilter)
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => selectMediaItem(item.url)}
                    className="group relative aspect-video rounded-2xl overflow-hidden bg-navy-950 border border-slate-800 hover:border-gold-metallic cursor-pointer transition-all hover:scale-105 shadow-md flex flex-col justify-end p-2"
                  >
                    {item.type === 'video' ? (
                      <video src={item.url} muted className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <img src={item.url} alt={item.name} className="absolute inset-0 w-full h-full object-contain p-2 bg-navy-900/50" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-flame-950/80 transition-colors pointer-events-none" />

                    <div className="relative z-10 pointer-events-none">
                      <span className="text-[9px] font-mono text-gold-400 bg-black/70 px-1.5 py-0.5 rounded">
                        {item.type === 'video' ? '🎥 Video' : '🖼️ Imagen'}
                      </span>
                      <p className="text-[11px] font-bold text-white truncate mt-1">{item.name}</p>
                    </div>
                  </div>
                ))}
            </div>

          </div>
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
              { id: 'library', label: '2. Biblioteca de Medios', icon: FolderOpen, count: safeMediaLibrary.length, help: 'Fotos y videos guardados en la nube' },
              { id: 'partners', label: '3. Clientes & Logos', icon: Layers, count: safePartners.length, help: 'Carrusel de empresas asociadas' },
              { id: 'media', label: '4. Galería de Operaciones', icon: ImageIcon, count: safeMediaItems.length, help: 'Registro fotográfico y audiovisual' },
              { id: 'services', label: '5. Servicios & Divisiones', icon: Briefcase, count: safeServices.length, help: 'Las 4 divisiones operativas' },
              { id: 'kpis', label: '6. Cifras & Métricas (+450)', icon: Sliders, count: safeKpis.length, help: 'Indicadores operacionales clave' },
              { id: 'empresa', label: '7. Misión, Visión & Contacto', icon: FileText, count: null, help: 'Teléfonos, correos y dirección fiscal' },
              { id: 'inbox', label: '8. Bandeja de Cotizaciones', icon: MessageSquare, count: pendingCount, help: 'Solicitudes recibidas de clientes' }
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
        </aside>

        {/* MAIN WORKSPACE CONTENT AREA */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: HERO & VIDEO MANAGER */}
          {activeTab === 'hero' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="p-5 rounded-2xl bg-navy-900/90 border border-gold-metallic/30 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-white text-sm">Editor Visual de Portada</h4>
                  <p className="text-slate-300 font-light leading-relaxed">
                    Cambia el video de fondo y la foto de portada simplemente seleccionándolos de tu biblioteca o subiéndolos directo desde tu computadora.
                  </p>
                </div>
              </div>

              {/* LIVE INTERACTIVE VISUAL PREVIEW */}
              <div className="luxury-glass p-6 rounded-3xl border border-slate-800 space-y-4">
                <span className="text-xs font-extrabold text-gold-400 uppercase tracking-wider flex items-center gap-2">
                  <Eye className="w-4 h-4 text-flame-500" />
                  <span>Así se ve tu portada en vivo en la página web:</span>
                </span>

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

              {/* WORDPRESS-LIKE MEDIA ATTACHMENT BOXES */}
              <div className="luxury-glass p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
                
                {/* VIDEO SELECTOR BOX */}
                <div className="p-5 rounded-2xl bg-navy-900 border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <label className="text-xs font-extrabold text-white flex items-center gap-1.5 mb-0.5">
                        <Video className="w-3.5 h-3.5 text-flame-500" />
                        <span>Video de Fondo de la Portada:</span>
                      </label>
                      <span className="text-[11px] text-slate-400 font-light">Archivo de video MP4 que se reproduce automáticamente</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openMediaPicker((url) => updateHeroContent('videoUrl', url), 'video')}
                        className="px-3.5 py-2 rounded-xl bg-navy-950 hover:bg-navy-850 text-gold-400 hover:text-white border border-gold-metallic/30 text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <FolderOpen className="w-3.5 h-3.5" />
                        <span>Elegir de la Biblioteca</span>
                      </button>

                      <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-flame-600 hover:bg-flame-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-flame-glow transition-all">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Subir desde mi PC</span>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleFileUpload(e, (url) => updateHeroContent('videoUrl', url))}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* POSTER PHOTO SELECTOR BOX */}
                <div className="p-5 rounded-2xl bg-navy-900 border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <label className="text-xs font-extrabold text-white flex items-center gap-1.5 mb-0.5">
                        <ImageIcon className="w-3.5 h-3.5 text-gold-400" />
                        <span>Foto de Portada / Respaldo:</span>
                      </label>
                      <span className="text-[11px] text-slate-400 font-light">Imagen que se muestra mientras carga el video</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openMediaPicker((url) => updateHeroContent('posterUrl', url), 'image')}
                        className="px-3.5 py-2 rounded-xl bg-navy-950 hover:bg-navy-850 text-gold-400 hover:text-white border border-gold-metallic/30 text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <FolderOpen className="w-3.5 h-3.5" />
                        <span>Elegir de la Biblioteca</span>
                      </button>

                      <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-flame-600 hover:bg-flame-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-flame-glow transition-all">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Subir desde mi PC</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (url) => updateHeroContent('posterUrl', url))}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-black overflow-hidden flex-shrink-0 border border-slate-800">
                      <img src={heroContent.posterUrl} alt="Poster" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs font-mono text-slate-300 truncate flex-1">
                      Foto de Portada Actual
                    </span>
                  </div>
                </div>

                {/* TEXT FIELDS */}
                <div className="p-5 rounded-2xl bg-navy-900 border border-slate-800 space-y-3">
                  <label className="text-xs font-extrabold text-white flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-flame-500" />
                    <span>Título Principal de la Portada:</span>
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

                <div className="p-5 rounded-2xl bg-navy-900 border border-slate-800 space-y-2">
                  <label className="text-xs font-extrabold text-white flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-gold-400" />
                    <span>Subtítulo / Párrafo Explicativo:</span>
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

                <div className="p-5 rounded-2xl bg-navy-900 border border-slate-800 space-y-3">
                  <label className="text-xs font-extrabold text-white flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-flame-500" />
                    <span>Pilares Estratégicos de la Portada:</span>
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
          )}

          {/* TAB 2: DEDICATED MEDIA LIBRARY TAB */}
          {activeTab === 'library' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="luxury-glass p-8 rounded-3xl border border-gold-metallic/40 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gold-metallic/15 text-gold-400 flex items-center justify-center mx-auto border border-gold-metallic/30">
                  <Upload className="w-8 h-8" />
                </div>

                <div className="space-y-1 max-w-md mx-auto">
                  <h3 className="text-lg font-extrabold font-heading text-white">Subir Nuevas Fotos o Videos</h3>
                  <p className="text-xs text-slate-300 font-light">
                    Sube cualquier imagen o video desde tu computadora para usarlo en la portada, carrusel o galería.
                  </p>
                </div>

                <label className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 hover:from-flame-600 hover:to-gold-700 text-white font-extrabold text-xs shadow-flame-glow transition-all transform hover:scale-105">
                  <Upload className="w-4 h-4" />
                  <span>Seleccionar Archivos de mi PC</span>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => handleFileUpload(e)}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold font-heading text-white">Todos los Archivos Guardados ({safeMediaLibrary.length})</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {safeMediaLibrary.map((item) => (
                    <div key={item.id} className="luxury-glass p-3 rounded-2xl border border-slate-800 space-y-2 group relative">
                      <div className="aspect-video rounded-xl overflow-hidden bg-black relative border border-slate-800">
                        {item.type === 'video' ? (
                          <video src={item.url} muted className="w-full h-full object-cover" />
                        ) : (
                          <img src={item.url} alt={item.name} className="w-full h-full object-contain p-2 bg-navy-900/50" />
                        )}
                        <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-black/80 text-[9px] font-mono text-gold-400 flex items-center gap-1">
                          {item.type === 'video' ? <Video className="w-2.5 h-2.5" /> : <ImageIcon className="w-2.5 h-2.5" />}
                          <span>{item.type === 'video' ? 'Video' : 'Imagen'}</span>
                        </span>
                      </div>

                      <div className="text-xs">
                        <p className="font-bold text-white truncate text-[11px]">{item.name}</p>
                        <span className="text-[10px] text-slate-400 block">{item.date} • {item.tag}</span>
                      </div>

                      <button
                        onClick={() => setDeleteConfirm({ type: 'library', id: item.id, title: item.name })}
                        className="w-full py-1.5 rounded-lg bg-navy-900 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 text-[10px] font-bold flex items-center justify-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Eliminar Archivo</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: PARTNERS & CLIENT CAROUSEL (WITH PROMINENT LOGO UPLOADERS) */}
          {activeTab === 'partners' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Add New Partner Form */}
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

                  {/* Logo Selector Box */}
                  <div>
                    <label className="text-xs font-bold text-gold-400 block mb-1">Logo del Cliente (PNG / SVG):</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openMediaPicker((url) => setNewPartner((p) => ({ ...p, logoUrl: url })), 'image')}
                        className="px-3.5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-850 text-gold-400 text-xs font-extrabold border border-gold-metallic/30 flex items-center gap-1.5 shadow-sm"
                      >
                        <FolderOpen className="w-4 h-4" />
                        <span>Elegir Logo</span>
                      </button>
                      <label className="cursor-pointer px-3.5 py-2.5 rounded-xl bg-flame-600 hover:bg-flame-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-flame-glow">
                        <Upload className="w-4 h-4" />
                        <span>Subir de PC</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (url) => setNewPartner((p) => ({ ...p, logoUrl: url })))}
                          className="hidden"
                        />
                      </label>
                    </div>
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
                <h3 className="text-base font-extrabold font-heading text-white">Clientes Registrados en el Carrusel ({safePartners.length})</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {safePartners.map((partner) => (
                    <div key={partner.id} className="luxury-glass p-5 rounded-2xl border border-slate-800 space-y-4">
                      
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-14 rounded-xl bg-white/95 border border-white/90 flex items-center justify-center p-2 overflow-hidden flex-shrink-0 shadow-md">
                            {partner.logoUrl ? (
                              <img src={partner.logoUrl} alt={partner.name} className="max-w-full max-h-full object-contain" />
                            ) : (
                              <Building className="w-6 h-6 text-navy-900" />
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
                          onClick={() => setDeleteConfirm({ type: 'partner', id: partner.id, title: partner.name })}
                          className="p-2 rounded-xl bg-navy-900 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors"
                          title="Eliminar cliente"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-3 rounded-xl bg-navy-900 border border-slate-800 space-y-2">
                        <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5 text-gold-400" />
                          <span>Logo del Cliente:</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openMediaPicker((url) => updatePartner(partner.id, 'logoUrl', url), 'image')}
                            className="flex-1 py-2 rounded-xl bg-navy-950 hover:bg-navy-850 text-gold-400 text-xs font-extrabold border border-gold-metallic/30 flex items-center justify-center gap-1.5 transition-all"
                          >
                            <FolderOpen className="w-3.5 h-3.5" />
                            <span>Elegir Logo</span>
                          </button>
                          
                          <label className="cursor-pointer flex-1 py-2 rounded-xl bg-flame-600 hover:bg-flame-500 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-flame-glow transition-all">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Subir de PC</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e, (url) => updatePartner(partner.id, 'logoUrl', url))}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
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

          {/* TAB 4: MEDIA & GALLERY */}
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
                    <label className="text-xs font-bold text-slate-300 block mb-1">Foto / Portada *</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openMediaPicker((url) => setNewMedia((prev) => ({ ...prev, url })), 'image')}
                        className="px-3.5 py-2 rounded-xl bg-navy-950 text-gold-400 text-xs font-extrabold border border-gold-metallic/30 flex items-center gap-1"
                      >
                        <FolderOpen className="w-3.5 h-3.5" />
                        <span>Elegir Foto</span>
                      </button>
                      <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-flame-600 text-white text-xs font-extrabold flex items-center gap-1 shadow-flame-glow">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Subir de PC</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (url) => setNewMedia((prev) => ({ ...prev, url })))}
                          className="hidden"
                        />
                      </label>
                    </div>
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
                      <label className="text-xs font-bold text-slate-300 block mb-1">Video MP4</label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openMediaPicker((url) => setNewMedia((prev) => ({ ...prev, videoUrl: url })), 'video')}
                          className="px-3.5 py-2 rounded-xl bg-navy-950 text-gold-400 text-xs font-extrabold border border-gold-metallic/30 flex items-center gap-1"
                        >
                          <FolderOpen className="w-3.5 h-3.5" />
                          <span>Elegir Video</span>
                        </button>
                        <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-flame-600 text-white text-xs font-extrabold flex items-center gap-1 shadow-flame-glow">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Subir de PC</span>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleFileUpload(e, (url) => setNewMedia((prev) => ({ ...prev, videoUrl: url })))}
                            className="hidden"
                          />
                        </label>
                      </div>
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
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-gold-400 flex items-center gap-1">
                        {item.type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                        <span>{item.type === 'video' ? 'Video' : 'Fotografía'}</span>
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
                      
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => openMediaPicker((url) => updateMediaItem(item.id, 'url', url), 'image')}
                          className="flex-1 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-850 text-gold-400 text-xs font-extrabold border border-slate-800 flex items-center justify-center gap-1"
                        >
                          <FolderOpen className="w-3.5 h-3.5" />
                          <span>Cambiar Imagen</span>
                        </button>
                        <label className="cursor-pointer flex-1 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-850 text-slate-300 text-xs font-extrabold border border-slate-800 flex items-center justify-center gap-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Subir de PC</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, (url) => updateMediaItem(item.id, 'url', url))}
                            className="hidden"
                          />
                        </label>
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
                        onClick={() => setDeleteConfirm({ type: 'media', id: item.id, title: item.title })}
                        className="px-3 py-1 rounded-lg bg-navy-900 hover:bg-red-950 text-slate-400 hover:text-red-400 text-xs font-bold border border-slate-800 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Eliminar de la Web</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SERVICES & DIVISIONS */}
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

          {/* TAB 6: KPIS & METRICS */}
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

          {/* TAB 7: COMPANY & CONTACT INFO */}
          {activeTab === 'empresa' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* CYSOS ENERGY OFFICIAL LOGO CHANGER */}
              <div className="luxury-glass p-6 sm:p-8 rounded-3xl border border-gold-metallic/40 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-extrabold font-heading text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-gold-400" />
                      <span>Logo Oficial de CYSOS ENERGY (Barra Superior & Pie de Página)</span>
                    </h3>
                    <p className="text-xs text-slate-300 font-light mt-0.5">
                      Cambia el logotipo principal de la empresa que aparece en el encabezado de toda la página web.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openMediaPicker((url) => updateCompanyInfoText('logoUrl', url), 'image')}
                      className="px-3.5 py-2 rounded-xl bg-navy-950 hover:bg-navy-850 text-gold-400 text-xs font-extrabold border border-gold-metallic/30 flex items-center gap-1.5"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Elegir de la Biblioteca</span>
                    </button>
                    <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-flame-600 hover:bg-flame-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-flame-glow">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Subir Logo desde mi PC</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (url) => updateCompanyInfoText('logoUrl', url))}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-navy-950 rounded-2xl border border-slate-800 gap-4">
                  <div className="flex items-center gap-5">
                    <div className="p-4 bg-navy-900 rounded-2xl border border-gold-metallic/30 flex items-center justify-center min-w-[220px] min-h-[70px] shadow-inner">
                      <Logo showText={true} isDark={true} className="h-14 sm:h-16" imageClassName="h-14 sm:h-16 max-h-20" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">Vista Previa del Logo Actual</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{companyInfo.logoUrl ? 'Logo corporativo activo' : 'Logo vectorial prémium'}</span>
                      </span>
                    </div>
                  </div>

                  {companyInfo.logoUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        updateCompanyInfoText('logoUrl', '');
                        triggerSaveNotification();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-red-950 text-slate-400 hover:text-red-400 text-xs font-bold border border-slate-800"
                    >
                      Restaurar Logo Original
                    </button>
                  )}
                </div>
              </div>

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

                {/* EDITABLE INSTAGRAM STATS & BIO */}
                <div className="p-5 rounded-2xl bg-navy-900 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-white">
                    <AtSign className="w-4 h-4 text-flame-500" />
                    <span>Datos del Perfil de Instagram (@cysosenergy):</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-1">Publicaciones:</span>
                      <input
                        type="text"
                        value={companyInfo.instagramPosts || '18'}
                        onChange={(e) => {
                          updateCompanyInfoText('instagramPosts', e.target.value);
                          triggerSaveNotification();
                        }}
                        className="w-full modern-input rounded-xl p-2.5 text-xs text-white font-bold text-center"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-gold-400 font-bold block mb-1">Seguidores:</span>
                      <input
                        type="text"
                        value={companyInfo.instagramFollowers || '3,573'}
                        onChange={(e) => {
                          updateCompanyInfoText('instagramFollowers', e.target.value);
                          triggerSaveNotification();
                        }}
                        className="w-full modern-input rounded-xl p-2.5 text-xs text-gold-400 font-extrabold text-center"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block mb-1">Seguidos:</span>
                      <input
                        type="text"
                        value={companyInfo.instagramFollowing || '20'}
                        onChange={(e) => {
                          updateCompanyInfoText('instagramFollowing', e.target.value);
                          triggerSaveNotification();
                        }}
                        className="w-full modern-input rounded-xl p-2.5 text-xs text-white font-bold text-center"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Biografía Oficial de Instagram:</label>
                    <textarea
                      rows="2"
                      value={companyInfo.instagramBio || 'Soluciones integrales y estratégicas para la industria energética. Eficiencia, tecnología y seguridad en cada proyecto.'}
                      onChange={(e) => {
                        updateCompanyInfoText('instagramBio', e.target.value);
                        triggerSaveNotification();
                      }}
                      className="w-full modern-input rounded-xl p-3 text-xs text-slate-200"
                    ></textarea>
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

          {/* TAB 8: INBOX */}
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
                            className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-850 text-slate-300 text-xs font-medium flex items-center gap-2 border border-slate-700 transition-colors"
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
                            onClick={() => setDeleteConfirm({ type: 'message', id: msg.id, title: `Mensaje de ${msg.name}` })}
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
