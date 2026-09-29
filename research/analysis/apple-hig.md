# Apple（Human Interface Guidelines）

未実装の UI をあとで再現するためのルール。確認日は 2026-09-29。公式アセットは埋め込まない。推測で公式値を足さない。

## 公式 URL

- 指定の入口: https://developer.apple.com/jp/design/human-interface-guidelines
- 取得結果はタイトル「ヒューマンインターフェイスガイドライン | Apple Developer Documentation」だけ。本文は「This page requires JavaScript.」で検証不能。

英語の入口、color、layout、materials、buttons も同じ状態で、タイトル以外は検証不能。確認した URL:

- https://developer.apple.com/design/human-interface-guidelines
- https://developer.apple.com/design/human-interface-guidelines/color
- https://developer.apple.com/design/human-interface-guidelines/layout
- https://developer.apple.com/design/human-interface-guidelines/materials
- https://developer.apple.com/design/human-interface-guidelines/buttons

## 思想・概念

書いていない。日本語の入口、英語の入口、color、layout、materials、buttons はタイトルだけで本文が取れない。本文が無いので、思想も原則も置かない。検証不能。

## 考え方

本文が取れないため、考え方は検証不能。

## color

検証不能。公式の色は書いていない。

## typography

検証不能。公式の書体サイズ、行高、字重は書いていない。

## spacing

検証不能。

## radius

検証不能。

## elevation

検証不能。影、ぼかし、マテリアルの数値は書いていない。

## motion

検証不能。

## コンポーネント

ボタンページは検証不能。高さ、余白、角、押下の変化は書いていない。

## andm の `andm-series--apple` に今入っている数値

公式本文からは未採用。入っているのはシステムフォントの名前だけ。

```css
-apple-system, BlinkMacSystemFont, "Hiragino Sans", "Segoe UI", sans-serif
```

これは HIG の測定値ではない。色、角、余白、高さ、境界、影、押下の縮小は Baseline のまま。SF のファイル、SF Symbols、ロゴは置いていない。

## まだ Button 以外を作るときに使うルール

本文が取れていないので、再現用の数値ルールは無い。次の UI を作るときも、本文が取れるまで色と寸法を公式値として足さない。

## 検証不能

日本語の入口、カラー、レイアウト、マテリアル、ボタン。英語の入口、color、layout、materials、buttons。いずれも本文なし。
