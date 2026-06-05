import React from 'react'
import './Gallery.css'

const images = [
  { src: '/images/gallery/job1.jpg', alt: 'Job Site 1' },
  { src: '/images/gallery/job2.jpg', alt: 'Job Site 2' },
  { src: '/images/gallery/job3.jpg', alt: 'Job Site 3' },
  { src: '/images/gallery/job4.jpg', alt: 'Job Site 4' },
  { src: '/images/gallery/job5.jpg', alt: 'Job Site 5' }
]

function Gallery() {
  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <h2 className="section-title">Our Work in Action</h2>
        <p className="section-subtitle">Real photos from our recent job sites in Leander and North Austin. Quality craftsmanship you can see.</p>
        <div className="gallery-grid">
          {images.map((img, index) => (
            <div className="gallery-item" key={index}>
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
