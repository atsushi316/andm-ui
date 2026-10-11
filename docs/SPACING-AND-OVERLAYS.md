# 余白とOverlayの再監査・修正

2026-10-11。対象: Coreの面/Stack/Inline/フォーム、Gallery96見本、統合画面、Dialog/Drawer。これは公式パッケージの全面再現ではなく、Native HTML共通APIへの適応版。

## 見つかった問題と修正

| 問題 | 修正 |
| --- | --- |
| 意味別余白が未定義で、同じ12/16pxを無関係な責務に流用 | related/group/section/region/inset/paragraph/actionsを必要な責務へ接続 |
| 追加Dialog/Drawer見本にpanel/body/actionsなし | 両Galleryの全Dialog/Drawerを既存スロット契約へ修復。再利用用parts.jsonも同期 |
| 統合画面がSeriesの高さ、字、focus、角を固定値で上書き | 製品側指定を削除。カードもSeriesの面/書体/余白を継承 |
| ブラウザ既定p/h/fieldsetマージンとgapが重複 | 構成側が所有する直接の子のマージンを限定リセット。本文段落はparagraphを使用 |
| labelとcontrolが別の群として離れる | 関連する要素をandm-fieldへまとめ、説明のaria-describedbyを維持 |
| 空status/tagsが不要な空白を予約 | 見本内の空要素だけ非表示。内容が入ると再表示 |
| 検索候補の絶対位置がタグ/状態表示まで含む親基準 | input/options用の位置決めwrapperを追加 |
| モーダル全体のスクロールで操作が離れる | 本文を縮小可能なスクロール領域にし、見出しと操作を縮小しない。短い画面は全体スクロールへfallback |
| 独自Seriesの密度がボタンだけに留まる | 面・関連・群・セクション・本文・操作の密度も各独自設計へ対応 |
| 100px固定の見本高さ | 内容量に追従するmin-heightへ変更 |

DADSの本文行高は既にTypography roleで1.75へ補正されていた。旧dialog.cssの1を原因とする初期仮説は撤回。今回そのroleを変更していない。

## 意味と責務

`related`:ラベルと内容/関連説明、`group`:別フィールドや同じ群内の構成、`section`:別群、`region`:大きな区分、`inset`:面の内部、`paragraph`:同じ本文の段落、`actions`:操作の並び。

意味の違いを同じgapへまとめない。公式の部品専用仕様（field-gap、card-padding、dialogの各slot等）がある場合はそちらが優先。科学的な万能比率や「8pxが正解」という定義ではない。:rootとSeriesスコープでaliasを再束縛し、祖先で計算済みのBaseline aliasをそのまま継承しない。

## 今回確認した一次資料

全URL本文または公式実装/配布Tokenを今回再取得。branchのmain/master/developは可変で、安定版全体の適合を主張しない。取得ファイルのSHA256とURLは research/analysis/spacing-overlays-sources.json。

| Series | 確認した資料・範囲 | 適用と根拠分類 |
| --- | --- | --- |
| Fluent 2 | [Dialog usage](https://fluent2.microsoft.design/components/web/react/core/dialog/usage)、公式fluentui react-dialogのcontexts/constants.ts、DialogSurface/Body styles、tokens/global/spacings.ts、borderRadius.ts（master） | 内側24px・gap8px・角8px・最大幅600pxはofficial。共通slotへの対応と画面の群16/section24/region32はderived。完全なfullscreen挙動の再現は対象外 |
| Carbon | [現行Modal specifications](https://www.carbondesignsystem.com/building-blocks/core/components/modal/specifications)、carbon/packages/styles/scss/components/modal/_modal.scss（main） | header16px、body終端48px、20%右余白、footer64pxを共通slotへderived写像。panel0・header16・body下32・panel gap16でbodyとfooterの実距離48。footerは2操作で半幅ずつの連続面。現行SCSSのヘッダーmargin8＋body上8は同じ16px。角0はCSS初期値/公式コードの写像。全size/幅グリッド・テーマ更新は対象外 |
| Atlassian | [Spacing foundations](https://atlassian.design/foundations/spacing/) の尺度・小/中/大の用途・近接/類似/階層/視覚補正 | 小8・群16・section24・region32は公式尺度からのderived割当。dialog内側24/間隔16/操作前8はandm-original、部品専用本文はunverified。既存角12は今回変更なし |
| USWDS | [Modal](https://designsystem.digital.gov/components/modal/)、uswds/packages/usa-modal/src/styles/_usa-modal.scss（develop） | 内側上40/左右32/下32、footer前24、outer24を共通slotへderived写像。close icon用32の領域は共通版で統合。公開コードの操作順は先頭から、共通actionsは左寄せ。設定に依存する幅は今回未変更 |
| DADS | [Spacing](https://design.digital.go.jp/dads/foundations/spacing/)、[Modal overview](https://design.digital.go.jp/dads/components/modal-dialog/)、公式design-system-example-components-html/src/components/modal-dialog/modal-dialog.css（main） | 小画面header上8/左右16、本文下32、actions左右/下16、gap12、角8、見出し24。48rem以上でheader上/左右24、actions左右/下24、gap16、見出し28をofficialからderived写像。最大幅480は共通APIへの独自選択で公式min-widthの同一再現ではない。shade/elevationの未取得数値は維持 |
| M3 Expressive | material-components/material-web/dialog/internal/_dialog.scss（main） | 標準Material Webの内側24、headlineと本文の距離24、本文からactions24を共通panelへderived写像。Expressive固有dialog仕様とは称しない。M3仕様サイト本文は今回JS必須でunverified。既存shape12を維持 |
| Spectrum | adobe/spectrum-css/components/dialog/index.css（main）、@spectrum-css/tokens **16.0.2** global/medium-vars.css | medium confirm内側40・角4・title18・body14・footer前40をderived写像。一般の余白割当8/16/24/40は公式尺度からderived。UI構造のhero/divider等は未再現。系統を混ぜず既存16.0.2を継続 |
| Apple | [HIG Layout](https://developer.apple.com/design/human-interface-guidelines/layout)、[Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts) | JS必須で本文未取得。余白はBaselineを維持（andm-original/sourceStatus unverified）。Apple風の数値を捏造しない |
| Soft/Dense/Technical/Editorial/Playful | andm DESIGN.md・既存Typography/形/ボタン | 外部公式なし、andm-original。Soft/Playfulはゆったり、Denseは群を詰める、Technicalは規則的、Editorialは本文とセクションの余白を広くする |

## 検証と限界

今回: build、tokens、sources、coverage、design-knowledge、diff、全12個の既存Dialog/Drawer構造、38追加部品のID/API整合、HTMLリンク/参照とJS構文を確認。237 Token、必須未定義なし。source台帳は最新。Galleryの355 IDと統合画面の130 IDに欠落/重複なし、38再利用見本のID整合、全12 Dialog/Drawerのpanel/body/actionsを確認。npm配布は新規仕様文書を含み、Research/Galleryは含まない。

**今回のブラウザ実表示・キー操作・スクリーンショット比較は未検証**。この環境にはSites指定のcontrol-browserがないため、以前のブラウザ検証結果を今回の修正済みコードの合格として流用しない。Safari/Firefox/実機/支援技術も未検証。

レビュー: [同じ内容で14 Seriesを切り替える](../gallery/spacing/)、[統合画面](../gallery/completion/)。通常/長文Dialog、フィールドと説明、独立した群、操作前後、入力保持を確認できる。直した実装と公開は提供するが、目視の美観確認まで完了したとは記載しない。
