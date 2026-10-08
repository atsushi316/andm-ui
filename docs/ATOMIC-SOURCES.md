# 小さな部品・タイポグラフィの仕様と根拠

確認日：2026-10-08。既存の DESIGN.md、.cursorrules、責務 README、research/analysis の全シリーズの記録を照合。ここは確認した一次資料からの要約と andm の採用判断であり、公式デザインシステムの完全再現ではない。

## 文字の契約

用途は display / headline / title / body / body-small / label / caption / code / action。各用途に size、line-height、weight、tracking を持つ。書体は heading / body / code で指定できる。h1〜h6 の意味と視覚スタイルは分離し、クラスだけで見出し階層を決めない。

既存 font-size-sm/md/lg と Button のサイズ契約は維持。action は各シリーズの既存操作ラベルを参照する。本文を Button の字重や行高へ流用しない。rem はブラウザの既定16pxを基準とした対応付け。root の文字サイズは固定しない。フォントファイルは同梱・自動ダウンロードしない。端末に無い場合は代替書体になる。

## シリーズ別の一次資料と対応

| Series | 再確認した一次資料 | 今回の対応付け・限界 |
| --- | --- | --- |
| M3 Expressive | [Google Material Web v0.192 typescale](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-sys-typescale.scss)、[typeface](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-ref-typeface.scss)、[Compose M3](https://developer.android.com/develop/ui/compose/designsystems/material3) | Web の display-large / headline-large / title-large / body-large / body-medium / label-large / body-small を対応。57/64、32/40、22/28、16/24、14/20、14/20、12/16。title-large はWeb値の400。既存分析のMedium表記と混同しない。Roboto、字間もWeb値。Expressiveの強調版全スケールの再現ではない。codeは独自。 |
| DADS | [テキストスタイル一覧](https://design.digital.go.jp/dads/foundations/typography/text-style/)、[概要](https://design.digital.go.jp/dads/foundations/typography/) | Dsp-48B-140、Std-32B-150、Std-24B-150、Std-16N-175、Std-16N-170、Dns-16B-130、Dns-14N-130、Mono-16N-150。役割選択はandm。captionの14pxは補足に限定。操作は既存Oneline契約。 |
| Fluent 2 | [Typography](https://fluent2.microsoft.design/typography) のWeb表 | Display 68/92、Title 1 32/40、Subtitle 1 20/26、Body 1 14/20、Body 1 Strong 14/20、Caption 1 12/16。Windows/macOS/iOS/Androidの値と混ぜない。字間とcodeは独自。 |
| Carbon | [Type sets](https://carbondesignsystem.com/elements/typography/type-sets/) | heading-07 54/64/300、heading-05 32/40/400、heading-03 20/28/400、body-01 14/20/400、label-01 12/16/400、code-01 12/16/400。body字間.16px、label/code .32px。displayへのheading-07割当はandm。fluid表示やexpressive全体系は実装しない。 |
| Atlassian | [Typography](https://atlassian.design/foundations/typography/) | heading.xxlarge 32/36、xlarge 28/32、medium 20/24、body 14/20、body.small 12/16、code 12/20。見出し700。labelへのbody Medium割当はandm。字間0は独自補完。 |
| USWDS | [Font size](https://designsystem.digital.gov/design-tokens/typesetting/font-size/)、[Line height](https://designsystem.digital.gov/design-tokens/typesetting/line-height/) | 3xl48、xl32、lg22、sm16、2xs14。行高2=1.15、3=1.35、5=1.62を用途へ割当。公式は書体別に正規化するため、表示pxをremへ置く本実装はandm対応付け。公式の最終CSSそのものではない。字間とcodeは独自。 |
| Spectrum 2 | [公式入口](https://spectrum.adobe.com/)、[Attention hierarchy](https://spectrum.adobe.com/foundations/attention-hierarchy)。旧typography URLは取得失敗。 | 階層の考え方は確認。役割別のサイズ・行高の数値は未確認。今回の新しい文字ロールはBaselineで補完し、既存のAdobe Cleanスタックと操作ラベルは維持。公式再現と表示しない。 |
| Apple | [HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography) はJavaScript必須表示のみ | 本文から公式値を取得できず未確認。既存システムフォントを維持し、新しいロールはBaselineの独自補完。ptをCSS pxへ推測変換しない。 |
| Baseline / Soft / Dense / Technical / Editorial / Playful | DESIGN.mdと既存Series CSS | andm独自。Softは本文の余裕、Denseは情報密度、Technicalは等幅、Editorialは大きい本文と行間、Playfulは見出しの強さを設計。外部の公式値ではない。 |

本文の再取得に成功した項目と、既存分析から維持した項目を区別している。今回変更しない既存の色・形・動きまで再検証済みとは主張しない。

## 小さな部品の意味と独自値

- [W3C：Labels](https://www.w3.org/WAI/tutorials/forms/labels/)：labelのforとinputのidを関連付ける。必須表示はrequiredとセット。placeholderをラベルの代わりにしない。
- [W3C：Notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)：エラーの説明と修正方法を伝え、入力に関連付ける。Galleryはaria-invalid、aria-describedby、入力へのfocusで実演。検証ロジックは消費側。
- [W3C APG：Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)：Native button、操作名、Enter/Space、toggleのaria-pressed。お気に入りの名前は選択後も変えない。
- [DADS：Icon accessibility](https://design.digital.go.jp/dads/foundations/icon/accessibility/) と [Fluent Iconography](https://fluent2.microsoft.design/iconography)：装飾と意味を区別。小さい記号と操作領域を混同しない。本体のSVG14種は独自の線画で、公式アイコンではない。
- [DADS：Link text](https://design.digital.go.jp/dads/foundations/link-text/)：リンクは本文と見分けられる下線を持つ。新しいタブを開く例には説明を付ける。visited色の既定はprimaryと同じで、独自トークンから変更可能。
- [W3C：Images](https://www.w3.org/WAI/tutorials/images/)：意味のある画像には代替文、装飾には空のalt。クロップ用のGallery画像は診断用fixtureであり公式素材ではない。
- [USWDS：File input](https://designsystem.digital.gov/components/file-input/)：入力にラベルと説明を付ける。andmは標準input type=fileの見た目のみ。送信・アップロード・形式検証はアプリの責務。

Iconの16/20/24px、線幅1.75、IconButtonの最小44px、リンクの下線、Statusの点、Code/Kbdの囲い、画像比率はandm独自仕様。すべての公式Seriesの部品寸法を再現した値ではない。44pxは独自のタッチ向け既定であり、一律のWCAG AA要件という意味ではない。CSS-firstを維持し、Native HTMLとクラスをAPIとする。

## 既存部品への反映

カード・面・ダイアログ・ドロワー・ポップオーバーの見出しはtitle、本文・表・リスト・アコーディオン・入力はbody、入力ラベル・通知見出しはlabel、説明・エラー・補足はcaption、操作はaction。読み取り用の本文は通常400で、ボタンの700や行高1を継承させない。入力とボタンは文字拡大時に高さが伸びる。選択状態などの固有強調は既存仕様を維持する。

## 確認結果

検証結果は ATOMIC-INVENTORY.md に記録する。iOS/Safari実機、スクリーンリーダー、XRの実機はこの変更で確認していない。
