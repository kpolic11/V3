import type { Lang, QuizQuestion, TimelineBase, TimelineText, TipBase, TipText } from './types';

/* ============================== TIPS ============================== */

export const TIP_BASE: TipBase[] = [
  { id: 1, icon: 'Sun', simulatorType: 'light' },
  { id: 2, icon: 'Sliders', simulatorType: 'exposure' },
  { id: 3, icon: 'Grid3X3', simulatorType: 'composition' },
  { id: 4, icon: 'Smartphone', simulatorType: 'gear' },
  { id: 5, icon: 'CheckSquare', simulatorType: 'curation' },
  { id: 6, icon: 'BookOpen' },
  { id: 7, icon: 'Printer' },
  { id: 8, icon: 'Heart' },
];

const tipsEl: TipText[] = [
  {
    title: '1. Το Φως είναι η Γραφή σου',
    tagline: 'Η λέξη «φωτογραφία» σημαίνει γραφή με φως. Χωρίς φως δεν υπάρχει εικόνα.',
    description: 'Παρατήρησε την κατεύθυνση, την ένταση και τη θερμοκρασία του φωτός. Η «χρυσή ώρα» (λίγο μετά την ανατολή και λίγο πριν τη δύση) δίνει ζεστό, μαλακό φως. Το μεσημέρι το φως είναι σκληρό, ενώ μια συννεφιασμένη μέρα λειτουργεί ως ιδανικός διαχυτής για πορτρέτα.',
    practicalAction: 'Πριν πατήσεις το κουμπί, ρώτα τον εαυτό σου: από πού έρχεται το φως και τι διάθεση δίνει στο θέμα μου;',
    keyRule: 'Χρυσή ώρα = ζεστό & μαλακό φως | Συννεφιά = τέλεια διάχυση | Μεσημέρι = σκληρές σκιές',
  },
  {
    title: '2. Διάφραγμα, Ταχύτητα & ISO',
    tagline: 'Οι τρεις πυλώνες που ελέγχουν το φως και τη δημιουργική αισθητική.',
    description: 'Το διάφραγμα (f-stop) ρυθμίζει το βάθος πεδίου (f/1.4 για θολό φόντο, f/16 για τοπία). Η ταχύτητα κλείστρου παγώνει τη δράση (1/1000s) ή αποτυπώνει τη ροή (1/2s). Το ISO αυξάνει την ευαισθησία στο σκοτάδι αλλά προσθέτει κόκκο.',
    practicalAction: 'Δοκίμασε τη χειροκίνητη (Manual / Pro) λειτουργία στην κάμερα του κινητού σου ή στη μηχανή σου.',
    keyRule: 'Διάφραγμα = βάθος πεδίου | Ταχύτητα = κίνηση | ISO = ευαισθησία / θόρυβος',
  },
  {
    title: '3. Κανόνας των Τρίτων & Γωνίες Λήψης',
    tagline: 'Οργάνωσε τα στοιχεία ώστε το μάτι του θεατή να ταξιδέψει μέσα στο κάδρο.',
    description: 'Τοποθέτησε το θέμα στις τομές του νοητού πλέγματος 3x3. Αξιοποίησε οδηγητικές γραμμές (δρόμοι, ακτές, κάγκελα) και άφησε κενό χώρο για να «αναπνέει» το θέμα. Άλλαξε οπτική γωνία: γονάτισε ή ανέβα ψηλά.',
    practicalAction: 'Ενεργοποίησε το πλέγμα (Grid) στις ρυθμίσεις της κάμερας του κινητού σου.',
    keyRule: 'Μην κεντράρεις μηχανικά. Χρησιμοποίησε τα τρίτα, τις οδηγητικές γραμμές και άλλαξε ύψος.',
  },
  {
    title: '4. Η Καλύτερη Κάμερα είναι αυτή που έχεις μαζί σου',
    tagline: 'Μην περιμένεις ακριβό εξοπλισμό για να δημιουργήσεις.',
    description: 'Πολλοί σπουδαίοι φωτογράφοι, όπως ο Καρτιέ-Μπρεσόν, δούλεψαν μια ολόκληρη ζωή με μία μηχανή και έναν φακό 50mm. Το smartphone στην τσέπη σου έχει τεχνολογία που δεν θα ονειρεύονταν οι πρωτοπόροι του 20ού αιώνα.',
    practicalAction: 'Πέρασε μια εβδομάδα φωτογραφίζοντας μόνο με το κινητό σου, εστιάζοντας στη στιγμή και στο φως.',
    keyRule: 'Το μάτι και η σκέψη τραβούν τη φωτογραφία, όχι τα megapixel.',
  },
  {
    title: '5. Επιλογή & Θεματικές Ενότητες',
    tagline: 'Ένας φωτογράφος ξεχωρίζει και από τις φωτογραφίες που αποφασίζει να ΜΗΝ δείξει.',
    description: 'Τράβηξε ελεύθερα, αλλά στο τέλος κράτησε μόνο τις καλύτερες. Μάθε να απορρίπτεις τις μέτριες λήψεις, ακόμα κι αν έχεις συναισθηματικό δέσιμο. Δούλευε σε θεματικές ιστορίες: η γειτονιά σου, οι τεχνίτες της πόλης, η γιαγιά σου.',
    practicalAction: 'Φτιάξε μια μικρή σειρά 10 επιλεγμένων φωτογραφιών γύρω από ένα θέμα της καθημερινότητάς σου.',
    keyRule: 'Καλύτερα 5 εξαιρετικές φωτογραφίες παρά 50 επαναλαμβανόμενες.',
  },
  {
    title: '6. Εκπαίδευσε το Βλέμμα σου',
    tagline: 'Ξεφύλλισε λευκώματα, επισκέψου μουσεία και ρώτα: «Γιατί με αγγίζει αυτή η εικόνα;»',
    description: 'Μελέτησε το φως του Ρέμπραντ και του Καραβάτζιο, τη γεωμετρία του Καρτιέ-Μπρεσόν, την τόλμη του Κάπα, τους τόνους του Άνσελ Άνταμς και τα χρώματα του Έγκλεστον. Η οπτική παιδεία σε βοηθά να βρεις τη δική σου φωνή.',
    practicalAction: 'Βρες ένα φωτογραφικό λεύκωμα και ανάλυσε τη σύνθεση σε 3 αγαπημένες σου εικόνες.',
    keyRule: 'Για να γράψεις ποίηση πρέπει να διαβάσεις ποιητές. Το ίδιο ισχύει για τη γραφή με φως.',
  },
  {
    title: '7. Τύπωσε τη Δουλειά σου & Άκου Ειλικρινή Σχόλια',
    tagline: 'Μια τυπωμένη φωτογραφία έχει υπόσταση που καμία οθόνη δεν αντικαθιστά.',
    description: 'Μπες σε μια φωτογραφική λέσχη ή σε μια ομάδα φίλων που μπορούν να σου δώσουν ουσιαστική κριτική. Η ειλικρινής παρατήρηση ενός συναδέλφου αξίζει περισσότερο από εκατό «μου αρέσει».',
    practicalAction: 'Διάλεξε την αγαπημένη σου φωτογραφία αυτού του μήνα και τύπωσέ την σε καλό χαρτί 20x30 εκ.',
    keyRule: 'Η φωτογραφία ολοκληρώνεται όταν τυπωθεί.',
  },
  {
    title: '8. Η Κάμερα Δίνει Δύναμη και Απαιτεί Ευθύνη',
    tagline: 'Ρώτα πάντα: «Πώς θα ένιωθα εγώ στη θέση του ανθρώπου απέναντι από τον φακό;»',
    description: 'Η μηχανή σού επιτρέπει να πλησιάσεις ανθρώπινες ζωές και στιγμές ευαλωτότητας. Ζήτα άδεια όταν χρειάζεται, προστάτευσε τα παιδιά και τους ανθρώπους σε δύσκολες συνθήκες, και μην εκμεταλλεύεσαι τον πόνο για εντυπωσιασμό.',
    practicalAction: 'Στη φωτογραφία δρόμου, ένα χαμόγελο και ένα ευγενικό «ευχαριστώ» ανοίγουν πόρτες.',
    keyRule: 'Ο άνθρωπος είναι πάντα πιο σημαντικός από τη λήψη.',
  },
];

const tipsEn: TipText[] = [
  {
    title: '1. Light Is Your Writing',
    tagline: 'The word “photography” means writing with light. No light, no image.',
    description: 'Watch the direction, strength and temperature of light. The “golden hour” (just after sunrise and just before sunset) gives warm, soft light. Midday light is harsh, while an overcast day acts as a perfect diffuser for portraits.',
    practicalAction: 'Before you press the button, ask yourself: where is the light coming from, and what mood does it give my subject?',
    keyRule: 'Golden hour = warm & soft | Overcast = perfect diffusion | Midday = hard shadows',
  },
  {
    title: '2. Aperture, Shutter & ISO',
    tagline: 'The three pillars that control light and creative look.',
    description: 'Aperture (f-stop) sets depth of field (f/1.4 for a soft background, f/16 for landscapes). Shutter speed freezes action (1/1000s) or shows flow (1/2s). ISO increases sensitivity in the dark but adds grain.',
    practicalAction: 'Try the manual (Manual / Pro) mode on your phone’s camera app or on your camera.',
    keyRule: 'Aperture = depth of field | Shutter = motion | ISO = sensitivity / noise',
  },
  {
    title: '3. Rule of Thirds & Viewpoints',
    tagline: 'Arrange the elements so the viewer’s eye travels through the frame.',
    description: 'Place the subject on the intersections of an imaginary 3x3 grid. Use leading lines (roads, shorelines, railings) and leave empty space so the subject can “breathe”. Change your viewpoint: kneel down or climb up.',
    practicalAction: 'Turn on the grid in your phone’s camera settings.',
    keyRule: 'Don’t centre mechanically. Use thirds, leading lines, and change your height.',
  },
  {
    title: '4. The Best Camera Is the One You Have With You',
    tagline: 'Don’t wait for expensive gear to start creating.',
    description: 'Many great photographers, such as Cartier-Bresson, worked their whole lives with one camera and a 50mm lens. The smartphone in your pocket has technology the pioneers of the twentieth century could only dream of.',
    practicalAction: 'Spend a week shooting only with your phone, focusing on the moment and the light.',
    keyRule: 'The eye and the mind take the picture, not the megapixels.',
  },
  {
    title: '5. Selection & Themed Series',
    tagline: 'A photographer also stands out by the pictures they choose NOT to show.',
    description: 'Shoot freely, but in the end keep only the best. Learn to reject mediocre frames, even when you are emotionally attached. Work on themed stories: your neighbourhood, the city’s craftspeople, your grandmother.',
    practicalAction: 'Build a small series of 10 selected photographs around one theme from your daily life.',
    keyRule: 'Better 5 excellent photographs than 50 repetitive ones.',
  },
  {
    title: '6. Train Your Eye',
    tagline: 'Leaf through photobooks, visit museums and ask: “Why does this picture move me?”',
    description: 'Study the light of Rembrandt and Caravaggio, the geometry of Cartier-Bresson, the daring of Capa, the tones of Ansel Adams and the colours of Eggleston. Visual literacy helps you find your own voice.',
    practicalAction: 'Find a photobook and analyse the composition of 3 of your favourite pictures.',
    keyRule: 'To write poetry you must read poets. The same goes for writing with light.',
  },
  {
    title: '7. Print Your Work & Listen to Honest Feedback',
    tagline: 'A printed photograph has a presence no screen can replace.',
    description: 'Join a photo club or a group of friends who can give you real criticism. An honest comment from a fellow photographer is worth more than a hundred likes.',
    practicalAction: 'Choose your favourite photograph of the month and print it on good paper at 20x30 cm.',
    keyRule: 'A photograph is complete when it is printed.',
  },
  {
    title: '8. The Camera Gives Power and Demands Responsibility',
    tagline: 'Always ask: “How would I feel in the place of the person in front of the lens?”',
    description: 'A camera lets you get close to people’s lives and moments of vulnerability. Ask permission when needed, protect children and people in hard circumstances, and never exploit pain for effect.',
    practicalAction: 'In street photography, a smile and a polite “thank you” open doors.',
    keyRule: 'The person is always more important than the shot.',
  },
];

export const TIP_TEXT: Record<Lang, TipText[]> = { el: tipsEl, en: tipsEn };

/* ============================== GENERAL QUIZ ============================== */

const quizEl: QuizQuestion[] = [
  {
    id: 1,
    question: 'Ποιο ήταν το βασικό μειονέκτημα της νταγκεροτυπίας του 1839;',
    options: ['Δεν είχε καθαρή εστίαση', 'Ήταν μοναδική και δεν μπορούσε να αναπαραχθεί σε αντίγραφα', 'Χρειαζόταν 3 μέρες έκθεσης στον ήλιο', 'Ήταν αποκλειστικά έγχρωμη'],
    correctIndex: 1,
    explanation: 'Η νταγκεροτυπία ήταν μια επάργυρη μεταλλική πλάκα χωρίς αρνητικό, οπότε κάθε φωτογραφία ήταν μοναδική. Η λύση ήρθε από τον Τάλμποτ με την καλοτυπία (αρνητικό-θετικό).',
  },
  {
    id: 2,
    question: 'Ποιο σύνθημα συνόδευσε την πρώτη Kodak το 1888;',
    options: ['«Μια εικόνα αξίζει όσο χίλιες λέξεις»', '«Εσύ πατάς το κουμπί, εμείς κάνουμε τα υπόλοιπα»', '«Φωτογράφισε τον κόσμο σε χρώμα»', '«Η τέχνη του φωτός για όλους»'],
    correctIndex: 1,
    explanation: 'Το σύνθημα της Kodak ήταν «You press the button, we do the rest»: ο χρήστης δεν χρειαζόταν πια να ξέρει χημεία.',
  },
  {
    id: 3,
    question: 'Από πού πήρε το όνομά της η ομάδα «f/64»;',
    options: ['Από τη χρονιά ίδρυσης (1964)', 'Από τον αριθμό των μελών της', 'Από ένα πολύ μικρό διάφραγμα που δίνει μέγιστο βάθος πεδίου', 'Από την εστιακή απόσταση των φακών τους'],
    correctIndex: 2,
    explanation: 'Το f/64 είναι πολύ μικρό άνοιγμα, διαθέσιμο σε κάμερες μεγάλου φορμά, που κρατά καθαρά τα πάντα από το πρώτο πλάνο ως τον ορίζοντα.',
  },
  {
    id: 4,
    question: 'Ποιος μίλησε για την «αποφασιστική στιγμή»;',
    options: ['Ο Ρόμπερτ Κάπα', 'Ο Ανρί Καρτιέ-Μπρεσόν', 'Ο Άλφρεντ Στίγκλιτς', 'Ο Ουίλιαμ Έγκλεστον'],
    correctIndex: 1,
    explanation: 'Ο Καρτιέ-Μπρεσόν περιέγραψε το κλάσμα του δευτερολέπτου όπου το γεγονός και η μορφή συναντιούνται τέλεια.',
  },
  {
    id: 5,
    question: 'Τι συμβαίνει με μεγάλο άνοιγμα διαφράγματος (π.χ. f/1.4);',
    options: ['Όλο το κάδρο γίνεται καθαρό', 'Η κίνηση παγώνει αυτόματα', 'Το θέμα είναι καθαρό και το φόντο θολώνει (ρηχό βάθος πεδίου)', 'Η εικόνα γεμίζει θόρυβο'],
    correctIndex: 2,
    explanation: 'Το μεγάλο άνοιγμα (μικρός αριθμός f) μικραίνει το βάθος πεδίου και απομονώνει το θέμα από το φόντο.',
  },
  {
    id: 6,
    question: 'Αν ανοίξεις το διάφραγμα κατά ένα στοπ, πώς πρέπει να αλλάξεις την ταχύτητα για να μείνει ίδια η έκθεση;',
    options: ['Να τη διπλασιάσεις σε χρόνο (π.χ. 1/125 → 1/60)', 'Να την κάνεις διπλάσια γρήγορη (π.χ. 1/125 → 1/250)', 'Να την αφήσεις ίδια', 'Να ανεβάσεις και το ISO'],
    correctIndex: 1,
    explanation: 'Ένα στοπ μεγαλύτερο άνοιγμα διπλασιάζει το φως. Για να μείνει ίδια η έκθεση, μειώνεις τον χρόνο στο μισό: από 1/125 σε 1/250.',
  },
  {
    id: 7,
    question: 'Γιατί μια φωτογραφία στο χιόνι βγαίνει συχνά γκρίζα και σκοτεινή;',
    options: ['Επειδή το χιόνι απορροφά το φως', 'Επειδή το φωτόμετρο προσπαθεί να κάνει τη σκηνή μεσαίο γκρι', 'Επειδή το κρύο χαλάει τον αισθητήρα', 'Επειδή το ISO είναι πολύ υψηλό'],
    correctIndex: 1,
    explanation: 'Το φωτόμετρο «υποθέτει» ότι κάθε σκηνή είναι κατά μέσο όρο μεσαίο γκρι. Σε πολύ φωτεινές σκηνές χρειάζεται θετική αντιστάθμιση (+1 ή +2).',
  },
  {
    id: 8,
    question: 'Τι δείχνει το δεξί άκρο ενός ιστογράμματος;',
    options: ['Τις σκιές', 'Τους μεσαίους τόνους', 'Τα φωτεινά σημεία της εικόνας', 'Το χρώμα'],
    correctIndex: 2,
    explanation: 'Το ιστόγραμμα πηγαίνει από το μαύρο (αριστερά) στο λευκό (δεξιά). Αν «κολλάει» στο δεξί άκρο, κάποια φωτεινά σημεία έχουν «καεί».',
  },
];

const quizEn: QuizQuestion[] = [
  {
    id: 1,
    question: 'What was the main drawback of the 1839 daguerreotype?',
    options: ['It had no sharp focus', 'It was unique and could not be copied', 'It needed 3 days of exposure in the sun', 'It was colour only'],
    correctIndex: 1,
    explanation: 'The daguerreotype was a silvered metal plate with no negative, so every picture was unique. The answer came from Talbot’s calotype (negative–positive).',
  },
  {
    id: 2,
    question: 'Which slogan accompanied the first Kodak in 1888?',
    options: ['“A picture is worth a thousand words”', '“You press the button, we do the rest”', '“Photograph the world in colour”', '“The art of light for everyone”'],
    correctIndex: 1,
    explanation: 'Kodak’s slogan was “You press the button, we do the rest”: users no longer needed to know any chemistry.',
  },
  {
    id: 3,
    question: 'Where does the name “Group f/64” come from?',
    options: ['The year it was founded (1964)', 'The number of members', 'A very small aperture that gives maximum depth of field', 'The focal length of their lenses'],
    correctIndex: 2,
    explanation: 'f/64 is a very small opening, available on large-format cameras, that keeps everything sharp from foreground to horizon.',
  },
  {
    id: 4,
    question: 'Who spoke of the “decisive moment”?',
    options: ['Robert Capa', 'Henri Cartier-Bresson', 'Alfred Stieglitz', 'William Eggleston'],
    correctIndex: 1,
    explanation: 'Cartier-Bresson described the fraction of a second when event and form meet perfectly.',
  },
  {
    id: 5,
    question: 'What happens with a wide aperture (e.g. f/1.4)?',
    options: ['The whole frame becomes sharp', 'Motion freezes automatically', 'The subject is sharp and the background blurs (shallow depth of field)', 'The image fills with noise'],
    correctIndex: 2,
    explanation: 'A wide aperture (small f-number) reduces depth of field and separates the subject from the background.',
  },
  {
    id: 6,
    question: 'If you open the aperture by one stop, how must you change the shutter speed to keep the same exposure?',
    options: ['Double the time (e.g. 1/125 → 1/60)', 'Make it twice as fast (e.g. 1/125 → 1/250)', 'Leave it the same', 'Raise the ISO as well'],
    correctIndex: 1,
    explanation: 'One stop wider doubles the light. To keep the same exposure you halve the time: from 1/125 to 1/250.',
  },
  {
    id: 7,
    question: 'Why does a photo of snow often come out grey and dark?',
    options: ['Because snow absorbs light', 'Because the light meter tries to make the scene mid-grey', 'Because cold damages the sensor', 'Because the ISO is too high'],
    correctIndex: 1,
    explanation: 'The meter “assumes” every scene averages out to mid-grey. Very bright scenes need positive compensation (+1 or +2).',
  },
  {
    id: 8,
    question: 'What does the right-hand end of a histogram show?',
    options: ['The shadows', 'The midtones', 'The brightest parts of the image', 'Colour'],
    correctIndex: 2,
    explanation: 'A histogram runs from black (left) to white (right). If it piles up against the right edge, some highlights are blown.',
  },
];

export const QUIZ_TEXT: Record<Lang, QuizQuestion[]> = { el: quizEl, en: quizEn };

/* ============================== TIMELINE ============================== */

export const TIMELINE_BASE: TimelineBase[] = [
  { id: 't1604', year: '1604', category: 'invention' },
  { id: 't1826', year: '1826', category: 'invention' },
  { id: 't1839', year: '1839', category: 'invention' },
  { id: 't1841', year: '1841', category: 'invention' },
  { id: 't1851', year: '1851', category: 'invention' },
  { id: 't1855', year: '1855', category: 'culture' },
  { id: 't1861', year: '1861', category: 'invention' },
  { id: 't1878', year: '1878', category: 'art' },
  { id: 't1888', year: '1888', category: 'culture' },
  { id: 't1900', year: '1900', category: 'culture' },
  { id: 't1907', year: '1907', category: 'invention' },
  { id: 't1925', year: '1925', category: 'invention' },
  { id: 't1932', year: '1932', category: 'art' },
  { id: 't1936', year: '1936', category: 'culture' },
  { id: 't1947', year: '1947', category: 'art' },
  { id: 't1975', year: '1975', category: 'invention' },
  { id: 't1976', year: '1976', category: 'art' },
  { id: 't1990', year: '1990', category: 'culture' },
  { id: 't2000', year: '2000s →', category: 'culture' },
];

const tlEl: Record<string, TimelineText> = {
  t1604: { title: 'Ο Κέπλερ δίνει όνομα στον σκοτεινό θάλαμο', protagonist: 'Γιοχάνες Κέπλερ', description: 'Σε βιβλίο του για την οπτική χρησιμοποιεί πρώτη φορά τον όρο «camera obscura».', impact: 'Η λέξη «κάμερα», από την ελληνική «καμάρα», μπαίνει στη γλώσσα της επιστήμης.' },
  t1826: { title: 'Η παλαιότερη σωζόμενη φωτογραφία', protagonist: 'Νικεφόρ Νιεπς', description: 'Θέα από το παράθυρο στο Λε Γκρα, σε πλάκα με άσφαλτο της Ιουδαίας, μετά από έκθεση πολλών ωρών.', impact: 'Απέδειξε ότι το φως μπορεί να αφήσει μόνιμο ίχνος.' },
  t1839: { title: 'Η νταγκεροτυπία ανακοινώνεται', protagonist: 'Λουί Νταγκέρ', description: 'Επάργυρη χάλκινη πλάκα με εκπληκτική λεπτομέρεια. Η γαλλική κυβέρνηση δημοσιοποιεί την εφεύρεση.', impact: 'Το 1839 θεωρείται η χρονιά γέννησης της φωτογραφίας.' },
  t1841: { title: 'Η καλοτυπία: αρνητικό & θετικό', protagonist: 'Ουίλιαμ Χένρι Φοξ Τάλμποτ', description: 'Αρνητικό σε χαρτί, από το οποίο τυπώνονται όσα θετικά αντίτυπα θέλεις.', impact: 'Η βάση της φωτογραφικής αναπαραγωγής για 150 χρόνια.' },
  t1851: { title: 'Υγρό κολλόδιο & γυάλινες πλάκες', protagonist: 'Φρέντερικ Σκοτ Άρτσερ', description: 'Καθαρότητα σαν της νταγκεροτυπίας και αντίγραφα σαν της καλοτυπίας, με έκθεση λίγων δευτερολέπτων.', impact: 'Τα στούντιο πορτρέτου πολλαπλασιάζονται.' },
  t1855: { title: 'Ο πόλεμος μπροστά στον φακό', protagonist: 'Ρότζερ Φέντον', description: 'Ο Φέντον φωτογραφίζει τον Κριμαϊκό Πόλεμο με ένα άμαξα-εργαστήριο.', impact: 'Αρχίζει η πολεμική φωτογραφία και η συζήτηση για τη στημένη εικόνα.' },
  t1861: { title: 'Η πρώτη έγχρωμη φωτογραφία', protagonist: 'Τζέιμς Κλαρκ Μάξγουελ', description: 'Τρεις λήψεις μιας κορδέλας με κόκκινο, πράσινο και μπλε φίλτρο, προβαλλόμενες η μία πάνω στην άλλη.', impact: 'Η αρχή των τριών χρωμάτων ζει σε κάθε ψηφιακό αισθητήρα.' },
  t1878: { title: 'Το άλογο σε κίνηση', protagonist: 'Έντουαρντ Μάιμπριτζ', description: 'Μια σειρά καμερών δείχνει ότι το άλογο που καλπάζει σηκώνει και τα τέσσερα πόδια.', impact: 'Προπομπός του κινηματογράφου.' },
  t1888: { title: 'Η πρώτη Kodak', protagonist: 'Τζορτζ Ίστμαν', description: '«Εσύ πατάς το κουμπί, εμείς κάνουμε τα υπόλοιπα». Κουτί με φιλμ για 100 λήψεις.', impact: 'Η φωτογραφία γίνεται υπόθεση όλων.' },
  t1900: { title: 'Η Brownie του ενός δολαρίου', protagonist: 'Kodak', description: 'Φτηνή κάμερα, για οικογένειες και παιδιά.', impact: 'Γεννιέται το οικογενειακό άλμπουμ.' },
  t1907: { title: 'Autochrome: χρώμα στο εμπόριο', protagonist: 'Αδερφοί Λυμιέρ', description: 'Γυάλινες πλάκες με χρωματισμένους κόκκους αμύλου πατάτας.', impact: 'Η πρώτη πρακτική έγχρωμη φωτογραφία.' },
  t1925: { title: 'Η Leica των 35mm', protagonist: 'Όσκαρ Μπάρνακ', description: 'Μικρή, αθόρυβη κάμερα με φιλμ κινηματογράφου.', impact: 'Γεννά το φωτορεπορτάζ και τη φωτογραφία δρόμου.' },
  t1932: { title: 'Ιδρύεται η ομάδα f/64', protagonist: 'Άνσελ Άνταμς, Έντουαρντ Γουέστον', description: 'Καθαρή εστίαση και μέγιστο βάθος πεδίου.', impact: 'Ο μοντερνισμός κερδίζει τον πικτοριαλισμό.' },
  t1936: { title: 'Η «Μητέρα Μετανάστρια»', protagonist: 'Ντοροθέα Λανγκ', description: 'Πορτρέτο μιας μητέρας σε καταυλισμό εργατών στην Καλιφόρνια.', impact: 'Σύμβολο της Μεγάλης Ύφεσης και της φωτογραφίας ντοκουμέντου.' },
  t1947: { title: 'Ιδρύεται το Magnum', protagonist: 'Ρόμπερτ Κάπα, Ανρί Καρτιέ-Μπρεσόν κ.ά.', description: 'Συνεταιρισμός φωτογράφων που κρατούν τα δικαιώματα των έργων τους.', impact: 'Το πιο επιδραστικό πρακτορείο φωτορεπορτάζ.' },
  t1975: { title: 'Η πρώτη ψηφιακή κάμερα', protagonist: 'Στίβεν Σάσον (Kodak)', description: 'Σχεδόν 4 κιλά, 0,01 megapixel, εγγραφή σε κασέτα σε 23 δευτερόλεπτα.', impact: 'Η αρχή του τέλους για το χημικό φιλμ.' },
  t1976: { title: 'Ο Έγκλεστον στο MoMA', protagonist: 'Ουίλιαμ Έγκλεστον', description: 'Έκθεση έγχρωμων φωτογραφιών σε κορυφαίο μουσείο τέχνης.', impact: 'Το χρώμα γίνεται δεκτό ως τέχνη.' },
  t1990: { title: 'Photoshop 1.0', protagonist: 'Τόμας & Τζον Νολ', description: 'Ο σκοτεινός θάλαμος μεταφέρεται στην οθόνη.', impact: 'Νέα συζήτηση για την αλήθεια της εικόνας.' },
  t2000: { title: 'Smartphone, υπολογιστική φωτογραφία & AI', protagonist: 'Όλοι μας', description: 'Κάμερα σε κάθε τσέπη, αλγόριθμοι σε κάθε λήψη, και παράλληλα επιστροφή του φιλμ.', impact: 'Η φωτογραφία γίνεται παγκόσμια γλώσσα.' },
};

const tlEn: Record<string, TimelineText> = {
  t1604: { title: 'Kepler names the dark chamber', protagonist: 'Johannes Kepler', description: 'In a book on optics he uses the term “camera obscura” for the first time.', impact: 'The word “camera”, from the Greek kamara, enters the language of science.' },
  t1826: { title: 'The oldest surviving photograph', protagonist: 'Nicéphore Niépce', description: 'View from the window at Le Gras, on a plate coated with bitumen of Judea, after an exposure of many hours.', impact: 'Proved that light can leave a permanent trace.' },
  t1839: { title: 'The daguerreotype is announced', protagonist: 'Louis Daguerre', description: 'A silvered copper plate with astonishing detail. The French government makes the invention public.', impact: '1839 is considered the birth year of photography.' },
  t1841: { title: 'The calotype: negative & positive', protagonist: 'William Henry Fox Talbot', description: 'A paper negative from which you can print as many positives as you like.', impact: 'The basis of photographic reproduction for 150 years.' },
  t1851: { title: 'Wet collodion & glass plates', protagonist: 'Frederick Scott Archer', description: 'Daguerreotype-like clarity with calotype-like copies, in exposures of a few seconds.', impact: 'Portrait studios multiply.' },
  t1855: { title: 'War in front of the lens', protagonist: 'Roger Fenton', description: 'Fenton photographs the Crimean War with a horse-drawn darkroom.', impact: 'War photography begins, and so does the debate about staged pictures.' },
  t1861: { title: 'The first colour photograph', protagonist: 'James Clerk Maxwell', description: 'Three shots of a ribbon through red, green and blue filters, projected on top of each other.', impact: 'The three-colour principle lives on in every digital sensor.' },
  t1878: { title: 'The Horse in Motion', protagonist: 'Eadweard Muybridge', description: 'A row of cameras shows that a galloping horse lifts all four hooves.', impact: 'A forerunner of cinema.' },
  t1888: { title: 'The first Kodak', protagonist: 'George Eastman', description: '“You press the button, we do the rest.” A box with film for 100 pictures.', impact: 'Photography becomes everyone’s business.' },
  t1900: { title: 'The one-dollar Brownie', protagonist: 'Kodak', description: 'A cheap camera for families and children.', impact: 'The family album is born.' },
  t1907: { title: 'Autochrome: colour goes on sale', protagonist: 'The Lumière brothers', description: 'Glass plates with dyed grains of potato starch.', impact: 'The first practical colour photography.' },
  t1925: { title: 'The 35mm Leica', protagonist: 'Oskar Barnack', description: 'A small, quiet camera using cinema film.', impact: 'Gives birth to photojournalism and street photography.' },
  t1932: { title: 'Group f/64 is founded', protagonist: 'Ansel Adams, Edward Weston', description: 'Sharp focus and maximum depth of field.', impact: 'Modernism wins over pictorialism.' },
  t1936: { title: 'Migrant Mother', protagonist: 'Dorothea Lange', description: 'Portrait of a mother in a pea-pickers’ camp in California.', impact: 'A symbol of the Great Depression and of documentary photography.' },
  t1947: { title: 'Magnum is founded', protagonist: 'Robert Capa, Henri Cartier-Bresson and others', description: 'A cooperative of photographers who keep the rights to their work.', impact: 'The most influential photojournalism agency.' },
  t1975: { title: 'The first digital camera', protagonist: 'Steven Sasson (Kodak)', description: 'Almost 4 kilos, 0.01 megapixels, recording to cassette in 23 seconds.', impact: 'The beginning of the end for chemical film.' },
  t1976: { title: 'Eggleston at MoMA', protagonist: 'William Eggleston', description: 'An exhibition of colour photographs at a leading art museum.', impact: 'Colour is accepted as art.' },
  t1990: { title: 'Photoshop 1.0', protagonist: 'Thomas & John Knoll', description: 'The darkroom moves onto the screen.', impact: 'A new debate about the truth of the image.' },
  t2000: { title: 'Smartphones, computational photography & AI', protagonist: 'All of us', description: 'A camera in every pocket, algorithms in every shot, and at the same time a return to film.', impact: 'Photography becomes a global language.' },
};

export const TIMELINE_TEXT: Record<Lang, Record<string, TimelineText>> = { el: tlEl, en: tlEn };
