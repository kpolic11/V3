import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

type Filter = 'all' | 'invention' | 'art' | 'culture';

export const TimelineView: React.FC = () => {
  const { ui, content } = useLanguage();
  const T = ui.timeline;
  const [filter, setFilter] = useState<Filter>('all');
  const [activeId, setActiveId] = useState<string>('t1839');

  const filteredEvents = content.timeline.filter((ev) => filter === 'all' || ev.category === filter);

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: T.all },
    { id: 'invention', label: T.invention },
    { id: 'art', label: T.art },
    { id: 'culture', label: T.culture },
  ];

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 md:p-8 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            {T.badge}
          </span>
          <h3 className="text-xl md:text-2xl font-display font-bold text-stone-100 mt-1">{T.title}</h3>
          <p className="text-sm text-stone-400">{T.desc}</p>
        </div>

        <div className="flex items-center gap-1.5 self-start md:self-auto bg-stone-950 p-1 rounded-xl border border-stone-800">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                filter === f.id ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            onClick={() => setActiveId(event.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
              activeId === event.id
                ? 'bg-amber-950/30 border-amber-500/70 shadow-lg shadow-amber-950/40 ring-1 ring-amber-500/50'
                : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 hover:bg-stone-950'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-display font-extrabold text-amber-400">{event.year}</span>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                    event.category === 'invention'
                      ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40'
                      : event.category === 'art'
                      ? 'bg-purple-950 text-purple-400 border border-purple-800/40'
                      : 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                  }`}
                >
                  {event.category === 'invention' ? T.catInvention : event.category === 'art' ? T.catArt : T.catCulture}
                </span>
              </div>
              <h4 className="text-base font-semibold text-stone-100 mb-1">{event.title}</h4>
              <p className="text-xs text-amber-300 font-medium mb-2">{event.protagonist}</p>
              <p className="text-xs text-stone-400 leading-relaxed">{event.description}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-800/80 text-[11px] text-stone-400 italic">
              <strong>{T.impact}</strong> {event.impact}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
