import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateLayerBlend, formatAcademicCitation, validateEnrollment } from './textLayers';

test('calculateLayerBlend transitions smoothly from Layer 1 to Layer 2 at 0.25', () => {
  const blend = calculateLayerBlend(0.25);
  assert.equal(blend.layer1Weight, 0.5);
  assert.equal(blend.layer2Weight, 0.5);
  assert.equal(blend.layer3Weight, 0);
  assert.equal(blend.activeLayerName, 'Capa I: Papiro & Tinta Histórica');
});

test('calculateLayerBlend isolates Layer 2 fully at 0.5', () => {
  const blend = calculateLayerBlend(0.5);
  assert.equal(blend.layer1Weight, 0);
  assert.equal(blend.layer2Weight, 1);
  assert.equal(blend.layer3Weight, 0);
  assert.equal(blend.activeLayerName, 'Capa II: Transcripción & Filología');
});

test('calculateLayerBlend reaches Layer 3 at 1.0', () => {
  const blend = calculateLayerBlend(1.0);
  assert.equal(blend.layer1Weight, 0);
  assert.equal(blend.layer2Weight, 0);
  assert.equal(blend.layer3Weight, 1);
  assert.equal(blend.activeLayerName, 'Capa III: Hermenéutica & Crítica Universitaria');
});

test('calculateLayerBlend clamps negative and overflow values safely', () => {
  const under = calculateLayerBlend(-0.5);
  assert.equal(under.layer1Weight, 1);
  assert.equal(under.layer2Weight, 0);
  assert.equal(under.layer3Weight, 0);

  const over = calculateLayerBlend(1.5);
  assert.equal(over.layer1Weight, 0);
  assert.equal(over.layer2Weight, 0);
  assert.equal(over.layer3Weight, 1);
});

test('formatAcademicCitation formats full scholarly citation', () => {
  const citation = formatAcademicCitation('Génesis 1:1-3', 'Códice de Leningrado (B19a)', '1v', 2026);
  assert.equal(
    citation,
    'Génesis 1:1-3 [Códice de Leningrado (B19a), fol. 1v]. Archivo NarrativaU, ed. crítica (2026).'
  );
});

test('validateEnrollment catches empty or invalid fields and passes valid submissions', () => {
  const invalid = validateEnrollment({
    fullName: 'J',
    email: 'bad-email',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.university);

  const valid = validateEnrollment({
    fullName: 'Luisa Cajamarca',
    email: 'lcajamarca@universidad.edu.co',
    university: 'Universidad Nacional',
    academicLevel: 'postgraduate',
    researchInterest: 'Análisis retórico de la poesía hebrea en el periodo persa',
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});
