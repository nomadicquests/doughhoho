import { AbsoluteFill, Img, staticFile } from 'remotion'
import { TransitionSeries, springTiming } from '@remotion/transitions'
import { fade } from '@remotion/transitions/fade'
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
}

export const BAKING_DAY_FPS = 30
const TRAY = 165
const CAKE = 135
const MENU = 120
const FOLLOW = 75
const T = 14

export const BAKING_DAY_DURATION = TRAY + CAKE + MENU + FOLLOW - T * 3

const smooth = springTiming({ config: { damping: 200 }, durationInFrames: T })

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
          panFrames={TRAY}
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={smooth} />
      <TransitionSeries.Sequence durationInFrames={CAKE}>
        <PhotoPan
          itemId="christmas-cake"
          photo={props.cakePhoto}
          line={props.cakeLine}
          detailLine=""
          zoom={1.5}
          followLine=""
          panOnly
          panFrames={CAKE}
        />
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
