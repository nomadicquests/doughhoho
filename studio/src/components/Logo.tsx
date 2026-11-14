import { Img } from 'remotion'
import { brand } from '@doughhoho/brand'

type Props = {
  variant: keyof typeof brand.logos
  style?: React.CSSProperties
}

// One of the logo files from brand/assets/. Set a width or height in style;
// the other follows the logo's own shape.
export const Logo = ({ variant, style }: Props) => (
  <Img src={brand.logos[variant]} style={{ display: 'block', ...style }} />
)
