import type { Meta, StoryObj } from "@storybook/react";

import { generateStoryData } from "./stories-data";
import KonvaTimeline from ".";

const meta = {
  title: "Scenario/Monthly Report",
  component: KonvaTimeline,
  tags: ["autodocs"],
  argTypes: {
    onTaskChange: {
      type: "function",
    },
  },
} satisfies Meta<typeof KonvaTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const monthlyStoryData = generateStoryData({
  averageTaskDurationInMinutes: 10,
  resourcesCount: 16,
  tasksCount: 5000,
  timeRangeInDays: 60,
});

export const MonthlyReport: Story = {
  args: {
    ...monthlyStoryData,
    resolution: "1min",
    onCreate: undefined,
  },
};
