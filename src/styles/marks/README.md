# Mark

単一の視覚表現。操作の意味は持たない。

- `divider.css` — `.andm-divider`
- `badge.css` — `.andm-badge`
- `avatar.css` — `.andm-avatar`
- `spinner.css` — `.andm-spinner`

Icon、Avatar、Spinner などもここに入る。Button や IconButton は Control。

トークンの primitive（`tokens/*/primitive.css` の生値）とは別の語。依存は Foundation のトークンだけ。Control や Pattern は参照しない。

Icon（独自SVG） / Statusを追加。根拠と確認範囲は [ATOMIC-SOURCES.md](../../../docs/ATOMIC-SOURCES.md)。

`.andm-loading-indicator` はSVGの輪郭morphの見本。data-runningで開始/停止、実処理完了は決めない。形は独自近似、根拠/制限はM3-INTEGRATION。
