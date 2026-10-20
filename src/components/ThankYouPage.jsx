import React, { useEffect } from 'react'
import { CheckCircle2, Phone, Home, Image as ImageIcon } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import './ThankYouPage.css'

function ThankYouPage({ submittedService, submittedName, onReturnHome, onGoGallery }) {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="thank-you-page">
      <div className="container">
        <div className="thank-you-card">
          <div className="thank-you-card-logo-bg"></div>
          <div className="thank-you-icon-wrapper">
            <CheckCircle2 size={72} className="check-icon" />
          </div>

          <span className="thank-you-badge">Request Received</span>

          <h1 className="thank-you-title">
            {submittedName ? `Thank You, ${submittedName}!` : 'Thank You! We Have Your Request.'}
          </h1>

          <p className="thank-you-subtitle">
            Your request has reached <strong>Solid State Construction</strong>.
            Shaan or someone from our team will reach out within 24 hours to go over your project and schedule a walkthrough.
          </p>

          {submittedService && (
            <div className="submitted-details-box">
              <span className="details-label">Requested Service Category:</span>
              <span className="details-value">{submittedService}</span>
            </div>
          )}

          <div className="emergency-callout-box">
            <div className="callout-header">
              <Phone size={22} className="phone-icon" />
              <h3>Need Help Right Now?</h3>
            </div>
            <p>For emergencies, skip the wait and call us directly:</p>
            <a href="tel:512-595-2332" className="btn btn-emergency-call">
              <Phone size={18} />
              Call Now: (512) 595-2332
            </a>
          </div>

          <div className="thank-you-actions">
            <button onClick={onReturnHome} className="btn btn-primary">
              <Home size={18} />
              Return to Home Page
            </button>
            <button onClick={onGoGallery} className="btn btn-secondary">
              <ImageIcon size={18} />
              View Project Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThankYouPage
