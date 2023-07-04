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
      { id: "1", label: "First", color: "orange" },
      { id: "2", label: "Second", color: "purple" },
      { id: "3", label: "Third", color: "gray" },
      { id: "4", label: "Fourth", color: "aqua" },
    ],
    resolution: "1hrs",
    tasks: [
      {
        categoryId: "1",
        label: "Test 1",
        time: {
          // Tuesday, 4 July 2023 02:30:00 GMT+02:00
          begin: 1688430600000,
          // Tuesday, 4 July 2023 02:45:00 GMT+02:00
          end: 1688431500000,
        },
      },
      {
        categoryId: "1",
        label: "Test 2",
        time: {
          // Tuesday, 4 July 2023 03:30:00 GMT+02:00
          begin: 1688434200000,
          // Tuesday, 4 July 2023 04:30:00 GMT+02:00
          end: 1688437800000,
        },
      },
      {
        categoryId: "2",
        label: "Test 2",
        time: {
          // Tuesday, 4 July 2023 03:30:00 GMT+02:00
          begin: 1688434200000,
          // Tuesday, 4 July 2023 04:30:00 GMT+02:00
          end: 1688437800000,
        },
      },
      {
        categoryId: "3",
        label: "Test 3",
        time: {
          // Tuesday, 4 July 2023 02:30:00 GMT+02:00
          begin: 1688430600000,
          // Tuesday, 4 July 2023 02:45:00 GMT+02:00
          end: 1688431500000,
        },
      },
      {
        categoryId: "4",
        label: "Test 4",
        time: {
          // Tuesday, 4 July 2023 03:30:00 GMT+02:00
          begin: 1688434200000,
          // Tuesday, 4 July 2023 04:30:00 GMT+02:00
          end: 1688437800000,
        },
      },
    ],
    timeRange: {
      begin: 1688421600000,
      end: 1688421600000 + 86400000 * 3,
    },
  },
};
