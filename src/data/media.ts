/**
 * Historical images used in the app. All are public-domain (or CC0) files on
 * Wikimedia Commons, checked by title. Thumbnails use Wikimedia's standard
 * widths (960 / 1280 px). `fit: 'contain'` = show the whole image (small or
 * unusual proportions) instead of cropping it.
 */
export interface MediaItem {
  url: string;
  credit: string;
  fit?: 'cover' | 'contain';
}

const C = 'https://upload.wikimedia.org/wikipedia/commons';
const thumb = (path: string, file: string, w = 1280) => `${C}/thumb/${path}/${file}/${w}px-${file}`;

export const MEDIA = {
  kircher1646: {
    url: thumb('8/85', '1646_Athanasius_Kircher_-_Camera_obscura.jpg'),
    credit: 'Athanasius Kircher, Ars Magna Lucis et Umbrae, 1646 · Wikimedia Commons (public domain)',
  },
  frisius1545: {
    url: `${C}/5/57/1545_gemma_frisius_-_camera_obscura_-_121704_1_1.png`,
    credit: 'Gemma Frisius, De Radio Astronomico et Geometrico, 1545 · Wikimedia Commons (public domain)',
    fit: 'contain',
  },
  leGras: {
    url: thumb('5/5c', 'View_from_the_Window_at_Le_Gras%2C_Joseph_Nic%C3%A9phore_Ni%C3%A9pce.jpg'),
    credit: 'Joseph Nicéphore Niépce, c. 1826–27 · Harry Ransom Center · Wikimedia Commons (public domain)',
  },
  boulevardDuTemple: {
    url: thumb('d/d3', 'Boulevard_du_Temple_by_Daguerre.jpg'),
    credit: 'Louis Daguerre, Boulevard du Temple, 1838 · Wikimedia Commons (public domain)',
  },
  openDoor: {
    url: thumb('3/39', 'The_Open_Door_MET_DP148629.jpg'),
    credit: 'William Henry Fox Talbot, The Open Door, 1844 · The Met · Wikimedia Commons (public domain)',
  },
  cameronHerschel: {
    url: thumb('3/31', 'Portrait_of_Sir_John_Herschel_by_Julia_Margaret_Cameron%2C_1867.jpg', 960),
    credit: 'Julia Margaret Cameron, Sir John Herschel, 1867 · Wikimedia Commons (public domain)',
    fit: 'contain',
  },
  fentonValley: {
    url: thumb('6/65', 'Roger_Fenton_-_Shadow_of_the_Valley_of_Death.jpg'),
    credit: 'Roger Fenton, The Valley of the Shadow of Death, 1855 · Wikimedia Commons (public domain)',
  },
  muybridgeGallop: {
    url: `${C}/d/d7/Muybridge_horse_gallop_animated_2.gif`,
    credit: 'Eadweard Muybridge, The Horse in Motion, 1878 (animation) · Wikimedia Commons (public domain)',
    fit: 'contain',
  },
  kodakAd1888: {
    url: `${C}/3/3b/Kodak_ad_1888.GIF`,
    credit: 'Kodak advertisement, 1888 · Wikimedia Commons (public domain)',
    fit: 'contain',
  },
  steichenPond: {
    url: thumb('c/c8', 'ThePondMoonlight.jpg', 960),
    credit: 'Edward Steichen, The Pond—Moonlight, 1904 · Wikimedia Commons (public domain)',
  },
  steerage: {
    url: thumb('6/6b', 'Alfred_Stieglitz_-_The_Steerage_-_Google_Art_Project%2C_from_Getty.jpg', 960),
    credit: 'Alfred Stieglitz, The Steerage, 1907 · Getty Museum · Wikimedia Commons (public domain)',
    fit: 'contain',
  },
  strandWallStreet: {
    url: thumb('7/7c', 'Paul_Strand%2C_Wall_Street%2C_New_York_City%2C_1915.jpg'),
    credit: 'Paul Strand, Wall Street, 1915 · Wikimedia Commons (public domain)',
  },
  adamsTetons: {
    url: thumb('2/21', 'Adams_The_Tetons_and_the_Snake_River.jpg'),
    credit: 'Ansel Adams, The Tetons and the Snake River, 1942 · U.S. National Archives · Wikimedia Commons (public domain)',
  },
  migrantMother: {
    url: thumb('5/54', 'Lange-MigrantMother02.jpg', 960),
    credit: 'Dorothea Lange, Migrant Mother, 1936 · Library of Congress · Wikimedia Commons (public domain)',
    fit: 'contain',
  },
  banditsRoost: {
    url: thumb('c/cd', 'Bandits_Roost%2C_59_and_a_half_Mulberry_Street_-_Original.jpg', 960),
    credit: 'Jacob Riis, Bandits’ Roost, 1888 · Wikimedia Commons (public domain)',
    fit: 'contain',
  },
  leicaI: {
    url: thumb('8/83', 'Leica_I_1925.png'),
    credit: 'Leica I, 1925 · Wikimedia Commons',
    fit: 'contain',
  },
  boissonnasPropylaea: {
    url: `${C}/e/ec/Fr%C3%A9d%C3%A9ric_Boissonnas_-_View_of_the_Athenian_Plain_from_the_Propylaea_%281907%29.jpg`,
    credit: 'Fred Boissonnas, View of the Athenian Plain from the Propylaea, 1907 · Wikimedia Commons (public domain)',
  },
  moraitesAthens: {
    url: thumb('3/36', 'View_of_Athens_by_Petros_Moraites%2C_1870.jpg'),
    credit: 'Petros Moraites, View of Athens, 1870 · Wikimedia Commons (public domain)',
  },
  tartanRibbon: {
    url: `${C}/7/7f/Tartan_Ribbon.jpg`,
    credit: 'James Clerk Maxwell & Thomas Sutton, Tartan Ribbon, 1861 · Wikimedia Commons (public domain)',
    fit: 'contain',
  },
  sassonCamera: {
    url: thumb('4/47', 'Kodak_Sasson_BL.jpg'),
    credit: 'The first Kodak digital camera prototype (Steven Sasson, 1975) · Wikimedia Commons',
    fit: 'contain',
  },
  /* Portraits for the pioneers gallery */
  pNiepce: { url: thumb('e/e7', 'Posthumous_portrait_of_Nic%C3%A9phore_Ni%C3%A9pce.jpg', 960), credit: 'Wikimedia Commons (public domain)' },
  pDaguerre: { url: `${C}/9/94/Louis_Daguerre_2_%28cropped%29.jpg`, credit: 'Wikimedia Commons (public domain)' },
  pTalbot: { url: `${C}/3/34/John_Moffat_-_William_Henry_Fox_Talbot%2C_1864_%28cropped%29.jpg`, credit: 'John Moffat, 1864 · Wikimedia Commons (public domain)' },
  pCameron: { url: thumb('d/db', 'Julia_Margaret_Cameron_MET_DP114480_%28cropped%29.jpg', 960), credit: 'The Met · Wikimedia Commons (public domain)' },
  pNadar: { url: thumb('c/cd', 'Self-portrait_of_Nadar.jpg', 960), credit: 'Wikimedia Commons (public domain)' },
  pMuybridge: { url: `${C}/7/73/Eadweard_Muybridge_Portrait.jpg`, credit: 'Wikimedia Commons (public domain)' },
  pEastman: { url: thumb('1/18', 'George_Eastman_founder_of_Eastman_Kodak_Company.jpg', 960), credit: 'Wikimedia Commons (public domain)' },
  pStieglitz: { url: thumb('f/ff', 'Gertrude_K%C3%A4sebier%2C_Alfred_Stieglitz%2C_1902%2C_NGA_132864.jpg', 960), credit: 'Gertrude Käsebier, 1902 · National Gallery of Art (CC0)' },
  pLange: { url: thumb('5/56', 'Dorothea_Lange_1936_portrait.jpg', 960), credit: 'Wikimedia Commons (public domain)' },
  pRiis: { url: `${C}/6/6d/Jacob_Riis_portrait.jpg`, credit: 'Wikimedia Commons (public domain)' },
  pHine: { url: `${C}/e/ed/Lewis_Hine_selfportrait.jpg`, credit: 'Wikimedia Commons (public domain)' },
  pFenton: { url: thumb('e/e7', 'Roger_Fenton_portrait_in_Zouave_uniform.jpg', 960), credit: 'Wikimedia Commons (public domain)' },
  pAlhazen: { url: `${C}/9/90/Ibn_al-Haytham.jpg`, credit: 'Wikimedia Commons (public domain)' },
} satisfies Record<string, MediaItem>;

export type MediaKey = keyof typeof MEDIA;

/** Generic, non-historical illustration photos (Unsplash) for chapters without a public-domain image */
export const STOCK = {
  darkRoom: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
  rangefinder: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1200&q=80',
  street: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
  studio: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
  avantGarde: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  camera: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=80',
};
