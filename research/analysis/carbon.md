# Carbon

未実装の UI をあとで再現するためのルール。確認日は 2026-09-29。公式アイコン、フォントファイル、CSS は埋め込まない。本文と JSON に無い値は書かない。

## 公式 URL

リポジトリ: https://github.com/carbon-design-system/carbon

取得したファイル:

- `packages/themes/src/v10/white.ts`
- `packages/themes/src/v10/g10.ts`
- `packages/colors/src/dtcg/colors.json`
- `packages/layout/src/dtcg/layout.json`
- `packages/styles/scss/components/button/_vars.scss`
- `packages/styles/scss/utilities/_layout.scss`
- `packages/styles/scss/components/button/_mixins.scss` と `_button.scss` の、高さと色の参照箇所
- `packages/type/scss/_font-family.scss`
- `packages/themes/src/dtcg/components/button.json`（hover の別名。今回の Button には未使用）

## 思想・概念

README の本文が取れた。https://github.com/carbon-design-system/carbon の `README.md`。

- Carbon は、IBM のオープンソースのデザインシステムである。製品と体験のため。
- このリポジトリは、React と Web Components、Sass、デザイントークン、アイコン、ピクトグラム、使うためのツールを含む。
- `@carbon/elements` の説明は、IBM Design Language の基盤（トークンとアセット）。`@carbon/motion` の説明は、productive と expressive のモーション曲線。曲線の意味は README には無い。

原則の本文が取れた公式ページは https://carbondesignsystem.com/all-about-carbon/what-is-carbon/ 。そこからの要約。

- IBM Design Language を土台に、動くコード、デザインツールと資源、ヒューマンインターフェースガイドライン、貢献するコミュニティからなる。
- 名前の由来は、元素の炭素が単純な化合物から複雑な構造を作ること。スタイルとコンポーネントの組み合わせで、複雑で自然で直感的なデザインを作る、という比喩だと本文にある。
- 原則は5つ。開かれている（使う人が作り手でもあり、貢献を勧める）。インクルーシブ（能力や状況を問わずアクセスできる）。モジュールで柔軟（部品は、必要な組み合わせで互いにつながる）。利用者を先に置く（利用者の必要についての調査に基づく）。一貫性を作る（IBM Design Language に基づき、要素は最初から一緒に働くように設計されている）。
- IBM にとっては、ブランドのデジタルな表現であり、製品とデジタル体験の土台である。人間中心のデザイン、高い品質基準、IBM ブランドに根ざした体験で、一貫性を届ける、と本文にある。

## 考え方

white と g10 は、ボタンの primary / secondary が同じ色を指す。面の色は違う。white の `uiBackground` は white。g10 の `uiBackground` は gray10。シリーズの Button は white を既定にしている。

ボタンの高さは汎用の size トークンを使い、ボタン自身の既定ステップは `lg`（48px）。角の既定は 0。

## color

`colors.json` の値。white.ts と g10.ts が名前で参照している。

| 名前 | 値 |
|------|----|
| blue60 | `#0f62fe` |
| blue70 | `#0043ce` |
| blue80 | `#002d9c` |
| blue60Hover | `#0050e6` |
| gray10 | `#f4f4f4` |
| gray30 | `#c6c6c6` |
| gray50 | `#8d8d8d` |
| gray60 | `#6f6f6f` |
| gray70 | `#525252` |
| gray80 | `#393939` |
| gray100 | `#161616` |
| white | `#ffffff` |
| red60 | `#da1e28` |
| red80 | `#750e13` |

white.ts と g10.ts に直書きされている値:

- `hoverPrimary` / `hoverTertiary` = `#0353e9`
- `hoverSecondary` = `#4c4c4c`
- `buttonSeparator` = `#e0e0e0`

white と g10 の対応:

- primary = blue60。hover = `#0353e9`。active = blue80
- secondary = gray80。hover = `#4c4c4c`。active = gray60
- tertiary = blue60。active = blue80。hover 背景は `#0353e9`。hover と active の文字は `textInverse`（white）
- 塗りの文字 `textOnColor` は white
- 無効背景 `disabled02` は gray30。無効文字 `disabled03` は gray50
- 本文 `text01` は gray100。補助 `text02` は gray70
- white の面は `#ffffff`。g10 の面は gray10 `#f4f4f4`
- focus は blue60

`button.json` の primary-hover は `{blue.60Hover}`（`#0050e6`）。white.ts の `#0353e9` とは違う。Button は white.ts / g10.ts を採用した。

`hoverDanger` は `adjustLightness` の結果で、hex がファイルに無い。未採用。

## typography

- `$button-font-size` は `0.875rem`
- `$button-font-weight` は 400
- 書体名は IBM Plex Sans。日本語向けの名前は IBM Plex Sans JP。ファイルは置かない
- body-compact の行高は、mixin が参照しているが、今回その数値は取得していない。未確認

## spacing

`layout.json` の記述（値は mini unit。説明文の px を採用）:

| トークン | 説明 |
|----------|------|
| spacing-03 | 8px |
| spacing-04 | 12px |
| spacing-05 | 16px |
| spacing-10 | 64px |

size トークン（説明文が px）:

| トークン | px |
|----------|----|
| size-xs | 24 |
| size-sm | 32 |
| size-md | 40 |
| size-lg | 48 |
| size-xl | 64 |
| size-2xl | 80 |

density の normal は spacing-05（16px）。condensed は spacing-03（8px）。

ボタンの横余白は、leading が density から 1px を引いた値、trailing が density の 3 倍に 16px を足して 1px を引いた値。normal なら 15px と 63px。63px はアイコンの置き場。テキストだけのボタンには未採用。採用した横余白は spacing-05 の 16px。

## radius

`$button-border-radius` は 0。v12 フラグが有効なときの fallback は `border-radius-max`（layout.json では `999999px`）。フラグは有効にしていない。

layout の角トークン: 0、2px、4px、8px、16px、24px、max。ボタンの既定は 0。4px は「inputs, cards, and general components」の説明。8px はパネルとモーダル。

## elevation

ボタンの既定にドロップシャドウは無い。focus は inset の 1px（`$button-outline-width`）と 2px（`$button-border-width`）。外側の影の式は取得していない。

## motion

2026-09-30 に https://carbondesignsystem.com/elements/motion/overview/ の本文を取得した。ボタン mixin（`packages/styles/scss/components/button/_mixins.scss`）は、背景・影・境界・outline を `$duration-fast-01` と `motion(entrance, productive)` にしている。

採用:

- `duration-fast-01` は 70ms。`--andm-motion-duration-short1` と `short2` を 70ms。
- entrance productive は `cubic-bezier(0, 0, 0.38, 0.9)`。`--andm-motion-easing-decelerate` と `accelerate` をこの曲線にする。押下とホバーで別の曲線は mixin に無い。
- standard productive は `cubic-bezier(0.2, 0, 0.38, 0.9)`。`--andm-motion-easing-standard` をこの曲線にする。
- short3 / short4 は差し替えない。fast-02 以降をどれに割り当てるかは本文に無い。
- 押下の縮小はしない（`--andm-btn-press-scale: 1`）。

## コンポーネント（ボタン）

- 境界幅の見た目は `$button-outline-width` の 1px。primary と secondary の境界色は transparent
- primary: 背景 blue60、文字 white。hover `#0353e9`。active blue80
- secondary: 背景 gray80、文字 white。hover `#4c4c4c`。active gray60
- tertiary: 背景透明、境界と文字は blue60。hover 背景 `#0353e9`、文字 white。active 背景 blue80、境界は transparent、文字 white
- 無効: 背景 gray30、文字 gray50
- 高さの既定ステップは `lg`（48px）。使える範囲は xs から 2xl
- 角は 0
- 最大幅の記述は 320px。アイコンは 16px。expressive のアイコンは 20px。expressive は今回のシリーズに入れていない

## andm の `andm-series--carbon` に今反映している数値

- 塗り `#0f62fe`、hover `#0353e9`、active `#002d9c`、文字 white
- tonal は secondary（`#393939` / `#4c4c4c` / `#6f6f6f`）
- outlined は tertiary
- 面は white。本文 `#161616`。補助 `#525252`
- 無効は `#c6c6c6` / `#8d8d8d`
- 高さ 32 / 40 / 48px（size-sm / md / lg）。Gallery の中は 40px。Carbon のボタン既定は 48px
- 角 0。横余白 16px。字 14px（0.875rem）。字重 400
- 書体名は IBM Plex Sans と IBM Plex Sans JP
- 影なし。押下の縮小なし。境界幅 1px。フォーカス色は blue60、幅トークンは 2px

## まだ Button 以外を作るときに使うルール

- g10 の面は `#f4f4f4`。white の面は `#ffffff`。ボタン色は同じ
- 入力やカードの角は layout の 4px。パネルとモーダルは 8px。ボタンの 0 と混ぜない
- 余白は 8 / 12 / 16px（spacing-03 / 04 / 05）。大きい区間は 64px（spacing-10）
- 部品の高さは 24 / 32 / 40 / 48 / 64 / 80px
- アイコン付きボタンの trailing は、normal で 63px。アイコンは 16px
- danger の既定は red60 `#da1e28`、active は red80 `#750e13`。hover の hex は未確認なので足さない
- focus は外側の輪ではなく、inset の 1px と 2px
- `button.json` の hover `#0050e6` は、white.ts の `#0353e9` と別に存在する。混ぜない

## 検証不能

- `hoverDanger` の計算結果
- fast-02 以降を short3 / short4 に割り当てる対応。本文に無い
- body-compact-01 の行高
- v12 を有効にしたときのボタン角（フラグの中身は未確認。fallback 名だけ取得）

## 入力・面・区切り（2026-10-06 採用）

ボタンの角 0 は入力に使わない。

- `--andm-field-radius: 4px` — layout の「inputs, cards, and general components」。公式。
- `--andm-surface-radius: 4px` — 同じ。カード。公式。
- `--andm-dialog-radius: 8px` — パネルとモーダル。公式。
- `--andm-alert-radius` / `--andm-badge-radius` / `--andm-check-radius` は 4px。general components。Alert・Badge・Checkbox 固有の半径は未確認。andm の傾向。
- 入力の高さと横余白は、既にある size-md（40px）と spacing-05（16px）をボタン md が指しているので、field はそれにフォールバックする。入力専用の測定は未確認。
- 入力の枠色は未確認。`--andm-color-outline`（ボタン tertiary の blue60）を参照したまま。
- 入力の枠の太さは未確認。Baseline の 1px。
- focus は外側の輪にしない。幅 2px を offset -2px、inset 1px。非ボタンのルール。色は blue60。
- Divider の色は未確認。`--andm-divider-color` は Baseline の outline-variant。見た目は変えない。
- Checkbox / Radio のサイズとチェックの強さは未確認。サイズは Baseline（20px）のまま。
- 意味色（info / success / warning / error）は未確認。差し替えない。
