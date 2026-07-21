import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './FAQSection.css';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const { t } = useLanguage();

  const faqs = [
    {
      question: t('faq1Q'),
      answer: t('faq1A')
    },
    {
      question: t('faq2Q'),
      answer: t('faq2A')
    },
    {
      question: t('faq3Q'),
      answer: t('faq3A')
    },
    {
      question: t('faq4Q'),
      answer: t('faq4A')
    },
    {
      question: t('faq5Q'),
      answer: t('faq5A')
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <h2 className="section-title">{t('faqTitle')}</h2>
        <p className="section-subtitle">{t('faqSubtitle')}</p>
        
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
