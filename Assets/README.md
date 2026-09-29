# Assets — source files only

Nothing in this folder is served by the website. It holds the **originals**:
full-size, uncompressed, as received.

The website only serves files from `public/`. Put optimized, web-ready copies
there, never the same file in both places.

```
Assets/                     originals (not served)
  brand/                    logo sources
  photos/                   full-size photographs
  video/                    uncompressed video masters

public/                     served by the website
  logo.png                  Assets/brand/logo.jpg, white margin cropped, pixels untouched
  images/                   optimized photos, patterns, video poster
  video/                    compressed loops (hero.webm/.mp4, footer.webm/.mp4)
```

## Replacing the hero video

1. Put the new master in `Assets/video/`.
2. Encode it into `public/video/hero.webm` and `public/video/hero.mp4`
   (no audio, 1920×1080, the last second cross-faded into the first for a
   seamless loop) and export its first frame to `public/images/hero-poster.jpg`.
3. Keep the file names: `components/sections/Hero.tsx` points to them.

The current master is 768×432 and is upscaled on encode; a native 1920×1080
master will look noticeably sharper on large screens.

## Replacing the footer video

Master: `Assets/video/footer-video-original.mp4` (1080×1920 portrait, on black).
The footer needs a 16:9 video, so the encode builds one:

1. 5 s seamless loop (last second cross-faded into the first).
2. Portrait clip scaled to 900 px tall, its edges feathered to transparent
   (22 % of the width on each side, 10 % of the height) so no cut shows.
3. Centred on a black 1920×1080 canvas → `public/video/footer.mp4` and
   `footer.webm`, no audio, plus a frame at 2 s → `public/images/footer-poster.jpg`.

Keep the black background: the footer blends it in `lighten` onto its
near-black ground and covers the full width with it.
