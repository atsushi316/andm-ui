# 出典と補完の判断記録

方針・分類・追加用テンプレートは [SOURCE-FIRST.md](SOURCE-FIRST.md)。2026-10-08 に既存の代表的な判断を分類した。既存文書とコードの照合であり、ここでリンクされた公式本文を今回すべて再取得したという意味ではない。全 Series・全部品・全 Token の移行は未完了。

## apple-body-size-baseline

| 項目 | 記録 |
| --- | --- |
| Series / 対象 | Apple / 本文サイズ `--andm-type-body-size` |
| 実装 | `src/styles/series/apple.css` は書体のみ差替え。サイズは `src/styles/tokens/typography/roles.css` の共通値 `1rem` を継承 |
| 対象範囲 | Web の CSS rem。Apple プラットフォーム・公式版の値は未確認 |
| `sourceStatus` | `unverified` |
| 確認範囲 | [ATOMIC-SOURCES](ATOMIC-SOURCES.md)の Apple 行に、Typography 本文が JS 必須で未取得と記録 |
| `basis` | `andm-original` |
| 根拠 | [HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography)は取得未確認。今回は既存記録のみ。本文確認日 `null`。[Apple 分析](../research/analysis/apple-hig.md)と上記実装を照合 |
| 判断 | 既存 Baseline サイズを暫定維持。Apple の公式値・研究による欠落補完とは表示しない |
| 代案 | 未取得の pt 値を推測して CSS px へ変換する案は不採用 |
| `recommended` / 採用 | `true` / 既存採用の維持。今回 CSS 値は変更していない |
| 検証 | 記録と継承先の照合。今回の表示再検証・公式一致の検証は未実施 |
| 見直し | HIG Typography の本文取得成功時、対象プラットフォーム・版・文字ロールを確認して再評価 |

## search-field-group-spacing

| 項目 | 記録 |
| --- | --- |
| Series / 対象 | 全 Series / Search のラベル・入力の間隔 |
| 実装 | `src/styles/patterns/compositions.css` の `.andm-field` / `gap: var(--andm-space-2)` |
| 対象範囲 | Native HTML の Web 検索フォーム、CSS px、既存 Series の尺度を継承。共通の `--andm-space-2` は `src/styles/tokens/spacing/primitive.css` で `8px` |
| `sourceStatus` | 外部由来 Series は `unverified`（この間隔の公式値）。独自 Series は `not-applicable` |
| 確認範囲 | [COMPOSITION-SOURCES](COMPOSITION-SOURCES.md)に構造の根拠と独自の余白を区別して記録。寸法の確認・公式全体での欠落確認はない |
| `basis` | `andm-original` |
| 根拠 | 同文書と実装。andm の既存採用を今回照合。各公式の寸法本文は今回未確認。本文確認日 `null` |
| 判断 | 既存尺度を維持。構造の参考資料があっても、この間隔を全 Series の公式値とはしない |
| 代案 | 他社の間隔を全 Series へ一律コピーする案は不採用 |
| `recommended` / 採用 | `true` / 既存採用の維持。今回 CSS 値は変更していない |
| 検証 | 値・セレクタと旧記録の照合。過去の表示検証は同文書を参照。今回の表示再検証は未実施 |
| 見直し | 各 Series の検索・フォーム間隔の仕様と基礎尺度を確認したとき、Series 別に値と対応付けを再評価 |

新しい補完時には、上記の間隔の数値根拠と、近接などの原則を適用する判断を別々に記録する。今ある余白を後付けで「研究に基づく値」と呼び直さない。
