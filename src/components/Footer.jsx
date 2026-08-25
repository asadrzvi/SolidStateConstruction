import React from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import './Footer.css'

function Footer({ onPageChange }) {
  const { t } = useLanguage();

  const handlePrivacyClick = (e) => {
    if (onPageChange) {
      e.preventDefault();
      onPageChange('privacy-policy');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-info">
            <h3>Solid State Construction</h3>
            <p>{t('footTagline')}</p>
          </div>
          <div className="footer-contact">
            <h4>{t('navAbout') === 'About' ? 'Contact Us' : 'Contáctenos'}</h4>
            <ul>
              <li><MapPin size={18} /> 1101 Halsey Drive, Leander, TX 78641</li>
              <li>
                <a href="tel:512-595-2332" style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Phone size={18} /> (512) 595-2332
                </a>
              </li>
              <li>
                <a href="mailto:contact@solidstatesconstruction.com" style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Mail size={18} /> contact@solidstatesconstruction.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Solid State Construction. {t('footRights')}</p>
          <p className="footer-legal-links">
            <a href="/privacy-policy/" onClick={handlePrivacyClick}>Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
