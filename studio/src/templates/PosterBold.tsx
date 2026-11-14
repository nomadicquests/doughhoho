import { AbsoluteFill, Img, staticFile, useVideoConfig } from 'remotion'
import { brand } from '@doughhoho/brand'
import { headingFont, bodyFont } from '../fonts'
import { Logo } from '../components/Logo'

// Print posters that say plainly what is for sale. Three layouts share the
// same copy so they can be compared: A (headline on red, products on white),
// B (photos edge to edge, green band) and C (shop sign: white, red frame).

export type PosterProduct = {
  photo: string // path inside studio/public/menu/
  focus: string
  name: string
  details: string
  price: string // e.g. 'J$2,400'
  pricePrefix: string // e.g. 'from', or empty
}

export type PosterBoldProps = {
  concept: 'A' | 'B' | 'C'
  headline: string // first line, e.g. 'Christmas Cakes'
  headline2: string // second line, e.g. '& Cookie Boxes'
  callout: string // e.g. 'Order now for Christmas'
  badge: string // e.g. 'Perfect for gifting'
  products: PosterProduct[]
  orderBy: string
  fulfilment: string
  qrCode: string // image in studio/public/
}

const BLEED = 10.6 // 3 mm, in layout units
const SAFE = 36 // a further 7 mm inside the trim

// A gold starburst sticker with the price
const PriceBurst = ({
  p,
  size,
  u
}: {
  p: PosterProduct
  size: number
  u: number
}) => {
  const points = Array.from({ length: 32 }, (_, i) => {
    const r = i % 2 === 0 ? 50 : 43
    const a = (i / 32) * Math.PI * 2
    return `${50 + r * Math.cos(a)}% ${50 + r * Math.sin(a)}%`
  }).join(', ')
  return (
    <div
      style={{
        width: size,
        height: size,
        clipPath: `polygon(${points})`,
        background: brand.colors.accent,
        color: brand.colors.primary,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'rotate(-10deg)',
        filter: `drop-shadow(0 ${6 * u}px ${10 * u}px rgba(0, 0, 0, 0.3))`
      }}
    >
      {p.pricePrefix ? (
        <div
          style={{
            fontWeight: 800,
            fontSize: size * 0.13,
            textTransform: 'uppercase',
            letterSpacing: size * 0.01,
            marginBottom: -size * 0.02
          }}
        >
          {p.pricePrefix}
        </div>
      ) : null}
      <div style={{ fontWeight: 800, fontSize: size * 0.22, lineHeight: 1 }}>
        {p.price}
      </div>
    </div>
  )
}

// The order details: date, number, QR code, delivery or pickup
const OrderBar = ({
  props,
  u,
  dark
}: {
  props: PosterBoldProps
  u: number
  dark: boolean // dark bar with light text
}) => {
  const fg = dark ? brand.colors.white : brand.colors.primary
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 30 * u,
        width: '100%',
        color: fg
      }}
    >
      <Img
        src={staticFile(props.qrCode)}
        style={{
          width: 170 * u,
          height: 170 * u,
          background: brand.colors.white,
          borderRadius: 12 * u,
          padding: 8 * u,
          boxSizing: 'border-box',
          flexShrink: 0
        }}
      />
      <div style={{ textAlign: 'left', flex: 1 }}>
        <div
          style={{
            fontWeight: 800,
            fontSize: 30 * u,
            letterSpacing: 3 * u,
            textTransform: 'uppercase',
            color: dark ? brand.colors.accent : brand.colors.secondary
          }}
        >
          WhatsApp to order · {props.orderBy}
        </div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 84 * u,
            lineHeight: 1.05,
            letterSpacing: -1 * u
          }}
        >
          {brand.whatsapp}
        </div>
        <div style={{ fontWeight: 700, fontSize: 28 * u }}>
          {props.fulfilment} · {brand.handle}
        </div>
      </div>
    </div>
  )
}

const ProductLabel = ({
  p,
  u,
  color,
  align = 'center'
}: {
  p: PosterProduct
  u: number
  color: string
  align?: 'center' | 'left'
}) => (
  <div style={{ textAlign: align, color }}>
    <div
      style={{
        fontWeight: 800,
        fontSize: 40 * u,
        lineHeight: 1.1,
        textTransform: 'uppercase'
      }}
    >
      {p.name}
    </div>
    <div style={{ fontWeight: 700, fontSize: 27 * u, marginTop: 6 * u }}>
      {p.details}
    </div>
  </div>
)

// A: huge headline on solid red, the products on white below
const ConceptA = (props: PosterBoldProps & { u: number }) => {
  const { u } = props
  const pad = (BLEED + SAFE) * u
  return (
    <AbsoluteFill style={{ background: brand.colors.white }}>
      <div
        style={{
          background: brand.colors.secondary,
          color: brand.colors.white,
          padding: `${pad}px ${pad}px ${40 * u}px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Logo variant="wordmarkOnDark" style={{ width: 190 * u }} />
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 112 * u,
            lineHeight: 1,
            marginTop: 14 * u,
            whiteSpace: 'nowrap'
          }}
        >
          {props.headline}
          <br />
          {props.headline2}
        </div>
        <div
          style={{
            marginTop: 24 * u,
            fontWeight: 800,
            fontSize: 46 * u,
            letterSpacing: 4 * u,
            textTransform: 'uppercase',
            color: brand.colors.accent
          }}
        >
          {props.callout}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          gap: 36 * u,
          padding: `${50 * u}px ${pad}px ${16 * u}px`
        }}
      >
        {props.products.map((p) => (
          <div
            key={p.name}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 22 * u
            }}
          >
            <div style={{ position: 'relative', width: '100%' }}>
              <Img
                src={staticFile(`menu/${p.photo}`)}
                style={{
                  width: '100%',
                  aspectRatio: '1 / 0.9',
                  objectFit: 'cover',
                  objectPosition: p.focus,
                  borderRadius: 28 * u,
                  display: 'block'
                }}
              />
              <div style={{ position: 'absolute', right: -24 * u, top: -30 * u }}>
                <PriceBurst p={p} size={190 * u} u={u} />
              </div>
            </div>
            <ProductLabel p={p} u={u} color={brand.colors.primary} />
          </div>
        ))}
      </div>
      <div
        style={{
          background: brand.colors.primary,
          padding: `${30 * u}px ${pad}px ${pad}px`
        }}
      >
        <OrderBar props={props} u={u} dark />
      </div>
    </AbsoluteFill>
  )
}

// B: the food photos edge to edge on top, a bold green band below
const ConceptB = (props: PosterBoldProps & { u: number }) => {
  const { u } = props
  const pad = (BLEED + SAFE) * u
  return (
    <AbsoluteFill style={{ background: brand.colors.primary }}>
      <div style={{ display: 'flex', height: '58%', position: 'relative' }}>
        {props.products.map((p, i) => (
          <div key={p.name} style={{ flex: 1, position: 'relative' }}>
            <Img
              src={staticFile(`menu/${p.photo}`)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: p.focus,
                borderLeft:
                  i > 0 ? `${8 * u}px solid ${brand.colors.white}` : undefined
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: pad,
                [i === 0 ? 'left' : 'right']: pad - 10 * u
              }}
            >
              <PriceBurst p={p} size={200 * u} u={u} />
            </div>
            <div
              style={{
                position: 'absolute',
                left: 24 * u,
                right: 24 * u,
                bottom: 30 * u,
                background: brand.colors.secondary,
                borderRadius: 18 * u,
                padding: `${16 * u}px ${20 * u}px`,
                boxShadow: `0 ${8 * u}px ${18 * u}px rgba(0, 0, 0, 0.35)`
              }}
            >
              <ProductLabel p={p} u={u * 0.92} color={brand.colors.white} />
            </div>
          </div>
        ))}
        <Logo
          variant="badge"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: -95 * u,
            width: 190 * u,
            transform: 'translateX(-50%)',
            filter: `drop-shadow(0 ${8 * u}px ${14 * u}px rgba(0, 0, 0, 0.35))`
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          color: brand.colors.white,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          padding: `${110 * u}px ${pad}px ${pad}px`
        }}
      >
        <div>
          <div
            style={{
              fontFamily: headingFont,
              fontWeight: 700,
              fontSize: 104 * u,
              lineHeight: 1
            }}
          >
            {props.headline} {props.headline2}
          </div>
          <div
            style={{
              marginTop: 20 * u,
              fontWeight: 800,
              fontSize: 46 * u,
              letterSpacing: 4 * u,
              textTransform: 'uppercase',
              color: brand.colors.accent
            }}
          >
            {props.callout}
          </div>
        </div>
        <OrderBar props={props} u={u} dark />
      </div>
    </AbsoluteFill>
  )
}

// C: a shop sign: white, thick red frame, round photos, very bold type
const ConceptC = (props: PosterBoldProps & { u: number }) => {
  const { u } = props
  const frame = (BLEED + 22) * u
  const pad = 30 * u
  return (
    <AbsoluteFill
      style={{
        background: brand.colors.secondary,
        padding: frame
      }}
    >
      <div
        style={{
          flex: 1,
          background: brand.colors.white,
          borderRadius: 30 * u,
          border: `${6 * u}px solid ${brand.colors.accent}`,
          padding: pad,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          color: brand.colors.primary
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 * u }}>
          <Logo variant="badge" style={{ width: 120 * u }} />
          <div
            style={{
              background: brand.colors.secondary,
              color: brand.colors.white,
              fontWeight: 800,
              fontSize: 38 * u,
              letterSpacing: 3 * u,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              padding: `${12 * u}px ${30 * u}px`,
              borderRadius: 999
            }}
          >
            {props.callout}
          </div>
        </div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 112 * u,
            lineHeight: 0.95,
            letterSpacing: -2 * u,
            textTransform: 'uppercase',
            marginTop: 26 * u
          }}
        >
          {props.headline}
          <br />
          <span style={{ color: brand.colors.secondary }}>
            {props.headline2}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 30 * u,
            width: '100%',
            marginTop: 30 * u,
            flex: 1,
            minHeight: 0
          }}
        >
          {props.products.map((p) => (
            <div
              key={p.name}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 18 * u
              }}
            >
              <div style={{ position: 'relative' }}>
                <Img
                  src={staticFile(`menu/${p.photo}`)}
                  style={{
                    width: 330 * u,
                    height: 330 * u,
                    objectFit: 'cover',
                    objectPosition: p.focus,
                    borderRadius: '50%',
                    border: `${10 * u}px solid ${brand.colors.accent}`,
                    display: 'block'
                  }}
                />
                <div style={{ position: 'absolute', right: -40 * u, bottom: -20 * u }}>
                  <PriceBurst p={p} size={180 * u} u={u} />
                </div>
              </div>
              <ProductLabel p={p} u={u} color={brand.colors.primary} />
            </div>
          ))}
        </div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 30 * u,
            letterSpacing: 4 * u,
            textTransform: 'uppercase',
            color: brand.colors.secondary,
            marginBottom: 20 * u
          }}
        >
          ★ {props.badge} ★
        </div>
        <div
          style={{
            width: '100%',
            background: brand.colors.primary,
            borderRadius: 22 * u,
            padding: `${22 * u}px ${26 * u}px`
          }}
        >
          <OrderBar props={props} u={u} dark />
        </div>
      </div>
    </AbsoluteFill>
  )
}

export const PosterBold = (props: PosterBoldProps) => {
  const { width } = useVideoConfig()
  const u = width / 1080
  const Concept =
    props.concept === 'A' ? ConceptA : props.concept === 'B' ? ConceptB : ConceptC
  return (
    <AbsoluteFill style={{ fontFamily: bodyFont }}>
      <Concept {...props} u={u} />
    </AbsoluteFill>
  )
}
