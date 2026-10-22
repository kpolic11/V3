import React, { useEffect, useMemo, useState } from 'react';
import { FlaskConical, Sun, Grid3X3, CheckCircle2, Circle, ChevronLeft, ChevronRight, Lightbulb, Target } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Lesson, LessonModule } from '../data/types';
import { LessonDiagram, HAS_DIAGRAM } from './lab/LessonDiagram';
import { StopsWidget, EquivalentWidget, HistogramWidget, MeteringWidget, WhiteBalanceWidget, ModesWidget, DofWidget, FocalWidget, LightDirWidget } from './lab/LabWidgets';
import { QuizReview } from './QuizReview';

const STORE = 'lumina.lab.learned';

function readLearned(): Record<string, boolean> {
  try {
    const raw = window.localStorage.getItem(STORE);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

const WIDGETS: Record<NonNullable<Lesson['widget']>, React.FC<{ lessonId?: string }>> = {
  dof: DofWidget,
  focal: FocalWidget,
  lightdir: LightDirWidget,
  stops: StopsWidget,
  equivalent: EquivalentWidget,
  histogram: HistogramWidget,
  metering: MeteringWidget,
  whitebalance: WhiteBalanceWidget,
  modes: ModesWidget,
};

interface LearningLabProps {
  onOpenSimulator?: () => void;
  onOpenComposition?: () => void;
}

export const LearningLab: React.FC<LearningLabProps> = ({ onOpenSimulator, onOpenComposition }) => {
  const { ui, content } = useLanguage();
  const L = ui.lab;
  const [track, setTrack] = useState<LessonModule>('light');
  const [learned, setLearned] = useState<Record<string, boolean>>(() => readLearned());
  const lessons = useMemo(() => content.lessons.filter((l) => l.module === track), [content.lessons, track]);
  const [idx, setIdx] = useState(0);

  useEffect(() => setIdx(0), [track]);
  useEffect(() => {
    try {
      window.localStorage.setItem(STORE, JSON.stringify(learned));
    } catch {
      /* ignore */
    }
  }, [learned]);

  const lesson = lessons[Math.min(idx, lessons.length - 1)];
  if (!lesson) return null;
  const Widget = lesson.widget ? WIDGETS[lesson.widget] : null;
  const doneCount = lessons.filter((l) => learned[l.id]).length;

  const go = (i: number) => {
    setIdx(i);
    document.getElementById('lab-lesson')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 md:p-8 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-stone-800">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <FlaskConical className="w-3.5 h-3.5" />
            {L.badge}
          </span>
          <h3 className="text-xl md:text-3xl font-display font-bold text-stone-100 mt-2">{L.title}</h3>
          <p className="text-sm text-stone-400 mt-1 leading-relaxed">{L.desc}</p>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {([1, 2, 3] as const).map((lv) => (
          <div key={lv} className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 w-28 shrink-0">
              {ui.school.level(lv)} · {ui.school.levels[lv]}
            </span>
            {content.modules
              .filter((m) => m.level === lv)
              .map((m) => (
                <button
                  key={m.id}
                  onClick={() => setTrack(m.id)}
                  aria-pressed={track === m.id}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    track === m.id ? 'bg-amber-500 text-stone-950 border-amber-500' : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-600'
                  }`}
                >
                  {m.title} <span className="opacity-60 font-normal">· {m.lessons.length}</span>
                </button>
              ))}
          </div>
        ))}
        <p className="text-sm text-stone-400 font-serif-reading">{content.modules.find((m) => m.id === track)?.desc}</p>
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* Lesson list */}
        <aside className="min-w-0">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
            <span>{L.learned(doneCount, lessons.length)}</span>
          </div>
          <div className="h-1.5 rounded-full bg-stone-800 overflow-hidden mb-3">
            <div className="h-full bg-amber-500 transition-all" style={{ width: `${(doneCount / lessons.length) * 100}%` }} />
          </div>
          <ol className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:max-h-[640px] lg:overflow-y-auto pr-1">
            {lessons.map((l, i) => (
              <li key={l.id} className="shrink-0 lg:shrink">
                <button
                  onClick={() => go(i)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 border transition-colors whitespace-nowrap lg:whitespace-normal ${
                    i === idx ? 'bg-stone-950 border-amber-500/60 text-stone-100' : 'bg-stone-950/40 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {learned[l.id] ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <Circle className="w-4 h-4 text-stone-600 shrink-0" />}
                  <span className="font-mono text-stone-500">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-medium">{l.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </aside>

        {/* Lesson */}
        <article id="lab-lesson" className="scroll-mt-28 min-w-0">
          <p className="text-xs font-mono text-amber-400">{L.lessonOf(idx + 1, lessons.length)}</p>
          <h4 className="text-xl md:text-2xl font-display font-bold text-stone-100 mt-1">{lesson.title}</h4>
          <p className="text-sm italic font-serif-reading text-amber-300/90 mt-1">{lesson.tagline}</p>

          {HAS_DIAGRAM.has(lesson.id) && (
            <div className="keep-dark mt-5 rounded-2xl bg-stone-950 border border-stone-800 p-3">
              <LessonDiagram id={lesson.id} labels={lesson.diagramLabels} />
            </div>
          )}
          {Widget && (
            <div className="mt-5">
              <Widget lessonId={lesson.id} />
            </div>
          )}

          <div className="mt-5 space-y-3 text-stone-300 text-sm md:text-base leading-relaxed font-serif-reading">
            {lesson.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {lesson.bullets && lesson.bullets.length > 0 && (
            <ul className="mt-4 space-y-1.5 text-sm text-stone-300">
              {lesson.bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {lesson.mistakes && lesson.mistakes.length > 0 && (
            <div className="mt-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 p-4">
              <p className="text-xs font-semibold text-rose-300 mb-1.5">{ui.school.mistakes}</p>
              <ul className="space-y-1 text-sm text-stone-300">
                {lesson.mistakes.map((m, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-rose-400">✕</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4">
              <p className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 mb-1">
                <Lightbulb className="w-3.5 h-3.5" />
                {L.keyIdea}
              </p>
              <p className="text-sm text-stone-200">{lesson.keyIdea}</p>
            </div>
            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4">
              <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-1">
                <Target className="w-3.5 h-3.5" />
                {L.tryIt}
              </p>
              <p className="text-sm text-stone-200">{lesson.tryIt}</p>
            </div>
          </div>

          {lesson.check && lesson.check.length > 0 && (
            <div className="mt-5">
              <QuizReview key={lesson.id} questions={lesson.check} title={ui.school.check} compact />
            </div>
          )}
          <div className="mt-6 pt-5 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm text-stone-300 cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-4 h-4 accent-emerald-500"
                checked={!!learned[lesson.id]}
                onChange={() => setLearned((p) => ({ ...p, [lesson.id]: !p[lesson.id] }))}
              />
              {L.done}
            </label>
            <div className="flex items-center gap-2">
              {(track === 'exposure' || track === 'metering' || track === 'focus-dof') && onOpenSimulator && (
                <button onClick={onOpenSimulator} className="px-3 py-2 rounded-xl text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/40 hover:bg-amber-500/25">
                  {L.openSimulator}
                </button>
              )}
              {(track === 'comp-basics' || track === 'comp-advanced') && onOpenComposition && (
                <button onClick={onOpenComposition} className="px-3 py-2 rounded-xl text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/25">
                  {L.openComposition}
                </button>
              )}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => go(idx - 1)}
              disabled={idx === 0}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-stone-800 text-stone-300 hover:bg-stone-700 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              {L.prev}
            </button>
            <button
              onClick={() => {
                setLearned((p) => ({ ...p, [lesson.id]: true }));
                if (idx < lessons.length - 1) go(idx + 1);
              }}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center gap-1"
            >
              {idx < lessons.length - 1 ? L.next : L.done}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};
