# Control

ユーザーが動作や値を起こす UI。

- `button-tokens.css` — Button の Component-local Token（`--andm-btn-*`）
- `control-tokens.css` — チェックとスイッチの Baseline 寸法。高さ・角・枠色は部品が `var(--andm-field-*, …)` で既存トークンにフォールバックする
- `button.css` — `.andm-btn`
- `textfield.css` — `.andm-textfield`（複数行は `.andm-textfield--textarea`）
- `checkbox.css` — `.andm-checkbox`
- `radio.css` — `.andm-radio`
- `switch.css` — `.andm-switch`
- `select.css` — `.andm-select`（native `<select>`）
- `slider.css` — `.andm-slider`（native `<input type="range">`。塗り幅は `--andm-slider-fill`）
- `segmented.css` — `.andm-segmented`（同じ場の値。`aria-pressed`）

シリーズ専用クラスは作らない。見た目の差は親の `andm-series--*` によるトークン差し替え。

IconButton はここ。Icon そのものは Mark。

- `chip.css` — `.andm-chip`。操作には Native button と aria-pressed。静的ラベルは Control に含めず、既存 Badge で別に示す。
- `fab.css` — `.andm-fab`。Button の押下形状は継承しない。主操作の独自仕様。

Chip / FAB の寸法は、既存シリーズの公式部品を再現したものではない。確認範囲と独自設計は [COMPONENT-SOURCES.md](../../../docs/COMPONENT-SOURCES.md) を参照。
