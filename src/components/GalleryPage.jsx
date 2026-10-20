import React, { useEffect } from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';
import Gallery from './Gallery';
import Reveal from './Reveal';
import { useLanguage } from '../context/LanguageContext';
import useBackgroundVideo from '../hooks/useBackgroundVideo';
import './GalleryPage.css';

// Hero background: an AI-generated (Google Flow) concrete-pour time-lapse,
// decorative texture only, never shown as one of the real job photos below.
// Mounted on wide screens only; phones get the poster.
const heroVideo = '/images/gallery-bg-video/concrete-pour.mp4';
const heroPoster = '/images/gallery-bg-video/concrete-pour-poster.jpg';

export default function GalleryPage() {
  const { t } = useLanguage();
  const showVideo = useBackgroundVideo(768);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="gallery-page">
      <header className="gallery-hero" aria-labelledby="gallery-page-title">
        <div className="gallery-hero-media" aria-hidden="true">
          <img className="gallery-hero-poster" src={heroPoster} alt="" fetchpriority="high" decoding="async" />
          {showVideo && (
            <video
              className="gallery-hero-video"
              src={heroVideo}
              poster={heroPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          )}
          <div className="gallery-hero-scrim" />
        </div>
        <div className="container gallery-hero-inner">
          <p className="eyebrow on-dark">{t('galEyebrow')}</p>
          <h1 id="gallery-page-title">{t('galPageTitle')}</h1>
          <p className="gallery-hero-sub">{t('galPageSub')}</p>
        </div>
      </header>

      <section className="gallery-compare" aria-labelledby="compare-title">
        <div className="container gallery-compare-grid">
          <Reveal className="gallery-compare-copy">
            <p className="eyebrow">{t('galSliderEyebrow')}</p>
            <h2 id="compare-title">{t('galSliderTitle')}</h2>
            <p className="lede">{t('galSliderSub')}</p>
          </Reveal>
          <Reveal delay={100}>
            <BeforeAfterSlider
              beforeLabel={t('galBeforeLabel')}
              afterLabel={t('galAfterLabel')}
            />
          </Reveal>
        </div>
      </section>

      <Gallery />
    </div>
  );
}
