import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DateTime } from "luxon";

import { AreaSelect } from "../tasks/utils/tasks";
import { CustomToolTipData } from "../timeline/TimelineContext";
import TimelineDecorator from "../utils/stories/decorators/Timeline";
import { generateStoryData } from "../utils/stories/utils";

import KonvaTimeline from ".";

const meta = {
  title: "Main/KonvaTimeline",
  component: KonvaTimeline,
  decorators: [TimelineDecorator],
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

const customToolTip = (taskData: CustomToolTipData) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "ridge",
        borderColor: "black",
        borderWidth: "1px",
        margin: 0,
        borderRadius: "50%",
        height: 100,
      }}
    >
      <h4 style={{ justifyContent: "center", alignItems: "top", display: "flex", color: "blue", margin: 1 }}>
        {taskData.label}
      </h4>
      <b style={{ justifyContent: "center", alignItems: "top", display: "flex", marginBottom: 4 }}>Range:</b>
      <span style={{ justifyContent: "center", alignItems: "top", display: "flex" }}>{taskData.start}</span>
      <span style={{ justifyContent: "center", alignItems: "top", display: "flex", margin: 0 }}>{taskData.end}</span>
    </div>
  );
};

export const Primary: Story = {
  args: {
    dragResolution: "5min",
    range,
    resources,
    tasks,
    resolution: "1hrs",
    onAreaSelect: undefined,
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
          end: 1697739400000,
        },
      },
      {
        id: "4",
        label: "Task4",
        resourceId: "3",
        time: {
          start: 1697802666000,
          end: 1697939066000,
        },
      },
      {
        id: "3",
        label: "Task3",
        resourceId: "1",
        time: {
          start: 1697925606000,
          end: 1698091206000,
        },
      },
      {
        id: "2",
        label: "Task2",
        resourceId: "2",
        time: {
          start: 1697691606000,
          end: 1697818006000,
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
        id: "4",
        label: "Task4",
        resourceId: "2",
        completedPercentage: 28,
        time: {
          start: 1698357600000,
          end: 1698557900000,
        },
      },
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

export const SelectArea: Story = {
  args: {
    ...Primary.args,
    onAreaSelect: (data: AreaSelect) => data,
  },
};

export const DisabledTooltip: Story = {
  args: {
    ...Primary.args,
    toolTip: false,
  },
};

export const CustomTooltip: Story = {
  args: {
    ...Primary.args,
    customToolTip: customToolTip,
  },
};

export const CustomColor: Story = {
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
        id: "4",
        label: "Task4",
        resourceId: "2",
        time: {
          start: 1698357600000,
          end: 1698557900000,
        },
      },
      {
        id: "6",
        label: "Task6",
        resourceId: "2",
        time: {
          start: 1698599900000,
          end: 1698793200000,
        },
        taskColor: "#fc0303",
      },
      {
        id: "1",
        label: "Task1",
        resourceId: "1",
        time: {
          start: 1698793200000,
          end: 1699434800000,
        },
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
  },
};

export const ResourceClickable: Story = {
  args: {
    ...Primary.args,
    onResourceClick: (resource) => alert(`OnResourceClick handler, ResourceLabel: ${resource.label}`),
  },
};
