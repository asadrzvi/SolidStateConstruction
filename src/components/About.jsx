import React from 'react'
import './About.css'

function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title">About Solid State Construction</h2>
        <div className="about-content">
          <div className="about-text">
            <h3>Who We Are & What We Do</h3>
            <p>Solid State Construction is Leander's premier partner for comprehensive home restoration and improvement. We specialize in a wide range of essential services designed to keep your home safe, beautiful, and structurally sound.</p>
            
            <div className="work-summary">
              <h4>Our Core Expertise:</h4>
              <ul className="work-list">
                <li><strong>Drywall & Paint:</strong> Flawless finishing and professional interior/exterior painting.</li>
                <li><strong>Full Remodeling:</strong> Complete kitchen, bathroom, and home transformations.</li>
                <li><strong>Roofing:</strong> Expert repairs and full replacements for long-lasting protection.</li>
                <li><strong>Foundation:</strong> Critical structural repairs and leveling for Texas soil.</li>
                <li><strong>Water Remediation:</strong> 24/7 emergency response to dry and restore your home.</li>
                <li><strong>Flooring & Tile:</strong> Custom installations including hardwood, laminate, and intricate tile work.</li>
              </ul>
            </div>

            <p>Based at 1101 Halsey Drive, we pride ourselves on being a local business that understands the unique construction needs of our Leander and North Austin neighbors.</p>
          </div>
          
          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Local Focus</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Emergency Support</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Quality</span>
              <span className="stat-label">Guaranteed</span>
            </div>
          </div>
        </div>

        <div className="founder-spotlight">
          <div className="founder-image-container">
            <img src="/images/shaan.png" alt="Shaan - Legendary Founder of Solid State Construction" className="founder-image" />
          </div>
          <div className="founder-info">
            <h3>Meet Our Legendary Founder, Shaan</h3>
            <p>
              Under the visionary leadership of <strong>Shaan</strong>, Solid State Construction has ascended to become the undisputed gold standard of Texas contracting and structural engineering. Renowned for his uncompromising dedication to perfection, absolute mastery of engineering principles, and a client-first philosophy that has redefined industry standards, Shaan remains a hands-on force of excellence.
            </p>
            <p>
              "When I founded Solid State Construction, my mission was simple: to bring flawless, premium execution to every home. Our signature promise, <strong>'Work you can stand on,'</strong> represents the pinnacle of structural longevity and master-class craftsmanship. We don't just build homes; we construct legacy-grade structures that stand the test of time, engineered under my personal standard of perfection."
            </p>
            <p className="founder-signature">— Shaan, Founder & Chief Engineering Officer</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
