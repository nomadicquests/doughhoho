import { AbsoluteFill, Img, staticFile, useVideoConfig } from 'remotion'
import { brand, menu } from '@doughhoho/brand'
import { headingFont, bodyFont } from '../fonts'
import { formatPrice } from '../components/Price'
import { Logo } from '../components/Logo'
import { GinghamBackground, GoldFlecks } from '../components/Festive'

// An Instagram carousel for a product sold in sizes: a cover with every size
// side by side, one slide per size with the cake drawn to scale against a
// faint outline of the largest, then how to order.

export type SizeCopy = { headline: string; line: string }

export type SizeCarouselProps = {
  itemId: string
  slide: number
  cutout: string // the product with its background removed, in studio/public/menu/
  coverTitle: string
  coverAccent: string // a word in coverTitle set in gold italics
  coverAside: string
  coverSwipe: string
  sizes: SizeCopy[] // one per size, smallest first
  orderPhoto: string
  orderTitle: string
  orderLine: string
  orderBy: string
  deal: string
}

export const sizeCarouselSlideCount = (itemId: string) =>
  (menu.find((m) => m.id === itemId)?.sizes?.length ?? 0) + 2

const inches = (name: string) => parseFloat(name) || 1
const CAKE_RATIO = 1573 / 1938 // height / width of the cut-out

// The cake sitting on a soft shadow, `w` pixels wide, bottom at `bottom`
const Cake = ({
  src,
  w,
  cx,
  bottom
}: {
  src: string
  w: number
  cx: number
  bottom: number
}) => {
  const h = w * CAKE_RATIO
  return (
    <>
      <div
          style={{
            position: 'absolute',
            left: cx - w * 0.47,
            top: bottom - h * 0.16,
            width: w * 0.94,
            height: h * 0.24,
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.35)',
            filter: `blur(${w * 0.03}px)`
          }}
        />
      <Img
        src={staticFile(`menu/${src}`)}
        style={{
          position: 'absolute',
          left: cx - w / 2,
          top: bottom - h,
          width: w,
          height: h
        }}
      />
    </>
  )
}

const Swipe = ({ s, text }: { s: number; text: string }) => (
  <div
    style={{
      position: 'absolute',
      right: 50 * s,
      bottom: 46 * s,
      fontWeight: 800,
      fontSize: 28 * s,
      letterSpacing: 3 * s,
      textTransform: 'uppercase',
      color: brand.colors.white,
      background: 'rgba(0, 0, 0, 0.25)',
      padding: `${10 * s}px ${22 * s}px`,
      borderRadius: 999
    }}
  >
    {text}
  </div>
)

const Cover = (props: SizeCarouselProps & { s: number }) => {
  const { s } = props
  const item = menu.find((m) => m.id === props.itemId) ?? menu[0]
  const sizes = item.sizes ?? []
  const largest = Math.max(...sizes.map((z) => inches(z.name)))
  const max = 400 * s
  const widths = sizes.map((z) => (max * inches(z.name)) / largest)
  const gap = 20 * s
  const total = widths.reduce((a, b) => a + b, 0) + gap * (sizes.length - 1)
  let x = (1080 * s - total) / 2
  const bottom = 1090 * s
  const [before, after] = props.coverTitle.split(props.coverAccent)
  return (
    <AbsoluteFill style={{ color: brand.colors.white, textAlign: 'center' }}>
      <GinghamBackground theme="green" />
      <GoldFlecks />
      <Logo
        variant="wordmarkOnDark"
        style={{ position: 'absolute', left: 540 * s - 120 * s, top: 54 * s, width: 240 * s }}
      />
      <div
        style={{
          position: 'absolute',
          top: 230 * s,
          left: 70 * s,
          right: 70 * s,
          fontFamily: headingFont,
          fontWeight: 700,
          fontSize: 100 * s,
          lineHeight: 1.04,
          textWrap: 'balance'
        }}
      >
        {before}
        <span style={{ fontStyle: 'italic', color: brand.colors.accent }}>
          {props.coverAccent}
        </span>
        {after}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 580 * s,
          left: 0,
          right: 0,
          fontFamily: headingFont,
          fontStyle: 'italic',
          fontSize: 44 * s
        }}
      >
        {props.coverAside}
      </div>
      {sizes.map((z, i) => {
        const w = widths[i]
        const cx = x + w / 2
        x += w + gap
        return (
          <div key={z.name}>
            <Cake src={props.cutout} w={w} cx={cx} bottom={bottom} />
            <div
              style={{
                position: 'absolute',
                left: cx - 80 * s,
                width: 160 * s,
                top: bottom + 26 * s,
                fontWeight: 800,
                fontSize: 40 * s
              }}
            >
              {z.name.replace(' inch', '"')}
            </div>
          </div>
        )
      })}
      <Swipe s={s} text={props.coverSwipe} />
    </AbsoluteFill>
  )
}

// One ring per size, all resting on the same baseline and drawn to scale.
// The current size is solid and bold; larger sizes are faint and dashed.
const SizeRings = ({
  names,
  active,
  maxD,
  cx,
  bottom,
  s
}: {
  names: string[]
  active: number
  maxD: number
  cx: number
  bottom: number
  s: number
}) => {
  const largest = Math.max(...names.map(inches))
  return (
    <>
      {names.map((name, i) => {
        // smaller sizes would sit behind the cake, so only show this size and up
        if (i < active) return null
        const d = (maxD * inches(name)) / largest
        const on = i === active
        return (
          <div key={name}>
            <div
              style={{
                position: 'absolute',
                left: cx - d / 2,
                top: bottom - d,
                width: d,
                height: d,
                borderRadius: '50%',
                border: on
                  ? `${5 * s}px solid rgba(255, 255, 255, 0.9)`
                  : `${4 * s}px dashed rgba(255, 255, 255, 0.32)`,
                boxSizing: 'border-box'
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: cx - 150 * s,
                width: 300 * s,
                top: bottom - d + 18 * s,
                fontWeight: 800,
                fontSize: (on ? 34 : 26) * s,
                letterSpacing: 3 * s,
                textTransform: 'uppercase',
                color: on ? brand.colors.white : 'rgba(255, 255, 255, 0.45)'
              }}
            >
              {name}
            </div>
          </div>
        )
      })}
    </>
  )
}

const SizeSlide = (props: SizeCarouselProps & { s: number; index: number }) => {
  const { s } = props
  const item = menu.find((m) => m.id === props.itemId) ?? menu[0]
  const sizes = item.sizes ?? []
  const size = sizes[props.index]
  const copy = props.sizes[props.index]
  const largest = Math.max(...sizes.map((z) => inches(z.name)))
  const maxD = 700 * s
  const d = (maxD * inches(size.name)) / largest
  const w = d * 0.84
  const bottom = 1040 * s
  return (
    <AbsoluteFill style={{ color: brand.colors.white, textAlign: 'center' }}>
      <GinghamBackground theme="red" />
      <GoldFlecks color={brand.colors.white} />
      <div
        style={{
          position: 'absolute',
          top: 54 * s,
          left: 0,
          right: 0,
          fontWeight: 800,
          fontSize: 28 * s,
          letterSpacing: 5 * s,
          textTransform: 'uppercase',
          opacity: 0.9
        }}
      >
        Pick your size · {props.index + 1} of {sizes.length}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 110 * s,
          left: 60 * s,
          right: 60 * s,
          fontFamily: headingFont,
          fontWeight: 700,
          fontSize: 92 * s,
          lineHeight: 1.02
        }}
      >
        {copy.headline}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 220 * s,
          left: 90 * s,
          right: 90 * s,
          fontWeight: 700,
          fontSize: 36 * s,
          lineHeight: 1.3,
          textWrap: 'balance'
        }}
      >
        {copy.line}
      </div>
      <SizeRings
        names={sizes.map((z) => z.name)}
        active={props.index}
        maxD={maxD}
        cx={540 * s}
        bottom={bottom}
        s={s}
      />
      <Cake src={props.cutout} w={w} cx={540 * s} bottom={bottom - d * 0.07} />
      <div
        style={{
          position: 'absolute',
          top: 1080 * s,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 26 * s
        }}
      >
        <div style={{ fontFamily: headingFont, fontWeight: 700, fontSize: 84 * s }}>
          {size.name.replace(' inch', '"')}
        </div>
        <div
          style={{
            background: brand.colors.white,
            color: brand.colors.secondary,
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 80 * s,
            lineHeight: 1,
            padding: `${14 * s}px ${44 * s}px`,
            borderRadius: 999,
            boxShadow: `0 ${10 * s}px ${22 * s}px rgba(0, 0, 0, 0.3)`
          }}
        >
          {formatPrice(size.price, item.currency)}
        </div>
      </div>
      <Swipe s={s} text="Swipe →" />
    </AbsoluteFill>
  )
}

const OrderSlide = (props: SizeCarouselProps & { s: number }) => {
  const { s } = props
  return (
    <AbsoluteFill
      style={{
        background: brand.colors.white,
        color: brand.colors.primary,
        textAlign: 'center',
        fontFamily: bodyFont
      }}
    >
      <Img
        src={staticFile(`menu/${props.orderPhoto}`)}
        style={{
          position: 'absolute',
          top: 20 * s,
          left: '50%',
          width: 560 * s,
          height: 540 * s,
          objectFit: 'contain',
          transform: 'translateX(-50%)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 570 * s,
          left: 0,
          right: 0,
          bottom: 0,
          background: brand.colors.primary,
          color: brand.colors.white,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: `${44 * s}px ${60 * s}px 0`
        }}
      >
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 76 * s,
            lineHeight: 1.05,
            textWrap: 'balance'
          }}
        >
          {props.orderTitle}
        </div>
        <div
          style={{
            fontWeight: 700,
            fontSize: 32 * s,
            lineHeight: 1.35,
            marginTop: 16 * s,
            textWrap: 'balance'
          }}
        >
          {props.orderLine}
        </div>
        <div
          style={{
            marginTop: 30 * s,
            fontWeight: 800,
            fontSize: 32 * s,
            letterSpacing: 3 * s,
            textTransform: 'uppercase',
            color: brand.colors.accent
          }}
        >
          WhatsApp to order
        </div>
        <div style={{ fontWeight: 800, fontSize: 100 * s, lineHeight: 1.05 }}>
          {brand.whatsapp}
        </div>
        <div
          style={{
            marginTop: 22 * s,
            background: brand.colors.secondary,
            fontWeight: 800,
            fontSize: 36 * s,
            letterSpacing: 2 * s,
            textTransform: 'uppercase',
            padding: `${12 * s}px ${30 * s}px`,
            borderRadius: 14 * s,
            border: `${4 * s}px solid ${brand.colors.white}`
          }}
        >
          {props.orderBy}
        </div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 34 * s,
            color: brand.colors.accent,
            marginTop: 22 * s
          }}
        >
          {props.deal}
        </div>
      </div>
    </AbsoluteFill>
  )
}

export const SizeCarousel = (props: SizeCarouselProps) => {
  const { width } = useVideoConfig()
  const s = width / 1080
  const last = sizeCarouselSlideCount(props.itemId)
  return (
    <AbsoluteFill style={{ fontFamily: bodyFont }}>
      {props.slide === 1 ? (
        <Cover {...props} s={s} />
      ) : props.slide === last ? (
        <OrderSlide {...props} s={s} />
      ) : (
        <SizeSlide {...props} s={s} index={props.slide - 2} />
      )}
    </AbsoluteFill>
  )
}
