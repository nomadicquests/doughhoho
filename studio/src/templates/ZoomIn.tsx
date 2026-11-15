import { AbsoluteFill, useVideoConfig } from 'remotion'
import { brand } from '@doughhoho/brand'
import { headingFont, bodyFont } from '../fonts'
import { Logo } from '../components/Logo'

export type ZoomInProps = {
  headline: string // big, readable at a glance
  headlineItalic: string // second line of the headline, in italics
  prompt: string // tells people to zoom, e.g. "zoom in"
  secretMessage: string // deliberately tiny: only readable when zoomed in
}

// A still post whose real message is printed so small that people have to
// pinch-zoom to read it. The big text is only there to make them curious.
export const ZoomIn = ({
  headline,
  headlineItalic,
  prompt,
  secretMessage
}: ZoomInProps) => {
  const { width } = useVideoConfig()
  const scale = width / 1080
  const check = 36 * scale
  const tint = `${brand.colors.secondary}1F` // red at ~12% for the gingham

  return (
    <AbsoluteFill
      style={{
        background: brand.colors.background,
        backgroundImage: [
          `repeating-linear-gradient(0deg, ${tint} 0 ${check}px, transparent ${check}px ${check * 2}px)`,
          `repeating-linear-gradient(90deg, ${tint} 0 ${check}px, transparent ${check}px ${check * 2}px)`
        ].join(', '),
        fontFamily: bodyFont,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          width: '78%',
          height: '82%',
          background: brand.colors.primary,
          border: `${8 * scale}px solid ${brand.colors.accent}`,
          borderRadius: 28 * scale,
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.25)',
          color: brand.colors.textOnPrimary,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: `${72 * scale}px ${56 * scale}px ${48 * scale}px`,
          textAlign: 'center'
        }}
      >
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 88 * scale,
            lineHeight: 1.05
          }}
        >
          {headline}
        </div>
        <div
          style={{
            fontFamily: headingFont,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 72 * scale,
            lineHeight: 1.1,
            color: brand.colors.accent,
            marginTop: 8 * scale
          }}
        >
          {headlineItalic}
        </div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 30 * scale,
            letterSpacing: 8 * scale,
            textTransform: 'uppercase',
            marginTop: 36 * scale,
            opacity: 0.85
          }}
        >
          🔍 {prompt}
        </div>

        <div style={{ flex: 1 }} />

        <div
          style={{
            width: 360 * scale,
            border: `${2 * scale}px dashed ${brand.colors.accent}`,
            borderRadius: 12 * scale,
            padding: `${14 * scale}px ${16 * scale}px`,
            fontSize: 15 * scale,
            lineHeight: 1.4,
            fontWeight: 700
          }}
        >
          {secretMessage}
        </div>

        <div style={{ flex: 1 }} />

        <Logo variant="badgeOnDark" style={{ width: 150 * scale }} />
        <div
          style={{
            fontWeight: 700,
            fontSize: 30 * scale,
            marginTop: 16 * scale,
            color: brand.colors.accent
          }}
        >
          {brand.handle}
        </div>
      </div>
    </AbsoluteFill>
  )
}
