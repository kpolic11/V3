import React, { useMemo } from 'react';
import { BookOpen, Clock } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { ChapterPart } from '../data/types';
import { readingMinutes } from '../data';
import { href, navigate } from '../router';
import { PageHeader } from './PageHeader';
import { ChapterReader } from '../components/ChapterReader';
import { SafeImage } from '../components/SafeImage';

export const PART_ORDER: ChapterPart[] = ['birth', 'nineteenth', 'art', 'witness', 'greece', 'today', 'guide'];
const DOT: Record<string, string> = { full: 'bg-emerald-400', short: 'bg-stone-500', planned: 'bg-sky-400' };

/** #/history → table of contents · #/history/<id> → the chapter */
export const HistoryPage: React.FC<{ chapterId?: string }> = ({ chapterId }) => {
  const { ui, content } = useLanguage();
  const chapters = content.chapters;
  const idx = chapterId ? chapters.findIndex((c) => c.id === chapterId) : -1;

  const groups = useMemo(
    () =>
      PART_ORDER.map((part) => ({ part, items: chapters.filter((c) => c.part === part) })).filter((g) => g.items.length),
    [chapters]
  );

  if (idx >= 0) {
    const ch = chapters[idx];
    return (
      <div className="max-w-5xl mx-auto">
        <nav className="pt-6 text-xs text-stone-500 flex flex-wrap items-center gap-1.5">
          <a href={href('history')} className="hover:text-amber-400">
            {ui.site.history}
          </a>
          <span>›</span>
          <span>{ui.chapters.parts[ch.part]}</span>
        </nav>
        <ChapterReader
          key={ch.id}
          chapter={ch}
          index={idx}
          total={chapters.length}
          onPrev={() => idx > 0 && navigate(href('history', chapters[idx - 1].id))}
          onNext={() => idx < chapters.length - 1 && navigate(href('history', chapters[idx + 1].id))}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader kicker={ui.site.history} title={ui.pages.history.title} desc={ui.pages.history.desc} icon={<BookOpen className="w-4 h-4" />}>
        <div className="mt-5 flex flex-wrap gap-4 text-xs text-stone-500">
          {(['full', 'short', 'planned'] as const).map((s) => (
            <span key={s} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${DOT[s]}`} />
              {ui.chapters.status[s]}
            </span>
          ))}
        </div>
      </PageHeader>

      <div className="space-y-12">
        {groups.map((g) => (
          <section key={g.part}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-400 mb-4">{ui.chapters.parts[g.part]}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {g.items.map((c) => (
                <a
                  key={c.id}
                  href={href('history', c.id)}
                  className="group rounded-2xl overflow-hidden bg-stone-900/70 border border-stone-800 hover:border-amber-500/60 transition-colors flex flex-col"
                >
                  <div className="relative aspect-[16/9] bg-stone-950 overflow-hidden">
                    <SafeImage
                      src={c.imageUrl}
                      alt=""
                      loading="lazy"
                      className={`w-full h-full ${c.imageFit === 'contain' ? 'object-contain bg-stone-200' : 'object-cover'} opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all`}
                      fallbackClassName="w-full h-full"
                    />
                    <span className="absolute top-3 left-3 font-mono text-xs font-bold bg-stone-950/80 text-amber-400 px-2 py-0.5 rounded">
                      {String(c.number).padStart(2, '0')}
                    </span>
                    <span className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full ring-2 ring-stone-950 ${DOT[c.status]}`} title={ui.chapters.status[c.status]} />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <p className="text-[11px] font-mono text-stone-500">{c.era}</p>
                    <h3 className="text-lg font-display font-bold text-stone-100 mt-1 leading-snug group-hover:text-amber-300">{c.title}</h3>
                    <p className="text-sm text-stone-400 mt-1.5 line-clamp-2 font-serif-reading italic">{c.subtitle}</p>
                    {c.status !== 'planned' && (
                      <p className="mt-auto pt-3 text-xs text-stone-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {ui.chapters.readingTime(readingMinutes(c))}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
