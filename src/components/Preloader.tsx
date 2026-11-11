import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

/**
 * [AWWWARDS CRITERION: PERFORMANCE & CREATIVITY]
 * Pantalla de introducción tipográfica con 'Syne' (Display) y 'Plus Jakarta Sans',
 * utilizando numeración proporcional tabular (tabular-nums) sin fuentes monoespaciadas.
 */
export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState('Desenterrando las capas del texto...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('autostart') === '1') {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setPercent(prev => {
        const next = prev + Math.floor(Math.random() * 10) + 6;
        if (next >= 100) {
          clearInterval(interval);
          setPhase('Plataforma Académica e Histórica Lista');
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 650);
          }, 280);
          return 100;
        }

        if (next > 68) {
          setPhase('Sincronizando hermenéutica universitaria...');
        } else if (next > 35) {
          setPhase('Cargando archivo paleográfico y método inductivo...');
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`fixed inset-0 z-99999 flex flex-col justify-between p-8 md:p-14 bg-[#FAFAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-opacity duration-700 ease-in-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <span className="font-body font-bold text-xs tracking-widest uppercase text-[#005A9C] dark:text-[#38BDF8]">
          NARRATIVAU · PLATAFORMA ACADÉMICA
        </span>
        <span className="font-body font-bold text-xs tracking-widest uppercase text-[#008A00]">
          COHORTE MMXXVI
        </span>
      </div>

      <div className="my-auto max-w-4xl">
        <p className="text-xs font-body font-bold tracking-widest uppercase text-[#005A9C] dark:text-[#38BDF8] mb-3">
          Iniciación de la Experiencia
        </p>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Aprende a interpretar la{' '}
          <span className="font-editorial italic font-normal text-[#005A9C] dark:text-[#38BDF8]">
            narrativa bíblica
          </span>
        </h1>
        <p className="font-body text-base sm:text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed transition-all duration-300">
          {phase}
        </p>
      </div>

      <div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full relative overflow-hidden mb-5">
          <div
            className="h-full bg-gradient-to-r from-[#005A9C] to-[#008A00] transition-all duration-150 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex items-end justify-between font-body">
          <div className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
            <span>HISTORIA · ENTORNO · MÉTODO INDUCTIVO</span>
          </div>
          <div className="text-5xl sm:text-7xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white tabular-nums">
            {percent}
            <span className="text-xl sm:text-2xl font-body font-semibold text-[#008A00] ml-1">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
