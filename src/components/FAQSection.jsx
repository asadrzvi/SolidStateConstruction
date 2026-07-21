import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQSection.css';

const faqs = [
  {
    question: "Do you accept homeowners' insurance for water damage claims?",
    answer: "Yes, we work directly with all major insurance providers. We document the water damage thoroughly with moisture readings, infrared scanning, and photo records. We can coordinate direct insurance billing to streamline the claims process and reduce your out-of-pocket costs."
  },
  {
    question: "What is your emergency response time in Leander and North Austin?",
    answer: "For emergency services like water remediation, pipe bursts, and storm-damage tarping, our team is dispatched immediately. We aim to be on-site within 1 hour for locations in Leander, Cedar Park, Liberty Hill, Georgetown, and North Austin."
  },
  {
    question: "Are your foundation repair and concrete slabs warrantied?",
    answer: "Absolutely. All of our concrete slab installations and foundation leveling repairs come with a comprehensive structural warranty. Under Shaan's engineering leadership, we utilize soil-adapted designs and premium rebar reinforcement to ensure lifetime durability on Texas clay soil."
  },
  {
    question: "Are you licensed and certified for restoration work?",
    answer: "Yes, Solid State Construction is fully licensed, insured, and bonded. Our technicians are trained in accordance with IICRC standards for water mitigation, sewage cleanup, structural drying, and safety protocols."
  },
  {
    question: "Can you help with full reconstruction after water mitigation is finished?",
    answer: "Yes! That is what makes us unique. Unlike mitigation-only companies that leave you with stripped-out walls and floors, we are general contractors. Once your home is fully dry and sanitized, our remodeling team steps in to replace drywall, framing, painting, custom cabinetry, and premium tiling."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">Common questions about our emergency restoration, remodeling, insurance claims, and warranties.</p>
        
        <div className="faq-accordion-container">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div key={idx} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                <button 
                  className="faq-accordion-header" 
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                >
                  <h3>{faq.question}</h3>
                  <div className="faq-accordion-icon">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
                <div className="faq-accordion-body">
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
