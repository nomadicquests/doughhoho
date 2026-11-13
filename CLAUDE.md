# CLAUDE.md

Doughhoho social media and ad content. pnpm workspace: `brand/` (data) and `studio/` (Remotion templates).

- Brand colours, fonts, handle and menu live only in `brand/`. Templates must read from there, never hardcode them.
- Before designing a new template, read `inspiration/notes.md` and look at the referenced files. For videos, extract frames with ffmpeg to see them.
- Never copy assets from `inspiration/` into a template; borrow ideas only.
- Fonts are bundled locally in `studio/public/fonts/`; don't switch to network-loaded fonts.
- Remotion packages must all share one exact version.
- Check every template change with `pnpm typecheck` and a test render, and look at the output before calling it done.
- Rendered output (`out/`) is gitignored.
- In a cloud session, pass `--browser-executable` pointing at the pre-installed headless shell under `/opt/pw-browsers/` when rendering.
- No semicolons, single quotes, trailing commas.
