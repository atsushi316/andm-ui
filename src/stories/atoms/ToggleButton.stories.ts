import type { Meta, StoryObj } from "@storybook/vue3";
import ToggleButton from "../../components/atoms/ToggleButton/ToggleButton.vue";

const meta: Meta<typeof ToggleButton> = {
  title: "Atoms/ToggleButton",
  component: ToggleButton,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["filled", "tonal", "outlined", "text"],
      description: "ToggleButton variant style",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "ToggleButton size",
    },
    pressed: {
      control: { type: "boolean" },
      description: "Pressed state",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the toggle button",
    },
    iconName: {
      control: { type: "text" },
      description: "Icon name to display",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
  args: {
    variant: "filled",
    size: "md",
    pressed: false,
    disabled: false,
  },
  render: (args) => ({
    components: { ToggleButton },
    setup: () => ({ args }),
    template: '<ToggleButton v-bind="args">Toggle</ToggleButton>',
  }),
};

export const WithControls: Story = {
  args: {
    variant: "filled",
    size: "md",
    pressed: false,
    disabled: false,
  },
  render: (args) => ({
    components: { ToggleButton },
    setup: () => ({ args }),
    template: '<ToggleButton v-bind="args">Toggle Button</ToggleButton>',
  }),
};

