import type { Meta, StoryObj } from "@storybook/react";

import { TaskDecorator } from "../../../utils/stories";

import { ResourceHeaderDocs } from ".";

const meta = {
  title: "Components/Resources/Header",
  component: ResourceHeaderDocs,
  decorators: [TaskDecorator],
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ResourceHeaderDocs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    resource: {
      id: "1",
      color: "red",
      label: "Resource #1",
    },
    index: 0,
  },
};

export const Last: Story = {
  args: {
    ...Primary.args,
    isLast: true,
  },
};
