import React, { useState, useEffect, useCallback } from 'react'
import { Phone } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import './Navbar.css'

const logoLight = '/logo.png?v=3'
const logoDark = '/logo_dark.png?v=3'

function Navbar({ onOpenQuote, currentPage, onPageChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  // Over the dark hero the bar is transparent with the white mark; once the
  // page scrolls it becomes a solid light bar with a hairline.
  const onDarkHero = currentPage === 'home' || currentPage === 'gallery';
  const transparent = onDarkHero && !scrolled && !isMenuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  const handleBrandClick = useCallback((e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    onPageChange('home');
  }, [onPageChange]);

  const handleLinkClick = (e, targetPage, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    onPageChange(targetPage);
    if (targetPage === 'home' && targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  };

  const links = [
    { key: 'navAbout', page: 'home', id: 'about' },
    { key: 'navServices', page: 'home', id: 'services' },
    { key: 'navGallery', page: 'gallery', id: null },
    { key: 'navContact', page: 'home', id: 'contact' },
  ];

  const hrefFor = (l) => (l.page === 'gallery' ? '/gallery/' : `/#${l.id}`);
  const isActive = (l) => (l.page === 'gallery' ? currentPage === 'gallery' : false);

  return (
    <header className={`navbar${transparent ? ' is-transparent' : ''}${isMenuOpen ? ' is-open' : ''}`}>
      <nav className="container navbar-inner" aria-label="Primary">
        <a href="/" className="nav-brand" onClick={handleBrandClick} aria-label="Solid State Construction, home">
          <span className="nav-mark" aria-hidden="true">
            <img src={logoLight} alt="" className="nav-logo nav-logo-light" width="210" height="211" />
            <img src={logoDark} alt="" className="nav-logo nav-logo-dark" width="210" height="211" />
          </span>
          <span className="nav-wordmark">
            <span>Solid State</span>
            <span>Construction</span>
          </span>
        </a>

        <ul className="nav-links" id="primary-menu">
          {links.map((l, i) => (
            <li key={l.key} style={{ '--i': i }}>
              <a
                href={hrefFor(l)}
                onClick={(e) => handleLinkClick(e, l.page, l.id)}
                className={isActive(l) ? 'is-active' : ''}
                aria-current={isActive(l) ? 'page' : undefined}
              >
                {t(l.key)}
              </a>
            </li>
          ))}
          <li className="nav-links-mobile-extra" style={{ '--i': links.length }}>
            <a href="tel:512-595-2332" className="nav-mobile-phone">
              <Phone size={20} strokeWidth={1.75} />
              {t('navPhone')}
            </a>
          </li>
          <li className="nav-links-mobile-extra" style={{ '--i': links.length + 1 }}>
            <button type="button" className="nav-mobile-lang" onClick={toggleLanguage}>
              {language === 'en' ? 'Español' : 'English'}
            </button>
          </li>
        </ul>

        <div className="nav-actions">
          <button
            type="button"
            className="nav-lang"
            onClick={toggleLanguage}
            aria-label={t('navLangSwitch')}
            title={t('navLangSwitch')}
          >
            {language === 'en' ? 'ES' : 'EN'}
          </button>
          <a href="tel:512-595-2332" className="nav-phone" aria-label={`${t('navCallLabel')} ${t('navPhone')}`}>
            <Phone size={18} strokeWidth={1.75} />
            <span>{t('navPhone')}</span>
          </a>
          <button type="button" className="btn btn-primary nav-quote" onClick={onOpenQuote}>
            {t('navQuoteBtn')}
          </button>
          <button
            type="button"
            className="nav-burger"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-expanded={isMenuOpen}
            aria-controls="primary-menu"
            aria-label={isMenuOpen ? t('navMenuClose') : t('navMenuOpen')}
          >
            <span className="nav-burger-bar" />
            <span className="nav-burger-bar" />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
