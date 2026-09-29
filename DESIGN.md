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

## Direction デモ（Series 本機能ではない）

巨大 Theme Engine / Series 切替 UI ではない。**デモ用親スコープ（Token remapping）** で方向を試せる。Baseline を壊さず、いずれの方向も唯一の正解にしない。テーマ追加は同じ親スコープパターンで拡張する。

### Expressive

| 項目 | 内容 |
|------|------|
| スコープ | 親に `andm-series--expressive`（Token remapping） |
| いつ使うか | 強調・遊び・マーケティング寄りのプロトタイプ |
| Shape | より丸い（pill）・押下で `border-radius` morph・任意 `andm-btn--shape-asymmetric` |
| Emphasis | やや高めの字重・高さ・tonal のコントラスト |
| Motion | 既存 `short*`。空間は `--andm-motion-easing-expressive`（overshoot 近似）。`prefers-reduced-motion` は base で無効化 |
| 既存 variant | filled / tonal / outlined / text / elevated はそのまま |

### デジタル庁寄り（模倣テーマ）

| 項目 | 内容 |
|------|------|
| スコープ | 親に `andm-series--digital-gov`（Token remapping） |
| いつ使うか | 行政・公共系プロトタイプ、高コントラスト・可読性優先 |
| Color | Primary Blue 900（`#0017C1`）、tonal は Blue 50 寄り、表面は白／Solid Gray |
| Shape | 角丸スモール（8px）。pill / morph はしない |
| Typography | `Noto Sans JP` 優先、字重 700 |
| Focus | 黄フォーカス環（DADS の黄リング方向に寄せた近似） |
| 既存 variant | filled / tonal / outlined / text / elevated はそのまま |

**ライセンス・ブランド注意:** `andm-series--digital-gov` は [デジタル庁デザインシステム](https://design.digital.go.jp/dads/) の公開ドキュメントに寄せた**模倣テーマ**です。公式パッケージ（例: `@digital-go-jp/design-tokens`）やブランド資産の再配布ではありません。本番の行政サイトでは公式アセットとガイドラインを確認してください。

## Research 境界

```
Research → Design Space → Principle / Direction / Series候補
  → Token / Spec → andm-ui Core
```

- `research/` は Build 外 / Runtime 非依存 / dist・npm・製品 Gallery 非含有
- Research で発見したすべてを Core へ実装しない
- AI は候補提示まで。採用（recommended）は人間が決める
- Design Direction / Design Series は将来概念。Theme / Series 切替は今は実装しない

## 採用基準

| 用語 | 意味 |
|------|------|
| frequency | 観察結果（多い／少ない）。正解ラベルではない |
| recommended | 採用判断。未決なら null。AI が勝手に埋めない |

## Risk

自動化 → 平均化 → 画一化を避ける。Token は少数段階を保持し、唯一値強制と無制限増殖の両方を避ける。
