/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { useLanguage } from './i18n/LanguageContext';
import { useRoute, useScrollTopOn, href } from './router';
import { Navbar } from './components/Navbar';
import { AudioNarrationBar } from './components/AudioNarrationBar';
import { HomePage } from './pages/HomePage';
import { HistoryPage } from './pages/HistoryPage';
import { SchoolPage, ToolsPage, TimelinesPage, EncyclopediaPage, QuizPage, AboutPage, NotFoundPage } from './pages/SimplePages';

export default function App() {
  const { ui, content } = useLanguage();
  const route = useRoute();
  const [showAudio, setShowAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useScrollTopOn(`${route.page}/${route.id ?? ''}`);

  const chapter = route.page === 'history' && route.id ? content.chapters.find((c) => c.id === route.id) : undefined;

  useEffect(() => {
    if (!chapter) setShowAudio(false);
  }, [chapter]);

  useEffect(() => {
    const pageTitle =
      chapter?.title ?? (route.page !== 'home' && route.page !== 'notfound' ? ui.site[route.page] : undefined);
    document.title = pageTitle ? `${pageTitle} · Lumina` : `Lumina: ${ui.brandTagline}`;
  }, [ui, route, chapter]);

  let page: React.ReactNode;
  switch (route.page) {
    case 'home':
      page = <HomePage />;
      break;
    case 'history':
      page = <HistoryPage chapterId={route.id} />;
      break;
    case 'school':
      page = <SchoolPage />;
      break;
    case 'encyclopedia':
      page = <EncyclopediaPage />;
      break;
    case 'timelines':
      page = <TimelinesPage tab={route.id} />;
      break;
    case 'tools':
      page = <ToolsPage tool={route.id} />;
      break;
    case 'quiz':
      page = <QuizPage />;
      break;
    case 'about':
      page = <AboutPage />;
      break;
    default:
      page = <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      <Navbar page={route.page} canListen={!!chapter} onPlayTTS={() => setShowAudio(true)} isAudioPlaying={isPlaying} />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 pb-16 w-full">
        {showAudio && chapter && (
          <div className="sticky top-20 z-30 mt-4">
            <AudioNarrationBar currentChapter={chapter} onClose={() => setShowAudio(false)} onPlayingChange={setIsPlaying} />
          </div>
        )}
        {page}
      </main>

      <footer className="border-t border-stone-800 bg-stone-950 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-amber-400" />
          </div>
          <p className="text-xl sm:text-2xl font-display font-bold text-stone-100">{ui.footer.quote}</p>
          <p className="mt-4 text-sm sm:text-base font-serif-reading italic text-stone-400 leading-relaxed max-w-2xl mx-auto">{ui.footer.epilogue}</p>
          <div className="mt-8 pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <span>{ui.footer.brand}</span>
            <a href={href('about')} className="hover:text-amber-400 underline-offset-4 hover:underline">
              {ui.site.about} · Kostas Politsis Photography
            </a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-1.5 text-stone-400 hover:text-amber-400">
              {ui.footer.top}
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
