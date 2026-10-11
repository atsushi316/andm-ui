# M3へのExpressive統合

2026-10-11。ユーザー依頼：標準／Expressiveの切替を設けず、一つのM3シリーズとして、より楽しく動きのある部品を提供する。

既存コードを確認するとM3はすでに `andm-series--expressive` で提供されていた。新しいSeriesやプリセットを追加せず、既存スコープと既存4つのfast spatial/effectsトークンを拡張利用する。Baselineは独自の基礎であり、旧M3として統合する対象ではない。

## 根拠と採用範囲

- 既存分析：`research/analysis/m3-expressive.md`、2026-09-30取得記録。今回再読。
- 公式URL： https://m3.material.io/styles/motion/overview/specs 、 https://m3.material.io/styles/motion/overview/how-it-works 。2026-10-11再取得はJS要求のみ。今回公式の数値本文を取得できたとは扱わない。
- 公式API： https://developer.android.com/reference/kotlin/androidx/compose/material3/MotionScheme 。M3にstandard/expressiveの仕組みが存在するが、andmで二つの製品バリエーションを用意する義務とは解釈しない。
- 値は既存採用を維持：fast spatial 350ms / cubic-bezier(0.42,1.67,0.21,0.9)、fast effects 150ms / cubic-bezier(0.31,0.94,0.34,1)。今回のsourceStatusは既存記録のみ、再取得unverified。

## パーツへの対応

| 対象 | 変更 | basis |
|---|---|---|
| Button | 既存のサイズ・押下morphを維持。Reduced MotionでExpressive専用transitionの上書きを修正 | 既存採用の維持 / andm-original |
| Switch | つまみはspatial、背景・影はeffects | derived（動きの役割への対応付け） |
| Chip | 色・枠はeffects、押下時は既存radius-smへmorph | andm-original（公式Chip形状再現ではない） |
| Tabs | 既存のselected状態に伸びる印、内容の8px出現を追加 | andm-original |
| FAB | effects、押下scale .96 | andm-original（既存Baselineボタンの値を採用） |
| Dialog | 出現のtranslateはspatial、opacity/backdropはeffects | derived。出現距離は既存維持 |
| Segmented | 既存インジケータをspatialへ変更 | andm-original。M3の推奨部品として紹介しない |

意味・Native操作・既存disabled/focus契約を維持。OSのReduced Motionでは変形・移動のアニメーションを止め、結果と色とfocusを維持。色・文字・部品寸法は今回一括変更しない。自動で旧duration名にExpressive値を詰めない。トークン数は237のまま。

## 確認

`npm run build`、`npm run audit:tokens`、`npm run audit:sources`、`npm run audit:coverage`、JavaScript構文・ローカル参照契約を確認。ブラウザ操作・画面の目視・実機は、今回利用可能なcontrol-browserがないため未検証。過去のブラウザ記録を今回の合格として流用しない。専用見本は `gallery/m3/`。ダーク表示は見本専用のandm-original paletteで公式dynamic colorの再現ではない。

公式更新・本文取得成功・実機での形や動きの不具合が見直し条件。Button以外の全M3仕様準拠を主張しない。


## 2026-10-11 操作と見本の改訂

ユーザーの「操作ボタンの挙動が変」「M3らしい動きが分からない」を受け、5見本へ変更。

- 標準ButtonGroup：3つの等幅ボタン。押下中の幅+15%、隣接の幅を圧縮。中心なら隣へ7.5%ずつ、端なら隣へ15%。AndroidXのExpandedRatioとFastSpatialを参照。最小内容幅は保持。3要素のWeb対応であり、Androidの可変個数/overflow menu/最大圧縮計算全体は未実装。
- Connected group：40pxを基にした高さ、2px gap、内側8px/押下4px、端はfull、選択するとfull。Native buttonのaria-pressedで単一選択。Tab/Enter/Space。公式AndroidのdpをCSS pxへ対応させたderived。
- Switch：52×32、outline2、未選択16/選択24/押下28のつまみ。押下は即時、復元は既存fast spatial。公式Android tokens v0_210参照。色ロールの一部は既存andmへの対応付け。
- 短いtapも形を観察できるよう120msの最低視覚時間を任意pressFeedback controllerで追加。これはandm-original。Native clickだけが受付で、演出タイマーは結果を決めない。pointerleave/cancel/blur/非表示で取消。preventDefault、合成click、pointer captureは使わない。
- 以前の保存/大ボタンの無反応を修正。操作ごとの結果を表示。フォームはNative requiredと空白入力検証。閉じる/Escapeは作成しない。ダイアログのaction slotが押下半径を上書きする競合を修正。
- 面の登場は24px移動とscale .88のandm-original演出。公式container transformの再現とは扱わない。
- OS/手動Reduced Motionでは幅アニメーションを止め、選択結果/入力/focusは保持。手動設定はこの見本だけ。

一次資料は接続済みGitHubから2026-10-11本文取得。developer.android.comのAPIはサイズ超過/timeout、Web経由githubは取得失敗だったため、取得済み公式sourceを根拠にした。AndroidX androidx-mainの変動するsourceであり、Material Android安定版全体の再現ではない。

| file (AndroidX material3/src/commonMain/kotlin/androidx/compose/material3/) | blob SHA | 確認範囲 |
|---|---|---|
| ButtonGroup.kt | 93b0c69263c1b24687847e0ba345dfdbee815e65 | ExpandedRatio .15、FastSpatial、pressed/checked corner roles |
| Switch.kt | 2e5e0a17a68bd5503a4a88f6d875e641ed9e7c46 | 押下Snap、handle offset/size、復元FastSpatial |
| tokens/SwitchTokens.kt | 1fd474ec436e63b0ec54c455f32445d2d4ef5123 | v0_210の寸法/色役割 |
| tokens/ConnectedButtonGroupSmallTokens.kt | 5c86ab882ecb892e5eee0d29da42399711be330a | 14_1_0、height40/gap2、small/extra-small/full |
| tokens/ButtonGroupSmallTokens.kt | 3ee26048765bdce2275e689c8706f8900831a3f8 | v0_11_0、gap12/height40 |

例: https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/ButtonGroup.kt

検証：build、tokens（237、必須未定義なし）、JS構文、Native DOM controllerのイベント検証、HTMLのID/参照整合。control-browserが提供されないため実ブラウザ・画面目視・touch・Safari・支援技術は未検証。今回も完全な検証済みとは扱わない。実機の取消/連打/狭幅/文字拡大/色/動きを次の見直し条件とする。


## 2026-10-12 動画3本からの追加

ユーザー提供の公式ページ画面録画をフレームで確認。資料はscreen-20261012-021715、021907、022102。画像の順序/輪郭/展開は観察できたが、spring物理値は測定していない。録画観察と公式sourceの値を区別する。

- FABメニュー：Native buttonで展開。下の項目から順にopacity/translate/scale、＋→×、角丸四角→円。閉じると元へ収納。contentは即時inert/aria-hiddenとなり、表示アニメーションの間も非操作。Escapeでtriggerへ戻す。外側clickは閉じるが外側のfocusを奪わない。Tab/Enter/Spaceの通常操作、ARIA menuと偽らない。
- 操作バー：同じ面が56→340px（max-width100%）へ広がる。Native buttonsが順次現れる。録画の印象を移植したandm-original構成/寸法で、公式Toolbar APIそのものではない。
- Loading Indicator：38/48 dpの公式構成と連続polygon morphを参照。WebのSVG d補間で花風/五角形風/楕円/4葉風が回転。輪郭座標は独自に生成した近似で、公式MaterialShapes全7形状とMorph algorithmのportではない。2400ms周期も独自。通常48px、見本は観察用80px。対応しないブラウザでは静的path＋回転へ縮退。OS/手動Reduced Motionは静的。開始/停止をユーザーが操作し、実通信/実進捗を装わない。
- 再生状態ボタン：triangle→pauseのclip-path、corner20→36px。実音声なし。録画を参照した独自構造/寸法。状態はNative click/aria-pressedで即時確定。
- Gallery右下の「M3の動きを試す」固定リンクはユーザー要望で削除。専用ページURLは維持。

公式AndroidX sourceを2026-10-12本文確認：
- FloatingActionButtonMenu.kt blob41311364fb72a576b988cee9fb1d7f05d77bdb34。stagger visibility、FastSpatial width / FastEffects opacity。ただし公式のstaggerはSlowEffectsのspring。今回0/45/90ms等のCSS delayは独自近似である。
- LoadingIndicator.kt blobfd569c6ad2f1ed6868417364bd8028b6a1516307。RoundedPolygon/Morph、Indeterminateは7形状、determinateはCircle→SoftBurst。今回不定形の見本のみ、数値progress APIは足さない。
- tokens/LoadingIndicatorTokens.kt blobbafe68c384582e0aea189069cdd06f8304a0ba25、v0_7_0。ActiveSize38、container48×48、primary role。Web対応はderived。
URL base：https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/

任意controllerは `disclosure(root)` を明示import。rootにdata-andm-open、triggerにdata-disclosure-trigger/data-open-label/data-close-label、contentにID/data-disclosure-content。destroyは閉じてevent listenerを解除。アニメーション時間から状態を決めず、連打はCSSが途中状態から再ターゲットする。

検証：build/token/source台帳、JS構文、controllerのopen/close/Escape/outside/selection/dispose、HTML参照、SVG morphの同一コマンド構成、diff。対応browser QA機能がなく、実画面/タッチ/狭幅/200%目視/Safariは未検証。CSSのinterpolation、連打時の形状、読み上げは実機での再確認条件。既存部品の検証結果を新パーツへ流用しない。
