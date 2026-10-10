# 全パーツの出典優先・再監査（2026-10-08）

機能の不足と他体系比較は [COMPONENT-COVERAGE.md](COMPONENT-COVERAGE.md)。

PR #7 の main 統合後の監査。Gallery 全58パーツ、14シリーズ（Baselineを含む）、src/styles 全CSS宣言を棚卸しした。**全パーツの実装監査と表示確認は完了したが、全プロパティが公式確認済みという意味ではない。** 外部由来シリーズは値・状態・用途ごとに判断する。

[判断記録](SOURCE-DECISIONS.md) / [全宣言と変数依存の台帳](SOURCE-PROPERTIES.csv) / [方針](SOURCE-FIRST.md)。台帳は `npm run audit:sources` で実装との一致を検証する。台帳だけから出典の確実性は判断しない。既存の色・寸法・動きの取得記録は [COMPONENT-SOURCES](COMPONENT-SOURCES.md)、[ATOMIC-SOURCES](ATOMIC-SOURCES.md)、[COMPOSITION-SOURCES](COMPOSITION-SOURCES.md)、各シリーズ分析を併読する。

## プロパティの扱い

- 外部資料のネイティブ値は元の版・媒体・用途でのみ official。andm の文字ロールや共通 hook への対応付けは derived。公式値と用途を分けて記録する。
- リテラル、共有余白、最小クリック面積、共通カラー、CSSレイアウト、Galleryのデモ操作は、明示の出典記録がない限り andm-original の暫定実装。外部シリーズとの一致は unverified。
- 外部シリーズの古い出典記録は履歴として保持。今回本文を取得できなかった値を今回確認済みとはしない。
- CSV は CSS 宣言・参照先の完全棚卸しであり、公式確認を自動推定する機械分類ではない。レイアウト・色・文字・角・枠・影・動き・状態の各宣言を追える。

## シリーズ別の確認範囲

| シリーズ | 今回の取得・採用 | 留保 |
| --- | --- | --- |
| Baseline / Soft / Dense / Technical / Editorial / Playful | andm 独自の基準と既存実装を照合 | not-applicable。特定の外部体系の再現ではない |
| Expressive (Material 3) | 実装・旧記録の照合 | 今回の公式 motion 本文はJSのみ。版・Web対応が未確認の値は unverified |
| Apple | 書体と共有値の継承を照合 | HIG typography は本文取得できず unverified。pt を px の公式値とは扱わない |
| Fluent 2 | Shapes の角丸・用途を本文確認 | 共有色・高さ・motion は andm 暫定値。field/menu への矩形4px対応は derived |
| Spectrum | 実装と既存分析を照合 | 今回の typography 本文取得失敗。未確認を欠落と断定しない |
| Carbon | 現行 Text input specifications の md40px、内余白16px、label8px/helper4px | 既存色は v10 white 由来。現行テーマ色へ混在移行しない。spinner690msは旧記録 |
| Atlassian | Radius の小要素2px、tooltip4px、control6px、card/menu8px、modal12px | 共通面から固有用途への写像は derived。旧配色・motionを今回確認済みとしない |
| USWDS | 3.14.0 settings / spacing units のカード・アラート・入力行高・pagination | rem は標準16px相当。andm側の設定へ対応付けるので derived |
| DADS | 2.18.0 Input text / Progress indicator の用途を本文確認 | 数値寸法は今回再取得していない。部分処理の静止砂時計、skeleton禁止を適用 |

## 全58パーツの結果

全行で形状・余白・文字ロール・色・境界・状態・動きをCSS台帳および旧出典記録と照合。公式取得範囲は上表および判断記録を参照。

| パーツ | 今回の確認・修正 | 出典の扱い |
| --- | --- | --- |
| `text` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `icon` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `icon-button` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `link` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `label` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `helper-text` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `error-text` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `required-marker` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `status` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `code` | Atlassian の小要素半径 hook を消費。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `kbd` | Atlassian の keyboard shortcut 半径 hook を消費。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `image` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `file-input` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `native-input` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `button` | 長い日本語を折り返し、高さを内容に合わせる。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `text-field` | Carbon の高さ・内余白・ラベル/補足間隔を分離。フォーカス hook を消費。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `checkbox` | フォーカス hook を消費。Native input とラベルの関連付けを確認。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `radio` | legend に label ロールを適用。フォーカス hook を消費。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `switch` | フォーカス hook を消費。Native checkbox の状態を維持。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `select` | 入力行高・フォーカス hook を消費。Native select を維持。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `divider` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `badge` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `card` | Series の surface 半径を継承。枠幅・内余白を USWDS 用 hook に分離。長いcode文字も折り返す。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `alert` | USWDS 横/縦余白 hook を分離。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `dialog` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `tabs` | 選択線を focus ring から分離。パネルに tabindex=0。矢印・Home/End 操作を再検証。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `slider` | 値表示を caption ロールへ。フォーカス hook を消費。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `toast` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `tooltip` | Atlassian の用途別半径を反映。関連付け・Escape を確認。狭幅の配置見本を縦並びに修正。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `breadcrumb` | body-small ロールを適用。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `pagination` | ボタン文字ロール・USWDS 角丸 hook を適用。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `menu` | 項目は field 半径、パネルは menu 半径を使用。Escape/フォーカス復帰を再確認。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `drawer` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `popover` | Fluent/Atlassian の用途別半径を反映。Escape とフォーカス復帰を確認。狭幅の配置見本を縦並びに修正。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `table` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `list` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `accordion` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `progress` | 視覚50%・ARIA50・4件中2件を一致。用途は一時処理の進捗。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `spinner` | 共通800msは andm-original。Carbon690msは過去記録からの継承で未再確認。線幅を focus ring と分離。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `skeleton` | DADS 禁止を維持し、DADS 選択時は見本を非表示。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `avatar` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `segmented` | 長い文字の改行を許可。公式仕様の完全再現とは扱わない。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `chip` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `fab` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 共通実装は andm-original。Series値は用途別の記録を参照。 |
| `form-field` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 組み合わせ・操作は andm-original。継承プロパティはシリーズ別判断。 |
| `search-form` | 入力/送信の下端整列、狭幅と200%文字拡大、改行、検索/クリアを確認。 | 組み合わせ・操作は andm-original。継承プロパティはシリーズ別判断。 |
| `filter-bar` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 組み合わせ・操作は andm-original。継承プロパティはシリーズ別判断。 |
| `results-header` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 組み合わせ・操作は andm-original。継承プロパティはシリーズ別判断。 |
| `form-actions` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 組み合わせ・操作は andm-original。継承プロパティはシリーズ別判断。 |
| `header-nav` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 組み合わせ・操作は andm-original。継承プロパティはシリーズ別判断。 |
| `side-nav` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 組み合わせ・操作は andm-original。継承プロパティはシリーズ別判断。 |
| `mobile-nav` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 組み合わせ・操作は andm-original。継承プロパティはシリーズ別判断。 |
| `bottom-nav` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 組み合わせ・操作は andm-original。継承プロパティはシリーズ別判断。 |
| `toolbar` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 組み合わせ・操作は andm-original。継承プロパティはシリーズ別判断。 |
| `action-menu` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 組み合わせ・操作は andm-original。継承プロパティはシリーズ別判断。 |
| `resource-item` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 組み合わせ・操作は andm-original。継承プロパティはシリーズ別判断。 |
| `empty-state` | 共通 Token 継承・文字ロール・状態・狭幅表示を照合。 | 組み合わせ・操作は andm-original。継承プロパティはシリーズ別判断。 |
| `loading-state` | DADS 部分処理は静止砂時計。その他は andm の spinner。 | 組み合わせ・操作は andm-original。継承プロパティはシリーズ別判断。 |

## 検証と再評価

ビルド・未定義必須Token・台帳一致を検証。Chromiumで全58パーツ×14シリーズ×390/1280px（1,624条件）と、200%文字サイズ×320/1280px（1,624条件）を検証し、横はみ出し・非表示不整合・JS例外は0。検索フォームは320/390/800/1280px×100/200%文字サイズ×14シリーズ（112条件）で入力/送信の整列と折り返しを検証。シリーズ値のcomputed style・DADS部分処理・監査読書ビュー17項目、Carbon6入力のfocus、エラー表示、TabsのHome/EndとpanelへのTab移動、320px/200%の長い日本語ボタンも通過。Series切替時の入力/スクロール保持、Menu/Popover/TooltipのEscapeと関連付けを確認。日本語フォントを用意したChromiumで検索フォーム（390/1280px）と長文ボタン（320px/200%）を目視確認。Safari/Firefoxと実機端末は今回未検証。

公式ソースの版更新、未取得本文の取得成功、ユーザーの対象媒体変更時は該当プロパティのみ再調査する。Apple/M3/Spectrumの未確認値を推測で上書きしない。Carbon v10の配色から現行テーマへ移行する場合はテーマ全体を一緒に監査する。

## 2026-10-10 操作能力の追加

`combobox`, `multi-select`, `removable-tag`, `calendar`, `date-range`, `date-entry`, `range-slider`, `input-affix`, `character-count`, `input-mask`, `error-summary`, `tree`, `table-tree`, `upload`, `stepper`, `description-list`, `quote`, `annotation`, `banner`, `footer`, `in-page-nav`, `mega-menu`, `language-selector`, `carousel`, `avatar-group`, `info-label`, `rating`, `inline-edit`, `comment`, `spotlight`, `layout`, `meter`, `color-picker`, `tabs-contract`, `overlay-contract`, `menu-contract`, `notification-contract`, `data-table`

新規CSSの色・余白・角・影は既存Seriesの意味Tokenを再利用。部品固有の数値と配置はandm-originalで、外部公式値とは扱わない。操作契約と出典は [追加判断](SOURCE-DECISIONS-COMPLETION.md)。公式Series CSSの変更なし。
