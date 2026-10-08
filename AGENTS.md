# andm-ui 実装指示

## 作業前

- `DESIGN.md`、`docs/SOURCE-FIRST.md`、対象の責務 README と出典文書、`research/analysis/` の該当 Series を読む。
- 各 Series の元となる公式デザインシステムを優先する。明示された仕様を一般原則や他社の値で置換しない。同じ Series の基礎尺度・関連部品から導出し、それでも未定義の部分だけを確認済みの文献・標準で補完する。
- 本文未取得・未読を「公式に定義なし」と扱わない。対象の版、プラットフォーム、単位、状態、密度を確認する。既存分析の再読と公式本文の再取得を分ける。

## 根拠と補完

- 部品全体ではなくプロパティ単位で `official` / `derived` / `research-based` / `andm-original` / `unverified` を記録する。公式資料の確認状態 `sourceStatus` とは別に扱う。
- 新規・変更分は `docs/SOURCE-DECISIONS.md` に `docs/SOURCE-FIRST.md` の形式で記録する。URL・節・版・確認日・採用理由・実装箇所・検証・再確認条件を残す。共有の根拠は記録 ID で参照できる。
- 未確認時の既存値・暫定値は維持理由を明記する。Baseline 継承は対象 Series の公式値にならない。原則の根拠と数値の選択を分け、実験値から px・角丸・duration を生成しない。
- 意味のある情報の関係と操作を Series 間で保つ。余白・階層・群化の表現と具体値は各 Series に合わせ、共通 px 値や比率を強制しない。
- 明示された実装依頼の範囲で進める。範囲外の研究提案は `recommended: null` とし、自動採用しない。

## 実装と検証

- CSS-first / Native HTML + `andm-*` class / Framework-agnostic。Series は親スコープの `--andm-*` Token remapping。平均 UI へ収束させず、不要な Token を追加しない。
- Research は Build 外・Runtime 非依存・npm 非含有。文献は人間向けに表示できるが、研究から Token への自動変換は行わない。
- Native HTML の意味と ARIA / キー操作を一致させ、適用するアクセシビリティ要求を確認する。公式との差分や非推奨も記録する。
- `npm run build` と `npm run audit:tokens` を実行する。表示変更時は `dist/style.css` を参照する Gallery で、変更対象の見本を実表示して確認する。
- 日本語、狭幅、文字拡大、focus・error 等の変更状態、キー操作、Series 切替を確認する。横はみ出しだけで使いやすさを判定せず、入力・ラベル・操作の位置関係を目視する。確認済みと未検証を区別する。
- Gallery は部品を見ながら Series を変更でき、入力・選択・スクロールを保つ。見本を先に置き、Gallery 自体の Chrome は Series を継承しない。
