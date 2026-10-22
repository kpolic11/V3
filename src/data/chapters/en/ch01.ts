import type { ChapterText } from '../../types';
import { MEDIA } from '../../media';

/** Chapter 1 — full version (style sample for the whole series) */
export const ch01: ChapterText = {
  title: 'The Dark Chamber',
  subtitle: 'How a room with a hole taught people to “catch” light',
  era: '5th c. BC – 1802',
  summary:
    'Two thousand years before the first photograph, philosophers, astronomers and painters already had the camera in their hands. Only one thing was missing: a way to keep the image.',
  sections: [
    {
      heading: 'A room that paints',
      paragraphs: [
        'Picture a summer afternoon. You close the shutters to keep the room cool, and the room sinks into darkness. But through a narrow crack a thin beam of light slips in. If you look carefully at the opposite wall, you will see something strange: blurred colours, a patch of sky, a tree, perhaps a passing car. It is the street outside your house. Only it is upside down.',
        'What you are seeing is not an illusion. It is the oldest optical phenomenon connected with photography, and it has a name: the camera obscura, which simply means “dark chamber”. Every camera ever made, from the wooden boxes of the nineteenth century to the camera in your phone, is in essence a small dark chamber.',
        'So the history of photography does not begin with a machine. It begins with a room, a hole, and the curiosity of people who wondered what exactly they were looking at.',
      ],
    },
    {
      heading: 'Why is the image upside down?',
      paragraphs: [
        'The secret lies in a simple property of light: it travels in straight lines. Every point on a tree outside the window sends light in all directions. Of all those rays, only a thin bundle passes through the hole, and it carries straight on to the opposite wall.',
        'Now think about the top of the tree. Its light starts high, passes through the hole and, continuing in a straight line, lands low on the wall. Light from the base of the tree does the opposite: it starts low and lands high. The rays cross inside the hole like the blades of a pair of scissors. That is why the image forms upside down, and also flipped from left to right.',
        'There is something else, and it matters a great deal to anyone who wants to take pictures. If the hole is very small, the image is sharp but dark, because little light gets in. If you make the hole larger, the image gets brighter but blurrier, because each point of the outside world now sends many rays that spread into a patch. Sharpness or light: this is photography’s first dilemma. We will meet it again throughout this journey, under the name “aperture”.',
      ],
    },
    {
      heading: 'The first observers',
      paragraphs: [
        'The phenomenon is so simple that people noticed it in many parts of the world, independently of each other. In China, texts from the school of the philosopher Mozi, dating from the fourth century BC, describe how an image passing through a small opening forms upside down, and explain it by the rays crossing at a single point.',
        'In ancient Greece, the work known as the Problems, attributed to Aristotle or to his students, asks two questions that sound childlike but are profound. Why does sunlight passing through a square opening make a round patch on the ground? And why, during an eclipse, does light passing between the leaves of a tree make little crescents on the ground? The answer, which would come many centuries later, is that every gap between the leaves acts as a tiny dark chamber and paints on the ground a miniature image of the sun itself.',
        'The first person to study the phenomenon through experiment was the Arab scientist Ibn al-Haytham, known in the West as Alhazen, in the early eleventh century. In his Book of Optics he describes an experiment you can repeat yourself: light several candles side by side outside a dark space with an opening. Inside, you will see a bright spot on the wall for each candle, but in reverse order. If you cover one candle, only its own spot disappears, the one lying opposite it on the straight line through the opening. With this simple experiment he showed that light moves in straight lines, and that vision does not come out of our eyes, as many ancient thinkers believed, but comes into them.',
        'A little later in China, the scholar Shen Kuo compared the inversion of the image to an oar pivoting in its rowlock: when the handle goes up, the blade goes down. That is exactly what the rays do in the hole.',
      ],
    },
    {
      heading: 'A window onto the sun',
      paragraphs: [
        'For many centuries, the most systematic users of the dark chamber were not artists but astronomers. The reason is practical: nobody can look straight at the sun without damaging their eyes. Inside a dark room, however, the sun is projected harmlessly onto the wall, and you can calmly measure its spots or follow the progress of an eclipse.',
        'On 24 January 1544, the Dutch physician and mathematician Gemma Frisius watched a solar eclipse from inside a darkened space. The following year he published a drawing showing how: a room, an opening high in the wall, and opposite it the upside-down image of the sun being “eaten” by the moon. It is the oldest known published picture of a camera obscura. We will look at it closely at the end of this chapter.',
        'The same method is still used today. When an eclipse comes, astronomers advise you to punch a hole in a piece of card and watch the sun projected onto a sheet of white paper, never directly. It is a dark chamber the size of your palm.',
      ],
    },
    {
      heading: 'Leonardo: the eye and the room',
      paragraphs: [
        'In the Renaissance, painters had an obsession: perspective, the art of rendering the three-dimensional world on flat paper so that it looks real. It is no surprise that the dark chamber fascinated them.',
        'Around 1502, Leonardo da Vinci left in his notes, in the so-called Codex Atlanticus, the first clear description of the phenomenon in the West. He writes that all objects lit by the sun send their images through the opening, and that these appear on the opposite wall upside down and smaller. Leonardo saw something more: that the human eye works the same way. The pupil is the hole, and the inside of the eye is the dark room.',
        'There is one detail worth remembering, though. Leonardo’s notes remained almost unknown for centuries. They were written in his famous mirror script and were deciphered and published only in 1797. Knowledge of the dark chamber spread through Europe by other routes.',
      ],
    },
    {
      heading: 'The lens and the first “aperture”',
      paragraphs: [
        'Remember the dilemma: a small hole means a sharp but dark image, a big hole means a bright but blurry one. The solution came in the middle of the sixteenth century, when someone thought of putting a piece of glass in the opening. In 1550, the Italian physician and mathematician Gerolamo Cardano described a dark chamber with a glass disc, most probably a convex lens. The lens gathers the rays from each point and brings them back together at a single point on the wall. So you can have a large opening, and therefore plenty of light, and a sharp image at the same time.',
        'A few years later, the Venetian nobleman Daniele Barbaro, in a book on perspective in 1567, gave instructions for painters: put a lens in the opening, and hold a sheet of white paper at the distance where the image becomes sharp. He added a tip that sounds prophetic today: if you cover the lens, leaving only a small circle uncovered in the middle, the image becomes even sharper. That small circle is the ancestor of the aperture, the very mechanism you adjust today when you turn from f/2.8 to f/8.',
        'Around the same time, the Neapolitan scholar Giambattista della Porta made the dark chamber famous with the general public. In his popular book Natural Magic, first published in 1558 and reprinted many times, he explained how to turn a room into a theatre: you stage hunts, battles or plays outside in the sun, and the spectators sitting in the dark watch a moving, coloured image on a white cloth. Three centuries before cinema, della Porta was essentially describing a screening room.',
      ],
    },
    {
      heading: 'Kepler gives it a name, and the word comes home',
      paragraphs: [
        'The phenomenon had many names in scholarly Latin: dark room, dark place, dark hall. The name that stuck was given by the German astronomer Johannes Kepler in 1604, in a book on optics: camera obscura, the dark chamber.',
        'Kepler did not stop at theory. He had a portable tent, black and sealed everywhere except for one hole with a lens, which he would step into to draw landscapes. An English diplomat who visited him, Henry Wotton, wrote admiringly that the tent was “exactly close and dark, save at one hole”, and that inside it Kepler drew whatever he saw projected onto the paper.',
        'And here is a lovely detail for Greek readers. The Latin word camera comes from the ancient Greek kamara, which meant a vaulted room. The word travelled from Greek into Latin, from there into every European language, became the name of the photographic machine, and returned to Greek as “kamera”. Every time you say “camera”, you are really saying “kamara”.',
      ],
    },
    {
      heading: 'From the room to the box',
      paragraphs: [
        'You cannot take a room with you. So in the seventeenth century the dark chamber began to shrink. First it became a tent, then a cart, and finally a wooden box that fitted in your hands. The English physicist Robert Boyle described a portable “darkened room” in 1669 and noted that by turning it in another direction you discover new objects and new landscapes on the paper. A little earlier, in 1646, the German Jesuit scholar Athanasius Kircher had published a picture of a chamber carried like a sedan chair: a person climbed inside and traced the image projected onto its translucent walls. You can see it at the top of this chapter.',
        'In 1685, the German monk Johann Zahn published designs for boxes with a lens at the front and a mirror inside, set at an angle of forty-five degrees. The mirror sent the image upwards onto a sheet of frosted glass, where it could be traced. If you have ever seen an old reflex camera, you will recognise the design: it is almost the same, a hundred and fifty years before photography was invented.',
        'In the eighteenth century, the portable box became a tool for painters and amateurs. The English painter Joshua Reynolds owned one, which survives today in the Science Museum in London, although in his lectures he warned that the machine cannot do what the artist does: choose what to show. In Venice, the Museo Correr keeps a camera obscura attributed to Canaletto, the painter of famous Venetian views. As for the Dutch painter Johannes Vermeer, with his soft light and the “points of light” in his paintings, the debate over whether he used a camera obscura has lasted more than a century and is not settled. No document proves it, and art historians still disagree.',
        'Meanwhile, the dark chamber became entertainment. In 1723 the poet Alexander Pope turned the grotto in his garden into a camera obscura, where visitors saw the river and the boats moving on the walls. In cities such as Edinburgh, public camera obscuras still operate today, where visitors watch the city moving across a round table.',
      ],
    },
    {
      heading: 'The image that would not stay',
      paragraphs: [
        'And yet, through all these centuries, something was missing. The image was there, alive, in colour, wonderful. But the moment you closed the hole, it was gone forever. An anonymous English poem from the middle of the eighteenth century described the images of the dark chamber as phantoms that vanish as soon as light comes in. The only way to keep them was to copy them by hand.',
        'The solution would come not from optics but from chemistry. Around 1720, the German professor Johann Heinrich Schulze proved that silver salts darken because of light, not heat. He stuck paper stencils of words onto glass jars filled with chalk and silver nitrate, and the sun “wrote” the words inside the jar. Later, the Swedish chemist Carl Wilhelm Scheele showed that light turns silver chloride into metallic silver.',
        'In 1802, the Englishmen Thomas Wedgwood and Humphry Davy published their experiments: they managed to record silhouettes of leaves and pictures painted on glass on paper soaked in silver salts. But the image of the dark chamber was too faint to leave a trace. And the images they did make had a tragic flaw: if you looked at them in daylight, they kept darkening until they turned completely black. They could only be viewed briefly, by candlelight. The light that created them was the same light that destroyed them.',
        'So we had the eye, the dark chamber with its lens. We also had a chemistry that reacts to light. What was missing was the bridge between them: a way to stop the chemical reaction at the right moment, so that the image would stay forever. That bridge would be built a few years later by a stubborn French inventor in the Burgundy countryside. His story is our next chapter.',
      ],
    },
    {
      heading: 'The dark chamber inside us',
      paragraphs: [
        'Before we move on, let us go back to that dark room with the closed shutters. Whatever happens there is happening right now, inside your eye, as you read these words. The lens of your eye projects onto the retina a small, upside-down image of the world, and your brain interprets it as upright.',
        'The same law applies to the camera in your phone. Its lens is tiny and the sensor, in place of the opposite wall, is smaller than your fingernail, but the principle is the one described by Mozi, Alhazen and Leonardo: light comes in through an opening, travels in a straight line, and paints.',
        'Even today, artists return to the root. The Cuban-American photographer Abelardo Morell turns hotel rooms into dark chambers and photographs the city projected upside down onto the beds and walls. Thousands of amateurs build cameras with a pinhole and no lens at all. Because every time someone makes a room dark and opens a small hole to the light, they relive the moment the idea of photography was born.',
      ],
    },
  ],
  keyQuote: {
    text: 'All objects illuminated by the sun will send their images through this aperture.',
    author: 'Leonardo da Vinci, Codex Atlanticus, c. 1502',
  },
  keyConcepts: [
    'Camera obscura (dark chamber)',
    'Light travels in straight lines',
    'Inverted image',
    'Sharpness or light: the first dilemma',
    'The lens & the ancestor of the aperture',
    'Silver salts',
  ],
  historicalFigures: [
    'Mozi',
    'Aristotle',
    'Ibn al-Haytham (Alhazen)',
    'Shen Kuo',
    'Gemma Frisius',
    'Leonardo da Vinci',
    'Gerolamo Cardano',
    'Daniele Barbaro',
    'Giambattista della Porta',
    'Johannes Kepler',
    'Johann Zahn',
    'Johann Heinrich Schulze',
    'Thomas Wedgwood',
  ],
  imageCaption:
    'A portable camera obscura from Athanasius Kircher’s book on light and shadow (1646). The draughtsman climbs inside and traces the image projected through the openings.',
  featuredWork: {
    title: 'Observing the solar eclipse',
    author: 'Gemma Frisius',
    year: '1544 (published 1545)',
    imageUrl: MEDIA.frisius1545.url,
    description:
      'The drawing accompanies the description of the eclipse of 24 January 1544 in Frisius’s book De Radio Astronomico et Geometrico. It is the oldest known published picture of a camera obscura.',
    observe: [
      'The opening sits high in the wall, facing the sun. Nothing else is needed: no lens, no mirror.',
      'The sun in the sky is “eaten” from above. On the opposite wall the image is upside down: the missing piece appears at the bottom.',
      'The two straight lines joining the sun to its image cross exactly at the opening. That is the whole physics of the dark chamber in one drawing.',
      'The purpose is not artistic but scientific: to measure safely something you cannot look at directly.',
    ],
    credit: 'Gemma Frisius, De Radio Astronomico et Geometrico, 1545 · Wikimedia Commons (public domain)',
  },
  exercise: {
    title: 'Turn your room into a camera obscura',
    intro:
      'You need a room with a window facing a bright view, cardboard or kitchen foil, tape, and a white sheet or board. Choose a sunny day.',
    steps: [
      'Cover the whole window with cardboard or foil so that no light gets in. Block the gaps around the door too.',
      'Cut a round hole about 1 centimetre wide in the middle of the cardboard.',
      'Hold the white sheet or board one or two metres from the hole. Wait 5 to 10 minutes for your eyes to adjust to the dark.',
      'Observe: is the image upside down? Is it also mirrored? Can you see colour and movement?',
      'Make the hole smaller with tape, then enlarge it to 2–3 centimetres. What happens to the brightness, and what happens to the sharpness?',
      'Bonus: rest your phone on a steady surface and photograph the projection with a long exposure or night mode.',
    ],
    takeaway:
      'You will see photography’s first dilemma with your own eyes: a small opening gives a sharp but dark image, a large one a bright but blurry image. That is exactly what the aperture controls on every modern camera.',
  },
  didYouKnow: [
    'The word “camera” comes from the ancient Greek kamara, a vaulted room. It passed into Latin and returned to Greek almost two thousand years later.',
    'Under a tree during a partial eclipse, the ground fills with tiny crescents. Every gap between the leaves is a miniature dark chamber.',
    'Johann Zahn’s 1685 design, with its mirror at forty-five degrees, is essentially the ancestor of the reflex camera.',
    'Never look at the sun directly, not even through a lens or a camera. Projecting it through a hole in a card is the safe way to watch an eclipse.',
  ],
  quiz: [
    {
      id: 'c1q1',
      question: 'Why does the image in a camera obscura form upside down?',
      options: [
        'Because the wall acts like a mirror',
        'Because light travels in straight lines that cross at the opening',
        'Because darkness inverts colours',
        'Because our eyes get tired in the dark',
      ],
      correctIndex: 1,
      explanation:
        'Light from the top of an object passes through the hole and lands low, while light from the bottom lands high. The rays cross at the opening like scissors.',
    },
    {
      id: 'c1q2',
      question: 'What happens when you enlarge the hole of a camera obscura without a lens?',
      options: [
        'The image becomes brighter but blurrier',
        'The image becomes darker and sharper',
        'The image turns upright',
        'Nothing changes',
      ],
      correctIndex: 0,
      explanation:
        'More light means a brighter image, but many rays from each point spread into a patch. A lens solves the problem by bringing the rays back together.',
    },
    {
      id: 'c1q3',
      question: 'Who gave the name “camera obscura” in 1604?',
      options: ['Leonardo da Vinci', 'Aristotle', 'Johannes Kepler', 'Louis Daguerre'],
      correctIndex: 2,
      explanation:
        'The astronomer Johannes Kepler first used the term in a book on optics in 1604. He also had a portable tent-camera for drawing landscapes.',
    },
    {
      id: 'c1q4',
      question: 'Which tip from Daniele Barbaro (1567) resembles today’s aperture?',
      options: [
        'Paint the wall black',
        'Cover the lens, leaving only a small circle uncovered in the middle',
        'Use a candle instead of the sun',
        'Trace the image with charcoal',
      ],
      correctIndex: 1,
      explanation:
        'Making the working opening of the lens smaller makes the image sharper. It is exactly what the aperture does when you “stop down” from f/2.8 to f/8.',
    },
    {
      id: 'c1q5',
      question: 'What could Wedgwood and Davy not achieve in 1802?',
      options: [
        'Find substances that react to light',
        'Build a camera obscura with a lens',
        'Fix the image so it would not darken in light',
        'Record silhouettes of leaves',
      ],
      correctIndex: 2,
      explanation:
        'Their images formed, but kept darkening in light until they disappeared. Fixing the image was the missing piece.',
    },
  ],
  sources: [
    { title: 'Camera obscura — Wikipedia', url: 'https://en.wikipedia.org/wiki/Camera_obscura' },
    {
      title: 'Watching the World in a Dark Room: The Early Modern Camera Obscura — The Public Domain Review',
      url: 'https://publicdomainreview.org/essay/the-early-modern-camera-obscura/',
    },
    {
      title: 'Silver and Sunlight — Science History Institute',
      url: 'https://www.sciencehistory.org/stories/magazine/silver-and-sunlight/',
    },
    {
      title: 'Camera obscura attributed to Canaletto — Google Arts & Culture (Museo Correr)',
      url: 'https://artsandculture.google.com/asset/camera-obscura-antonio-canal-known-as-canaletto/8QE7Br8a-4bLEg',
    },
  ],
};
