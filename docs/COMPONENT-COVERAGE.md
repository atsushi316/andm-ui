# 他のデザインシステムとの部品・機能対応表

2026-10-10更新。能力単位の棚卸しであり、各体系の全機能・全variant・公式外観の同等性を保証する表ではない。

[操作可能な統合サンプル](../gallery/completion/) · [任意の操作API](BEHAVIOR.md) · [検証記録](COMPONENT-COMPLETION-VALIDATION.md)

「実装済み」はこの行の基本見本と契約があること。「簡易版」は統合操作に残課題があること。「対象外」は今回の能力分類の範囲外。公式一覧を取得できても個々の全仕様を確認した扱いにしない。

集計: 実装済み73、簡易版3、未実装0、対象外5。分母は独自の81能力分類で、公式体系の達成率ではない。

公式欄の「—」は確認した一覧の範囲で未掲載。体系全体に存在しないという意味ではない。Preview / Beta / Caution等は個別採用時に維持・確認する。

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
| フォームフィールド・フォーム | 実装済み | P1 | Form | Field | — | Form / Validation | Form |
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
| タブ | 実装済み | — | Tabs | Tablist | タブ | — | Tabs |
| モーダルダイアログ | 実装済み | — | Modal | Dialog | モーダルダイアログ | Modal | Modal dialog / Blanket |
| ドロワー | 実装済み | P1 | — | Drawer | ドロワー | — | Drawer |
| ポップオーバー | 実装済み | P1 | Popover | Popover | — | — | Inline dialog / Popup |
| ツールチップ | 実装済み | P1 | Tooltip | Tooltip | — | Tooltip | Tooltip |
| アクションメニュー | 実装済み | — | Menu / Menu buttons | Menu | メニューリスト / メニューリストボックス | — | Dropdown menu / Menu |
| パンくず | 実装済み | — | Breadcrumb | Breadcrumb | パンくずナビゲーション | Breadcrumb | Breadcrumbs |
| ページ送り | 実装済み | P1 | Pagination | — | ページナビゲーション | Pagination | Pagination |
| ヘッダー・サイド・携帯ナビ | 簡易版 | P2 | UI shell | Nav | 水平メニュー / ハンバーガーメニューボタン / ヘッダーコンテナ / ボトムナビゲーション / モバイルメニュー / ユーティリティリンク | Header / Side navigation | Navigation system |
| ツールバー・ボタングループ | 実装済み | P2 | — | Toolbar | — | Button group | — |
| 検索・絞り込み・結果ヘッダー | 実装済み | P1 | Search | Searchbox | 検索ボックス | Search | — |
| アラート・トースト | 実装済み | — | Notification | Message bar / Toast | ノティフィケーションバナー | Alert / Site alert | Flag / Inline message / Section message |
| 処理進捗・読み込み | 実装済み | — | Inline loading / Loading / Progress bar | Progress bar / Spinner | プログレスインジケーター | — | Progress bar / Spinner |
| スケルトン | 実装済み | — | — | Skeleton | — | — | Skeleton |
| 空状態 | 実装済み | — | — | — | — | — | Empty state |
| 標準ファイル入力 | 実装済み | — | — | — | — | File input | — |
| 検索候補・コンボボックス | 実装済み | — | — | Combobox | コンボボックス | Combo box | — |
| 複数選択・タグピッカー | 実装済み | — | Multiselect | Tag picker | — | — | — |
| 削除可能タグ・入力チップ | 実装済み | — | — | Tag | チップタグ | — | Tag / Tag group |
| 日付選択・カレンダー | 実装済み | — | Date picker | — | 日付ピッカー／カレンダー | Date picker | Calendar / Date time picker |
| 期間選択 | 実装済み | — | — | — | — | Date range picker | — |
| 記憶している日付の分割入力 | 実装済み | — | — | — | — | Memorable date | — |
| 数値ステッパー・時刻ピッカー | 簡易版 | P2 | Number input | Spin button | — | Time picker | — |
| 区間スライダー | 実装済み | — | — | — | — | — | — |
| 入力の接頭・接尾辞 | 実装済み | — | — | — | — | Input prefix/suffix | — |
| 文字数カウンター | 実装済み | — | — | — | — | Character count | — |
| 入力マスク | 実装済み | — | — | — | — | Input mask | — |
| フォームのエラー集約 | 実装済み | — | — | — | — | — | — |
| 高度なデータテーブル | 実装済み | — | Data table | — | テーブルコントロール / テーブル／データテーブル | — | Dynamic table |
| 階層テーブル | 実装済み | — | — | — | — | — | Table tree |
| ツリービュー | 実装済み | — | Tree view | Tree | — | — | — |
| ファイルアップロード・ドロップ | 実装済み | — | File uploader | — | ファイルアップロード／ドロップエリア | — | — |
| 手続きのステップ表示 | 実装済み | — | Progress indicator | — | ステップナビゲーション | Process list / Step indicator | Progress indicator / Progress tracker |
| 説明リスト | 実装済み | — | — | — | 説明リスト | — | — |
| 引用ブロック | 実装済み | — | — | — | 引用ブロック | — | — |
| 注釈・要約・補足ブロック | 実装済み | — | — | — | 注釈ブロック | Summary box | — |
| サイト全体・緊急バナー | 実装済み | — | — | — | 緊急時バナー | — | Banner |
| フッター | 実装済み | — | — | — | — | Footer | — |
| 目次・ページ内移動 | 実装済み | — | — | — | スクロールトップボタン / 目次 | In-page navigation | — |
| メガメニュー | 実装済み | — | — | — | メガメニュー | — | — |
| 言語選択 | 実装済み | — | — | — | ランゲージセレクター | Language selector | — |
| カルーセル・画像スライダー | 実装済み | — | — | Carousel | イメージスライダー / カルーセル | — | — |
| アバター群・人物情報 | 実装済み | — | — | Avatar group / Persona | — | — | Avatar group |
| 説明ボタン付きラベル | 実装済み | — | Toggletip | Info label | — | — | — |
| 評価入力 | 実装済み | — | — | Rating | — | — | — |
| インライン編集 | 実装済み | — | — | — | — | — | Inline edit |
| コメント | 実装済み | — | — | — | — | — | Comment |
| 操作ガイド・spotlight | 実装済み | — | — | — | — | — | Spotlight |
| レイアウト・ページ・面 | 実装済み | — | — | — | — | Grid | Page / Page header / Panel |
| focus・visually hidden・reduced motion | 実装済み | — | — | — | — | — | Focus ring / Visually hidden |
| Framework provider・portal・lint支援 | 対象外 | — | — | Fluent provider | — | — | — |
| 公式ロゴ・企業固有の物体 | 対象外 | — | — | — | — | — | Object / Logo |
| 米国政府専用の識別バナー | 対象外 | — | — | — | — | Banner / Identifier | — |
| AI固有ラベル | 対象外 | — | AI label | — | — | — | — |
| グラフ・データ可視化 | 対象外 | — | — | — | — | Data visualizations | — |

## 出典一覧

- [Carbon](https://www.carbondesignsystem.com/building-blocks/core/components/overview/components) — Carbon Core、2026-08-18更新表示。package版は未固定。一覧本文を確認。各部品の全機能・全実装版を確認した意味ではない。
- [Fluent 2](https://fluent2.microsoft.design/components/web/react) — Web React一覧、Fluent UI React v9へのリンク。Preview表示を含む。一覧本文を確認。各部品の全機能・全実装版を確認した意味ではない。
- [DADS](https://design.digital.go.jp/dads/components/) — β版v2.18.0。一覧本文を確認。各部品の全機能・全実装版を確認した意味ではない。
- [USWDS](https://designsystem.digital.gov/components/overview/) — v3.14.0、一覧表示47 components。一覧本文を確認。各部品の全機能・全実装版を確認した意味ではない。
- [Atlassian](https://atlassian.design/components/) — 継続更新、package版は未固定。Caution/Beta/Early accessは状態を保持。一覧本文を確認。各部品の全機能・全実装版を確認した意味ではない。

## 残課題

簡易版のリソース一覧・数値ステッパー/時刻Picker・包括的ナビゲーション契約、および各体系の部品固有仕様の照合は残る。新規38見本の追加を、成熟したデザインシステム全体との同等性とは扱わない。Apple HIG / Material 3の動的ページ本文未取得を「定義なし」に読み替えない。
