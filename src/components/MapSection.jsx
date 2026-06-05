import React from 'react'
import './MapSection.css'

function MapSection() {
  const address = "1101 Halsey Drive, Leander, TX 78641";
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=REPLACE_WITH_API_KEY&q=${encodeURIComponent(address)}`;
  
  // Note: Using a standard embed link for now since we don't have an API key. 
  // Standard embed allows viewing and getting directions but without the Maps API key complexity.
  const standardEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3434.341108153401!2d-97.8761273!3d30.5901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b2d7f8d7f8d7f%3A0x8d7f8d7f8d7f8d7f!2s1101%20Halsey%20Dr%2C%20Leander%2C%20TX%2078641!5e0!3m2!1sen!2sus!4v1717545600000!5m2!1sen!2sus";

  return (
    <section className="map-section" id="location">
      <div className="container">
        <h2 className="section-title">Where to Find Us</h2>
        <p className="section-subtitle">Located in the heart of Leander, we serve the entire Cedar Park and North Austin metropolitan area.</p>
        <div className="map-container">
          <iframe 
            src={standardEmbedUrl}
            width="100%" 
            height="450" 
            style={{ border: 0, borderRadius: '12px' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Solid State Construction Location"
          ></iframe>
        </div>
        <div className="map-info">
          <p><strong>Address:</strong> 1101 Halsey Drive, Leander, TX 78641</p>
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=1101+Halsey+Drive+Leander+TX+78641" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  )
}

export default MapSection
