import React, { useState } from 'react';
import { Quote, X } from 'lucide-react';
import type { Pioneer } from '../data/types';
import { useLanguage } from '../i18n/LanguageContext';
import { SafeImage } from './SafeImage';

const initials = (name: string) =>
  name
    .replace(/\(.*?\)/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

/** Portrait if a real public-domain one exists, otherwise an elegant initials tile. */
const PioneerPortrait: React.FC<{ p: Pioneer; className: string }> = ({ p, className }) =>
  p.imageUrl ? (
    <SafeImage src={p.imageUrl} alt={p.displayName} className={`${className} object-cover object-top grayscale-[30%]`} loading="lazy" />
  ) : (
    <div className={`${className} flex items-center justify-center bg-gradient-to-br from-stone-800 via-stone-900 to-amber-950/60`}>
      <span className="font-display text-4xl font-bold text-amber-400/80 tracking-widest">{initials(p.name)}</span>
    </div>
  );

export const PioneersGallery: React.FC<{ onOpenChapter?: (chapterId: string) => void }> = ({ onOpenChapter }) => {
  const { ui, content } = useLanguage();
  const P = ui.pioneers;
  const [selected, setSelected] = useState<Pioneer | null>(null);

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 md:p-8 shadow-2xl">
      <div className="pb-4 border-b border-stone-800">
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
          {P.badge}
        </span>
        <h3 className="text-xl md:text-2xl font-display font-bold text-stone-100 mt-1">{P.title}</h3>
        <p className="text-sm text-stone-400">{P.desc}</p>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {content.pioneers.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className="group text-left bg-stone-950/70 border border-stone-800 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-900">
              <PioneerPortrait p={p} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              <span className="absolute bottom-2 left-2.5 text-[11px] font-mono text-amber-300 font-medium">{p.years}</span>
            </div>
            <div className="p-3.5 flex flex-col flex-1 justify-between">
              <div>
                <h4 className="font-display font-bold text-sm text-stone-100 group-hover:text-amber-400 transition-colors">{p.displayName}</h4>
                <p className="text-[11px] text-stone-400 line-clamp-2 mt-0.5">{p.role}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-800/80 text-[10px] text-amber-400 font-medium flex justify-between">
                <span className="line-clamp-1">{p.movement}</span>
                <span className="group-hover:translate-x-0.5 transition-transform">➔</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-stone-900 border border-stone-700 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700" aria-label={P.close}>
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <PioneerPortrait p={selected} className="w-full sm:w-40 aspect-square rounded-2xl border border-stone-700 shrink-0" />
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 font-mono">{selected.movement}</span>
                <h3 className="text-xl font-display font-bold text-stone-100 mt-0.5">{selected.displayName}</h3>
                <p className="text-xs text-stone-400">
                  {selected.name} ({selected.years})
                </p>
                <p className="text-xs text-amber-300 font-medium mt-1">{selected.role}</p>
              </div>
            </div>

            <div className="mt-5 space-y-4 text-sm text-stone-300 leading-relaxed">
              <p>{selected.bio}</p>
              {selected.quote && (
                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-2">
                  <Quote className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="italic text-stone-200">«{selected.quote}»</p>
                </div>
              )}
              <div className="pt-2 border-t border-stone-800 flex flex-col gap-1 text-xs">
                <p>
                  <strong className="text-stone-200">{P.iconicWork}</strong> {selected.iconicWork}
                </p>
                <p>
                  <strong className="text-stone-200">{P.milestone}</strong> {selected.milestone}
                </p>
              </div>
              {selected.chapterId && onOpenChapter && (
                <button
                  onClick={() => {
                    onOpenChapter(selected.chapterId!);
                    setSelected(null);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40"
                >
                  {P.openChapter}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
