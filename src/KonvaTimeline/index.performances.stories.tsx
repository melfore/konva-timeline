import type { Meta, StoryObj } from "@storybook/react";

import { generateStoryData } from "./stories-data";
import KonvaTimeline from ".";

const meta = {
  title: "Main/KonvaTimeline [Perfomances]",
  component: KonvaTimeline,
  tags: ["autodocs"],
  argTypes: {},
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
  },
};

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
