# Liquid Vessel — 将来再挑戦する未採用の実験

**状態：お蔵入り（2026-10-13、ユーザー判断）。** 質感と体験が目標に届かなかったため、確認Galleryから撤去。以下は過去の試作記録です。現行の利用推奨ではありません。コード・音源・検証記録は再研究のため保持。

再挑戦の課題：透明な液体と厚いガラスの静止時の説得力、音への自然な反応、モバイルでの実表示検証、UIとしての有用性。再採用は別途判断する。

2026-10-13。Apple Liquid Glassの公式仕様ではなく、「ガラス容器の内側に液体がある」独自実験。Galleryの09番で操作できます。元のミニプレーヤー08番と既存パーツは維持します。

## 表現と境界

既存のガラス面・ツールバー・native buttonを外側に使い、内側の二層のSVG液面だけを更新します。外形、ラベル位置、操作領域は波で変形しません。液量20–65%、停止時は水平、再生開始で波が立ち、停止後は指数減衰して処理が止まります。次の曲では再生中のみ小さな揺れを追加。緑青の色、液量、波の式と数値、32pxの容器角はandm独自値です。ガラスと液体の間の物理屈折・飛沫・流体計算はありません。

音声は再生しません。波の強弱は決定的な模擬信号で、実音声の分析や同期ではありません。実際の再生状態は消費側がsetPlayingへ通知します。

## 明示import

```js
import '@atsushi316/andm-ui/experimental/liquid-vessel/style.css';
import {enhanceLiquidVessel} from '@atsushi316/andm-ui/experimental/liquid-vessel';
const liquid = enhanceLiquidVessel(element);
liquid.setPlaying(true);
liquid.setLevel(42);
liquid.impulse();
liquid.setReducedMotion(true);
liquid.destroy();
```

HTMLの正本はgallery/lab/apple-liquid-glass/index.htmlのliquid-vessel。装飾SVGはaria-hidden。ラベル・再生状態・ボタンはNative DOM。ガラス部分には既存実験の明示CSSとenhanceLiquidGlassも必要です。

## 性能・軽減

独立した1つのrAFで各液面を41点更新。波更新はガラスの屈折マップ生成・背景DOM画像化を呼びません。停止の減衰完了・画面外・文書非表示でrAF停止。OS/手動の動き軽減では水平な液面と操作状態を維持。forced-colorsでは装飾を隠して停止。実端末/GPU負荷は未測定。

## 検証

build、token/source/coverage監査、JS構文とdiff、IDとARIA参照を確認。pure model/非描画EventTarget harnessで液面範囲、減衰終了、連打時の単一rAF、画面外/非表示、動き軽減、破棄を確認。実ブラウザ操作・静止/動画目視・狭幅/拡大・読み上げ・全状態コントラストは未検証。完成品質の判定は実表示確認が必要です。


## Clear Water v2 — 2026-10-13

Supersedes the coloured v1 treatment. Remove teal/purple liquid fill and the metadata's opaque white label panel. Use near-clear neutral fills, a thin bright meniscus plus a slightly offset dark line, and restrained bottom/side reflections. Reduce the wave envelope to about 1.25–2.15 viewBox units and phase speed to 1.05 rad/s. These are independent artistic choices, not measured water optics.

For a supplied background image, map it to the scene position inside the SVG, clip it below the current liquid surface, then apply a fixed 1.2%/1.8% magnification and tiny shift. Only the clipping path follows the wave. This is a controlled-image optical cue, not Snell-law refraction or dynamic live-DOM warping. HTML backgrounds use the meniscus and neutral highlights alone. Gallery's grid/photo backgrounds are the useful comparison. Image registration runs on refresh/resize, never for each wave frame. Call `enhanceLiquidVessel(host,{background:{element,image}})` and `refresh()` when changing the background. `destroy()` clears the image reference and observers.

Build/token/source/coverage checks, syntax/diff, ID/ARIA and non-rendering wave/controller tests pass. The harness additionally checks liquid/clip agreement, registration removal, and absence of per-frame scene geometry reads. Actual browser appearance, text contrast and GPU/device performance remain unverified.


## Water Study v3 — 2026-10-13 / drawing and real sound

Gallery09 now uses a dedicated `experimental/water-player` renderer instead of the v1/v2 SVG treatment. The old module remains available for explicit use; other glass controls are unchanged. A fragment shader draws a controlled neutral studio background, rounded glass silhouette, normal-dependent background sampling, Fresnel-inspired reflection, paired wall boundaries, a heavier base and a meniscus. This is an independent 2.5D material approximation, not a volume ray tracer or exact physical water simulation. It does not refract arbitrary page DOM or reuse the page's background selector.

The short original WAV was synthesized locally from sine tones and decaying pulses. It plays only after a native button click. Web Audio AnalyserNode measures its PCM RMS; rising energy excites two damped water modes. Silence leaves the water still; pausing allows residual motion to settle. Native playback owns the playing state. OS/manual reduction fixes the surface while retaining sound controls. Hidden/offscreen state pauses sound and rendering. Static rendering is event-driven; animated rendering is capped at 1000 pixels wide and device pixel ratio 1.5. No microphone, external audio service, recording or upload.

Source references fetched 2026-10-13: MDN getFloatTimeDomainData and WebGL best practices. These support waveform acquisition and rendering constraints, not aesthetic or physical accuracy. No third-party shader or music was copied.

Checks: shader compiled, linked and rendered under standalone Mesa EGL/GLES at 900x450; inspected its static output and fixed an undefined negative-base pow operation. This is not browser QA. Model tests confirm PCM RMS, silence, excitation, bounds and eventual rest. Build/token/source/coverage/syntax/diff and HTML references pass. Browser/native audio interaction, Android/iOS GPU output, frame time, visual acceptance and text zoom remain unverified. Shader absence/failure presents an error and disables play rather than pretending to render water.
