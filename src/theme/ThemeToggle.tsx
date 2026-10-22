import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type Theme = 'dark' | 'light';
const KEY = 'lumina.theme';

function readTheme(): Theme {
  try {
    const t = window.localStorage.getItem(KEY);
    if (t === 'light' || t === 'dark') return t;
  } catch {
    /* storage may be blocked */
  }
  return 'dark';
}

/** Applies the stored theme as early as possible (called from main.tsx). */
export function applyStoredTheme() {
  document.documentElement.classList.toggle('light', readTheme() === 'light');
}

/** Sun / moon button that switches between the night (dark) and day (light) theme. */
export const ThemeToggle: React.FC = () => {
  const { ui } = useLanguage();
  const [theme, setTheme] = useState<Theme>(() => readTheme());

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    try {
      window.localStorage.setItem(KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const next = theme === 'dark' ? 'light' : 'dark';
  const label = next === 'light' ? ui.theme.day : ui.theme.night;
  return (
    <button
      onClick={() => setTheme(next)}
      className="p-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-300 hover:text-amber-400"
      title={label}
      aria-label={label}
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};
