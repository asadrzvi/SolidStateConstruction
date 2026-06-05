import React from 'react'
import { Phone, Droplets } from 'lucide-react'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <div className="emergency-badge">
            <Droplets className="emergency-icon" />
            <span>24/7 Water Remediation Service</span>
          </div>
          <h1>Solid State Construction</h1>
          <p className="hero-subtitle">Leander's Choice for Quality Remodeling, Foundation Repair & Emergency Services</p>
          <div className="hero-cta">
            <a href="tel:207-482-9763" className="btn btn-primary">
              <Phone size={20} />
              Call Now: (207) 482-9763
            </a>
            <a href="#contact" className="btn btn-secondary">Get a Quote Online</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
