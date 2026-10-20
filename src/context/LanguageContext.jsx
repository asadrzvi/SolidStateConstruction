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
    heroTitle: "Plumbing, Foundation Repair & Concrete in Leander, TX",
    heroSubtitle: "Solid State Construction. 24/7 emergency service across Leander, Austin, Cedar Park and Georgetown.",
    heroCallCta: "Call Now: (512) 595-2332",
    heroQuoteCta: "Get a Quote Online",
    heroVideoBadge: "Job Site Footage • Leander TX",

    // Split logo section
    splitEyebrow: "Leander, TX Contractor",
    splitCaption: "Concrete, plumbing, foundations and restoration for Leander and Greater Austin.",

    // About
    aboutTitle: "About Solid State Construction",
    aboutSubtitle: "Who We Are & What We Do",
    aboutP1: "Solid State Construction is a Leander general contractor for home restoration and improvement. We handle the work that keeps a house safe, dry and structurally sound.",
    aboutCoreTitle: "What We Do:",
    aboutCoreItem1: "Drywall & Paint: clean finishing and interior/exterior painting.",
    aboutCoreItem2: "Full Remodeling: kitchens, bathrooms and whole-home remodels.",
    aboutCoreItem3: "Roofing: repairs and full replacements.",
    aboutCoreItem4: "Foundation: structural repairs and leveling for Texas soil.",
    aboutCoreItem5: "Water Remediation: 24/7 emergency response to dry out and restore your home.",
    aboutCoreItem6: "Flooring & Tile: hardwood, laminate and custom tile work.",
    aboutLocation: "We're based at 1101 Halsey Drive in Leander. We're a local business, and we know what homes in Leander and North Austin need.",
    aboutStat1Num: "100%",
    aboutStat1Lbl: "Local Focus",
    aboutStat2Num: "24/7",
    aboutStat2Lbl: "Emergency Support",
    aboutStat3Num: "Quality",
    aboutStat3Lbl: "Guaranteed",
    aboutFounderTitle: "Meet Our Founder, Shaan",
    aboutFounderQuote: "I started Solid State Construction with one goal: to give Austin-area families a contractor they can trust. We take care on every project, from the structure underneath to the finish work you see.",
    aboutFounderSignature: "Shaan, Founder & Lead Contractor",

    // Services General
    servicesTitle: "Our Services",
    servicesSubtitle: "Residential and commercial work. Pick a category to see what we do.",
    servicesTabRes: "Residential Services",
    servicesTabComm: "Commercial Services",
    servicesInquireBtn: "Inquire Now",

    // Services - Residential
    resWaterTitle: "Residential Water Mitigation",
    resWaterDesc: "Fast response for leaks, burst pipes and flooding. We extract the water, dry the structure, sanitize and restore your home.",
    resPlumbingTitle: "24/7 Emergency Plumbing & Drain",
    resPlumbingDesc: "Same-day plumbing repair, electronic leak detection, slab leak repair, hydro-jetting drain cleaning, tankless water heaters and whole-house repiping.",
    resRoofingTitle: "Residential Roofing",
    resRoofingDesc: "Roof repairs, storm-damage tarping and full residential roof replacements.",
    resConcreteTitle: "Driveways & Patios",
    resConcreteDesc: "Concrete patios, driveways, sidewalks and residential foundation leveling.",

    // Services - Commercial
    commWaterTitle: "Commercial Water Restoration",
    commWaterDesc: "Large-scale drying, sanitization and moisture extraction for offices, retail and warehouses, with as little downtime as possible.",
    commConcreteTitle: "Commercial Concrete & Foundations",
    commConcreteDesc: "Slab pours, commercial foundation reinforcement, site preparation and structural concrete repair.",
    commRoofingTitle: "Commercial Roofing",
    commRoofingDesc: "Flat roof coatings, TPO replacement, commercial metal roofing and preventative roof maintenance.",
    commExcavationTitle: "Site Prep & Heavy Excavation",
    commExcavationDesc: "Grading, earthmoving, site drainage prep, trenching and commercial foundation excavation.",

    // Process Timeline
    processTitle: "Our Restoration Process",
    processSubtitle: "How we take a job from the emergency call to final handover.",
    processStep1Title: "1. 24/7 Dispatch & Response",
    processStep1Sub: "Emergency Callout in Leander & Austin Metro",
    processStep1Desc: "When something breaks, we send a technician out fast, stabilize the situation and make the area safe.",
    processStep2Title: "2. Damage Containment",
    processStep2Sub: "Stop the Loss & Prevent Secondary Damage",
    processStep2Desc: "We extract the water, set up commercial dehumidifiers and air movers, and board up or tarp anything open to the weather.",
    processStep3Title: "3. Inspection & Planning",
    processStep3Sub: "Structural Evaluation",
    processStep3Desc: "We assess the damage, map moisture in the drywall, check foundation leveling and give you a clear repair plan.",
    processStep4Title: "4. Rebuild & Finish Work",
    processStep4Sub: "Framing, Drywall, Roofing & Tile",
    processStep4Desc: "Our crew rebuilds framing, hangs and finishes drywall and trim, replaces roofing, runs the plumbing and completes any remodel work.",
    processStep5Title: "5. Handover & Insurance Billing",
    processStep5Sub: "Final Walkthrough & Sign-Off",
    processStep5Desc: "We do a final quality check with you and coordinate directly with your homeowners' insurance on documentation and billing.",
    processFlipHint: "Flip for details",
    processBack1Title: "What to Expect",
    processBack1Spec1: "Fast on-site arrival for emergencies",
    processBack1Spec2: "Direct line to Shaan",
    processBack1Spec3: "Immediate safety and water containment",
    processBack1Cta: "Call Dispatch Now",
    processBack2Title: "Containment Equipment",
    processBack2Spec1: "Commercial water extraction",
    processBack2Spec2: "Air scrubbing and dehumidification",
    processBack2Spec3: "Temporary roof tarping and board-up",
    processBack2Cta: "Get Emergency Help",
    processBack3Title: "Inspection Tools",
    processBack3Spec1: "Laser-level foundation mapping",
    processBack3Spec2: "Thermal (FLIR) moisture scanning",
    processBack3Spec3: "Documentation for your insurance adjuster",
    processBack3Cta: "Request Inspection",
    processBack4Title: "Materials & Methods",
    processBack4Spec1: "Reinforced rebar and concrete",
    processBack4Spec2: "Carpentry and drywall finishing",
    processBack4Spec3: "Steel pier installation",
    processBack4Cta: "Start a Project",
    processBack5Title: "At Handover",
    processBack5Spec1: "Full site cleanup",
    processBack5Spec2: "Structural warranty documentation",
    processBack5Spec3: "Final walkthrough sign-off",
    processBack5Cta: "Start Your Project",

    // Service Areas
    areasTitle: "Our Service Areas",
    areasSubtitle: "We serve Leander and the surrounding North Austin communities, with 24/7 emergency response.",
    areaHq: "Headquarters",
    areaDispatch: "Service Area",
    areaNorth: "Service Area",
    areaEast: "Service Area",
    areaRapid: "Service Area",
    areaMetro: "Service Area",

    // Testimonials
    testTitle: "Trusted by Leander Families",
    testSubtitle: "Hear from homeowners and business clients who trust us for structural integrity and rapid restoration.",
    test1Text: "Shaan's team saved our home when our water heater ruptured. They were here in 40 minutes, extracted all the water, and handled the rebuild beautifully. Flawless drywall and matching baseboards!",
    test2Text: "We hired Solid State for a commercial concrete slab expansion. Excellent coordination, highly reinforced rebar layout, and professional finishing. Absolute structural perfection.",
    test3Text: "Super responsive customer service. They worked directly with my insurance adjuster for a storm damage roof replacement, making the whole process stress-free.",

    // FAQ Section
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Common questions about emergency restoration, remodeling, insurance claims and warranties.",
    faq1Q: "Do you accept homeowners' insurance for water damage claims?",
    faq1A: "Yes. We work with major insurance providers, document the damage with moisture readings, infrared scans and photos, and can bill your insurer directly to keep your out-of-pocket costs down.",
    faq2Q: "What is your emergency response time in Leander and North Austin?",
    faq2A: "For emergencies like water damage, burst pipes and storm tarping, we dispatch right away. We aim to be on-site within 1 hour in Leander, Cedar Park, Liberty Hill, Georgetown, Round Rock and North Austin.",
    faq3Q: "Are your foundation repair and concrete slabs warrantied?",
    faq3A: "Yes. Our concrete slab installations and foundation leveling repairs come with a structural warranty. We use soil-adapted designs and rebar reinforcement built for Texas clay soil.",
    faq4Q: "Are you licensed and certified for restoration work?",
    faq4A: "Yes. Solid State Construction is licensed, insured and bonded, and our technicians are trained to IICRC standards for water mitigation, sewage cleanup and structural drying.",
    faq5Q: "Can you help with full reconstruction after water mitigation is finished?",
    faq5A: "Yes, and that is the point of hiring a general contractor. Mitigation-only companies leave you with stripped walls and floors. Once your home is dry and sanitized, our crew replaces the drywall, framing, paint, cabinetry and tile.",

    // Contact
    contactTitle: "Get a Free Estimate",
    contactSubtitle: "Fill out the form and we'll get back to you within 24 hours.",
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
    schedCtaText: "Prefer to pick a time? Skip the form and book a walkthrough.",
    schedCtaBtn: "Book a Walkthrough",

    // Map Section & Footer
    mapTitle: "Serving Leander & Surrounding Communities",
    mapSubtitle: "Based in Leander, we serve Cedar Park and the North Austin area.",
    mapLocationLabel: "Location:",
    mapViewBtn: "View on Google Maps",
    footRights: "All rights reserved.",
    footTagline: "General contracting, foundations, concrete and emergency restoration in Leander, TX.",
    footContactTitle: "Contact Us",
    footGalleryLink: "Project Gallery",
    footPrivacyLink: "Privacy Policy",

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
    galHeroBadge: "Real Job Site Photos & Video • Leander & Austin TX",
    galPageTitle: "Our Project Gallery",
    galPageSub: "Photos and video from our jobs across Leander and North Austin, from emergency restoration to custom remodels.",
    galSliderTitle: "Before & After",
    galSliderSub: "Drag the slider handle to see the same yard go from stripped and graded to a finished lawn.",
    galBeforeLabel: "Before: Yard Stripped & Graded",
    galAfterLabel: "After: Full Sod Install",
    galGridTitle: "Job Site Showcase",
    galGridSub: "Photos and videos from recent residential and commercial jobs.",
    galPlayVideo: "Play Video",
    galViewImage: "View Image"
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
    heroTitle: "Plomería, Reparación de Cimientos y Concreto en Leander, TX",
    heroSubtitle: "Solid State Construction. Servicio de emergencia 24/7 en Leander, Austin, Cedar Park y Georgetown.",
    heroCallCta: "Llamar ahora: (512) 595-2332",
    heroQuoteCta: "Obtenga un presupuesto en línea",
    heroVideoBadge: "Video de Obra • Leander TX",

    // Split logo section
    splitEyebrow: "Contratista en Leander, TX",
    splitCaption: "Concreto, plomería, cimientos y restauración para Leander y el área de Austin.",

    // About
    aboutTitle: "Sobre Solid State Construction",
    aboutSubtitle: "Quiénes somos y qué hacemos",
    aboutP1: "Solid State Construction es un contratista general de Leander dedicado a la restauración y mejora del hogar. Hacemos el trabajo que mantiene una casa segura, seca y estructuralmente sólida.",
    aboutCoreTitle: "Qué hacemos:",
    aboutCoreItem1: "Paneles de Yeso y Pintura: acabados limpios y pintura de interiores y exteriores.",
    aboutCoreItem2: "Remodelación Completa: cocinas, baños y remodelaciones de toda la casa.",
    aboutCoreItem3: "Techos: reparaciones y reemplazos completos.",
    aboutCoreItem4: "Cimientos: reparaciones estructurales y nivelación para el suelo de Texas.",
    aboutCoreItem5: "Mitigación de Agua: respuesta de emergencia 24/7 para secar y restaurar su hogar.",
    aboutCoreItem6: "Pisos y Azulejos: madera dura, laminados y trabajo de azulejo a medida.",
    aboutLocation: "Estamos en 1101 Halsey Drive, en Leander. Somos una empresa local y conocemos lo que necesitan las casas de Leander y el norte de Austin.",
    aboutStat1Num: "100%",
    aboutStat1Lbl: "Enfoque Local",
    aboutStat2Num: "24/7",
    aboutStat2Lbl: "Soporte de Emergencia",
    aboutStat3Num: "Calidad",
    aboutStat3Lbl: "Garantizada",
    aboutFounderTitle: "Conozca a nuestro fundador, Shaan",
    aboutFounderQuote: "Fundé Solid State Construction con un objetivo: darles a las familias del área de Austin un contratista en el que puedan confiar. Cuidamos cada proyecto, desde la estructura que no se ve hasta el acabado que sí se ve.",
    aboutFounderSignature: "Shaan, Fundador y Contratista Principal",

    // Services General
    servicesTitle: "Nuestros Servicios",
    servicesSubtitle: "Trabajo residencial y comercial. Elija una categoría para ver lo que hacemos.",
    servicesTabRes: "Servicios Residenciales",
    servicesTabComm: "Servicios Comerciales",
    servicesInquireBtn: "Preguntar ahora",

    // Services - Residential
    resWaterTitle: "Mitigación de Agua Residencial",
    resWaterDesc: "Respuesta rápida para fugas, roturas de tuberías e inundaciones. Extraemos el agua, secamos la estructura, desinfectamos y restauramos su hogar.",
    resPlumbingTitle: "Plomería de Emergencia 24/7 y Drenaje",
    resPlumbingDesc: "Reparación de plomería el mismo día, detección electrónica de fugas, reparación de fugas en losas, limpieza de drenajes con hidro-jetting, calentadores de agua sin tanque y repipeado de casas.",
    resRoofingTitle: "Techos Residenciales",
    resRoofingDesc: "Reparación de techos, colocación de lonas por daños de tormenta y reemplazos completos de techos residenciales.",
    resConcreteTitle: "Caminos y Patios",
    resConcreteDesc: "Patios, caminos de entrada y aceras de concreto, y nivelación de cimientos residenciales.",

    // Services - Commercial
    commWaterTitle: "Restauración de Agua Comercial",
    commWaterDesc: "Secado, desinfección y extracción de humedad a gran escala para oficinas, locales comerciales y almacenes, con la menor interrupción posible.",
    commConcreteTitle: "Concreto y Cimientos Comerciales",
    commConcreteDesc: "Vaciado de losas, refuerzo de cimientos comerciales, preparación de sitio y reparación de concreto estructural.",
    commRoofingTitle: "Techos Comerciales",
    commRoofingDesc: "Recubrimientos para techos planos, reemplazo de TPO, techos metálicos comerciales y mantenimiento preventivo.",
    commExcavationTitle: "Preparación de Sitio y Excavación Pesada",
    commExcavationDesc: "Nivelación, movimiento de tierras, preparación de drenaje, zanjas y excavación de cimientos comerciales.",

    // Process Timeline
    processTitle: "Nuestro Proceso de Restauración",
    processSubtitle: "Cómo llevamos un trabajo desde la llamada de emergencia hasta la entrega final.",
    processStep1Title: "1. Despacho 24/7 y Respuesta",
    processStep1Sub: "Llamada de Emergencia en Leander y el Área de Austin",
    processStep1Desc: "Cuando algo falla, enviamos un técnico rápido, estabilizamos la situación y aseguramos el área.",
    processStep2Title: "2. Contención de Daños",
    processStep2Sub: "Detener la Pérdida y Prevenir Daños Secundarios",
    processStep2Desc: "Extraemos el agua, instalamos deshumidificadores comerciales y ventiladores, y tapamos con tablas o lonas lo que quede expuesto a la intemperie.",
    processStep3Title: "3. Inspección y Planificación",
    processStep3Sub: "Evaluación Estructural",
    processStep3Desc: "Evaluamos el daño, mapeamos la humedad en las paredes, revisamos la nivelación de cimientos y le damos un plan de reparación claro.",
    processStep4Title: "4. Reconstrucción y Acabados",
    processStep4Sub: "Estructura, Paneles de Yeso, Techo y Azulejo",
    processStep4Desc: "Nuestro equipo reconstruye la estructura, instala y termina paneles de yeso y molduras, reemplaza el techo, hace la plomería y completa cualquier remodelación.",
    processStep5Title: "5. Entrega y Facturación al Seguro",
    processStep5Sub: "Recorrido Final y Aprobación",
    processStep5Desc: "Hacemos una revisión final de calidad con usted y coordinamos directamente con su seguro de hogar la documentación y la facturación.",
    processFlipHint: "Voltear para ver detalles",
    processBack1Title: "Qué Esperar",
    processBack1Spec1: "Llegada rápida en emergencias",
    processBack1Spec2: "Línea directa con Shaan",
    processBack1Spec3: "Seguridad y contención de agua inmediatas",
    processBack1Cta: "Llamar a Despacho",
    processBack2Title: "Equipo de Contención",
    processBack2Spec1: "Extracción comercial de agua",
    processBack2Spec2: "Purificación de aire y deshumidificación",
    processBack2Spec3: "Lonas en el techo y tablas temporales",
    processBack2Cta: "Ayuda de Emergencia",
    processBack3Title: "Herramientas de Inspección",
    processBack3Spec1: "Mapeo de cimientos con nivel láser",
    processBack3Spec2: "Escaneo térmico (FLIR) de humedad",
    processBack3Spec3: "Documentación para su ajustador de seguros",
    processBack3Cta: "Solicitar Inspección",
    processBack4Title: "Materiales y Métodos",
    processBack4Spec1: "Concreto y armadura reforzados",
    processBack4Spec2: "Carpintería y acabado de paneles de yeso",
    processBack4Spec3: "Instalación de pilares de acero",
    processBack4Cta: "Iniciar un Proyecto",
    processBack5Title: "En la Entrega",
    processBack5Spec1: "Limpieza completa del sitio",
    processBack5Spec2: "Documentación de garantía estructural",
    processBack5Spec3: "Aprobación en el recorrido final",
    processBack5Cta: "Inicie su Proyecto",

    // Service Areas
    areasTitle: "Nuestras Áreas de Servicio",
    areasSubtitle: "Servimos a Leander y a las comunidades vecinas del norte de Austin, con respuesta de emergencia 24/7.",
    areaHq: "Sede Principal",
    areaDispatch: "Área de Servicio",
    areaNorth: "Área de Servicio",
    areaEast: "Área de Servicio",
    areaRapid: "Área de Servicio",
    areaMetro: "Área de Servicio",

    // Testimonials
    testTitle: "Confianza de las Familias de Leander",
    testSubtitle: "Escuche a los propietarios de viviendas y clientes comerciales que confían en nosotros para la integridad estructural y restauración rápida.",
    test1Text: "El equipo de Shaan salvó nuestra casa cuando se rompió nuestro calentador de agua. Llegaron en 40 minutos, extrajeron toda el agua y manejaron la reconstrucción de manera hermosa. ¡Paneles de yeso impecables y rodapiés perfectos!",
    test2Text: "We hired Solid State for a commercial concrete slab expansion. Excellent coordination, highly reinforced rebar layout, and professional finishing. Absolute structural perfection.",
    test3Text: "Super responsive customer service. They worked directly with my insurance adjuster for a storm damage roof replacement, making the whole process stress-free.",

    // FAQ Section
    faqTitle: "Preguntas Frecuentes",
    faqSubtitle: "Preguntas comunes sobre restauración de emergencia, remodelación, reclamos de seguros y garantías.",
    faq1Q: "¿Aceptan seguros de hogar para reclamos de daños por agua?",
    faq1A: "Sí. Trabajamos con las principales aseguradoras, documentamos el daño con lecturas de humedad, escaneo infrarrojo y fotos, y podemos facturar directamente a su seguro para reducir lo que paga de su bolsillo.",
    faq2Q: "¿Cuál es su tiempo de respuesta de emergencia en Leander y el norte de Austin?",
    faq2A: "Para emergencias como daños por agua, roturas de tuberías y lonas por tormenta, despachamos de inmediato. Nuestro objetivo es llegar en menos de 1 hora en Leander, Cedar Park, Liberty Hill, Georgetown, Round Rock y el norte de Austin.",
    faq3Q: "¿Tienen garantía sus reparaciones de cimientos y losas de concreto?",
    faq3A: "Sí. Nuestras instalaciones de losas de concreto y reparaciones de nivelación de cimientos incluyen una garantía estructural. Usamos diseños adaptados al suelo y refuerzo con armadura pensados para el suelo arcilloso de Texas.",
    faq4Q: "¿Están autorizados y certificados para trabajos de restauración?",
    faq4A: "Sí. Solid State Construction cuenta con licencia, seguro y fianza, y nuestros técnicos están capacitados según las normas IICRC para mitigación de agua, limpieza de aguas residuales y secado estructural.",
    faq5Q: "¿Pueden ayudar con la reconstrucción completa después de terminar la mitigación del agua?",
    faq5A: "Sí, y para eso sirve contratar a un contratista general. Las empresas que solo mitigan dejan las paredes y los pisos desmantelados. Una vez que su hogar está seco y desinfectado, nuestro equipo reemplaza los paneles de yeso, la estructura, la pintura, los gabinetes y el azulejo.",

    // Contact
    contactTitle: "Obtenga un Presupuesto Gratis",
    contactSubtitle: "Complete el formulario y nos comunicaremos con usted dentro de las 24 horas.",
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
    schedCtaText: "¿Prefiere elegir la hora? Omita el formulario y reserve una visita.",
    schedCtaBtn: "Reservar una Visita",

    // Map Section & Footer
    mapTitle: "Sirviendo a Leander y comunidades circundantes",
    mapSubtitle: "Con sede en Leander, servimos a Cedar Park y al área del norte de Austin.",
    mapLocationLabel: "Ubicación:",
    mapViewBtn: "Ver en Google Maps",
    footRights: "Todos los derechos reservados.",
    footTagline: "Contratación general, cimientos, concreto y restauración de emergencia en Leander, TX.",
    footContactTitle: "Contáctenos",
    footGalleryLink: "Galería de Proyectos",
    footPrivacyLink: "Política de Privacidad",

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
    galHeroBadge: "Fotos y Video Reales de Obra • Leander y Austin TX",
    galPageTitle: "Nuestra Galería de Proyectos",
    galPageSub: "Fotos y video de nuestros trabajos en Leander y el norte de Austin, desde restauración de emergencia hasta remodelaciones a medida.",
    galSliderTitle: "Antes y Después",
    galSliderSub: "Arrastre el controlador para ver el mismo jardín pasar de terreno nivelado a césped terminado.",
    galBeforeLabel: "Antes: Terreno Nivelado y Preparado",
    galAfterLabel: "Después: Césped Instalado",
    galGridTitle: "Trabajos en Obra",
    galGridSub: "Fotos y videos de trabajos residenciales y comerciales recientes.",
    galPlayVideo: "Ver Video",
    galViewImage: "Ver Imagen"
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'en' || savedLang === 'es') {
      setLanguage(savedLang);
    }
  }, []);

  // Keep <html lang> in step with the visible language so screen readers and
  // search engines read the Spanish copy as Spanish.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

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
