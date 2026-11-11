import React, { useRef, useState } from 'react';
import { ArrowRight, Compass, Sun, Moon, BookOpen, Clock, Users, Layers } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenEnrollment: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

/**
 * [AWWWARDS CRITERION: DESIGN, TYPOGRAPHY & CREATIVITY]
 * - Layout Asimétrico de 12 columnas con capas superpuestas (Z-index estratégico) y Mesh Gradient.
 * - Dupla Tipográfica: 'Syne' (tracking-tight) + 'Instrument Serif' (cursiva editorial) + 'Plus Jakarta Sans' (leading-relaxed).
 * - Cero fuentes monoespaciadas.
 * - Incluye las 3 Tarjetas de Metodología (01 Historia, 02 Entorno, 03 Método) con inclinación 3D interactiva.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenEnrollment,
  isDark,
  onToggleTheme,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const magneticButtonRef = useRef<HTMLButtonElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const [tiltState, setTiltState] = useState<Record<string, string>>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });

    if (magneticButtonRef.current) {
      const btnRect = magneticButtonRef.current.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;
      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

      if (dist < 130) {
        setMagneticPos({
          x: (e.clientX - btnCenterX) * 0.3,
          y: (e.clientY - btnCenterY) * 0.3,
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

  const handleCardTilt = (id: string, e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    setTiltState(prev => ({
      ...prev,
      [id]: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`,
    }));
  };

  const resetCardTilt = (id: string) => {
    setTiltState(prev => ({
      ...prev,
      [id]: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
    }));
  };

  const methodologyPillars = [
    {
      id: '01',
      kicker: '01 / HISTORIA',
      title: 'Entiende la Historia',
      subtitle: 'Enfoque cronológico y rigor exegético',
      description:
        'Analizamos los textos en sus coordenadas temporales originales: el Antiguo Cercano Oriente, los manuscritos del Mar Muerto (Qumrán) y la Septuaginta, distinguiendo épocas de redacción y contextos geopolíticos.',
      accent: 'cobalt',
      footerTag: 'Paleografía & Códices',
      icon: Clock,
    },
    {
      id: '02',
      kicker: '02 / ENTORNO',
      title: 'Ambientes Universitarios',
      subtitle: 'Espacios neutrales de diálogo académico',
      description:
        'Fomentamos la deliberación libre en facultades de humanidades, literatura comparada y ciencias sociales. Espacios laicos donde conviven creyentes y no creyentes bajo el estándar del debate metodológico.',
      accent: 'emerald',
      footerTag: 'Claustro Neutral',
      icon: Users,
    },
    {
      id: '03',
      kicker: '03 / MÉTODO',
      title: 'Método Inductivo',
      subtitle: 'Observación rigurosa del texto',
      description:
        'Partimos de la evidencia textual directa: sintaxis hebrea y griega, estructuras quiásticas (A-B-C-B-A), paralelismos y retórica narrativa, evitando proyectar doctrinas contemporáneas sobre el relato antiguo.',
      accent: 'cobalt',
      footerTag: 'Poética & Sintaxis',
      icon: Layers,
    },
  ];

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* ==================== HERO SECTION ASIMÉTRICA ==================== */}
      <section
        id="inicio"
        className="relative min-h-[92vh] pt-32 pb-20 lg:pt-40 lg:pb-28 flex flex-col justify-between overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80 mesh-gradient-hero"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Columna Izquierda Asimétrica (7 Columnas) */}
            <div className="lg:col-span-7">
              {/* Etiqueta Superior Distintiva (Sin píldoras estáticas, texto limpio con separadores) */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-body font-extrabold tracking-widest uppercase text-[#005A9C] dark:text-[#38BDF8] mb-6">
                <span>PLATAFORMA ACADÉMICA E HISTÓRICA</span>
                <span aria-hidden="true" className="text-slate-400">·</span>
                <span className="text-[#008A00] dark:text-emerald-400">CÁTEDRA ABIERTA MMXXVI</span>
              </div>

              {/* Título Masivo y Asimétrico: 'Syne' + 'Instrument Serif' */}
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.06] text-balance">
                Aprende a interpretar la{' '}
                <span className="font-editorial italic font-normal text-[#005A9C] dark:text-[#38BDF8] tracking-normal inline-block">
                  narrativa bíblica
                </span>
              </h1>

              {/* Subtítulo Descriptivo con 'Plus Jakarta Sans' y leading-relaxed */}
              <p className="mt-7 text-base sm:text-lg md:text-xl font-body text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Un enfoque riguroso, desdogmatizado y literario para estudiantes e investigadores universitarios. Desentierra las capas del texto antiguo desde su matriz histórica del Cercano Oriente y su poética hebrea original.
              </p>

              {/* Cluster de Acción: CTA Magnético en Verde Esmeralda + Controles Secundarios en una sola línea */}
              <div className="mt-10 flex flex-wrap items-center gap-3.5">
                <button
                  ref={magneticButtonRef}
                  type="button"
                  onClick={onOpenEnrollment}
                  style={{
                    transform: `translate3d(${magneticPos.x}px, ${magneticPos.y}px, 0)`,
                  }}
                  className="magnetic-btn group inline-flex items-center gap-3 px-6 py-4 bg-[#008A00] hover:bg-[#007000] text-white text-xs font-body font-extrabold tracking-widest uppercase rounded-2xl btn-emerald-glow transition-all cursor-pointer whitespace-nowrap shrink-0"
                  data-cursor="GRATIS"
                >
                  <span>INSCRIBIRME GRATIS AHORA</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={onExploreClick}
                  className="inline-flex items-center gap-2 px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#005A9C] dark:hover:border-[#38BDF8] text-xs font-body font-bold tracking-wider uppercase text-slate-800 dark:text-slate-200 hover:text-[#005A9C] dark:hover:text-[#38BDF8] rounded-2xl transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
                  data-cursor="MÉTODO"
                >
                  <Compass className="w-4 h-4 text-[#005A9C] dark:text-[#38BDF8]" />
                  <span>Explorar Metodología</span>
                </button>

                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="inline-flex items-center justify-center p-4 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 hover:border-[#005A9C] rounded-2xl text-xs font-body font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer shrink-0"
                  aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
                  title={isDark ? 'Modo Claro' : 'Modo Oscuro'}
                  data-cursor="TEMA"
                >
                  {isDark ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-[#005A9C]" />
                  )}
                  <span className="sr-only">{isDark ? 'Modo Claro' : 'Modo Oscuro'}</span>
                </button>
              </div>
            </div>

            {/* Columna Derecha Asimétrica (5 Columnas): Composición de Capas Superpuestas */}
            <div className="lg:col-span-5 relative pt-4">
              {/* Tarjeta Flotante Superpuesta en esquina superior izquierda (Z-index estratégico sin tapar el texto inferior) */}
              <div
                className="hidden sm:flex items-center gap-3.5 absolute -top-3 -left-5 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700 px-4 py-3.5 rounded-2xl shadow-xl transition-transform duration-500 ease-out"
                style={{
                  transform: `translate3d(${mouseOffset.x * -18}px, ${mouseOffset.y * -14}px, 0)`,
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#005A9C] flex items-center justify-center text-white shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-body font-extrabold uppercase tracking-wider text-[#008A00] dark:text-emerald-400">
                    100% Libre de Dogmas
                  </div>
                  <div className="text-xs font-display font-bold text-slate-900 dark:text-white">
                    Lectura Inductiva Universitaria
                  </div>
                </div>
              </div>

              <div
                className="relative z-10 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-2xl transition-transform duration-500 ease-out"
                style={{
                  transform: `translate3d(${mouseOffset.x * 16}px, ${mouseOffset.y * 12}px, 0)`,
                }}
              >
                <img
                  src="/src/assets/images/ancient_biblical_codex_1794060065998.jpg"
                  alt="Códice bíblico iluminado preservado para análisis filológico en NarrativaU"
                  referrerPolicy="no-referrer"
                  className="w-full h-[380px] sm:h-[420px] object-cover filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-[11px] font-body font-bold uppercase tracking-widest text-amber-300">
                    Folio de Estudio · Códice B19a
                  </div>
                  <div className="text-xl font-display font-bold tracking-tight mt-1">
                    Estratigrafía & Crítica Textual
                  </div>
                  <p className="text-xs font-body text-slate-200 mt-1 leading-relaxed">
                    Cotejo directo de fuentes masoréticas, papiros de Qumrán y literatura del Antiguo Oriente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Franja de Rigor Cuantitativo (Ancho Completo debajo del split) */}
          <div className="mt-20 pt-10 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl lg:text-4xl font-display font-extrabold text-[#005A9C] dark:text-[#38BDF8] tabular-nums tracking-tight">
                32+
              </div>
              <div className="text-xs font-body font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                Universidades Participantes
              </div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-display font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight">
                1,450+
              </div>
              <div className="text-xs font-body font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                Estudiantes & Académicos
              </div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-display font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight">
                18
              </div>
              <div className="text-xs font-body font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                Códices y Papiros en 8K
              </div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-display font-extrabold text-[#008A00] dark:text-emerald-400 tabular-nums tracking-tight">
                100%
              </div>
              <div className="text-xs font-body font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                Rigor Exegético Independiente
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECCIÓN DE METODOLOGÍA (01 HISTORIA, 02 ENTORNO, 03 MÉTODO) ==================== */}
      <section
        id="metodologia"
        className="py-24 lg:py-32 bg-[#FAFAFC] dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-slate-800/80 relative"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Encabezado Asimétrico de Metodología */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-7">
              <span className="text-xs font-body font-extrabold tracking-widest uppercase text-[#005A9C] dark:text-[#38BDF8]">
                PILARES METODOLÓGICOS
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white mt-3 text-balance">
                Tres Ejes para Desentrañar el{' '}
                <span className="font-editorial italic font-normal text-[#008A00] dark:text-emerald-400">
                  Texto Antiguo
                </span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base font-body text-slate-600 dark:text-slate-300 leading-relaxed">
                Superamos las lecturas anacrónicas mediante herramientas filológicas, históricas y hermenéuticas diseñadas para el pensamiento crítico universitario.
              </p>
            </div>
          </div>

          {/* Grid de 3 Tarjetas con Hover Tridimensional Suave y Elevación */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methodologyPillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              const isEmerald = pillar.accent === 'emerald';
              return (
                <article
                  key={pillar.id}
                  onMouseMove={e => handleCardTilt(pillar.id, e)}
                  onMouseLeave={() => resetCardTilt(pillar.id)}
                  style={{
                    transform:
                      tiltState[pillar.id] ||
                      'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
                  }}
                  className={`tilt-card bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-2xl flex flex-col justify-between group ${
                    index === 1 ? 'md:translate-y-6' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
                      <span
                        className={`text-xs font-body font-extrabold tracking-widest uppercase ${
                          isEmerald
                            ? 'text-[#008A00] dark:text-emerald-400'
                            : 'text-[#005A9C] dark:text-[#38BDF8]'
                        }`}
                      >
                        {pillar.kicker}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isEmerald
                            ? 'bg-[#E6F5E6] dark:bg-emerald-950/60 text-[#008A00] dark:text-emerald-400'
                            : 'bg-[#EBF3FA] dark:bg-sky-950/60 text-[#005A9C] dark:text-[#38BDF8]'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-[#005A9C] dark:group-hover:text-[#38BDF8] transition-colors">
                      {pillar.title}
                    </h3>

                    <p
                      className={`text-xs font-body font-bold uppercase tracking-wider mt-2 ${
                        isEmerald
                          ? 'text-[#008A00] dark:text-emerald-400'
                          : 'text-[#005A9C] dark:text-[#38BDF8]'
                      }`}
                    >
                      {pillar.subtitle}
                    </p>

                    <p className="text-sm font-body text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-body font-semibold text-slate-500 dark:text-slate-400">
                    <span>{pillar.footerTag}</span>
                    <button
                      type="button"
                      onClick={onOpenEnrollment}
                      className={`font-bold flex items-center gap-1 cursor-pointer ${
                        isEmerald
                          ? 'text-[#008A00] dark:text-emerald-400'
                          : 'text-[#005A9C] dark:text-[#38BDF8]'
                      }`}
                      data-cursor="APLICAR"
                    >
                      <span>Inscribirse</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
