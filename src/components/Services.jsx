import React from 'react'
import { Hammer, Wrench, Shovel, Droplets, Home } from 'lucide-react'
import foundationImg from '../../public/images/foundation.jpg'
import plumbingImg from '../../public/images/plumbing.jpg'
import waterImg from '../../public/images/water.jpg'
import roofImg from '../../public/images/roof.jpg'
import './Services.css'

const services = [
  {
    icon: <Droplets size={24} />,
    title: "Water Remediation",
    image: waterImg,
    description: "Rapid response for water damage. We dry, clean, and restore your home to its original state.",
    directEmail: true
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
    description: "Reliable roof repairs and full replacements using top-tier materials.",
    directEmail: true
  },
  {
    icon: <Wrench size={24} />,
    title: "Plumbing Services",
    image: plumbingImg,
    description: "Professional leak detection, pipe replacement, fixtures installation, and emergency plumbing."
  },
  {
    icon: <Shovel size={24} />,
    title: "Excavation Services",
    image: "https://images.unsplash.com/photo-1579294800821-694d95e86143?auto=format&fit=crop&w=800&q=80",
    description: "Precision site preparation, trenching, and tunneling. We lay utility conduits, excavate foundations, and carve tunnels."
  }
]

function Services({ onServiceSelect, onOpenQuote }) {
  const handleServiceClick = (service) => {
    if (service.directEmail) {
      window.location.href = `mailto:contact@solidstateconstruction.com?subject=Inquiry: ${service.title}&body=Hello Solid State Construction Team,%0A%0AI would like to inquire about your ${service.title} for my property.%0A%0APlease contact me back to discuss details.%0A%0ABest regards,%0A[Your Name]`;
    } else {
      onOpenQuote();
      onServiceSelect(service.title);
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
