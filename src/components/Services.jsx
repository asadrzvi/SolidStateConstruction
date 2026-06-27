import React from 'react'
import { Droplets, Home, Hammer, Wrench } from 'lucide-react'
import waterImg from '../../public/images/water.jpg'
import foundationImg from '../../public/images/foundation.jpg'
import roofImg from '../../public/images/roof.jpg'
import plumbingImg from '../../public/images/plumbing.jpg'
import './Services.css'

const services = [
  {
    icon: <Droplets size={24} />,
    title: "Water Remediation",
    image: waterImg,
    description: "Rapid response for water damage. We dry, clean, and restore your home to its original state."
  },
  {
    icon: <Hammer size={24} />,
    title: "Concrete & Foundation",
    image: foundationImg,
    description: "Structural integrity is our priority. Expert concrete installation, foundation leveling, and crack repair."
  },
  {
    icon: <Home size={24} />,
    title: "Roofing Services",
    image: roofImg,
    description: "Reliable roof repairs and full replacements using top-tier materials."
  },
  {
    icon: <Wrench size={24} />,
    title: "Plumbing Services",
    image: plumbingImg,
    description: "Professional leak detection, pipe replacement, fixtures installation, and emergency plumbing."
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
