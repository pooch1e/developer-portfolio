import { useEffect } from 'react';

interface LoadingScreenProps {
  ready?: boolean;
  progress?: number;
}

// cap progress until 'ready' event fires
const MAX_PROGRESS_BEFORE_READY = 92;

export default function LoadingScreen({
  ready = false,
  progress = 0,
}: LoadingScreenProps) {
  useEffect(() => {
    const bar = document.getElementById('html-loader-bar');
    if (!bar) return;

    const displayProgress = ready
      ? 100
      : Math.min(progress, MAX_PROGRESS_BEFORE_READY);

    bar.style.width = `${displayProgress}%`;
  }, [progress, ready]);

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
