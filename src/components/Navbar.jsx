import React, { useState } from 'react'
import { Sun, Moon, Menu, X, Phone } from 'lucide-react'
import logoLight from '../../public/logo.png'
import logoDark from '../../public/logo_dark.png'
import './Navbar.css'

function Navbar() {
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

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-brand">
          <img 
            src={isDark ? logoDark : logoLight} 
            alt="Solid State Construction Logo" 
            className="logo" 
          />
        </div>
        
        <div className="nav-right">
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#gallery" onClick={() => setIsMenuOpen(false)}>Gallery</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
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
