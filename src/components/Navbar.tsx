import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { toggleAmbientAudio, isAmbientAudioActive } from '../utils/audioTone';

interface NavbarProps {
  onOpenEnrollment: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnrollment }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const active = toggleAmbientAudio();
    setSoundActive(active);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#111111]/10 py-3.5 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-bold tracking-widest text-[#111111] font-monument uppercase whitespace-nowrap shrink-0 hover:text-[#B45309] transition-colors"
          data-cursor="INICIO"
        >
          NARRATIVAU
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-[#111111]/70"
        >
          <a
            href="#manifiesto"
            className="hover:text-[#111111] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            data-cursor="LEER"
          >
            El Manifiesto
          </a>
          <a
            href="#horizontes"
            className="hover:text-[#111111] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            data-cursor="EXPLORAR"
          >
            Horizontes
          </a>
          <a
            href="#estratigrafia"
            className="hover:text-[#111111] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            data-cursor="CAPAS"
          >
            Estratigrafía
          </a>
          <a
            href="#testimonios"
            className="hover:text-[#111111] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            data-cursor="VOZ"
          >
            Cátedra
          </a>
        </nav>

        {/* Zone 3: 1 primary action + sound toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={handleSoundToggle}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#111111]/60 hover:text-[#B45309] border border-[#111111]/10 hover:border-[#B45309]/30 rounded transition-colors"
            title={soundActive ? 'Silenciar atmósfera sonora' : 'Activar atmósfera sonora de biblioteca'}
            aria-label={soundActive ? 'Silenciar atmósfera' : 'Activar atmósfera'}
            data-cursor="AUDIO"
          >
            {soundActive ? <Volume2 className="w-3.5 h-3.5 text-[#B45309] animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline font-mono text-[10px] uppercase">
              {soundActive ? 'Sonido ON' : 'Sonido'}
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenEnrollment}
            className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#111111] hover:bg-[#B45309] rounded transition-all duration-200 whitespace-nowrap shrink-0 shadow-sm"
            data-cursor="APLICAR"
          >
            Convocatoria MMXXVI
          </button>
        </div>
      </div>
    </header>
  );
};
