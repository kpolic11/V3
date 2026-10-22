/**
 * Shared content types for Lumina.
 *
 * Every piece of content is split in two:
 *  - a language-neutral "base" (ids, numbers, image URLs, status)
 *  - per-language text (el / en / es), keyed by id.
 * getContent(lang) in ./index.ts merges them, falling back to Greek when a
 * translation is not written yet.
 */

export type Lang = 'el' | 'en';
export const LANGS: Lang[] = ['el', 'en'];

/* ----------------------------- Chapters ----------------------------- */

export type ChapterPart =
  | 'birth'
  | 'nineteenth'
  | 'art'
  | 'witness'
  | 'greece'
  | 'today'
  | 'guide';

/** full = the long documentary version is written; short = earlier short text; planned = outline only */
export type ChapterStatus = 'full' | 'short' | 'planned';

export interface ChapterBase {
  id: string;
  number: number;
  part: ChapterPart;
  iconName: string;
  imageUrl: string;
  imageCredit?: string;
  /** contain = show the whole picture (historic plates, small files) */
  imageFit?: 'cover' | 'contain';
  status: ChapterStatus;
  /** Interactive widget to embed inside the chapter, if any */
  widget?: 'camera-obscura';
}

export interface ChapterSection {
  heading: string;
  paragraphs: string[];
}

export interface QuizQuestion {
  id: number | string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FeaturedWork {
  title: string;
  author: string;
  year: string;
  /** What the work is, in one or two sentences */
  description: string;
  /** "Look closely" observations the reader is guided through */
  observe: string[];
  imageUrl?: string;
  credit?: string;
  /** Built-in SVG reconstruction to show instead of a photo */
  diagram?: 'frisius';
  /** Where to see the work when it cannot be shown here (copyright) */
  link?: { label: string; url: string };
}

export interface Exercise {
  title: string;
  intro: string;
  steps: string[];
  /** What the reader should notice / learn */
  takeaway?: string;
}

export interface SourceLink {
  title: string;
  url: string;
}

export interface ChapterText {
  title: string;
  subtitle: string;
  era: string;
  summary: string;
  sections: ChapterSection[];
  keyQuote?: { text: string; author: string };
  keyConcepts: string[];
  historicalFigures: string[];
  imageCaption: string;
  featuredWork?: FeaturedWork;
  exercise?: Exercise;
  quiz?: QuizQuestion[];
  /** What the full chapter will cover (shown for short / planned chapters) */
  outline?: string[];
  /** Short "did you know" facts shown as cards */
  didYouKnow?: string[];
  sources?: SourceLink[];
}

export type Chapter = ChapterBase &
  ChapterText & {
    /** true when this language has no text yet and Greek is shown instead */
    fallback: boolean;
  };

/* ----------------------------- Pioneers ----------------------------- */

export interface PioneerBase {
  id: string;
  name: string;
  years: string;
  /** Only real, public-domain portraits; otherwise an initials tile is shown */
  imageUrl?: string;
  /** chapter id where this person is discussed */
  chapterId?: string;
}

export interface PioneerText {
  displayName: string;
  role: string;
  movement: string;
  bio: string;
  quote?: string;
  milestone: string;
  iconicWork: string;
}

export type Pioneer = PioneerBase & PioneerText & { fallback: boolean };

/* ----------------------------- Tips ----------------------------- */

export interface TipBase {
  id: number;
  icon: string;
  simulatorType?: 'light' | 'exposure' | 'composition' | 'gear' | 'curation';
}

export interface TipText {
  title: string;
  tagline: string;
  description: string;
  practicalAction: string;
  keyRule: string;
}

export type MasterclassTip = TipBase & TipText;

/* ----------------------------- Timeline ----------------------------- */

export interface TimelineBase {
  id: string;
  year: string;
  category: 'invention' | 'art' | 'culture';
}

export interface TimelineText {
  title: string;
  protagonist: string;
  description: string;
  impact: string;
}

export type TimelineEvent = TimelineBase & TimelineText;

/* ----------------------------- Photography school ----------------------------- */

export type LabTrack = 'exposure' | 'composition';

/** The School is organised in modules; each module belongs to a level (1 beginner – 3 advanced). */
export type LessonModule = 'light' | 'exposure' | 'metering' | 'focus-dof' | 'lenses' | 'comp-basics' | 'comp-advanced' | 'editing';

export interface ModuleBase {
  id: LessonModule;
  level: 1 | 2 | 3;
  icon: string;
}

export interface ModuleText {
  title: string;
  desc: string;
}

export interface LessonBase {
  id: string;
  module: LessonModule;
  /** which interactive widget (if any) to show with the lesson */
  widget?: 'equivalent' | 'histogram' | 'metering' | 'whitebalance' | 'stops' | 'modes' | 'dof' | 'focal' | 'lightdir';
}

export interface LessonText {
  title: string;
  tagline: string;
  /** Body paragraphs */
  body: string[];
  /** The one thing to remember */
  keyIdea: string;
  /** A small practical task */
  tryIt: string;
  /** Optional bullet list (e.g. settings, situations) */
  bullets?: string[];
  /** Common mistakes */
  mistakes?: string[];
  /** Short labels used inside the diagram, in order */
  diagramLabels?: string[];
  /** One or two check questions */
  check?: QuizQuestion[];
}

export type Lesson = LessonBase & LessonText;
