import type { Meta, StoryObj } from "@storybook/vue3";
import ToggleIconButton from "../../components/atoms/ToggleIconButton/ToggleIconButton.vue";

const meta: Meta<typeof ToggleIconButton> = {
  title: "Atoms/ToggleIconButton",
  component: ToggleIconButton,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["standard", "filled", "tonal", "outlined"],
      description: "ToggleIconButton variant style",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "ToggleIconButton size",
    },
    pressed: {
      control: { type: "boolean" },
      description: "Pressed state",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the toggle icon button",
    },
    ariaLabel: {
      control: { type: "text" },
      description: "Aria label (required)",
    },
    iconName: {
      control: { type: "text" },
      description: "Icon name to display",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleIconButton>;

export const Default: Story = {
  args: {
    variant: "standard",
    size: "md",
    pressed: false,
    disabled: false,
    ariaLabel: "Toggle icon button",
    iconName: "add",
  },
};

export const WithControls: Story = {
  args: {
    variant: "standard",
    size: "md",
    pressed: false,
    disabled: false,
    ariaLabel: "Toggle icon button with controls",
    iconName: "add",
  },
};

