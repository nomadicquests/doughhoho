import { AbsoluteFill, Img, staticFile, useVideoConfig } from 'remotion'
import { brand } from '@doughhoho/brand'
import { headingFont, bodyFont } from '../fonts'
import { Logo } from '../components/Logo'

export type PhotoAnnouncementProps = {
  photo: string // path inside studio/public/menu/
  photoFocus: string // which part of the photo to keep when it is cropped, e.g. '50% 60%'
  kicker: string // small line above the headline
  headline: string
  headlineAccent: string // finishes the headline, in gold italics
  body: string
  buttonLine: string
  footer: string
}

// A still post: a real photo on top, a green panel with the message below.
// For announcements such as Secret Santa orders and the order deadline.
export const PhotoAnnouncement = (props: PhotoAnnouncementProps) => {
  const { width, height } = useVideoConfig()
  const s = width / 1080
  // the message needs about 680px; the photo gets the rest, up to 56%
  const photoH = Math.round(Math.min(height * 0.56, height - 680 * s))
  const cell = Math.round(width / 18)
  const line = `${brand.colors.accent}14`
  return (
    <AbsoluteFill style={{ background: brand.colors.primary, fontFamily: bodyFont }}>
      <Img
        src={staticFile(`menu/${props.photo}`)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height: photoH,
          objectFit: 'cover',
          objectPosition: props.photoFocus
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: photoH,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: [
            `repeating-linear-gradient(0deg, ${line} 0 ${cell}px, transparent ${cell}px ${cell * 2}px)`,
            `repeating-linear-gradient(90deg, ${line} 0 ${cell}px, transparent ${cell}px ${cell * 2}px)`
          ].join(', '),
          borderTop: `${10 * s}px solid ${brand.colors.accent}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: brand.colors.white,
          padding: `${40 * s}px ${60 * s}px`
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: 34 * s,
            letterSpacing: 5 * s,
            textTransform: 'uppercase',
            color: brand.colors.accent
          }}
        >
          {props.kicker}
        </div>
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 108 * s,
            lineHeight: 1.05,
            marginTop: 12 * s,
            textWrap: 'balance'
          }}
        >
          {props.headline}{' '}
          <span style={{ fontStyle: 'italic', color: brand.colors.accent }}>
            {props.headlineAccent}
          </span>
        </div>
        <div
          style={{
            fontSize: 38 * s,
            lineHeight: 1.35,
            marginTop: 20 * s,
            textWrap: 'balance'
          }}
        >
          {props.body}
        </div>
        <div
          style={{
            marginTop: 30 * s,
            background: brand.colors.white,
            color: brand.colors.primary,
            fontWeight: 800,
            fontSize: 40 * s,
            padding: `${20 * s}px ${52 * s}px`,
            borderRadius: 999,
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
          }}
        >
          {props.buttonLine}
        </div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 32 * s,
            color: brand.colors.accent,
            marginTop: 22 * s
          }}
        >
          {props.footer}
        </div>
      </div>
      <Logo
        variant="badge"
        style={{
          position: 'absolute',
          right: 36 * s,
          top: photoH - 110 * s,
          width: 190 * s,
          transform: 'rotate(8deg)',
          filter: 'drop-shadow(0 8px 14px rgba(0, 0, 0, 0.35))'
        }}
      />
    </AbsoluteFill>
  )
}
