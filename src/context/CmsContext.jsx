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
        if (data['cysos_cms_news']) setNews(data['cysos_cms_news']);
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
