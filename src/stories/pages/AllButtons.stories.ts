import type { Meta, StoryObj } from "@storybook/vue3";
import Button from "../../components/atoms/Button/Button.vue";
import IconButton from "../../components/atoms/IconButton/IconButton.vue";
import FAB from "../../components/atoms/FAB/FAB.vue";
import ButtonGroup from "../../components/molecules/ButtonGroup/ButtonGroup.vue";
import SplitButton from "../../components/molecules/SplitButton/SplitButton.vue";
import SegmentedButtons from "../../components/molecules/SegmentedButtons/SegmentedButtons.vue";

const meta: Meta = {
  title: "Pages/All Buttons",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Material Design 3の「All buttons」ページ。Common buttons、States、Icon buttons、FAB & Extended FAB、Button groups、Split buttons、Segmented buttonsを含む包括的な仕様書として機能します。各セクションには、コンポーネントの使用ケースと適用場面が記載されています。",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

const iconTemplate = `
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
`;

const addIconTemplate = `
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
`;

const chevronDownTemplate = `
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
`;

export const AllButtons: Story = {
  render: () => ({
    components: {
      Button,
      IconButton,
      FAB,
      ButtonGroup,
      SplitButton,
      SegmentedButtons,
    },
    setup() {
      const variants = [
        "elevated",
        "filled",
        "tonal",
        "outlined",
        "text",
      ] as const;
      const iconButtonVariants = [
        "standard",
        "filled",
        "tonal",
        "outlined",
      ] as const;
      return {
        variants,
        iconButtonVariants,
        iconTemplate,
        addIconTemplate,
        chevronDownTemplate,
      };
    },
    template: `
      <div style="display: grid; gap: 48px; padding: 24px; max-width: 1200px; margin: 0 auto;">
        <!-- A) Common buttons -->
        <section>
          <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--andm-color-on-surface);">
            A) Common buttons
          </h2>
          <p style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 8px;">
            Material Design 3の5つのvariant: elevated, filled, tonal, outlined, text
          </p>
          <div style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 16px; padding: 12px; background: var(--andm-color-surface-container); border-radius: 8px; line-height: 1.6;">
            <strong style="color: var(--andm-color-on-surface);">使用ケース:</strong><br>
            • <strong>Elevated:</strong> カードやダイアログ内で、影（elevation）を使って強調したい場合。例：カード内の「詳細を見る」ボタン<br>
            • <strong>Filled:</strong> 最も重要なアクション。例：フォームの「保存」「送信」「購入」など、フローを完了する操作<br>
            • <strong>Tonal:</strong> 中程度の重要度のアクション。例：「続ける」「次へ」「詳細を編集」など、補助的な操作<br>
            • <strong>Outlined:</strong> 中程度の強調が必要な操作。例：「編集」「共有」「設定を開く」など、主要フローの外にあるサブ操作<br>
            • <strong>Text:</strong> 優先度の低い操作や補助的な操作。例：モーダルの「キャンセル」「戻る」など、視覚的な主張を抑えたい場合
          </div>
          <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
            <Button v-for="variant in variants" :key="variant" :variant="variant">
              {{ variant }}
            </Button>
          </div>
        </section>

        <!-- B) Common buttons with leading icon -->
        <section>
          <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--andm-color-on-surface);">
            B) Common buttons with leading icon
          </h2>
          <p style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 16px;">
            slot="icon"を使用してleading iconを追加した例
          </p>
          <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
            <Button variant="filled">
              <template #icon>${iconTemplate}</template>
              Filled with icon
            </Button>
            <Button variant="tonal">
              <template #icon>${iconTemplate}</template>
              Tonal with icon
            </Button>
          </div>
        </section>

        <!-- C) States -->
        <section>
          <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--andm-color-on-surface);">
            C) States
          </h2>
          <p style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 16px;">
            各状態（Default / Hover / Pressed / Focus / Disabled）の比較。Hover状態はマウスオーバーで確認できます。
          </p>
          <div style="display: grid; gap: 24px;">
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Filled variant
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <Button variant="filled">Default</Button>
                <Button variant="filled" class="andm-btn--pressed">Pressed</Button>
                <Button variant="filled" class="andm-is-focus-visible">
                  Focus
                </Button>
                <Button variant="filled" disabled>Disabled</Button>
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Elevated variant
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <Button variant="elevated">Default</Button>
                <Button variant="elevated" class="andm-btn--pressed">Pressed</Button>
                <Button variant="elevated" class="andm-is-focus-visible">
                  Focus
                </Button>
                <Button variant="elevated" disabled>Disabled</Button>
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Tonal variant
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <Button variant="tonal">Default</Button>
                <Button variant="tonal" class="andm-btn--pressed">Pressed</Button>
                <Button variant="tonal" class="andm-is-focus-visible">
                  Focus
                </Button>
                <Button variant="tonal" disabled>Disabled</Button>
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Outlined variant
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <Button variant="outlined">Default</Button>
                <Button variant="outlined" class="andm-btn--pressed">Pressed</Button>
                <Button variant="outlined" class="andm-is-focus-visible">
                  Focus
                </Button>
                <Button variant="outlined" disabled>Disabled</Button>
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Text variant
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <Button variant="text">Default</Button>
                <Button variant="text" class="andm-btn--pressed">Pressed</Button>
                <Button variant="text" class="andm-is-focus-visible">
                  Focus
                </Button>
                <Button variant="text" disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        <!-- D) Icon buttons -->
        <section>
          <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--andm-color-on-surface);">
            D) Icon buttons
          </h2>
          <p style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 8px;">
            アイコンのみのボタン。ariaLabelが必須です。
          </p>
          <div style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 16px; padding: 12px; background: var(--andm-color-surface-container); border-radius: 8px; line-height: 1.6;">
            <strong style="color: var(--andm-color-on-surface);">使用ケース:</strong><br>
            • ツールバーやアプリバーなど、限られたスペースでの補助操作<br>
            • お気に入り、削除、検索、設定など、単一のアクションで視覚的に直感的な操作を提供する場合<br>
            • テーブルの行アクションや、カードの右上に配置する操作ボタンなど
          </div>
          <div style="display: grid; gap: 24px;">
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Icon button variants
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <IconButton
                  v-for="variant in iconButtonVariants"
                  :key="variant"
                  :variant="variant"
                  aria-label="Icon button"
                  icon-name="add"
                />
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Icon button sizes
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <IconButton variant="standard" size="sm" aria-label="Small icon button" icon-name="add" />
                <IconButton variant="standard" size="md" aria-label="Medium icon button" icon-name="add" />
                <IconButton variant="standard" size="lg" aria-label="Large icon button" icon-name="add" />
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Icon button with slot
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <IconButton variant="standard" aria-label="Add icon">
                  <template #icon>${addIconTemplate}</template>
                </IconButton>
                <IconButton variant="filled" aria-label="Add icon">
                  <template #icon>${addIconTemplate}</template>
                </IconButton>
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Icon button states
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <IconButton variant="standard" aria-label="Default" icon-name="add" />
                <IconButton variant="standard" aria-label="Disabled" icon-name="add" disabled />
              </div>
            </div>
          </div>
        </section>

        <!-- E) Button groups -->
        <section>
          <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--andm-color-on-surface);">
            G) Button groups
          </h2>
          <p style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 8px;">
            ボタンをグループ化するコンテナ。standard（gapあり）とconnected（一体化）の2種類があります。
          </p>
          <div style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 16px; padding: 12px; background: var(--andm-color-surface-container); border-radius: 8px; line-height: 1.6;">
            <strong style="color: var(--andm-color-on-surface);">使用ケース:</strong><br>
            • <strong>Standard:</strong> 関連する複数のアクションを視覚的にグループ化したい場合（例：編集ツールバー）<br>
            • <strong>Connected:</strong> 関連する操作を一体化して表示し、1つの操作セットとして認識させたい場合（例：SegmentedButtonsの基盤、関連するアイコンボタンのグループ）
          </div>
          <div style="display: grid; gap: 24px;">
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Standard button group
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <ButtonGroup>
                  <Button variant="filled">First</Button>
                  <Button variant="filled">Second</Button>
                  <Button variant="filled">Third</Button>
                </ButtonGroup>
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Connected button group
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <ButtonGroup :connected="true">
                  <Button variant="filled">First</Button>
                  <Button variant="filled">Second</Button>
                  <Button variant="filled">Third</Button>
                </ButtonGroup>
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Connected with icon buttons
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <ButtonGroup :connected="true">
                  <IconButton variant="standard" aria-label="First" icon-name="add" />
                  <IconButton variant="standard" aria-label="Second" icon-name="add" />
                  <IconButton variant="standard" aria-label="Third" icon-name="add" />
                </ButtonGroup>
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Connected with disabled
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <ButtonGroup :connected="true">
                  <Button variant="filled">Enabled</Button>
                  <Button variant="filled" disabled>Disabled</Button>
                  <Button variant="filled">Enabled</Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </section>

        <!-- F) Split buttons -->
        <section>
          <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--andm-color-on-surface);">
            H) Split buttons
          </h2>
          <p style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 8px;">
            プライマリアクションとメニュートグルを一体化したボタン。
          </p>
          <div style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 16px; padding: 12px; background: var(--andm-color-surface-container); border-radius: 8px; line-height: 1.6;">
            <strong style="color: var(--andm-color-on-surface);">使用ケース:</strong><br>
            • プライマリアクション（左側）と、そのアクションのバリエーションを選択するメニュー（右側）を組み合わせたい場合<br>
            • 例：「保存」ボタンと「名前を付けて保存」「テンプレートとして保存」などのメニュー<br>
            • 例：「共有」ボタンと「メールで共有」「リンクをコピー」などのメニュー<br>
            • スペースを節約しながら、主要なアクションとそのバリエーションを提供したい場合
          </div>
          <div style="display: grid; gap: 24px;">
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Split button variants
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <SplitButton variant="filled" label="Filled" />
                <SplitButton variant="tonal" label="Tonal" />
                <SplitButton variant="outlined" label="Outlined" />
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Split button states
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <SplitButton variant="filled" label="Default" />
                <SplitButton variant="filled" label="Disabled" disabled />
                <SplitButton variant="filled" label="Menu expanded" :menu-expanded="true" />
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Split button sizes
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <SplitButton variant="filled" label="Small" size="sm" />
                <SplitButton variant="filled" label="Medium" size="md" />
                <SplitButton variant="filled" label="Large" size="lg" />
              </div>
            </div>
          </div>
        </section>

        <!-- H) FAB & Extended FAB -->
        <section>
          <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--andm-color-on-surface);">
            H) FAB & Extended FAB
          </h2>
          <p style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 8px;">
            Floating Action Button（FAB）とExtended FAB（ラベル付きFAB）。主要なアクションを強調表示します。
          </p>
          <div style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 16px; padding: 12px; background: var(--andm-color-surface-container); border-radius: 8px; line-height: 1.6;">
            <strong style="color: var(--andm-color-on-surface);">使用ケース:</strong><br>
            • <strong>Standard FAB:</strong> 画面の主要なアクションを強調したい場合。例：メールアプリの「新規作成」、タスク管理アプリの「タスク追加」<br>
            • <strong>Extended FAB:</strong> ラベル付きで、アクションの意図を明確にしたい場合。例：「新しいドキュメントを作成」「写真を追加」など、より具体的なアクション<br>
            • <strong>Lowered variant:</strong> スクロール可能なコンテンツ上に配置する場合、elevationを低くして視覚的な干渉を減らす<br>
            • 画面の右下や中央下部に配置し、ユーザーの注意を引く主要な操作として使用
          </div>
          <div style="display: grid; gap: 24px;">
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Standard FAB sizes
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <FAB variant="primary" size="sm" aria-label="Small FAB" icon-name="add" />
                <FAB variant="primary" size="md" aria-label="Medium FAB" icon-name="add" />
                <FAB variant="primary" size="lg" aria-label="Large FAB" icon-name="add" />
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Extended FAB sizes
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <FAB variant="primary" size="sm" label="Small" aria-label="Small Extended FAB" icon-name="add" />
                <FAB variant="primary" size="md" label="Medium" aria-label="Medium Extended FAB" icon-name="add" />
                <FAB variant="primary" size="lg" label="Large" aria-label="Large Extended FAB" icon-name="add" />
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                FAB variants
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <FAB variant="surface" aria-label="Surface FAB" icon-name="add" />
                <FAB variant="primary" aria-label="Primary FAB" icon-name="add" />
                <FAB variant="secondary" aria-label="Secondary FAB" icon-name="add" />
                <FAB variant="tertiary" aria-label="Tertiary FAB" icon-name="add" />
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Extended FAB variants
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <FAB variant="surface" label="Surface" aria-label="Surface Extended FAB" icon-name="add" />
                <FAB variant="primary" label="Primary" aria-label="Primary Extended FAB" icon-name="add" />
                <FAB variant="secondary" label="Secondary" aria-label="Secondary Extended FAB" icon-name="add" />
                <FAB variant="tertiary" label="Tertiary" aria-label="Tertiary Extended FAB" icon-name="add" />
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Lowered variant
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <FAB variant="primary" lowered aria-label="Lowered FAB" icon-name="add" />
                <FAB variant="primary" lowered label="Lowered Extended" aria-label="Lowered Extended FAB" icon-name="add" />
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                FAB states
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <FAB variant="primary" aria-label="Default" icon-name="add" />
                <FAB variant="primary" class="andm-fab--pressed" aria-label="Pressed" icon-name="add" />
                <FAB variant="primary" class="andm-is-focus-visible" aria-label="Focus" icon-name="add" />
                <FAB variant="primary" disabled aria-label="Disabled" icon-name="add" />
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Extended FAB states
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <FAB variant="primary" label="Default" aria-label="Default Extended" icon-name="add" />
                <FAB variant="primary" label="Pressed" class="andm-fab--pressed" aria-label="Pressed Extended" icon-name="add" />
                <FAB variant="primary" label="Focus" class="andm-is-focus-visible" aria-label="Focus Extended" icon-name="add" />
                <FAB variant="primary" label="Disabled" disabled aria-label="Disabled Extended" icon-name="add" />
              </div>
            </div>
          </div>
        </section>

        <!-- I) Segmented buttons -->
        <section>
          <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--andm-color-on-surface);">
            I) Segmented buttons
          </h2>
          <p style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 8px;">
            複数の選択肢から1つまたは複数を選択できるセグメントボタン。
          </p>
          <div style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 16px; padding: 12px; background: var(--andm-color-surface-container); border-radius: 8px; line-height: 1.6;">
            <strong style="color: var(--andm-color-on-surface);">使用ケース:</strong><br>
            • <strong>Single selection:</strong> 排他的な選択肢から1つを選択する場合（例：「左揃え・中央揃え・右揃え」「グリッド・リスト・マップ表示」）<br>
            • <strong>Multiple selection:</strong> 複数の選択肢から複数を選択できる場合（例：フィルターの複数選択「カテゴリA・カテゴリB・カテゴリC」）<br>
            • 関連する選択肢を視覚的にグループ化し、現在の選択状態を明確に示したい場合
          </div>
          <div style="display: grid; gap: 24px;">
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Single selection mode
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <SegmentedButtons
                  mode="single"
                  variant="filled"
                  :options="[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' }
                  ]"
                  value="option1"
                />
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Multiple selection mode
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <SegmentedButtons
                  mode="multiple"
                  variant="filled"
                  :options="[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' }
                  ]"
                  :values="['option1']"
                />
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Segmented buttons with icons
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <SegmentedButtons
                  mode="single"
                  variant="filled"
                  :options="[
                    { value: 'grid', iconName: 'grid' },
                    { value: 'list', iconName: 'list' },
                    { value: 'map', iconName: 'map' }
                  ]"
                  value="grid"
                />
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Segmented buttons variants
              </h3>
              <div style="display: grid; gap: 12px;">
                <SegmentedButtons
                  mode="single"
                  variant="filled"
                  :options="[
                    { value: 'opt1', label: 'Filled' },
                    { value: 'opt2', label: 'Filled' }
                  ]"
                  value="opt1"
                />
                <SegmentedButtons
                  mode="single"
                  variant="tonal"
                  :options="[
                    { value: 'opt1', label: 'Tonal' },
                    { value: 'opt2', label: 'Tonal' }
                  ]"
                  value="opt1"
                />
                <SegmentedButtons
                  mode="single"
                  variant="outlined"
                  :options="[
                    { value: 'opt1', label: 'Outlined' },
                    { value: 'opt2', label: 'Outlined' }
                  ]"
                  value="opt1"
                />
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Segmented buttons states
              </h3>
              <div style="display: grid; gap: 12px;">
                <SegmentedButtons
                  mode="single"
                  variant="filled"
                  :options="[
                    { value: 'opt1', label: 'Enabled' },
                    { value: 'opt2', label: 'Enabled' }
                  ]"
                  value="opt1"
                />
                <SegmentedButtons
                  mode="single"
                  variant="filled"
                  :options="[
                    { value: 'opt1', label: 'Disabled' },
                    { value: 'opt2', label: 'Disabled' }
                  ]"
                  value="opt1"
                  disabled
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    `,
  }),
};
