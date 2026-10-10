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


## capability-coverage-2026-10-08

- Series / target: 全Series / 部品機能と配布範囲の比較。数値・見た目の変更なし。
- implementation: `docs/COMPONENT-COVERAGE.{md,json}`、`scripts/audit-coverage.mjs`、Galleryの文献ルート/導線。
- scope: 一般Web、2026-10-08時点の一覧。公式版/取得URLは対応表に記録。andm基点commit `6730349`。
- sourceStatus: 公式5体系の一覧はspecified。各部品の全仕様と取得失敗のM3/Apple一覧はunverified。Spectrumは新入口を取得できたが全一覧は未確認。
- basis: 名前から能力への対応はderived、実装状態・優先順位はandm-original。優先順位に対する外部公式はnot-applicable。
- sources / checkedAt / verification: 対応表「公式資料・版・取得範囲」のURL・版、2026-10-08本文確認。Fluent Combobox/DADS File uploadの本文も確認。既存分析の再読は本文再取得と区別。
- decision: 部品数の単純比較を避け、Native機能、統合操作、Galleryのみのcontrollerを区別。未実装28能力、簡易版19能力を不足として残す。
- alternatives: 全体系の部品名をそのまま追加数にする案や、他社asset/framework基盤をandm本体へ追加する案は不採用。一般機能を用途単位で対応付ける。
- recommended / adoption: true / ユーザーの比較・不足整理の実行依頼。未実装部品の新規実装は今回含めていない。
- validation: 全58パーツの参照、分類、81能力の台帳/文書一致、build/token/source audit、Galleryの320/1280pxと文献リンク確認。
- revisit: 新しい機能の追加、公式一覧/版の更新、対象プラットフォームの変更時に該当能力を再評価。

## philosophy-poc（Lab限定）

Minimalism / Web Brutalism / Original / A′の新規判断は、[Philosophy判断参照](SOURCE-DECISIONS-PHILOSOPHY.md)と知識カタログの安定IDを正本として参照する。全新規 `recommended` はnull。公式Series・既存58部品のAPIは変更しない。

## Materiality & Behavior Lab

[判断記録](SOURCE-DECISIONS-MATERIALITY.md)：mb.stimulus / mb.activation / mb.evaluation。公式Seriesとは独立、刺激値は独自、recommendedはnull。

## Waveform Expression Lab

[波形表現の出典・判断](SOURCE-DECISIONS-WAVEFORM.md)。公式Series・共通Tokenは無変更。

## 操作能力の追加（2026-10-10）

参照判断ID `completion-native-contract`: [Native契約・局所値・確認範囲](SOURCE-DECISIONS-COMPLETION.md)。追加CSSは既存意味Tokenを継承し、固有配置・数値はandm-original。公式Series CSSの変更なし。

## spacing-overlay-source-first-20261011

- 対象: `src/styles/tokens/spacing/semantic.css`、Seriesの余白mapping、Coreの面/構成/Dialog/Drawer、Galleryの見本HTML/CSS。
- scope: Web Native HTML、各一次資料の版/branchと共通slotへの対応は [SPACING-AND-OVERLAYS](SPACING-AND-OVERLAYS.md)。確認日2026-10-11。
- basis / sourceStatus: プロパティ単位のofficial/derived/andm-original/unverifiedを同文書の表で分ける。Appleの未取得本文とAtlassian dialog専用寸法を研究で確認済みにしない。
- decision: 関係の余白を再利用可能な責務へ割当。部品専用公式値を優先。固定の画面上書き、panel欠落、既定marginとの二重余白を修正。独自Seriesの密度は外部公式と区別。
- adoption: ユーザーの余白・モーダル修正とSeriesの特色保持の依頼。recommended: true。
- alternatives: 全Seriesを同じpxへ統一する方式、研究の近接原則からpxを生成する方式、本文未取得を公式欠落と扱う方式は不採用。
- validation: build/各監査/HTML契約/JS構文。今回のブラウザと実機は未検証。旧ブラウザ記録の流用なし。
- revisit: 各公式部品/Tokenの版更新、Apple/Atlassian本文取得、実表示/実機検証での不具合。Series固有の未対応size/variant/APIは別途個別に扱う。
