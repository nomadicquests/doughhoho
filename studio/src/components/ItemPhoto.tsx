import { Img, staticFile } from 'remotion'
import { brand } from '@doughhoho/brand'

type Props = { photo: string | null; style?: React.CSSProperties }

// Shows the item's photo, or a placeholder block until real photos are added.
export const ItemPhoto = ({ photo, style }: Props) => {
  if (photo) {
    return (
      <Img
        src={staticFile(`menu/${photo}`)}
        style={{ objectFit: 'cover', ...style }}
      />
    )
  }
  return (
    <div
      style={{
        background: `repeating-linear-gradient(45deg, ${brand.colors.accent}, ${brand.colors.accent} 30px, #fde68a 30px, #fde68a 60px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: brand.colors.secondary,
        fontSize: 40,
        fontWeight: 700,
        ...style,
      }}
    >
      PHOTO HERE
    </div>
  )
}
