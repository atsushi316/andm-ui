# Construction Reveal — UIが組み上がる演出

2026-10-14。Gallery内の独立したLab。ユーザー提供動画 `1000000435.mp4` の「点・輪郭からUIが組み上がる」表現を参考にしたandm独自実装。Transitions.devのコード、スキル、パッケージ、素材をコピー・インストールしていない。動画のUI、寸法、時間、曲線の完全再現や公式準拠ではない。

## 試せること

- 点と輪郭 / ワイヤーフレーム / スケルトンの3表現。
- 0.8 / 1.8 / 3.6秒の演出。比較用のandm独自値で、Series公式のmotion値にはしない。
- 既存14 Series、再生、即時に完成形、演出オフ、OSのreduced motion。
- 進捗カード：固定の模擬25タスクを1件ずつ完了。
- 活動カード：今週/今月の固定データを切り替える。グラフに読み上げ用の数値も付ける。
- 集中カード：5分のローカルタイマー、開始/一時停止/リセット、取り組むことの入力。

完成後のUIは既存 `.andm-card`, `.andm-btn`, `.andm-textfield__input`, BadgeとSeriesを再利用し、構成・グラフ・タイマーはLab限定。単独画面と `#/labs/construction-reveal` の共通Gallery詳細に対応。実験室とMotion一覧から探せる。

## 構造と状態

`gallery/lab/construction-reveal/reveal.js` は依存なしのES module。DOMを複製せず、`[data-reveal-part]` の実際の位置・寸法から装飾SVGを描く。`createConstructionReveal(card)` から `play`, `finish`, `destroy` を返す。`.cr-content` はカードの直接の子。`.cr-unit` が登場順序、`data-reveal-part="text|shape|chart"` が輪郭の種類。

初期HTMLは完成形。描画中は見本contentだけをinert/aria-hiddenにし、装飾SVGもaria-hiddenにする。「完成形を表示」は演出のtimerを消し、同じDOMを操作可能に戻す。既存入力・period・タイマーを再生やSeries変更で作り直さない。見本内にfocusがある場合はそのカードの演出を省く。開始/終了を1つのstatusで通知し、毎フレームの読み上げをしない。

再実行時のpromiseはrestarted、途中で省略したものはuser等で解決する。ResizeObserverでレイアウト変更に追従し、destroyで監視・timerを解除。OS設定が再生中に変わっても即終了する。ページ内設定とOS設定のどちらかがオフなら演出しない。自動再生は初回1回のみで、繰り返しループはない。

演出の時間と実際の処理完了は分離。通信・AI生成・データ取得はなく、架空の処理進捗を表示しない。最初の表示、生成物の披露、構造デモに使う仮説。頻繁な利用、入力の途中、緊急な操作には短縮/省略を優先する。人間の体験評価・Core採用は未決。

## 根拠と境界

- 視覚の参考：[Transitions.dev](https://transitions.dev/) と提供動画。コードは独自に作成。
- [W3C SC 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)：非必須の操作起点motionを省略できること。2026-10-14にUnderstanding本文を取得確認。AAAの個別要求であり、Lab全体のAAA適合認定ではない。
- [W3C SC 4.1.3](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)：focusを移さずstatusを通知。2026-10-14にUnderstanding本文を取得確認。
- サイズ、淡い輪郭色、図形、進入順、時間、曲線はLabのandm-original。Core/Seriesのトークン変更なし。
- 新規外部依存・AIキー・外部送信なし。外部資料リンクはユーザーの明示クリックでのみ開く。利用条件は既存リポジトリのUNLICENSEDを維持。

## 検証

`scripts/check-construction-reveal.mjs` で実Chromium153、3表現×14 Series×320/390/768/1280px＝168ケース。演出前後の横はみ出し、inertと装飾の解除、完了/期間/タイマー操作、入力・状態保持、手動/OSのreduced motion、途中の設定変更、Enter、390pxでroot文字200%、共通Galleryのタッチ操作を確認。新規Labの通信に外部リクエストなし。スクリーンショットで輪郭・登場中・完成・スマホを目視。

iOS/Android実機、Safari、支援技術、全Seriesの全色コントラスト、人間による反復利用評価は未確認。数値の検証やブラウザ結果だけで正式採用しない。
