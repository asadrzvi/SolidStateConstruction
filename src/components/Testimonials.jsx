import React from 'react'
import { Star } from 'lucide-react'
import './Testimonials.css'

const testimonials = [
  {
    name: "Sarah M.",
    location: "Leander, TX",
    text: "Solid State saved us when our pipes burst. They were here in 30 minutes for the water remediation and handled everything with the insurance. Truly the best in Leander!",
    rating: 5,
    image: "/images/sarah.jpg"
  },
  {
    name: "James R.",
    location: "Crystal Falls",
    text: "Extremely professional foundation repair. I was worried about the Texas soil shifts, but these guys explained the whole process and did a flawless job. Highly recommend.",
    rating: 5,
    image: "/images/james.jpg"
  },
  {
    name: "Elena G.",
    location: "Cedar Park, TX",
    text: "We used them for a full kitchen remodel and flooring. The attention to detail in the tile work is incredible. Our home looks brand new!",
    rating: 5,
    image: "/images/elena.jpg"
  }
]

function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="trust-header">
          <span className="top-rated-badge">Top Rated in Leander</span>
          <h2 className="section-title">What Our Neighbors Say</h2>
          <div className="overall-rating">
            <div className="stars">
              <Star size={20} fill="#ffc107" color="#ffc107" />
              <Star size={20} fill="#ffc107" color="#ffc107" />
              <Star size={20} fill="#ffc107" color="#ffc107" />
              <Star size={20} fill="#ffc107" color="#ffc107" />
              <Star size={20} fill="#ffc107" color="#ffc107" />
            </div>
            <span>5.0/5.0 Based on 50+ Local Reviews</span>
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
