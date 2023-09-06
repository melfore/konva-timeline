import type { Meta, StoryObj } from "@storybook/react";

import { generateStoryData } from "./stories-data";
import KonvaTimeline from ".";

const meta = {
  title: "Scenario/Yearly Report",
  component: KonvaTimeline,
  tags: ["autodocs"],
  argTypes: {
    onTaskDrag: {
      type: "function",
    },
  },
} satisfies Meta<typeof KonvaTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const yearlyStoryData = generateStoryData({
  averageTaskDurationInMinutes: 600,
  resourcesCount: 20,
  tasksCount: 3000,
  timeRangeInDays: 365 * 5,
});

export const YearlyReport: Story = {
  args: {
    ...yearlyStoryData,
    resolution: "1day",
  },
};
