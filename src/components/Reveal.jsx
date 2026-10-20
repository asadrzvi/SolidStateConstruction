import React, { useEffect, useRef, useState } from 'react';

// One shared IntersectionObserver for every revealed element on the page.
// Visibility is React state (not a classList side effect) so a parent that
// re-renders with a different className can never wipe the revealed state.
// Elements already inside the viewport when they mount are marked visible
// synchronously, so nothing above the fold blinks when the app boots over
// the prerendered markup.
const callbacks = typeof WeakMap !== 'undefined' ? new WeakMap() : null;
let observer = null;

function getObserver() {
  if (observer || typeof IntersectionObserver === 'undefined' || !callbacks) return observer;
  observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cb = callbacks.get(entry.target);
          if (cb) cb();
          obs.unobserve(entry.target);
          callbacks.delete(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  return observer;
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
  style,
  ...rest
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const obs = getObserver();
    if (!obs || prefersReducedMotion()) {
      setInView(true);
      return undefined;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
      return undefined;
    }

    callbacks.set(el, () => setInView(true));
    obs.observe(el);
    return () => {
      obs.unobserve(el);
      callbacks.delete(el);
    };
  }, []);

  const cls = `${className}${inView ? ' is-in' : ''}`.trim();

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={cls}
      style={delay ? { ...style, '--d': `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
