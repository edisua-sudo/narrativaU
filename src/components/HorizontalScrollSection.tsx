import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SCROLLY_CARDS, ScrollyCard } from '../utils/manuscriptData';
import { ChevronLeft, ChevronRight, BookOpen, Quote, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * [AWWWARDS CRITERION: CREATIVITY & SCROLL-DRIVEN ANIMATIONS]
 * Galería horizontal impulsada por GSAP ScrollTrigger con tarjetas asimétricas,
 * filtrado reactivo por categoría y tipografía 'Syne' + 'Plus Jakarta Sans' (cero monoespaciadas).
 */
export const HorizontalScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'QUÉ' | 'DÓNDE' | 'CÓMO'>('ALL');
  const [selectedCard, setSelectedCard] = useState<ScrollyCard | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;
        return -(trackWidth - windowWidth + 120);
      };

      const scrollTween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 400}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        scrollTween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  const filteredCards =
    activeCategory === 'ALL'
      ? SCROLLY_CARDS
      : SCROLLY_CARDS.filter(c => c.category === activeCategory);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const delta = direction === 'left' ? -500 : 500;
      trackRef.current.scrollBy({ left: delta, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={triggerRef}
      id="horizontes"
      className="relative bg-[#FAFAFC] dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden"
    >
      <div ref={sectionRef} className="min-h-screen flex flex-col justify-between py-20 lg:py-24">
        {/* Encabezado de Sección con Filtros Interactivos */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-body font-extrabold tracking-widest uppercase text-[#005A9C] dark:text-[#38BDF8]">
                ARTÍCULOS & MÓDULOS DE INVESTIGACIÓN
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
                Qué · Dónde ·{' '}
                <span className="font-editorial italic font-normal text-[#008A00] dark:text-emerald-400">
                  Cómo
                </span>
              </h2>
              <p className="text-sm sm:text-base font-body text-slate-600 dark:text-slate-300 mt-2 max-w-xl leading-relaxed">
                Desplázate horizontalmente por el archivo de seminarios y lecturas críticas de NarrativaU.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                {(['ALL', 'QUÉ', 'DÓNDE', 'CÓMO'] as const).map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-body font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      activeCategory === cat
                        ? 'bg-[#005A9C] text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    data-cursor="FILTRO"
                  >
                    {cat === 'ALL' ? 'Todos' : cat}
                  </button>
                ))}
              </div>

              <div className="hidden lg:flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollByAmount('left')}
                  className="p-2.5 border border-slate-200 dark:border-slate-700 hover:border-[#005A9C] rounded-xl text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                  aria-label="Desplazar a la izquierda"
                  data-cursor="ATRÁS"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByAmount('right')}
                  className="p-2.5 border border-slate-200 dark:border-slate-700 hover:border-[#005A9C] rounded-xl text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                  aria-label="Desplazar a la derecha"
                  data-cursor="AVANZAR"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Riel Horizontal de Tarjetas Asimétricas */}
        <div className="w-full overflow-x-auto lg:overflow-visible no-scrollbar px-6 md:px-12">
          <div ref={trackRef} className="flex flex-nowrap gap-8 lg:gap-10 w-max pb-8 lg:pb-0">
            {filteredCards.map((card, idx) => (
              <article
                key={card.id}
                className={`w-[320px] sm:w-[400px] lg:w-[450px] shrink-0 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 rounded-3xl shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-[#005A9C] dark:hover:border-[#38BDF8] hover:shadow-xl ${
                  idx % 2 === 1 ? 'lg:translate-y-5' : 'lg:-translate-y-2'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
                    <span className="font-body text-xs uppercase tracking-widest text-[#005A9C] dark:text-[#38BDF8] font-extrabold tabular-nums">
                      {card.category} · {card.number}
                    </span>
                    <span className="text-xs font-body font-semibold text-slate-500 dark:text-slate-400">
                      {card.aspectTag}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
                    {card.title}
                  </h3>

                  <p className="font-editorial italic text-lg text-[#008A00] dark:text-emerald-400 mt-2">
                    {card.subtitle}
                  </p>

                  <p className="text-sm font-body text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
                    {card.description}
                  </p>

                  <ul className="mt-6 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                    {card.details.map((detail, dIdx) => (
                      <li
                        key={dIdx}
                        className="flex items-start gap-2.5 text-xs font-body text-slate-600 dark:text-slate-300 leading-relaxed"
                      >
                        <span className="text-[#008A00] font-bold">·</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-3">
                    <Quote className="w-4 h-4 text-[#005A9C] dark:text-[#38BDF8] shrink-0 mt-0.5 opacity-80" />
                    <div>
                      <p className="font-editorial italic text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                        «{card.quote}»
                      </p>
                      <p className="text-[11px] font-body font-bold uppercase tracking-wider text-slate-400 mt-1">
                        — {card.quoteAuthor}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedCard(card)}
                    className="mt-6 w-full flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-700 hover:border-[#005A9C] hover:bg-[#005A9C] hover:text-white text-xs font-body font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 transition-all duration-200 rounded-xl cursor-pointer"
                    data-cursor="LEER"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Ver Expediente Académico</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mt-6 flex items-center justify-between text-xs font-body font-semibold text-slate-500 dark:text-slate-400">
          <span className="hidden lg:inline">
            ↓ Haz scroll hacia abajo para desplazar la galería lateralmente
          </span>
          <span className="lg:hidden">→ Desliza horizontalmente para explorar las tarjetas</span>
          <span className="tabular-nums">{filteredCards.length} Módulos Curados</span>
        </div>
      </div>

      {/* Modal de Expediente Académico */}
      {selectedCard && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="card-modal-title"
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-2xl w-full p-8 md:p-10 rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedCard(null)}
              className="absolute top-6 right-6 p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-full cursor-pointer"
              aria-label="Cerrar modal"
              data-cursor="CERRAR"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-body uppercase tracking-widest text-[#005A9C] dark:text-[#38BDF8] font-extrabold">
              {selectedCard.category} · {selectedCard.number} · {selectedCard.archivalBadge}
            </span>

            <h3
              id="card-modal-title"
              className="text-3xl font-display font-bold tracking-tight text-slate-900 dark:text-white mt-3"
            >
              {selectedCard.title}
            </h3>

            <p className="font-editorial italic text-xl text-[#008A00] dark:text-emerald-400 mt-2">
              {selectedCard.subtitle}
            </p>

            <div className="my-6 border-y border-slate-200 dark:border-slate-800 py-6">
              <h4 className="text-xs font-body font-bold uppercase tracking-widest text-slate-400 mb-2">
                Fundamentación Epistemológica
              </h4>
              <p className="text-sm font-body leading-relaxed text-slate-700 dark:text-slate-300">
                {selectedCard.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-body font-bold uppercase tracking-widest text-slate-400 mb-3">
                Protocolos Metodológicos del Catedrático
              </h4>
              <ul className="space-y-2.5">
                {selectedCard.details.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs font-body text-slate-700 dark:text-slate-300"
                  >
                    <span className="text-[#005A9C] dark:text-[#38BDF8] font-bold tabular-nums">
                      0{idx + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="px-6 py-3 bg-[#005A9C] text-white text-xs font-body font-bold uppercase tracking-wider rounded-xl hover:bg-[#004578] transition-colors cursor-pointer"
              >
                Cerrar Expediente
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
