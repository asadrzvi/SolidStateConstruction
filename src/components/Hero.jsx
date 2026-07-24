import React from 'react'
import { Phone, Droplets } from 'lucide-react'
import heroBg from '../../public/images/hero_bg.jpg'
import { useLanguage } from '../context/LanguageContext'
import './Hero.css'

function Hero({ onOpenQuote }) {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        poster={heroBg}
        className="hero-bg-video"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-heavy-machinery-and-workers-at-a-construction-site-41551-large.mp4" type="video/mp4" />
        <source src="/images/gallery/1355c929-7170-4657-976e-dc071c72978f.MOV" type="video/mp4" />
      </video>
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
