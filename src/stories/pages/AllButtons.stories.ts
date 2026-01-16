import type { Meta, StoryObj } from "@storybook/vue3";
import Button from "../../components/atoms/Button/Button.vue";
import IconButton from "../../components/atoms/IconButton/IconButton.vue";
import ToggleButton from "../../components/atoms/ToggleButton/ToggleButton.vue";
import ToggleIconButton from "../../components/atoms/ToggleIconButton/ToggleIconButton.vue";
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
          "Material Design 3の「All buttons」ページ。Common buttons、States、Icon buttons、Toggle buttons、Button groups、Split buttons、Segmented buttonsを含む包括的な仕様書として機能します。",
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
      ToggleButton,
      ToggleIconButton,
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
      const toggleButtonVariants = [
        "filled",
        "tonal",
        "outlined",
        "text",
      ] as const;
      return {
        variants,
        iconButtonVariants,
        toggleButtonVariants,
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
          <p style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 16px;">
            Material Design 3の5つのvariant: elevated, filled, tonal, outlined, text
          </p>
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
                <Button variant="filled" style="outline: var(--andm-focus-ring-width) solid var(--andm-focus-ring-color); outline-offset: var(--andm-focus-ring-width);">
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
                <Button variant="elevated" style="outline: var(--andm-focus-ring-width) solid var(--andm-focus-ring-color); outline-offset: var(--andm-focus-ring-width);">
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
                <Button variant="tonal" style="outline: var(--andm-focus-ring-width) solid var(--andm-focus-ring-color); outline-offset: var(--andm-focus-ring-width);">
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
                <Button variant="outlined" style="outline: var(--andm-focus-ring-width) solid var(--andm-focus-ring-color); outline-offset: var(--andm-focus-ring-width);">
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
                <Button variant="text" style="outline: var(--andm-focus-ring-width) solid var(--andm-focus-ring-color); outline-offset: var(--andm-focus-ring-width);">
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
          <p style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 16px;">
            アイコンのみのボタン。ariaLabelが必須です。
          </p>
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

        <!-- E) Toggle buttons -->
        <section>
          <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--andm-color-on-surface);">
            E) Toggle buttons
          </h2>
          <p style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 16px;">
            トグル可能なボタン。pressed状態で選択状態を表現します。
          </p>
          <div style="display: grid; gap: 24px;">
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Toggle button variants
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <ToggleButton
                  v-for="variant in toggleButtonVariants"
                  :key="variant"
                  :variant="variant"
                >
                  {{ variant }}
                </ToggleButton>
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Toggle button states
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <ToggleButton variant="filled">Unpressed</ToggleButton>
                <ToggleButton variant="filled" :pressed="true">Pressed</ToggleButton>
                <ToggleButton variant="filled" disabled>Disabled</ToggleButton>
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Toggle button with icon
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <ToggleButton variant="filled">
                  <template #icon>${iconTemplate}</template>
                  With icon
                </ToggleButton>
                <ToggleButton variant="filled" :pressed="true">
                  <template #icon>${iconTemplate}</template>
                  Pressed
                </ToggleButton>
              </div>
            </div>
          </div>
        </section>

        <!-- F) Toggle icon buttons -->
        <section>
          <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--andm-color-on-surface);">
            F) Toggle icon buttons
          </h2>
          <p style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 16px;">
            トグル可能なアイコンボタン。pressed状態で選択状態を表現します。
          </p>
          <div style="display: grid; gap: 24px;">
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Toggle icon button variants
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <ToggleIconButton
                  v-for="variant in iconButtonVariants"
                  :key="variant"
                  :variant="variant"
                  aria-label="Toggle icon button"
                  icon-name="add"
                />
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Toggle icon button states
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <ToggleIconButton variant="standard" aria-label="Unpressed" icon-name="add" />
                <ToggleIconButton variant="standard" :pressed="true" aria-label="Pressed" icon-name="add" />
                <ToggleIconButton variant="standard" aria-label="Disabled" icon-name="add" disabled />
              </div>
            </div>
            <div>
              <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
                Toggle icon button with slot
              </h3>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                <ToggleIconButton variant="standard" aria-label="Add">
                  <template #icon>${addIconTemplate}</template>
                </ToggleIconButton>
                <ToggleIconButton variant="standard" :pressed="true" aria-label="Add pressed">
                  <template #icon>${addIconTemplate}</template>
                </ToggleIconButton>
              </div>
            </div>
          </div>
        </section>

        <!-- G) Button groups -->
        <section>
          <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--andm-color-on-surface);">
            G) Button groups
          </h2>
          <p style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 16px;">
            ボタンをグループ化するコンテナ。standard（gapあり）とconnected（一体化）の2種類があります。
          </p>
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

        <!-- H) Split buttons -->
        <section>
          <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--andm-color-on-surface);">
            H) Split buttons
          </h2>
          <p style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 16px;">
            プライマリアクションとメニュートグルを一体化したボタン。
          </p>
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

        <!-- I) Segmented buttons -->
        <section>
          <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--andm-color-on-surface);">
            I) Segmented buttons
          </h2>
          <p style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 16px;">
            複数の選択肢から1つまたは複数を選択できるセグメントボタン。
          </p>
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
