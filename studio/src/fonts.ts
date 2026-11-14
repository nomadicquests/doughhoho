import { loadFont } from '@remotion/fonts'
import { staticFile } from 'remotion'
import { brand } from '@doughhoho/brand'

// Fonts are bundled in studio/public/fonts/ so renders never depend on the
// network. To change fonts: drop the new .woff2 files in that folder, update
// this list and the names in brand/brand.ts.
export const headingFont = brand.fonts.heading
export const bodyFont = brand.fonts.body

const files = [
  { family: headingFont, weight: '700', style: 'normal', file: 'playfair-display-latin-700-normal.woff2' },
  { family: headingFont, weight: '700', style: 'italic', file: 'playfair-display-latin-700-italic.woff2' },
  { family: headingFont, weight: '400', style: 'italic', file: 'playfair-display-latin-400-italic.woff2' },
  { family: bodyFont, weight: '400', style: 'normal', file: 'nunito-sans-latin-400-normal.woff2' },
  { family: bodyFont, weight: '700', style: 'normal', file: 'nunito-sans-latin-700-normal.woff2' },
  { family: bodyFont, weight: '800', style: 'normal', file: 'nunito-sans-latin-800-normal.woff2' },
]

for (const f of files) {
  loadFont({
    family: f.family,
    url: staticFile(`fonts/${f.file}`),
    weight: f.weight,
    style: f.style,
  })
}
