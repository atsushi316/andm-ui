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

### Direction デモ（親スコープ）

Series 本機能ではなく比較・プロトタイプ用の Token remapping です。既存 variant クラスはそのまま。

```html
<!-- Expressive: 強調・丸み -->
<div class="andm-series--expressive">
  <button class="andm-btn andm-btn--filled andm-btn--md">保存</button>
</div>

<!-- DADS: 行政・公共。公開色の解釈。公式アセットの再配布ではない -->
<div class="andm-series--dads">
  <button class="andm-btn andm-btn--filled andm-btn--md">申請する</button>
</div>
```

製品 Gallery（`/gallery/`）では、用途を見て比べて選びます。andm の方向は Baseline。DADS と M3 Expressive は参考体系です。使える部品は Button で、単体と申請フォームの中を見られます。

## 開発

```bash
npm run build      # src/styles → dist/style.css
npm run gallery    # 製品 Gallery（要: 先に build）→ http://localhost:4173/gallery/
```

製品 Gallery は必ず `dist/style.css` を参照します（`src/styles` 直参照ではない）。
ルート `/` は `/gallery/` へ誘導します。ポートは `4173` 固定（使用中なら失敗します。既存の `serve` を止めてから再実行してください）。

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
