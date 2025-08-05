import { useEffect, useRef, useState } from 'react';
import { ThreeService } from './utils/services/threeService.js';
import { useTheme } from '../src/hooks/useTheme.ts';

export default function HomeSplash() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<ThreeService | null>(null);
  const resizeHandlerRef = useRef<(() => void) | null>(null);
  const [animation, setAnimation] = useState(null);
  const { isDark } = useTheme(); // Use the theme hook

  useEffect(() => {
    const animationInstance = new ThreeService();

    if (canvasRef.current) {
      animationInstance.init(canvasRef.current, isDark);
      animationInstance.runLoop();

      animationRef.current = animationInstance;

      const boundResize =
        animationInstance.handleResize.bind(animationInstance);
      window.addEventListener('resize', boundResize);
      resizeHandlerRef.current = boundResize;
    }

    return () => {
      animationRef.current?.stopLoop();

      if (resizeHandlerRef.current) {
        window.removeEventListener('resize', resizeHandlerRef.current);
      }

      animationRef.current?.dispose();
      animationRef.current = null;
    };
  }, [isDark]);

  // React to theme change only by updating background
  useEffect(() => {
    animationRef.current?.setBackgroundColor(isDark);
  }, [isDark]);
  // useEffect when mouse is clicked
  // animation.sendClick()

  return (
    <div className="fixed top-0 left-0 w-full h-full z-20 dark">
      <canvas
        className="w-full h-full block"
        ref={canvasRef}
        width={800}
        height={800}></canvas>
    </div>
  );
}
