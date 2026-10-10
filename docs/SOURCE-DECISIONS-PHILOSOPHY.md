# Philosophy PoCの判断参照

個別判断は `research/design-knowledge/catalog.json` の `poc.minimal` / `poc.brutal` / `poc.original` / `poc.minimal-extended` が正本。表示用の説明は [PoC判断ページ](../gallery/lab/philosophy-poc/decisions.html)。この文書は同じレコードを複製しない。

| 項目 | 範囲 |
|---|---|
| Series | A/A′/C: Soft、B: Technical。いずれもandm独自Series。公式由来Seriesは無変更 |
| 実装 | `gallery/lab/philosophy-poc/*.html` / `poc.css` / `candidate.js` / `compare.js` |
| basis / sourceStatus | 構成・寸法・色・局所表現：andm-original / not-applicable。本文確認済みの資料原則のUI適用：research-based。建築史：unverified |
| 確認資料 | 2026-10-08 BilbaoのJudd作品解説、Brutalist Websites冒頭/コレクション、WCAG 2.2本文。SAHの建築史は403で未確認 |
| 原則と値 | 原則は別カードへ参照。CSSの具体値を資料の公式値と扱わない。局所に留めて共通Tokenへ追加しない |
| 代替案 | 単一DOMのテーマ比較、既存Tabsだけの関係表現を比較し、今回の構造要件では採用しない。原子のbuttonや文字は再利用 |
| recommended | 全新規カードとexportはnull。実装依頼はPoCを作る許可であり、研究効果の採用確定ではない |
| 採用 / 検証 | 人間による思想・Core採用は未決。[検証記録](PHILOSOPHY-POC-VALIDATION.md)を参照 |
| 再確認 | 出典更新、内容/入力契約の変更、観察で理解・操作の問題が見つかった時 |

比較状態の保持は同一originのフレーム間メッセージと一時メモリのみ。Researchのruntime import、永続化、生成エンジンは追加しない。iframeでCSSを隔離し、元Labの要素selectorを新PoCへ持ち込まない。
