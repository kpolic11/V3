import React from 'react';

/** Common page title block used by every sub-page. */
export const PageHeader: React.FC<{ kicker?: string; title: string; desc?: string; icon?: React.ReactNode; children?: React.ReactNode }> = ({
  kicker,
  title,
  desc,
  icon,
  children,
}) => (
  <header className="pt-10 pb-8 border-b border-stone-800 mb-8">
    {kicker && (
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 flex items-center gap-2 mb-3">
        {icon}
        {kicker}
      </p>
    )}
    <h1 className="text-3xl sm:text-5xl font-display font-bold text-stone-100 leading-tight">{title}</h1>
    {desc && <p className="mt-4 text-base sm:text-lg text-stone-400 max-w-3xl leading-relaxed font-serif-reading">{desc}</p>}
    {children}
  </header>
);
