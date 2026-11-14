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
import { slide } from '@remotion/transitions/slide'
import { brand, menu } from '@doughhoho/brand'
import { headingFont, bodyFont } from '../fonts'
import { formatPrice } from '../components/Price'
import { Logo } from '../components/Logo'
import { GinghamBackground, GoldFlecks, useEnter } from '../components/Festive'
import { FollowCard } from '../components/FollowCard'
import { PhotoPan } from './PhotoPan'

// Baking day: the camera glides down the cookie tray, then down the black
// cake, then both products with their prices, then a follow-us screen.

export type BakingDayProps = {
  trayPhoto: string
  trayLine: string
  cakePhoto: string
  cakeLine: string
  menuTitle: string
  cakeCutout: string
  boxPhoto: string
  orderBy: string
  followLine: string
  cakeTransition: 'dissolve' | 'scroll' | 'drop'
}

export const BAKING_DAY_FPS = 30
const TRAY = 165
const CAKE = 165
const MENU = 120
const FOLLOW = 75
const T = 14

const T_CAKE = 28 // the slower move into the cake

export const BAKING_DAY_DURATION = TRAY + CAKE + MENU + FOLLOW - T * 2 - T_CAKE

const smooth = springTiming({ config: { damping: 200 }, durationInFrames: T })
const slow = springTiming({ config: { damping: 200 }, durationInFrames: T_CAKE })

// The words over the cake, built one beat at a time on a short red band
const CakeWords = ({ line, delay }: { line: string; delay: number }) => {
  const beats = line
    .split('/')
    .map((b) => b.trim())
    .filter(Boolean)
  return (
    <>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${brand.colors.secondary}F2 0%, ${brand.colors.secondary}F2 10%, ${brand.colors.secondary}00 28%)`
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 115,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: brand.colors.white
        }}
      >
        <Logo variant="wordmarkOnDark" style={{ width: 240 }} />
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 110,
            lineHeight: 1.05,
            marginTop: 26,
            padding: '0 50px',
            textAlign: 'center',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}
        >
          {beats.map((b, i) => (
            <Word key={i} text={b} delay={delay + i * 16} last={i === beats.length - 1} />
          ))}
        </div>
      </div>
    </>
  )
}

const Word = ({ text, delay, last }: { text: string; delay: number; last: boolean }) => {
  const p = useEnter(delay, 14)
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

// The cake photo filling the frame, easing slowly in
const CakePush = ({ photo, line, delay }: { photo: string; line: string; delay: number }) => {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()
  const zoom = interpolate(frame, [0, durationInFrames], [1.0, 1.12])
  return (
    <AbsoluteFill style={{ background: brand.colors.secondary }}>
      <Img
        src={staticFile(`menu/${photo}`)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '55% 60%',
          transform: `scale(${zoom})`,
          transformOrigin: '55% 60%',
          filter: 'contrast(1.12) saturate(1.22) brightness(1.02)'
        }}
      />
      <CakeWords line={line} delay={delay} />
    </AbsoluteFill>
  )
}

// The cut-out cake drops onto red gingham with a soft bounce
const CakeDrop = ({ cutout, line }: { cutout: string; line: string }) => {
  const drop = useEnter(T + 4, 9)
  const w = 860
  const h = w * (1573 / 1938)
  return (
    <AbsoluteFill>
      <GinghamBackground theme="red" />
      <GoldFlecks color={brand.colors.white} />
      <div
        style={{
          position: 'absolute',
          left: (1080 - w * 0.9) / 2,
          top: 1350 - h * 0.12,
          width: w * 0.9,
          height: h * 0.22,
          borderRadius: '50%',
          background: 'rgba(0, 0, 0, 0.35)',
          filter: 'blur(24px)',
          opacity: drop
        }}
      />
      <Img
        src={staticFile(`menu/${cutout}`)}
        style={{
          position: 'absolute',
          left: (1080 - w) / 2,
          top: 1350 - h,
          width: w,
          height: h,
          transform: `translateY(${(1 - drop) * -1100}px)`
        }}
      />
      <CakeWords line={line} delay={T + 20} />
    </AbsoluteFill>
  )
}

const Product = ({
  img,
  round,
  name,
  detail,
  price,
  delay
}: {
  img: string
  round: boolean
  name: string
  detail: string
  price: string
  delay: number
}) => {
  const p = useEnter(delay, 13)
  return (
    <div
      style={{
        width: 470,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: Math.min(1, p * 2),
        transform: `translateY(${(1 - p) * 60}px)`
      }}
    >
      <div style={{ height: 360, display: 'flex', alignItems: 'flex-end' }}>
        <Img
          src={staticFile(`menu/${img}`)}
          style={
            round
              ? {
                  width: 340,
                  height: 340,
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: `10px solid ${brand.colors.white}`,
                  boxSizing: 'border-box',
                  boxShadow: '0 16px 32px rgba(0, 0, 0, 0.35)',
                  filter: 'contrast(1.1) saturate(1.2)'
                }
              : {
                  width: 420,
                  filter: 'drop-shadow(0 18px 20px rgba(0, 0, 0, 0.4))'
                }
          }
        />
      </div>
      <div
        style={{
          fontFamily: headingFont,
          fontWeight: 700,
          fontSize: 52,
          lineHeight: 1.05,
          marginTop: 28,
          textAlign: 'center'
        }}
      >
        {name}
      </div>
      <div style={{ fontWeight: 700, fontSize: 30, marginTop: 8, opacity: 0.9 }}>
        {detail}
      </div>
      <div
        style={{
          marginTop: 18,
          background: brand.colors.white,
          color: brand.colors.secondary,
          fontFamily: headingFont,
          fontWeight: 700,
          fontSize: 56,
          padding: '8px 34px',
          borderRadius: 999
        }}
      >
        {price}
      </div>
    </div>
  )
}

const MenuScene = (props: BakingDayProps) => {
  const cake = menu.find((m) => m.id === 'christmas-cake') ?? menu[0]
  const box = menu.find((m) => m.id === 'christmas-cookie-box') ?? menu[0]
  const head = useEnter(T, 16)
  const tag = useEnter(T + 30, 12)
  return (
    <AbsoluteFill
      style={{
        fontFamily: bodyFont,
        color: brand.colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 140
      }}
    >
      <AbsoluteFill>
        <GinghamBackground theme="red" />
        <GoldFlecks color={brand.colors.white} />
      </AbsoluteFill>
      <Logo variant="wordmarkOnDark" style={{ width: 280, position: 'relative' }} />
      <div
        style={{
          fontFamily: headingFont,
          fontWeight: 700,
          fontSize: 100,
          lineHeight: 1.05,
          textAlign: 'center',
          marginTop: 30,
          opacity: head,
          transform: `translateY(${(1 - head) * 30}px)`
        }}
      >
        {props.menuTitle}
      </div>
      <div style={{ display: 'flex', gap: 30, marginTop: 60, position: 'relative' }}>
        <Product
          img={props.cakeCutout}
          round={false}
          name="Black cake"
          detail={'6" · 8" · 10"'}
          price={`from ${formatPrice(cake.price, cake.currency)}`}
          delay={T + 10}
        />
        <Product
          img={props.boxPhoto}
          round
          name="Cookie box"
          detail="12 cookies + 1 free"
          price={formatPrice(box.price, box.currency)}
          delay={T + 18}
        />
      </div>
      <div
        style={{
          marginTop: 60,
          background: brand.colors.white,
          color: brand.colors.secondary,
          fontWeight: 800,
          fontSize: 46,
          letterSpacing: 2,
          textTransform: 'uppercase',
          padding: '18px 40px',
          borderRadius: 16,
          transform: `scale(${tag})`
        }}
      >
        {props.orderBy}
      </div>
    </AbsoluteFill>
  )
}

export const BakingDay = (props: BakingDayProps) => (
  <AbsoluteFill style={{ background: brand.colors.secondary }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={TRAY}>
        <PhotoPan
          itemId="christmas-cookie-box"
          photo={props.trayPhoto}
          line={props.trayLine}
          detailLine=""
          zoom={1.9}
          followLine=""
          panOnly
          panFrames={TRAY + T_CAKE}
          lineSize={96}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={
          props.cakeTransition === 'scroll' ? slide({ direction: 'from-bottom' }) : fade()
        }
        timing={slow}
      />
      <TransitionSeries.Sequence durationInFrames={CAKE}>
        {props.cakeTransition === 'drop' ? (
          <CakeDrop cutout={props.cakeCutout} line={props.cakeLine} />
        ) : (
          <CakePush photo={props.cakePhoto} line={props.cakeLine} delay={T_CAKE} />
        )}
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={smooth} />
      <TransitionSeries.Sequence durationInFrames={MENU}>
        <MenuScene {...props} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={smooth} />
      <TransitionSeries.Sequence durationInFrames={FOLLOW}>
        <FollowCard line={props.followLine} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
)
