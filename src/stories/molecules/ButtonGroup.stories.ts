import type { Meta, StoryObj } from "@storybook/vue3";
import ButtonGroup from "../../components/molecules/ButtonGroup/ButtonGroup.vue";
import Button from "../../components/atoms/Button/Button.vue";
import IconButton from "../../components/atoms/IconButton/IconButton.vue";

const meta: Meta<typeof ButtonGroup> = {
  title: "Molecules/ButtonGroup",
  component: ButtonGroup,
  argTypes: {
    connected: {
      control: { type: "boolean" },
      description: "Connect buttons together",
    },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "Button group orientation",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Standard: Story = {
  render: () => ({
    components: { ButtonGroup, Button },
    template: `
      <ButtonGroup>
        <Button variant="filled">First</Button>
        <Button variant="filled">Second</Button>
        <Button variant="filled">Third</Button>
      </ButtonGroup>
    `,
  }),
};

export const Connected: Story = {
  render: () => ({
    components: { ButtonGroup, Button },
    template: `
      <ButtonGroup :connected="true">
        <Button variant="filled">First</Button>
        <Button variant="filled">Second</Button>
        <Button variant="filled">Third</Button>
      </ButtonGroup>
    `,
  }),
};

export const WithIconButtons: Story = {
  render: () => ({
    components: { ButtonGroup, IconButton },
    template: `
      <ButtonGroup :connected="true">
        <IconButton variant="standard" aria-label="First" icon-name="add" />
        <IconButton variant="standard" aria-label="Second" icon-name="add" />
        <IconButton variant="standard" aria-label="Third" icon-name="add" />
      </ButtonGroup>
    `,
  }),
};


