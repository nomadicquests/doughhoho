export const formatPrice = (amount: number, currency: string) =>
  `${currency === 'JMD' ? 'J$' : currency + ' '}${amount.toLocaleString('en-US')}`
