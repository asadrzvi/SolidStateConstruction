import React from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import './Footer.css'

function Footer({ onPageChange }) {
  const { t } = useLanguage();

  const handlePageLink = (e, page) => {
    if (onPageChange) {
      e.preventDefault();
      onPageChange(page);
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
            <h4>{t('footContactTitle')}</h4>
            <ul>
              <li><MapPin size={18} aria-hidden="true" /> 1101 Halsey Drive, Leander, TX 78641</li>
              <li>
                <a href="tel:512-595-2332" className="footer-link">
                  <Phone size={18} aria-hidden="true" /> (512) 595-2332
                </a>
              </li>
              <li>
                <a href="mailto:contact@solidstatesconstruction.com" className="footer-link">
                  <Mail size={18} aria-hidden="true" /> contact@solidstatesconstruction.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Solid State Construction. {t('footRights')}</p>
          <p className="footer-legal-links">
            <a href="/gallery/" onClick={(e) => handlePageLink(e, 'gallery')}>{t('footGalleryLink')}</a>
            <span aria-hidden="true"> &middot; </span>
            <a href="/privacy-policy/" onClick={(e) => handlePageLink(e, 'privacy-policy')}>{t('footPrivacyLink')}</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
