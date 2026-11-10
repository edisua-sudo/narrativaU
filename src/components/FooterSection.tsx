import React from 'react';
import { ArrowUp, BookMarked } from 'lucide-react';

interface FooterSectionProps {
  onOpenEnrollment: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenEnrollment }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-[#F9F8F6] pt-20 pb-12 border-t border-[#111111]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Colophon */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-2xl font-bold tracking-widest font-monument uppercase text-white">
              NARRATIVAU
            </div>
            <p className="font-serif italic text-base text-white/70 max-w-sm">
              Plataforma universitaria dedicada a desenterrar las capas literarias, históricas y semióticas del texto bíblico.
            </p>
            <div className="text-xs font-mono text-[#B45309]">
              Cátedra Universitaria Abierta · Convocatoria Anual MMXXVI
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-2">
              Exploración
            </span>
            <ul className="space-y-2 text-xs font-mono uppercase tracking-wider text-white/80">
              <li>
                <a href="#manifiesto" className="hover:text-[#B45309] transition-colors">
                  01. El Manifiesto
                </a>
              </li>
              <li>
                <a href="#horizontes" className="hover:text-[#B45309] transition-colors">
                  02. Qué · Dónde · Cómo
                </a>
              </li>
              <li>
                <a href="#estratigrafia" className="hover:text-[#B45309] transition-colors">
                  03. Estratigrafía Textual
                </a>
              </li>
              <li>
                <a href="#testimonios" className="hover:text-[#B45309] transition-colors">
                  04. Testimonio Editorial
                </a>
              </li>
            </ul>
          </div>

          {/* Academic & University Affiliations */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-white/50 block">
              Comunidad & Cátedra
            </span>
            <p className="text-xs font-serif text-white/70 leading-relaxed">
              Iniciativa académica interinstitucional sin fines confesionales. Abierta a docentes, investigadores de posgrado y estudiantes de humanidades.
            </p>
            <button
              type="button"
              onClick={onOpenEnrollment}
              className="px-5 py-2.5 bg-[#B45309] hover:bg-[#B45309]/80 text-white text-xs font-mono uppercase tracking-wider rounded transition-colors"
              data-cursor="POSTULAR"
            >
              Postulación a Convocatoria
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div>
            <span>© MMXXVI NarrativaU · narrativau.org · Todos los derechos reservados</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Diseño Editorial & Scrollytelling Awwwards Caliber</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
              aria-label="Volver al inicio de la página"
              data-cursor="SUBIR"
            >
              <span>Volver arriba</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
