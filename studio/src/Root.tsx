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
  tagline: 'Twisted by hand, one stripe at a time.',
  orderLine: 'Order by 18 Dec · link in bio or WhatsApp',
  theme: 'red'
}

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
    <Composition
      id="CookieSpotlight"
      component={CookieSpotlight}
      {...formats.story}
      fps={COOKIE_SPOTLIGHT_FPS}
      durationInFrames={COOKIE_SPOTLIGHT_DURATION}
      defaultProps={cookieSpotlightDefaults}
    />
    <Still
      id="CookieSpotlight-still"
      component={CookieSpotlight}
      {...formats.portrait}
      defaultProps={cookieSpotlightDefaults}
    />
  </>
)
