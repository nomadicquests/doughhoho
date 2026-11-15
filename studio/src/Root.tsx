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
import { ZoomIn, type ZoomInProps } from './templates/ZoomIn'

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
  </>
)
