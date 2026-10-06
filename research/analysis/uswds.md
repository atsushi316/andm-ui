# U.S. Web Design System (USWDS)

未実装の UI をあとで再現するためのルール。確認日は 2026-10-06。公式フォント、アイコン、CSS は埋め込まない。推測で公式値を足さない。

## 公式 URL

- https://designsystem.digital.gov/how-to-use-uswds/
- https://designsystem.digital.gov/design-tokens/color/theme-tokens/
- https://designsystem.digital.gov/design-tokens/color/system-tokens/
- https://designsystem.digital.gov/design-tokens/spacing-units/
- https://designsystem.digital.gov/design-tokens/typesetting/font-family/
- https://designsystem.digital.gov/design-tokens/typesetting/font-size/
- https://designsystem.digital.gov/design-tokens/typesetting/line-height/
- https://designsystem.digital.gov/documentation/settings/
- https://designsystem.digital.gov/components/button/

`https://designsystem.digital.gov/design-tokens/border-radius/` は 404。角の既定は settings の表から取った。

## 考え方（読めた範囲）

How to use は、原則・ガイダンス・コードで政府のサイトを作る、と書く。トークンは色・余白・文字・不透明度などの単位。部品はボタンやフォームなど、よくある UI の解。成熟度は原則からガイダンス、コードへ進める。px の表は無い。

## color

theme の primary は `blue-60v` `#005ea2`。secondary は `red-50` `#d83933`。ink と base-darkest は `gray-90` `#1b1b1b`。base は `gray-cool-50` `#71767a`。base-lightest は `gray-5` `#f0f0f0`。

disabled-lighter は `gray-20` `#c9c9c9`。disabled は `gray-50` `#757575`。focus の色は `blue-40v` `#2491ff`。

body の背景トークン名は `white`。system tokens の表に `white` の hex は無かった。検証不能。

状態色（success、warning、error）のページは今回読んでいない。hex は未確認。

## typography

sans の既定は `source-sans-pro`。スタックは `"Source Sans Pro", "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif`。ui と body の役割は sans。ボタンの書体は ui。`public-sans` は選べる書体の一つで、既定ではない。ファイルは置かない。

theme の字の大きさ（本文の px 表示）:

| トークン | システム | 値 |
|----------|----------|----|
| 2xs | 3 | 14px |
| sm | 5 | 16px |
| md | 6 | 17px |
| lg | 9 | 22px |

body の既定サイズは theme `sm`。最小の文字は `2xs`。見出しの行高トークンは 2（出力 1.15）。body の行高トークンは 5（出力 1.62）。

行高トークン 1 の出力は 1。用途は「buttons, navigation, and text not meant to break over a line」。

入力の行高はトークン 3（出力 1.35）。ボタンと入力で行高トークンが違う。andm の tight は1つなので、ボタンの 1 を置く。入力の 1.35 は別トークンが無く、見送り。

字重は normal 400、bold 700。ボタン固有の字重はボタンページに無い。未確認。

## spacing

基準は 8px の倍数。`0.5` は 4px。`1` は 8px。`2` は 16px。`2.5` は 20px。`1px` と `2px` は名前どおり。

ボタンの高さと、単一の横余白 px は settings のボタン表に無い。未確認。small の幅は 6 units（48px）で、ヘッダー検索などの幅。高さには使わない。

アラートの横余白は 2.5 units（20px）、縦は 2 units（16px）。アラート専用の余白トークンは無い。見送り。

## radius

| トークン | 既定 | px |
|----------|------|----|
| sm | `2px` | 2px |
| md | `0.5` units | 4px |
| lg | `1` unit | 8px |

ボタンの角は `md`。チェックボックスは `sm`。入力タイルは `md`。カードとモーダルは `lg`。

テキスト入力そのものの角は settings に無い。未確認。

## border と focus

アウトラインボタンのストロークは 2px。チェック、ラジオ、レンジの選択枠は 2px。カードの枠は 2px。

focus の幅は `0.5` units（4px）。offset は 0。スタイルは solid。色は `blue-40v`。

入力の通常時の枠幅は表に無い。エラーなど特別な状態の枠は `0.5` units（4px）。通常の枠には使わない。未確認。

## motion

今回読んだページに duration は無い。short1–short4 は差し替えない。reduced motion の方針は変えていない。

## コンポーネント（ボタン）

ボタンは次の操作など、重要な行動に使う。outline は今のページで起きる操作。既定の角は `md`。アウトラインの枠は 2px。高さの px は無い。

## andm の `andm-series--uswds` に入れた数値

公式:

- primary `#005ea2`。文字 `#1b1b1b`。補助の文字 `#71767a`。
- focus は `#2491ff`、幅 4px、offset 0。
- disabled-lighter `#c9c9c9`、disabled `#757575`。
- 書体は Source Sans Pro のスタック。字は 14 / 16 / 22px。ボタンの行高は 1。
- ボタンの角 4px。チェックとラジオのサイズ 20px。チェックの角 2px。選択の枠 2px。
- アウトラインボタンの枠 2px。
- カードとモーダルの角 8px。面とダイアログに置いた。

andm の傾向:

- 塗り文字と面は CSS の色名 `white`。トークン名 `white` の hex は表に無かった。
- tonal は secondary `#d83933`。on も `white`。部品ページは secondary を色の役割として書く。tonal への対応は andm。
- アウトラインの枠色は primary。公式は「色のストローク」で、枠の hex は表に無い。
- 入力の角は 4px。ボタン `md` と入力タイル `md` の流用。テキストフィールド固有は未確認。
- アラートの角は 8px。カードの `lg` の流用。アラートの角は settings に無い。
- disabled の背景に lighter、文字に disabled を置いた。ボタン無効の塗り hex はボタンページに無い。
- 押下の縮小は Baseline のまま。

## 未確認・見送り

- `white` の hex。
- ボタンの高さと横余白。
- テキストフィールドの高さ、横余白、通常時の枠幅。状態枠の 4px は通常枠に使っていない。
- 入力の行高 1.35。tight はボタンの 1 のまま。
- チェックの線の太さ（中の印）。サイズと枠と角だけ採用。
- ラジオの角。サイズと枠は採用。角は円のまま。
- バッジの角。タブの角。タブの選択線は Baseline の 2px のまま。
- Divider の色。トークンは触れるが値は Baseline。
- カード枠 2px。面の枠幅トークンが無いので見送り。角 8px だけ採用。
- 意味色の hex。影の px。duration。
