// The single source of truth for how Doughhoho looks.
// Every template in studio/ reads from here, so changing a colour or font
// here changes it everywhere.
//
// TODO: replace these placeholders with the real brand colours, fonts and logo.

export const brand = {
  name: 'Doughhoho',
  handle: '@doughhoho', // TODO: confirm the real social handle
  colors: {
    background: '#FFF4E6', // warm cream
    primary: '#C2410C', // toasted orange
    secondary: '#3F2A1D', // dark crust brown
    accent: '#FACC15', // butter yellow
    text: '#3F2A1D',
    textOnPrimary: '#FFFFFF',
  },
  fonts: {
    // Any Google Font name works here; loaded in studio/src/fonts.ts
    heading: 'Fredoka',
    body: 'Nunito',
  },
  // Put the logo file in brand/assets/ and set the filename here.
  logo: null as string | null,
} as const
