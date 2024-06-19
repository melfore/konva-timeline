import type { Meta, StoryObj } from "@storybook/react";

import { TasksLayerDecorator } from "../../../utils/stories/decorators/Tasks";

import ResourcesLayer from ".";

const meta = {
  title: "Components/Resources/Layer",
  component: ResourcesLayer,
  decorators: [TasksLayerDecorator],
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ResourcesLayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
