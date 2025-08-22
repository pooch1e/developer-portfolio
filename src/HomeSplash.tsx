// HomeSplash.tsx
import { useEffect, useRef } from 'react';

import { useTheme } from '../src/providor/ThemeContext.tsx';
import { World } from '../World/World.ts';
export default function HomeSplash() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<World | null>(null);

  const { isDark } = useTheme();

  useEffect(() => {
    if (canvasRef.current) {
      const worldInstance = new World(canvasRef.current, isDark);
      worldRef.current = worldInstance;
      worldInstance.start();
    }

    // Cleanup function
    return () => {
      if (worldRef.current) {
        worldRef.current.stop();
        worldRef.current = null;
      }
    };
  }, [isDark]);

  // Handle theme changes after initial mount
  useEffect(() => {
    if (worldRef.current) {
      worldRef.current.setBackgroundColor(isDark);
    }
  }, [isDark]);

  // Initialize once on mount
  // useEffect(() => {
  // const animationInstance = new ThreeService();

  //refactored attempt
  // if (canvasRef.current) {
  //   const animationInstance = new World(canvasRef.current);
  // animationInstance.start();
  // }

  // if (canvasRef.current) {
  //   animationInstance.init(canvasRef.current, isDark); // Pass initial theme
  //   animationRef.current = animationInstance;
  // }
  // return () => {
  //   animationRef.current?.dispose();
  // };
  // }, []);

  // Handle theme changes
  // useEffect(() => {
  // console.log('Theme changed to isDark:', isDark);
  // console.log('animationRef.current exists:', !!animationRef.current);

  // if (animationRef.current) {
  // console.log('Calling setBackgroundColor');
  // Add a small delay to ensure everything is ready
  // setTimeout(() => {
  //   animationRef.current!.setBackgroundColor(isDark);
  // }, 10);
  //   }
  // }, [isDark]);

  return (
    <section className="fixed top-0 left-0 w-full h-full z-20">
      <canvas className="w-full h-full block" ref={canvasRef} />
    </section>
  );
}
