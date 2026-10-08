# 出典と補完の判断記録

方針・分類・追加用テンプレートは [SOURCE-FIRST.md](SOURCE-FIRST.md)。2026-10-08 に既存の代表的な判断を分類した。既存文書とコードの照合であり、ここでリンクされた公式本文を今回すべて再取得したという意味ではない。全宣言の棚卸しと全部品の再監査は [SOURCE-REAUDIT.md](SOURCE-REAUDIT.md)。公式値への全面移行と未取得本文の確認は未完了。以下の旧記録は履歴として保持する。

## apple-body-size-baseline

| 項目 | 記録 |
| --- | --- |
| Series / 対象 | Apple / 本文サイズ `--andm-type-body-size` |
| 実装 | `src/styles/series/apple.css` は書体のみ差替え。サイズは `src/styles/tokens/typography/roles.css` の共通値 `1rem` を継承 |
| 対象範囲 | Web の CSS rem。Apple プラットフォーム・公式版の値は未確認 |
| `sourceStatus` | `unverified` |
| 確認範囲 | [ATOMIC-SOURCES](ATOMIC-SOURCES.md)の Apple 行に、Typography 本文が JS 必須で未取得と記録 |
| `basis` | `andm-original` |
| 根拠 | [HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography)は取得未確認。今回は既存記録のみ。本文確認日 `null`。[Apple 分析](../research/analysis/apple-hig.md)と上記実装を照合 |
| 判断 | 既存 Baseline サイズを暫定維持。Apple の公式値・研究による欠落補完とは表示しない |
| 代案 | 未取得の pt 値を推測して CSS px へ変換する案は不採用 |
| `recommended` / 採用 | `true` / 既存採用の維持。今回 CSS 値は変更していない |
| 検証 | 記録と継承先の照合。今回の表示再検証・公式一致の検証は未実施 |
| 見直し | HIG Typography の本文取得成功時、対象プラットフォーム・版・文字ロールを確認して再評価 |

## search-field-group-spacing

| 項目 | 記録 |
| --- | --- |
| Series / 対象 | 全 Series / Search のラベル・入力の間隔 |
| 実装 | `src/styles/patterns/compositions.css` の `.andm-field` / `gap: var(--andm-space-2)` |
| 対象範囲 | Native HTML の Web 検索フォーム、CSS px、既存 Series の尺度を継承。共通の `--andm-space-2` は `src/styles/tokens/spacing/primitive.css` で `8px` |
| `sourceStatus` | 外部由来 Series は `unverified`（この間隔の公式値）。独自 Series は `not-applicable` |
| 確認範囲 | [COMPOSITION-SOURCES](COMPOSITION-SOURCES.md)に構造の根拠と独自の余白を区別して記録。寸法の確認・公式全体での欠落確認はない |
| `basis` | `andm-original` |
| 根拠 | 同文書と実装。andm の既存採用を今回照合。各公式の寸法本文は今回未確認。本文確認日 `null` |
| 判断 | 既存尺度を維持。構造の参考資料があっても、この間隔を全 Series の公式値とはしない |
| 代案 | 他社の間隔を全 Series へ一律コピーする案は不採用 |
| `recommended` / 採用 | `true` / 既存採用の維持。今回 CSS 値は変更していない |
| 検証 | 値・セレクタと旧記録の照合。過去の表示検証は同文書を参照。今回の表示再検証は未実施 |
| 見直し | 各 Series の検索・フォーム間隔の仕様と基礎尺度を確認したとき、Series 別に値と対応付けを再評価 |

新しい補完時には、上記の間隔の数値根拠と、近接などの原則を適用する判断を別々に記録する。今ある余白を後付けで「研究に基づく値」と呼び直さない。


## 2026-10-08 source-first-properties

以下は今回本文を取得できたプロパティだけの採用記録。確認日は **2026-10-08**、媒体は Web/CSS。`recommended: true`、採用済み。ソース原値は `official / specified`、andm の hook・用途へ写像した実装は `derived / specified`。これ以外のプロパティまで公式確認済みにはしない。

| ID / Series | 対象プロパティ・実装 | 出典の節・版 | 判断・代案・再評価条件 |
| --- | --- | --- | --- |
| fluent-radius / Fluent 2 | field/surface/menu 4px、badge2px、popover12px | [Shapes](https://fluent2.microsoft.design/shapes)「Corner radius」「Radius usage」。Fluent 2、細かな改訂版は記載確認できず | Rectangles4px→field/surface/menuは derived。Badges2px・popover12pxの用途値を対応。共通12pxの継承をやめる。用途別公式部品を確認したら再評価 |
| atlassian-radius / Atlassian | menu/popover8px、tooltip4px、code/kbd2px | [Radius](https://atlassian.design/foundations/radius)「Border radius tokens」「Focus rings」。ページは可変仕様、リリース版は未確認 | Dropdown menu8px、tooltip4px、keyboard shortcut2pxは明示。popover/codeへの近接用途写像は derived。既存control6/card8/modal12を照合。トークン変更時に再評価 |
| uswds-card / USWDS | card border2px、padding1.5rem、radius8pxの継承 | [Settings](https://designsystem.digital.gov/documentation/settings/)「Card」、USWDS3.14.0。[Spacing units](https://designsystem.digital.gov/design-tokens/spacing-units/) | border2px/perimeter3units/radiuslg。3units=標準24pxを公式の単位ルールに沿って1.5remへ写像。元の1px/16pxをやめる。theme settings変更時に再評価 |
| uswds-alert-pagination / USWDS | alert padding x1.25rem/y1rem、pagination radius.25rem | 同Settings「Alert」「Pagination」、USWDS3.14.0。Spacing units | alert horizontal2.5units/vertical2units、pagination md(.5unit)。CSS設定に対応する derived。独自余白を公式値とは呼ばない。USWDSのtheme変更時に再評価 |
| uswds-field-line-height / USWDS | input/select line-height1.35 | 同Settings「Input」`$theme-input-line-height: 3`、USWDS3.14.0 | line-height3=1.35を入力 hook に対応。body全体のline-heightを置換する案は不採用。typography設定変更時に再評価 |
| carbon-input / Carbon | field height40px、padding-x16px、label gap8px、helper gap4px | [Text input specifications](https://www.carbondesignsystem.com/building-blocks/core/components/text-input/specifications)「Structure」「Sizes」「Typography」。旧style URLから現行ページへredirect。リリース版未確認 | Web default md=40、text horizontal16、label bottom8、helper top4。andm fieldとselectへの対応は derived。色は既存v10 whiteのまま、現行色の部分コピーは不採用。テーマ全体更新時に再評価 |
| dads-loading-context / DADS | 部分処理は静止hourglass、skeleton不使用、progressはステップ位置に使わない | [Progress indicator](https://design.digital.go.jp/dads/components/progress-indicator/)、v2.18.0、2026-09-09更新表示。「全体処理」「部分処理」「使用しないケース」 | ガイド用途は official。砂時計SVG・20pxアイコン等の実装は andm-original。全画面処理へ文脈が変わる場合はcircular/linearへ再評価 |
| tabs-focus / 全 Series | 非interactive panelにtabindex0、選択線2px既定をfocus ringから分離 | [WAI APG Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)「Keyboard Interaction」。Web、固定リリース版なし | キーボード規範は specified。独自2pxは andm-original（外部Seriesの線幅はunverified、Atlassianは旧記録）。フォーカスリング幅を選択線へ転用する案は不採用。panel内容が変わったらtab順を再確認 |

### 今回の非公式判断と未確認の維持

| ID | 対象 | basis / sourceStatus | 判断と再評価 |
| --- | --- | --- | --- |
| component-token-consumption | card/表面の半径、6入力のfocus、tab選択線、breadcrumb/radio legend/slider値/pagination文字ロール、組み合わせ容器 | derived / unverified（公式値の今回再取得は上記行のみ） | 既存Series値を実際のconsumerへ接続。未使用hookや無関係なfocus幅の流用を修正。新しい公式値を創作した変更ではない |
| own-responsive-controls | 長い日本語ボタン・tab/menu/segmented改行、検索下端整列、最小高さ | andm-original / 外部Seriesはunverified、独自Seriesはnot-applicable | 内容と文字拡大で高さを増やす。Tooltipは狭幅でトリガー幅に合わせて折り返す。Cardの長いcode文字を折り返し、GalleryのTooltip/Popover配置見本は狭幅で縦に並べる（Gallery独自表示、部品の方向APIは維持）。fixed heightを維持する案は不採用。公式部品の長文・拡大仕様を取得したらSeries別に再評価 |
| spinner-duration | 共通800ms、stroke2px | andm-original / 外部Seriesはunverified | Carbon値を他社へ転用せず独自既定を分離。Carbon690msは旧記録のderived/unverified（今回未再取得）として継承。取得成功時に再評価 |
| unverified-source-bodies | Apple HIG typography、M3 motion、Spectrum typography | 暫定andm-originalまたは旧記録のderived / unverified | Apple/M3はJS本文のみ、Spectrumは取得失敗。2026-10-08に取得を試みたが本文確認日はnull。not-specifiedへ分類しない。他社体系から値を借りない。本文取得成功時に媒体・版・単位を固定して再評価 |

検証: `npm run audit:tokens`、`npm run audit:sources`、Chromium表示・computed style・キーボード確認。詳細件数と実装限界は [再監査記録](SOURCE-REAUDIT.md)。研究に由来する数値補完は今回追加していない。


実装の対応:
- `fluent-radius` / `atlassian-radius`: `src/styles/series/{fluent,atlassian}.css` → containers/card、navigation/menu、overlays/popover/tooltip、display/code の半径hook。
- `uswds-card` / `uswds-alert-pagination` / `uswds-field-line-height`: `src/styles/series/uswds.css` → containers/card、feedback/alert、navigation/pagination、display/typography。
- `carbon-input`: `src/styles/series/carbon.css` → controls/textfield/select、display/typography、patterns/compositions の field hook。
- `dads-loading-context`: `gallery/compositions.js` / `gallery/workspace.css` / `src/icons/icons.svg`。アイコンは独自SVG。
- `tabs-focus` / `component-token-consumption` / `own-responsive-controls`: `gallery/index.html`、`src/styles/display/typography.css`、controls各focus、containers/card、overlays/tooltip、patterns/compositions、`gallery/workspace.css`。
- `spinner-duration`: `src/styles/marks/spinner.css` / `src/styles/series/carbon.css`。

採用根拠: 2026-10-08のユーザー依頼（PR #7統合後、全パーツを基準で再監査して修正）。旧記録の維持も同依頼の範囲。各新規公式行は本文確認、未取得行は取得失敗・既存記録のみ。研究から数値を自動生成していない。
