# Waveform Expression — 出典と設計判断

2026-10-08。対象はWebのLab限定独自試作。公式Seriesの指定値は無変更。全記録`recommended: null`、adoptionは明示されたPoC実装依頼であり、Core採用は未決。

| id / target | basis / sourceStatus | source / 確認範囲 | 判断・実装 / 代替・見直し |
| --- | --- | --- | --- |
| wf.roles / 装飾・反応・状態・データ | andm-original / not-applicable | MATERIALITY-BEHAVIOR、EXPERIENCE、DESIGN既存本文再読 | 既存概念へ役割を対応。独立レイヤー/Seriesを新設しない。意味が混ざる場合見直す |
| wf.geometry / SVG線 | official（standard、path機構のみ） / specified | SVG 2 Paths、2026-10-08章本文確認、[URL](https://www.w3.org/TR/SVG2/paths.html) | wave.jsのM/Lパス。viewBox座標・色・曲線の具体値はandm-original。Canvas/WebGLは今回不要 |
| wf.decorative / 生成した波と実験値 | andm-original / not-applicable | Lab実装、実験依頼 | decorativePath、振幅14/周期4/減衰3/速度1.25初期値。固定テンプレート/公式Motion値にしない。知覚実験・負荷で再確認 |
| wf.data / 値から線への写像 | andm-original / not-applicable | fixture、local performance.now受付間隔 | samplesPathは単位/レンジ/出所を表示し、数値表を同じ値から生成。未取得の音声を捏造しない。実信号へ移行時再検証 |
| wf.audio-domain / 時間領域とFFTの区別 | official（API仕様のみ） / specified | Web Audio API 1.1 Editor’s Draft 2026-09-09 §1.8.3、[URL](https://webaudio.github.io/web-audio-api/)、2026-10-08本文確認 | APIは今回不使用。fixture−1〜1は独自定義。Web Audio一般の振幅保証としない。実音声時に版/単位/権限を再確認 |
| wf.status / 状態の文字と通知 | official（standardの要求、解説確認） / specified | WCAG 2.2 SC4.1.3解説本文、[URL](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)、2026-10-08 | role=statusは受付/中断/結果時、進捗数値はaria-live off。数値表は静的確認用。読み上げ実機で再検証 |
| wf.motion-stop / 動きの停止 | andm-original（standardの解説を参照） / not-applicable | 2.3.3 AAA、2.2.2 A解説本文、[文献索引](../research/library/waveform.md)、2026-10-08 | 手動/OS/非表示で演出停止。自動開始なし・有限。実装全体のWCAG適合は未保証。値は独自 |
| wf.research-transfer / 知覚効果 | research-based（実験の限界を判断へ適用） / not-applicable | Harrison 2010本文4頁、Heer/Robertson 2007本文8頁、2026-10-08。索引にURL/版 | 文脈依存の進捗/図表研究。波形Buttonへの効用・最適速度を断定しない。別ユーザー実験で再確認 |

実装箇所：gallery/lab/waveform-expression/、検証：[WAVEFORM-VALIDATION](WAVEFORM-VALIDATION.md)。元の13件のstaged変更は別worktreeのまま保持。PR #10（Materiality）をbaseとする積み上げPR、#9へ間接依存。#8のCSSにはコード依存なし。main最新fabf0c3、#8/#9/#10はいずれも未統合を確認。
