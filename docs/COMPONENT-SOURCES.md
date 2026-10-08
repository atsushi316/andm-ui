# Chip / FAB：仕様と根拠

確認日：2026-10-07。今回の追加を見直した記録。公式サイトの本文、既存分析、andm の採用判断を分ける。公式アセットは含めない。

## 読んだプロジェクト規則

.cursorrules の Prime → Implement → Validate、DESIGN.md の CSS-first / Series は Token remapping / 平均への収束禁止 / Research 境界、各責務カテゴリの README、および research/library の確認ルール。research/analysis の M3 Expressive、DADS、Apple、Spectrum、Carbon、Atlassian、USWDS の全ファイルを読んだ。独自 Series の CSS も照合した。

## 今回確認した一次資料

- [Google：Chip](https://developer.android.com/develop/ui/compose/components/chip) — 用途を Assist / Filter / Input / Suggestion に分ける。Filter は選択と解除、選択時の印を例示する。今回の Web 実装は選択用の最小仕様だけ。
- [Google：FAB](https://developer.android.com/develop/ui/compose/components/fab) — 主操作を強調する部品。通常・小・大・ラベル付きの種類を説明する。本文の用途は参照するが、Android の値を CSS px の公式値に変換しない。
- [W3C APG：Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/) — Native button、操作名、Enter / Space、aria-pressed、toggle の名前を変えないこと。
- [Carbon：Tag](https://carbondesignsystem.com/components/tag/usage/) — read-only / dismissible / selectable / operational を区別。選択操作には境界による見分けを使い、選択状態の差を示す。寸法の再現は今回行わない。
- [Atlassian：Tag](https://atlassian.design/components/tag/usage) — 分類用のラベル、リンク・削除などの用途。静的ラベルと選択型チップを同じ API と断定しない。
- [USWDS：Tag](https://designsystem.digital.gov/components/tag/) — 操作しないラベルに hover / focus / active を付けず、操作するものと静的ラベルを混同させない。Gallery では例を別のグループにする。
- [Fluent 2：Shapes](https://fluent2.microsoft.design/shapes) — タグ・キーワード・選択に pill を使う概念。Chip / FAB 固有の寸法表ではない。
- [WCAG 2.2：Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) — AA は 24 × 24 CSS px と例外を扱う。44px は一律の AA 要求ではない。andm の 44px はタッチ操作の独自既定。

取得できなかった本文：M3 の chips / FAB guidelines は JavaScript 必須表示のみ。Spectrum 2 の tag ページは取得失敗。取得失敗を「公式仕様なし」とは扱わず、今回未確認とする。

## 実装の契約

| 部品 | 意味・状態 | 寸法・表現の扱い |
| --- | --- | --- |
| Chip | button、独立した絞り込みは aria-pressed、選択の印、無効状態、focus | 44px の操作領域、余白、角は andm 独自仕様。色・書体は親 Series のトークンを継承 |
| 静的ラベル | 既存 Badge の span、操作不可 | Control の Chip と別の責務・例にする |
| FAB | 名前付き button、主操作、無効状態、focus | 小44 / 通常56 / 大80px は andm 独自仕様。部品ローカルで変更可。通常 Button の morph を使わない |

44 / 56 / 80px は、確認した全シリーズの公式サイズではない。FAB は `andm-fab` 単独で使う。色の変化に既存の hover / press トークンを使う対応付けも andm の解釈であり、公式 FAB motion の再現ではない。変形・移動は実装しない。

## シリーズごとの範囲

| Series | 今回読んだ根拠 | Chip / FAB の固有仕様 |
| --- | --- | --- |
| Baseline / Soft / Dense / Technical / Editorial / Playful | DESIGN.md と各 CSS。andm 独自 | 独自仕様。公式に由来するとは表示しない |
| M3 Expressive | 既存分析全文、Google Chip / FAB 本文 | 用途は確認。今回の寸法・形・動きは独自。Button の形状仕様を FAB に流用しない |
| DADS | 既存分析全文、アクセシビリティガイダンス | Chip / FAB 固有の公式寸法は今回未確認 |
| Apple | 既存分析全文 | 色・寸法の公式再現は未確認。今回新たに公式値を追加しない |
| Spectrum 2 | 既存分析全文。tag の追加取得は失敗 | Button の高さ・角を Chip / FAB に流用しない。固有寸法は未確認 |
| Fluent 2 | 既存 CSS と shapes 本文 | pill の概念のみ。固有寸法は未確認 |
| Carbon | 既存分析全文と Tag ガイド本文 | 選択と静的なラベルの区別を参照。固有寸法は未確認 |
| Atlassian | 既存分析全文と Tag usage 本文 | Tag の用途を参照。Chip / FAB 固有寸法は未確認 |
| USWDS | 既存分析全文と Tag 本文 | 静的ラベルの扱いを参照。Chip / FAB 固有寸法は未確認 |

既存分析を読むことと、そこにある全 URL を今回再取得することは別。既存シリーズの公式色や既存部品をすべて再検証した、と主張しない。今回変更した部品の意味・状態・独自値の扱いに確認範囲を限る。

## トークンの修正

未使用の layer-floating / layer-overlay は削除した。layout-content-max はラボの幅、target-min は新規部品の操作領域に利用する。意味を作るためだけの未使用トークンを増やさない。親 Series の色を root で別名解決せず、部品の var で直接参照する。
