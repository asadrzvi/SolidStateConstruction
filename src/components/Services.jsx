import React, { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import './Services.css'

// Images are referenced by URL from public/ so Vite does not ship a second
// hashed copy. All WebP.
const residentialServices = [
  {
    title: "Residential Water Mitigation",
    titleKey: "resWaterTitle",
    descKey: "resWaterDesc",
    quoteKey: "Water Remediation",
    image: '/images/water_service.webp',
    directEmail: true
  },
  {
    title: "Home Plumbing Services",
    titleKey: "resPlumbingTitle",
    descKey: "resPlumbingDesc",
    quoteKey: "Plumbing Services",
    image: '/images/plumbing_service.webp'
  },
  {
    title: "Residential Roofing",
    titleKey: "resRoofingTitle",
    descKey: "resRoofingDesc",
    quoteKey: "Roofing Services",
    image: '/images/roofing_service.webp',
    directEmail: true
  },
  {
    title: "Driveways & Patios",
    titleKey: "resConcreteTitle",
    descKey: "resConcreteDesc",
    quoteKey: "Concrete & Foundation",
    image: '/images/foundation_service.webp'
  }
];

const commercialServices = [
  {
    title: "Commercial Water Restoration",
    titleKey: "commWaterTitle",
    descKey: "commWaterDesc",
    quoteKey: "Water Remediation",
    image: '/images/comm_water_service.webp',
    directEmail: true
  },
  {
    title: "Commercial Concrete & Foundations",
    titleKey: "commConcreteTitle",
    descKey: "commConcreteDesc",
    quoteKey: "Concrete & Foundation",
    image: '/images/comm_concrete_service.webp'
  },
  {
    title: "Commercial Roofing",
    titleKey: "commRoofingTitle",
    descKey: "commRoofingDesc",
    quoteKey: "Roofing Services",
    image: '/images/comm_roofing_service.webp',
    directEmail: true
  },
  {
    title: "Site Prep & Heavy Excavation",
    titleKey: "commExcavationTitle",
    descKey: "commExcavationDesc",
    quoteKey: "Excavation Services",
    image: '/images/comm_excavation_service.webp'
  }
];

function Services({ onServiceSelect, onOpenQuote, onPrefillMessage }) {
  const [activeCategory, setActiveCategory] = useState('residential');
  const { t } = useLanguage();

  const services = activeCategory === 'residential' ? residentialServices : commercialServices;

  const handleServiceClick = (service) => {
    if (onPrefillMessage) onPrefillMessage('');
    if (service.directEmail) {
      // Water and roofing have no calculator: send the visitor to the form
      // with the service preselected.
      onServiceSelect(service.title);
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      onOpenQuote();
      onServiceSelect(service.quoteKey);
    }
  };

  return (
    <section className="services band-alt" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="services-head">
          <Reveal className="section-head">
            <p className="eyebrow">{t('servicesEyebrow')}</p>
            <h2 id="services-title">{t('servicesTitle')}</h2>
            <p className="lede">{t('servicesSubtitle')}</p>
          </Reveal>

          <Reveal delay={100}>
            <div className="services-tabs" role="tablist" aria-label={t('servicesEyebrow')}>
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'residential'}
                className={`services-tab${activeCategory === 'residential' ? ' is-active' : ''}`}
                onClick={() => setActiveCategory('residential')}
              >
                {t('servicesTabRes')}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'commercial'}
                className={`services-tab${activeCategory === 'commercial' ? ' is-active' : ''}`}
                onClick={() => setActiveCategory('commercial')}
              >
                {t('servicesTabComm')}
              </button>
            </div>
          </Reveal>
        </div>

        <div className="services-grid" key={activeCategory}>
          {services.map((service, index) => (
            <Reveal
              as="article"
              className="service-card"
              key={service.titleKey}
              delay={index * 70}
            >
              <button
                type="button"
                className="service-card-hit"
                onClick={() => handleServiceClick(service)}
                aria-label={`${t(service.titleKey)}: ${service.directEmail ? t('servicesCallbackBtn') : t('servicesInquireBtn')}`}
              >
                <div className="service-image">
                  <img
                    src={service.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="500"
                  />
                </div>
                <div className="service-body">
                  <h3>{t(service.titleKey)}</h3>
                  <p>{t(service.descKey)}</p>
                  <span className="service-link">
                    {service.directEmail ? t('servicesCallbackBtn') : t('servicesInquireBtn')}
                    <ArrowUpRight size={18} strokeWidth={1.75} />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
