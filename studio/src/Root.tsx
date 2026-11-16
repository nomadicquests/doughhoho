import { Fragment } from 'react'
import { Composition, Still } from 'remotion'
import { brand, menu } from '@doughhoho/brand'
import { formats } from './formats'
import { ItemDrop, type ItemDropProps } from './templates/ItemDrop'
import {
  PromoReel,
  PROMO_REEL_FPS,
  promoReelDuration,
  type PromoReelProps,
} from './templates/PromoReel'
import { ZoomIn, type ZoomInProps } from './templates/ZoomIn'
import {
  MeetTheCookies,
  MeetTheCookiesSlide,
  MEET_THE_COOKIES_FPS,
  meetTheCookiesDuration,
  meetTheCookiesSlideCount,
  type MeetTheCookiesProps
} from './templates/MeetTheCookies'
import {
  BoxReveal,
  BOX_REVEAL_FPS,
  BOX_REVEAL_DURATION,
  type BoxRevealProps
} from './templates/BoxReveal'
import {
  CookieSpotlight,
  COOKIE_SPOTLIGHT_FPS,
  COOKIE_SPOTLIGHT_DURATION,
  type CookieSpotlightProps
} from './templates/CookieSpotlight'
import {
  PhotoPan,
  PHOTO_PAN_FPS,
  photoPanDuration,
  type PhotoPanProps
} from './templates/PhotoPan'
import { Poster, POSTER_A3, type PosterProps } from './templates/Poster'
import {
  BakingDay,
  BAKING_DAY_FPS,
  BAKING_DAY_DURATION,
  type BakingDayProps
} from './templates/BakingDay'
import { PosterBold, type PosterBoldProps } from './templates/PosterBold'
import { MenuCard, type MenuCardProps } from './templates/MenuCard'
import { PosterSingle, type PosterSingleProps } from './templates/PosterSingle'
import {
  SizeCarousel,
  sizeCarouselSlideCount,
  type SizeCarouselProps
} from './templates/SizeCarousel'
import {
  CakeReel,
  CAKE_REEL_FPS,
  cakeReelDuration,
  type CakeReelProps
} from './templates/CakeReel'
import { formatPrice } from './components/Price'
import {
  PhotoAnnouncement,
  type PhotoAnnouncementProps
} from './templates/PhotoAnnouncement'

const itemDropDefaults: ItemDropProps = {
  itemId: menu[0].id,
  badge: 'NEW',
  callToAction: 'Order now',
}

const promoReelDefaults: PromoReelProps = {
  hook: 'Fresh this week 🔥',
  itemIds: menu.map((m) => m.id),
  callToAction: 'Order now!',
}

const zoomInDefaults: ZoomInProps = {
  headline: 'Come closer…',
  headlineItalic: 'this is awkward',
  prompt: 'zoom in',
  secretMessage:
    'Hi! It’s Nella, the baker behind Dough Ho-Ho. I just started this page and I have exactly 4 followers: my sister, my brother, one account I’m pretty sure is a bot… and me, from my personal account. (Yes, I followed myself. Don’t judge.) 😅 If you follow, I promise lots of fresh bakes, zero spam, and a little happy dance in the kitchen for every new follower. Let’s get to 5!'
}

const meetTheCookiesDefaults: MeetTheCookiesProps = {
  itemId: 'christmas-cookie-box',
  headline: 'A baker\'s dozen',
  headlineAccent: 'of Christmas',
  subline: '12 cookies + 1 free 🎄',
  preorderLine: 'Preorder now · order by 18 Dec',
  orderLine: 'WhatsApp us to order',
  boxLayout: 'cups'
}

const boxRevealDefaults: BoxRevealProps = {
  itemId: 'christmas-cookie-box',
  line: 'Black cake / has / company.',
  preorderLine: 'Preorder now · order by 18 Dec',
  orderLine: 'WhatsApp us to order',
  photo: 'christmas-cookie-box/photos/box-open.jpg',
  clip: null,
  clipStartSeconds: 0
}

const secretSantaDefaults: PhotoAnnouncementProps = {
  photo: 'christmas-cookie-box/photos/box-open.jpg',
  photoFocus: '50% 55%',
  kicker: 'For the office',
  headline: 'Cookies make',
  headlineAccent: 'the best colleagues.',
  body: 'Gift your crew (or Secret Santa) a Christmas Cookie Box. J$2,400 each. Order 6 or more and enjoy 10% off!',
  buttonLine: `Order via WhatsApp: ${brand.whatsapp}`,
  footer: `Order by 5 Dec · ${brand.handle}`
}

const cookieSpotlightDefaults: CookieSpotlightProps = {
  itemId: 'christmas-cookie-box',
  cookie: 'Candy Cane',
  kicker: 'Meet the cookies',
  tagline: '',
  orderLine: 'Order by 18 Dec · link in bio or WhatsApp',
  theme: 'red'
}

const bakingDayDefaults: BakingDayProps = {
  trayPhoto: 'christmas-cookie-box/photos/photo-3705.jpg',
  trayLine: "It's beginning to / smell a lot / like Christmas.",
  cakePhoto: 'christmas-cake/photos/cake-whole.jpg',
  cakeLine: 'Black cake / season / is here.',
  menuTitle: 'Fresh for Christmas',
  cakeCutout: 'christmas-cake/cutouts/cake.webp',
  boxPhoto: 'christmas-cookie-box/photos/box-open-sticker-fixed.jpg',
  orderBy: 'Order by Fri 18 Dec',
  followLine: 'Follow us for more Christmas baking',
  cakeTransition: 'dissolve'
}

const posterDefaults: PosterProps = {
  headline: 'Black cake has',
  headlineAccent: 'company.',
  subline: 'Jamaican Black Cake & Christmas Cookie Boxes, baked by hand',
  badge: 'Perfect for gifting',
  cards: [
    {
      itemId: 'christmas-cake',
      photo: 'christmas-cake/photos/cake-cut.jpg',
      photoFocus: '45% 45%',
      inset: 'christmas-cake/photos/cake-tin.jpg',
      insetFocus: '50% 55%',
      insetLabel: 'Gold gift tin',
      title: 'Jamaican Black Cake',
      details: '6, 8 & 10 inch',
      priceLabel: 'from'
    },
    {
      itemId: 'christmas-cookie-box',
      photo: 'christmas-cookie-box/photos/box-open.jpg',
      photoFocus: '52% 50%',
      inset: null,
      insetFocus: '50% 50%',
      insetLabel: '',
      title: 'Christmas Cookie Box',
      details: '12 cookies + a free Peppermint Snow Ball',
      priceLabel: ''
    }
  ],
  orderBy: 'Order by 18 December',
  orderLine: 'WhatsApp to order',
  fulfilment: 'Delivery or pickup',
  qrCode: 'print/whatsapp-qr.png'
}

const cake = menu.find((m) => m.id === 'christmas-cake') ?? menu[0]
const cookieBox = menu.find((m) => m.id === 'christmas-cookie-box') ?? menu[0]

const posterBoldDefaults: PosterBoldProps = {
  concept: 'A',
  headline: 'Christmas Cakes',
  headline2: '& Cookie Boxes',
  callout: 'Order now for Christmas',
  badge: 'Perfect for gifting',
  deal: '10% off 6 or more cakes or boxes',
  products: [
    {
      photo: 'christmas-cake/photos/cake-whole.jpg',
      focus: '50% 62%',
      name: cake.name,
      details: '6, 8 or 10 inch',
      price: formatPrice(cake.price, cake.currency),
      pricePrefix: 'from'
    },
    {
      photo: 'christmas-cookie-box/photos/box-six-cups.jpg',
      focus: '50% 45%',
      name: cookieBox.name,
      details: '12 cookies + 1 free',
      price: formatPrice(cookieBox.price, cookieBox.currency),
      pricePrefix: ''
    }
  ],
  orderBy: 'Order by Fri 18 Dec',
  fulfilment: 'Delivery or pickup',
  qrCode: 'print/whatsapp-qr.png',
  logo: 'wordmark',
  priceStyle: 'tag',
  heroBackdrop: '#DEDBD6'
}

const posterCookieBox: PosterSingleProps = {
  itemId: 'christmas-cookie-box',
  photo: 'christmas-cookie-box/photos/box-open-sticker-fixed.jpg',
  focus: '50% 55%',
  photoWidth: 1,
  backdrop: '#F3F3F3',
  inset: 'christmas-cookie-box/photos/box-gift-wrapped.jpg',
  insetFocus: '50% 40%',
  headline: 'Christmas Cookie Box',
  headlineSize: 96,
  subline: '12 cookies + a free Peppermint Snow Ball',
  pricePrefix: '',
  showContents: true,
  showSizes: false,
  note: '',
  orderBy: 'Order by Fri 18 Dec',
  deal: '10% off 6 or more boxes',
  badge: 'Perfect for gifting',
  fulfilment: 'Delivery or pickup',
  qrCode: 'print/whatsapp-qr.png'
}

const posterCake: PosterSingleProps = {
  ...posterCookieBox,
  itemId: 'christmas-cake',
  photo: 'christmas-cake/photos/cake-whole.jpg',
  focus: '50% 62%',
  photoWidth: 0.78,
  backdrop: '#DEDBD6',
  inset: 'christmas-cake/photos/cake-slice.jpg',
  insetFocus: '55% 62%',
  headline: 'Christmas Cake',
  headlineSize: 112,
  subline: 'Real Jamaican black cake, baked by hand',
  pricePrefix: 'from',
  showContents: false,
  showSizes: true,
  note: 'Made with rum and wine for the richest festive flavour',
  deal: '10% off 6 or more cakes'
}

const cakeReelDefaults: CakeReelProps = {
  itemId: 'christmas-cake',
  scenes: [
    {
      photo: 'christmas-cake/photos/cake-whole.jpg',
      focus: '55% 60%',
      fit: 'cover',
      line: 'Real / Jamaican / black cake.',
      dark: false
    },
    {
      photo: 'christmas-cake/photos/cake-slice.jpg',
      focus: '55% 62%',
      fit: 'cover',
      line: 'Rum. / Wine. / Christmas.',
      dark: true
    },
    {
      photo: 'christmas-cake/photos/cake-tin-tied.jpg',
      focus: '50% 50%',
      fit: 'contain',
      line: 'Gift / ready.',
      dark: true
    }
  ],
  sizesTitle: 'Pick your size',
  orderBy: 'Order by Fri 18 Dec',
  orderLine: 'WhatsApp to order'
}

const sizeCarouselDefaults: SizeCarouselProps = {
  itemId: 'christmas-cake',
  slide: 1,
  cutout: 'christmas-cake/cutouts/cake.webp',
  coverTitle: 'How much Christmas cake do you truly need?',
  coverAccent: 'truly',
  coverAside: '(No judgment here.)',
  coverSwipe: 'Swipe to find your perfect size →',
  sizes: [
    {
      headline: 'Just for you',
      line: 'No need to share. Your secret is safe with us.'
    },
    {
      headline: 'For the family',
      line: "Enough to go around for Mummy, Daddy, the kids and all of Grandma's opinions."
    },
    {
      headline: 'For the whole crew',
      line: 'Aunties, cousins, neighbours who just drop by, and a secret extra slice for you.'
    }
  ],
  orderPhoto: 'christmas-cake/photos/cake-tin-tied.jpg',
  orderTitle: 'Found your perfect size?',
  orderLine: "WhatsApp your name, cake size and quantity, and we'll handle the rest.",
  orderBy: 'Order by Fri 18 Dec',
  deal: '10% off 6 or more cakes'
}

const menuCardDefaults: MenuCardProps = {
  style: 'card',
  title: 'Christmas Menu',
  cakeNote: 'Made with rum and wine',
  cakePhoto: 'christmas-cake/photos/cake-whole.jpg',
  cakeTinPhoto: 'christmas-cake/cutouts/cake-tin.webp',
  boxPhoto: 'christmas-cookie-box/photos/box-open-sticker-fixed.jpg',
  deal: '10% off 6 or more cakes or boxes',
  orderBy: 'Preorder by Sat 5 Dec'
}

// One spotlight per cookie in the box, in posting order
const spotlightCookies = [
  'Candy Cane',
  'Triple Ginger Snap',
  'Butter Cookies',
  'Cranberry Pistachio'
]

const boxCookieCount = (itemId: string) =>
  (menu.find((m) => m.id === itemId)?.contents ?? []).filter((c) => c.cutout)
    .length

// Every template appears here. Open `pnpm studio` to edit the text live in the
// sidebar, then render from the Studio or the command line.
export const Root = () => (
  <>
    <Still
      id="ItemDrop-square"
      component={ItemDrop}
      {...formats.square}
      defaultProps={itemDropDefaults}
    />
    <Still
      id="ItemDrop-portrait"
      component={ItemDrop}
      {...formats.portrait}
      defaultProps={itemDropDefaults}
    />
    <Still
      id="ItemDrop-story"
      component={ItemDrop}
      {...formats.story}
      defaultProps={itemDropDefaults}
    />
    <Still
      id="ZoomIn-portrait"
      component={ZoomIn}
      {...formats.portrait}
      defaultProps={zoomInDefaults}
    />
    <Composition
      id="PromoReel"
      component={PromoReel}
      {...formats.story}
      fps={PROMO_REEL_FPS}
      durationInFrames={promoReelDuration(promoReelDefaults.itemIds.length)}
      defaultProps={promoReelDefaults}
      calculateMetadata={({ props }) => ({
        durationInFrames: promoReelDuration(props.itemIds.length),
      })}
    />
    <Composition
      id="MeetTheCookies"
      component={MeetTheCookies}
      {...formats.story}
      fps={MEET_THE_COOKIES_FPS}
      durationInFrames={meetTheCookiesDuration(
        boxCookieCount(meetTheCookiesDefaults.itemId)
      )}
      defaultProps={meetTheCookiesDefaults}
      calculateMetadata={({ props }) => ({
        durationInFrames: meetTheCookiesDuration(boxCookieCount(props.itemId))
      })}
    />
    {Array.from(
      { length: meetTheCookiesSlideCount(meetTheCookiesDefaults.itemId) },
      (_, i) => (
        <Still
          key={i}
          id={`MeetTheCookies-slide-${i + 1}`}
          component={MeetTheCookiesSlide}
          {...formats.portrait}
          defaultProps={{ ...meetTheCookiesDefaults, slide: i + 1 }}
        />
      )
    )}
    <Composition
      id="BoxReveal"
      component={BoxReveal}
      {...formats.story}
      fps={BOX_REVEAL_FPS}
      durationInFrames={BOX_REVEAL_DURATION}
      defaultProps={boxRevealDefaults}
    />
    <Still
      id="SecretSanta"
      component={PhotoAnnouncement}
      {...formats.portrait}
      defaultProps={secretSantaDefaults}
    />
    <Still
      id="SecretSanta-story"
      component={PhotoAnnouncement}
      {...formats.story}
      defaultProps={secretSantaDefaults}
    />
    {spotlightCookies.map((cookie) => {
      const id = cookie.replace(/[^A-Za-z]/g, '')
      const props = { ...cookieSpotlightDefaults, cookie }
      return (
        <Fragment key={cookie}>
          <Composition
            id={`Spotlight-${id}`}
            component={CookieSpotlight}
            {...formats.story}
            fps={COOKIE_SPOTLIGHT_FPS}
            durationInFrames={COOKIE_SPOTLIGHT_DURATION}
            defaultProps={props}
          />
          <Still
            id={`Spotlight-${id}-still`}
            component={CookieSpotlight}
            {...formats.portrait}
            defaultProps={props}
          />
        </Fragment>
      )
    })}
    <Composition
      id="BakingDay"
      component={BakingDay}
      {...formats.story}
      fps={BAKING_DAY_FPS}
      durationInFrames={BAKING_DAY_DURATION}
      defaultProps={bakingDayDefaults}
    />
    {(['dissolve', 'scroll', 'drop'] as const).map((cakeTransition) => (
      <Composition
        key={cakeTransition}
        id={`BakingDay-${cakeTransition}`}
        component={BakingDay}
        {...formats.story}
        fps={BAKING_DAY_FPS}
        durationInFrames={BAKING_DAY_DURATION}
        defaultProps={{ ...bakingDayDefaults, cakeTransition }}
      />
    ))}
    <Still
      id="Poster-A3"
      component={Poster}
      {...POSTER_A3}
      defaultProps={posterDefaults}
    />
    {(['A', 'B', 'C'] as const).map((concept) => (
      <Still
        key={concept}
        id={`PosterBold-${concept}`}
        component={PosterBold}
        {...POSTER_A3}
        defaultProps={{ ...posterBoldDefaults, concept }}
      />
    ))}
    <Still
      id="MenuPost"
      component={PosterBold}
      {...formats.portrait}
      defaultProps={{
        ...posterBoldDefaults,
        concept: 'B',
        feed: true,
        products: [
          {
            ...posterBoldDefaults.products[0],
            details: (cake.sizes ?? [])
              .map((sz) => `${sz.name.replace(' inch', '"')} ${formatPrice(sz.price, cake.currency)}`)
              .join(' · ')
          },
          posterBoldDefaults.products[1]
        ]
      }}
    />
    {(['pill', 'seal', 'tag'] as const).map((priceStyle) => (
      <Still
        key={priceStyle}
        id={`PosterBold-B-${priceStyle}`}
        component={PosterBold}
        {...POSTER_A3}
        defaultProps={{ ...posterBoldDefaults, concept: 'B', priceStyle }}
      />
    ))}
    <Still
      id="Poster-Cake"
      component={PosterSingle}
      {...POSTER_A3}
      defaultProps={posterCake}
    />
    <Still
      id="Poster-CookieBox"
      component={PosterSingle}
      {...POSTER_A3}
      defaultProps={posterCookieBox}
    />
    <Composition
      id="CakeReel"
      component={CakeReel}
      {...formats.story}
      fps={CAKE_REEL_FPS}
      durationInFrames={cakeReelDuration(cakeReelDefaults.scenes.length)}
      defaultProps={cakeReelDefaults}
      calculateMetadata={({ props }) => ({
        durationInFrames: cakeReelDuration(props.scenes.length)
      })}
    />
    {Array.from(
      { length: sizeCarouselSlideCount(sizeCarouselDefaults.itemId) },
      (_, i) => (
        <Still
          key={`size-${i}`}
          id={`PickYourSize-slide-${i + 1}`}
          component={SizeCarousel}
          {...formats.portrait}
          defaultProps={{ ...sizeCarouselDefaults, slide: i + 1 }}
        />
      )
    )}
    {(['card', 'chalk', 'split'] as const).map((style) => (
      <Still
        key={style}
        id={`MenuCard-${style}`}
        component={MenuCard}
        {...formats.portrait}
        defaultProps={{ ...menuCardDefaults, style }}
      />
    ))}
  </>
)
