# 操作能力・統合画面の実装検証

2026-10-10。既存監査と3つの研究PoCを独立worktreeへ集約。元の13件のstaged変更、他worktreeの作業と未完了mergeは変更・破棄していない。関連PR #8〜#11は未統合のまま保持し、統合候補の別PRを作成する。mainへのマージなし。

## 変更と利用方法

既存58見本を維持し、38見本を追加（計96）。Combobox、複数選択、削除タグ、日付/期間、分割日付、範囲slider、prefix/suffix、文字数、郵便番号の正規化、エラー集約、Table/Tree、アップロード、Stepper、説明/引用/注釈、Banner、Footer、ページ内移動、Mega menu、言語選択、Carousel、Avatar group、Info、Rating、Inline edit、Comment、Tour、Layout、Meter、Color選択、Tabs/Overlay/Menu/非同期通知の契約。

新設: `src/behavior/*.js`、責務別 `src/styles/*/advanced.css`、`gallery/completion/`、BEHAVIOR/出典/検証文書、ブラウザ検証スクリプトとResearch内記録。
変更: Galleryの入口と見本、build（任意ESMのコピー）、package（`./behavior` exportと文書配布）、能力対応表、source inventory、Tooltipのpointer許可、README/CHANGELOG。公式Seriesファイル・共通Token定義は今回変更していない。統合元#8の監査Token変更は継承。

[統合画面](../gallery/completion/) で設定・検索一覧・詳細編集を切り替える。入力/選択は画面/Series切替で保持。通信/保存/転送は模擬処理で、実サービス連携ではない。旧来のCSSだけで構築できる部品にJSを強制しない。任意のcontrollerのDOM契約は [BEHAVIOR](BEHAVIOR.md) に記載。

## 確認したこと

| 条件 | 結果・範囲 |
| --- | --- |
| build / audit:tokens | 成功。214定義、必須未定義参照なし |
| audit:sources | 成功。96見本、2756プロパティ、監査hookの消費を確認 |
| audit:coverage | 成功。81能力の記録とGallery、Markdown、集計が一致。基本実装73/簡易3/対象外5 |
| audit:design-knowledge | 成功。23レコード、ID/参照/null/Runtime境界 |
| npm pack --dry-run | 任意controllerを配布、Research/Galleryは非配布 |
| Chromium153 / 統合画面 | 4画面×320/390/768/1280px×root文字100/200%=32条件。ページ横はみ出しなし |
| 14 Series | 4画面×14種類×320px/200%・1280px/100%=112条件でページ横はみ出しなし。Galleryの新部品6件のナビ・既存Button/Carbon・4入口、例外0 |
| axe / 統合画面 | 4画面で該当WCAG2A/AA、2.1AA、2.2AAタグの検出違反0 |
| 操作 | Combobox検索/IME契約/キー確定、複数選択/削除、Calendar日/月移動と選択・focus復帰、Tabs/Menu、dialog/drawer/popover/tooltip、Tree/Treegrid、Form error/success/failure/reset、Table sort/selection/page/search/columns/loading/error/retry、Uploadの型検証と模擬完了、Inline edit、安全なComment本文、Carousel/RM、Tour、Series変更の保持 |
| 目視 | 検索390px・詳細1280pxの画像を確認。閉鎖popoverの表示漏れ、progress幅、Native field class、行選択のfocusを修正し再実行 |
| Philosophy回帰 | 48表示条件、6画面のaxe違反0、比較/単独/Original操作・focus、Gallery96見本/検索/Carbon切替、例外0 |
| Materiality回帰 | 6画面×4幅×文字100/200%=48条件＋素材6組×4幅×文字100/200%=48条件。探索/予備評価/入力取消/軌道/RM/素材切替/独立AI画面、例外0 |
| Waveform回帰 | 32表示条件、4画面axe違反0、連続入力/取消/状態/固定データ/数値表/RM/独立AI画面、例外0 |

JSONと画像: [記録ディレクトリ](../research/analysis/component-completion-validation/)。この記録をRuntimeへ読み込まない。

## 残課題・適用限界

リソース一覧、数値Stepper/時刻Picker、包括的ナビゲーションは簡易版。各公式部品の全variant/API/pixel再現を「完了」にしない。公式一覧を取得した5体系の能力棚卸しであり、他の全体系まで網羅した表ではない。Apple/Materialの動的本文を取得できない範囲は未確認を維持する。

Safari/Firefox実行ファイルなし、実機、screen reader、ブラウザ全体zoom、RTL、全Series状態別コントラスト、人による素材知覚/心理効果、実データ・バックエンドは未検証。文字200%はroot font-size拡大。axe結果は全WCAG適合の保証ではない。Calendar等に局所スクロールが必要な狭幅条件もある。

次は簡易版3能力の利用契約、公式部品固有仕様、実機/支援技術を優先する。研究の表面/波形の見た目はLab限定で、Coreへの自動昇格や新Series化はしない。
