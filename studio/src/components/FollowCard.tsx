import { AbsoluteFill, useVideoConfig } from 'remotion'
import { brand } from '@doughhoho/brand'
import { headingFont, bodyFont } from '../fonts'
import { Logo } from './Logo'
import { useEnter } from './Festive'

// A simple camera outline, so the handle reads as a social account without
// using any platform's logo.
const CameraIcon = ({ size, color }: { size: number; color: string }) => (
  <div
    style={{
      position: 'relative',
      width: size,
      height: size,
      border: `${size * 0.11}px solid ${color}`,
      borderRadius: size * 0.3,
      boxSizing: 'border-box'
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: size * 0.42,
        height: size * 0.42,
        transform: 'translate(-50%, -50%)',
        border: `${size * 0.11}px solid ${color}`,
        borderRadius: '50%',
        boxSizing: 'border-box'
      }}
    />
    <div
      style={{
        position: 'absolute',
        right: size * 0.13,
        top: size * 0.13,
        width: size * 0.12,
        height: size * 0.12,
        borderRadius: '50%',
        background: color
      }}
    />
  </div>
)

// An end screen asking people to follow: logo, a line, and the handle.
// Place it in a Sequence; it fades in over whatever is behind it.
export const FollowCard = ({ line }: { line: string }) => {
  const { width } = useVideoConfig()
  const s = width / 1080
  const bg = useEnter(0, 200)
  const badge = useEnter(4, 11)
  const text = useEnter(10, 16)
  const button = useEnter(16, 11)
  return (
    <AbsoluteFill
      style={{
        background: `${brand.colors.secondary}F2`,
        opacity: bg,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: brand.colors.white,
        fontFamily: bodyFont
      }}
    >
      <Logo
        variant="badgeOnDark"
        style={{
          width: 340 * s,
          transform: `scale(${badge}) rotate(${(1 - badge) * -90}deg)`
        }}
      />
      <div
        style={{
          fontFamily: headingFont,
          fontWeight: 700,
          fontSize: 92 * s,
          lineHeight: 1.1,
          marginTop: 50 * s,
          padding: `0 ${80 * s}px`,
          textWrap: 'balance',
          opacity: text,
          transform: `translateY(${(1 - text) * 30 * s}px)`
        }}
      >
        {line}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18 * s,
          marginTop: 44 * s,
          background: brand.colors.white,
          color: brand.colors.secondary,
          fontWeight: 800,
          fontSize: 48 * s,
          padding: `${22 * s}px ${54 * s}px`,
          borderRadius: 999,
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
          transform: `scale(${button})`
        }}
      >
        <CameraIcon size={52 * s} color={brand.colors.secondary} />
        {brand.handle}
      </div>
    </AbsoluteFill>
  )
}
