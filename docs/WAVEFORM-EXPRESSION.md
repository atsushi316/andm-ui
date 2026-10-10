# Waveform Expression — Lab仕様とAI使用ガイド

2026-10-08。独自PoC、`recommended: null`。公式Series、共有Motion値、公開Component APIの仕様ではない。

## 役割を先に選ぶ

| 役割 | 意味 | 実装上の境界 |
| --- | --- | --- |
| Surface / Texture | 表面の線・密度・うねり | 生成した装飾と表示。測定値と呼ばない |
| Motion / Behavior | 入力への応答と減衰 | Native activation・結果から独立。入力をロックしない |
| Feedback | 実際の状態を伝える | 文字・role=statusを併用。処理状態と演出状態を混ぜない |
| Data Representation | 定義済みのデータを位置へ写像 | 出所、軸、単位、範囲、代替数値表。欠測値を捏造しない |

MaterialityのSurface / Appearance / Behavior / Feedback、既存Motion CharacterとTrigger × EffectのPatternの範囲で扱う。新しい設計レイヤーやToken分類を追加しない。Philosophy・Composition・世界観への固定対応はしない。

## PoCの操作契約

[実験](../gallery/lab/waveform-expression/)はButton / 模擬処理 / 模擬音声ごとにAなし、B静的装飾、C入力反応、D状態・データを比較する。同じサンプル内のラベル・操作結果・寸法を揃えるが、Dには意味を説明する図表が追加される。役割と情報量が違うため4条件の優劣や因果効果を断定しない。

- Buttonは`<button type="button" class="andm-btn …">`。クリック、Enter、Space、支援技術によるNative activationを一度だけ受け付ける。keydownでclickを合成しない。Pressは視覚応答、Releaseは解除、Confirmは模擬保存受付。
- 波の終了を待たず受付結果を`role="status"`へ表示する。反応中の再入力は再スタートできる。Escape、pointercancel、領域外解除、blurで演出を止め、取消入力を確認として数えない。
- Lab内参照controller `../gallery/lab/materiality-behavior/button.js` の`enhanceButton(button,{onState,onConfirm})`はNative activationを維持する。Coreの公開APIではない。PR #10に依存する。
- Statusは20個の模擬作業を200msごとに進める。実サーバー進捗と表示しない。Native progress、文字、完了/エラー/中止を維持。停止後のタイマーが完了を通知しない。
- Audioは24個の固定値、125ms間隔、正規化テスト振幅−1〜1。マイク取得・録音・音声出力なし。Dは実測ではなくこのfixtureの折れ線。A/B/Cも同じ値・時刻を文字で表示する。
- DのButtonだけは実際に受け付けたローカル操作時刻の差をmsで記録する。サーバー遅延、押す力、音声とは無関係。縦軸は0〜表の最大値で、最初の操作には間隔がない。
- 表示変更時も既存DOM・値を保つ。非表示・バックグラウンド中はタイマーと演出を休止し、再表示時に続きから更新する。自動開始や常時装飾アニメーションなし。

## 方式を選ぶ

| 方式 | 適する場合 | 今回 |
| --- | --- | --- |
| CSS | 単純な状態・線・有限なopacity/transform | 局所造形・状態・focus |
| SVG | 少数の線、図の意味や軸、レスポンシブ | viewBox＋path＋DOM文字/表を採用 |
| Canvas | 大量サンプル・高密度描画 | 不採用。代替内容とfocus管理が別途必要 |
| Web Audio API | 実際の音声信号が必要 | 不採用。模擬信号にマイク権限は不要 |
| WebGL | 大規模粒子・shader等の測定された必要性 | 不採用。今回の少数線には過剰 |

ReuseはNative操作＋既存andm-btn。Extendは局所SVGとスコープ付きCSS。独自の計測図・模擬信号の写像はLab内Create。公式Seriesに適用しても独自の波を公式値と呼ばない。必要性・再利用価値が確認されるまでCoreへ昇格しない。

## 最小使用例

要求例：「受付時だけ短い波。受付結果は即座に文字で伝える。波は計測値ではない。」

```html
<div class="wave-example">
  <button type="button" class="andm-btn andm-btn--filled" id="accept">受け付ける</button>
  <svg viewBox="0 0 240 80" aria-hidden="true"><path id="echo" d="M14,40 L226,40"/></svg>
  <p id="feedback" role="status">未受付</p>
</div>
```

```css
.wave-example svg { width:100%; max-width:20rem; height:5rem; }
.wave-example path { fill:none; stroke:currentColor; stroke-width:2; }
.wave-example :focus-visible { outline:3px solid #b44412; outline-offset:4px; }
```

```js
// Lab内の参照実装。Core APIではない。
import {decorativePath} from '../gallery/lab/waveform-expression/wave.js';
let raf, started, count=0;
const button=document.querySelector('#accept'), path=document.querySelector('#echo');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const reset=()=>{ cancelAnimationFrame(raf); path.setAttribute('d','M14,40 L226,40'); };
button.addEventListener('click',()=>{
  document.querySelector('#feedback').textContent=`${++count}回受け付けました。`;
  reset(); if(reduced.matches || document.hidden) return;
  started=performance.now();
  function tick(now) {
    const elapsed=(now-started)/1000;
    if(elapsed>=.8 || reduced.matches || document.hidden) { reset(); return; }
    path.setAttribute('d',decorativePath({amplitude:12,cycles:4,travel:elapsed/.8,decay:elapsed*4}));
    raf=requestAnimationFrame(tick);
  }
  raf=requestAnimationFrame(tick);
});
reduced.addEventListener('change',reset);
document.addEventListener('visibilitychange',reset);
window.addEventListener('pagehide',reset);
```

これはクリック受付に対する小さな例。Press中の取消・意味付き処理・データ描画は別設計。decorativePathは装飾専用。samplesPath(values,{min,max})は有限・範囲内の値だけを線形写像し、装飾パラメータを受け取らない。実データの線を柔らかく見せるために値を変えない。

## 誤用を避ける

- `Math.random()`の線を「音声入力」「処理進捗」と表示しない。生成なら装飾・模擬と明示。
- animationendで処理受付・成功を決定しない。成功は処理結果から決める。
- 波を再生するためにButtonをdisabledにしない。タイマーやNative clickを二重登録しない。
- 音声の時間領域振幅とFFT周波数スペクトル（dB等）を混同しない。視覚周期数を音のHzと呼ばない。
- 模擬値を実測値へ切り替えるとき、出所・単位・レンジ・欠測・権限・停止・通知・負荷を再検証する。

## アクセシビリティと性能

Nativeキー操作とfocusを維持。装飾SVGはaria-hidden、データSVGはtitle/desc＋同じ数値のHTML表。状態通知はイベント時だけrole=statusへ書く（毎フレーム読み上げない）。色・波形だけに意味を置かない。Reduced Motionまたは手動停止でCの演出を止め、データ/処理状態の意味を維持。2.3.3はAAAであり、AA必須と誤記しない。自動開始しない有限演出でも中断を実装する。

描画は動くCだけ・最大約30fps。表示されないカード/バックグラウンドで休止。データ更新は模擬125/200ms間隔。これらは局所実験値で、物理的/知覚的最適値ではない。大量サンプル、弱い端末、実音声は未検証。採用判断は人間による明示的な判断を待ち、recommendedはnullを維持する。

[研究](../research/analysis/waveform-expression.md) · [出典判断](SOURCE-DECISIONS-WAVEFORM.md) · [検証](WAVEFORM-VALIDATION.md)
