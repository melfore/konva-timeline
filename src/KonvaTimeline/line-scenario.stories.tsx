import type { Meta, StoryObj } from "@storybook/react";

import DecoratoGantt from "../utils/decorator";

import { generateStoryData } from "./stories-data";
import KonvaTimeline from ".";

const meta = {
  title: "Scenario/Gantt",
  component: KonvaTimeline,
  decorators: [DecoratoGantt],
  tags: ["autodocs"],
  argTypes: {
    onTaskClick: {
      type: "function",
    },
    onTaskChange: {
      type: "function",
    },
  },
} satisfies Meta<typeof KonvaTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const { resources } = generateStoryData({
  averageTaskDurationInMinutes: 200,
  resourcesCount: 3,
  tasksCount: 5,
  timeRangeInDays: 1,
});

export const Line: Story = {
  args: {
    onAreaSelect: undefined,
    resources,
    resolution: "2weeks",
    enableLine: true,
    toolTip: false,
    dragResolution: "1hrs",
    onTaskClick: (task) => task,
    initialDateTime: 1698516000000,
    range: {
      start: 1698357600000,
      end: 1702095200000,
    },
    tasks: [
      {
        id: "4",
        label: "Task4",
        resourceId: "2",
        time: {
          start: 1698530400000,
          end: 1698552000000,
        },
        kLine: ["1"],
      },
      {
        id: "1",
        label: "Task1",
        resourceId: "1",
        time: {
          start: 1698793200000,
          end: 1699434800000,
        },
        kLine: ["3", "2"],
      },
      {
        id: "3",
        label: "Task3",
        resourceId: "3",
        time: {
          start: 1699734800000,
          end: 1700234800000,
        },
      },
      {
        id: "2",
        label: "Task2",
        resourceId: "2",
        time: {
          start: 1700434800000,
          end: 1700934800000,
        },
        kLine: ["5"],
      },
      {
        id: "5",
        label: "Task5",
        resourceId: "1",
        time: {
          start: 1701505200000,
          end: 1702105200000,
        },
      },
    ],
    onTaskChange: (task, opts) => {
      task.id, opts;
    },
  },
};
