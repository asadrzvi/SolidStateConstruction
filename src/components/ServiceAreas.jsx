import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Reveal from './Reveal';
import './ServiceAreas.css';

const MAPS_PROFILE_URL = 'https://maps.app.goo.gl/xzScx29yJNoVXDi1A';
const MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3434.45!2d-97.8571851!3d30.576184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x45c300d14c7667bf%3A0x518a15ff1d800e86!2sSolid%20State%20Construction!5e0!3m2!1sen!2sus!4v1717545600000!5m2!1sen!2sus';

const CITIES = [
  { key: 'areaLeander', noteKey: 'areaLeanderNote' },
  { key: 'areaCedarPark' },
  { key: 'areaLibertyHill' },
  { key: 'areaGeorgetown' },
  { key: 'areaRoundRock' },
  { key: 'areaNorthAustin' },
];

export default function ServiceAreas() {
  const { t } = useLanguage();

  return (
    <section className="areas" id="areas" aria-labelledby="areas-title">
      <span id="location" className="sr-only" aria-hidden="true" />
      <div className="container areas-grid">
        <div className="areas-copy">
          <Reveal>
            <p className="eyebrow">{t('areasEyebrow')}</p>
            <h2 id="areas-title">{t('areasTitle')}</h2>
            <p className="lede">{t('areasSubtitle')}</p>
          </Reveal>

          <ul className="areas-list">
            {CITIES.map((c, i) => (
              <Reveal as="li" key={c.key} delay={i * 50}>
                <span className="areas-city">{t(c.key)}</span>
                {c.noteKey && <span className="areas-note">{t(c.noteKey)}</span>}
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="areas-map" delay={120}>
          <div className="areas-map-frame">
            <iframe
              src={MAP_EMBED_URL}
              title={t('areasMapTitle')}
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="areas-map-foot">
            <span className="areas-map-address">1101 Halsey Drive, Leander, TX 78641</span>
            <a href={MAPS_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="link-arrow">
              {t('areasMapLink')}
              <ArrowUpRight size={18} strokeWidth={1.75} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
