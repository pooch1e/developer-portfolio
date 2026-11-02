/**
 * Home — full-viewport splash that mounts the Three.js World scene into a
 * framed canvas and keeps its background in sync with the active theme.
 */
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useTheme } from '../provider/ThemeContext.tsx';
import { World } from '@world/World';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<World | null>(null);
  const { isDark } = useTheme();
  const initialIsDark = useRef(isDark);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const worldInstance = new World(canvasRef.current, initialIsDark.current);
    worldRef.current = worldInstance;
    worldInstance.start();

    return () => {
      worldRef.current?.stop();
      worldRef.current = null;
    };
  }, []);

  // Layout effect so the canvas repaints inside the theme view transition's
  // update callback, before the new-state snapshot is captured.
  useLayoutEffect(() => {
    worldRef.current?.setBackgroundColor(isDark);
  }, [isDark]);

  return (
    <section className="fixed inset-0 z-20 bg-bg-primary">
      <div className="h-full w-full p-8 box-border">
        <div className="w-full h-full border-2 border-border-strong rounded-sm overflow-hidden">
          <canvas
            className="w-full h-full block"
            ref={canvasRef}
            
          />
        </div>
      </div>
    </section>
  );
}
