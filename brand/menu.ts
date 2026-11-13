// The menu: items, prices and photos. Templates pull from this list, and the
// ordering form will too when it is built.
//
// TODO: replace the sample items with the real menu.
// Photos go in studio/public/menu/ and are referenced by filename.

export type MenuItem = {
  id: string
  name: string
  description: string
  price: number // in your currency's major unit, e.g. 1500 = $1,500
  currency: string
  photo: string | null // filename in studio/public/menu/, or null
  available: boolean
}

export const menu: MenuItem[] = [
  {
    id: 'sample-1',
    name: 'Sample Item One',
    description: 'A short, tasty description goes here.',
    price: 1500,
    currency: 'JMD',
    photo: null,
    available: true,
  },
  {
    id: 'sample-2',
    name: 'Sample Item Two',
    description: 'Another item, another description.',
    price: 2200,
    currency: 'JMD',
    photo: null,
    available: true,
  },
]
