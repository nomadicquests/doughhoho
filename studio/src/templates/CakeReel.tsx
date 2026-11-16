import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig
} from 'remotion'
import { TransitionSeries, springTiming } from '@remotion/transitions'
import { fade } from '@remotion/transitions/fade'
import { brand, menu } from '@doughhoho/brand'
import { headingFont, bodyFont } from '../fonts'
import { formatPrice } from '../components/Price'
import { Logo } from '../components/Logo'
import { GinghamBackground, GoldFlecks, useEnter } from '../components/Festive'

// A Reel for a product sold in sizes (the Christmas cake): the cake with a
// line building word by word, a close-up, the gift packaging, every size with
// its price, then how to order. Text stays out of the bottom fifth, where
// Instagram and TikTok put their captions and buttons.

export type CakeScene = {
  photo: string // path inside studio/public/menu/
  focus: string
  fit: 'cover' | 'contain' // contain for packshots on white
  line: string // words that build, with / between beats
  dark: boolean // dark text, for light photos
}

export type CakeReelProps = {
  itemId: string
  scenes: CakeScene[]
  sizesTitle: string
  orderBy: string
  orderLine: string
}

export const CAKE_REEL_FPS = 30
const FIRST = 96 // the opening photo
const MIDDLE = 78 // each photo after it
const SIZES = 105
const CTA = 100
const T = 12 // crossfade

export const cakeReelDuration = (sceneCount: number) =>
  FIRST + MIDDLE * Math.max(0, sceneCount - 1) + SIZES + CTA - T * (sceneCount + 1)

const smooth = springTiming({ config: { damping: 200 }, durationInFrames: T })

const Words = ({
  line,
  dark,
  size,
  delay = 8
}: {
  line: string
  dark: boolean
  size: number
  delay?: number
}) => {
  const beats = line
    .split('/')
    .map((b) => b.trim())
    .filter(Boolean)
  return (
    <div
      style={{
        fontFamily: headingFont,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.08,
        textAlign: 'center',
        textShadow: dark ? 'none' : '0 4px 24px rgba(0, 0, 0, 0.5)'
      }}
    >
      {beats.map((b, i) => (
        <Beat
          key={i}
          text={b}
          delay={delay + i * 13}
          last={i === beats.length - 1}
          dark={dark}
        />
      ))}
    </div>
  )
}

const Beat = ({
  text,
  delay,
  last,
  dark
}: {
  text: string
  delay: number
  last: boolean
  dark: boolean
}) => {
  const p = useEnter(delay, 14)
  const color = dark
    ? last
      ? brand.colors.secondary
      : brand.colors.primary
    : last
      ? brand.colors.accent
      : brand.colors.white
  return (
    <span
      style={{
        display: 'inline-block',
        margin: '0 0.14em',
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px) scale(${0.85 + p * 0.15})`,
        fontStyle: last ? 'italic' : 'normal',
        color
      }}
    >
      {text}
    </span>
  )
}

const PhotoScene = ({ scene, first }: { scene: CakeScene; first: boolean }) => {
  const frame = useCurrentFrame()
  const { width, height, durationInFrames } = useVideoConfig()
  const zoom = interpolate(frame, [0, durationInFrames], [1, 1.08])
  return (
    <AbsoluteFill style={{ background: scene.dark ? '#FFFFFF' : brand.colors.primary }}>
      <Img
        src={staticFile(`menu/${scene.photo}`)}
        style={{
          position: 'absolute',
          left: 0,
          top: scene.fit === 'contain' ? height * 0.18 : 0,
          width,
          height: scene.fit === 'contain' ? height * 0.66 : height,
          objectFit: scene.fit,
          objectPosition: scene.focus,
          transform: `scale(${zoom})`
        }}
      />
      <AbsoluteFill
        style={{
          background: scene.dark
            ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 16%, transparent 30%)'
            : 'linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.15) 32%, transparent 45%)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: height * 0.07,
          left: 50,
          right: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28
        }}
      >
        {first ? (
          <Logo
            variant={scene.dark ? 'wordmark' : 'wordmarkOnDark'}
            style={{ width: 280 }}
          />
        ) : null}
        <Words line={scene.line} dark={scene.dark} size={first ? 128 : 112} />
      </div>
    </AbsoluteFill>
  )
}

const SizesScene = ({ itemId, title }: { itemId: string; title: string }) => {
  const { height } = useVideoConfig()
  const item = menu.find((m) => m.id === itemId) ?? menu[0]
  const sizes = item.sizes ?? []
  const head = useEnter(T, 16)
  return (
    <AbsoluteFill style={{ fontFamily: bodyFont, color: brand.colors.white }}>
      <GinghamBackground theme="green" />
      <GoldFlecks />
      <div
        style={{
          position: 'absolute',
          top: height * 0.12,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40
        }}
      >
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 110,
            lineHeight: 1.05,
            textAlign: 'center',
            opacity: head,
            transform: `translateY(${(1 - head) * 30}px)`
          }}
        >
          {title}
        </div>
        {sizes.map((sz, i) => (
          <SizeCard
            key={sz.name}
            name={sz.name}
            price={formatPrice(sz.price, item.currency)}
            delay={T + 12 + i * 9}
          />
        ))}
      </div>
    </AbsoluteFill>
  )
}

const SizeCard = ({
  name,
  price,
  delay
}: {
  name: string
  price: string
  delay: number
}) => {
  const p = useEnter(delay, 12)
  return (
    <div
      style={{
        width: 760,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: brand.colors.white,
        color: brand.colors.primary,
        borderRadius: 28,
        padding: '26px 48px',
        boxShadow: '0 14px 30px rgba(0, 0, 0, 0.3)',
        opacity: Math.min(1, p * 2),
        transform: `translateX(${(1 - p) * 300}px)`
      }}
    >
      <div
        style={{
          fontWeight: 800,
          fontSize: 54,
          letterSpacing: 3,
          textTransform: 'uppercase'
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: headingFont,
          fontWeight: 700,
          fontSize: 84,
          color: brand.colors.secondary
        }}
      >
        {price}
      </div>
    </div>
  )
}

const OrderScene = (props: CakeReelProps) => {
  const { height } = useVideoConfig()
  const badge = useEnter(T, 11)
  const tag = useEnter(T + 8, 12)
  const wa = useEnter(T + 16, 14)
  const num = useEnter(T + 22, 12)
  return (
    <AbsoluteFill style={{ fontFamily: bodyFont, color: brand.colors.white }}>
      <GinghamBackground theme="red" />
      <GoldFlecks color={brand.colors.white} />
      <div
        style={{
          position: 'absolute',
          top: height * 0.1,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Logo
          variant="badgeOnDark"
          style={{
            width: 330,
            transform: `scale(${badge}) rotate(${(1 - badge) * -90}deg)`
          }}
        />
        <div
          style={{
            marginTop: 50,
            background: brand.colors.white,
            color: brand.colors.secondary,
            fontWeight: 800,
            fontSize: 54,
            letterSpacing: 2,
            textTransform: 'uppercase',
            padding: '20px 44px',
            borderRadius: 18,
            transform: `scale(${tag})`
          }}
        >
          {props.orderBy}
        </div>
        <div
          style={{
            marginTop: 60,
            fontWeight: 800,
            fontSize: 48,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: brand.colors.accent,
            opacity: wa
          }}
        >
          {props.orderLine}
        </div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 112,
            lineHeight: 1.1,
            opacity: num,
            transform: `translateY(${(1 - num) * 30}px)`
          }}
        >
          {brand.whatsapp}
        </div>
        <div style={{ fontWeight: 700, fontSize: 40, marginTop: 18, opacity: num }}>
          {brand.handle}
        </div>
      </div>
    </AbsoluteFill>
  )
}

export const CakeReel = (props: CakeReelProps) => (
  <AbsoluteFill style={{ fontFamily: bodyFont }}>
    <TransitionSeries>
      {props.scenes.flatMap((sc, i) => [
        ...(i > 0
          ? [
              <TransitionSeries.Transition
                key={`t${i}`}
                presentation={fade()}
                timing={smooth}
              />
            ]
          : []),
        <TransitionSeries.Sequence key={`s${i}`} durationInFrames={i === 0 ? FIRST : MIDDLE}>
          <PhotoScene scene={sc} first={i === 0} />
        </TransitionSeries.Sequence>
      ])}
      <TransitionSeries.Transition presentation={fade()} timing={smooth} />
      <TransitionSeries.Sequence durationInFrames={SIZES}>
        <SizesScene itemId={props.itemId} title={props.sizesTitle} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={smooth} />
      <TransitionSeries.Sequence durationInFrames={CTA}>
        <OrderScene {...props} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
)
