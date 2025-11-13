import { useState, useRef, useCallback } from "react";

export function useImageZoom() {
  const [showZoom, setShowZoom] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const containerRef = useRef(null);
  const lensRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current || !lensRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const lensW = lensRef.current.offsetWidth;
    const lensH = lensRef.current.offsetHeight;

    const maxX = rect.width - lensW;
    const maxY = rect.height - lensH;

    const newX = Math.max(0, Math.min(maxX, x - lensW / 2));
    const newY = Math.max(0, Math.min(maxY, y - lensH / 2));

    setLensPos({ x: newX, y: newY });
    setZoomPos({
      x: (newX / maxX) * 100 || 50,
      y: (newY / maxY) * 100 || 50,
    });
  }, []);

  const handleMouseEnter = useCallback(() => setShowZoom(true), []);
  const handleMouseLeave = useCallback(() => setShowZoom(false), []);

  return {
    showZoom,
    lensPos,
    zoomPos,
    containerRef,
    lensRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
}
