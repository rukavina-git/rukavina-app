# 03 Polish and a11y

Values from the motion review (decision 0010). Ease: `cubic-bezier(0.23, 1, 0.32, 1)`.

## Changes

1. **Press states**: `active:scale-[0.97]`, 150 ms, on header CTA, Send, consent OK, slideshow
   pause and bars. `-webkit-tap-highlight-color: transparent` and `touch-action: manipulation`
   on `html`.
2. **Form success**: lock wrapper min-height, form fades out 150 ms, success panel in 300 ms
   (opacity, translateY 6px, blur 2px), check stroke drawn once 400 ms. Button keeps its width
   while sending.
3. **Slideshow**: caption exit 120 ms, enter 250 ms after 150 ms; screens enter 600 ms, exit
   400 ms. Swipe via scroll-snap on touch. Inactive bars ink/40 (1.4.11).
4. **Hero entrance**: once on load, CSS keyframes, intro/cue/phone translateY 8px → 0, 500 ms,
   delays 0/60/110/150 ms. h1 not faded (LCP).
5. **Field borders** ≥ 3:1 against white (about #8a857c); input border transition 150 ms.
6. **Header glass**: once scrolled, `bg-bg/70`, `backdrop-filter: blur(12px) saturate(1.4)`,
   border fades in 200 ms; solid under `prefers-reduced-transparency` and `prefers-contrast: more`.
7. **Meta**: `viewport` export with `themeColor` `#f7f5f0` and `viewportFit: 'cover'`; add
   `apple-icon.png`.
8. **Cookie notice**: `scroll-padding-bottom` while it is open so focus isn't hidden.
9. **Reduced motion**: keep opacity fades, drop movement only.
10. **Form keyboard**: `enterKeyHint="send"` on the textarea, `autoCapitalize="none"` on email.
11. New-tab links: visually hidden "(opens in a new tab)" via next-intl.

## Done when

Checked on a real phone (Karlo) and at 360/1440; reduced motion and keyboard checked;
typecheck, lint, build pass; reviewer run.
