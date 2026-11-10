import React, { useState } from 'react';
import { Archive, Search, ExternalLink, Bookmark } from 'lucide-react';

const ARCHIVES = [
  {
    id: 'qumran-1qisa',
    name: 'Gran Rollo de Isaías (1QIsaᵃ)',
    provenance: 'Cueva 1 de Qumrán, Desierto de Judea',
    date: 'ca. 125 a.C.',
    script: 'Hebreo Hasmoneo tardío (sin vocalización)',
    shelfmark: 'Shrine of the Book, Jerusalem',
    description: 'El manuscrito bíblico más completo y antiguo conservado. 54 columnas de pergamino cosidas con tendones de lino que revelan variantes textuales cruciales frente a la Masora posterior.',
    keyPassage: 'Isaías 53 (El siervo sufriente y la lírica exílica)'
  },
  {
    id: 'codex-aleppo',
    name: 'Códice de Alepo (Keter Aram Tsova)',
    provenance: 'Tiberíades / Jerusalén / El Cairo / Alepo',
    date: 'ca. 930 d.C.',
    script: 'Hebreo Masorético con niqud y te’amim (acentos)',
    shelfmark: 'Museo de Israel, Ms. 1',
    description: 'Considerado el texto modelo supremo de la Tanaj, corregido y puntuado por el maestro masoreta Aaron ben Moses ben Asher. Utilizado por Maimónides como patrón normativo.',
    keyPassage: 'Deuteronomio 32 (El Canto de Moisés y su arquitectura quiástica)'
  },
  {
    id: 'bodmer-p66',
    name: 'Papiro Bodmer II (P66)',
    provenance: 'Dishna, Alto Egipto',
    date: 'ca. 200 d.C.',
    script: 'Griego Koiné Uncial',
    shelfmark: 'Fondation Martin Bodmer, Cologny',
    description: 'Códice en papiro que contiene casi íntegro el Evangelio de Juan. Testigo primario del uso de Nomina Sacra y correcciones tempranas en los márgenes de las primeras comunidades cristianas.',
    keyPassage: 'Juan 1:1-18 (El Himno del Lógos y la sabiduría helenístico-semítica)'
  }
];

export const AcademicArchiveSection: React.FC = () => {
  const [selectedArchive, setSelectedArchive] = useState(ARCHIVES[0]);

  return (
    <section className="py-20 lg:py-28 bg-[#F9F8F6] border-b border-[#111111]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#111111]/10 mb-12">
          <div>
            <span className="text-xs font-mono tracking-widest uppercase text-[#B45309]">
              PATRIMONIO TEXTUAL & FILOLOGÍA
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-title font-medium text-[#111111] mt-2">
              Archivo Digital de Fuentes Primarias
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-wider text-[#111111]/60 max-w-sm">
            Digitalización multiespectral y aparato crítico abierto para cátedras universitarias.
          </p>
        </div>

        {/* Content split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: List of manuscripts */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              {ARCHIVES.map(item => {
                const isActive = selectedArchive.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedArchive(item)}
                    className={`w-full text-left p-6 border rounded-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-[#FFFFFF] border-[#B45309] shadow-sm'
                        : 'bg-transparent border-[#111111]/10 hover:border-[#111111]/30 hover:bg-white/40'
                    }`}
                    data-cursor="INSPECCIONAR"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-[#B45309] font-bold">
                        {item.date}
                      </span>
                      <span className="text-[11px] font-mono text-[#111111]/50">
                        {item.shelfmark.split(',')[0]}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif-title font-medium text-[#111111] mt-2">
                      {item.name}
                    </h3>

                    <p className="text-xs font-serif italic text-[#111111]/70 mt-1">
                      {item.provenance}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Archive Callout Notice */}
            <div className="p-5 bg-[#F3EFE6] border border-[#111111]/10 rounded text-xs font-serif text-[#111111]/80">
              <span className="font-mono uppercase text-[10px] tracking-widest text-[#B45309] block mb-1">
                Protocolo de Acceso Abierto
              </span>
              Los investigadores adscritos a NarrativaU cuentan con permisos de consulta en alta resolución para cotejo con el aparato crítico de la Biblia Hebraica Stuttgartensia (BHS).
            </div>
          </div>

          {/* Right Column: Visual Artwork & Deep Accession Detail View */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#111111]/15 rounded-sm p-8 sm:p-10 flex flex-col justify-between shadow-xs">
            <div>
              {/* Archival Photography Preview */}
              <div className="relative h-64 sm:h-72 w-full rounded overflow-hidden mb-6 border border-[#111111]/10">
                <img
                  src="/src/assets/images/archaeology_academic_archive_1794060067009.jpg"
                  alt="Mesa de archivo con papiro de Qumrán y lupa de precisión"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-105"
                />
                <div className="absolute bottom-3 left-3 bg-[#111111]/85 backdrop-blur-xs text-white text-[10px] font-mono px-3 py-1 rounded">
                  Mesa de Cotejo Paleográfico · Laboratorio NarrativaU
                </div>
              </div>

              {/* Title & metadata */}
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B45309]">
                <Archive className="w-3.5 h-3.5" />
                <span>Expediente Paleográfico Detallado</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif-title font-medium text-[#111111] mt-2">
                {selectedArchive.name}
              </h3>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 py-6 border-y border-[#111111]/10 text-xs font-mono">
                <div>
                  <dt className="text-[#111111]/50 uppercase tracking-wider">Datación</dt>
                  <dd className="text-[#111111] font-semibold mt-0.5">{selectedArchive.date}</dd>
                </div>
                <div>
                  <dt className="text-[#111111]/50 uppercase tracking-wider">Escritura</dt>
                  <dd className="text-[#111111] font-semibold mt-0.5">{selectedArchive.script}</dd>
                </div>
                <div>
                  <dt className="text-[#111111]/50 uppercase tracking-wider">Ubicación Actual</dt>
                  <dd className="text-[#111111] font-semibold mt-0.5">{selectedArchive.shelfmark}</dd>
                </div>
                <div>
                  <dt className="text-[#111111]/50 uppercase tracking-wider">Pasaje de Estudio</dt>
                  <dd className="text-[#B45309] font-semibold mt-0.5">{selectedArchive.keyPassage}</dd>
                </div>
              </dl>

              <p className="text-sm font-serif leading-relaxed text-[#111111]/85">
                {selectedArchive.description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#111111]/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#111111]/50">
                Resolución nativa: 8,400 × 5,600 px (300 DPI)
              </span>
              <a
                href="#estratigrafia"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#B45309] hover:underline"
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
