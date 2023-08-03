import type { Meta, StoryObj } from "@storybook/react";

import { KonvaDecorator } from "../../@utils/stories";

import Task from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Task",
  component: Task,
  decorators: [KonvaDecorator],
  tags: ["autodocs"],
  argTypes: {
    onMouseLeave: { action: "Mouse leave" },
    onMouseOver: { action: "Mouse over" },
  },
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    fill: "orange",
    id: "task-1",
    label: "Task 1",
    width: 100,
    x: 50,
    y: 50,
  },
};
