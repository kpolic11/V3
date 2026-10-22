/**
 * getContent(lang): merges the language-neutral bases with the text of the
 * chosen language. Anything not yet translated falls back to Greek, and
 * chapters carry `fallback: true` so the UI can say so.
 */
import type {
  Chapter,
  Lang,
  Lesson,
  ModuleBase,
  ModuleText,
  MasterclassTip,
  Pioneer,
  QuizQuestion,
  TimelineEvent,
} from './types';
import { CHAPTER_BASE } from './chapters/base';
import { CHAPTERS_EL } from './chapters/el';
import { CHAPTERS_EN } from './chapters/en';
import { PIONEER_BASE, PIONEER_TEXT } from './pioneers';
import { TIP_BASE, TIP_TEXT, QUIZ_TEXT, TIMELINE_BASE, TIMELINE_TEXT } from './general';
import { LESSON_BASE, MODULE_BASE } from './lab/base';
import { LAB2_EL, MODULES_EL } from './lab/el2';
import { LAB2_EN, MODULES_EN } from './lab/en2';
import { LAB_EL } from './lab/el';
import { LAB_EN } from './lab/en';
import { TIMELINE_EVENTS, TimelineEventBase } from './timelines/base';
import { TIMELINE_EL } from './timelines/el';
import { TIMELINE_EN } from './timelines/en';
import type { TimelineEventText } from './timelines/types';

export type TimelineEntry = TimelineEventBase & TimelineEventText;
const TL_TEXT: Record<Lang, Record<string, TimelineEventText>> = { el: TIMELINE_EL, en: TIMELINE_EN };

export * from './types';

const CHAPTER_TEXT = { el: CHAPTERS_EL, en: CHAPTERS_EN };
const LAB_TEXT = { el: { ...LAB_EL, ...LAB2_EL }, en: { ...LAB_EN, ...LAB2_EN } };
const MODULE_TEXT = { el: MODULES_EL, en: MODULES_EN };

export interface Content {
  chapters: Chapter[];
  pioneers: Pioneer[];
  tips: MasterclassTip[];
  quiz: QuizQuestion[];
  timeline: TimelineEvent[];
  lessons: Lesson[];
  timelines: TimelineEntry[];
  modules: Module[];
}

export type Module = ModuleBase & ModuleText & { lessons: Lesson[] };

const cache = new Map<Lang, Content>();

export function getContent(lang: Lang): Content {
  const hit = cache.get(lang);
  if (hit) return hit;

  const chapters: Chapter[] = CHAPTER_BASE.map((b) => {
    const own = CHAPTER_TEXT[lang][b.id];
    const text = own ?? CHAPTERS_EL[b.id];
    // A chapter is only "full" in this language if its long text exists here
    let status = b.status;
    if (status === 'full' && text.sections.length < 3) status = text.sections.length ? 'short' : 'planned';
    return { ...b, ...text, status, fallback: !own && lang !== 'el' };
  });

  const pioneers: Pioneer[] = PIONEER_BASE.map((b) => {
    const own = PIONEER_TEXT[lang][b.id];
    return { ...b, ...(own ?? PIONEER_TEXT.el[b.id]), fallback: !own && lang !== 'el' };
  });

  const tips: MasterclassTip[] = TIP_BASE.map((b, i) => ({ ...b, ...(TIP_TEXT[lang][i] ?? TIP_TEXT.el[i]) }));

  const timeline: TimelineEvent[] = TIMELINE_BASE.map((b) => ({
    ...b,
    ...(TIMELINE_TEXT[lang][b.id] ?? TIMELINE_TEXT.el[b.id]),
  }));

  const lessons: Lesson[] = LESSON_BASE.map((b) => ({ ...b, ...(LAB_TEXT[lang][b.id] ?? LAB_TEXT.el[b.id]) }));
  const modules: Module[] = MODULE_BASE.map((m) => ({
    ...m,
    ...(MODULE_TEXT[lang][m.id] ?? MODULES_EL[m.id]),
    lessons: lessons.filter((l) => l.module === m.id),
  }));

  const timelines: TimelineEntry[] = TIMELINE_EVENTS.map((b) => ({ ...b, ...(TL_TEXT[lang][b.id] ?? TIMELINE_EL[b.id]) })).sort((a, b) => a.year - b.year);

  const content: Content = { chapters, pioneers, tips, quiz: QUIZ_TEXT[lang], timeline, lessons, timelines, modules };
  cache.set(lang, content);
  return content;
}

/** Plain-text paragraphs of a chapter in reading order (for narration, PDF and reading time) */
export function chapterParagraphs(ch: Chapter): string[] {
  if (ch.sections.length) return ch.sections.flatMap((s) => s.paragraphs);
  return [ch.summary];
}

export function readingMinutes(ch: Chapter): number {
  const words = chapterParagraphs(ch).join(' ').split(/\s+/).length;
  return Math.max(1, Math.round(words / 160));
}
