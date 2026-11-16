import { random, useVideoConfig } from 'remotion'
import { brand, type BoxContent } from '@doughhoho/brand'
import { bodyFont } from '../fonts'
import { Logo } from './Logo'
import { Cookie, useEnter } from './Festive'

// An open gift box seen from above, packed with every cookie in it: a white
// box with a red gingham liner and the logo sticker on the front edge.
// Cookies drop in one at a time, starting `delay` frames in.

type Props = {
  contents: BoxContent[]
  width: number // outside width of the box in pixels
  height: number
  delay?: number
}

type Placed = { cookie: BoxContent; x: number; y: number; size: number; r: number }

// Packs each kind of cookie whole into rows of up to `perRow`, then spreads
// each row evenly across the box floor.
const pack = (contents: BoxContent[], w: number, h: number, perRow = 5) => {
  const rows: BoxContent[][] = []
  let row: BoxContent[] = []
  let used = 0
  for (const c of contents) {
    if (used + c.count > perRow && row.length > 0) {
      rows.push(row)
      row = []
      used = 0
    }
    row.push(c)
    used += c.count
  }
  if (row.length > 0) rows.push(row)

  const placed: Placed[] = []
  const rowH = h / rows.length
  rows.forEach((kinds, ri) => {
    const items = kinds.flatMap((c) => Array.from({ length: c.count }, () => c))
    const slot = w / items.length
    const size = Math.min(rowH * 0.98, slot * 1.25)
    items.forEach((c, i) => {
      const key = `${c.name}-${ri}-${i}`
      placed.push({
        cookie: c,
        x: slot * (i + 0.5) - size / 2,
        y: rowH * (ri + 0.5) - size / 2 + (random(`y-${key}`) - 0.5) * rowH * 0.08,
        size,
        r: (random(`r-${key}`) - 0.5) * 30
      })
    })
  })
  return placed
}

const DroppedCookie = ({ p, delay }: { p: Placed; delay: number }) => {
  const enter = useEnter(delay, 13)
  return (
    <div
      style={{
        position: 'absolute',
        left: p.x,
        top: p.y,
        width: p.size,
        height: p.size,
        opacity: Math.min(1, enter * 3),
        transform: `translateY(${(1 - enter) * -260}px) scale(${1 + (1 - enter) * 0.3}) rotate(${p.r}deg)`
      }}
    >
      <Cookie cutout={p.cookie.cutout!} size={p.size} />
      {p.cookie.free ? (
        <div
          style={{
            position: 'absolute',
            right: -p.size * 0.05,
            top: -p.size * 0.05,
            transform: `rotate(${-p.r + 10}deg)`,
            background: brand.colors.secondary,
            color: brand.colors.white,
            border: `3px solid ${brand.colors.white}`,
            borderRadius: 999,
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: p.size * 0.16,
            letterSpacing: 1,
            padding: `${p.size * 0.03}px ${p.size * 0.08}px`,
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)'
          }}
        >
          FREE
        </div>
      ) : null}
    </div>
  )
}

export const CookieBox = ({ contents, width, height, delay = 0 }: Props) => {
  const { durationInFrames } = useVideoConfig()
  const isStill = durationInFrames === 1
  const box = useEnter(delay, 14)
  const rim = width * 0.035
  const pad = width * 0.03
  const floorW = width - 2 * (rim + pad)
  const floorH = height - 2 * (rim + pad)
  const placed = pack(contents, floorW, floorH)
  const sticker = useEnter(delay + 8 + placed.length * 2, 10)
  const cell = Math.round(width / 16)
  const liner = `${brand.colors.secondary}80`
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
          borderRadius: rim,
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.45)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: rim,
          borderRadius: rim * 0.5,
          backgroundColor: brand.colors.white,
          backgroundImage: [
            `repeating-linear-gradient(0deg, ${liner} 0 ${cell}px, transparent ${cell}px ${cell * 2}px)`,
            `repeating-linear-gradient(90deg, ${liner} 0 ${cell}px, transparent ${cell}px ${cell * 2}px)`
          ].join(', '),
          boxShadow: 'inset 0 10px 24px rgba(0, 0, 0, 0.25)',
          overflow: 'visible'
        }}
      >
        <div style={{ position: 'absolute', inset: pad }}>
          {placed.map((p, i) => (
            <DroppedCookie key={i} p={p} delay={delay + 6 + i * 2} />
          ))}
        </div>
      </div>
      <Logo
        variant="badge"
        style={{
          position: 'absolute',
          left: width / 2 - width * 0.09,
          bottom: -width * 0.09,
          width: width * 0.18,
          transform: `scale(${sticker}) rotate(${(1 - sticker) * -120 - 6}deg)`,
          filter: 'drop-shadow(0 6px 10px rgba(0, 0, 0, 0.35))'
        }}
      />
    </div>
  )
}
