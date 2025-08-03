import { useRef, useEffect, useState } from 'react';
import { HeadshotThreeService } from '../utils/headshotThreeService';

export function Headshot({ glbPath = '../src/assets/draco/joelkscan2.glb' }) {
  const canvasRef = useRef(null);
  const threeServiceRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      threeServiceRef.current = new HeadshotThreeService();
      threeServiceRef.current.init(canvasRef.current, glbPath);

      const checkModelLoaded = setInterval(() => {
        if (threeServiceRef.current && threeServiceRef.current.model) {
          setIsModelLoaded(true);
          // Automatically set to point cloud mode when model loads
          threeServiceRef.current.setRenderMode('pointcloud');
          clearInterval(checkModelLoaded);
        }
      }, 100);
    }

    return () => {
      if (threeServiceRef.current) {
        threeServiceRef.current.dispose();
      }
    };
  }, [glbPath]);

  // Update model rotation based on mouse position
  useEffect(() => {
    if (threeServiceRef.current && threeServiceRef.current.model) {
      const rotationY = mousePosition.x * 0.5;
      const rotationX = -mousePosition.y * 0.3;

      threeServiceRef.current.model.rotation.y = rotationY;
      threeServiceRef.current.model.rotation.x = rotationX;
    }
  }, [mousePosition]);

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);

    const clampedX = Math.max(-1, Math.min(1, x));
    const clampedY = Math.max(-1, Math.min(1, y));

    setMousePosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <canvas
      ref={canvasRef}
      className=""
      style={{
        aspectRatio: '1/1',
        maxWidth: '500px',
        maxHeight: '500px',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}
