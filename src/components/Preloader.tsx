import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState('Desenterrando las capas del texto...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Check for ?autostart=1
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('autostart') === '1') {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setPercent(prev => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(interval);
          setPhase('Corpus Académico Listo · Entrada Permitida');
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 800);
          }, 350);
          return 100;
        }

        if (next > 70) {
          setPhase('Sincronizando hermenéutica universitaria...');
        } else if (next > 35) {
          setPhase('Decodificando paleografía y variantes textuales...');
        }
        return next;
      });
    }, 55);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`fixed inset-0 z-99999 flex flex-col justify-between p-8 md:p-14 bg-[#F9F8F6] text-[#111111] transition-opacity duration-700 ease-in-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top row */}
      <div className="flex items-center justify-between border-b border-[#111111]/10 pb-4">
        <span className="font-mono text-xs tracking-widest uppercase text-[#111111]/70">
          NARRATIVAU · ARCHIVO CRÍTICO
        </span>
        <span className="font-mono text-xs tracking-widest uppercase text-[#B45309]">
          UNIVERSITAS MMXXVI
        </span>
      </div>

      {/* Middle content */}
      <div className="my-auto max-w-3xl">
        <div className="overflow-hidden">
          <p className="text-xs font-mono tracking-widest uppercase text-[#B45309] mb-3">
            Iniciación de la Experiencia
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif-title font-medium tracking-tight text-[#111111] leading-tight">
            Desenterrando las capas del texto
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#111111]/70 mt-3 transition-all duration-300">
            {phase}
          </p>
        </div>
      </div>

      {/* Bottom row with percentage & progress line */}
      <div>
        <div className="w-full bg-[#111111]/10 h-0.5 relative overflow-hidden mb-4">
          <div
            className="h-full bg-[#B45309] transition-all duration-150 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex items-end justify-between font-mono">
          <div className="text-xs text-[#111111]/60">
            <span>CÓDICES · HERMENÉUTICA · EXÉGESIS</span>
          </div>
          <div className="text-5xl sm:text-7xl font-bold tracking-tighter text-[#111111] tabular-nums">
            {percent}
            <span className="text-xl sm:text-2xl font-light text-[#B45309] ml-1">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
