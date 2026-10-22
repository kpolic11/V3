import React from 'react';
import { BookOpen, GraduationCap, Library, Clock, Sliders, HelpCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { href, PageId } from '../router';

const SECTIONS: { id: PageId; icon: React.FC<{ className?: string }>; tone: string }[] = [
  { id: 'history', icon: BookOpen, tone: 'text-amber-400' },
  { id: 'school', icon: GraduationCap, tone: 'text-emerald-400' },
  { id: 'encyclopedia', icon: Library, tone: 'text-sky-400' },
  { id: 'timelines', icon: Clock, tone: 'text-purple-400' },
  { id: 'tools', icon: Sliders, tone: 'text-cyan-400' },
  { id: 'quiz', icon: HelpCircle, tone: 'text-rose-400' },
];

export const HomePage: React.FC = () => {
  const { ui, content } = useLanguage();
  const historyCount = content.chapters.filter((c) => c.part !== 'guide').length;

  return (
    <div>
      {/* HERO */}
      <section className="relative -mx-4 sm:-mx-6 px-4 sm:px-6 pt-14 pb-16 border-b border-stone-800 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] max-w-full h-[340px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {ui.hero.badge}
          </div>
          <h1 className="text-5xl sm:text-7xl font-display font-extrabold tracking-tight text-stone-100 leading-[1.05]">{ui.hero.title}</h1>
          <p className="text-xl sm:text-2xl font-serif-reading italic text-amber-400 mt-3">{ui.hero.subtitle}</p>
          <p className="mt-6 text-base sm:text-lg text-stone-300 leading-relaxed font-serif-reading">{ui.hero.intro}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={href('history', 'camera-obscura')} className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-xl flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {ui.hero.start(historyCount)}
            </a>
            <a href={href('school')} className="px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 text-sm font-semibold flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              {ui.pages.school.title}
            </a>
          </div>
        </div>
      </section>

      {/* START HERE */}
      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-400 mb-4">{ui.home.startHere}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {ui.home.paths.map(([title, desc, to]) => (
            <a key={to} href={to} className="group rounded-2xl p-5 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/25 hover:border-amber-500/60">
              <h3 className="text-lg font-display font-bold text-stone-100 group-hover:text-amber-300">{title}</h3>
              <p className="text-sm text-stone-400 mt-2">{desc}</p>
              <ArrowRight className="w-4 h-4 text-amber-400 mt-4 group-hover:translate-x-1 transition-transform" />
            </a>
          ))}
        </div>
      </section>

      {/* EXPLORE */}
      <section className="mt-14">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-400 mb-4">{ui.home.explore}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS.map(({ id, icon: Icon, tone }) => {
            const p = ui.pages[id as Exclude<PageId, 'home'>];
            return (
              <a key={id} href={href(id)} className="group rounded-2xl p-6 bg-stone-900/70 border border-stone-800 hover:border-stone-600 flex flex-col">
                <Icon className={`w-7 h-7 ${tone}`} />
                <h3 className="text-xl font-display font-bold text-stone-100 mt-4">{p.title}</h3>
                <p className="text-sm text-stone-400 mt-2 leading-relaxed flex-1">{p.desc}</p>
                <span className={`text-sm font-semibold mt-4 flex items-center gap-1 ${tone}`}>
                  {ui.site[id]}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
};
