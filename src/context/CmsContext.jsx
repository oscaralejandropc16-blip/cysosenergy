import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveToSupabase, loadAllFromSupabase } from '../services/supabaseService';

const CmsContext = createContext();

const INITIAL_MEDIA_LIBRARY = [
  { id: 'lib-1', name: 'Video Oficial de Operaciones en Campo (MP4)', type: 'video', url: '/videos/IMG_7557.mp4', date: '2026-08-14', tag: 'Video Portada' },
  { id: 'lib-2', name: 'Planta de Inyección y Manifold', type: 'image', url: '/images/IMG_7549.jpg', date: '2026-08-14', tag: 'Portada / Poster' },
  { id: 'lib-3', name: 'Equipo de Ingenieros en Yacimiento', type: 'image', url: '/images/IMG_7701.jpg', date: '2026-08-14', tag: 'Operaciones' },
  { id: 'lib-4', name: 'Operaciones de Izamiento y Taladro', type: 'image', url: '/images/IMG_7702.jpg', date: '2026-08-14', tag: 'Logística' },
  { id: 'lib-5', name: 'Unidad de Well Testing en Campo', type: 'image', url: '/images/ig_well_testing.png', date: '2026-08-14', tag: 'Pruebas' },
  { id: 'lib-6', name: 'Manifold de Seguridad y Válvulas', type: 'image', url: '/images/ig_valve_safety.png', date: '2026-08-14', tag: 'Seguridad' },
  { id: 'lib-7', name: 'Muestra Reológica de Crudo Pesado', type: 'image', url: '/images/ig_crude_sample.png', date: '2026-08-14', tag: 'Química EOR' },
  { id: 'lib-8', name: 'Múltiple de Producción en Faja del Orinoco', type: 'image', url: '/images/ig_manifold.png', date: '2026-08-14', tag: 'Producción' },
  { id: 'lib-9', name: 'Flota de Transporte Pesado y Volquetas', type: 'image', url: '/images/logistics_trucks.png', date: '2026-08-14', tag: 'Transporte' },
  { id: 'lib-10', name: 'Unidad de Coiled Tubing', type: 'image', url: '/images/coiled_tubing.png', date: '2026-08-14', tag: 'Pozos' },
  { id: 'lib-11', name: 'Logo Oficial Halliburton', type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Halliburton_logo.svg/320px-Halliburton_logo.svg.png', date: '2026-08-14', tag: 'Logo Cliente' },
  { id: 'lib-12', name: 'Logo Oficial SLB Schlumberger', type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/SLB_Logo_2022.svg/320px-SLB_Logo_2022.svg.png', date: '2026-08-14', tag: 'Logo Cliente' },
  { id: 'lib-13', name: 'Logo Oficial PDVSA', type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/PDVSA_Logo.svg/320px-PDVSA_Logo.svg.png', date: '2026-08-14', tag: 'Logo Cliente' }
];

const INITIAL_HERO_CONTENT = {
  videoUrl: '/videos/IMG_7557.mp4',
  posterUrl: '/images/IMG_7549.jpg',
  badgeText: 'Soluciones Integrales para la Industria Energética • Venezuela',
  titlePart1: 'Creamos Soluciones y',
  titleGradient: 'Resolvemos Desafíos',
  titlePart2: 'para la Industria Petrolera',
  subtitle: 'Integración de Ingeniería IPC, Procura Internacional, Logística Pesada y Química de Producción.',
  pillar1: 'Química de Producción',
  pillar2: 'Procura Internacional',
  pillar3: 'Logística Pesada',
  pillar4: 'Ingeniería IPC'
};

const INITIAL_PARTNERS = [
  { id: 'halliburton', name: 'HALLIBURTON', sub: 'Servicios de Yacimiento', contract: 'Alquiler de Equipos Livianos y Pesados en Base Maturín.', type: 'Multinacional USA', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Halliburton_logo.svg/320px-Halliburton_logo.svg.png' },
  { id: 'slb', name: 'SLB (Schlumberger)', sub: 'Líder Mundial en Tecnología', contract: 'Servicio de Transporte Pesado de Chutos, Bateas y Tolvas (3 años).', type: 'Multinacional USA', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/SLB_Logo_2022.svg/320px-SLB_Logo_2022.svg.png' },
  { id: 'pdvsa-petrojunin', name: 'PDVSA PETROJUNÍN', sub: 'Alianza ENI • Faja del Orinoco', contract: 'Servicios de Asfaltado, Inyección de Reductor de Viscosidad y Equipos Misceláneos.', type: 'Empresa Mixta PDVSA', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/PDVSA_Logo.svg/320px-PDVSA_Logo.svg.png' },
  { id: 'pdvsa-petromiranda', name: 'PDVSA PETROMIRANDA', sub: 'Alianza Rosneft • División Junín', contract: 'Saneamiento de Suelos y Cuerpos de Agua Afectados por Derrame de DCO.', type: 'Empresa Mixta PDVSA', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/PDVSA_Logo.svg/320px-PDVSA_Logo.svg.png' }
];

const INITIAL_MESSAGES = [
  { id: 'MSG-1001', name: 'Ing. Carlos Mendoza', company: 'PDVSA Petromonagas', email: 'cmendoza@petromonagas.ve', phone: '+58 414 0596012', service: 'Suministro de Química de Producción & Reductor de Viscosidad', location: 'Faja Petrolífera del Orinoco - Bloque Carabobo', message: 'Requerimos propuesta técnica para suministro e inyección de reductores permanentes de viscosidad, desmulsificantes y secuestrante de H2S para crudos pesados.', status: 'pending', createdAt: '2026-08-14 10:30' },
  { id: 'MSG-1002', name: 'Dra. Elena Rivas', company: 'Petrojunín / Petromiranda', email: 'erivas@petrojunin.com', phone: '+58 412 4817113', service: 'Unidad Flush By & Intervención de Pozos', location: 'Cuenca Maracaibo, Campo Boscán', message: 'Solicitud de unidad Flush By 24/7 y grúa telescópica de 110 toneladas para mantenimiento de sistemas BCP y reparación de pozos.', status: 'responded', createdAt: '2026-08-13 16:45' }
];

const INITIAL_KPIS = [
  { id: 'pozos', label: 'POZOS INTERVENIDOS', value: 450, prefix: '+', suffix: '', desc: 'En campos de crudo pesado y tradicional' },
  { id: 'viscosidad', label: 'REDUCCIÓN VISCOSIDAD', value: 98.4, prefix: '', suffix: '%', desc: 'Eficiencia en transporte de hidrocarburos' },
  { id: 'horas', label: 'HORAS SIN ACCIDENTES', value: 1250000, prefix: '+', suffix: 'hrs', desc: 'Certificación HSE de clase mundial' },
  { id: 'bpd', label: 'BARRILES DIARIOS FLUIDIZADOS', value: 120000, prefix: '+', suffix: 'BPD', desc: 'Optimización de flujo en oleoductos' }
];

const INITIAL_MEDIA = [
  { id: 'media-1', title: 'Well Testing & Pruebas de Pozo', type: 'photo', url: '/images/ig_well_testing.png', caption: 'Servicio especializado con equipos de Well Testing a pozos petroleros en Venezuela.', category: 'operaciones' },
  { id: 'media-2', title: 'Manifold de Pruebas & Válvulas de Seguridad', type: 'video', url: '/images/ig_valve_safety.png', videoUrl: '/videos/IMG_7557.mp4', caption: 'Maniobras de seguridad y válvula de control en manifold de pruebas de producción.', category: 'operaciones' },
  { id: 'media-3', title: 'Muestra Reológica de Crudo Pesado', type: 'photo', url: '/images/ig_crude_sample.png', caption: 'Muestra reológica de crudo pesado previo a la dosificación de reductor CYSOS EOR System.', category: 'laboratorio' },
  { id: 'media-4', title: 'Maniobras en Múltiple de Producción', type: 'video', url: '/images/ig_manifold.png', videoUrl: '/videos/IMG_7557.mp4', caption: 'Inspección técnica y maniobra de alineación en múltiple de producción en Faja del Orinoco.', category: 'operaciones' },
  { id: 'media-5', title: 'Inyección Continua EOR System', type: 'video', url: '/images/IMG_7549.jpg', videoUrl: '/videos/IMG_7557.mp4', caption: 'Operación de inyección continua de reductores de viscosidad CYSOS EOR System en yacimiento.', category: 'quimica' },
  { id: 'media-6', title: 'Equipo Multidisciplinario en Yacimiento', type: 'photo', url: '/images/IMG_7701.jpg', caption: 'Equipo multidisciplinario de profesionales e ingenieros CYSOS ENERGY en operaciones de campo.', category: 'equipo' },
  { id: 'truck-1', title: 'Camión Chuto', type: 'photo', url: '/images/logistics_trucks.png', caption: 'Vehículo automotor de operación libre, destinado al transporte de carga.', category: 'Logística, Izamiento y Transporte' },
  { id: 'truck-2', title: 'Chuto Volqueta', type: 'photo', url: '/images/logistics_trucks.png', caption: 'Unidad de arrastre destinada al traslado de productos a granel.', category: 'Logística, Izamiento y Transporte' },
  { id: 'truck-3', title: 'Chuto Tolva', type: 'photo', url: '/images/logistics_trucks.png', caption: 'Unidad de arrastre destinada al traslado de productos a granel, preferiblemente minerales en forma de pirámide.', category: 'Logística, Izamiento y Transporte' },
  { id: 'truck-4', title: 'Chuto Batea', type: 'photo', url: '/images/logistics_trucks.png', caption: 'Unidad semirremolque o remolque cuya carrocería es plataforma, se utiliza para cargas de productos químicos.', category: 'Logística, Izamiento y Transporte' },
  { id: 'truck-5', title: 'Chuto Vacuum', type: 'photo', url: '/images/logistics_trucks.png', caption: 'Unidad remolque con una estructura en forma cilíndrica horizontal, para fluidos (lodo, agua).', category: 'Logística, Izamiento y Transporte' },
  { id: 'truck-6', title: 'Chuto Low-Boy', type: 'photo', url: '/images/logistics_trucks.png', caption: 'Unidad semirremolque o remolque cuya carrocería es plataforma, para traslado de equipos.', category: 'Logística, Izamiento y Transporte' },
  { id: 'truck-7', title: 'Montacarga', type: 'photo', url: '/images/logistics_trucks.png', caption: 'Unidad de 2.5 ton. utilizada para levantar y movilizar grandes cantidades de materiales.', category: 'Logística, Izamiento y Transporte' },
  { id: 'truck-8', title: 'Retroexcavadora', type: 'photo', url: '/images/logistics_trucks.png', caption: 'Equipo diseñado para realizar movimiento de tierras y/o excavaciones.', category: 'Logística, Izamiento y Transporte' },
  { id: 'truck-9', title: 'Payloader Montacarga', type: 'photo', url: '/images/logistics_trucks.png', caption: 'Equipo utilizado para movilizar herramientas a gran escala en espacios abiertos.', category: 'Logística, Izamiento y Transporte' },
  { id: 'truck-10', title: 'Excavadora Jumbo 320 Cat', type: 'photo', url: '/images/logistics_trucks.png', caption: 'La excavadora Jumbo esta diseñada para realizar movimiento de tierras y/o excavaciones.', category: 'Logística, Izamiento y Transporte' },
  { id: 'truck-11', title: 'Payloader', type: 'photo', url: '/images/logistics_trucks.png', caption: 'Equipo diseñado para realizar movimiento de tierras, saneamiento y movilización de desechos.', category: 'Logística, Izamiento y Transporte' },
  { id: 'truck-12', title: 'Side Boom o Pluma Lateral', type: 'photo', url: '/images/logistics_trucks.png', caption: 'Es un equipo especial para el tendido y construcciones de líneas de tuberías.', category: 'Logística, Izamiento y Transporte' },
  { id: 'truck-13', title: 'Patrol', type: 'photo', url: '/images/logistics_trucks.png', caption: 'Es un equipo versátil que se encarga de operaciones únicas de movimientos de tierra.', category: 'Logística, Izamiento y Transporte' },
  { id: 'truck-14', title: 'Super Vactor', type: 'photo', url: '/images/logistics_trucks.png', caption: 'Equipo utilizado para el mantenimiento de alcantarillado, destape de cañerías, limpieza.', category: 'Logística, Izamiento y Transporte' },
  { id: 'truck-15', title: 'Vibrocompactador', type: 'photo', url: '/images/logistics_trucks.png', caption: 'Es una herramienta que se utiliza para compactar suelo, durante los procesos de construcción, en asfalto, cemento, o en cualquier tipo de terreno que tenga una superficie sólida.', category: 'Logística, Izamiento y Transporte' },
  { id: 'truck-16', title: 'Grúa Telescópica', type: 'photo', url: '/images/logistics_trucks.png', caption: 'Unidades utilizadas para carga y pesados, con capacidad de 60 ton, 70 ton y/o hasta 110 ton.', category: 'Logística, Izamiento y Transporte' },
  { id: 'truck-17', title: 'Unidad Flush By', type: 'photo', url: '/images/logistics_trucks.png', caption: 'Versatilidad: Ideal para Workover, Pulling y Completación.', category: 'Logística, Izamiento y Transporte' }
];

const INITIAL_COMPANY_INFO = {
  logoUrl: '', operationsVideoUrl: '/videos/maniobra.mp4', instagramPosts: '18', instagramFollowers: '3,573', instagramFollowing: '20',
  instagramBio: `Soluciones integrales y estratégicas para la industria energética. Eficiencia, tecnología y seguridad en cada proyecto.`,
  mision: `Brindar soluciones integrales en ingeniería, procura internacional, logística pesada, intervención de pozos y química de producción petrolera, con un equipo altamente capacitado de profesionales, técnicos y personal operativo. Nos comprometemos a ejecutar proyectos con los más altos estándares de calidad (ISO 9001) y seguridad HSE (PDVSA SI-HO-S), garantizando respuesta oportuna, efectividad y protección ambiental en Venezuela.`,
  vision: `Consolidarnos como la empresa venezolana líder en ingeniería, procura, construcción y servicios petroleros especializados, destacada por la innovación en soluciones para la recuperación de pozos, inyección de reductores de viscosidad y logística de izamiento pesado, garantizando la confianza de nuestros clientes y el crecimiento económico del país.`,
  direccion: `C.C. Terrazas del Norte II, Maturín, Edo. Monagas, Venezuela`, telefonos: `0414-0596012 / 0412-4817113`, email: `MANAGER@CYSOS.ENERGY`, rif: `J-50478054-4`
};

const INITIAL_SERVICES = [
  { id: 'srv-1', name: 'Química de Producción y Optimización', tagline: 'Suministro e Inyección de Especialidades Químicas', description: 'Suministro e inyección de reductores permanentes de viscosidad, desmulsificantes, rompedores rápidos tipo slug, dispersantes de asfaltenos/parafinas, xileno, ácidos especializados (HCl, Acético, HF), inhibidores de corrosión/incrustación y secuestrantes de H2S.', status: 'activo', icon: 'FlaskConical' },
  { id: 'srv-2', name: 'Intervención y Recuperación de Pozos (Workover & Flush By)', tagline: 'Equipos de Alta Potencia (350 HP a 750 HP) y Unidades 24/7', description: 'Reacondicionamiento total de pozos con taladros de alta potencia, unidades Flush By autotransportables para operaciones 24/7, reparación de sistemas BCP y ESP, y limpieza mecánica con molinos, escariadores y magnetos.', status: 'activo', icon: 'Flame' },
  { id: 'srv-3', name: 'Logística, Izamiento y Transporte Pesado', tagline: 'Grúas Telescópicas hasta 110 Toneladas y Flota Especializada', description: 'Flota de chutos con tolva, volqueta, batea, vacuum (transporte de fluidos/lodos) y low-boy. Grúas telescópicas (60, 70 y 110 ton), brazos hidráulicos (7 a 35 ton), Jumbo CAT 320, Side Boom y Vactor.', status: 'activo', icon: 'Truck' },
  { id: 'srv-4', name: 'Ingeniería, Procura y Suministros ISO 9001', tagline: 'Sourcing Internacional y Control de Presión API', description: 'Importación directa de tuberías ERW/sin costura, válvulas API y motores Cummins. Control de presión con preventores (BOP), chokes manuales, mangueras Chiksan, bombas triplex y alquiler de campers habitacionales.', status: 'activo', icon: 'Globe' }
];

export const CmsProvider = ({ children }) => {
  const [isDbLoaded, setIsDbLoaded] = useState(false);
  const [dbSyncStatus, setDbSyncStatus] = useState('idle');

  // Fallback inicial a localStorage para que la página cargue instantáneo
  const [mediaLibrary, setMediaLibrary] = useState(() => { try { const saved = localStorage.getItem('cysos_cms_media_library'); return (saved && Array.isArray(JSON.parse(saved))) ? JSON.parse(saved) : INITIAL_MEDIA_LIBRARY; } catch { return INITIAL_MEDIA_LIBRARY; } });
  const [heroContent, setHeroContent] = useState(() => { try { const saved = localStorage.getItem('cysos_cms_hero'); return saved ? JSON.parse(saved) : INITIAL_HERO_CONTENT; } catch { return INITIAL_HERO_CONTENT; } });
  const [partners, setPartners] = useState(() => { try { const saved = localStorage.getItem('cysos_cms_partners'); return (saved && Array.isArray(JSON.parse(saved))) ? JSON.parse(saved) : INITIAL_PARTNERS; } catch { return INITIAL_PARTNERS; } });
  const [messages, setMessages] = useState(() => { try { const saved = localStorage.getItem('cysos_cms_messages'); return (saved && Array.isArray(JSON.parse(saved))) ? JSON.parse(saved) : INITIAL_MESSAGES; } catch { return INITIAL_MESSAGES; } });
  const [kpis, setKpis] = useState(() => { try { const saved = localStorage.getItem('cysos_cms_kpis'); return (saved && Array.isArray(JSON.parse(saved))) ? JSON.parse(saved) : INITIAL_KPIS; } catch { return INITIAL_KPIS; } });
  const [mediaItems, setMediaItems] = useState(() => { try { const saved = localStorage.getItem('cysos_cms_media_v3'); return (saved && Array.isArray(JSON.parse(saved))) ? JSON.parse(saved) : INITIAL_MEDIA; } catch { return INITIAL_MEDIA; } });
  const [companyInfo, setCompanyInfo] = useState(() => { try { const saved = localStorage.getItem('cysos_cms_company_info'); return saved ? JSON.parse(saved) : INITIAL_COMPANY_INFO; } catch { return INITIAL_COMPANY_INFO; } });
  const [services, setServices] = useState(() => { try { const saved = localStorage.getItem('cysos_cms_services'); return (saved && Array.isArray(JSON.parse(saved))) ? JSON.parse(saved) : INITIAL_SERVICES; } catch { return INITIAL_SERVICES; } });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => { try { return localStorage.getItem('cysos_admin_session') === 'true'; } catch { return false; } });

  // 1. Carga inicial desde Supabase Database
  useEffect(() => {
    const initDatabase = async () => {
      setDbSyncStatus('syncing');
      const data = await loadAllFromSupabase();
      if (data) {
        if (data['cysos_cms_media_library']) setMediaLibrary(data['cysos_cms_media_library']);
        if (data['cysos_cms_hero']) setHeroContent(data['cysos_cms_hero']);
        if (data['cysos_cms_partners']) setPartners(data['cysos_cms_partners']);
        if (data['cysos_cms_messages']) setMessages(data['cysos_cms_messages']);
        if (data['cysos_cms_kpis']) setKpis(data['cysos_cms_kpis']);
        if (data['cysos_cms_media_v3']) setMediaItems(data['cysos_cms_media_v3']);
        if (data['cysos_cms_company_info']) setCompanyInfo(data['cysos_cms_company_info']);
        if (data['cysos_cms_services']) setServices(data['cysos_cms_services']);
        setDbSyncStatus('success');
      } else {
        setDbSyncStatus('error');
      }
      setIsDbLoaded(true);
    };
    initDatabase();
  }, []);

  // 2. Efectos de sincronización que guardan tanto en LocalStorage como en Supabase
  useEffect(() => {
    try { localStorage.setItem('cysos_cms_media_library', JSON.stringify(mediaLibrary)); } catch(e){}
    if (isDbLoaded) saveToSupabase('cysos_cms_media_library', mediaLibrary);
  }, [mediaLibrary, isDbLoaded]);

  useEffect(() => {
    try { localStorage.setItem('cysos_cms_hero', JSON.stringify(heroContent)); } catch(e){}
    if (isDbLoaded) saveToSupabase('cysos_cms_hero', heroContent);
  }, [heroContent, isDbLoaded]);

  useEffect(() => {
    try { localStorage.setItem('cysos_cms_partners', JSON.stringify(partners)); } catch(e){}
    if (isDbLoaded) saveToSupabase('cysos_cms_partners', partners);
  }, [partners, isDbLoaded]);

  useEffect(() => {
    try { localStorage.setItem('cysos_cms_messages', JSON.stringify(messages)); } catch(e){}
    if (isDbLoaded) saveToSupabase('cysos_cms_messages', messages);
  }, [messages, isDbLoaded]);

  useEffect(() => {
    try { localStorage.setItem('cysos_cms_kpis', JSON.stringify(kpis)); } catch(e){}
    if (isDbLoaded) saveToSupabase('cysos_cms_kpis', kpis);
  }, [kpis, isDbLoaded]);

  useEffect(() => {
    try { localStorage.setItem('cysos_cms_media_v3', JSON.stringify(mediaItems)); } catch(e){}
    if (isDbLoaded) saveToSupabase('cysos_cms_media_v3', mediaItems);
  }, [mediaItems, isDbLoaded]);

  useEffect(() => {
    try { localStorage.setItem('cysos_cms_company_info', JSON.stringify(companyInfo)); } catch(e){}
    if (isDbLoaded) saveToSupabase('cysos_cms_company_info', companyInfo);
  }, [companyInfo, isDbLoaded]);

  useEffect(() => {
    try { localStorage.setItem('cysos_cms_services', JSON.stringify(services)); } catch(e){}
    if (isDbLoaded) saveToSupabase('cysos_cms_services', services);
  }, [services, isDbLoaded]);

  // Funciones de Login
  const loginAdmin = (password) => {
    if (password === 'cysos2026' || password === 'admin') {
      setIsLoggedIn(true);
      try { localStorage.setItem('cysos_admin_session', 'true'); } catch (e) {}
      return { success: true };
    }
    return { success: false, error: 'Contraseña incorrecta.' };
  };

  const logoutAdmin = () => {
    setIsLoggedIn(false);
    try { localStorage.removeItem('cysos_admin_session'); } catch (e) {}
  };

  // Funciones de Mutación
  const addMediaToLibrary = (fileData) => {
    const item = { id: `lib-${Date.now()}`, date: new Date().toISOString().slice(0, 10), ...fileData };
    setMediaLibrary((prev) => [item, ...prev]);
    return item;
  };
  const deleteMediaFromLibrary = (id) => setMediaLibrary((prev) => prev.filter((item) => item.id !== id));
  const updateHeroContent = (field, value) => setHeroContent((prev) => ({ ...prev, [field]: value }));
  const updatePartner = (id, field, value) => setPartners((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  const addPartner = (newPartnerData) => setPartners((prev) => [...prev, { id: `partner-${Date.now()}`, ...newPartnerData }]);
  const deletePartner = (id) => setPartners((prev) => prev.filter((p) => p.id !== id));
  const addMessage = (newMessageData) => {
    const createdMsg = { id: `MSG-${Date.now().toString().slice(-4)}`, ...newMessageData, status: 'pending', createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16) };
    setMessages((prev) => [createdMsg, ...prev]);
    return createdMsg;
  };
  const updateMessageStatus = (id, newStatus) => setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, status: newStatus } : msg)));
  const deleteMessage = (id) => setMessages((prev) => prev.filter((msg) => msg.id !== id));
  const updateKpi = (id, field, value) => setKpis((prev) => prev.map((kpi) => (kpi.id === id ? { ...kpi, [field]: value } : kpi)));
  const updateMediaItem = (id, field, value) => setMediaItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  const addMediaItem = (newItem) => setMediaItems((prev) => [{ id: `media-${Date.now()}`, ...newItem }, ...prev]);
  const deleteMediaItem = (id) => setMediaItems((prev) => prev.filter((item) => item.id !== id));
  const updateService = (id, field, value) => setServices((prev) => prev.map((srv) => (srv.id === id ? { ...srv, [field]: value } : srv)));
  const updateCompanyInfoText = (field, text) => setCompanyInfo((prev) => ({ ...prev, [field]: text }));

  return (
    <CmsContext.Provider
      value={{
        mediaLibrary, addMediaToLibrary, deleteMediaFromLibrary,
        heroContent, updateHeroContent,
        partners, updatePartner, addPartner, deletePartner,
        messages, kpis, mediaItems, companyInfo, services,
        isAdminOpen, setIsAdminOpen, isLoggedIn, loginAdmin, logoutAdmin,
        addMessage, updateMessageStatus, deleteMessage, updateKpi,
        updateMediaItem, addMediaItem, deleteMediaItem, updateService, updateCompanyInfoText,
        dbSyncStatus // Proveemos el estado de sincro por si el admin panel quiere mostrar "Guardando en la nube..."
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms debe ser utilizado dentro de CmsProvider');
  }
  return context;
};
