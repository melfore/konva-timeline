import type { Meta, StoryObj } from "@storybook/react";

import { generateStoryData } from "./stories-data";
import KonvaTimeline from ".";

const meta = {
  title: "Main/KonvaTimeline",
  component: KonvaTimeline,
  tags: ["autodocs"],
  argTypes: {
    onTaskClick: {
      type: "function",
    },
    onTaskDrag: {
      type: "function",
    },
  },
} satisfies Meta<typeof KonvaTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const { range, resources, tasks } = generateStoryData({
  averageTaskDurationInMinutes: 200,
  resourcesCount: 3,
  tasksCount: 5,
  timeRangeInDays: 1,
});

export const Primary: Story = {
  args: {
    dragResolution: "5min",
    range,
    resources,
    tasks,
    resolution: "1hrs",
  },
};

export const CustomColumnWidth: Story = {
  args: {
    ...Primary.args,
    columnWidth: 120,
  },
};

export const CustomResolution: Story = {
  args: {
    ...Primary.args,
    resolution: "10min",
  },
};

export const HiddenResources: Story = {
  args: {
    ...Primary.args,
    hideResources: true,
  },
};
