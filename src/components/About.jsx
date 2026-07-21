import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import './About.css'

function About() {
  const { t } = useLanguage();

  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title">{t('aboutTitle')}</h2>
        <div className="about-content">
          <div className="about-text">
            <h3>{t('aboutSubtitle')}</h3>
            <p>{t('aboutP1')}</p>
            
            <div className="work-summary">
              <h4>{t('aboutCoreTitle')}</h4>
              <ul className="work-list">
                <li>{t('aboutCoreItem1')}</li>
                <li>{t('aboutCoreItem2')}</li>
                <li>{t('aboutCoreItem3')}</li>
                <li>{t('aboutCoreItem4')}</li>
                <li>{t('aboutCoreItem5')}</li>
                <li>{t('aboutCoreItem6')}</li>
              </ul>
            </div>

            <p>{t('aboutLocation')}</p>
          </div>
          
          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-number">{t('aboutStat1Num')}</span>
              <span className="stat-label">{t('aboutStat1Lbl')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{t('aboutStat2Num')}</span>
              <span className="stat-label">{t('aboutStat2Lbl')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{t('aboutStat3Num')}</span>
              <span className="stat-label">{t('aboutStat3Lbl')}</span>
            </div>
          </div>
        </div>

        <div className="founder-spotlight">
          <div className="founder-image-container">
            <img src="/images/shaan_the_dawn.jpg?v=1" alt="Shaan - Founder of Solid State Construction" className="founder-image" />
          </div>
          <div className="founder-info">
            <h3>{t('aboutFounderTitle')}</h3>
            <p>
              "{t('aboutFounderQuote')}"
            </p>
            <p className="founder-signature">{t('aboutFounderSignature')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
