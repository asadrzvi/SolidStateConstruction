import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, FileSearch, HardHat, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './ProcessTimeline.css';

export default function ProcessTimeline() {
  const { t } = useLanguage();
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (idx) => {
    setFlippedCards((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const steps = [
    {
      icon: <PhoneCall size={24} />,
      title: t('processStep1Title') || "1. 24/7 Dispatch & Rapid Response",
      subtitle: t('processStep1Sub') || "Emergency Callout within Leander & Austin Metro",
      desc: t('processStep1Desc') || "When disaster strikes or emergency repair is needed, our technicians are on-site within 1 hour to immediately stabilize safety conditions.",
      backTitle: "Rapid Emergency Protocols",
      backSpecs: [
        "⚡ 40-Minute Average On-Site Arrival",
        "📞 Direct Line to Master Contractor Shaan",
        "🛡️ Instant Safety & Water Containment"
      ],
      ctaText: "Call Dispatch Now"
    },
    {
      icon: <ShieldAlert size={24} />,
      title: t('processStep2Title') || "2. Immediate Damage Containment",
      subtitle: t('processStep2Sub') || "Mitigate Loss & Prevent Secondary Damage",
      desc: t('processStep2Desc') || "We perform fast water extraction, set up commercial air dehumidifiers, and apply temporary board-up or roof tarps to secure the building envelope.",
      backTitle: "Containment Engineering",
      backSpecs: [
        "💧 Commercial Heavy-Duty Water Extraction",
        "🌪️ Industrial Air Scrubbing & Dehumidification",
        "🏗️ Temporary Roof Tarping & Enclosure"
      ],
      ctaText: "Get Emergency Help"
    },
    {
      icon: <FileSearch size={24} />,
      title: t('processStep3Title') || "3. Structural Inspection & Planning",
      subtitle: t('processStep3Sub') || "Precision Engineering Evaluation",
      desc: t('processStep3Desc') || "Under Shaan's engineering leadership, we assess moisture deep in drywall, check foundation leveling, and issue a clear repair roadmap.",
      backTitle: "Engineering Diagnostics",
      backSpecs: [
        "📐 Laser Level Foundation Mapping",
        "🔍 FLIR Thermal Moisture Scanning",
        "📋 Direct Adjuster & Insurance Documentation"
      ],
      ctaText: "Request Inspection"
    },
    {
      icon: <HardHat size={24} />,
      title: t('processStep4Title') || "4. Precision Execution & Buildout",
      subtitle: t('processStep4Sub') || "Certified Craftsmen & Legacy Materials",
      desc: t('processStep4Desc') || "From pouring reinforced concrete slabs to installing custom trim and structural steel piers, our crew builds back stronger than before.",
      backTitle: "Craftsmanship Guarantee",
      backSpecs: [
        "🧱 Grade-A Reinforced Rebar & Concrete",
        "🔨 Master Carpentry & Drywall Finishing",
        "⚖️ Structural Steel Pier Installation"
      ],
      ctaText: "View Project Specs"
    },
    {
      icon: <Sparkles size={24} />,
      title: t('processStep5Title') || "5. Final Walkthrough & Warranty",
      subtitle: t('processStep5Sub') || "Complete Clean-Up & Warranty Handover",
      desc: t('processStep5Desc') || "We conduct a room-by-room quality audit with you, ensure clean site turnover, and hand over your structural warranty documentation.",
      backTitle: "Warranty & Guarantee",
      backSpecs: [
        "✨ 100% Spotless Site Cleanup",
        "📜 Transferable Structural Warranty",
        "🤝 Final Client Walkthrough Sign-Off"
      ],
      ctaText: "Start Your Project"
    }
  ];

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
                <div className="timeline-dot">
                  {step.icon}
                </div>

                {/* 3D Flip Card Container */}
                <div 
                  className={`timeline-card-wrapper ${isFlipped ? 'flipped' : ''}`}
                  onClick={() => toggleFlip(idx)}
                >
                  <div className="timeline-card-inner">
                    {/* Front Face */}
                    <div className="timeline-card-face timeline-card-front">
                      <h3>{step.title}</h3>
                      <h4>{step.subtitle}</h4>
                      <p>{step.desc}</p>
                      
                      <div className="flip-hint-pill">
                        <RefreshCw size={14} className="spin-icon" /> Hover or Click to Flip ↷
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className="timeline-card-face timeline-card-back">
                      <h3>{step.backTitle}</h3>
                      <ul className="back-specs-list">
                        {step.backSpecs.map((spec, sIdx) => (
                          <li key={sIdx}>{spec}</li>
                        ))}
                      </ul>
                      <div className="flip-back-action">
                        <span className="btn btn-primary cta-flip-btn">
                          {step.ctaText} <ArrowRight size={16} />
                        </span>
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
