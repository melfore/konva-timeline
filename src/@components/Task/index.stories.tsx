import type { Meta, StoryObj } from "@storybook/react";

import { COLOR_ARG_TYPE, TaskDecorator } from "../../@utils/stories";

import { TaskDocs } from ".";

const meta = {
  title: "Components/Task",
  component: TaskDocs,
  decorators: [TaskDecorator],
  tags: ["autodocs"],
  argTypes: {
    fill: COLOR_ARG_TYPE,
    stroke: COLOR_ARG_TYPE,
  },
} satisfies Meta<typeof TaskDocs>;

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
