import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Phone, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import useBackgroundVideo from '../hooks/useBackgroundVideo'
import './Hero.css'

// Background: an AI-generated (Google Flow) build time-lapse used as ambient
// texture only. It is mounted on wide screens without reduced-motion or
// reduced-data preferences; phones get the poster and never fetch the file.
// The real job-site clips in the card are the trust signal, so they always
// play.
const heroBgVideo = '/images/hero-bg-video/build-timelapse.mp4'
const heroBgPoster = '/images/hero-bg-video/build-timelapse-poster.jpg'

// Short segments cut from the full job videos, already sped up at encode time.
const HERO_CLIPS = [
  { src: '/images/gallery/hero-formwork.mp4', poster: '/images/gallery/hero-formwork-poster.webp', captionKey: 'heroClip1' },
  { src: '/images/gallery/hero-driveway-pour.mp4', poster: '/images/gallery/hero-driveway-pour-poster.webp', captionKey: 'heroClip2' },
  { src: '/images/gallery/hero-tunnel.mp4', poster: '/images/gallery/hero-tunnel-poster.webp', captionKey: 'heroClip3' },
  { src: '/images/gallery/hero-crew.mp4', poster: '/images/gallery/hero-crew-poster.webp', captionKey: 'heroClip4' },
]

function Hero({ onOpenQuote }) {
  const { t } = useLanguage();
  const videoRef = useRef(null);
  const [clipIndex, setClipIndex] = useState(0);
  const clip = HERO_CLIPS[clipIndex];
  const showBgVideo = useBackgroundVideo(768);

  const nextClip = useCallback(() => {
    setClipIndex((i) => (i + 1) % HERO_CLIPS.length);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {});
  }, [clipIndex]);

  const handleLoadedMetadata = useCallback((e) => {
    e.currentTarget.playbackRate = 1.25;
  }, []);

  const handleError = useCallback(() => {
    nextClip();
  }, [nextClip]);

  const facts = ['heroFact1', 'heroFact2', 'heroFact3', 'heroFact4'];

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <img className="hero-bg-poster" src={heroBgPoster} alt="" fetchpriority="high" decoding="async" />
        {showBgVideo && (
          <video
            className="hero-bg-video"
            src={heroBgVideo}
            poster={heroBgPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}
        <div className="hero-scrim" />
      </div>

      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow on-dark hero-eyebrow">{t('heroEyebrow')}</p>
          <h1 id="hero-title">{t('heroTitle')}</h1>
          <p className="hero-sub">{t('heroSubtitle')}</p>
          <div className="hero-cta">
            <a href="tel:512-595-2332" className="btn btn-primary btn-lg">
              <Phone size={18} strokeWidth={1.75} />
              {t('heroCallCta')}
            </a>
            <button type="button" onClick={onOpenQuote} className="btn btn-outline on-dark btn-lg">
              {t('heroQuoteCta')}
              <ArrowRight size={18} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <figure className="hero-clip">
          <div className="hero-clip-frame">
            <video
              ref={videoRef}
              key={clip.src}
              src={clip.src}
              poster={clip.poster}
              autoPlay
              muted
              playsInline
              preload="auto"
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={nextClip}
              onError={handleError}
              className="hero-clip-video"
            />
            <div className="hero-clip-progress" aria-hidden="true">
              {HERO_CLIPS.map((c, i) => (
                <span key={c.src} className={`hero-clip-dot${i === clipIndex ? ' is-active' : ''}`} />
              ))}
            </div>
          </div>
          <figcaption className="hero-clip-caption">
            <span className="hero-clip-label">
              <span className="hero-clip-live" />
              {t('heroClipLabel')}
            </span>
            <span className="hero-clip-title">{t(clip.captionKey)}</span>
          </figcaption>
        </figure>
      </div>

      <div className="container">
        <ul className="hero-facts" aria-label="Key facts">
          {facts.map((k) => (
            <li key={k}>{t(k)}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Hero
