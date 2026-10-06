# Control

ユーザーが動作や値を起こす UI。

- `button-tokens.css` — Button の Component-local Token（`--andm-btn-*`）
- `control-tokens.css` — 入力・チェックの Baseline 寸法。高さ・角・枠色は部品が `var(--andm-field-*, var(--andm-btn-*))` で Button に寄り、シリーズが同じ名前を置くとボタンと別に差し替わる
- `button.css` — `.andm-btn`
- `textfield.css` — `.andm-textfield`
- `checkbox.css` — `.andm-checkbox`
- `radio.css` — `.andm-radio`
- `select.css` — `.andm-select`（native `<select>`）

シリーズ専用クラスは作らない。見た目の差は親の `andm-series--*` によるトークン差し替え。

IconButton はここ。Icon そのものは Mark。
