/**
 * Home — full-viewport splash that mounts the Three.js World scene into a
 * framed canvas and keeps its background in sync with the active theme.
 */
import { useEffect, useRef } from 'react';
import { useTheme } from '../provider/ThemeContext.tsx';
import { World } from '@world/World';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<World | null>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const worldInstance = new World(canvasRef.current, isDark);
    worldRef.current = worldInstance;
    worldInstance.start();

    return () => {
      worldRef.current?.stop();
      worldRef.current = null;
    };
  }, [isDark]);

  return (
    <section className="fixed inset-0 z-20 bg-bg-primary transition-colors duration-300 ease-linear">
      <div className="h-full w-full p-8 box-border">
        <div className="w-full h-full border-2 border-border-strong rounded-sm overflow-hidden transition-colors duration-300 ease-linear">
          <canvas
            className="w-full h-full block"
            ref={canvasRef}
            
          />
        </div>
      </div>
    </section>
  );
}
