import React, { useState, useMemo } from 'react';
import {
  calculateEV,
  evaluateExposure,
  calculateDepthOfField,
  calculateMotionBlur,
  calculateGrainNoise,
  formatShutterSpeed,
} from '../utils/photographyMath';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ScenePreset {
  id: string;
  targetEV: number;
  icon: string;
}

const SCENE_PRESETS: ScenePreset[] = [
  { id: 'sunny', targetEV: 15, icon: '☀️' },
  { id: 'daylight', targetEV: 13, icon: '🌤️' },
  { id: 'overcast', targetEV: 11, icon: '☁️' },
  { id: 'golden', targetEV: 9, icon: '🌅' },
  { id: 'indoor', targetEV: 7, icon: '🏛️' },
  { id: 'night', targetEV: 4, icon: '🌙' },
];

const APERTURE_STOPS = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22];
const SHUTTER_STOPS = [1 / 4000, 1 / 2000, 1 / 1000, 1 / 500, 1 / 250, 1 / 125, 1 / 60, 1 / 30, 1 / 15, 1 / 4, 1];
const ISO_STOPS = [100, 200, 400, 800, 1600, 3200, 6400];

export const ExposureSimulator: React.FC = () => {
  const { lang, ui } = useLanguage();
  const S = ui.sim;
  const [aperture, setAperture] = useState<number>(8);
  const [shutterSpeed, setShutterSpeed] = useState<number>(1 / 125);
  const [iso, setIso] = useState<number>(100);
  const [currentScene, setCurrentScene] = useState<ScenePreset>(SCENE_PRESETS[1]); // Daylight EV 13

  // Calculate photography math
  const ev = useMemo(() => calculateEV(aperture, shutterSpeed, iso), [aperture, shutterSpeed, iso]);
  const exposureEvaluation = useMemo(() => evaluateExposure(ev, currentScene.targetEV, lang), [ev, currentScene, lang]);
  const dof = useMemo(() => calculateDepthOfField(aperture, lang), [aperture, lang]);
  const motion = useMemo(() => calculateMotionBlur(shutterSpeed, lang), [shutterSpeed, lang]);
  const grain = useMemo(() => calculateGrainNoise(iso, lang), [iso, lang]);

  // Viewfinder brightness factor
  // diffFromTarget: negative = underexposed (dark), positive = overexposed (bright)
  const brightnessFactor = useMemo(() => {
    const diff = exposureEvaluation.diffFromTarget;
    // Map diff in [-4, +4] to brightness [0.15, 2.2]
    const clamped = Math.max(-4, Math.min(4, diff));
    return Math.max(0.12, Math.min(2.5, 1 + clamped * 0.28));
  }, [exposureEvaluation]);

  // Apply Quick Style Presets
  const applyPreset = (presetName: string) => {
    switch (presetName) {
      case 'portrait':
        setAperture(1.4);
        setShutterSpeed(1 / 500);
        setIso(100);
        setCurrentScene(SCENE_PRESETS[1]);
        break;
      case 'f64':
        setAperture(16);
        setShutterSpeed(1 / 60);
        setIso(100);
        setCurrentScene(SCENE_PRESETS[1]);
        break;
      case 'street':
        setAperture(8);
        setShutterSpeed(1 / 250);
        setIso(400);
        setCurrentScene(SCENE_PRESETS[2]);
        break;
      case 'freeze':
        setAperture(2.8);
        setShutterSpeed(1 / 2000);
        setIso(800);
        setCurrentScene(SCENE_PRESETS[1]);
        break;
      case 'waterfall':
        setAperture(22);
        setShutterSpeed(1 / 4);
        setIso(100);
        setCurrentScene(SCENE_PRESETS[2]);
        break;
      default:
        break;
    }
  };

  return (
    <div className="keep-dark bg-stone-900 border border-stone-800 rounded-3xl p-5 md:p-8 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              {S.badge}
            </span>
            <span className="text-xs text-stone-400">{S.kicker}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-stone-100 mt-1">
            {S.title}
          </h3>
          <p className="text-sm text-stone-400 mt-1">
            {S.desc}
          </p>
        </div>

        {/* Scene lighting preset picker */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <label htmlFor="scene-light-select" className="text-xs text-stone-400 shrink-0">
            {S.sceneLabel}
          </label>
          <select
            id="scene-light-select"
            value={currentScene.id}
            onChange={(e) => {
              const found = SCENE_PRESETS.find((s) => s.id === e.target.value);
              if (found) setCurrentScene(found);
            }}
            className="text-xs bg-stone-800 border border-stone-700 text-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
          >
            {SCENE_PRESETS.map((scene) => (
              <option key={scene.id} value={scene.id}>
                {scene.icon} {S.scenes[scene.id][0]} (EV {scene.targetEV})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Controls vs Live Viewfinder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Quick Presets Bar */}
          <div>
            <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2">
              {S.presetsLabel}
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => applyPreset('portrait')}
                className="px-2.5 py-1 text-xs rounded-lg bg-stone-800 hover:bg-amber-600/30 hover:text-amber-300 text-stone-300 border border-stone-700 transition-colors"
              >
                {S.presets.portrait}
              </button>
              <button
                onClick={() => applyPreset('f64')}
                className="px-2.5 py-1 text-xs rounded-lg bg-stone-800 hover:bg-amber-600/30 hover:text-amber-300 text-stone-300 border border-stone-700 transition-colors"
              >
                {S.presets.f64}
              </button>
              <button
                onClick={() => applyPreset('street')}
                className="px-2.5 py-1 text-xs rounded-lg bg-stone-800 hover:bg-amber-600/30 hover:text-amber-300 text-stone-300 border border-stone-700 transition-colors"
              >
                {S.presets.street}
              </button>
              <button
                onClick={() => applyPreset('freeze')}
                className="px-2.5 py-1 text-xs rounded-lg bg-stone-800 hover:bg-amber-600/30 hover:text-amber-300 text-stone-300 border border-stone-700 transition-colors"
              >
                {S.presets.freeze}
              </button>
              <button
                onClick={() => applyPreset('waterfall')}
                className="px-2.5 py-1 text-xs rounded-lg bg-stone-800 hover:bg-amber-600/30 hover:text-amber-300 text-stone-300 border border-stone-700 transition-colors"
              >
                {S.presets.waterfall}
              </button>
            </div>
          </div>

          {/* Slider 1: Aperture */}
          <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-semibold text-stone-200 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                {S.aperture}
              </span>
              <span className="text-base font-mono font-bold text-amber-400 bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-900/50">
                f/{aperture}
              </span>
            </div>
            <p className="text-xs text-stone-400 mb-3">{dof.label}</p>

            <input
              type="range"
              min="0"
              max={APERTURE_STOPS.length - 1}
              step="1"
              value={APERTURE_STOPS.indexOf(aperture)}
              onChange={(e) => setAperture(APERTURE_STOPS[parseInt(e.target.value, 10)])}
              className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              aria-label={S.apertureAria}
            />

            <div className="flex justify-between text-[10px] font-mono text-stone-500 mt-1">
              {S.apertureEnds.map((e) => (
                <span key={e}>{e}</span>
              ))}
            </div>
          </div>

          {/* Slider 2: Shutter Speed */}
          <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-semibold text-stone-200 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                {S.shutter}
              </span>
              <span className="text-base font-mono font-bold text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-900/50">
                {formatShutterSpeed(shutterSpeed)}
              </span>
            </div>
            <p className="text-xs text-stone-400 mb-3">{motion.label}</p>

            <input
              type="range"
              min="0"
              max={SHUTTER_STOPS.length - 1}
              step="1"
              value={SHUTTER_STOPS.indexOf(shutterSpeed)}
              onChange={(e) => setShutterSpeed(SHUTTER_STOPS[parseInt(e.target.value, 10)])}
              className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              aria-label={S.shutterAria}
            />

            <div className="flex justify-between text-[10px] font-mono text-stone-500 mt-1">
              {S.shutterEnds.map((e) => (
                <span key={e}>{e}</span>
              ))}
            </div>
          </div>

          {/* Slider 3: ISO */}
          <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-semibold text-stone-200 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                {S.iso}
              </span>
              <span className="text-base font-mono font-bold text-purple-400 bg-purple-950/40 px-2.5 py-0.5 rounded border border-purple-900/50">
                ISO {iso}
              </span>
            </div>
            <p className="text-xs text-stone-400 mb-3">{grain.label}</p>

            <input
              type="range"
              min="0"
              max={ISO_STOPS.length - 1}
              step="1"
              value={ISO_STOPS.indexOf(iso)}
              onChange={(e) => setIso(ISO_STOPS[parseInt(e.target.value, 10)])}
              className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              aria-label={S.isoAria}
            />

            <div className="flex justify-between text-[10px] font-mono text-stone-500 mt-1">
              {S.isoEnds.map((e) => (
                <span key={e}>{e}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Live Viewfinder Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Simulated Camera Viewfinder Frame */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black rounded-2xl overflow-hidden border-2 border-stone-700 shadow-2xl flex items-center justify-center">
            {/* Background Layer (Simulating Depth of Field Bokeh) */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-300"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80')`,
                filter: `blur(${dof.blurRadiusPx}px) brightness(${brightnessFactor})`,
                transform: 'scale(1.08)', // Compensate for blur edges
              }}
            />

            {/* Foreground Subject: A runner / girl in motion (Simulates Focus & Motion Blur) */}
            <div
              className="relative z-10 flex flex-col items-center justify-center text-center transition-all duration-200"
              style={{
                filter: `brightness(${brightnessFactor})`,
              }}
            >
              <div
                className="relative transition-all duration-150"
                style={{
                  filter: motion.isFrozen ? 'none' : `blur(${motion.blurAmountPx * 0.4}px)`,
                  transform: !motion.isFrozen ? `skewX(${Math.min(12, motion.blurAmountPx * 1.2)}deg)` : 'none',
                }}
              >
                {/* Visual Subject: Stylized Silhouette with Photographic Presence */}
                <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-3xl bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-amber-400/50 p-4 shadow-2xl backdrop-blur-sm flex flex-col items-center justify-center text-stone-100">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mb-2">
                    <span className="text-2xl">🏃</span>
                  </div>
                  <span className="font-semibold text-sm">{S.subject}</span>
                  <span className="text-[11px] text-amber-300 font-mono mt-0.5">
                    {motion.isFrozen ? S.frozen : S.blurred}
                  </span>
                  <span className="text-[10px] text-stone-400 mt-1">
                    {S.focus}
                  </span>
                </div>
              </div>
            </div>

            {/* Simulated ISO Noise Grain Texture */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-300"
              style={{
                opacity: grain.noiseOpacity,
                backgroundImage: `radial-gradient(circle, #fff 10%, transparent 11%), radial-gradient(circle, #aaa 10%, transparent 11%)`,
                backgroundSize: '4px 4px',
              }}
            />

            {/* Viewfinder Overlays (HUD Grid, Autofocus brackets, Light Meter) */}
            <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
              {/* Top HUD: Current Mode & Aperture/Shutter/ISO readout */}
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400/90 bg-stone-950/70 px-3 py-1.5 rounded-lg border border-stone-800/80 backdrop-blur-sm">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  PRO MANUAL
                </span>
                <div className="flex items-center gap-3">
                  <span>f/{aperture}</span>
                  <span>{formatShutterSpeed(shutterSpeed)}</span>
                  <span>ISO {iso}</span>
                </div>
              </div>

              {/* Center Autofocus Brackets */}
              <div className="self-center flex items-center justify-center">
                <div className="w-20 h-20 border border-emerald-400/40 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 border border-emerald-400 rounded-sm" />
                </div>
              </div>

              {/* Bottom HUD: Live Exposure Meter Bar (-3 EV to +3 EV) */}
              <div className="flex flex-col items-center gap-1 bg-stone-950/80 px-4 py-2 rounded-xl border border-stone-800 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-stone-400">{S.exposure}</span>
                  <span
                    className="font-bold px-2 py-0.5 rounded text-stone-900"
                    style={{ backgroundColor: exposureEvaluation.indicatorColor }}
                  >
                    {exposureEvaluation.status === 'balanced'
                      ? S.balanced
                      : exposureEvaluation.status === 'underexposed'
                      ? S.under
                      : S.over}
                  </span>
                  <span className="text-stone-400">
                    EV {ev} ({S.scene}: {currentScene.targetEV})
                  </span>
                </div>

                {/* Exposure Needle Gauge */}
                <div className="relative w-64 h-3 flex items-center justify-between font-mono text-[10px] text-stone-500 mt-1">
                  <span>-3</span>
                  <span>-2</span>
                  <span>-1</span>
                  <span className="text-emerald-400 font-bold">0</span>
                  <span>+1</span>
                  <span>+2</span>
                  <span>+3</span>

                  {/* Meter Tick Lines */}
                  <div className="absolute inset-x-0 h-0.5 bg-stone-700 top-1/2 -translate-y-1/2" />
                  {/* Dynamic Indicator Triangle */}
                  <div
                    className="absolute top-0 w-3 h-3 -translate-x-1/2 transition-all duration-200"
                    style={{
                      left: `${Math.max(5, Math.min(95, 50 + exposureEvaluation.diffFromTarget * 15))}%`,
                    }}
                  >
                    <div
                      className="w-2.5 h-2.5 rotate-45"
                      style={{ backgroundColor: exposureEvaluation.indicatorColor }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Evaluation Summary Box */}
          <div className="mt-4 p-4 rounded-2xl bg-stone-950/80 border border-stone-800 text-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2
                className="w-5 h-5 shrink-0 mt-0.5"
                style={{ color: exposureEvaluation.indicatorColor }}
              />
              <div>
                <p className="font-semibold text-stone-200 text-sm">
                  {exposureEvaluation.summary}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-stone-800/80 text-[11px] text-stone-400">
                  <div>
                    <span className="font-semibold text-stone-300">{S.dof}</span> {dof.depthDescription}
                  </div>
                  <div>
                    <span className="font-semibold text-stone-300">{S.motion}</span> {motion.description}
                  </div>
                  <div>
                    <span className="font-semibold text-stone-300">{S.noise}</span> {grain.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
