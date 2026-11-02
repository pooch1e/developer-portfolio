import { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { HeadshotThreeService } from '@/utils/services/headshotThreeService';
import { useTheme } from '@/provider/ThemeContext';

interface HeadshotProps {
  glbPath?: string;
}

export function Headshot({
  glbPath = '/assets/draco/joelkscan2.glb',
}: HeadshotProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const threeServiceRef = useRef<HeadshotThreeService | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false);
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    if (canvasRef.current) {
      threeServiceRef.current = new HeadshotThreeService();
      threeServiceRef.current.isDarkMode = isDarkRef.current;
      threeServiceRef.current.init(canvasRef.current, glbPath);

      const checkModelLoaded = setInterval(() => {
        if (threeServiceRef.current?.model) {
          setIsModelLoaded(true);
          console.log(isModelLoaded, 'model loaded');
          threeServiceRef.current.setRenderMode('pointcloud');
          clearInterval(checkModelLoaded);
        }
      }, 100);
    }

    return () => {
      threeServiceRef.current?.dispose();
    };
  }, [glbPath]);

  useLayoutEffect(() => {
    isDarkRef.current = isDark;
    threeServiceRef.current?.setDarkMode(isDark);
  }, [isDark]);

  useEffect(() => {
    if (threeServiceRef.current?.model) {
      const rotationY = mousePosition.x * 0.5;
      const rotationX = -mousePosition.y * 0.3;

      threeServiceRef.current.model.rotation.y = rotationY;
      threeServiceRef.current.model.rotation.x = rotationX;
    }
  }, [mousePosition]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);

    const clampedX = Math.max(-1, Math.min(1, x));
    const clampedY = Math.max(-1, Math.min(1, y));

    setMousePosition({ x: clampedX, y: clampedY });
    threeServiceRef.current?.setSwarmPointer(x, -y);
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    handleMouseMove(e);
    threeServiceRef.current?.setSwarmActive(true);
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    threeServiceRef.current?.setSwarmActive(false);
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
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}
