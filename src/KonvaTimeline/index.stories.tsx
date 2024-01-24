import type { Meta, StoryObj } from "@storybook/react";
import { DateTime } from "luxon";

import { TaskData } from "../tasks/utils/tasks";

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
    onTaskChange: {
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
    onCreate: undefined,
  },
};

export const CustomColumnWidth: Story = {
  args: {
    ...Primary.args,
    columnWidth: 120,
  },
};

export const CustomHeaderLabel: Story = {
  args: {
    ...Primary.args,
    headerLabel: "Test",
  },
};

export const CustomResolution: Story = {
  args: {
    ...Primary.args,
    resolution: "10min",
  },
};

export const CustomRowHeight: Story = {
  args: {
    ...Primary.args,
    rowHeight: 30,
  },
};

export const HiddenResources: Story = {
  args: {
    ...Primary.args,
    hideResources: true,
  },
};

export const InitialDateTime: Story = {
  args: {
    ...Primary.args,
    initialDateTime: (range.start + range.end) / 2,
  },
};

export const MixedDateTimeFormats: Story = {
  args: {
    ...Primary.args,
    onErrors: (errors) => errors.forEach((error) => console.error({ error })),
    range: {
      start: DateTime.fromMillis(range.start).toUTC().toISO()!,
      end: DateTime.fromMillis(range.end).toUTC().toISO()!,
    },
  },
};

export const NonPreciseRange: Story = {
  args: {
    ...Primary.args,
    range: {
      start: 1697632200000,
      end: 1698244200000,
    },
    tasks: [
      {
        id: "1",
        label: "Task 1",
        resourceId: "1",
        time: {
          start: 1697632200000,
          end: 1697639400000,
        },
      },
    ],
    resolution: "1day",
    timezone: "Europe/Rome",
  },
};

export const CompletedPercentage: Story = {
  args: {
    ...Primary.args,
    resources,
    resolution: "2weeks",
    range: {
      start: 1698357600000,
      end: 1702095200000,
    },
    tasks: [
      {
        id: "1",
        label: "Task1",
        resourceId: "1",
        completedPercentage: 90,
        time: {
          start: 1698793200000,
          end: 1699434800000,
        },
      },
      {
        id: "2",
        label: "Task2",
        resourceId: "2",
        completedPercentage: 19,
        time: {
          start: 1700434800000,
          end: 1700934800000,
        },
      },
      {
        id: "3",
        label: "Task3",
        resourceId: "3",
        completedPercentage: 58,
        time: {
          start: 1699734800000,
          end: 1700234800000,
        },
      },
      {
        id: "4",
        label: "Task4",
        resourceId: "2",
        completedPercentage: 28,
        time: {
          start: 1698047900000,
          end: 1698557900000,
        },
      },
      {
        id: "5",
        label: "Task5",
        resourceId: "1",
        completedPercentage: 74,
        time: {
          start: 1701505200000,
          end: 1702105200000,
        },
      },
    ],
  },
};

export const LocalizedTooltipLabels: Story = {
  args: {
    ...Primary.args,
    localized: {
      start: "Inizio",
      end: "Fine",
      duration: "Durata",
      completed: "Completamento",
    },
  },
};

export const LocalizedDateFormat: Story = {
  args: {
    ...Primary.args,
    dateLocale: "it",
  },
};

export const AddTask: Story = {
  args: {
    ...Primary.args,
    onCreate: (data: TaskData) => data,
  },
};
