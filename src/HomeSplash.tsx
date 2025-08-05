import { useEffect, useRef, useState } from 'react';
import { ThreeService } from './utils/services/threeService.js';
import { useTheme } from '../src/hooks/useTheme.ts';

export default function HomeSplash() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animation, setAnimation] = useState(null);
  const { isDark } = useTheme(); // Use the theme hook
  // on mount hook
  useEffect(() => {
    // Clean up previous instance
    if (animation) {
      animation.stopLoop();
      window.removeEventListener('resize', animation.handleResize);
    }

    // Create new instance with current theme
    const animationInstance = new ThreeService();
    if (canvasRef.current) {
      animationInstance.init(canvasRef.current, isDark);
      setAnimation(animationInstance); // Store the instance, not animation
      animationInstance.runLoop();
    }

    return () => {
      animationInstance.stopLoop();
      window.removeEventListener('resize', animationInstance.handleResize);
    };
  }, [isDark]); // Re-run when theme changes

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
