import React from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './ServiceAreas.css';

export default function ServiceAreas() {
  const { t } = useLanguage();

  const cities = [
    { name: "Leander", label: t('areaHq') },
    { name: "Cedar Park", label: t('areaDispatch') },
    { name: "Liberty Hill", label: t('areaNorth') },
    { name: "Georgetown", label: t('areaEast') },
    { name: "Round Rock", label: t('areaRapid') },
    { name: "North Austin", label: t('areaMetro') }
  ];

  return (
    <section className="service-areas-section" id="areas">
      <div className="container">
        <h2 className="section-title">{t('areasTitle')}</h2>
        <p className="section-subtitle">{t('areasSubtitle')}</p>
        
        <div className="areas-grid">
          {cities.map((city, idx) => (
            <div key={idx} className="area-card">
              <div className="area-icon-wrapper">
                <MapPin size={24} />
              </div>
              <div className="area-info">
                <h3>{city.name}</h3>
                <span className="area-tag">{city.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
