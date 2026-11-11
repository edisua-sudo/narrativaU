import React, { useRef, useState } from 'react';
import { LUISA_CAJAMARCA_TESTIMONIAL } from '../utils/manuscriptData';
import { Quote, Eye } from 'lucide-react';

/**
 * [AWWWARDS CRITERION: CREATIVITY & HIGH-IMPACT TESTIMONIAL]
 * Bloque oscuro y elegante (#0F172A) con efecto de iluminación radial (Torchlight)
 * que reacciona al cursor, destacando el testimonio de Luisa Cajamarca
 * (Politóloga · Universidad Nacional de Colombia) sin usar fuentes monoespaciadas.
 */
export const TestimonialTorchlight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [torchPos, setTorchPos] = useState({ x: 520, y: 260 });
  const [isHovering, setIsHovering] = useState(false);
  const [fullReveal, setFullReveal] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTorchPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    if (!isHovering) setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="testimonios"
      className="relative min-h-[85vh] py-24 lg:py-32 bg-[#0F172A] text-white overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Resplandor ambiental interactivo que sigue al cursor */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          background:
            isHovering || fullReveal
              ? `radial-gradient(circle 420px at ${torchPos.x}px ${torchPos.y}px, rgba(0, 90, 156, 0.28), rgba(0, 138, 0, 0.12) 45%, transparent 75%)`
              : 'radial-gradient(circle 360px at 50% 50%, rgba(0, 90, 156, 0.16), transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Encabezado Superior del Testimonio */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <Quote className="w-5 h-5 text-[#38BDF8]" />
          <span className="font-body text-xs uppercase tracking-widest text-[#38BDF8] font-extrabold">
            TESTIMONIO DE ALTO IMPACTO · IMPACTO ACADÉMICO
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setFullReveal(prev => !prev)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-body font-bold uppercase tracking-wider text-slate-200 hover:text-white border border-slate-700 hover:border-[#38BDF8] rounded-full transition-colors cursor-pointer"
            data-cursor="LUZ"
          >
            <Eye className="w-3.5 h-3.5 text-[#008A00]" />
            <span>{fullReveal ? 'Modo Linterna' : 'Iluminar Todo'}</span>
          </button>
          <span className="hidden sm:inline font-body text-xs text-slate-400">
            Desliza el cursor para revelar el texto
          </span>
        </div>
      </div>

      {/* Cita Editorial Monumental con Efecto Linterna (Background-Clip Text) */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full my-auto py-12">
        <blockquote
          className="text-2xl sm:text-4xl md:text-5xl font-display font-bold leading-[1.22] tracking-tight transition-all duration-150 select-none text-balance"
          style={{
            backgroundImage: fullReveal
              ? 'linear-gradient(135deg, #FFFFFF 0%, #BAE6FD 55%, #4ADE80 100%)'
              : `radial-gradient(circle 340px at ${torchPos.x}px ${torchPos.y}px, #FFFFFF 0%, #38BDF8 38%, #4ADE80 65%, #475569 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          «{LUISA_CAJAMARCA_TESTIMONIAL.quote}»
        </blockquote>
      </div>

      {/* Atribución Académica de Luisa Cajamarca */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full border-t border-slate-800 pt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#38BDF8]/70 shrink-0 shadow-lg">
              <img
                src="/src/assets/images/luisa_cajamarca_scholar_1794060066333.jpg"
                alt="Retrato editorial de Luisa Cajamarca, Politóloga de la Universidad Nacional"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-105"
              />
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white">
                {LUISA_CAJAMARCA_TESTIMONIAL.author}
              </div>
              <div className="text-xs font-body font-bold uppercase tracking-wider text-emerald-400 mt-1">
                Politóloga · Universidad Nacional de Colombia · {LUISA_CAJAMARCA_TESTIMONIAL.role}
              </div>
              <div className="text-xs font-body text-slate-400 mt-1">
                {LUISA_CAJAMARCA_TESTIMONIAL.institution} · {LUISA_CAJAMARCA_TESTIMONIAL.year}
              </div>
            </div>
          </div>

          <div className="max-w-md bg-slate-900/90 border border-slate-800 p-5 rounded-2xl text-xs font-editorial italic text-slate-200 text-base">
            <span className="text-[#38BDF8] not-italic font-body font-extrabold uppercase text-[10px] tracking-widest block mb-1">
              Investigación Destacada
            </span>
            {LUISA_CAJAMARCA_TESTIMONIAL.essayTitle}
          </div>
        </div>
      </div>
    </section>
  );
};
