# andm-ui

CSS-first の小さな UI ライブラリーです。Native HTML + `andm-*` class が第一級 API。Framework wrapper / Storybook は含みません。

## 使い方

```bash
npm install @atsushi316/andm-ui
```

```js
import '@atsushi316/andm-ui/style.css'
```

```html
<button class="andm-btn andm-btn--filled andm-btn--md">保存</button>
```

### Button

| 種類 | クラス |
|------|--------|
| Block | `andm-btn` |
| Variant | `andm-btn--elevated` / `--filled` / `--tonal` / `--outlined` / `--text` |
| Size | `andm-btn--sm` / `--md` / `--lg` |
| Icon | `andm-btn__icon`（leading / trailing） |

状態はブラウザ標準（`:hover` / `:active` / `:focus-visible` / `:disabled`）で表現します。

### シリーズ（親スコープ）

Gallery で切り替えられます。同じ `andm-btn` に、親の Token を当てます。公式の全一覧ではありません。シリーズ別のボタンクラスはありません。

| シリーズ | 親クラス | 用途の目安 |
|----------|----------|------------|
| Baseline | なし | 汎用・中立 |
| Soft | `andm-series--soft` | 設定や案内など、落ち着いた画面 |
| Dense | `andm-series--dense` | 表やツールバーなど、情報が多い画面 |
| Technical | `andm-series--technical` | 境界をはっきりさせたい画面 |
| Editorial | `andm-series--editorial` | 記事や読み物 |
| Playful | `andm-series--playful` | 気軽な招待 |
| M3 Expressive | `andm-series--expressive` | 表現寄り・消費者向け |
| DADS | `andm-series--dads` | 行政・公共の分かりやすさ |

```html
<div class="andm-series--soft">
  <button class="andm-btn andm-btn--filled andm-btn--md">保存</button>
</div>
```

DADS はデジタル庁デザインシステムの公開情報の解釈です。ロゴや公式ファイルは含みません。

## 開発

```bash
npm run build      # src/styles → dist/style.css
npm start          # build してから Gallery を起動
# または npm run gallery
# http://127.0.0.1:4173/gallery/
```

製品 Gallery は必ず `dist/style.css` を参照します。`npm start` と `npm run gallery` は、起動前に build します。`dist/` は Git に含まれないので、build なしで HTML だけ開くと見た目が出ません。
ルート `/` は `/gallery/` へ誘導します。ポートは `4173` 固定です。すでに Gallery が応答しているときは、その URL を表示して終了します。別プロセスが 4173 を塞いでいて Gallery ではない場合は、そのプロセスを止めてから再実行してください。

## 構成

```
src/styles/     Design Tokens + CSS Components
gallery/        製品 Gallery（dist 参照）
examples/       消費側の最小例
research/       研究ワークスペース（npm 非含有）
DESIGN.md       デザイン原則・Design Space
```

`research/` は Build 外です。削除しても本体は build 可能です。npm 公開対象は `package.json` の `files` で制御し、`research/` は含めません。

## デザイン原則

詳細は [DESIGN.md](./DESIGN.md)。平均 UI への収束を禁止し、Design Space 上の複数方向を保持します。
