import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import { TransitionSeries, springTiming } from '@remotion/transitions'
import { fade } from '@remotion/transitions/fade'
import { slide } from '@remotion/transitions/slide'
import { brand, menu, type BoxContent } from '@doughhoho/brand'
import { headingFont, bodyFont } from '../fonts'
import { formatPrice } from '../components/Price'
import { Logo } from '../components/Logo'
import { CookieBox } from '../components/CookieBox'
import {
  Cookie,
  GinghamBackground,
  GoldFlecks,
  useEnter
} from '../components/Festive'

export type MeetTheCookiesProps = {
  itemId: string // a menu item with `contents`, e.g. the cookie box
  headline: string
  headlineAccent: string // second line of the headline, in gold italics
  subline: string
  preorderLine: string
  orderLine: string // the button on the last screen
}

// Reel timing, in frames at 30 fps
export const MEET_THE_COOKIES_FPS = 30
const HOOK = 66
const PER_COOKIE = 45
const BOX = 100
const CTA = 96
const TRANSITION = 14 // scenes overlap by this much while one gives way

export const meetTheCookiesDuration = (cookieCount: number) =>
  HOOK +
  PER_COOKIE * cookieCount +
  BOX +
  CTA -
  TRANSITION * (cookieCount + 2)

const findBox = (itemId: string) => {
  const item = menu.find((m) => m.id === itemId) ?? menu[0]
  const contents = (item.contents ?? []).filter((c) => c.cutout)
  return { item, contents }
}

// Where cookies sit around the headline on the opening screen, as fractions
// of the frame, with a tilt in degrees.
const scatter = [
  { x: 0.14, y: 0.14, r: -18 },
  { x: 0.86, y: 0.16, r: 14 },
  { x: 0.13, y: 0.85, r: 12 },
  { x: 0.87, y: 0.83, r: -10 },
  { x: 0.5, y: 0.95, r: 6 }
]

const rise = (p: number, distance = 40) => ({
  opacity: p,
  transform: `translateY(${(1 - p) * distance}px)`
})

const Hook = (props: MeetTheCookiesProps) => {
  const { width, height } = useVideoConfig()
  const { contents } = findBox(props.itemId)
  const logo = useEnter(0)
  const line1 = useEnter(6)
  const line2 = useEnter(12)
  const sub = useEnter(20)
  const size = width * 0.26
  return (
    <AbsoluteFill>
      {contents.map((c, i) => {
        const spot = scatter[i % scatter.length]
        return (
          <HookCookie
            key={c.name}
            cookie={c}
            size={size}
            left={spot.x * width - size / 2}
            top={spot.y * height - size / 2}
            tilt={spot.r}
            delay={4 + i * 4}
          />
        )
      })}
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: brand.colors.white
        }}
      >
        <Logo
          variant="wordmarkOnDark"
          style={{ width: 380, marginBottom: 40, ...rise(logo) }}
        />
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 130,
            lineHeight: 1,
            ...rise(line1)
          }}
        >
          {props.headline}
        </div>
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontStyle: 'italic',
            fontSize: 130,
            lineHeight: 1.1,
            color: brand.colors.accent,
            ...rise(line2)
          }}
        >
          {props.headlineAccent}
        </div>
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 44,
            letterSpacing: 3,
            textTransform: 'uppercase',
            marginTop: 36,
            ...rise(sub)
          }}
        >
          {props.subline}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}

const HookCookie = ({
  cookie,
  size,
  left,
  top,
  tilt,
  delay
}: {
  cookie: BoxContent
  size: number
  left: number
  top: number
  tilt: number
  delay: number
}) => {
  const p = useEnter(delay, 10)
  return (
    <Cookie
      cutout={cookie.cutout!}
      size={size}
      style={{
        position: 'absolute',
        left,
        top,
        transform: `scale(${p}) rotate(${tilt + (1 - p) * 90}deg)`
      }}
    />
  )
}

// The round tag on each cookie: "×4", or "FREE" in red.
const CountTag = ({ cookie, size }: { cookie: BoxContent; size: number }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: cookie.free ? brand.colors.secondary : brand.colors.accent,
      color: cookie.free ? brand.colors.white : brand.colors.primary,
      border: `${size * 0.04}px solid ${brand.colors.white}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: bodyFont,
      fontWeight: 800,
      fontSize: cookie.free ? size * 0.26 : size * 0.38,
      letterSpacing: cookie.free ? 2 : 0,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
    }}
  >
    {cookie.free ? 'FREE' : `×${cookie.count}`}
  </div>
)

const CookieFeature = ({ cookie }: { cookie: BoxContent }) => {
  const frame = useCurrentFrame()
  const { width, height, durationInFrames } = useVideoConfig()
  const isStill = durationInFrames === 1
  const pop = useEnter(4, 14)
  const tag = useEnter(14, 10)
  const name = useEnter(10, 16)
  const detail = useEnter(14, 16)
  const size = Math.min(width * 0.62, height * 0.32)
  const float = isStill ? 0 : Math.sin(frame / 9) * 6
  const detailText = cookie.free
    ? `${cookie.count} free in every box`
    : `${cookie.count} in every box`
  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: brand.colors.white
      }}
    >
      <Logo
        variant="wordmarkOnDark"
        style={{ position: 'absolute', top: height * 0.06, width: 260 }}
      />
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
          transform: `translateY(${float}px) scale(${0.7 + pop * 0.3}) rotate(${(1 - pop) * -20}deg)`
        }}
      >
        <Cookie cutout={cookie.cutout!} size={size} />
        <div
          style={{
            position: 'absolute',
            right: -size * 0.08,
            top: -size * 0.04,
            transform: `scale(${tag}) rotate(${(1 - tag) * 40 + 8}deg)`
          }}
        >
          <CountTag cookie={cookie} size={size * 0.3} />
        </div>
      </div>
      <div
        style={{
          fontFamily: headingFont,
          fontWeight: 700,
          fontSize: 104,
          lineHeight: 1.05,
          marginTop: 56,
          padding: '0 60px',
          ...rise(name)
        }}
      >
        {cookie.name}
      </div>
      <div
        style={{
          fontFamily: bodyFont,
          fontWeight: 800,
          fontSize: 42,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: cookie.free ? brand.colors.white : brand.colors.accent,
          marginTop: 20,
          ...rise(detail)
        }}
      >
        {detailText}
      </div>
    </AbsoluteFill>
  )
}

// Every cookie packed into the box: "12 cookies + a free Peppermint Snow Ball".
const BoxScene = ({ itemId }: { itemId: string }) => {
  const { width, height } = useVideoConfig()
  const { contents } = findBox(itemId)
  const paid = contents.filter((c) => !c.free)
  const free = contents.filter((c) => c.free)
  const total = paid.reduce((n, c) => n + c.count, 0)
  const cookieCount = contents.reduce((n, c) => n + c.count, 0)
  const textDelay = TRANSITION + 10 + cookieCount * 2
  const title = useEnter(textDelay, 16)
  const sub = useEnter(textDelay + 6, 16)
  const boxH = Math.min(width * 0.84 * 0.92, height * 0.5)
  const boxW = boxH / 0.92
  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: brand.colors.white
      }}
    >
      <CookieBox
        contents={contents}
        width={boxW}
        height={boxH}
        delay={TRANSITION}
      />
      <div
        style={{
          fontFamily: headingFont,
          fontWeight: 700,
          fontSize: 120,
          lineHeight: 1,
          marginTop: boxW * 0.14,
          ...rise(title)
        }}
      >
        {total} cookies
      </div>
      {free.length > 0 ? (
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontStyle: 'italic',
            fontSize: 60,
            color: brand.colors.accent,
            marginTop: 12,
            padding: '0 60px',
            ...rise(sub)
          }}
        >
          + a free {free.map((c) => singular(c.name)).join(' & ')}
        </div>
      ) : null}
    </AbsoluteFill>
  )
}

// "Peppermint Snow Balls" -> "Peppermint Snow Ball"
const singular = (name: string) => name.replace(/s$/, '')

const CallToAction = (props: MeetTheCookiesProps) => {
  const { height } = useVideoConfig()
  const { item } = findBox(props.itemId)
  const badge = useEnter(0, 10)
  const name = useEnter(6)
  const price = useEnter(10, 9)
  const pre = useEnter(16)
  const button = useEnter(22, 10)
  const contact = brand.whatsapp
    ? `WhatsApp ${brand.whatsapp} · ${brand.handle}`
    : brand.handle
  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: brand.colors.white
      }}
    >
      <Logo
        variant="badgeOnDark"
        style={{
          width: Math.min(360, height * 0.2),
          transform: `scale(${badge}) rotate(${(1 - badge) * -90}deg)`
        }}
      />
      <div
        style={{
          fontFamily: headingFont,
          fontWeight: 700,
          fontSize: 92,
          lineHeight: 1.05,
          marginTop: 40,
          ...rise(name)
        }}
      >
        {item.name}
      </div>
      <div
        style={{
          fontFamily: headingFont,
          fontWeight: 700,
          fontSize: 190,
          lineHeight: 1.1,
          marginBottom: 24,
          color: brand.colors.accent,
          transform: `scale(${price})`
        }}
      >
        {formatPrice(item.price, item.currency)}
      </div>
      <div
        style={{
          fontFamily: bodyFont,
          fontWeight: 800,
          fontSize: 44,
          letterSpacing: 3,
          textTransform: 'uppercase',
          ...rise(pre)
        }}
      >
        {props.preorderLine}
      </div>
      <div
        style={{
          marginTop: 48,
          background: brand.colors.white,
          color: brand.colors.primary,
          fontFamily: bodyFont,
          fontWeight: 800,
          fontSize: 48,
          padding: '26px 64px',
          borderRadius: 999,
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
          transform: `scale(${button})`
        }}
      >
        {props.orderLine}
      </div>
      <div
        style={{
          fontFamily: bodyFont,
          fontWeight: 700,
          fontSize: 40,
          color: brand.colors.accent,
          marginTop: 28,
          ...rise(button)
        }}
      >
        {contact}
      </div>
    </AbsoluteFill>
  )
}

const Frame = ({ children }: { children: React.ReactNode }) => (
  <AbsoluteFill style={{ fontFamily: bodyFont }}>
    <GinghamBackground />
    <GoldFlecks />
    {children}
  </AbsoluteFill>
)

const smooth = springTiming({
  config: { damping: 200 },
  durationInFrames: TRANSITION
})

// The Reel: headline, each cookie in turn, all of them packed in the box,
// then price and how to order. Cookies slide in like a carousel; the box and
// the last screen fade in. Length grows with the number of cookies.
export const MeetTheCookies = (props: MeetTheCookiesProps) => {
  const { contents } = findBox(props.itemId)
  return (
    <Frame>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={HOOK}>
          <Hook {...props} />
        </TransitionSeries.Sequence>
        {contents.flatMap((c) => [
          <TransitionSeries.Transition
            key={`${c.name}-in`}
            presentation={slide({ direction: 'from-right' })}
            timing={smooth}
          />,
          <TransitionSeries.Sequence key={c.name} durationInFrames={PER_COOKIE}>
            <CookieFeature cookie={c} />
          </TransitionSeries.Sequence>
        ])}
        <TransitionSeries.Transition presentation={fade()} timing={smooth} />
        <TransitionSeries.Sequence durationInFrames={BOX}>
          <BoxScene itemId={props.itemId} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={smooth} />
        <TransitionSeries.Sequence durationInFrames={CTA}>
          <CallToAction {...props} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </Frame>
  )
}

export type MeetTheCookiesSlideProps = MeetTheCookiesProps & {
  slide: number // 1 is the cover, then one per cookie, the box, then price
}

export const meetTheCookiesSlideCount = (itemId: string) =>
  findBox(itemId).contents.length + 3

// One slide of the Instagram carousel.
export const MeetTheCookiesSlide = (props: MeetTheCookiesSlideProps) => {
  const { contents } = findBox(props.itemId)
  const cookie = contents[props.slide - 2]
  const boxSlide = contents.length + 2
  return (
    <Frame>
      {props.slide === 1 ? (
        <Hook {...props} />
      ) : cookie ? (
        <CookieFeature cookie={cookie} />
      ) : props.slide === boxSlide ? (
        <BoxScene itemId={props.itemId} />
      ) : (
        <CallToAction {...props} />
      )}
    </Frame>
  )
}
