# 操作能力追加の判断と出典

2026-10-10。既存のSource-First分類を利用。研究の自動採用は行わず、研究レコードのrecommendedはnullを維持する。

## completion-native-contract

- 対象: src/behavior、gallery/completion、追加advanced.css。既存58部品のCSS API・公式Seriesファイルを変更しない。
- 根拠: Native button/input/form/dialog/popover/tableを利用。操作要件はWAI-ARIA APGの本文を確認した下記パターンを参照。APGは参考実装であり、andm-uiが全環境で適合すると保証する資料ではない。
- basis: Native/ARIA操作の原則はresearch-based、andm固有のDOM/data属性/ESM API/配置/寸法はandm-original。sourceStatus: specified（確認したAPG本文）。公式一覧の取得と各公式部品の全仕様確認を区別。
- 出典・節（2026-10-10確認）: [Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) Keyboard Interaction / Roles、[Tree](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) Keyboard Interaction、[Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)、[Modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)、[Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)、[Multi-thumb slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/)、[Date picker例](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/)、[Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)、[Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)。
- 原則と値の分離: キー操作/意味は上記原則、カラー/余白/角/影は各Seriesの既存意味Token。optionの最大高16rem、color planeの高さ10rem等の部品固有値はandm-originalで、APGや公式Seriesの推奨値とは扱わない。
- 派生範囲: 新しい一般部品はToken継承のandm実装。公式部品のpixel/API再現を主張しない。Materiality/Waveformの局所表現はLab限定。
- 検証: build、tokens、sources、coverage、知識構造、Chromiumの幅/文字/操作/axe。詳細は検証記録。
- 再確認条件: APG更新、Nativeのブラウザ差、公式Seriesの部品固有仕様、支援技術・RTL・実機検証で問題を発見した場合。
