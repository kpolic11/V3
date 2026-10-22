import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEV,
  evaluateExposure,
  calculateDepthOfField,
  calculateMotionBlur,
  calculateGrainNoise,
  formatShutterSpeed,
  splitIntoTTSChunks,
} from './photographyMath';

test('calculateEV calculates correct exposure value for sunny 16 baseline', () => {
  // Sunny 16 rule: f/16, 1/125s, ISO 100 => log2(256 * 125) = log2(32000) ~ 14.97 EV
  const ev = calculateEV(16, 1 / 125, 100);
  assert.equal(Math.round(ev), 15);
});

test('calculateEV decreases when aperture is widened or ISO is increased', () => {
  const evBase = calculateEV(8, 1 / 125, 100);
  const evWiderAperture = calculateEV(2.8, 1 / 125, 100);
  const evHigherISO = calculateEV(8, 1 / 125, 400);

  assert.ok(evWiderAperture < evBase, 'Wider aperture should decrease EV (brighter scene captured)');
  assert.ok(evHigherISO < evBase, 'Higher ISO should decrease EV value');
});

test('evaluateExposure correctly categorizes underexposed, balanced, and overexposed', () => {
  // Target = 13
  const balanced = evaluateExposure(13, 13);
  assert.equal(balanced.status, 'balanced');
  assert.equal(balanced.diffFromTarget, 0);

  const under = evaluateExposure(15, 13); // Camera setting lets in less light -> darker
  assert.equal(under.status, 'underexposed');

  const over = evaluateExposure(10, 13); // Camera setting lets in way more light -> brighter
  assert.equal(over.status, 'overexposed');
});

test('calculateDepthOfField yields higher blur at wide aperture', () => {
  const wide = calculateDepthOfField(1.4);
  const narrow = calculateDepthOfField(16);

  assert.ok(wide.blurRadiusPx > narrow.blurRadiusPx);
  assert.match(wide.label, /Bokeh/i);
});

test('calculateMotionBlur identifies fast shutter speed as frozen', () => {
  const fast = calculateMotionBlur(1 / 1000);
  const slow = calculateMotionBlur(1 / 4);

  assert.equal(fast.isFrozen, true);
  assert.equal(slow.isFrozen, false);
  assert.ok(slow.blurAmountPx > fast.blurAmountPx);
});

test('calculateGrainNoise increases with ISO', () => {
  const lowIso = calculateGrainNoise(100);
  const highIso = calculateGrainNoise(6400);

  assert.ok(highIso.noiseOpacity > lowIso.noiseOpacity);
  assert.ok(highIso.grainIntensity > lowIso.grainIntensity);
});

test('formatShutterSpeed formats fractions and seconds cleanly', () => {
  assert.equal(formatShutterSpeed(1 / 1000), '1/1000s');
  assert.equal(formatShutterSpeed(1 / 60), '1/60s');
  assert.equal(formatShutterSpeed(2), '2s');
});

test('splitIntoTTSChunks splits long text by sentences within threshold', () => {
  const greekText =
    'Όλα ξεκινούν με ένα απλό φαινόμενο του φωτός. Αν σε ένα εντελώς σκοτεινό δωμάτιο ανοίξεις μια μικρή τρύπα στον τοίχο, το φως από έξω περνάει μέσα. Αυτό ονομάζεται κάμερα ομπσκούρα.';
  const chunks = splitIntoTTSChunks(greekText, 100);

  assert.ok(chunks.length >= 2, 'Should be split into multiple chunks');
  for (const chunk of chunks) {
    assert.ok(chunk.length > 0);
  }
});
