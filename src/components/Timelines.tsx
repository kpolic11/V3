import React, { useMemo } from 'react';
import { Star, Cpu, Palette, Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { TimelineEntry } from '../data';
import { href } from '../router';

export type TimelineTab = 'general' | 'tech' | 'art' | 'society';
export const TIMELINE_TABS: TimelineTab[] = ['general', 'tech', 'art', 'society'];

const TAB_ICON: Record<TimelineTab, React.FC<{ className?: string }>> = { general: Star, tech: Cpu, art: Palette, society: Users };
const TRACK_STYLE: Record<string, string> = {
  tech: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
  art: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
  society: 'text-rose-300 bg-rose-500/10 border-rose-500/30',
};
const DOT_STYLE: Record<string, string> = { tech: 'bg-cyan-400', art: 'bg-purple-400', society: 'bg-rose-400' };

function eraOf(year: number): 'before' | 'c19' | 'c20' | 'c21' {
  if (year < 1826) return 'before';
  if (year < 1900) return 'c19';
  if (year < 2000) return 'c20';
  return 'c21';
}

/** Four timelines (essentials / inventions / art / society) driven by the #/timelines/<tab> route. */
export const Timelines: React.FC<{ tab?: string }> = ({ tab }) => {
  const { ui, content } = useLanguage();
  const T = ui.tl;
  const active: TimelineTab = (TIMELINE_TABS as string[]).includes(tab ?? '') ? (tab as TimelineTab) : 'general';

  const events = useMemo(
    () => content.timelines.filter((e) => (active === 'general' ? e.major : e.tracks.includes(active))),
    [content.timelines, active]
  );
  const groups = useMemo(() => {
    const out: { era: ReturnType<typeof eraOf>; items: TimelineEntry[] }[] = [];
    for (const e of events) {
      const era = eraOf(e.year);
      if (!out.length || out[out.length - 1].era !== era) out.push({ era, items: [] });
      out[out.length - 1].items.push(e);
    }
    return out;
  }, [events]);

  const yearLabel = (e: TimelineEntry) => e.label ?? (e.year < 0 ? `~${-e.year} ${T.bc}` : String(e.year));
  const chapterTitle = (id?: string) => content.chapters.find((c) => c.id === id)?.title;

  return (
    <div>
      <div role="tablist" className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {TIMELINE_TABS.map((t) => {
          const Icon = TAB_ICON[t];
          const on = t === active;
          return (
            <a
              key={t}
              role="tab"
              aria-selected={on}
              href={href('timelines', t === 'general' ? undefined : t)}
              className={`rounded-2xl border px-4 py-3 text-sm font-semibold flex items-center gap-2 transition-colors ${
                on ? 'bg-amber-500 text-stone-950 border-amber-500' : 'bg-stone-900/70 border-stone-800 text-stone-300 hover:border-stone-600'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {T.tabs[t]}
            </a>
          );
        })}
      </div>
      <p className="mt-4 text-stone-400 font-serif-reading text-base">
        {T.tabDesc[active]} <span className="text-stone-500 text-sm font-sans">· {T.events(events.length)}</span>
      </p>

      <div className="mt-8 space-y-12">
        {groups.map((g) => (
          <section key={g.era}>
            <h2 className="sticky top-16 z-10 bg-stone-950/95 backdrop-blur py-2 text-sm font-semibold uppercase tracking-[0.18em] text-amber-400">
              {T.eras[g.era]}
            </h2>
            <ol className="relative mt-4 border-l-2 border-stone-800 ml-3 sm:ml-[7.5rem] space-y-6">
              {g.items.map((e) => (
                <li key={e.id} className="relative pl-6 sm:pl-8">
                  <span className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full ring-4 ring-stone-950 ${e.major ? 'bg-amber-400' : DOT_STYLE[e.tracks[0]]}`} />
                  <p className="sm:absolute sm:-left-[8.5rem] sm:w-28 sm:text-right font-mono text-sm font-bold text-amber-400 sm:top-0.5">{yearLabel(e)}</p>
                  <div className="rounded-2xl bg-stone-900/70 border border-stone-800 p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-display font-bold text-stone-100 leading-snug">{e.title}</h3>
                    <p className="text-sm sm:text-base text-stone-300 mt-1.5 leading-relaxed font-serif-reading">{e.desc}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {e.tracks.map((t) => (
                        <span key={t} className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${TRACK_STYLE[t]}`}>
                          {T.trackNames[t]}
                        </span>
                      ))}
                      {e.chapter && chapterTitle(e.chapter) && (
                        <a href={href('history', e.chapter)} className="ml-auto text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                          {T.readChapter}: {chapterTitle(e.chapter)}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
};
