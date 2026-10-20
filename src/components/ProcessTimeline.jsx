import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, FileSearch, HardHat, ClipboardCheck, RefreshCw, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './ProcessTimeline.css';

const ICONS = [
  <PhoneCall size={24} />,
  <ShieldAlert size={24} />,
  <FileSearch size={24} />,
  <HardHat size={24} />,
  <ClipboardCheck size={24} />
];

const SERVICE_KEYS = [
  'Water Remediation',
  'Emergency Services',
  'Foundation Repair',
  'Concrete & Foundation',
  'General Contracting'
];

export default function ProcessTimeline({ onServiceSelect, onPrefillMessage, onOpenQuote }) {
  const { t } = useLanguage();
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (idx) => {
    setFlippedCards((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCardKey = (e, idx) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip(idx);
    }
  };

  const handleCtaClick = (e, step) => {
    e.stopPropagation();
    if (onServiceSelect) onServiceSelect(step.serviceKey);
    if (onPrefillMessage) onPrefillMessage(`Inquiry for ${step.title}: ${step.subtitle}`);

    if (onOpenQuote) {
      onOpenQuote();
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // All copy comes from LanguageContext so the back of each card is translated
  // along with the front. (Previously the back faces were English-only and used
  // emoji as bullets.)
  const steps = [1, 2, 3, 4, 5].map((n, i) => ({
    icon: ICONS[i],
    title: t(`processStep${n}Title`),
    subtitle: t(`processStep${n}Sub`),
    desc: t(`processStep${n}Desc`),
    backTitle: t(`processBack${n}Title`),
    backSpecs: [t(`processBack${n}Spec1`), t(`processBack${n}Spec2`), t(`processBack${n}Spec3`)],
    ctaText: t(`processBack${n}Cta`),
    serviceKey: SERVICE_KEYS[i]
  }));

  return (
    <section className="process-section" id="process">
      <div className="container">
        <h2 className="section-title">{t('processTitle')}</h2>
        <p className="section-subtitle">{t('processSubtitle')}</p>

        <div className="timeline-container">
          <div className="timeline-line"></div>
          {steps.map((step, idx) => {
            const isFlipped = !!flippedCards[idx];
            return (
              <div key={idx} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-dot" aria-hidden="true">
                  {step.icon}
                </div>

                {/* Flip card: front = the step, back = what it involves */}
                <div
                  className={`timeline-card-wrapper ${isFlipped ? 'flipped' : ''}`}
                  onClick={() => toggleFlip(idx)}
                  onKeyDown={(e) => handleCardKey(e, idx)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isFlipped}
                >
                  <div className="timeline-card-inner">
                    {/* Front Face */}
                    <div className="timeline-card-face timeline-card-front">
                      <h3>{step.title}</h3>
                      <h4>{step.subtitle}</h4>
                      <p>{step.desc}</p>

                      <div className="flip-hint-pill">
                        <RefreshCw size={14} aria-hidden="true" /> {t('processFlipHint')}
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className="timeline-card-face timeline-card-back" aria-hidden={!isFlipped}>
                      <h3>{step.backTitle}</h3>
                      <ul className="back-specs-list">
                        {step.backSpecs.map((spec, sIdx) => (
                          <li key={sIdx}>{spec}</li>
                        ))}
                      </ul>
                      <div className="flip-back-action">
                        <button
                          type="button"
                          className="btn btn-primary cta-flip-btn"
                          onClick={(e) => handleCtaClick(e, step)}
                          tabIndex={isFlipped ? 0 : -1}
                        >
                          {step.ctaText} <ArrowRight size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
