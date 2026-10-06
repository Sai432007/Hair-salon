// High-fidelity image assets generated for Crown & Blade Barber Co.
import heroBarberImg from '../assets/images/hero_barber_craft_1791319651591.jpg';
import straightRazorImg from '../assets/images/barber_straight_razor_shave_1791319664050.jpg';
import masterStylingImg from '../assets/images/barber_master_styling_1791319675451.jpg';
import apothecaryImg from '../assets/images/barber_grooming_apothecary_1791319687256.jpg';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'hair' | 'shave' | 'combo' | 'treatments';
  durationMinutes: number;
  price: number;
  description: string;
  includes: string[];
  popular?: boolean;
}

export interface BarberMember {
  id: string;
  name: string;
  nickname: string;
  role: string;
  experienceYears: number;
  specialty: string;
  bio: string;
  favoriteProduct: string;
  daysAvailable: string[];
}

export interface CustomerReview {
  id: string;
  author: string;
  service: string;
  date: string;
  rating: number;
  comment: string;
  barber: string;
}

export interface FaceShapeGuide {
  shape: string;
  tagline: string;
  description: string;
  recommendedCuts: string[];
  avoidCuts: string[];
  bestProduct: string;
}

export const shopImages = {
  hero: heroBarberImg,
  straightRazor: straightRazorImg,
  masterStyling: masterStylingImg,
  apothecary: apothecaryImg,
};

export const servicesData: ServiceItem[] = [
  {
    id: 'signature-cut',
    name: 'Signature Haircut & Taper',
    category: 'hair',
    durationMinutes: 40,
    price: 45,
    description:
      'Precision scissor and clipper craft tailored to your skull shape and hair texture. Finished with neck taper, hot lather razor edge, and styling product.',
    includes: ['Consultation', 'Shear & Clipper Fade', 'Hot Lather Neck Shave', 'Styling & Product Finish'],
    popular: true,
  },
  {
    id: 'skin-fade',
    name: 'Master Skin Fade',
    category: 'hair',
    durationMinutes: 45,
    price: 50,
    description:
      'Zero or foil shaver transition seamlessly blended into textured shear work on top. Razor sharp hairline and clean temples.',
    includes: ['Foil Shaver Zero Blend', 'Crown Texturizing', 'Razor Line-up', 'Cold Towel Refresh'],
    popular: true,
  },
  {
    id: 'hot-towel-shave',
    name: 'Traditional Straight Razor Shave',
    category: 'shave',
    durationMinutes: 40,
    price: 42,
    description:
      'A century-old restorative ritual. Three steamed essential oil towels, warm badger brush lather, Japanese carbon blade shave, and cold astringent tonic.',
    includes: ['Eucalyptus Pre-Shave Oil', '3 Steamed Towels', 'Single-Edge Razor Pass', 'Sandalwood Cold Towel & Balm'],
    popular: false,
  },
  {
    id: 'beard-sculpt',
    name: 'Beard Sculpt & Razor Detail',
    category: 'shave',
    durationMinutes: 30,
    price: 35,
    description:
      'Full architectural shaping of facial hair length and silhouette. Cheek and neckline carved with hot lather straight razor and finished with argan beard butter.',
    includes: ['Freehand Silhouette Shaping', 'Hot Lather Cheek & Neckline', 'Warm Towel Wrap', 'Argan Beard Butter Massage'],
    popular: true,
  },
  {
    id: 'royal-treatment',
    name: 'The Royal Treatment (Full Works)',
    category: 'combo',
    durationMinutes: 75,
    price: 85,
    description:
      'Our ultimate shop flagship. Signature haircut + full hot towel straight razor shave or comprehensive beard sculpt + tea tree scalp clarifying treatment.',
    includes: ['Precision Cut of Choice', 'Full Straight Razor Shave or Beard Sculpt', 'Tea Tree Scalp Detox', 'Complimentary Craft Beverage'],
    popular: true,
  },
  {
    id: 'cut-and-beard',
    name: 'Haircut & Beard Trim Combo',
    category: 'combo',
    durationMinutes: 60,
    price: 70,
    description:
      'Complete aesthetic alignment. Precision taper or fade paired with sculpted facial hair and razor neck line-up.',
    includes: ['Full Haircut & Styling', 'Beard Contour & Taper', 'Straight Razor Edging', 'Finishing Oils'],
    popular: true,
  },
  {
    id: 'scalp-revival',
    name: 'Scalp Revival & Clay Mask',
    category: 'treatments',
    durationMinutes: 30,
    price: 32,
    description:
      'Exfoliating sea salt and tea tree scalp scrub to purge follicle buildup, followed by a pressure point scalp massage and cooling peppermint rinse.',
    includes: ['Sea Salt Exfoliation', '10-Min Acupressure Scalp Massage', 'Bentonite Clay Pack', 'Conditioning Finish'],
  },
  {
    id: 'express-edge',
    name: 'Express Line-Up & Cleanse',
    category: 'hair',
    durationMinutes: 20,
    price: 24,
    description:
      'Mid-cycle tune up between major appointments. Cleans up sideburns, temples, neckline, and outer perimeter with foil shaver and razor.',
    includes: ['Perimeter Clean-Up', 'Razor Neck Trim', 'Talc & Tonic Refresh'],
  },
];

export const barbersData: BarberMember[] = [
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    nickname: 'Sully',
    role: 'Founder & Master Barber',
    experienceYears: 15,
    specialty: 'Traditional Shear Tapers, Scissor Over Comb & Straight Razor',
    bio: 'Trained under classic British and American barbers in London and Chicago before opening Crown & Blade. Marcus believes a haircut is architecture for the face.',
    favoriteProduct: 'High-Hold Matte Clay with Earthy Cedar & Tobacco notes',
    daysAvailable: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },
  {
    id: 'julian-reyes',
    name: 'Julian Reyes',
    nickname: 'J-Fade',
    role: 'Senior Fade Specialist',
    experienceYears: 9,
    specialty: 'Zero/Foil Skin Fades, Textured Crops & Sharp Hairlines',
    bio: 'Obsessed with microscopic gradient accuracy. Julian blends modern streetwear aesthetics with surgical scissor texturing for effortless daily styling.',
    favoriteProduct: 'Dead Sea Salt Spray for natural tousled volume',
    daysAvailable: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
  {
    id: 'dominic-thorne',
    name: 'Dominic Thorne',
    nickname: 'Dom',
    role: 'Beard Alchemist & Shave Master',
    experienceYears: 11,
    specialty: 'Architectural Beard Sculpting & 5-Step Hot Towel Shaves',
    bio: 'Dominic has evaluated over 200 essential oils and carrier blends. He treats facial hair like a fine wool garment—tailored to enhance jawline definition.',
    favoriteProduct: 'Cold-Pressed Jojoba & Sandalwood Beard Elixir',
    daysAvailable: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    nickname: 'Elle',
    role: 'Precision Stylist & Texture Lead',
    experienceYears: 8,
    specialty: 'Scissor Flow Cuts, Medium-Length Tapers & Scalp Health',
    bio: 'Specializes in flow cuts, classic side-parts, curly hair transitions, and non-clipper precision work. Clients praise her consultation rigor and scalp advice.',
    favoriteProduct: 'Water-Soluble Medium Shine Pomade & Peppermint Scalp Tonic',
    daysAvailable: ['Monday', 'Tuesday', 'Friday', 'Saturday', 'Sunday'],
  },
];

export const reviewsData: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'David Sterling',
    service: 'The Royal Treatment',
    date: '3 days ago',
    rating: 5,
    comment:
      'Hands down the most authentic barbershop experience in town. Sully took 10 minutes just looking at my growth patterns before picking up a tool. The hot towel shave was pure meditation.',
    barber: 'Marcus Vance',
  },
  {
    id: 'rev-2',
    author: 'Mateo Ortiz',
    service: 'Master Skin Fade',
    date: '1 week ago',
    rating: 5,
    comment:
      'Julian is a wizard with clippers. My fade transition is seamless and stays clean even after two weeks. The atmosphere is relaxed, cold drinks on tap, and great vinyl playing.',
    barber: 'Julian Reyes',
  },
  {
    id: 'rev-3',
    author: 'Christopher Hayes',
    service: 'Beard Sculpt & Razor Detail',
    date: '2 weeks ago',
    rating: 5,
    comment:
      'I was on the verge of shaving off my 8-month beard because it was growing wild. Dom resculpted the jawline, tapered the cheeks, and gave me oil advice. Completely saved the beard.',
    barber: 'Dominic Thorne',
  },
  {
    id: 'rev-4',
    author: 'Arthur Vance-Liu',
    service: 'Signature Haircut & Taper',
    date: '3 weeks ago',
    rating: 5,
    comment:
      'Elena did a medium scissor flow on my wavy hair that looks just as good towel-dried as it does blow-dried. Outstanding professionalism and easy parking right out front.',
    barber: 'Elena Rostova',
  },
];

export const faceShapeGuides: FaceShapeGuide[] = [
  {
    shape: 'Oval',
    tagline: 'The Balanced Canvas',
    description:
      'Length is greater than width, with rounded jawline. Almost any style works, but maintaining volume on top with clean sides creates the sharpest profile.',
    recommendedCuts: ['Classic Side Part', 'Low Taper with Textured Crop', 'Pompadour', 'Mid Skin Fade'],
    avoidCuts: ['Heavy forward fringes that conceal the forehead balance'],
    bestProduct: 'Medium Hold Matte Paste or Texture Clay',
  },
  {
    shape: 'Square',
    tagline: 'The Strong Jawline',
    description:
      'Prominent angular jaw and wide forehead. Emphasize masculine lines with short, tight sides and soft texture on top to balance angles.',
    recommendedCuts: ['Buzz Cut with Skin Taper', 'Crew Cut', 'French Crop', 'Short Textured Quiff'],
    avoidCuts: ['Center parts and wide rounded silhouettes that widen the head'],
    bestProduct: 'Sea Salt Spray + Dry Matte Powder',
  },
  {
    shape: 'Round',
    tagline: 'The Angular Illusion',
    description:
      'Equal length and width with soft cheeks. Goal is to create vertical height and elongate the appearance with high contrast sides.',
    recommendedCuts: ['High Fade with Spiky Texture', 'Hard Part Comb Over', 'Tall Textured Quiff'],
    avoidCuts: ['Buzz cuts with equal lengths or bowl fringes that accentuate roundness'],
    bestProduct: 'High Hold Clay with Matte Finish',
  },
  {
    shape: 'Diamond',
    tagline: 'High Cheekbones & Tapered Chin',
    description:
      'Cheekbones are widest point with narrow forehead and pointed chin. Benefit from longer textured hair that softens cheekbone angles.',
    recommendedCuts: ['Scissor Flow with Tapered Neck', 'Textured Faux Hawk', 'Side Swept Fringe'],
    avoidCuts: ['Extreme high skin fades that make ears and cheekbones stand out too starkly'],
    bestProduct: 'Light Styling Cream or Sea Salt Spray',
  },
  {
    shape: 'Heart / Inverted Triangle',
    tagline: 'Broad Brow & Narrow Chin',
    description:
      'Broad forehead narrowing to a pointed chin. Balance the narrower lower face by incorporating a well-groomed stubble or fuller beard.',
    recommendedCuts: ['Mid-length Tapered Scissor Cut', 'Side Fringe with Stubble Beard', 'Textured Crop'],
    avoidCuts: ['Puffing up excessive height on top without facial hair grounding'],
    bestProduct: 'Beard Balm + Light Pomade',
  },
];
