import {
  AbsoluteFill,
  Img,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig
} from 'remotion'
import { brand } from '@doughhoho/brand'

// Shared pieces for the Christmas templates: the gingham background, drifting
// gold flecks, and cookie cut-outs.

// Animation progress from 0 to 1, starting `delay` frames in. Stills (one
// frame long) always get 1 so everything is shown in its final place.
export const useEnter = (delay = 0, damping = 12) => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames } = useVideoConfig()
  if (durationInFrames === 1) return 1
  return spring({ frame: frame - delay, fps, config: { damping } })
}

// Brand green with a faint gold gingham check and a soft vignette.
export const GinghamBackground = () => {
  const { width } = useVideoConfig()
  const cell = Math.round(width / 18)
  const line = `${brand.colors.accent}14`
  return (
    <AbsoluteFill style={{ background: brand.colors.primary }}>
      <AbsoluteFill
        style={{
          backgroundImage: [
            `repeating-linear-gradient(0deg, ${line} 0 ${cell}px, transparent ${cell}px ${cell * 2}px)`,
            `repeating-linear-gradient(90deg, ${line} 0 ${cell}px, transparent ${cell}px ${cell * 2}px)`
          ].join(', ')
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(0, 0, 0, 0.35) 100%)'
        }}
      />
    </AbsoluteFill>
  )
}

// Small gold flecks drifting down, like warm snow. Fixed positions in stills.
export const GoldFlecks = ({ count = 28 }: { count?: number }) => {
  const frame = useCurrentFrame()
  const { width, height } = useVideoConfig()
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {Array.from({ length: count }, (_, i) => {
        const size = 6 + random(`size-${i}`) * 10
        const speed = 0.6 + random(`speed-${i}`) * 1.2
        const x = random(`x-${i}`) * width + Math.sin((frame + i * 20) / 30) * 12
        const y = (random(`y-${i}`) * height + frame * speed) % height
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: '50%',
              background: brand.colors.accent,
              opacity: 0.25 + random(`o-${i}`) * 0.4
            }}
          />
        )
      })}
    </AbsoluteFill>
  )
}

type CookieProps = {
  cutout: string // path inside studio/public/menu/
  size: number // the cookie fits inside a square this many pixels wide
  style?: React.CSSProperties
}

// A cookie cut-out with a soft shadow so it sits on the background.
export const Cookie = ({ cutout, size, style }: CookieProps) => (
  <Img
    src={staticFile(`menu/${cutout}`)}
    style={{
      width: size,
      height: size,
      objectFit: 'contain',
      filter: 'drop-shadow(0 18px 24px rgba(0, 0, 0, 0.35))',
      ...style
    }}
  />
)
