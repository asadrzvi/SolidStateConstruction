import React, { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import './Gallery.css'

// WebP throughout, except job2 where WebP came out larger than the source JPEG.
// Videos are H.264 MP4 with faststart and carry a poster so the grid paints
// before any video byte is fetched.
const media = [
  { type: 'image', src: '/images/gallery/job1.webp', alt: 'Kitchen remodeling project', altEs: 'Proyecto de remodelación de cocina' },
  { type: 'image', src: '/images/gallery/job2.jpg', alt: 'Bathroom tiling detail', altEs: 'Detalle de azulejo en baño' },
  { type: 'image', src: '/images/gallery/job3.webp', alt: 'Custom remodel in progress', altEs: 'Remodelación a medida en proceso' },
  { type: 'image', src: '/images/gallery/job4.webp', alt: 'Paint and trim work', altEs: 'Pintura y molduras' },
  { type: 'image', src: '/images/gallery/job5.webp', alt: 'Exterior painting project', altEs: 'Proyecto de pintura exterior' },
  { type: 'image', src: '/images/gallery/7e6da58d-6958-47f1-a51b-eacbdb61c97b.webp', alt: 'Concrete formwork detail', altEs: 'Detalle de cimbra de concreto' },
  { type: 'image', src: '/images/gallery/5c7e3f06-c5d5-4305-943c-21da6bd90e65.webp', alt: 'Finished reinforced concrete slab', altEs: 'Losa de concreto reforzado terminada' },
  {
    type: 'video',
    src: '/images/gallery/1355c929-7170-4657-976e-dc071c72978f.mp4',
    poster: '/images/gallery/1355c929-7170-4657-976e-dc071c72978f-poster.webp',
    alt: 'Concrete pour and distribution',
    altEs: 'Vaciado y distribución de concreto'
  },
  {
    type: 'video',
    src: '/images/gallery/e72b06a0-2677-4b84-a035-bb064c9061eb.mp4',
    poster: '/images/gallery/e72b06a0-2677-4b84-a035-bb064c9061eb-poster.webp',
    alt: 'Curved driveway formwork',
    altEs: 'Cimbra para entrada curva'
  },
  { type: 'image', src: '/images/gallery/bef9dd32-cf08-404f-8424-f8407dd97bd7.webp', alt: 'Slab foundation rebar reinforcement', altEs: 'Refuerzo de varilla para losa de cimentación' },
  {
    type: 'video',
    src: '/images/gallery/work-tunnel-shoring.mp4',
    poster: '/images/gallery/work-tunnel-shoring-poster.webp',
    alt: 'Timber-shored access tunnel with forced-air ventilation',
    altEs: 'Túnel de acceso apuntalado con madera y ventilación forzada'
  },
  {
    type: 'video',
    src: '/images/gallery/work-crew-material-chain.mp4',
    poster: '/images/gallery/work-crew-material-chain-poster.webp',
    alt: 'Crew moving material bags across a driveway job site',
    altEs: 'Cuadrilla moviendo sacos de material en una obra de entrada'
  },
  {
    type: 'video',
    src: '/images/gallery/work-bedding-sand.mp4',
    poster: '/images/gallery/work-bedding-sand-poster.webp',
    alt: 'Bedding sand moved by bucket and screeded by hand',
    altEs: 'Arena de asiento movida con cubeta y nivelada a mano'
  },
  {
    type: 'video',
    src: '/images/gallery/work-driveway-rebuild.mp4',
    poster: '/images/gallery/work-driveway-rebuild-poster.webp',
    alt: 'Full driveway rebuild with prepared sand bed',
    altEs: 'Reconstrucción completa de entrada con cama de arena preparada'
  }
]

function Gallery() {
  const { t, language } = useLanguage();
  const label = (item) => (language === 'es' && item.altEs) || item.alt;
  const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 })

  const openLightbox = (index) => {
    setLightbox({ isOpen: true, index })
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = useCallback(() => {
    setLightbox({ isOpen: false, index: 0 })
    document.body.style.overflow = ''
  }, [])

  const nextImage = useCallback((e) => {
    if (e) e.stopPropagation()
    setLightbox(prev => ({ ...prev, index: (prev.index + 1) % media.length }))
  }, [])

  const prevImage = useCallback((e) => {
    if (e) e.stopPropagation()
    setLightbox(prev => ({ ...prev, index: (prev.index - 1 + media.length) % media.length }))
  }, [])

  useEffect(() => {
    if (!lightbox.isOpen) return undefined
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightbox.isOpen, closeLightbox, nextImage, prevImage])

  const current = media[lightbox.index]

  return (
    <section className="gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{t('galGridEyebrow')}</p>
          <h2 id="gallery-title">{t('galGridTitle')}</h2>
          <p className="lede">{t('galGridSub')}</p>
        </Reveal>

        <ul className="gallery-grid">
          {media.map((item, idx) => (
            <Reveal as="li" key={item.src} className="gallery-item" delay={(idx % 3) * 70}>
              <button
                type="button"
                className="gallery-tile"
                onClick={() => openLightbox(idx)}
                aria-label={`${item.type === 'video' ? t('galPlay') : t('galView')}: ${label(item)}`}
              >
                {item.type === 'video' ? (
                  <img src={item.poster} alt="" loading="lazy" decoding="async" />
                ) : (
                  <img src={item.src} alt="" loading="lazy" decoding="async" />
                )}
                <span className="gallery-tile-meta">
                  {item.type === 'video' && (
                    <span className="gallery-play" aria-hidden="true">
                      <Play size={16} strokeWidth={2} fill="currentColor" />
                    </span>
                  )}
                  <span className="gallery-tile-caption">{label(item)}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      {lightbox.isOpen && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true" aria-label={label(current)}>
          <button type="button" className="lightbox-btn lightbox-close" onClick={closeLightbox} aria-label={t('galClose')}>
            <X size={24} strokeWidth={1.75} />
          </button>

          <button type="button" className="lightbox-btn lightbox-prev" onClick={prevImage} aria-label={t('galPrev')}>
            <ChevronLeft size={28} strokeWidth={1.75} />
          </button>

          <figure className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {current.type === 'video' ? (
              <video
                src={current.src}
                poster={current.poster}
                controls
                autoPlay
                playsInline
                className="lightbox-video"
              />
            ) : (
              <img src={current.src} alt={label(current)} />
            )}
            <figcaption className="lightbox-caption">
              <span>{label(current)}</span>
              <span className="num">{lightbox.index + 1} / {media.length}</span>
            </figcaption>
          </figure>

          <button type="button" className="lightbox-btn lightbox-next" onClick={nextImage} aria-label={t('galNext')}>
            <ChevronRight size={28} strokeWidth={1.75} />
          </button>
        </div>
      )}
    </section>
  )
}

export default Gallery
