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
    interval: "day",
    resolution: "hours",
    tasks: [
      { start: "8:00", end: "9:00", label: "Task 1", userId: 1 },
      { start: "10:00", end: "13:00", label: "Task 2", userId: 1 },
      { start: "22:00", end: "23:00", label: "Task 3", userId: 1 },
      { start: "5:00", end: "7:00", label: "Task 4", userId: 2 },
      { start: "11:00", end: "16:00", label: "Task 5", userId: 2 },
      { start: "20:00", end: "23:00", label: "Task 6", userId: 2 },
      { start: "3:00", end: "4:00", label: "Task 7", userId: 3 },
      { start: "8:00", end: "10:00", label: "Task 8", userId: 3 },
      { start: "17:00", end: "18:00", label: "Task 9", userId: 3 },
    ],
    users: [
      { id: 1, label: "First", color: "orange" },
      { id: 2, label: "Second", color: "purple" },
      { id: 3, label: "Third", color: "gray" },
      { id: 4, label: "Fourth", color: "aqua" },
    ],
  },
};
