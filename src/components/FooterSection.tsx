import React from 'react';
import { ArrowUp, Mail, MapPin } from 'lucide-react';

interface FooterSectionProps {
  onOpenEnrollment: () => void;
}

/**
 * [AWWWARDS CRITERION: MINIMALIST INSTITUTIONAL FOOTER]
 * Incluye los datos institucionales oficiales (Cra. 74 #49a – 35, Bogotá | info@narrativau.org),
 * accesos a redes y navegación limpia en 'Syne' + 'Plus Jakarta Sans' (cero monoespaciadas).
 */
export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenEnrollment }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contacto"
      className="bg-white dark:bg-[#070A12] text-slate-900 dark:text-slate-100 pt-20 pb-12 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-200 dark:border-slate-800">
          {/* Colofón Institucional */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-2xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
              Narrativa<span className="text-[#005A9C] dark:text-[#38BDF8]">U</span>
            </div>
            <p className="font-body text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Plataforma académica e histórica dedicada al análisis literario, exegético y crítico de la narrativa bíblica en entornos universitarios.
            </p>
            <address className="not-italic space-y-2 pt-2 text-xs font-body font-semibold text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#005A9C] dark:text-[#38BDF8] shrink-0" />
                <span>Cra. 74 #49a – 35, Bogotá, Colombia</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#008A00] shrink-0" />
                <a
                  href="mailto:info@narrativau.org"
                  className="text-[#005A9C] dark:text-[#38BDF8] hover:underline"
                >
                  info@narrativau.org
                </a>
              </div>
            </address>
          </div>

          {/* Navegación Rápida */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-body font-extrabold uppercase tracking-widest text-slate-400 block mb-2">
              Secciones
            </span>
            <ul className="space-y-2.5 text-xs font-body font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              <li>
                <a
                  href="#inicio"
                  className="hover:text-[#005A9C] dark:hover:text-[#38BDF8] transition-colors"
                >
                  01. Inicio & Manifiesto
                </a>
              </li>
              <li>
                <a
                  href="#metodologia"
                  className="hover:text-[#005A9C] dark:hover:text-[#38BDF8] transition-colors"
                >
                  02. Metodología (3 Ejes)
                </a>
              </li>
              <li>
                <a
                  href="#horizontes"
                  className="hover:text-[#005A9C] dark:hover:text-[#38BDF8] transition-colors"
                >
                  03. Artículos & Horizontes
                </a>
              </li>
              <li>
                <a
                  href="#estratigrafia"
                  className="hover:text-[#005A9C] dark:hover:text-[#38BDF8] transition-colors"
                >
                  04. Estratigrafía Textual
                </a>
              </li>
              <li>
                <a
                  href="#testimonios"
                  className="hover:text-[#005A9C] dark:hover:text-[#38BDF8] transition-colors"
                >
                  05. Testimonio Académico
                </a>
              </li>
            </ul>
          </div>

          {/* Comunidad & Inscripción */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-body font-extrabold uppercase tracking-widest text-slate-400 block">
              Comunidad & Cátedra
            </span>
            <p className="text-xs font-body text-slate-600 dark:text-slate-400 leading-relaxed">
              Iniciativa académica interinstitucional abierta a docentes, investigadores de posgrado y estudiantes universitarios.
            </p>
            <button
              type="button"
              onClick={onOpenEnrollment}
              className="px-6 py-3.5 bg-[#008A00] hover:bg-[#007000] text-white text-xs font-body font-extrabold uppercase tracking-widest rounded-xl btn-emerald-glow transition-all cursor-pointer"
              data-cursor="GRATIS"
            >
              Inscribirme Gratis Ahora →
            </button>
          </div>
        </div>

        {/* Barra Inferior y Redes */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body font-medium text-slate-500 dark:text-slate-400">
          <div>
            <span>© 2026 NarrativaU · narrativau.org · Todos los derechos reservados</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#005A9C] dark:hover:text-[#38BDF8] transition-colors"
            >
              Twitter/X
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#005A9C] dark:hover:text-[#38BDF8] transition-colors"
            >
              YouTube
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#005A9C] dark:hover:text-[#38BDF8] transition-colors"
            >
              Instagram
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 hover:text-[#005A9C] dark:hover:text-[#38BDF8] font-bold transition-colors cursor-pointer"
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
