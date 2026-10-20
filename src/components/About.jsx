import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import './About.css'

function About() {
  const { t } = useLanguage();
  const items = ['aboutCoreItem1', 'aboutCoreItem2', 'aboutCoreItem3', 'aboutCoreItem4', 'aboutCoreItem5', 'aboutCoreItem6'];

  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-copy">
          <Reveal>
            <p className="eyebrow">{t('aboutEyebrow')}</p>
            <h2 id="about-title">{t('aboutTitle')}</h2>
            <p className="lede">{t('aboutP1')}</p>
          </Reveal>

          <Reveal className="about-list-wrap" delay={80}>
            <h3 className="about-list-title">{t('aboutCoreTitle')}</h3>
            <ul className="about-list">
              {items.map((k) => (
                <li key={k}>{t(k)}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <p className="about-location">{t('aboutLocation')}</p>
          </Reveal>
        </div>

        <Reveal as="figure" className="about-founder" delay={160}>
          <div className="about-founder-photo">
            <img
              src="/images/shaan_the_dawn.webp"
              alt={`${t('aboutFounderName')}, ${t('aboutFounderRole')}`}
              loading="lazy"
              decoding="async"
              width="800"
              height="1000"
            />
          </div>
          <figcaption className="about-founder-caption">
            <blockquote>
              <p>{t('aboutFounderQuote')}</p>
            </blockquote>
            <div className="about-founder-name">
              <strong>{t('aboutFounderName')}</strong>
              <span>{t('aboutFounderRole')}</span>
            </div>
          </figcaption>
        </Reveal>
      </div>
    </section>
  )
}

export default About
