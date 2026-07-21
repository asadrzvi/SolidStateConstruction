import React, { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X, Phone, Globe } from 'lucide-react'
import logoLight from '../../public/logo.png'
import logoDark from '../../public/logo_dark.png'
import { useLanguage } from '../context/LanguageContext'
import './Navbar.css'

function Navbar({ onOpenQuote, currentPage, onPageChange }) {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
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
        <div className="nav-brand" onClick={handleBrandClick} style={{ cursor: 'pointer' }}>
          <img 
            src={isDark ? logoDark : logoLight} 
            alt="Solid State Construction Logo" 
            className="logo" 
          />
        </div>
        
        <div className="nav-right">
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'home', 'about')} className={currentPage === 'home' ? 'active-tab' : ''}>
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
              <Phone size={18} />
              {t('navPhone')}
            </a>
          </div>
          
          <div className="nav-actions">
            {/* Language Switcher */}
            <button className="lang-toggle-btn" onClick={toggleLanguage} title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}>
              <Globe size={18} />
              <span>{language === 'en' ? 'ESP' : 'ENG'}</span>
            </button>
            
            <button className="theme-toggle" onClick={toggleTheme} title="Toggle Dark Mode">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="menu-toggle" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
