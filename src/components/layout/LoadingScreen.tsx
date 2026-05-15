import { useEffect } from 'react';

export default function LoadingScreen() {
  useEffect(() => {
    const loader = document.getElementById('html-loader');
    if (!loader) return;

    // Bar animates for 1.5s (CSS transition), then fade out
    const fadeTimer = setTimeout(() => {
      loader.style.opacity = '0';
    }, 1500);

    // Remove from DOM after fade completes (0.6s)
    const removeTimer = setTimeout(() => {
      loader.remove();
    }, 2100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return null;
}
