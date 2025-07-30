import { useEffect, useRef, useState } from 'react';
import { ThreeService } from '../src/utils/threeService.js';

export default function HomeSplash() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animation, setAnimation] = useState(null);

  // on mount hook
  useEffect(() => {
    const animationInstance = new ThreeService();
    animationInstance.init(canvasRef.current);
    setAnimation(animation);
    animationInstance.runLoop();

    return () => {
      animationInstance.stopLoop(); 
      window.removeEventListener('resize', animationInstance.handleResize);
    };
  }, []);

  // useEffect when mouse is clicked
  // animation.sendClick()

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center border-2">
      <canvas
        className="w-full h-full block"
        ref={canvasRef}
        width={800}
        height={800}></canvas>
    </div>
  );
}
