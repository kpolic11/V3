/**
 * Photography Calculations and Pure Helper Functions
 * Decoupled logic for testing and interactive simulators.
 * Label functions take an optional language (default Greek).
 */
import { UI } from '../i18n/ui';
import type { Lang } from '../data/types';

export interface ExposureResult {
  ev: number;
  diffFromTarget: number;
  status: 'underexposed' | 'balanced' | 'overexposed';
  indicatorColor: string;
  summary: string;
}

export interface DepthOfFieldResult {
  blurRadiusPx: number;
  label: string;
  depthDescription: string;
}

export interface MotionBlurResult {
  blurAmountPx: number;
  isFrozen: boolean;
  label: string;
  description: string;
}

export interface GrainNoiseResult {
  noiseOpacity: number;
  grainIntensity: number;
  label: string;
  description: string;
}

/**
 * Calculates Exposure Value (EV 100 adjusted for ISO)
 * EV = log2(N^2 / t) - log2(ISO / 100)
 * where N = aperture f-number, t = shutter speed in seconds
 */
export function calculateEV(aperture: number, shutterSpeed: number, iso: number): number {
  if (aperture <= 0 || shutterSpeed <= 0 || iso <= 0) {
    throw new Error('Aperture, shutter speed, and ISO must be positive numbers');
  }
  const rawEV = Math.log2((aperture * aperture) / shutterSpeed);
  const isoOffset = Math.log2(iso / 100);
  return Number((rawEV - isoOffset).toFixed(2));
}

/**
 * Determines exposure balance given an EV and scene brightness target.
 * Standard daytime outdoor target is ~12 to 14 EV.
 */
export function evaluateExposure(ev: number, targetEV: number = 13, lang: Lang = 'el'): ExposureResult {
  const M = UI[lang].math;
  // Diff: If scene target is 13, and our settings yield EV 11, we let in MORE light (overexposed).
  // In photography: EV decreases with wider aperture / slower shutter / higher ISO -> brighter image.
  // When camera EV < targetEV, image is brighter (overexposed). When camera EV > targetEV, image is darker (underexposed).
  const diff = Number((targetEV - ev).toFixed(2));

  let status: 'underexposed' | 'balanced' | 'overexposed';
  let indicatorColor: string;
  let summary: string;

  if (diff < -0.7) {
    status = 'underexposed';
    indicatorColor = '#3b82f6'; // Blue / dark
    summary = M.under(Math.abs(diff));
  } else if (diff > 0.7) {
    status = 'overexposed';
    indicatorColor = '#ef4444'; // Red / blown out
    summary = M.over(diff);
  } else {
    status = 'balanced';
    indicatorColor = '#10b981'; // Emerald green
    summary = M.balanced(diff === 0 ? '0' : diff > 0 ? `+${diff}` : `${diff}`);
  }

  return {
    ev,
    diffFromTarget: diff,
    status,
    indicatorColor,
    summary,
  };
}

/**
 * Calculate simulated background blur (Bokeh / Depth of Field)
 * Lower f-stop = larger aperture = shallower depth of field = higher background blur.
 */
export function calculateDepthOfField(aperture: number, lang: Lang = 'el'): DepthOfFieldResult {
  if (aperture <= 0) throw new Error('Aperture must be positive');
  // At f/1.4 blur is maximum (~16px), at f/22 blur is virtually zero (~0.2px)
  const blurRadiusPx = Math.max(0.2, Number(((22 - aperture) / 20.6 * 14).toFixed(1)));
  
  const level = aperture <= 2.8 ? 0 : aperture <= 5.6 ? 1 : aperture <= 11 ? 2 : 3;
  const [label, depthDescription] = UI[lang].math.dof[level];

  return { blurRadiusPx, label, depthDescription };
}

/**
 * Calculates motion freeze vs motion blur for moving subjects
 * Shutter speed in seconds: e.g. 1/1000 = 0.001s, 1/2 = 0.5s
 */
export function calculateMotionBlur(shutterSpeed: number, lang: Lang = 'el'): MotionBlurResult {
  if (shutterSpeed <= 0) throw new Error('Shutter speed must be positive');

  // Freeze threshold: >= 1/500s freezes fast action; >= 1/125 freezes walking humans
  const blurAmountPx = Math.min(24, Math.max(0, Number((shutterSpeed * 40).toFixed(1))));
  const isFrozen = shutterSpeed <= 0.004; // 1/250s or faster

  const level = shutterSpeed <= 0.001 ? 0 : shutterSpeed <= 0.008 ? 1 : shutterSpeed <= 0.033 ? 2 : 3;
  const [label, description] = UI[lang].math.motion[level];

  return { blurAmountPx, isFrozen, label, description };
}

/**
 * Calculates digital noise / film grain based on ISO sensitivity
 */
export function calculateGrainNoise(iso: number, lang: Lang = 'el'): GrainNoiseResult {
  if (iso <= 0) throw new Error('ISO must be positive');

  // ISO 100: virtually 0 noise. ISO 6400: noticeable grit
  const noiseOpacity = Math.min(0.85, Math.max(0.02, Number(((iso - 100) / 6300 * 0.7 + 0.02).toFixed(2))));
  const grainIntensity = Math.min(100, Math.round((iso / 6400) * 100));

  const level = iso <= 200 ? 0 : iso <= 800 ? 1 : iso <= 3200 ? 2 : 3;
  const [label, description] = UI[lang].math.grain[level];

  return { noiseOpacity, grainIntensity, label, description };
}

/**
 * Formats fractional seconds to standard photographic shutter speed
 */
export function formatShutterSpeed(seconds: number): string {
  if (seconds >= 1) {
    return `${seconds}s`;
  }
  const denominator = Math.round(1 / seconds);
  return `1/${denominator}s`;
}

/**
 * Splits text into logical reading / TTS chunks by punctuation
 */
export function splitIntoTTSChunks(text: string, maxChunkLength: number = 280): string[] {
  if (!text || !text.trim()) return [];

  // Match sentences ending in ., !, or ?
  const sentences = text.match(/[^.!?]+[.!?]+(\s+|$)|[^.!?]+$/g) || [text];
  const chunks: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;

    if (current && (current.length + trimmed.length + 1) > maxChunkLength) {
      chunks.push(current);
      current = trimmed;
    } else {
      current = current ? `${current} ${trimmed}` : trimmed;
    }
  }

  if (current) {
    chunks.push(current);
  }

  return chunks;
}
