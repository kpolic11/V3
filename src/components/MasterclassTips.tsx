import React, { useState } from 'react';
import { Sun, Sliders, Grid3X3, Smartphone, CheckSquare, BookOpen, Printer, Heart, ChevronDown, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface MasterclassTipsProps {
  onOpenSimulator?: () => void;
  onOpenComposition?: () => void;
  onOpenLab?: () => void;
}

const ICONS: Record<string, React.ReactNode> = {
  Sun: <Sun className="w-5 h-5 text-amber-400" />,
  Sliders: <Sliders className="w-5 h-5 text-cyan-400" />,
  Grid3X3: <Grid3X3 className="w-5 h-5 text-emerald-400" />,
  Smartphone: <Smartphone className="w-5 h-5 text-purple-400" />,
  CheckSquare: <CheckSquare className="w-5 h-5 text-pink-400" />,
  BookOpen: <BookOpen className="w-5 h-5 text-blue-400" />,
  Printer: <Printer className="w-5 h-5 text-amber-500" />,
  Heart: <Heart className="w-5 h-5 text-rose-400" />,
};

export const MasterclassTips: React.FC<MasterclassTipsProps> = ({ onOpenSimulator, onOpenComposition, onOpenLab }) => {
  const { ui, content } = useLanguage();
  const T = ui.tips;
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 md:p-8 shadow-2xl">
      <div className="pb-4 border-b border-stone-800">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          {T.badge}
        </span>
        <h3 className="text-xl md:text-2xl font-display font-bold text-stone-100 mt-1">{T.title(content.tips.length)}</h3>
        <p className="text-sm text-stone-400">{T.desc}</p>
      </div>

      <div className="mt-6 space-y-3">
        {content.tips.map((tip) => {
          const isExpanded = expandedId === tip.id;
          const isDone = completed[tip.id];
          return (
            <div
              key={tip.id}
              className={`rounded-2xl border transition-all ${
                isExpanded ? 'bg-stone-950 border-amber-500/60 shadow-lg' : 'bg-stone-950/60 border-stone-800 hover:border-stone-700'
              }`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : tip.id)}
                className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0">
                    {ICONS[tip.icon] ?? <Sparkles className="w-5 h-5 text-amber-400" />}
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-semibold text-stone-100">{tip.title}</h4>
                    <p className="text-xs text-stone-400 line-clamp-1 mt-0.5">{tip.tagline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {isDone && (
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded hidden sm:inline">
                      {T.done}
                    </span>
                  )}
                  <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform ${isExpanded ? 'rotate-180 text-amber-400' : ''}`} />
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-5 md:px-5 md:pb-6 pt-1 border-t border-stone-800/80">
                  <p className="text-xs md:text-sm text-stone-300 leading-relaxed mt-3">{tip.description}</p>
                  <div className="mt-4 p-3.5 rounded-xl bg-stone-900 border border-stone-800 text-xs">
                    <span className="text-amber-400 font-semibold block mb-1">{T.keyRule}</span>
                    <span className="text-stone-300 font-mono text-[11px]">{tip.keyRule}</span>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-stone-800/60">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!isDone}
                        onChange={() => setCompleted((prev) => ({ ...prev, [tip.id]: !prev[tip.id] }))}
                        className="w-4 h-4 mt-0.5 rounded accent-amber-500"
                      />
                      <span className={`text-xs select-none ${isDone ? 'line-through text-stone-500' : 'text-stone-300'}`}>
                        <strong>{T.challenge}</strong> {tip.practicalAction}
                      </span>
                    </label>
                    {tip.simulatorType === 'exposure' && onOpenSimulator && (
                      <button onClick={onOpenSimulator} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 shrink-0">
                        {T.openSim}
                      </button>
                    )}
                    {tip.simulatorType === 'composition' && onOpenComposition && (
                      <button onClick={onOpenComposition} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 shrink-0">
                        {T.openComp}
                      </button>
                    )}
                    {tip.simulatorType === 'light' && onOpenLab && (
                      <button onClick={onOpenLab} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 shrink-0">
                        {T.openLab}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
