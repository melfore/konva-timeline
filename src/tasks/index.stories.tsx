import type { Meta, StoryObj } from "@storybook/react";

import { TasksLayerDecorator } from "../@utils/stories";

import TasksLayer from ".";

const meta = {
  title: "Components/TaskLayer",
  component: TasksLayer,
  decorators: [TasksLayerDecorator],
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TasksLayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
