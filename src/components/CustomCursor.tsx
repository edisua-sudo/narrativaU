import React, { useEffect, useState } from 'react';

/**
 * [AWWWARDS CRITERION: CREATIVITY & MICRO-INTERACTIONS]
 * Cursor personalizado cinemático con interpolación lineal (lerp) suave.
 * Elimina por completo cualquier fuente monoespaciada y utiliza 'Plus Jakarta Sans'
 * con tracking-widest para las etiquetas contextuales de interacción.
 */
export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        'a, button, [role="button"], input, select, textarea, [data-cursor]'
      );
      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute('data-cursor');
        setCursorText(customText || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  useEffect(() => {
    if (isTouchDevice) return;

    let animId: number;
    const lerp = () => {
      setPos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * 0.22,
        y: prev.y + (targetPos.y - prev.y) * 0.22,
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
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-16 h-16 bg-[#005A9C]/15 dark:bg-[#38BDF8]/20 backdrop-blur-xs scale-110 border-[#005A9C] dark:border-[#38BDF8]'
            : 'w-8 h-8 border-slate-900/40 dark:border-white/40 opacity-75'
        }`}
      >
        {cursorText && (
          <span className="text-[9px] font-body font-extrabold tracking-widest uppercase text-[#005A9C] dark:text-[#38BDF8] select-none">
            {cursorText}
          </span>
        )}
      </div>

      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#008A00] transition-transform duration-200 ${
          isHovered ? 'w-2 h-2 scale-150' : 'w-1.5 h-1.5'
        }`}
      />
    </div>
  );
};
