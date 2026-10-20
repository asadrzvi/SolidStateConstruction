import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Reveal from './Reveal';
import './FAQSection.css';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const { t } = useLanguage();

  const faqs = [1, 2, 3, 4, 5].map((n) => ({ q: t(`faq${n}Q`), a: t(`faq${n}A`) }));

  const toggle = (index) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <section className="faq band-alt" id="faq" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <Reveal className="faq-intro">
          <p className="eyebrow">{t('faqEyebrow')}</p>
          <h2 id="faq-title">{t('faqTitle')}</h2>
          <p className="lede">{t('faqSubtitle')}</p>
        </Reveal>

        <div className="faq-list">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            const panelId = `faq-panel-${idx}`;
            const btnId = `faq-button-${idx}`;
            return (
              <Reveal key={idx} className={`faq-item${isOpen ? ' is-open' : ''}`} delay={idx * 50}>
                <h3 className="faq-q">
                  <button
                    type="button"
                    id={btnId}
                    className="faq-trigger"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <Plus size={20} strokeWidth={1.75} />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="faq-panel"
                  hidden={!isOpen}
                >
                  <div className="faq-panel-inner">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
