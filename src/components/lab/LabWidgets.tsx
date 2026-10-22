import React, { useMemo, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { formatShutterSpeed } from '../../utils/photographyMath';

/* Interactive widgets used inside Lab lessons. */

const APERTURES = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22];
const SHUTTERS = [1 / 8000, 1 / 4000, 1 / 2000, 1 / 1000, 1 / 500, 1 / 250, 1 / 125, 1 / 60, 1 / 30, 1 / 15, 1 / 8, 1 / 4, 1 / 2, 1, 2];
const ISOS = [100, 200, 400, 800, 1600, 3200, 6400, 12800];

const Card: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div className="keep-dark rounded-2xl bg-stone-950 border border-stone-800 p-4">
    {title && <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">{title}</p>}
    {children}
  </div>
);

/* ---------------- Stops ---------------- */
export const StopsWidget: React.FC = () => {
  const { ui } = useLanguage();
  const W = ui.lab.w;
  const [n, setN] = useState(1);
  const ai = 5 - n; // from f/8
  const si = 6 + n; // from 1/125
  const ii = 2 + n; // from ISO 400
  const at = (arr: number[], i: number) => (i >= 0 && i < arr.length ? arr[i] : null);
  const a = at(APERTURES, ai);
  const s = at(SHUTTERS, si);
  const iso = at(ISOS, ii);
  const factor = Math.pow(2, n);
  return (
    <Card title={W.stopsTitle}>
      <div className="flex items-center gap-3">
        <span className="text-xs text-stone-400 w-20">{W.less}</span>
        <input type="range" min={-3} max={3} step={1} value={n} onChange={(e) => setN(+e.target.value)} className="flex-1 accent-amber-500" aria-label={W.stopsTitle} />
        <span className="text-xs text-stone-400 w-20 text-right">{W.more}</span>
      </div>
      <p className="text-center font-mono text-2xl text-amber-300 mt-3">
        {n > 0 ? '+' : ''}
        {n} · ×{factor >= 1 ? factor : `1/${1 / factor}`} {W.light.toLowerCase()}
      </p>
      <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
        <div className="rounded-xl bg-stone-900 p-3 border border-stone-800">
          <div className="text-stone-400">{W.aperture}</div>
          <div className="font-mono text-base text-stone-100 mt-1">f/8 → {a ? `f/${a}` : '—'}</div>
        </div>
        <div className="rounded-xl bg-stone-900 p-3 border border-stone-800">
          <div className="text-stone-400">{W.shutter}</div>
          <div className="font-mono text-base text-stone-100 mt-1">1/125 → {s ? formatShutterSpeed(s) : '—'}</div>
        </div>
        <div className="rounded-xl bg-stone-900 p-3 border border-stone-800">
          <div className="text-stone-400">ISO</div>
          <div className="font-mono text-base text-stone-100 mt-1">400 → {iso ?? '—'}</div>
        </div>
      </div>
    </Card>
  );
};

/* ---------------- Equivalent exposures ---------------- */
export const EquivalentWidget: React.FC = () => {
  const { ui } = useLanguage();
  const W = ui.lab.w;
  const [ai, setAi] = useState(5); // f/8
  // Locked exposure: f/8 at 1/125 (ISO 100). Each aperture stop shifts the shutter one stop.
  const shutter = SHUTTERS[6 + (5 - ai)] ?? null;
  const blurBg = Math.max(0, (5 - ai) * 1.6);
  const motion = shutter ? Math.min(14, shutter * 400) : 0;
  return (
    <Card title={`${W.lockedExposure}: EV 13 (ISO 100)`}>
      <svg viewBox="0 0 400 180" className="w-full rounded-xl bg-sky-900/40">
        <defs>
          <filter id="eqBg"><feGaussianBlur stdDeviation={blurBg} /></filter>
          <filter id="eqMo"><feGaussianBlur stdDeviation={`${motion} 0`} /></filter>
        </defs>
        <g filter="url(#eqBg)">
          {[40, 110, 180, 250, 320, 380].map((x, i) => (
            <g key={x}>
              <rect x={x - 6} y={70 + (i % 2) * 10} width="12" height="40" fill="#78350f" />
              <circle cx={x} cy={65 + (i % 2) * 10} r="26" fill={i % 2 ? '#15803d' : '#166534'} />
            </g>
          ))}
          <rect x="0" y="120" width="400" height="60" fill="#3f6212" />
        </g>
        <g filter="url(#eqMo)">
          <circle cx="200" cy="96" r="10" fill="#f59e0b" />
          <path d="M200 106 L200 138 M200 116 L186 128 M200 116 L214 124 M200 138 L190 160 M200 138 L212 158" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
        </g>
      </svg>
      <div className="mt-4 flex items-center gap-3">
        <span className="font-mono text-xs text-stone-400 w-10">f/1.4</span>
        <input type="range" min={0} max={APERTURES.length - 1} value={ai} onChange={(e) => setAi(+e.target.value)} className="flex-1 accent-amber-500" aria-label={W.aperture} />
        <span className="font-mono text-xs text-stone-400 w-10 text-right">f/22</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-center text-xs">
        <div className="rounded-xl bg-stone-900 p-2 border border-stone-800">
          <div className="text-stone-400">{W.aperture}</div>
          <div className="font-mono text-amber-300 text-base">f/{APERTURES[ai]}</div>
        </div>
        <div className="rounded-xl bg-stone-900 p-2 border border-stone-800">
          <div className="text-stone-400">{W.shutter}</div>
          <div className="font-mono text-cyan-300 text-base">{shutter ? formatShutterSpeed(shutter) : '—'}</div>
        </div>
        <div className="rounded-xl bg-stone-900 p-2 border border-stone-800">
          <div className="text-stone-400">{W.background}</div>
          <div className="text-stone-100">{blurBg > 2 ? W.softBg : W.sharpBg}</div>
        </div>
        <div className="rounded-xl bg-stone-900 p-2 border border-stone-800">
          <div className="text-stone-400">{W.motion}</div>
          <div className="text-stone-100">{shutter && shutter <= 1 / 250 ? W.frozen : W.blurred}</div>
        </div>
      </div>
      <p className="text-xs text-stone-400 mt-3 text-center">{W.sameLight}</p>
      {shutter && shutter > 1 / 60 && <p className="text-xs text-amber-400 mt-1 text-center">{W.handheldWarning}</p>}
    </Card>
  );
};

/* ---------------- Histogram ---------------- */
export const HistogramWidget: React.FC = () => {
  const { ui } = useLanguage();
  const W = ui.lab.w;
  const [ev, setEv] = useState(0);
  const BINS = 48;
  const bins = useMemo(() => {
    // A scene with dark shadows, many midtones and a bright sky, in "stops" from mid-grey.
    const tones: number[] = [];
    for (let i = 0; i < 2000; i++) {
      const r = Math.sin(i * 12.9898) * 43758.5453;
      const u = r - Math.floor(r);
      const group = i % 10;
      const base = group < 2 ? -2.6 : group < 8 ? 0 : 2.2; // shadows / mids / sky
      tones.push(base + (u - 0.5) * 2.6);
    }
    const out = new Array(BINS).fill(0);
    for (const t of tones) {
      const stops = t + ev; // -5..+5 stops visible range
      const pos = Math.round(((stops + 5) / 10) * (BINS - 1));
      out[Math.max(0, Math.min(BINS - 1, pos))]++;
    }
    return out;
  }, [ev]);
  const max = Math.max(...bins);
  const clipLow = bins[0] > 25;
  const clipHigh = bins[BINS - 1] > 25;
  return (
    <Card>
      <div className="grid sm:grid-cols-2 gap-4">
        <svg viewBox="0 0 200 130" className="w-full rounded-xl">
          <defs>
            <linearGradient id="hSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
          </defs>
          <g style={{ filter: `brightness(${Math.pow(2, ev * 0.55)})` }}>
            <rect width="200" height="130" fill="url(#hSky)" />
            <path d="M0 80 L40 55 L80 75 L130 45 L200 78 L200 130 L0 130 Z" fill="#57534e" />
            <path d="M0 105 L200 95 L200 130 L0 130 Z" fill="#292524" />
            <circle cx="160" cy="30" r="12" fill="#fefce8" />
          </g>
        </svg>
        <div>
          <svg viewBox="0 0 200 110" className="w-full rounded-xl bg-stone-900">
            {bins.map((b, i) => (
              <rect key={i} x={4 + i * (192 / BINS)} y={100 - (b / max) * 90} width={192 / BINS - 0.8} height={(b / max) * 90} fill={(i === 0 && clipLow) || (i === BINS - 1 && clipHigh) ? '#ef4444' : '#d6d3d1'} />
            ))}
            <line x1="4" y1="100" x2="196" y2="100" stroke="#57534e" />
          </svg>
          <div className="flex justify-between text-[10px] text-stone-400 mt-1">
            <span>{W.shadows}</span>
            <span>{W.midtones}</span>
            <span>{W.highlights}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className="text-xs text-stone-400 w-36">{W.histExposure}</span>
        <input type="range" min={-3} max={3} step={0.5} value={ev} onChange={(e) => setEv(+e.target.value)} className="flex-1 accent-amber-500" aria-label={W.histExposure} />
        <span className="font-mono text-amber-300 w-12 text-right">{ev > 0 ? '+' : ''}{ev}</span>
      </div>
      <p className={`text-xs mt-3 ${clipLow || clipHigh ? 'text-red-400' : 'text-emerald-400'}`}>
        {clipLow && W.clipShadows} {clipHigh && W.clipHighlights} {!clipLow && !clipHigh && W.histOk}
      </p>
    </Card>
  );
};

/* ---------------- Metering ---------------- */
export const MeteringWidget: React.FC = () => {
  const { ui } = useLanguage();
  const W = ui.lab.w;
  const SCENES: Record<string, number> = { snow: 2.2, normal: 0, dark: -2 }; // stops from mid-grey
  const [scene, setScene] = useState<keyof typeof SCENES>('snow');
  const [comp, setComp] = useState(0);
  const toGrey = (stops: number) => {
    const lum = Math.max(0.01, Math.min(1, 0.18 * Math.pow(2, stops)));
    const v = Math.round(255 * Math.pow(lum, 1 / 2.2));
    return `rgb(${v},${v},${v})`;
  };
  const real = SCENES[scene];
  const result = comp; // the meter renders the scene at mid-grey, plus compensation
  const diff = result - real;
  return (
    <Card>
      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(SCENES) as (keyof typeof SCENES)[]).map((k) => (
          <button key={k} onClick={() => { setScene(k); setComp(0); }} className={`px-3 py-1.5 rounded-lg text-xs ${scene === k ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'}`}>
            {W.meterScenes[k]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div>
          <div className="aspect-square rounded-xl border border-stone-700" style={{ background: toGrey(real) }} />
          <p className="text-stone-400 mt-1">{W.meterScenes[scene]}</p>
        </div>
        <div>
          <div className="aspect-square rounded-xl border border-stone-700" style={{ background: toGrey(0) }} />
          <p className="text-stone-400 mt-1">{W.meterSays}</p>
        </div>
        <div>
          <div className="aspect-square rounded-xl border-2 border-amber-500" style={{ background: toGrey(result) }} />
          <p className="text-stone-400 mt-1">{W.meterResult}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className="text-xs text-stone-400 w-40">{W.compensation}</span>
        <input type="range" min={-3} max={3} step={0.3} value={comp} onChange={(e) => setComp(+e.target.value)} className="flex-1 accent-amber-500" aria-label={W.compensation} />
        <span className="font-mono text-amber-300 w-12 text-right">{comp > 0 ? '+' : ''}{comp.toFixed(1)}</span>
      </div>
      <p className={`text-xs mt-3 ${Math.abs(diff) < 0.5 ? 'text-emerald-400' : 'text-stone-400'}`}>
        {Math.abs(diff) < 0.5 ? W.meterGood : diff < 0 ? W.meterTooDark : W.meterTooBright}
      </p>
    </Card>
  );
};

/* ---------------- White balance ---------------- */
export const WhiteBalanceWidget: React.FC = () => {
  const { ui } = useLanguage();
  const W = ui.lab.w;
  const SCENE_K = [1900, 3000, 3500, 5500, 6500, 7500];
  const [sceneIdx, setSceneIdx] = useState(1);
  const [camK, setCamK] = useState(5500);
  const sceneK = SCENE_K[sceneIdx];
  const shift = Math.log2(sceneK / camK); // >0: light bluer than set → blue cast; <0: orange cast
  const strength = Math.min(0.55, Math.abs(shift) * 0.45);
  const cast = shift > 0 ? `rgba(56,132,255,${strength})` : `rgba(255,140,40,${strength})`;
  return (
    <Card>
      <div className="flex flex-wrap gap-2 mb-4">
        {W.wbScenes.map((name, i) => (
          <button key={name} onClick={() => setSceneIdx(i)} className={`px-3 py-1.5 rounded-lg text-xs ${sceneIdx === i ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'}`}>
            {name} · {SCENE_K[i]}K
          </button>
        ))}
      </div>
      <div className="relative rounded-xl overflow-hidden border border-stone-700">
        <svg viewBox="0 0 400 150" className="w-full block bg-stone-200">
          <rect x="0" y="100" width="400" height="50" fill="#a8a29e" />
          <rect x="60" y="30" width="110" height="80" fill="#ffffff" stroke="#d6d3d1" />
          <circle cx="250" cy="85" r="28" fill="#dc2626" />
          <rect x="300" y="50" width="50" height="60" fill="#2563eb" />
          <rect x="190" y="105" width="140" height="10" fill="#78716c" />
        </svg>
        <div className="absolute inset-0 mix-blend-multiply pointer-events-none" style={{ background: cast }} />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className="text-xs text-stone-400 w-40">{W.wbCamera}</span>
        <input type="range" min={2000} max={10000} step={100} value={camK} onChange={(e) => setCamK(+e.target.value)} className="flex-1 accent-amber-500" aria-label={W.wbCamera} />
        <span className="font-mono text-amber-300 w-16 text-right">{camK}K</span>
      </div>
      <p className={`text-xs mt-3 ${Math.abs(shift) < 0.12 ? 'text-emerald-400' : 'text-stone-400'}`}>
        {Math.abs(shift) < 0.12 ? W.wbNeutral : shift > 0 ? W.wbCool : W.wbWarm}
      </p>
    </Card>
  );
};

/* ---------------- Shooting modes ---------------- */
export const ModesWidget: React.FC = () => {
  const { ui } = useLanguage();
  const W = ui.lab.w;
  return (
    <div className="overflow-x-auto rounded-2xl border border-stone-800">
      <table className="w-full text-xs">
        <thead className="bg-stone-900 text-stone-400">
          <tr>
            {W.modeHeaders.map((h) => (
              <th key={h} className="text-left p-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {W.modes.map(([code, name, what, when]) => (
            <tr key={code} className="border-t border-stone-800 bg-stone-950">
              <td className="p-3 align-top">
                <span className="font-mono font-bold text-amber-300 text-sm">{code}</span>
                <div className="text-stone-300">{name}</div>
              </td>
              <td className="p-3 align-top text-stone-300">{what}</td>
              <td className="p-3 align-top text-stone-400">{when}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* ---------------- Depth of field (top view + camera view) ---------------- */
type SensorKey = 'ff' | 'apsc' | 'mft' | 'phone';
const CROP: Record<SensorKey, number> = { ff: 1, apsc: 1.5, mft: 2, phone: 5 };
const DOF_APERTURES = [1.4, 1.8, 2, 2.8, 4, 5.6, 8, 11, 16, 22];
const DOF_FOCALS = [13, 24, 35, 50, 85, 135, 200];
const DOF_PRESETS: Record<string, { sensor: SensorKey; focal: number; n: number; dist: number }> = {
  'dof-what': { sensor: 'ff', focal: 50, n: 4, dist: 3 },
  'dof-aperture': { sensor: 'ff', focal: 85, n: 1.8, dist: 3 },
  'dof-distance': { sensor: 'ff', focal: 50, n: 2.8, dist: 1.5 },
  'dof-lens-sensor': { sensor: 'phone', focal: 24, n: 1.8, dist: 2 },
  'dof-hyperfocal': { sensor: 'ff', focal: 24, n: 11, dist: 5 },
};
const SUBJECT_DIST = [1, 3, 15]; // flower, person, tree (m)

/** Classic thin-lens depth of field. Distances in metres; returns near/far/hyperfocal in metres. */
export function depthOfField(focalEq: number, n: number, distM: number, sensor: SensorKey) {
  const crop = CROP[sensor];
  const f = focalEq / crop; // actual focal length, mm
  const c = 0.03 / crop; // circle of confusion, mm
  const s = distM * 1000;
  const H = (f * f) / (n * c) + f;
  const near = (s * (H - f)) / (H + s - 2 * f);
  const far = s < H ? (s * (H - f)) / (H - s) : Infinity;
  return { near: near / 1000, far: far / 1000, hyper: H / 1000, f, c };
}

/** Blur-disc diameter relative to the circle of confusion, for an object at x metres. */
function blurRatio(focalEq: number, n: number, distM: number, xM: number, sensor: SensorKey) {
  const { f, c } = depthOfField(focalEq, n, distM, sensor);
  const s = distM * 1000;
  const x = xM * 1000;
  const b = (f * f * Math.abs(x - s)) / (n * x * (s - f));
  return b / c;
}

const fmtM = (m: number, inf: string) => (!isFinite(m) ? inf : m >= 10 ? `${m.toFixed(0)} m` : m >= 1 ? `${m.toFixed(1)} m` : `${Math.round(m * 100)} cm`);

export const DofWidget: React.FC<{ lessonId?: string }> = ({ lessonId }) => {
  const { ui } = useLanguage();
  const W = ui.lab.w;
  const p = DOF_PRESETS[lessonId ?? ''] ?? DOF_PRESETS['dof-what'];
  const [sensor, setSensor] = useState<SensorKey>(p.sensor);
  const [focal, setFocal] = useState(p.focal);
  const [n, setN] = useState(p.n);
  const [logDist, setLogDist] = useState(Math.log10(p.dist));
  const dist = Math.pow(10, logDist);
  const { near, far, hyper } = depthOfField(focal, n, dist, sensor);
  const total = far - near;

  // log scale 0.3 m – 40 m mapped to x 30…390
  const X = (m: number) => 30 + ((Math.log10(Math.min(Math.max(m, 0.3), 40)) - Math.log10(0.3)) / (Math.log10(40) - Math.log10(0.3))) * 360;
  const ticks = [0.5, 1, 2, 5, 10, 20];

  return (
    <Card>
      <p className="text-xs text-stone-400 mb-2">{W.dofTop}</p>
      <svg viewBox="0 0 400 120" className="w-full rounded-xl bg-stone-900">
        <rect x={X(near)} y="20" width={Math.max(2, X(far) - X(near))} height="70" fill="#34d399" opacity="0.22" />
        <line x1={X(dist)} y1="14" x2={X(dist)} y2="96" stroke="#f59e0b" strokeWidth="2" />
        {/* camera */}
        <rect x="6" y="45" width="18" height="20" rx="3" fill="#a8a29e" />
        <path d="M24 50 L30 47 L30 63 L24 60 Z" fill="#78716c" />
        {/* subjects */}
        <g>
          <circle cx={X(SUBJECT_DIST[0])} cy="72" r="5" fill="#f472b6" />
          <line x1={X(SUBJECT_DIST[0])} y1="77" x2={X(SUBJECT_DIST[0])} y2="88" stroke="#22c55e" strokeWidth="2" />
          <circle cx={X(SUBJECT_DIST[1])} cy="44" r="6" fill="#fbbf24" />
          <line x1={X(SUBJECT_DIST[1])} y1="50" x2={X(SUBJECT_DIST[1])} y2="74" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
          <circle cx={X(SUBJECT_DIST[2])} cy="45" r="13" fill="#16a34a" />
          <rect x={X(SUBJECT_DIST[2]) - 2} y="56" width="4" height="22" fill="#78350f" />
        </g>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={X(t)} y1="98" x2={X(t)} y2="102" stroke="#57534e" />
            <text x={X(t)} y="114" fill="#a8a29e" fontSize="9" textAnchor="middle">
              {t} m
            </text>
          </g>
        ))}
      </svg>

      <p className="text-xs text-stone-400 mt-4 mb-2">{W.dofView}</p>
      <div className="grid grid-cols-3 gap-2">
        {SUBJECT_DIST.map((x, i) => {
          const r = blurRatio(focal, n, dist, x, sensor);
          const px = Math.min(10, Math.max(0, (r - 1) * 0.7));
          const sharp = r <= 1;
          return (
            <div key={x} className={`rounded-xl border p-2 text-center ${sharp ? 'border-emerald-500/60' : 'border-stone-700'}`}>
              <svg viewBox="0 0 60 60" className="w-full h-16" style={{ filter: `blur(${px}px)` }}>
                {i === 0 && (
                  <g>
                    <circle cx="30" cy="22" r="10" fill="#f472b6" />
                    <circle cx="30" cy="22" r="4" fill="#fde047" />
                    <rect x="28.5" y="32" width="3" height="22" fill="#22c55e" />
                  </g>
                )}
                {i === 1 && (
                  <g>
                    <circle cx="30" cy="16" r="8" fill="#fbbf24" />
                    <rect x="22" y="25" width="16" height="28" rx="6" fill="#f59e0b" />
                  </g>
                )}
                {i === 2 && (
                  <g>
                    <circle cx="30" cy="22" r="16" fill="#16a34a" />
                    <rect x="27" y="36" width="6" height="20" fill="#78350f" />
                  </g>
                )}
              </svg>
              <p className="text-[11px] text-stone-300">{W.dofSubjects[i]}</p>
              <p className="text-[10px] text-stone-500 font-mono">{x} m</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {(Object.keys(CROP) as SensorKey[]).map((k) => (
          <button key={k} onClick={() => setSensor(k)} className={`px-2.5 py-1 rounded-lg text-xs ${sensor === k ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'}`}>
            {W.dofSensors[k]}
          </button>
        ))}
      </div>
      <div className="mt-3 space-y-2 text-xs">
        <label className="flex items-center gap-3">
          <span className="w-36 text-stone-400">{W.dofFocal}</span>
          <input type="range" min={0} max={DOF_FOCALS.length - 1} value={DOF_FOCALS.indexOf(focal)} onChange={(e) => setFocal(DOF_FOCALS[+e.target.value])} className="flex-1 accent-amber-500" />
          <span className="w-16 text-right font-mono text-amber-300">{focal} mm</span>
        </label>
        <label className="flex items-center gap-3">
          <span className="w-36 text-stone-400">{W.dofAperture}</span>
          <input type="range" min={0} max={DOF_APERTURES.length - 1} value={DOF_APERTURES.indexOf(n)} onChange={(e) => setN(DOF_APERTURES[+e.target.value])} className="flex-1 accent-amber-500" />
          <span className="w-16 text-right font-mono text-amber-300">f/{n}</span>
        </label>
        <label className="flex items-center gap-3">
          <span className="w-36 text-stone-400">{W.dofDistance}</span>
          <input type="range" min={Math.log10(0.3)} max={Math.log10(30)} step={0.01} value={logDist} onChange={(e) => setLogDist(+e.target.value)} className="flex-1 accent-amber-500" />
          <span className="w-16 text-right font-mono text-amber-300">{fmtM(dist, '')}</span>
        </label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-center text-xs">
        <div className="rounded-xl bg-stone-900 p-2 border border-stone-800">
          <div className="text-stone-400">{W.dofNear}</div>
          <div className="font-mono text-stone-100">{fmtM(near, W.dofInf)}</div>
        </div>
        <div className="rounded-xl bg-stone-900 p-2 border border-stone-800">
          <div className="text-stone-400">{W.dofFar}</div>
          <div className="font-mono text-stone-100">{fmtM(far, W.dofInf)}</div>
        </div>
        <div className="rounded-xl bg-stone-900 p-2 border border-emerald-800">
          <div className="text-stone-400">{W.dofTotal}</div>
          <div className="font-mono text-emerald-300">{isFinite(total) ? fmtM(total, W.dofInf) : '∞'}</div>
        </div>
        <div className="rounded-xl bg-stone-900 p-2 border border-stone-800">
          <div className="text-stone-400">{W.dofHyper}</div>
          <div className="font-mono text-stone-100">{fmtM(hyper, W.dofInf)}</div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={() => setLogDist(Math.log10(Math.min(30, Math.max(0.3, hyper))))}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
        >
          {W.dofFocusHyper}
        </button>
        <p className="text-[10px] text-stone-500 max-w-md">{W.dofNote}</p>
      </div>
    </Card>
  );
};

/* ---------------- Focal length & angle of view ---------------- */
const FOCALS = [13, 16, 24, 28, 35, 50, 70, 85, 135, 200, 400];
export const FocalWidget: React.FC = () => {
  const { ui } = useLanguage();
  const W = ui.lab.w;
  const [i, setI] = useState(2);
  const f = FOCALS[i];
  const fov = (2 * Math.atan(36 / (2 * f)) * 180) / Math.PI;
  const base = Math.tan(Math.atan(36 / (2 * 13)));
  const frac = Math.tan(Math.atan(36 / (2 * f))) / base; // fraction of the 13 mm view
  const vw = 800 * frac;
  const vh = vw * (2 / 3);
  const cx = 400;
  const cy = 300;
  const name = f <= 20 ? W.focalNames.uw : f <= 35 ? W.focalNames.w : f <= 55 ? W.focalNames.n : f <= 150 ? W.focalNames.t : W.focalNames.st;
  const half = (fov / 2) * (Math.PI / 180);
  return (
    <Card>
      <div className="grid sm:grid-cols-[160px_1fr] gap-3 items-center">
        <svg viewBox="0 0 160 120" className="w-full">
          <path d={`M20 60 L${20 + 130 * Math.cos(half)} ${60 - 130 * Math.sin(half)} A130 130 0 0 1 ${20 + 130 * Math.cos(half)} ${60 + 130 * Math.sin(half)} Z`} fill="#f59e0b" opacity="0.25" stroke="#f59e0b" />
          <rect x="6" y="52" width="16" height="16" rx="3" fill="#a8a29e" />
          <text x="80" y="115" fill="#e7e5e4" fontSize="11" textAnchor="middle">
            {fov.toFixed(0)}°
          </text>
        </svg>
        <svg viewBox={`${cx - vw / 2} ${cy - vh / 2} ${vw} ${vh}`} className="w-full rounded-xl" preserveAspectRatio="xMidYMid slice">
          <rect x="0" y="0" width="800" height="600" fill="#7dd3fc" />
          <path d="M0 330 L120 220 L230 300 L360 180 L470 290 L590 210 L800 320 L800 600 L0 600 Z" fill="#78716c" />
          <rect x="0" y="380" width="800" height="220" fill="#65a30d" />
          <rect x="320" y="300" width="120" height="110" fill="#e7e5e4" />
          <path d="M310 300 L380 250 L450 300 Z" fill="#b91c1c" />
          <rect x="370" y="350" width="22" height="60" fill="#78350f" />
          <circle cx="395" cy="430" r="7" fill="#fbbf24" />
          <rect x="390" y="437" width="10" height="22" rx="3" fill="#f59e0b" />
          {[80, 160, 620, 720].map((x) => (
            <g key={x}>
              <rect x={x - 4} y="360" width="8" height="40" fill="#78350f" />
              <circle cx={x} cy="350" r="26" fill="#15803d" />
            </g>
          ))}
          <circle cx="680" cy="90" r="30" fill="#fef9c3" />
        </svg>
      </div>
      <div className="mt-4 flex items-center gap-3 text-xs">
        <span className="w-40 text-stone-400">{W.focalLabel}</span>
        <input type="range" min={0} max={FOCALS.length - 1} value={i} onChange={(e) => setI(+e.target.value)} className="flex-1 accent-amber-500" />
        <span className="w-16 text-right font-mono text-amber-300">{f} mm</span>
      </div>
      <p className="text-center text-sm text-stone-200 mt-2">
        {name} · <span className="text-stone-400">{W.focalAngle}: {fov.toFixed(0)}°</span>
      </p>
    </Card>
  );
};

/* ---------------- Light direction & quality ---------------- */
export const LightDirWidget: React.FC = () => {
  const { ui } = useLanguage();
  const W = ui.lab.w;
  const [angle, setAngle] = useState(60); // 0 = front, 90 = side, 180 = back
  const [size, setSize] = useState(0.2); // 0 = tiny (hard), 1 = huge (soft)
  const rad = (angle * Math.PI) / 180;
  // highlight position on the sphere (seen from camera): x from sin, depth from cos
  const hx = 50 - 40 * Math.sin(rad) * 0.9;
  const hy = 40;
  const lit = Math.max(0, Math.cos(rad / 1.2));
  const shadowX = 60 + 30 * Math.sin(rad);
  const blur = 1 + size * 10;
  const pos = angle < 50 ? W.lightPos.front : angle < 130 ? W.lightPos.side : W.lightPos.back;
  return (
    <Card>
      <svg viewBox="0 0 120 90" className="w-full max-w-md mx-auto block rounded-xl bg-stone-900">
        <defs>
          <radialGradient id="ldSphere" cx={`${hx}%`} cy={`${hy}%`} r={`${55 + size * 40}%`}>
            <stop offset="0%" stopColor="#fde68a" stopOpacity={0.4 + lit * 0.6} />
            <stop offset={`${35 + size * 40}%`} stopColor="#d97706" />
            <stop offset="100%" stopColor="#1c1917" />
          </radialGradient>
          <filter id="ldBlur">
            <feGaussianBlur stdDeviation={blur} />
          </filter>
        </defs>
        <rect x="0" y="62" width="120" height="28" fill="#292524" />
        <ellipse cx={shadowX} cy="70" rx={16 + size * 6} ry="4" fill="#000" opacity={0.75 - size * 0.4} filter="url(#ldBlur)" />
        <circle cx="60" cy="45" r="20" fill="url(#ldSphere)" />
        <circle cx={60 - 52 * Math.sin(rad)} cy={20} r={2 + size * 6} fill="#fef9c3" opacity={angle > 150 ? 0.5 : 1} />
      </svg>
      <div className="mt-4 space-y-2 text-xs">
        <label className="flex items-center gap-3">
          <span className="w-36 text-stone-400">{W.lightAngle}</span>
          <input type="range" min={0} max={170} value={angle} onChange={(e) => setAngle(+e.target.value)} className="flex-1 accent-amber-500" />
          <span className="w-16 text-right text-amber-300">{pos}</span>
        </label>
        <label className="flex items-center gap-3">
          <span className="w-36 text-stone-400">{W.lightSize}</span>
          <input type="range" min={0} max={1} step={0.05} value={size} onChange={(e) => setSize(+e.target.value)} className="flex-1 accent-amber-500" />
          <span className="w-16 text-right text-amber-300">{size < 0.5 ? W.lightHard : W.lightSoft}</span>
        </label>
      </div>
    </Card>
  );
};
