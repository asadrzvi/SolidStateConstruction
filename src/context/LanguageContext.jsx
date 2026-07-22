import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Navbar
    navAbout: "About",
    navServices: "Services",
    navGallery: "Gallery",
    navContact: "Contact",
    navQuoteBtn: "Get Free Quote",
    navPhone: "(512) 595-2332",

    // Hero
    heroBadge: "24/7 Water Remediation Service",
    heroTitle: "Solid State Construction",
    heroSubtitle: "Leander's Choice for Quality Remodeling, Foundation Repair & Emergency Services",
    heroCallCta: "Call Now: (512) 595-2332",
    heroQuoteCta: "Get a Quote Online",

    // About
    aboutTitle: "About Solid State Construction",
    aboutSubtitle: "Who We Are & What We Do",
    aboutP1: "Solid State Construction is Leander's premier partner for comprehensive home restoration and improvement. We specialize in a wide range of essential services designed to keep your home safe, beautiful, and structurally sound.",
    aboutCoreTitle: "Our Core Expertise:",
    aboutCoreItem1: "Drywall & Paint: Flawless finishing and professional interior/exterior painting.",
    aboutCoreItem2: "Full Remodeling: Complete kitchen, bathroom, and home transformations.",
    aboutCoreItem3: "Roofing: Expert repairs and full replacements for long-lasting protection.",
    aboutCoreItem4: "Foundation: Critical structural repairs and leveling for Texas soil.",
    aboutCoreItem5: "Water Remediation: 24/7 emergency response to dry and restore your home.",
    aboutCoreItem6: "Flooring & Tile: Custom installations including hardwood, laminate, and intricate tile work.",
    aboutLocation: "Based at 1101 Halsey Drive, we pride ourselves on being a local business that understands the unique construction needs of our Leander and North Austin neighbors.",
    aboutStat1Num: "100%",
    aboutStat1Lbl: "Local Focus",
    aboutStat2Num: "24/7",
    aboutStat2Lbl: "Emergency Support",
    aboutStat3Num: "Quality",
    aboutStat3Lbl: "Guaranteed",
    aboutFounderTitle: "Meet Our Founder, Shaan",
    aboutFounderQuote: "Solid State Construction was founded with a single mission: to provide Austin families with premium, legacy-grade contracting they can trust unconditionally. Under Shaan's leadership, we bring absolute engineering perfection to every project—ensuring structural integrity and master-class craftsmanship on every single job.",
    aboutFounderSignature: "— Shaan, Founder & Chief Engineer",

    // Services General
    servicesTitle: "Our Specialized Services",
    servicesSubtitle: "Select between our residential and commercial solutions for tailored, legacy-grade craftsmanship.",
    servicesTabRes: "Residential Services",
    servicesTabComm: "Commercial Services",
    servicesInquireBtn: "Inquire Now",

    // Services - Residential
    resWaterTitle: "Residential Water Mitigation",
    resWaterDesc: "Rapid response for residential leaks, pipe bursts, and flooding. We dry, sanitize, and restore your home to safety.",
    resPlumbingTitle: "Home Plumbing Services",
    resPlumbingDesc: "Professional leak detection, custom fixtures, whole-house repiping, and emergency residential plumbing.",
    resRoofingTitle: "Residential Roofing",
    resRoofingDesc: "Expert roof repairs, storm-damage tarping, and complete residential roof replacements.",
    resConcreteTitle: "Driveways & Patios",
    resConcreteDesc: "Custom concrete installations including patios, driveways, sidewalks, and residential foundation leveling.",

    // Services - Commercial
    commWaterTitle: "Commercial Water Restoration",
    commWaterDesc: "Large-scale drying, sanitization, and moisture extraction for offices, retail, and warehouses. Minimal downtime guaranteed.",
    commConcreteTitle: "Commercial Concrete & Foundations",
    commConcreteDesc: "Heavy-duty slab pouring, commercial foundation reinforcement, site engineering, and structural concrete repair.",
    commRoofingTitle: "Commercial Roofing",
    commRoofingDesc: "Flat roof coatings, premium TPO replacement, commercial metal roofing, and industrial preventative roof maintenance.",
    commExcavationTitle: "Site Prep & Heavy Excavation",
    commExcavationDesc: "Industrial grading, civil earthmoving, site drainage prep, trenching, and commercial foundation excavation.",

    // Process Timeline
    processTitle: "Our Professional Restoration Process",
    processSubtitle: "How we return your home to pristine structural integrity—from emergency callout to final handover.",
    processStep1Title: "1. 24/7 Dispatch & Rapid Response",
    processStep1Sub: "Emergency Callout within Leander & Austin Metro",
    processStep1Desc: "When disaster strikes or emergency repair is needed, our technicians are on-site within 1 hour. We immediately stabilize safety conditions.",
    processStep2Title: "2. Immediate Damage Containment",
    processStep2Sub: "Mitigate Loss & Prevent Secondary Damage",
    processStep2Desc: "We perform fast water extraction, set up commercial air dehumidifiers, and apply temporary board-up or roof tarps to secure the envelope.",
    processStep3Title: "3. Structural Inspection & Planning",
    processStep3Sub: "Precision Engineering Evaluation",
    processStep3Desc: "Under Shaan's engineering leadership, we perform assessments, map moisture deep in drywall, check foundation leveling, and issue a clear roadmap.",
    processStep4Title: "4. Legacy-Grade Rebuilding",
    processStep4Sub: "Structural Reconstruction & Master Tiling",
    processStep4Desc: "Our craftsmen rebuild framing, install flawless drywall and trim, replace roofing, run professional plumbing, and complete luxury custom remodeling.",
    processStep5Title: "5. Handover & Direct Insurance Billing",
    processStep5Sub: "Final Structural Sign-Off",
    processStep5Desc: "We perform rigorous quality control checks and coordinate directly with your homeowners' insurance provider to handle documentation and billing.",

    // Service Areas
    areasTitle: "Our Service Areas",
    areasSubtitle: "We proudly serve Leander and surrounding North Austin communities with 24/7 emergency response.",
    areaHq: "HQ / Central Hub",
    areaDispatch: "Immediate Dispatch",
    areaNorth: "Northern Service Loop",
    areaEast: "Eastern Service Loop",
    areaRapid: "Rapid Emergency Response",
    areaMetro: "Metro Coverage",

    // Testimonials
    testTitle: "Trusted by Leander Families",
    testSubtitle: "Hear from homeowners and business clients who trust us for structural integrity and rapid restoration.",
    test1Text: "Shaan's team saved our home when our water heater ruptured. They were here in 40 minutes, extracted all the water, and handled the rebuild beautifully. Flawless drywall and matching baseboards!",
    test2Text: "We hired Solid State for a commercial concrete slab expansion. Excellent coordination, highly reinforced rebar layout, and professional finishing. Absolute structural perfection.",
    test3Text: "Super responsive customer service. They worked directly with my insurance adjuster for a storm damage roof replacement, making the whole process stress-free.",

    // FAQ Section
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Common questions about our emergency restoration, remodeling, insurance claims, and warranties.",
    faq1Q: "Do you accept homeowners' insurance for water damage claims?",
    faq1A: "Yes, we work directly with all major insurance providers. We document the water damage thoroughly with moisture readings, infrared scanning, and photo records. We can coordinate direct insurance billing to streamline the claims process and reduce your out-of-pocket costs.",
    faq2Q: "What is your emergency response time in Leander and North Austin?",
    faq2A: "For emergency services like water remediation, pipe bursts, and storm-damage tarping, our team is dispatched immediately. We aim to be on-site within 1 hour for locations in Leander, Cedar Park, Liberty Hill, Georgetown, Round Rock and the north of Austin.",
    faq3Q: "Are your foundation repair and concrete slabs warrantied?",
    faq3A: "Absolutely. All of our concrete slab installations and foundation leveling repairs come with a comprehensive structural warranty. Under Shaan's engineering leadership, we utilize soil-adapted designs and premium rebar reinforcement to ensure lifetime durability on Texas clay soil.",
    faq4Q: "Are you licensed and certified for restoration work?",
    faq4A: "Yes, Solid State Construction is fully licensed, insured, and bonded. Our technicians are trained in accordance with IICRC standards for water mitigation, sewage cleanup, structural drying, and safety protocols.",
    faq5Q: "Can you help with full reconstruction after water mitigation is finished?",
    faq5A: "Yes! That is what makes us unique. Unlike mitigation-only companies that leave you with stripped-out walls and floors, we are general contractors. Once your home is fully dry and sanitized, our remodeling team steps in to replace drywall, framing, painting, custom cabinetry, and premium tiling.",

    // Contact
    contactTitle: "Get a Free Estimate",
    contactSubtitle: "Ready to start your project? Fill out the form below and our team will get back to you within 24 hours.",
    formName: "Full Name",
    formPhone: "Phone Number",
    formEmail: "Email Address",
    formAddress: "Project Address",
    formService: "Service Needed",
    formMsg: "Message",
    formMsgPlaceholder: "Tell us about your project or emergency...",
    formSubmit: "Submit Request",
    formSending: "Sending...",
    formSuccessTitle: "Thank You!",
    formSuccessMsg: "Your request has been sent. Our team will contact you shortly.",
    formSuccessBtn: "Send Another Request",
    formError: "Something went wrong. Please call us directly.",
    schedSeparator: "OR",
    schedCtaText: "Prefer to pick your own time? Skip the form and book a walkthrough instantly.",
    schedCtaBtn: "Book Walkthrough Inspection",

    // Map Section & Footer
    mapTitle: "Serving Leander & Surrounding Communities",
    footRights: "All rights reserved.",
    footTagline: "Legacy-grade general contracting, structural foundations, and emergency restoration services.",

    // Quote Modal
    quoteTitle: "Instant Quote",
    quoteSub: "Professional Estimation Tool",
    quoteConcreteDesc: "We calculate based on Cubic Yardage (Length x Width x Thickness / 27) plus Rebar & Finishing labor.",
    quotePlumbingDesc: "We calculate based on Materials (pipes, valves, fixtures), Labor (hourly rate), Overhead, and Profit.",
    quoteExcavationDesc: "We calculate based on linear footage, excavation type (Trenching vs. Tunneling), and depth requirements.",
    quoteLength: "Length",
    quoteWidth: "Width",
    quoteLinearLength: "Linear Length",
    quoteThickness: "Thickness (Inches)",
    quoteExcType: "Excavation Type",
    quoteTrenchDepth: "Trench Depth",
    quoteMaterialsCost: "Materials Cost ($)",
    quoteLaborHours: "Labor Hours",
    quoteOverhead: "Overhead (20%)",
    quoteTotalVolume: "Total Volume",
    quoteLinearFootage: "Linear Footage",
    quoteFinalEstimate: "Final Estimated Project Budget",
    quoteBtnGetDetailed: "Get Detailed Quote",
    quoteBtnNext: "Proceed",
    quoteBtnPrint: "Print / PDF",
    quoteSuccessTitle: "Details Saved!",
    quoteSuccessDesc: "We will contact you within 24 hours.",
    quoteSummaryTitle: "Official Project Estimate Summary",
    quoteSummaryDesc: "This preliminary estimate is based on regional averages. A final binding quote will be issued following a comprehensive evaluation.",
    quoteBtnBack: "Back",
    quoteBtnSubmit: "Submit Request",
    quoteBtnReturn: "Return Home",

    // Gallery Page
    galPageTitle: "Our Project Gallery",
    galPageSub: "Explore our legacy-grade craftsmanship across Leander and North Austin—from emergency restoration to luxury custom remodeling.",
    galSliderTitle: "Interactive Before & After Showcase",
    galSliderSub: "Drag the slider handle to see the transition from water damage to structural perfection.",
    galBeforeLabel: "Before: Wet Wall & Exposed Studs",
    galAfterLabel: "After: Restored Drywall & Paint"
  },
  es: {
    // Navbar
    navAbout: "Nosotros",
    navServices: "Servicios",
    navGallery: "Galería",
    navContact: "Contacto",
    navQuoteBtn: "Presupuesto Gratis",
    navPhone: "(512) 595-2332",

    // Hero
    heroBadge: "Servicio de Restauración de Agua 24/7",
    heroTitle: "Solid State Construction",
    heroSubtitle: "La elección de Leander para remodelación de calidad, reparación de cimientos y servicios de emergencia",
    heroCallCta: "Llamar ahora: (512) 595-2332",
    heroQuoteCta: "Obtenga un presupuesto en línea",

    // About
    aboutTitle: "Sobre Solid State Construction",
    aboutSubtitle: "Quiénes somos y qué hacemos",
    aboutP1: "Solid State Construction es el socio principal de Leander para la restauración y mejora integral del hogar. Nos especializamos en una amplia gama de servicios esenciales diseñados para mantener su hogar seguro, hermoso y estructuralmente sólido.",
    aboutCoreTitle: "Nuestra experiencia principal:",
    aboutCoreItem1: "Paneles de Yeso y Pintura: Acabados impecables y pintura profesional para interiores/exteriores.",
    aboutCoreItem2: "Remodelación Completa: Transformaciones completas de cocina, baño y hogar.",
    aboutCoreItem3: "Techos: Reparaciones expertas y reemplazos completos para una protección duradera.",
    aboutCoreItem4: "Cimientos: Reparaciones estructurales críticas y nivelación para el suelo de Texas.",
    aboutCoreItem5: "Mitigación de Agua: Respuesta de emergencia las 24 horas, los 7 días de la semana para secar y restaurar su hogar.",
    aboutCoreItem6: "Pisos y Azulejos: Instalaciones personalizadas que incluyen madera dura, laminados y trabajos complejos de azulejos.",
    aboutLocation: "Ubicados en 1101 Halsey Drive, nos enorgullecemos de ser una empresa local que comprende las necesidades de construcción únicas de nuestros vecinos de Leander y el norte de Austin.",
    aboutStat1Num: "100%",
    aboutStat1Lbl: "Enfoque Local",
    aboutStat2Num: "24/7",
    aboutStat2Lbl: "Soporte de Emergencia",
    aboutStat3Num: "Calidad",
    aboutStat3Lbl: "Garantizada",
    aboutFounderTitle: "Conozca a nuestro fundador, Shaan",
    aboutFounderQuote: "Solid State Construction se fundó con una única misión: proporcionar a las familias de Austin una contratación premium de grado de legado en la que puedan confiar incondicionalmente. Bajo el liderazgo de Shaan, brindamos una perfección absoluta de ingeniería en cada proyecto, lo que garantiza la integridad estructural y una artesanía de clase maestra en cada trabajo.",
    aboutFounderSignature: "— Shaan, Fundador e Ingeniero Jefe",

    // Services General
    servicesTitle: "Nuestros Servicios Especializados",
    servicesSubtitle: "Seleccione entre nuestras soluciones residenciales y comerciales para una artesanía personalizada de grado de legado.",
    servicesTabRes: "Servicios Residenciales",
    servicesTabComm: "Servicios Comerciales",
    servicesInquireBtn: "Preguntar ahora",

    // Services - Residential
    resWaterTitle: "Mitigación de Agua Residencial",
    resWaterDesc: "Respuesta rápida para fugas residenciales, roturas de tuberías e inundaciones. Secamos, desinfectamos y restauramos su hogar para su seguridad.",
    resPlumbingTitle: "Servicios de Plomería del Hogar",
    resPlumbingDesc: "Detección profesional de fugas, accesorios personalizados, reemplazo de tuberías en toda la casa y plomería residencial de emergencia.",
    resRoofingTitle: "Techos Residenciales",
    resRoofingDesc: "Reparación experta de techos, colocación de lonas por daños de tormentas y reemplazos completos de techos residenciales.",
    resConcreteTitle: "Caminos y Patios",
    resConcreteDesc: "Instalaciones de concreto personalizadas que incluyen patios, caminos, aceras y nivelación de cimientos residenciales.",

    // Services - Commercial
    commWaterTitle: "Restauración de Agua Comercial",
    commWaterDesc: "Secado, desinfección y extracción de humedad a gran escala para oficinas, locales comerciales y almacenes. Pérdida mínima de tiempo garantizada.",
    commConcreteTitle: "Concreto y Cimientos Comerciales",
    commConcreteDesc: "Vertido de losas de alta resistencia, refuerzo de cimientos comerciales, ingeniería de sitio y reparación de concreto estructural.",
    commRoofingTitle: "Techos Comerciales",
    commRoofingDesc: "Revestimientos para techos planos, reemplazo de techos TPO premium, techos metálicos comerciales y mantenimiento preventivo de techos industriales.",
    commExcavationTitle: "Preparación de Sitio y Excavación Pesada",
    commExcavationDesc: "Nivelación industrial, movimiento de tierras civil, preparación de drenaje de sitio, zanjas y excavación de cimientos comerciales.",

    // Process Timeline
    processTitle: "Nuestro Proceso de Restauración Profesional",
    processSubtitle: "Cómo devolvemos su hogar a una integridad estructural impecable, desde la llamada de emergencia hasta la entrega final.",
    processStep1Title: "1. Despacho 24/7 y Respuesta Rápida",
    processStep1Sub: "Llamada de Emergencia en Leander y el Área Metropolitana de Austin",
    processStep1Desc: "Cuando ocurre un desastre o se necesita una reparación de emergencia, nuestros técnicos están en el lugar en menos de 1 hora. Estabilizamos de inmediato las condiciones de seguridad.",
    processStep2Title: "2. Contención Inmediata de Daños",
    processStep2Sub: "Mitigar Pérdidas y Prevenir Daños Secundarios",
    processStep2Desc: "Realizamos una extracción rápida de agua, instalamos deshumidificadores de aire comerciales y aplicamos tablas temporales o lonas en el techo para asegurar la estructura.",
    processStep3Title: "3. Inspección Estructural y Planificación",
    processStep3Sub: "Evaluación de Ingeniería de Precisión",
    processStep3Desc: "Bajo el liderazgo de ingeniería de Shaan, realizamos evaluaciones, mapeamos la humedad en las paredes, verificamos la nivelación de cimientos y emitimos una hoja de ruta clara.",
    processStep4Title: "4. Reconstrucción de Grado de Legado",
    processStep4Sub: "Reconstrucción Estructural y Colocación de Azulejos",
    processStep4Desc: "Nuestros artesanos reconstruyen estructuras, instalan paneles de yeso y molduras impecables, reemplazan techos, realizan plomería profesional y completan remodelaciones personalizadas de lujo.",
    processStep5Title: "5. Entrega y Facturación Directa al Seguro",
    processStep5Sub: "Aprobación Estructural Final",
    processStep5Desc: "Realizamos rigurosos controles de calidad y coordinamos directamente con su proveedor de seguros para manejar la documentación y la facturación.",

    // Service Areas
    areasTitle: "Nuestras Áreas de Servicio",
    areasSubtitle: "Orgullosamente servimos a Leander y a las comunidades vecinas del norte de Austin con respuesta de emergencia las 24 horas, los 7 días de la semana.",
    areaHq: "Sede / Centro Principal",
    areaDispatch: "Despacho Inmediato",
    areaNorth: "Bucle de Servicio del Norte",
    areaEast: "Bucle de Servicio del Este",
    areaRapid: "Respuesta de Emergencia Rápida",
    areaMetro: "Cobertura Metropolitana",

    // Testimonials
    testTitle: "Confianza de las Familias de Leander",
    testSubtitle: "Escuche a los propietarios de viviendas y clientes comerciales que confían en nosotros para la integridad estructural y restauración rápida.",
    test1Text: "El equipo de Shaan salvó nuestra casa cuando se rompió nuestro calentador de agua. Llegaron en 40 minutos, extrajeron toda el agua y manejaron la reconstrucción de manera hermosa. ¡Paneles de yeso impecables y rodapiés perfectos!",
    test2Text: "We hired Solid State for a commercial concrete slab expansion. Excellent coordination, highly reinforced rebar layout, and professional finishing. Absolute structural perfection.",
    test3Text: "Super responsive customer service. They worked directly with my insurance adjuster for a storm damage roof replacement, making the whole process stress-free.",

    // FAQ Section
    faqTitle: "Preguntas Frecuentes",
    faqSubtitle: "Preguntas comunes sobre nuestra restauración de emergencia, remodelación, reclamos de seguros y garantías.",
    faq1Q: "¿Aceptan seguros de hogar para reclamos de daños por agua?",
    faq1A: "Sí, trabajamos directamente con todos los principales proveedores de seguros. Documentamos los daños por agua a fondo con lecturas de humedad, escaneo infrarrojo y registros fotográficos. Podemos coordinar la facturación directa al seguro para agilizar el proceso de reclamo y reducir sus costos de bolsillo.",
    faq2Q: "¿Cuál es su tiempo de respuesta de emergencia en Leander y el norte de Austin?",
    faq2A: "Para servicios de emergencia como mitigación de agua, rotura de tuberías y colocación de lonas en techos por tormentas, nuestro equipo se despacha de inmediato. Nuestro objetivo es estar en el sitio dentro de 1 hora para ubicaciones en Leander, Cedar Park, Liberty Hill, Georgetown, Round Rock y el norte de Austin.",
    faq3Q: "¿Tienen garantía sus reparaciones de cimientos y losas de concreto?",
    faq3A: "Absolutamente. Todas nuestras instalaciones de losas de concreto y reparaciones de nivelación de cimientos vienen con una garantía estructural integral. Bajo el liderazgo de ingeniería de Shaan, utilizamos diseños adaptados al suelo y refuerzo de armaduras de primera calidad para garantizar una durabilidad de por vida en el suelo arcilloso de Texas.",
    faq4Q: "¿Están autorizados y certificados para trabajos de restauración?",
    faq4A: "Sí, Solid State Construction está completamente licenciada, asegurada y consolidada. Nuestros técnicos están capacitados de acuerdo con las normas IICRC para mitigación de agua, limpieza de aguas residuales, secado estructural y protocolos de seguridad.",
    faq5Q: "¿Pueden ayudar con la reconstrucción completa después de terminar la mitigación del agua?",
    faq5A: "¡Sí! Eso es lo que nos hace únicos. A diferencia de las empresas que solo mitigan y dejan las paredes y pisos desmantelados, nosotros somos contratistas generales. Una vez que su hogar está completamente seco y desinfectado, nuestro equipo de remodelación interviene para reemplazar paneles de yeso, estructuras, pintura, gabinetes personalizados y azulejos premium.",

    // Contact
    contactTitle: "Obtenga un Presupuesto Gratis",
    contactSubtitle: "¿Listo para comenzar su proyecto? Complete el formulario a continuación y nuestro equipo se comunicará con usted dentro de las 24 horas.",
    formName: "Nombre Completo",
    formPhone: "Número de Teléfono",
    formEmail: "Correo Electrónico",
    formAddress: "Dirección del Proyecto",
    formService: "Servicio Necesario",
    formMsg: "Mensaje",
    formMsgPlaceholder: "Cuéntenos sobre su proyecto o emergencia...",
    formSubmit: "Enviar Solicitud",
    formSending: "Enviando...",
    formSuccessTitle: "¡Gracias!",
    formSuccessMsg: "Su solicitud ha sido enviada. Nuestro equipo se pondrá en contacto con usted en breve.",
    formSuccessBtn: "Enviar Otra Solicitud",
    formError: "Algo salió mal. Por favor llámenos directamente.",
    schedSeparator: "O",
    schedCtaText: "¿Prefiere elegir su propia hora? Omita el formulario y reserve una inspección al instante.",
    schedCtaBtn: "Reservar Inspección Técnica",

    // Map Section & Footer
    mapTitle: "Sirviendo a Leander y comunidades circundantes",
    footRights: "Todos los derechos reservados.",
    footTagline: "Servicios de contratación general, cimientos estructurales y restauración de emergencia de grado de legado.",

    // Quote Modal
    quoteTitle: "Presupuesto Instantáneo",
    quoteSub: "Herramienta de Estimación Profesional",
    quoteConcreteDesc: "Calculamos según la cantidad de yardas cúbicas (Largo x Ancho x Espesor / 27) más la mano de obra de armadura y acabado.",
    quotePlumbingDesc: "Calculamos en base a Materiales (tuberías, válvulas, accesorios), Mano de obra (tarifa por hora), Gastos generales y Ganancias.",
    quoteExcavationDesc: "Calculamos según los pies lineales, el tipo de excavación (Zanjas vs. Túneles) y los requisitos de profundidad.",
    quoteLength: "Largo",
    quoteWidth: "Ancho",
    quoteLinearLength: "Longitud Lineal",
    quoteThickness: "Espesor (Pulgadas)",
    quoteExcType: "Tipo de Excavación",
    quoteTrenchDepth: "Profundidad de Zanja",
    quoteMaterialsCost: "Costo de Materiales ($)",
    quoteLaborHours: "Horas de Mano de Obra",
    quoteOverhead: "Gastos Generales (20%)",
    quoteTotalVolume: "Volumen Total",
    quoteLinearFootage: "Pies Lineales",
    quoteFinalEstimate: "Presupuesto Estimado Final del Proyecto",
    quoteBtnGetDetailed: "Obtener Presupuesto Detallado",
    quoteBtnNext: "Proceder",
    quoteBtnPrint: "Imprimir / PDF",
    quoteSuccessTitle: "¡Detalles Guardados!",
    quoteSuccessDesc: "Nos pondremos en contacto con usted dentro de las 24 horas.",
    quoteSummaryTitle: "Resumen Oficial del Presupuesto del Proyecto",
    quoteSummaryDesc: "Esta estimación preliminar se basa en promedios regionales. Se emitirá un presupuesto vinculante final después de una evaluación exhaustiva.",
    quoteBtnBack: "Atrás",
    quoteBtnSubmit: "Enviar Solicitud",
    quoteBtnReturn: "Volver al Inicio",

    // Gallery Page
    galPageTitle: "Nuestra Galería de Proyectos",
    galPageSub: "Explore nuestra artesanía de grado legado en Leander y el norte de Austin, desde restauración de emergencia hasta remodelaciones personalizadas de lujo.",
    galSliderTitle: "Presentación Interactiva de Antes y Después",
    galSliderSub: "Arrastre el controlador para ver la transición desde el daño por agua hasta la perfección estructural.",
    galBeforeLabel: "Antes: Pared Húmeda y Vigas Expuestas",
    galAfterLabel: "Después: Panel de Yeso y Pintura Restaurados"
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'es' : 'en';
    setLanguage(nextLang);
    localStorage.setItem('language', nextLang);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
