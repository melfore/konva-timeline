import type { Meta, StoryObj } from "@storybook/react";

import Timeline from "./";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Example/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    categories: [
      { id: 1, label: "First", color: "orange" },
      { id: 2, label: "Second", color: "purple" },
      { id: 3, label: "Third", color: "gray" },
      { id: 4, label: "Fourth", color: "aqua" },
    ],
    columnWidth: 60,
    hoursResolution: 1,
    timeRange: {
      begin: new Date().valueOf(),
      end: new Date().valueOf() + 86400000 * 3,
    },
  },
};
