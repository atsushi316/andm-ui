# Wave仕様からの独立AI再利用テスト

2026-10-08。`recommended: null`。対象はLabの小画面「同期リクエスト」。

## 読書境界と制作方法

読んだ既存ファイルは `docs/WAVEFORM-EXPRESSION.md`、`src/styles/controls/README.md`、`src/styles/controls/button.css`、`DESIGN.md`、`AGENTS.md` の5点のみ。既存Wave PoCのHTML/CSS/JS、旧PoC、参照controller、Waveユーティリティは閲覧・コピー・importしていない。仕様の最小例を参照しつつ、独自の包絡付き正弦線、状態管理、タイマー休止を新規に構築した。

AGENTS.mdが指定する追加読書・共有出典ログ変更・build/audit・実表示確認は今回の明示的な限定読書／4ファイル新設の指示と競合するため、このテストでは追加読書・共有ログ変更を行わない。ビルドとブラウザQAは親作業へ委ねる。これは一般の変更作業に対する例外の宣言ではない。

## 契約と責務

| 対象 | 採用判断と実装 | 根拠の区分 |
| --- | --- | --- |
| 操作 | `button type=button` +既存 `andm-btn`、filled/outlined/text。Native clickだけが受付する。キーからclickを合成しない | Reuse。既存Coreの契約 |
| 受付 | clickハンドラーで連番と受付文を即時にrole=statusへ書く | Wave仕様に従うandm-original |
| 模擬同期 | 2400msの独立setTimeout。受付中の再入力は前の処理を取消して置換。明示中止・模擬エラーを別の文字状態で通知 | Create、andm-original。実サーバー処理ではない |
| 処理表示 | 不定進捗のNative progressと文字。成功は1、エラー／中止は0。割合の偽造なし | 仕様のNative progress契約からの独自適用 |
| 波 | 生成した装飾と明示したaria-hiddenのSVG。独自の正弦包絡、720ms、最大約30fps。波の終了は処理結果に関与しない | Extend、andm-original。物理・知覚上の最適値ではない |
| 停止 | 波の手動停止、Escape、pointercancel、領域外pointerup、blur。進行中のgesture取消は受付させない | Wave操作契約。独自ローカル実装 |
| Reduced Motion | 起動時と設定変更時の両方で演出を停止。処理と文字通知は維持 | Waveアクセシビリティ契約 |
| 可視性 | document.hidden／IntersectionObserverで波と模擬タイマーの残り時間を休止し再開。pagehideは中止 | Wave休止契約＋ページ離脱時の独自判断 |
| Series | Baseline/Soft/Technical/M3 Expressiveを操作領域の親クラスで切替。既存DOM・値を維持 | DESIGN.mdに記載されたスコープのみ使用 |
| レイアウト | 小画面・大きい文字でボタンの文字を折り返せる局所CSS。Core・公式Series・共有Token追加なし | andm-original。数値は局所造形値 |

新しい公開API、Wave専用andmクラス、研究値から生成したTokenは追加していない。内部関数はこのページの閉じた実装。Wave仕様に登場する `enhanceButton` / `decorativePath` を公開APIとは扱わない。

## 解釈上の疑問と選択

- 「入力をロックしない」と「処理中の再入力」から、この別画面では並行ジョブではなく最新リクエストへの置換を選んだ。仕様はこの業務意味を一意に決めていないため画面に明示した。
- Escape/blurは波だけを止める。確定済みの模擬処理を取り消す操作は「処理を中止」に分けた。未確定の押下中にEscape等を受けた場合はそのgestureの確認を抑制する。
- 波の初期チェックはオンだが、Native activationで受付したときのみ装飾を開始する。画面表示・演出をオンにするだけでは再生しない。手動設定とOSのReduced Motionは受付意味を変えない。
- ButtonのPress/Releaseは既存CoreのNative状態を利用し、SVGはConfirm後だけ反応する。Press専用の波形は増やしていない。
- 模擬処理の20件×200msは原PoCの設定と解釈し、この別画面では独立した固定遅延と不定進捗を採用した。進捗データを作り出さない。
- pagehideはバックグラウンド休止と区別して処理を破棄する。BFCacheからの再表示でも中止状態を表示し、自動再開しない。
- Core再利用を保ちながら長い日本語と文字拡大へ対応するため、LabスコープでButtonのheight:auto/min-heightとwhite-space:normalを上書きした。公式Seriesに同じ折返し規則があるとは主張しない。

## 検証と未検証

担当範囲で `node --check gallery/lab/waveform-expression/reuse-test/app.js` を実行し成功した。ブラウザQAは親作業に委ねるため、Native Enter/Space/支援技術によるclick、Escape＋Space解除、pointer領域外解除、focus ring、狭幅／文字拡大、Series切替中の値維持、RM変更、IntersectionObserverとvisibilitychangeの休止・再開、pagehide復帰はこの文書作成時点では未検証。スクリーンリーダーが短い連続status通知をどうまとめるかも未検証。最大約30fpsは描画の間引き規則であり、requestAnimationFrameコールバック数の上限ではない。

出典は上記5点のローカル仕様のみ。公式本文の新規取得や公式値の追加をしていないため、新規装飾・遅延・局所余白をofficial/derivedとは記録しない。弱い端末、実通信、実音声、大量サンプル、比較条件間の優劣や因果効果は未検証で、採用を提案しない。

## 親側の後続検証

独立生成後、Chromium153の表示8条件（4幅×文字100/200%）とaxe、即時受付/有限波/別完了、再入力/中止/エラー、Space、Escape取消後の支援技術型activation、OS/手動Reduced Motion、Series選択を確認した。戻るリンク、公式波ではない表示、CSSの一箇所のscopeを親側が追記。[検証記録](../../docs/WAVEFORM-VALIDATION.md)。初期生成時点の未検証を履歴として残す。IntersectionObserver休止の実機挙動・screen reader・性能・ユーザーの理解は引き続き未検証。
