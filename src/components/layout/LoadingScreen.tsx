import { useEffect } from 'react';

interface LoadingScreenProps {
  ready?: boolean;
}

export default function LoadingScreen({ ready = false }: LoadingScreenProps) {
  useEffect(() => {
    if (!ready) return;

    const loader = document.getElementById('html-loader');
    if (!loader) return;

    const fadeTimer = setTimeout(() => {
      loader.style.opacity = '0';
    }, 200);

    const removeTimer = setTimeout(() => {
      loader.remove();
    }, 900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [ready]);

  return null;
}
