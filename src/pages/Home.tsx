// HomeSplash.tsx
import { useEffect, useRef } from 'react';
import { useTheme } from '../provider/ThemeContext.tsx';
import { World } from '../../World/World.ts';

export default function Home() {
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

  return (
    <section className="fixed inset-0 z-20 bg-white dark:bg-zinc-700 transition-colors duration-300 ease-linear">
      <div className="h-full w-full p-8 box-border">
        <div className="w-full h-full border-2 border-gray-300 rounded-sm dark:border-gray-700 overflow-hidden transition-colors duration-300 ease-linear">
          <canvas
            className="w-full h-full block"
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
            }}
          />
        </div>
      </div>
    </section>
  );
}
