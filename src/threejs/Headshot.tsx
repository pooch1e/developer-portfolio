import { useRef, useEffect, useState } from 'react';
import { HeadshotThreeService } from '../utils/headshotThreeService';

export function Headshot({ glbPath = '../src/assets/draco/joelkscan2.glb' }) {
  const canvasRef = useRef(null);
  const threeServiceRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      threeServiceRef.current = new HeadshotThreeService();
      threeServiceRef.current.init(canvasRef.current, glbPath);
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
      // Convert mouse position to rotation values
      // X position controls Y rotation (left/right head turn)
      // Y position controls X rotation (up/down head tilt)
      const rotationY = mousePosition.x * 0.5; // Adjust sensitivity
      const rotationX = -mousePosition.y * 0.3; // Negative for natural movement

      threeServiceRef.current.model.rotation.y = rotationY;
      threeServiceRef.current.model.rotation.x = rotationX;
    }
  }, [mousePosition]);

  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate normalized position (-1 to 1) relative to canvas center
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);

    // Clamp values to prevent extreme rotations
    const clampedX = Math.max(-1, Math.min(1, x));
    const clampedY = Math.max(-1, Math.min(1, y));

    setMousePosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    // Smoothly return to center when mouse leaves
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
