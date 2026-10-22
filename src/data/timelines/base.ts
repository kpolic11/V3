/**
 * Language-neutral data for the four timelines.
 * tracks: tech = inventions & technology · art = art & movements · society = society & history
 * major: shown in the general (essential) timeline
 * chapter: the history chapter where the event is discussed
 */
export type TimelineTrack = 'tech' | 'art' | 'society';

export interface TimelineEventBase {
  id: string;
  /** sortable year (negative = BC) */
  year: number;
  /** optional display label instead of the year (e.g. "c. 1826") */
  label?: string;
  tracks: TimelineTrack[];
  major?: boolean;
  chapter?: string;
}

const e = (id: string, year: number, tracks: TimelineTrack[], opts: { label?: string; major?: boolean; chapter?: string } = {}): TimelineEventBase => ({
  id,
  year,
  tracks,
  ...opts,
});

export const TIMELINE_EVENTS: TimelineEventBase[] = [
  /* ---------- before photography ---------- */
  e('mozi', -400, ['tech'], { chapter: 'camera-obscura' }),
  e('alhazen', 1011, ['tech'], { label: '~1011–1021', chapter: 'camera-obscura' }),
  e('frisius', 1545, ['tech', 'art'], { chapter: 'camera-obscura' }),
  e('cardano', 1550, ['tech'], { chapter: 'camera-obscura' }),
  e('zahn', 1685, ['tech'], { chapter: 'camera-obscura' }),
  e('schulze', 1727, ['tech'], { chapter: 'camera-obscura' }),
  e('wedgwood', 1802, ['tech'], { chapter: 'camera-obscura' }),

  /* ---------- 19th century ---------- */
  e('niepce-window', 1826, ['tech', 'art'], { label: '~1826–27', major: true, chapter: 'niepce' }),
  e('talbot-window', 1835, ['tech'], { chapter: 'talbot' }),
  e('boulevard', 1838, ['art', 'society'], { chapter: 'daguerre' }),
  e('daguerre-public', 1839, ['tech', 'society'], { major: true, chapter: 'daguerre' }),
  e('herschel-word', 1839, ['tech'], { chapter: 'talbot' }),
  e('cornelius', 1839, ['art', 'society'], { chapter: 'daguerre' }),
  e('acropolis-1839', 1839, ['society'], { label: '1839–40', chapter: 'daguerre' }),
  e('petzval', 1840, ['tech'], { chapter: 'daguerre' }),
  e('calotype', 1841, ['tech'], { major: true, chapter: 'talbot' }),
  e('atkins', 1843, ['art', 'tech'], { chapter: 'talbot' }),
  e('hill-adamson', 1843, ['art'], { label: '1843–1847', chapter: 'talbot' }),
  e('pencil-nature', 1844, ['art'], { chapter: 'talbot' }),
  e('collodion', 1851, ['tech'], { major: true, chapter: 'collodion-portrait' }),
  e('carte-visite', 1854, ['tech', 'society'], { chapter: 'collodion-portrait' }),
  e('fenton', 1855, ['society'], { major: true, chapter: 'travel-war' }),
  e('rejlander', 1857, ['art'], { chapter: 'collodion-portrait' }),
  e('maxwell', 1861, ['tech'], { major: true, chapter: 'color-contemporary' }),
  e('antietam', 1862, ['society'], { major: true, chapter: 'travel-war' }),
  e('cameron', 1864, ['art'], { chapter: 'collodion-portrait' }),
  e('yellowstone', 1871, ['society', 'art'], { chapter: 'travel-war' }),
  e('dry-plate', 1871, ['tech'], { chapter: 'kodak' }),
  e('muybridge', 1878, ['tech', 'art'], { major: true, chapter: 'motion' }),
  e('halftone', 1880, ['tech', 'society'], { chapter: 'photojournalism' }),
  e('kodak', 1888, ['tech', 'society'], { major: true, chapter: 'kodak' }),
  e('riis', 1890, ['society'], { chapter: 'documentary' }),
  e('linked-ring', 1892, ['art'], { chapter: 'pictorialism' }),
  e('cinema', 1895, ['tech'], { chapter: 'motion' }),
  e('olympics-1896', 1896, ['society'], { chapter: 'greece-1' }),

  /* ---------- 20th century ---------- */
  e('brownie', 1900, ['tech', 'society'], { chapter: 'kodak' }),
  e('photo-secession', 1902, ['art'], { major: true, chapter: 'straight' }),
  e('camera-work', 1903, ['art'], { label: '1903–1917', chapter: 'straight' }),
  e('boissonnas', 1903, ['art', 'society'], { chapter: 'greece-1' }),
  e('autochrome', 1907, ['tech', 'art'], { major: true, chapter: 'color-contemporary' }),
  e('steerage', 1907, ['art'], { chapter: 'straight' }),
  e('hine', 1908, ['society'], { label: '1908–1924', major: true, chapter: 'documentary' }),
  e('strand-1917', 1917, ['art'], { chapter: 'straight' }),
  e('rayographs', 1922, ['art'], { chapter: 'avant-garde' }),
  e('leica', 1925, ['tech'], { major: true, chapter: 'photojournalism' }),
  e('moholy', 1925, ['art'], { chapter: 'avant-garde' }),
  e('nellys-parthenon', 1925, ['art'], { label: '1925–1930', chapter: 'greece-1' }),
  e('atget-abbott', 1927, ['art'], { chapter: 'avant-garde' }),
  e('film-und-foto', 1929, ['art'], { chapter: 'avant-garde' }),
  e('sander', 1929, ['art', 'society'], { chapter: 'documentary' }),
  e('f64', 1932, ['art'], { major: true, chapter: 'f64' }),
  e('fsa', 1935, ['society', 'art'], { label: '1935–1944', chapter: 'documentary' }),
  e('kodachrome', 1935, ['tech'], { major: true, chapter: 'color-contemporary' }),
  e('life', 1936, ['society'], { major: true, chapter: 'photojournalism' }),
  e('migrant-mother', 1936, ['society', 'art'], { major: true, chapter: 'documentary' }),
  e('moma-1937', 1937, ['art'], { chapter: 'straight' }),
  e('occupation-greece', 1941, ['society'], { label: '1941–1944', chapter: 'greece-2' }),
  e('dday', 1944, ['society'], { chapter: 'photojournalism' }),
  e('magnum', 1947, ['society', 'art'], { major: true, chapter: 'photojournalism' }),
  e('polaroid', 1948, ['tech', 'society'], { chapter: 'kodak' }),
  e('decisive-moment', 1952, ['art'], { major: true, chapter: 'street' }),
  e('family-of-man', 1955, ['art', 'society'], { major: true, chapter: 'photojournalism' }),
  e('emmett-till', 1955, ['society'], { chapter: 'photojournalism' }),
  e('kirsch', 1957, ['tech'], { chapter: 'digital-ai' }),
  e('the-americans', 1958, ['art'], { label: '1958–59', major: true, chapter: 'street' }),
  e('nikon-f', 1959, ['tech'], { chapter: 'photojournalism' }),
  e('new-documents', 1967, ['art'], { chapter: 'street' }),
  e('provoke', 1968, ['art'], { label: '1968–69', chapter: 'street' }),
  e('earthrise', 1968, ['society', 'tech'], { major: true, chapter: 'color-contemporary' }),
  e('ccd', 1969, ['tech'], { chapter: 'digital-ai' }),
  e('napalm', 1972, ['society'], { chapter: 'photojournalism' }),
  e('new-topographics', 1975, ['art'], { chapter: 'color-contemporary' }),
  e('sasson', 1975, ['tech'], { major: true, chapter: 'digital-ai' }),
  e('eggleston-moma', 1976, ['art'], { major: true, chapter: 'color-contemporary' }),
  e('film-stills', 1977, ['art'], { label: '1977–1980', chapter: 'color-contemporary' }),
  e('autofocus', 1977, ['tech'], { chapter: 'digital-ai' }),
  e('ballad', 1986, ['art', 'society'], { chapter: 'color-contemporary' }),
  e('tank-man', 1989, ['society'], { chapter: 'photojournalism' }),
  e('photoshop', 1990, ['tech', 'art'], { major: true, chapter: 'digital-ai' }),
  e('pale-blue-dot', 1990, ['society', 'tech'], { chapter: 'digital-ai' }),
  e('dcs100', 1991, ['tech'], { chapter: 'digital-ai' }),
  e('thessaloniki-museum', 1997, ['art'], { label: '1997–98', chapter: 'greece-2' }),
  e('rhein-ii', 1999, ['art'], { chapter: 'color-contemporary' }),

  /* ---------- 21st century ---------- */
  e('camera-phone', 2000, ['tech', 'society'], { major: true, chapter: 'digital-ai' }),
  e('abu-ghraib', 2004, ['society'], { chapter: 'digital-ai' }),
  e('iphone', 2007, ['tech', 'society'], { chapter: 'digital-ai' }),
  e('vivian-maier', 2009, ['art'], { chapter: 'street' }),
  e('instagram', 2010, ['society', 'tech'], { major: true, chapter: 'digital-ai' }),
  e('kodak-bankrupt', 2012, ['tech', 'society'], { chapter: 'digital-ai' }),
  e('portrait-mode', 2016, ['tech'], { chapter: 'digital-ai' }),
  e('black-hole', 2019, ['tech', 'society'], { chapter: 'digital-ai' }),
  e('citizen-witness', 2020, ['society'], { chapter: 'digital-ai' }),
  e('ai-images', 2022, ['tech', 'art', 'society'], { major: true, chapter: 'digital-ai' }),
  e('ai-fakes', 2023, ['society'], { chapter: 'digital-ai' }),
  e('content-credentials', 2023, ['tech', 'society'], { chapter: 'digital-ai' }),
];
