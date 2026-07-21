import React from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import './Footer.css'

function Footer() {
  const { t } = useLanguage();

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
              <li><Phone size={18} /> (512) 595-2332</li>
              <li><Mail size={18} /> contact@solidstateconstruction.com</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Solid State Construction. {t('footRights')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
