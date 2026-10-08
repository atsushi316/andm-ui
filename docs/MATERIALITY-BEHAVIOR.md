# Materiality & Behavior — Lab実装・AI再利用仕様

2026-10-08 / stimulus-v1 / `recommended: null` / Core採用未決。

[操作する](../gallery/lab/materiality-behavior/) · [使用例](../gallery/lab/materiality-behavior/example.html) · [検証記録](MATERIALITY-VALIDATION.md) · [出典判断](SOURCE-DECISIONS-MATERIALITY.md)

## 意味を分ける

- Materiality：人が見た目や反応から期待・知覚する性質。実際の物性を保証しない。
- Appearance：角・面・陰影などの観察可能な造形。
- Behavior：入力、解除、取消、再入力にどう反応するか。
- Feedback：受付と処理結果を伝える出力。Motionだけでなく文字・状態を含む。

初期対象はcompliance（押し込みやすさ）とelasticity（復元の弾性）。丸い造形が柔らかく感じられること、弾性的な復元が好まれることは未検証仮説。Rigid/Viscous/Light/Heavy/Glass-likeは将来研究であり今回は実装しない。

既存Design Spaceは造形の記述、Motion Characterは反応の傾向、Motion PatternはTrigger×Effect。今回はpress×compress、release×復元をLabで表す。復元はcompressから通常状態への遷移であり、新しいCore Pattern APIを足していない。`src/styles/patterns/`はタスク構成で、Motionの置き場ではない。

## 4条件と統制

| 条件 | Appearance | Release |
|---|---|---|
| A | 角2rem（丸い） | 弾性的 |
| B | 角2rem（丸い） | 単調 |
| C | 角0.25rem（角がある） | 単調 |
| D | 角0.25rem（角がある） | 弾性的 |

色、ラベル、寸法、背景、陰影、押下scale .94、press 80ms、release 480msを統一。復元curveはelastic `cubic-bezier(.34,2.5,.3,1)`、monotonic `cubic-bezier(.2,0,.2,1)`。これらは独自の局所刺激値で、論文の測定値、物理spring、公式Series、最適値ではない。短い押下は最大変位まで達しないため、初期探索では少し保持してから離すことを案内する。定量評価では保持時間もイベントログから確認する。

同じ時間でも知覚される速度は変わり得る。幾何学的な軌道差が測れたことと、人が弾性や硬さの違いを感じたことを分ける。

## Buttonの操作契約

Native `<button>`、`.andm-btn`と既存variantを使う。Labの`.mb-button`は公開APIではない。button自身の操作領域とfocusを固定し、装飾span `.mb-face`のみ変形する。文字は変形しない。`:active`でCoreのscaleが重ならないよう局所的に解除する。

| 状態 | 契約 |
|---|---|
| Idle/Hover | 操作可能。hoverで共通の色を強調。hoverがなくても操作できる |
| Press | 共通の視覚圧縮と「受付中」。まだ成功と表示しない |
| Release | 視覚面を条件別に復元。復元しただけで保存成功としない |
| Confirm | Native clickまたはform submitの成立で共通結果を通知。animation/transition終了を待たない |
| Focus | Native Tab順、見えるfocus。Enter/Spaceはブラウザのactivationを使う |
| Disabled | Native disabled。変形・成功を起こさない。説明と状態を残す |
| Cancel | pointercancel、領域外での解除、blur、Escape、window blurで圧縮を解除。未成立操作を保存しない |
| Re-entry | 復元中でも次の操作を受ける。操作ロック・二重click生成をしない |

参照controller `enhanceButton(button, {onState,onConfirm})`は、CSSの圧縮保持と解除/取消を管理するLab限定例。`onState(state, kind)`のstateは`press` / `release` / `cancel`、kindはpress時だけ`keyboard`またはpointerType（mouse/touch/pen等）。`onConfirm({input, at})`のinputは`pointer`または`keyboard-or-assistive`、atはperformance.now()。Native clickを合成しない。controllerを破棄する際は`destroy()`を呼び、window listenerとobserverを解除する。Enter長押しのrepeatはこの実験では抑止する。EnterのNative activationはkeydown時、Spaceはkeyup時になり得るため、両者の成功時点を人工的に揃えず、同じ入力方式の条件間で同等に扱う。

`onConfirm`は**Native activationの通知であって、実サーバーへの保存成功ではない**。実アプリでは保存処理の結果を待って成功を表示し、失敗・loadingを独立に管理する。required入力を使うformではclickの時点で成功と言わず、妥当なsubmitから処理する。リンクはNative `<a>`のままにし、このButton controllerを強制しない。

## 要求からコードへ

要求：「柔らかい印象のButton。押下時には明確な受付を示し、離すと弾性的に復元する。ただし保存の完了表示はモーションと独立させる」。

判断：Buttonの意味・Native操作をReuseし、造形と視覚面のcompress/releaseをExtend。既存独自Soft Seriesへ研究挙動を上書きすることもしない。背景や文字に公式Seriesを必要としない例としてBaselineを利用する。Core ComponentをCreateする理由はない。

[動く最小form例](../gallery/lab/materiality-behavior/example.html)のHTML（CSSは既存Coreの後にLabのbutton.cssを読み込む）：

```html
<div class="mb-scope">
  <form id="draft-form">
    <label>メモ<textarea name="draft" required></textarea></label>
    <button type="submit" class="andm-btn andm-btn--filled mb-button"
      data-shape="round" data-return="elastic">
      <span class="mb-face" aria-hidden="true"></span>
      <span class="mb-label">下書きを保存する</span>
    </button>
    <p id="result" role="status">まだ保存していません。</p>
  </form>
</div>
```

```js
import {enhanceButton} from '../gallery/lab/materiality-behavior/button.js';
const form = document.querySelector('#draft-form');
const button = form.querySelector('button');
// 視覚反応のみ。clickの時点で成功を表示しない。
const visual = enhanceButton(button);
form.addEventListener('submit', event => {
  event.preventDefault();
  // 模擬処理。実アプリは処理結果に基づき成功/失敗を通知する。
  document.querySelector('#result').textContent = '下書きを保存しました（模擬）';
});
// 画面を破棄するとき：visual.destroy();
```

上のimportはリポジトリrootのdocsから参照する説明用パス。実ページではHTML/JSの配置に合わせる。npmがLab controllerを配布するわけではない。

独立生成の確認で、Enterのclick時に視覚圧縮を解除する誤用と、取消後に支援技術のclickまで無効にする誤用が見つかった。Enter成立時もkeyupまで視覚Pressを保持し、取消はその入力に属する保留activationだけを抑止する。次の独立したactivationは受け付ける。

局所CSSの核（全契約・Reduced Motionを含む実体は[button.css](../gallery/lab/materiality-behavior/button.css)）：

```css
.mb-scope .mb-button { position: relative; isolation: isolate; transform: none; }
.mb-scope .mb-face {
  position: absolute; inset: 0; z-index: -1; pointer-events: none;
  background: #245348; border-radius: 2rem;
  transform: scale(1);
  transition: transform 480ms cubic-bezier(.34, 2.5, .3, 1);
}
.mb-scope .mb-button[data-held="true"] .mb-face {
  transform: scale(.94); transition: transform 80ms ease-out;
}
@media (prefers-reduced-motion: reduce) {
  .mb-scope .mb-button .mb-face,
  .mb-scope .mb-button[data-held="true"] .mb-face {
    transform: none; transition: none;
  }
}
```

Coreの背景・shadow・`::before`・`:active`のtransformは局所クラスで解除し、透明なbutton上の視覚面に表現を限定する。Reduced MotionのselectorはPress selector以上の詳細度にして実際の押下中も確認する。

これは核の抜粋であり単独で全Button styleを置換する仕様ではない。独立生成する場合も、下記の契約と境界から実装し、見た目だけをコピーして適合済みとしない。

## 再利用する際の判断

1. Intent：何を達成し、どの結果を確信させる必要があるかを固定する。
2. Component：既存の意味・状態・操作が足りればReuse。見た目/反応だけの違いは局所Extend。
3. Source：公式Seriesを指定されたら、その版・platformの仕様を優先。公式の値や挙動を変えた範囲は独自派生と記す。
4. Create：既存契約で表せない操作が本当にある場合だけLab限定で検討。再利用率を目的にしない。
5. Validate：keyboard、cancel、rapid input、result、Reduced Motionを別々に確認する。

今回の幾何学/曲線を既存公式Seriesに適用して「公式準拠」と呼ぶこと、動きが自然だから安全・快適と断定すること、Materialityを新Seriesとして量産することはしない。

## やってはいけない例

```js
// NG: 復元終了を処理成功と誤認。取消や実際の保存失敗でも成功になる。
button.addEventListener('transitionend', () => showSaved());
// NG: Native Enter/Spaceのclickと合成clickが二重成立する。
button.addEventListener('keyup', () => button.click());
// NG: 弾む間の操作をロックして、反応の比較に処理待ちを混ぜる。
button.disabled = true; setTimeout(() => button.disabled = false, 480);
```

無効なformのclickで成功表示する、hoverだけで説明を出す、色/音/振動だけで状態を示す、button自身を移動してhit targetを変える、ResearchのJSONをブラウザにfetchして刺激値を生成する、といった実装も避ける。

## 評価モードとデータ

表示名は中立ID、4条件を一度ずつFisher-Yatesでランダム提示。条件との対応は終了後またはexportで確認できる。CSS/ソースを調べれば条件は分かるため厳密な盲検ではない。単一セッションのランダム化は母集団のcounterbalanceを保証しない。

操作前は予想する押し込みやすさ/復元、入力方式/以前の接触を記録し、模擬保存後は期待一致・好み・明確さを独立に7段階で記録する。1回成立後も再操作可能。session内メモリのみ、外部送信/自動保存なし。明示的なJSON downloadのみ。exportは`recommended: null`と採用未決を維持する。

各trialに入力イベント・時刻・動きの設定・実際のactivation入力を記録。motion設定の途中変更はそのまま残す。OS/手動でstaticにした記録を弾性条件の知覚比較として扱わない。pointerログは秒精度の計測保証や実機力覚の測定ではない。

## アクセシビリティ

Reduced Motionで変形を止めても、共通の色・focus・受付文字・成功表示は残す。OS設定を手動で解除する機能はない。音・振動は今回は実装しない。長い日本語は折り返し、文字は変形しない。評価の次の見出しへfocusを移し、必須回答をNative validationで確認する。WCAG 2.2の該当A/AAと追加の動き停止条件を確認する。2.3.3はAAAで、AA全体への適合保証ではない。

## 既存ライブラリとの接続評価

| 項目 | 今回の判断 |
|---|---|
| Button API | Native button + classで足りる。公開APIは変更不要 |
| Character | elasticity、復元、interruptibilityの記述があるとAIへ伝えやすい。新enumやTokenを今は追加しない |
| Pattern | press×compressとreleaseの復元で表現可能。成功はfeedbackとして独立 |
| Component-local Token | 既存press-scaleだけでは安定したtarget/label面と復元軌道を表せないが、1実験のため共通追加しない |
| Materiality layer | 独立実装レイヤーは不要。Design Space/Experienceの研究記述に接続 |
| Labに残すもの | 局所刺激値、評価順/質問、controller、motion停止設定、模擬保存 |
| 次の候補 | 複数用途で必要なら視覚面・release/interrupt契約を共通化する案。人間の採用と回帰検証が先 |

確認済み実装とユーザー知覚の仮説は[検証記録](MATERIALITY-VALIDATION.md)で分ける。正式採用の値は今回作っていない。
