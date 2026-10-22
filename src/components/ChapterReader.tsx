import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  FileDown,
  Loader2,
  Clock,
  Info,
  Eye,
  PenTool,
  Lightbulb,
  ListChecks,
  ExternalLink,
  BookMarked,
} from 'lucide-react';
import type { Chapter } from '../data/types';
import { readingMinutes } from '../data';
import { useLanguage } from '../i18n/LanguageContext';
import { SafeImage } from './SafeImage';
import { CameraObscuraVisualizer } from './CameraObscuraVisualizer';
import { QuizReview } from './QuizReview';
import { generateChapterPdf } from '../utils/generateChapterPdf';

interface ChapterReaderProps {
  chapter: Chapter;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

const STATUS_STYLE: Record<Chapter['status'], string> = {
  full: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  short: 'bg-stone-700/40 text-stone-300 border-stone-600',
  planned: 'bg-sky-500/15 text-sky-300 border-sky-500/40',
};

const DROP_CAP =
  'first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-amber-400 first-letter:leading-none';

export const ChapterReader: React.FC<ChapterReaderProps> = ({ chapter, index, total, onPrev, onNext }) => {
  const { ui } = useLanguage();
  const C = ui.chapters;
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfMsg, setPdfMsg] = useState('');

  const handlePdf = async () => {
    if (pdfBusy) return;
    setPdfBusy(true);
    setPdfMsg(C.pdfPreparing);
    try {
      await generateChapterPdf({ chapter, ui, onProgress: setPdfMsg });
      setPdfMsg(C.pdfDone);
    } catch (err) {
      console.error(err);
      setPdfMsg(C.pdfError);
    } finally {
      setPdfBusy(false);
      setTimeout(() => setPdfMsg(''), 2800);
    }
  };

  const headedSections = chapter.sections.filter((s) => s.heading);
  const contain = chapter.imageFit === 'contain';
  const anchor = (i: number) => `sec-${chapter.id}-${i}`;

  return (
    <article className="mt-8 bg-stone-900/80 border border-stone-800 rounded-3xl p-5 sm:p-10 shadow-2xl">
      {/* Meta */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-stone-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full">
            {C.chapter} {chapter.number}
          </span>
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLE[chapter.status]}`}>{C.status[chapter.status]}</span>
          <span className="text-xs font-mono text-stone-400">{chapter.era}</span>
          {chapter.status !== 'planned' && (
            <span className="text-xs text-stone-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {C.readingTime(readingMinutes(chapter))}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {chapter.status !== 'planned' && (
            <button
              onClick={handlePdf}
              disabled={pdfBusy}
              className="px-3 py-2 rounded-lg bg-stone-800 text-stone-300 hover:bg-stone-700 text-xs font-semibold flex items-center gap-1.5 disabled:opacity-60"
              title={C.pdf}
            >
              {pdfBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
              <span className="hidden sm:inline">{pdfMsg || C.pdf}</span>
            </button>
          )}
          <button onClick={onPrev} disabled={index === 0} className="p-2 rounded-lg bg-stone-800 text-stone-300 hover:bg-stone-700 disabled:opacity-30 disabled:pointer-events-none" title={C.prevTitle} aria-label={C.prevTitle}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={onNext} disabled={index === total - 1} className="p-2 rounded-lg bg-stone-800 text-stone-300 hover:bg-stone-700 disabled:opacity-30 disabled:pointer-events-none" title={C.nextTitle} aria-label={C.nextTitle}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notices */}
      {(chapter.fallback || chapter.status !== 'full') && (
        <div className="mt-5 space-y-2">
          {chapter.fallback && (
            <p className="text-xs text-sky-200 bg-sky-950/40 border border-sky-800/50 rounded-xl px-3 py-2 flex gap-2">
              <Info className="w-4 h-4 shrink-0" />
              {C.fallbackNotice}
            </p>
          )}
          {chapter.status === 'short' && (
            <p className="text-xs text-stone-300 bg-stone-950/60 border border-stone-800 rounded-xl px-3 py-2 flex gap-2">
              <Info className="w-4 h-4 shrink-0 text-amber-400" />
              {C.shortNotice}
            </p>
          )}
          {chapter.status === 'planned' && (
            <p className="text-xs text-stone-300 bg-stone-950/60 border border-stone-800 rounded-xl px-3 py-2 flex gap-2">
              <Info className="w-4 h-4 shrink-0 text-sky-400" />
              {C.plannedNotice}
            </p>
          )}
        </div>
      )}

      {/* Title */}
      <header className="mt-6">
        <h2 className="text-2xl sm:text-4xl font-display font-bold text-stone-100 leading-tight">{chapter.title}</h2>
        <p className="text-base sm:text-lg font-serif-reading italic text-amber-400/90 mt-1">{chapter.subtitle}</p>
      </header>

      {/* Hero image */}
      <figure className="mt-6 rounded-2xl overflow-hidden border border-stone-800 shadow-xl bg-stone-950">
        <div className={`relative aspect-[16/9] max-h-[480px] overflow-hidden ${contain ? 'bg-stone-200' : ''}`}>
          <SafeImage
            src={chapter.imageUrl}
            alt={chapter.imageCaption}
            className={`w-full h-full ${contain ? 'object-contain p-2' : 'object-cover'}`}
            fallbackClassName="w-full h-full"
            loading="eager"
          />
        </div>
        <figcaption className="p-3 text-xs text-stone-400 italic text-center bg-stone-950/90">
          {chapter.imageCaption}
          {chapter.imageCredit && <span className="block not-italic text-[10px] text-stone-600 mt-1">{C.credit} {chapter.imageCredit}</span>}
        </figcaption>
      </figure>

      {/* Table of contents */}
      {headedSections.length > 2 && (
        <nav className="mt-6 rounded-2xl bg-stone-950/60 border border-stone-800 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
            <BookMarked className="w-3.5 h-3.5 text-amber-400" />
            {C.contents}
          </p>
          <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {chapter.sections.map((s, i) =>
              s.heading ? (
                <li key={i}>
                  <a
                    href={`#${anchor(i)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(anchor(i))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="text-stone-300 hover:text-amber-300 flex gap-2"
                  >
                    <span className="font-mono text-xs text-stone-500 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    {s.heading}
                  </a>
                </li>
              ) : null
            )}
          </ol>
        </nav>
      )}

      {/* Planned chapters: show the summary only */}
      {chapter.sections.length === 0 && (
        <p className="mt-8 text-stone-200 text-base sm:text-lg font-serif-reading leading-relaxed">{chapter.summary}</p>
      )}

      {/* Sections */}
      <div className="mt-8 space-y-10">
        {chapter.sections.map((s, i) => (
          <React.Fragment key={i}>
            <section id={anchor(i)} className="scroll-mt-28">
              {s.heading && <h3 className="text-xl sm:text-2xl font-display font-bold text-amber-300 mb-4">{s.heading}</h3>}
              <div className="space-y-5 text-stone-200 text-base sm:text-lg font-serif-reading leading-relaxed">
                {s.paragraphs.map((p, j) => (
                  <p key={j} className={i === 0 && j === 0 ? DROP_CAP : ''}>
                    {p}
                  </p>
                ))}
              </div>
            </section>
            {chapter.widget === 'camera-obscura' && i === 1 && <CameraObscuraVisualizer />}
            {chapter.keyQuote && i === Math.min(2, chapter.sections.length - 1) && (
              <blockquote className="p-6 rounded-2xl bg-stone-950/90 border-l-4 border-amber-500 shadow-md">
                <Quote className="w-6 h-6 text-amber-400 mb-2 opacity-80" />
                <p className="text-base sm:text-lg font-serif-reading italic text-stone-200">«{chapter.keyQuote.text}»</p>
                <footer className="text-xs font-semibold text-amber-400 mt-3 font-mono">— {chapter.keyQuote.author}</footer>
              </blockquote>
            )}
          </React.Fragment>
        ))}
      </div>
      {chapter.widget === 'camera-obscura' && chapter.sections.length < 2 && (
        <div className="mt-8">
          <CameraObscuraVisualizer />
        </div>
      )}

      {/* Did you know */}
      {chapter.didYouKnow && chapter.didYouKnow.length > 0 && (
        <section className="mt-10">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            {C.didYouKnow}
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {chapter.didYouKnow.map((f, i) => (
              <p key={i} className="rounded-2xl bg-stone-950/70 border border-stone-800 p-4 text-sm text-stone-300 leading-relaxed">
                {f}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Featured work */}
      {chapter.featuredWork && (
        <section className="mt-10 rounded-3xl bg-gradient-to-br from-amber-950/40 to-stone-950 border border-amber-800/40 p-5 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            {C.featured} · <span className="text-stone-400 normal-case tracking-normal">{C.featuredSub}</span>
          </p>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-stone-100 mt-2">{chapter.featuredWork.title}</h3>
          <p className="text-sm text-amber-300/80 font-mono">
            {chapter.featuredWork.author} · {chapter.featuredWork.year}
          </p>
          <div className={`mt-4 grid ${chapter.featuredWork.imageUrl ? 'md:grid-cols-2' : ''} gap-5`}>
            {chapter.featuredWork.imageUrl && (
              <figure className="rounded-2xl overflow-hidden bg-stone-200 border border-stone-700">
                <SafeImage src={chapter.featuredWork.imageUrl} alt={chapter.featuredWork.title} className="w-full max-h-[380px] object-contain" fallbackClassName="w-full h-64" />
                {chapter.featuredWork.credit && <figcaption className="text-[10px] text-stone-500 bg-stone-950 p-2">{chapter.featuredWork.credit}</figcaption>}
              </figure>
            )}
            <div>
              <p className="text-sm text-stone-300 leading-relaxed">{chapter.featuredWork.description}</p>
              {chapter.featuredWork.link && (
                <a
                  href={chapter.featuredWork.link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-stone-950 hover:bg-amber-400"
                >
                  <Eye className="w-4 h-4" />
                  {chapter.featuredWork.link.label}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <ol className="mt-4 space-y-2.5">
                {chapter.featuredWork.observe.map((o, i) => (
                  <li key={i} className="flex gap-3 text-sm text-stone-200">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="leading-relaxed">{o}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* Exercise */}
      {chapter.exercise && (
        <section className="mt-8 rounded-3xl bg-emerald-950/30 border border-emerald-800/40 p-5 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <PenTool className="w-4 h-4" />
            {C.exercise}
          </p>
          <h3 className="text-xl font-display font-bold text-stone-100 mt-2">{chapter.exercise.title}</h3>
          <p className="text-sm text-stone-300 mt-2 leading-relaxed">{chapter.exercise.intro}</p>
          <ol className="mt-4 space-y-2">
            {chapter.exercise.steps.map((s, i) => (
              <li key={i} className="flex gap-3 text-sm text-stone-200">
                <span className="font-mono text-emerald-400 font-bold w-5 shrink-0">{i + 1}.</span>
                <span className="leading-relaxed">{s}</span>
              </li>
            ))}
          </ol>
          {chapter.exercise.takeaway && (
            <p className="mt-4 text-sm text-emerald-200 bg-emerald-950/50 rounded-xl p-3">
              <strong>{C.takeaway}</strong> {chapter.exercise.takeaway}
            </p>
          )}
        </section>
      )}

      {/* Outline (short / planned) */}
      {chapter.status !== 'full' && chapter.outline && chapter.outline.length > 0 && (
        <section className="mt-8 rounded-2xl bg-stone-950/60 border border-dashed border-stone-700 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-300 flex items-center gap-1.5 mb-3">
            <ListChecks className="w-4 h-4" />
            {C.outlineTitle}
          </p>
          <ul className="space-y-1.5 text-sm text-stone-300">
            {chapter.outline.map((o, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-sky-400">›</span>
                {o}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Concepts & figures */}
      <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-stone-400 font-semibold mr-1">{C.concepts}</span>
          {chapter.keyConcepts.map((c, i) => (
            <span key={i} className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300 font-medium">
              {c}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-stone-400 font-semibold mr-1">{C.figures}</span>
          {chapter.historicalFigures.map((f, i) => (
            <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-950/40 border border-amber-800/40 text-amber-300 font-medium">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Chapter quiz */}
      {chapter.quiz && chapter.quiz.length > 0 && (
        <section className="mt-8">
          <QuizReview questions={chapter.quiz} title={C.chapterQuiz} compact />
        </section>
      )}

      {/* Sources */}
      {chapter.sources && chapter.sources.length > 0 && (
        <section className="mt-8">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">{C.sources}</h3>
          <ul className="space-y-1 text-xs">
            {chapter.sources.map((s, i) => (
              <li key={i}>
                <a href={s.url} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-amber-300 inline-flex items-center gap-1">
                  {s.title}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Pagination */}
      <div className="mt-8 pt-6 border-t border-stone-800 flex items-center justify-between">
        <button onClick={onPrev} disabled={index === 0} className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-800 text-stone-300 hover:bg-stone-700 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5">
          <ChevronLeft className="w-4 h-4" />
          {C.prev}
        </button>
        <span className="text-xs font-mono text-stone-400">
          {index + 1} / {total}
        </span>
        <button onClick={onNext} disabled={index === total - 1} className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5">
          {C.next}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};
