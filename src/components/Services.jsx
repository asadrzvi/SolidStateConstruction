import React, { useState } from 'react'
import { Hammer, Wrench, Shovel, Droplets, Home } from 'lucide-react'
import foundationImg from '../../public/images/foundation_service.png'
import plumbingImg from '../../public/images/plumbing_service.png'
import waterImg from '../../public/images/water_service.png'
import roofImg from '../../public/images/roofing_service.png'
import excavationImg from '../../public/images/excavation_service.png'
import './Services.css'

const residentialServices = [
  {
    icon: <Droplets size={24} />,
    title: "Residential Water Mitigation",
    quoteKey: "Water Remediation",
    image: waterImg,
    description: "Rapid response for residential leaks, pipe bursts, and flooding. We dry, sanitize, and restore your home.",
    directEmail: true
  },
  {
    icon: <Wrench size={24} />,
    title: "Home Plumbing Services",
    quoteKey: "Plumbing Services",
    image: plumbingImg,
    description: "Professional leak detection, custom fixtures, whole-house repiping, and emergency residential plumbing."
  },
  {
    icon: <Home size={24} />,
    title: "Residential Roofing",
    quoteKey: "Roofing Services",
    image: roofImg,
    description: "Expert roof repairs, storm-damage tarping, and complete residential roof replacements.",
    directEmail: true
  },
  {
    icon: <Hammer size={24} />,
    title: "Driveways & Patios",
    quoteKey: "Concrete & Foundation",
    image: foundationImg,
    description: "Custom concrete installations including patios, driveways, sidewalks, and residential foundation leveling."
  }
];

const commercialServices = [
  {
    icon: <Droplets size={24} />,
    title: "Commercial Water Restoration",
    quoteKey: "Water Remediation",
    image: waterImg,
    description: "Large-scale drying and extraction for offices, retail spaces, and warehouses. Minimal operational downtime guaranteed.",
    directEmail: true
  },
  {
    icon: <Hammer size={24} />,
    title: "Commercial Concrete & Foundations",
    quoteKey: "Concrete & Foundation",
    image: foundationImg,
    description: "Heavy-duty concrete slab installations, commercial foundation underpinning, engineering design, and structural concrete repair."
  },
  {
    icon: <Home size={24} />,
    title: "Commercial Roofing",
    quoteKey: "Roofing Services",
    image: roofImg,
    description: "Flat roof coatings, commercial metal roofing, TPO replacements, and scheduled industrial roof maintenance programs.",
    directEmail: true
  },
  {
    icon: <Shovel size={24} />,
    title: "Site Prep & Heavy Excavation",
    quoteKey: "Excavation Services",
    image: excavationImg,
    description: "Precision commercial site grading, utility trenching, under-slab tunneling, and commercial foundation excavations."
  }
];

function Services({ onServiceSelect, onOpenQuote, onPrefillMessage }) {
  const [activeCategory, setActiveCategory] = useState('residential');
  
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
        <h2 className="section-title">Our Specialized Services</h2>
        <p className="section-subtitle">Select between our residential and commercial solutions for tailored, legacy-grade craftsmanship.</p>
        
        {/* Category Tab Switcher */}
        <div className="services-tabs">
          <button 
            type="button"
            className={`services-tab-btn ${activeCategory === 'residential' ? 'active' : ''}`}
            onClick={() => setActiveCategory('residential')}
          >
            Residential Services
          </button>
          <button 
            type="button"
            className={`services-tab-btn ${activeCategory === 'commercial' ? 'active' : ''}`}
            onClick={() => setActiveCategory('commercial')}
          >
            Commercial Services
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
                  alt={service.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src="https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&w=800&q=80"
                  }}
                />
                <div className="service-icon-overlay">{service.icon}</div>
              </div>
              <div className="service-card-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="service-link">Inquire Now &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
