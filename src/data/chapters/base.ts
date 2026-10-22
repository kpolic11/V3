import type { ChapterBase } from '../types';
import { MEDIA, STOCK, MediaKey } from '../media';

const m = (key: MediaKey) => ({
  imageUrl: MEDIA[key].url,
  imageCredit: MEDIA[key].credit,
  imageFit: ('fit' in MEDIA[key] ? (MEDIA[key] as { fit?: 'cover' | 'contain' }).fit : 'cover') as 'cover' | 'contain',
});

/**
 * The map of the whole series: 20 history chapters + the practical guide.
 * status: 'full' = long documentary version written, 'short' = earlier short
 * text, 'planned' = outline only. Update the status as chapters are written.
 */
export const CHAPTER_BASE: ChapterBase[] = [
  { id: 'camera-obscura', number: 1, part: 'birth', iconName: 'Eye', status: 'full', widget: 'camera-obscura', ...m('kircher1646') },
  { id: 'niepce', number: 2, part: 'birth', iconName: 'Sun', status: 'full', ...m('leGras') },
  { id: 'daguerre', number: 3, part: 'birth', iconName: 'Sparkles', status: 'full', ...m('boulevardDuTemple') },
  { id: 'talbot', number: 4, part: 'birth', iconName: 'Copy', status: 'full', ...m('openDoor') },
  { id: 'collodion-portrait', number: 5, part: 'nineteenth', iconName: 'User', status: 'full', ...m('cameronHerschel') },
  { id: 'travel-war', number: 6, part: 'nineteenth', iconName: 'Map', status: 'full', ...m('fentonValley') },
  { id: 'motion', number: 7, part: 'nineteenth', iconName: 'Zap', status: 'full', ...m('muybridgeGallop') },
  { id: 'kodak', number: 8, part: 'nineteenth', iconName: 'Camera', status: 'full', ...m('kodakAd1888') },
  { id: 'pictorialism', number: 9, part: 'art', iconName: 'Palette', status: 'full', ...m('steichenPond') },
  { id: 'straight', number: 10, part: 'art', iconName: 'Focus', status: 'full', ...m('steerage') },
  { id: 'f64', number: 11, part: 'art', iconName: 'Mountain', status: 'full', ...m('adamsTetons') },
  { id: 'avant-garde', number: 12, part: 'art', iconName: 'Shapes', status: 'full', imageUrl: STOCK.avantGarde, imageFit: 'cover' },
  { id: 'documentary', number: 13, part: 'witness', iconName: 'FileText', status: 'full', ...m('migrantMother') },
  { id: 'photojournalism', number: 14, part: 'witness', iconName: 'Newspaper', status: 'full', ...m('leicaI') },
  { id: 'street', number: 15, part: 'witness', iconName: 'Footprints', status: 'full', imageUrl: STOCK.street, imageFit: 'cover' },
  { id: 'fashion-portrait', number: 16, part: 'witness', iconName: 'Shirt', status: 'full', imageUrl: STOCK.studio, imageFit: 'cover' },
  { id: 'greece-1', number: 17, part: 'greece', iconName: 'Landmark', status: 'full', ...m('boissonnasPropylaea') },
  { id: 'greece-2', number: 18, part: 'greece', iconName: 'Heart', status: 'full', imageUrl: STOCK.rangefinder, imageFit: 'cover' },
  { id: 'color-contemporary', number: 19, part: 'today', iconName: 'Palette', status: 'full', ...m('tartanRibbon') },
  { id: 'digital-ai', number: 20, part: 'today', iconName: 'Cpu', status: 'full', ...m('sassonCamera') },
  { id: 'guide', number: 21, part: 'guide', iconName: 'Sliders', status: 'full', imageUrl: STOCK.camera, imageFit: 'cover' },
];
