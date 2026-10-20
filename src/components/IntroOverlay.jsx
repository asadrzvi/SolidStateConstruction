import React, { useEffect, useRef, useState } from 'react';
import './IntroOverlay.css';

const logoDark = '/logo_dark.png?v=2';

// Plays once per browser session. Reveal-style intro: a brand-dark ground is
// already painted by index.html, the mark resolves, a level line draws, then the
// ground lifts away. Content renders underneath the whole time, so the intro
// never delays LCP or hides the phone number for longer than the lift.
const SESSION_KEY = 'ssc_intro_played';
const HOLD_MS = 920;    // mark visible before the ground starts lifting
const LIFT_MS = 780;    // ground lift duration (keep in sync with the CSS)

function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function IntroOverlay() {
  // Decide synchronously on first render so we never flash the overlay for
  // visitors who should not see it.
  const [phase, setPhase] = useState(() => {
    if (typeof window === 'undefined') return 'done';
    if (prefersReducedMotion()) return 'done';
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return 'done';
    } catch (e) {
      /* private mode — fall through and play it */
    }
    return 'enter';
  });

  const timers = useRef([]);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (phase === 'done') {
      document.documentElement.removeAttribute('data-intro');
      return;
    }

    document.documentElement.setAttribute('data-intro', 'active');
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (e) {}

    // Freeze scroll while the ground is covering the page.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setPhase('lift');
      timers.current.push(setTimeout(() => setPhase('done'), LIFT_MS));
    };

    timers.current.push(setTimeout(finish, HOLD_MS));

    // Any deliberate input skips straight to the lift — never trap the user.
    const skip = () => finish();
    window.addEventListener('keydown', skip, { once: true });
    window.addEventListener('wheel', skip, { once: true, passive: true });
    window.addEventListener('touchstart', skip, { once: true, passive: true });
    window.addEventListener('pointerdown', skip, { once: true });

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      document.body.style.overflow = prevOverflow;
      document.documentElement.removeAttribute('data-intro');
      window.removeEventListener('keydown', skip);
      window.removeEventListener('wheel', skip);
      window.removeEventListener('touchstart', skip);
      window.removeEventListener('pointerdown', skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase === 'done']);

  if (phase === 'done') return null;

  return (
    <div
      className={`intro-overlay ${phase === 'lift' ? 'is-lifting' : ''}`}
      role="presentation"
      aria-hidden="true"
    >
      <div className="intro-inner">
        <img className="intro-mark" src={logoDark} alt="" width="210" height="211" />
        <span className="intro-rule" />
      </div>
    </div>
  );
}
