import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Sparkles,
  Loader2,
  Info,
  Minimize2,
  Maximize2,
  X,
} from 'lucide-react';
import type { Chapter } from '../data/types';
import { useLanguage } from '../i18n/LanguageContext';

interface AudioNarrationBarProps {
  currentChapter: Chapter;
  onChapterSelect?: (chapterId: string) => void;
  onClose?: () => void;
  onPlayingChange?: (playing: boolean) => void;
}

interface Part {
  label: string;
  text: string;
}

/** Gemini TTS works best with moderate inputs, so long sections are split near this length. */
const MAX_PART_CHARS = 2600;

function buildParts(ch: Chapter): Part[] {
  const parts: Part[] = [];
  const intro = `${ch.title}. ${ch.subtitle}.`;
  if (!ch.sections.length) {
    parts.push({ label: ch.title, text: `${intro} ${ch.summary}` });
    return parts;
  }
  ch.sections.forEach((s, i) => {
    const head = i === 0 ? `${intro} ${s.heading ? s.heading + '.' : ''}` : s.heading ? `${s.heading}.` : '';
    let buf = head;
    for (const p of s.paragraphs) {
      if (buf.length + p.length > MAX_PART_CHARS && buf.trim()) {
        parts.push({ label: s.heading || ch.title, text: buf.trim() });
        buf = '';
      }
      buf += ' ' + p;
    }
    if (buf.trim()) parts.push({ label: s.heading || ch.title, text: buf.trim() });
  });
  return parts;
}

export const AudioNarrationBar: React.FC<AudioNarrationBarProps> = ({ currentChapter, onClose, onPlayingChange }) => {
  const { ui } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [voiceName, setVoiceName] = useState<string>('Fenrir');
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [partIndex, setPartIndex] = useState(0);

  const parts = useMemo(() => buildParts(currentChapter), [currentChapter]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fallbackRef = useRef(false);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCache = useRef<Map<string, string>>(new Map());
  const sessionRef = useRef(0); // bumps on every stop so stale callbacks are ignored

  useEffect(() => {
    onPlayingChange?.(isPlaying);
  }, [isPlaying, onPlayingChange]);

  // Reset whenever chapter, language (parts) or voice changes
  useEffect(() => {
    stopPlayback();
    setPartIndex(0);
    setProgress(0);
    setDuration(0);
    setStatusMessage('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parts, voiceName]);

  useEffect(() => () => stopPlayback(), []);

  function stopPlayback() {
    sessionRef.current++;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setIsPlaying(false);
  }

  async function fetchAudio(index: number): Promise<string | null> {
    const key = `${voiceName}|${index}|${parts[index].text.slice(0, 80)}`;
    const hit = audioCache.current.get(key);
    if (hit) return hit;
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: parts[index].text,
        voiceName,
        voiceStyle: ui.narratorStyle,
        chapterId: currentChapter.id,
      }),
    });
    const data = await response.json();
    if (!data.audioBase64) return null;
    const src = `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`;
    audioCache.current.set(key, src);
    return src;
  }

  async function playPart(index: number) {
    const session = ++sessionRef.current;
    setPartIndex(index);
    setProgress(0);

    if (fallbackRef.current) {
      playWithWebSpeech(index, session);
      return;
    }

    setIsLoading(true);
    setStatusMessage(ui.audio.generating);
    try {
      const src = await fetchAudio(index);
      if (session !== sessionRef.current) return;
      if (!src) {
        fallbackRef.current = true;
        playWithWebSpeech(index, session);
        return;
      }
      if (!audioRef.current) audioRef.current = new Audio();
      const audio = audioRef.current;
      audio.src = src;
      audio.playbackRate = playbackSpeed;
      audio.muted = isMuted;
      audio.onloadedmetadata = () => setDuration(audio.duration || 0);
      audio.ontimeupdate = () => {
        if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
      };
      audio.onended = () => {
        if (session !== sessionRef.current) return;
        if (index < parts.length - 1) playPart(index + 1);
        else {
          setIsPlaying(false);
          setProgress(100);
          setStatusMessage(ui.audio.finished);
        }
      };
      await audio.play();
      setIsPlaying(true);
      setStatusMessage(ui.audio.playing);
      // Prefetch the next part so the narration continues without a gap
      if (index < parts.length - 1) fetchAudio(index + 1).catch(() => undefined);
    } catch (err) {
      console.warn('TTS error, switching to browser speech:', err);
      if (session !== sessionRef.current) return;
      fallbackRef.current = true;
      playWithWebSpeech(index, session);
    } finally {
      if (session === sessionRef.current) setIsLoading(false);
    }
  }

  function playWithWebSpeech(index: number, session: number) {
    setIsLoading(false);
    if (!('speechSynthesis' in window)) {
      setStatusMessage(ui.audio.unsupported);
      return;
    }
    window.speechSynthesis.cancel();
    const text = parts[index].text;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = ui.speechLang;
    utterance.rate = playbackSpeed;
    utterance.volume = isMuted ? 0 : 1;
    const prefix = ui.speechLang.slice(0, 2);
    const voice = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith(prefix));
    if (voice) utterance.voice = voice;

    const est = text.length / 14 / playbackSpeed;
    setDuration(est);
    const start = Date.now();
    utterance.onstart = () => {
      setIsPlaying(true);
      setStatusMessage(ui.audio.browserVoice);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = setInterval(() => {
        setProgress(Math.min(100, ((Date.now() - start) / 1000 / est) * 100));
      }, 300);
    };
    utterance.onend = () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (session !== sessionRef.current) return;
      if (index < parts.length - 1) playPart(index + 1);
      else {
        setIsPlaying(false);
        setProgress(100);
        setStatusMessage(ui.audio.finished);
      }
    };
    utterance.onerror = () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (session !== sessionRef.current) return;
      setIsPlaying(false);
      setStatusMessage(ui.audio.error);
    };
    window.speechSynthesis.speak(utterance);
  }

  const handlePlayToggle = () => {
    if (isPlaying) {
      if (audioRef.current && !fallbackRef.current) audioRef.current.pause();
      else window.speechSynthesis?.pause();
      setIsPlaying(false);
      return;
    }
    // Resume paused audio
    if (!fallbackRef.current && audioRef.current?.src && audioRef.current.currentTime > 0 && !audioRef.current.ended) {
      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current.play();
      setIsPlaying(true);
      return;
    }
    if (fallbackRef.current && window.speechSynthesis?.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      return;
    }
    playPart(progress >= 100 && partIndex === parts.length - 1 ? 0 : partIndex);
  };

  const jumpPart = (delta: number) => {
    const next = Math.min(parts.length - 1, Math.max(0, partIndex + delta));
    stopPlayback();
    if (audioRef.current) audioRef.current.currentTime = 0;
    playPart(next);
  };

  const handleSpeedChange = () => {
    const speeds = [0.85, 1, 1.25, 1.5];
    const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
    setPlaybackSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  const handleMuteToggle = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (audioRef.current) audioRef.current.muted = next;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const p = parseFloat(e.target.value);
    setProgress(p);
    if (audioRef.current && audioRef.current.duration && !fallbackRef.current) {
      audioRef.current.currentTime = (p / 100) * audioRef.current.duration;
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentTime = duration * (progress / 100);
  const partLabel = ui.audio.part(partIndex + 1, parts.length);

  const PlayIcon = isLoading ? Loader2 : isPlaying ? Pause : Play;

  if (isMinimized) {
    return (
      <div className="bg-stone-900/95 border border-amber-500/40 rounded-full px-4 py-2 shadow-2xl backdrop-blur-md flex items-center justify-between gap-4 max-w-xl mx-auto">
        <div className="flex items-center gap-3 overflow-hidden">
          <button
            onClick={handlePlayToggle}
            disabled={isLoading}
            className="w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center shrink-0 shadow"
            aria-label={isPlaying ? ui.audio.pause : ui.audio.play}
          >
            <PlayIcon className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : 'fill-current'}`} />
          </button>
          <div className="truncate">
            <span className="text-xs font-semibold text-stone-100 truncate block">{currentChapter.title}</span>
            <span className="text-[10px] text-amber-400 font-mono">
              {partLabel} · {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button onClick={() => setIsMinimized(false)} className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800" title={ui.audio.expand} aria-label={ui.audio.expand}>
            <Maximize2 className="w-4 h-4" />
          </button>
          {onClose && (
            <button onClick={() => { stopPlayback(); onClose(); }} className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800" title={ui.audio.close} aria-label={ui.audio.close}>
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-900/95 border border-stone-800 rounded-2xl p-4 md:p-5 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Chapter / part info */}
        <div className="flex items-center gap-3 w-full md:w-auto md:flex-1 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : isPlaying ? (
              <div className="flex items-end gap-1 h-5">
                <span className="w-1 bg-amber-400 rounded-full animate-pulse h-5" />
                <span className="w-1 bg-amber-400 rounded-full animate-pulse h-3" />
                <span className="w-1 bg-amber-400 rounded-full animate-pulse h-4" />
              </div>
            ) : (
              <Sparkles className="w-6 h-6" />
            )}
          </div>
          <div className="overflow-hidden flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                {ui.audio.badge}
              </span>
              <span className="text-[11px] text-stone-400 font-mono">{partLabel}</span>
            </div>
            <h4 className="text-sm md:text-base font-semibold text-stone-100 truncate mt-0.5">{currentChapter.title}</h4>
            <p className="text-xs text-stone-400 truncate hidden sm:block">{parts[partIndex]?.label}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-center">
          <button onClick={() => jumpPart(-1)} disabled={partIndex === 0 || isLoading} className="p-2 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 disabled:opacity-30" title={ui.audio.prevPart} aria-label={ui.audio.prevPart}>
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (audioRef.current && !fallbackRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
            }}
            disabled={!isPlaying}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 disabled:opacity-30"
            title={ui.audio.rewind}
            aria-label={ui.audio.rewind}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handlePlayToggle}
            disabled={isLoading}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-lg shadow-amber-900/30 active:scale-95 transition-all"
            aria-label={isPlaying ? ui.audio.pause : ui.audio.play}
            title={isPlaying ? ui.audio.pause : ui.audio.play}
          >
            <PlayIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : 'fill-current'}`} />
          </button>
          <button onClick={() => jumpPart(1)} disabled={partIndex >= parts.length - 1 || isLoading} className="p-2 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 disabled:opacity-30" title={ui.audio.nextPart} aria-label={ui.audio.nextPart}>
            <SkipForward className="w-4 h-4" />
          </button>
          <button onClick={handleSpeedChange} className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700/50" title={ui.audio.speed} aria-label={ui.audio.speed}>
            {playbackSpeed}x
          </button>
          <button onClick={handleMuteToggle} className="p-2 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800" title={isMuted ? ui.audio.unmute : ui.audio.mute} aria-label={isMuted ? ui.audio.unmute : ui.audio.mute}>
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Voice + window */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <label htmlFor="voice-select" className="text-xs text-stone-400 hidden lg:inline">
            {ui.audio.voice}
          </label>
          <select
            id="voice-select"
            value={voiceName}
            onChange={(e) => setVoiceName(e.target.value)}
            className="text-xs bg-stone-800 border border-stone-700 text-stone-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
          >
            {Object.entries(ui.audio.voices).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-1 border-l border-stone-800 pl-2 ml-1">
            <button onClick={() => setIsMinimized(true)} className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800" title={ui.audio.minimize} aria-label={ui.audio.minimize}>
              <Minimize2 className="w-4 h-4" />
            </button>
            {onClose && (
              <button onClick={() => { stopPlayback(); onClose(); }} className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800" title={ui.audio.close} aria-label={ui.audio.close}>
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Part dots + scrub bar */}
      <div className="mt-3 flex items-center gap-3">
        <span className="text-[11px] font-mono text-stone-400 w-10 text-right">{formatTime(currentTime)}</span>
        <div className="relative flex-1 flex flex-col gap-1.5">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            aria-label={ui.audio.progress}
          />
          {parts.length > 1 && (
            <div className="flex gap-1">
              {parts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    stopPlayback();
                    playPart(i);
                  }}
                  title={p.label}
                  aria-label={`${ui.audio.part(i + 1, parts.length)}: ${p.label}`}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i < partIndex ? 'bg-amber-600' : i === partIndex ? 'bg-amber-400' : 'bg-stone-700 hover:bg-stone-600'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        <span className="text-[11px] font-mono text-stone-500 w-10">{formatTime(duration)}</span>
      </div>

      {statusMessage && (
        <div className="mt-2 text-center text-xs text-stone-400 flex items-center justify-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}
    </div>
  );
};
