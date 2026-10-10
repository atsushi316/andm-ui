# Waveform Expression — 一次資料索引

2026-10-08本文確認。歴史資料・実験結果・仕様とandmの仮説を分ける。取得失敗を「定義なし」にしない。図の細かな値は未読/未抽出のまま。

| 資料 | 確認範囲 / 版 | 裏付けること / 限界 |
| --- | --- | --- |
| [Harrison, Yeo & Hudson: Faster Progress Bars, CHI 2010](https://chrisharrison.net/projects/progressbars2/ProgressBarsHarrison.pdf) | 4頁本文、Studies/Methods/Results | 脈動・縞の演出と知覚時間を特定の進捗比較で調査。波形Buttonの効果や最適CSS値の根拠ではない |
| [Heer & Robertson: Animated Transitions in Statistical Data Graphics, InfoVis 2007](https://idl.cs.washington.edu/files/2007-AnimatedTransitions-InfoVis.pdf) | 8頁本文、§5/6の実験条件・結果 | 図表の変化・対象追跡。装飾波形、音声UIやゲームUIの効果へ直接一般化しない |
| [SVG 2 Paths](https://www.w3.org/TR/SVG2/paths.html) | Paths章、M/L等のgeometry | パスの形状仕様。知覚的効果を保証しない |
| [WHATWG HTML Canvas](https://html.spec.whatwg.org/multipage/canvas.html) | canvas要素、fallback/keyboardの本文 | 同等の代替内容、focus可能な要素の対応。今回Canvasは不使用 |
| [Web Audio API 1.1](https://webaudio.github.io/web-audio-api/) | Editor’s Draft 2026-09-09、AnalyserNode §1.8.3 | time-domainとfrequency-domain取得の違い。今回API不使用。Editor’s Draftを確定勧告扱いしない |
| [Godot 4.5 AudioEffectSpectrumAnalyzer](https://docs.godotengine.org/en/4.5/classes/class_audioeffectspectrumanalyzer.html) | description/properties本文 | ゲームエンジンのスペクトル分析とFFT buffer/遅延の関係。時間領域波形やUIの心理効果を証明しない |
| [WCAG 2.2 Understanding: Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | 4.1.3 AAの解説本文 | focusを移さず状態を伝える。毎フレーム通知は避ける |
| [Understanding: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) | 2.3.3 AAAの解説本文 | 非本質的動きを停止可能に。AA要件とは区別 |
| [Understanding: Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | 2.2.2 Aの条件本文 | 自動開始等の適用条件を確認。5秒以下なら全て安全と断定しない |

Understandingは規格を解説する資料で、規格本文そのものとは区別する。

PMCの視覚運動と時間知覚の候補資料は本文取得が検証画面で止まったため、本PoCの確認済み根拠には使わない。表面周期・有機的印象、音声/ゲームUIの個別心理効果については本文確認済み研究が不足している。追加調査項目とする。
