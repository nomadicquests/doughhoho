# Dough Ho Ho Bakery

Social media graphics, videos and ad content for Dough Ho Ho Bakery. An ordering form
will be added later.

## What's where

| Folder         | What it holds                                                        |
| -------------- | -------------------------------------------------------------------- |
| `brand/`       | Colours, fonts, social handle and the menu: the single source of truth |
| `studio/`      | Templates that turn the brand + menu into posts and videos           |
| `inspiration/` | Graphics and videos you like, with notes on why                      |
| `content/`     | Posting calendar and captions                                        |

## Templates

| Template    | Kind  | Sizes                                    |
| ----------- | ----- | ---------------------------------------- |
| `ItemDrop`  | Image | square 1080×1080, portrait 1080×1350, story 1080×1920 |
| `PromoReel` | Video | 1080×1920 (Reels, TikTok, Stories), length grows with item count |
| `MeetTheCookies` | Video | 1080×1920: headline, each cookie in turn, all of them packed in the box, price and how to order (about 13 s) |
| `MeetTheCookies-slide-1` … `-8` | Image | 1080×1350 carousel: cover, one slide per cookie, the packed box, price |
| `BoxReveal` | Video | 1080×1920, 8 s: the box is revealed while a line builds word by word, then price and how to order. Uses `clip` (real footage in `studio/public/footage/`) if set, else `photo` (the box photo, with green words on a light background), else a drawn box whose lid opens |
| `SecretSanta`, `SecretSanta-story` | Image | 1080×1350 and 1080×1920: a real photo on top, the message on a green panel below. Built on `PhotoAnnouncement`, which also suits countdown posts |
| `Spotlight-CandyCane`, `-TripleGingerSnap`, `-ButterCookies`, `-CranberryPistachio` (each also `-still`) | Video, Image | 1080×1920 Reel (6 s) and 1080×1350 still: one cookie on a white plate with its name, its tagline from `brand/menu.ts` and how many are in the box. `theme` is `red` or `green` |
| `BakingDay` | Video | 1080×1920, 9 s: the camera glides down an upright photo (the tray), then pulls back to show it framed on red gingham, while a line builds word by word. Built on `PhotoPan` |

## Making a post

You need [Node.js](https://nodejs.org) 22+ and pnpm (`npm install -g pnpm`).

```bash
pnpm install
pnpm studio          # opens the editor in your browser; change text live, click Render
```

Or render from the command line (files land in `studio/out/`):

```bash
pnpm still ItemDrop-portrait out/item-drop.png
pnpm render PromoReel out/promo.mp4
```

## Changing the look

- **Colours, handle:** `brand/brand.ts`
- **Fonts:** `.woff2` files in `studio/public/fonts/`, listed in `studio/src/fonts.ts`
- **Menu items and prices:** `brand/menu.ts`; photos go in `studio/public/menu/`
- **Logo:** files in `brand/assets/`, listed in `brand.logos` in `brand/brand.ts`

Templates are built with [Remotion](https://www.remotion.dev). Its licence is
free for individuals and companies of up to 3 people; larger companies need a
paid company licence.
