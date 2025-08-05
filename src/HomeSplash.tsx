// HomeSplash.tsx
import { useEffect, useRef } from 'react';
import { ThreeService } from './utils/services/threeService.js';
import { useTheme } from '../src/hooks/useTheme.ts';

export default function HomeSplash() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<ThreeService | null>(null);
  const { isDark } = useTheme();
  
  useEffect(() => {
    const animationInstance = new ThreeService();
    if (canvasRef.current) {
      animationInstance.init(canvasRef.current);
      animationRef.current = animationInstance;
    }
    return () => {
      animationRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    animationRef.current?.setBackgroundColor(isDark);
    animationRef.current?.forceRender();
  }, [isDark]);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-20">
      <canvas
        className="w-full h-full block"
        ref={canvasRef}
        width={800}
        height={800}
      />
    </div>
  );
}
