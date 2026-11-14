import {
  AbsoluteFill,
  Easing,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig
} from 'remotion'
import { brand, menu } from '@doughhoho/brand'
import { headingFont, bodyFont } from '../fonts'
import { formatPrice } from '../components/Price'
import { Logo } from '../components/Logo'
import { CupBox, type Cup } from '../components/CupBox'
import { GinghamBackground, GoldFlecks, useEnter } from '../components/Festive'

export type BoxRevealProps = {
  itemId: string
  line: string // the words that build up, with / between each beat
  preorderLine: string
  orderLine: string
  // A clip in studio/public/footage/ of the box being opened. While it is
  // null, a drawn box opens instead.
  clip: string | null
  clipStartSeconds: number
}

export const BOX_REVEAL_FPS = 30
export const BOX_REVEAL_DURATION = 240 // 8 seconds

const FIRST_WORD = 10
const WORD_GAP = 16 // frames between each beat of the line
const LID_START = 18
const LID_FRAMES = 42 // how long the lid takes to open

const beatsOf = (line: string) =>
  line
    .split('/')
    .map((b) => b.trim())
    .filter(Boolean)

// Every cookie in its paper cup, the same way as the real box.
const cupsFor = (itemId: string): Cup[] => {
  const item = menu.find((m) => m.id === itemId) ?? menu[0]
  const contents = (item.contents ?? []).filter((c) => c.cutout)
  const order: [string, number][] = [
    ['Triple Ginger Snap', 2],
    ['Butter Cookies', 2],
    ['Peppermint Snow Balls', 1],
    ['Cranberry Pistachio', 2],
    ['Candy Cane', 4],
    ['Butter Cookies', 2]
  ]
  const cups = order.flatMap(([name, count]) => {
    const cookie = contents.find((c) => c.name === name)
    return cookie ? [{ cookie, count }] : []
  })
  return cups.length > 0
    ? cups
    : contents.map((cookie) => ({ cookie, count: cookie.count }))
}

// The lid: white, tied with a red ribbon, logo in the middle. It is hinged
// along the top edge and swings up and back to open.
const Lid = ({ width, height }: { width: number; height: number }) => {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()
  const open = interpolate(frame, [LID_START, LID_START + LID_FRAMES], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic)
  })
  const angle = durationInFrames === 1 ? 0 : open * 108
  const ribbon = width * 0.07
  return (
    <div
      style={{
        position: 'absolute',
        inset: -width * 0.012,
        transformOrigin: 'top center',
        transform: `rotateX(${angle}deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          background: brand.colors.white,
          borderRadius: width * 0.02,
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.45)',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: width / 2 - ribbon / 2,
            width: ribbon,
            background: brand.colors.secondary
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: height / 2 - ribbon / 2,
            height: ribbon,
            background: brand.colors.secondary
          }}
        />
        <Logo
          variant="badge"
          style={{
            position: 'absolute',
            width: width * 0.3,
            left: width * 0.35,
            top: height / 2 - width * 0.15,
            filter: 'drop-shadow(0 6px 10px rgba(0, 0, 0, 0.3))'
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          transform: 'rotateX(180deg)',
          background: brand.colors.white,
          borderRadius: width * 0.02,
          boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.12)'
        }}
      />
    </div>
  )
}

const DrawnBox = ({ itemId }: { itemId: string }) => {
  const { width, height } = useVideoConfig()
  const boxW = width * 0.8
  const boxH = boxW / 1.4
  return (
    <AbsoluteFill>
      <GinghamBackground />
      <GoldFlecks />
      <div
        style={{
          position: 'absolute',
          left: (width - boxW) / 2,
          top: height * 0.43,
          width: boxW,
          height: boxH,
          perspective: 7000,
          perspectiveOrigin: '50% 0%'
        }}
      >
        <CupBox
          cups={cupsFor(itemId)}
          width={boxW}
          height={boxH}
          delay={-200}
          stickerDelay={LID_START + LID_FRAMES - 8}
        />
        <Lid width={boxW} height={boxH} />
      </div>
    </AbsoluteFill>
  )
}

const Footage = ({ clip, startSeconds }: { clip: string; startSeconds: number }) => {
  const { fps } = useVideoConfig()
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile(`footage/${clip}`)}
        startFrom={Math.round(startSeconds * fps)}
        muted
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, transparent 35%, transparent 60%, rgba(0, 0, 0, 0.55) 100%)'
        }}
      />
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
        fontStyle: last ? 'italic' : 'normal',
        color: last ? brand.colors.accent : brand.colors.white
      }}
    >
      {text}
    </span>
  )
}

// A Reel: the box opens while a line builds one beat at a time, then the
// price and how to order. Plays over real footage when a clip is set.
export const BoxReveal = (props: BoxRevealProps) => {
  const { height } = useVideoConfig()
  const item = menu.find((m) => m.id === props.itemId) ?? menu[0]
  const beats = beatsOf(props.line)
  const ctaDelay = FIRST_WORD + beats.length * WORD_GAP + 24
  const details = useEnter(ctaDelay, 16)
  const button = useEnter(ctaDelay + 8, 11)
  return (
    <AbsoluteFill style={{ fontFamily: bodyFont }}>
      {props.clip ? (
        <Footage clip={props.clip} startSeconds={props.clipStartSeconds} />
      ) : (
        <DrawnBox itemId={props.itemId} />
      )}
      <div
        style={{
          position: 'absolute',
          top: height * 0.13,
          left: 60,
          right: 60,
          textAlign: 'center',
          fontFamily: headingFont,
          fontWeight: 700,
          fontSize: 132,
          lineHeight: 1.08,
          textShadow: '0 4px 24px rgba(0, 0, 0, 0.45)'
        }}
      >
        {beats.map((b, i) => (
          <Beat key={i} text={b} index={i} last={i === beats.length - 1} />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          top: height * 0.775,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          color: brand.colors.white,
          textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: 40,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: brand.colors.accent,
            opacity: details,
            transform: `translateY(${(1 - details) * 20}px)`
          }}
        >
          {item.name} · {formatPrice(item.price, item.currency)}
        </div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 38,
            marginTop: 10,
            opacity: details,
            transform: `translateY(${(1 - details) * 20}px)`
          }}
        >
          {props.preorderLine}
        </div>
        <div
          style={{
            marginTop: 26,
            background: brand.colors.white,
            color: brand.colors.primary,
            fontWeight: 800,
            fontSize: 42,
            padding: '20px 56px',
            borderRadius: 999,
            textShadow: 'none',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
            transform: `scale(${button})`
          }}
        >
          {props.orderLine}
        </div>
      </div>
    </AbsoluteFill>
  )
}
