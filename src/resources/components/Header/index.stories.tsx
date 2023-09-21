import type { Meta, StoryObj } from "@storybook/react";

import { TaskDecorator } from "../../../utils/stories";

import { ResourceHeaderDocs } from ".";

const meta = {
  title: "Components/ResourceHeader",
  component: ResourceHeaderDocs,
  decorators: [TaskDecorator],
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ResourceHeaderDocs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: "red",
    id: "1",
    index: 1,
    label: "Resource #1",
  },
};
