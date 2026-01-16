import type { Meta, StoryObj } from "@storybook/vue3";
import SplitButton from "../../components/molecules/SplitButton/SplitButton.vue";

const meta: Meta<typeof SplitButton> = {
  title: "Molecules/SplitButton",
  component: SplitButton,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["elevated", "filled", "tonal", "outlined", "text"],
      description: "SplitButton variant style",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "SplitButton size",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the split button",
    },
    label: {
      control: { type: "text" },
      description: "Button label",
    },
    menuExpanded: {
      control: { type: "boolean" },
      description: "Menu expanded state",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SplitButton>;

export const Default: Story = {
  args: {
    variant: "filled",
    size: "md",
    disabled: false,
    label: "Action",
    menuExpanded: false,
  },
};

export const WithControls: Story = {
  args: {
    variant: "filled",
    size: "md",
    disabled: false,
    label: "Split Button",
    menuExpanded: false,
  },
};

export const Variants: Story = {
  render: () => ({
    components: { SplitButton },
    template: `
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
        <SplitButton variant="filled" label="Filled" />
        <SplitButton variant="tonal" label="Tonal" />
        <SplitButton variant="outlined" label="Outlined" />
      </div>
    `,
  }),
};

