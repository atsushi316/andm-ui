import type { Meta, StoryObj } from "@storybook/vue3";
import SegmentedButtons from "../../components/molecules/SegmentedButtons/SegmentedButtons.vue";

const meta: Meta<typeof SegmentedButtons> = {
  title: "Molecules/SegmentedButtons",
  component: SegmentedButtons,
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["single", "multiple"],
      description: "Selection mode",
    },
    variant: {
      control: { type: "select" },
      options: ["filled", "tonal", "outlined", "text"],
      description: "SegmentedButtons variant style",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "SegmentedButtons size",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the segmented buttons",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SegmentedButtons>;

export const Single: Story = {
  args: {
    mode: "single",
    variant: "filled",
    size: "md",
    disabled: false,
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
    value: "option1",
  },
};

export const Multiple: Story = {
  args: {
    mode: "multiple",
    variant: "filled",
    size: "md",
    disabled: false,
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
    values: ["option1"],
  },
};

export const WithIcons: Story = {
  render: () => ({
    components: { SegmentedButtons },
    setup() {
      return {
        options: [
          { value: "grid", iconName: "grid" },
          { value: "list", iconName: "list" },
          { value: "map", iconName: "map" },
        ],
      };
    },
    template: `
      <SegmentedButtons
        mode="single"
        variant="filled"
        :options="options"
        value="grid"
      />
    `,
  }),
};



