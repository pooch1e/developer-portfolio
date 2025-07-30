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
    animationInstance.runAnimation();
  }, []);

  // useEffect when mouse is clicked
  // animation.sendClick()

  return (
    <div className="flex flex-col justify-center content-center">
      <p>3D image thing here...</p>
      <canvas
        className="border-2"
        ref={canvasRef}
        width={800}
        height={800}></canvas>
    </div>
  );
}
