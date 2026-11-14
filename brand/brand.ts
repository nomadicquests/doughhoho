// The single source of truth for how Dough Ho Ho Bakery looks.
// Every template in studio/ reads from here, so changing a colour or font
// here changes it everywhere.

import badgeGreen from './assets/badge-green.svg'
import badgeWhite from './assets/badge-white.svg'
import badgeBlack from './assets/badge-black.svg'
import badgeBlackGold from './assets/badge-black-gold.svg'
import wordmarkGreen from './assets/wordmark-green.svg'
import wordmarkWhite from './assets/wordmark-white.svg'
import wordmarkBlack from './assets/wordmark-black.svg'

export const brand = {
  name: 'Dough Ho Ho Bakery',
  handle: '@doughhoho.bakery',
  // How people order
  whatsapp: '(876) 368-0479' as string | null,
  whatsappUrl: 'https://wa.me/18763680479', // opens a chat; used for QR codes
  orderUrl: null as string | null, // TODO: the order form link
  colors: {
    green: '#17320B', // main brand colour
    gold: '#CB9B09',
    white: '#FFFFFF',
    red: '#9B2D2A',
    // Roles: templates use these, so the palette can be re-mapped in one place
    background: '#FFFFFF',
    primary: '#17320B', // green
    secondary: '#9B2D2A', // red
    accent: '#CB9B09', // gold
    text: '#17320B',
    textOnPrimary: '#FFFFFF',
  },
  fonts: {
    // Font files are bundled in studio/public/fonts/ and loaded in studio/src/fonts.ts
    heading: 'Playfair Display', // titles
    body: 'Nunito Sans',
  },
  // Logo files in brand/assets/, with transparent backgrounds. Badges are
  // round stickers with a solid centre, so they sit on photos or any colour.
  // Wordmarks are the name in text: pick the one that contrasts with what is
  // behind it (green or black on light, white on dark).
  logos: {
    badge: badgeGreen, // green ring, white centre: the default
    badgeOnDark: badgeWhite, // white ring, green centre
    badgeBlack, // black ring, black tools
    badgeBlackGold, // black ring, gold tools
    wordmark: wordmarkGreen, // for light backgrounds
    wordmarkOnDark: wordmarkWhite, // for green, red or dark photos
    wordmarkBlack,
  },
} as const
