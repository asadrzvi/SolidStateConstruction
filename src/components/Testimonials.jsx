import React, { useState, useEffect, useRef } from 'react'
import { Star, ChevronLeft, ChevronRight, CheckCircle, ExternalLink } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import './Testimonials.css'

const googleReviewsData = [
  {
    name: "Sarah M.",
    location: "Leander, TX",
    date: "Verified Google Review • 2 weeks ago",
    service: "Emergency Water Remediation & Drywall Repair",
    text: "Shaan's team saved our home when our water heater ruptured in the middle of the night. They arrived in under 40 minutes, extracted all standing water, and handled the full restoration beautifully. Flawless drywall and matching baseboards!",
    rating: 5,
    image: "/images/sarah.jpg"
  },
  {
    name: "James R.",
    location: "Crystal Falls, Leander, TX",
    date: "Verified Google Review • 1 month ago",
    service: "Commercial Concrete & Driveway Formwork",
    text: "We hired Solid State Construction for a custom curved driveway and heavy-duty slab expansion. Excellent coordination, highly reinforced rebar layout, and mirror-smooth finishing. Absolute structural perfection.",
    rating: 5,
    image: "/images/james.jpg"
  },
  {
    name: "Elena G.",
    location: "Cedar Park, TX",
    date: "Verified Google Review • 1 month ago",
    service: "Residential Roofing & Insurance Claim",
    text: "Super responsive customer service. Shaan worked directly with my insurance adjuster for a storm damage roof replacement, making the whole process completely stress-free. Quality work and very respectful crew!",
    rating: 5,
    image: "/images/elena.jpg"
  },
  {
    name: "Michael & Karen P.",
    location: "Leander, TX",
    date: "Verified Google Review • 3 weeks ago",
    service: "Full Home & Kitchen Remodel",
    text: "Solid State turned our outdated kitchen into a modern luxury showcase with custom cabinetry, quartz countertops, and precision tile installation. Delivered right on schedule, on budget, and with master craftsmanship.",
    rating: 5,
    image: "/images/sarah.jpg"
  },
  {
    name: "David L.",
    location: "Liberty Hill, TX",
    date: "Verified Google Review • 2 months ago",
    service: "Foundation Stabilization & French Drain",
    text: "After noticing stair-step masonry cracks, Shaan conducted a thorough structural audit and installed steel piers with a perimeter French drain. Zero settling since. Honest pricing and outstanding communication.",
    rating: 5,
    image: "/images/james.jpg"
  },
  {
    name: "Robert H.",
    location: "Round Rock, TX",
    date: "Verified Google Review • 1 month ago",
    service: "24/7 Emergency Plumbing & Slab Repair",
    text: "Top-tier emergency dispatch! Had an underground slab leak in our commercial property. Their team pinpointed the leak quickly, bypassed the pipe cleanly, and repaired the concrete foundation seamlessly.",
    rating: 5,
    image: "/images/elena.jpg"
  }
];

function Testimonials() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoRotateTimer = useRef(null);

  const cardsPerPage = 3;
  const maxIndex = Math.ceil(googleReviewsData.length / cardsPerPage) - 1;

  // Auto-rotate effect with hover pause
  useEffect(() => {
    if (!isPaused) {
      autoRotateTimer.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, 4500);
    }
    return () => {
      if (autoRotateTimer.current) clearInterval(autoRotateTimer.current);
    };
  }, [isPaused, maxIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleReviews = googleReviewsData.slice(
    currentIndex * cardsPerPage,
    (currentIndex + 1) * cardsPerPage
  );

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="trust-header">
          <div className="google-rating-pill">
            <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Verified Google Customer Reviews</span>
          </div>

          <h2 className="section-title">{t('testTitle')}</h2>
          
          <div className="overall-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} fill="#ffc107" color="#ffc107" />
              ))}
            </div>
            <div className="rating-subtitle">
              <span>5.0 / 5.0 Rating based on verified Google Reviews</span>
              <a 
                href="https://maps.app.goo.gl/xzScx29yJNoVXDi1A" 
                target="_blank" 
                rel="noopener noreferrer"
                className="google-maps-link"
              >
                View on Google Maps <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Auto-Rotating Slider Container */}
        <div 
          className="testimonials-carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button 
            type="button" 
            className="carousel-control-btn prev"
            onClick={handlePrev}
            aria-label="Previous Reviews"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="testimonials-grid carousel-track">
            {visibleReviews.map((rev, index) => (
              <div className="testimonial-card 3d-card-tilt" key={`${currentIndex}-${index}`}>
                <div>
                  <div className="card-top-row">
                    <div className="card-stars">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={18} fill="#ffc107" color="#ffc107" />
                      ))}
                    </div>
                    <span className="verified-badge">
                      <CheckCircle size={14} color="#34A853" /> Google Verified
                    </span>
                  </div>

                  <p className="service-tag-label">{rev.service}</p>
                  <p className="testimonial-text">"{rev.text}"</p>
                </div>

                <div className="testimonial-author-wrapper">
                  <img src={rev.image} alt={rev.name} className="testimonial-avatar" />
                  <div className="testimonial-author">
                    <span className="author-name">{rev.name}</span>
                    <span className="author-location">{rev.location}</span>
                    <span className="review-date">{rev.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            type="button" 
            className="carousel-control-btn next"
            onClick={handleNext}
            aria-label="Next Reviews"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="carousel-indicators">
          {[...Array(maxIndex + 1)].map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`indicator-dot ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to review page ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
