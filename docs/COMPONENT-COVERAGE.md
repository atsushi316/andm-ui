# 他のデザインシステムとの部品・機能対応表

2026-10-08確認。**基本パーツはそろっているが、成熟した体系と機能・運用品質が同等ではない。** andm-uiの58項目は小さな文字/説明パーツと組み合わせも数えている。公式体系の部品数と直接比較しない。

本表は一般Webの能力ごとの対応。公式5体系の取得できた部品一覧を照合し、andm-uiのCSS・HTML・GalleryのJS・配布APIを確認した。これは機能の棚卸しで、公式の見た目への完全一致、アクセシビリティ認証、ブラウザ適合率の証明ではない。[出典優先の再監査](SOURCE-REAUDIT.md)と併読する。

## 判定の意味

| 判定 | 意味 |
| --- | --- |
| 実装済み | この行に限定した基本機能のNative HTML/CSS APIと見本がある。業務処理まで提供する意味ではない |
| 簡易版 | 近い見本はあるが、比較する能力の統合操作や再利用controllerが不足 |
| 未実装 | 対応する独立API/統合パターンがない。既存部品で構成できる可能性とは分ける |
| 対象外 | FW固有基盤、他社ブランド、政府専用識別、別領域など。数のために増やさない |

Native input date ≠ 独自calendar、Native file選択 ≠ アップロード全体、静的table ≠ data table、Disclosureの操作一覧 ≠ ARIA menu、処理progressbar ≠ 手続きstepper。

今回の分類は81能力: 実装済み29、簡易版19、未実装28、対象外5。分母は本調査の機能分類であり、公式部品全体に対する達成率ではない。

## 次に整備する順番

P0/P1はandmの利用目的からの優先順位（andm-original / sourceStatus: not-applicable）。公式5体系の多数決や科学的な点数ではない。実装順を決めた時点で各対象Seriesの部品仕様・版・媒体を取得し、値と操作を記録する。今回の依頼は対応表と不足リストの作成であり、以下の未実装部品を実装済みに変えていない。

1. **小さな不足を埋める（P0）**: 入力の接頭/接尾辞、文字数カウンター、削除タグ、説明リスト、引用ブロック、フォームのエラー集約。既存基礎部品の再利用範囲を広げる。
2. **よく使う複合操作（P1）**: Combobox → 複数選択/タグPicker → ファイルDrop/状態 → Data table → Calendar/期間選択 → Stepper。まずNativeで代替できない契約を固め、全部の見た目を一気に増やさない。
3. **既存簡易版の完成（P1）**: Tabs/Modal/Drawer/Popover/Tooltip/Menuの利用契約、フォーム全体、検索/件数/Pageの一連の見本。CSS本体にJS依存を強制せず、必要なcontrollerを任意の参照実装として検討する。
4. **用途が決まってから（P2/P3）**: Tree、階層Table、Inline edit、Mega menu、Footer、言語選択、Rating、Carousel、Commentなど。

## 機能対応表

公式欄は取得した一覧で対応する名称。**「—」はその一覧範囲で未掲載で、体系全体に存在しないという意味ではない。** 名前の近さは同等性を保証しない。公式のPreview/Caution/Betaや非推奨は採用時に個別確認する。

| 能力 | andmの状態 | 優先 | Carbon | Fluent 2 | DADS | USWDS | Atlassian |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ボタン・アイコンボタン | 実装済み | — | Button | Button | ボタン | Button | Button |
| FAB | 実装済み | — | — | — | — | — | — |
| 短文・複数行入力 | 実装済み | — | Text input | Input / Textarea | インプットテキスト / テキストエリア | Text input | Text area / Text field |
| 標準日時・数値・色入力 | 実装済み | — | — | — | — | — | — |
| チェックボックス | 実装済み | — | Checkbox | Checkbox | チェックボックス | Checkbox | Checkbox |
| ラジオグループ | 実装済み | — | Radio button | Radio group | ラジオボタン | Radio buttons | Radio |
| スイッチ | 実装済み | — | Toggle | Switch | スイッチ | — | Toggle |
| 単一セレクト | 実装済み | — | Dropdown / Select | Dropdown / Select | セレクトボックス | Select | Select |
| 単一スライダー | 実装済み | — | Slider | Slider | — | Range slider | Range |
| 同じ場の切替 | 実装済み | — | Content switcher | — | — | — | — |
| 選択チップ | 実装済み | — | — | — | — | — | — |
| ラベル・補足・エラー・必須 | 実装済み | — | — | Label | — | — | — |
| フォームフィールド・フォーム | 簡易版 | P1 | Form | Field | — | Form / Validation | Form |
| リンク・本文スキップ | 実装済み | — | Link | Link | — | Link | Link |
| 文字・見出し | 実装済み | — | — | Text | 見出し | Prose / Typography | Heading |
| コード・キーボードキー | 実装済み | — | Code snippet | — | — | — | Code |
| アイコン | 実装済み | — | — | Icon | — | Icon / Icon list | Icon |
| 画像 | 実装済み | — | — | Image | 画像 | — | Image |
| バッジ・状態ラベル | 実装済み | — | Tag | Badge | チップラベル | Tag | Badge / Date label / Lozenge |
| アバター | 実装済み | — | — | Avatar | — | — | Avatar |
| 区切り | 実装済み | — | — | Divider | ディバイダー | — | — |
| カード・タイル | 実装済み | — | Tile | Card | カード | Card | Tile |
| 箇条書き・構造化リスト | 実装済み | — | List / Structured list | List | 箇条書きリスト | List | — |
| リソース一覧 | 簡易版 | P2 | Contained list | — | リソースリスト | Collection | — |
| 静的テーブル | 実装済み | — | — | — | — | Table | Table |
| アコーディオン・disclosure | 実装済み | — | Accordion | Accordion | アコーディオン / ディスクロージャー | Accordion | — |
| タブ | 簡易版 | P1 | — | Tablist | タブ | — | Tabs |
| モーダルダイアログ | 簡易版 | P1 | Modal | Dialog | モーダルダイアログ | Modal | Modal dialog / Blanket |
| ドロワー | 簡易版 | P1 | — | Drawer | ドロワー | — | Drawer |
| ポップオーバー | 簡易版 | P1 | Popover | Popover | — | — | Inline dialog / Popup |
| ツールチップ | 簡易版 | P1 | Tooltip | Tooltip | — | Tooltip | Tooltip |
| アクションメニュー | 簡易版 | P1 | Menu / Menu buttons | Menu | メニューリスト / メニューリストボックス | — | Dropdown menu / Menu |
| パンくず | 実装済み | — | Breadcrumb | Breadcrumb | パンくずナビゲーション | Breadcrumb | Breadcrumbs |
| ページ送り | 簡易版 | P1 | Pagination | — | ページナビゲーション | Pagination | Pagination |
| ヘッダー・サイド・携帯ナビ | 簡易版 | P2 | UI shell | Nav | 水平メニュー / ハンバーガーメニューボタン / ヘッダーコンテナ / ボトムナビゲーション / モバイルメニュー / ユーティリティリンク | Header / Side navigation | Navigation system |
| ツールバー・ボタングループ | 簡易版 | P2 | — | Toolbar | — | Button group | — |
| 検索・絞り込み・結果ヘッダー | 簡易版 | P1 | Search | Searchbox | 検索ボックス | Search | — |
| アラート・トースト | 簡易版 | P2 | Notification | Message bar / Toast | ノティフィケーションバナー | Alert / Site alert | Flag / Inline message / Section message |
| 処理進捗・読み込み | 簡易版 | P1 | Inline loading / Loading / Progress bar | Progress bar / Spinner | プログレスインジケーター | — | Progress bar / Spinner |
| スケルトン | 実装済み | — | — | Skeleton | — | — | Skeleton |
| 空状態 | 実装済み | — | — | — | — | — | Empty state |
| 標準ファイル入力 | 実装済み | — | — | — | — | File input | — |
| 検索候補・コンボボックス | 未実装 | P1 | — | Combobox | コンボボックス | Combo box | — |
| 複数選択・タグピッカー | 未実装 | P1 | Multiselect | Tag picker | — | — | — |
| 削除可能タグ・入力チップ | 未実装 | P0 | — | Tag | チップタグ | — | Tag / Tag group |
| 日付選択・カレンダー | 未実装 | P1 | Date picker | — | 日付ピッカー／カレンダー | Date picker | Calendar / Date time picker |
| 期間選択 | 未実装 | P1 | — | — | — | Date range picker | — |
| 記憶している日付の分割入力 | 未実装 | P2 | — | — | — | Memorable date | — |
| 数値ステッパー・時刻ピッカー | 簡易版 | P2 | Number input | Spin button | — | Time picker | — |
| 区間スライダー | 未実装 | P2 | — | — | — | — | — |
| 入力の接頭・接尾辞 | 未実装 | P0 | — | — | — | Input prefix/suffix | — |
| 文字数カウンター | 未実装 | P0 | — | — | — | Character count | — |
| 入力マスク | 未実装 | P2 | — | — | — | Input mask | — |
| フォームのエラー集約 | 未実装 | P0 | — | — | — | — | — |
| 高度なデータテーブル | 簡易版 | P1 | Data table | — | テーブルコントロール / テーブル／データテーブル | — | Dynamic table |
| 階層テーブル | 未実装 | P2 | — | — | — | — | Table tree |
| ツリービュー | 未実装 | P2 | Tree view | Tree | — | — | — |
| ファイルアップロード・ドロップ | 簡易版 | P1 | File uploader | — | ファイルアップロード／ドロップエリア | — | — |
| 手続きのステップ表示 | 未実装 | P1 | Progress indicator | — | ステップナビゲーション | Process list / Step indicator | Progress indicator / Progress tracker |
| 説明リスト | 未実装 | P0 | — | — | 説明リスト | — | — |
| 引用ブロック | 未実装 | P0 | — | — | 引用ブロック | — | — |
| 注釈・要約・補足ブロック | 簡易版 | P2 | — | — | 注釈ブロック | Summary box | — |
| サイト全体・緊急バナー | 未実装 | P2 | — | — | 緊急時バナー | — | Banner |
| フッター | 未実装 | P2 | — | — | — | Footer | — |
| 目次・ページ内移動 | 未実装 | P2 | — | — | スクロールトップボタン / 目次 | In-page navigation | — |
| メガメニュー | 未実装 | P2 | — | — | メガメニュー | — | — |
| 言語選択 | 未実装 | P2 | — | — | ランゲージセレクター | Language selector | — |
| カルーセル・画像スライダー | 未実装 | P3 | — | Carousel | イメージスライダー / カルーセル | — | — |
| アバター群・人物情報 | 未実装 | P2 | — | Avatar group / Persona | — | — | Avatar group |
| 説明ボタン付きラベル | 未実装 | P2 | Toggletip | Info label | — | — | — |
| 評価入力 | 未実装 | P3 | — | Rating | — | — | — |
| インライン編集 | 未実装 | P2 | — | — | — | — | Inline edit |
| コメント | 未実装 | P3 | — | — | — | — | Comment |
| 操作ガイド・spotlight | 未実装 | P3 | — | — | — | — | Spotlight |
| レイアウト・ページ・面 | 簡易版 | P2 | — | — | — | Grid | Page / Page header / Panel |
| focus・visually hidden・reduced motion | 実装済み | — | — | — | — | — | Focus ring / Visually hidden |
| Framework provider・portal・lint支援 | 対象外 | — | — | Fluent provider | — | — | — |
| 公式ロゴ・企業固有の物体 | 対象外 | — | — | — | — | — | Object / Logo |
| 米国政府専用の識別バナー | 対象外 | — | — | — | — | Banner / Identifier | — |
| AI固有ラベル | 対象外 | — | AI label | — | — | — | — |
| グラフ・データ可視化 | 対象外 | — | — | — | — | Data visualizations | — |

## andmの実装範囲と残る機能

| 能力 | 既存パーツ | 現在の実装 | 不足・限界 | 次の完成条件 |
| --- | --- | --- | --- | --- |
| ボタン・アイコンボタン | `button` / `icon-button` | Native button、種類・サイズ・無効・選択 | 業務処理はアプリ側。公式再現度とは別軸。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| FAB | `fab` | 独自の主操作ボタン | 全シリーズに公式FABがあるという意味ではない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 短文・複数行入力 | `text-field` | input / textarea、補足・error・disabled | textareaは別Gallery項目として数えない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 標準日時・数値・色入力 | `native-input` | Native date/time/number等 | ブラウザ任せ。独自calendarやspin buttonには数えない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| チェックボックス | `checkbox` | Native checkbox、一部選択の見本 | indeterminate設定は消費側JS。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| ラジオグループ | `radio` | Native radio + fieldset/legend | 公式ロールの寸法一致は別監査。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| スイッチ | `switch` | Native checkboxのトグル表現 | 設定への即時反映はアプリ側。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 単一セレクト | `select` | Native select | 検索・複数選択のcomboboxには数えない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 単一スライダー | `slider` | Native range + 値表示 | 2つのつまみ・区間選択は別機能。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 同じ場の切替 | `segmented` | aria-pressedボタンとデモ | controllerはGalleryのみ。radio契約との使い分けが必要。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 選択チップ | `chip` | フィルター用pressedボタン | 入力/削除タグとは別。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| ラベル・補足・エラー・必須 | `label` / `helper-text` / `error-text` / `required-marker` | for/id・describedby・必須/任意表示 | 文字数制限やerror summaryは含まない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| フォームフィールド・フォーム | `form-field` / `form-actions` | ラベル/入力/説明、検証と保存の見本 | フォーム全体のエラー集約・非同期検証・再送信状態の共通契約がない。 | 検証→error summary→入力へfocus→修正→送信の一連の見本 |
| リンク・本文スキップ | `link` | Native a、skip link | URL/ルーティングは消費側。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 文字・見出し | `text` | 用途別typographyロール | 全シリーズの公式typography全値を再現済みではない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| コード・キーボードキー | `code` / `kbd` | Native code/pre/kbd + CSS | 構文ハイライトとコピーボタンは未共通化。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| アイコン | `icon` | 15個の独自SVG symbol | スターターのみ。公式アイコン集の網羅や再配布ではない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 画像 | `image` | Native img、比率・contain | キャプション・切り抜き・拡大viewerは含まない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| バッジ・状態ラベル | `badge` / `status` | 静的な分類/状態の表示 | 数値badge、lozenge、tagの差は用途別に再設計が必要。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| アバター | `avatar` | 単体人物の画像/文字表示 | group/personaは別機能。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 区切り | `divider` | Native hrとdivider CSS | 別途のdivider操作はない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| カード・タイル | `card` | コンテンツ/操作をまとめる面 | 選択tileなど固有操作は別。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 箇条書き・構造化リスト | `list` | Nativeリスト、情報行 | structured listの選択・contained listの操作は簡易相当。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| リソース一覧 | `resource-item` | 情報/リンク/末尾操作の見本 | 大量データ・選択・複合操作・実データ連携は未共通化。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 静的テーブル | `table` | Native table、見出しとセル | sort/selection/編集付きdata tableではない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| アコーディオン・disclosure | `accordion` | Native details/summary | 複数項目の排他的開閉は消費側。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| タブ | `tabs` | ARIA関連付け、矢印/Home/End、panel focusのデモ | 再利用controllerは配布されずGallery専用。遅延/remote panelの契約はない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| モーダルダイアログ | `dialog` | Native dialog、Galleryのopen/close | 再利用controller・非同期確認・積層時の契約は未提供。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| ドロワー | `drawer` | 端からのパネル、見本の開閉 | modal/non-modal両方のfocus/背景操作契約を製品向けに固定していない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| ポップオーバー | `popover` | 見本の開閉・Escape・focus復帰 | viewport衝突回避・位置追従・再利用controllerはない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| ツールチップ | `tooltip` | describedby、hover/focus、Escapeのデモ | viewport衝突回避・共通controllerの配布はない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| アクションメニュー | `menu` / `action-menu` | Disclosure + Nativeボタン、Tab/Escape | ARIA menuの矢印キー・typeahead・submenuは未実装。 | menu契約を採用する場合、Arrow/Home/End/typeahead/submenu/focus復帰を実装 |
| パンくず | `breadcrumb` | 階層とaria-current | 省略/折り返し方針の追加検証は必要。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| ページ送り | `pagination` | 移動ボタンの表示・現在ページ | データ総件数/URL/disabledとの同期は見本外。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| ヘッダー・サイド・携帯ナビ | `header-nav` / `side-nav` / `mobile-nav` / `bottom-nav` | リンク・階層details・開閉の見本 | 実ルート同期・大階層・modal携帯メニューの標準契約は未提供。DADS bottomは非推奨。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| ツールバー・ボタングループ | `toolbar` | 操作ボタンの群化 | ARIA toolbarのroving tabindex/矢印操作は未実装。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 検索・絞り込み・結果ヘッダー | `search-form` / `filter-bar` / `results-header` | 入力/検索/クリア/並び替え見本 | 非同期検索・キャンセル・URL/件数/ページ同期はアプリ側。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| アラート・トースト | `alert` / `toast` | info/success/warning/error、表示/閉じる見本 | 通知queue・重複抑制・タイムアウト/重要度の共通契約がない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 処理進捗・読み込み | `progress` / `spinner` / `loading-state` | progressbar、spinner、busy/完了の見本 | 通信・cancel/retry/失敗時遷移は消費側。DADS部分処理は静止hourglass。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| スケルトン | `skeleton` | 静止したplaceholder | DADSでは使用しない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 空状態 | `empty-state` | 説明と次の操作の見本 | 業務固有の文章と操作はアプリ側。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 標準ファイル入力 | `file-input` | 単一/複数のNative選択・無効・ファイル名表示 | ドロップ・削除・検証・送信状態とは別機能。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 検索候補・コンボボックス | — | 該当APIなし | Native select/inputの存在で実装済みにしない。 | 候補絞り込み、IME、単一選択、Arrow/Enter/Escape、名称/active option、no results、async状態 |
| 複数選択・タグピッカー | — | Checkbox群で代替可能 | 検索付き選択、選択済み一覧、解除の統合APIなし。 | 選択/解除、重複抑止、keyboard、件数/選択状態、候補検索 |
| 削除可能タグ・入力チップ | — | badge/選択chipは代替にならない | 独立削除操作と削除後focusがない。 | ラベルと削除を分離し、accessible name、Backspace/Delete、削除後focusを定義 |
| 日付選択・カレンダー | — | Native dateは別行で実装済み | 独自カレンダーと日付範囲/制約のAPIなし。 | Native代替を維持、月/年移動、日付制限、keyboard、locale、日本語、入力同期 |
| 期間選択 | — | 独立APIなし | 開始/終了の関連付け・逆転・範囲制約がない。 | 開始/終了の同期、逆転エラー、clear、ラベル/補足/keyboard |
| 記憶している日付の分割入力 | — | Native日時入力のみ | 月/日/年などの分割入力パターンはない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 数値ステッパー・時刻ピッカー | `native-input` | Native number/time | 専用stepper、カスタム時刻候補は未実装。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 区間スライダー | — | つまみ1つのみ | 2値の順序、同値、keyboard契約なし。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 入力の接頭・接尾辞 | — | 独立APIなし | 通貨/単位の表示と入力文字の区別がない。 | prefix/suffixを値と区別、読み上げ、長文/狭幅/error/disabled |
| 文字数カウンター | — | 独立APIなし | 制限/残り文字数/IME/通知の契約なし。 | 入力と同期、上限超過、IME中更新、通知の過剰発火防止 |
| 入力マスク | — | HTML入力型の標準制約のみ | 書式の整形/貼付け/IME/caret制御がない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| フォームのエラー集約 | — | 個々のerror表示のみ | 一覧、入力へのリンク、送信後focus管理なし。 | 複数エラーの要約、リンクで入力へfocus、修正後更新、非同期/必須 |
| 高度なデータテーブル | `table` / `filter-bar` / `results-header` / `pagination` | 静的表と独立した操作の見本 | sort、複数行選択、bulk action、列制御、ページの統合なし。 | sort状態/通知、行選択、一部選択、bulk、page/件数同期、空/失敗/待機、狭幅 |
| 階層テーブル | — | 独立APIなし | treegrid、展開/選択/keyboard契約なし。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| ツリービュー | — | side-nav detailsで代替可能 | treeの矢印キー、focus、選択、データ階層の契約なし。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| ファイルアップロード・ドロップ | `file-input` | Native選択のみ | drop、一覧/削除、size/type検証、progress/retry/cancel契約なし。サーバーはアプリ責務。 | drop/keyboard両対応、一覧/削除、size/type検証、進捗/失敗/retry/cancelイベント |
| 手続きのステップ表示 | — | progressbarは代替にしない | 現在/完了/未完/エラー、移動可否の契約なし。 | aria-current=step、順序、完了/エラー、戻る/進む、狭幅。処理進捗と区別 |
| 説明リスト | — | 独立CSS/見本なし | Native dlを使用可能だが部品化・長文例なし。 | dt/ddの関係、長文、複数dd、狭幅、Series文字階層 |
| 引用ブロック | — | 独立CSS/見本なし | Native blockquoteの組み込み方針・出典表示なし。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 注釈・要約・補足ブロック | `helper-text` / `alert` | 短い説明と通知で一部代替 | 補足と通知の意味を分離した独立例なし。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| サイト全体・緊急バナー | — | 局所alertのみ | 全体通知、配置、緊急情報の契約なし。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| フッター | — | 独立APIなし | 長いページの移動と補助情報の組み合わせなし。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 目次・ページ内移動 | — | Native aで代替可能 | 目次生成、現在位置、sticky/focus、scroll top部品なし。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| メガメニュー | — | 小さいmenuのみ | 大領域、複数群、閉じる/focus/携帯変換の契約なし。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 言語選択 | — | selectで代替可能 | 言語名・現在言語・切替先・ページ移動の契約なし。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| カルーセル・画像スライダー | — | imageのみ | 移動/ページ位置/停止/keyboard/読み上げの契約なし。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| アバター群・人物情報 | — | avatar単体のみ | overflow人数、persona名/役割、群の説明なし。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 説明ボタン付きラベル | — | label + popoverで構成可能 | ラベル/入力/説明ボタンのfocusと関連付けの統合例なし。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 評価入力 | — | 独立APIなし | 点数の名前/値/keyboard・読み取り専用表示なし。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| インライン編集 | — | inputはある | 閲覧/編集、保存/取消/失敗、focus復帰の契約なし。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| コメント | — | 独立APIなし | 投稿/返信/作者/編集など製品の要件に依存。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 操作ガイド・spotlight | — | 独立APIなし | 順序/skip/背景操作/focus復帰の契約なし。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| レイアウト・ページ・面 | — | tokensと各compositionのflex/grid | 汎用Box/Stack/Grid APIはない。既存責務で必要分を定義。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| focus・visually hidden・reduced motion | — | focus hooks、utility、motion停止 | 全コンポーネントの支援技術適合認証ではない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| Framework provider・portal・lint支援 | — | CSS-first/FW非依存が目的 | React provider/portal/ESLintプラグインを追加数の目標にしない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 公式ロゴ・企業固有の物体 | — | 他社assetは配布しない | 他社のbrand/logo/objectをandm共通部品にしない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| 米国政府専用の識別バナー | — | andm用途ではない | USWDS Banner/Identifierの政府機関表示は再現・偽装しない。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| AI固有ラベル | — | 一般UIの必須部品ではない | AI機能の具体要件がある時に検討。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |
| グラフ・データ可視化 | — | 本調査は一般Web部品を対象 | 別ライブラリ領域。必要時に独立設計/調査。 | 対象機能の仕様・状態・Native/ARIA契約を取得し、狭幅/日本語/キー操作を確認 |

## 公式資料・版・取得範囲

一覧の本文確認日は全て2026-10-08。一覧確認に基づく名称対応は derived、andmの状態判定・優先順位はコード照合による andm-original。各部品の全仕様の取得状態は unverified（個別記録のあるものを除く）。

- [Carbon公式一覧](https://www.carbondesignsystem.com/building-blocks/core/components/overview/components): Carbon Core、2026-08-18更新表示。package版は未固定。一覧中の名称/用途のみ。
- [Fluent 2公式一覧](https://fluent2.microsoft.design/components/web/react): Web React一覧、Fluent UI React v9へのリンク。Preview表示を含む。一覧中の名称/用途のみ。
- [DADS公式一覧](https://design.digital.go.jp/dads/components/): β版v2.18.0。一覧中の名称/用途のみ。
- [USWDS公式一覧](https://designsystem.digital.gov/components/overview/): v3.14.0、一覧表示47 components。一覧中の名称/用途のみ。
- [Atlassian公式一覧](https://atlassian.design/components/): 継続更新、package版は未固定。Caution/Beta/Early accessは状態を保持。一覧中の名称/用途のみ。

追加で本文確認した [Fluent Combobox](https://fluent2.microsoft.design/components/web/react/core/combobox/usage) は候補絞り込み/自由入力/複数選択を区別する。[DADS File upload](https://design.digital.go.jp/dads/components/file-upload/) はファイル選択とドラッグ＆ドロップを扱う。Native select/file-inputだけでは同じ能力を満たさない判断に使用した。

### 一覧比較が未完了のSeries

- Material 3: [Components](https://m3.material.io/components)はJS必須本文のみ。今回の一覧比較から除外し、存在しないと断定しない。
- Apple: [HIG Components](https://developer.apple.com/design/human-interface-guidelines/components)はJS必須本文のみ。WebとAppleプラットフォームの部品を同列に数えない。
- Spectrum: 旧 `/page/components/`・`/page/button/` の取得失敗後、[現在の入口](https://spectrum.adobe.com/)と[Web React Button](https://spectrum.adobe.com/web/rsp/components/button)を確認できた。React/Web Components領域が分かれ、本文にfragmentへのリンクが含まれる。全一覧と同一版の部品仕様は今回未取得。既存Seriesへ新仕様を無断混在させない。
- Baseline / Soft / Dense / Technical / Editorial / Playful: 外部の公式一覧はnot-applicable。独自の目的と利用範囲で完成条件を判断する。

### 配布と品質の不足

部品数に加え、利用契約、状態表、支援技術の確認、Safari/Firefox/実機、国際化、APIの安定性・変更履歴、配布controllerの責務、実製品での検証が必要。GalleryのJSだけで動くものをnpmの完成した操作APIとは呼ばない。

コード台帳は [COMPONENT-COVERAGE.json](COMPONENT-COVERAGE.json)。`npm run audit:coverage` で58パーツの網羅、分類、既存見本参照、公式記録と表示文書の一致を確認する。再確認は新しい部品・機能を追加した時、公式一覧の更新時、比較媒体/版を変更した時に行う。

## 今回の検証

全58パーツを81能力へ対応付け、JSON台帳・状態集計・表示文書の一致を確認。build、audit:tokens、audit:sources、audit:coverage、diffチェックは成功。Chromiumで320/1280px×root文字100/200%の文献ページを確認し、ページ全体の横はみ出し0、幅のある表は表内スクロール。JSON台帳へのリンク、既存再監査ページへの移動、部品一覧からの導線を確認。支援技術・Safari/Firefox・実機は今回未検証。
