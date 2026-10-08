# andm-ui の目的と開発方針

個人で作る複数のアプリのために、目的・利用者・世界観に合う UI を素早く提案、構築、検証する。操作の明快さ、没入感、高揚感、心地よさを目的に応じて評価する。公開デザインシステム、文献、次世代 UI の研究を判断材料にする。

## 構成

| 領域 | 場所 | 責務 |
|---|---|---|
| Foundation | src/styles/tokens | primitive と semantic。利用箇所がある値を整備 |
| Component | src/styles の責務カテゴリ | 共通の意味、状態、Native HTML の契約 |
| Series | src/styles/series | 色・形・密度・書体・動きの Token remapping |
| Composition / Experience | gallery/lab、将来の patterns | 目的に沿う構成、専用部品、画面遷移、反応 |
| Research | research | 出典、仮説、比較、観察、AR / VR 実験 |

Series に UI 構造を押し込まない。構図や入力方法が変わる体験は Composition / Experience で扱う。専用 UI は共通部品への無理な統合をしない。ラボの見た目は独自試作であり公式デザインシステムの再現ではない。

## 判断の入力と出力

入力：達成したいこと、利用者の経験、利用頻度、環境、世界観、制約、優先したい感情。
出力：構成候補、表現候補、期待する効果、失うもの、検証方法、採用判断。

AI やラボは仮説を提案する。最適と断言しない。採用は人間が決め、未決なら null。研究の数値を自動で製品 Token にしない。

## 品質と評価

「読みやすさが最大」だけを共通の正解にしない。大胆な文字、非対称、変形、演出も目的に合えば採用候補。ただし意図した負荷と偶発的な不具合を分ける。

- 目的達成：完了率、時間、誤操作、復帰・取消のしやすさ
- 体験：高揚感、没入感、愛着、反復時の疲労
- 操作の契約：名前、状態、決定と取消、キーボード、タッチ、動きを減らす設定
- 世界観：意味と表現が一致しているか、演出が目的を支えているか

全シリーズで通常・hover・active・focus・disabled・selected・error・長文・狭い画面を、該当する部品ごとに検証する。数値の一覧だけでは品質を保証しない。

## トークンの追加ルール

primitive → semantic → component-local の順に検討し、意味が不要な局所値は局所に残す。親スコープで差し替える値は、root で別名を解決すると継承先に変更が届かないことに注意する。部品の利用箇所で fallback を解決する。

今回追加した layout-content-max / target-min は andm-ui 独自の既定値。target-min は新しい部品の既定であり、既存の全操作対象の適合を保証しない。利用箇所の無かった layer トークンは削除した。

`npm run audit:tokens` で未定義参照を点検する。fallback 付きの未定義名は拡張点として列挙し、必須参照の不足と区別する。これは静的点検であり、シリーズの計算値・コントラスト・操作品質は実際の描画で検証する。

## 次の拡張

1. 実際の個人アプリで必要な部品から、仕様・状態・Gallery の例をセットで追加。
2. Search / form group / empty state などを用途から検討。
3. 比較、編集、探索の体験パターンを蓄積。
4. 独自シリーズと専用表現を、通常利用と反復利用で評価。
5. 空間 UI は research/spatial で実機評価し、使える意味・状態の契約を共通化。

## Design Philosophyの比較実験

[ORBIT NOTE PoC](../gallery/lab/philosophy-poc/)は同じ内容から読む構成・露出した構造・関係探索を比較する独立実験。[責務と知識構造](DESIGN-PHILOSOPHIES.md)、[検証記録](PHILOSOPHY-POC-VALIDATION.md)。思想の適性・正式採用は未決で、既存Labを置き換えない。

## Materiality & Behavior

[Buttonの4条件実験](../gallery/lab/materiality-behavior/)は造形と復元を独立に比較するLab限定の試作。[実装・再利用仕様](MATERIALITY-BEHAVIOR.md)。既存Motion/Componentの契約を保ち、研究からCoreへの自動採用は行わない。
