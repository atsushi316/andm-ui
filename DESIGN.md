# andm-ui Design Principles

CSS-first の小さな UI ライブラリー。Native HTML + `andm-*` class が第一級 API。

## 思想

- **CSS-first / FW-agnostic** — Vue / React / WC は本体に含めない
- **Design Tokens** — 見た目の根拠は `--andm-*` Token system（単一ソース）。各プロパティを唯一値に固定する意味ではない
- **少ない部品で多様** — Component / Token は少数。方向軸の組み合わせで表現する
- **平均収束禁止** — 「最も多いパターン = 正解」にしない。frequency と recommended を分離する

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

Gallery で今使える例です。共通の Button に Token を当てます。Component は増やしません。速度の割当はしません。

| 見た目 | スコープ | 性格 |
|--------|----------|------|
| Soft | `andm-series--soft` | 角は大きめ、余白はゆったり、影は薄い |
| Dense | `andm-series--dense` | 低く、詰めた余白、小さい字 |
| Technical | `andm-series--technical` | 角はほぼ直角、等幅、影なし |
| Editorial | `andm-series--editorial` | 角なし、セリフ、字間を少し開ける |
| Playful | `andm-series--playful` | 丸い、ティール、押下の縮小が少し大きい |
| M3 Expressive | `andm-series--expressive` | 丸が基本。押すと角が立つ。大きさでも強調する |
| DADS | `andm-series--dads` | 濃い青、控えめな角、太めの字。手続きで迷わず押せる |

Baseline は追加クラスなし。上の 7 つは Gallery で切り替えるシリーズです。ボタンのクラスは共通のままです。

## シリーズの詳細（M3 Expressive / DADS）

巨大 Theme Engine ではない。**親スコープの Token remapping** で見た目を切り替える。いずれも唯一の正解にしない。公式ロゴ・公式ファイルの再配布はしない。

### Expressive

| 項目 | 内容 |
|------|------|
| スコープ | 親に `andm-series--expressive`（Token remapping） |
| 向いている用途 | 表現寄り・消費者向け（強調や印象を残したい画面） |
| Shape | 静止は丸（full）。押下で角を立てる（Small 8 / Medium 12 / Large 16）。任意 `andm-btn--shape-asymmetric` は square（12 / 16 / 28） |
| Size | Small 40 / Medium 56 / Large 96。横 padding は Small の推奨 16px。アイコン 20px |
| Emphasis | 大きさ。字重は M3 label の Medium（500）。色ロールは Baseline のまま |
| Motion | 形だけ spatial の overshoot 近似。色は decelerate。ホバー拡大・押下縮小はしない。`prefers-reduced-motion` では拡大と形状を抑え、色の状態変化は残す |
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
