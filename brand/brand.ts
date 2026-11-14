// The single source of truth for how Doughhoho looks.
// Every template in studio/ reads from here, so changing a colour or font
// here changes it everywhere.
//
// TODO: add the logo (brand/assets/) and confirm the social handle.

export const brand = {
  name: 'Doughhoho',
  handle: '@doughhoho', // TODO: confirm the real social handle
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
  // Put the logo file in brand/assets/ and set the filename here.
  logo: null as string | null,
} as const
