import { AbsoluteFill, Img, staticFile, useVideoConfig } from 'remotion'
import { brand, menu } from '@doughhoho/brand'
import { headingFont, bodyFont } from '../fonts'
import { formatPrice } from '../components/Price'
import { Logo } from '../components/Logo'
import {
  BLEED,
  SAFE,
  OrderPanel,
  PriceCallout,
  type PosterProduct
} from './PosterBold'

// A print poster for one product, in the same style as poster B: the hero
// photo with the wordmark and a gift-tag price, a round second photo, the
// order-by tag, then a green band with the product name, a short line, what
// is inside or the sizes and prices, the offer, and how to order.

export type PosterSingleProps = {
  itemId: string
  photo: string // hero, path inside studio/public/menu/
  focus: string
  photoWidth: number // share of the width the hero takes, from the right (1 = full)
  backdrop: string // colour behind the hero, matched to its background
  inset: string // round second photo
  insetFocus: string
  headline: string
  headlineSize: number // in layout units; 96 fits 'Christmas Cookie Box'
  subline: string
  pricePrefix: string // e.g. 'from', or empty
  showContents: boolean // a strip of the cookies inside
  showSizes: boolean // a row of sizes and prices
  note: string // a small line under the sizes, e.g. what it is made with
  orderBy: string
  deal: string
  badge: string
  fulfilment: string
  qrCode: string
}

export const PosterSingle = (props: PosterSingleProps) => {
  const { width } = useVideoConfig()
  const u = width / 1080
  const pad = (BLEED + SAFE) * u
  const item = menu.find((m) => m.id === props.itemId) ?? menu[0]
  const price: PosterProduct = {
    photo: props.photo,
    focus: props.focus,
    name: item.name,
    details: '',
    price: formatPrice(item.price, item.currency),
    pricePrefix: props.pricePrefix
  }
  const photoH = 600 * u
  const circle = 340 * u
  const contents = (item.contents ?? []).filter((c) => c.cutout)
  const gap = 32 * u // between the blocks in the green band
  return (
    <AbsoluteFill style={{ fontFamily: bodyFont, background: brand.colors.primary }}>
      <div style={{ position: 'relative', height: photoH, flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: props.backdrop }} />
        <Img
          src={staticFile(`menu/${props.photo}`)}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: `${props.photoWidth * 100}%`,
            height: '100%',
            objectFit: 'cover',
            objectPosition: props.focus,
            maskImage:
              props.photoWidth < 1
                ? 'linear-gradient(90deg, transparent 0%, black 16%)'
                : undefined,
            WebkitMaskImage:
              props.photoWidth < 1
                ? 'linear-gradient(90deg, transparent 0%, black 16%)'
                : undefined
          }}
        />
        <Logo
          variant="wordmark"
          style={{ position: 'absolute', left: pad - 10 * u, top: pad, width: 270 * u }}
        />
        <div style={{ position: 'absolute', right: pad - 16 * u, top: pad - 10 * u }}>
          <PriceCallout p={price} kind="tag" size={250 * u} u={u} />
        </div>
        <Img
          src={staticFile(`menu/${props.inset}`)}
          style={{
            position: 'absolute',
            left: pad,
            top: photoH - circle * 0.72,
            width: circle,
            height: circle,
            objectFit: 'cover',
            objectPosition: props.insetFocus,
            borderRadius: '50%',
            border: `${10 * u}px solid ${brand.colors.white}`,
            boxSizing: 'border-box',
            boxShadow: `0 ${12 * u}px ${28 * u}px rgba(0, 0, 0, 0.4)`
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: pad,
            bottom: -34 * u,
            background: brand.colors.secondary,
            color: brand.colors.white,
            fontWeight: 800,
            fontSize: 42 * u,
            letterSpacing: 2 * u,
            textTransform: 'uppercase',
            padding: `${16 * u}px ${32 * u}px`,
            borderRadius: 14 * u,
            border: `${4 * u}px solid ${brand.colors.white}`,
            boxShadow: `0 ${8 * u}px ${18 * u}px rgba(0, 0, 0, 0.35)`,
            zIndex: 2
          }}
        >
          {props.orderBy}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          minHeight: 0,
          color: brand.colors.white,
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          padding: `${96 * u}px ${pad}px ${pad}px`
        }}
      >
        <div>
          <div
            style={{
              fontFamily: headingFont,
              fontWeight: 700,
              fontSize: props.headlineSize * u,
              lineHeight: 1,
              whiteSpace: 'nowrap'
            }}
          >
            {props.headline}
          </div>
          <div style={{ fontWeight: 700, fontSize: 34 * u, marginTop: 20 * u }}>
            {props.subline}
          </div>
        </div>
        {props.showContents ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: gap
            }}
          >
            {contents.map((c) => (
              <div
                key={c.name}
                style={{
                  width: 180 * u,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    width: 130 * u,
                    height: 130 * u,
                    borderRadius: '50%',
                    background: brand.colors.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  <Img
                    src={staticFile(`menu/${c.cutout}`)}
                    style={{ width: 108 * u, height: 108 * u, objectFit: 'contain' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: -10 * u,
                      top: -8 * u,
                      background: c.free ? brand.colors.secondary : brand.colors.accent,
                      color: c.free ? brand.colors.white : brand.colors.primary,
                      fontWeight: 800,
                      fontSize: (c.free ? 18 : 24) * u,
                      padding: `${4 * u}px ${10 * u}px`,
                      borderRadius: 999,
                      border: `${3 * u}px solid ${brand.colors.white}`
                    }}
                  >
                    {c.free ? 'FREE' : `×${c.count}`}
                  </div>
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 22 * u,
                    lineHeight: 1.15,
                    marginTop: 10 * u
                  }}
                >
                  {c.count === 1 ? c.name.replace(/s$/, '') : c.name}
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {props.showSizes && item.sizes ? (
          <div style={{ marginTop: gap }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 26 * u }}>
              {item.sizes.map((sz) => (
                <div
                  key={sz.name}
                  style={{
                    background: brand.colors.white,
                    color: brand.colors.primary,
                    borderRadius: 18 * u,
                    padding: `${10 * u}px ${30 * u}px`,
                    minWidth: 250 * u
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: 28 * u, textTransform: 'uppercase', letterSpacing: 2 * u }}>
                    {sz.name}
                  </div>
                  <div
                    style={{
                      fontFamily: headingFont,
                      fontWeight: 700,
                      fontSize: 52 * u,
                      lineHeight: 1.05,
                      color: brand.colors.secondary
                    }}
                  >
                    {formatPrice(sz.price, item.currency)}
                  </div>
                </div>
              ))}
            </div>
            {props.note ? (
              <div
                style={{
                  fontFamily: headingFont,
                  fontStyle: 'italic',
                  fontSize: 36 * u,
                  marginTop: 20 * u
                }}
              >
                {props.note}
              </div>
            ) : null}
          </div>
        ) : null}
        <div style={{ marginTop: gap }}>
          <div style={{ fontWeight: 800, fontSize: 40 * u, color: brand.colors.accent }}>
            {props.deal}
          </div>
          <div
            style={{
              fontWeight: 800,
              fontSize: 26 * u,
              letterSpacing: 4 * u,
              textTransform: 'uppercase',
              marginTop: 4 * u
            }}
          >
            ★ {props.badge} ★
          </div>
        </div>
        <div style={{ textAlign: 'left', marginTop: 'auto' }}>
          <OrderPanel props={props} u={u} />
        </div>
      </div>
    </AbsoluteFill>
  )
}
