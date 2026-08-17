import React, { createContext, useContext, useState, useEffect } from 'react';

const CmsContext = createContext();

const INITIAL_MEDIA_LIBRARY = [
  {
    id: 'lib-1',
    name: 'Video Oficial de Operaciones en Campo (MP4)',
    type: 'video',
    url: '/videos/IMG_7557.mp4',
    date: '2026-08-14',
    tag: 'Video Portada'
  },
  {
    id: 'lib-2',
    name: 'Planta de Inyección y Manifold',
    type: 'image',
    url: '/images/IMG_7549.jpg',
    date: '2026-08-14',
    tag: 'Portada / Poster'
  },
  {
    id: 'lib-3',
    name: 'Equipo de Ingenieros en Yacimiento',
    type: 'image',
    url: '/images/IMG_7701.jpg',
    date: '2026-08-14',
    tag: 'Operaciones'
  },
  {
    id: 'lib-4',
    name: 'Operaciones de Izamiento y Taladro',
    type: 'image',
    url: '/images/IMG_7702.jpg',
    date: '2026-08-14',
    tag: 'Logística'
  },
  {
    id: 'lib-5',
    name: 'Unidad de Well Testing en Campo',
    type: 'image',
    url: '/images/ig_well_testing.png',
    date: '2026-08-14',
    tag: 'Pruebas'
  },
  {
    id: 'lib-6',
    name: 'Manifold de Seguridad y Válvulas',
    type: 'image',
    url: '/images/ig_valve_safety.png',
    date: '2026-08-14',
    tag: 'Seguridad'
  },
  {
    id: 'lib-7',
    name: 'Muestra Reológica de Crudo Pesado',
    type: 'image',
    url: '/images/ig_crude_sample.png',
    date: '2026-08-14',
    tag: 'Química EOR'
  },
  {
    id: 'lib-8',
    name: 'Múltiple de Producción en Faja del Orinoco',
    type: 'image',
    url: '/images/ig_manifold.png',
    date: '2026-08-14',
    tag: 'Producción'
  },
  {
    id: 'lib-9',
    name: 'Flota de Transporte Pesado y Volquetas',
    type: 'image',
    url: '/images/logistics_trucks.png',
    date: '2026-08-14',
    tag: 'Transporte'
  },
  {
    id: 'lib-10',
    name: 'Unidad de Coiled Tubing',
    type: 'image',
    url: '/images/coiled_tubing.png',
    date: '2026-08-14',
    tag: 'Pozos'
  },
  {
    id: 'lib-11',
    name: 'Logo Oficial Halliburton',
    type: 'image',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Halliburton_logo.svg/320px-Halliburton_logo.svg.png',
    date: '2026-08-14',
    tag: 'Logo Cliente'
  },
  {
    id: 'lib-12',
    name: 'Logo Oficial SLB Schlumberger',
    type: 'image',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/SLB_Logo_2022.svg/320px-SLB_Logo_2022.svg.png',
    date: '2026-08-14',
    tag: 'Logo Cliente'
  },
  {
    id: 'lib-13',
    name: 'Logo Oficial PDVSA',
    type: 'image',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/PDVSA_Logo.svg/320px-PDVSA_Logo.svg.png',
    date: '2026-08-14',
    tag: 'Logo Cliente'
  }
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
  {
    id: 'halliburton',
    name: 'HALLIBURTON',
    sub: 'Servicios de Yacimiento',
    contract: 'Alquiler de Equipos Livianos y Pesados en Base Maturín.',
    type: 'Multinacional USA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Halliburton_logo.svg/320px-Halliburton_logo.svg.png'
  },
  {
    id: 'slb',
    name: 'SLB (Schlumberger)',
    sub: 'Líder Mundial en Tecnología',
    contract: 'Servicio de Transporte Pesado de Chutos, Bateas y Tolvas (3 años).',
    type: 'Multinacional USA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/SLB_Logo_2022.svg/320px-SLB_Logo_2022.svg.png'
  },
  {
    id: 'pdvsa-petrojunin',
    name: 'PDVSA PETROJUNÍN',
    sub: 'Alianza ENI • Faja del Orinoco',
    contract: 'Servicios de Asfaltado, Inyección de Reductor de Viscosidad y Equipos Misceláneos.',
    type: 'Empresa Mixta PDVSA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/PDVSA_Logo.svg/320px-PDVSA_Logo.svg.png'
  },
  {
    id: 'pdvsa-petromiranda',
    name: 'PDVSA PETROMIRANDA',
    sub: 'Alianza Rosneft • División Junín',
    contract: 'Saneamiento de Suelos y Cuerpos de Agua Afectados por Derrame de DCO.',
    type: 'Empresa Mixta PDVSA',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/PDVSA_Logo.svg/320px-PDVSA_Logo.svg.png'
  }
];

const INITIAL_MESSAGES = [
  {
    id: 'MSG-1001',
    name: 'Ing. Carlos Mendoza',
    company: 'PDVSA Petromonagas',
    email: 'cmendoza@petromonagas.ve',
    phone: '+58 414 0596012',
    service: 'Suministro de Química de Producción & Reductor de Viscosidad',
    location: 'Faja Petrolífera del Orinoco - Bloque Carabobo',
    message: 'Requerimos propuesta técnica para suministro e inyección de reductores permanentes de viscosidad, desmulsificantes y secuestrante de H2S para crudos pesados.',
    status: 'pending',
    createdAt: '2026-08-14 10:30'
  },
  {
    id: 'MSG-1002',
    name: 'Dra. Elena Rivas',
    company: 'Petrojunín / Petromiranda',
    email: 'erivas@petrojunin.com',
    phone: '+58 412 4817113',
    service: 'Unidad Flush By & Intervención de Pozos',
    location: 'Cuenca Maracaibo, Campo Boscán',
    message: 'Solicitud de unidad Flush By 24/7 y grúa telescópica de 110 toneladas para mantenimiento de sistemas BCP y reparación de pozos.',
    status: 'responded',
    createdAt: '2026-08-13 16:45'
  }
];

const INITIAL_KPIS = [
  { id: 'pozos', label: 'POZOS INTERVENIDOS', value: 450, prefix: '+', suffix: '', desc: 'En campos de crudo pesado y tradicional' },
  { id: 'viscosidad', label: 'REDUCCIÓN VISCOSIDAD', value: 98.4, prefix: '', suffix: '%', desc: 'Eficiencia en transporte de hidrocarburos' },
  { id: 'horas', label: 'HORAS SIN ACCIDENTES', value: 1250000, prefix: '+', suffix: 'hrs', desc: 'Certificación HSE de clase mundial' },
  { id: 'bpd', label: 'BARRILES DIARIOS FLUIDIZADOS', value: 120000, prefix: '+', suffix: 'BPD', desc: 'Optimización de flujo en oleoductos' }
];

const INITIAL_MEDIA = [
  {
    id: 'media-1',
    title: 'Well Testing & Pruebas de Pozo',
    type: 'photo',
    url: '/images/ig_well_testing.png',
    caption: 'Servicio especializado con equipos de Well Testing a pozos petroleros en Venezuela.',
    category: 'operaciones'
  },
  {
    id: 'media-2',
    title: 'Manifold de Pruebas & Válvulas de Seguridad',
    type: 'video',
    url: '/images/ig_valve_safety.png',
    videoUrl: '/videos/IMG_7557.mp4',
    caption: 'Maniobras de seguridad y válvula de control en manifold de pruebas de producción.',
    category: 'operaciones'
  },
  {
    id: 'media-3',
    title: 'Muestra Reológica de Crudo Pesado',
    type: 'photo',
    url: '/images/ig_crude_sample.png',
    caption: 'Muestra reológica de crudo pesado previo a la dosificación de reductor CYSOS EOR System.',
    category: 'laboratorio'
  },
  {
    id: 'media-4',
    title: 'Maniobras en Múltiple de Producción',
    type: 'video',
    url: '/images/ig_manifold.png',
    videoUrl: '/videos/IMG_7557.mp4',
    caption: 'Inspección técnica y maniobra de alineación en múltiple de producción en Faja del Orinoco.',
    category: 'operaciones'
  },
  {
    id: 'media-5',
    title: 'Inyección Continua EOR System',
    type: 'video',
    url: '/images/IMG_7549.jpg',
    videoUrl: '/videos/IMG_7557.mp4',
    caption: 'Operación de inyección continua de reductores de viscosidad CYSOS EOR System en yacimiento.',
    category: 'quimica'
  },
  {
    id: 'media-6',
    title: 'Equipo Multidisciplinario en Yacimiento',
    type: 'photo',
    url: '/images/IMG_7701.jpg',
    caption: 'Equipo multidisciplinario de profesionales e ingenieros CYSOS ENERGY en operaciones de campo.',
    category: 'equipo'
  }
];

const INITIAL_COMPANY_INFO = {
  logoUrl: '',
  mision: `Brindar soluciones integrales en ingeniería, procura internacional, logística pesada, intervención de pozos y química de producción petrolera, con un equipo altamente capacitado de profesionales, técnicos y personal operativo. Nos comprometemos a ejecutar proyectos con los más altos estándares de calidad (ISO 9001) y seguridad HSE (PDVSA SI-HO-S), garantizando respuesta oportuna, efectividad y protección ambiental en Venezuela.`,
  vision: `Consolidarnos como la empresa venezolana líder en ingeniería, procura, construcción y servicios petroleros especializados, destacada por la innovación en soluciones para la recuperación de pozos, inyección de reductores de viscosidad y logística de izamiento pesado, garantizando la confianza de nuestros clientes y el crecimiento económico del país.`,
  direccion: `C.C. Terrazas del Norte II, Maturín, Edo. Monagas, Venezuela`,
  telefonos: `0414-0596012 / 0412-4817113`,
  email: `MANAGER@CYSOS.ENERGY`,
  rif: `J-50478054-4`
};

const INITIAL_SERVICES = [
  {
    id: 'srv-1',
    name: 'Química de Producción y Optimización',
    tagline: 'Suministro e Inyección de Especialidades Químicas',
    description: 'Suministro e inyección de reductores permanentes de viscosidad, desmulsificantes, rompedores rápidos tipo slug, dispersantes de asfaltenos/parafinas, xileno, ácidos especializados (HCl, Acético, HF), inhibidores de corrosión/incrustación y secuestrantes de H2S.',
    status: 'activo',
    icon: 'FlaskConical'
  },
  {
    id: 'srv-2',
    name: 'Intervención y Recuperación de Pozos (Workover & Flush By)',
    tagline: 'Equipos de Alta Potencia (350 HP a 750 HP) y Unidades 24/7',
    description: 'Reacondicionamiento total de pozos con taladros de alta potencia, unidades Flush By autotransportables para operaciones 24/7, reparación de sistemas BCP y ESP, y limpieza mecánica con molinos, escariadores y magnetos.',
    status: 'activo',
    icon: 'Flame'
  },
  {
    id: 'srv-3',
    name: 'Logística, Izamiento y Transporte Pesado',
    tagline: 'Grúas Telescópicas hasta 110 Toneladas y Flota Especializada',
    description: 'Flota de chutos con tolva, volqueta, batea, vacuum (transporte de fluidos/lodos) y low-boy. Grúas telescópicas (60, 70 y 110 ton), brazos hidráulicos (7 a 35 ton), Jumbo CAT 320, Side Boom y Vactor.',
    status: 'activo',
    icon: 'Truck'
  },
  {
    id: 'srv-4',
    name: 'Ingeniería, Procura y Suministros ISO 9001',
    tagline: 'Sourcing Internacional y Control de Presión API',
    description: 'Importación directa de tuberías ERW/sin costura, válvulas API y motores Cummins. Control de presión con preventores (BOP), chokes manuales, mangueras Chiksan, bombas triplex y alquiler de campers habitacionales.',
    status: 'activo',
    icon: 'Globe'
  }
];

export const CmsProvider = ({ children }) => {
  const [mediaLibrary, setMediaLibrary] = useState(() => {
    try {
      const saved = localStorage.getItem('cysos_cms_media_library');
      return (saved && Array.isArray(JSON.parse(saved))) ? JSON.parse(saved) : INITIAL_MEDIA_LIBRARY;
    } catch {
      return INITIAL_MEDIA_LIBRARY;
    }
  });

  const [heroContent, setHeroContent] = useState(() => {
    try {
      const saved = localStorage.getItem('cysos_cms_hero');
      return saved ? JSON.parse(saved) : INITIAL_HERO_CONTENT;
    } catch {
      return INITIAL_HERO_CONTENT;
    }
  });

  const [partners, setPartners] = useState(() => {
    try {
      const saved = localStorage.getItem('cysos_cms_partners');
      return (saved && Array.isArray(JSON.parse(saved))) ? JSON.parse(saved) : INITIAL_PARTNERS;
    } catch {
      return INITIAL_PARTNERS;
    }
  });

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('cysos_cms_messages');
      return (saved && Array.isArray(JSON.parse(saved))) ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [kpis, setKpis] = useState(() => {
    try {
      const saved = localStorage.getItem('cysos_cms_kpis');
      return (saved && Array.isArray(JSON.parse(saved))) ? JSON.parse(saved) : INITIAL_KPIS;
    } catch {
      return INITIAL_KPIS;
    }
  });

  const [mediaItems, setMediaItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cysos_cms_media');
      return (saved && Array.isArray(JSON.parse(saved))) ? JSON.parse(saved) : INITIAL_MEDIA;
    } catch {
      return INITIAL_MEDIA;
    }
  });

  const [companyInfo, setCompanyInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('cysos_cms_company_info');
      return saved ? JSON.parse(saved) : INITIAL_COMPANY_INFO;
    } catch {
      return INITIAL_COMPANY_INFO;
    }
  });

  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem('cysos_cms_services');
      return (saved && Array.isArray(JSON.parse(saved))) ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('cysos_admin_session') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cysos_cms_media_library', JSON.stringify(mediaLibrary));
    } catch (e) {
      console.error(e);
    }
  }, [mediaLibrary]);

  useEffect(() => {
    try {
      localStorage.setItem('cysos_cms_hero', JSON.stringify(heroContent));
    } catch (e) {
      console.error(e);
    }
  }, [heroContent]);

  useEffect(() => {
    try {
      localStorage.setItem('cysos_cms_partners', JSON.stringify(partners));
    } catch (e) {
      console.error(e);
    }
  }, [partners]);

  useEffect(() => {
    try {
      localStorage.setItem('cysos_cms_messages', JSON.stringify(messages));
    } catch (e) {
      console.error(e);
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem('cysos_cms_kpis', JSON.stringify(kpis));
    } catch (e) {
      console.error(e);
    }
  }, [kpis]);

  useEffect(() => {
    try {
      localStorage.setItem('cysos_cms_media', JSON.stringify(mediaItems));
    } catch (e) {
      console.error(e);
    }
  }, [mediaItems]);

  useEffect(() => {
    try {
      localStorage.setItem('cysos_cms_company_info', JSON.stringify(companyInfo));
    } catch (e) {
      console.error(e);
    }
  }, [companyInfo]);

  useEffect(() => {
    try {
      localStorage.setItem('cysos_cms_services', JSON.stringify(services));
    } catch (e) {
      console.error(e);
    }
  }, [services]);

  const loginAdmin = (password) => {
    if (password === 'cysos2026' || password === 'admin') {
      setIsLoggedIn(true);
      try {
        localStorage.setItem('cysos_admin_session', 'true');
      } catch (e) {
        console.error(e);
      }
      return { success: true };
    }
    return { success: false, error: 'Contraseña incorrecta.' };
  };

  const logoutAdmin = () => {
    setIsLoggedIn(false);
    try {
      localStorage.removeItem('cysos_admin_session');
    } catch (e) {
      console.error(e);
    }
  };

  const addMediaToLibrary = (fileData) => {
    const item = {
      id: `lib-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      ...fileData
    };
    setMediaLibrary((prev) => [item, ...prev]);
    return item;
  };

  const deleteMediaFromLibrary = (id) => {
    setMediaLibrary((prev) => prev.filter((item) => item.id !== id));
  };

  const updateHeroContent = (field, value) => {
    setHeroContent((prev) => ({ ...prev, [field]: value }));
  };

  const updatePartner = (id, field, value) => {
    setPartners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const addPartner = (newPartnerData) => {
    const created = {
      id: `partner-${Date.now()}`,
      ...newPartnerData
    };
    setPartners((prev) => [...prev, created]);
  };

  const deletePartner = (id) => {
    setPartners((prev) => prev.filter((p) => p.id !== id));
  };

  const addMessage = (newMessageData) => {
    const createdMsg = {
      id: `MSG-${Date.now().toString().slice(-4)}`,
      ...newMessageData,
      status: 'pending',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    setMessages((prev) => [createdMsg, ...prev]);
    return createdMsg;
  };

  const updateMessageStatus = (id, newStatus) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status: newStatus } : msg))
    );
  };

  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const updateKpi = (id, field, value) => {
    setKpis((prev) =>
      prev.map((kpi) => (kpi.id === id ? { ...kpi, [field]: value } : kpi))
    );
  };

  const updateMediaItem = (id, field, value) => {
    setMediaItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addMediaItem = (newItem) => {
    const itemToAdd = {
      id: `media-${Date.now()}`,
      ...newItem
    };
    setMediaItems((prev) => [itemToAdd, ...prev]);
  };

  const deleteMediaItem = (id) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateService = (id, field, value) => {
    setServices((prev) =>
      prev.map((srv) => (srv.id === id ? { ...srv, [field]: value } : srv))
    );
  };

  const updateCompanyInfoText = (field, text) => {
    setCompanyInfo((prev) => ({ ...prev, [field]: text }));
  };

  return (
    <CmsContext.Provider
      value={{
        mediaLibrary: mediaLibrary || INITIAL_MEDIA_LIBRARY,
        addMediaToLibrary,
        deleteMediaFromLibrary,
        heroContent: heroContent || INITIAL_HERO_CONTENT,
        updateHeroContent,
        partners: partners || INITIAL_PARTNERS,
        updatePartner,
        addPartner,
        deletePartner,
        messages: messages || INITIAL_MESSAGES,
        kpis: kpis || INITIAL_KPIS,
        mediaItems: mediaItems || INITIAL_MEDIA,
        companyInfo: companyInfo || INITIAL_COMPANY_INFO,
        services: services || INITIAL_SERVICES,
        isAdminOpen,
        setIsAdminOpen,
        isLoggedIn,
        loginAdmin,
        logoutAdmin,
        addMessage,
        updateMessageStatus,
        deleteMessage,
        updateKpi,
        updateMediaItem,
        addMediaItem,
        deleteMediaItem,
        updateService,
        updateCompanyInfoText
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
