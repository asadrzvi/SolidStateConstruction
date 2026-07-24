import React, { useRef, useEffect } from 'react'
import { Phone, Droplets } from 'lucide-react'
import heroBg from '../../public/images/hero_bg.jpg'
import headerVid from '../../public/images/gallery/e72b06a0-2677-4b84-a035-bb064c9061eb.MOV'
import { useLanguage } from '../context/LanguageContext'
import './Hero.css'

function Hero({ onOpenQuote }) {
  const { t } = useLanguage();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.35; // Sped up 1.35x for active motion
    }
  }, []);

  return (
    <section className="hero">
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline 
        poster={heroBg}
        className="hero-bg-video"
      >
        <source src={headerVid} type="video/quicktime" />
        <source src={headerVid} type="video/mp4" />
        <source src="/images/gallery/e72b06a0-2677-4b84-a035-bb064c9061eb.MOV" type="video/quicktime" />
        <source src="/images/gallery/e72b06a0-2677-4b84-a035-bb064c9061eb.MOV" type="video/mp4" />
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
