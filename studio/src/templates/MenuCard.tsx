import { AbsoluteFill, Img, staticFile, useVideoConfig } from 'remotion'
import { brand, menu } from '@doughhoho/brand'
import { headingFont, bodyFont } from '../fonts'
import { formatPrice } from '../components/Price'
import { Logo } from '../components/Logo'
import { GinghamBackground } from '../components/Festive'

// A feed post that reads like a menu rather than a poster. Three styles share
// the same content: a printed menu card, a chalkboard, and a two-column photo
// menu.

export type MenuCardProps = {
  style: 'card' | 'chalk' | 'split'
  title: string
  cakeNote: string
  cakePhoto: string // the cake on its plate
  cakeTinPhoto: string // the cake in its tin
  boxPhoto: string
  deal: string
  orderBy: string
}

const cakeItem = () => menu.find((m) => m.id === 'christmas-cake') ?? menu[0]
const boxItem = () => menu.find((m) => m.id === 'christmas-cookie-box') ?? menu[0]
const singular = (name: string, count: number) =>
  count === 1 ? name.replace(/s$/, '') : name

// "6 inch ··········· J$3,500"
const PriceRow = ({
  label,
  price,
  size,
  color,
  dots,
  priceFont = headingFont
}: {
  label: string
  price: string
  size: number
  color: string
  dots: string
  priceFont?: string
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: size * 0.35,
      fontSize: size,
      color
    }}
  >
    <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{label}</span>
    <span
      style={{
        flex: 1,
        borderBottom: `${Math.max(2, size * 0.09)}px dotted ${dots}`,
        transform: `translateY(${-size * 0.2}px)`
      }}
    />
    <span style={{ fontFamily: priceFont, fontWeight: 700, whiteSpace: 'nowrap' }}>
      {price}
    </span>
  </div>
)

// The cake on its plate in a circle, the cut-out tin resting on its corner
const TIN_RATIO = 1181 / 1425 // height / width of the tin cut-out
const CakePhotos = ({
  plate,
  tin,
  size,
  ring
}: {
  plate: string
  tin: string
  size: number
  ring: string
}) => {
  const tinW = size * 0.68
  const tinH = tinW * TIN_RATIO
  return (
    <div style={{ position: 'relative', width: size + tinW * 0.35, height: size + tinH * 0.35, flexShrink: 0 }}>
      <Img
        src={staticFile(`menu/${plate}`)}
        style={{
          width: size,
          height: size,
          objectFit: 'cover',
          objectPosition: '55% 60%',
          borderRadius: '50%',
          border: `${Math.max(4, size * 0.03)}px solid ${ring}`,
          boxSizing: 'border-box',
          boxShadow: '0 10px 22px rgba(0, 0, 0, 0.28)',
          filter: 'contrast(1.08) saturate(1.15)'
        }}
      />
      <Img
        src={staticFile(`menu/${tin}`)}
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: tinW,
          height: tinH,
          filter: 'drop-shadow(0 10px 10px rgba(0, 0, 0, 0.35))'
        }}
      />
    </div>
  )
}

const Ornament = ({ color, width }: { color: string; width: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, width }}>
    <div style={{ flex: 1, height: 2, background: color }} />
    <div style={{ color, fontSize: 22 }}>✦</div>
    <div style={{ flex: 1, height: 2, background: color }} />
  </div>
)

// 1. A printed menu card on the red gingham tablecloth
const CardStyle = (props: MenuCardProps) => {
  const cake = cakeItem()
  const box = boxItem()
  const ink = brand.colors.primary
  const gold = brand.colors.accent
  const contents = box.contents ?? []
  return (
    <AbsoluteFill>
      <GinghamBackground theme="red" />
      <div
        style={{
          position: 'absolute',
          inset: 44,
          background: '#FBF6EC',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
          padding: 22
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            border: `3px solid ${gold}`,
            outline: `1.5px solid ${gold}`,
            outlineOffset: -12,
            boxSizing: 'border-box',
            padding: '40px 64px 36px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: ink,
            fontFamily: bodyFont
          }}
        >
          <Logo variant="wordmark" style={{ width: 210 }} />
          <div
            style={{
              fontFamily: headingFont,
              fontWeight: 700,
              fontSize: 82,
              lineHeight: 1,
              marginTop: 18
            }}
          >
            {props.title}
          </div>
          <div style={{ marginTop: 18 }}>
            <Ornament color={gold} width={360} />
          </div>

          <div style={{ width: '100%', marginTop: 34, display: 'flex', gap: 30 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: headingFont, fontWeight: 700, fontSize: 50 }}>
                {cake.name}
              </div>
              <div
                style={{
                  fontFamily: headingFont,
                  fontStyle: 'italic',
                  fontSize: 27,
                  color: brand.colors.secondary,
                  marginTop: 4,
                  marginBottom: 16
                }}
              >
                {props.cakeNote}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {(cake.sizes ?? []).map((sz) => (
                  <PriceRow
                    key={sz.name}
                    label={sz.name}
                    price={formatPrice(sz.price, cake.currency)}
                    size={36}
                    color={ink}
                    dots={`${ink}66`}
                  />
                ))}
              </div>
            </div>
            <div style={{ alignSelf: 'center' }}>
              <CakePhotos plate={props.cakePhoto} tin={props.cakeTinPhoto} size={220} ring={brand.colors.accent} />
            </div>
          </div>

          <div style={{ marginTop: 34 }}>
            <Ornament color={gold} width={200} />
          </div>

          <div style={{ width: '100%', marginTop: 30, display: 'flex', gap: 30 }}>
            <Img
              src={staticFile(`menu/${props.boxPhoto}`)}
              style={{
                width: 230,
                height: 230,
                objectFit: 'cover',
                borderRadius: '50%',
                border: `6px solid ${gold}`,
                alignSelf: 'center',
                flexShrink: 0
              }}
            />
            <div style={{ flex: 1 }}>
              <PriceRow
                label={box.name}
                price={formatPrice(box.price, box.currency)}
                size={40}
                color={ink}
                dots={`${ink}66`}
              />
              <div style={{ fontSize: 26, lineHeight: 1.5, marginTop: 14 }}>
                {contents
                  .filter((c) => !c.free)
                  .map((c) => `${c.name} ×${c.count}`)
                  .join(' · ')}
              </div>
              <div
                style={{
                  fontFamily: headingFont,
                  fontStyle: 'italic',
                  fontSize: 27,
                  color: brand.colors.secondary,
                  marginTop: 6
                }}
              >
                + a free{' '}
                {contents
                  .filter((c) => c.free)
                  .map((c) => singular(c.name, c.count))
                  .join(', ')}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'auto', textAlign: 'center' }}>
            <Ornament color={gold} width={560} />
            <div
              style={{
                fontWeight: 800,
                fontSize: 30,
                color: brand.colors.secondary,
                marginTop: 18
              }}
            >
              {props.deal}
            </div>
            <div style={{ fontWeight: 700, fontSize: 28, marginTop: 8 }}>
              {props.orderBy} · WhatsApp {brand.whatsapp}
            </div>
            <div style={{ fontSize: 24, marginTop: 4, opacity: 0.8 }}>
              {brand.handle}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}

// A sprig of holly, drawn
const Holly = ({ size, flip = false }: { size: number; flip?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    style={{ transform: flip ? 'scaleX(-1)' : undefined }}
  >
    <g fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={3} strokeLinejoin="round">
      <path d="M50 52 C40 40 22 40 10 46 C18 48 18 56 14 60 C22 58 26 64 26 70 C32 62 44 62 50 52 Z" />
      <path d="M50 52 C56 38 72 30 86 32 C80 36 82 44 88 48 C80 48 78 56 80 62 C72 56 60 60 50 52 Z" />
    </g>
    <g fill="#E05A4F" stroke="rgba(255,255,255,0.7)" strokeWidth={2}>
      <circle cx={48} cy={60} r={7} />
      <circle cx={58} cy={64} r={7} />
      <circle cx={52} cy={72} r={7} />
    </g>
  </svg>
)

// 2. A chalkboard in a wooden frame
const ChalkStyle = (props: MenuCardProps) => {
  const cake = cakeItem()
  const box = boxItem()
  const chalk = 'rgba(255, 255, 255, 0.93)'
  const soft = 'rgba(255, 255, 255, 0.55)'
  const glow = '0 0 1.5px rgba(255,255,255,0.6), 0 0 6px rgba(255,255,255,0.15)'
  const noise =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"
  const contents = box.contents ?? []
  return (
    <AbsoluteFill style={{ background: '#5B3A22' }}>
      <div
        style={{
          position: 'absolute',
          inset: 34,
          borderRadius: 10,
          background: `radial-gradient(ellipse at 40% 30%, #2E4A2C 0%, #1F3320 60%, #172818 100%)`,
          boxShadow: 'inset 0 0 60px rgba(0,0,0,0.55), 0 0 0 6px #7A5234',
          overflow: 'hidden'
        }}
      >
        <AbsoluteFill style={{ backgroundImage: noise }} />
        <AbsoluteFill
          style={{
            background:
              'radial-gradient(ellipse at 30% 70%, rgba(255,255,255,0.05), transparent 50%), radial-gradient(ellipse at 75% 25%, rgba(255,255,255,0.04), transparent 45%)'
          }}
        />
        <div style={{ position: 'absolute', left: 18, top: 14 }}>
          <Holly size={130} />
        </div>
        <div style={{ position: 'absolute', right: 18, top: 14 }}>
          <Holly size={130} flip />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '46px 70px 40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: chalk,
            textShadow: glow,
            fontFamily: bodyFont
          }}
        >
          <Logo variant="wordmarkOnDark" style={{ width: 200, opacity: 0.95 }} />
          <div
            style={{
              fontFamily: headingFont,
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: 92,
              lineHeight: 1,
              marginTop: 14
            }}
          >
            {props.title}
          </div>
          <div style={{ width: 420, height: 3, background: soft, marginTop: 18, borderRadius: 2 }} />

          <div style={{ width: '100%', marginTop: 34, display: 'flex', gap: 24, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: headingFont, fontStyle: 'italic', fontWeight: 700, fontSize: 54 }}>
                {cake.name}
              </div>
              <div style={{ fontSize: 26, color: soft, marginBottom: 14 }}>{props.cakeNote}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {(cake.sizes ?? []).map((sz) => (
                  <PriceRow
                    key={sz.name}
                    label={sz.name}
                    price={formatPrice(sz.price, cake.currency)}
                    size={38}
                    color={chalk}
                    dots={soft}
                  />
                ))}
              </div>
            </div>
            <CakePhotos plate={props.cakePhoto} tin={props.cakeTinPhoto} size={220} ring="rgba(255, 255, 255, 0.9)" />
          </div>

          <div style={{ width: '100%', marginTop: 40 }}>
            <PriceRow
              label={box.name}
              price={formatPrice(box.price, box.currency)}
              size={44}
              color={chalk}
              dots={soft}
            />
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: 22 }}>
            {contents
              .filter((c) => c.cutout)
              .map((c) => (
                <div key={c.name} style={{ width: 170, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Img
                    src={staticFile(`menu/${c.cutout}`)}
                    style={{ width: 104, height: 104, objectFit: 'contain', filter: 'drop-shadow(0 6px 6px rgba(0,0,0,0.4))' }}
                  />
                  <div style={{ fontSize: 21, lineHeight: 1.2, marginTop: 6, textAlign: 'center' }}>
                    {singular(c.name, c.count)}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 22, color: c.free ? '#F2B8B2' : brand.colors.accent }}>
                    {c.free ? 'FREE' : `×${c.count}`}
                  </div>
                </div>
              ))}
          </div>

          <div style={{ marginTop: 'auto', textAlign: 'center' }}>
            <div style={{ width: 560, height: 3, background: soft, margin: '0 auto 18px', borderRadius: 2 }} />
            <div style={{ fontFamily: headingFont, fontStyle: 'italic', fontWeight: 700, fontSize: 38, color: brand.colors.accent }}>
              {props.deal}
            </div>
            <div style={{ fontWeight: 700, fontSize: 28, marginTop: 8 }}>
              {props.orderBy} · WhatsApp {brand.whatsapp}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}

// 3. Two columns: the cake on the left, the cookie box on the right
const SplitStyle = (props: MenuCardProps) => {
  const cake = cakeItem()
  const box = boxItem()
  const ink = brand.colors.primary
  const red = brand.colors.secondary
  const contents = box.contents ?? []
  const colHead = {
    fontFamily: headingFont,
    fontWeight: 700,
    fontSize: 54,
    lineHeight: 1.05,
    textAlign: 'center' as const,
    marginTop: 18
  }
  return (
    <AbsoluteFill style={{ background: '#FFFFFF', color: ink, fontFamily: bodyFont }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 48
        }}
      >
        <Logo variant="wordmark" style={{ width: 210 }} />
        <div style={{ fontFamily: headingFont, fontWeight: 700, fontSize: 78, lineHeight: 1, marginTop: 14 }}>
          {props.title}
        </div>
        <div
          style={{
            marginTop: 12,
            fontWeight: 800,
            fontSize: 24,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: red
          }}
        >
          {props.orderBy}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 330,
          left: 50,
          right: 50,
          height: 770,
          display: 'flex'
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: 34 }}>
          <div style={{ height: 280, display: 'flex', alignItems: 'center' }}>
            <CakePhotos plate={props.cakePhoto} tin={props.cakeTinPhoto} size={230} ring={brand.colors.accent} />
          </div>
          <div style={colHead}>Black Cake</div>
          <div style={{ fontFamily: headingFont, fontStyle: 'italic', fontSize: 26, color: red, marginTop: 6, textAlign: 'center' }}>
            {props.cakeNote}
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14, marginTop: 26 }}>
            {(cake.sizes ?? []).map((sz) => (
              <PriceRow
                key={sz.name}
                label={sz.name}
                price={formatPrice(sz.price, cake.currency)}
                size={34}
                color={ink}
                dots={`${ink}55`}
              />
            ))}
          </div>
        </div>
        <div style={{ width: 3, background: red, borderRadius: 2 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: 34 }}>
          <div style={{ height: 280, display: 'flex', alignItems: 'center' }}>
            <Img
              src={staticFile(`menu/${props.boxPhoto}`)}
              style={{
                width: 280,
                height: 280,
                objectFit: 'cover',
                borderRadius: '50%',
                border: `6px solid ${brand.colors.accent}`
              }}
            />
          </div>
          <div style={colHead}>Cookie Box</div>
          <div
            style={{
              fontFamily: headingFont,
              fontWeight: 700,
              fontSize: 54,
              color: red,
              marginTop: 6
            }}
          >
            {formatPrice(box.price, box.currency)}
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6, marginTop: 14 }}>
            {contents.map((c) => (
              <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 27 }}>
                <span>{singular(c.name, c.count)}</span>
                <span style={{ fontWeight: 800, color: c.free ? red : ink }}>
                  {c.free ? 'FREE' : `×${c.count}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 200,
          background: ink,
          color: brand.colors.white,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 32, color: brand.colors.accent }}>{props.deal}</div>
        <div style={{ fontWeight: 800, fontSize: 52 }}>WhatsApp {brand.whatsapp}</div>
        <div style={{ fontWeight: 700, fontSize: 24, opacity: 0.85 }}>
          Delivery or pickup · {brand.handle}
        </div>
      </div>
    </AbsoluteFill>
  )
}

export const MenuCard = (props: MenuCardProps) => {
  const { width } = useVideoConfig()
  const s = width / 1080
  const Style =
    props.style === 'card' ? CardStyle : props.style === 'chalk' ? ChalkStyle : SplitStyle
  return (
    <AbsoluteFill style={{ fontFamily: bodyFont }}>
      <div style={{ width: 1080, height: 1350, transform: `scale(${s})`, transformOrigin: '0 0' }}>
        <Style {...props} />
      </div>
    </AbsoluteFill>
  )
}
