import { useEffect, useRef, useState } from 'react';
import { ThreeService } from '../src/utils/threeService.js';

export default function HomeSplash() {
  const canvasRef: any = useRef(null);
  const [animation, setAnimation] = useState();

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
    <div>
      <p>3d image thing here...</p>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
