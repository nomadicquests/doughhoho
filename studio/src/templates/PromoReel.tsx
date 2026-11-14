import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { brand, menu } from '@doughhoho/brand'
import { headingFont, bodyFont } from '../fonts'
import { ItemPhoto } from '../components/ItemPhoto'
import { formatPrice } from '../components/Price'
import { Logo } from '../components/Logo'

export type PromoReelProps = {
  hook: string // the first line people see; make it grab attention
  itemIds: string[]
  callToAction: string
}

export const PROMO_REEL_FPS = 30
const HOOK_SECONDS = 2.5
const ITEM_SECONDS = 3
const CTA_SECONDS = 3

export const promoReelDuration = (itemCount: number) =>
  Math.round(
    (HOOK_SECONDS + ITEM_SECONDS * itemCount + CTA_SECONDS) * PROMO_REEL_FPS,
  )

const BigText = ({ children }: { children: React.ReactNode }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const pop = spring({ frame, fps, config: { damping: 12 } })
  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: headingFont,
          fontWeight: 700,
          fontSize: 130,
          lineHeight: 1.05,
          color: brand.colors.primary,
          transform: `scale(${pop})`,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  )
}

const ItemCard = ({ itemId }: { itemId: string }) => {
  const frame = useCurrentFrame()
  const { fps, width } = useVideoConfig()
  const item = menu.find((m) => m.id === itemId) ?? menu[0]
  const slide = spring({ frame, fps, config: { damping: 15 } })
  const textIn = interpolate(frame, [8, 20], [0, 1], {
    extrapolateRight: 'clamp',
  })
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <ItemPhoto
        photo={item.photo}
        style={{
          width: width - 120,
          height: 1000,
          borderRadius: 48,
          transform: `translateX(${(1 - slide) * width}px)`,
        }}
      />
      <div style={{ opacity: textIn, textAlign: 'center', marginTop: 48 }}>
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 96,
            color: brand.colors.primary,
          }}
        >
          {item.name}
        </div>
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 80,
            color: brand.colors.secondary,
          }}
        >
          {formatPrice(item.price, item.currency)}
        </div>
      </div>
    </AbsoluteFill>
  )
}

// A vertical reel: hook line, then each item, then a call to action.
export const PromoReel = ({ hook, itemIds, callToAction }: PromoReelProps) => {
  const fps = PROMO_REEL_FPS
  const hookFrames = HOOK_SECONDS * fps
  const itemFrames = ITEM_SECONDS * fps
  return (
    <AbsoluteFill
      style={{ background: brand.colors.background, fontFamily: bodyFont }}
    >
      <Sequence durationInFrames={hookFrames}>
        <BigText>{hook}</BigText>
        <AbsoluteFill style={{ alignItems: 'center', paddingTop: 140 }}>
          <Logo variant="wordmark" style={{ width: 420 }} />
        </AbsoluteFill>
      </Sequence>
      {itemIds.map((id, i) => (
        <Sequence
          key={id}
          from={hookFrames + i * itemFrames}
          durationInFrames={itemFrames}
        >
          <ItemCard itemId={id} />
        </Sequence>
      ))}
      <Sequence from={hookFrames + itemIds.length * itemFrames}>
        <AbsoluteFill style={{ background: brand.colors.primary }}>
          <AbsoluteFill
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: brand.colors.textOnPrimary,
              fontFamily: headingFont,
              fontWeight: 700,
            }}
          >
            <Logo variant="badgeOnDark" style={{ width: 460 }} />
            <div style={{ fontSize: 120, padding: 60 }}>{callToAction}</div>
            <div
              style={{
                fontFamily: bodyFont,
                fontWeight: 800,
                fontSize: 60,
                color: brand.colors.accent,
              }}
            >
              {brand.handle}
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  )
}
