import React from 'react'
import { Phone, Droplets } from 'lucide-react'
import heroBg from '../../public/images/hero_bg.jpg'
import { useLanguage } from '../context/LanguageContext'
import './Hero.css'

function Hero({ onOpenQuote }) {
  const { t } = useLanguage();

  return (
    <section 
      className="hero"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroBg})` }}
    >
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <div className="emergency-badge">
            <Droplets className="emergency-icon" />
            <span>{t('heroBadge')}</span>
          </div>
          <h1>{t('heroTitle')}</h1>
          <p className="hero-subtitle">{t('heroSubtitle')}</p>
          <div className="hero-cta">
            <a href="tel:512-595-2332" className="btn btn-primary">
              <Phone size={20} />
              {t('heroCallCta')}
            </a>
            <button onClick={onOpenQuote} className="btn btn-secondary">
              {t('heroQuoteCta')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
