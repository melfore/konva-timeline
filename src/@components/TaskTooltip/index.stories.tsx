import type { Meta, StoryObj } from "@storybook/react";

import { LayerDecorator, STORY_DATA, TasksLayerDecorator } from "../../@utils/stories";

import TaskTooltip from ".";

const meta = {
  title: "Components/TaskTooltip",
  component: TaskTooltip,
  decorators: [LayerDecorator, TasksLayerDecorator],
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TaskTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    task: STORY_DATA.tasks[0],
    x: 50,
    y: 50,
  },
};
