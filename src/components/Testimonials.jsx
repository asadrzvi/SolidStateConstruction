import React from 'react'
import { Star } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import './Testimonials.css'

function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Sarah M.",
      location: "Leander, TX",
      text: t('test1Text'),
      rating: 5,
      image: "/images/sarah.jpg"
    },
    {
      name: "James R.",
      location: "Crystal Falls",
      text: t('test2Text'),
      rating: 5,
      image: "/images/james.jpg"
    },
    {
      name: "Elena G.",
      location: "Cedar Park, TX",
      text: t('test3Text'),
      rating: 5,
      image: "/images/elena.jpg"
    }
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="trust-header">
          <span className="top-rated-badge">{t('navAbout') === 'About' ? 'Top Rated in Leander' : 'Mejor Valorado en Leander'}</span>
          <h2 className="section-title">{t('testTitle')}</h2>
          <div className="overall-rating">
            <div className="stars">
              <Star size={20} fill="#ffc107" color="#ffc107" />
              <Star size={20} fill="#ffc107" color="#ffc107" />
              <Star size={20} fill="#ffc107" color="#ffc107" />
              <Star size={20} fill="#ffc107" color="#ffc107" />
              <Star size={20} fill="#ffc107" color="#ffc107" />
            </div>
            <span>{t('navAbout') === 'About' ? '5.0/5.0 Based on 50+ Local Reviews' : '5.0/5.0 Basado en más de 50 opiniones locales'}</span>
          </div>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <div className="testimonial-card" key={index}>
              <div>
                <div className="card-stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#ffc107" color="#ffc107" />
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
              </div>
              <div className="testimonial-author-wrapper">
                <img src={t.image} alt={t.name} className="testimonial-avatar" />
                <div className="testimonial-author">
                  <span className="author-name">{t.name}</span>
                  <span className="author-location">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
