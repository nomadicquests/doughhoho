import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { brand, menu } from '@doughhoho/brand'
import { headingFont, bodyFont } from '../fonts'
import { formatPrice } from '../components/Price'
import { Logo } from '../components/Logo'
import {
  Cookie,
  GinghamBackground,
  GoldFlecks,
  useEnter,
  type Theme
} from '../components/Festive'

export type CookieSpotlightProps = {
  itemId: string // the box the cookie comes in
  cookie: string // a cookie name from the box's contents, e.g. 'Candy Cane'
  kicker: string // small line above the name
  tagline: string // one line about the cookie
  orderLine: string
  theme: Theme
}

export const COOKIE_SPOTLIGHT_FPS = 30
export const COOKIE_SPOTLIGHT_DURATION = 180 // 6 seconds

// One cookie, big, on a white plate: its name, a line about it, how many come
// in the box, then the box price and how to order. A Reel, or a still.
export const CookieSpotlight = (props: CookieSpotlightProps) => {
  const frame = useCurrentFrame()
  const { width, height, durationInFrames } = useVideoConfig()
  const isStill = durationInFrames === 1
  const item = menu.find((m) => m.id === props.itemId) ?? menu[0]
  const contents = item.contents ?? []
  const cookie = contents.find((c) => c.name === props.cookie) ?? contents[0]
  const s = width / 1080
  const red = props.theme === 'red'
  const tall = height > width * 1.5 // Reels and Stories, not the feed

  const plate = useEnter(0, 14)
  const spin = useEnter(6, 12)
  const kicker = useEnter(14, 16)
  const name = useEnter(20, 15)
  const tagline = useEnter(28, 16)
  const tag = useEnter(36, 9)
  const footer = useEnter(60, 16)
  const float = isStill ? 0 : Math.sin(frame / 14) * 8 * s

  const plateSize = Math.min(width * 0.66, height * (tall ? 0.34 : 0.33))
  const cookieSize = plateSize * 0.8
  const tagSize = plateSize * 0.3
  const rise = (p: number) => ({
    opacity: p,
    transform: `translateY(${(1 - p) * 36 * s}px)`
  })
  const detail = cookie.free
    ? `${cookie.count} free in every box`
    : `${cookie.count} in every box`

  return (
    <AbsoluteFill style={{ fontFamily: bodyFont, color: brand.colors.white }}>
      <GinghamBackground theme={props.theme} />
      <GoldFlecks color={red ? brand.colors.white : brand.colors.accent} />
      <AbsoluteFill
        style={{
          alignItems: 'center',
          textAlign: 'center',
          paddingTop: height * (tall ? 0.06 : 0.035),
          paddingBottom: height * (tall ? 0.17 : 0.04)
        }}
      >
        <Logo variant="wordmarkOnDark" style={{ width: 260 * s }} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              fontWeight: 800,
              fontSize: 34 * s,
              letterSpacing: 5 * s,
              textTransform: 'uppercase',
              color: red ? brand.colors.white : brand.colors.accent,
              opacity: kicker * 0.9,
              transform: `translateY(${(1 - kicker) * 20 * s}px)`,
              marginBottom: (tall ? 36 : 24) * s
            }}
          >
            {props.kicker}
          </div>
          <div
            style={{
              position: 'relative',
              width: plateSize,
              height: plateSize,
              transform: `translateY(${float}px) scale(${plate})`
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: brand.colors.white,
                border: `${6 * s}px solid ${brand.colors.accent}`,
                boxShadow: `0 ${24 * s}px ${50 * s}px rgba(0, 0, 0, 0.35), inset 0 0 0 ${18 * s}px rgba(0, 0, 0, 0.04)`
              }}
            />
            <Cookie
              cutout={cookie.cutout!}
              size={cookieSize}
              style={{
                position: 'absolute',
                left: (plateSize - cookieSize) / 2,
                top: (plateSize - cookieSize) / 2,
                transform: `scale(${0.6 + spin * 0.4}) rotate(${(1 - spin) * -160}deg)`,
                opacity: Math.min(1, spin * 2)
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: -tagSize * 0.2,
                top: -tagSize * 0.05,
                width: tagSize,
                height: tagSize,
                borderRadius: '50%',
                background: cookie.free ? brand.colors.secondary : brand.colors.accent,
                color: cookie.free ? brand.colors.white : brand.colors.primary,
                border: `${tagSize * 0.04}px solid ${brand.colors.white}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: cookie.free ? tagSize * 0.26 : tagSize * 0.38,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                transform: `scale(${tag}) rotate(${(1 - tag) * 40 + 8}deg)`
              }}
            >
              {cookie.free ? 'FREE' : `×${cookie.count}`}
            </div>
          </div>
          <div
            style={{
              fontFamily: headingFont,
              fontWeight: 700,
              fontSize: 112 * s,
              lineHeight: 1.05,
              marginTop: (tall ? 52 : 34) * s,
              padding: `0 ${60 * s}px`,
              textWrap: 'balance',
              ...rise(name)
            }}
          >
            {cookie.name}
          </div>
          <div
            style={{
              fontFamily: headingFont,
              fontStyle: 'italic',
              fontSize: 48 * s,
              lineHeight: 1.3,
              marginTop: 16 * s,
              padding: `0 ${90 * s}px`,
              textWrap: 'balance',
              color: red ? brand.colors.white : brand.colors.accent,
              ...rise(tagline)
            }}
          >
            {props.tagline}
          </div>
          <div
            style={{
              fontWeight: 800,
              fontSize: 36 * s,
              letterSpacing: 4 * s,
              textTransform: 'uppercase',
              marginTop: 22 * s,
              color: red ? brand.colors.white : brand.colors.accent,
              ...rise(tagline)
            }}
          >
            {detail}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14 * s,
            ...rise(footer)
          }}
        >
          <div
            style={{
              background: brand.colors.white,
              color: red ? brand.colors.secondary : brand.colors.primary,
              fontWeight: 800,
              fontSize: 36 * s,
              padding: `${16 * s}px ${44 * s}px`,
              borderRadius: 999,
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            {item.name} · {formatPrice(item.price, item.currency)}
          </div>
          <div style={{ fontWeight: 700, fontSize: 32 * s }}>{props.orderLine}</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}
