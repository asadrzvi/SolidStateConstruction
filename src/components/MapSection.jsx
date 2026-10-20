import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import './MapSection.css'

function MapSection() {
  const { t } = useLanguage();
  const address = "Solid State Construction, Leander, TX";
  const mapsProfileUrl = "https://maps.app.goo.gl/xzScx29yJNoVXDi1A";
  const standardEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3434.45!2d-97.8571851!3d30.576184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x45c300d14c7667bf%3A0x518a15ff1d800e86!2sSolid%20State%20Construction!5e0!3m2!1sen!2sus!4v1717545600000!5m2!1sen!2sus";

  return (
    <section className="map-section" id="location">
      <div className="container">
        <h2 className="section-title">{t('mapTitle')}</h2>
        <p className="section-subtitle">{t('navAbout') === 'About' ? 'Located in the heart of Leander, we serve the entire Cedar Park and North Austin metropolitan area.' : 'Ubicados en el corazón de Leander, servimos a toda el área metropolitana de Cedar Park y el norte de Austin.'}</p>
        <div className="map-container">
          <iframe 
            src={standardEmbedUrl}
            width="100%" 
            height="450" 
            style={{ border: 0, borderRadius: '12px' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Solid State Construction Google Location"
          ></iframe>
        </div>
        <div className="map-info">
          <p><strong>{t('navAbout') === 'About' ? 'Location:' : 'Ubicación:'}</strong> Solid State Construction - Leander, TX</p>
          <a 
            href={mapsProfileUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary"
          >
            {t('navAbout') === 'About' ? 'View on Google Maps' : 'Ver en Google Maps'}
          </a>
        </div>
      </div>
    </section>
  )
}

export default MapSection
