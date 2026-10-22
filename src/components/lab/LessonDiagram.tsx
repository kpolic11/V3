import React from 'react';

/**
 * Small hand-drawn SVG schematics for every Lab lesson.
 * All share a 400×220 canvas; labels come from the lesson text (diagramLabels)
 * so they are translated with the rest of the lesson.
 */

const BG = '#0c0a09';
const FRAME = '#44403c';
const AMBER = '#f59e0b';
const CYAN = '#22d3ee';
const EMERALD = '#34d399';
const STONE = '#a8a29e';
const TEXT = '#e7e5e4';

const Frame: React.FC<{ x?: number; y?: number; w?: number; h?: number; children?: React.ReactNode }> = ({ x = 60, y = 20, w = 280, h = 180, children }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="6" fill="#1c1917" stroke={FRAME} strokeWidth="2" />
    {children}
  </g>
);

const Person: React.FC<{ x: number; y: number; s?: number; color?: string; flip?: boolean }> = ({ x, y, s = 1, color = AMBER, flip = false }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <circle cx="0" cy="-34" r="7" fill={color} />
    <path d="M0 -26 L0 0 M0 -18 L-9 -6 M0 -18 L9 -8 M0 0 L-7 16 M0 0 L7 16" stroke={color} strokeWidth="3.2" strokeLinecap="round" fill="none" />
    {/* nose shows the looking direction */}
    <path d="M7 -35 L11 -33 L7 -31" fill={color} />
  </g>
);

const Tree: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 1, color = EMERALD }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-3" y="-10" width="6" height="22" fill="#78350f" />
    <circle cx="0" cy="-22" r="16" fill={color} />
  </g>
);

/** Splits a label into lines of at most `max` characters (word-aware). */
function wrapText(children: React.ReactNode, max: number): string[] {
  const parts = Array.isArray(children) ? children : [children];
  const text = parts.map((p) => (p === null || p === undefined || p === false ? '' : String(p))).join('');
  if (text.length <= max) return [text];
  const lines: string[] = [];
  let cur = '';
  for (const word of text.split(' ')) {
    if (cur && (cur + ' ' + word).length > max) {
      lines.push(cur);
      cur = word;
    } else cur = cur ? cur + ' ' + word : word;
  }
  if (cur) lines.push(cur);
  return lines;
}

const Label: React.FC<{ x: number; y: number; children: React.ReactNode; anchor?: 'start' | 'middle' | 'end'; color?: string; size?: number; wrap?: number }> = ({
  x,
  y,
  children,
  anchor = 'middle',
  color = TEXT,
  size = 11,
  wrap = 30,
}) => {
  const lines = wrapText(children, wrap);
  return (
    <text x={x} y={y} textAnchor={anchor} fill={color} fontSize={size} fontFamily="Plus Jakarta Sans, system-ui, sans-serif">
      {lines.map((l, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : size * 1.2}>
          {l}
        </tspan>
      ))}
    </text>
  );
};

const thirds = (x: number, y: number, w: number, h: number, color = CYAN) => (
  <g stroke={color} strokeWidth="1" opacity="0.6">
    <line x1={x + w / 3} y1={y} x2={x + w / 3} y2={y + h} />
    <line x1={x + (2 * w) / 3} y1={y} x2={x + (2 * w) / 3} y2={y + h} />
    <line x1={x} y1={y + h / 3} x2={x + w} y2={y + h / 3} />
    <line x1={x} y1={y + (2 * h) / 3} x2={x + w} y2={y + (2 * h) / 3} />
  </g>
);

export const LessonDiagram: React.FC<{ id: string; labels?: string[] }> = ({ id, labels = [] }) => {
  const L = (i: number) => labels[i] ?? '';
  let body: React.ReactNode = null;

  switch (id) {
    case 'exp-what':
      body = (
        <g>
          {/* tap */}
          <rect x="150" y="20" width="70" height="16" rx="4" fill={STONE} />
          <rect x="200" y="36" width="14" height="22" fill={STONE} />
          <circle cx="160" cy="28" r="9" fill={AMBER} />
          {/* water */}
          <rect x="203" y="58" width="8" height="70" fill={CYAN} opacity="0.7" />
          {/* bucket */}
          <path d="M165 130 L250 130 L240 200 L175 200 Z" fill="#292524" stroke={STONE} strokeWidth="2" />
          <path d="M170 160 L245 160 L240 200 L175 200 Z" fill={CYAN} opacity="0.6" />
          {/* clock */}
          <circle cx="300" cy="80" r="22" fill="none" stroke={AMBER} strokeWidth="2.5" />
          <path d="M300 80 L300 64 M300 80 L312 86" stroke={AMBER} strokeWidth="2.5" strokeLinecap="round" />
          <Label x={20} y={13} anchor="start" color={AMBER}>{L(0)}</Label>
          <Label x={395} y={118} anchor="end" color={AMBER} wrap={20}>{L(1)}</Label>
          <Label x={8} y={150} anchor="start" color={CYAN} wrap={18}>{L(2)}</Label>
          <Label x={207} y={216} color={EMERALD} wrap={60}>{L(3)}</Label>
        </g>
      );
      break;

    case 'exp-aperture': {
      const stops = [1.4, 2.8, 5.6, 11, 22];
      body = (
        <g>
          {stops.map((f, i) => {
            const r = 34 / Math.pow(Math.SQRT2, i * 2) + 4;
            const cx = 50 + i * 75;
            return (
              <g key={f}>
                <circle cx={cx} cy={70} r={38} fill="#1c1917" stroke={FRAME} strokeWidth="2" />
                <circle cx={cx} cy={70} r={r} fill={AMBER} opacity="0.85" />
                <Label x={cx} y={128} color={TEXT} size={12}>f/{f}</Label>
              </g>
            );
          })}
          <line x1="40" y1="150" x2="360" y2="150" stroke={STONE} strokeWidth="1.5" markerEnd="url(#arr)" />
          <Label x={50} y={166} anchor="start" color={AMBER}>{L(0)}</Label>
          <Label x={50} y={182} anchor="start" color={AMBER}>{L(2)}</Label>
          <Label x={350} y={166} anchor="end" color={CYAN}>{L(1)}</Label>
          <Label x={350} y={182} anchor="end" color={CYAN}>{L(3)}</Label>
          {/* depth-of-field bands */}
          <rect x="60" y="186" width="40" height="10" rx="3" fill={AMBER} opacity="0.8" />
          <rect x="240" y="186" width="120" height="10" rx="3" fill={CYAN} opacity="0.8" />
        </g>
      );
      break;
    }

    case 'exp-shutter':
      body = (
        <g>
          <Frame x={20} y={30} w={170} h={150}>
            <circle cx="105" cy="105" r="14" fill={AMBER} />
            <path d="M80 140 Q105 120 130 140" stroke={CYAN} strokeWidth="3" fill="none" />
          </Frame>
          <Frame x={210} y={30} w={170} h={150}>
            {[0, 8, 16, 24, 32].map((d, i) => (
              <circle key={d} cx={255 + d * 2} cy={105} r="14" fill={AMBER} opacity={0.18 + i * 0.16} />
            ))}
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M230 ${140 + i * 8} Q295 ${120 + i * 8} 360 ${140 + i * 8}`} stroke={CYAN} strokeWidth="2" fill="none" opacity="0.5" />
            ))}
          </Frame>
          <Label x={105} y={204} color={AMBER}>{L(0)} · 1/1000 s</Label>
          <Label x={295} y={204} color={CYAN}>{L(1)} · 1/8 s</Label>
        </g>
      );
      break;

    case 'exp-iso': {
      const dots = (x0: number, n: number, seed: number) =>
        Array.from({ length: n }, (_, i) => {
          const a = Math.sin(i * 12.9898 + seed) * 43758.5453;
          const b = Math.sin(i * 78.233 + seed) * 12345.678;
          return <circle key={i} cx={x0 + (a - Math.floor(a)) * 160} cy={40 + (b - Math.floor(b)) * 130} r={1.2} fill={i % 3 ? '#fff' : '#f472b6'} opacity="0.75" />;
        });
      body = (
        <g>
          <Frame x={20} y={30} w={170} h={150}>
            <rect x="20" y="30" width="170" height="150" rx="6" fill="url(#gradSky)" />
            {dots(25, 12, 1)}
          </Frame>
          <Frame x={210} y={30} w={170} h={150}>
            <rect x="210" y="30" width="170" height="150" rx="6" fill="url(#gradSky)" />
            {dots(215, 380, 7)}
          </Frame>
          <Label x={105} y={204} color={EMERALD}>{L(0)} · ISO 100</Label>
          <Label x={295} y={204} color="#f472b6">{L(1)} · ISO 6400</Label>
        </g>
      );
      break;
    }

    case 'exp-light': {
      const sphere = (cx: number, lx: number, ly: number, soft: boolean, idx: number) => (
        <g key={idx}>
          <defs>
            <radialGradient id={`lg${idx}`} cx={lx} cy={ly} r={soft ? 0.95 : 0.6}>
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset={soft ? '70%' : '45%'} stopColor="#a16207" />
              <stop offset="100%" stopColor="#1c1917" />
            </radialGradient>
          </defs>
          <circle cx={cx} cy={90} r={38} fill={`url(#lg${idx})`} />
        </g>
      );
      body = (
        <g>
          {sphere(70, 0.5, 0.45, true, 0)}
          {sphere(200, 0.1, 0.45, false, 1)}
          <circle cx={330} cy={90} r={38} fill="#0c0a09" stroke="#fde68a" strokeWidth="3" />
          <Label x={70} y={150}>{L(0)}</Label>
          <Label x={200} y={150}>{L(1)}</Label>
          <Label x={330} y={150}>{L(2)}</Label>
          <rect x="60" y="170" width="40" height="40" rx="4" fill="none" stroke={STONE} />
          <circle cx="80" cy="190" r="5" fill="#fde68a" />
          <Label x={130} y={195} anchor="start" color={STONE}>{L(3)}</Label>
          <rect x="220" y="170" width="40" height="40" rx="4" fill="#fde68a" opacity="0.35" stroke={STONE} />
          <Label x={290} y={195} anchor="start" color={STONE}>{L(4)}</Label>
        </g>
      );
      break;
    }

    case 'exp-rules': {
      const rows = [
        ['☀️', 'f/16'],
        ['🌤️', 'f/11'],
        ['☁️', 'f/8'],
        ['🌥️', 'f/5.6'],
        ['🌆', 'f/4'],
      ];
      body = (
        <g>
          {rows.map(([icon, f], i) => (
            <g key={f}>
              <rect x="40" y={14 + i * 40} width="320" height="34" rx="8" fill={i === 0 ? '#451a03' : '#1c1917'} stroke={FRAME} />
              <text x="60" y={37 + i * 40} fontSize="18">{icon}</text>
              <Label x={92} y={36 + i * 40} anchor="start">{L(i)}</Label>
              <Label x={340} y={36 + i * 40} anchor="end" color={AMBER} size={14}>{f} · 1/ISO</Label>
            </g>
          ))}
        </g>
      );
      break;
    }

    /* ---------------- composition ---------------- */
    case 'comp-thirds':
      body = (
        <Frame>
          {thirds(60, 20, 280, 180)}
          <line x1="60" y1="140" x2="340" y2="140" stroke={STONE} strokeWidth="2" />
          <Tree x={153} y={128} />
          {[0, 1].map((i) => [0, 1].map((j) => <circle key={`${i}${j}`} cx={60 + (280 * (i + 1)) / 3} cy={20 + (180 * (j + 1)) / 3} r="4" fill={CYAN} />))}
        </Frame>
      );
      break;

    case 'comp-golden':
      body = (
        <Frame x={50} y={20} w={300} h={185}>
          <g stroke={AMBER} strokeWidth="1" opacity="0.55">
            <line x1={50 + 300 * 0.382} y1="20" x2={50 + 300 * 0.382} y2="205" />
            <line x1={50 + 300 * 0.618} y1="20" x2={50 + 300 * 0.618} y2="205" />
            <line x1="50" y1={20 + 185 * 0.382} x2="350" y2={20 + 185 * 0.382} />
            <line x1="50" y1={20 + 185 * 0.618} x2="350" y2={20 + 185 * 0.618} />
          </g>
          <path
            d="M50 205 A185 185 0 0 1 235 20 A115 115 0 0 1 350 135 A70 70 0 0 1 280 205 A45 45 0 0 1 235 160 A25 25 0 0 1 260 135"
            fill="none"
            stroke={AMBER}
            strokeWidth="2.5"
          />
          <circle cx="258" cy="150" r="5" fill={AMBER} />
        </Frame>
      );
      break;

    case 'comp-lines':
      body = (
        <Frame>
          <path d="M60 200 L190 80 L210 80 L340 200 Z" fill="#292524" />
          <path d="M200 200 L200 180 M200 165 L200 150 M200 138 L200 128 M200 118 L200 112 M200 104 L200 100" stroke={AMBER} strokeWidth="3" />
          <line x1="60" y1="200" x2="200" y2="80" stroke={EMERALD} strokeWidth="2" strokeDasharray="5 4" />
          <line x1="340" y1="200" x2="200" y2="80" stroke={EMERALD} strokeWidth="2" strokeDasharray="5 4" />
          <Person x={200} y={84} s={0.55} />
        </Frame>
      );
      break;

    case 'comp-symmetry':
      body = (
        <Frame>
          <line x1="200" y1="20" x2="200" y2="200" stroke={CYAN} strokeDasharray="4 4" opacity="0.6" />
          <path d="M120 110 L200 50 L280 110 Z" fill="#57534e" />
          <rect x="130" y="110" width="140" height="10" fill="#57534e" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={140 + i * 36} y="70" width="14" height="40" fill="#78716c" />
          ))}
          <rect x="60" y="120" width="280" height="80" fill="#0e7490" opacity="0.35" />
          <path d="M120 130 L200 190 L280 130 Z" fill="#57534e" opacity="0.4" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={140 + i * 36} y="130" width="14" height="40" fill="#78716c" opacity="0.35" />
          ))}
        </Frame>
      );
      break;

    case 'comp-framing':
      body = (
        <Frame>
          <rect x="60" y="20" width="280" height="180" fill="#0c0a09" />
          <path d="M120 200 L120 90 Q200 20 280 90 L280 200 Z" fill="#fde68a" opacity="0.85" />
          <line x1="120" y1="160" x2="280" y2="160" stroke="#a16207" strokeWidth="2" />
          <Tree x={170} y={150} s={0.8} color="#15803d" />
          <Person x={230} y={158} s={0.75} color="#1c1917" />
        </Frame>
      );
      break;

    case 'comp-negative':
      body = (
        <Frame>
          <rect x="60" y="20" width="280" height="180" fill="#1e3a5f" opacity="0.6" />
          <line x1="60" y1="165" x2="340" y2="165" stroke="#93c5fd" strokeWidth="1.5" opacity="0.6" />
          <path d="M282 160 L312 160 L306 168 L288 168 Z" fill={AMBER} />
          <line x1="297" y1="160" x2="297" y2="138" stroke={AMBER} strokeWidth="2" />
          <path d="M297 140 L310 156 L297 156 Z" fill="#fef3c7" />
        </Frame>
      );
      break;

    case 'comp-fill':
      body = (
        <g>
          <Frame x={20} y={30} w={170} h={150}>
            <circle cx="105" cy="105" r="10" fill={AMBER} />
            <circle cx="40" cy="50" r="6" fill={STONE} />
            <rect x="150" y="140" width="25" height="25" fill={STONE} />
            <path d="M30 170 L80 150" stroke={STONE} strokeWidth="3" />
          </Frame>
          <Frame x={210} y={30} w={170} h={150}>
            <circle cx="295" cy="105" r="66" fill={AMBER} />
            <circle cx="275" cy="92" r="7" fill="#1c1917" />
            <circle cx="315" cy="92" r="7" fill="#1c1917" />
            <path d="M270 125 Q295 145 320 125" stroke="#1c1917" strokeWidth="4" fill="none" />
          </Frame>
          <Label x={195} y={210} color={STONE}>→</Label>
        </g>
      );
      break;

    case 'comp-diagonals':
      body = (
        <Frame>
          {Array.from({ length: 7 }).map((_, i) => (
            <rect key={i} x={70 + i * 36} y={170 - i * 22} width="40" height="10" fill="#78716c" />
          ))}
          <line x1="60" y1="200" x2="340" y2="20" stroke="#e879f9" strokeWidth="2" strokeDasharray="6 4" />
          <path d="M150 190 L190 120 L230 190 Z" fill="none" stroke={AMBER} strokeWidth="1.5" opacity="0.6" />
        </Frame>
      );
      break;

    case 'comp-odds':
      body = (
        <g>
          <Frame x={20} y={30} w={170} h={150}>
            <circle cx="75" cy="110" r="22" fill="#dc2626" />
            <circle cx="135" cy="110" r="22" fill="#dc2626" />
          </Frame>
          <Frame x={210} y={30} w={170} h={150}>
            <circle cx="260" cy="120" r="22" fill="#dc2626" />
            <circle cx="330" cy="120" r="22" fill="#dc2626" />
            <circle cx="295" cy="80" r="22" fill="#f59e0b" />
          </Frame>
          <Label x={105} y={204} color={STONE}>2</Label>
          <Label x={295} y={204} color={EMERALD}>3 ✓</Label>
        </g>
      );
      break;

    case 'comp-layers':
      body = (
        <Frame>
          <path d="M60 110 L130 60 L190 100 L260 50 L340 105 L340 200 L60 200 Z" fill="#44403c" />
          <path d="M60 150 Q200 120 340 150 L340 200 L60 200 Z" fill="#166534" />
          <Tree x={220} y={150} s={0.7} />
          <circle cx="95" cy="190" r="26" fill="#78716c" />
          <circle cx="130" cy="196" r="14" fill="#a8a29e" />
          <Label x={330} y={45} anchor="end" color={STONE} size={10}>3</Label>
          <Label x={250} y={128} anchor="start" color={STONE} size={10}>2</Label>
          <Label x={160} y={186} anchor="start" color={STONE} size={10}>1</Label>
        </Frame>
      );
      break;

    case 'comp-viewpoint':
      body = (
        <g>
          <line x1="40" y1="190" x2="360" y2="190" stroke={STONE} strokeWidth="2" />
          <Tree x={250} y={178} s={1.6} />
          {/* three cameras */}
          {[
            [90, 40, L(0)],
            [90, 120, L(1)],
            [90, 182, L(2)],
          ].map(([x, y, t], i) => (
            <g key={i}>
              <rect x={(x as number) - 14} y={(y as number) - 9} width="28" height="18" rx="3" fill={AMBER} />
              <circle cx={(x as number) + 10} cy={y as number} r="5" fill="#1c1917" />
              <line x1={(x as number) + 14} y1={y as number} x2="225" y2={i === 0 ? 150 : i === 1 ? 140 : 120} stroke={AMBER} strokeDasharray="4 4" opacity="0.6" />
              <Label x={(x as number) - 20} y={(y as number) + 4} anchor="end" color={TEXT} size={10} wrap={12}>
                {t}
              </Label>
            </g>
          ))}
        </g>
      );
      break;

    case 'comp-horizon':
      body = (
        <g>
          <Frame x={20} y={30} w={170} h={150}>
            <rect x="20" y="30" width="170" height="100" fill="#7c2d12" opacity="0.5" />
            <line x1="20" y1="130" x2="190" y2="130" stroke={AMBER} strokeWidth="2" />
            <circle cx="140" cy="115" r="14" fill="#fbbf24" />
          </Frame>
          <Frame x={210} y={30} w={170} h={150}>
            <line x1="210" y1="96" x2="380" y2="116" stroke="#ef4444" strokeWidth="2" />
          </Frame>
          <Label x={105} y={204} color={EMERALD}>✓</Label>
          <Label x={295} y={204} color="#ef4444">✗</Label>
        </g>
      );
      break;

    case 'comp-leadroom':
      body = (
        <Frame>
          <Person x={120} y={150} s={1.6} />
          <rect x="140" y="40" width="190" height="150" rx="6" fill={EMERALD} opacity="0.12" stroke={EMERALD} strokeDasharray="5 4" />
          <Label x={235} y={120} color={EMERALD}>{L(0)} →</Label>
        </Frame>
      );
      break;

    case 'comp-contrast':
      body = (
        <Frame>
          <rect x="60" y="20" width="280" height="180" fill="#0c0a09" />
          <path d="M170 20 L230 20 L250 200 L150 200 Z" fill="#fde68a" opacity="0.25" />
          <Person x={200} y={175} s={1.5} color="#fde68a" />
        </Frame>
      );
      break;

    case 'comp-patterns':
      body = (
        <Frame>
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 9 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={74 + c * 29} y={32 + r * 33} width="22" height="24" rx="3" fill={r === 2 && c === 6 ? '#dc2626' : '#57534e'} />
            ))
          )}
        </Frame>
      );
      break;

    case 'comp-balance':
      body = (
        <g>
          <Frame>
            <Tree x={110} y={180} s={3} color="#14532d" />
            <Person x={300} y={176} s={0.9} />
          </Frame>
          <path d="M150 214 L250 214" stroke={STONE} strokeWidth="2" />
          <path d="M200 214 L192 206 L208 206 Z" fill={STONE} />
        </g>
      );
      break;

    case 'comp-simplicity':
      body = (
        <g>
          <Frame x={20} y={30} w={170} h={150}>
            <Person x={105} y={150} s={1} />
            <rect x="96" y="60" width="4" height="70" fill={STONE} />
            <rect x="80" y="50" width="36" height="16" fill="#ef4444" />
            <rect x="30" y="150" width="20" height="25" fill={STONE} />
            <circle cx="170" cy="60" r="10" fill={STONE} />
          </Frame>
          <Frame x={210} y={30} w={170} h={150}>
            <Person x={295} y={150} s={1.4} />
          </Frame>
          <Label x={105} y={204} color="#ef4444">✗</Label>
          <Label x={295} y={204} color={EMERALD}>✓</Label>
        </g>
      );
      break;

    case 'comp-break':
      body = (
        <Frame>
          {thirds(60, 20, 280, 180, '#57534e')}
          <circle cx="200" cy="110" r="40" fill="none" stroke={AMBER} strokeWidth="3" />
          <circle cx="200" cy="110" r="6" fill={AMBER} />
          <path d="M60 200 L340 160" stroke={AMBER} strokeWidth="2" opacity="0.6" />
        </Frame>
      );
      break;

    default:
      return null;
  }

  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto rounded-xl" style={{ background: BG }} role="img">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={STONE} />
        </marker>
        <linearGradient id="gradSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0c0a09" />
        </linearGradient>
      </defs>
      {body}
    </svg>
  );
};

/** Lessons that have a diagram (others show their interactive widget instead) */
export const HAS_DIAGRAM = new Set([
  'exp-what',
  'exp-aperture',
  'exp-shutter',
  'exp-iso',
  'exp-light',
  'exp-rules',
  'comp-thirds',
  'comp-golden',
  'comp-lines',
  'comp-symmetry',
  'comp-framing',
  'comp-negative',
  'comp-fill',
  'comp-diagonals',
  'comp-odds',
  'comp-layers',
  'comp-viewpoint',
  'comp-horizon',
  'comp-leadroom',
  'comp-contrast',
  'comp-patterns',
  'comp-balance',
  'comp-simplicity',
  'comp-break',
]);
