import React from 'react'
import { Droplets, ShieldCheck, Home, Paintbrush, Layers, Hammer } from 'lucide-react'
import './Services.css'

const services = [
  {
    icon: <Droplets size={24} />,
    title: "Water Remediation",
    image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=1200&auto=format&fit=crop",
    description: "Rapid response for water damage. We dry, clean, and restore your home to its original state."
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Foundation Repair",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?q=80&w=1200&auto=format&fit=crop",
    description: "Structural integrity is our priority. Expert foundation leveling and crack repair in Leander."
  },
  {
    icon: <Home size={24} />,
    title: "Full Home Remodeling",
    image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?q=80&w=1200&auto=format&fit=crop",
    description: "Transform your living space with our expert design-build remodeling services."
  },
  {
    icon: <Paintbrush size={24} />,
    title: "Painting & Drywall",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1200&auto=format&fit=crop",
    description: "Professional interior and exterior painting with flawless drywall finishing."
  },
  {
    icon: <Hammer size={24} />,
    title: "Roofing Services",
    image: "https://images.unsplash.com/photo-1635843104321-c454e99f018d?q=80&w=1200&auto=format&fit=crop",
    description: "Reliable roof repairs and full replacements using top-tier materials."
  },
  {
    icon: <Layers size={24} />,
    title: "Flooring & Tile",
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200&auto=format&fit=crop",
    description: "Custom tile work and flooring installations that elevate your home's aesthetic."
  }
]

function Services({ onServiceSelect }) {
  const handleServiceClick = (serviceTitle) => {
    onServiceSelect(serviceTitle);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
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
                    e.target.src="https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=1200&auto=format&fit=crop"
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
