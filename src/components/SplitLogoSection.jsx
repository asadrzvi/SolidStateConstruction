import React, { useEffect, useRef, useState } from 'react';
const logoLight = '/logo.png?v=2';
const logoDark = '/logo_dark.png?v=2';
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
    // Merge once, then stay merged. Previously this reset to the split state
    // whenever the section left the viewport, which left the logo sitting at
    // opacity:0 at rest and meant any screenshot mid-scroll caught it in
    // fragments. The reveal should be a first-impression, not a loop.
    const element = sectionRef.current;
    if (!element) return;

    // No IntersectionObserver support, or reduced motion: show it immediately.
    const reduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (typeof IntersectionObserver === 'undefined' || reduced) {
      setIsMerged(true);
      return;
    }

    const intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsMerged(true);
            observer.unobserve(entry.target); // one-shot
          }
        });
      },
      {
        threshold: 0.2, // Triggers when 20% visible
        rootMargin: '0px 0px -50px 0px'
      }
    );

    intersectionObserver.observe(element);

    // Safety net: if the section is already past/above the fold on load and the
    // observer never fires, don't leave the logo permanently invisible.
    const failsafe = setTimeout(() => setIsMerged(true), 2500);

    return () => {
      clearTimeout(failsafe);
      intersectionObserver.disconnect();
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
