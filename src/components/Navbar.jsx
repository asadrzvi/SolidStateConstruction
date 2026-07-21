import React, { useState } from 'react'
import { Sun, Moon, Menu, X, Phone } from 'lucide-react'
import logoLight from '../../public/logo.png'
import logoDark from '../../public/logo_dark.png'
import './Navbar.css'

function Navbar({ onOpenQuote, currentPage, onPageChange }) {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
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
            <a href="#about" onClick={(e) => handleLinkClick(e, 'home', 'about')} className={currentPage === 'home' ? 'active-tab' : ''}>About</a>
            <a href="#services" onClick={(e) => handleLinkClick(e, 'home', 'services')}>Services</a>
            <a href="#gallery" onClick={(e) => handleLinkClick(e, 'gallery', 'gallery')} className={currentPage === 'gallery' ? 'active-tab' : ''}>Gallery</a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, 'home', 'contact')}>Contact</a>
            <button 
              className="btn btn-primary quote-btn" 
              onClick={() => {
                onOpenQuote();
                setIsMenuOpen(false);
              }}
            >
              Get Free Quote
            </button>
            <a href="tel:512-595-2332" className="nav-phone">
              <Phone size={18} />
              (512) 595-2332
            </a>
          </div>
          
          <div className="nav-actions">
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
