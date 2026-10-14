# Motion Graphics — 24の表現をUIのロジックに

2026-10-14。ユーザー提供の24種の動画・チートシートを参考に、登場・文字、動きの性格、切り替えの各8表現を独自実装。動画・画像・外部コードの移植ではない。任意で読み込むexperimental APIで、Coreや既存Seriesの公式仕様を置き換えない。

## 使う入口

```js
import { createMotionGraphics, motionPresets }
  from '@atsushi316/andm-ui/experimental/motion-graphics';
import '@atsushi316/andm-ui/experimental/motion-graphics/style.css';

const motion = createMotionGraphics(target);
await motion.play('pop-in', { duration: 600, strength: 0.6 });
motion.cancel();
motion.destroy();
```

今回の変更はGitブランチに収録。npmの新バージョン公開はしていない。リポジトリでbuild後、相対パスの `dist/experimental/motion-graphics/index.js` / `style.css` からも使える。新規依存なし、import時にDOMへの接触なし、createはブラウザの実Elementを対象とする。Frameworkのmount後にcreate、unmount時にdestroy。

実験室 `#/labs/motion-graphics` では24のカードを選び、対象、用途、注意、生成されたコードを確認。14 Series、時間、強さ、再生・停止、演出オフを試せる。保存/エラー/パネル開閉の実例も別に持つ。

## 入力と責務

| 指定 | 契約 |
|---|---|
| preset | 下の24のID。未知のIDはRangeError |
| target | アプリが保有する実DOM。業務状態やフォームを複製しない |
| duration | 150〜4000ms。未指定時は対象の既存 `--andm-motion-duration-short4` を読む。これは24表現の公式Series認定ではない |
| strength | 0〜1.5、既定0.6。0は動きを省く。変位・拡大・粒の広がりの係数（値/図形の終状態やマスクの意味は変えない） |
| easing | 合法なWeb Animations easing文字列。既定の曲線はandm独自 |
| reducedMotion | trueでその再生を省く。OSのreduced motionを強制的に無視できない |
| from / to / decimals | count-upの既知の値。有限値、桁は0〜3。実データを渡す |
| fromPoints / toPoints | SVG polygonの対応した同数3〜64頂点。各点は有限数2つ |
| stagger | 子の開始間隔0〜150ms、既定35ms。最大48項目 |

動きの選択とアプリの処理は別。保存成功・エラー・画面遷移の事実をAPIが生成しない。更新された実データを渡し、アプリが状態・ARIA・focusを管理する。動画生成エンジン、任意パスの自動モーフ、スクロール監視、物理シミュレーターではない。

## 再生・中断・イベント

`play` は `{preset, reason}` を返すPromise。自然終了はfinished。cancel/次の再生はcancelled、OS/指定の省略はreduced-motion、Web Animationsがない環境はunsupported、destroy後の呼び出しはdestroyed。新しい再生はそのcontrollerの前の再生を中断する。

一時的なWAAPI、rAF、粒、光、文字分割を終了/中断/destroyで解除。対象の既存animationは勝手にcancelしない。count-upとSVG morphは自然終了・動き省略時に指定された新しい値/形を反映し、中断時は再生前へ戻す。それ以外は下層の元スタイルへ戻る。kineticは文字だけの対象（最大120文字）を一時分割し、元の文字ノードへ戻す。

```js
const unbind = motion.bind('click', 'squash-stretch', {
  duration: 300, strength: 0.3
});
unbind(); // イベントの接続だけ解除
```

bindは明示したイベントだけ接続する。自動スクロール/ホバー/画面遷移を全アプリへ取り付けない。UI操作の意味を変えずに使う。

## 本当の開閉とfocus

```js
const panelMotion = createMotionGraphics(panel);
await panelMotion.transition({
  visible: false,
  preset: 'mask-reveal',
  duration: 300,
  focusTarget: openButton
});
```

visible=trueでは実Elementのhiddenを外し、falseでは逆向きの演出後にhiddenを付ける。現在のfocusが中にある面を閉じる場合、外側のfocusTargetが必要。なければfocus-requiredを返して面を保持する。閉じる途中はその面だけinertにし、完了時に元のinertへ戻す。cancel/destroyしても直近に要求された開閉状態へ着地する。連打で古い非同期処理が新しい開閉を上書きしない。reduced motionでも実際の開閉は更新する。呼び出し側はaria-expanded/controlsを対応させる。

## 24種類の用途と対象

各表現はandm-original。Seriesを付けた対象の見た目は既存のTokenを保持する。装飾に使う色、強さの解釈、曲線は独自の既定。

| # | ID / 名前 | UIへの使い方・対象 |
|---|---|---|
|01|pop-in / ポップイン|新しい部品・通知を拡大とopacityで登場|
|02|stagger / スタガー|親の子（data-motion-item）を意味/DOM順のまま順次登場|
|03|burst / バースト|小さな対象の達成を12の放射で祝う|
|04|line-draw / ラインドロー|SVGのgetTotalLengthを持つ線をstroke dashで描く|
|05|mask-reveal / マスクリビール|既にある内容を横の窓から表示|
|06|typewriter / タイプライター|既存の短い文字を段階的なクリップで表示。実ストリーミングではない|
|07|count-up / カウントアップ|既知のfromからtoへ数値を更新。架空の処理進捗にはしない|
|08|kinetic-typography / キネティックタイポグラフィ|短いplain textの文字をずらして登場。input/複雑なHTMLを分割しない|
|09|easing / イージング|小さな移動に加減速を付ける|
|10|overshoot / オーバーシュート|到着位置を少し越えて復帰|
|11|squash-stretch / スクワッシュ＆ストレッチ|押下や接触を縦横の変形で表現|
|12|shape-morph / シェイプモーフ|SVG polygonの対応頂点を補間。HTMLでは角の変化|
|13|liquid-motion / リキッドモーション|輪郭・回転・縦横の変形による有機的な反応|
|14|motion-trail / モーショントレイル|最大8の残像で小さな対象の移動を示す|
|15|particles / パーティクル|最大24の有限の粒による達成の演出|
|16|parallax / パララックス|data-motion-depthの複数の層を別の距離で動かす。常時のscroll追従なし|
|17|mask-transition / マスクトランジション|円形の窓から次の面を登場|
|18|shape-transition / シェイプトランジション|斜めの形から次の面を登場|
|19|liquid-transition / リキッドトランジション|波状の輪郭で面を表示|
|20|zoom-through / ズームスルー|局所の面に円形の窓と拡大を組み合わせる|
|21|flip / フリップ|実要素を3D回転で登場。裏面の情報はアプリの実DOMにする|
|22|light-sweep / ライトスイープ|装飾の光を一度通す|
|23|glitch / グリッチ|点滅させず、最低900msで短い変位と色ずれ。通常の操作の既定にはしない|
|24|impact-shake / インパクトシェイク|小さな対象の揺れ。全画面は揺らさない。エラーは文でも示す|

装飾を持つ対象は子spanを入れられるラッパーを推奨。既にtransform/translateを持つ対象は専用の子ラッパーに付けるとレイアウトの変換と分けられる。line-draw、parallax、kinetic、SVG morphに必要な対象がない場合はTypeErrorで失敗し、途中の変更を解除する。

## 参考・原則・利用条件

- ユーザー提供 `1000000440.png` / `1000000438.mp4` / `1000000439.mp4` を視覚確認。名称と用途の検討材料で、コード/素材は再配布していない。
- [MDN Element.animate](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) / [Animation.cancel](https://developer.mozilla.org/en-US/docs/Web/API/Animation/cancel)：2026-10-14に本文取得確認。Web Animationsの作成・解除とPromiseの扱い。
- [W3C SC2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)：同日に本文取得確認。非必須motionの省略。AAAの個別要求であり全体のAAA認定ではない。
- [W3C SC4.1.3](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html)：同日に本文取得確認。focusを動かさない状態通知。
- 時間・曲線・強さ・図形・組み込みの設計はandm-original。研究の値からのToken変換なし。公式Seriesの未確認を「仕様なし」にしない。
- 外部依存・通信・動画再生なし。既存のUNLICENSEDを維持。npmへの公開は行わない。正式Core採用、効果の優越性、人間の体験評価は未決。

## 実ブラウザ検証

`scripts/check-motion-graphics.mjs`、Chromium153。24種類×14 Series×320/390/768/1280px＝1,344ケースで、表示・開始/中断・文字/スタイル/一時装飾の解除・横はみ出しを確認。全24の自然完了とreduced motion、意味のある値・開閉の更新、保存/エラー時の入力保持、focus-required/閉じた後のfocus復帰、開閉中断の着地、再入・イベント解除・destroy、キーボード、タッチ、390px/root文字200%を確認。

JavaScript例外と新規Labの外部リクエストは0。色ずれ・粒・masked shapes・文字/図形変化は目視し、Coreに自動採用しない。iOS/Android実機、Safari、支援技術、全色コントラスト、実際のプロダクトでの反復評価は未確認。
