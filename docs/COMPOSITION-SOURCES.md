# 組み合わせ部品の仕様と出典

確認日：2026-10-08。Native HTML + CSSを第一級APIとする。前回のアトミック部品と既存Navigationを組み合わせる。

## 整備範囲

| 責務 | 部品 | 状態 |
|---|---|---|
| Pattern | Form field / Search form / Filter bar / Results header / Form actions | 実装・操作例あり |
| Navigation | Header / Side / Mobile / Bottom nav | 実装・移動と開閉例あり |
| Navigation | Breadcrumb / Pagination | 既存を再利用・ページネーションの文字拡大対応 |
| Pattern | Toolbar / Action menu | 実装・操作例あり |
| Display | Resource item | 実装・リンクとお気に入り例あり |
| Feedback | Empty state / Loading state | 実装・初回/結果なし/読み込み例あり |

CSSはsrc/styles/patterns/compositions.css。GalleryのコピーでHTMLを取得できる。操作例はgallery/compositions.jsで公開し、フレームワーク依存の本体JSは追加しない。検索データ・サーバー通信・永続化・ルーティング・権限の判定はアプリ側が担当する。保存とロードは明示した模擬動作。検索は画面内の3件のデータで実行する。

## 今回再取得した一次資料

- [DADS検索ボックス](https://design.digital.go.jp/dads/components/search-box/)：検索対象の指定、詳細条件、ショートカットの構成。今回は入力・送信と独立Filter barへ対応付け。公式寸法の再現はしない。
- [USWDS Search](https://designsystem.digital.gov/components/search/)：label、type=search、submitを持つNative formの例を確認。
- [USWDS Side navigation](https://designsystem.digital.gov/components/side-navigation/)：ページ間の移動と階層の責務を確認。
- [Fluent Nav](https://fluent2.microsoft.design/components/web/react/core/nav/usage)：簡潔な移動名、現在位置と1段階の入れ子。本実装はNative detailsによる1段階を例示する。
- [Carbon Search](https://www.carbondesignsystem.com/building-blocks/core/components/search/guidelines)：検索の用途とガイドを再取得。独自CSSの数値へ自動変換しない。
- [Atlassian Top nav items](https://atlassian.design/components/navigation-system/top-nav-items/usage)：開始・中央・末尾の責務、開閉操作のaccessible label/expanded/controlsを確認。Atlassian専用React部品そのものは複製しない。
- [W3C disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)：通常のサイト移動にはmenu roleを付けず、開閉ボタンとリンクを使用する。

上記は構造・責務の根拠。余白・最小ターゲット44px・配置・枠・角・色の対応付けはandm独自。検索フォームやナビの公式数値と称しない。Seriesには既存の用途別文字・余白・形・色トークンを適用し、新しい公式数値は追加していない。

## シリーズの確認範囲

全8系統のresearch/analysisと責務READMEを再確認した。DADS / USWDS / Carbon / Fluent / Atlassianは上記本文を再取得。M3 navigation-barは本文がJSのみ、Apple search-fieldsはJS必須、Spectrum search-fieldは取得エラー。これら3系統の新しい組み合わせ固有値は未確認、既存マッピングと独自構造を継承する。Soft / Dense / Technical / Editorial / Playful / Baselineはandm独自の方向。

## 操作と組み込み

- Form field：for/idとaria-describedbyで補足・エラーを関連付け。送信時にinvalidとエラーを更新、最初の不正項目へfocus。
- Search：Enter/submitで検索。クリアで全件に戻し入力へfocus。結果件数はstatusで通知。入力をHTMLとして挿入しない。
- Filter：適用で反映、リセットで全件。並び替えは一覧を更新。
- Navigation：実際の移動はa、現在位置はaria-current=page。MobileはインラインDisclosure、モーダルではなくfocus trapは不要。Escapeで閉じて開閉ボタンへfocus。Bottom navの固定配置はアプリ側。
- Toolbar：role=group。矢印キーを必須とするARIA toolbarではない。
- Action menu：Tab/Shift+Tabで移動するDisclosureのボタン一覧。menu/menuitemは使わない。Escape、外側クリック、focus離脱で閉じる。
- Save/Loading：処理中は二重操作を防止。aria-busyは更新領域、statusは領域外。実アプリでは完了/失敗/中断の処理を接続する。

スクリーンリーダー・実機Safari・通信の失敗/中断・巨大データは未検証。公式デザインシステムの完全準拠ではない。

## 検証結果

Chromium 153：16種 × 14 Series × 携帯幅320/390 × 文字100%/200% = 896組で部品領域の横はみ出しなし。加えて800/1280幅の基本レイアウトを確認。検索/クリア/結果なし、条件適用/リセット、並び替え、必須メールの不正/正常、MobileのEscapeとfocus復帰、Actionの実行後開閉、Toolbar、Favorite、ページの一覧/件数更新、保存中の二重操作防止、読み込みのbusy/完了を確認。JS例外なし。トークン未定義なし。日本語フォントで携帯画面を目視確認。
