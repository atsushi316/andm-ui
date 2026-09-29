# Spectrum 2

未実装の UI をあとで再現するためのルール。確認日は 2026-09-29。公式 CSS、フォントファイル、アイコンは埋め込まない。Express は使わない。推測で公式値を足さない。

## 公式 URL

- トークンの色定義: https://github.com/adobe/spectrum-design-data の `packages/tokens/src`（light）
- コンポーネントが使う値: `@spectrum-css/tokens` 16.0.2 の medium / light / global
- ボタンの角の式: `@spectrum-css/button` の `height / 2`
- https://spectrum.adobe.com/page/theming/ はタイトルのみで本文は検証不能

## 考え方（読めた範囲）

desktop、light、medium の Spectrum 2。ボタンは pill（高さの半分）。`corner-radius-100` の 4px はボタンの角ではない。Express テーマは採用しない。

## color

light で採用した値:

| トークン | 値 | 使い方 |
|----------|----|--------|
| blue-900 | `rgb(59, 99, 251)` | 塗りの既定 |
| blue-1000 | `rgb(39, 77, 234)` | hover と down |
| white | `rgb(255, 255, 255)` | 塗りの文字 |
| blue-200 | `rgb(229, 240, 254)` | 薄い面 |
| gray-400 | `rgb(198, 198, 198)` | 境界 |
| gray-50 | `rgb(248, 248, 248)` | 面 |
| gray-800 | `rgb(41, 41, 41)` | 本文 |
| gray-700 | `rgb(80, 80, 80)` | 補助の文字 |

## typography

- font-size-75 / 100 / 200 = 12 / 14 / 16px
- bold-font-weight = 700
- 書体名は Adobe Clean。ファイルは置かない
- 字間は 0

## spacing

ボタンの横余白は pill-edge-to-text から境界を引いた値。

- pill-edge-to-text は 13 / 16 / 20px（S / M / L）
- border-width-200 は 2px
- 採用した横余白は 11 / 14 / 18px

ページ全体の spacing スケールは、今回ボタン以外を再取得していない。未確認。

## radius

ボタンの角は高さの半分。高さ 24 / 32 / 40px なら角は 12 / 16 / 20px。`corner-radius-100`（4px）はボタンに使わない。

## elevation

ボタンの box-shadow はフォーカス以外 none。ドロップシャドウは無し。

## motion

duration の公式値は今回のトークン取得に含まれていない。未確認。押下の縮小はしていない。

## コンポーネント（ボタン）

- desktop の component-height-75 / 100 / 200 = 24 / 32 / 40px（S / 既定 / L）
- 境界幅は 2px
- 塗りは blue-900、文字は白。hover と down は blue-1000
- 角は height / 2。押しても角は変えない

## andm の `andm-series--spectrum` に今入っている数値

上の color、字 12 / 14 / 16px、字重 700、高さ 24 / 32 / 40px、横余白 11 / 14 / 18px、角は pill、影なし、フォーカス幅 2px、押下縮小なし。書体名は Adobe Clean。

## まだ Button 以外を作るときに使うルール

- 面は gray-50、本文は gray-800、補助文字は gray-700、境界は gray-400。
- 薄い強調面は blue-200。その上の文字は blue-900。
- ボタン以外の小さな角に `corner-radius-100`（4px）を使うときは、ボタンの pill と混ぜない。
- Express の値は混ぜない。

## 検証不能

- https://spectrum.adobe.com/page/theming/ の本文。
- ボタン以外の spacing スケールと motion の duration。今回の採用範囲外。
