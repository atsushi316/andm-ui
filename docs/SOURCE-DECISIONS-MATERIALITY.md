# Materiality Button判断記録

2026-10-08 / Lab限定 / human adoption pending / recommended: null。

## mb.stimulus

- recommended: null

- series: Baselineの意味・Native Buttonを利用する独自Lab拡張。公式Seriesではない。
- target: 角、視覚面scale、press/release曲線、static代替
- implementation: gallery/lab/materiality-behavior/button.css / button.js
- scope: Web / rem・scale・ms / stimulus-v1
- basis: andm-original（値・コード）／research-based（比較の原則のみ）
- sourceStatus: not-applicable（独自刺激）。公式の未確認値を補完した扱いではない。
- checkedScope: 前回の研究・概念設計全文と既存Motion/Button/Source-Firstを再読。今回公式Seriesの値は再取得・変更しない。
- sources: Cellini et al. (2013), https://pmc.ncbi.nlm.nih.gov/articles/PMC4129386/ Methods/Results/Discussion; Costes et al. (2019), https://doi.org/10.3389/fict.2019.00001 User Study; Yanagisawa & Takatsuji (2015), https://ijdesign.org/index.php/IJDesign/article/view/1536/674 Methods/Results。authority: academic。checkedAt: 2026-10-08（前回調査時の本文確認）。verification: 前回の本文確認記録を再読。supports: 変形・期待を分けて評価する背景。Buttonの曲線・値の根拠ではない。
- decision: 色/ラベル/寸法/押込み量/結果を揃え、角とrelease軌道を2×2で比較。独自刺激値は2rem/.25rem、.94、80ms/480ms。480msは収束の差を観察する局所試作値で最適値ではない。
- alternatives: 影や色も変える案は交絡のため見送り。durationだけの変更も見送り。物理engine/Core Token/新Seriesは不要。
- adoption: ユーザー依頼による実験実装。Coreへの正式採用は未決。
- validation: MATERIALITY-VALIDATION.md参照。人間による質感の識別・好みは未検証。
- revisit: 知覚差なし、cancel/rapid入力不具合、motion負荷、用途変更、公式更新時。

## mb.activation

- target: 入力受付、解除、取消、成功の独立
- implementation: button.js / lab.js / example.html
- basis: andm-original（controllerと模擬保存）
- sourceStatus: not-applicable
- sources: DESIGN.md Motion三層、docs/EXPERIENCE.md操作の契約、docs/SOURCE-FIRST.md。authority: andm。checkedAt: 2026-10-08。verification: 本文とbutton.css確認。
- decision: Native activationを維持し、合成clickを作らない。装飾だけ変形。successはclick/form submitの成立で通知、transitionendでは通知しない。cancelでsuccessを出さない。
- alternatives: CSS :activeだけではwindow中断・取消・評価ログの整合を満たせないため最小JSを使用。単なるdelayや入力lockを追加しない。
- recommended: null
- adoption: Lab実装のみ。新ComponentやTokenに昇格しない。
- validation/revisit: MATERIALITY-VALIDATION.md、AT/実機未検証。実保存ではサーバー結果に基づく状態制御が必要。

## mb.evaluation

- target: 予備評価、neutral ID、random order、export
- basis: andm-original / sourceStatus: not-applicable / recommended: null
- implementation: lab.js / index.html
- decision: 操作前と後を別formで記録。期待一致・好み・明確さを分ける。4条件を一度ずつランダム提示。exportも未採用を維持。
- alternatives: 条件順を固定しない。1人の探索記録から統計推論・自動採用はしない。
- validation: 完走・export・random permutation・motion記録を機械検証。厳密な盲検・母集団counterbalance・尺度妥当性は未検証。
