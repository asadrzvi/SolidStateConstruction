import React, { useState, useEffect, useRef } from 'react'
import { Star, ChevronLeft, ChevronRight, CheckCircle, ExternalLink, Quote } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import './Testimonials.css'

// Avatar tints are drawn from the espresso/amber palette in index.css. They
// were previously Google's brand blue/green/red, which is correct for a Google
// review widget but reads as four foreign accent colours inside a warm brown
// page. Initials are kept rather than stock portraits: these are real named
// reviewers, and pairing a stock face with a real person's review invents a
// likeness for someone who never sat for it.
const googleReviewsData = [
  {
    name: "Haider",
    location: "Leander, TX",
    date: "Verified Google Review",
    service: "24/7 Emergency Plumbing Repair",
    text: "Fantastic plumbing repair service!! Had a plumbing emergency here in Leander and called Solid State. They responded quickly, diagnosed the issue right away, and got the repair done fast. The plumber was incredibly professional, left the area clean.",
    rating: 5,
    avatarColor: "#6b4423",
    initials: "H"
  },
  {
    name: "Abbas Hussain",
    location: "Austin, TX Metro",
    date: "Verified Google Review",
    service: "Foundation Repair & Structural Leveling",
    text: "These guys did my foundation, great working with them, they got it done quickly and did a great job. Would recommend to any homeowners in the Austin area.",
    rating: 5,
    avatarColor: "#8a5a3b",
    initials: "A"
  },
  {
    name: "Kuza Bandzz",
    location: "Leander & Central TX",
    date: "Verified Google Review",
    service: "Custom Construction & General Contracting",
    text: "Had a really good experience with Solid State Construction. They communicated well and made the whole process way less stressful than I expected. Everything came out clean and solid, and you can tell they actually care about what they’re doing.",
    rating: 5,
    avatarColor: "#4a3427",
    initials: "KB"
  },
  {
    name: "Asad",
    location: "Leander, TX",
    date: "Verified Google Review",
    service: "Foundation Inspection & Crack Repair",
    text: "I recently hired Solid State Construction to inspect and repair some cracking along my home's foundation, and I couldn't be happier with the results. They were prompt, professional, and walked me through the entire repair process so I knew exactly what to expect.",
    rating: 5,
    avatarColor: "#9c6f47",
    initials: "A"
  }
];

function Testimonials() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(2);
  const autoRotateTimer = useRef(null);

  // Responsive cards per page (2 on desktop matching CareMedBill layout, 1 on mobile)
  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 768) {
        setCardsPerPage(1);
      } else {
        setCardsPerPage(2);
      }
    };
    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  const totalPages = Math.ceil(googleReviewsData.length / cardsPerPage);

  // Auto-rotate animation every 4 seconds
  useEffect(() => {
    if (!isPaused) {
      autoRotateTimer.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
      }, 4000);
    }
    return () => {
      if (autoRotateTimer.current) clearInterval(autoRotateTimer.current);
    };
  }, [isPaused, totalPages]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
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

          <h2 className="section-title">Client Testimonials</h2>
          
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
        
        {/* CareMedBill Auto-Rotating Slider Container */}
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

          <div className="testimonials-grid carousel-track-2col">
            {visibleReviews.map((rev, index) => (
              <div className="testimonial-card 3d-card-tilt caremed-style-card" key={`${currentIndex}-${index}`}>
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
                  <div className="author-left">
                    <div 
                      className="testimonial-avatar-circle"
                      style={{ backgroundColor: rev.avatarColor }}
                    >
                      {rev.initials}
                    </div>
                    <div className="testimonial-author">
                      <span className="author-name">{rev.name}</span>
                      <span className="author-location">{rev.location}</span>
                      <span className="review-date">{rev.date}</span>
                    </div>
                  </div>

                  {/* CareMedBill Decorative Quote Mark */}
                  <div className="quote-mark-icon">
                    <Quote size={32} />
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

        {/* CareMedBill Indicator Dots */}
        <div className="carousel-indicators">
          {[...Array(totalPages)].map((_, idx) => (
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
