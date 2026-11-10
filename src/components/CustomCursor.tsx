import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('a, button, [role="button"], input, select, textarea, [data-cursor]');
      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute('data-cursor');
        setCursorText(customText || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  // Smooth lerp follow
  useEffect(() => {
    if (isTouchDevice) return;

    let animId: number;
    const lerp = () => {
      setPos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * 0.2,
        y: prev.y + (targetPos.y - prev.y) * 0.2,
      }));
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [targetPos, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-9999 transition-opacity duration-300"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        left: 0,
        top: 0,
      }}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#111111] transition-all duration-300 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-14 h-14 bg-[#111111]/10 backdrop-blur-xs scale-110 border-[#B45309]'
            : 'w-8 h-8 opacity-60'
        }`}
      >
        {cursorText && (
          <span className="text-[9px] font-mono tracking-widest uppercase text-[#B45309] font-bold select-none">
            {cursorText}
          </span>
        )}
      </div>

      {/* Center dot */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B45309] transition-transform duration-200 ${
          isHovered ? 'w-2 h-2 scale-150' : 'w-1.5 h-1.5'
        }`}
      />
    </div>
  );
};
