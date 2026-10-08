# andm-ui

CSS-first の小さな UI ライブラリーです。Native HTML + `andm-*` class が第一級 API。Framework wrapper / Storybook は含みません。

## 目的

複数の個人アプリのために、目的・利用者・世界観に合う構成と UI を素早く提案、実装、検証する。明快な UI、没入・演出を優先する独自 UI、AR / VR の研究を扱う。[開発方針](docs/EXPERIENCE.md)も参照してください。

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
| Apple | `andm-series--apple` | 今の Apple の画面に近い、案内や設定 |
| Spectrum | `andm-series--spectrum` | 業務の画面。境界がはっきりして、詰めすぎない |
| Fluent 2 | `andm-series--fluent` | 慣れた操作で、仕事に集中する画面 |
| Carbon | `andm-series--carbon` | 製品の画面。角は立て、青で主操作を示す |

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
# http://127.0.0.1:4180/gallery/
```

製品 Gallery は必ず `dist/style.css` を参照します。`npm start` と `npm run gallery` は、起動前に build します。`dist/` は Git に含まれないので、build なしで HTML だけ開くと見た目が出ません。
ルート `/` は `/gallery/` へ誘導します。ポートは `4180` 固定です。すでに Gallery が応答しているときは、その URL を表示して終了します。別プロセスが 4180 を塞いでいて Gallery ではない場合は、そのプロセスを止めてから再実行してください。

## 構成

```
src/styles/
  tokens/       Foundation（primitive / semantic）
  controls/     Control（入力・選択・操作の部品）
  marks/ …      表示・通知・ナビゲーションなどの部品
  series/       Design Language（親クラスの Token remapping）
gallery/        Design System Explorer（dist 参照）
examples/       消費側の最小例
research/       研究ワークスペース（npm 非含有）
DESIGN.md       デザイン原則・Design Space
```

`research/` は Build 外です。削除しても本体は build 可能です。npm 公開対象は `package.json` の `files` で制御し、`research/` は含めません。

## デザイン原則

詳細は [DESIGN.md](./DESIGN.md)。平均 UI への収束を禁止し、Design Space 上の複数方向を保持します。

## 部品と体験の検証

入力・選択、通知、ダイアログ、表、ナビゲーションなどは Gallery で確認できます。Chip は `andm-chip`（選択は `aria-pressed`）、FAB は `andm-fab`。JS の操作は消費側で実装します。

`http://127.0.0.1:4180/gallery/lab/` の体験ラボでは、目的からルールに基づく構成候補と検証項目を提示し、明快・没入・大胆の独自試作を比較できます。メモは JSON で書き出せます。入力は自動保存されません。AR / VR は研究計画のみで、XR ランタイムは未実装です。

`npm run audit:tokens` は必須の未定義トークン参照を検出します。描画や使いやすさの評価は別途必要です。

Gallery は日本語検索、携帯用の開閉メニュー、部品一覧、シリーズ選択、先頭見本の HTML コピーに対応します。確認範囲は画面内の「出典」から読めます。[Chip / FAB の根拠](docs/COMPONENT-SOURCES.md)、[Gallery 改善の根拠](docs/GALLERY-REVIEW.md)。

Chip / FAB 固有の寸法・形は andm 独自仕様です。全シリーズの公式 Chip / FAB を再現したものではありません。FAB は `andm-fab` 単独で使います。

## 小さな部品と文字の体系

本文・見出し・操作ラベルを別の用途として定義します。`.andm-text` と用途modifier、Icon/IconButton、Link、Label/Helper/Error、Required/Optional、Status、Code/Kbd、Image、File inputを使えます。[整備範囲とAPI](docs/ATOMIC-INVENTORY.md)、[シリーズ別の一次資料・独自補完](docs/ATOMIC-SOURCES.md)を参照。

```html
<div class="andm-series--dads">
  <h2 class="andm-text andm-text--title">プロジェクト</h2>
  <p class="andm-text">次に試したいアイデアを残しましょう。</p>
</div>
```

フォントファイルは同梱しません。Apple/Spectrumの新しい文字ロールの数値はBaselineによる独自補完です。全シリーズの公式部品を完全再現するものではありません。

確認用静的Galleryは `npm run build` の後に `node scripts/export-gallery.mjs /absolute/output/directory` で書き出せます。変更したCSS/JSはキャッシュ識別子付きで配信します。
