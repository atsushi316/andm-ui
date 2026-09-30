# M3 Expressive

未実装の UI をあとで再現するためのルール。確認日は 2026-09-29。公式アセットは埋め込まない。推測で公式値を足さない。

## 公式 URL

- 指定の入口: https://m3.material.io/get-started  
  取得結果はタイトルのみ。本文は「This website requires JavaScript.」で検証不能。
- https://m3.material.io/ も同じ。検証不能。
- https://m3.material.io/blog/building-with-m3-expressive も同じ。検証不能。
- https://m3.material.io/develop/android/jetpack-compose も同じ。検証不能。
- 本文が取れた公式ページ: https://developer.android.com/develop/ui/compose/designsystems/material3  
  このページは Material Design 3 in Compose。冒頭で M3 Expressive を Material Design 3 の拡張と書いている。以降の数値は、このページの本文に出た M3 の既定値。Expressive 専用のボタン寸法としては書かれていない。

## 思想・概念

https://m3.material.io/ と、get-started、building-with-m3-expressive、Jetpack Compose の入口はタイトルのみで本文が取れない。検証不能。思想として書けるのは、本文が取れた次のページだけ。

- https://developer.android.com/develop/ui/compose/designsystems/material3

このページの本文から要約する。

- M3 Expressive は Material Design 3 の拡張である。テーマ、コンポーネント、モーション、タイポグラフィなどの更新を含み、研究に基づく、と本文にある。目的は、使いたくなる魅力のある製品を作れるようにすること。
- Material You の personalization として dynamic color を扱う。アルゴリズムが壁紙から色を作り、アプリとシステム UI に当てる。
- テーマは color scheme、typography、shapes の3つ。変えると、使う M3 コンポーネントに反映される。
- 強調は、surface / surface-variant / background と対応する on-color の組み合わせか、字重で足す。
- 高さは主にトーナルカラーの重ねで表す。影も使う。暗いテーマの重ね色は primary から来る。
- 個人向けの調整と柔軟さを勧める。部品の色には既定があるが、必要なら変えられる、と本文にある。
- 部品に組み込まれたアクセシビリティ基準は、インクルーシブな製品設計の土台である。dynamic color は色のコントラスト基準を満たすように作られている。カスタムするときは、on-primary を primary の上に置くなど、対応する色ロールを使う。

形状のモーフィング、spring、感情に働きかける戦術の本文は、このページに無い。m3.material.io 側は本文が取れないため、そこは検証不能のまま。

## 考え方（読めた範囲）

Jetpack Compose は Material You と Material 3 Expressive の実装を提供する。M3 Expressive は Material Design 3 の拡張で、テーマ、コンポーネント、モーション、タイポグラフィなどの更新を含む。dynamic color も扱う。用語 Material Design 3、Material 3、M3 はこのページでは同じものを指す。

テーマは color scheme、typography、shapes の3つ。変えると M3 コンポーネントに反映される。

## color

本文にあるルール:

- カラースキームの基礎は 5 つのキーカラー。それぞれ 13 トーンのパレットにつながる。
- Primary は主要なボタン、アクティブ、持ち上がった面のティント。
- Secondary はフィルターチップなど、主役より弱い部品。
- Tertiary は対比のアクセント。
- 強調は surface / surface-variant / background と、対応する on-color の組み合わせ。
- 無効状態は on-x の色にアルファを使うことが許容される、と本文にある。アルファの数値は無い。
- dynamic color は Android 12 以上。壁紙から light / dark を作る。無いときはカスタムの light / dark に戻す。

本文のコード例にある `0xFF476810` などは Reply サンプルの生成例。M3 の標準色としては採用しない。

## typography

本文の既定スケール（Font、Size / Line Height）:

| 名前 | 書体と太さ | Size / Line Height |
|------|------------|--------------------|
| displayLarge | Roboto | 57 / 64 |
| displayMedium | Roboto | 45 / 52 |
| displaySmall | Roboto | 36 / 44 |
| headlineLarge | Roboto | 32 / 40 |
| headlineMedium | Roboto | 28 / 36 |
| headlineSmall | Roboto | 24 / 32 |
| titleLarge | Roboto Medium | 22 / 28 |
| titleMedium | Roboto Medium | 16 / 24 |
| titleSmall | Roboto Medium | 14 / 20 |
| bodyLarge | Roboto | 16 / 24 |
| bodyMedium | Roboto | 14 / 20 |
| bodySmall | Roboto | 12 / 16 |
| labelLarge | Roboto Medium | 14 / 20 |
| labelMedium | Roboto Medium | 12 / 16 |
| labelSmall | Roboto Medium | 11 / 16 |

グループは display、headline、title、body、label。それぞれ large、medium、small。強調は字重でも足せる、と本文にある。Roboto のファイルは置かない。

## spacing

このページの本文に spacing の px スケールは無い。検証不能。

## radius

本文は、形状スケールを Extra Small、Small、Medium、Large、Extra Large とし、例として次を置いている。

- Extra Small 4dp
- Small 8dp
- Medium 12dp
- Large 16dp
- Extra Large 24dp

RectangleShape は角なし。CircleShape は円。単位は dp。px への換算は本文に無い。

## elevation

本文は、M3 の高さは主にトーナルカラーの重ねで表し、影も使う、と書く。暗いテーマの重ね色は primary から来る。数値の dp や影の式は無い。

## motion

2026-09-30 に https://m3.material.io/styles/motion/overview/how-it-works の本文を取得した。Expressive は spring で、easing と duration の旧方式を置き換える、とある。本文にある spring 名は `md.sys.motion.spring.fast.spatial` だけ。stiffness、damping、ms の数値は無い。検証不能。

https://m3.material.io/styles/motion/easing-and-duration/tokens-specs には short1 50ms から long4 600ms と cubic-bezier がある。同ページは、これは Expressive へ更新していないチーム向けで、もう保守しない、と書く。Expressive の速度としては採用しない。

採用: 速度トークン（short1–short4）は差し替えない。押下時の角の変化は既存の Button に残している。spring の公式値ではない。

## コンポーネント

本文は、ボタン、チップ、カード、ナビゲーションバーなどがテーマに従う、と書く。カードの例は medium、フローティングアクションボタンの例は large。ボタンの高さ、余白、押下時の角の変化は本文に無い。

## andm の `andm-series--expressive` に今入っている数値

実装にある値。今回取得した本文には無いので、公式値としては未確認のまま残している。

- 高さ 40 / 56 / 96px
- 横余白 16px
- 静止の角は pill。押下で角を変える（中は 12px。小 8px、大 16px は button.css）
- 字重 500
- アイコン 20px
- 色は Baseline のまま

## まだ Button 以外を作るときに使うルール

- テーマは色、字、形の3系統で部品に渡す。
- 形は 4 / 8 / 12 / 16 / 24dp の5段から選ぶ。カードは medium、FAB は large、が本文の例。
- 字は上の15段。全部を使わなくてよい、と本文にある。
- 強調は面の色の組み合わせか、字重。
- dynamic color が使える環境では壁紙由来にし、無ければ固定の light / dark。

## 検証不能

- https://m3.material.io/get-started と、上記の m3.material.io 各ページ。本文なし。
- Expressive 固有のボタン高さ、角のモーフィング、spring の数値。
- spacing のスケール。
- elevation の dp と影の式。
- motion の duration と easing。
