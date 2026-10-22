import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGS } from '../data/types';
import { UI } from '../i18n/ui';

/** Segmented EL | EN | ES switch. */
export const LanguageSwitcher: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { lang, setLang, ui } = useLanguage();
  return (
    <div
      role="group"
      aria-label={ui.language}
      className="flex items-center bg-stone-900 border border-stone-700 rounded-xl p-0.5"
    >
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          title={UI[l].langName}
          className={`px-2 ${compact ? 'py-1' : 'py-1.5'} rounded-lg text-[11px] font-bold tracking-wide transition-colors ${
            lang === l ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-stone-100'
          }`}
        >
          {UI[l].langShort}
        </button>
      ))}
    </div>
  );
};
