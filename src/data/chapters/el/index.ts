import type { ChapterText } from '../../types';
import { ch21 } from './ch21';
import { ch20 } from './ch20';
import { ch19 } from './ch19';
import { ch18 } from './ch18';
import { ch17 } from './ch17';
import { ch16 } from './ch16';
import { ch15 } from './ch15';
import { ch14 } from './ch14';
import { ch13 } from './ch13';
import { ch12 } from './ch12';
import { ch11 } from './ch11';
import { ch10 } from './ch10';
import { ch09 } from './ch09';
import { ch08 } from './ch08';
import { ch07 } from './ch07';
import { ch06 } from './ch06';
import { ch05 } from './ch05';
import { ch04 } from './ch04';
import { ch01 } from './ch01';
import { ch02 } from './ch02';
import { ch03 } from './ch03';

/**
 * Ελληνικά κείμενα κεφαλαίων.
 * Το κεφ. 1 είναι η πλήρης εκδοχή (δείγμα). Τα υπόλοιπα είναι σύντομες
 * εκδοχές (από το αρχικό κείμενο της εφαρμογής) ή περιγράμματα.
 */
export const CHAPTERS_EL: Record<string, ChapterText> = {
  'camera-obscura': ch01,

  niepce: ch02,

  daguerre: ch03,

  talbot: ch04,

  'collodion-portrait': ch05,

  'travel-war': ch06,

  motion: ch07,

  kodak: ch08,

  pictorialism: ch09,

  straight: ch10,

  f64: ch11,

  'avant-garde': ch12,

  documentary: ch13,

  photojournalism: ch14,

  street: ch15,

  'fashion-portrait': ch16,

  'greece-1': ch17,

  'greece-2': ch18,

  'color-contemporary': ch19,

  'digital-ai': ch20,

  guide: ch21,
};
