/**
 * Tiny hash router: every page has its own link (#/history/niepce, #/school …)
 * and works in AI Studio, on static hosting and inside previews without
 * server configuration.
 */
import React, { useEffect, useState } from 'react';

export type PageId = 'home' | 'history' | 'school' | 'encyclopedia' | 'timelines' | 'tools' | 'quiz' | 'about';
export const PAGES: PageId[] = ['home', 'history', 'school', 'encyclopedia', 'timelines', 'tools', 'quiz', 'about'];

export interface Route {
  page: PageId | 'notfound';
  /** first sub-path segment, e.g. the chapter id */
  id?: string;
  /** second sub-path segment, if any */
  sub?: string;
}

export function parseHash(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  if (!parts.length) return { page: 'home' };
  const [p, id, sub] = parts;
  return (PAGES as string[]).includes(p) ? { page: p as PageId, id, sub } : { page: 'notfound' };
}

export function href(page: PageId, id?: string, sub?: string): string {
  return '#/' + [page === 'home' ? '' : page, id, sub].filter(Boolean).map((x) => encodeURIComponent(x!)).join('/');
}

export function navigate(to: string) {
  if (window.location.hash === to) return;
  window.location.hash = to;
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  useEffect(() => {
    const on = () => {
      setRoute(parseHash(window.location.hash));
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

/** Scroll to top on page changes (but not when only an in-page anchor is used). */
export function useScrollTopOn(key: string) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [key]);
}

export const Link: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }> = ({ to, children, ...rest }) => (
  <a href={to} {...rest}>
    {children}
  </a>
);
