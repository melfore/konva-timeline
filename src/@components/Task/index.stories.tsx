import type { Meta, StoryObj } from "@storybook/react";

import { COLOR_ARG_TYPE, TaskDecorator } from "../../@utils/stories";

import Task from ".";

const meta = {
  title: "Components/Task",
  component: Task,
  decorators: [TaskDecorator],
  tags: ["autodocs"],
  argTypes: {
    fill: COLOR_ARG_TYPE,
    stroke: COLOR_ARG_TYPE,
  },
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "task-1",
    label: "Task 1",
    width: 100,
    x: 50,
    y: 50,
  },
};
