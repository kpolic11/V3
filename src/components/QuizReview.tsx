import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, Award, ArrowRight } from 'lucide-react';
import type { QuizQuestion } from '../data/types';
import { useLanguage } from '../i18n/LanguageContext';

interface QuizReviewProps {
  /** Questions to ask; defaults to the general quiz */
  questions?: QuizQuestion[];
  /** Optional heading override (e.g. for a chapter quiz) */
  title?: string;
  /** Compact style for use inside a chapter */
  compact?: boolean;
}

export const QuizReview: React.FC<QuizReviewProps> = ({ questions, title, compact = false }) => {
  const { ui, content } = useLanguage();
  const Q = ui.quiz;
  const list = questions ?? content.quiz;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  // Restart when the question set changes (chapter or language switch)
  useEffect(() => {
    setCurrentIdx(0);
    setAnswers({});
    setShowResults(false);
  }, [list]);

  if (!list.length) return null;
  const question = list[Math.min(currentIdx, list.length - 1)];
  const key = String(question.id);
  const hasAnswered = answers[key] !== undefined;
  const isCorrect = answers[key] === question.correctIndex;
  const score = list.filter((q) => answers[String(q.id)] === q.correctIndex).length;

  return (
    <div className={compact ? 'bg-stone-950/70 border border-stone-800 rounded-2xl p-5' : 'bg-stone-900 border border-stone-800 rounded-3xl p-5 md:p-8 shadow-2xl'}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div>
          {!compact && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">{Q.badge}</span>
          )}
          <h3 className={`${compact ? 'text-lg' : 'text-xl md:text-2xl mt-1'} font-display font-bold text-stone-100`}>{title ?? Q.title}</h3>
          {!compact && <p className="text-sm text-stone-400">{Q.desc(list.length)}</p>}
        </div>
        {!showResults && (
          <span className="text-xs font-mono text-stone-400 bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800 self-start md:self-auto">
            {Q.question(currentIdx + 1, list.length)}
          </span>
        )}
      </div>

      {!showResults ? (
        <div className="mt-6">
          <h4 className="text-base md:text-lg font-semibold text-stone-100 mb-4">{question.question}</h4>
          <div className="space-y-2.5">
            {question.options.map((opt, i) => {
              const isSelected = answers[key] === i;
              const isThisCorrect = i === question.correctIndex;
              let style = 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700';
              if (hasAnswered) {
                if (isThisCorrect) style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                else if (isSelected) style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                else style = 'bg-stone-950/40 border-stone-900 text-stone-500 opacity-60';
              }
              return (
                <button
                  key={i}
                  disabled={hasAnswered}
                  onClick={() => setAnswers((prev) => ({ ...prev, [key]: i }))}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm transition-all flex items-center justify-between ${style}`}
                >
                  <span>{opt}</span>
                  {hasAnswered && (isThisCorrect ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> : isSelected ? <XCircle className="w-4 h-4 text-rose-400 shrink-0" /> : null)}
                </button>
              );
            })}
          </div>

          {hasAnswered && (
            <div className="mt-5 p-4 rounded-xl bg-stone-950 border border-stone-800 text-xs">
              <div className="flex items-start gap-2.5">
                {isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                <div>
                  <p className="font-semibold text-stone-200 mb-1">{isCorrect ? Q.correct : Q.wrong}</p>
                  <p className="text-stone-400 leading-relaxed">{question.explanation}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => (currentIdx < list.length - 1 ? setCurrentIdx((p) => p + 1) : setShowResults(true))}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center gap-1.5 shadow"
                >
                  <span>{currentIdx < list.length - 1 ? Q.next : Q.result}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-8 text-center py-6">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 mx-auto mb-4">
            <Award className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-display font-bold text-stone-100">{Q.score(score, list.length)}</h4>
          <p className="text-sm text-stone-400 max-w-md mx-auto mt-2 leading-relaxed">
            {score === list.length ? Q.perfect : score >= Math.ceil(list.length * 0.6) ? Q.good : Q.start}
          </p>
          <button
            onClick={() => {
              setCurrentIdx(0);
              setAnswers({});
              setShowResults(false);
            }}
            className="mt-6 px-5 py-2.5 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {Q.restart}
          </button>
        </div>
      )}
    </div>
  );
};
