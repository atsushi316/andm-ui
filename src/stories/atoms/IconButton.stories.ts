import type { Meta, StoryObj } from "@storybook/vue3";
import IconButton from "../../components/atoms/IconButton/IconButton.vue";

const meta: Meta<typeof IconButton> = {
  title: "Atoms/IconButton",
  component: IconButton,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["standard", "filled", "tonal", "outlined"],
      description: "IconButton variant style",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "IconButton size",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the icon button",
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

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    variant: "standard",
    size: "md",
    disabled: false,
    ariaLabel: "Icon button",
    iconName: "add",
  },
};

export const WithControls: Story = {
  args: {
    variant: "standard",
    size: "md",
    disabled: false,
    ariaLabel: "Icon button with controls",
    iconName: "add",
  },
};

