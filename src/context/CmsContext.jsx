import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveToSupabase, loadAllFromSupabase, recordVisitInSupabase, saveAnalyticsToSupabase } from '../services/supabaseService';

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
  { id: 'MSG-1002', name: 'Dra. Elena Rivas', company: 'Petrojunín / Petromiranda', email: 'erivas@petrojunin.com', phone: '+58 412 9486249', service: 'Unidad Flush By & Intervención de Pozos', location: 'Cuenca Maracaibo, Campo Boscán', message: 'Solicitud de unidad Flush By 24/7 y grúa telescópica de 110 toneladas para mantenimiento de sistemas BCP y reparación de pozos.', status: 'responded', createdAt: '2026-08-13 16:45' }
];

const INITIAL_KPIS = [
  { id: 'horas_operadas', label: 'HORAS OPERADAS EN POZOS', value: 34500, prefix: '+', suffix: ' hrs', desc: 'Experiencia acumulada en operaciones de subsuelo' },
  { id: 'pozos_exito', label: 'POZOS REALIZADOS CON ÉXITO', value: 450, prefix: '+', suffix: '', desc: 'Estimulación, limpieza y completación efectiva' },
  { id: 'separadores', label: 'INTERVENCIONES CON SEPARADORES', value: 120, prefix: '+', suffix: '', desc: 'Trabajos ejecutados con separadores de alta presión' },
  { id: 'hse', label: 'INCIDENTES (HSE)', value: 0, prefix: '', suffix: '', desc: 'Certificación y compromiso total con la seguridad' }
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
  direccion: `Av. Alirio Ugarte Pelayo, Complejo CCP, Centro Médico Norte, piso 1. Oficina 01-18 Maturín, Edo. Monagas`,
  telefonos: `0412-9486249`,
  email: `gerencia@cysosenergy.com`,
  rif: `J-40031863-7`
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
    category: 'División 2: Química de Producción y Estimulación',
    title: 'Suministro de Química de Estimulación y Limpieza para Pozos',
    name: 'Química de Estimulación',
    image: '/images/cysos_quimica_lipesa.jpg',
    videoUrl: '/videos/maniobra.mp4',
    bgVideoUrl: '',
    icon: 'FlaskConical',
    summary: 'Servicio integral de suministro e inyección de especialidades químicas diseñadas para estimulación, limpieza de pozos y optimización de la producción de hidrocarburos.',
    items: [
      { name: 'Suministro de Ácidos y Solventes', desc: 'Provisión de ácidos especializados, ácido clorhídrico, ácido acético, mezclas de HCl y HF para la estimulación matricial efectiva de pozos petroleros.' },
      { name: 'Sistemas de Limpieza de Pozos', desc: 'Tratamientos de alta eficiencia utilizando xileno, solvente mutual, humectantes de sólidos y surfactantes a base de agua para la remoción profunda de daño a la formación.' },
      { name: 'Optimización de Crudos Pesados', desc: 'Reductor permanente de viscosidad, desmulsificantes, rompedores rápidos tipo slug, dispersantes de parafinas/asfáltenos y reductores de fricción para líneas de flujo.' }
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

const INITIAL_NEWS = [
  {
    id: 'news-produccion-venezuela-1-25m-bpd-nov-2026',
    category: 'venezuela',
    source: 'Ministerio de Petróleo / Argus Media / PDVSA Prensa',
    tag: 'Producción & Empresas Mixtas',
    date: '2026-11-18',
    title: 'Venezuela consolida extracción en 1,24 millones de bpd impulsada por reactivación de pozos en Zulia y Faja del Orinoco',
    summary: 'El bombeo nacional alcanza su nivel más alto desde 2018 gracias a las campañas de completación en Petroindependencia, Petroboscán y el despliegue de bombas electrosumergibles en la cuenca occidental.',
    content: 'El Ministerio del Poder Popular de Petróleo y Petróleos de Venezuela (PDVSA) confirmaron que el volumen promedio de extracción de crudo en territorio venezolano superó los 1.242.000 barriles diarios durante la primera quincena de noviembre de 2026. Este incremento sostenido responde al éxito operativo de los planes conjuntos ejecutados con socias internacionales como Chevron, Repsol y Maurel & Prom. En la división Occidente (Lago de Maracaibo), la conexión de nuevos pozos con sistemas BES (Bombeo Electrosumergible) y el uso de taladros de reacondicionamiento (Workover) sumaron más de 45.000 bpd de crudo liviano y mediano. Paralelamente, en la Faja Petrolífera del Orinoco "Hugo Chávez", las macollas de los bloques Carabobo y Junín registraron un flujo estable mediante inyección de aditivos químicos desmulsificantes y reductores de viscosidad, garantizando la alimentación continua de los mejoradores y terminales de embarque.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_produccion_venezuela_nov2026.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-opep-plus-acuerdo-viena-noviembre-2026',
    category: 'mundial',
    source: 'OPEP Media Viena / Bloomberg Energy / Reuters',
    tag: 'OPEP+ & Geopolítica',
    date: '2026-11-17',
    title: 'OPEP+ ratifica en Viena la extensión de recortes voluntarios de 2,2 millones de bpd hasta mediados de 2027',
    summary: 'Los 22 países de la coalición petrolera coordinan una estrategia unificada para salvaguardar el valor de la cesta internacional ante la desaceleración estacional y el control estricto de inventarios.',
    content: 'Tras una extensa deliberación en la sede central de la Organización de Países Exportadores de Petróleo (OPEP) en Viena, los ministros de energía del bloque OPEP+ acordaron de manera unánime aplazar el inicio de los incrementos graduales de bombeo hasta junio de 2027. La declaración ministerial subrayó que la disciplina colectiva ha demostrado ser el ancla más eficaz frente a la especulación financiera y la fluctuación de inventarios comerciales en los países consumidores de la OCDE. El secretario general del organismo resaltó que el cumplimiento de las cuotas asignadas alcanzó un 103% en el último mes, proyectando que la brecha estructural de oferta frente a la demanda energética en economías emergentes de Asia mantendrá al barril de crudo Brent en una banda de equilibrio técnico de $92-$98 por barril.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_opep_viena_nov2026.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-campo-dragon-acuerdo-trinidad-shell-nov-2026',
    category: 'venezuela',
    source: 'Upstream Online / Ministry of Energy Trinidad / PDVSA Gas',
    tag: 'Gas Offshore & Campo Dragón',
    date: '2026-11-16',
    title: 'PDVSA, Shell y NGC firman contrato de tendido para el gasoducto submarino del Campo Dragón hacia Trinidad',
    summary: 'Concluye la fase de ingeniería de detalle para la interconexión submarina de 90 kilómetros, proyectando el inicio de inyección de 400 millones de pies cúbicos diarios de gas natural para el mercado caribeño y europeo.',
    content: 'En Puerto España, delegaciones ministeriales de Venezuela y Trinidad y Tobago, junto a directivos globales de Shell y la National Gas Company (NGC), rubricaron el acuerdo definitivo de ingeniería, procura y construcción (IPC) para el tendido marino del gasoducto transfronterizo del Campo Dragón. El proyecto, ubicado en el cinturón de gas costa afuera de la Península de Paria, contempla la colocación de ductos de aleación marina de 18 pulgadas a profundidades de hasta 130 metros, enlazando los pozos submarinos con la plataforma costa afuera Hibiscus. Esta infraestructura permitirá exportar 400 millones de pies cúbicos de gas no asociado por día hacia las plantas de licuefacción de Atlantic LNG en Point Fortin, transformando a la región oriental en un centro neurálgico de suministro de gas natural licuado (GNL) con bajas emisiones de carbono.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_gas_offshore_dragon_nov2026.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-vlcc-fletes-maritimos-estabilidad-nov-2026',
    category: 'mundial',
    source: 'Clarksons Research / Lloyd\'s List / Maritime Executive',
    tag: 'Transporte Marítimo & VLCC',
    date: '2026-11-15',
    title: 'Fletes de supertanqueros VLCC tocan niveles récord de $115.000 diarios ante desvío de rutas petroleras globales',
    summary: 'La congestión en los corredores del Mar Rojo y la preferencia por travesías prolongadas vía Buena Esperanza disparan la demanda por buques de crudo de gran calado hacia Asia y el Atlántico.',
    content: 'El índice Baltic Dirty Tanker registró una subida semanal del 14%, llevando las tarifas diarias de alquiler por tiempo (TCE) para buques supertanqueros VLCC (Very Large Crude Carrier) por encima de los 115.000 dólares en las rutas de Medio Oriente a Asia y de América hacia el Golfo de México. El informe semanal de Clarksons Research atribuye esta alza vertiginosa al incremento en los días de navegación por barril transportado, derivado de la persistencia de riesgos bélicos en pasos estrechos de navegación y de la masiva redistribución de flujos de crudo pesado venezolano, brasileño y del Golfo estadounidense con destino a megacomplejos refinadores en India y Singapur. Los armadores navales reportan una ocupación del 98% de la flota mundial de tanqueros de doble casco para el resto del año.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_supertanker_vlcc_nov2026.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-crp-amuay-cardon-expansion-nafta-nov-2026',
    category: 'venezuela',
    source: 'Petroguía / Argus Media / S&P Global',
    tag: 'Refinación & Crudos Pesados',
    date: '2026-11-14',
    title: 'Centro de Refinación Paraguaná (CRP) eleva procesamiento a 310.000 bpd con arranque de unidad catalítica en Cardón',
    summary: 'La reactivación de compresores y torres de craqueo catalítico fluido (FCC) en la Península de Paraguaná estabiliza la entrega de nafta de alto octanaje, diésel automotriz y componentes para diluyentes en la Faja.',
    content: 'Ingenieros y técnicos de refinación completaron con éxito las pruebas operativas y el arranque térmico de la unidad de Craqueo Catalítico Fluido (FCC) de la Refinería Cardón, componente neurálgico del Centro de Refinación Paraguaná (CRP) en el estado Falcón. Con esta maniobra, la capacidad conjunta procesada entre Amuay y Cardón se incrementó a 310.000 barriles de crudo diarios, consolidando una producción diaria de más de 85.000 barriles de gasolina y 70.000 barriles de diésel de ultra bajo azufre. Fuentes técnicas destacaron que la estabilización de los trenes de destilación atmosférica y de vacío permitirá además suministrar corrientes internas de naftas pesadas indispensables como diluyente para el acondicionamiento y bombeo del crudo Merey 16 en la Faja Petrolífera del Orinoco.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_refineria_crp_nov2026.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-crack-spread-diesel-record-nov-2026',
    category: 'mundial',
    source: 'Energy Intelligence / Financial Times / ICIS',
    tag: 'Refinación & Crack Spreads',
    date: '2026-11-12',
    title: 'Déficit de destilados medios en Europa y Asia eleva el crack spread del diésel a $34 por barril',
    summary: 'La intensa demanda industrial previa a la temporada invernal y las restricciones en refinerías de alta conversión premian las cotizaciones de los crudos ricos en gasoil y combustibles industriales.',
    content: 'Los márgenes de refinación (crack spreads) para la conversión de crudo en destilados medios —particularmente diésel para transporte de carga pesada y combustible para aviación Jet A-1— escalaron hasta los 34,20 dólares por barril en los centros neurálgicos de Rotterdam y Singapur. La escasez de inventarios en depósitos europeos, combinada con paradas programadas de mantenimiento en varias refinerías del Mediterráneo, ha generado una tensión evidente entre la oferta disponible y la demanda estacional de calefacción y transporte. Analistas de Energy Intelligence destacan que esta coyuntura ha acentuado la demanda global por crudos pesados y medianos con alto rendimiento de corte de destilados, abriendo ventanas comerciales altamente lucrativas para exportadores de hidrocarburos de América Latina.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_crack_spread_refineria_nov2026.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-exportaciones-reliance-india-merey-nov-2026',
    category: 'venezuela',
    source: 'The Hindu BusinessLine / Reuters / PDVSA Comercio',
    tag: 'Exportación & Crudo Merey 16',
    date: '2026-11-10',
    title: 'India eleva importaciones de crudo venezolano a 180.000 bpd con nuevos contratos de entrega para Reliance e Indian Oil',
    summary: 'Las megarefinerías de Jamnagar y Paradip reciben cargamentos regulares de crudo Merey 16 desde los terminales marítimos de Jose, consolidando a la India como el principal destino de crudo venezolano en Asia.',
    content: 'Los principales conglomerados refinadores de la India, liderados por Reliance Industries Limited (RIL) y la estatal Indian Oil Corporation (IOC), formalizaron nuevos acuerdos comerciales a término con Petróleos de Venezuela para la adquisición sostenida de cargamentos de crudo Merey 16 (16° API). Durante el presente mes, el volumen despachado hacia puertos del subcontinente indio promedió los 180.000 barriles por día, transportados a través de superpetroleros fletados bajo estrictos estándares internacionales de navegación y trazabilidad de pagos. Ejecutivos de refinación en Jamnagar subrayaron que el crudo pesado venezolano ofrece una sinergia operativa insuperable para sus unidades de coquización retardada (Delayed Coking) e hidrocraqueo, permitiendo obtener altos rendimientos de gasoil y productos petroquímicos de alto valor agregado.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_reliance_terminal_nov2026.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-repsol-pdvsa-barua-motatan-2026',
    category: 'venezuela',
    source: 'Reuters / Petroguía / PDVSA Prensa',
    tag: 'Reactivación & Pozos',
    date: '2026-10-20',
    title: 'PDVSA y Repsol formalizan plan de reactivación de 120 pozos en Barúa Motatán con inversión de $450 millones',
    summary: 'La operadora española y la estatal venezolana firman la hoja de ruta técnica para intervenir yacimientos maduros en la cuenca del Lago de Maracaibo mediante sartas electrosumergibles y aditivos químicos de estimulación matricial.',
    content: 'En un acto celebrado en el Complejo Operacional Mene Grande, autoridades del Ministerio del Poder Popular de Petróleo, la directiva de Petróleos de Venezuela (PDVSA) y altos representantes de Repsol Venezuela suscribieron el acuerdo marco para la reactivación intensiva de 120 pozos productores en los campos Barúa y Motatán (estados Zulia y Trujillo). El plan maestro contempla un desembolso estimado de 450 millones de dólares durante los próximos 24 meses, priorizando la contratación de empresas nacionales para el despliegue de unidades de Workover, Pulling de 550 a 750 HP, así como la instalación de sistemas de levantamiento artificial por cavidad progresiva (BCP) y bombeo electrosumergible (BES). La meta operativa proyectada es sumar más de 32.000 barriles diarios de crudo mediano a la corriente de producción occidental antes del segundo semestre de 2027.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_repsol_pozos_2026.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-opep-plus-extension-cuotas-2027',
    category: 'mundial',
    source: 'Bloomberg / OPEP Media Viena / Financial Times',
    tag: 'OPEP+ & Mercados',
    date: '2026-10-19',
    title: 'OPEP+ evalúa blindar cuotas de bombeo hasta mediados de 2027 ante tensiones geopolíticas y presión en inventarios',
    summary: 'El Comité Ministerial Conjunto de Monitoreo (JMMC) sesionó en Viena para analizar la solidez del barril Brent en torno a los $95 y ratificar la disciplina de oferta frente a la incertidumbre en rutas marítimas.',
    content: 'La alianza de productores OPEP+, liderada por Arabia Saudita y Rusia, concluyó una reunión técnica preliminar en su sede de Viena donde se acordó proponer la extensión del esquema de cuotas de extracción vigentes durante todo el primer semestre de 2027. Los delegados ministeriales destacaron que la resiliencia del mercado frente a la volatilidad macroeconómica responde directamente a la contención concertada de 2,2 millones de barriles diarios de recortes voluntarios. El reporte técnico alertó que los inventarios comerciales en las naciones de la OCDE se ubican 85 millones de barriles por debajo del promedio móvil de cinco años, mientras las primas de flete y seguro de guerra en el Golfo Pérsico continúan restringiendo los márgenes del comercio marítimo internacional.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_opep_viena.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-terminal-jose-record-merey-2026',
    category: 'venezuela',
    source: 'S&P Global Commodity Insights / Argus Media',
    tag: 'Comercio Exterior & Jose',
    date: '2026-10-18',
    title: 'Terminal de Embarque Jose supera 1,18 millones de bpd despachados en supertanqueros VLCC con crudo Merey 16',
    summary: 'Las monoboyas del Complejo Criogénico José Antonio Anzoátegui registran un ritmo récord de atraque de supertanqueros con destino a refinerías de India, China y la Costa del Golfo de EE.UU.',
    content: 'El Terminal de Almacenamiento y Embarque de Crudo José Antonio Anzoátegui (TAECJAA), en el oriente venezolano, consolidó durante la tercera semana de octubre un volumen promedio de exportación de 1.185.000 barriles por día, marcando el nivel de despacho marítimo más elevado de los últimos siete años. El flujo sostenido ha sido impulsado por la llegada sucesiva de superpetroleros tipo VLCC y buques Suezmax contratados por refinadores de Asia y Estados Unidos bajo licencias operativas. Fuentes del sector confirmaron que el crudo insignia Merey 16 (16° API) continúa cotizando con un diferencial favorable de apenas $8,20 de descuento frente al marcador internacional Brent, respaldado por la fuerte demanda de las unidades de conversión profunda y coquización en el mercado global.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_supertanker_jose_2026.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-refinerias-asia-europa-crudos-pesados-2026',
    category: 'mundial',
    source: 'Argus Media / Energy Intelligence / Platts',
    tag: 'Refinación & Crack Spreads',
    date: '2026-10-17',
    title: 'Refinerías de Asia y Europa pagan primas históricas por crudos pesados ante déficit crítico de diésel y búnker marítimo',
    summary: 'Los márgenes de refinación para destilados medios escalan a $31 por barril, disparando el apetito por corrientes con alto residuo atmosférico ideales para coquización y combustible naval.',
    content: 'Los complejos de refinación de alta conversión a lo largo de la costa del Golfo de México, el cinturón Rotterdam-Amberes y el subcontinente indio reportan márgenes de refinación extraordinarios en la producción de diésel de ultra bajo azufre (ULSD) y gasoil naval. La confluencia de menores exportaciones de gasoil desde Rusia y paradas técnicas no programadas en refinerías europeas ha provocado un déficit estructural que elevó el crack spread a $31,40 por barril. En este entorno, los crudos pesados y extrapesados ricos en destilados medios —como el Merey venezolano, el Maya mexicano y el crudo pesado de Basora— han registrado primas comerciales récord en el mercado spot, incentivando la aceleración de compras a largo plazo.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_refineria_conversion.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-campo-dragon-procura-tuberias-2026',
    category: 'venezuela',
    source: 'World Energy Trade / Upstream Online / Petroguía',
    tag: 'Gas Offshore & Dragón',
    date: '2026-10-16',
    title: 'Shell, BP y PDVSA inician fase de procura de tuberías submarinas para el gasoducto transfronterizo del Campo Dragón',
    summary: 'Tras la aprobación de los estudios de impacto ambiental y batimetría, se emitieron las primeras órdenes de compra para ductos de 18 pulgadas que transportarán 350 MMSCFD de gas no asociado hacia Trinidad.',
    content: 'El consorcio integrado por Shell, BP y PDVSA Gas dio inicio formal al proceso de licitación y procura internacional de aceros especiales y tuberías submarinas de 18 pulgadas con recubrimiento de hormigón para el tendido del gasoducto del Campo Dragón, ubicado en el norte del estado Sucre. La obra interconectará el megayacimiento marino de la Plataforma Deltana con la plataforma costa afuera Hibiscus, operada por Shell en aguas de Trinidad y Tobago. Este avance estratégico marca la cuenta regresiva para la inyección de 350 millones de pies cúbicos diarios de gas venezolano a las plantas de licuefacción de Atlantic LNG, posicionando a la región caribeña como polo de exportación energética hacia Europa y América Latina.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_gas_dragon_offshore_2026.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-brent-cushing-inventarios-alza-2026',
    category: 'mundial',
    source: 'Bloomberg / Reuters / The Wall Street Journal',
    tag: 'Precios & Mercados',
    date: '2026-10-15',
    title: 'Brent supera los $94 por barril tras caída inesperada de inventarios en Cushing y tensión en pasos de navegación',
    summary: 'La Administración de Información Energética de EE.UU. reporta un drenaje de 4,2 millones de barriles en el principal hub de almacenamiento de Oklahoma, acelerando las compras de cobertura.',
    content: 'Las cotizaciones de los crudos marcadores cerraron con fuertes ganancias en los parqués internacionales. El barril de crudo Brent del Mar del Norte ascendió a $94,80 en la bolsa ICE de Londres, mientras que el West Texas Intermediate (WTI) estadounidense rebasó la barrera de los $90,15 en el NYMEX. El catalizador alcista fue la divulgación del balance semanal de la EIA, el cual evidenció una contracción de 4,2 millones de barriles en los tanques de reserva de Cushing (Oklahoma), situándolos en niveles cercanos a los mínimos operativos. Analistas de materias primas de Wall Street resaltan que los operadores financieros están descontando un estrechamiento aún mayor de la oferta global durante los meses invernales ante el menor flujo de buques petroleros en el corredor del Mar Rojo y Ormuz.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/1790881702668-trading.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-eor-quimica-carabobo-faja-2026',
    category: 'venezuela',
    source: 'Petroguía / CYSOS Technical Bulletin / PDVSA',
    tag: 'Tecnología EOR & Faja',
    date: '2026-10-15',
    title: 'Faja Petrolífera del Orinoco incorpora tecnología de química EOR en Macolla Carabobo 2 para reducir 38% el consumo de diluyente',
    summary: 'El despliegue de skids automatizados de inyección continua de reductores nanotecnológicos de viscosidad optimiza la fluidez del crudo extrapesado de 8° API en oleoductos matrices.',
    content: 'Cuadrillas de ingeniería y servicios químicos especializados completaron con éxito la instalación y puesta en marcha de un sistema de inyección automatizada de reductores nanotecnológicos de viscosidad en la macolla Carabobo 2 de la Faja Petrolífera del Orinoco. La tecnología, probada bajo rigurosos protocolos de laboratorio y campo, reduce la fricción molecular del crudo extrapesado de 8,5° API, permitiendo a la empresa operadora disminuir en un 38% el requerimiento de nafta pesada importada como diluyente de transporte. Esta optimización técnica no solo disminuye significativamente los costos operativos de bombeo por barril, sino que preserva la integridad mecánica de los oleoductos troncales al mitigar la deposición severa de asfaltenos y parafinas en las paredes de tubería.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_pozos_reactivacion.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-aie-record-demanda-mundial-2027',
    category: 'mundial',
    source: 'Agencia Internacional de Energía (AIE) / Le Monde / Financial Times',
    tag: 'Demanda Global & AIE',
    date: '2026-10-14',
    title: 'Demanda mundial de petróleo alcanzará récord histórico de 104,2 millones de bpd en 2027 según proyecciones de la AIE',
    summary: 'El informe anual de largo plazo destaca la expansión del transporte aéreo comercial en Asia-Pacífico y el auge de la petroquímica en Medio Oriente como motores determinantes del consumo.',
    content: 'En su publicación anual de Perspectivas Energéticas Mundiales presentada en Ginebra, la Agencia Internacional de la Energía (AIE) ajustó al alza sus proyecciones de consumo de hidrocarburos líquidos para el trienio 2026-2028. El organismo multilateral estima que la demanda agregada mundial se situará en 104,2 millones de barriles diarios para finales de 2027, desvirtuando los pronósticos anteriores sobre un estancamiento inmediato del consumo. El crecimiento estará traccionado principalmente por la aceleración en el consumo de queroseno de aviación (Jet Fuel) en economías emergentes de Asia y la demanda inelástica de etileno, propileno y materias primas petroquímicas en los grandes complejos industriales de Asia, Norteamérica y el Golfo Pérsico.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_permian_drilling.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-pdvsa-105-contratos-fedecamaras-2026',
    category: 'venezuela',
    source: 'Finanzas Digital / Fedecámaras / PDVSA Prensa',
    tag: 'Contratos & Alianzas',
    date: '2026-10-14',
    title: 'PDVSA acelera meta de 105 contratos petroleros para el cierre de 2026 con foco en campos nuevos',
    summary: 'El presidente de la estatal, Héctor Obregón, anunció en la 82.ª Asamblea de Fedecámaras que ya se han concretado 61 convenios definitivos y 44 están en fase final, orientando el 70% a campos verdes con capital mixto.',
    content: 'En el marco de la 82.ª Asamblea Anual de Fedecámaras, el presidente de Petróleos de Venezuela (PDVSA), Héctor Obregón, presentó el balance estratégico de contrataciones e inversión para el último trimestre de 2026. La estatal petrolera proyecta concretar un portafolio de 105 contratos operativos, de los cuales 61 ya han sido suscritos formalmente y 44 se encuentran en sus fases de negociación final. Obregón detalló que aproximadamente el 70% de estos acuerdos están dirigidos al desarrollo de "campos verdes" (yacimientos nuevos sin explotación previa), incentivando la participación activa del empresariado privado nacional y firmas transnacionales mediante esquemas de esfuerzo compartido. Esta estrategia tiene como propósito asegurar el financiamiento directo en infraestructura de superficie, estaciones de flujo y tendido de líneas de transporte de crudo pesado y extrapesado hacia los centros de mejoramiento y terminales de embarque.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/1790881701869-export.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-nabep-taladros-perforacion-venezuela-2026',
    category: 'venezuela',
    source: 'Diario Las Américas / Upstream / World Energy Trade',
    tag: 'Equipos & Taladros',
    date: '2026-10-13',
    title: 'Llegan a Venezuela plataformas de perforación y 11 unidades de reacondicionamiento tras 15 años de rezago',
    summary: 'North American Blue Energy Partners (NABEP) desembarca el primer lote de maquinaria pesada de alta gama para reactivación de pozos en el Zulia y la Faja Petrolífera del Orinoco.',
    content: 'El sector de servicios e ingeniería de pozos en Venezuela recibió un impulso operativo sin precedentes con el arribo de dos plataformas de perforación rotatoria profunda y 11 unidades de reacondicionamiento (workover rigs), suministradas por el consorcio North American Blue Energy Partners (NABEP). Se trata del primer contingente masivo de tecnología de perforación y completación pesada de última generación que ingresa a puertos venezolanos en 15 años para atender el rezago operativo. Los equipos, dotados de sistemas automatizados de manejo de tubería y telemetría en tiempo real, serán movilizados de forma inmediata hacia las divisiones Lago (Zulia) y Ayacucho (Faja del Orinoco) para ejecutar maniobras de perforación direccional, reentrada a pozos productores (re-entry) y sustitución de sartas mecánicas.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_pozos_reactivacion.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-aie-informe-octubre-diesel-brent-2026',
    category: 'mundial',
    source: 'Agencia Internacional de Energía (AIE) / Bloomberg / Reuters',
    tag: 'Mercado Global & Diésel',
    date: '2026-10-12',
    title: 'Informe de la AIE alerta sobre tensión crítica en destilados: Brent resiste en $105 ante incertidumbre de suministro',
    summary: 'El organismo internacional recorta previsiones de demanda global en 2,6 mb/d para 2026, señalando un déficit severo en inventarios de diésel y riesgos en rutas del Golfo Pérsico.',
    content: 'En su reporte mensual de perspectivas energéticas divulgado en París, la Agencia Internacional de la Energía (AIE) redujo su estimación del crecimiento del consumo global en 2,6 millones de barriles diarios para el cómputo total de 2026. El organismo subrayó que el 25% del ajuste obedece al impacto del encarecimiento histórico de los combustibles y la persistente fragilidad en el suministro de destilados medios. Los inventarios de diésel en los centros de almacenamiento de Europa y la Costa Este de EE.UU. se sitúan en niveles críticos a las puertas del invierno boreal. Paralelamente, el crudo Brent se mantiene en cotizaciones firmes entre los 104 y 106 dólares por barril, sustentado por la prima de riesgo geopolítico tras recientes incidentes en infraestructuras clave del Golfo Pérsico.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/1790881702668-trading.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-refinacion-cardon-amuay-produccion-2026',
    category: 'venezuela',
    source: 'Petroguía / Banca y Negocios',
    tag: 'Refinación & Derivados',
    date: '2026-10-11',
    title: 'Sistema de refinación nacional procesa 350.000 bpd y fija meta de 600.000 bpd para 2027',
    summary: 'PDVSA estabiliza las unidades catalíticas de Cardón y Amuay para abastecer la demanda interna de gasolinas, impulsando mantenimientos en la planta de conversión profunda.',
    content: 'Las operaciones del Centro de Refinación Paraguaná (CRP) y las refinerías de Puerto La Cruz y El Palito alcanzaron un promedio de procesamiento conjunto de 350.000 barriles diarios de crudo, garantizando la cobertura de los requerimientos internos de gasolina, diésel automotor y combustible para aviación (Jet A-1). Fuentes operativas confirmaron la conclusión de los mantenimientos programados en la torre de destilación atmosférica y el craqueador catalítico fluidizado (FCC) de la refinería Cardón. El plan estratégico plurianual contempla inversiones en servicios de desulfuración y tratamiento químico de corrientes pesadas para llevar la capacidad de procesamiento continuo a una banda de entre 500.000 y 600.000 bpd antes del segundo semestre de 2027.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_refineria_conversion.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-opep-plus-mantenimiento-cuotas-estabilidad-2026',
    category: 'mundial',
    source: 'OPEP Media Viena / EFE Dow Jones',
    tag: 'OPEP+ & Cuotas',
    date: '2026-10-10',
    title: 'OPEP+ mantiene congelamiento de oferta y evalúa medidas de contingencia frente a la volatilidad de fletes',
    summary: 'Los ministros de la alianza petrolera ratifican su política de cuotas inalteradas para el cuarto trimestre, priorizando la estabilidad del mercado frente a distorsiones logísticas globales.',
    content: 'El secretariado general de la Organización de Países Exportadores de Petróleo y sus aliados independientes (OPEP+) reiteró que las cuotas de bombeo se mantendrán inalteradas durante el último trimestre de 2026. En un comunicado emitido tras consultas técnicas ministeriales, los países productores destacaron que la resiliencia de la oferta depende de la disciplina estricta en los recortes voluntarios compensatorios. El bloque evaluó además el impacto de los fletes marítimos inflacionarios causados por desvíos en rutas de navegación tradicionales, ratificando su compromiso de intervenir de manera rápida y coordinada para neutralizar cualquier desbalance especulativo en las cotizaciones internacionales.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_opep_viena.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-acuerdo-energetico-venezuela-dominicana-2026',
    category: 'venezuela',
    source: 'Revista Mercado / Reuters / Correo del Orinoco',
    tag: 'Comercio Exterior',
    date: '2026-10-08',
    title: 'Venezuela y República Dominicana evalúan reactivar suministros directos de crudo y derivados a Refidomsa',
    summary: 'Reunión de alto nivel en Roma abre el camino para acuerdos de provisión de gas licuado de petróleo (GLP), asfalto y fuel oil en el marco de la seguridad energética regional.',
    content: 'En el marco de la cumbre de cooperación económica celebrada en Roma, autoridades del sector energético venezolano y el presidente de República Dominicana, Luis Abinader, mantuvieron un encuentro bilateral donde acordaron reactivar las mesas de trabajo técnico para evaluar la compraventa directa de hidrocarburos. El esquema bajo análisis contempla el despacho periódico desde terminales de PDVSA hacia la Refinería Dominicana de Petróleo (Refidomsa) de cargamentos de gas licuado de petróleo (GLP), asfaltos para infraestructura vial y crudos reconstituidos, revitalizando los nexos de integración energética en la cuenca del mar Caribe.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_terminal_jose.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-reliance-pdvsa-merey-suministro-2026',
    category: 'venezuela',
    source: 'Reuters / S&P Global Commodity Insights',
    tag: 'Comercio & Exportación',
    date: '2026-10-05',
    title: 'Reliance Industries y PDVSA consolidan contrato de suministro de crudo Merey 16 para refinerías en Jamnagar',
    summary: 'El conglomerado indio asegura despachos regulares en buques VLCC, afianzando un esquema de intercambio comercial por diluyentes y nafta pesada para la Faja del Orinoco.',
    content: 'El conglomerado energético indio Reliance Industries y Petróleos de Venezuela (PDVSA) formalizaron un acuerdo ampliado de suministro de crudo extrapesado diluido Merey 16 destinado al complejo refinador de Jamnagar en el estado de Gujarat, la mayor refinería del mundo. El convenio prevé la movilización bimestral de cargamentos de hasta 2 millones de barriles en supertanqueros tipo VLCC (Very Large Crude Carrier), garantizando un flujo estable de exportación y divisas para la industria venezolana. Como parte de la estructura comercial, se contempla el suministro recíproco de nafta pesada de reformado y diluyentes químicos de alto grado API, indispensables para reducir la viscosidad del crudo en las macollas de extracción de la División Carabobo y facilitar su tránsito por oleoductos hasta el Complejo Criogénico de Jose.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_reliance_petroleo.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-opep-comite-monitoreo-cuotas-octubre-2026',
    category: 'mundial',
    source: 'Bloomberg / OPEP Media Viena',
    tag: 'OPEP+ & Geopolítica',
    date: '2026-10-05',
    title: 'Comité de Monitoreo OPEP+ ratifica disciplina de cuotas y descarta aumentos de producción ante volatilidad global',
    summary: 'El panel ministerial reafirma su estrategia de defensa del piso de precios y evalúa el cumplimiento de recortes voluntarios ante las oscilaciones del Brent en torno a los $98.',
    content: 'En su más reciente sesión telemática de monitoreo ministerial (JMMC), la alianza OPEP+ ratificó de forma unánime su política de contención de oferta y cumplimiento riguroso de las cuotas asignadas, desestimando cualquier incremento prematuro en el bombeo colectivo de cara al cierre de 2026 y primer trimestre de 2027. Los delegados enfatizaron que la combinación de incertidumbre en las tasas de interés globales y la inestabilidad en rutas neurálgicas de navegación aconsejan mantener la cautela operativa. La decisión apuntala los precios del barril Brent en la franja de los 95 a 102 dólares y fortalece la demanda por crudos pesados con destino a plantas de conversión profunda, blindando las cuotas fiscales de los países exportadores participantes.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_opep_viena.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-proyecto-dragon-shell-bp-gas-2026',
    category: 'venezuela',
    source: 'World Energy Trade / Upstream Online',
    tag: 'Gas Costa Afuera',
    date: '2026-10-04',
    title: 'Proyecto Dragón y Manakin-Cocuina: Shell, BP y PDVSA concluyen estudios batimétricos para el gasoducto submarino',
    summary: 'Avanzan los trabajos de ingeniería de detalle y procura para conectar los megacampos de gas no asociado de la Plataforma Deltana con la infraestructura de licuefacción en Trinidad.',
    content: 'Las operadoras energéticas Shell y BP, en estrecha coordinación técnica con el Ministerio de Petróleo y PDVSA Gas, dieron por concluida la campaña de levantamiento geofísico y batimétrico de fondo marino para el tendido del gasoducto de 18 pulgadas que enlazará el Campo Dragón (al norte de Sucre) y el yacimiento transfronterizo Manakin-Cocuina con la plataforma Hibiscus en aguas trinitenses. El proyecto, proyectado para alcanzar un flujo inicial de 350 millones de pies cúbicos diarios (MMSCFD), se perfila como la piedra angular para transformar a Venezuela en un nodo exportador de Gas Natural Licuado (GNL) hacia los mercados del Caribe, Europa y el Cono Sur, incentivando inversiones masivas en compresión y separación criogénica.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_gas_dragon.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-fletes-maritimos-tanqueros-vlcc-2026',
    category: 'mundial',
    source: 'Lloyd\'s List / Financial Times',
    tag: 'Logística Marítima',
    date: '2026-10-04',
    title: 'Fletes marítimos de buques VLCC repuntan 28% tras nuevas primas de riesgo en el Mar Rojo y Golfo de Adén',
    summary: 'El desvío prolongado de superpetroleros por el Cabo de Buena Esperanza incrementa los días de navegación en 14 jornadas y tensiona los costos de entrega en Europa y Asia.',
    content: 'El mercado spot del fletamento marítimo de hidrocarburos experimentó una fuerte aceleración durante los primeros días de octubre de 2026. Según reportes del Baltic Exchange en Londres, las tarifas de buques tipo VLCC en la ruta Golfo Pérsico-Lejano Oriente superaron la cota de los Worldscale 78 (equivalente a más de $82.000 diarios), impulsadas por las persistentes restricciones de paso en el Estrecho de Bab el-Mandeb y la necesidad de circunnavegar el continente africano. Esta dinámica añade una prima de costo directo a los crudos del Medio Oriente, incentivando a los compradores atlánticos a buscar cargamentos de crudos pesados y medios más cercanos en el hemisferio occidental, tales como Venezuela, Brasil y el Golfo de México.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_terminal_jose.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-reactivacion-tomoporo-zulia-pozox-2026',
    category: 'venezuela',
    source: 'Petroguía / Cysos Technical News',
    tag: 'Operaciones de Campo',
    date: '2026-10-03',
    title: 'Campaña de reacondicionamiento en Tomoporo y Mene Grande reactiva 45 pozos con levantamiento electrosumergible',
    summary: 'El despliegue de unidades de coiled tubing, bombas de cavidad progresiva y aditivos químicos para control de arena restablece 38.000 bpd en campos maduros de Occidente.',
    content: 'Equipos multidisciplinarios de servicios petroleros y cuadrillas de PDVSA culminaron con éxito la primera fase del plan de reactivación intensiva de yacimientos en los campos Tomoporo, Ceuta y Mene Grande, ubicados en la cuenca del Lago de Maracaibo. Las maniobras operativas incluyeron la limpieza de fondo con tubería continua (coiled tubing), reemplazo de bombas electrosumergibles (BES) de alta confiabilidad y la inyección en cabeza de pozo de inhibidores de corrosión y dispersantes de asfaltenos de última formulación. Estas labores permitieron incorporar de manera expedita más de 38.000 barriles netos de crudo liviano y mediano a las estaciones de flujo de la costa oriental del lago, optimizando las mezclas de exportación.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_pozos_reactivacion.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-cuenca-permica-shale-record-2026',
    category: 'mundial',
    source: 'Oil & Gas Journal / Energy Intelligence',
    tag: 'Tecnología & Perforación',
    date: '2026-10-03',
    title: 'Cuenca Pérmica en EE.UU. supera los 6,4 millones de bpd apoyada en laterales extendidos de 3 millas',
    summary: 'La adopción de perforación direccional rotatoria continua y completaciones simultáneas mitiga la inflación de costos y sostiene la oferta en Texas y Nuevo México.',
    content: 'La producción de petróleo no convencional en la prolífica Cuenca Pérmica alcanzó un nuevo récord histórico al superar los 6,42 millones de barriles diarios en el inicio del cuarto trimestre de 2026, según datos oficiales de la Administración de Información Energética de EE.UU. (EIA). La clave del incremento reside en el perfeccionamiento de laterales horizontales que superan los 16.000 pies de longitud (3 millas de recorrido en lutitas) y el uso de fluidos de fracturamiento con surfactantes de nanotecnología que elevan la tasa de recuperación inicial (IP) hasta en un 22%. Sin embargo, los analistas señalan que la elevada relación gas-petróleo (GOR) en pozos antiguos obliga a las empresas a canalizar fuertes inversiones en plantas de procesamiento de gas y ductos de evacuación.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_permian_drilling.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-refinacion-crack-spreads-crudo-pesado-2026',
    category: 'mundial',
    source: 'Argus Media / Platts',
    tag: 'Refinación & Mercados',
    date: '2026-10-02',
    title: 'Márgenes de refinación de diesel y combustibles marinos tocan máximos por déficit de crudos pesados',
    summary: 'Las unidades de coquización retardada en refinerías del Golfo de México y Europa cotizan con premios históricos el crudo extrapesado con alto rendimiento en destilados.',
    content: 'Las pizarras de márgenes de refinación (crack spreads 3:2:1) en las costas del Golfo de México y el centro de refinación ARA (Ámsterdam-Rotterdam-Amberes) escalaron a niveles de $28,40 por barril, motivadas por la escasez estructural de crudos pesados de alto azufre ideales para la síntesis de diesel de ultra bajo azufre (ULSD) y búnker marítimo VLSFO. La capacidad ociosa en unidades de coquización (delayed coking) y plantas de hidrotratamiento en complejos modernos ha disparado el apetito por corrientes como el Merey 16 venezolano, Maya mexicano y Canadian Western Select (WCS), estrechando los diferenciales frente al crudo WTI a sus mínimos en más de tres años.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/noticia_refineria_conversion.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-brent-volatilidad-octubre-2026',
    category: 'mundial',
    source: 'Bloomberg / Financial Times',
    tag: 'Mercado Global',
    date: '2026-10-01',
    title: 'Brent y WTI inician octubre bajo extrema volatilidad por riesgo geopolítico en Oriente Medio y ajustes en Asia',
    summary: 'El crudo del Mar del Norte oscila entre los $97 y $102 tras cerrar septiembre con un alza del 14%, condicionado por riesgos de suministro en el Golfo Pérsico.',
    content: 'El mercado petrolero internacional inició el cuarto trimestre de 2026 con un comportamiento de alta volatilidad en las pizarras de Londres (ICE) y Nueva York (NYMEX). El crudo Brent cotiza en torno a los $98,50 por barril, luego de haber tocado picos superiores a los $107 a finales de septiembre impulsado por la escalada de tensiones en Oriente Medio. Analistas de materias primas destacan que la prima de riesgo marítimo en el Estrecho de Ormuz, combinada con la decisión estratégica de refinerías en China de limitar exportaciones de derivados para proteger reservas domésticas, mantiene en máxima alerta a los operadores globales de crudo y destilados.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/1790881702668-trading.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-ingresos-exportaciones-venezuela-2026',
    category: 'venezuela',
    source: 'Petroguía / Banca y Negocios',
    tag: 'Economía & Comercio',
    date: '2026-09-30',
    title: 'Ingresos petroleros de Venezuela escalan a $17.200 millones impulsados por exportaciones de 1,08M bpd',
    summary: 'Las exportaciones petroleras acumulan un repunte del 76% en facturación durante 2026, consolidando envíos sostenidos a refinerías del Golfo de México y Asia.',
    content: 'Al cierre del tercer trimestre de 2026, la industria hidrocarburífera venezolana registró ingresos acumulados por exportación que superan los 17.200 millones de dólares, marcando un incremento interanual del 76% frente al mismo periodo de 2025. A pesar de una moderación técnica en los despachos de septiembre (promediando 1,08 millones de barriles diarios) por ajustes logísticos y tarifas de flete marítimo, la regularidad en las operaciones con socios transnacionales y el suministro directo a refinadores en la Costa del Golfo de EE.UU. han consolidado un flujo de divisas clave para la reinversión en campos de extracción.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/1790881701869-export.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-opep-cumbre-ministerial-2026',
    category: 'mundial',
    source: 'EFE Viena / Reuters',
    tag: 'OPEP+ y Cuotas',
    date: '2026-09-29',
    title: 'OPEP+ alista cumbre ministerial ratificando postura prudente sobre cuotas de producción para noviembre',
    summary: 'El comité ministerial conjunto evalúa los fundamentos de demanda para el cuarto trimestre sin alterar de forma apresurada los techos de bombeo vigentes.',
    content: 'Los ministros de energía del bloque OPEP+, encabezados por Arabia Saudita y Rusia, concluyen consultas técnicas previas a la reunión ministerial del Comité Conjunto de Monitoreo (JMMC). Los reportes de las delegaciones en Viena apuntan a un consenso unánime para mantener la disciplina de cuotas y no liberar volumen adicional al mercado spot en noviembre, priorizando la estabilidad de precios frente a las señales de desaceleración económica global y ajustando la capacidad base de producción de los países miembros hacia el ciclo operativo 2027.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/1790881703323-opep.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-chevron-pdvsa-perforacion-2026',
    category: 'venezuela',
    source: 'Reuters / Cysos Technical News',
    tag: 'Operaciones de Campo',
    date: '2026-09-28',
    title: 'Chevron y PDVSA intensifican perforación de nuevos pozos en el Zulia y la Faja para alcanzar 250.000 bpd conjuntos',
    summary: 'La empresa mixta Petroboscán y los proyectos en la Faja incorporan taladros de última generación y reacondicionamiento continuo para elevar la extracción.',
    content: 'En el marco de la ampliación de licencias y acuerdos operativos, la operadora estadounidense Chevron, en alianza técnica con PDVSA, movilizó taladros de perforación profunda y equipos de completación hacia los yacimientos del Lago de Maracaibo (Petroboscán) y el Bloque Carabobo en la Faja del Orinoco. El plan de trabajo contempla la reactivación y puesta en marcha de 18 pozos estratégicos dotados de sistemas de levantamiento artificial electrosumergible y bombas de cavidad progresiva (BCP), proyectando una extracción combinada de 250.000 bpd antes del primer trimestre de 2027.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/1790881581579-noticia_chevron.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-loran-maurel-prom-gas-2026',
    category: 'venezuela',
    source: 'World Energy Trade / Petroguía',
    tag: 'Inversión & Gas',
    date: '2026-09-25',
    title: 'Inversiones europeas se expanden: Maurel & Prom y megaproyecto de gas offshore aceleran obras en Zulia y Plataforma Deltana',
    summary: 'Nuevos contratos de servicios integrales dinamizan campos maduros en el Lago de Maracaibo y aceleran el gasoducto submarino hacia el Caribe.',
    content: 'La petrolera francesa Maurel & Prom formalizó una inyección adicional de capital para optimizar la infraestructura de recolección y reemplazo de líneas submarinas en el campo Petroindependiente del Lago de Maracaibo. Paralelamente, el Ministerio de Petróleo y corporaciones energéticas aliadas avanzaron en la fase de ingeniería para el desarrollo del megacampo de gas no asociado Loran en la Plataforma Deltana, un proyecto estratégico que convertirá a Venezuela en proveedor neurálgico de gas natural licuado para el mercado caribeño e internacional.',
    mediaUrl: 'https://rdfprgvlwemgoeqlmcna.supabase.co/storage/v1/object/public/media/1790881700389-loran.jpg',
    mediaType: 'image'
  },

  {
    id: 'news-opep-produccion-agosto-2026',
    category: 'venezuela',
    source: 'OPEP / Cysos Technical News',
    tag: 'Producción Nacional',
    date: '2026-09-23',
    title: 'Producción petrolera venezolana se estabiliza en 1,2 millones de bpd durante agosto según la OPEP',
    summary: 'El reporte mensual de la OPEP confirma un promedio de 1.200.000 barriles diarios, consolidando un incremento del 29,9% en lo que va del año 2026.',
    content: 'De acuerdo con el más reciente informe mensual de la Organización de Países Exportadores de Petróleo (OPEP) publicado en septiembre, la producción petrolera de Venezuela se mantuvo estable durante el mes de agosto, registrando un promedio de 1,2 millones de barriles diarios (bpd). Aunque el crecimiento intermensual fue marginal, la cifra consolida un incremento sostenido de aproximadamente el 29,9% en el transcurso del año 2026, partiendo de los 924.000 bpd reportados en enero. Especialistas del sector energético destacan que sostener este nivel de extracción requiere de mayores inversiones en tecnología de levantamiento artificial e infraestructura de tratamiento químico en la Faja Petrolífera del Orinoco.',
    mediaUrl: '/images/noticia_opep_mundial.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-riesgo-pais-venezuela-2026',
    category: 'mundial',
    source: 'Banca y Negocios',
    tag: 'Finanzas & Energía',
    date: '2026-09-22',
    title: 'Riesgo país de Venezuela disminuye 52% impulsado por reactivación operativa y nuevos acuerdos',
    summary: 'El indicador financiero cae a 6.037 puntos básicos tras la firma de memorandos de entendimiento con multinacionales y la expectativa de mayor flujo de divisas petroleras.',
    content: 'Durante la tercera semana de septiembre de 2026, el indicador de riesgo país de Venezuela (EMBI) registró una contracción notable, acumulando una disminución neta de aproximadamente 52% en el transcurso del año para situarse en torno a los 6.037 puntos básicos. Analistas financieros atribuyen este comportamiento a las recientes firmas de memorandos de entendimiento entre PDVSA y grandes corporaciones internacionales (como TotalEnergies y Continental Resources), sumado a las proyecciones de incremento en las exportaciones de crudo pesado. La reincorporación gradual de bonos venezolanos en índices de liquidez internacional también ha favorecido la percepción de riesgo de los inversionistas institucionales.',
    mediaUrl: '/images/noticia_trading_crudo.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-aie-deficit-global-2026',
    category: 'mundial',
    source: 'Bloomberg / Agencia Internacional de Energía',
    tag: 'Mercado Global',
    date: '2026-09-21',
    title: 'AIE proyecta déficit petrolero hasta 2027 y alerta sobre fuerte encarecimiento logístico',
    summary: 'La inestabilidad en rutas marítimas clave y la escasez de superpetroleros elevan los fletes, mientras el Brent se estabiliza en torno a los 100 dólares.',
    content: 'En su informe de perspectivas energéticas de septiembre, la Agencia Internacional de la Energía (AIE) advirtió que el déficit en el suministro global de crudo podría prolongarse hasta el primer trimestre de 2027. La prolongación de la inestabilidad en el Estrecho de Ormuz y daños recientes a infraestructura logística han retrasado la normalización de los flujos. Asimismo, el mercado enfrenta un encarecimiento extremo en las tarifas de transporte marítimo debido a la escasez de superpetroleros (VLCC) disponibles, lo que añade presiones inflacionarias a los costos de importación en Europa y Asia, manteniendo la cotización del crudo Brent sostenidamente cerca de los 100 dólares por barril.',
    mediaUrl: '/images/noticia_hormuz_tanqueros.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-ofac-licencia-52c-2026',
    category: 'venezuela',
    source: 'Petroguía / Reuters',
    tag: 'Marco Regulatorio',
    date: '2026-09-14',
    title: 'OFAC emite nueva Licencia General 52C para operaciones de servicios petroleros en Venezuela',
    summary: 'El Departamento del Tesoro de EE.UU. amplía el margen operativo para empresas de servicios especializados, impulsando las alianzas en la Faja del Orinoco.',
    content: 'La Oficina de Control de Activos Extranjeros (OFAC) del Departamento del Tesoro estadounidense emitió la Licencia General 52C, la cual autoriza a ciertas empresas de servicios, logística e ingeniería a mantener y ampliar operaciones esenciales para la producción de crudo en Venezuela. Esta flexibilización, sujeta a estrictos controles de cumplimiento (compliance), tiene como objetivo principal estabilizar el bombeo en empresas mixtas y facilitar el despliegue de tecnología química y logística pesada que empresas extranjeras han acordado recientemente con PDVSA. La medida ha sido recibida positivamente por el sector industrial conexo en Anzoátegui y Monagas.',
    mediaUrl: '/images/noticia_continental_ayacucho.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-continental-ayacucho-2026',
    category: 'venezuela',
    source: 'Banca y Negocios / Reuters',
    tag: 'Faja del Orinoco',
    date: '2026-09-18',
    title: 'Continental Resources acuerda con PDVSA el desarrollo del Bloque Ayacucho 2 en la Faja del Orinoco',
    summary: 'La operadora estadounidense y PDVSA suscribieron un Memorando de Entendimiento para la reactivación y desarrollo del Bloque Ayacucho 2 en Anzoátegui, con más de 30.000 millones de barriles en reservas.',
    content: 'La compañía petrolera estadounidense Continental Resources y Petróleos de Venezuela (PDVSA) suscribieron en Caracas un memorando de entendimiento para la inversión y reactivación del bloque Ayacucho 2, ubicado en la Faja Petrolífera del Orinoco (estado Anzoátegui). El bloque abarca un área de 51.000 hectáreas con reservas estimadas en más de 30.000 millones de barriles de crudo pesado y extrapesado. El acuerdo estipula la incorporación de taladros de última generación y facilidades de transporte, impulsando la demanda de servicios integrales de ingeniería, química y logística pesada en la región oriental.',
    mediaUrl: '/images/noticia_continental_ayacucho.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-pdvsa-meta-produccion-2026',
    category: 'venezuela',
    source: 'Banca y Negocios / PDVSA Prensa',
    tag: 'Producción Nacional',
    date: '2026-09-16',
    title: 'PDVSA proyecta cerrar 2026 en 1.300.000 barriles diarios y avanzar hacia 1.5M en 2027',
    summary: 'El vicepresidente ejecutivo de PDVSA, Jovanny Martínez, ratificó metas de producción sostenidas apoyadas en reactivación de macollas y recuperación de crudos livianos.',
    content: 'El vicepresidente ejecutivo de Petróleos de Venezuela (PDVSA), Jovanny Martínez, ratificó que la industria nacional proyecta consolidar un promedio de extracción de 1.300.000 barriles de petróleo diarios (bpd) al cierre de 2026, con miras a superar los 1,5 millones de bpd durante 2027. La estrategia operativa se fundamenta en la reactivación intensiva de macollas en la Faja del Orinoco, la perforación de nuevos pozos con empresas mixtas y la recuperación de crudos ligeros y condensados en Monagas y Zulia, insumos críticos para la dilución y transporte del crudo Merey 16 hacia refinerías mundiales.',
    mediaUrl: '/images/noticia_chevron_faja.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-totalenergies-retorno-2026',
    category: 'venezuela',
    source: 'Banca y Negocios / AFP',
    tag: 'Alianzas Globales',
    date: '2026-09-14',
    title: 'TotalEnergies firma memorando con PDVSA para cooperación estratégica en hidrocarburos',
    summary: 'La energética francesa consolida su retorno a Venezuela con nuevos acuerdos de cooperación técnica en crudo, gas costa afuera y terminales marítimos.',
    content: 'La multinacional francesa TotalEnergies oficializó su retorno al panorama energético venezolano tras suscribir un memorando de entendimiento con PDVSA para la cooperación estratégica en materia de hidrocarburos. La alianza técnica contempla estudios de reactivación en campos de crudo y gas costa afuera, optimización de infraestructura de licuefacción y despacho marítimo desde terminales del oriente venezolano hacia refinerías internacionales, dinamizando las cadenas de suministro industrial.',
    mediaUrl: '/images/noticia_totalenergies_venezuela.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-repsol-monagas-2026',
    category: 'venezuela',
    source: 'Banca y Negocios / EFE',
    tag: 'Operaciones Monagas',
    date: '2026-09-11',
    title: 'Repsol retoma control operativo de Petroquiriquire para triplicar producción en Monagas',
    summary: 'Repsol acelera la rehabilitación de pozos maduros y tendido de líneas en Quiriquire para multiplicar la extracción en un plazo de 36 meses.',
    content: 'Repsol y PDVSA consolidaron un nuevo marco de gestión operativa para la empresa mixta Petroquiriquire, permitiendo a la firma española liderar las maniobras técnicas en los campos de Quiriquire (estado Monagas) y Mene Grande (Zulia). El plan integral tiene como objetivo triplicar la extracción en un plazo de 36 meses, desplegando unidades de Workover, Pulling, mantenimiento de pozos 24/7 y reacondicionamiento electromecánico de sistemas de levantamiento artificial.',
    mediaUrl: '/images/noticia_repsol_monagas.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-eni-junin-2026',
    category: 'venezuela',
    source: 'World Energy Trade / Eni Media',
    tag: 'Inversión Extranjera',
    date: '2026-09-08',
    title: 'Eni formaliza Contrato de Participación Productiva por 25 años en el Bloque Junín 5',
    summary: 'La petrolera italiana sella acuerdo de largo plazo para la extracción masiva de crudo extrapesado y modernización de estaciones de flujo en la Faja.',
    content: 'La empresa italiana Eni formalizó la suscripción de un Contrato de Participación Productiva de Hidrocarburos por un lapso de 25 años con PDVSA para el desarrollo masivo del Bloque Junín 5 en la Faja Petrolífera del Orinoco. El proyecto incorpora la modernización de plantas deshidratadoras, inyección continua de químicos reductores de viscosidad y mantenimiento de oleoductos matrices hacia el Complejo Industrial José Antonio Anzoátegui.',
    mediaUrl: '/images/noticia_eni_junin.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-quimica-eor-faja-2026',
    category: 'venezuela',
    source: 'Petroguía / Cysos Technical News',
    tag: 'Tecnología & Flujo',
    date: '2026-09-04',
    title: 'Despliegue de tecnología química EOR reduce 40% consumo de diluyentes en crudos extrapesados',
    summary: 'Skids automatizados de inyección química de alta precisión optimizan el transporte de crudo Merey 16 en los oleoductos de Monagas y Anzoátegui.',
    content: 'La implementación de skids automatizados de inyección química de reductores permanentes de viscosidad en las macollas de Morichal y Carabobo ha permitido a las empresas operadoras reducir hasta en un 40% la utilización de diluyentes importados y nafta, asegurando la transitabilidad fluida del crudo pesado en oleoductos troncales bajo estándares internacionales ASTM.',
    mediaUrl: '/images/noticia_eor_quimica.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-brent-opep-precios-2026',
    category: 'mundial',
    source: 'Banca y Negocios / Reuters',
    tag: 'Precios del Crudo',
    date: '2026-09-20',
    title: 'Brent supera los $100 y la Cesta OPEP alcanza los $123 ante tensiones en el Estrecho de Ormuz',
    summary: 'La prima de riesgo geopolítico en el Golfo Pérsico y la alta demanda global de hidrocarburos impulsan los precios internacionales a máximos del año.',
    content: 'Los precios internacionales del crudo registraron un fuerte repunte en septiembre de 2026, con el barril de Brent superando los 101 dólares y la cesta de referencia de la OPEP alcanzando los 123 dólares por barril. La escalada responde a la prima de riesgo geopolítico en el Golfo Pérsico, retrasos en la navegación de tanqueros por el Estrecho de Ormuz y una fuerte demanda estacional de combustible en economías emergentes y centros de refinación occidentales.',
    mediaUrl: '/images/noticia_opep_mundial.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-opep-plus-cuotas-2026',
    category: 'mundial',
    source: 'Banca y Negocios / EFE Viena',
    tag: 'OPEP+ y Cuotas',
    date: '2026-09-17',
    title: 'OPEP+ frena aumento paulatino de producción y congela cuotas para octubre de 2026',
    summary: 'La alianza de productores encabezada por Arabia Saudita y Rusia pausa aumentos de oferta para mantener el equilibrio y la estabilidad de precios.',
    content: 'La alianza OPEP+, liderada por Arabia Saudita y Rusia, decidió detener los incrementos graduales mensuales de 188.000 bpd y mantener sin cambios su meta de producción para octubre de 2026. Los ministros del cartel petrolero señalaron la necesidad de actuar con cautela ante la volatilidad de los mercados financieros y las limitaciones logísticas causadas por tensiones en rutas marítimas clave.',
    mediaUrl: '/images/noticia_hormuz_tanqueros.jpg',
    mediaType: 'image'
  },
  {
    id: 'news-trading-crudo-inventarios-2026',
    category: 'mundial',
    source: 'Bloomberg / Financial Times',
    tag: 'Mercado Global',
    date: '2026-09-13',
    title: 'Wall Street y Londres registran alta volatilidad en contratos futuros de crudo y refinados',
    summary: 'Inventarios comerciales caen por debajo del promedio quinquenal, aumentando la presión sobre la oferta mundial de crudos pesados y medios.',
    content: 'Las mesas de negociación de materias primas en Londres (ICE) y Nueva York (NYMEX) experimentaron sesiones de intenso volumen de trading para los contratos de petróleo WTI y Brent. Los inventarios comerciales de crudo en Estados Unidos cayeron por debajo del promedio quinquenal, mientras que la recuperación de la capacidad de refinación en Asia presiona la oferta global de crudos pesados y medios.',
    mediaUrl: '/images/noticia_trading_crudo.jpg',
    mediaType: 'image'
  }
];

const INITIAL_VISIT_STATS = {
  totalVisits: 1,
  uniqueVisitors: 1,
  todayVisits: 1,
  lastDate: new Date().toISOString().split('T')[0],
  history: [
    { date: new Date().toISOString().split('T')[0], visits: 1 }
  ],
  devices: { mobile: 50, desktop: 50 }
};

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
  const [news, setNews] = useState(INITIAL_NEWS);
  const [visitStats, setVisitStats] = useState(INITIAL_VISIT_STATS);

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
        if (data['cysos_cms_company_info']) {
          const loadedInfo = data['cysos_cms_company_info'];
          if (loadedInfo.rif === 'J-50478054-4' || loadedInfo.rif === 'J-50346383-1' || !loadedInfo.rif) {
            loadedInfo.rif = 'J-40031863-7';
          }
          if (loadedInfo.telefonos && (loadedInfo.telefonos.includes('0414') || loadedInfo.telefonos.includes('4817113'))) {
            loadedInfo.telefonos = '0412-9486249';
          }
          setCompanyInfo((prev) => ({ ...prev, ...loadedInfo }));
        }
        if (data['cysos_cms_services']) setServices(data['cysos_cms_services']);
        if (data['cysos_cms_alliances']) setAlliances(data['cysos_cms_alliances']);
        
        // Cargar noticias desde Supabase priorizando el orden en vivo
        if (data['cysos_cms_news'] && Array.isArray(data['cysos_cms_news']) && data['cysos_cms_news'].length > 0) {
          setNews(data['cysos_cms_news']);
        } else {
          setNews(INITIAL_NEWS);
        }
        
        if (data['cysos_cms_analytics']) setVisitStats(data['cysos_cms_analytics']);
        setDbSyncStatus('success');
      } else {
        setDbSyncStatus('error');
      }
      setIsDbLoaded(true);
    };
    initDatabase();
  }, []);

  // 2. Registro inteligente de visita en tiempo real
  useEffect(() => {
    const registerVisit = async () => {
      try {
        let isNewSession = false;
        let isUniqueUser = false;
        const now = Date.now();
        const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 horas de sesión

        // 1. Visitante Único (Huella permanente)
        if (!localStorage.getItem('cysos_user_uid')) {
          localStorage.setItem('cysos_user_uid', `user-${now}-${Math.random().toString(36).substr(2, 9)}`);
          isUniqueUser = true;
        }

        // 2. Control de Sesión (No cuenta si recarga o cierra y abre el mismo día)
        const lastVisitStr = localStorage.getItem('cysos_last_visit_time');
        const lastVisitTime = lastVisitStr ? parseInt(lastVisitStr, 10) : 0;

        if (now - lastVisitTime > SESSION_TIMEOUT) {
          isNewSession = true; // Solo es nueva visita si pasaron más de 24 horas
        }

        // 3. Actualizar la última interacción
        localStorage.setItem('cysos_last_visit_time', now.toString());

        const stats = await recordVisitInSupabase(isNewSession, isUniqueUser);
        if (stats) {
          setVisitStats(stats);
        }
      } catch (err) {
        console.error('Error registrando analítica de visita:', err);
      }
    };

    registerVisit();
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

  const addNews = (newsItem) => {
    setNews((prev) => {
      const newState = [{ id: `news-${Date.now()}`, ...newsItem }, ...prev];
      saveToSupabase('cysos_cms_news', newState);
      return newState;
    });
  };

  const updateNews = (id, updatedFields) => {
    setNews((prev) => {
      const newState = prev.map((n) => (n.id === id ? { ...n, ...updatedFields } : n));
      saveToSupabase('cysos_cms_news', newState);
      return newState;
    });
  };

  const deleteNews = (id) => {
    setNews((prev) => {
      const newState = prev.filter((n) => n.id !== id);
      saveToSupabase('cysos_cms_news', newState);
      return newState;
    });
  };

  const updateAnalyticsBaseline = async (newTotalVisits) => {
    const total = Number(newTotalVisits) || 14280;
    const unique = Math.round(total * 0.68);
    const updated = {
      ...visitStats,
      totalVisits: total,
      uniqueVisitors: unique,
      updated_at: new Date().toISOString()
    };
    setVisitStats(updated);
    await saveAnalyticsToSupabase(updated);
    return updated;
  };

  return (
    <CmsContext.Provider
      value={{
        heroContent, updateHeroContent,
        partners, updatePartner, addPartner, deletePartner,
        messages, kpis, mediaItems, companyInfo, services, alliances, news,
        visitStats, setVisitStats, updateAnalyticsBaseline,
        isAdminOpen, setIsAdminOpen, isLoggedIn, loginAdmin, logoutAdmin,
        addMessage, updateMessageStatus, deleteMessage, updateKpi,
        updateMediaItem, addMediaItem, deleteMediaItem, updateService, updateCompanyInfoText, updateAllianceLogo,
        addNews, updateNews, deleteNews,
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
