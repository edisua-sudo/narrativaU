import React, { useRef, useState, useEffect } from 'react';
import { ArrowDownRight, Compass } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenEnrollment: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenEnrollment,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const magneticButtonRef = useRef<HTMLButtonElement>(null);

  // Parallax tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });

    // Magnetic button calculation
    if (magneticButtonRef.current) {
      const btnRect = magneticButtonRef.current.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;
      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

      if (dist < 120) {
        const pullFactor = 0.35;
        setMagneticPos({
          x: (e.clientX - btnCenterX) * pullFactor,
          y: (e.clientY - btnCenterY) * pullFactor,
        });
      } else {
        setMagneticPos({ x: 0, y: 0 });
      }
    }
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setMagneticPos({ x: 0, y: 0 });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[94vh] pt-32 pb-16 flex flex-col justify-between overflow-hidden border-b border-[#111111]/10 manuscript-texture"
      id="manifiesto"
    >
      {/* Giant floating background typography watermark / parallax shadow */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden opacity-[0.035] transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * -40}px, ${mouseOffset.y * -30}px, 0)`,
        }}
        aria-hidden="true"
      >
        <span className="font-monument text-[18vw] font-black leading-none whitespace-nowrap text-[#111111]">
          BERESHIT
        </span>
      </div>

      {/* Floating 3D/parchment fragment in background */}
      <div
        className="pointer-events-none absolute right-[-5%] top-[15%] w-[450px] lg:w-[600px] h-[550px] rounded-lg overflow-hidden shadow-2xl opacity-40 mix-blend-multiply transition-transform duration-700 ease-out hidden md:block"
        style={{
          transform: `translate3d(${mouseOffset.x * 35}px, ${mouseOffset.y * 25}px, 0) rotate(${mouseOffset.x * 6}deg)`,
        }}
        aria-hidden="true"
      >
        <img
          src="/src/assets/images/ancient_biblical_codex_1794060065998.jpg"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter contrast-110 sepia-[0.25]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F8F6] via-transparent to-transparent" />
      </div>

      {/* Main hero content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full my-auto">
        {/* Editorial kicker */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-[#B45309] mb-6">
          <span>VOL. MMXXVI</span>
          <span aria-hidden="true">·</span>
          <span>ESTUDIOS HISTÓRICO-CRÍTICOS</span>
          <span aria-hidden="true">·</span>
          <span>CÁTEDRA ABIERTA</span>
        </div>

        {/* Massive Serif Title with clip-path mask effect */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-title font-normal tracking-tight text-[#111111] leading-[1.05] text-balance">
            <span className="inline-block overflow-hidden pb-2">
              <span className="inline-block transition-transform duration-1000 ease-out translate-y-0">
                Aprende a
              </span>
            </span>{' '}
            <span className="inline-block overflow-hidden pb-2 font-serif italic text-[#B45309]">
              <span className="inline-block transition-transform duration-1000 ease-out translate-y-0">
                interpretar
              </span>
            </span>{' '}
            <span className="inline-block overflow-hidden pb-2">
              <span className="inline-block transition-transform duration-1000 ease-out translate-y-0">
                la Narrativa
              </span>
            </span>{' '}
            <span className="inline-block overflow-hidden pb-2 font-serif-title font-semibold">
              <span className="inline-block transition-transform duration-1000 ease-out translate-y-0">
                Bíblica
              </span>
            </span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl md:text-2xl text-[#111111]/80 max-w-2xl font-serif leading-relaxed">
            Desentierra las capas del texto antiguo con rigor filológico, poética hebrea y crítica histórica en el entorno universitario libre de anacronismos.
          </p>
        </div>

        {/* Interactive Magnetic CTA & Action Cluster */}
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <button
            ref={magneticButtonRef}
            type="button"
            onClick={onExploreClick}
            style={{
              transform: `translate3d(${magneticPos.x}px, ${magneticPos.y}px, 0)`,
            }}
            className="magnetic-btn group relative inline-flex items-center gap-4 px-8 py-4 bg-[#111111] text-white text-xs font-mono tracking-widest uppercase rounded hover:bg-[#B45309] transition-colors shadow-lg"
            data-cursor="DESCUBRIR"
          >
            <span>Explorar Capas del Corpus</span>
            <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          </button>

          <button
            type="button"
            onClick={onOpenEnrollment}
            className="inline-flex items-center gap-2 px-6 py-4 border border-[#111111]/20 hover:border-[#B45309] text-xs font-mono tracking-widest uppercase text-[#111111] hover:text-[#B45309] rounded transition-colors"
            data-cursor="MATRÍCULA"
          >
            <Compass className="w-4 h-4 text-[#B45309]" />
            <span>Postular a la Cátedra</span>
          </button>
        </div>
      </div>

      {/* Proof Strip / Operational Indicators adhering to claim-to-proof adjacency */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full mt-12 pt-8 border-t border-[#111111]/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl lg:text-4xl font-serif-title font-bold text-[#111111] tabular-nums">
              32
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#111111]/60 mt-1">
              Universidades Convocadas
            </div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-serif-title font-bold text-[#111111] tabular-nums">
              1,450+
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#111111]/60 mt-1">
              Estudiantes Egresados
            </div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-serif-title font-bold text-[#111111] tabular-nums">
              18
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#111111]/60 mt-1">
              Códices y Papiros en 8K
            </div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-serif-title font-bold text-[#B45309] tabular-nums">
              100%
            </div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#111111]/60 mt-1">
              Filología Independiente
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
