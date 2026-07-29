import React, { useEffect, useRef, useState } from 'react';
import logoLight from '../../public/logo.png';
import logoDark from '../../public/logo_dark.png';
import { useLanguage } from '../context/LanguageContext';
import './SplitLogoSection.css';

function SplitLogoSection() {
  const [isMerged, setIsMerged] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const sectionRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    // Check initial theme & listen for theme changes
    const checkTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setIsDark(currentTheme === 'dark');
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // IntersectionObserver that re-triggers split/merge EVERY time user scrolls through
    const element = sectionRef.current;
    if (!element) return;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsMerged(true);
          } else {
            // Reset state when scrolled out of view so it re-triggers every scroll
            setIsMerged(false);
          }
        });
      },
      {
        threshold: 0.2, // Triggers when 20% visible
        rootMargin: '0px 0px -50px 0px'
      }
    );

    intersectionObserver.observe(element);

    return () => {
      if (element) intersectionObserver.unobserve(element);
    };
  }, []);

  const logoSrc = isDark ? logoDark : logoLight;

  return (
    <section className="split-logo-section" ref={sectionRef}>
      <div className="container">
        <div className="split-logo-header">
          <span className="subtitle">
            {t('navAbout') === 'About' ? 'LEGACY ENGINEERING' : 'INGENIERÍA DE LEGADO'}
          </span>
          <h2 className="section-title">
            {t('navAbout') === 'About' ? (
              <>Built on <span className="gradient-text">Precision</span> & Trust</>
            ) : (
              <>Construido sobre <span className="gradient-text">Precisión</span> y Confianza</>
            )}
          </h2>
        </div>

        {/* Animated Horizontal Split Logo Showcase */}
        <div className={`split-logo-wrapper ${isMerged ? 'is-merged' : ''}`}>
          {/* Top Split Half */}
          <div className="split-logo-half split-logo-top">
            <img src={logoSrc} alt="Solid State Construction Top Half" className="split-logo-img" />
          </div>

          {/* Bottom Split Half */}
          <div className="split-logo-half split-logo-bottom">
            <img src={logoSrc} alt="Solid State Construction Bottom Half" className="split-logo-img" />
          </div>

          {/* Black & Dark Monochrome Backdrop Glow */}
          <div className="split-logo-glow"></div>
        </div>

        <p className="split-logo-caption">
          {t('navAbout') === 'About' 
            ? 'Serving Leander & Greater Austin with unyielding structural integrity.' 
            : 'Sirviendo a Leander y al gran Austin con integridad estructural inquebrantable.'}
        </p>
      </div>
    </section>
  );
}

export default SplitLogoSection;
