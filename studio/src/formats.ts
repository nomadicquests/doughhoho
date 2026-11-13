// Standard social sizes. Every template is registered in each format it suits.
export const formats = {
  square: { width: 1080, height: 1080 }, // Instagram / Facebook feed
  portrait: { width: 1080, height: 1350 }, // Instagram feed (takes more screen)
  story: { width: 1080, height: 1920 }, // Stories, Reels, TikTok
} as const

export type FormatName = keyof typeof formats
