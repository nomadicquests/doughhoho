import { AbsoluteFill, Img, staticFile, useVideoConfig } from 'remotion'
import { brand, menu } from '@doughhoho/brand'
import { headingFont, bodyFont } from '../fonts'
import { formatPrice } from '../components/Price'
import { Logo } from '../components/Logo'
import { GinghamBackground } from '../components/Festive'

// A3 at 300 dpi with 3 mm bleed on every side: 303 x 426 mm.
export const POSTER_A3 = { width: 3579, height: 5031 }
// Keep everything important this far inside the trim line (in layout units).
const BLEED = 10.6 // 3 mm
const SAFE = 36 // a further 7 mm inside the trim

export type ProductCard = {
  itemId: string
  photo: string // path inside studio/public/menu/
  photoFocus: string
  inset: string | null // a smaller second photo, e.g. the packaging
  insetFocus: string
  insetLabel: string
  title: string
  details: string // the line under the title, e.g. sizes or contents
  priceLabel: string // e.g. 'from', or empty
}

export type PosterProps = {
  headline: string
  headlineAccent: string
  subline: string
  badge: string
  cards: ProductCard[]
  orderBy: string
  orderLine: string
  fulfilment: string
  qrCode: string | null // image in studio/public/, made from the WhatsApp link
}

// Laid out in units of a 1080-wide page; `u` turns units into pixels.
export const Poster = (props: PosterProps) => {
  const { width } = useVideoConfig()
  const u = width / 1080
  const pad = (BLEED + SAFE) * u
  return (
    <AbsoluteFill style={{ fontFamily: bodyFont, color: brand.colors.white }}>
      <GinghamBackground theme="red" />
      <AbsoluteFill
        style={{
          padding: pad,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Logo variant="wordmarkOnDark" style={{ width: 200 * u }} />
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 104 * u,
            lineHeight: 1,
            marginTop: 16 * u,
            textShadow: `0 ${3 * u}px ${14 * u}px rgba(0, 0, 0, 0.25)`
          }}
        >
          {props.headline}
          <br />
          <span style={{ fontStyle: 'italic', color: brand.colors.accent }}>
            {props.headlineAccent}
          </span>
        </div>
        <div
          style={{
            fontSize: 34 * u,
            fontWeight: 700,
            marginTop: 16 * u,
            textWrap: 'balance'
          }}
        >
          {props.subline}
        </div>
        <div
          style={{
            marginTop: 18 * u,
            background: brand.colors.accent,
            color: brand.colors.primary,
            fontWeight: 800,
            fontSize: 28 * u,
            letterSpacing: 4 * u,
            textTransform: 'uppercase',
            padding: `${10 * u}px ${34 * u}px`,
            borderRadius: 999
          }}
        >
          {props.badge}
        </div>
        <div
          style={{
            display: 'flex',
            gap: 34 * u,
            marginTop: 30 * u,
            width: '100%',
            flex: 1,
            minHeight: 0
          }}
        >
          {props.cards.map((c) => (
            <Card key={c.itemId} card={c} u={u} />
          ))}
        </div>
        <Footer {...props} u={u} />
      </AbsoluteFill>
    </AbsoluteFill>
  )
}

const Card = ({ card, u }: { card: ProductCard; u: number }) => {
  const item = menu.find((m) => m.id === card.itemId) ?? menu[0]
  const radius = 26 * u
  return (
    <div
      style={{
        flex: 1,
        background: brand.colors.white,
        color: brand.colors.primary,
        borderRadius: radius,
        boxShadow: `0 ${16 * u}px ${36 * u}px rgba(0, 0, 0, 0.3)`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', height: '52%', flexShrink: 0 }}>
        <Img
          src={staticFile(`menu/${card.photo}`)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: card.photoFocus
          }}
        />
        {card.inset ? (
          <div
            style={{
              position: 'absolute',
              right: 18 * u,
              bottom: -60 * u,
              width: 170 * u,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Img
              src={staticFile(`menu/${card.inset}`)}
              style={{
                width: 170 * u,
                height: 170 * u,
                objectFit: 'cover',
                objectPosition: card.insetFocus,
                borderRadius: '50%',
                border: `${6 * u}px solid ${brand.colors.white}`,
                boxShadow: `0 ${8 * u}px ${18 * u}px rgba(0, 0, 0, 0.25)`
              }}
            />
            <div
              style={{
                fontSize: 17 * u,
                fontWeight: 800,
                letterSpacing: 1.5 * u,
                textTransform: 'uppercase',
                color: brand.colors.secondary,
                marginTop: 6 * u,
                whiteSpace: 'nowrap'
              }}
            >
              {card.insetLabel}
            </div>
          </div>
        ) : null}
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: card.inset ? 'flex-start' : 'center',
          textAlign: card.inset ? 'left' : 'center',
          padding: `${18 * u}px ${30 * u}px`,
          paddingRight: card.inset ? 200 * u : 30 * u
        }}
      >
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 46 * u,
            lineHeight: 1.05
          }}
        >
          {card.title}
        </div>
        <div
          style={{
            fontSize: 23 * u,
            lineHeight: 1.35,
            marginTop: 10 * u,
            textWrap: 'balance'
          }}
        >
          {card.details}
        </div>
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 50 * u,
            color: brand.colors.secondary,
            marginTop: 12 * u
          }}
        >
          {card.priceLabel ? (
            <span style={{ fontSize: 26 * u, fontStyle: 'italic' }}>
              {card.priceLabel}{' '}
            </span>
          ) : null}
          {formatPrice(item.price, item.currency)}
        </div>
      </div>
    </div>
  )
}

const Footer = (props: PosterProps & { u: number }) => {
  const { u } = props
  const whatsapp = brand.whatsapp ?? '876 XXX XXXX'
  const missing = !brand.whatsapp
  return (
    <div
      style={{
        width: '100%',
        marginTop: 30 * u,
        display: 'flex',
        alignItems: 'center',
        gap: 30 * u,
        background: brand.colors.primary,
        borderRadius: 26 * u,
        padding: `${24 * u}px ${30 * u}px`,
        border: `${4 * u}px solid ${brand.colors.accent}`
      }}
    >
      <div
        style={{
          width: 190 * u,
          height: 190 * u,
          flexShrink: 0,
          background: brand.colors.white,
          borderRadius: 14 * u,
          padding: 12 * u,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: brand.colors.secondary,
          fontWeight: 800,
          fontSize: 20 * u,
          boxSizing: 'border-box'
        }}
      >
        {props.qrCode ? (
          <Img
            src={staticFile(props.qrCode)}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          'QR CODE GOES HERE'
        )}
      </div>
      <div style={{ flex: 1, textAlign: 'left' }}>
        <div
          style={{
            fontWeight: 800,
            fontSize: 30 * u,
            letterSpacing: 4 * u,
            textTransform: 'uppercase',
            color: brand.colors.accent
          }}
        >
          {props.orderBy}
        </div>
        <div style={{ fontWeight: 700, fontSize: 30 * u, marginTop: 8 * u }}>
          {props.orderLine}
        </div>
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 70 * u,
            lineHeight: 1.1,
            color: missing ? brand.colors.accent : brand.colors.white
          }}
        >
          {whatsapp}
        </div>
        <div style={{ fontSize: 26 * u, marginTop: 4 * u }}>
          {props.fulfilment} · {brand.handle}
        </div>
      </div>
    </div>
  )
}
