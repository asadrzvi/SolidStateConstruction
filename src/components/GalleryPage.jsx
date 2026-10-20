import React, { useEffect } from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';
import Gallery from './Gallery';
import { useLanguage } from '../context/LanguageContext';
import './GalleryPage.css';

export default function GalleryPage() {
  const { t } = useLanguage();

  // Scroll to top when loading this page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="gallery-page">
      <div className="gallery-page-hero">
        {/* AI-generated (Google Flow) concrete-pour time-lapse — decorative
            background texture only, no on-page disclosure (removed
            2026-08-23 per explicit direction). Never presented as one of
            the real job photos in the grid below it. */}
        <video
          className="gallery-hero-bg-video"
          src="/images/gallery-bg-video/concrete-pour.mp4"
          poster="/images/gallery-bg-video/concrete-pour-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="gallery-hero-scrim"></div>
        <div className="gallery-hero-logo-bg"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="gallery-hero-badge">Verified Construction Showcase &bull; Leander &amp; Austin TX</span>
          <h1>{t('galPageTitle')}</h1>
          <p className="gallery-hero-subtitle">{t('galPageSub')}</p>
        </div>
      </div>

      <div className="container" style={{ padding: '3rem 0 1rem' }}>
        <h2 className="section-title">{t('galSliderTitle')}</h2>
        <p className="section-subtitle" style={{ marginBottom: '2rem' }}>{t('galSliderSub')}</p>
        
        <BeforeAfterSlider 
          beforeLabel={t('galBeforeLabel')}
          afterLabel={t('galAfterLabel')}
        />
      </div>

      {/* Embedded Photo & Video Gallery Grid */}
      <Gallery />
    </div>
  );
}
