import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const CameraObscuraVisualizer: React.FC = () => {
  const { ui } = useLanguage();
  const O = ui.obscura;
  const [pinholeSize, setPinholeSize] = useState<number>(3); // 1 to 8mm
  const [showRays, setShowRays] = useState<boolean>(true);
  const [showInvertedColor, setShowInvertedColor] = useState<boolean>(true);

  // Sharpness decreases as pinhole gets larger; brightness increases
  const sharpnessBlur = (pinholeSize - 1) * 1.6;
  const insideBrightness = 0.4 + (pinholeSize / 8) * 0.8;

  return (
    <div className="keep-dark bg-stone-950/60 border border-stone-800 rounded-3xl p-5 md:p-8 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            {O.badge}
          </span>
          <h3 className="text-xl md:text-2xl font-display font-bold text-stone-100 mt-1">
            {O.title}
          </h3>
          <p className="text-sm text-stone-400">
            {O.desc}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRays(!showRays)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              showRays
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-stone-800 text-stone-400 border-stone-700'
            }`}
          >
            {showRays ? O.raysOn : O.raysOff}
          </button>
        </div>
      </div>

      {/* Interactive Ray Tracing Diagram */}
      <div className="mt-6 relative w-full aspect-[16/9] sm:aspect-[21/9] bg-stone-950 rounded-2xl overflow-hidden border border-stone-800 flex items-center justify-center p-2 sm:p-4">
        <svg
          viewBox="0 0 1000 450"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEFINITIONS */}
          <defs>
            <linearGradient id="outsideSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
            <linearGradient id="darkRoomGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
            <filter id="pinholeBlur">
              <feGaussianBlur stdDeviation={sharpnessBlur} />
            </filter>
          </defs>

          {/* LEFT: OUTSIDE WORLD (Bright Day) */}
          <rect x="0" y="0" width="480" height="450" fill="url(#outsideSky)" opacity="0.9" />

          {/* Outside Ground */}
          <rect x="0" y="320" width="480" height="130" fill="#15803d" />

          {/* Outside Sun */}
          <circle cx="90" cy="80" r="35" fill="#facc15" />
          <circle cx="90" cy="80" r="45" fill="#fde047" opacity="0.3" />

          {/* Outside Tree (Real World Subject) */}
          <g transform="translate(180, 140)">
            {/* Trunk */}
            <rect x="35" y="100" width="30" height="100" fill="#78350f" rx="3" />
            {/* Foliage */}
            <circle cx="50" cy="80" r="60" fill="#166534" />
            <circle cx="20" cy="50" r="40" fill="#15803d" />
            <circle cx="80" cy="50" r="40" fill="#22c55e" />
            <circle cx="50" cy="20" r="40" fill="#4ade80" />
            {/* Top Star Mark */}
            <circle cx="50" cy="0" r="6" fill="#ef4444" />
          </g>

          {/* Outside Text Label */}
          <text x="30" y="40" fill="#0f172a" fontSize="16" fontWeight="bold">
            {O.outside}
          </text>

          {/* THE DIVIDER WALL with Pinhole */}
          <rect x="480" y="0" width="40" height="450" fill="#27272a" stroke="#3f3f46" strokeWidth="2" />
          {/* Top wall section above pinhole */}
          <rect x="480" y="0" width="40" height={225 - pinholeSize * 3} fill="#09090b" />
          {/* Bottom wall section below pinhole */}
          <rect x="480" y={225 + pinholeSize * 3} width="40" height={225 - pinholeSize * 3} fill="#09090b" />

          {/* The Pinhole itself */}
          <rect
            x="480"
            y={225 - pinholeSize * 3}
            width="40"
            height={pinholeSize * 6}
            fill="#fef08a"
            opacity="0.85"
          />

          {/* Wall Label */}
          <text x="500" y="70" fill="#a1a1aa" fontSize="12" textAnchor="middle" transform="rotate(-90 500 70)">
            {O.wall}
          </text>

          {/* RIGHT: DARK ROOM (Camera Obscura) */}
          <rect x="520" y="0" width="480" height="450" fill="url(#darkRoomGrad)" />

          {/* Inside Projection Screen / Opposite Wall */}
          <rect x="940" y="20" width="30" height="410" fill="#27272a" rx="4" />

          {/* Inverted Image projected on the inside wall */}
          <g
            transform="translate(930, 225) scale(1, -1) translate(0, -225)"
            filter="url(#pinholeBlur)"
            opacity={insideBrightness}
          >
            {/* Projected upside-down tree */}
            <g transform="translate(850, 140)">
              <rect x="35" y="100" width="25" height="90" fill="#78350f" rx="3" />
              <circle cx="50" cy="80" r="50" fill="#166534" />
              <circle cx="20" cy="50" r="35" fill="#15803d" />
              <circle cx="80" cy="50" r="35" fill="#22c55e" />
              <circle cx="50" cy="20" r="35" fill="#4ade80" />
              <circle cx="50" cy="0" r="6" fill="#ef4444" />
            </g>
          </g>

          {/* LIGHT RAYS (Straight Lines Passing through Pinhole) */}
          {showRays && (
            <g opacity="0.8">
              {/* Ray 1: From Tree Top (Red Marker, y=140) through Pinhole (500, 225) to Inverted Bottom */}
              <line
                x1="230"
                y1="140"
                x2="500"
                y2="225"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeDasharray="6,4"
              />
              <line
                x1="500"
                y1="225"
                x2="940"
                y2="310"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeDasharray="6,4"
              />

              {/* Ray 2: From Tree Base (y=340) through Pinhole (500, 225) to Inverted Top */}
              <line
                x1="230"
                y1="340"
                x2="500"
                y2="225"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeDasharray="6,4"
              />
              <line
                x1="500"
                y1="225"
                x2="940"
                y2="140"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeDasharray="6,4"
              />

              {/* Ray 3: Sun beam */}
              <line
                x1="90"
                y1="80"
                x2="500"
                y2="225"
                stroke="#facc15"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                opacity="0.6"
              />
              <line
                x1="500"
                y1="225"
                x2="940"
                y2="370"
                stroke="#facc15"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                opacity="0.6"
              />
            </g>
          )}

          {/* Labels Inside */}
          <text x="600" y="50" fill="#f59e0b" fontSize="15" fontWeight="bold">
            {O.room}
          </text>
          <text x="600" y="75" fill="#a1a1aa" fontSize="12">
            {O.inverted}
          </text>
          <text x="830" y="380" fill="#ef4444" fontSize="12" fontWeight="bold">
            {O.treeTop}
          </text>
          <text x="830" y="130" fill="#22c55e" fontSize="12" fontWeight="bold">
            {O.treeRoot}
          </text>
        </svg>
      </div>

      {/* Interactive Controls & Educational Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-stone-200">
              {O.size(pinholeSize)}
            </span>
            <span className="text-xs text-amber-400 font-mono">
              {pinholeSize <= 2 ? O.sharp : pinholeSize <= 5 ? O.balance : O.blurry}
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="8"
            step="1"
            value={pinholeSize}
            onChange={(e) => setPinholeSize(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            aria-label={O.aria}
          />

          <div className="flex justify-between text-[11px] text-stone-500 mt-2 font-mono">
            {O.ends.map((e) => (
              <span key={e}>{e}</span>
            ))}
          </div>
        </div>

        <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-stone-300 leading-relaxed">
            <p className="font-semibold text-stone-100 mb-1">
              {O.dilemmaTitle}
            </p>
            {O.dilemma}
          </div>
        </div>
      </div>
    </div>
  );
};
