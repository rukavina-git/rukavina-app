# E1 redesign

Goal: build direction E1 (decision 0010) on the home page. Figma: Ideas, "E1 · Design v1"
(desktop 511:2807, mobile 511:3034, stage states 511:3284). Clickable reference: the E1 scroll demo
(claude.ai artifact, version 8).

Scope: header, hero, Work, Services, About, Contact on the home page; messages en + hr.
Out of scope: other pages, Croatian switch-on, the AI project, service detail pages.

Invariants: CLAUDE.md content and design rules; PRODUCT.md evidence only; en and hr in the same
change (hr marked unreviewed); prefers-reduced-motion; WCAG 2.1 AA; responsive from 360px.
Dimmed text uses `text-muted`, never opacity (contrast).

Done when: all steps ticked, build green, checked at 360, 768 and 1440, impeccable detect and the
taste copy lint clean, one PR to develop.
