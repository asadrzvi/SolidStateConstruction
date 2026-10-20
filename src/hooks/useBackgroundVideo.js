import { useEffect, useState } from 'react';

// Decides whether an ambient background video should be mounted at all.
// False during prerender and on first paint (so the poster is what ships),
// then true only on wider screens where the user has not asked for reduced
// motion or reduced data. On phones the multi-megabyte loop is never fetched;
// the poster image is the hero.
export default function useBackgroundVideo(minWidth = 768) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const wide = window.matchMedia(`(min-width: ${minWidth}px)`);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = navigator.connection && navigator.connection.saveData;

    const update = () => setEnabled(wide.matches && !reduced.matches && !saveData);
    update();

    wide.addEventListener('change', update);
    reduced.addEventListener('change', update);
    return () => {
      wide.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
    };
  }, [minWidth]);

  return enabled;
}
