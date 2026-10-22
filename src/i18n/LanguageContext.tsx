import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Lang } from '../data/types';
import { LANGS } from '../data/types';
import { UI, UIStrings } from './ui';
import { getContent, Content } from '../data';

const STORAGE_KEY = 'lumina.lang';

function readStoredLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (LANGS as string[]).includes(stored)) return stored as Lang;
  } catch {
    /* storage may be blocked */
  }
  // Greek is the default; visitors switch with the EL / EN / ES button.
  return 'el';
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  ui: UIStrings;
  content: Content;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => readStoredLang());

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, ui: UI[lang], content: getContent(lang) }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
