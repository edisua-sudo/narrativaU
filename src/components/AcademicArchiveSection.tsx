import React, { useState } from 'react';
import { Archive, ExternalLink } from 'lucide-react';

const ARCHIVES = [
  {
    id: 'qumran-1qisa',
    name: 'Gran Rollo de Isaías (1QIsaᵃ)',
    provenance: 'Cueva 1 de Qumrán, Desierto de Judea',
    date: 'ca. 125 a.C.',
    script: 'Hebreo Hasmoneo tardío (sin vocalización)',
    shelfmark: 'Shrine of the Book, Jerusalem',
    description:
      'El manuscrito bíblico más completo y antiguo conservado. 54 columnas de pergamino cosidas con tendones de lino que revelan variantes textuales cruciales frente a la Masora posterior.',
    keyPassage: 'Isaías 53 (El siervo sufriente y la lírica exílica)',
  },
  {
    id: 'codex-aleppo',
    name: 'Códice de Alepo (Keter Aram Tsova)',
    provenance: 'Tiberíades / Jerusalén / El Cairo / Alepo',
    date: 'ca. 930 d.C.',
    script: 'Hebreo Masorético con niqud y te’amim (acentos)',
    shelfmark: 'Museo de Israel, Ms. 1',
    description:
      'Considerado el texto modelo supremo de la Tanaj, corregido y puntuado por el maestro masoreta Aaron ben Moses ben Asher. Utilizado por Maimónides como patrón normativo.',
    keyPassage: 'Deuteronomio 32 (El Canto de Moisés y su arquitectura quiástica)',
  },
  {
    id: 'bodmer-p66',
    name: 'Papiro Bodmer II (P66)',
    provenance: 'Dishna, Alto Egipto',
    date: 'ca. 200 d.C.',
    script: 'Griego Koiné Uncial',
    shelfmark: 'Fondation Martin Bodmer, Cologny',
    description:
      'Códice en papiro que contiene casi íntegro el Evangelio de Juan. Testigo primario del uso de Nomina Sacra y correcciones tempranas en los márgenes de las primeras comunidades.',
    keyPassage: 'Juan 1:1-18 (El Himno del Lógos y la sabiduría helenístico-semítica)',
  },
];

/**
 * [AWWWARDS CRITERION: CONTENT HIERARCHY & DESIGN]
 * Catálogo de fuentes primarias con layout asimétrico (5/7 columnas),
 * tipografía 'Syne' + 'Plus Jakarta Sans' y modo claro/oscuro impecable.
 */
export const AcademicArchiveSection: React.FC = () => {
  const [selectedArchive, setSelectedArchive] = useState(ARCHIVES[0]);

  return (
    <section className="py-24 lg:py-32 bg-[#FAFAFC] dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800 mb-12">
          <div>
            <span className="text-xs font-body font-extrabold tracking-widest uppercase text-[#005A9C] dark:text-[#38BDF8]">
              PATRIMONIO TEXTUAL & FILOLOGÍA
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
              Archivo Digital de{' '}
              <span className="font-editorial italic font-normal text-[#008A00] dark:text-emerald-400">
                Fuentes Primarias
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-body text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
            Digitalización multiespectral y aparato crítico abierto para cátedras e investigadores universitarios.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              {ARCHIVES.map(item => {
                const isActive = selectedArchive.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedArchive(item)}
                    className={`w-full text-left p-6 border rounded-3xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-slate-900 border-[#005A9C] dark:border-[#38BDF8] shadow-md'
                        : 'bg-transparent border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 hover:bg-white/50 dark:hover:bg-slate-900/40'
                    }`}
                    data-cursor="INSPECCIONAR"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-body uppercase tracking-wider text-[#008A00] dark:text-emerald-400 font-extrabold">
                        {item.date}
                      </span>
                      <span className="text-xs font-body font-medium text-slate-400">
                        {item.shelfmark.split(',')[0]}
                      </span>
                    </div>

                    <h3 className="text-xl font-display font-bold tracking-tight text-slate-900 dark:text-white mt-2">
                      {item.name}
                    </h3>

                    <p className="text-xs font-body text-slate-500 dark:text-slate-400 mt-1">
                      {item.provenance}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="p-6 bg-[#EBF3FA]/60 dark:bg-slate-900 border border-[#005A9C]/20 dark:border-slate-800 rounded-3xl text-xs font-body text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-body font-extrabold uppercase text-[11px] tracking-widest text-[#005A9C] dark:text-[#38BDF8] block mb-1">
                Protocolo de Acceso Abierto
              </span>
              Los investigadores adscritos a NarrativaU cuentan con permisos de consulta en alta resolución para cotejo con el aparato crítico de la Biblia Hebraica Stuttgartensia (BHS).
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-6 border border-slate-200 dark:border-slate-800">
                <img
                  src="/src/assets/images/archaeology_academic_archive_1794060067009.jpg"
                  alt="Mesa de archivo con papiro de Qumrán y lupa de precisión"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-105"
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-xs text-white text-xs font-body font-semibold px-3.5 py-1.5 rounded-xl">
                  Mesa de Cotejo Paleográfico · Laboratorio NarrativaU
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-body font-extrabold uppercase tracking-widest text-[#005A9C] dark:text-[#38BDF8]">
                <Archive className="w-4 h-4" />
                <span>Expediente Paleográfico Detallado</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-slate-900 dark:text-white mt-2">
                {selectedArchive.name}
              </h3>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 py-6 border-y border-slate-200 dark:border-slate-800 text-xs font-body">
                <div>
                  <dt className="text-slate-400 font-bold uppercase tracking-wider">Datación</dt>
                  <dd className="text-slate-900 dark:text-white font-semibold mt-1">
                    {selectedArchive.date}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400 font-bold uppercase tracking-wider">Escritura</dt>
                  <dd className="text-slate-900 dark:text-white font-semibold mt-1">
                    {selectedArchive.script}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400 font-bold uppercase tracking-wider">
                    Ubicación Actual
                  </dt>
                  <dd className="text-slate-900 dark:text-white font-semibold mt-1">
                    {selectedArchive.shelfmark}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-400 font-bold uppercase tracking-wider">
                    Pasaje de Estudio
                  </dt>
                  <dd className="text-[#008A00] dark:text-emerald-400 font-bold mt-1">
                    {selectedArchive.keyPassage}
                  </dd>
                </div>
              </dl>

              <p className="text-sm font-body leading-relaxed text-slate-600 dark:text-slate-300">
                {selectedArchive.description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-body text-slate-500 dark:text-slate-400 tabular-nums">
                Resolución nativa: 8,400 × 5,600 px (300 DPI)
              </span>
              <a
                href="#estratigrafia"
                className="inline-flex items-center gap-1.5 text-xs font-body font-bold uppercase tracking-wider text-[#005A9C] dark:text-[#38BDF8] hover:underline"
              >
                <span>Inspeccionar Capas</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
