# Gallery スマホ・詳細ページ検証

実施日：2026-10-13。実ブラウザはChromium153.0.8010.0（Linux/headless）。スマホのviewport・touch・mobile contextを使用。日本語は検証環境のNoto Sans JPで描画し、製品へフォントや検証用依存は追加していない。

## 結果

| 条件 | 件数・結果 |
| --- | --- |
| 全96部品：320/390/768/1280px、390pxはBaseline/Expressive/DADS/Carbon | 672組。ページ全体の横はみ出し0、下部ドックの横はみ出し0 |
| Button/Text field/Header/Side nav/Bottom nav/Dialog × 全14 Series（390px） | 84組。ページ全体の横はみ出し0 |
| 各詳細の実物・用途・実装項目 | 672組で見本あり、文献リンクあり、表示中の「操作・組み込み」は1件 |
| 390px・ルート文字200% | ページ幅390px、下部ドックも領域内。スクリーンショット確認 |
| JavaScript例外 | 0件 |

機械可読の要約：[results.json](gallery-validation/results.json)。

## 操作と目視

- タッチ：メニュー→用途の選択でメニューが閉じ、見本へ進める。
- 一覧で選んだSeriesが詳細へ引き継がれる。
- 下部selectと前/次で変更でき、既存入力とスクロールを保持する。
- 用途へのジャンプでは見出しが上部ヘッダーと下部ドックに隠れない。
- コードへのジャンプと開閉、実装項目の重複解消。
- Native dialogが開き、取消後に起点へフォーカスが戻る。
- 高度なデータテーブルの検索が動く。詳細のDOM整理で既存ハンドラーを失わない。
- デスクトップのホバー・キーボード比較、Escape。比較しても隣のカードの位置・高さが変わらない。
- ホーム、Header、Bottom nav、Text fieldのスマホ表示、Side navのデスクトップ表示、日本語・文字200%のスクリーンショットを目視。

## 再現

`PLAYWRIGHT_MODULE`と`CHROMIUM_EXECUTABLE_PATH`を検証環境へ指定して `node scripts/check-gallery-mobile.mjs` を実行する。詳細結果・スクリーンショットは `QA_OUTPUT`（既定 `/tmp/andm-mobile-qa`）へ出力。検証用ブラウザ・フォント・パッケージは一時検証環境にのみ配置し、npmライブラリの依存・公開API・Series値は変更していない。

これは実機のiOS/Safari・Androidソフトキーボード・支援技術・全色のコントラスト適合・全操作状態の保証ではない。データ表の局所スクロールとページ全体の横はみ出しを区別して確認した。以前のDOM-only検証より範囲を広げたが、利用者による操作評価とは区別する。
