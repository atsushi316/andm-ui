# アトミック部品の整備範囲

「全て」は無限のUI分類ではなく、現在のandm-uiで一般的なWebアプリを構成する小さな単位を対象にする。複数部品を組む検索バー・フォーム・ナビゲーション、コンボボックス、カレンダー、ゲームメニュー、XRは別の段階。

| 責務 | 単位 | 状態 |
| --- | --- | --- |
| 操作 | Button、IconButton、FAB、選択Chip | 既存＋IconButton追加 |
| 文字入力 | Text field、Textarea | 既存。文字ロール反映 |
| 標準入力 | Search、Email、Password、Tel、URL、Number、Date、Time、Datetime-local、Color | 既存Text fieldのNative HTML APIとして見本整備 |
| ファイル | File input（単一・複数・無効） | 追加。送信機能を含めない |
| 選択 | Checkbox、Radio、Switch、Select、Slider、Segmented | 既存。Checkboxの一部選択を追加 |
| 文字 | Display、Headline、Title、Body、Body small、Label、Caption、Code | 用途別の定義・見本追加 |
| 入力の情報 | Label、Helper、Error、Required、Optional | 独立API追加。既存Text fieldのBEMも維持 |
| 移動 | Text link、Skip link | 追加。既存Breadcrumb等とは別 |
| 記号 | Icon、Badge、Avatar、Divider、Spinner | Icon追加、他は既存 |
| 状態 | Status indicator | 追加。点とテキストで伝える |
| 技術表記 | Inline code、Code block、Keyboard key | 追加 |
| メディア | Image（自然比率、正方形、横長、contain） | 追加 |
| 補助 | Visually hidden、Focus、Reduced motion | utility追加、既存の標準focus/motionを利用 |

文字の太さ、斜体など意味を持つHTML（strong/em等）はブラウザ標準を利用し、全タグに新しいクラスを作らない。Iconの線画は15種のスターターで、世の中の全記号を網羅するものではない。

## 他体系と比べた完成範囲

この一覧の整備完了は、成熟したデザインシステムとの同等性を意味しない。複合操作や足りない小部品は [COMPONENT-COVERAGE.md](COMPONENT-COVERAGE.md) を参照。Native日時入力とCalendar、File選択とUploadを区別する。

## 使い方

- `.andm-text` と `--display / --headline / --title / --small / --caption / --label / --muted / --strong`
- `.andm-icon` と `--sm / --lg / --filled`。SVG形状は消費側で選べる。filledは塗り用のSVG形状に使い、線画の全アイコンを自動変換するものではない。配布の `@atsushi316/andm-ui/icons.svg` は独自symbol集。
- `.andm-icon-button` と `--filled / --outlined`。`aria-label`を付ける。選択型は`aria-pressed`。
- `.andm-link`はa + href。`.andm-skip-link`は本文への移動。
- `.andm-label`はlabel + for、`.andm-helper / .andm-error`は説明とエラー、`.andm-required / .andm-optional`は表示。
- `.andm-status`と`--info / --success / --warning / --error`。静的表示に常時live regionを付けない。
- `.andm-code`はcodeまたはpre、`.andm-kbd`はkbd。
- `.andm-image`と`--square / --wide / --contain`。altとwidth/heightを指定する。
- `.andm-file-input`はinput type=file。ラベル・説明を関連付ける。
- `.andm-visually-hidden`は視覚的に隠す説明。操作要素を隠す目的で使わない。

Galleryの「この部品のHTMLを使う」は先頭例をコピーする。エラー検証やトグル、ファイル名表示、チェックボックスのindeterminateプロパティは消費側JavaScriptで実装する。HTMLのidは使用先で重複しない値へ変更する。

## 検証

2026-10-08、Chromium 153で確認。

- 44部品 × 14シリーズ × 320/390/800/1280px：2,464組でページ全体の横はみ出しなし。
- 新規13種（文字・入力・IconButton・説明等）×14シリーズをroot文字200%でも確認。標準日時入力によるGridのはみ出しを修正し、再確認でなし。
- IconButtonのSpace/Enterと選択解除、44px以上の操作領域、ラベルから入力へのfocus、エラー表示・解除と関連付け、ファイル選択、Checkbox一部選択、HTMLのクリップボードコピー、日本語検索、携帯メニュー/Escape、出典閲覧：成功。
- reduced-motionで新規IconButtonの遷移を停止。JavaScript例外なし。
- DADS/Fluent/Carbonを含む全シリーズの本文サイズ・行高・通常字重をcomputed styleで確認。携帯の文字見本と一覧のスクリーンショットを目視確認。
- CSSビルド、199トークンの必須未定義参照なし、JS構文、diffチェック：成功。HTMLのid重複とlabel参照切れなし。

iOS/Safari実機、スクリーンリーダー、実機XRは未確認。標準Date/Time/Fileの内部表示はOS/ブラウザ依存。文字200%はroot文字拡大による検証で、各OSの拡大設定の代用とは主張しない。
