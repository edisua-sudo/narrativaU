/**
 * Core text layer transformation and academic citation utilities for NarrativaU
 */

export interface ManuscriptLayer {
  id: string;
  depthIndex: number;
  name: string;
  subtitle: string;
  era: string;
  script: string;
  originalText: string;
  transliteration: string;
  translation: string;
  criticalApparatus: string[];
  literaryStructure: string;
}

export interface LayerBlendState {
  layer1Weight: number; // Raw papyrus & paleography
  layer2Weight: number; // Interlinear transcription & vocalization
  layer3Weight: number; // Critical university commentary & hermeneutics
  activeLayerName: string;
}

/**
 * Calculates continuous weight distribution across three manuscript layers
 * based on a normalized scrub value between 0 and 1.
 */
export function calculateLayerBlend(scrub: number): LayerBlendState {
  const clamped = Math.max(0, Math.min(1, scrub));

  let l1 = 0;
  let l2 = 0;
  let l3 = 0;

  if (clamped <= 0.5) {
    const t = clamped / 0.5;
    l1 = 1 - t;
    l2 = t;
    l3 = 0;
  } else {
    const t = (clamped - 0.5) / 0.5;
    l1 = 0;
    l2 = 1 - t;
    l3 = t;
  }

  let activeLayerName = 'Capa I: Papiro & Tinta Histórica';
  if (clamped > 0.33 && clamped <= 0.66) {
    activeLayerName = 'Capa II: Transcripción & Filología';
  } else if (clamped > 0.66) {
    activeLayerName = 'Capa III: Hermenéutica & Crítica Universitaria';
  }

  return {
    layer1Weight: Number(l1.toFixed(3)),
    layer2Weight: Number(l2.toFixed(3)),
    layer3Weight: Number(l3.toFixed(3)),
    activeLayerName,
  };
}

/**
 * Formats standard academic reference citation for university courseware
 */
export function formatAcademicCitation(
  passage: string,
  codex: string,
  folio: string,
  year: number
): string {
  const trimmedPassage = passage.trim();
  const trimmedCodex = codex.trim();
  return `${trimmedPassage} [${trimmedCodex}, fol. ${folio.trim()}]. Archivo NarrativaU, ed. crítica (${year}).`;
}

/**
 * Validates university admission / symposium enrollment form
 */
export interface EnrollmentData {
  fullName: string;
  email: string;
  university: string;
  academicLevel: 'undergraduate' | 'postgraduate' | 'faculty' | 'independent';
  researchInterest: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateEnrollment(data: Partial<EnrollmentData>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.fullName = 'Ingresa tu nombre y apellido completos (mínimo 3 caracteres).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Proporciona un correo electrónico institucional o personal válido.';
  }

  if (!data.university || data.university.trim().length < 2) {
    errors.university = 'Indica tu universidad o institución de adscripción.';
  }

  if (!data.academicLevel) {
    errors.academicLevel = 'Selecciona tu nivel académico.';
  }

  if (!data.researchInterest || data.researchInterest.trim().length < 10) {
    errors.researchInterest = 'Describe tu área de interés o proyecto de investigación (mínimo 10 caracteres).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
