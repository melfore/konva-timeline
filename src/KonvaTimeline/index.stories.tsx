import type { Meta, StoryObj } from "@storybook/react";

import { generateStoryData } from "./stories-data";
import KonvaTimeline from ".";

const meta = {
  title: "Main/KonvaTimeline",
  component: KonvaTimeline,
  tags: ["autodocs"],
  argTypes: {},
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
    range,
    resources,
    tasks,
    resolution: "1hrs",
  },
};
