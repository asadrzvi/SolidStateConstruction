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
