import React, { useEffect } from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';
import Gallery from './Gallery';
import './GalleryPage.css';

export default function GalleryPage() {
  // Scroll to top when loading this page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="gallery-page">
      <div className="gallery-page-hero">
        <div className="container">
          <h1>Our Project Gallery</h1>
          <p className="subtitle">Explore our legacy-grade craftsmanship across Leander and North Austin—from emergency restoration to luxury custom remodeling.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '3rem 0 1rem' }}>
        <h2 className="section-title">Interactive Before & After Showcase</h2>
        <p className="section-subtitle" style={{ marginBottom: '2rem' }}>Drag the slider handle to see the transition from water damage to structural perfection.</p>
        
        <BeforeAfterSlider />
      </div>

      {/* Embedded Photo & Video Gallery Grid */}
      <Gallery />
    </div>
  );
}
