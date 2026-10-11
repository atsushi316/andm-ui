# 状態の伝え方 — 文献と比較仕様

2026-10-12。Lab独自実験。質感比較とは別軸で、状態・変化・次の操作の理解を比較する。特定表現が優れるとの結論は未検証。

## 確認した資料

| 資料・確認範囲 | 要点 | 実装への反映 |
| --- | --- | --- |
| Carbon Progress bar / Determinate・Indeterminate、2026-10-12取得 | 計算できる進捗と不明な進捗を分ける | 不明時に架空の%を出さない。横・円・段階で同じ模擬進捗を表示 |
| Tailwind CSS animation / pulse・reduced motion、継続更新、2026-10-12本文再取得 | 明滅はスケルトンの例として掲載 | 明滅候補。shimmerは独自比較案でTailwind公式仕様とは呼ばない |
| MDN AnalyserNode / time-domain、2026-10-12取得 | 音声信号の時間領域の可視化 | 固定模擬振幅を使用。波形は履歴・正負、レベルは絶対値で情報量の違いを明記 |
| W3C Status messages理解文書、2026-10-12取得 | status live regionで状態更新を通知 | 共通role=status。高頻度数値を繰り返し読み上げない |
| W3C WCAG2.2 SC2.3.3理解文書、2026-10-12取得 | 非必須の操作アニメーションを無効化できる | prefers-reduced-motionとページ内停止。文字と値は維持 |

URLはLabの文献欄に掲載。文献の用途指針と、本ページ独自の色・角丸・寸法・アニメーション速度を分離する。数値を研究結果から自動生成しない。

## 比較

読み込み6候補、進捗4候補、模擬入力4候補、結果4候補（計18）。各カテゴリーは共通状態で同時更新。2候補に絞る操作、開始・停止・完了・エラー・リセット、観察JSON保存。試験データであり実際の録音・転送はない。スケルトンは内容配置の予告を兼ねるため、スピナーと完全に同等の情報量ではない。

## 実装・検証限界

Native操作＋既存andm-btnを再利用。Lab CSSのみ、公式Seriesのtokenは変更しない。カードは可変列と狭幅1列。JS構文、HTML参照、build/token auditで検証。ブラウザ実表示、実機、スクリーンリーダー、知覚比較は未検証。暫定採用recommended:null。利用者観察と実機確認後に速度や表現を再評価する。

## 参照と判断の追跡

- Carbon: https://www.carbondesignsystem.com/building-blocks/core/components/progress-bar/guidelines （Determinate/Indeterminate/label/helper、2026-10-12本文再取得）
- Tailwind: https://tailwindcss.com/docs/animation （pulseの用途例と動きを減らす設定、2026-10-12本文再取得）
- MDN: https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode （信号の時間領域/周波数領域、2026-10-12本文再取得）
- W3C: https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html （状態更新の通知、2026-10-12本文再取得）
- W3C: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html （停止できる自動更新、2026-10-12本文再取得）
- W3C: https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html （非必須の動きを抑制、2026-10-12本文再取得）

全候補はmodel.jsの共通snapshotを同時に受け取る。自動進捗は20段階、入力は固定振幅24サンプル・250ms刻みで実処理を表さない。棒の履歴では正負が失われるため、波形と同じ情報量とは扱わない。ページを隠すと一時停止し、再開は明示操作。結果は色だけでなく文字・記号でも示す。Reduced Motionでもデータ更新は保ち、回転・明滅等の演出だけを止める。

余白は既存Baselineのrelated/group/section/insetへ対応付け、独自ラボの可変列・輪郭・色・速度を公式Seriesへ逆流させない。既存の波形ページURLは新ページへ案内し、以前の試作コード・研究は履歴資料として保持。比較ラボ作成はユーザー依頼で採用、各表現の優位性・Core採用はrecommended:null。

## HCI研究と適用限界

- Harrison, C., Amento, B., Kuznetsov, S., Bell, R. (2007). *Rethinking the Progress Bar*. UIST, 115–118. 著者公開本文: https://chrisharrison.net/projects/progressbars/ProgBarHarrison.pdf
- Harrison, C., Yeo, Z., Hudson, S. E. (2010). *Faster Progress Bars: Manipulating Perceived Duration with Visual Augmentations*. CHI, 1545–1548. 著者公開本文: https://chrisharrison.net/projects/progressbars2/ProgressBarsHarrison.pdf

2007年研究は進行曲線と知覚時間、2010年研究は視覚的演出と知覚時間を扱う。処理性能・状態の正確な理解・アクセシビリティの優位性を実証したものとは扱わない。このLabは同じ状態と時間を各候補へ渡す独自の観察用比較であり、論文の実験再現でも統計的ユーザー研究でもない。知覚時間と状態理解を別の観察項目にする判断だけを採用し、実進捗を見かけの速さのために歪めない。

検証: 共通モデルの進捗・停止・再開・完了・エラー・固定信号24件を自動確認。HTMLのID/参照、JS構文、build、token audit、source inventory、coverage確認済み。実表示と利用者観察は未実施。
