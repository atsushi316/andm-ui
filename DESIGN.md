# andm-ui Design Principles

CSS-first の小さな UI ライブラリー。Native HTML + `andm-*` class が第一級 API。

## 思想

- **CSS-first / FW-agnostic** — Vue / React / WC は本体に含めない
- **Design Tokens** — 見た目の根拠は `--andm-*` Token system（単一ソース）。各プロパティを唯一値に固定する意味ではない
- **少ない部品で多様** — Component / Token は少数。方向軸の組み合わせで表現する
- **平均収束禁止** — 「最も多いパターン = 正解」にしない。frequency と recommended を分離する
- **Series は Design Language** — Theme ではない。見え方、反応、動きの傾向。UI 構造は定義しない
- **Token は檻にしない** — Global Token で表せるときはそれを優先する。足りない Component 固有の意味は Component-local Token。名前が要らない局所値だけ Local Value。特殊な UI を既存 Token に無理に合わせない
- **Motion は三層** — Character は傾向。Pattern は Trigger × Effect（highlight / lift / compress / morph）。Token は duration と easing。Pattern を増やすために Token 名は増やさない

Custom UI は Series に所属しなくてよい。Global Token、Component-local Token、Core Component、Composition、最小の Local Value で作る。Research は Runtime にも Gallery の値にも流さない。

## Design Space（Button）

観察・記述用の軸。1 つの正しい Button を定義するためではない。

| 軸 | 例示レンジ |
|----|------------|
| Shape | sharp → subtle → rounded → pill |
| Density | compact → comfortable → spacious |
| Emphasis | quiet → secondary → primary → hero |
| Style | filled / tonal / outlined / text / elevated |
| Icon | none / leading / trailing / icon-only |

現状 Core に実装しているのは Style（variant）・Size・Icon（leading/trailing）・標準 state。Shape / Density / Emphasis の追加 modifier は人間確認後に最小限足す。

## 使える見た目

Gallery で今使える例です。共通クラス（`andm-btn` など）に Token を当てます。シリーズ専用クラスは作りません。速度は、出典に duration があるシリーズだけ既存トークンを差し替えます。

| 見た目 | スコープ | 性格 |
|--------|----------|------|
| Soft | `andm-series--soft` | 角は大きめ、余白はゆったり、影は薄い |
| Dense | `andm-series--dense` | 低く、詰めた余白、小さい字 |
| Technical | `andm-series--technical` | 角はほぼ直角、等幅、影なし |
| Editorial | `andm-series--editorial` | 角なし、セリフ、字間を少し開ける |
| Playful | `andm-series--playful` | 丸い、ティール、押下の縮小が少し大きい |
| M3 Expressive | `andm-series--expressive` | ラベル付きは横長の pill。押すと角が立つ。大きさでも強調する |
| DADS | `andm-series--dads` | 濃い青、控えめな角、太めの字。手続きで迷わず押せる |
| Apple | `andm-series--apple` | システムフォントのみ。色と寸法は未確認 |
| Spectrum | `andm-series--spectrum` | Spectrum 2。青のアクセント、height/2 の角、2px の境界 |
| Fluent 2 | `andm-series--fluent` | ボタンの角は 4px。大きいボタンは 8px |
| Carbon | `andm-series--carbon` | 角は 0。塗りは #0f62fe。高さは 32 / 40 / 48px |

Baseline は追加クラスなし。上の 11 は Gallery で切り替えるシリーズです。部品のクラスは共通のままです。

## シリーズの詳細（M3 Expressive / DADS）

巨大 Theme Engine ではない。**親スコープの Token remapping** で見た目を切り替える。いずれも唯一の正解にしない。公式ロゴ・公式ファイルの再配布はしない。

### Expressive

| 項目 | 内容 |
|------|------|
| スコープ | 親に `andm-series--expressive`（Token remapping） |
| 向いている用途 | 表現寄り・消費者向け（強調や印象を残したい画面） |
| Shape | ラベル付きの静止は横長の pill（Round = Full）。押下は Small 8 / Medium 12 / Large 16。ホバーでは角を変えない。任意 `andm-btn--shape-asymmetric` は square（12 / 16 / 28） |
| Size | Small 40 / Medium 56 / Large 96。横 padding は 16 / 24 / 48。アイコン 20px |
| Emphasis | 大きさ。字重は M3 label の Medium（500）。色ロールは Baseline のまま |
| Motion | 形は fast spatial（350ms、`cubic-bezier(0.42, 1.67, 0.21, 0.9)`）。色・背景・枠・影は fast effects（150ms、`cubic-bezier(0.31, 0.94, 0.34, 1)`）。short1–short4 には詰めない。ホバーでは角を変えない。押下で角が変わり、scale は 1。reduced motion は共通で、色と focus ring を残し、transform と形状変化を止める |
| 既存 variant | filled / tonal / outlined / text / elevated はそのまま |

### DADS（デジタル庁デザインシステムの方向）

| 項目 | 内容 |
|------|------|
| スコープ | 親に `andm-series--dads`（Token remapping） |
| 向いている用途 | 行政・公共サービスの分かりやすさ・信頼・アクセシビリティ |
| Color | 塗りは Blue 900（`#0017C1`）、ホバー Blue 1000、押下 Blue 1200。フォーカスは黒 + Yellow 300 |
| Shape | md / lg は 8px、sm は 6px。pill にも押下時の morph にもしない。最小幅 96 / 80 / 136 |
| Typography | ボタンは Oln-16B-100（16px / Bold 700 / 行間 100% / 字間 0.02em）。CDN は使わない |
| Button | 公式は塗り・アウトライン・テキスト。塗りはホバーで Blue 1000、押下で Blue 1200、下線。テキストのフォーカス背景は黄。sm のターゲットは 44px |
| 既存 variant | filled / tonal / outlined / text / elevated はそのまま |

**ライセンス・ブランド注意:** `andm-series--dads` は [デジタル庁デザインシステム](https://design.digital.go.jp/dads/) の公開されている色・形状・タイポの**解釈**です。公式パッケージ（例: `@digital-go-jp/design-tokens`）やロゴなどのブランド資産の再配布ではありません。本番の行政サイトでは公式アセットとガイドラインを確認してください。

### Apple

| 項目 | 内容 |
|------|------|
| スコープ | 親に `andm-series--apple`（Token remapping） |
| 向いている用途 | 今の Apple の画面に近い、案内や設定 |
| 出典 | [HIG（日本語）](https://developer.apple.com/jp/design/human-interface-guidelines)。英語は [入口](https://developer.apple.com/design/human-interface-guidelines) から color / layout / materials / buttons |
| HIG から採用した数値 | なし。色・寸法のページはタイトルのみで本文が取れない |
| Motion | duration は official value not specified。速度トークンは差し替えない。押下の縮小は Baseline の 0.96 のまま。HIG の測定値ではない |
| フォント | `-apple-system, BlinkMacSystemFont` は HIG の測定値ではない。ファイルは同梱しない |

### Spectrum

| 項目 | 内容 |
|------|------|
| スコープ | 親に `andm-series--spectrum`（Token remapping） |
| 向いている用途 | 業務の画面。Spectrum 2。Express は使わない |
| Color | light の blue-900 `rgb(59, 99, 251)`。hover/down は blue-1000 `rgb(39, 77, 234)` |
| Shape | ボタンの角は高さの半分。`corner-radius-100`（4px）は使わない |
| Density | desktop の S / M / L = 24 / 32 / 40px。字は 12 / 14 / 16px |
| Border | 幅 2px。アウトラインは blue-900、浮かせの境界は gray-400 |
| 影 | ドロップシャドウは無し（フォーカスリング 2px のみ） |
| フォント | トークン名は Adobe Clean。フォントファイルは同梱しない |

### Fluent 2

| 項目 | 内容 |
|------|------|
| スコープ | 親に `andm-series--fluent`（Token remapping） |
| 向いている用途 | 慣れた操作で、仕事に集中する画面 |
| 出典 | [shapes](https://fluent2.microsoft.design/shapes)、[typography](https://fluent2.microsoft.design/typography)。入口は [Fluent 2](https://fluent2.microsoft.design/) |
| Shape | Buttons は 4px。Large buttons は 8px。押しても角は変えない |
| Typography | Web の Caption 1 / Body 1 / Subtitle 2 は 12 / 14 / 16px。書体名は Segoe UI。ファイルは同梱しない |
| 未確認 | 色、余白、コントロール高さ、影、duration。motion と design-principles に px や ms は無かった |

### Carbon

| 項目 | 内容 |
|------|------|
| スコープ | 親に `andm-series--carbon`（Token remapping） |
| 向いている用途 | 製品の画面。角は立て、青で主操作を示す |
| 出典 | [carbon](https://github.com/carbon-design-system/carbon) の `packages/themes/src/v10/white.ts`、`g10.ts`、`packages/colors`、`packages/layout`、button の `$button-border-radius` |
| Color | 塗りは #0f62fe。hover は #0353e9。active は #002d9c |
| Shape | 角は 0。高さは 32 / 40 / 48px。ボタン SCSS の既定ステップは 48px |
| Typography | ボタンの字は 0.875rem、字重 400。書体名は IBM Plex Sans。ファイルは同梱しない |

## 責務カテゴリ（UI）

フォルダの主軸は責務である。Atomic Design は補助語に留める。

| カテゴリ | 場所 | いまの中身 |
|----------|------|------------|
| Foundation | `src/styles/tokens/**` | 色・字・余白・角・モーションなど |
| Control | `src/styles/controls/` | Button（`--andm-btn-*` と `.andm-btn`） |
| Mark | `src/styles/marks/` | 未実装（Icon など） |
| Display / Container / Navigation / Feedback / Overlay / Pattern | 各フォルダ | 未実装。Pattern の例は Gallery の HTML |

Series はカテゴリに入れない。親の `andm-series--*` が Token を上書きするだけである。トークンの `primitive.css` と、UI の Mark（単一の視覚）は別の語である。

## Research 境界

```
Research → Design Space → Principle / Direction / Series候補
  → Token / Spec → andm-ui Core
```

- `research/` は Build 外 / Runtime 非依存 / dist・npm・製品 Gallery 非含有
- Research で発見したすべてを Core へ実装しない
- AI は候補提示まで。採用（recommended）は人間が決める
- Gallery のシリーズ切替は、親スコープの Token mapping（`andm-series--*`）だけ。ページ全体の Theme Engine ではない。Button のクラスは増やさない

## 採用基準

| 用語 | 意味 |
|------|------|
| frequency | 観察結果（多い／少ない）。正解ラベルではない |
| recommended | 採用判断。未決なら null。AI が勝手に埋めない |

## Risk

自動化 → 平均化 → 画一化を避ける。Token は少数段階を保持し、唯一値強制と無制限増殖の両方を避ける。
