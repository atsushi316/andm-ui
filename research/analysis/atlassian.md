# Atlassian Design System

未実装の UI をあとで再現するためのルール。確認日は 2026-10-06。公式フォント、アイコン、CSS は埋め込まない。推測で公式値を足さない。

## 公式 URL

- https://atlassian.design/foundations
- https://atlassian.design/foundations/spacing
- https://atlassian.design/foundations/typography
- https://atlassian.design/foundations/radius
- https://atlassian.design/foundations/border
- https://atlassian.design/foundations/color
- https://atlassian.design/foundations/color/color-palette
- https://atlassian.design/foundations/motion
- https://atlassian.design/components/button

## 考え方（読めた範囲）

Foundations はトークン、ガイドライン、色・余白・文字などの視覚スタイルだと本文にある。色はトークンで当て、役割（brand、neutral、danger など）と強調の強さで選ぶ。余白は 8px を基準にする。角は部品の種類ごとにトークンを分ける。

## color

役割は本文にある。brand は主操作。neutral は既定の文字と二次の UI。information、success、warning、danger、discovery、accent、inverse、input がある。コントラストは非テキストと 24px 以上の文字が 3:1、それより小さい文字が 4.5:1。

パレットページは色名（Blue600 など）と「Hex」「RGB」の見出しまで取れた。数値そのものは本文に残らなかった。検証不能。色トークンは差し替えない。

## typography

アプリの書体名は Atlassian Sans と Atlassian Mono。ファイルは置かない。本文は 1rem = 16px として px も併記している。

| トークン | 字重 | サイズ | 行高 |
|----------|------|--------|------|
| font.body.small | Regular | 12px | 16px |
| font.body | Regular | 14px | 20px |
| font.body.large | Regular | 16px | 24px |

見出しは Bold。Body の字重は Regular / Medium / Bold の3つ。ボタン固有の字重はボタンページに無い。未確認。

## spacing

基準は 8px（`space.100`）。`space.200` は 16px。スケールは 0 / 2 / 4 / 6 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80px。

ボタンのコンテナ余白は 12–24px の範囲、とある。単一の横余白 px は本文に無い。未確認。入力内の余白は 0–8px の範囲。単一値は無い。未確認。

## radius

| トークン | 値 | 使い方 |
|----------|----|--------|
| radius.xsmall | 2px | バッジ、チェックボックス |
| radius.small | 4px | ラベル、コンパクトボタン |
| radius.medium | 6px | ボタン、入力、テキストエリア、セレクト、ナビゲーション |
| radius.large | 8px | カード、ページ内の容器、浮く UI、ドロップダウン |
| radius.xlarge | 12px | モーダル、大きい容器 |
| radius.xxlarge | 16px | 動画 |
| radius.full | 999px | アバターなど円 |

本文は「値は変わることがあり、目安」と書く。今回の本文に出た数を採用する。

## border

| トークン | 値 |
|----------|----|
| border.width | 1px |
| border.width.selected | 2px |
| border.width.focused | 2px |

focus の offset は 2px。focus の角は部品の角 + 2px。focus の色トークン名は `color.border.focused`。hex は無い。

## elevation

今回の取得では elevation ページの本文を読んでいない。影の px は未確認。

## motion

原則は Human、Clarity、Accessible、Performant。操作の duration は 50–150ms の範囲。遷移は 150–400ms。ドロップダウンの入場は 150ms。モーダルの入場は 250ms。単一の hover ms は本文に無い。

曲線:

- ease-out bold `cubic-bezier(0, 0.4, 0, 1)`
- ease-in-out bold `cubic-bezier(0.4, 0, 0, 1)`
- ease-in practical `cubic-bezier(0.6, 0, 0.8, 0.6)`
- ease-out practical `cubic-bezier(0.4, 1, 0.6, 1)` — ホバーの背景フェード

reduced motion のとき、本文はモーションを切って即時、と書く。andm の共通 reduced-motion は変えていない。

short1–short4 は差し替えない。新しい duration 名は足していない。

## コンポーネント（ボタン）

ボタンは出来事を起こす。primary は領域に原則1つ。default、subtle、warning、danger、discovery がある。高さの px は本文に無い。未確認。角は radius.medium の 6px。compact があるが、その px は本文に無い。未確認。

## andm の `andm-series--atlassian` に入れた数値

公式:

- 書体名 Atlassian Sans。字 12 / 14 / 16px。行高は Body M の 20/14。
- ボタンと入力の角 6px。面 8px。ダイアログ 12px。バッジとチェックの角 2px。
- 枠 1px。タブの選択線 2px。focus 幅 2px、offset 2px。
- ホバーの曲線は ease-out practical。

andm の傾向:

- アラートの角は 8px。カードの large を流用。アラート固有は未確認。
- 押下の縮小は Baseline のまま。公式の縮小率は無い。

## 未確認

- 色の hex。パレットに名前はあるが数値が出なかった。
- ボタンの高さと、単一の横余白。
- チェックボックスのサイズと、チェックの線の太さ。
- ラジオのサイズ。角は円のまま。
- テキストフィールド固有の高さ。角は radius.medium の 6px を公式として置いた。
- タブの角。選択線の 2px だけ採用。角は下線型の 0 のまま。
- Divider の色。トークンは触れるが値は Baseline。
- 意味色の hex。
- elevation の px。
- duration を short1–short4 に割り当てる単一値。
