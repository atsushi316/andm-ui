# research/

デザイン知識生成用ワークスペース。本体（`src/` / `dist/` / 製品 Gallery）とは分離。

- Build 外 / Runtime 非依存 / dist・npm・製品 Gallery 非含有
- `inbox/` `assets/` は Git 管理外（元素材・ライセンス素材）
- metadata / clusters / analysis / proposals は知識として管理可（元素材埋め込み禁止）
- `gallery/` は研究確認面。公開 Gallery ではない

現状は構造のみ。Research Agent / AI 分類は未実装。

文献索引・分析は人間が資料を読む導線として Gallery で表示できる。表示用に資料本文を CSS や JS のトークン値へ変換しない。研究の元素材は引き続き非公開・Build 外。確認用サイトには文献 Markdown だけを含める。
