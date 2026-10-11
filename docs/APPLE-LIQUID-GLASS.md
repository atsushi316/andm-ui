# Apple · Liquid Glass — 実験バリエーション

2026-10-11 / `liquid-study-v1`。実験追加はユーザー依頼で採用。Core標準への採用は未決。Appleの実装・完全互換ではない。

[操作する](../gallery/lab/apple-liquid-glass/) · [根拠](SOURCE-DECISIONS.md#apple-liquid-study-20261011)

## 境界

既存 `.andm-series--apple`、Core CSS、既存Behaviorの変更なし。別スコープ `.andm-series--apple-liquid-glass` と明示importのCSS/ES module。`dist/style.css`に実験CSSを混ぜない。Native button/rangeを再利用し、装飾だけを別要素へ置く。４部品はButton、Slider Thumb、TabsのLens、展開Menu Bubble。Framework非依存・追加依存なし。

ResearchはRuntime非依存。文献からTokenを自動生成しない。公式ロゴ・フォント・SF Symbols・動画・フレームは配布しない。背景SVGは独自作成。

## 公式の確認範囲

[Meet Liquid Glass, WWDC25 session 219](https://developer.apple.com/videos/play/wwdc2025/219/) の本文を再取得。公式配信SD動画の155秒フレーム、260〜269秒と185〜197秒の3秒間隔連続フレームを取得し視覚確認。全編連続再生、フレーム単位の軌道測定、実機操作は未実施。

観察: 薄いカプセルの光と背景の屈折、Slider/Switchの透明なつまみ、操作中の拡大・変形、操作線がガラス越しに見えること。公式本文はlensing、操作時の光と柔軟さ、形の連続変化、背景に応じた可読性、操作/ナビゲーション層への用途を説明している。

HIG全体の確認に拡張しない。高さ・ぼかし・光量・spring係数・durationは公式測定値ではなく局所実験値。自動明暗調整や任意背景でのコントラスト保証は再現していない。

## 作者自身の再現実装を比較

2026-10-11に本文/READMEを確認。動くデモのブラウザ横比較・性能実測は未実施。作者の主張と自分の検証を分ける。

| 資料 | 参考 | 作者が述べる制約 | 判断 |
|---|---|---|---|
| [Kube: CSS/SVG refraction](https://kube.io/blog/liquid-glass-css-svg/) | 屈折マップ、縁の光、Slider/Switchの例 | SVG backdrop-filter方式はChrome限定。形状変化のマップ再生成にコスト。実験用途 | 縁を曲げ中央を安定させる発想を参考。数値はApple公式と呼ばない |
| [rdev/liquid-glass-react](https://github.com/rdev/liquid-glass-react) | elasticityと操作の反応 | Safari/Firefoxではdisplacementなし。shaderモードは安定性に制約 | 動きの比較資料。React依存の移植なし |
| [ybouane/liquidglass](https://github.com/ybouane/liquidglass) | WebGL光学、静止時の処理抑制 | DOM画像化が高価。動的背景は毎フレーム取得。構造/CORS/context制約 | 任意DOM画像化は使わない |
| [samasante browser notes](https://github.com/samasante/liquid-glass/blob/main/BROWSERS.md) | 自分の画素にSVG filterを適用 | 任意backdropの屈折とは別。Safari cache・広い面・GPUに注意 | 制御画像方式の比較資料。cross-browser保証はしない |

第三者コードはコピーしていない。将来のコピー/依存採用時は対象commit・license・帰属を確認する。

## 光学と性能の契約

登録した `background: {element, image}` の画像を、装飾面の位置に合わせて再表示し、SVG `feDisplacementMap`で縁を変位させる。丸い長方形の距離と法線から独自近似。Snell則のray tracerではない。

ぼかしだけとの違いを見られるが、重なる文字・写真・動画・Sliderの青い進捗線など任意DOMはサンプル対象外。背景は領域いっぱいに引き伸ばした単層画像を前提とする。カード面は文字の可読性を支える独自設計で、Appleの自動適応ではない。

背景指定なし/「ぼかし＋光」はCSSのみ。Safari/Firefox/iOSのSVG filterは今回の実ブラウザで未検証。描画されない環境もNative操作とCSS面は残るが、屈折の保証はしない。Springは変化時だけrAFを使い、静止時に止める。DOMの毎フレーム画像化やWebGL contextなし。実機で軽量とは未判定。

## 操作とアクセシビリティ

- Button: native clickのみが成立。synthetic clickなし。装飾面だけ変形し、文字・hit target・focusを変形しない。Disabled/取消/blurを区別。animation終了を処理成功にしない。
- Slider: native rangeが値とキー操作を所有。値をspring終了まで遅らせない。見本は0–100%/thumb幅56px。任意単位の汎用Slider APIではない。
- Tabs: 左右/Home/End、roving tabindex、aria-selected/controls、対応tabpanel。意味と選択を即座に更新し装飾だけ追従。
- Menu: native trigger、aria-expanded/haspopup、open時に項目focus、上下/Home/End、Escapeで閉じtriggerへ復帰、Tabで外へ出ると閉じる。形のanimation中も操作できる。
- OS Reduced Motion/Transparency/forced-colorsを優先。手動設定は追加の軽減でOS設定を解除しない。
- 模擬操作。外部保存/送信/自動コピーなし。

一次資料: [APG Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)、[Menu Button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)、[Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider/)。2026-10-11本文確認。APGはWCAG適合証明ではない。

## 明示的な組み込み

```js
import '@atsushi316/andm-ui/style.css';
import '@atsushi316/andm-ui/experimental/apple-liquid-glass/style.css';
import {enhanceLiquidGlass} from '@atsushi316/andm-ui/experimental/apple-liquid-glass';
const controller = enhanceLiquidGlass(scope, {
  background: {element: scene, image: imageURL},
  onAction(action) { /* アプリ側で処理と結果を通知 */ }
});
// 画面破棄時
controller.destroy();
```

対応HTMLはGallery見本が正本。任意ページに置ける万能ガラスエンジンではない。

## 検証の範囲

Build/Core token監査/JS構文/差分、光学マップの方向・対称性・範囲、spring収束・再入力、ID/ARIA/リンク、既存CoreとAppleの不変を確認する。

SitesのブラウザQA用control-browserが利用不可。実表示390px/200%拡大、日本語の見え方、実ブラウザpointer/keyboard、VoiceOver/TalkBack、全状態コントラスト、iPhone/Androidのフレーム時間・発熱・電力は未検証。「完全再現」「WCAG AA合格」「軽量保証」はしない。

見直し: Safari filter差異、低速端末、文字拡大、実表示の読みづらさ、新背景、Apple仕様更新、Core採用の検討。


### 今回通過したチェック

- `npm run build` / `npm run audit:tokens`: 237定義、必須未定義なし。
- 全変更JSの構文 / `git diff --check`: 通過。
- 56×30、56×44、140×48、112×50、260×226のマップ: 左右/上下対称、変位方向、alphaの検証通過。
- 30/60/120Hz相当の時間刻みでspringの復元収束と復元後の再入力を確認（CPU計算試験であり実描画fpsではない）。
- 見本ID重複なし、ARIA/label参照とlocal CSS/moduleリンク存在。
- Core CSSは直前の公開版とbyte一致。SHA256 `5b01d2b76f27a98b30b692c50d192ac65bc03315e294fbaf2510068b7f3846b9`。既存Apple CSS差分なし。
- ブラウザQA/実機/コントラスト/読み上げの未検証は上記のまま。


## Refinement v2 — 2026-10-11

Slider: resting white capsule lifts into a transparent, softly expanded lens on input; native hover/press shadows are removed. Menu: one optical map retained, position updated throughout spring expansion, contents revealed inside the growing bubble; second trigger activation closes it. Added standalone round icon buttons, one shared toolbar surface and bottom navigation. Background choices now text / grid / light UI / photograph. Text and light UI use actual HTML with CSS blur/light; controlled PNG/photo refraction remains an approximation. All geometry and timing are independent experimental choices. Build and syntax checks do not substitute for actual browser or device verification.

## Refinement v3 — 2026-10-11 / mobile review

User feedback was consolidated before this pass. Existing Core and Apple styles remain unchanged.

| Feedback | Implemented response |
|---|---|
| Resting slider is solid white | Translucent resting face, with a stronger lens during input. Independent study choice; not asserted as Apple's resting style. |
| Slider cannot reach the right end | Pointer capture and a clamped pointer-to-value mapping share the exact 56px thumb travel with the visual face. Native range retains keyboard input, values and semantics. |
| Blue flash on touch | Disable the browser tap highlight locally, remove Core pressed decoration from tab items and keep keyboard focus visible using input modality. |
| Ellipsis is below centre | Three CSS dots in a centred grid, avoiding the font glyph's baseline. Horizontal orientation retained. |
| Menu items dismiss the panel | Items report their action and remain open. Trigger toggles; outside input, Escape and focus leaving still close it. Pointer opening retains trigger focus; arrow keys enter the menu. |
| Panel refraction is an inner oval | Distance-field corner radius now follows the panel's 26px radius and actual dimensions. Dimensions are quantized to 8px only for the morphing map. Position stays live; filter nodes stay mounted. |
| Background does not reach lower controls | Transparent sample surfaces; repeated real text and UI run through the entire scene behind all controls. Photo/grid continue to span the entire scene. |
| Press response is too subtle | Slightly stronger local scale plus a release impulse for quick clicks. Fixed hit targets; toolbar icons respond without bouncing the entire toolbar. |
| No persistent action state | Independent heart/play buttons retain aria-pressed. Play changes to pause; explicit status clarifies that audio is not played. |
| Bottom navigation only changes colour | More distinct selection lens, a spring on activation and horizontal pointer tracking. Selection semantics update immediately. |
| Dark backgrounds / more liquid controls | Dark HTML scene, dark raster grid and a three-option segmented tab control. Explicit dark styling; not automatic background contrast adaptation. |
| Performance concern | 64-entry bounded optical-map cache, stable filter nodes, event-driven animation; user-triggered five-second rAF interval sampler. No device/GPU/power guarantee. |

### Verification for this pass

- Changed module syntax and `git diff --check`: pass.
- Slider pointer mapping at widths 160/248/360: reaches min, midpoint and max.
- Panel edge check: rounded rectangular map bends the side at (2,50), where the previous capsule map leaves a neutral field. Symmetry checked at multiple panel/control sizes.
- Spring convergence: 30/60/120Hz numerical time steps. These are mathematical checks, not measured screen rates.
- Optical map generation at 260×226: median 1.15ms for 20 runs in this execution environment; excludes DOM, PNG encoding, filtering, compositing and real devices.
- HTML ID uniqueness, ARIA/label references and linked module/CSS files: pass.
- Core CSS byte-identical to pre-change source, SHA256 `5b01d2b76f27a98b30b692c50d192ac65bc03315e294fbaf2510068b7f3846b9`.
- Supported browser QA capability unavailable: no browser screenshots or pointer/keyboard execution in this pass. Android/iOS/Safari/Firefox appearance, scroll cancellation, frame time, heat, power, contrast and assistive technology remain unverified.

The rAF sampler reports callback intervals and the 95th percentile, not GPU completion or an FPS certification. Changing background or material while making the same gestures permits a within-device comparison. Hidden-page sampling is cancelled.

### Alternative approaches considered

Full live-DOM refraction would require a different rendering path and broader browser verification. This pass keeps controlled-image refraction plus real HTML blur/light, avoiding continuous DOM screenshots. Dark mode uses a restrained tint and lighter ink/selection rather than amplifying every highlight. Mapping matches panel corners instead of increasing displacement strength to conceal the shape error. These are implementation decisions and require visual review; they are not Apple-measured constants.


## Refinement v4 — 2026-10-12

Segment labels are centered on both axes in the component stylesheet. Shared toolbar icons use `--andm-glass-color-active` for transient press and persistent `aria-pressed` selection, also shared by selected tabs and standalone toggles. Light/dark mappings retain the existing blue colors. Toolbar selection now uses an inset circular surface (`--andm-glass-inset-fill`, `--andm-glass-inset-shadow`) instead of a flat highlight. Fixed targets, native toggle behavior and focus indicators are preserved; forced-colors replaces the shadow with an outline. These are user-requested andm design choices, not measured Apple specifications. Browser/device appearance remains unverified.

Selected navigation and segmented lenses now share the standalone toggle's translucent blue background through `--andm-glass-color-active-background`; foreground uses `--andm-glass-color-active`. The inset treatment remains toolbar-only.
