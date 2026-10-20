import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

// Every user-facing string lives here in both languages. Keep the two blocks
// in step: a key added to `en` must be added to `es` in the same change.
const translations = {
  en: {
    // Navbar
    navAbout: "About",
    navServices: "Services",
    navGallery: "Gallery",
    navContact: "Contact",
    navQuoteBtn: "Get a quote",
    navPhone: "(512) 595-2332",
    navMenuOpen: "Open menu",
    navMenuClose: "Close menu",
    navLangSwitch: "Cambiar a Español",
    navCallLabel: "Call us",

    // Hero
    heroEyebrow: "Leander, TX · General contractor",
    heroTitle: "Plumbing, foundation repair and concrete in Leander, TX.",
    heroSubtitle: "One crew for the jobs that keep a house standing: slab leaks and repipes, foundation leveling, driveways and patios, and 24/7 water emergencies across Leander, Cedar Park, Austin and Georgetown.",
    heroCallCta: "Call (512) 595-2332",
    heroQuoteCta: "Get a quote online",
    heroClipLabel: "Recent field work · Leander, TX",
    heroClip1: "Curved driveway formwork",
    heroClip2: "Finished driveway pour",
    heroClip3: "Tunnel shoring and ventilation",
    heroClip4: "Crew moving material",
    heroFact1: "24/7 emergency dispatch",
    heroFact2: "Direct insurance billing",
    heroFact3: "Based at 1101 Halsey Dr, Leander",
    heroFact4: "English and Español",

    // About
    aboutEyebrow: "About",
    aboutTitle: "A Leander contractor that handles the whole job.",
    aboutP1: "Solid State Construction does restoration and improvement work for homes across Leander and North Austin. Instead of calling three trades for one problem, you call us. We handle the emergency, the structural fix and the finish work.",
    aboutCoreTitle: "What we take on",
    aboutCoreItem1: "Drywall and paint, interior and exterior.",
    aboutCoreItem2: "Full kitchen, bathroom and whole-home remodels.",
    aboutCoreItem3: "Roof repairs and full replacements.",
    aboutCoreItem4: "Foundation repair and leveling for Texas clay soil.",
    aboutCoreItem5: "24/7 water remediation, drying and rebuild.",
    aboutCoreItem6: "Flooring and tile: hardwood, laminate and custom tile work.",
    aboutLocation: "We work out of 1101 Halsey Drive in Leander and build for our own neighbors in Leander and North Austin.",
    aboutFounderName: "Shaan",
    aboutFounderRole: "Founder and lead contractor",
    aboutFounderQuote: "I started Solid State so families around Austin would have one contractor they can trust with the whole job. We take the structure seriously on every project, from the first inspection to the final walkthrough.",

    // Services
    servicesEyebrow: "Services",
    servicesTitle: "What we do.",
    servicesSubtitle: "Residential and commercial. Pick a category, then choose a service to start a quote.",
    servicesTabRes: "Residential",
    servicesTabComm: "Commercial",
    servicesInquireBtn: "Get a quote",
    servicesCallbackBtn: "Request a callback",

    resWaterTitle: "Residential water mitigation",
    resWaterDesc: "Rapid response for leaks, burst pipes and flooding. We extract, dry, sanitize and restore the home.",
    resPlumbingTitle: "24/7 emergency plumbing and drains",
    resPlumbingDesc: "Same-day repairs, electronic leak detection, slab leak repair, hydro-jetting, tankless water heaters and whole-house repiping.",
    resRoofingTitle: "Residential roofing",
    resRoofingDesc: "Roof repairs, storm-damage tarping and complete residential roof replacements.",
    resConcreteTitle: "Driveways and patios",
    resConcreteDesc: "Custom concrete: patios, driveways, sidewalks and residential foundation leveling.",

    commWaterTitle: "Commercial water restoration",
    commWaterDesc: "Large-scale drying, sanitization and moisture extraction for offices, retail and warehouses.",
    commConcreteTitle: "Commercial concrete and foundations",
    commConcreteDesc: "Heavy-duty slab pouring, foundation reinforcement, site preparation and structural concrete repair.",
    commRoofingTitle: "Commercial roofing",
    commRoofingDesc: "Flat roof coatings, TPO replacement, commercial metal roofing and preventive maintenance.",
    commExcavationTitle: "Site prep and heavy excavation",
    commExcavationDesc: "Grading, earthmoving, site drainage prep, trenching and commercial foundation excavation.",

    // Process
    processEyebrow: "Process",
    processTitle: "How an emergency job runs, start to finish.",
    processSubtitle: "From the first call to the insurance paperwork, the same crew stays on it.",
    processCta: "Call dispatch",
    processCta2: "Request an inspection",
    processStep1Title: "Dispatch",
    processStep1Sub: "Leander and the Austin metro",
    processStep1Desc: "Call any hour. For active leaks, flooding or storm damage we aim to be on-site within an hour and make the house safe first.",
    processStep2Title: "Containment",
    processStep2Sub: "Stop the damage from spreading",
    processStep2Desc: "Water extraction, commercial dehumidifiers and temporary board-up or roof tarps to secure the building envelope.",
    processStep3Title: "Inspection and plan",
    processStep3Sub: "Structural evaluation",
    processStep3Desc: "We map moisture inside the drywall, check foundation level and give you a clear written scope before any rebuild starts.",
    processStep4Title: "Rebuild",
    processStep4Sub: "Framing, drywall, roofing, plumbing, tile",
    processStep4Desc: "Our own crew rebuilds framing, hangs and finishes drywall and trim, replaces roofing, runs plumbing and completes the remodel.",
    processStep5Title: "Handover and insurance",
    processStep5Sub: "Final sign-off",
    processStep5Desc: "A final quality check with you, then we coordinate documentation and billing directly with your homeowners' insurance.",

    // Service areas
    areasEyebrow: "Service area",
    areasTitle: "Leander first, then the rest of North Austin.",
    areasSubtitle: "24/7 emergency dispatch to every city below. Scheduled work by appointment.",
    areaLeander: "Leander",
    areaLeanderNote: "Home base, 1101 Halsey Drive",
    areaCedarPark: "Cedar Park",
    areaLibertyHill: "Liberty Hill",
    areaGeorgetown: "Georgetown",
    areaRoundRock: "Round Rock",
    areaNorthAustin: "North Austin",
    areasMapLink: "Open in Google Maps",
    areasMapTitle: "Solid State Construction on Google Maps",

    // FAQ
    faqEyebrow: "Questions",
    faqTitle: "Things people ask before they call.",
    faqSubtitle: "Insurance, response times, warranties and licensing.",
    faq1Q: "Do you accept homeowners' insurance for water damage claims?",
    faq1A: "Yes. We work directly with all major insurance providers, document the damage with moisture readings, infrared scanning and photos, and can bill the insurer directly to keep your out-of-pocket costs down.",
    faq2Q: "What is your emergency response time in Leander and North Austin?",
    faq2A: "For water remediation, burst pipes and storm-damage tarping we dispatch immediately. We aim to be on-site within an hour in Leander, Cedar Park, Liberty Hill, Georgetown, Round Rock and North Austin.",
    faq3Q: "Are your foundation repairs and concrete slabs warrantied?",
    faq3A: "Yes. Concrete slab installations and foundation leveling repairs come with a structural warranty. We use soil-adapted designs and rebar reinforcement sized for Texas clay.",
    faq4Q: "Are you licensed and insured for restoration work?",
    faq4A: "Yes. Solid State Construction is licensed, insured and bonded, and our technicians are trained to IICRC standards for water mitigation, sewage cleanup, structural drying and safety.",
    faq5Q: "Can you rebuild after the water mitigation is done?",
    faq5A: "Yes, and that is the point of calling a general contractor. Mitigation-only companies leave you with stripped walls and floors. Once the home is dry and sanitized, our remodeling crew replaces drywall, framing, paint, cabinetry and tile.",

    // Contact
    contactEyebrow: "Contact",
    contactTitle: "Get a free estimate.",
    contactSubtitle: "Tell us about the job and we will get back to you within 24 hours. If water is coming in right now, call instead.",
    contactPhoneLabel: "24/7 line",
    contactEmailLabel: "Email",
    contactAddressLabel: "Office",
    contactHoursLabel: "Hours",
    contactHours: "Emergency dispatch 24 hours a day, 7 days a week.",
    formName: "Full name",
    formNamePh: "Your name",
    formPhone: "Phone",
    formPhonePh: "(512) 000-0000",
    formEmail: "Email",
    formEmailPh: "you@example.com",
    formAddress: "Project address",
    formAddressPh: "Street, city, TX",
    formService: "Service needed",
    formMsg: "What's going on?",
    formMsgPlaceholder: "Tell us about the project or the emergency.",
    formSubmit: "Send request",
    formSending: "Sending",
    formSuccessTitle: "Request sent.",
    formSuccessMsg: "We have it. Someone from the team will contact you shortly.",
    formSuccessBtn: "Send another request",
    formError: "Something went wrong. Please call us directly at (512) 595-2332.",
    formPrivacy: "We only use this to respond to your request.",
    schedCtaText: "Prefer to pick a time?",
    schedCtaBtn: "Book a walkthrough",

    // Footer
    footTagline: "General contracting, concrete and foundation work, plumbing and emergency restoration in Leander and North Austin.",
    footCompany: "Company",
    footContact: "Contact",
    footRights: "All rights reserved.",
    footPrivacy: "Privacy policy",

    // Quote modal
    quoteTitle: "Instant estimate",
    quoteSub: "A ballpark in under a minute",
    quoteConcreteDesc: "Based on cubic yardage (length x width x thickness / 27) plus rebar and finishing labor.",
    quotePlumbingDesc: "Based on materials (pipes, valves, fixtures), labor at an hourly rate, overhead and margin.",
    quoteExcavationDesc: "Based on linear footage, excavation type (trenching or tunneling) and depth.",
    quoteLength: "Length",
    quoteWidth: "Width",
    quoteLinearLength: "Linear length",
    quoteThickness: "Thickness (inches)",
    quoteExcType: "Excavation type",
    quoteTrenchDepth: "Trench depth",
    quoteMaterialsCost: "Materials cost ($)",
    quoteLaborHours: "Labor hours",
    quoteOverhead: "Overhead (20%)",
    quoteTotalVolume: "Total volume",
    quoteLinearFootage: "Linear footage",
    quoteFinalEstimate: "Estimated project budget",
    quoteBtnGetDetailed: "Request a detailed quote",
    quoteBtnNext: "Continue",
    quoteBtnPrint: "Print / PDF",
    quoteSuccessTitle: "Details saved.",
    quoteSuccessDesc: "We will contact you within 24 hours.",
    quoteSummaryTitle: "Preliminary estimate",
    quoteSummaryDesc: "This preliminary estimate is based on regional averages. A final binding quote is issued after an on-site evaluation.",
    quoteBtnBack: "Back",
    quoteBtnSubmit: "Send request",
    quoteBtnReturn: "Done",
    quoteValidation: "Please add your name and phone number.",
    quoteClose: "Close",
    quoteServiceConcrete: "Concrete and foundation",
    quoteServicePlumbing: "Plumbing",
    quoteServiceExcavation: "Excavation",
    quoteTrenching: "Trenching",
    quoteTunneling: "Tunneling",
    quoteToolsNote: "Includes professional-grade specialized tools.",
    quoteDateLabel: "Date",
    quoteSpecsTitle: "Project specifications",
    quotePrintIntro: "Thank you for requesting an estimate from Solid State Construction. Below are the preliminary specifications and budget generated by our estimation tool.",

    // Gallery page
    galEyebrow: "Gallery",
    galPageTitle: "Recent work in Leander and North Austin.",
    galPageSub: "Photos and short videos from our own job sites: driveways, slabs, formwork, tunnel shoring and remodels.",
    galSliderEyebrow: "Before and after",
    galSliderTitle: "Same yard, stripped and graded, then finished.",
    galSliderSub: "Drag the handle to compare.",
    galBeforeLabel: "Before: stripped and graded",
    galAfterLabel: "After: full sod install",
    galGridEyebrow: "Job sites",
    galGridTitle: "Photos and video from the field.",
    galGridSub: "Recent residential and commercial work. Tap any tile to open it.",
    galPlay: "Play video",
    galView: "View photo",
    galClose: "Close",
    galPrev: "Previous",
    galNext: "Next",

    // Thank-you page
    tyBadge: "Request received",
    tyTitleNamed: "Thank you, {name}.",
    tyTitle: "Thank you. We have your request.",
    tyBody: "Shaan or a project manager will call you within 24 hours to talk through the job and schedule a walkthrough.",
    tyServiceLabel: "Requested service",
    tyEmergencyTitle: "Need someone now?",
    tyEmergencyBody: "For active leaks, flooding or storm damage, call the 24/7 line instead of waiting on email.",
    tyCall: "Call (512) 595-2332",
    tyHome: "Back to home",
    tyGallery: "See recent work",

    // Privacy
    privacyBack: "Back to home",
  },

  es: {
    // Navbar
    navAbout: "Nosotros",
    navServices: "Servicios",
    navGallery: "Galería",
    navContact: "Contacto",
    navQuoteBtn: "Pedir presupuesto",
    navPhone: "(512) 595-2332",
    navMenuOpen: "Abrir menú",
    navMenuClose: "Cerrar menú",
    navLangSwitch: "Switch to English",
    navCallLabel: "Llámenos",

    // Hero
    heroEyebrow: "Leander, TX · Contratista general",
    heroTitle: "Plomería, reparación de cimientos y concreto en Leander, TX.",
    heroSubtitle: "Una sola cuadrilla para los trabajos que mantienen una casa en pie: fugas en losa y repipeo, nivelación de cimientos, entradas y patios, y emergencias de agua 24/7 en Leander, Cedar Park, Austin y Georgetown.",
    heroCallCta: "Llamar al (512) 595-2332",
    heroQuoteCta: "Presupuesto en línea",
    heroClipLabel: "Trabajo reciente · Leander, TX",
    heroClip1: "Cimbra para entrada curva",
    heroClip2: "Vaciado de entrada terminado",
    heroClip3: "Apuntalamiento y ventilación de túnel",
    heroClip4: "Cuadrilla moviendo material",
    heroFact1: "Despacho de emergencia 24/7",
    heroFact2: "Facturación directa al seguro",
    heroFact3: "Oficina en 1101 Halsey Dr, Leander",
    heroFact4: "Inglés y español",

    // About
    aboutEyebrow: "Nosotros",
    aboutTitle: "Un contratista de Leander que se encarga de todo el trabajo.",
    aboutP1: "Solid State Construction hace trabajos de restauración y mejora para hogares en Leander y el norte de Austin. En lugar de llamar a tres oficios por un solo problema, nos llama a nosotros. Atendemos la emergencia, la reparación estructural y los acabados.",
    aboutCoreTitle: "Lo que hacemos",
    aboutCoreItem1: "Paneles de yeso y pintura, interior y exterior.",
    aboutCoreItem2: "Remodelación completa de cocinas, baños y toda la casa.",
    aboutCoreItem3: "Reparación de techos y reemplazos completos.",
    aboutCoreItem4: "Reparación y nivelación de cimientos para el suelo arcilloso de Texas.",
    aboutCoreItem5: "Mitigación de agua 24/7, secado y reconstrucción.",
    aboutCoreItem6: "Pisos y azulejos: madera, laminado y trabajo de azulejo a medida.",
    aboutLocation: "Trabajamos desde 1101 Halsey Drive en Leander y construimos para nuestros propios vecinos de Leander y el norte de Austin.",
    aboutFounderName: "Shaan",
    aboutFounderRole: "Fundador y contratista principal",
    aboutFounderQuote: "Fundé Solid State para que las familias del área de Austin tuvieran un solo contratista en quien confiar para todo el trabajo. Tomamos la estructura en serio en cada proyecto, desde la primera inspección hasta el recorrido final.",

    // Services
    servicesEyebrow: "Servicios",
    servicesTitle: "Lo que hacemos.",
    servicesSubtitle: "Residencial y comercial. Elija una categoría y luego un servicio para iniciar un presupuesto.",
    servicesTabRes: "Residencial",
    servicesTabComm: "Comercial",
    servicesInquireBtn: "Pedir presupuesto",
    servicesCallbackBtn: "Solicitar llamada",

    resWaterTitle: "Mitigación de agua residencial",
    resWaterDesc: "Respuesta rápida para fugas, tuberías rotas e inundaciones. Extraemos, secamos, desinfectamos y restauramos la casa.",
    resPlumbingTitle: "Plomería de emergencia 24/7 y drenajes",
    resPlumbingDesc: "Reparaciones el mismo día, detección electrónica de fugas, reparación de fugas en losa, hidrolavado, calentadores sin tanque y repipeo de toda la casa.",
    resRoofingTitle: "Techos residenciales",
    resRoofingDesc: "Reparación de techos, lonas por daños de tormenta y reemplazos completos de techos residenciales.",
    resConcreteTitle: "Entradas y patios",
    resConcreteDesc: "Concreto a medida: patios, entradas, banquetas y nivelación de cimientos residenciales.",

    commWaterTitle: "Restauración de agua comercial",
    commWaterDesc: "Secado, desinfección y extracción de humedad a gran escala para oficinas, comercios y bodegas.",
    commConcreteTitle: "Concreto y cimientos comerciales",
    commConcreteDesc: "Vaciado de losas de alta resistencia, refuerzo de cimientos, preparación de sitio y reparación de concreto estructural.",
    commRoofingTitle: "Techos comerciales",
    commRoofingDesc: "Recubrimientos para techos planos, reemplazo de TPO, techos metálicos comerciales y mantenimiento preventivo.",
    commExcavationTitle: "Preparación de sitio y excavación pesada",
    commExcavationDesc: "Nivelación, movimiento de tierra, drenaje de sitio, zanjas y excavación de cimientos comerciales.",

    // Process
    processEyebrow: "Proceso",
    processTitle: "Cómo se lleva un trabajo de emergencia, de principio a fin.",
    processSubtitle: "Desde la primera llamada hasta el papeleo del seguro, la misma cuadrilla se encarga.",
    processCta: "Llamar a despacho",
    processCta2: "Solicitar inspección",
    processStep1Title: "Despacho",
    processStep1Sub: "Leander y el área metropolitana de Austin",
    processStep1Desc: "Llame a cualquier hora. Para fugas activas, inundaciones o daños de tormenta, buscamos estar en el sitio en menos de una hora y asegurar la casa primero.",
    processStep2Title: "Contención",
    processStep2Sub: "Evitar que el daño se extienda",
    processStep2Desc: "Extracción de agua, deshumidificadores comerciales y tablas o lonas temporales para asegurar la envolvente del edificio.",
    processStep3Title: "Inspección y plan",
    processStep3Sub: "Evaluación estructural",
    processStep3Desc: "Mapeamos la humedad dentro de las paredes, revisamos el nivel de los cimientos y le entregamos un alcance claro por escrito antes de reconstruir.",
    processStep4Title: "Reconstrucción",
    processStep4Sub: "Estructura, yeso, techo, plomería, azulejo",
    processStep4Desc: "Nuestra propia cuadrilla reconstruye la estructura, instala y termina paneles de yeso y molduras, reemplaza techos, hace la plomería y completa la remodelación.",
    processStep5Title: "Entrega y seguro",
    processStep5Sub: "Aprobación final",
    processStep5Desc: "Una revisión final de calidad con usted, y luego coordinamos la documentación y la facturación directamente con su seguro de hogar.",

    // Service areas
    areasEyebrow: "Área de servicio",
    areasTitle: "Leander primero, y luego el resto del norte de Austin.",
    areasSubtitle: "Despacho de emergencia 24/7 a todas las ciudades de abajo. Trabajo programado con cita.",
    areaLeander: "Leander",
    areaLeanderNote: "Oficina principal, 1101 Halsey Drive",
    areaCedarPark: "Cedar Park",
    areaLibertyHill: "Liberty Hill",
    areaGeorgetown: "Georgetown",
    areaRoundRock: "Round Rock",
    areaNorthAustin: "Norte de Austin",
    areasMapLink: "Abrir en Google Maps",
    areasMapTitle: "Solid State Construction en Google Maps",

    // FAQ
    faqEyebrow: "Preguntas",
    faqTitle: "Lo que la gente pregunta antes de llamar.",
    faqSubtitle: "Seguros, tiempos de respuesta, garantías y licencias.",
    faq1Q: "¿Aceptan seguros de hogar para reclamos por daños de agua?",
    faq1A: "Sí. Trabajamos directamente con las principales aseguradoras, documentamos el daño con lecturas de humedad, escaneo infrarrojo y fotos, y podemos facturar directamente al seguro para reducir sus gastos de bolsillo.",
    faq2Q: "¿Cuál es su tiempo de respuesta de emergencia en Leander y el norte de Austin?",
    faq2A: "Para mitigación de agua, tuberías rotas y lonas por tormenta despachamos de inmediato. Buscamos estar en el sitio en menos de una hora en Leander, Cedar Park, Liberty Hill, Georgetown, Round Rock y el norte de Austin.",
    faq3Q: "¿Tienen garantía sus reparaciones de cimientos y losas de concreto?",
    faq3A: "Sí. Las instalaciones de losas de concreto y las reparaciones de nivelación de cimientos incluyen garantía estructural. Usamos diseños adaptados al suelo y refuerzo de varilla dimensionado para la arcilla de Texas.",
    faq4Q: "¿Tienen licencia y seguro para trabajos de restauración?",
    faq4A: "Sí. Solid State Construction cuenta con licencia, seguro y fianza, y nuestros técnicos están capacitados según las normas IICRC para mitigación de agua, limpieza de aguas residuales, secado estructural y seguridad.",
    faq5Q: "¿Pueden reconstruir después de terminar la mitigación del agua?",
    faq5A: "Sí, y esa es la ventaja de llamar a un contratista general. Las empresas que solo mitigan lo dejan con paredes y pisos desmantelados. Una vez que la casa está seca y desinfectada, nuestra cuadrilla de remodelación reemplaza paneles de yeso, estructura, pintura, gabinetes y azulejo.",

    // Contact
    contactEyebrow: "Contacto",
    contactTitle: "Obtenga un presupuesto gratis.",
    contactSubtitle: "Cuéntenos sobre el trabajo y le responderemos en 24 horas. Si el agua está entrando ahora mismo, mejor llame.",
    contactPhoneLabel: "Línea 24/7",
    contactEmailLabel: "Correo",
    contactAddressLabel: "Oficina",
    contactHoursLabel: "Horario",
    contactHours: "Despacho de emergencia las 24 horas, los 7 días de la semana.",
    formName: "Nombre completo",
    formNamePh: "Su nombre",
    formPhone: "Teléfono",
    formPhonePh: "(512) 000-0000",
    formEmail: "Correo electrónico",
    formEmailPh: "usted@ejemplo.com",
    formAddress: "Dirección del proyecto",
    formAddressPh: "Calle, ciudad, TX",
    formService: "Servicio necesario",
    formMsg: "¿Qué está pasando?",
    formMsgPlaceholder: "Cuéntenos sobre el proyecto o la emergencia.",
    formSubmit: "Enviar solicitud",
    formSending: "Enviando",
    formSuccessTitle: "Solicitud enviada.",
    formSuccessMsg: "La recibimos. Alguien del equipo se pondrá en contacto con usted en breve.",
    formSuccessBtn: "Enviar otra solicitud",
    formError: "Algo salió mal. Por favor llámenos directamente al (512) 595-2332.",
    formPrivacy: "Solo usamos esta información para responder a su solicitud.",
    schedCtaText: "¿Prefiere elegir una hora?",
    schedCtaBtn: "Reservar una visita",

    // Footer
    footTagline: "Contratación general, concreto y cimientos, plomería y restauración de emergencia en Leander y el norte de Austin.",
    footCompany: "Empresa",
    footContact: "Contacto",
    footRights: "Todos los derechos reservados.",
    footPrivacy: "Política de privacidad",

    // Quote modal
    quoteTitle: "Estimación instantánea",
    quoteSub: "Un aproximado en menos de un minuto",
    quoteConcreteDesc: "Según las yardas cúbicas (largo x ancho x espesor / 27) más la mano de obra de varilla y acabado.",
    quotePlumbingDesc: "Según materiales (tuberías, válvulas, accesorios), mano de obra por hora, gastos generales y margen.",
    quoteExcavationDesc: "Según los pies lineales, el tipo de excavación (zanja o túnel) y la profundidad.",
    quoteLength: "Largo",
    quoteWidth: "Ancho",
    quoteLinearLength: "Longitud lineal",
    quoteThickness: "Espesor (pulgadas)",
    quoteExcType: "Tipo de excavación",
    quoteTrenchDepth: "Profundidad de zanja",
    quoteMaterialsCost: "Costo de materiales ($)",
    quoteLaborHours: "Horas de mano de obra",
    quoteOverhead: "Gastos generales (20%)",
    quoteTotalVolume: "Volumen total",
    quoteLinearFootage: "Pies lineales",
    quoteFinalEstimate: "Presupuesto estimado del proyecto",
    quoteBtnGetDetailed: "Solicitar presupuesto detallado",
    quoteBtnNext: "Continuar",
    quoteBtnPrint: "Imprimir / PDF",
    quoteSuccessTitle: "Datos guardados.",
    quoteSuccessDesc: "Nos pondremos en contacto con usted en 24 horas.",
    quoteSummaryTitle: "Estimación preliminar",
    quoteSummaryDesc: "Esta estimación preliminar se basa en promedios regionales. El presupuesto final vinculante se emite después de una evaluación en sitio.",
    quoteBtnBack: "Atrás",
    quoteBtnSubmit: "Enviar solicitud",
    quoteBtnReturn: "Listo",
    quoteValidation: "Por favor agregue su nombre y número de teléfono.",
    quoteClose: "Cerrar",
    quoteServiceConcrete: "Concreto y cimientos",
    quoteServicePlumbing: "Plomería",
    quoteServiceExcavation: "Excavación",
    quoteTrenching: "Zanja",
    quoteTunneling: "Túnel",
    quoteToolsNote: "Incluye herramientas especializadas de grado profesional.",
    quoteDateLabel: "Fecha",
    quoteSpecsTitle: "Especificaciones del proyecto",
    quotePrintIntro: "Gracias por solicitar una estimación a Solid State Construction. A continuación se presentan las especificaciones preliminares y el presupuesto generado por nuestra herramienta.",

    // Gallery page
    galEyebrow: "Galería",
    galPageTitle: "Trabajo reciente en Leander y el norte de Austin.",
    galPageSub: "Fotos y videos cortos de nuestras propias obras: entradas, losas, cimbra, apuntalamiento de túneles y remodelaciones.",
    galSliderEyebrow: "Antes y después",
    galSliderTitle: "El mismo jardín, nivelado y luego terminado.",
    galSliderSub: "Arrastre el controlador para comparar.",
    galBeforeLabel: "Antes: terreno nivelado",
    galAfterLabel: "Después: césped instalado",
    galGridEyebrow: "Obras",
    galGridTitle: "Fotos y video desde la obra.",
    galGridSub: "Trabajo residencial y comercial reciente. Toque cualquier imagen para abrirla.",
    galPlay: "Reproducir video",
    galView: "Ver foto",
    galClose: "Cerrar",
    galPrev: "Anterior",
    galNext: "Siguiente",

    // Thank-you page
    tyBadge: "Solicitud recibida",
    tyTitleNamed: "Gracias, {name}.",
    tyTitle: "Gracias. Tenemos su solicitud.",
    tyBody: "Shaan o un gerente de proyecto le llamará en 24 horas para hablar del trabajo y programar una visita.",
    tyServiceLabel: "Servicio solicitado",
    tyEmergencyTitle: "¿Necesita a alguien ahora?",
    tyEmergencyBody: "Para fugas activas, inundaciones o daños de tormenta, llame a la línea 24/7 en lugar de esperar un correo.",
    tyCall: "Llamar al (512) 595-2332",
    tyHome: "Volver al inicio",
    tyGallery: "Ver trabajo reciente",

    // Privacy
    privacyBack: "Volver al inicio",
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('language');
      if (savedLang === 'en' || savedLang === 'es') setLanguage(savedLang);
    } catch (e) {
      /* storage unavailable: stay in English */
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'es' : 'en';
    setLanguage(nextLang);
    try { localStorage.setItem('language', nextLang); } catch (e) { /* ignore */ }
  };

  const t = (key) => translations[language][key] || translations.en[key] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
