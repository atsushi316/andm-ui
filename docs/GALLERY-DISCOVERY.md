# Gallery discovery update / PR 15

## Scope

Based on main `717b50e` and PR 15 `dd1f757`. 96 components, 14 Series, existing Motion/Tokens, library, completion screens and Labs remain accessible. Public component exports and Series token values are unchanged.

- Parts: use filters and Japanese/English search. Cards clone existing DOM examples; Dialog/Drawer snapshots show their actual contents instead of their opening buttons.
- Screens: three existing task examples (settings, search, detail), with constituent component snapshots and links carrying the selected Series into the existing completion page. These are demonstrations, not finished product templates.
- Series: same Button and Form Field under all existing Series scopes; official interpretation and unverified boundaries remain in detail-page evidence.
- Motion: existing token view, M3 examples and separate materiality/waveform Labs.
- Design Knowledge: philosophy Lab, catalog JSON and six existing source/standards/coverage/library entrances. No research-to-token transformation.
- Pointer enter / keyboard focus opens a native details quick view; tap/click pins it; Escape closes it. The primary detail link remains usable. Changing Series updates scopes without replacing existing controls, input values or scroll position.
- Main sample and comparison sample have independently scoped Series. Gallery chrome never inherits them.
- Implementation HTML, behavior responsibilities, source evidence and UNLICENSED usage condition are visible through natural links. This change grants no license.
- Export includes Design Knowledge JSON/schema and hashes Gallery code/CSS to prevent stale preview assets.

## Checks

Passed: `npm run build`, `npm run audit:tokens`, `npm run audit:sources`, `npm run audit:coverage`, `npm run audit:design-knowledge`, `git diff --check`.

DOM regression: `DOM_MODULE=<absolute happy-dom module path> node scripts/check-gallery-discovery.mjs`. Checks 96 cards, duplicate IDs, dialog content, pointer/touch disclosure, Series scopes and DOM retention, all five catalogs and purpose/Japanese search. Happy DOM was installed only in a temporary QA directory; package dependencies unchanged.

Browser verification: cloud browser connection initially timed out and recovered after reset. The reference site's header taxonomy was inspected in its actual accessibility tree. Managed preview failed with `bwrap: Can't mount proc on /newroot/proc: Operation not permitted`; local Chromium is absent. Actual Gallery rendering, narrow widths, 200% text, pointer/focus operation and physical touch are not yet verified. Deployment and any subsequent browser checks must be reported independently of DOM checks.

## Manual review

Open the preview Gallery. Check purpose filters and Japanese search; Tab onto a card, then its quick-view summary and links; Escape closes; tap summary to pin. Compare Baseline, Carbon, DADS and Expressive. Open Header, Dialog, Text field and a completion screen; enter text, change Series and check retained state. Review at 390px and 200% text. Check Motion, Knowledge, sources and copied implementation HTML.
