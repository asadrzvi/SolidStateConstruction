import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Phone, Droplets, Video } from 'lucide-react'
// Served from public/ by URL — see note in BeforeAfterSlider: importing from
// public/ double-ships each asset. The hero video is now H.264 MP4 with
// faststart (was a 4.2MB QuickTime .MOV that aborted in some browsers).
//
// Background is an AI-generated (Google Flow) house-building time-lapse,
// autoplaying/looping on its own — NOT scroll-scrubbed, deliberately, per
// explicit direction. It sits behind the real "LIVE FIELD WORK" card below
// rather than replacing or competing with it (see the roast/reshape
// discussion, 2026-08-23): real footage stays the loudest trust signal,
// this is ambient background texture, no on-page disclosure badge (removed
// 2026-08-23 per explicit direction — it's decorative motion, not a claim
// being made about the work).
const heroBgVideo = '/images/hero-bg-video/build-timelapse.mp4'
const heroBgPoster = '/images/hero-bg-video/build-timelapse-poster.jpg'

// Short segments cut from the full job videos, each already sped up at encode
// time (cheaper than a high playbackRate, and it keeps the files small). The
// card plays one, then advances to the next.
const HERO_CLIPS = [
  { src: '/images/gallery/hero-formwork.mp4', poster: '/images/gallery/hero-formwork-poster.webp', caption: 'Custom Curved Driveway Formwork' },
  { src: '/images/gallery/hero-driveway-pour.mp4', poster: '/images/gallery/hero-driveway-pour-poster.webp', caption: 'Finished Driveway Pour' },
  { src: '/images/gallery/hero-tunnel.mp4', poster: '/images/gallery/hero-tunnel-poster.webp', caption: 'Tunnel Shoring & Ventilation' },
  { src: '/images/gallery/hero-crew.mp4', poster: '/images/gallery/hero-crew-poster.webp', caption: 'Crew Material Handling' },
]

import { useLanguage } from '../context/LanguageContext'
import './Hero.css'

function Hero({ onOpenQuote }) {
  const { t } = useLanguage();
  const videoRef = useRef(null);
  const [clipIndex, setClipIndex] = useState(0);
  const clip = HERO_CLIPS[clipIndex];

  const nextClip = useCallback(() => {
    setClipIndex((i) => (i + 1) % HERO_CLIPS.length);
  }, []);

  // Load and play whenever the clip changes. The first clip is left to the
  // autoPlay attribute so we don't fight the browser on initial load.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    // A rejected play() just means autoplay is blocked; the poster stays up
    // and the onEnded handler never fires, which is the correct fallback.
    v.play().catch(() => {});
  }, [clipIndex]);

  // load() resets playbackRate to defaultPlaybackRate, so setting the rate
  // before it silently did nothing. Apply it once metadata is in.
  const handleLoadedMetadata = useCallback((e) => {
    e.currentTarget.playbackRate = 1.25;
  }, []);

  // If a clip fails to load, skip past it rather than stalling the cycle.
  const handleError = useCallback(() => {
    nextClip();
  }, [nextClip]);

  return (
    <section className="hero">
      <video
        className="hero-bg-video"
        src={heroBgVideo}
        poster={heroBgPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
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
                  className="hero-card-video"
                />
                <div className="video-progress" aria-hidden="true">
                  {HERO_CLIPS.map((c, i) => (
                    <span
                      key={c.src}
                      className={`video-progress-dot${i === clipIndex ? ' is-active' : ''}`}
                    />
                  ))}
                </div>
              </div>
              <div className="video-card-footer">
                <span>{clip.caption}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
