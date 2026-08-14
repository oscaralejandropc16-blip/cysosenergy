import React, { useState } from 'react';
import { Flame, Zap, Activity, ArrowUpRight, CheckCircle2, X, PhoneCall, FlaskConical, Truck, Globe, Award, ShieldCheck, Play } from 'lucide-react';

export const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState('quimica');
  const [activeVideoModal, setActiveVideoModal] = useState(false);

  const portfolioDivisions = {
    quimica: {
      category: 'División 1: Química de Producción y Optimización',
      title: 'Formulación, Suministro e Inyección de Químicos Especializados',
      image: '/images/IMG_7549.jpg',
      icon: FlaskConical,
      summary: 'Servicio integral de suministro e inyección de especialidades químicas diseñadas para maximizar la eficiencia operativa, recuperar pozos y proteger activos bajo norma ISO 9001.',
      items: [
        { name: 'Reductor Permanente de Viscosidad', desc: 'Formulado para actuar en la fase de hidrocarburos, reduciendo la viscosidad en crudos 8° - 12° API.' },
        { name: 'Desmulsificantes & Rompedor Rápido Tipo Slug', desc: 'Para una separación eficiente de fases agua-aceite en estaciones de flujo.' },
        { name: 'Dispersantes de Parafinas y Asfaltenos', desc: 'Previene la deposición orgánica en tubulares y oleoductos.' },
        { name: 'Ácidos Especializados (HCl, Acético, HCl+HF)', desc: 'Para tratamientos de acidificación de matriz y estimulación de pozos.' },
        { name: 'Sistemas de Limpieza con Xileno & Solvente Mutual', desc: 'Remoción profunda de depósitos y humectación de sólidos.' },
        { name: 'Inhibidores de Corrosión e Incrustación', desc: 'Preservación de la integridad de tubulares, bombas BCP/ESP y oleoductos.' },
        { name: 'Secuestrante de H2S & Antiespumantes', desc: 'Gestión de gases ácidos y control de espuma en separadores multifásicos.' },
        { name: 'Reductor de Fricción', desc: 'Mejora la tasa de flujo (BPD) y disminuye la caída de presión en líneas de recolección.' }
      ]
    },
    intervencion: {
      category: 'División 2: Intervención y Recuperación de Pozos',
      title: 'Workover, Pulling y Unidades Flush By 24/7',
      image: '/images/coiled_tubing.png',
      icon: Flame,
      summary: 'Reacondicionamiento total de pozos con taladros de alta potencia (350 HP a 750 HP), unidades Flush By autotransportables y reparación técnica de sistemas BCP/ESP.',
      items: [
        { name: 'Taladros de Workover y Pulling (350 HP a 750 HP)', desc: 'Rehabilitación y reparación total de pozos con taladros de alta capacidad.' },
        { name: 'Unidad Flush By 24/7 Autotransportable', desc: 'Operaciones de subsuelo 24/7 con personal certificado para intervenciones profundas y completación.' },
        { name: 'Reparación de Sistemas BCP & Bombas ESP', desc: 'Mantenimiento especializado de Bombas de Cavidad Progresiva y Electrosumergibles.' },
        { name: 'Limpieza Mecánica Especializada', desc: 'Herramientas como molinos, escariadores y magnetos para eliminar residuos y sedimentos.' },
        { name: 'Reparación de Plantas Eléctricas e Industriales', desc: 'Mantenimiento técnico de generadores Caterpillar y motores marinos.' }
      ]
    },
    logistica: {
      category: 'División 3: Logística, Izamiento y Transporte Pesado',
      title: 'Grúas Telescópicas hasta 110 Toneladas y Maquinaria Pesada',
      image: '/images/logistics_trucks.png',
      icon: Truck,
      summary: 'Flota especializada para transporte pesado de fluidos, lodos y químicos, grúas telescópicas de gran tonelaje y maquinaria CAT para movimiento de tierra.',
      items: [
        { name: 'Chutos Vacuum & Cisternas', desc: 'Estructuras cilíndricas para el transporte pesado de fluidos, lodos de perforación y agua.' },
        { name: 'Chutos Tolva, Volqueta, Batea & Low-Boy', desc: 'Unidades de arrastre para minerales, cemento, sílice, barita y productos químicos.' },
        { name: 'Grúas Telescópicas (60 Ton, 70 Ton y 110 Ton)', desc: 'Equipos de izamiento pesado certificados para maniobras críticas.' },
        { name: 'Brazos Hidráulicos (7 Ton a 35 Ton)', desc: 'Instalados en camiones para carga y descarga autónoma.' },
        { name: 'Excavadora Jumbo 320 CAT & Payloaders', desc: 'Movimiento de tierra, saneamiento ambiental y movimiento de desecho petrolero.' },
        { name: 'Side Boom (Pluma Lateral) & Super Vactor', desc: 'Tendido de líneas de tuberías y destape de sistemas de alcantarillado industrial.' }
      ]
    },
    procura: {
      category: 'División 4: Ingeniería, Procura y Suministros ISO 9001',
      title: 'Sourcing Internacional y Control de Presión API',
      image: '/images/IMG_7702.jpg',
      icon: Globe,
      summary: 'Importación directa con alianzas globales en USA, suministro de tuberías certificadas, válvulas API, motores Cummins y equipos periféricos de campo.',
      items: [
        { name: 'Sourcing Internacional de Tuberías ERW / Sin Costura', desc: 'Importación directa de tubulares y tuberías flexibles RTP 2" y 4".' },
        { name: 'Válvulas API & Motores Cummins', desc: 'Importación e instalación de válvulas de alta presión y motores industriales.' },
        { name: 'Control de Presión (Preventores BOP & Chokes)', desc: 'Alquiler y venta de preventores, chokes manuales, mangueras Chiksan y bombas triplex.' },
        { name: 'Alquiler de Campers Habitacionales & Iluminación', desc: 'Campers para personal de campo, torres de luz, montacargas y contenedores para desechos peligrosos.' }
      ]
    }
  };

  const currentDivision = portfolioDivisions[activeTab];

  return (
    <section id="servicios" className="py-24 relative bg-navy-950 border-t border-slate-800 overflow-hidden">
      
      {/* Glow Backdrop */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-gold-metallic/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-metallic/40 text-gold-400 text-xs font-semibold uppercase tracking-wider shadow-gold-glow">
            <Award className="w-4 h-4 text-flame-500" />
            <span>Portafolio Integral de Servicios ISO 9001</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Nuestras 4 Divisiones de <span className="text-gradient-flame">Servicios Petroleros</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light">
            Especialidades técnicas e integración multidisciplinaria para el sector hidrocarburos e industria en Venezuela.
          </p>
        </div>

        {/* Division Tab Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {[
            { id: 'quimica', name: 'Química de Producción', icon: FlaskConical },
            { id: 'intervencion', name: 'Intervención de Pozos', icon: Flame },
            { id: 'logistica', name: 'Logística & Izamiento', icon: Truck },
            { id: 'procura', name: 'Procura ISO 9001', icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3 ${
                  isActive
                    ? 'bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 border-gold-metallic text-white shadow-flame-glow scale-[1.02]'
                    : 'luxury-card border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isActive ? 'bg-navy-950 text-gold-400' : 'bg-navy-900 text-gold-400 border border-slate-700'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-extrabold font-heading">{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Division Showcase Card */}
        <div className="luxury-glass rounded-3xl border border-gold-metallic/30 overflow-hidden shadow-2xl grid lg:grid-cols-12 items-stretch">
          
          {/* Left Side: Photographic Banner Header */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full group overflow-hidden">
            <img
              src={currentDivision.image}
              alt={currentDivision.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy-950" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-full bg-navy-950/90 text-gold-400 text-xs font-extrabold uppercase border border-gold-metallic/30 backdrop-blur-md">
                {currentDivision.category}
              </span>
            </div>

            <button
              onClick={() => setActiveVideoModal(true)}
              className="absolute bottom-6 left-6 px-4 py-2 rounded-xl bg-flame-500/90 hover:bg-flame-500 text-white text-xs font-bold flex items-center gap-2 shadow-flame-glow backdrop-blur-md"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Ver Operaciones en Campo 🎥</span>
            </button>
          </div>

          {/* Right Side: Detailed Service Items List */}
          <div className="lg:col-span-7 p-8 sm:p-10 space-y-6">
            <div>
              <span className="text-xs text-gold-400 font-extrabold uppercase tracking-wider block mb-1">
                Portafolio Oficial Brochure CYSOS 2026
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                {currentDivision.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light mt-2 leading-relaxed">
                {currentDivision.summary}
              </p>
            </div>

            {/* Sub-Items List */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
              {currentDivision.items.map((item, idx) => (
                <div key={idx} className="bg-navy-950/90 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <h4 className="text-xs font-extrabold text-white line-clamp-1">{item.name}</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 font-light leading-snug line-clamp-2">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Garantía de Calidad Auditada ISO 9001</span>
              </div>
              <a
                href="#contacto"
                className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-flame-500 via-orange-600 to-gold-600 hover:from-flame-600 hover:to-gold-700 shadow-flame-glow flex items-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Solicitar Cotización</span>
              </a>
            </div>

          </div>

        </div>

        {/* Video Player Modal */}
        {activeVideoModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-950/95 backdrop-blur-xl animate-fadeIn">
            <div className="luxury-glass w-full max-w-4xl rounded-3xl border border-gold-metallic/40 overflow-hidden relative shadow-2xl">
              <div className="flex items-center justify-between p-4 bg-navy-950 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-flame-500 fill-flame-500" />
                  <h3 className="font-heading font-bold text-white text-base">CYSOS ENERGY - Video Real de Servicios en Campo</h3>
                </div>
                <button
                  onClick={() => setActiveVideoModal(false)}
                  className="p-2 rounded-xl bg-navy-850 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                <video controls autoPlay className="w-full h-full object-contain" poster="/images/IMG_7549.jpg">
                  <source src="/videos/IMG_7557.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
