import type { LessonText } from '../types';

/** Exposure & Composition Lab — English */
export const LAB_EN: Record<string, LessonText> = {
  /* ------------------------------ EXPOSURE ------------------------------ */
  'exp-what': {
    title: 'What is exposure?',
    tagline: 'How much light reaches the sensor, and how sensitive it is.',
    body: [
      'Every photograph is an amount of light that has been collected. Too little, and the image is dark (underexposed). Too much, and it is blown out (overexposed). The right exposure is the one that renders the scene the way you want it.',
      'Think of a bucket filling from a tap. The aperture is how far you open the tap. The shutter speed is how long you leave it open. ISO is the size of the bucket: a smaller bucket fills faster. You can fill the same bucket with many combinations, and that is the secret of all photography.',
    ],
    keyIdea: 'Exposure = aperture × time, boosted by ISO. Three settings, one result.',
    tryIt: 'Take the same scene three times on your phone, tapping a different spot (bright, middle, dark) before each shot. Watch how the brightness of the whole image changes.',
    diagramLabels: ['Aperture: how far the tap opens', 'Shutter: how long it runs', 'ISO: how big the bucket is', 'Full bucket = correct exposure'],
  },
  'exp-stops': {
    title: 'The “stop”: the unit of light',
    tagline: 'Double or half the light: the language every setting speaks.',
    body: [
      'Photographers measure light in “stops”. One stop means double or half the light. The neat thing is that all three settings speak the same language: going from 1/250 to 1/125 of a second is one stop more light, from f/8 to f/5.6 is one stop more, and from ISO 200 to ISO 400 is also one stop.',
      'The aperture sequence looks odd (1.4 – 2 – 2.8 – 4 – 5.6 – 8 – 11 – 16 – 22), but it is logical: each number is the previous one times about 1.4, and each step halves the light. Most cameras also offer 1/3-stop steps in between.',
    ],
    keyIdea: 'One stop = ×2 or ÷2 light. If you gain a stop from one setting, you can “pay” for it with another.',
    tryIt: 'In manual mode, change the shutter speed by one stop and the ISO by one stop in the opposite direction. The brightness should stay the same.',
  },
  'exp-aperture': {
    title: 'Aperture & depth of field',
    tagline: 'How much of the picture will be sharp?',
    body: [
      'The aperture is the opening inside the lens, a descendant of Barbaro’s little circle. It is written as an f-number, and here is the trap: a small number (f/1.4) means a large opening, a large number (f/16) means a small opening.',
      'Besides light, aperture controls depth of field: how much of the scene looks sharp in front of and behind the point of focus. A wide aperture gives shallow depth: the subject stands out against a soft background (bokeh). A small aperture gives deep focus: everything sharp from foreground to horizon, as with Group f/64. Depth of field also shrinks when you get closer to the subject or use a telephoto lens.',
    ],
    keyIdea: 'Small f-number → soft background, lots of light. Large f-number → everything sharp, little light.',
    tryIt: 'With your phone’s Portrait mode or f/2.8 on a camera, photograph a flower with a distant background. Then try f/11. Compare the background.',
    bullets: ['Portrait: f/1.8 – f/2.8', 'Group of people: f/4 – f/5.6', 'Landscape: f/8 – f/11', 'Note: beyond f/16 the image softens slightly (diffraction)'],
    diagramLabels: ['Wide aperture', 'Small aperture', 'Soft background', 'Everything sharp'],
  },
  'exp-shutter': {
    title: 'Shutter speed & motion',
    tagline: 'Freeze the moment, or let time paint?',
    body: [
      'The shutter is a door that opens for a set time. A fast speed (1/1000 s) freezes motion: drops, athletes, birds. A slow speed (1/15 s or longer) lets whatever moves blur: water turns to silk, car lights turn to lines.',
      'There is also the shake of your own hands. An old rule says not to go slower than 1 / focal length (e.g. 1/50 s with a 50mm lens). Stabilisation in lenses and phones helps, but it does not stop a moving subject. For very slow speeds, use a tripod or rest the camera on something.',
    ],
    keyIdea: 'Fast shutter = frozen moment. Slow shutter = visible motion. Blur can be a mistake or a tool.',
    tryIt: 'Photograph water running from a tap at 1/1000 s and then at 1/8 s, with your phone resting on a steady surface.',
    bullets: ['Freezing athletes: 1/1000 s and up', 'People walking: 1/250 s', 'Silky water: 1/4 s – 2 s on a tripod', 'Car light trails at night: 5 – 30 s'],
    diagramLabels: ['Fast', 'Slow'],
  },
  'exp-iso': {
    title: 'ISO & noise',
    tagline: 'The sensitivity that saves you in the dark, at a price.',
    body: [
      'ISO shows how much the sensor’s signal is amplified. In the film era it was the film’s “speed”: a 400 film was twice as sensitive as a 200 film. Raising ISO lets you shoot with less light without opening the aperture or slowing the shutter.',
      'The price is noise: grain and colour speckles, mostly in the shadows. Modern cameras give clean results up to quite high ISOs, and a little grain is often better than a shaky photo.',
    ],
    keyIdea: 'Keep ISO low when you have light. Raise it without fear when the alternative is a blurry picture.',
    tryIt: 'In a dark room, photograph the same object at ISO 200 (on a tripod) and at ISO 3200 (handheld). Zoom into the shadows and compare.',
    diagramLabels: ['Low ISO: clean', 'High ISO: grain'],
  },
  'exp-equivalent': {
    title: 'Equivalent exposures',
    tagline: 'The same amount of light, a completely different photograph.',
    body: [
      'Because every setting speaks in stops, you can trade one for another. f/4 at 1/500 s gives exactly the same exposure as f/5.6 at 1/250 s or f/8 at 1/125 s. The brightness stays the same, but the photograph changes: at one end a soft background and frozen motion, at the other a sharp background and possible blur.',
      'This is the creative heart of exposure. The camera can find the right amount of light; only you can choose which combination you want.',
    ],
    keyIdea: 'First decide what matters more, depth of field or motion, then balance the rest.',
    tryIt: 'Move the aperture in the interactive example and watch the shutter speed change by itself to keep the same exposure.',
  },
  'exp-metering': {
    title: 'Metering & exposure compensation',
    tagline: 'Why snow comes out grey, and so does the black cat.',
    body: [
      'Your camera’s light meter does not know what you are photographing. It assumes the scene averages out to “mid-grey” (about 18% reflectance) and sets the exposure to make it so. For most scenes it works perfectly.',
      'In a very bright scene such as snow or a white beach, though, the camera “turns down” the light and the snow comes out grey. With a very dark subject such as a black cat, it does the opposite. The fix is exposure compensation (the +/− button): +1 or +2 for snow, −1 or −2 for the dark subject.',
    ],
    keyIdea: 'The camera wants everything grey. You tell it when the scene is brighter or darker than average.',
    tryIt: 'Photograph a sheet of white paper filling the frame. It will come out grey. Add +1.5 compensation (on a phone: slide the sun icon up) and try again.',
    bullets: ['Matrix / evaluative metering: for most scenes', 'Centre-weighted: for portraits', 'Spot: for a subject against a very bright or dark background'],
  },
  'exp-histogram': {
    title: 'The histogram',
    tagline: 'The most honest tool on your camera.',
    body: [
      'The screen on your camera or phone can fool you, especially in sunlight. The histogram cannot. It is a graph showing how many points of the image have each brightness: black on the left, midtones in the middle, white on the right.',
      'If the graph piles up against the left edge, the shadows have been lost in pure black. If it piles up on the right, the highlights have been blown to pure white, and that information does not come back. There is no single “right” shape: a night photo will have its tones on the left, a snowy landscape on the right.',
    ],
    keyIdea: 'Watch both edges. Whatever hits the wall is lost.',
    tryIt: 'Turn on the histogram on your camera or in a camera app. Photograph against the sky and see where the graph touches.',
  },
  'exp-light': {
    title: 'Quality & direction of light',
    tagline: 'Hard or soft; front, side or back.',
    body: [
      'It is not only how much light you have, but what kind. Hard light comes from a small source, such as the midday sun or a bare flash, and gives strong shadows with crisp edges. Soft light comes from a large source, such as a window or an overcast sky, and wraps the subject in gentle transitions.',
      'Direction changes the mood. Front light is flat but clear. Side light brings out texture and volume. Backlight creates silhouettes and glowing rims in the hair.',
    ],
    keyIdea: 'Large source = soft light. Small source = hard light. Side direction gives depth.',
    tryIt: 'Put a piece of fruit on a table near a window and photograph it from three positions: with the window behind you, beside you and facing you.',
    diagramLabels: ['Front', 'Side', 'Back', 'Hard', 'Soft'],
  },
  'exp-whitebalance': {
    title: 'White balance',
    tagline: 'Why photos at home come out orange.',
    body: [
      'Every light source has its own colour, measured in degrees Kelvin. A candle is very orange (about 1,900 K), a tungsten bulb orange (about 3,000 K), midday light neutral (about 5,500 K), and shade under a blue sky blue (about 7,500 K).',
      'Our eyes adapt automatically; the camera does not always. The white balance setting tells the camera what colour the light is, so that white comes out white. Set it lower than the light and the picture turns bluer; higher, and it turns warmer. You can also use it creatively.',
    ],
    keyIdea: 'Match white balance to the light for neutral colours, or drift on purpose for mood.',
    tryIt: 'Photograph a white sheet of paper under a household lamp with auto white balance, then with the “Daylight” setting. See the difference.',
  },
  'exp-modes': {
    title: 'Shooting modes: M, A, S, P',
    tagline: 'How much control do you want to keep?',
    body: [
      'Cameras offer modes that split the decisions between you and the camera. In manual (M) you decide everything. In aperture priority (A or Av) you choose the aperture and the camera chooses the shutter. In shutter priority (S or Tv) it is the other way round.',
      'Many professionals work most of the time in A or S, with auto ISO and exposure compensation. It is not “cheating”: it is a quick way to control what matters most in each picture.',
    ],
    keyIdea: 'Choose the mode by what you care about: depth of field → A, motion → S, everything → M.',
    tryIt: 'Spend an afternoon in aperture priority (A/Av), changing only the aperture between f/2.8 and f/11.',
  },
  'exp-rules': {
    title: 'Practical rules: Sunny 16 and more',
    tagline: 'Little secrets from the days when cameras had no light meter.',
    body: [
      'The “Sunny 16” rule says: in bright sun, at f/16, the right shutter speed is about 1 / ISO. At ISO 100, that is f/16 at 1/100 (or 1/125) s. With a few clouds, open to f/11. Overcast f/8, heavy overcast f/5.6, open shade or dusk f/4.',
      'Using equivalent exposures, you can move the rule to any aperture you like: f/16 at 1/125 s equals f/8 at 1/500 s. Even if you never use it, it teaches you to “read” light with your own eyes.',
    ],
    keyIdea: 'Bright sun: f/16 and shutter ≈ 1/ISO. Each step of cloud: one stop wider.',
    tryIt: 'On a sunny day, set exposure manually with Sunny 16, without looking at the meter, and check the histogram.',
    diagramLabels: ['Bright sun', 'Light clouds', 'Overcast', 'Heavy overcast', 'Shade / dusk'],
  },

  /* ------------------------------ COMPOSITION ------------------------------ */
  'comp-thirds': {
    title: 'The rule of thirds',
    tagline: 'Four “power points” instead of the centre.',
    body: [
      'Divide the frame in your mind with two horizontal and two vertical lines into nine equal boxes. Placing the subject on a line or on one of the four intersections gives the picture tension and balance, while the dead centre often feels static.',
      'The horizon usually goes on the upper or lower third, depending on what is more interesting: the sky or the land. In a portrait, the eyes often sit near the upper line.',
    ],
    keyIdea: 'Put the subject on a thirds line or intersection, not in the centre out of habit.',
    tryIt: 'Turn on the grid in your phone camera. Photograph a tree or a friend first in the centre, then on an intersection.',
  },
  'comp-golden': {
    title: 'The golden ratio and the spiral',
    tagline: 'An ancient proportion, more “natural” than thirds.',
    body: [
      'The golden ratio (φ ≈ 1.618) was known to ancient Greek mathematicians. Its grid looks like the thirds grid, but the lines sit a little closer to the centre. The golden spiral, built from successive squares in this proportion, leads the eye along a curve to one point.',
      'An honest note: the idea that the Parthenon or the great painters were designed precisely on the golden ratio is disputed by many historians. In photography, use it as a way of seeing, not as a law.',
    ],
    keyIdea: 'The spiral works when the scene already has a curve: a staircase, a shell, a wave, a road.',
    tryIt: 'Find a spiral staircase or a shell and place the “eye” of the spiral on the frame’s power point.',
  },
  'comp-lines': {
    title: 'Leading lines',
    tagline: 'Roads that carry the eye into the photograph.',
    body: [
      'The eye follows lines. A road, a river, a shoreline, a railing or railway tracks can lead the viewer from the foreground to the subject. Lines that converge to a point also create a sense of depth.',
      'Beware of lines that lead the eye out of the frame or “cut through” the subject. Ideally, lines start from a corner and end near the subject.',
    ],
    keyIdea: 'Find a line that starts near you and ends at your subject.',
    tryIt: 'Crouch low on a footpath or a pier and shoot with the lines starting from the bottom corners.',
  },
  'comp-symmetry': {
    title: 'Symmetry & reflection',
    tagline: 'The time when the centre is the right answer.',
    body: [
      'The rule of thirds has one big exception: when the scene is symmetrical. A façade, a corridor, a bridge or a reflection in still water becomes striking when its centre matches the centre of the frame exactly.',
      'Symmetry brings calm, order and grandeur. To work it has to be precise: a slight tilt looks like a mistake. And often, one element that breaks the symmetry, such as a person walking, brings the image to life.',
    ],
    keyIdea: 'Symmetrical scene → centred frame, perfectly level.',
    tryIt: 'Find a reflection in a puddle or a window and place its line exactly across the middle of the frame.',
  },
  'comp-framing': {
    title: 'A frame within the frame',
    tagline: 'Doorways, windows and branches that embrace the subject.',
    body: [
      'A doorway, an arch, a window or the branches of a tree can become a second frame around the subject. They lead the eye to the centre of interest, add depth and tell you about the place.',
      'The inner frame is often darker than the subject, which helps the eye go straight to where the light is.',
    ],
    keyIdea: 'Look for openings and put your subject in the light inside them.',
    tryIt: 'Photograph a street or a landscape through a window or an arch, exposing for the bright outside.',
  },
  'comp-negative': {
    title: 'Negative space',
    tagline: 'The emptiness that lets the subject breathe.',
    body: [
      'Negative space is the area around the subject: sky, wall, sea, fog. When you leave plenty of it, the subject, even a small one, becomes stronger, and the image gains a sense of solitude, calm or scale.',
      'Negative space should be “clean”, with little detail, so that it does not compete with the subject.',
    ],
    keyIdea: 'Less is more: a small subject in a large, clean emptiness.',
    tryIt: 'Photograph a bird, a person or a boat, small in a corner of the frame, with sky or sea filling the rest.',
  },
  'comp-fill': {
    title: 'Fill the frame',
    tagline: 'Get closer than you think.',
    body: [
      'Many weak photographs share the same problem: the subject is too small and gets lost among irrelevant details. When you fill the frame with the subject, a face, a hand, a texture, the image becomes direct and strong.',
      'Get closer with your feet, not only with the zoom. Distance changes perspective and your relationship with the subject. Remember Capa: if your pictures aren’t good enough, you aren’t close enough.',
    ],
    keyIdea: 'If something does not help the picture, leave it out of the frame.',
    tryIt: 'Photograph an object. Then take two steps closer and shoot again. And two more steps.',
  },
  'comp-diagonals': {
    title: 'Diagonals & triangles',
    tagline: 'Lines that bring energy and movement.',
    body: [
      'Horizontal lines bring calm, vertical lines stability and strength, diagonal lines movement and tension. A staircase, a mountain, a leaning body or a branch on a diagonal makes the frame more dynamic.',
      'Three points of interest forming a triangle, such as three faces or three objects, create a composition that is both stable and alive. Renaissance painters used it all the time.',
    ],
    keyIdea: 'Tilt the composition, not the horizon: find diagonals inside the scene.',
    tryIt: 'Photograph a staircase from above or from the side so that its lines cross the frame diagonally.',
  },
  'comp-odds': {
    title: 'The rule of odds',
    tagline: 'Three is more interesting than two.',
    body: [
      'When a photograph contains two identical elements, the eye goes back and forth and the image seems to split in half. With three or five elements, the eye finds a centre and moves naturally between them.',
      'It is not a law of nature, just an observation that helps when you set up a still life, photograph food or decide how many people to include.',
    ],
    keyIdea: 'When you can choose, prefer an odd number of elements.',
    tryIt: 'Set up a still life with two pieces of fruit, then with three. Which composition holds your eye longer?',
  },
  'comp-layers': {
    title: 'Foreground, middle, background',
    tagline: 'How a flat image gains depth.',
    body: [
      'A photograph is flat, but you can create a sense of depth by building layers: something close in the foreground (a rock, flowers), the main subject in the middle, and a background (mountains, sky, city).',
      'In landscapes, an interesting foreground makes the difference between a “postcard” and a picture that draws you in. A small aperture (f/8–f/11) helps keep every layer sharp.',
    ],
    keyIdea: 'Three layers, near, middle and far, give a third dimension.',
    tryIt: 'In a landscape, crouch down so that a stone or a flower enters the bottom of the frame.',
  },
  'comp-viewpoint': {
    title: 'Viewpoint',
    tagline: 'Change your height before you change your lens.',
    body: [
      'Most photos are taken from the eye level of a standing adult, which is why they look so alike. If you get down low (worm’s-eye view), the subject looks bigger and more imposing. If you go up high (bird’s-eye view), shapes and patterns appear that you cannot see from the ground.',
      'Rodchenko and the avant-gardes between the wars made unusual angles a slogan. For children and animals, get down to their height.',
    ],
    keyIdea: 'The same scene from three heights is three different photographs.',
    tryIt: 'Photograph the same subject lying on the ground, standing, and from high up (a ladder, a balcony).',
    diagramLabels: ['From above', 'Eye level', 'From below'],
  },
  'comp-horizon': {
    title: 'The horizon',
    tagline: 'Straight, and rarely in the middle.',
    body: [
      'A tilted horizon is one of the most common mistakes and it shows immediately. Use the grid or the camera’s electronic level, or straighten it in editing.',
      'Where should it go? If the sky has dramatic clouds, give it two thirds. If the interest is on the land or the sea, put the horizon high. The middle works mostly for reflections and symmetry.',
    ],
    keyIdea: 'A level horizon, on the third that leaves room for whatever is most interesting.',
    tryIt: 'At sunset, take one photo with the horizon low and one with it high. Which tells the story better?',
  },
  'comp-leadroom': {
    title: 'Room in front of the subject',
    tagline: 'Leave space where they look or where they are going.',
    body: [
      'When a person looks, or a car moves, in one direction, the viewer’s eye wants to follow. If you leave space in front of them, the picture “breathes”. If the subject looks straight into the edge of the frame, we feel tension or claustrophobia.',
      'That can also be used on purpose: a person looking “back”, out of the frame, can suggest nostalgia or unease.',
    ],
    keyIdea: 'More space in front of the gaze or the movement, less behind.',
    tryIt: 'Photograph someone in profile, once with space in front of their face and once behind them. Compare the mood.',
    diagramLabels: ['Room ahead'],
  },
  'comp-contrast': {
    title: 'Contrast & making the subject stand out',
    tagline: 'Light on dark, warm on cool, sharp on soft.',
    body: [
      'The eye goes first to the brightest point, the sharpest, the most intense colour and to human faces. If your subject contrasts with the background, the eye finds it instantly.',
      'Look for a subject in the light against shadow, a red spot in a green landscape, or use a wide aperture to blur a distracting background.',
    ],
    keyIdea: 'Before you press the button, ask: what will the viewer see first?',
    tryIt: 'Find a person or object in a strip of sunlight surrounded by shade. Expose for the light and let the shadow go black.',
  },
  'comp-patterns': {
    title: 'Patterns & breaking them',
    tagline: 'Repetition pleases the eye; interrupting it wakes it up.',
    body: [
      'Rows of windows, chairs, roof tiles or umbrellas create rhythm. When a pattern fills the whole frame, it seems to continue beyond it.',
      'The strongest photograph, though, often comes when something breaks the pattern: one red tile among grey ones, one person in a row of empty chairs.',
    ],
    keyIdea: 'Find a pattern, then wait for the element that breaks it.',
    tryIt: 'Photograph a row of identical objects filling the frame. Then find or place a different one among them.',
  },
  'comp-balance': {
    title: 'Visual balance',
    tagline: 'A scale with invisible weights.',
    body: [
      'Every element in a photograph has a “visual weight”. Large, dark, strongly coloured elements and faces are heavy. Small, light and blurred ones are light.',
      'A photo with a heavy element on one side and nothing on the other seems to “tip over”. You can balance it with a smaller element on the opposite side, such as a big tree on the left and a small person on the right.',
    ],
    keyIdea: 'Balance a big weight with a smaller one on the other side, not necessarily with something equal.',
    tryIt: 'Find a large element (a rock, a building) and wait for a person to enter the opposite side of the frame.',
  },
  'comp-simplicity': {
    title: 'Simplicity',
    tagline: 'One photograph, one idea.',
    body: [
      'The most common cause of a confusing photograph is that it tries to say many things at once. Before you press the button, say in one sentence what you are photographing. Whatever does not serve that sentence, remove: change the angle, get closer, blur the background.',
      'Check the edges of the frame too: a cut-off hand, a rubbish bin, a sign “growing” out of a head distract more than you think.',
    ],
    keyIdea: 'Check the four edges of the frame before every shot.',
    tryIt: 'Photograph a subject. Then take the same photo again, removing three things from the frame that are not needed.',
  },
  'comp-break': {
    title: 'Break the rules',
    tagline: 'First you learn them, then you choose when to ignore them.',
    body: [
      'Composition rules are not laws. They are observations about what usually works. Many of the greatest photographs in history break them: subjects in the dead centre, tilted horizons, cropped faces, blurred motion.',
      'The difference between a mistake and a choice is intention. When you know why you are breaking a rule, the photograph gains your own voice.',
    ],
    keyIdea: 'Break a rule only when you can explain why.',
    tryIt: 'Take one of your photos that follows the rule of thirds and reshoot it, deliberately breaking the rule. Which do you prefer, and why?',
  },
};
