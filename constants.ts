import { TimeEra } from './types';

const BASE_INSTRUCTION = "Ensure the facial features and expression remain recognizable but blend them perfectly into the target style. High resolution, photorealistic or style-appropriate output.";

export const TIME_ERAS: TimeEra[] = [
  // --- HISTORICAL ---
  {
    id: 'ancient-egypt',
    title: 'Ancient Egypt',
    description: 'Pharaohs & Gold',
    prompt: `Transform the person into an ancient Egyptian royalty with traditional gold jewelry, headdress, and linen robes. Background: The Great Sphinx and Pyramids under a golden sun. ${BASE_INSTRUCTION}`,
    icon: '👑',
    color: 'from-yellow-500 to-amber-700',
    category: 'historical'
  },
  {
    id: 'vikings',
    title: 'Viking Age',
    description: 'Warriors of the North',
    prompt: `Transform the person into a fierce Viking warrior with fur armor and leather gear. Background: A foggy fjord with longships. Dramatic, moody lighting. ${BASE_INSTRUCTION}`,
    icon: '⚔️',
    color: 'from-slate-500 to-slate-800',
    category: 'historical'
  },
  {
    id: 'roaring-20s',
    title: 'Roaring 20s',
    description: 'Jazz & Gatsby',
    prompt: `Transform the person into a 1920s jazz age character. Wearing a flapper dress or a sharp tuxedo with art deco styling. Background: A lavish 1920s ballroom party. Black and white photography style. ${BASE_INSTRUCTION}`,
    icon: '🎷',
    color: 'from-emerald-500 to-teal-900',
    category: 'historical'
  },
  {
    id: 'french-court',
    title: 'French Aristocracy',
    description: 'Marie Antoinette Era',
    prompt: `Transform the person into an 18th-century French aristocrat. Powdered wig, elaborate pastel silk gown or frock coat, heavy makeup. Background: The Hall of Mirrors in Versailles. Rococo style. ${BASE_INSTRUCTION}`,
    icon: '🍰',
    color: 'from-pink-300 to-rose-400',
    category: 'historical'
  },
  {
    id: 'samurai',
    title: 'Feudal Japan',
    description: 'Way of the Warrior',
    prompt: `Transform the person into a Samurai warrior with traditional armor (O-yoroi). Background: Cherry blossoms falling in a Japanese temple garden. Serene yet powerful. ${BASE_INSTRUCTION}`,
    icon: '👺',
    color: 'from-red-500 to-rose-900',
    category: 'historical'
  },
  {
    id: 'wild-west',
    title: 'Wild West',
    description: 'Gunslingers',
    prompt: `Transform the person into a rugged cowboy or cowgirl with a hat, bandana, and leather vest. Background: A dusty saloon town at high noon. Western movie aesthetic, sepia tint. ${BASE_INSTRUCTION}`,
    icon: '🤠',
    color: 'from-orange-500 to-red-800',
    category: 'historical'
  },

  // --- CINEMATIC ---
  {
    id: 'cyberpunk',
    title: 'Cyberpunk 2099',
    description: 'Neon Future',
    prompt: `Transform the person into a futuristic cyberpunk character with glowing neon techwear and cybernetic enhancements. Background: A rainy, neon-lit futuristic city street at night. Vibrant blue and pink lighting. ${BASE_INSTRUCTION}`,
    icon: '🤖',
    color: 'from-fuchsia-500 to-purple-900',
    category: 'cinematic'
  },
  {
    id: 'film-noir',
    title: 'Film Noir',
    description: 'The Detective',
    prompt: `Transform the person into a 1940s detective or femme fatale. Trench coat, fedora, smoking cigarette. Background: Rainy city street at night with high contrast shadows. Black and white, dramatic lighting. ${BASE_INSTRUCTION}`,
    icon: '🕵️',
    color: 'from-gray-700 to-black',
    category: 'cinematic'
  },
  {
    id: 'wes-anderson',
    title: 'Symmetrical',
    description: 'Pastel Indie Movie',
    prompt: `Transform the person into a character from a Wes Anderson movie. Quirky vintage outfit, beanie or beret, very symmetrical composition. Background: A pastel colored hotel or train car. Flat lighting, pastel color palette. ${BASE_INSTRUCTION}`,
    icon: '🏨',
    color: 'from-pink-200 to-yellow-200',
    category: 'cinematic'
  },
  {
    id: '80s-arcade',
    title: 'Retro Arcade',
    description: 'Synthwave Glow',
    prompt: `Transform the person into a cool 1980s character. Denim jacket, aviators, big hair. Background: An arcade with glowing cabinets or a grid landscape. Synthwave aesthetic, VHS grain effect. ${BASE_INSTRUCTION}`,
    icon: '🕹️',
    color: 'from-purple-500 to-indigo-500',
    category: 'cinematic'
  },
  {
    id: 'astronaut',
    title: 'Space Odyssey',
    description: 'Sci-Fi Epic',
    prompt: `Transform the person into a cinematic sci-fi astronaut. High-tech sleek spacesuit. Background: Inside a futuristic spaceship looking out at a nebula. Kubrick style symmetry and lighting. ${BASE_INSTRUCTION}`,
    icon: '🚀',
    color: 'from-blue-500 to-indigo-900',
    category: 'cinematic'
  },

  // --- ARTISTIC ---
  {
    id: 'oil-painting',
    title: 'Oil Portrait',
    description: 'Classical Masterpiece',
    prompt: `Transform the image into a classical oil painting style (Rembrandt or Da Vinci). Heavy brushstrokes, dramatic lighting (chiaroscuro), rich textures. The person should look like a painted portrait.`,
    icon: '🎨',
    color: 'from-amber-600 to-yellow-800',
    category: 'artistic'
  },
  {
    id: 'pop-art',
    title: 'Pop Art',
    description: 'Warhol Style',
    prompt: `Transform the image into a Pop Art style screen print. Bold solid colors, halftone dots, high contrast. Andy Warhol aesthetic.`,
    icon: '🥫',
    color: 'from-yellow-400 to-pink-500',
    category: 'artistic'
  },
  {
    id: 'sketch',
    title: 'Charcoal Sketch',
    description: 'Hand Drawn',
    prompt: `Transform the image into a charcoal sketch on textured paper. Black and white, rough lines, shading.`,
    icon: '✏️',
    color: 'from-gray-400 to-gray-600',
    category: 'artistic'
  },
  {
    id: 'statue',
    title: 'Marble Statue',
    description: 'Greek God',
    prompt: `Transform the person into a classic Greek marble statue. White stone texture, draped fabric. Background: A museum pedestal or ancient temple.`,
    icon: '🏛️',
    color: 'from-stone-100 to-stone-300',
    category: 'artistic'
  }
];

export const CUSTOM_ERA: TimeEra = {
    id: 'custom',
    title: 'Special Commission',
    description: 'Your Imagination',
    prompt: '', // Populated dynamically
    icon: '✨',
    color: 'from-amber-500 to-amber-700',
    category: 'custom'
};