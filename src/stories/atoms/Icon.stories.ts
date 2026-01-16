import type { Meta, StoryObj } from "@storybook/vue3";
import Icon from "@/components/atoms/Icon/Icon.vue";
import { iconNames } from "@/assets/icons";

type IconProps = {
  name: string;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
};

const meta: Meta<IconProps> = {
  title: "Atoms/Icon",
  component: Icon,
  argTypes: {
    name: {
      control: { type: "select" },
      options: iconNames,
      description: "Icon name",
      table: {
        type: { summary: "string" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Icon size",
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "md" },
      },
    },
    ariaLabel: {
      control: { type: "text" },
      description: "Accessibility label for the icon",
      table: {
        type: { summary: "string" },
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: "add",
    size: "md",
    ariaLabel: "Add icon",
  },
  render: (args) => ({
    components: { Icon },
    setup: () => ({ args }),
    template: '<Icon v-bind="args" />',
  }),
};

export const AvailableIcons: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => ({
    components: { Icon },
    setup: () => {
      // 実装済みアイコン（iconNamesから取得）
      const implementedIcons = iconNames.map((name) => ({
        name,
        label: `${name} (実装済み)`,
      }));
      // フォールバック例（実装されていないアイコン名）
      const fallbackIcons = [
        { name: "unknown-icon", label: "Unknown (フォールバック)" },
        { name: "custom-icon", label: "Custom (フォールバック)" },
      ];
      return { implementedIcons, fallbackIcons };
    },
    template: `
      <div style="display: grid; gap: 32px; padding: 24px; max-width: 1200px; margin: 0 auto;">
        <section>
          <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--andm-color-on-surface);">
            実装済みアイコン
          </h2>
          <p style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 16px;">
            SVGで実装されているアイコン。{{ implementedIcons.length }}種類のアイコンが利用可能です。
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 16px;">
            <div
              v-for="icon in implementedIcons"
              :key="icon.name"
              style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid var(--andm-color-outline-variant); border-radius: 8px; background: var(--andm-color-surface);"
            >
              <Icon :name="icon.name" size="md" :aria-label="icon.label" />
              <span style="font-size: 12px; color: var(--andm-color-on-surface-variant); text-align: center;">
                {{ icon.name }}
              </span>
            </div>
          </div>
        </section>

        <section>
          <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--andm-color-on-surface);">
            フォールバック表示
          </h2>
          <p style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 16px;">
            未実装のアイコン名を指定すると、フォールバックとしてテキストが表示されます。実装が必要なアイコンは追加してください。
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 16px;">
            <div
              v-for="icon in fallbackIcons"
              :key="icon.name"
              style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px; border: 1px solid var(--andm-color-outline-variant); border-radius: 8px; background: var(--andm-color-surface);"
            >
              <Icon :name="icon.name" size="md" :aria-label="icon.label" />
              <span style="font-size: 12px; color: var(--andm-color-on-surface-variant); text-align: center;">
                {{ icon.name }}
              </span>
            </div>
          </div>
        </section>

        <section>
          <h2 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--andm-color-on-surface);">
            サイズバリエーション
          </h2>
          <p style="font-size: 12px; color: var(--andm-color-on-surface-variant); margin-bottom: 16px;">
            実装済みアイコンのサイズバリエーション。
          </p>
          <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
              <Icon name="add" size="sm" aria-label="Small add icon" />
              <span style="font-size: 12px; color: var(--andm-color-on-surface-variant);">sm (16px)</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
              <Icon name="add" size="md" aria-label="Medium add icon" />
              <span style="font-size: 12px; color: var(--andm-color-on-surface-variant);">md (20px)</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
              <Icon name="add" size="lg" aria-label="Large add icon" />
              <span style="font-size: 12px; color: var(--andm-color-on-surface-variant);">lg (24px)</span>
            </div>
          </div>
        </section>
      </div>
    `,
  }),
};
