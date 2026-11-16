// The menu: items, prices and photos. Templates pull from this list, and the
// ordering form will too when it is built.
// Photos go in studio/public/menu/ and are referenced by filename.

export type BoxContent = {
  name: string
  count: number
  free?: boolean // thrown in at no charge
  cutout?: string // photo with the background removed, in studio/public/menu/
  tagline?: string // one line about the cookie, for posts
}

export type MenuItem = {
  id: string
  name: string
  description: string
  price: number // in your currency's major unit, e.g. 1500 = $1,500
  currency: string
  photo: string | null // filename in studio/public/menu/, or null
  available: boolean
  contents?: BoxContent[] // for boxes and bundles: what is inside
  sizes?: { name: string; price: number }[] // when it comes in sizes; price is then the smallest
}

export const menu: MenuItem[] = [
  {
    id: 'christmas-cookie-box',
    name: 'Christmas Cookie Box',
    description: '12 Christmas cookies + a free Peppermint Snow Ball',
    price: 2400,
    currency: 'JMD',
    photo: null, // TODO: a box shot showing only the cookies below
    // Cut-outs, tray and box photos are in studio/public/menu/christmas-cookie-box/
    available: true,
    contents: [
      {
        name: 'Candy Cane',
        tagline: 'Peppermint, twisted by hand.',
        cutout: 'christmas-cookie-box/cutouts/candy-cane.webp',
        count: 4
      },
      {
        name: 'Butter Cookies',
        tagline: 'Melts in your mouth. Tastes like Christmas.',
        cutout: 'christmas-cookie-box/cutouts/butter-cookie.webp',
        count: 4
      },
      {
        name: 'Cranberry Pistachio',
        tagline: 'Chewy, and packed with real cranberries and pistachios.',
        cutout: 'christmas-cookie-box/cutouts/cranberry-pistachio.webp',
        count: 2
      },
      {
        name: 'Triple Ginger Snap',
        tagline: 'Snappy, with three kinds of ginger for a real kick.',
        cutout: 'christmas-cookie-box/cutouts/triple-ginger-snap.webp',
        count: 2
      },
      {
        name: 'Peppermint Snow Balls',
        cutout: 'christmas-cookie-box/cutouts/peppermint-snow-ball.webp',
        count: 1,
        free: true
      },
    ],
  },
  {
    id: 'christmas-cake',
    name: 'Jamaican Black Cake',
    description: 'Traditional Jamaican Christmas cake',
    price: 3500, // the 6 inch; see sizes
    currency: 'JMD',
    photo: 'christmas-cake/photos/cake-cut.jpg',
    available: true,
    sizes: [
      { name: '6 inch', price: 3500 },
      { name: '8 inch', price: 5750 },
      { name: '10 inch', price: 7500 }
    ]
  }
]
