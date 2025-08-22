// HomeSplash.tsx
import { useEffect, useRef } from 'react';
import { ThreeService } from './utils/services/threeService.js';
import { useTheme } from '../src/providor/ThemeContext.tsx';
import { World } from '../World/World.ts';
export default function HomeSplash() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<ThreeService | null>(null);
  const { isDark } = useTheme();

  // Initialize once on mount
  useEffect(() => {
    // const animationInstance = new ThreeService();

    //refactored attempt
    if (canvasRef.current) {
      const animationInstance = new World(canvasRef.current);
    }

    // if (canvasRef.current) {
    //   animationInstance.init(canvasRef.current, isDark); // Pass initial theme
    //   animationRef.current = animationInstance;
    // }
    // return () => {
    //   animationRef.current?.dispose();
    // };
  }, []);

  // Handle theme changes
  useEffect(() => {
    // console.log('Theme changed to isDark:', isDark);
    // console.log('animationRef.current exists:', !!animationRef.current);

    if (animationRef.current) {
      // console.log('Calling setBackgroundColor');
      // Add a small delay to ensure everything is ready
      setTimeout(() => {
        animationRef.current!.setBackgroundColor(isDark);
      }, 10);
    }
  }, [isDark]);

  return (
    <section className="fixed top-0 left-0 w-full h-full z-20">
      <canvas className="w-full h-full block" ref={canvasRef} />
    </section>
  );
}
