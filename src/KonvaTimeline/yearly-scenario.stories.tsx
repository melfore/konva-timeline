import type { Meta, StoryObj } from "@storybook/react";

import { generateStoryData } from "./stories-data";
import KonvaTimeline from ".";

const meta = {
  title: "Scenario/Yearly Report",
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

const yearlyStoryData = generateStoryData({
  averageTaskDurationInMinutes: 600,
  resourcesCount: 20,
  tasksCount: 3000,
  timeRangeInDays: 365 * 5,
});

export const YearlyReport: Story = {
  args: {
    ...yearlyStoryData,
    resolution: "30min",
    columnWidth: 120,
    range: {
      start: 1698357600000,
      end: 1712095200000,
    },
    tasks: [
      {
        id: "1",
        label: "1Novembre",
        resourceId: "1",
        time: {
          start: 1698793200000,
          end: 1700434800000,
        },
      },
      {
        id: "2",
        label: "26Marzo",
        resourceId: "1",
        time: {
          start: 1711839600000,
          end: 1711922399000,
        },
      },
    ],
  },
};
