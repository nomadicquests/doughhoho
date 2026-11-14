import { AbsoluteFill, Img, staticFile, useVideoConfig } from 'remotion'
import { brand, menu } from '@doughhoho/brand'
import { headingFont, bodyFont } from '../fonts'
import { formatPrice } from '../components/Price'
import { Logo } from '../components/Logo'
import { GinghamBackground, GoldFlecks } from '../components/Festive'

// An Instagram carousel for a product sold in sizes: a cover, one slide per
// size with the cake drawn to scale against the largest size, then how to
// order. Slide 1 is the cover; the last slide is the order slide.

export type SizeCarouselProps = {
  itemId: string
  slide: number
  coverPhoto: string // path inside studio/public/menu/
  coverFocus: string
  coverTitle: string
  sizePhoto: string // shown in the round "cake" on each size slide
  sizeFocus: string
  orderPhoto: string
  orderTitle: string
  orderBy: string
  deal: string
}

export const sizeCarouselSlideCount = (itemId: string) =>
  (menu.find((m) => m.id === itemId)?.sizes?.length ?? 0) + 2

const inches = (name: string) => parseFloat(name) || 1

const Swipe = ({ s }: { s: number }) => (
  <div
    style={{
      position: 'absolute',
      right: 50 * s,
      bottom: 50 * s,
      fontWeight: 800,
      fontSize: 30 * s,
      letterSpacing: 3 * s,
      textTransform: 'uppercase',
      color: brand.colors.white,
      background: 'rgba(0, 0, 0, 0.25)',
      padding: `${10 * s}px ${22 * s}px`,
      borderRadius: 999
    }}
  >
    Swipe →
  </div>
)

const Cover = (props: SizeCarouselProps & { s: number }) => {
  const { s } = props
  const { height } = useVideoConfig()
  return (
    <AbsoluteFill style={{ background: brand.colors.primary }}>
      <Img
        src={staticFile(`menu/${props.coverPhoto}`)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: props.coverFocus
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(0deg, rgba(23, 50, 11, 0.95) 0%, rgba(23, 50, 11, 0.8) 30%, transparent 58%)'
        }}
      />
      <Logo
        variant="wordmark"
        style={{ position: 'absolute', left: 40 * s, top: 40 * s, width: 250 * s }}
      />
      <div
        style={{
          position: 'absolute',
          left: 60 * s,
          right: 60 * s,
          top: height * 0.62,
          color: brand.colors.white,
          textAlign: 'center'
        }}
      >
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 104 * s,
            lineHeight: 1.02,
            textWrap: 'balance'
          }}
        >
          {props.coverTitle}
        </div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 34 * s,
            letterSpacing: 4 * s,
            textTransform: 'uppercase',
            color: brand.colors.accent,
            marginTop: 20 * s
          }}
        >
          Jamaican black cake · 3 sizes
        </div>
      </div>
      <Swipe s={s} />
    </AbsoluteFill>
  )
}

const SizeSlide = (props: SizeCarouselProps & { s: number; index: number }) => {
  const { s } = props
  const item = menu.find((m) => m.id === props.itemId) ?? menu[0]
  const sizes = item.sizes ?? []
  const size = sizes[props.index]
  const largest = Math.max(...sizes.map((z) => inches(z.name)))
  const max = 620 * s
  const d = (max * inches(size.name)) / largest
  const cm = Math.round(inches(size.name) * 2.54)
  return (
    <AbsoluteFill style={{ color: brand.colors.white, textAlign: 'center' }}>
      <GinghamBackground theme="red" />
      <GoldFlecks color={brand.colors.white} />
      <div
        style={{
          position: 'absolute',
          top: 70 * s,
          left: 0,
          right: 0,
          fontWeight: 800,
          fontSize: 34 * s,
          letterSpacing: 5 * s,
          textTransform: 'uppercase'
        }}
      >
        Pick your size · {props.index + 1} of {sizes.length}
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 160 * s,
          width: max,
          height: max,
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: `${4 * s}px dashed rgba(255, 255, 255, 0.45)`
          }}
        />
        <Img
          src={staticFile(`menu/${props.sizePhoto}`)}
          style={{
            width: d,
            height: d,
            objectFit: 'cover',
            objectPosition: props.sizeFocus,
            borderRadius: '50%',
            border: `${10 * s}px solid ${brand.colors.white}`,
            boxSizing: 'border-box',
            boxShadow: `0 ${18 * s}px ${36 * s}px rgba(0, 0, 0, 0.4)`
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          top: 820 * s,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 120 * s,
            lineHeight: 1
          }}
        >
          {size.name.replace(' inch', '"')} cake
        </div>
        <div style={{ fontWeight: 700, fontSize: 32 * s, marginTop: 10 * s, opacity: 0.85 }}>
          {inches(size.name)} inches ({cm} cm) across
        </div>
        <div
          style={{
            marginTop: 30 * s,
            background: brand.colors.white,
            color: brand.colors.secondary,
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 96 * s,
            lineHeight: 1,
            padding: `${18 * s}px ${56 * s}px`,
            borderRadius: 999,
            boxShadow: `0 ${10 * s}px ${22 * s}px rgba(0, 0, 0, 0.3)`
          }}
        >
          {formatPrice(size.price, item.currency)}
        </div>
      </div>
      <Swipe s={s} />
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
          top: 30 * s,
          left: '50%',
          width: 640 * s,
          height: 640 * s,
          objectFit: 'contain',
          transform: 'translateX(-50%)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 660 * s,
          left: 0,
          right: 0,
          bottom: 0,
          background: brand.colors.primary,
          color: brand.colors.white,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: `${50 * s}px ${50 * s}px 0`
        }}
      >
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 72 * s,
            lineHeight: 1.05,
            textWrap: 'balance'
          }}
        >
          {props.orderTitle}
        </div>
        <div
          style={{
            marginTop: 26 * s,
            background: brand.colors.secondary,
            fontWeight: 800,
            fontSize: 40 * s,
            letterSpacing: 2 * s,
            textTransform: 'uppercase',
            padding: `${14 * s}px ${34 * s}px`,
            borderRadius: 14 * s,
            border: `${4 * s}px solid ${brand.colors.white}`
          }}
        >
          {props.orderBy}
        </div>
        <div
          style={{
            marginTop: 34 * s,
            fontWeight: 800,
            fontSize: 36 * s,
            letterSpacing: 3 * s,
            textTransform: 'uppercase',
            color: brand.colors.accent
          }}
        >
          WhatsApp to order
        </div>
        <div style={{ fontWeight: 800, fontSize: 104 * s, lineHeight: 1.05 }}>
          {brand.whatsapp}
        </div>
        <div style={{ fontWeight: 800, fontSize: 34 * s, color: brand.colors.accent, marginTop: 16 * s }}>
          {props.deal}
        </div>
        <div style={{ fontWeight: 700, fontSize: 28 * s, marginTop: 8 * s }}>
          Delivery or pickup · {brand.handle}
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
