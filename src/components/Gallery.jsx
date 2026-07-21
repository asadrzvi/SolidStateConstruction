import React, { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Play, Video } from 'lucide-react'
import './Gallery.css'

const media = [
  { type: 'image', src: '/images/gallery/job1.jpg', alt: 'Kitchen Remodeling Project' },
  { type: 'image', src: '/images/gallery/job2.jpg', alt: 'Bathroom Tiling Detail' },
  { type: 'image', src: '/images/gallery/job3.jpg', alt: 'Custom Remodel In Progress' },
  { type: 'image', src: '/images/gallery/job4.jpg', alt: 'Professional Paint & Trim' },
  { type: 'image', src: '/images/gallery/job5.jpg', alt: 'Exterior Painting Project' },
  { type: 'image', src: '/images/gallery/7e6da58d-6958-47f1-a51b-eacbdb61c97b.JPG', alt: 'Precision Concrete Formwork Detail' },
  { type: 'image', src: '/images/gallery/5c7e3f06-c5d5-4305-943c-21da6bd90e65.JPG', alt: 'Finished Reinforced Concrete Slab' },
  { type: 'video', src: '/images/gallery/1355c929-7170-4657-976e-dc071c72978f.MOV', alt: 'Active Concrete Pouring and Distribution' },
  { type: 'video', src: '/images/gallery/e72b06a0-2677-4b84-a035-bb064c9061eb.MOV', alt: 'Precision Leveling and Broom Finishing' },
  { type: 'image', src: '/images/gallery/bef9dd32-cf08-404f-8424-f8407dd97bd7.JPG', alt: 'Slab Foundation Rebar Reinforcement' }
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
    setLightbox(prev => ({ ...prev, index: (prev.index + 1) % media.length }))
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setLightbox(prev => ({ ...prev, index: (prev.index - 1 + media.length) % media.length }))
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
        <p className="section-subtitle">Real photos and videos from our recent job sites in Leander and North Austin. Quality craftsmanship you can see.</p>
        <div className="gallery-grid">
          {media.map((item, index) => (
            <div 
              className="gallery-item" 
              key={index}
              onClick={() => openLightbox(index)}
            >
              {item.type === 'video' ? (
                <div className="video-thumbnail-container">
                  <video 
                    src={item.src} 
                    muted 
                    playsInline 
                    loop 
                    className="gallery-video-preview"
                    preload="metadata"
                  />
                  <div className="video-badge">
                    <Video size={16} className="video-icon" />
                    <span>VIDEO</span>
                  </div>
                </div>
              ) : (
                <img src={item.src} alt={item.alt} loading="lazy" />
              )}
              <div className="gallery-overlay">
                <div className="overlay-content">
                  {item.type === 'video' && <Play size={24} className="play-icon-overlay" />}
                  <span>{item.type === 'video' ? 'Play Video' : 'View Image'}</span>
                </div>
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
            {media[lightbox.index].type === 'video' ? (
              <video 
                src={media[lightbox.index].src} 
                controls 
                autoPlay 
                className="lightbox-video"
              />
            ) : (
              <img 
                src={media[lightbox.index].src} 
                alt={media[lightbox.index].alt} 
              />
            )}
            <div className="lightbox-caption">
              {media[lightbox.index].alt} ({lightbox.index + 1} / {media.length})
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
