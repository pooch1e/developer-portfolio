import { useEffect, useRef, useState } from 'react';
import { ThreeService } from './utils/threeService.js';

export default function HomeSplash() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animation, setAnimation] = useState(null);

  // on mount hook
  useEffect(() => {
    const animationInstance = new ThreeService();
    if (canvasRef.current) {
      animationInstance.init(canvasRef.current);
      setAnimation(animation);
      animationInstance.runLoop();
    }

    return () => {
      animationInstance.stopLoop();
      window.removeEventListener('resize', animationInstance.handleResize);
    };
  }, []);

  // useEffect when mouse is clicked
  // animation.sendClick()

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 block">
      <canvas
        className="ml-4 w-full h-full block"
        ref={canvasRef}
        width={800}
        height={800}></canvas>
    </div>
  );
}
