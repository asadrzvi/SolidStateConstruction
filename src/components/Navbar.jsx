import React, { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X, Phone, Globe } from 'lucide-react'
const logoLight = '/logo.png?v=2'
const logoDark = '/logo_dark.png?v=2'
import { useLanguage } from '../context/LanguageContext'
import './Navbar.css'

function Navbar({ onOpenQuote, currentPage, onPageChange }) {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setIsDark(savedTheme === 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Escape closes the mobile drawer.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  const handleBrandClick = () => {
    onPageChange('home');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e, targetPage, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    onPageChange(targetPage);
    
    if (targetPage === 'home' && targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <a href="/" className="nav-brand" onClick={(e) => { e.preventDefault(); handleBrandClick(); }} aria-label="Solid State Construction home">
          <img
            src={isDark ? logoDark : logoLight}
            alt="Solid State Construction"
            className="logo"
            width="210"
            height="211"
          />
        </a>

        <div className="nav-right">
          <div id="primary-nav" className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'home', 'about')}>
              {t('navAbout')}
            </a>
            <a href="#services" onClick={(e) => handleLinkClick(e, 'home', 'services')}>
              {t('navServices')}
            </a>
            <a href="#gallery" onClick={(e) => handleLinkClick(e, 'gallery', 'gallery')} className={currentPage === 'gallery' ? 'active-tab' : ''}>
              {t('navGallery')}
            </a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, 'home', 'contact')}>
              {t('navContact')}
            </a>
            <button 
              className="btn btn-primary quote-btn" 
              onClick={() => {
                onOpenQuote();
                setIsMenuOpen(false);
              }}
            >
              {t('navQuoteBtn')}
            </button>
            <a href="tel:512-595-2332" className="nav-phone">
              <Phone size={18} aria-hidden="true" />
              {t('navPhone')}
            </a>
          </div>

          <div className="nav-actions">
            {/* Language Switcher */}
            <button
              className="lang-toggle-btn"
              onClick={toggleLanguage}
              title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
              aria-label={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
            >
              <Globe size={18} aria-hidden="true" />
              <span>{language === 'en' ? 'ESP' : 'ENG'}</span>
            </button>

            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
            >
              {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
            </button>
            <button
              className="menu-toggle"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="primary-nav"
            >
              {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
