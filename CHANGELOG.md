# Unreleased

- 出典優先基準で全58パーツ・14シリーズを再監査し、CSS宣言台帳を追加。Seriesの角丸・フォーカス・タブ線・文字ロールを修正。
- Fluent / Atlassian / USWDS / Carbon の確認済みプロパティを用途別に反映。DADSの部分処理を静止砂時計に変更。

- Gallery を部品検索・分類・実物プレビュー・携帯メニュー・シリーズ選択・HTML コピーを備える Workspace へ改善。
- シリーズ分析を読書ビューへつなぎ、今回の出典と採用範囲を記録。
- Chip / FAB を独自仕様として明示し、FAB と Button の形状を分離。未使用 layer トークンを削除。
- Gallery のタブに矢印キー・Home/End操作を追加。

- 目的・世界観・利用者から体験を検討する開発方針と AR / VR 研究枠を追加。
- 明快・没入・大胆を比較し、構成仮説と検証メモを出力する体験ラボを追加。
- Chip / FAB と Gallery の状態例、layout / target / layer トークンを追加。
- 未定義トークンの静的点検を追加。

# Changelog

## Unreleased

### Changed

- Button の CSS を `src/styles/controls/` へ移設（`button-tokens.css` / `button.css`）。`andm-btn` API は維持
- Gallery ナビを責務カテゴリ（Foundation / Controls / Marks / Display / Containers / Navigation / Feedback / Overlays / Patterns / Series）に合わせる
- Token を4層・系統フォルダに分割し、シリーズ CSS を `src/styles/series/` へ分離

## 0.1.0

### Breaking / 新規構築

- Vue / Storybook ベースの実装を廃止し、CSS-first 本体へゼロから再構築
- 公開 API は Native HTML + `andm-*` class（`import '@atsushi316/andm-ui/style.css'`）

### Added

- Design Tokens（`--andm-*`）と Cascade Layers（`andm.tokens` / `base` / `components` / `utilities`）
- Button: elevated / filled / tonal / outlined / text × sm / md / lg、標準 state、`andm-btn__icon`
- 製品 Gallery（`gallery/`、`dist/style.css` 参照）— Component / Pattern / Experience。Button は単体と申請フォーム内
- Gallery のシリーズ切替。Soft / Dense / Technical / Editorial / Playful / M3 Expressive / DADS / Apple / Spectrum を、親の `andm-series--*` で主要プレビューに当てる。Button のクラスは共通のまま
- `andm-series--apple`（HIG は本文が取れず数値は未採用。システムフォントのみ）
- `andm-series--spectrum`（Spectrum 2 の公開トークン。blue-900、高さ 24/32/40、角は高さの半分、境界 2px。公式 CSS は同梱しない）
- `andm-series--fluent`（Fluent 2 の shapes / typography。ボタンの角 4px、大きいボタン 8px、字 12/14/16px。公式 CSS は同梱しない）
- `andm-series--carbon`（Carbon の white テーマ。塗り #0f62fe、角 0、高さ 32/40/48px。公式 CSS は同梱しない）
- `andm-series--expressive`（pill / shape morph / expressive easing / asymmetric modifier）
- `andm-series--dads`（デジタル庁デザインシステムの色・角丸・タイポ・ボタン性格の Token remapping。公式アセットの再配布ではない）
- `examples/consumer/` 最小利用例
- `research/` 空構造と `DESIGN.md`（Research / Design Space 方針）
