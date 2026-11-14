import { random, useVideoConfig } from 'remotion'
import { brand, type BoxContent } from '@doughhoho/brand'
import { bodyFont } from '../fonts'
import { Logo } from './Logo'
import { Cookie, useEnter } from './Festive'

// The real gift box seen from above: a white box with fluted paper cups in a
// grid, a small stack of one cookie in each cup, and the logo sticker on the
// back wall. Cups fill left to right, top to bottom.

export type Cup = { cookie: BoxContent; count: number }

type Props = {
  cups: Cup[]
  width: number // outside width of the box in pixels
  height: number
  columns?: number
  delay?: number
}

// How a stack of cookies sits in a cup: offsets from the centre and size, as
// fractions of the cup.
const stack = (n: number) => {
  const size = n === 1 ? 0.74 : n === 2 ? 0.66 : 0.62
  const radius = n === 1 ? 0 : n === 2 ? 0.08 : 0.12
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI * 0.75
    return { dx: Math.cos(a) * radius, dy: Math.sin(a) * radius, size }
  })
}

// Bigger stacks are piled at varied angles, like candy canes tossed in a cup.
const pileTilts = [-38, 30, -12, 52]

const PaperCup = ({ size }: { size: number }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      background: `repeating-conic-gradient(${brand.colors.white} 0deg 5deg, rgba(0, 0, 0, 0.07) 5deg 10deg)`,
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.12)'
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: size * 0.1,
        borderRadius: '50%',
        background: brand.colors.white,
        boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.18)'
      }}
    />
  </div>
)

const CupCookie = ({
  cookie,
  cup,
  dx,
  dy,
  size,
  tilt,
  delay
}: {
  cookie: BoxContent
  cup: number
  dx: number
  dy: number
  size: number
  tilt: number
  delay: number
}) => {
  const enter = useEnter(delay, 13)
  const px = size * cup
  return (
    <div
      style={{
        position: 'absolute',
        left: cup / 2 + dx * cup - px / 2,
        top: cup / 2 + dy * cup - px / 2,
        width: px,
        height: px,
        opacity: Math.min(1, enter * 3),
        transform: `translateY(${(1 - enter) * -200}px) rotate(${tilt}deg)`
      }}
    >
      <Cookie cutout={cookie.cutout!} size={px} />
    </div>
  )
}

const FreeTag = ({ cup }: { cup: number }) => (
  <div
    style={{
      position: 'absolute',
      right: cup * 0.02,
      top: cup * 0.02,
      transform: 'rotate(10deg)',
      background: brand.colors.secondary,
      color: brand.colors.white,
      border: `3px solid ${brand.colors.white}`,
      borderRadius: 999,
      fontFamily: bodyFont,
      fontWeight: 800,
      fontSize: cup * 0.13,
      letterSpacing: 1,
      padding: `${cup * 0.02}px ${cup * 0.06}px`,
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)'
    }}
  >
    FREE
  </div>
)

export const CupBox = ({
  cups,
  width,
  height,
  columns = 3,
  delay = 0
}: Props) => {
  const { durationInFrames } = useVideoConfig()
  const isStill = durationInFrames === 1
  const box = useEnter(delay, 14)
  const rows = Math.ceil(cups.length / columns)
  const rim = width * 0.03
  const pad = width * 0.025
  const floorW = width - 2 * (rim + pad)
  const floorH = height - 2 * (rim + pad)
  const cellW = floorW / columns
  const cellH = floorH / rows
  const cup = Math.min(cellW, cellH) * 0.97
  const cookieCount = cups.reduce((n, c) => n + c.count, 0)
  const sticker = useEnter(delay + 8 + cookieCount * 2, 10)
  let order = 0
  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        transform: isStill ? undefined : `translateY(${(1 - box) * 120}px)`,
        opacity: box
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: brand.colors.white,
          borderRadius: rim * 0.6,
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.45)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: rim,
          borderRadius: rim * 0.3,
          background: brand.colors.white,
          boxShadow: 'inset 0 8px 20px rgba(0, 0, 0, 0.18)'
        }}
      >
        <div style={{ position: 'absolute', inset: pad }}>
          {cups.map((c, i) => {
            const col = i % columns
            const row = Math.floor(i / columns)
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: col * cellW + (cellW - cup) / 2,
                  top: row * cellH + (cellH - cup) / 2,
                  width: cup,
                  height: cup
                }}
              >
                <PaperCup size={cup} />
                {stack(c.count).map((s, j) => (
                  <CupCookie
                    key={j}
                    cookie={c.cookie}
                    cup={cup}
                    dx={s.dx}
                    dy={s.dy}
                    size={s.size}
                    tilt={
                      c.count > 2
                        ? pileTilts[j % pileTilts.length]
                        : (random(`cup-${i}-${j}`) - 0.5) * 50
                    }
                    delay={delay + 6 + order++ * 2}
                  />
                ))}
                {c.cookie.free ? <FreeTag cup={cup} /> : null}
              </div>
            )
          })}
        </div>
      </div>
      <Logo
        variant="badge"
        style={{
          position: 'absolute',
          left: width / 2 - width * 0.075,
          top: -width * 0.06,
          width: width * 0.15,
          transform: `scale(${sticker}) rotate(${(1 - sticker) * -120 - 4}deg)`,
          filter: 'drop-shadow(0 6px 10px rgba(0, 0, 0, 0.35))'
        }}
      />
    </div>
  )
}
