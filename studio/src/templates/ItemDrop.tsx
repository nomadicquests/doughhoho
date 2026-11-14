import { AbsoluteFill, useVideoConfig } from 'remotion'
import { brand, menu } from '@doughhoho/brand'
import { headingFont, bodyFont } from '../fonts'
import { ItemPhoto } from '../components/ItemPhoto'
import { formatPrice } from '../components/Price'

export type ItemDropProps = {
  itemId: string
  badge: string // e.g. "NEW", "BACK!", "THIS WEEKEND ONLY"
  callToAction: string
}

// A still graphic announcing one menu item: photo, badge, name, price.
export const ItemDrop = ({ itemId, badge, callToAction }: ItemDropProps) => {
  const { width, height } = useVideoConfig()
  const item = menu.find((m) => m.id === itemId) ?? menu[0]
  const scale = width / 1080
  const photoHeight = height * 0.58

  return (
    <AbsoluteFill
      style={{ background: brand.colors.background, fontFamily: bodyFont }}
    >
      <ItemPhoto
        photo={item.photo}
        style={{ width, height: photoHeight, position: 'absolute', top: 0 }}
      />
      <div
        style={{
          position: 'absolute',
          top: 48 * scale,
          left: 48 * scale,
          background: brand.colors.secondary,
          color: brand.colors.white,
          fontFamily: headingFont,
          fontStyle: 'italic',
          fontWeight: 700,
          fontSize: 56 * scale,
          padding: `${12 * scale}px ${36 * scale}px`,
          borderRadius: 999,
          transform: 'rotate(-4deg)',
        }}
      >
        {badge}
      </div>
      <div
        style={{
          position: 'absolute',
          top: photoHeight,
          left: 0,
          right: 0,
          bottom: 0,
          padding: `${40 * scale}px ${64 * scale}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: brand.colors.primary,
          borderTop: `${10 * scale}px solid ${brand.colors.accent}`,
          color: brand.colors.white,
        }}
      >
        <div
          style={{
            fontFamily: headingFont,
            fontWeight: 700,
            fontSize: 96 * scale,
            lineHeight: 1,
          }}
        >
          {item.name}
        </div>
        <div style={{ fontSize: 38 * scale, marginTop: 16 * scale }}>
          {item.description}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 32 * scale,
          }}
        >
          <div
            style={{
              fontFamily: headingFont,
              fontWeight: 700,
              fontSize: 72 * scale,
              color: brand.colors.accent,
            }}
          >
            {formatPrice(item.price, item.currency)}
          </div>
          <div style={{ fontSize: 34 * scale, fontWeight: 800 }}>
            {callToAction} · {brand.handle}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}
