# M3へのExpressive統合

2026-10-11。ユーザー依頼：標準／Expressiveの切替を設けず、一つのM3シリーズとして、より楽しく動きのある部品を提供する。

既存コードを確認するとM3はすでに `andm-series--expressive` で提供されていた。新しいSeriesやプリセットを追加せず、既存スコープと既存4つのfast spatial/effectsトークンを拡張利用する。Baselineは独自の基礎であり、旧M3として統合する対象ではない。

## 根拠と採用範囲

- 既存分析：`research/analysis/m3-expressive.md`、2026-09-30取得記録。今回再読。
- 公式URL： https://m3.material.io/styles/motion/overview/specs 、 https://m3.material.io/styles/motion/overview/how-it-works 。2026-10-11再取得はJS要求のみ。今回公式の数値本文を取得できたとは扱わない。
- 公式API： https://developer.android.com/reference/kotlin/androidx/compose/material3/MotionScheme 。M3にstandard/expressiveの仕組みが存在するが、andmで二つの製品バリエーションを用意する義務とは解釈しない。
- 値は既存採用を維持：fast spatial 350ms / cubic-bezier(0.42,1.67,0.21,0.9)、fast effects 150ms / cubic-bezier(0.31,0.94,0.34,1)。今回のsourceStatusは既存記録のみ、再取得unverified。

## パーツへの対応

| 対象 | 変更 | basis |
|---|---|---|
| Button | 既存のサイズ・押下morphを維持。Reduced MotionでExpressive専用transitionの上書きを修正 | 既存採用の維持 / andm-original |
| Switch | つまみはspatial、背景・影はeffects | derived（動きの役割への対応付け） |
| Chip | 色・枠はeffects、押下時は既存radius-smへmorph | andm-original（公式Chip形状再現ではない） |
| Tabs | 既存のselected状態に伸びる印、内容の8px出現を追加 | andm-original |
| FAB | effects、押下scale .96 | andm-original（既存Baselineボタンの値を採用） |
| Dialog | 出現のtranslateはspatial、opacity/backdropはeffects | derived。出現距離は既存維持 |
| Segmented | 既存インジケータをspatialへ変更 | andm-original。M3の推奨部品として紹介しない |

意味・Native操作・既存disabled/focus契約を維持。OSのReduced Motionでは変形・移動のアニメーションを止め、結果と色とfocusを維持。色・文字・部品寸法は今回一括変更しない。自動で旧duration名にExpressive値を詰めない。トークン数は237のまま。

## 確認

`npm run build`、`npm run audit:tokens`、`npm run audit:sources`、`npm run audit:coverage`、JavaScript構文・ローカル参照契約を確認。ブラウザ操作・画面の目視・実機は、今回利用可能なcontrol-browserがないため未検証。過去のブラウザ記録を今回の合格として流用しない。専用見本は `gallery/m3/`。ダーク表示は見本専用のandm-original paletteで公式dynamic colorの再現ではない。

公式更新・本文取得成功・実機での形や動きの不具合が見直し条件。Button以外の全M3仕様準拠を主張しない。
