# Waveform Expression — 実装と検証

2026-10-08。mainへのマージなし。PR #10をbaseとする別branch `feature/waveform-expression-poc`。#10→#9に依存（Native入力controllerをLab内参照）。#8の公式Series監査CSSへコード依存なし。元の13件のstaged変更と各PoCを保護。

## 実装

- Aなし / B静的装飾 / C入力伝播・減衰 / D状態・データ。Button、模擬処理、模擬音声の3操作、比較/単独表示。
- SVG＋局所CSS＋最小の状態管理JS。操作と結果は波の終了から独立。有限演出・再入力・取消、手動/OS Reduced Motion、非表示休止。
- B/Cの実験パラメータとDのデータ変換を別関数に分離。DのButtonはローカル受付間隔、Statusは模擬残作業量、Audioは明示した固定fixture。測定と演出を混ぜない。
- ガイド/コード例/研究比較/出典判断と、既存Schemaに5知識カード追加。`recommended: null`維持、別判定体系なし。
- CoreのCSS/API/共通Token/公式Series/Framework/package定義は無変更。Researchはbuild/runtime/npm外。

## 検証結果

| 検証 | 結果と限界 |
| --- | --- |
| build / audit:tokens | 成功。199定義、必須未定義なし |
| audit:design-knowledge | 23件。ID・参照・出典・null判断・runtime境界成功 |
| JSON Schema | Draft 2020-12メタスキーマとcatalogをjsonschemaで検証成功 |
| npm pack --dry-run | Research/Gallery非含有、15配布ファイル |
| Chromium 153 | 3サンプル＋独立AI画面 × 320/390/768/1280px × root文字100/200%＝32条件。横はみ出しなし |
| axe | 4画面でwcag2a/aa、wcag21aa、wcag22aaタグの検出違反0。全WCAG適合の保証ではない |
| Native Button | Press中の波、即時受付、8連続クリック、Enter/Space、focus、Escape、領域外解除、pointercancel、取消後の支援技術型click、disabled、OS/手動Reduced Motion確認 |
| Data | −1/0/1の座標と無効値/範囲拒否、固定24値の完全一致、1点の表示、表、装飾パラメータ変更時の不変を確認 |
| Status | 開始/休止/再開/中止/エラー/明示完了/連続開始/自然完了。取消後の遅延完了なし |
| Audio | fixture表/カーソル/値、休止/再開/サンプル切替の保持、自然終了/中止。マイクAPI不使用 |
| 日本語・長文 | 長い日本語Button、320px/root文字200%を追加確認。通常/狭幅のスクリーンショットを目視 |
| 観察JSON | 条件/出所/fixture/メモ/状態を出力。recommended/adoption null |
| 回帰 | Gallery58部品・検索・Carbon切替・状態保持、既存Labのdialog/Escape、Philosophy切替/比較/選択/区間保持/exportの操作回帰成功。旧CSSは変更なし |
| Safari / Firefox | WebKit/Firefoxの実行ファイルがなく起動できず未検証。Safari実機の代替とは扱わない |

文字200%はroot font-size拡大。ブラウザ全体zoom、screen reader、実機タッチ、OS端末差、弱い端末/消費電力、ユーザー実験、実録音/通信/保存は未検証。模擬pointerイベントは実機タッチ試験ではない。動きの快適さ・理解・知覚時間の改善は主張しない。

初回QAで閉じたdetails内rangeを操作しようとしたテスト手順を修正。目視でBの線へ減衰が混入し弱く見える問題を修正して再検証。単一測定値がpathのmoveだけで見えない問題には点を追加。いずれも研究効果の証明ではない。

## 独立AI再利用テスト

仕様・既存API・方針の5文書だけを渡し、PoC実装を見せずに「同期リクエスト」を別タスクで生成した。PoCの関数/controllerをimportせず、独自SVGとNative andm-btnで実装。

ブラウザで即時受付→720ms有限装飾→別2400ms模擬完了、再受付の置換、中止、模擬エラー、Space、Escape取消後の新activation、OS/手動RM、既存Series選択を確認。モーションと結果の分離・Native再利用は実現できた。親側で戻るリンク、公式波形ではない表示、CSSセレクタscopeを補足した。初回の意味分離は通過したが、全てのAI生成/設計能力の証明ではない。

[独立テストの解釈・不足](../research/analysis/waveform-ai-reuse.md)。ガイドには用途・出所・軸/単位・取消・休止・通知を明示する必要がある。多数のデータ点、実信号、欠測、弱い端末の指示は今後追加する。

## Core接続・次の候補

既存Button APIで足りる。波形はMotion Pattern/Materialityの局所例として保持。共有Token・新Series・新Materialityレイヤーは不要。Core候補は、別画面でも確認できた「結果から独立した有限演出と停止の契約」の文書化。波の数値・具体形状、模擬fixture、実験UI/測定図はLabに残す。

次は用途ごとの対比較（印象、受付判断、状態理解を分離）、提示順の統制、出所識別テスト、実機/支援技術/性能測定。確認された価値だけを人間が採用する。

## 変更ファイル

- `gallery/lab/index.html`：新実験への入口
- `gallery/lab/waveform-expression/{index.html,lab.css,lab.js,wave.js}`：局所PoC
- `gallery/lab/waveform-expression/reuse-test/{index.html,style.css,app.js}`：独立AI生成画面
- `docs/{WAVEFORM-EXPRESSION.md,WAVEFORM-VALIDATION.md,SOURCE-DECISIONS-WAVEFORM.md}`：仕様・検証・出典
- `docs/{EXPERIENCE.md,SOURCE-DECISIONS.md}`：既存文書からの入口
- `research/library/{README.md,waveform.md}`：資料索引
- `research/analysis/{waveform-expression.md,waveform-ai-reuse.md}`：研究/AI再利用記録
- `research/design-knowledge/catalog.json`：既存Schemaへ5カード追加
- `research/analysis/waveform-validation/`：実測JSON・画像
- `scripts/check-waveform-browser.mjs`：操作/表示検証
