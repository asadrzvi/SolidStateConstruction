import React, { useRef, useEffect } from 'react'
import { Phone, Droplets, Video } from 'lucide-react'
// Served from public/ by URL — see note in BeforeAfterSlider: importing from
// public/ double-ships each asset. The hero video is now H.264 MP4 with
// faststart (was a 4.2MB QuickTime .MOV that aborted in some browsers).
const heroBg = '/images/hero_bg.webp'
const headerVid = '/images/gallery/e72b06a0-2677-4b84-a035-bb064c9061eb.mp4'
const headerVidPoster = '/images/gallery/e72b06a0-2677-4b84-a035-bb064c9061eb-poster.webp'
import { useLanguage } from '../context/LanguageContext'
import './Hero.css'

function Hero({ onOpenQuote }) {
  const { t } = useLanguage();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.25;
    }
  }, []);

  return (
    <section className="hero">
      <div 
        className="hero-bg-img"
        style={{ backgroundImage: `url(${heroBg})` }}
      ></div>
      <div className="hero-overlay"></div>
      
      <div className="container hero-container">
        <div className="hero-split-grid">
          {/* Left Column: Headlines & CTAs */}
          <div className="hero-content-col">
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

          {/* Right Column: Native HD Floating Video Showcase Card */}
          <div className="hero-video-col">
            <div className="hero-video-card">
              <div className="video-card-badge">
                <Video size={16} />
                <span>LIVE FIELD WORK &bull; LEANDER TX</span>
              </div>
              <div className="video-wrapper">
                <video
                  ref={videoRef}
                  src={headerVid}
                  poster={headerVidPoster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="hero-card-video"
                />
              </div>
              <div className="video-card-footer">
                <span>Custom Curved Driveway Formwork</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
