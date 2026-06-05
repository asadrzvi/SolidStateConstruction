import React, { useState } from 'react'
import { Sun, Moon, Menu, X, Phone } from 'lucide-react'
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
            src={isDark ? "/logo_dark.png" : "/logo.png"} 
            alt="Solid State Construction Logo" 
            className="logo" 
          />
        </div>
        
        <div className="nav-right">
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            <a href="tel:207-482-9763" className="nav-phone">
              <Phone size={18} />
              (207) 482-9763
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
