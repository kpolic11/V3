import React from 'react';
import { GraduationCap, Library, Clock, Sliders, HelpCircle, Heart, Info } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { href, navigate } from '../router';
import { PageHeader } from './PageHeader';
import { LearningLab } from '../components/LearningLab';
import { MasterclassTips } from '../components/MasterclassTips';
import { ExposureSimulator } from '../components/ExposureSimulator';
import { CompositionTool } from '../components/CompositionTool';
import { Timelines } from '../components/Timelines';
import { PioneersGallery } from '../components/PioneersGallery';
import { QuizReview } from '../components/QuizReview';

export const SchoolPage: React.FC = () => {
  const { ui } = useLanguage();
  return (
    <div>
      <PageHeader kicker={ui.site.school} title={ui.pages.school.title} desc={ui.pages.school.desc} icon={<GraduationCap className="w-4 h-4" />} />
      <LearningLab onOpenSimulator={() => navigate(href('tools', 'exposure'))} onOpenComposition={() => navigate(href('tools', 'composition'))} />
      <div className="mt-16">
        <MasterclassTips
          onOpenSimulator={() => navigate(href('tools', 'exposure'))}
          onOpenComposition={() => navigate(href('tools', 'composition'))}
          onOpenLab={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
      </div>
    </div>
  );
};

export const ToolsPage: React.FC<{ tool?: string }> = ({ tool }) => {
  const { ui } = useLanguage();
  React.useEffect(() => {
    if (tool) requestAnimationFrame(() => document.getElementById(`tool-${tool}`)?.scrollIntoView({ block: 'start' }));
  }, [tool]);
  return (
    <div>
      <PageHeader kicker={ui.site.tools} title={ui.pages.tools.title} desc={ui.pages.tools.desc} icon={<Sliders className="w-4 h-4" />} />
      <section id="tool-exposure" className="scroll-mt-24">
        <ExposureSimulator />
      </section>
      <section id="tool-composition" className="mt-16 scroll-mt-24">
        <CompositionTool />
      </section>
    </div>
  );
};

export const TimelinesPage: React.FC<{ tab?: string }> = ({ tab }) => {
  const { ui } = useLanguage();
  return (
    <div>
      <PageHeader kicker={ui.site.timelines} title={ui.pages.timelines.title} desc={ui.pages.timelines.desc} icon={<Clock className="w-4 h-4" />} />
      <Timelines tab={tab} />
    </div>
  );
};

export const EncyclopediaPage: React.FC = () => {
  const { ui } = useLanguage();
  return (
    <div>
      <PageHeader kicker={ui.site.encyclopedia} title={ui.pages.encyclopedia.title} desc={ui.pages.encyclopedia.desc} icon={<Library className="w-4 h-4" />} />
      <PioneersGallery onOpenChapter={(id) => navigate(href('history', id))} />
    </div>
  );
};

export const QuizPage: React.FC = () => {
  const { ui } = useLanguage();
  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader kicker={ui.site.quiz} title={ui.pages.quiz.title} desc={ui.pages.quiz.desc} icon={<HelpCircle className="w-4 h-4" />} />
      <QuizReview />
    </div>
  );
};

export const AboutPage: React.FC = () => {
  const { ui } = useLanguage();
  const A = ui.about;
  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader kicker="Lumina" title={A.title} desc={A.desc} icon={<Heart className="w-4 h-4" />} />
      <dl className="space-y-4">
        {A.credits.map(([role, who, what], i) => (
          <div key={role} className={`rounded-2xl border p-5 ${i === 0 ? 'bg-amber-500/10 border-amber-500/40' : 'bg-stone-900/70 border-stone-800'}`}>
            <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-amber-400">{role}</dt>
            <dd>
              <p className={`font-display font-bold text-stone-100 mt-1 ${i === 0 ? 'text-2xl' : 'text-lg'}`}>{who}</p>
              <p className="text-sm text-stone-400 mt-1.5 leading-relaxed">{what}</p>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-sm text-stone-500 flex gap-2">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        {A.note}
      </p>
    </div>
  );
};

export const NotFoundPage: React.FC = () => {
  const { ui } = useLanguage();
  return (
    <div className="py-24 text-center">
      <p className="text-stone-400">{ui.site.notFound}</p>
      <a href="#/" className="inline-block mt-4 px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-semibold text-sm">
        {ui.site.goHome}
      </a>
    </div>
  );
};
