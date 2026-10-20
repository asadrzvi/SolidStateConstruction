import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Footer.css'

const logoDark = '/logo_dark.png?v=3'

function Footer({ onPageChange }) {
  const { t } = useLanguage();

  const go = (page, id) => (e) => {
    if (!onPageChange) return;
    e.preventDefault();
    onPageChange(page);
    if (page === 'home' && id) {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" onClick={go('home')} className="footer-logo" aria-label="Solid State Construction, home">
              <span className="footer-mark" aria-hidden="true">
                <img src={logoDark} alt="" width="210" height="211" />
              </span>
              <span>
                <span>Solid State</span>
                <span>Construction</span>
              </span>
            </a>
            <p className="footer-tagline">{t('footTagline')}</p>
          </div>

          <nav className="footer-col" aria-label={t('footCompany')}>
            <h4>{t('footCompany')}</h4>
            <ul>
              <li><a href="/#about" onClick={go('home', 'about')}>{t('navAbout')}</a></li>
              <li><a href="/#services" onClick={go('home', 'services')}>{t('navServices')}</a></li>
              <li><a href="/gallery/" onClick={go('gallery')}>{t('navGallery')}</a></li>
              <li><a href="/#contact" onClick={go('home', 'contact')}>{t('navContact')}</a></li>
            </ul>
          </nav>

          <div className="footer-col">
            <h4>{t('footContact')}</h4>
            <ul>
              <li><a href="tel:512-595-2332" className="num">(512) 595-2332</a></li>
              <li><a href="mailto:contact@solidstatesconstruction.com">contact@solidstatesconstruction.com</a></li>
              <li><span>1101 Halsey Drive, Leander, TX 78641</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Solid State Construction. {t('footRights')}</p>
          <a href="/privacy-policy/" onClick={go('privacy-policy')}>{t('footPrivacy')}</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
