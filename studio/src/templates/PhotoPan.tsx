import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig
} from 'remotion'
import { brand, menu } from '@doughhoho/brand'
import { headingFont, bodyFont } from '../fonts'
import { formatPrice } from '../components/Price'
import { Logo } from '../components/Logo'
import { GinghamBackground, useEnter } from '../components/Festive'
import { FollowCard } from '../components/FollowCard'

export type PhotoPanProps = {
  itemId: string
  photo: string // path inside studio/public/menu/, ideally upright (3:4)
  line: string // the words that build up, with / between each beat
  detailLine: string
  zoom: number // how close the camera starts, e.g. 1.9
  followLine: string // ends on a follow-us screen with this line; empty for none
}

export const PHOTO_PAN_FPS = 30
const MAIN = 270 // 9 seconds
const FOLLOW = 66 // the follow-us screen adds about 2 seconds

export const photoPanDuration = (followLine: string) =>
  MAIN + (followLine ? FOLLOW : 0)

const PAN_END = 180 // the camera glides from the top of the photo to the bottom
const PULL_BACK_END = 222 // then pulls back to show all of it
const FIRST_WORD = 10
const WORD_GAP = 16
const CTA_START = 206

// A Reel made from one upright (3:4) photo: the camera starts close near the
// top, glides down it, then pulls back until the whole photo sits framed on
// red gingham. Words build at the top on a red band; the box price and order
// line come in at the bottom. Optionally ends on a follow-us screen.
export const PhotoPan = (props: PhotoPanProps) => {
  const frame = useCurrentFrame()
  const { width, height, durationInFrames } = useVideoConfig()
  const isStill = durationInFrames === 1
  const item = menu.find((m) => m.id === props.itemId) ?? menu[0]
  const s = width / 1080

  const ease = Easing.inOut(Easing.cubic)
  const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const
  // Close up: the photo is zoomed so it fills the frame, and its centre line
  // travels from near the top of the photo to near the bottom.
  const bigW = Math.max(width, height * 0.75) * props.zoom
  const bigH = (bigW * 4) / 3
  const reach = height / 2 / bigH // keep the frame covered
  const along = interpolate(frame, [0, PAN_END], [reach, 1 - reach], {
    ...clamp,
    easing: ease
  })
  // Pulled back: the whole photo, framed, under the words
  const endW = width * 0.72
  const endH = (endW * 4) / 3
  const endTop = height * 0.285
  const t = isStill
    ? 1
    : interpolate(frame, [PAN_END, PULL_BACK_END], [0, 1], {
        ...clamp,
        easing: ease
      })
  const photoW = interpolate(t, [0, 1], [bigW, endW])
  const photoH = (photoW * 4) / 3
  const photoTop = interpolate(t, [0, 1], [height / 2 - along * bigH, endTop])
  const photoLeft = (width - photoW) / 2
  const beats = props.line
    .split('/')
    .map((b) => b.trim())
    .filter(Boolean)
  const cta = useEnter(CTA_START, 16)
  const button = useEnter(CTA_START + 6, 11)
  const bandTop = `${brand.colors.secondary}F2`
  const bandFade = `${brand.colors.secondary}00`

  return (
    <AbsoluteFill style={{ fontFamily: bodyFont }}>
      <GinghamBackground theme="red" />
      <Img
        src={staticFile(`menu/${props.photo}`)}
        style={{
          position: 'absolute',
          width: photoW,
          height: photoH,
          left: photoLeft,
          top: photoTop,
          objectFit: 'cover',
          borderRadius: t * 28 * s,
          border: `${t * 10 * s}px solid ${brand.colors.white}`,
          boxShadow: `0 ${t * 30 * s}px ${t * 60 * s}px rgba(0, 0, 0, 0.4)`
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${bandTop} 0%, ${bandTop} 14%, ${bandFade} ${40 - t * 16}%)`
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 1 - t,
          background: `linear-gradient(0deg, ${bandTop} 0%, ${bandFade} 30%)`
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: height * 0.06,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          color: brand.colors.white
        }}
      >
        <Logo variant="wordmarkOnDark" style={{ width: 240 * s }} />
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 120 * s,
            lineHeight: 1.05,
            marginTop: 26 * s,
            padding: `0 ${50 * s}px`,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}
        >
          {beats.map((b, i) => (
            <Beat key={i} text={b} index={i} last={i === beats.length - 1} />
          ))}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: endTop + endH + 40 * s,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          color: brand.colors.white,
          gap: 16 * s
        }}
      >
        <div
          style={{
            background: brand.colors.white,
            color: brand.colors.secondary,
            fontWeight: 800,
            fontSize: 40 * s,
            padding: `${18 * s}px ${50 * s}px`,
            borderRadius: 999,
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
            transform: `scale(${button})`
          }}
        >
          {item.name} · {formatPrice(item.price, item.currency)}
        </div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 34 * s,
            opacity: cta,
            transform: `translateY(${(1 - cta) * 20 * s}px)`
          }}
        >
          {props.detailLine}
        </div>
      </div>
      {props.followLine ? (
        <Sequence from={MAIN}>
          <FollowCard line={props.followLine} />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  )
}

const Beat = ({
  text,
  index,
  last
}: {
  text: string
  index: number
  last: boolean
}) => {
  const p = useEnter(FIRST_WORD + index * WORD_GAP, 14)
  return (
    <span
      style={{
        display: 'inline-block',
        margin: '0 0.14em',
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px) scale(${0.85 + p * 0.15})`,
        fontStyle: last ? 'italic' : 'normal'
      }}
    >
      {text}
    </span>
  )
}
