import React, { useEffect, useState } from 'react';
import { Camera, Volume2, BookOpen, GraduationCap, Library, Clock, Sliders, HelpCircle, Menu, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from '../theme/ThemeToggle';
import { href, PageId } from '../router';

interface NavbarProps {
  page: string;
  /** Show the "listen" button (only on chapter pages) */
  canListen?: boolean;
  onPlayTTS: () => void;
  isAudioPlaying?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ page, canListen = false, onPlayTTS, isAudioPlaying = false }) => {
  const { ui } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => setMenuOpen(false), [page]);

  const items: { id: PageId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'history', label: ui.site.history, icon: BookOpen },
    { id: 'school', label: ui.site.school, icon: GraduationCap },
    { id: 'encyclopedia', label: ui.site.encyclopedia, icon: Library },
    { id: 'timelines', label: ui.site.timelines, icon: Clock },
    { id: 'tools', label: ui.site.tools, icon: Sliders },
    { id: 'quiz', label: ui.site.quiz, icon: HelpCircle },
  ];

  const linkClass = (active: boolean) =>
    `px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
      active ? 'bg-amber-500/15 text-amber-300 font-semibold' : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <a href="#/" className="flex items-center gap-2.5 group shrink-0" aria-label={ui.site.home}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 shadow-md group-hover:scale-105 transition-transform">
            <Camera className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <span className="font-display font-extrabold text-base md:text-lg tracking-wider text-stone-100 block leading-tight">LUMINA</span>
            <span className="text-[10px] text-stone-400 block tracking-tight">{ui.brandTagline}</span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-0.5 text-sm font-medium">
          {items.map(({ id, label, icon: Icon }) => (
            <a key={id} href={href(id)} className={linkClass(page === id)} aria-current={page === id ? 'page' : undefined}>
              <Icon className="w-4 h-4" />
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <LanguageSwitcher compact />
          <ThemeToggle />
          {canListen && (
            <button
              onClick={onPlayTTS}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isAudioPlaying ? 'bg-amber-500 text-stone-950' : 'bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isAudioPlaying ? '' : 'text-amber-400'}`} />
              <span className="hidden sm:inline">{isAudioPlaying ? ui.nav.narrating : ui.nav.listen}</span>
            </button>
          )}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg text-stone-300 hover:bg-stone-800"
            aria-label={ui.menu}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden border-t border-stone-800 bg-stone-950 px-4 py-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
          {items.map(({ id, label, icon: Icon }) => (
            <a key={id} href={href(id)} className={`${linkClass(page === id)} bg-stone-900`}>
              <Icon className="w-4 h-4" />
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
