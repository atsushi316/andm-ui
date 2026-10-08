# 文献ライブラリ

UI デザインシステムを作るとき、人が判断するために開く一次資料の索引である。Design Series の再現メモ（`research/analysis/`）とは別物である。ここにある文章は、実行時の CSS にも Gallery にも入らない。

このライブラリは知識の棚である。頻度や優先度を集計して Core のトークン、半径、余白、色を決めてはいけない。

Series の補完に使うときは [出典優先設計](../../docs/SOURCE-FIRST.md)に従う。対象公式の仕様・尺度を先に確認し、未定義部分の原則を本文確認済みの資料で補う。原則からの判断と数値の選択を分け、[判断記録](../../docs/SOURCE-DECISIONS.md)へ残す。本文未取得は公式の欠落と扱わない。資料から Runtime Token への自動変換は行わない。

## 使い方

1. 判断の種類で棚を選ぶ。知覚や認知の限界は [学術・理論](academic.md)。試験できる要求や交換形式は [標準・ガイドライン](standards.md)。実在のシステムがどう文書化しているかは [主要 Design System](design-systems.md)。通読して考え方が身につくものは [書籍](books.md)。
2. 各項目の「確認」を見る。今回本文を開いたものだけが確認済みである。未検証の項目は、公刊された資料についての記憶による要約で、頁・測定値・トークン値は書いていない。
3. シリーズとして既に分析があるシステムは、このライブラリでは索引カードに留める。数値の正本は `research/analysis/` の該当ファイルである。カードから分析へ相対リンクする。
4. 優先度（高 / 中 / 低）は、編集者が「先に開く価値があるか」を付けたメモである。出現回数でも、Core への推奨値でもない。

## 種別

各項目は次のどちらかである。

- **現行の公式資料** — いまも公開され、更新される規格、ガイドライン、デザインシステムの公式サイト。
- **古典** — 改定が止まっていても、判断の土台としてまだ開く価値がある論文・書籍。いまも版を重ねる書籍も、生きた規格ではないのでこちらに置く。

Community Group の報告書（Design Tokens、Open UI）は公式に公開されているが、W3C 勧告ではない。項目の中でその区別を書く。

## 文献掲載はシリーズ化ではない

この棚に名前があることは、andm の Design Series に採用したことではない。

とくに次の二つは、文献として載せるだけでシリーズにはしない。

- GOV.UK Design System
- Salesforce Lightning Design System（SLDS）

Fluent 2 も同じである。公式サイトの案内をカードにしても、シリーズの再現仕様にはしない。

シリーズ再現の正本は `research/analysis/` である。このライブラリはそれを書き換えない。数値も写さない。現在のツリーには M3 Expressive、Apple HIG、Spectrum、Carbon、DADS、Atlassian、USWDS の分析がある。2026-10-07 に Fluent の確認範囲メモを追加した。各資料の確認日は分析ファイルに残す。モーションの設計メモは文献ライブラリではない。

## 判断材料をトークンにしない

Gestalt、Fitts's Law、Hick の法則、認知負荷、ミラーの短期的な限界、メンタルモデル、情報採餌は、画面を評価するための判断材料である。

これらからコンポーネントトークンを作らない。「正しい」角丸や余白の値を導出しない。Core の推奨値にもしない。論文中のミリメートル、ビット、ミリ秒、選択肢の個数は実験の条件か測定であり、デザインシステムのスケールではない。

優先度と、資料が何度名前を出るかも、Core の値ではない。

## 確認の意味

| 表示 | 意味 |
| --- | --- |
| 確認済み | この作業でその URL の本文を開いた。要約はその範囲に限る。 |
| 一部確認 | 抄録、目次、書誌、公開サンプルだけを開いた。規格や論文の本文は読んでいない。 |
| 未検証 | 本文を開いていない。要約は記憶に基づく。頁番号、測定値、公式の数値は書かない。 |

無料で読めるかは、公式サイトが無料か、書籍を買うか、ISO / JIS を買うか、著者の PDF か、を分けて書く。

## 索引

件数は各ファイルの項目数。2026-10-06 時点。

### 学術・理論（10）

知覚、運動、記憶、認知負荷、メンタルモデル、情報探索、UI の動き。詳細は [academic.md](academic.md)。

| 優先度 | 種別 | 項目 |
| --- | --- | --- |
| 高 | 古典 | [Wertheimer, 群化の要因](academic.md#wertheimer-1923) |
| 高 | 古典 | [Fitts, 運動の情報容量](academic.md#fitts-1954) |
| 高 | 古典 | [MacKenzie, HCI における Fitts's Law](academic.md#mackenzie-1992) |
| 高 | 古典 | [Miller, 処理容量の限界](academic.md#miller-1956) |
| 高 | 古典 | [Sweller, 認知負荷](academic.md#sweller-1988) |
| 高 | 古典 | [Norman, メンタルモデル](academic.md#norman-1983) |
| 高 | 古典 | [Pirolli and Card, 情報採餌](academic.md#pirolli-1999) |
| 中 | 古典 | [Hick, 選択の情報獲得速度](academic.md#hick-1952) |
| 中 | 古典 | [Norman, アフォーダンスと慣習](academic.md#norman-1999) |
| 中 | 古典 | [Chang and Ungar, カートゥーンと UI のアニメーション](academic.md#chang-1993) |

人間工学の規格は [標準](standards.md#iso-9241) に、教科書は [書籍の Wickens](books.md#wickens-hfe) に置いた。

### 標準・ガイドライン（15）

| 優先度 | 種別 | 項目 |
| --- | --- | --- |
| 高 | 現行 | [WCAG 2.2](standards.md#wcag-22) |
| 高 | 現行 | [WCAG 2.2 日本語訳（WAIC）](standards.md#wcag-22-ja) |
| 高 | 現行 | [WAI-ARIA 1.2](standards.md#wai-aria-12) |
| 高 | 現行 | [ARIA Authoring Practices Guide](standards.md#apg) |
| 高 | 現行 | [Design Tokens Format Module 2025.10](standards.md#design-tokens) |
| 高 | 現行 | [Open UI](standards.md#open-ui) |
| 高 | 現行 | [ISO 9241-11:2018](standards.md#iso-9241-11) |
| 高 | 現行 | [ISO 9241-110:2020](standards.md#iso-9241-110) |
| 高 | 現行 | [ISO 9241-210:2019](standards.md#iso-9241-210) |
| 高 | 現行 | [JIS X 8341-3:2016](standards.md#jis-x-8341-3) |
| 高 | 現行 | [ウェブアクセシビリティ導入ガイドブック](standards.md#digital-agency-a11y-guidebook) |
| 高 | 現行 | [10 Usability Heuristics](standards.md#nielsen-heuristics) |
| 中 | 現行 | [ISO 9241-112:2025](standards.md#iso-9241-112) |
| 中 | 現行 | [HTML Living Standard](standards.md#html-living) |
| 中 | 現行 | [Government Design Principles](standards.md#govuk-principles) |

### 主要 Design System（10）

| 優先度 | 種別 | 項目 | シリーズ分析 |
| --- | --- | --- | --- |
| 高 | 現行 | [Material Design（M3 Expressive）](design-systems.md#material) | あり。索引のみ |
| 高 | 現行 | [Human Interface Guidelines](design-systems.md#apple-hig) | あり。索引のみ |
| 高 | 現行 | [Fluent 2](design-systems.md#fluent) | [確認範囲](../analysis/fluent.md) |
| 高 | 現行 | [Carbon](design-systems.md#carbon) | あり。索引のみ |
| 高 | 現行 | [Spectrum](design-systems.md#spectrum) | あり。索引のみ |
| 高 | 現行 | [デジタル庁デザインシステム](design-systems.md#dads) | あり。索引のみ |
| 高 | 現行 | [GOV.UK Design System](design-systems.md#govuk) | シリーズにしない |
| 中 | 現行 | [Atlassian Design System](design-systems.md#atlassian) | あり。索引のみ |
| 中 | 現行 | [U.S. Web Design System](design-systems.md#uswds) | あり。索引のみ |
| 中 | 現行 | [Lightning Design System 2](design-systems.md#lightning) | シリーズにしない |

### 書籍（16）

すべて古典。詳細と未検証の明示は [books.md](books.md)。

| 優先度 | 項目 |
| --- | --- |
| 高 | [The Design of Everyday Things](books.md#norman-doet) |
| 高 | [About Face](books.md#cooper-about-face) |
| 高 | [The Psychology of Human-Computer Interaction](books.md#card-moran-newell) |
| 高 | [Designing Interfaces](books.md#tidwell) |
| 高 | [Design Systems](books.md#kholmatova) |
| 高 | [Atomic Design](books.md#frost-atomic) |
| 高 | [The Elements of Typographic Style](books.md#bringhurst) |
| 高 | [Thinking with Type](books.md#lupton) |
| 中 | [Usability Engineering](books.md#nielsen-ue) |
| 中 | [Designing the User Interface](books.md#shneiderman) |
| 中 | [Don't Make Me Think](books.md#krug) |
| 中 | [Information Architecture](books.md#polar-bear) |
| 中 | [Grid Systems in Graphic Design](books.md#mueller-brockmann) |
| 中 | [Expressive Design Systems](books.md#perez-cruz) |
| 中 | [An Introduction to Human Factors Engineering](books.md#wickens-hfe) |
| 中 | [Refactoring UI](books.md#refactoring-ui) |

## 今回入れなかったもの

有名でも、代表が既にあるものは足さない。Laws of UX や Universal Principles of Design のような二次的な一覧、Material 2 を M3 と別に立てること、Polaris、Primer、Ant Design、Bootstrap の網羅、Tufte の統計グラフィックは、この棚の対象外にした。WCAG 3 は WCAG 2.2 の本文が「後続の大改訂は別作業」と書いているので、独立項目にはしていない。

## 未検証の項目

本文を開いていない、または抄録・書誌・サンプルに留まるもの。頁レベルの主張は置いていない。

- 本文未読（未検証）: Fitts 1954、Hick 1952、Sweller 1988、Norman 1983、Norman 1999、Pirolli and Card 1999、Chang and Ungar 1993、HTML Living Standard
- 一部確認: MacKenzie 1992（著者ページの抄録と目次）、ISO 9241 の各パート（カタログ抄録または公開サンプル。規格本文は未読）、JIS X 8341-3:2016（書誌と公開プレビューの序文。規格全文は未読）、デジタル庁ガイドブック（公開ページのみ。PDF 本文は未読）、Atomic Design（サイト冒頭のみ）
- 書籍: Atomic Design 以外は今回開いていない
- デザインシステム: Apple HIG と Material の公式本文は今回取り直していない。Atlassian と USWDS はトップページのみ

確認済みの範囲は各項目の「確認」に書く。

## 思想とUIへの適用仮説

[Design Knowledge](../design-knowledge/catalog.json)にMinimal Artの歴史資料、Web Brutalismのコレクションの立場、andmの適用仮説を分けて記録。[概念と境界](../../docs/DESIGN-PHILOSOPHIES.md)。本文未取得の建築史は未確認。ResearchからRuntimeへの自動変換は行わない。

- [Waveform Expression一次資料索引](waveform.md)：進捗・図表遷移の研究、SVG/音声/アクセシビリティ仕様と限界。
