import { Fragment } from 'react'
import { Composition, Still } from 'remotion'
import { menu } from '@doughhoho/brand'
import { formats } from './formats'
import { ItemDrop, type ItemDropProps } from './templates/ItemDrop'
import {
  PromoReel,
  PROMO_REEL_FPS,
  promoReelDuration,
  type PromoReelProps,
} from './templates/PromoReel'
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
  headline: 'Secret Santa,',
  headlineAccent: 'sorted.',
  body: 'Order Christmas Cookie Boxes for your team or Secret Santa. J$2,400 each.',
  buttonLine: 'WhatsApp us for team orders',
  footer: 'Order by 18 Dec · @doughhoho.bakery'
}

const cookieSpotlightDefaults: CookieSpotlightProps = {
  itemId: 'christmas-cookie-box',
  cookie: 'Candy Cane',
  kicker: 'Meet the cookies',
  tagline: '',
  orderLine: 'Order by 18 Dec · link in bio or WhatsApp',
  theme: 'red'
}

const bakingDayDefaults: PhotoPanProps = {
  itemId: 'christmas-cookie-box',
  photo: 'christmas-cookie-box/photos/photo-3705.jpg',
  line: 'Christmas / is / baking.',
  detailLine: '12 cookies + a free Snow Ball · order by 18 Dec',
  zoom: 1.9,
  followLine: 'Follow us for more Christmas baking'
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
      component={PhotoPan}
      {...formats.story}
      fps={PHOTO_PAN_FPS}
      durationInFrames={photoPanDuration(bakingDayDefaults.followLine)}
      defaultProps={bakingDayDefaults}
      calculateMetadata={({ props }) => ({
        durationInFrames: photoPanDuration(props.followLine)
      })}
    />
  </>
)
