# andm-ui

Vue 3 + Vite を使った UI コンポーネントライブラリ（npm package 配布前提）の初期構成です。

## Style

```
import '@atsushi316/andm-ui/style.css'
```

## M3 Buttons

### Button コンポーネント 公開 API

| Prop       | 型                                                          | 説明                                              |
| ---------- | ----------------------------------------------------------- | ------------------------------------------------- |
| `variant`  | `'elevated' \| 'filled' \| 'tonal' \| 'outlined' \| 'text'` | ボタンのスタイル（M3の5種のみ）                   |
| `size`     | `'sm' \| 'md' \| 'lg'`                                      | ボタンのサイズ                                    |
| `disabled` | `boolean`                                                   | 無効化状態（デフォルト: `false`）                 |
| `iconName` | `string`                                                    | アイコン名（フォールバック、推奨は`slot="icon"`） |

**Icon**: `slot="icon"`を使用することを推奨。`iconName`はフォールバックとして利用可能。

### FAB コンポーネント 公開 API

| Prop       | 型                                                    | 説明                                              |
| ---------- | ----------------------------------------------------- | ------------------------------------------------- |
| `variant`  | `'primary' \| 'secondary' \| 'tertiary' \| 'surface'` | FABのバリアント                                   |
| `size`     | `'sm' \| 'md' \| 'lg'`                                | FABのサイズ                                       |
| `label`    | `string`                                              | Extended FABのラベルテキスト                      |
| `iconName` | `string`                                              | アイコン名（フォールバック、推奨は`slot="icon"`） |
| `icon`     | `string`                                              | アイコン名（`iconName`の代替）                    |

**Icon**: `slot="icon"`を使用することを推奨。`iconName`または`icon`はフォールバックとして利用可能。

### All Buttons ページ（仕様の中心）

Storybookの「Atoms/Button/All Buttons」ページが、Material Design 3の「All buttons」仕様の**唯一の公式仕様書**として機能します。このページは以下のセクションを含みます：

- **A) Common buttons**: 5つのvariant（elevated, filled, tonal, outlined, text）
- **B) Common buttons with leading icon**: アイコン付きボタンの例
- **C) States**: Default / Hover / Pressed / Focus / Disabled の状態比較
- **D) FAB / Extended FAB**: Standard FAB（3 sizes）とExtended FAB（label付き）

**このページをM3仕様書として参照してください。** 他のstories（Button.stories.ts、FAB.stories.ts）は補助的な役割であり、All Buttonsページが仕様の中心です。

## Notes

Toggle buttons are not implemented yet.
Storybook Docs are generated via Autodocs.

## Storybook

```sh
npm run storybook
```
