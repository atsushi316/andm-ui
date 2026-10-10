# 任意のNative DOM操作API

CSSは単独で利用可能。必要な画面だけ `@atsushi316/andm-ui/behavior` をimportし、明示的に初期化する。Framework・自動初期化・ResearchのRuntime依存はない。既存CSS APIは変更していない。以下はandm-ui独自の基本契約で、公式SeriesのJS/API再現ではない。

```js
import {combobox} from '@atsushi316/andm-ui/behavior';
const controller = combobox(document.querySelector('#city'), {
  name: 'city', items: [{value: 'tokyo', label: '東京'}]
});
// アプリが部品を破棄するときに呼ぶ
controller.destroy();
```

```html
<div id="city" class="andm-combobox">
  <label for="city-input">都市</label>
  <input id="city-input" class="andm-textfield__input" autocomplete="off">
  <ul class="andm-combobox__options" role="listbox" aria-label="都市候補" hidden></ul>
  <p role="status" data-status></p>
</div>
```

完全なHTMLの参照実装: [parts.json](../gallery/completion/parts.json)。初期化とアプリ側の模擬処理: [behaviors.js](../gallery/completion/behaviors.js)。研究ページをRuntimeから読み込まない。

| controller | DOM契約・主要オプション | 操作・返り値 |
| --- | --- | --- |
| combobox | input、listbox、複数時data-tags。items/value/label、multiple、name、allowCustom | IMEの編集中は確定しない。上下・Enterで選択、Escape閉鎖、Tab移動。getValue/setItems |
| tabs | tablist内tabとaria-controls先tabpanel | 左右/Home/End、roving focus、自動選択 |
| menu | Native popover、menuitem、trigger | 開閉、上下/Home/End、文字検索、Escape/Tab |
| tree | tree/treeitem、aria-level/expanded、子group。grid:trueでtreegrid | 上下・左右、親子移動、展開、選択 |
| toolbar | ボタン集合 | 左右とHome/End、無効ボタンを除外 |
| calendar | tbody、data-month、前後月ボタン、status。value/range/min/maxはISO日付 | 日・週移動、PageUp/Down、Shiftで年、Home/End、単一Tab位置。getValue/setValue（不正日付は拒否） |
| dataTable | Native table、検索/件数/ページ/選択/列制御。rows/columns/key/pageSize | sort/filter/page/selection、部分選択、状態表示。setRows/setState/getSelection |
| form | Native form、エラー集約、data-status | field検証、エラー先へのリンク、非同期保存/取消。save callbackはアプリ側 |
| characterCount | Native textarea/inputとカウンター、max | Unicode文字数と上限検証 |
| range | 2つのNative range | 両端の逆転防止、Nativeキー操作 |
| inlineEdit | 表示/編集/保存/取消DOM、save callback | 非同期保存、取消、focus復帰 |
| upload | Native file、drop area、ファイル一覧、upload callback | 型/サイズ検証、progress、再試行/取消/削除。実転送はアプリ側 |
| dialog / popover | Native dialog/popoverとtrigger | Native開閉、Escape、aria-expanded、focus復帰 |
| tooltip | trigger、role=tooltip、aria-describedby | hover/focus、内容へのpointer移動、Escape |
| carousel | slide群、前後/停止ボタン、autoplayは明示的に有効化 | 手動移動、focus/hover/非表示/Reduced Motionで自動送り停止 |
| tour | Native dialog、steps、trigger | 前/次/スキップ、Escape、focus復帰 |

controllerは `destroy()` を持つ。Native click・form validation・popover/dialogの既定動作を優先する。`andm:change` / `andm:selection` / `andm:bulk` 等のCustomEventをアプリへ通知する。必須DOMを省略した初期化は契約外。非同期callbackはAbortSignalを受け取り、アプリ側でも中止に従う。成功をモーションの終了まで遅延させない。

## 境界と未対応

見本はローカル模擬処理。バックエンド、認証、実アップロード、仮想スクロール、全多言語・RTL、全アクセシビリティ環境は提供していない。Calendarは日付のみで時刻/タイムゾーンPickerではない。Comboは小規模のローカル候補で、大規模非同期検索や仮想リストを含まない。複数選択での必須検証はアプリ側で選択値を検証し、空の検索inputにrequiredを付けない。

公式SeriesのTokenを使うことと公式部品の全仕様再現は別。今回追加したレイアウト・固有数値はandm-original。共通Tokenの新設、公式Series CSS変更はなし。実ブラウザ確認の範囲は [検証記録](COMPONENT-COMPLETION-VALIDATION.md)。
