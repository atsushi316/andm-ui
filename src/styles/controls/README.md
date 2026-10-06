# Control

ユーザーが動作や値を起こす UI。

- `button-tokens.css` — Button の Component-local Token（`--andm-btn-*`）
- `control-tokens.css` — 入力系が共有する寸法（`--andm-control-*`。値は `--andm-btn-*` を指す）
- `button.css` — `.andm-btn`
- `textfield.css` — `.andm-textfield`
- `checkbox.css` — `.andm-checkbox`
- `radio.css` — `.andm-radio`
- `select.css` — `.andm-select`（native `<select>`）

シリーズ専用クラスは作らない。見た目の差は親の `andm-series--*` によるトークン差し替え。

IconButton はここ。Icon そのものは Mark。
