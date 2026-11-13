import { loadFont } from '@remotion/fonts'
import { staticFile } from 'remotion'

// Fonts are bundled in studio/public/fonts/ so renders never depend on the
// network. To change fonts: drop the new .woff2 files in that folder, update
// this list and the names in brand/brand.ts.
export const headingFont = 'Fredoka'
export const bodyFont = 'Nunito'

const files = [
  { family: headingFont, weight: '600', file: 'fredoka-latin-600-normal.woff2' },
  { family: headingFont, weight: '700', file: 'fredoka-latin-700-normal.woff2' },
  { family: bodyFont, weight: '400', file: 'nunito-latin-400-normal.woff2' },
  { family: bodyFont, weight: '700', file: 'nunito-latin-700-normal.woff2' },
]

for (const f of files) {
  loadFont({
    family: f.family,
    url: staticFile(`fonts/${f.file}`),
    weight: f.weight,
  })
}
