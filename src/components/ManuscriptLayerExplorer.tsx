import React, { useState } from 'react';
import { MANUSCRIPT_SAMPLE, ManuscriptHotspot } from '../utils/manuscriptData';
import { calculateLayerBlend, formatAcademicCitation } from '../utils/textLayers';
import { Layers, Sparkles, Info, Copy, Check } from 'lucide-react';

/**
 * [AWWWARDS CRITERION: CREATIVITY & INTERACTIVE STORYTELLING]
 * Dispositivo de Estratigrafía Textual: Permite deslizar entre las 3 capas del manuscrito
 * con tipografía 'Syne' + 'Plus Jakarta Sans' y soporte completo Modo Claro/Oscuro.
 */
export const ManuscriptLayerExplorer: React.FC = () => {
  const [scrubPosition, setScrubPosition] = useState(0.5);
  const [activeHotspot, setActiveHotspot] = useState<ManuscriptHotspot | null>(
    MANUSCRIPT_SAMPLE.hotspots[0]
  );
  const [copiedCitation, setCopiedCitation] = useState(false);

  const blend = calculateLayerBlend(scrubPosition);
  const citation = formatAcademicCitation(
    'Bereshit (Génesis) 1:1-3',
    MANUSCRIPT_SAMPLE.codex,
    MANUSCRIPT_SAMPLE.shelfmark,
    2026
  );

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <section
      id="estratigrafia"
      className="py-24 lg:py-32 bg-slate-100/70 dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Encabezado de Sección */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-body font-extrabold tracking-widest uppercase text-[#005A9C] dark:text-[#38BDF8] mb-3">
            <Layers className="w-4 h-4" />
            <span>LABORATORIO INTERACTIVO DE EXÉGESIS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Desenterrando las tres capas del{' '}
            <span className="font-editorial italic font-normal text-[#005A9C] dark:text-[#38BDF8]">
              manuscrito
            </span>
          </h2>
          <p className="font-body text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            Un mismo folio contiene siglos de sedimentación cultural. Desliza el regulador estratigráfico para revelar desde el soporte material hasta la crítica histórica universitaria.
          </p>
        </div>

        {/* Barra Controladora de Estratos */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:w-auto">
              <span className="text-[11px] font-body font-bold uppercase tracking-widest text-slate-400 block mb-1">
                Estrato Activo
              </span>
              <span className="text-lg font-display font-bold text-[#005A9C] dark:text-[#38BDF8]">
                {blend.activeLayerName}
              </span>
            </div>

            {/* Botones de salto directo */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-center">
              <button
                type="button"
                onClick={() => setScrubPosition(0)}
                className={`px-4 py-2.5 text-xs font-body font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer ${
                  scrubPosition < 0.25
                    ? 'bg-[#005A9C] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                }`}
                data-cursor="PAPIRO"
              >
                1. Papiro Material
              </button>
              <button
                type="button"
                onClick={() => setScrubPosition(0.5)}
                className={`px-4 py-2.5 text-xs font-body font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer ${
                  scrubPosition >= 0.25 && scrubPosition <= 0.75
                    ? 'bg-[#005A9C] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                }`}
                data-cursor="FILOLOGÍA"
              >
                2. Transcripción
              </button>
              <button
                type="button"
                onClick={() => setScrubPosition(1.0)}
                className={`px-4 py-2.5 text-xs font-body font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer ${
                  scrubPosition > 0.75
                    ? 'bg-[#008A00] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                }`}
                data-cursor="EXÉGESIS"
              >
                3. Hermenéutica
              </button>
            </div>

            {/* Regulador continuo */}
            <div className="w-full md:w-64 flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px] font-body font-bold text-slate-500 dark:text-slate-400 uppercase tabular-nums">
                <span>0% Material</span>
                <span>100% Crítica</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={scrubPosition}
                onChange={e => setScrubPosition(parseFloat(e.target.value))}
                className="w-full accent-[#005A9C] cursor-pointer"
                aria-label="Regulador de profundidad de capas de manuscrito"
              />
            </div>
          </div>
        </div>

        {/* Lienzo Asimétrico de Dos Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Izquierda: Visor del Manuscrito & Hotspots (7 columnas) */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative min-h-[460px] sm:min-h-[520px] flex flex-col justify-between p-6 sm:p-8 text-white">
            <div className="absolute inset-0 z-0">
              <img
                src="/src/assets/images/ancient_biblical_codex_1794060065998.jpg"
                alt="Detalle de códice antiguo de vitela iluminada"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-85 transition-all duration-700"
                style={{
                  filter: `contrast(1.18) sepia(${0.25 + blend.layer1Weight * 0.35}) brightness(${
                    0.68 + blend.layer2Weight * 0.22
                  })`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/80" />
            </div>

            <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-3">
              <span className="font-body text-xs uppercase tracking-widest text-[#38BDF8] font-extrabold">
                {MANUSCRIPT_SAMPLE.codex}
              </span>
              <span className="font-body text-xs text-white/75">
                {MANUSCRIPT_SAMPLE.shelfmark} · {MANUSCRIPT_SAMPLE.date}
              </span>
            </div>

            {/* Hotspots interactivos sobre el folio */}
            <div className="relative z-10 my-auto py-10">
              <div className="relative w-full h-[210px]">
                {MANUSCRIPT_SAMPLE.hotspots.map(spot => {
                  const isSelected = activeHotspot?.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => setActiveHotspot(spot)}
                      style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-[#008A00] text-white scale-110 shadow-lg ring-4 ring-[#008A00]/35'
                          : 'bg-slate-900/85 hover:bg-[#005A9C] text-white border border-white/30 backdrop-blur-xs'
                      }`}
                      data-cursor="LEMA"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span className="font-body text-xs font-bold">{spot.label}</span>
                    </button>
                  );
                })}
              </div>

              <div
                className="bg-slate-950/75 backdrop-blur-md border border-white/15 p-5 rounded-2xl mt-4 transition-opacity duration-500"
                style={{ opacity: 0.4 + blend.layer2Weight * 0.4 + blend.layer3Weight * 0.2 }}
              >
                <div
                  className="text-right text-2xl sm:text-3xl font-editorial text-amber-100 tracking-wider font-normal mb-2"
                  dir="rtl"
                >
                  {MANUSCRIPT_SAMPLE.layer2.hebrewText}
                </div>
                <div className="text-xs font-body font-medium text-slate-300 tracking-wide">
                  {MANUSCRIPT_SAMPLE.layer2.transliteration}
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-3 text-xs font-body text-white/70">
              <span>{MANUSCRIPT_SAMPLE.material}</span>
              <span>Selecciona un término para ver su aparato crítico</span>
            </div>
          </div>

          {/* Derecha: Aparato Crítico & Columna Analítica (5 columnas) */}
          <div className="lg:col-span-5 space-y-6">
            {activeHotspot && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-7 rounded-3xl shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-3xl font-editorial text-[#005A9C] dark:text-[#38BDF8] font-bold"
                      dir="rtl"
                    >
                      {activeHotspot.hebrew}
                    </span>
                    <span className="text-sm font-body font-bold text-slate-500 dark:text-slate-400">
                      ({activeHotspot.label})
                    </span>
                  </div>
                  <span className="text-[11px] font-body font-extrabold uppercase tracking-widest text-[#008A00]">
                    Aparato Crítico
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-body font-bold uppercase tracking-wider text-slate-400">
                      Morfología & Raíz Semítica
                    </h4>
                    <p className="text-sm font-body font-medium text-slate-900 dark:text-white mt-1 leading-relaxed">
                      {activeHotspot.etymology}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-body font-bold uppercase tracking-wider text-slate-400">
                      Impacto Hermenéutico & Contexto
                    </h4>
                    <p className="text-sm font-body text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                      {activeHotspot.significance}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-7 rounded-3xl shadow-sm">
              <div className="flex items-center gap-2 text-xs font-body font-extrabold uppercase tracking-widest text-[#005A9C] dark:text-[#38BDF8] mb-3">
                <Info className="w-4 h-4" />
                <span>Lectura Estratigráfica</span>
              </div>

              {scrubPosition < 0.35 && (
                <div>
                  <h3 className="text-xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
                    {MANUSCRIPT_SAMPLE.layer1.title}
                  </h3>
                  <p className="text-sm font-editorial italic text-[#008A00] dark:text-emerald-400 mt-1">
                    {MANUSCRIPT_SAMPLE.layer1.subtitle}
                  </p>
                  <p className="text-sm font-body text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                    {MANUSCRIPT_SAMPLE.layer1.description}
                  </p>
                  <div className="mt-4 p-3.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 rounded-2xl text-xs font-body text-slate-600 dark:text-slate-300">
                    {MANUSCRIPT_SAMPLE.layer1.visualNote}
                  </div>
                </div>
              )}

              {scrubPosition >= 0.35 && scrubPosition <= 0.7 && (
                <div>
                  <h3 className="text-xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
                    {MANUSCRIPT_SAMPLE.layer2.title}
                  </h3>
                  <p className="text-sm font-editorial italic text-[#008A00] dark:text-emerald-400 mt-1">
                    {MANUSCRIPT_SAMPLE.layer2.subtitle}
                  </p>
                  <p className="text-sm font-body text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                    {MANUSCRIPT_SAMPLE.layer2.description}
                  </p>
                  <div className="mt-4 p-3.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 rounded-2xl text-xs font-body text-slate-700 dark:text-slate-200">
                    <span className="font-bold text-[#005A9C] dark:text-[#38BDF8]">
                      Fonética Tiberiana:
                    </span>{' '}
                    {MANUSCRIPT_SAMPLE.layer2.phonetic}
                  </div>
                </div>
              )}

              {scrubPosition > 0.7 && (
                <div>
                  <h3 className="text-xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
                    {MANUSCRIPT_SAMPLE.layer3.title}
                  </h3>
                  <p className="text-sm font-editorial italic text-[#008A00] dark:text-emerald-400 mt-1">
                    {MANUSCRIPT_SAMPLE.layer3.subtitle}
                  </p>
                  <p className="text-sm font-body text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                    {MANUSCRIPT_SAMPLE.layer3.description}
                  </p>
                  <div className="mt-4 p-3.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 rounded-2xl text-xs font-body italic text-slate-700 dark:text-slate-200">
                    {MANUSCRIPT_SAMPLE.layer3.chiasmStructure}
                  </div>
                </div>
              )}
            </div>

            {/* Bloque de Cita Académica sin fuente monoespaciada */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center justify-between gap-3 text-xs font-body">
              <div className="truncate text-slate-600 dark:text-slate-300">
                <span className="text-[#005A9C] dark:text-[#38BDF8] font-bold">Citar:</span>{' '}
                {citation}
              </div>
              <button
                type="button"
                onClick={handleCopyCitation}
                className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 dark:border-slate-700 hover:border-[#005A9C] rounded-xl font-bold text-slate-700 dark:text-slate-200 hover:text-[#005A9C] transition-colors cursor-pointer"
                title="Copiar cita académica"
                data-cursor="COPIAR"
              >
                {copiedCitation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#008A00]" />
                    <span>Copiada</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
