import React from 'react';
import { PhoneCall, ShieldAlert, FileSearch, HardHat, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './ProcessTimeline.css';

export default function ProcessTimeline() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <PhoneCall size={24} />,
      title: t('processStep1Title'),
      subtitle: t('processStep1Sub'),
      desc: t('processStep1Desc')
    },
    {
      icon: <ShieldAlert size={24} />,
      title: t('processStep2Title'),
      subtitle: t('processStep2Sub'),
      desc: t('processStep2Desc')
    },
    {
      icon: <FileSearch size={24} />,
      title: t('processStep3Title'),
      subtitle: t('processStep3Sub'),
      desc: t('processStep3Desc')
    },
    {
      icon: <HardHat size={24} />,
      title: t('processStep4Title'),
      subtitle: t('processStep4Sub'),
      desc: t('processStep4Desc')
    },
    {
      icon: <Sparkles size={24} />,
      title: t('processStep5Title'),
      subtitle: t('processStep5Sub'),
      desc: t('processStep5Desc')
    }
  ];

  return (
    <section className="process-section" id="process">
      <div className="container">
        <h2 className="section-title">{t('processTitle')}</h2>
        <p className="section-subtitle">{t('processSubtitle')}</p>
        
        <div className="timeline-container">
          <div className="timeline-line"></div>
          {steps.map((step, idx) => (
            <div key={idx} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-dot">
                {step.icon}
              </div>
              <div className="timeline-card">
                <h3>{step.title}</h3>
                <h4>{step.subtitle}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
