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

## m3-integrated-expressive-20261011

- series: M3（既存expressiveスコープ）
- target / implementation: `src/styles/series/expressive-motion.css` のSwitch/Chip/Tabs/FAB/Dialog/Segmented、既存ButtonのReduced Motion。`gallery/m3/` に操作見本。
- scope: Web CSS / Native HTML。既存M3に統合、標準との製品切替なし。
- sourceStatus / checkedScope / basis / sources: [M3-INTEGRATION](M3-INTEGRATION.md) のプロパティ別判断。公式motion本文の今回取得はunverified、2026-09-30の既存記録を再読。再取得を本文確認済みにしない。
- decision: 既存fast spatial/effectsの4Tokenを再利用。動きの役割へのderived対応付けと独自形状・演出を区別。237Tokenを維持。
- alternatives: 別Series/標準Expressiveプリセット/旧short Tokenへの無条件置換/無用なToken追加は不採用。
- recommended / adoption: true / ユーザーの統合・楽しいモーション実装依頼。
- validation: build/token/source/coverageとJS構文・参照確認。今回の実ブラウザ・目視・実機は未検証。
- revisit: 公式仕様更新、本文取得成功、実機操作の不具合。


## m3-responsive-groups-20261011

- series: M3 Expressive / target: ButtonGroup, connected selection, Switch geometry, action press feedback
- implementation: src/styles/series/expressive-motion.css、src/behavior/press.js、gallery/m3/
- scope: AndroidX androidx-main official Compose implementation → Native HTML/CSS px port, 3-button example
- sourceStatus: specified（公式sourceの本文をGitHub connector経由で取得）。M3 websiteの本文取得はunverifiedのまま。
- basis: derived（寸法dp→px、色ロール、CSS幅配分、FastSpatial）、andm-original（短押し120ms視覚保持、面の24px/.88登場、見本palette）
- sources: AndroidX ButtonGroup.kt / Switch.kt / SwitchTokens.kt / ConnectedButtonGroupSmallTokens.kt / ButtonGroupSmallTokens.kt。authority: series。2026-10-11本文確認、blob SHAとversionはdocs/M3-INTEGRATION.md改訂節。
- decision: 押下に隣接が応える標準group、選択でfullになるconnected group、16/24/28のSwitch thumbを既存M3へ追加。単なる縮小だけの見本から公式の部品特性が読める見本へ変更。結果はNative click/change/submitで確定し演出の完了から決めない。
- alternatives: 色変化だけのChip/Tabは今回の中心から外した。Androidレイアウト/overflow menuの完全portは対象外。
- recommended: true / adoption: ユーザー依頼
- validation: build/token/JS/controller/HTML整合。ブラウザ・実機・視覚検証は未実施。
- revisit: AndroidX source更新、実機のpress/cancel/連打/狭幅/拡大/色/focus不具合。


## m3-recording-actions-20261012

- series: M3 / target: FAB action disclosure, expanding action bar, morphing loading mark, media toggle
- scope: ユーザー提供公式ページ録画3本とAndroidX androidx-mainをNative HTML/CSS/SVGへ対応
- implementation: patterns/expressive-actions.css、marks/loading-indicator.css、behavior/disclosure.js、gallery/m3/
- sourceStatus: specified（公式source本文）/ 動画は形と順序の観察、物理数値未確認
- basis: derived（FastSpatial/FastEffects、48/38寸法、stagger方向）、andm-original（delay、周期、SVG座標、toolbar/media geometry、palette）
- sources: FloatingActionButtonMenu.kt、LoadingIndicator.kt、LoadingIndicatorTokens.kt。authority series、2026-10-12本文確認。blob SHA/確認範囲はM3-INTEGRATION改訂節。
- decision: 動画で観察した展開/収納/輪郭morph/アイコン反応を再利用可能なクラスと任意DOM controllerへ実装。公式全shape/Android spring完全portは主張しない。
- alternatives: 静止装飾だけでは操作の変化を伝えないため不採用。動画からspring stiffness/dampingを推測して公式値とする方法は不採用。
- recommended: true / adoption: ユーザー依頼
- validation: build/tokens/source台帳/controller/HTML/同一SVG構成。実ブラウザ未検証。
- revisit: 公式source更新、連打/取消/触覚/見た目/読み上げの不具合、browserのSVG d補間対応。

## apple-liquid-study-20261011

- series: Apple · Liquid Glass experimental Web variation。既存Appleは変更なし。
- target / implementation: `src/experimental/apple-liquid-glass/{style.css,index.js,optics.js}`、`gallery/lab/apple-liquid-glass/`。別import・別親スコープ。
- scope: WWDC25/iOS 26の光学・動きの概念をWebへ近似。0–100%のNative Range、Button、Tabs、Menu。
- sourceStatus: 概念はspecified（WWDC公式本文・一部フレーム確認）。HIG寸法/数値・完全な光学/軌道はunverified。
- basis: 概念の出典はofficial、Webへの役割割当はderived、光学近似/局所寸法/色/ばね/時間はandm-original。APGのキー操作とARIAはstandard由来でAppleの仕様にしない。
- sources / checkedAt: 2026-10-11。Apple session 219、Kube CSS/SVG記事、rdev/ybouane README、APG。URL・節・今回の確認範囲はAPPLE-LIQUID-GLASS.md。公開READMEは継続更新でcommit未固定。
- decision: 任意DOMの毎フレーム画像化を避け、登録した背景画像の画素をSVGで変位。Motionは操作値を遅らせず装飾面に限定。静止時ループ停止。
- alternatives: Chromium限定SVG backdrop（Safari側の質感差）、任意DOM画像化WebGL（取得コストと構造制約）、ぼかしのみ（比較モードとして残す）。
- recommended: true（実験追加のみ）。Core標準化はnull。
- adoption: 既存を壊さない別Appleバリエーションとブラウザ確認の明示依頼。
- validation: build/token/構文/計算/構造/配布境界/既存不変。実ブラウザ、実機性能、コントラスト、読み上げは未検証。結果はAPPLE-LIQUID-GLASS.mdへ追記。
- revisit: 実表示/Safari/低速端末/文字拡大の不具合、公式更新、Core採用時。


## apple-liquid-refinement-20261011

- Series / scope: Apple Liquid Glass, WWDC25 219, Web experiment v2. User-requested refinement; existing Apple/Core unchanged.
- Official concepts (`basis: official`, `sourceStatus: specified`): resting controls lift into glass on interaction; press illuminates and flexes; menu bubble expands continuously; avoid glass on glass. https://developer.apple.com/videos/play/wwdc2025/219/ Dynamics / Principles, transcript re-read 2026-10-11. Prior extracted control frames visually re-read; full continuous video remains unverified.
- Local values (`basis: andm-original`, `sourceStatus: not-specified-in-checked-scope`): slider resting scale .68, press scale 1.06 / 1.10, velocity deformation capped .10; button growth 1.045; menu spring 240 / 29, fixed optical field 260×226. No Apple numerical equivalence claimed.
- Implementation: src/experimental/apple-liquid-glass/{index.js,style.css}, gallery/lab/apple-liquid-glass/{index.html,lab.js,lab.css}. Native range hover/active shadow disabled; stable optical map with per-frame position updates; one shared toolbar surface; original SVG icons.
- Backgrounds: HTML text and light UI use live CSS backdrop blur/light; grid PNG and Jason Leung Unsplash photo use controlled-image refraction. https://unsplash.com/photos/1FQQUCInRVA. Coast/night removed from choices. No arbitrary DOM capture.
- Primary author comparisons re-read: https://kube.io/blog/liquid-glass-css-svg/ (SVG backdrop browser constraint, map regeneration cost); https://github.com/rdev/liquid-glass-react (elasticity/browser limitations). User-provided ELLE article consulted as nontechnical context, not numerical evidence.
- Validation: JS syntax and whitespace, library build/token audit, local HTML ID/ARIA references, spring convergence. Browser automation skill unavailable, so touch behavior, dynamic contrast, font scaling and actual rendered continuity remain unverified. Revisit after user observation, iOS/Safari rendering differences, resize or reduced-preference defects.
- recommended: true for experiment only; Core adoption: null.

## m3-review-and-integration-20261012

- series / scope: M3 Expressive, Web Gallery, Google Material Icons 24px. Liquid Glass v3 restoration from the previously saved archive `liquid-v3.tar.gz`; no new Apple measurements.
- target / implementation: `src/icons/material-icons.svg`, `gallery/m3/index.html`, `src/styles/patterns/expressive-actions.css`, `src/styles/marks/loading-indicator.css`, `src/styles/base.css`, `gallery/index.html`, `src/experimental/apple-liquid-glass/`.
- sourceStatus / basis: icon geometry specified / official (series assets); sprite extraction derived. Collapsed clipping, circular trigger, toolbar labels, icon crossfade and navigation are andm-original / not-applicable, explicitly requested by the user. No claim of official Toolbar API conformance.
- sources: https://github.com/google/material-design-icons, src/content/{add,create,save}, src/image/add_a_photo, src/file/create_new_folder, src/action/favorite_border, src/social/share, src/av/{play_arrow,pause}, materialicons/24px.svg, master. Full asset bodies and Apache-2.0 license fetched 2026-10-12; blob versions in src/icons/MATERIAL-ICONS.md. Prior motion evidence remains M3-INTEGRATION.md; not re-fetched for unchanged timing.
- decision: replace text glyphs and hand-made action icons with licensed SVG assets; retain plus-to-close rotation and state transition. Official play/pause geometry uses an independently designed scale/fade transition rather than pretending the previous custom morph was a Material asset. Clip the collapsed 56px bar to its circular face so hidden flex contents cannot expose a purple oval. Use browser tap-highlight transparency for interactive elements, keep component pressed feedback and focus-visible. Liquid Glass v3 already has local tap styling; import its latest saved source unchanged.
- alternatives: external font/CDN unnecessary; extra floating link rejected per user request. Do not regress newer spacing, source-audit or gallery heading changes while merging historical branches.
- recommended: true. adoption: explicit user review and request to integrate every branch into main.
- validation: build, token audit, source property inventory, coverage, JS syntax, links/ARIA/SVG references and branch ancestry. Browser/touch/visual QA capability unavailable; actual mobile blue flash and animations remain unverified. Revisit if the user sees a blue overlay after this change (could be component focus or state styling rather than UA highlight), narrow Japanese labels, or SVG/browser differences.


## 2026-10-12 — Restore existing input components in specimens

```yaml
id: gallery-input-contract-20261012
series: all existing Series; M3 specimen
target: calendar/date-entry/inline-edit/table-size inputs and M3 dialog initial focus
implementation: gallery/index.html; gallery/completion/index.html; gallery/completion/parts.json; gallery/m3/index.html; gallery/m3/demo.js
scope: existing CSS-first Web component contract; no new dimensions
sourceStatus: not-applicable
checkedScope: controls/README.md; controls/textfield.css; controls/select.css; patterns/compositions.css; SPACING-AND-OVERLAYS.md; ATOMIC-SOURCES.md
basis: andm-original
sources:
  - authority: andm
    locator: src/styles/controls/textfield.css; src/styles/controls/select.css; docs/SPACING-AND-OVERLAYS.md
    version: reviewed integration 30aac6b
    checkedAt: 2026-10-12
    verification: 本文確認
    supports: existing input height/padding and field relationship contract
decision: Reuse andm-textfield__input and andm-field; table select reuses andm-select__native with native arrow; synchronize reusable parts. Preserve affix component's own input contract and Gallery chrome. M3 dialog initially focuses its heading, with keyboard access to the input and focus restoration on close.
alternatives: New per-specimen padding CSS rejected because existing component already defines it.
recommended: true
adoption: user requested repair of similar components
validation: build and tokens pass; HTML classes, references, parts parity and JS syntax checked; browser, mobile keyboard, zoom and assistive technology unverified because control-browser unavailable
revisit: Real-device focus/keyboard and narrow Japanese layout review; official field-specific values remain under prior source classifications
```


```yaml
id: liquid-toolbar-state-20261012
series: Apple Liquid Glass experimental
target: segment label alignment; toolbar press/selection color and inset circle
implementation: src/experimental/apple-liquid-glass/style.css
scope: experimental CSS Web interpretation, light/dark/forced-colors
sourceStatus: not-applicable
checkedScope: existing APPLE-LIQUID-GLASS.md v3 and experimental CSS/behavior
basis: andm-original
sources:
  - authority: andm
    locator: docs/APPLE-LIQUID-GLASS.md#refinement-v4--2026-10-12
    version: v4
    checkedAt: 2026-10-12
    verification: 本文確認
    supports: user-requested alignment and inset selection design
decision: Center tab labels on both axes. Share existing light/dark active blues via --andm-glass-color-active. Use local inset fill/shadow tokens for toolbar pressed/selected circle, with forced-color outline.
alternatives: Flat translucent circle replaced per user feedback; native hit target unchanged.
recommended: true
adoption: explicit user request
validation: build/token and syntax checks; real browser/device/contrast unverified
revisit: user visual review across backgrounds and narrow screens
```

2026-10-12 follow-up to `liquid-toolbar-state-20261012`: user explicitly requested a shared active background token for selected bottom navigation. `--andm-glass-color-active-background` retains the existing toggle background `rgb(98 176 255 / .28)` and also feeds the selected tabs/segment lens in light and dark. This is an andm-original mapping, not an Apple-measured color. Reduced-transparency and forced-color fallbacks remain independent.


2026-10-12 / `m3-dialog-focus-gutter-20261012`: user reported the name input's focus outline clipping at both sides. The body uses overflow:auto, while the input fills its content width. M3 specimen body now reserves existing --andm-space-2 paint gutters with matching negative inline margins, preserving input/title alignment and panel padding. This is an andm-original Web specimen layout repair; no new official values or focus style changes. Sources: controls/textfield.css focus-visible and overlays/dialog.css body scroll contract, read 2026-10-12. SourceStatus: not-applicable for this layout compensation. Adoption: user issue report under authorized fixes. Code/diff verified; actual browser focus and narrow-screen rendering remain unverified. Revisit after mobile visual review or focus-ring token changes.

## gallery-responsive-specimens-20261012

- target: carousel, mega-menu, upload, checkbox/radio first-line alignment, specimen/document separation, skeleton, avatar. Implementation: src/behavior/{navigation,forms}.js, src/styles/{patterns/advanced,navigation/advanced,controls/checkbox,controls/radio,controls/file-input,feedback/skeleton}.css; gallery/{index.html,workspace.css,workspace.js,completion/}.
- scope: CSS-first Web; existing Series spacing/type/color remapping preserved. No claim of complete M3 component replication.
- checkedScope: DESIGN.md, SOURCE-FIRST.md, SPACING-AND-OVERLAYS.md, component responsibility READMEs; W3C APG Carousel (roles/states/keyboard), W3C WCAG2.2 Pause Stop Hide; Tailwind animation pulse example; Atlassian spacing grouping guidance. Primary pages fetched 2026-10-12.
- sources: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/ ; https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html ; https://tailwindcss.com/docs/animation ; https://atlassian.design/foundations/spacing/ . Existing per-Series numeric sources and derivation remain SPACING-AND-OVERLAYS.md; re-reading them is not a new official numeric measurement.
- basis / sourceStatus: carousel stop on focus, selection semantics and pause requirements: official / specified (standard). Related/group/actions/inset token use and first-line centering calculation: derived from existing component layout contract. Composition, 16:10 crop, typography mapping, optional 2s/.5 pulse using ease-in-out, detail-page chrome, sizes 32/64 and original vector portraits: andm-original / not-applicable. Tailwind is a use-case reference, not the source of Series geometry or exact motion curve.
- decision: add illustrated slides, native page buttons and deliberate autoplay; stop rotation on focus/pointer/hidden/reduced motion and restore polite status. Mega-menu uses meaningful grouped links and native popover; upload separates chooser, empty state and per-file operations. Inputs and first label line align via inherited line height without altering Series dimensions. Avatar img elements demonstrate circle cropping; all portraits are original fictional SVG illustrations (not actual member photographs). Core avatar default stays 40px. Skeleton loading pulse is opt-in; static default and DADS exclusion stay; Gallery has explicit pause and OS reduction.
- adoption: user-requested Gallery repairs and responsive mobile/desktop specimens. recommended: true within that scope.
- validation: build, 238 tokens with no required undefined references; 3402 property inventory; coverage; JS syntax; 360/132/28 unique IDs and ARIA/assets. Node EventTarget carousel checks cover wrapping, page pickers, rotation, focus cancellation, reduced motion and dispose. DOM/controller checks are not rendering tests. Supported control-browser absent: actual browser/touch, narrow viewport, text zoom, contrast and screen-reader behavior remain unverified.
- revisit: real-device layout/animation report; official per-component specifications or Series tokens change; sample reuse and large text regression.

## state-expression-lab-20261012

- Scope: Gallery Labのみ。旧waveform-expression入口をstate-expressionへ案内。
- Sources: docs/STATE-EXPRESSION.mdの公式文書・著者公開論文本文を2026-10-12確認。
- Official: determinate/indeterminateの用途区別、status通知、非必須演出の抑制。
- Derived: 共通snapshotによる比較、知覚時間と状態理解を別に観察する仕様。
- Original: 18候補、形状・配色・速度・固定信号・比較操作。Baseline余白とandm-btnを再利用。
- Unverified: 優位性、実ブラウザ表示、実機、支援技術。recommended:null。Core/Seriesへの採用なし。
- Validation: pure model、HTML参照、JS構文、build/token audit/source inventory/coverage成功。


## liquid-rim-touch-20261013

```yaml
id: liquid-rim-touch-20261013
series: Apple Liquid Glass experimental
target: decorative rim, central tint, pointer/keyboard light
implementation: src/experimental/apple-liquid-glass/{style.css,index.js}; gallery/lab/apple-liquid-glass/{index.html,lab.js}
scope: Web experimental v5; light/dark; pointer and keyboard
sourceStatus: specified
checkedScope: WWDC25 session 219 transcript, Dynamics and Principles, fetched 2026-10-13; existing APPLE-LIQUID-GLASS.md and apple-hig.md re-read
basis: andm-original
sources:
  - authority: series
    locator: https://developer.apple.com/videos/play/wwdc2025/219/
    version: WWDC25
    checkedAt: 2026-10-13
    verification: 本文確認
    supports: geometric highlights, interaction illumination, content visibility; principles only, not CSS values
decision: principles follow the checked official description; masked conic rim, radial touch light, alpha values, 1/3px widths and 180ms fade are independent andm values. Preserve Native action/value ownership and active blue. Coalesce light updates without rebuilding maps. No live-DOM colour sampling.
alternatives: full DOM capture or shader lighting deferred; unnecessary for requested fixed/radial highlights and broader cost/compatibility impact
recommended: true
adoption: explicit user request for rim light, clear centre and touch-position response
validation: build/tokens/sources/coverage/syntax/diff; EventTarget harness, not rendering; actual browser/device and contrast unverified
revisit: browser/device visual review, poor label contrast, mask support, mobile performance or official updates
```


## liquid-stable-hover-controls-20261013

```yaml
id: liquid-stable-hover-controls-20261013
series: Apple Liquid Glass experimental
target: hover/press distinction, switch, compact media composition
implementation: src/experimental/apple-liquid-glass/{index.js,style.css}; gallery/lab/apple-liquid-glass/{index.html,lab.js,lab.css}
scope: Web v6, Native checkbox/buttons, light/dark, pointer/keyboard
sourceStatus: specified
checkedScope: WWDC25 session 208 Pointer transcript; session 219 Dynamics/Principles; W3C APG Switch Pattern
basis: andm-original
sources:
  - authority: series
    locator: https://developer.apple.com/videos/play/wwdc2025/208/
    version: WWDC25 iPadOS 26
    checkedAt: 2026-10-13
    verification: 本文確認
    supports: hover glass highlight platter over target and tracking across control clusters; not a universal whole-control distortion rule
  - authority: standard
    locator: https://www.w3.org/WAI/ARIA/apg/patterns/switch/
    version: current APG
    checkedAt: 2026-10-13
    verification: 本文確認
    supports: stable label, native checkbox checked state, Space behavior, switch role
decision: hover remains geometrically stable with fixed rim; pressed interior illumination alone follows pointer. The static hover alpha, switch 64x44/28px geometry and spring parameters, media composition and mock content are andm-original. Switch semantics use checked official standard; Apple does not prescribe these CSS values.
alternatives: reproducing a separate refractive hover platter deferred; user prefers stable geometry and restrained light
recommended: true
adoption: user explicitly requests correction and appropriate new Liquid Glass parts
validation: build/tokens/sources/coverage/syntax/diff; EventTarget behavior and ID/ARIA checks. Not actual rendering or accessibility certification.
revisit: visual/touch/keyboard review in real browsers, text contrast and responsive integration, switch or platform guidance changes
```


## liquid-reuse-correction-20261013

- target: v5/v6 global optics and new switch/player integration; src/experimental/apple-liquid-glass/{style.css,index.js}, Gallery lab HTML/CSS.
- sourceStatus: not-applicable for independent Web geometry; existing official principle sources remain liquid-stable-hover-controls-20261013 and liquid-rim-touch-20261013. No new Apple measurements or research claim.
- basis: andm-original (restore v4 optical values); derived (reuse existing slider thumb and icon-toolbar APIs).
- decision: preserve v4 CSS verbatim; remove conic mask and tint remapping. Fix switch specificity with enhanced absolute positioning, 56x44 slider thumb in 84x52 area and 20px travel. Keep label backing away from control. Compose player from existing shared icon toolbar rather than separate sizes, radius and selected-state rules.
- alternatives: further aesthetic reinvention rejected after user feedback; no additional parts before visual acceptance.
- adoption: user correction; recommended:true for these identified repairs.
- validation: build/tokens/sources/coverage/syntax/diff; non-rendering state/scheduler checks, original CSS prefix and reused classes verified. No browser/device or visual acceptance verified.
- revisit: actual screenshots, touch/keyboard and Japanese/narrow/text-zoom visual review.


## liquid-vessel-original-20261013

- series: andm-original experiment, not Apple reproduction.
- target: liquid inside a stable glass mini-player; src/experimental/liquid-vessel/{model.js,index.js,style.css}; Gallery example09; explicit package exports.
- sourceStatus: not-applicable; basis: andm-original for SVG waves, fill, colours, envelope, timing and vessel shape; derived for reuse of existing shared glass toolbar/native controls. No new official numeric claims.
- checkedScope: DESIGN.md/SOURCE-FIRST.md and prior glass responsibility/source records re-read. Existing APG-native semantics retained; no new scientific superiority claim.
- decision: preserve example08 and existing glass module. Add a decorative SVG clipped inside a fixed shell with native controls above it. One isolated frame loop, deterministic simulated signal; no audio, fluid solver, DOM capture or per-frame glass map rebuild.
- adoption: explicit user request for independent liquid-in-glass expression; recommended:true within this experiment only; not Core/official Series adoption.
- validation: build/tokens/sources/coverage/syntax/diff/ID/ARIA; model/controller checks of wave bounds, stop convergence, rapid input, visibility, motion reduction and disposal. Not rendering/GPU/mobile verification.
- revisit: actual visual feedback, narrow/text zoom contrast, performance or future real audio integration.


## liquid-vessel-clear-water-20261013

- target: transparent water treatment, meniscus, controlled-image registration and slower waves; experimental/liquid-vessel and Gallery09.
- scope/sourceStatus/basis: independent Web experiment / not-applicable / andm-original; no official Apple or physical-water reproduction claim.
- decision: remove coloured gradients and metadata panel; neutral weak depth fill, paired surface reflection/shadow, bottom/side glints. Slower smaller simulated waves. Map the supplied image below the animated clip with a small fixed magnification/offset; no live-DOM capture or per-frame image/filter regeneration. Existing glass module and other examples remain unchanged.
- adoption: explicit user request to try transparent liquid; recommended:true within this experiment.
- validation: build/tokens/sources/coverage/syntax/diff/ID/ARIA; model/controller tests plus clipping and scene-read checks. Browser/device/rendering/contrast not verified.
- revisit: actual visual acceptance, photo/grid legibility, image positioning at resize, real audio integration if requested.


## water-study-shader-audio-20261013

- target: Gallery09 and src/experimental/water-player; new dedicated renderer, original WAV, measured audio coupling.
- scope: independent andm experiment; sourceStatus:not-applicable for art direction; basis:andm-original for shader/material/audio/modal parameters, derived for RMS extraction and damped response.
- sources: https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getFloatTimeDomainData ; https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices ; fetched 2026-10-13. Supports PCM acquisition and resource/lifecycle choices, not physical or visual fidelity.
- decision: controlled studio scene with 2.5D glass boundaries, reflections and depth cues, plus real locally synthesized audio. Use audio RMS changes to excite modes, not a periodic fake wave. Native buttons/audio state; no autoplay; reduced motion and hidden/offscreen pause; cleanup GPU/audio resources.
- adoption: explicit request to rebuild static vessel first and then react to actual sound; recommended:true within experiment only.
- validation: standalone EGL/GLES shader compile/link/render and static visual inspection; pure audio/water model; build/tokens/sources/coverage/syntax/diff/HTML. Not actual browser or mobile/device verification.
- revisit: actual appearance/audio review, GPU capability/lifecycle and mobile performance. Reference photograph is inspiration, not claimed reproduction.


## liquid-vessel-shelved-20261013

- adoption: ユーザー判断で液体プレーヤーをお蔵入り。将来再挑戦する未採用項目。
- recommended: false（現在の試作の利用推奨）。将来の再設計は未決。
- decision: Gallery09と実行時のimport/初期化を撤去。既存Liquid Glassパーツと08の通常ミニプレーヤーは維持。独自描画・音源・過去の検証コードは削除せず保持。
- reason: 静止時の質感・音で揺れる体験がユーザーの目標に達しなかった。シェーダー描画や計算チェックの通過を視覚品質の達成と扱わない。
- revisit: 静止画の視覚比較と実ブラウザ検証が可能な条件で、ユーザーの再挑戦指示があるとき。

## gallery-discovery-20261013

```yaml
id: gallery-discovery-20261013
series: Gallery chrome (independent of specimen Series)
target: Catalog structure, task filters, specimen snapshots, comparison disclosures, touch access
implementation: gallery/discovery.js; gallery/workspace.js; gallery/workspace.css; gallery/completion/screen.js; scripts/export-gallery.mjs
scope: Web / Japanese / Gallery-only / existing 96 parts and 14 Series
sourceStatus: not-applicable
checkedScope: DESIGN.md, SOURCE-FIRST.md, EXPERIENCE.md, COMPOSITION-SOURCES.md, DESIGN-PHILOSOPHIES.md, GALLERY-REVIEW.md, Series copy and existing Gallery DOM. Series CSS values preserved; no new official numeric values inferred.
basis: andm-original
sources:
  - authority: professional
    locator: https://envydesign.jp/patterns/parts/header/
    version: live website, 2026-10-13
    checkedAt: 2026-10-13
    verification: HTML/CSS and page accessibility tree examined
    supports: Inspiration for task-led classification, preview-first catalog and optional pre-navigation inspection; not a source of official Series dimensions
  - authority: andm
    locator: DESIGN.md; docs/SOURCE-FIRST.md; docs/EXPERIENCE.md
    version: main 717b50e and PR 15 dd1f757
    checkedAt: 2026-10-13
    verification: repository contents read
    supports: Preserve native component API, source distinctions, intent/composition/Series boundaries and scoped specimen switching
decision: Five catalog entrances; actual DOM specimens from existing examples; hover/focus opens a native details disclosure, click/tap pins it, Escape closes it. Existing Series tokens apply to specimens only. Original Gallery spacing, dimensions and neutral green chrome; not scientific constants or official Series tokens.
alternatives: A screenshot-only catalog would hide live Series differences; a hover-only popup would exclude touch. Both rejected.
recommended: true
adoption: explicit user request; PR 15 revision; no merge to main
validation: Build, token/source/coverage/knowledge audits and DOM regression passed. Browser QA is tracked separately in GALLERY-DISCOVERY.md; DOM checks do not establish layout, contrast or physical-touch quality.
revisit: Browser clipping, focus/state loss, added examples or changed source/license conditions
```
