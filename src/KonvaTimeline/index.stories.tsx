import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import KonvaTimeline from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "KonvaTimeline",
  component: KonvaTimeline,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof KonvaTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    resolution: "1hrs",
    resources: [
      { id: "1", label: "First", color: "orange" },
      { id: "2", label: "Second", color: "purple" },
      { id: "3", label: "Third", color: "gray" },
      { id: "4", label: "Fourth", color: "aqua" },
    ],
    tasks: [
      {
        id: "1",
        resourceId: "1",
        label: "Skip: totally outside interval",
        time: {
          start: 0,
          end: 1,
        },
      },
      {
        id: "2",
        resourceId: "1",
        label: "Partial: starts outside interval",
        time: {
          start: 688423600000,
          end: 1688423600000,
        },
      },
      {
        id: "3",
        resourceId: "1",
        label: "Partial: ends outside interval",
        time: {
          start: 1688440800000,
          end: 2688423600000,
        },
      },
      {
        id: "4",
        resourceId: "1",
        label: "Test 1",
        time: {
          // Tuesday, 4 July 2023 02:30:00 GMT+02:00
          start: 1688430600000,
          // Tuesday, 4 July 2023 02:45:00 GMT+02:00
          end: 1688431500000,
        },
      },
      {
        id: "5",
        resourceId: "1",
        label: "Test 1-2",
        time: {
          // Tuesday, 4 July 2023 03:30:00 GMT+02:00
          start: 1688434200000,
          // Tuesday, 4 July 2023 04:30:00 GMT+02:00
          end: 1688437800000,
        },
      },
      {
        id: "6",
        resourceId: "2",
        label: "Test 2",
        time: {
          // Tuesday, 4 July 2023 03:30:00 GMT+02:00
          start: 1688434200000,
          // Tuesday, 4 July 2023 04:30:00 GMT+02:00
          end: 1688437800000,
        },
      },
      {
        id: "7",
        resourceId: "3",
        label: "Test 3",
        time: {
          // Tuesday, 4 July 2023 02:30:00 GMT+02:00
          start: 1688430600000,
          // Tuesday, 4 July 2023 02:45:00 GMT+02:00
          end: 1688431500000,
        },
      },
      {
        id: "8",
        resourceId: "4",
        label: "Test 4",
        time: {
          // Tuesday, 4 July 2023 03:30:00 GMT+02:00
          start: 1688434200000,
          // Tuesday, 4 July 2023 04:30:00 GMT+02:00
          end: 1688437800000,
        },
      },
    ],
    taskTooltipContent: (task) => (
      <div>
        <h1>{task.label}</h1>
      </div>
    ),
    range: {
      start: 1688421600000,
      end: 1688421600000 + 86400000 * 3,
    },
  },
};
