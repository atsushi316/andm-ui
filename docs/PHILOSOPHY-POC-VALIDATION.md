# Philosophy PoC検証

実装revision：orbit-poc-v1。2026-10-08。main `fabf0c3…` から独立ブランチ。PR #8未統合、依存なし。元作業ツリーの未コミット変更は保持。

静的検証とブラウザ検証の結果を記録する。ユーザーの世界観評価・思想の効果・Core採用は未決。検証結果から `recommended` を自動変更しない。

## 静的検証

- `npm run build`：成功。
- `npm run audit:tokens`：199定義、required参照の未定義なし。
- `npm run audit:design-knowledge`：18レコード。schema使用範囲、ID、参照、Source-First enum、null、共通内容、A/A′同一main DOM、Research Runtime非依存を確認。
- Python jsonschema 4.26.0でDraft 2020-12メタスキーマとcatalogを検証：成功。検証ツールは作業環境だけに導入し、本体の依存を増やしていない。
- `git diff -- src/styles`：変更なし。58部品API、公式/独自Series、Core Tokenは不変。
- Researchはnpmのfiles対象外。PoCのJSは限定fixtureのみを取得する。

## ブラウザ

Chromium 153 + Playwrightで確認。日本語フォントをQA環境に用意してスクリーンショットを目視確認。

| 条件 | 結果 |
|---|---|
| A/B/C/A′、比較入口、判断ページ × 320/390/768/1280px × root文字100%/200% | 48条件。document横はみ出しなし |
| axe-core：WCAG2 A/AA、2.1 AA、2.2 AAのタグ（390px/100%、6ページ） | 検出違反0。自動検査範囲のみ |
| C：Enterで履歴選択、Spaceで線形表示、mapへ復帰 | 詳細とaria-pressed更新、選択保持 |
| C：keyboard focus | 3px solidのfocus表示を確認 |
| 比較：機能区間→候補変更 | 同じ区間へ移動。scroll marginを含む位置を確認 |
| 比較：C→A→C | 選択と線形表示を復元 |
| 広幅2案/1案、390pxへの変更 | 右pane表示/非表示、狭幅1案へ切替 |
| フレーム内の戻るリンク | 比較画面をフレーム内に入れ子にせず、親画面へ戻ることを確認 |
| JSON export | 日本語メモと条件、decision IDs、recommended:nullを確認 |
| 日本語長文 | B見出しを長文に置換して狭幅で横はみ出しなし |
| Reduced Motion | reduce環境で検証。新PoCのanimation/transitionなし |
| 既存Gallery | 58部品の項目、14Series、検索結果、Carbonへの切替を確認 |
| 既存Lab | brief入力・仮説表示、作品選択、dialog表示/Escapeを確認 |
| JS例外 | 0件 |

初回検査でCのandm-textに暗いforegroundが残る問題を検出し、局所foregroundを修正。部品利用の記録もExtendへ修正した。初期QAの日本語フォント不足は検証環境側で解消し、日本語表示のスクリーンショットを再確認した。

既存58部品の全状態を再度網羅したという意味ではない。Core/Series/Gallery本体のコード変更なしと、上記代表操作で回帰影響を確認。文字200%はroot font-sizeによる検証であり、ブラウザズームの全挙動や実機を保証しない。

## 再実行

静的：`npm run build`、`npm run audit:tokens`、`npm run audit:design-knowledge`。
ブラウザ：開発用環境でPlaywrightとaxe-coreを用意し、`AXE_SCRIPT`へaxe.min.jsの絶対パスを指定して `node scripts/check-philosophy-browser.mjs`。必要に応じて `PLAYWRIGHT_MODULE`、`CHROMIUM_EXECUTABLE_PATH`、`QA_OUTPUT` を指定できる。本体のFramework/Runtime依存にはしない。スクリプト自身がローカル配信を起動して結果JSONと390/1280pxの画像を出力する。

## 変更ファイルと影響

| 範囲 | ファイル |
|---|---|
| 仕様・記録 | docs/DESIGN-PHILOSOPHIES.md、PHILOSOPHY-POC-VALIDATION.md、SOURCE-DECISIONS-PHILOSOPHY.mdを新設。SOURCE-DECISIONS.md / EXPERIENCE.mdへ参照を追記 |
| 研究知識 | research/design-knowledge/schema.json / catalog.json新設。research/library/README.mdへ索引追加 |
| 実験画面 | gallery/lab/philosophy-poc/にindex.html、minimal.html、brutal.html、original.html、minimal-extended.html、decisions.html、poc.css、compare.css、candidate.js、compare.js、brief.json、candidates.json |
| 導線 | gallery/lab/index.htmlに独立実験リンク。README.mdに説明 |
| 開発検証 | scripts/audit-design-knowledge.mjs / check-philosophy-browser.mjs新設、package.jsonにaudit script追加。依存package追加なし |

Aは既存Typography/Link/SoftをReuse。Bは独自TechnicalのTypography/Linkを局所Extend。Cは文字/Link/Chipの局所ExtendとNative buttonで構成するLab限定関係インスペクタ。A′はAと同一main DOMでCTAのみExtend。公式Seriesと全src/styles、Core API、共通Tokenは不変。

次の候補：世界観とタスク達成の形成的ユーザー観察、関係インスペクタの説明と探索性の改善、必要な場合だけMaximalism/Swissの本文確認カードを追加。XRは別研究。

実機Safari/Firefox、スクリーンリーダー、ユーザー調査、XRは未検証。WCAG 2.2 AAの未確認項目まで全面適合とは宣言しない。
