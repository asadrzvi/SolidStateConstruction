import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Reveal from './Reveal';
import './ProcessTimeline.css';

const STEPS = [
  { n: 1, serviceKey: 'Water Remediation' },
  { n: 2, serviceKey: 'Emergency Services' },
  { n: 3, serviceKey: 'Foundation Repair' },
  { n: 4, serviceKey: 'Concrete & Foundation' },
  { n: 5, serviceKey: 'General Contracting' },
];

export default function ProcessTimeline({ onServiceSelect, onPrefillMessage, onOpenQuote }) {
  const { t } = useLanguage();

  const requestInspection = () => {
    if (onServiceSelect) onServiceSelect('Foundation Repair');
    if (onPrefillMessage) onPrefillMessage('');
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="process band-dark" id="process" aria-labelledby="process-title">
      <div className="container process-grid">
        <div className="process-intro">
          <Reveal>
            <p className="eyebrow on-dark">{t('processEyebrow')}</p>
            <h2 id="process-title">{t('processTitle')}</h2>
            <p className="lede">{t('processSubtitle')}</p>
          </Reveal>
          <Reveal className="process-cta" delay={120}>
            <a href="tel:512-595-2332" className="btn btn-primary">
              <Phone size={18} strokeWidth={1.75} />
              {t('processCta')}
            </a>
            <button type="button" className="btn btn-outline on-dark" onClick={requestInspection}>
              {t('processCta2')}
              <ArrowRight size={18} strokeWidth={1.75} />
            </button>
          </Reveal>
        </div>

        <ol className="process-steps">
          {STEPS.map((step, idx) => (
            <Reveal as="li" key={step.n} className="process-step" delay={idx * 60}>
              <span className="process-num" aria-hidden="true">{String(step.n).padStart(2, '0')}</span>
              <div className="process-step-body">
                <p className="process-step-sub">{t(`processStep${step.n}Sub`)}</p>
                <h3>{t(`processStep${step.n}Title`)}</h3>
                <p className="process-step-desc">{t(`processStep${step.n}Desc`)}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
