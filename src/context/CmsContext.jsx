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
  posterUrl: '/images/cysos_casco_pov.jpg',
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
  { id: 'media-1', title: 'Identidad y Seguridad en Campo CYSOS', type: 'photo', url: '/images/cysos_casco_pov.jpg', caption: 'Compromiso y presencia de ingenieros de campo en operaciones de crudo pesado en Venezuela.', category: 'equipo' },
  { id: 'media-2', title: 'Unidad de Inyección Química y Protección Contra Incendios', type: 'photo', url: '/images/cysos_skid_detalle.jpg', caption: 'Gabinete de inyección continua con extintor presurizado y rotulación industrial oficial.', category: 'quimica' },
  { id: 'media-3', title: 'Operación y Apertura de Skid en Pozo Activo', type: 'photo', url: '/images/cysos_skid_operador.jpg', caption: 'Técnico de campo realizando inspección de líneas y bombas de dosificación en macolla.', category: 'operaciones' },
  { id: 'media-4', title: 'Panorámica Operacional en la Faja del Orinoco', type: 'photo', url: '/images/cysos_balancin_sol.jpg', caption: 'Balancín petrolero y sistema de inyección química continua bajo cielo oriental.', category: 'operaciones' },
  { id: 'media-5', title: 'Placa de Fabricación Oficial y Registro Legal', type: 'photo', url: '/images/cysos_placa_tecnica.jpg', caption: 'Modelo CyS 2026-I homologado ante el SAPI y con registro ambiental RACDA.', category: 'certificaciones' },
  { id: 'media-6', title: 'Equipo Multidisciplinario en Yacimiento', type: 'photo', url: '/images/cysos_equipo_uniformes.jpg', caption: 'Personal técnico con uniforme oficial CYSOS ENERGY en inspección de campo.', category: 'equipo' },
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
  logoUrl: 'https://res.cloudinary.com/wv92q44j/image/upload/v1787175974/t7ut2s7wz85xhjlsaooe.png',
  operationsVideoUrl: '/videos/maniobra.mp4',
  instagramPosts: '18',
  instagramFollowers: '3,573',
  instagramFollowing: '20',
  instagramBio: `Soluciones integrales y estratégicas para la industria energética. Eficiencia, tecnología y seguridad en cada proyecto.`,
  mision: `Brindar soluciones integrales en ingeniería, procura internacional, logística pesada, intervención de pozos y química de producción petrolera, con un equipo altamente capacitado de profesionales, técnicos y personal operativo. Nos comprometemos a ejecutar proyectos con los más altos estándares de calidad (ISO 9001) y seguridad HSE (PDVSA SI-HO-S), garantizando respuesta oportuna, efectividad y protección ambiental en Venezuela.`,
  vision: `Consolidarnos como la empresa venezolana líder en ingeniería, procura, construcción y servicios petroleros especializados, destacada por la innovación en soluciones para la recuperación de pozos, inyección de reductores de viscosidad y logística de izamiento pesado, garantizando la confianza de nuestros clientes y el crecimiento económico del país.`,
  direccion: `C.C. Terrazas del Norte II, Maturín, Edo. Monagas, Venezuela`,
  telefonos: `0414-0596012 / 0412-4817113`,
  email: `MANAGER@CYSOS.ENERGY`,
  rif: `J-50478054-4`
};

const INITIAL_SERVICES = [
  {
    id: 'intervencion',
    category: 'División 1: Intervención y Recuperación de Pozos',
    title: 'Workover, Pulling y Unidad Kenmex 24/7',
    name: 'Intervención de Pozos',
    image: '/images/coiled_tubing.png',
    videoUrl: '/videos/IMG_7557.mp4',
    bgVideoUrl: '',
    icon: 'Flame',
    summary: 'Reacondicionamiento total de pozos y extracción de tuberías/bombas con taladros de alta potencia (350 HP a 750 HP), Unidad Kenmex para operaciones de subsuelo 24/7 y mantenimiento técnico especializado.',
    items: [
      { name: 'Workover y Pulling', desc: 'Reacondicionamiento total de pozos y extracción de tuberías/bombas con taladros de alta potencia (350 HP a 750 HP).' },
      { name: 'Mantenimiento y Reparación Técnica', desc: 'Reparación especializada de bombas industriales, sistemas BCP y ESP, y reparación de plantas eléctricas.' },
      { name: 'Unidad Kenmex', desc: 'Operaciones de subsuelo 24/7 con personal certificado para intervenciones profundas y completación.' },
      { name: 'Limpieza Mecánica', desc: 'Herramientas especializadas como molinos, escariadores y magnetos para eliminar residuos y sedimentos.' }
    ]
  },
  {
    id: 'quimica',
    category: 'División 2: Química de Producción y Optimización',
    title: 'Reductores de Viscosidad & Desemulsionantes de Alto Rendimiento',
    name: 'Química de Producción',
    image: '/images/cysos_quimica_lipesa.jpg',
    videoUrl: '/videos/maniobra.mp4',
    bgVideoUrl: '',
    icon: 'FlaskConical',
    summary: 'Servicio integral de suministro e inyección de especialidades químicas diseñadas para maximizar la eficiencia operativa y proteger la infraestructura.',
    items: [
      { name: 'Optimización de Crudos Pesados', desc: 'Reductor permanente de viscosidad (en fase de hidrocarburos), desmulsificantes y rompedores rápidos tipo slug para una separación eficiente de fases, dispersantes de parafinas/asfáltenos y dispersante de crudo, reductor de fricción para mejora de flujo en tuberías.' },
      { name: 'Estimulación y Tratamiento de Pozos', desc: 'Suministro de ácidos especializados, ácido clorhídrico, ácido acético y mezcla de HCl y HF, sistemas de limpieza con xileno, solvente mutual y humectante de sólidos, surfactantes a base de agua para tratamientos específicos.' },
      { name: 'Protección de Activos y Acondicionamiento', desc: 'Inhibidores de corrosión e incrustación para preservar la integridad de equipos, antiespumantes y clarificantes para el control de procesos, secuestrante para la gestión de gases ácidos.' }
    ]
  },
  {
    id: 'logistica',
    category: 'División 3: Logística, Izamiento y Transporte Pesado',
    title: 'Grúas Telescópicas hasta 110 Toneladas y Maquinaria Pesada',
    name: 'Logística & Izamiento',
    image: '/images/cysos_camion_tambores_campo.jpg',
    videoUrl: '/videos/IMG_7557.mp4',
    bgVideoUrl: '',
    icon: 'Truck',
    summary: 'Flota especializada de transporte pesado para carga y fluidos, grúas telescópicas certificadas de hasta 110 toneladas y maquinaria pesada CAT para movimiento de tierra.',
    items: [
      { name: 'Transporte Especializado', desc: 'Flota de chutos con tolva, batea, vacuum y low-boy para carga pesada y fluidos.' },
      { name: 'Equipos de Izamiento', desc: 'Alquiler de grúas telescópicas con capacidad de hasta 110 toneladas y brazos hidráulicos.' },
      { name: 'Movimiento de Tierra', desc: 'Operaciones con excavadoras jumbo, retroexcavadoras, payloaders y vibrocompactadores.' }
    ]
  },
  {
    id: 'procura',
    category: 'División 4: Ingeniería, Procura y Suministros Industriales (ISO 9001)',
    title: 'Sourcing Internacional y Control de Presión API',
    name: 'Procura ISO 9001',
    image: '/images/cysos_tote_quimico.jpg',
    videoUrl: '/videos/IMG_7557.mp4',
    bgVideoUrl: '',
    icon: 'Globe',
    summary: 'Ingeniería, procura y suministros industriales con estándares de calidad ISO 9001, sourcing internacional directo desde USA y equipos de control de presión.',
    items: [
      { name: 'Sourcing Internacional', desc: 'Alianzas directas para la importación de tuberías (ERW/Sin costura), válvulas API y motores Cummins.' },
      { name: 'Control de Presión', desc: 'Alquiler y venta de preventores, chokes manuales, mangueras Chiksan y bombas triplex.' },
      { name: 'Alquiler de Equipos Periféricos', desc: 'Campers habitacionales, torres de iluminación, montacargas y contenedores para residuos peligrosos.' }
    ]
  }
];

const INITIAL_ALLIANCES = [
  {
    id: 'cysos',
    name: 'Cysos Energy',
    category: 'Química de Producción & EOR',
    desc: 'Optimización del transporte de crudos pesados mediante tecnologías de reducción de viscosidad.',
    highlights: ['Reducción de viscosidad hasta 92%', 'Ahorro de diluyente hasta 38%', 'Desemulsionante de alta eficiencia'],
    badge: 'Líder en Tecnología Química',
    icon: 'FlaskConical',
    logoUrl: '/images/cysos_logo.png',
    color: 'from-flame-500 via-orange-600 to-amber-500',
    glow: 'bg-flame-500/20',
    borderGlow: 'hover:border-flame-500/50'
  },
  {
    id: 'mg-services',
    name: 'MG Services Group',
    category: 'Logística, Izamiento & Carga Pesada',
    desc: '17 años de experiencia en transporte de carga pesada y equipos de izamiento con grúas de hasta 110 toneladas.',
    highlights: ['Grúas telescópicas hasta 110 Ton', 'Flota de chutos vacuum y bateas', 'Movimiento de tierra y jumbo 320'],
    badge: '17 Años de Experiencia',
    icon: 'Truck',
    logoUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/1787255337665-sfwf1ooj88.png',
    color: 'from-amber-400 via-gold-500 to-orange-600',
    glow: 'bg-gold-400/20',
    borderGlow: 'hover:border-gold-400/50'
  },
  {
    id: 'shekinah',
    name: 'Shekinah Group',
    category: 'Sourcing Internacional & Procura USA',
    desc: 'Sourcing directo desde USA y soporte técnico especializado con garantía local en Venezuela.',
    highlights: ['Importación directa desde USA', 'Tuberías ERW y válvulas API', 'Control de presión y bombas triplex'],
    badge: 'Alianza Global USA',
    icon: 'Globe',
    logoUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/1787255346033-p7gqo3sin2.png',
    color: 'from-emerald-400 via-teal-500 to-cyan-600',
    glow: 'bg-emerald-400/20',
    borderGlow: 'hover:border-emerald-400/50'
  },
  {
    id: 'nwrm',
    name: 'Inversiones Nwrm',
    category: 'Intervención & Rehabilitación de Pozos',
    desc: 'Rehabilitación y reparación de pozos con taladros de Workover y Pulling de 350 HP a 750 HP.',
    highlights: ['Taladros de 350 HP a 750 HP', 'Mantenimiento de sistemas BCP/ESP', 'Operaciones de subsuelo 24/7'],
    badge: 'Capacidad de 350-750 HP',
    icon: 'Flame',
    logoUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/1787255353467-2lvmy4yn9m3.png',
    color: 'from-orange-500 via-red-600 to-flame-600',
    glow: 'bg-red-500/20',
    borderGlow: 'hover:border-red-500/50'
  }
];

export const CmsProvider = ({ children }) => {
  const [isDbLoaded, setIsDbLoaded] = useState(false);
  const [dbSyncStatus, setDbSyncStatus] = useState('idle');

  // Inicializar todo estrictamente con los defaults (100% cloud, 0 local)
  const [heroContent, setHeroContent] = useState(INITIAL_HERO_CONTENT);
  const [partners, setPartners] = useState(INITIAL_PARTNERS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [kpis, setKpis] = useState(INITIAL_KPIS);
  const [mediaItems, setMediaItems] = useState(INITIAL_MEDIA);
  const [companyInfo, setCompanyInfo] = useState(INITIAL_COMPANY_INFO);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [alliances, setAlliances] = useState(INITIAL_ALLIANCES);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => { 
    try { 
      const session = localStorage.getItem('cysos_admin_session');
      const expiry = localStorage.getItem('cysos_admin_session_expiry');
      if (session === 'true' && expiry) {
        if (new Date().getTime() < parseInt(expiry, 10)) {
          return true;
        } else {
          localStorage.removeItem('cysos_admin_session');
          localStorage.removeItem('cysos_admin_session_expiry');
        }
      }
      return false;
    } catch { return false; } 
  });

  // 1. Carga inicial desde Supabase Database
  useEffect(() => {
    const initDatabase = async () => {
      setDbSyncStatus('syncing');
      const data = await loadAllFromSupabase();
      if (data) {
        if (data['cysos_cms_hero']) setHeroContent(data['cysos_cms_hero']);
        if (data['cysos_cms_partners']) setPartners(data['cysos_cms_partners']);
        if (data['cysos_cms_messages']) setMessages(data['cysos_cms_messages']);
        if (data['cysos_cms_kpis']) setKpis(data['cysos_cms_kpis']);
        if (data['cysos_cms_media_v3']) setMediaItems(data['cysos_cms_media_v3']);
        if (data['cysos_cms_company_info']) setCompanyInfo(data['cysos_cms_company_info']);
        if (data['cysos_cms_services']) setServices(data['cysos_cms_services']);
        if (data['cysos_cms_alliances']) setAlliances(data['cysos_cms_alliances']);
        setDbSyncStatus('success');
      } else {
        setDbSyncStatus('error');
      }
      setIsDbLoaded(true);
    };
    initDatabase();
  }, []);

  // Funciones de Login

  // Funciones de Login
  const loginAdmin = (password) => {
    if (password === 'cysos2026' || password === 'admin') {
      setIsLoggedIn(true);
      try { 
        localStorage.setItem('cysos_admin_session', 'true'); 
        const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem('cysos_admin_session_expiry', expiry.toString());
      } catch (e) {}
      return { success: true };
    }
    return { success: false, error: 'Contraseña incorrecta.' };
  };

  const logoutAdmin = () => {
    setIsLoggedIn(false);
    try { 
      localStorage.removeItem('cysos_admin_session'); 
      localStorage.removeItem('cysos_admin_session_expiry');
    } catch (e) {}
  };

  // Funciones de Mutación
  const updateHeroContent = (field, value) => {
    setHeroContent((prev) => {
      const newState = { ...prev, [field]: value };
      saveToSupabase('cysos_cms_hero', newState);
      return newState;
    });
  };

  const updatePartner = (id, field, value) => {
    setPartners((prev) => {
      const newState = prev.map((p) => (p.id === id ? { ...p, [field]: value } : p));
      saveToSupabase('cysos_cms_partners', newState);
      return newState;
    });
  };

  const addPartner = (newPartnerData) => {
    setPartners((prev) => {
      const newState = [...prev, { id: `partner-${Date.now()}`, ...newPartnerData }];
      saveToSupabase('cysos_cms_partners', newState);
      return newState;
    });
  };

  const deletePartner = (id) => {
    setPartners((prev) => {
      const newState = prev.filter((p) => p.id !== id);
      saveToSupabase('cysos_cms_partners', newState);
      return newState;
    });
  };

  const addMessage = (newMessageData) => {
    const createdMsg = { id: `MSG-${Date.now().toString().slice(-4)}`, ...newMessageData, status: 'pending', createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16) };
    setMessages((prev) => {
      const newState = [createdMsg, ...prev];
      saveToSupabase('cysos_cms_messages', newState);
      return newState;
    });
    return createdMsg;
  };

  const updateMessageStatus = (id, newStatus) => {
    setMessages((prev) => {
      const newState = prev.map((msg) => (msg.id === id ? { ...msg, status: newStatus } : msg));
      saveToSupabase('cysos_cms_messages', newState);
      return newState;
    });
  };

  const deleteMessage = (id) => {
    setMessages((prev) => {
      const newState = prev.filter((msg) => msg.id !== id);
      saveToSupabase('cysos_cms_messages', newState);
      return newState;
    });
  };

  const updateKpi = (id, field, value) => {
    setKpis((prev) => {
      const newState = prev.map((kpi) => (kpi.id === id ? { ...kpi, [field]: value } : kpi));
      saveToSupabase('cysos_cms_kpis', newState);
      return newState;
    });
  };

  const updateMediaItem = (id, field, value) => {
    setMediaItems((prev) => {
      const newState = prev.map((item) => (item.id === id ? { ...item, [field]: value } : item));
      saveToSupabase('cysos_cms_media_v3', newState);
      return newState;
    });
  };

  const addMediaItem = (newItem) => {
    setMediaItems((prev) => {
      const newState = [{ id: `media-${Date.now()}`, ...newItem }, ...prev];
      saveToSupabase('cysos_cms_media_v3', newState);
      return newState;
    });
  };

  const deleteMediaItem = (id) => {
    setMediaItems((prev) => {
      const newState = prev.filter((item) => item.id !== id);
      saveToSupabase('cysos_cms_media_v3', newState);
      return newState;
    });
  };

  const updateService = (id, field, value) => {
    setServices((prev) => {
      const newState = prev.map((srv) => (srv.id === id ? { ...srv, [field]: value } : srv));
      saveToSupabase('cysos_cms_services', newState);
      return newState;
    });
  };

  const updateCompanyInfoText = (field, text) => {
    setCompanyInfo((prev) => {
      const newState = { ...prev, [field]: text };
      saveToSupabase('cysos_cms_company_info', newState);
      return newState;
    });
  };

  const updateAllianceLogo = (id, url) => {
    setAlliances((prev) => {
      const newState = prev.map((a) => (a.id === id ? { ...a, logoUrl: url } : a));
      saveToSupabase('cysos_cms_alliances', newState);
      return newState;
    });
  };

  return (
    <CmsContext.Provider
      value={{
        heroContent, updateHeroContent,
        partners, updatePartner, addPartner, deletePartner,
        messages, kpis, mediaItems, companyInfo, services, alliances,
        isAdminOpen, setIsAdminOpen, isLoggedIn, loginAdmin, logoutAdmin,
        addMessage, updateMessageStatus, deleteMessage, updateKpi,
        updateMediaItem, addMediaItem, deleteMediaItem, updateService, updateCompanyInfoText, updateAllianceLogo,
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
