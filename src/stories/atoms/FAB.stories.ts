import type { Meta, StoryObj } from "@storybook/vue3";
import FAB from "../../components/atoms/FAB/FAB.vue";

const meta: Meta<typeof FAB> = {
  title: "Atoms/FAB",
  component: FAB,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["surface", "primary", "secondary", "tertiary"],
      description: "FAB variant style",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "FAB size",
    },
    label: {
      control: { type: "text" },
      description: "Label text (creates Extended FAB when provided)",
    },
    iconName: {
      control: { type: "text" },
      description: "Icon name to display",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the FAB",
    },
    lowered: {
      control: { type: "boolean" },
      description: "Lowered elevation variant",
    },
    ariaLabel: {
      control: { type: "text" },
      description: "Aria label (required)",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FAB>;

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    lowered: false,
    ariaLabel: "FAB",
    iconName: "add",
  },
};

export const StandardFAB: Story = {
  render: () => ({
    components: { FAB },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
        <FAB variant="primary" size="sm" aria-label="Small FAB" icon-name="add" />
        <FAB variant="primary" size="md" aria-label="Medium FAB" icon-name="add" />
        <FAB variant="primary" size="lg" aria-label="Large FAB" icon-name="add" />
      </div>
    `,
  }),
};

export const ExtendedFAB: Story = {
  render: () => ({
    components: { FAB },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
        <FAB variant="primary" size="sm" label="Small" aria-label="Small Extended FAB" icon-name="add" />
        <FAB variant="primary" size="md" label="Medium" aria-label="Medium Extended FAB" icon-name="add" />
        <FAB variant="primary" size="lg" label="Large" aria-label="Large Extended FAB" icon-name="add" />
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { FAB },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
        <FAB variant="surface" aria-label="Surface FAB" icon-name="add" />
        <FAB variant="primary" aria-label="Primary FAB" icon-name="add" />
        <FAB variant="secondary" aria-label="Secondary FAB" icon-name="add" />
        <FAB variant="tertiary" aria-label="Tertiary FAB" icon-name="add" />
      </div>
    `,
  }),
};

export const ExtendedVariants: Story = {
  render: () => ({
    components: { FAB },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
        <FAB variant="surface" label="Surface" aria-label="Surface Extended FAB" icon-name="add" />
        <FAB variant="primary" label="Primary" aria-label="Primary Extended FAB" icon-name="add" />
        <FAB variant="secondary" label="Secondary" aria-label="Secondary Extended FAB" icon-name="add" />
        <FAB variant="tertiary" label="Tertiary" aria-label="Tertiary Extended FAB" icon-name="add" />
      </div>
    `,
  }),
};

export const Lowered: Story = {
  render: () => ({
    components: { FAB },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
        <FAB variant="primary" lowered aria-label="Lowered FAB" icon-name="add" />
        <FAB variant="primary" lowered label="Lowered Extended" aria-label="Lowered Extended FAB" icon-name="add" />
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    components: { FAB },
    template: `
      <div style="display: grid; gap: 24px;">
        <div>
          <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--andm-color-on-surface);">
            Default / Hover / Pressed / Focus / Disabled
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
            Extended FAB States
          </h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
            <FAB variant="primary" label="Default" aria-label="Default Extended" icon-name="add" />
            <FAB variant="primary" label="Pressed" class="andm-fab--pressed" aria-label="Pressed Extended" icon-name="add" />
            <FAB variant="primary" label="Focus" class="andm-is-focus-visible" aria-label="Focus Extended" icon-name="add" />
            <FAB variant="primary" label="Disabled" disabled aria-label="Disabled Extended" icon-name="add" />
          </div>
        </div>
      </div>
    `,
  }),
};

export const WithControls: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: false,
    lowered: false,
    ariaLabel: "FAB with controls",
    iconName: "add",
  },
};

