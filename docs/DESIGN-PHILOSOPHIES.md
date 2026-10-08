# Design Philosophy / Experience Lab

Seriesは部品の視覚言語、Philosophyは設計原則、Compositionは情報・操作の構造、Intentは利用者の目的と世界観。互いを一対一に固定しない。SoftはMinimalism、TechnicalはBrutalismの別名ではない。公式由来Seriesとandm独自Seriesを区別する。

## 知識の責務

`research/design-knowledge/schema.json` / `catalog.json` は設計時の静的参照。美学、歴史的様式、技法、構成、意図、制約、代案、判断、検証を `kind` で分類する。歴史記述とUI適用は別レコード。`basis` / `sourceStatus` / `recommended` の正本は [SOURCE-FIRST](SOURCE-FIRST.md)。新しい品質判定は作らない。

今回のMinimalismはBilbaoのJudd作品解説を出発点に、必要な情報を残して読む経路を整理する仮説。Web BrutalismはBrutalist Websitesの立場を参照し、文字と配置で構造を露出する仮説。どちらも歴史資料がWebのpx、色、操作数を指定したという意味ではない。建築Brutalismの本文取得は403で未確認。MoMAの取得結果は主に見出しであり、今回の歴史要約の根拠には使っていない。Maximalism/Swissは後から同じ構造へ追加可能だが今回は実装しない。

## 部品利用

- Reuse：既存の意味・操作・CSSを変更せず使用。
- Extend：意味と操作契約を維持して局所の視覚を変更。公式値を変えた部位は独自派生と明示。
- Create：既存で満たせない要件があるときLab内で新構造を設計。Coreへの自動昇格なし。

方式は部位ごとに混在できる。再利用率は目的・採用点数にしない。既存58部品への適合を画面の必須条件にしない。独自UIはSeriesを使わなくてもよい。

## 今回のPoC

[比較画面](../gallery/lab/philosophy-poc/) / [判断・出典](../gallery/lab/philosophy-poc/decisions.html)

| 案 | 構造 | 部品 |
|---|---|---|
| A Minimalism | 価値→機能→使い方の線形Editorial | Soft + Typography/Linkを無変更でReuse |
| B Web Brutalism | 大きな声明、露出した機能台帳、非対称な価値配置 | Technicalを元に局所Typography/LinkをExtend |
| C Original | 機能関係インスペクタ→線形の説明 | Native buttonを使ったLab限定の複合構造、既存Chip/文字/リンクを利用し暗い背景向けの色と見出し書体を局所Extend |
| A′ | Aと同じmain DOM・同じComposition | 主CTAだけ局所Extend |

Cは独自の思想全体を代表しない。対象間の接続・詳細・選択・線形への復帰を同じ構造で扱うため、既存Tabsだけでは不足する複合構造をLab内に作った。原子のNative button等は再利用する。新しい共通Token、公式Series変更、Framework、XR runtime、AI自動生成エンジンは追加していない。

A/B/Cは思想と方式が同時に変わる探索比較。効果の因果を断定しない。A/A′は構成を固定した補助比較。共通内容は `brief.json`、限定的な比較メタデータは `candidates.json`。HTMLは固定された別構造であり、ブラウザで研究知識から画面を生成しない。

## 境界と採用

ResearchはCSS Build外・npm配布外・製品Runtime非依存。PoCのJSはGallery参考controllerのみ。比較フレームはページ/CSSを隔離し、同じ情報区間を保持して切替できる。比較バーは固定せず折り畳み可能。狭幅は左1案、広幅は2案、全案を単独表示可能。

知識カード・exportの `recommended` はnullを維持。人間の明示判断以外で変更しない。`adoption` は誰がいつどのrevisionを判断したかの記録で、別の採用フラグではない。旧Labの `adopted` 形式は変更しない。

`npm run audit:design-knowledge` はschemaの使用キーワード、知識の構造、ID・参照、確認状態、Source-Firstのenum、null維持、内容一致、A/A′の同一構成、Research import不在を検証。JSON Schema標準メタスキーマでの検証とブラウザ結果は [検証記録](PHILOSOPHY-POC-VALIDATION.md)。人間の世界観評価・ユーザー調査は未実施。
