import React from 'react'
import { Droplets, ShieldCheck, Home, Paintbrush, Layers, Hammer } from 'lucide-react'
import waterImg from '../../public/images/water.jpg'
import foundationImg from '../../public/images/foundation.jpg'
import remodelImg from '../../public/images/remodel.jpg'
import paintImg from '../../public/images/paint.jpg'
import roofImg from '../../public/images/roof.jpg'
import floorImg from '../../public/images/floor.jpg'
import './Services.css'

const services = [
  {
    icon: <Droplets size={24} />,
    title: "Water Remediation",
    image: waterImg,
    description: "Rapid response for water damage. We dry, clean, and restore your home to its original state."
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Foundation Repair",
    image: foundationImg,
    description: "Structural integrity is our priority. Expert foundation leveling and crack repair in Leander."
  },
  {
    icon: <Home size={24} />,
    title: "Full Home Remodeling",
    image: remodelImg,
    description: "Transform your living space with our expert design-build remodeling services."
  },
  {
    icon: <Paintbrush size={24} />,
    title: "Painting & Drywall",
    image: paintImg,
    description: "Professional interior and exterior painting with flawless drywall finishing."
  },
  {
    icon: <Hammer size={24} />,
    title: "Roofing Services",
    image: roofImg,
    description: "Reliable roof repairs and full replacements using top-tier materials."
  },
  {
    icon: <Layers size={24} />,
    title: "Flooring & Tile",
    image: floorImg,
    description: "Custom tile work and flooring installations that elevate your home's aesthetic."
  }
]

function Services({ onServiceSelect, onOpenQuote }) {
  const handleServiceClick = (serviceTitle) => {
    onOpenQuote();
    onServiceSelect(serviceTitle);
  };

  return (
    <section className="services" id="services">
      <div className="container">
        <h2 className="section-title">Our Specialized Services</h2>
        <p className="section-subtitle">From emergency water restoration to custom home remodeling, we provide top-tier craftsmanship for every corner of your home.</p>
        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              className="service-card" 
              key={index}
              onClick={() => handleServiceClick(service.title)}
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
