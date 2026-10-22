import React, { useState } from 'react';
import { Grid3X3, Compass, Move, Sparkles, Columns2, Slash, Hash } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type Overlay = 'thirds' | 'phi' | 'spiral' | 'diagonals' | 'lines' | 'symmetry' | 'none';

interface CompositionScenario {
  id: string;
  imageUrl: string;
  recommendedRule: Overlay;
  idealPoints: { x: number; y: number }[];
}

const SCENARIOS: CompositionScenario[] = [
  {
    id: 'street',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    recommendedRule: 'thirds',
    idealPoints: [{ x: 66.6, y: 33.3 }],
  },
  {
    id: 'landscape',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    recommendedRule: 'lines',
    idealPoints: [{ x: 60, y: 48 }],
  },
  {
    id: 'architecture',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    recommendedRule: 'spiral',
    idealPoints: [{ x: 61.8, y: 38.2 }],
  },
  {
    id: 'portrait',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    recommendedRule: 'thirds',
    idealPoints: [{ x: 33.3, y: 33.3 }],
  },
];

const OVERLAYS: { id: Overlay; icon: React.FC<{ className?: string }>; active: string }[] = [
  { id: 'thirds', icon: Grid3X3, active: 'bg-cyan-500 text-stone-950' },
  { id: 'phi', icon: Hash, active: 'bg-amber-500 text-stone-950' },
  { id: 'spiral', icon: Compass, active: 'bg-amber-500 text-stone-950' },
  { id: 'diagonals', icon: Slash, active: 'bg-fuchsia-500 text-stone-950' },
  { id: 'lines', icon: Move, active: 'bg-emerald-500 text-stone-950' },
  { id: 'symmetry', icon: Columns2, active: 'bg-sky-400 text-stone-950' },
  { id: 'none', icon: Sparkles, active: 'bg-stone-200 text-stone-900' },
];

/** Power points for each grid, in % of width/height */
const POWER_POINTS: Record<string, { x: number; y: number }[]> = {
  thirds: [
    { x: 33.33, y: 33.33 },
    { x: 66.67, y: 33.33 },
    { x: 33.33, y: 66.67 },
    { x: 66.67, y: 66.67 },
  ],
  phi: [
    { x: 38.2, y: 38.2 },
    { x: 61.8, y: 38.2 },
    { x: 38.2, y: 61.8 },
    { x: 61.8, y: 61.8 },
  ],
};

export const CompositionTool: React.FC = () => {
  const { ui } = useLanguage();
  const C = ui.comp;
  const [selectedScenario, setSelectedScenario] = useState<CompositionScenario>(SCENARIOS[0]);
  const [activeOverlay, setActiveOverlay] = useState<Overlay>('thirds');
  const [userPoint, setUserPoint] = useState<{ x: number; y: number } | null>({ x: 66.6, y: 33.3 });

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setUserPoint({ x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) });
  };

  const near = (pts: { x: number; y: number }[]) =>
    !!userPoint && pts.some((s) => Math.hypot(s.x - userPoint.x, s.y - userPoint.y) < 10);

  const isCentered = !!userPoint && Math.hypot(userPoint.x - 50, userPoint.y - 50) < 7;
  const isGood = near([...POWER_POINTS.thirds, ...POWER_POINTS.phi]);

  const gridLines = (pos: number[], color: string) => (
    <>
      {pos.map((p) => (
        <div key={`h${p}`} className="absolute inset-x-0 h-px" style={{ top: `${p}%`, background: color, boxShadow: `0 0 8px ${color}` }} />
      ))}
      {pos.map((p) => (
        <div key={`v${p}`} className="absolute inset-y-0 w-px" style={{ left: `${p}%`, background: color, boxShadow: `0 0 8px ${color}` }} />
      ))}
    </>
  );

  return (
    <div className="keep-dark bg-stone-900 border border-stone-800 rounded-3xl p-5 md:p-8 shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            {C.badge}
          </span>
          <h3 className="text-xl md:text-2xl font-display font-bold text-stone-100 mt-1">{C.title}</h3>
          <p className="text-sm text-stone-400">{C.desc}</p>
        </div>

        <div className="flex flex-wrap gap-1.5 lg:max-w-md lg:justify-end">
          {OVERLAYS.map(({ id, icon: Icon, active }) => (
            <button
              key={id}
              onClick={() => setActiveOverlay(id)}
              aria-pressed={activeOverlay === id}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeOverlay === id ? `${active} shadow-lg font-bold` : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {C.overlays[id]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {SCENARIOS.map((sc) => (
          <button
            key={sc.id}
            onClick={() => {
              setSelectedScenario(sc);
              setUserPoint(sc.idealPoints[0]);
              setActiveOverlay(sc.recommendedRule);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              selectedScenario.id === sc.id
                ? 'bg-stone-800 border-amber-500/60 text-amber-300 font-semibold shadow'
                : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            {C.scenarios[sc.id][0]}
          </button>
        ))}
      </div>

      <div
        className="mt-5 relative w-full aspect-[16/10] bg-black rounded-2xl overflow-hidden border-2 border-stone-700 shadow-2xl cursor-crosshair"
        onClick={handleImageClick}
      >
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${selectedScenario.imageUrl}')` }} />

        <div className="absolute inset-0 pointer-events-none">
          {activeOverlay === 'thirds' && gridLines([33.33, 66.67], 'rgba(34,211,238,0.6)')}
          {activeOverlay === 'phi' && gridLines([38.2, 61.8], 'rgba(245,158,11,0.65)')}
          {(activeOverlay === 'thirds' || activeOverlay === 'phi') &&
            POWER_POINTS[activeOverlay].map((pt, i) => (
              <div key={i} className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" style={{ left: `${pt.x}%`, top: `${pt.y}%` }}>
                <div className={`w-4 h-4 rounded-full border-2 animate-ping ${activeOverlay === 'thirds' ? 'border-cyan-400 bg-cyan-500/30' : 'border-amber-400 bg-amber-500/30'}`} />
                <div className={`absolute w-2 h-2 rounded-full ${activeOverlay === 'thirds' ? 'bg-cyan-300' : 'bg-amber-300'}`} />
              </div>
            ))}
        </div>

        {activeOverlay === 'spiral' && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 62.5" preserveAspectRatio="none">
            <path d="M 0,62.5 A 61.8,61.8 0 0 1 61.8,0.7" fill="none" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="2,1" />
            <path d="M 61.8,0.7 A 38.2,38.2 0 0 1 100,38.9" fill="none" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="2,1" />
            <path d="M 100,38.9 A 23.6,23.6 0 0 1 76.4,62.5" fill="none" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="2,1" />
            <path d="M 76.4,62.5 A 14.6,14.6 0 0 1 61.8,47.9" fill="none" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="2,1" />
            <path d="M 61.8,47.9 A 9,9 0 0 1 70.8,38.9" fill="none" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="2,1" />
            <rect x="61.8" y="0" width="38.2" height="62.5" fill="none" stroke="#f59e0b" strokeWidth="0.25" opacity="0.5" />
            <rect x="61.8" y="38.9" width="38.2" height="23.6" fill="none" stroke="#f59e0b" strokeWidth="0.25" opacity="0.5" />
          </svg>
        )}

        {activeOverlay === 'diagonals' && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 62.5" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100" y2="62.5" stroke="#e879f9" strokeWidth="0.5" strokeDasharray="2,1" />
            <line x1="100" y1="0" x2="0" y2="62.5" stroke="#e879f9" strokeWidth="0.5" strokeDasharray="2,1" />
            {/* Baroque/sinister reciprocals: perpendiculars from the other corners */}
            <line x1="0" y1="62.5" x2="28" y2="17.5" stroke="#e879f9" strokeWidth="0.35" opacity="0.7" />
            <line x1="100" y1="0" x2="72" y2="45" stroke="#e879f9" strokeWidth="0.35" opacity="0.7" />
          </svg>
        )}

        {activeOverlay === 'lines' && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 62.5" preserveAspectRatio="none">
            <line x1="0" y1="62.5" x2="60" y2="30" stroke="#10b981" strokeWidth="0.8" strokeDasharray="2,1" />
            <line x1="100" y1="62.5" x2="60" y2="30" stroke="#10b981" strokeWidth="0.8" strokeDasharray="2,1" />
            <circle cx="60" cy="30" r="3" fill="none" stroke="#10b981" strokeWidth="0.8" />
          </svg>
        )}

        {activeOverlay === 'symmetry' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-y-0 left-1/2 w-px bg-sky-300/80" />
            <div className="absolute inset-x-0 top-1/2 h-px bg-sky-300/80" />
            <div className="absolute left-1/2 top-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/80" />
          </div>
        )}

        {userPoint && (
          <div className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center" style={{ left: `${userPoint.x}%`, top: `${userPoint.y}%` }}>
            <div className="w-8 h-8 rounded-full border-2 border-amber-400 bg-amber-500/20 flex items-center justify-center shadow-lg">
              <div className="w-2 h-2 rounded-full bg-amber-300" />
            </div>
            <span className="text-[10px] font-mono font-bold bg-stone-950/80 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/40 mt-1">
              {C.subject} ({userPoint.x}%, {userPoint.y}%)
            </span>
          </div>
        )}

        <div className="absolute bottom-3 left-3 bg-stone-950/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs text-stone-300 border border-stone-800 pointer-events-none">
          {C.hint}
        </div>
      </div>

      <div className="mt-4 p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-stone-300 leading-relaxed">
          <p className="font-semibold text-stone-100 text-sm mb-1">{C.scenarios[selectedScenario.id][1]}</p>
          {userPoint && (
            <p className="mt-1">
              {isCentered ? (
                <span className="text-sky-300 font-semibold">{C.centered}</span>
              ) : isGood ? (
                <span className="text-emerald-400 font-semibold">{C.good}</span>
              ) : (
                <span className="text-stone-400">{C.tryAgain}</span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
