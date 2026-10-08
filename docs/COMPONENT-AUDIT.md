# 部品の概念・出典の照合

確認日：2026-10-08。Galleryの58部品を、責務・HTMLの意味・状態・操作モデル・Seriesの公式/独自/未確認の区別から見直した。実装の全数値が公式と一致するという監査ではない。元のWeb本文とプロジェクトの記録を区別する。

## 実際に見つけた不一致

- Search：ページ横幅のはみ出しだけを測っていたため、ラベルを含む中央揃えによる入力とボタンの上下ずれを見逃した。入力の下端・操作のまとまりとレスポンシブ配置を修正。
- DADS Bottom nav：公式は非推奨。前回は出典の注意を見本へ伝えていなかった。見本は独自Compositionとして残し、DADS選択時は代替と注意を表示する。
- Legacy Menu：通常Tabで操作する実装にmenu/menuitem roleが付いていた。役割と動作をDisclosureの操作一覧へ統一。ページ位置を表すaria-currentも操作ボタンから除去。
- Tooltip：説明との関連付けとEscapeが不足。説明のid/describedby、Escapeとhoverを追加。
- Popover：non-modalでも開閉時のfocusとEscapeが必要。追加。
- Resource item：toggleラベルを切替時に変えていた。aria-pressedと固定の名前へ修正。

## 部品ごとの照合

下表の「確認」は意味・責務の対応付け。色・寸法の公式再現の合格印ではない。

| 部品 | 概念・契約 | 根拠 | 判定・対応 |
|---|---|---|---|
| text | 情報の意味と見た目を分離。見出し階層はHTML、字は用途別ロール | 文字契約・ATOMIC-SOURCES | 契約を照合。見た目は既存マッピング/独自仕様。 |
| icon | 視覚情報。装飾と意味を区別し、状態を色だけで伝えない | WAI Images / andm独自仕様 | 契約を照合。見た目は既存マッピング/独自仕様。 |
| icon-button | 操作はbutton。名前・状態・無効・focusを持つ。選択型は名前を変えずpressedで伝える | WAI Button / Google Chip・FAB | 契約を照合。見た目は既存マッピング/独自仕様。 |
| link | 移動と操作を区別。現在位置・階層・開閉・ページを明示 | WAI Disclosure / DADS / USWDS / Fluent Nav | 契約を照合。見た目は既存マッピング/独自仕様。 |
| label | 入力の目的・必須・補足・修正方法を関連付ける。標準入力を使う | WAI Labels / Notifications / USWDS Form | 契約を照合。見た目は既存マッピング/独自仕様。 |
| helper-text | 入力の目的・必須・補足・修正方法を関連付ける。標準入力を使う | WAI Labels / Notifications / USWDS Form | 契約を照合。見た目は既存マッピング/独自仕様。 |
| error-text | 入力の目的・必須・補足・修正方法を関連付ける。標準入力を使う | WAI Labels / Notifications / USWDS Form | 契約を照合。見た目は既存マッピング/独自仕様。 |
| required-marker | 入力の目的・必須・補足・修正方法を関連付ける。標準入力を使う | WAI Labels / Notifications / USWDS Form | 契約を照合。見た目は既存マッピング/独自仕様。 |
| status | 視覚情報。装飾と意味を区別し、状態を色だけで伝えない | WAI Images / andm独自仕様 | 契約を照合。見た目は既存マッピング/独自仕様。 |
| code | 情報の意味と見た目を分離。見出し階層はHTML、字は用途別ロール | 文字契約・ATOMIC-SOURCES | 契約を照合。見た目は既存マッピング/独自仕様。 |
| kbd | 情報の意味と見た目を分離。見出し階層はHTML、字は用途別ロール | 文字契約・ATOMIC-SOURCES | 契約を照合。見た目は既存マッピング/独自仕様。 |
| image | 画像の意味に応じてaltを選ぶ。クロップと比率は独自 | WAI Images | 契約を照合。見た目は既存マッピング/独自仕様。 |
| file-input | 入力の目的・必須・補足・修正方法を関連付ける。標準入力を使う | WAI Labels / Notifications / USWDS Form | 契約を照合。見た目は既存マッピング/独自仕様。 |
| native-input | 入力の目的・必須・補足・修正方法を関連付ける。標準入力を使う | WAI Labels / Notifications / USWDS Form | 契約を照合。見た目は既存マッピング/独自仕様。 |
| button | 操作はbutton。名前・状態・無効・focusを持つ。選択型は名前を変えずpressedで伝える | WAI Button / Google Chip・FAB | 契約を照合。見た目は既存マッピング/独自仕様。 |
| text-field | 入力の目的・必須・補足・修正方法を関連付ける。標準入力を使う | WAI Labels / Notifications / USWDS Form | 契約を照合。見た目は既存マッピング/独自仕様。 |
| checkbox | 選択と値の変更。Native control、名前・値・無効状態を保持 | WAI Switch / Slider / Labels | 契約を照合。見た目は既存マッピング/独自仕様。 |
| radio | 選択と値の変更。Native control、名前・値・無効状態を保持 | WAI Switch / Slider / Labels | 契約を照合。見た目は既存マッピング/独自仕様。 |
| switch | 選択と値の変更。Native control、名前・値・無効状態を保持 | WAI Switch / Slider / Labels | 既存のNative checkbox + role=switchを確認。用途と通知する役割は一致。 |
| select | 選択と値の変更。Native control、名前・値・無効状態を保持 | WAI Switch / Slider / Labels | 契約を照合。見た目は既存マッピング/独自仕様。 |
| divider | 視覚情報。装飾と意味を区別し、状態を色だけで伝えない | WAI Images / andm独自仕様 | 契約を照合。見た目は既存マッピング/独自仕様。 |
| badge | 視覚情報。装飾と意味を区別し、状態を色だけで伝えない | WAI Images / andm独自仕様 | 契約を照合。見た目は既存マッピング/独自仕様。 |
| card | 情報のグループと関係。表の見出し、Native details、独立した末尾操作 | WAI Tables / Disclosure / andm責務 | 契約を照合。見た目は既存マッピング/独自仕様。 |
| alert | 状態・処理・結果を伝える。必要な動的通知と静的表示を分ける | WAI Notifications / DADS Progress / Fluent Spinner | 契約を照合。見た目は既存マッピング/独自仕様。 |
| dialog | 一時的情報・操作。modalとnon-modal、説明と操作一覧を区別する | WAI Dialog / Tooltip / Disclosure | 契約を照合。見た目は既存マッピング/独自仕様。 |
| tabs | 同じ場所のパネルを切り替え、矢印移動と選択を同期する | WAI Tabs | 契約を照合。見た目は既存マッピング/独自仕様。 |
| slider | 選択と値の変更。Native control、名前・値・無効状態を保持 | WAI Switch / Slider / Labels | 契約を照合。見た目は既存マッピング/独自仕様。 |
| toast | 状態・処理・結果を伝える。必要な動的通知と静的表示を分ける | WAI Notifications / DADS Progress / Fluent Spinner | 契約を照合。見た目は既存マッピング/独自仕様。 |
| tooltip | 一時的情報・操作。modalとnon-modal、説明と操作一覧を区別する | WAI Dialog / Tooltip / Disclosure | 修正：説明id/describedby・Escape・説明へポインターを移動できる状態を追加。 |
| breadcrumb | 移動と操作を区別。現在位置・階層・開閉・ページを明示 | WAI Disclosure / DADS / USWDS / Fluent Nav | 契約を照合。見た目は既存マッピング/独自仕様。 |
| pagination | 移動と操作を区別。現在位置・階層・開閉・ページを明示 | WAI Disclosure / DADS / USWDS / Fluent Nav | 契約を照合。見た目は既存マッピング/独自仕様。 |
| menu | 一時的情報・操作。modalとnon-modal、説明と操作一覧を区別する | WAI Dialog / Tooltip / Disclosure | 修正：通常のTab操作にARIA menu/menuitemを付けていた。Disclosureの操作一覧に変更。 |
| drawer | 一時的情報・操作。modalとnon-modal、説明と操作一覧を区別する | WAI Dialog / Tooltip / Disclosure | 契約を照合。見た目は既存マッピング/独自仕様。 |
| popover | 一時的情報・操作。modalとnon-modal、説明と操作一覧を区別する | WAI Dialog / Tooltip / Disclosure | 修正：開閉後focus・Escape・外側/離脱時の閉じる処理を追加。 |
| table | 情報のグループと関係。表の見出し、Native details、独立した末尾操作 | WAI Tables / Disclosure / andm責務 | 契約を照合。見た目は既存マッピング/独自仕様。 |
| list | 情報のグループと関係。表の見出し、Native details、独立した末尾操作 | WAI Tables / Disclosure / andm責務 | 契約を照合。見た目は既存マッピング/独自仕様。 |
| accordion | 情報のグループと関係。表の見出し、Native details、独立した末尾操作 | WAI Tables / Disclosure / andm責務 | 契約を照合。見た目は既存マッピング/独自仕様。 |
| progress | 状態・処理・結果を伝える。必要な動的通知と静的表示を分ける | WAI Notifications / DADS Progress / Fluent Spinner | 契約を照合。見た目は既存マッピング/独自仕様。 |
| spinner | 状態・処理・結果を伝える。必要な動的通知と静的表示を分ける | WAI Notifications / DADS Progress / Fluent Spinner | 契約を照合。見た目は既存マッピング/独自仕様。 |
| skeleton | 状態・処理・結果を伝える。必要な動的通知と静的表示を分ける | WAI Notifications / DADS Progress / Fluent Spinner | 契約を照合。見た目は既存マッピング/独自仕様。 |
| avatar | 視覚情報。装飾と意味を区別し、状態を色だけで伝えない | WAI Images / andm独自仕様 | 契約を照合。見た目は既存マッピング/独自仕様。 |
| segmented | 操作はbutton。名前・状態・無効・focusを持つ。選択型は名前を変えずpressedで伝える | WAI Button / Google Chip・FAB | 契約を照合。見た目は既存マッピング/独自仕様。 |
| chip | 操作はbutton。名前・状態・無効・focusを持つ。選択型は名前を変えずpressedで伝える | WAI Button / Google Chip・FAB | 独立した絞り込みだけ。入力/削除Chipを実装済みとしない。 |
| fab | 操作はbutton。名前・状態・無効・focusを持つ。選択型は名前を変えずpressedで伝える | WAI Button / Google Chip・FAB | 主操作を示す独自仕様。全Series公式FAB寸法の再現ではない。 |
| form-field | 入力の目的・必須・補足・修正方法を関連付ける。標準入力を使う | WAI Labels / Notifications / USWDS Form | 契約を照合。見た目は既存マッピング/独自仕様。 |
| search-form | タスクをまとめる。検索実行・適用・並び替え・保存状態を区別する | DADS Search / USWDS Search / andm独自Composition | 修正：ラベル込み中央揃えをやめ入力/ボタンの下端を揃える。携帯は入力と操作を別段。 |
| filter-bar | タスクをまとめる。検索実行・適用・並び替え・保存状態を区別する | DADS Search / USWDS Search / andm独自Composition | 契約を照合。見た目は既存マッピング/独自仕様。 |
| results-header | タスクをまとめる。検索実行・適用・並び替え・保存状態を区別する | DADS Search / USWDS Search / andm独自Composition | 契約を照合。見た目は既存マッピング/独自仕様。 |
| form-actions | タスクをまとめる。検索実行・適用・並び替え・保存状態を区別する | DADS Search / USWDS Search / andm独自Composition | 模擬保存。通信・永続化・失敗/中断はアプリ側。 |
| header-nav | 移動と操作を区別。現在位置・階層・開閉・ページを明示 | WAI Disclosure / DADS / USWDS / Fluent Nav | Atlassian固有React部品の制約を汎用HTMLへ丸ごと移植しない。 |
| side-nav | 移動と操作を区別。現在位置・階層・開閉・ページを明示 | WAI Disclosure / DADS / USWDS / Fluent Nav | 契約を照合。見た目は既存マッピング/独自仕様。 |
| mobile-nav | 移動と操作を区別。現在位置・階層・開閉・ページを明示 | WAI Disclosure / DADS / USWDS / Fluent Nav | インラインDisclosure。DADS公式のモバイルメニューそのものではない。 |
| bottom-nav | 移動と操作を区別。現在位置・階層・開閉・ページを明示 | WAI Disclosure / DADS / USWDS / Fluent Nav | 重要：DADSは非推奨。DADS選択時に警告とHeader/Mobile代替を表示。 |
| toolbar | タスクをまとめる。検索実行・適用・並び替え・保存状態を区別する | DADS Search / USWDS Search / andm独自Composition | role=group。ARIA toolbarを名乗らず、Tabによる操作。 |
| action-menu | 一時的情報・操作。modalとnon-modal、説明と操作一覧を区別する | WAI Dialog / Tooltip / Disclosure | Disclosureのボタン一覧。ARIA menuの矢印モデルを要求しない。 |
| resource-item | 情報のグループと関係。表の見出し、Native details、独立した末尾操作 | WAI Tables / Disclosure / andm責務 | 修正：pressed切替時も操作名「お気に入り」を固定。 |
| empty-state | 状態・処理・結果を伝える。必要な動的通知と静的表示を分ける | WAI Notifications / DADS Progress / Fluent Spinner | 契約を照合。見た目は既存マッピング/独自仕様。 |
| loading-state | 状態・処理・結果を伝える。必要な動的通知と静的表示を分ける | WAI Notifications / DADS Progress / Fluent Spinner | 契約を照合。見た目は既存マッピング/独自仕様。 |

## 今回本文を再取得した一次資料

- [DADS Search](https://design.digital.go.jp/dads/components/search-box/)、[Bottom navigation](https://design.digital.go.jp/dads/components/bottom-navigation/)、[Horizontal menu](https://design.digital.go.jp/dads/components/horizontal-menu/)、[Mobile menu](https://design.digital.go.jp/dads/components/mobile-menu/)、[Progress](https://design.digital.go.jp/dads/components/progress-indicator/)、[Notification banner](https://design.digital.go.jp/dads/components/notification-banner/)
- [USWDS Search](https://designsystem.digital.gov/components/search/)、[Pagination](https://designsystem.digital.gov/components/pagination/)、[Form](https://designsystem.digital.gov/components/form/)
- [Fluent Nav](https://fluent2.microsoft.design/components/web/react/core/nav/usage)、[Spinner](https://fluent2.microsoft.design/components/web/react/core/spinner/usage)
- [Carbon Search](https://carbondesignsystem.com/components/search/usage/)、[Toggle](https://carbondesignsystem.com/components/toggle/usage/)
- [Atlassian Top nav](https://atlassian.design/components/navigation-system/top-nav-items/usage)
- [Spectrum Attention hierarchy](https://spectrum.adobe.com/foundations/attention-hierarchy)：見本を主要な注目対象にし、補助操作・説明の強調を下げる判断へ対応。Galleryの配置を公式が指定したわけではない。
- [Google Chip](https://developer.android.com/develop/ui/compose/components/chip)、[FAB](https://developer.android.com/develop/ui/compose/components/fab)：用途を確認。Androidの数値をWebへ自動変換しない。
- WAI： [Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)、[Disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)、[Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)、[Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)、[Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)、[Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)、[Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)、[Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)、[Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider/)、[Labels](https://www.w3.org/WAI/tutorials/forms/labels/)、[Notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)、[Images](https://www.w3.org/WAI/tutorials/images/decision-tree/)、[Tables](https://www.w3.org/WAI/tutorials/tables/one-header/)

## 未確認と意図的な差

Apple HIG navigation/searchはJS必須、M3 Web statesはJS必須、Spectrumの部品固有寸法は未取得。Carbonの旧empty-states URLも取得失敗。これらを「問題なし」「公式に沿う」と断定しない。全8系統の分析を参照し、既存の確認済み基礎値を継承する範囲と、独自補完を分ける。

Baseline/Soft/Dense/Technical/Editorial/Playfulは外部公式シリーズではない。公式の概念に適合する用途は選べても、各社の完全準拠実装ではない。DADSのinline mobile disclosure、全Seriesの共通Toolbar、Icon/FAB、Bottom navはandmの独自Composition。全Seriesを同じ公式推奨部品一覧とみなさない。

実機Safari、支援技術による読み上げ、すべての状態のコントラスト、実ユーザーの比較タスクによる評価は未検証。機械的な横幅チェックを使いやすさの証明としない。
