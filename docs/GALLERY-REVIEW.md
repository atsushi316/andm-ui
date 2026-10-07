# Gallery の改善根拠

確認日：2026-10-07。目的は携帯から部品を探し、表現を比べ、HTML と根拠を確認すること。研究の測定値を Core の寸法にしない。

## 文献と適用

| 一次資料 | 確認した内容 | 今回の適用（andm の判断） |
| --- | --- | --- |
| [W3C APG Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) | 開閉用 button、aria-expanded と制御対象、Enter / Space | 携帯のメニューを開閉。各カテゴリは独立して開く。選択後に本文へ戻る |
| [WCAG 2.2 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | 320 CSS px 相当で情報・操作を保つ。表などの例外は部分的 | 320px の携帯幅で検証。コード・表は局所的に扱い、本文は折り返す |
| [WCAG 2.2 Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | 最小操作領域と例外 | Explorer の主操作を44px以上にする独自設計。AAの一律要求とは言わない |
| [W3C APG Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) | 矢印でタブ移動、Home / End、選択とフォーカス | 既存 Gallery のタブ例にキーボード移動を追加 |
| [デジタル庁アクセシビリティ](https://design.digital.go.jp/dads/guidance/accessibility/) | フォーカス、文字、操作、内容量の変化などに配慮 | 検索の結果数、コピーの成功・失敗、選択状態を伝える |

検索・部品カード・シリーズ用 select は、携帯での「探す→比較→使う」を短くする andm 独自の設計判断。上記資料がこの Gallery 配置を指定しているわけではない。文学・学術論文の未読本文や数値から正解を導出していない。

## 変更

- 大量の説明リンクと完成状況を、部品一覧へ置き換える。日本語・英語の検索で直接移動。
- 携帯ではナビを初期状態で閉じる。本文を見る際の画面占有を減らす。
- シリーズを select から選ぶ。一覧ボタンも折りたたみ内に残す。前のシリーズは端末内に記憶。
- 部品ページに先頭の HTML 見本とコピーを追加。操作 JS は消費側の責務と表示。
- Series 分析を Gallery 内で読めるようにする。生の Markdown ファイルへ飛ばさない。
- Chip / FAB は独自仕様を表示し、公式の確認範囲と分ける。
- 未分類の Component-local トークンにも一覧の入口を用意。

## 境界

Workspace の CSS は Gallery のレイアウト・ナビ・説明だけ。製品の andm-* の値は変更しない。Series は見本の親スコープだけ。研究表示は人間が資料を読む導線であり、研究ファイルの数値をトークンとして読み込む仕組みではない。

## 検証

Chromium で日本語表示のスクリーンショットを確認。30部品のページとホーム・トークン・文献・シリーズの代表ページを、320 / 390 / 800 / 1280px 幅で確認し、ページ全体の横はみ出しは0件。検索・分類・携帯メニュー/Escape・Series 切替・HTML生成・出典読書ビュー・Chip選択・Tabs矢印操作・ラボのダイアログと取消を確認。FAB は14シリーズで通常サイズの最小高さと変形が混入しないことを確認。ページの JavaScript エラーは0件。

`npm run audit:tokens` は153定義、必須の未定義参照なし。JS構文チェックと差分の空白チェックも成功。

Safari / iOS 実機、支援技術、全状態のコントラスト、長期利用の心地よさは未検証。全端末のアクセシビリティ適合を保証するものではない。
