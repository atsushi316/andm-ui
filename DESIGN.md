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
