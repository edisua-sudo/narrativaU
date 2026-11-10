import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SCROLLY_CARDS, ScrollyCard } from '../utils/manuscriptData';
import { ChevronLeft, ChevronRight, BookOpen, Quote, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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

    // Only enable GSAP pin on desktop screens (> 1024px)
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
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const filteredCards = activeCategory === 'ALL'
    ? SCROLLY_CARDS
    : SCROLLY_CARDS.filter(c => c.category === activeCategory);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const delta = direction === 'left' ? -500 : 500;
      trackRef.current.scrollBy({ left: delta, behavior: 'smooth' });
    }
  };

  return (
    <section ref={triggerRef} id="horizontes" className="relative bg-[#F9F8F6] border-b border-[#111111]/10 overflow-hidden">
      <div ref={sectionRef} className="min-h-screen flex flex-col justify-between py-16 lg:py-24">
        {/* Section Header with Category Tabs */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#111111]/10">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-[#B45309]">
                ESTRUCTURA PEDAGÓGICA MMXXVI
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif-title font-medium text-[#111111] mt-2">
                Qué · Dónde · Cómo
              </h2>
              <p className="text-sm font-serif text-[#111111]/70 mt-1 max-w-xl">
                Navega horizontalmente por los tres ejes estructurales de la Cátedra Universitaria NarrativaU.
              </p>
            </div>

            {/* Category Filter Controls & Scroll Arrows */}
            <div className="flex items-center gap-3">
              <div className="flex items-center p-1 bg-[#111111]/5 rounded border border-[#111111]/10">
                {(['ALL', 'QUÉ', 'DÓNDE', 'CÓMO'] as const).map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded transition-colors ${
                      activeCategory === cat
                        ? 'bg-[#111111] text-white shadow-xs'
                        : 'text-[#111111]/70 hover:text-[#111111]'
                    }`}
                    data-cursor="FILTRO"
                  >
                    {cat === 'ALL' ? 'Todos' : cat}
                  </button>
                ))}
              </div>

              <div className="hidden lg:flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollByAmount('left')}
                  className="p-2 border border-[#111111]/10 hover:border-[#111111] rounded text-[#111111] transition-colors"
                  aria-label="Desplazar a la izquierda"
                  data-cursor="ATRÁS"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByAmount('right')}
                  className="p-2 border border-[#111111]/10 hover:border-[#111111] rounded text-[#111111] transition-colors"
                  aria-label="Desplazar a la derecha"
                  data-cursor="AVANZAR"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Track Container */}
        <div className="w-full overflow-x-auto lg:overflow-visible no-scrollbar px-6 md:px-12">
          <div
            ref={trackRef}
            className="flex flex-nowrap gap-8 lg:gap-12 w-max pb-8 lg:pb-0"
          >
            {filteredCards.map((card, idx) => (
              <article
                key={card.id}
                className={`w-[320px] sm:w-[400px] lg:w-[460px] shrink-0 bg-[#FFFFFF] border border-[#111111]/10 p-8 sm:p-10 rounded-sm shadow-xs flex flex-col justify-between transition-all duration-300 hover:border-[#B45309]/50 hover:shadow-md ${
                  idx % 2 === 1 ? 'lg:translate-y-6' : 'lg:-translate-y-2'
                }`}
              >
                {/* Top Card Meta */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#111111]/10 pb-4 mb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#B45309] font-bold">
                      {card.category} · {card.number}
                    </span>
                    <span className="text-[11px] font-mono text-[#111111]/50 tracking-wider">
                      {card.aspectTag}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif-title font-medium text-[#111111] leading-snug">
                    {card.title}
                  </h3>

                  <p className="font-serif italic text-sm text-[#B45309] mt-2">
                    {card.subtitle}
                  </p>

                  <p className="text-sm font-sans text-[#111111]/80 mt-4 leading-relaxed">
                    {card.description}
                  </p>

                  {/* Bulleted details */}
                  <ul className="mt-6 space-y-2 border-t border-[#111111]/5 pt-4">
                    {card.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs font-sans text-[#111111]/70">
                        <span className="text-[#B45309] font-mono mt-0.5">·</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Card Quote & Interactive Affordance */}
                <div className="mt-8 pt-6 border-t border-[#111111]/10">
                  <div className="flex items-start gap-3">
                    <Quote className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5 opacity-60" />
                    <div>
                      <p className="font-serif italic text-xs text-[#111111]/70 leading-relaxed">
                        «{card.quote}»
                      </p>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-[#111111]/50 mt-1">
                        — {card.quoteAuthor}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedCard(card)}
                    className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 border border-[#111111]/15 hover:border-[#111111] hover:bg-[#111111] hover:text-white text-xs font-mono uppercase tracking-wider text-[#111111] transition-all duration-200 rounded-sm"
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

        {/* Scroll Instruction hint */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mt-6 flex items-center justify-between text-xs font-mono text-[#111111]/50">
          <span className="hidden lg:inline">
            ↓ Haz scroll hacia abajo para desplazar la galería lateralmente
          </span>
          <span className="lg:hidden">
            → Desliza horizontalmente para explorar las tarjetas
          </span>
          <span>{filteredCards.length} Módulos Curados</span>
        </div>
      </div>

      {/* Modal / Drawer for Card Academic File */}
      {selectedCard && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="card-modal-title"
          className="fixed inset-0 z-50 bg-[#111111]/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-[#F9F8F6] border border-[#111111]/20 max-w-2xl w-full p-8 md:p-10 rounded shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedCard(null)}
              className="absolute top-6 right-6 p-2 text-[#111111]/60 hover:text-[#111111] border border-[#111111]/10 rounded"
              aria-label="Cerrar modal"
              data-cursor="CERRAR"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono uppercase tracking-widest text-[#B45309] font-bold">
              {selectedCard.category} · {selectedCard.number} · {selectedCard.archivalBadge}
            </span>

            <h3 id="card-modal-title" className="text-3xl font-serif-title font-medium text-[#111111] mt-3">
              {selectedCard.title}
            </h3>

            <p className="font-serif italic text-base text-[#B45309] mt-2">
              {selectedCard.subtitle}
            </p>

            <div className="my-6 border-y border-[#111111]/10 py-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#111111]/60 mb-2">
                Fundamentación Epistemológica
              </h4>
              <p className="text-sm font-serif leading-relaxed text-[#111111]/85">
                {selectedCard.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#111111]/60 mb-3">
                Protocolos Metodológicos del Catedrático
              </h4>
              <ul className="space-y-2">
                {selectedCard.details.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-sans text-[#111111]/80">
                    <span className="text-[#B45309] font-mono">0{idx + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#111111]/10 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="px-6 py-2.5 bg-[#111111] text-white text-xs font-mono uppercase tracking-wider rounded hover:bg-[#B45309] transition-colors"
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
