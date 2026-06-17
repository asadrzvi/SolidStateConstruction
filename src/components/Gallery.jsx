import React, { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import './Gallery.css'

const images = [
  { src: '/images/gallery/job1.jpg', alt: 'Job Site 1' },
  { src: '/images/gallery/job2.jpg', alt: 'Job Site 2' },
  { src: '/images/gallery/job3.jpg', alt: 'Job Site 3' },
  { src: '/images/gallery/job4.jpg', alt: 'Job Site 4' },
  { src: '/images/gallery/job5.jpg', alt: 'Job Site 5' }
]

function Gallery() {
  const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 })

  const openLightbox = (index) => {
    setLightbox({ isOpen: true, index })
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightbox({ isOpen: false, index: 0 })
    document.body.style.overflow = 'unset'
  }

  const nextImage = (e) => {
    e.stopPropagation()
    setLightbox(prev => ({ ...prev, index: (prev.index + 1) % images.length }))
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setLightbox(prev => ({ ...prev, index: (prev.index - 1 + images.length) % images.length }))
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.isOpen) return
      if (e.key === 'ArrowRight') nextImage(e)
      if (e.key === 'ArrowLeft') prevImage(e)
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightbox.isOpen])

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <h2 className="section-title">Our Work in Action</h2>
        <p className="section-subtitle">Real photos from our recent job sites in Leander and North Austin. Quality craftsmanship you can see.</p>
        <div className="gallery-grid">
          {images.map((img, index) => (
            <div 
              className="gallery-item" 
              key={index}
              onClick={() => openLightbox(index)}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="gallery-overlay">
                <span>View Image</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox.isOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <X size={32} />
          </button>
          
          <button className="lightbox-prev" onClick={prevImage}>
            <ChevronLeft size={48} />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={images[lightbox.index].src} 
              alt={images[lightbox.index].alt} 
            />
            <div className="lightbox-caption">
              {images[lightbox.index].alt} ({lightbox.index + 1} / {images.length})
            </div>
          </div>
          
          <button className="lightbox-next" onClick={nextImage}>
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </section>
  )
}

export default Gallery
