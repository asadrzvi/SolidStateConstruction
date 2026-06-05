import React from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-info">
            <h3>Solid State Construction</h3>
            <p>Your local Leander construction and restoration specialists. Quality craftsmanship, every time.</p>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <ul>
              <li><MapPin size={18} /> 1101 Halsey Drive, Leander, TX 78641</li>
              <li><Phone size={18} /> (207) 482-9763</li>
              <li><Mail size={18} /> contact@solidstateconstruction.com</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Solid State Construction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
