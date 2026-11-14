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
| `MeetTheCookies` | Video | 1080×1920: headline, each cookie in a box, all together, price and how to order (about 15 s) |
| `MeetTheCookies-slide-1` … `-7` | Image | 1080×1350 carousel: cover, one slide per cookie, price |

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
