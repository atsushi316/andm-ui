# Changelog

## 0.1.0

### Breaking / 新規構築

- Vue / Storybook ベースの実装を廃止し、CSS-first 本体へゼロから再構築
- 公開 API は Native HTML + `andm-*` class（`import '@atsushi316/andm-ui/style.css'`）

### Added

- Design Tokens（`--andm-*`）と Cascade Layers（`andm.tokens` / `base` / `components` / `utilities`）
- Button: elevated / filled / tonal / outlined / text × sm / md / lg、標準 state、`andm-btn__icon`
- 製品 Gallery（`gallery/`、`dist/style.css` 参照）— Components / Directions。使える部品は Button、他は予定
- Direction デモ: `andm-series--expressive`（pill / shape morph / expressive easing / asymmetric modifier）。Series 本機能ではない
- Direction デモ: `andm-series--dads`（デジタル庁デザインシステムの色・角丸・タイポ・ボタン性格の Token remapping。公式アセットの再配布ではない）
- `examples/consumer/` 最小利用例
- `research/` 空構造と `DESIGN.md`（Research / Design Space 方針）
