import type { ChapterText } from '../../types';
import { ch01 } from './ch01';

/** English chapter texts. Chapter 1 is the full version; others are short versions or outlines. */
export const CHAPTERS_EN: Record<string, ChapterText> = {
  'camera-obscura': ch01,

  niepce: {
    title: 'Niépce and the First Photograph',
    subtitle: 'The chemistry of light and the view from a window in Burgundy',
    era: '1816 – 1833',
    summary:
      'A stubborn inventor in the French countryside spends years testing substances that react to light, until he holds the first surviving photograph in his hands.',
    sections: [
      {
        heading: '',
        paragraphs: [
          'Since the eighteenth century, scientists had known that some silver salts darken when light hits them. The hard part was stopping the reaction, so that the whole image would not turn black.',
          'Around 1826, a French inventor, Joseph Nicéphore Niépce, tried something different. He pointed a camera obscura at the window of his house on the Le Gras estate. Inside he placed a metal plate coated with bitumen of Judea, a substance that hardens when sunlight falls on it. The exposure lasted many hours, perhaps days. Then he washed the plate with a solvent, and the parts that had not been lit dissolved away. The result was blurry, a shadowy image of roofs and walls. But it was the oldest surviving photograph taken from nature.',
        ],
      },
    ],
    keyQuote: {
      text: 'The discovery I have made, and which I call Heliography, consists in reproducing spontaneously, by the action of light, the images received in the camera obscura.',
      author: 'Nicéphore Niépce, 1827',
    },
    keyConcepts: ['Heliography', 'Bitumen of Judea', 'Silver salts', 'View from the Window at Le Gras'],
    historicalFigures: ['Nicéphore Niépce', 'Claude Niépce', 'Louis Daguerre'],
    imageCaption: 'Nicéphore Niépce, View from the Window at Le Gras, c. 1826–27. The oldest surviving photograph taken from nature.',
    outline: [
      'Niépce and his brother: inventors in an age of revolutions',
      'From lithography to heliography: why he wanted to “copy” images with light',
      'How the Le Gras plate was made, step by step',
      'The trip to London, the rejection, and the partnership with Daguerre (1829)',
      'The plate that was lost and found again in the twentieth century',
    ],
  },

  daguerre: {
    title: 'Daguerre and 1839: Photography Is Announced to the World',
    subtitle: 'The dazzling detail of the daguerreotype and the first person in a photograph',
    era: '1829 – 1850',
    summary:
      'A Parisian scene painter turns Niépce’s invention into something the whole world can use. In 1839 photography is officially born.',
    sections: [
      {
        heading: '',
        paragraphs: [
          'Niépce worked with a Parisian scene painter, Louis Daguerre. After Niépce died in 1833, Daguerre continued the research alone. In 1839 he presented the “daguerreotype” in Paris. It was a silver-plated copper plate, polished like a mirror, with astonishing detail. You could read shop signs with a magnifying glass. And the exposure time fell from hours to minutes.',
          'The French government bought the invention and announced it publicly, so that anyone could use it. That is why 1839 is considered the birth year of photography. Within months, “daguerreotypomania” had spread across Europe and America.',
          'There is a lovely story from that time. In one of his first pictures, Daguerre photographed a busy Paris boulevard from above. Yet in the image the street looks almost empty. The carriages and passers-by moved too fast to be recorded. Only one man, who had stopped to have his boots polished, stayed still long enough. And so, without knowing it, he became one of the first people ever to appear in a photograph.',
        ],
      },
    ],
    keyQuote: {
      text: 'The daguerreotype is not merely an instrument which serves to draw nature; it is a chemical and physical process which gives her the power to reproduce herself.',
      author: 'Louis Daguerre, 1838',
    },
    keyConcepts: ['Daguerreotype', 'Iodine & mercury vapour', 'Boulevard du Temple', 'The 1839 “gift to the world”'],
    historicalFigures: ['Louis Daguerre', 'Nicéphore Niépce', 'François Arago'],
    imageCaption: 'Louis Daguerre, Boulevard du Temple, 1838. Bottom left, a man stands still while his boots are polished.',
    outline: [
      'Daguerre of the Diorama: a man of spectacle',
      'How a daguerreotype was made: iodine, mercury and salt',
      'The session of 19 August 1839 and François Arago',
      'Daguerreotypomania: the first portrait studios and the caricatures',
      'Why every daguerreotype was unique and mirror-reversed',
    ],
  },

  talbot: {
    title: 'Talbot, the Negative and the Word “Photography”',
    subtitle: 'The idea of the negative that ruled for a hundred and fifty years',
    era: '1834 – 1850',
    summary:
      'In England, a scholar discovers a completely different path: pictures on paper that can be reproduced as many times as you like.',
    sections: [
      {
        heading: '',
        paragraphs: [
          'The daguerreotype had a serious drawback: every image was unique. There was no way to make a copy. At exactly the same time in England, the scholar William Henry Fox Talbot was developing a completely different method. Instead of a metal plate he used paper soaked in silver salts. The image that came out was “negative”: the bright parts came out dark and the dark parts bright.',
          'But from that negative you could print as many positive copies as you wanted. He named his improved method of 1841 the “calotype”, from the Greek word kalos, “beautiful”. His idea, negative and positive, ruled photography for more than a hundred and fifty years, until the digital age.',
        ],
      },
    ],
    keyQuote: {
      text: 'The plates of the present work are impressed by the agency of Light alone, without any aid whatever from the artist’s pencil.',
      author: 'William Henry Fox Talbot, The Pencil of Nature, 1844',
    },
    keyConcepts: ['Photogenic drawing', 'Calotype', 'Negative / positive', 'The Pencil of Nature'],
    historicalFigures: ['William Henry Fox Talbot', 'John Herschel', 'Hippolyte Bayard'],
    imageCaption: 'William Henry Fox Talbot, The Open Door, 1844, from the first book illustrated with photographs, The Pencil of Nature.',
    outline: [
      'Lake Como and the Talbot who could not draw',
      '“Photogenic drawings”: leaves, lace and the first negative (1835)',
      'John Herschel, hypo, and the words “photography”, “negative”, “positive”',
      'The calotype and the first photographic book',
      'The forgotten inventors: Hippolyte Bayard and Hercule Florence',
    ],
  },

  'collodion-portrait': {
    title: 'Glass Plates and the Nineteenth-Century Portrait',
    subtitle: 'Wet collodion, Nadar and Julia Margaret Cameron',
    era: '1851 – 1880',
    summary:
      'Photography becomes faster and cheaper, and portrait studios fill up. But some want more than a likeness: they want the soul.',
    sections: [
      {
        heading: '',
        paragraphs: [
          'In 1851 the “wet collodion” process appeared, using glass plates. It combined the clarity of the daguerreotype with the ability to print copies, and exposure times fell to a few seconds. There was one difficulty: the plate had to be prepared, exposed and developed while still wet.',
          'In Paris, Nadar became famous for his portraits of the artists of his day, with plain backgrounds and natural light, showing character and not just clothes. In England, Julia Margaret Cameron took up a camera at the age of 48 and made close, slightly blurred portraits. Her contemporaries called them “mistakes”. Today they are considered masterpieces.',
        ],
      },
    ],
    keyQuote: {
      text: 'I longed to arrest all beauty that came before me, and at length the longing has been satisfied.',
      author: 'Julia Margaret Cameron, Annals of My Glass House, 1874',
    },
    keyConcepts: ['Wet collodion', 'Carte de visite', 'Character portrait', 'Soft focus'],
    historicalFigures: ['Frederick Scott Archer', 'Nadar', 'Julia Margaret Cameron', 'André-Adolphe-Eugène Disdéri'],
    imageCaption: 'Julia Margaret Cameron, Sir John Herschel, 1867.',
    outline: [
      'Wet collodion: chemistry in a travelling darkroom',
      'The carte de visite and photography’s first “viral” craze',
      'Nadar: portraits, balloons and the first aerial photographer',
      'Julia Margaret Cameron: the “wrong” focus as art',
      'How people posed: head clamps, stillness and serious faces',
    ],
  },

  'travel-war': {
    title: 'Travel, War and Documentation',
    subtitle: 'Photography leaves the studio to show the world',
    era: '1849 – 1880',
    summary:
      'Photographers haul tent-darkrooms to Egypt, to the Acropolis and to battlefields. For the first time the public sees places and events it will never see in person, and the debate begins about what a “true” photograph is.',
    sections: [],
    keyConcepts: ['Travel photography', 'War photography', 'Staged or authentic image', 'Archaeological documentation'],
    historicalFigures: ['Roger Fenton', 'Mathew Brady', 'Alexander Gardner', 'Maxime Du Camp', 'Philippos Margaritis'],
    imageCaption: 'Roger Fenton, The Valley of the Shadow of Death, Crimean War, 1855.',
    outline: [
      'Maxime Du Camp and Flaubert in Egypt: the East through the lens',
      'Roger Fenton in the Crimea: why we see cannonballs, not battles',
      'The American Civil War: Brady, Gardner and the first dead in photographs',
      'Staged or real? The first great dispute over the truth of the image',
      'The Acropolis through the lens: foreign travellers and the first Greek photographers',
    ],
  },

  motion: {
    title: 'The Galloping Horse: Photography Freezes Motion',
    subtitle: 'Muybridge, Marey and the road to cinema',
    era: '1872 – 1895',
    summary:
      'Photography begins to show what the eye cannot see: a horse in mid-air, the beat of a bird’s wing, a human stride.',
    sections: [
      {
        heading: '',
        paragraphs: [
          'In 1878, Eadweard Muybridge set up a row of cameras along a racetrack in California. Each camera fired as the horse passed. His pictures showed that a galloping horse lifts all four hooves off the ground for an instant, something no painter had ever shown correctly.',
          'Photography began to reveal things invisible to the human eye. And when Muybridge’s pictures were projected one after another, the horse started running again. It was a forerunner of cinema.',
        ],
      },
    ],
    keyConcepts: ['Chronophotography', 'Freezing motion', 'Shutter speed', 'Forerunner of cinema'],
    historicalFigures: ['Eadweard Muybridge', 'Leland Stanford', 'Étienne-Jules Marey'],
    imageCaption: 'Eadweard Muybridge, The Horse in Motion, 1878, shown as an animation.',
    outline: [
      'Leland Stanford’s bet (or the legend of the bet)',
      'Twelve cameras, tripwires and electric shutters',
      'Étienne-Jules Marey and the “photographic gun”',
      'The zoopraxiscope and the road to the Lumière brothers',
      'What it teaches us about shutter speed today',
    ],
  },

  kodak: {
    title: 'Kodak: “You Press the Button”',
    subtitle: 'Roll film, the one-dollar Brownie and the birth of the family album',
    era: '1888 – 1930',
    summary:
      'An American businessman makes photography something that needs neither chemistry nor training. Photography enters every home.',
    sections: [
      {
        heading: '',
        paragraphs: [
          'Dry gelatine plates arrived in the 1870s, but the great revolution came in 1888. George Eastman launched the first Kodak camera. It was a small box, loaded at the factory with film for a hundred pictures. When the film ran out you sent it back, and they returned your prints along with the camera, reloaded. The slogan was: “You press the button, we do the rest.”',
          'In 1900 Kodak launched the Brownie, which sold for just one dollar and was aimed even at children. Photography became popular. The family album was born, with birthdays, weddings and holidays by the sea.',
        ],
      },
    ],
    keyConcepts: ['Dry gelatine plate', 'Roll film', 'Kodak Brownie', 'Amateur photography'],
    historicalFigures: ['George Eastman', 'Frank Brownell'],
    imageCaption: 'Advertisement for the first Kodak camera, 1888.',
    outline: [
      'Eastman, a bank clerk who wanted to photograph his holiday',
      'Why “Kodak”? A word invented to be pronounced anywhere',
      'The Brownie: the children’s camera',
      'Photography as memory: holidays, birthdays and “Kodak moments”',
      'What photography gained and lost when it became easy',
    ],
  },

  pictorialism: {
    title: 'Pictorialism: “Is Photography Art?”',
    subtitle: 'Mist, soft focus and the claim to a place beside painting',
    era: '1885 – 1914',
    summary:
      'When anyone can press a button, some photographers want to prove that photography can be art. Their first path: to make it look like a painting.',
    sections: [
      {
        heading: '',
        paragraphs: [
          'From the very beginning there was a question: is photography art, or just a machine that copies reality? In 1859 the poet Baudelaire wrote that photography should remain the humble servant of the arts and sciences.',
          'In the late nineteenth century “pictorialism” was born. The pictorialists made photographs look like paintings, with soft focus, mist and hand-made printing techniques, so that every print was unique. Edward Steichen’s The Pond—Moonlight of 1904 is one of the best-known works of the movement.',
        ],
      },
    ],
    keyConcepts: ['Pictorialism', 'Soft focus', 'Gum bichromate printing', 'Photo-Secession'],
    historicalFigures: ['Charles Baudelaire', 'Henry Peach Robinson', 'Edward Steichen', 'Gertrude Käsebier'],
    imageCaption: 'Edward Steichen, The Pond—Moonlight, 1904.',
    outline: [
      'Baudelaire and the painters’ fear',
      'Composite pictures: the “paintings” of Rejlander and Robinson',
      'Platinum, gum and brush: how a pictorialist print was made',
      'Gertrude Käsebier and the women of the movement',
      'The end of an era: why pictorialism was left behind',
    ],
  },

  straight: {
    title: 'Stieglitz and “Straight” Photography',
    subtitle: 'Photography stops imitating painting',
    era: '1902 – 1930',
    summary:
      'In New York, a photographer, publisher and gallerist puts photography next to Picasso, and then turns it towards something entirely its own.',
    sections: [
      {
        heading: '',
        paragraphs: [
          'In the early twentieth century, Alfred Stieglitz opened the gallery in New York that became known as “291”, after its number on Fifth Avenue. There he showed photographs beside works by Picasso and Matisse, and published the magazine Camera Work.',
          'Soon, though, Stieglitz and the photographers around him understood something essential: photography did not need to imitate painting. It had its own power: clarity, detail and the truth of the moment. And so “straight photography” was born.',
        ],
      },
    ],
    keyConcepts: ['Straight photography', 'Gallery 291', 'Camera Work', 'Modernism'],
    historicalFigures: ['Alfred Stieglitz', 'Paul Strand', 'Georgia O’Keeffe', 'Edward Steichen'],
    imageCaption: 'Alfred Stieglitz, The Steerage, 1907.',
    outline: [
      'Stieglitz, the Photo-Secession and Camera Work',
      'The Steerage (1907): the picture he considered his best',
      'Paul Strand: Wall Street and the clean geometry of the city',
      'Gallery 291 brings Picasso to America',
      'What “straight” means, and why no photograph is ever fully neutral',
    ],
  },

  f64: {
    title: 'Group f/64 and Modernism',
    subtitle: 'Absolute sharpness, from foreground to horizon',
    era: '1920 – 1950',
    summary:
      'In California, a group of photographers turns the smallest aperture into a slogan, and Ansel Adams devises a way to control every shade of grey.',
    sections: [
      {
        heading: '',
        paragraphs: [
          'In 1932 a group of photographers in California founded Group f/64. The name comes from a very small aperture setting, which keeps everything sharp from the foreground to the horizon. Among them were Edward Weston, who photographed peppers, shells and human bodies like sculptures, Imogen Cunningham and Ansel Adams.',
          'Ansel Adams’s black-and-white landscapes, with their mountains, clouds and moon, remain among the best-loved images in the world. With Fred Archer he developed the “Zone System”, to control precisely every tone from deep black to pure white.',
        ],
      },
    ],
    keyQuote: {
      text: 'The negative is comparable to the composer’s score and the print to its performance.',
      author: 'Ansel Adams',
    },
    keyConcepts: ['Group f/64', 'Maximum depth of field', 'Zone System', 'Large-format camera'],
    historicalFigures: ['Ansel Adams', 'Edward Weston', 'Imogen Cunningham', 'Willard Van Dyke'],
    imageCaption: 'Ansel Adams, The Tetons and the Snake River, 1942 (U.S. National Archives).',
    outline: [
      'The f/64 manifesto (1932) and the reaction against pictorialism',
      'Edward Weston: the pepper as sculpture',
      'Imogen Cunningham: plants, hands and portraits',
      'Ansel Adams, the national parks and photography as ecology',
      'The Zone System made simple, and how it lives on in the histogram',
    ],
  },

  'avant-garde': {
    title: 'The Avant-Gardes Between the Wars',
    subtitle: 'Man Ray, the Bauhaus, Rodchenko and a new way of seeing',
    era: '1918 – 1939',
    summary:
      'After the First World War, artists in Paris, Berlin and Moscow break every rule: photographs without a camera, extreme angles, collage, and portraits of an entire society.',
    sections: [
      {
        heading: '',
        paragraphs: [
          'Between the wars, Man Ray in Paris made pictures without even a camera, his “rayographs”, by placing objects on light-sensitive paper and switching on the light. At the Bauhaus in Germany, photographers experimented with extreme angles, geometry and shadows.',
        ],
      },
    ],
    keyConcepts: ['Rayographs', 'Surrealism', 'New Vision (Neues Sehen)', 'Photomontage'],
    historicalFigures: ['Man Ray', 'László Moholy-Nagy', 'Alexander Rodchenko', 'August Sander', 'Germaine Krull'],
    imageCaption: 'Illustrative image: geometry and unusual viewpoints, the favourite tools of the avant-gardes.',
    outline: [
      'Man Ray: rayographs and solarisation',
      'Moholy-Nagy and the “New Vision” at the Bauhaus',
      'Rodchenko: the camera from above and below',
      'August Sander: People of the Twentieth Century',
      'Photomontage and politics',
    ],
  },

  documentary: {
    title: 'Documentary Photography: the Camera as Witness',
    subtitle: 'From the slums of New York to Migrant Mother',
    era: '1888 – 1945',
    summary:
      'Photography becomes a tool to change the world: it shows poverty, child labour and crisis, and helps change laws.',
    sections: [
      {
        heading: '',
        paragraphs: [
          'Photography was not only art. It was also a witness. In the late nineteenth century the journalist Jacob Riis entered the slums of New York with magnesium flash, revealing how poor immigrants lived. A little later Lewis Hine photographed children in mines and factories. Their pictures shocked the public and helped change laws.',
          'In the 1930s, during the Great Depression, the American government sent photographers across the country to record rural poverty. Among them was Dorothea Lange, who in 1936 photographed Migrant Mother in a pea-pickers’ camp. Her gaze, full of anxiety and dignity, became the symbol of an entire era.',
        ],
      },
    ],
    keyConcepts: ['Documentary photography', 'Social photography', 'Farm Security Administration', 'Magnesium flash'],
    historicalFigures: ['Jacob Riis', 'Lewis Hine', 'Dorothea Lange', 'Walker Evans', 'Roy Stryker'],
    imageCaption: 'Dorothea Lange, Migrant Mother, Nipomo, California, 1936 (Library of Congress).',
    outline: [
      'Jacob Riis: How the Other Half Lives (1890)',
      'Lewis Hine and the campaign against child labour',
      'The FSA project: tens of thousands of pictures of a country in crisis',
      'The story behind Migrant Mother and Florence Owens Thompson',
      'The ethics of documentary: who speaks for whom?',
    ],
  },

  photojournalism: {
    title: 'Leica, Photojournalism and Magnum',
    subtitle: 'The small camera that took the photographer to the front line',
    era: '1925 – 1975',
    summary:
      'A camera that fits in a pocket, picture magazines with millions of readers and a cooperative of photographers change the way the world sees history.',
    sections: [
      {
        heading: '',
        paragraphs: [
          'In 1925 the Leica came out: a small, light camera that used the 35mm film of the cinema. Photographers were freed from tripods and heavy plates. They could move freely, quickly and quietly through a crowd, catching life as it happened.',
          'Photojournalism was born. Robert Capa was on the front line of the Spanish Civil War and in Normandy on D-Day, 6 June 1944. In 1947, with Henri Cartier-Bresson and other photographers, he founded the Magnum agency, a cooperative in which the photographers themselves keep the rights to their work.',
        ],
      },
    ],
    keyQuote: {
      text: 'If your pictures aren’t good enough, you aren’t close enough.',
      author: 'Robert Capa',
    },
    keyConcepts: ['35mm film', 'Photojournalism', 'Picture magazines (LIFE)', 'Magnum Photos'],
    historicalFigures: ['Oskar Barnack', 'Robert Capa', 'Gerda Taro', 'David “Chim” Seymour', 'George Rodger'],
    imageCaption: 'Leica I, 1925: the camera that fitted in a pocket.',
    outline: [
      'Oskar Barnack and the Leica: how cinema film became photographic film',
      'LIFE and Picture Post: the age of picture magazines',
      'Robert Capa and Gerda Taro in Spain',
      'Normandy 1944: the pictures that survived an accident in the darkroom',
      'Magnum: why owning the negatives changed the profession',
    ],
  },

  street: {
    title: 'Street Photography and the Decisive Moment',
    subtitle: 'Cartier-Bresson, Robert Frank and the poetry of everyday life',
    era: '1930 – today',
    summary:
      'The street becomes a stage. Photographers wander with a small camera and wait for the fraction of a second when everything falls into place.',
    sections: [
      {
        heading: '',
        paragraphs: [
          'Henri Cartier-Bresson walked with his Leica like an invisible observer. He spoke of the “decisive moment”: the fraction of a second when people, light and shapes fall perfectly into place. He is regarded as the father of modern street photography.',
          'After the war, Robert Frank crossed America by car, and with his book The Americans (1958–59) showed a lonely, hurried country full of contradictions. His raw, poetic vision changed street photography for ever.',
        ],
      },
    ],
    keyQuote: {
      text: 'Photography is the simultaneous recognition, in a fraction of a second, of the significance of an event as well as of a precise organization of forms which give that event its proper expression.',
      author: 'Henri Cartier-Bresson, 1952',
    },
    keyConcepts: ['Decisive moment', 'Street photography', 'Humanist photography', 'Snapshot aesthetic'],
    historicalFigures: ['Henri Cartier-Bresson', 'Brassaï', 'Robert Doisneau', 'Robert Frank', 'Vivian Maier', 'Garry Winogrand'],
    imageCaption: 'Illustrative image: the street as the stage of everyday life.',
    outline: [
      'Cartier-Bresson: geometry, patience and the 50mm lens',
      'Brassaï’s Paris by night and Doisneau’s Paris',
      'Robert Frank and The Americans',
      'Vivian Maier: the nanny discovered after her death',
      'Street photography today: law, ethics and respect',
    ],
  },

  'fashion-portrait': {
    title: 'Fashion, Portrait and Advertising',
    subtitle: 'The studio as a laboratory of light',
    era: '1920 – today',
    summary:
      'From the fashion magazines of the 1920s to celebrity covers, the studio becomes a place where photographers learn to shape light and create images that define an era.',
    sections: [],
    keyConcepts: ['Studio lighting', 'Celebrity portrait', 'Fashion photography', 'Advertising image'],
    historicalFigures: ['Edward Steichen', 'Irving Penn', 'Richard Avedon', 'Yousuf Karsh', 'Annie Leibovitz'],
    imageCaption: 'Illustrative image: studio light and portraiture.',
    outline: [
      'Steichen at Vogue and Vanity Fair',
      'Yousuf Karsh and the portrait of Churchill',
      'Irving Penn: the studio corner and simplicity',
      'Richard Avedon: the white background and movement',
      'How to light a portrait with one window and a reflector',
    ],
  },

  'greece-1': {
    title: 'Greece Through the Lens (1839–1940)',
    subtitle: 'From the first studios of Athens to Nelly’s',
    era: '1839 – 1940',
    summary:
      'Travellers, archaeologists and the first Greek photographers record the monuments, a capital under construction and the countryside. Between the wars, Nelly’s brings modernism to Greek photography.',
    sections: [],
    keyConcepts: ['First Greek studios', 'Archaeological photography', 'Greek modernism', 'The refugees of 1922'],
    historicalFigures: ['Philippos Margaritis', 'Petros Moraites', 'Fred Boissonnas', 'Nelly’s (Elli Souyioultzoglou-Seraidari)'],
    imageCaption: 'Fred Boissonnas, View of the Athenian Plain from the Propylaea, 1907.',
    outline: [
      'The first foreign photographers on the Acropolis',
      'Philippos Margaritis and Petros Moraites: the first Greek studios',
      'Fred Boissonnas: Greece as a visual journey',
      'Nelly’s: dancers at the Parthenon and the refugees of 1922',
      'Photography and Greece’s national image',
    ],
  },

  'greece-2': {
    title: 'The Greek Eye (1940–today)',
    subtitle: 'Occupation, countryside and Greeks at Magnum',
    era: '1940 – today',
    summary:
      'Greek photographers record the famine of the Occupation, the Resistance, village life and a changing Greece, and some reach the world’s leading agencies.',
    sections: [
      {
        heading: '',
        paragraphs: [
          'In Greece, Nelly’s photographed dancers at the Parthenon and figures of the countryside. Voula Papaioannou recorded the harsh famine of the Occupation, and Costas Balafas, born in Epirus, documented the Resistance and the toil of rural people.',
          'Later, Greek photographers became members of the famous Magnum agency, among them Constantine Manos and Nikos Economopoulos, known for his pictures of Greece and the Balkans.',
        ],
      },
    ],
    keyConcepts: ['Photography of the Occupation', 'Humanist photography', 'Rural Greece', 'Greeks at Magnum'],
    historicalFigures: ['Voula Papaioannou', 'Costas Balafas', 'Spyros Meletzis', 'Dimitris Harissiadis', 'Constantine Manos', 'Nikos Economopoulos'],
    imageCaption: 'Illustrative image: the small film camera, companion of twentieth-century photographers.',
    outline: [
      'Voula Papaioannou: the famine of 1941–42 and post-war Greece',
      'Spyros Meletzis and Costas Balafas: photographers of the Resistance',
      'Dimitris Harissiadis and the Greece of reconstruction',
      'Constantine Manos: A Greek Portfolio',
      'Nikos Economopoulos and contemporary Greek photography',
    ],
  },

  'color-contemporary': {
    title: 'Colour as Art and Contemporary Photography',
    subtitle: 'From Maxwell’s ribbon to MoMA in 1976 and conceptual art',
    era: '1861 – today',
    summary:
      'Colour existed almost from the start, but it took a century to be accepted as art. Then photography became a tool for ideas and entered the greatest museums.',
    sections: [
      {
        heading: '',
        paragraphs: [
          'In 1861 the Scottish physicist James Clerk Maxwell showed the first colour photograph. He photographed a tartan ribbon three times, through red, green and blue filters, and projected the three images on top of each other. The same principle is still used in the sensor of your phone.',
          'For decades, “serious” photography was black and white. Colour existed, with Autochrome plates (1907) and Kodachrome film (1935), but it was seen as something for advertising and family snapshots. Everything changed in 1976, when the Museum of Modern Art in New York showed William Eggleston’s colour photographs: a red ceiling, a tricycle, an old car.',
          'From then on, photography also became a tool for ideas. Cindy Sherman photographed herself disguised as heroines of films that never existed, while photographers such as Andreas Gursky created huge images of the contemporary world.',
        ],
      },
    ],
    keyQuote: {
      text: 'I am at war with the obvious.',
      author: 'William Eggleston',
    },
    keyConcepts: ['RGB three-colour principle', 'Autochrome & Kodachrome', 'New Color photography', 'Conceptual photography'],
    historicalFigures: ['James Clerk Maxwell', 'The Lumière brothers', 'William Eggleston', 'Stephen Shore', 'Cindy Sherman', 'Bernd & Hilla Becher', 'Andreas Gursky'],
    imageCaption: 'Maxwell’s Tartan Ribbon (1861): the first colour photograph, made from three exposures through red, green and blue filters.',
    outline: [
      'Maxwell and the idea of three colours',
      'Autochrome: colour from grains of potato starch',
      'Kodachrome and a world in colour',
      'Eggleston, Shore and “New Color”',
      'Cindy Sherman, the Bechers and photography as an idea',
    ],
  },

  'digital-ai': {
    title: 'Digital, Smartphones and Artificial Intelligence',
    subtitle: 'From a 1975 cassette to the camera in our pocket',
    era: '1975 – 2026',
    summary:
      'Film gives way to pixels, the darkroom moves onto the screen, and photography becomes the shared language of the whole planet. Today, artificial intelligence raises the old question again: what is real?',
    sections: [
      {
        heading: '',
        paragraphs: [
          'In 1975 Steven Sasson, a young Kodak engineer, built the first digital camera. It weighed almost four kilos, captured black-and-white images of just ten thousand pixels and needed twenty-three seconds to record one picture onto a cassette tape. In 1990 Photoshop was released, and the darkroom moved onto the screen.',
          'With camera phones, smartphones and social networks, photography became a global language. Today, algorithms and artificial intelligence raise the ancient question again: what is real? At the same time, thousands of young photographers are rediscovering analogue film and the magic of waiting. History moves in circles.',
        ],
      },
    ],
    keyConcepts: ['CCD/CMOS sensor', 'Photoshop', 'Computational photography', 'AI-generated images', 'The return of film'],
    historicalFigures: ['Steven Sasson', 'Thomas & John Knoll'],
    imageCaption: 'The prototype of Kodak’s first digital camera (Steven Sasson, 1975).',
    outline: [
      'The sensor: how light becomes numbers',
      'The Kodak that invented digital and was ruined by it',
      'Photoshop and the new debate about the truth of the image',
      'The smartphone and computational photography',
      'AI, content credentials and the future of photography',
    ],
  },

  guide: {
    title: 'A Guide for New Photographers',
    subtitle: 'Light, exposure, composition, selection, study and ethics',
    era: 'Practical guide',
    summary: 'Practical guidance to develop your eye, linked to the Exposure & Composition Lab.',
    sections: [
      {
        heading: '',
        paragraphs: [
          'If everyone takes photographs today, what makes a photographer stand out?',
          'First, learn to see light. The word “photography” is Greek and literally means “writing with light”. The golden hour, just after sunrise and just before sunset, gives soft, low, warm light. Midday light creates hard shadows, while an overcast sky works like a huge diffuser, perfect for portraits.',
          'Second, get to know the three basics of exposure: aperture, shutter speed and ISO. Aperture controls depth of field. Shutter speed freezes action or blurs it. ISO increases sensitivity in the dark, but adds grain.',
          'Third, pay attention to composition. The rule of thirds, leading lines, negative space and a change of viewpoint can turn an ordinary subject into a strong frame.',
          'Fourth, the best camera is the one you have with you. Your phone is enough to train your eye.',
          'Fifth, shoot a lot but choose strictly. Work in themed series and say no to mediocre frames. Sixth, study the masters. Seventh, share your work, listen to honest criticism and print your photographs.',
          'And finally, respect the people you photograph. The camera gives power, and power demands responsibility.',
        ],
      },
    ],
    keyConcepts: ['Golden hour', 'Exposure triangle', 'Rule of thirds', 'Curation', 'Photographic ethics'],
    historicalFigures: ['Every maker who holds a camera'],
    imageCaption: 'The camera is just the tool. The eye is what makes the photograph.',
  },
};
