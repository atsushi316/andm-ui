import type { Meta, StoryObj } from "@storybook/vue3";
import Button from "../../components/atoms/Button/Button.vue";

type ButtonProps = {
  variant?: "elevated" | "filled" | "tonal" | "outlined" | "text";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  iconName?: string;
  children?: string;
};

const meta: Meta<ButtonProps> = {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["elevated", "filled", "tonal", "outlined", "text"],
      description: "Button variant style",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "Button size",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the button",
    },
    iconName: {
      control: { type: "text" },
      description: "Icon name to display (uses Icon component)",
    },
    children: {
      control: { type: "text" },
      description: "Button text content",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

const iconTemplate = `
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
`;

export const Default: Story = {
  args: {
    variant: "filled",
    size: "md",
    disabled: false,
    children: "Button",
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">{{ args.children }}</Button>',
  }),
};

export const WithControls: Story = {
  args: {
    variant: "filled",
    size: "md",
    disabled: false,
    iconName: "add",
    children: "Button with icon",
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">{{ args.children }}</Button>',
  }),
};

export const M3Variants: Story = {
  render: () => ({
    components: { Button },
    setup() {
      const variants = [
        "elevated",
        "filled",
        "tonal",
        "outlined",
        "text",
      ] as const;
      return { variants, iconTemplate };
    },
    template: `
      <div style="display: grid; gap: 16px;">
        <div style="font-size: 12px; color: #49454f;">M3 recommended variants</div>
        <div v-for="variant in variants" :key="variant" style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
          <Button :variant="variant">{{ variant }}</Button>
          <Button :variant="variant">
            <template #icon>${iconTemplate}</template>
            With icon
          </Button>
        </div>
      </div>
    `,
  }),
};


