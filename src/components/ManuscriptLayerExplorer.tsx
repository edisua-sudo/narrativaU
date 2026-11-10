import React, { useState } from 'react';
import { MANUSCRIPT_SAMPLE, ManuscriptHotspot } from '../utils/manuscriptData';
import { calculateLayerBlend, formatAcademicCitation } from '../utils/textLayers';
import { Layers, Sparkles, BookOpen, Info, Copy, Check } from 'lucide-react';

export const ManuscriptLayerExplorer: React.FC = () => {
  const [scrubPosition, setScrubPosition] = useState(0.5); // 0 = Papiro, 0.5 = Transcripción, 1.0 = Hermenéutica
  const [activeHotspot, setActiveHotspot] = useState<ManuscriptHotspot | null>(MANUSCRIPT_SAMPLE.hotspots[0]);
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
    <section id="estratigrafia" className="py-20 lg:py-28 bg-[#F5F2EB] border-b border-[#111111]/10 manuscript-texture relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#B45309] mb-3">
            <Layers className="w-4 h-4" />
            <span>DISPOSITIVO INTERACTIVO DE EXÉGESIS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-title font-medium text-[#111111] leading-tight">
            Desenterrando las tres capas del manuscrito
          </h2>
          <p className="font-serif text-lg text-[#111111]/75 mt-4 leading-relaxed">
            Un mismo folio contiene siglos de sedimentación cultural. Desliza el cursor sobre las capas estratigráficas para revelar desde el soporte material hasta la exégesis universitaria.
          </p>
        </div>

        {/* Stratigraphy Controller Bar */}
        <div className="bg-[#FFFFFF] border border-[#111111]/15 p-6 rounded shadow-sm mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:w-auto">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#111111]/60 block mb-1">
                Estrato Activo
              </span>
              <span className="text-lg font-serif-title font-bold text-[#B45309]">
                {blend.activeLayerName}
              </span>
            </div>

            {/* Step buttons for fast navigation */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-center">
              <button
                type="button"
                onClick={() => setScrubPosition(0)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded transition-colors ${
                  scrubPosition < 0.25
                    ? 'bg-[#111111] text-white'
                    : 'bg-[#F5F2EB] hover:bg-[#111111]/10 text-[#111111]'
                }`}
                data-cursor="PAPIRO"
              >
                1. Papiro Material
              </button>
              <button
                type="button"
                onClick={() => setScrubPosition(0.5)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded transition-colors ${
                  scrubPosition >= 0.25 && scrubPosition <= 0.75
                    ? 'bg-[#111111] text-white'
                    : 'bg-[#F5F2EB] hover:bg-[#111111]/10 text-[#111111]'
                }`}
                data-cursor="FILOLOGÍA"
              >
                2. Transcripción
              </button>
              <button
                type="button"
                onClick={() => setScrubPosition(1.0)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded transition-colors ${
                  scrubPosition > 0.75
                    ? 'bg-[#111111] text-white'
                    : 'bg-[#F5F2EB] hover:bg-[#111111]/10 text-[#111111]'
                }`}
                data-cursor="EXÉGESIS"
              >
                3. Hermenéutica
              </button>
            </div>

            {/* Continuous Scrubber slider */}
            <div className="w-full md:w-64 flex flex-col gap-1">
              <div className="flex justify-between text-[10px] font-mono text-[#111111]/60 uppercase">
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
                className="w-full accent-[#B45309] cursor-pointer"
                aria-label="Regulador de profundidad de capas de manuscrito"
              />
            </div>
          </div>
        </div>

        {/* Dual Column Explorer Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: The Manuscript Visual & Hotspots Canvas (7 cols) */}
          <div className="lg:col-span-7 bg-[#1A1917] rounded-sm overflow-hidden border border-[#111111]/20 shadow-xl relative min-h-[460px] sm:min-h-[520px] flex flex-col justify-between p-6 text-white">
            {/* Visual background blending */}
            <div className="absolute inset-0 z-0">
              <img
                src="/src/assets/images/ancient_biblical_codex_1794060065998.jpg"
                alt="Detalle de códice antiguo de vitela iluminada"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-85 filter contrast-125 transition-all duration-700"
                style={{
                  filter: `contrast(1.2) sepia(${0.3 + blend.layer1Weight * 0.4}) brightness(${
                    0.7 + blend.layer2Weight * 0.2
                  })`,
                }}
              />
              <div className="absolute inset-0 bg-radial from-transparent via-[#1A1917]/40 to-[#1A1917]/90" />
            </div>

            {/* Top Bar of Manuscript Viewer */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#B45309] font-bold">
                {MANUSCRIPT_SAMPLE.codex}
              </span>
              <span className="font-mono text-[11px] text-white/70">
                {MANUSCRIPT_SAMPLE.shelfmark} · {MANUSCRIPT_SAMPLE.date}
              </span>
            </div>

            {/* Interactive Hotspot Buttons pinned onto manuscript */}
            <div className="relative z-10 my-auto py-12">
              <div className="relative w-full h-[220px]">
                {MANUSCRIPT_SAMPLE.hotspots.map(spot => {
                  const isSelected = activeHotspot?.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => setActiveHotspot(spot)}
                      style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#B45309] text-white scale-110 shadow-lg ring-4 ring-[#B45309]/30'
                          : 'bg-[#111111]/80 hover:bg-[#111111] text-white border border-white/30 backdrop-blur-xs'
                      }`}
                      data-cursor="DETALLE"
                    >
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span className="font-serif text-xs font-semibold">{spot.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Hebrew Text Display Overlay reflecting Layer 2 / 3 */}
              <div
                className="bg-black/60 backdrop-blur-md border border-white/10 p-5 rounded mt-4 transition-opacity duration-500"
                style={{ opacity: 0.35 + blend.layer2Weight * 0.45 + blend.layer3Weight * 0.2 }}
              >
                <div className="text-right text-2xl sm:text-3xl font-serif text-amber-100 tracking-wider font-semibold mb-2" dir="rtl">
                  {MANUSCRIPT_SAMPLE.layer2.hebrewText}
                </div>
                <div className="text-xs font-mono text-white/80 tracking-wide">
                  {MANUSCRIPT_SAMPLE.layer2.transliteration}
                </div>
              </div>
            </div>

            {/* Bottom bar of viewer */}
            <div className="relative z-10 flex items-center justify-between border-t border-white/20 pt-3 text-[11px] font-mono text-white/70">
              <span>{MANUSCRIPT_SAMPLE.material}</span>
              <span>Haz clic en un lema para aislar su etimología</span>
            </div>
          </div>

          {/* Right: The Critical Apparatus & Analytical Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Active Hotspot Lexical Detail */}
            {activeHotspot && (
              <div className="bg-[#FFFFFF] border border-[#111111]/15 p-6 rounded shadow-sm">
                <div className="flex items-center justify-between border-b border-[#111111]/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-serif text-[#B45309] font-bold" dir="rtl">
                      {activeHotspot.hebrew}
                    </span>
                    <span className="text-sm font-mono text-[#111111]/60">
                      ({activeHotspot.label})
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#B45309]">
                    Aparato Crítico
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#111111]/50">
                      Morfología & Raíz Semítica
                    </h4>
                    <p className="text-sm font-serif text-[#111111] mt-0.5">
                      {activeHotspot.etymology}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#111111]/50">
                      Impacto Hermenéutico & Contexto
                    </h4>
                    <p className="text-xs font-sans text-[#111111]/85 leading-relaxed mt-0.5">
                      {activeHotspot.significance}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Layer Explanation Box */}
            <div className="bg-[#FFFFFF] border border-[#111111]/15 p-6 rounded shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B45309] mb-2">
                <Info className="w-3.5 h-3.5" />
                <span>Lectura Estratigráfica</span>
              </div>

              {scrubPosition < 0.35 && (
                <div>
                  <h3 className="text-xl font-serif-title font-medium text-[#111111]">
                    {MANUSCRIPT_SAMPLE.layer1.title}
                  </h3>
                  <p className="text-xs font-serif italic text-[#B45309] mt-1">
                    {MANUSCRIPT_SAMPLE.layer1.subtitle}
                  </p>
                  <p className="text-xs font-sans text-[#111111]/80 mt-3 leading-relaxed">
                    {MANUSCRIPT_SAMPLE.layer1.description}
                  </p>
                  <div className="mt-4 p-3 bg-[#F9F8F6] border border-[#111111]/10 rounded text-[11px] font-mono text-[#111111]/70">
                    {MANUSCRIPT_SAMPLE.layer1.visualNote}
                  </div>
                </div>
              )}

              {scrubPosition >= 0.35 && scrubPosition <= 0.7 && (
                <div>
                  <h3 className="text-xl font-serif-title font-medium text-[#111111]">
                    {MANUSCRIPT_SAMPLE.layer2.title}
                  </h3>
                  <p className="text-xs font-serif italic text-[#B45309] mt-1">
                    {MANUSCRIPT_SAMPLE.layer2.subtitle}
                  </p>
                  <p className="text-xs font-sans text-[#111111]/80 mt-3 leading-relaxed">
                    {MANUSCRIPT_SAMPLE.layer2.description}
                  </p>
                  <div className="mt-4 p-3 bg-[#F9F8F6] border border-[#111111]/10 rounded text-[11px] font-mono text-[#111111]/80">
                    <span className="font-bold text-[#B45309]">Fonética Tiberiana:</span> {MANUSCRIPT_SAMPLE.layer2.phonetic}
                  </div>
                </div>
              )}

              {scrubPosition > 0.7 && (
                <div>
                  <h3 className="text-xl font-serif-title font-medium text-[#111111]">
                    {MANUSCRIPT_SAMPLE.layer3.title}
                  </h3>
                  <p className="text-xs font-serif italic text-[#B45309] mt-1">
                    {MANUSCRIPT_SAMPLE.layer3.subtitle}
                  </p>
                  <p className="text-xs font-sans text-[#111111]/80 mt-3 leading-relaxed">
                    {MANUSCRIPT_SAMPLE.layer3.description}
                  </p>
                  <div className="mt-4 p-3 bg-[#F9F8F6] border border-[#111111]/10 rounded text-[11px] font-serif italic text-[#111111]/85">
                    {MANUSCRIPT_SAMPLE.layer3.chiasmStructure}
                  </div>
                </div>
              )}
            </div>

            {/* Academic Citation Block */}
            <div className="bg-[#FFFFFF] border border-[#111111]/15 p-4 rounded flex items-center justify-between gap-3 text-xs font-mono">
              <div className="truncate text-[#111111]/70">
                <span className="text-[#B45309] font-bold">Citar:</span> {citation}
              </div>
              <button
                type="button"
                onClick={handleCopyCitation}
                className="shrink-0 flex items-center gap-1 px-3 py-1.5 border border-[#111111]/15 hover:border-[#B45309] rounded hover:text-[#B45309] transition-colors"
                title="Copiar cita académica"
                data-cursor="COPIAR"
              >
                {copiedCitation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
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
