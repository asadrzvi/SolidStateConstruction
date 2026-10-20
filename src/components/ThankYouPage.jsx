import React, { useEffect } from 'react'
import { Check, Phone, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import './ThankYouPage.css'

function ThankYouPage({ submittedService, submittedName, onReturnHome, onGoGallery }) {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const title = submittedName
    ? t('tyTitleNamed').replace('{name}', submittedName)
    : t('tyTitle');

  return (
    <main className="thank-you">
      <div className="container thank-you-inner">
        <div className="thank-you-card">
          <span className="thank-you-check" aria-hidden="true">
            <Check size={26} strokeWidth={2.25} />
          </span>
          <p className="eyebrow">{t('tyBadge')}</p>
          <h1>{title}</h1>
          <p className="lede">{t('tyBody')}</p>

          {submittedService && (
            <dl className="thank-you-service">
              <dt>{t('tyServiceLabel')}</dt>
              <dd>{submittedService}</dd>
            </dl>
          )}

          <div className="thank-you-emergency">
            <div>
              <h2>{t('tyEmergencyTitle')}</h2>
              <p>{t('tyEmergencyBody')}</p>
            </div>
            <a href="tel:512-595-2332" className="btn btn-primary">
              <Phone size={18} strokeWidth={1.75} />
              {t('tyCall')}
            </a>
          </div>

          <div className="thank-you-actions">
            <button type="button" onClick={onReturnHome} className="btn btn-outline">
              {t('tyHome')}
            </button>
            <button type="button" onClick={onGoGallery} className="link-arrow">
              {t('tyGallery')}
              <ArrowRight size={18} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ThankYouPage
