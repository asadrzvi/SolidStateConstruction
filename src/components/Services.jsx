import React, { useState } from 'react'
import { Hammer, Wrench, Shovel, Droplets, Home } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

// Referenced by URL from public/ rather than imported — importing from public/
// made Vite ship a second hashed copy of each file alongside the one it already
// copies verbatim. All now WebP.

// Residential service images
const foundationImg = '/images/foundation_service.webp'
const plumbingImg = '/images/plumbing_service.webp'
const waterImg = '/images/water_service.webp'
const roofImg = '/images/roofing_service.webp'

// Commercial service images
const commWaterImg = '/images/comm_water_service.webp'
const commConcreteImg = '/images/comm_concrete_service.webp'
const commRoofImg = '/images/comm_roofing_service.webp'
const commExcavationImg = '/images/comm_excavation_service.webp'

import './Services.css'

const residentialServices = [
  {
    icon: <Droplets size={24} />,
    title: "Residential Water Mitigation",
    titleKey: "resWaterTitle",
    descKey: "resWaterDesc",
    quoteKey: "Water Remediation",
    image: waterImg,
    directEmail: true
  },
  {
    icon: <Wrench size={24} />,
    title: "Home Plumbing Services",
    titleKey: "resPlumbingTitle",
    descKey: "resPlumbingDesc",
    quoteKey: "Plumbing Services",
    image: plumbingImg
  },
  {
    icon: <Home size={24} />,
    title: "Residential Roofing",
    titleKey: "resRoofingTitle",
    descKey: "resRoofingDesc",
    quoteKey: "Roofing Services",
    image: roofImg,
    directEmail: true
  },
  {
    icon: <Hammer size={24} />,
    title: "Driveways & Patios",
    titleKey: "resConcreteTitle",
    descKey: "resConcreteDesc",
    quoteKey: "Concrete & Foundation",
    image: foundationImg
  }
];

const commercialServices = [
  {
    icon: <Droplets size={24} />,
    title: "Commercial Water Restoration",
    titleKey: "commWaterTitle",
    descKey: "commWaterDesc",
    quoteKey: "Water Remediation",
    image: commWaterImg,
    directEmail: true
  },
  {
    icon: <Hammer size={24} />,
    title: "Commercial Concrete & Foundations",
    titleKey: "commConcreteTitle",
    descKey: "commConcreteDesc",
    quoteKey: "Concrete & Foundation",
    image: commConcreteImg
  },
  {
    icon: <Home size={24} />,
    title: "Commercial Roofing",
    titleKey: "commRoofingTitle",
    descKey: "commRoofingDesc",
    quoteKey: "Roofing Services",
    image: commRoofImg,
    directEmail: true
  },
  {
    icon: <Shovel size={24} />,
    title: "Site Prep & Heavy Excavation",
    titleKey: "commExcavationTitle",
    descKey: "commExcavationDesc",
    quoteKey: "Excavation Services",
    image: commExcavationImg
  }
];

function Services({ onServiceSelect, onOpenQuote, onPrefillMessage }) {
  const [activeCategory, setActiveCategory] = useState('residential');
  const { t } = useLanguage();
  
  const services = activeCategory === 'residential' ? residentialServices : commercialServices;

  const handleServiceClick = (service) => {
    if (service.directEmail) {
      onServiceSelect(service.title);
      if (onPrefillMessage) {
        onPrefillMessage('');
      }
      
      // Scroll to contact form
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (onPrefillMessage) {
        onPrefillMessage('');
      }
      onOpenQuote();
      onServiceSelect(service.quoteKey);
    }
  };

  return (
    <section className="services" id="services">
      <div className="container">
        <h2 className="section-title">{t('servicesTitle')}</h2>
        <p className="section-subtitle">{t('servicesSubtitle')}</p>
        
        {/* Category Tab Switcher */}
        <div className="services-tabs">
          <button 
            type="button"
            className={`services-tab-btn ${activeCategory === 'residential' ? 'active' : ''}`}
            onClick={() => setActiveCategory('residential')}
          >
            {t('servicesTabRes')}
          </button>
          <button 
            type="button"
            className={`services-tab-btn ${activeCategory === 'commercial' ? 'active' : ''}`}
            onClick={() => setActiveCategory('commercial')}
          >
            {t('servicesTabComm')}
          </button>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              className="service-card" 
              key={index}
              onClick={() => handleServiceClick(service)}
              style={{ cursor: 'pointer' }}
            >
              <div className="service-image">
                <img 
                  src={service.image} 
                  alt={t(service.titleKey)}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src="https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&w=800&q=80"
                  }}
                />
                <div className="service-icon-overlay">{service.icon}</div>
              </div>
              <div className="service-card-content">
                <h3>{t(service.titleKey)}</h3>
                <p>{t(service.descKey)}</p>
                <span className="service-link">{t('servicesInquireBtn')} &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
