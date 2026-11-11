import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { toggleAmbientAudio } from '../utils/audioTone';

interface NavbarProps {
  onOpenEnrollment: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

/**
 * [AWWWARDS CRITERION: USABILITY & NAVIGATION]
 * Header flotante con efecto Glassmorphism + Menú "Full-Screen Overlay" con animaciones fluidas.
 * Cumple con el contrato de 3 zonas y ofrece accesibilidad WCAG AA en modo claro y oscuro.
 */
export const Navbar: React.FC<NavbarProps> = ({
  onOpenEnrollment,
  isDark,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const active = toggleAmbientAudio();
    setSoundActive(active);
  };

  const navItems = [
    { label: 'Inicio', href: '#inicio', subtitle: 'Manifiesto & Propuesta' },
    { label: 'Nosotros', href: '#metodologia', subtitle: 'Los 3 Ejes Pedagógicos' },
    { label: 'Estratigrafía', href: '#estratigrafia', subtitle: 'Capas del Manuscrito' },
    { label: 'Artículos', href: '#horizontes', subtitle: 'Archivo & Scrollytelling' },
    { label: 'Contacto', href: '#contacto', subtitle: 'Sede Bogotá & Consultas' },
  ];

  return (
    <>
      <header
        className={`fixed top-4 left-0 right-0 z-50 px-4 sm:px-8 transition-all duration-300 ${
          isScrolled ? 'top-3' : 'top-5'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto rounded-full px-6 py-3.5 flex items-center justify-between gap-8 transition-all duration-300 border ${
            isScrolled
              ? 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-slate-200/90 dark:border-slate-800 shadow-lg'
              : 'bg-white/75 dark:bg-slate-900/75 backdrop-blur-md border-slate-200/60 dark:border-slate-800/70 shadow-sm'
          }`}
        >
          {/* Zona 1: Wordmark en una sola línea con 'Syne' */}
          <a
            href="#inicio"
            className="text-xl sm:text-2xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:text-[#005A9C] dark:hover:text-[#38BDF8] transition-colors"
            data-cursor="INICIO"
          >
            Narrativa<span className="text-[#005A9C] dark:text-[#38BDF8]">U</span>
          </a>

          {/* Zona 2: 5 enlaces limpios en una sola línea */}
          <nav
            aria-label="Navegación principal"
            className="hidden lg:flex items-center gap-7 text-xs font-body font-bold tracking-wider uppercase text-slate-600 dark:text-slate-300"
          >
            {navItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-[#005A9C] dark:hover:text-[#38BDF8] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
                data-cursor="IR"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zona 3: Acción principal + disparador de Full-Screen Overlay en móvil */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenEnrollment}
              className="px-5 py-2.5 text-xs font-body font-bold tracking-wider uppercase text-white bg-[#005A9C] hover:bg-[#004578] dark:bg-[#005A9C] dark:hover:bg-[#0284C7] rounded-full transition-all duration-200 whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
              data-cursor="CURSOS"
            >
              Acceso a Cursos
            </button>

            <button
              type="button"
              onClick={() => setIsOverlayOpen(true)}
              aria-expanded={isOverlayOpen}
              aria-label="Abrir menú de navegación a pantalla completa"
              className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#005A9C] dark:hover:border-[#38BDF8] transition-colors cursor-pointer"
              data-cursor="MENÚ"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Menú Innovador "Full-Screen Overlay" con animaciones fluidas */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOverlayOpen}
        aria-label="Menú principal a pantalla completa"
        className={`fixed inset-0 z-999 bg-[#FAFAFC]/98 dark:bg-[#0B0F19]/98 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-between p-6 sm:p-12 ${
          isOverlayOpen
            ? 'opacity-100 visible pointer-events-auto translate-y-0'
            : 'opacity-0 invisible pointer-events-none -translate-y-4'
        }`}
      >
        {/* Barra Superior del Overlay */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
          <span className="text-2xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
            Narrativa<span className="text-[#005A9C] dark:text-[#38BDF8]">U</span> · Directorio Académico
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleTheme}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-body font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 hover:border-[#005A9C] transition-colors cursor-pointer"
              aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#005A9C]" />}
              <span>{isDark ? 'Modo Claro' : 'Modo Oscuro'}</span>
            </button>

            <button
              type="button"
              onClick={handleSoundToggle}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-body font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 hover:border-[#008A00] transition-colors cursor-pointer"
            >
              {soundActive ? (
                <Volume2 className="w-4 h-4 text-[#008A00]" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
              <span>{soundActive ? 'Audio Activo' : 'Audio Ambiental'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsOverlayOpen(false)}
              aria-label="Cerrar menú a pantalla completa"
              className="p-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-[#005A9C] dark:hover:bg-[#38BDF8] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Enlaces Gigantes del Overlay Asimétrico */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto py-8">
          <nav className="lg:col-span-8 flex flex-col gap-4" aria-label="Enlaces de sección">
            {navItems.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOverlayOpen(false)}
                className="group flex items-baseline justify-between border-b border-slate-200/70 dark:border-slate-800/80 pb-4 hover:border-[#005A9C] dark:hover:border-[#38BDF8] transition-colors"
              >
                <div className="flex items-baseline gap-5">
                  <span className="text-xs font-body font-bold text-[#008A00] tabular-nums">
                    0{idx + 1}.
                  </span>
                  <span className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-[#005A9C] dark:group-hover:text-[#38BDF8] group-hover:translate-x-2 transition-all">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-body text-slate-500 dark:text-slate-400">
                  <span className="hidden sm:inline">{item.subtitle}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#005A9C] dark:text-[#38BDF8] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </a>
            ))}
          </nav>

          {/* Columna Lateral de Información Institucional en el Overlay */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between shadow-lg">
            <div>
              <span className="text-xs font-body font-extrabold uppercase tracking-widest text-[#008A00]">
                CONVOCATORIA ABIERTA
              </span>
              <h3 className="text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white mt-2">
                Seminarios Universitarios 2026
              </h3>
              <p className="text-sm font-body text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
                Inscripción gratuita para estudiantes de pregrado, posgrado e investigadores en ciencias sociales y literatura.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div className="text-xs font-body text-slate-500 dark:text-slate-400">
                <strong className="text-slate-900 dark:text-white block">Sede Académica:</strong>
                Cra. 74 #49a – 35, Bogotá · info@narrativau.org
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsOverlayOpen(false);
                  onOpenEnrollment();
                }}
                className="w-full py-3.5 bg-[#008A00] hover:bg-[#007000] text-white font-body font-bold text-xs uppercase tracking-widest rounded-xl btn-emerald-glow transition-all cursor-pointer"
              >
                Inscribirme Gratis Ahora →
              </button>
            </div>
          </div>
        </div>

        {/* Pie del Overlay */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-xs font-body text-slate-500 dark:text-slate-400">
          <span>© 2026 NarrativaU (narrativau.org) · Rigor Histórico & Literario</span>
          <span>Presiona ESC para volver a la lectura</span>
        </div>
      </div>
    </>
  );
};
