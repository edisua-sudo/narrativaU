import React, { useRef, useState } from 'react';
import { LUISA_CAJAMARCA_TESTIMONIAL } from '../utils/manuscriptData';
import { Sparkles, GraduationCap, Quote, Eye } from 'lucide-react';

export const TestimonialTorchlight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [torchPos, setTorchPos] = useState({ x: 500, y: 300 });
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
      className="relative min-h-screen py-24 lg:py-32 bg-[#0E0D0C] text-[#F9F8F6] overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background radial ambient glow following mouse */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          background: isHovering || fullReveal
            ? `radial-gradient(circle 380px at ${torchPos.x}px ${torchPos.y}px, rgba(180, 83, 9, 0.18), transparent 70%)`
            : 'radial-gradient(circle 300px at 50% 50%, rgba(180, 83, 9, 0.08), transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Top Header of Testimonial */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <Quote className="w-5 h-5 text-[#B45309]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#B45309] font-bold">
            TESTIMONIO & REFLEXIÓN EDITORIAL
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setFullReveal(prev => !prev)}
            className="flex items-center gap-2 px-3 py-1 text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white border border-white/20 rounded transition-colors"
            data-cursor="LUZ"
          >
            <Eye className="w-3.5 h-3.5 text-[#B45309]" />
            <span>{fullReveal ? 'Apagar Linterna' : 'Iluminar Todo'}</span>
          </button>
          <span className="hidden sm:inline font-mono text-xs text-white/40">
            Pasa el cursor para iluminar el manuscrito
          </span>
        </div>
      </div>

      {/* Central Screen: Fullscreen Illuminated Typography */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full my-auto py-12">
        <div className="relative">
          {/* Unified torchlight text with background-clip to guarantee zero misalignment */}
          <blockquote
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-title font-medium leading-[1.25] tracking-tight transition-all duration-150 select-none"
            style={{
              backgroundImage: fullReveal
                ? 'linear-gradient(135deg, #F9F8F6 0%, #FDE68A 50%, #B45309 100%)'
                : `radial-gradient(circle 320px at ${torchPos.x}px ${torchPos.y}px, #FFFFFF 0%, #FBBF24 35%, #92400E 65%, #3E3B38 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: fullReveal ? '0 0 40px rgba(180, 83, 9, 0.3)' : 'none',
            }}
          >
            «{LUISA_CAJAMARCA_TESTIMONIAL.quote}»
          </blockquote>
        </div>
      </div>

      {/* Bottom Editorial Attribution with Scholar Portrait */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full border-t border-white/10 pt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Portrait of Luisa Cajamarca */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#B45309]/60 shrink-0 shadow-lg">
              <img
                src="/src/assets/images/luisa_cajamarca_scholar_1794060066333.jpg"
                alt="Retrato editorial de Luisa Cajamarca"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-105"
              />
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-serif-title font-medium text-white">
                {LUISA_CAJAMARCA_TESTIMONIAL.author}
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#B45309] mt-0.5">
                {LUISA_CAJAMARCA_TESTIMONIAL.role}
              </div>
              <div className="text-xs font-sans text-white/60 mt-1">
                {LUISA_CAJAMARCA_TESTIMONIAL.institution} · {LUISA_CAJAMARCA_TESTIMONIAL.year}
              </div>
            </div>
          </div>

          <div className="max-w-md bg-white/5 border border-white/10 p-4 rounded text-xs font-serif italic text-white/80">
            <span className="text-[#B45309] not-italic font-mono uppercase text-[10px] tracking-widest block mb-1">
              Ensayo de Investigación de Grado
            </span>
            {LUISA_CAJAMARCA_TESTIMONIAL.essayTitle}
          </div>
        </div>
      </div>
    </section>
  );
};
