import { DateTime, Duration, Interval } from "luxon";

import { KonvaTimelineError, Operation } from "../../utils/operations";
import { getValidTime, InternalTimeRange, TimeRange } from "../../utils/time";
import { ResolutionData } from "../../utils/time-resolution";

export interface TaskData<T extends TimeRange = TimeRange> {
  /**
   * Unique identifier of the task
   */
  id: string;
  /**
   * Label of the task
   */
  label: string;
  /**
   * Id of assigned resource
   */
  resourceId: string;
  /**
   * Completed Percentage
   */
  completedPercentage?: number;
  /**
   * Task time range
   */
  time: T;
  /**
   * Id of connected Tasks
   */
  relatedTasks?: string[];
}

type FilteredTasks = Operation<TaskData<InternalTimeRange>>;

export type TaskDimensions = {
  row: number;
  width: number;
  x: number;
  y: number;
};

export type AreaSelect = {
  resourceId: string;
  range: TimeRange;
};

export const TASK_OFFSET_Y = 0.15;

export const TASK_BORDER_RADIUS = 4;
export const TASK_HEIGHT_OFFSET = 0.7;

/**
 * Gets task Y coordinate
 * @param rowIndex the row index
 * @param rowHeight the row height
 */
export const getTaskYCoordinate = (rowIndex: number, rowHeight: number) =>
  rowHeight * rowIndex + rowHeight * TASK_OFFSET_Y;

/**
 * Filters valid tasks to be shown in the chart
 * @param tasks list of tasks as passed to the component
 * @param intervals intervals as passed to the component
 */
export const validateTasks = (
  tasks: TaskData[],
  range: InternalTimeRange | null,
  timezone: string | undefined
): FilteredTasks => {
  const tz = timezone || "system";
  if (!range || !range.start || !range.end) {
    return { items: [], errors: [{ entity: "timeline", level: "warn", message: "Invalid range" }] };
  }

  if (!tasks || !tasks.length) {
    return { items: [], errors: [{ entity: "timeline", level: "warn", message: "No data" }] };
  }

  const errors: KonvaTimelineError[] = [];
  const items = tasks
    .map(
      (task): TaskData<InternalTimeRange> => ({
        ...task,
        time: {
          start: getValidTime(task.time.start, tz),
          end: getValidTime(task.time.end, tz),
        },
      })
    )
    .filter(({ id: taskId, time: { start: taskStart, end: taskEnd } }) => {
      if (taskStart >= taskEnd) {
        errors.push({ entity: "task", level: "error", message: "Invalid time", refId: taskId });
        return false;
      }

      if (taskStart < range.start || taskEnd > range.end) {
        errors.push({ entity: "task", level: "warn", message: "Outside range", refId: taskId });
        return false;
      }

      return true;
    });

  return { items, errors };
};

/**
 * Filters valid tasks to be shown in the chart
 * @param tasks list of tasks as passed to the component
 * @param intervals intervals as passed to the component
 */
export const filterTasks = (
  tasks: TaskData<InternalTimeRange>[],
  range: InternalTimeRange | null
): TaskData<InternalTimeRange>[] => {
  if (!range || !range.start || !range.end || !tasks || !tasks.length) {
    return [];
  }

  return tasks.filter(({ time: { start: taskStart, end: taskEnd } }) => {
    if (taskStart >= taskEnd) {
      return false;
    }

    if (taskEnd < range.start || taskStart > range.end) {
      return false;
    }

    return true;
  });
};

export const lineFilter = (
  tasks: TaskData<InternalTimeRange>[],
  range: InternalTimeRange | null
): TaskData<InternalTimeRange>[] => {
  if (!range || !range.start || !range.end || !tasks || !tasks.length) {
    return [];
  }

  return tasks.filter(({ relatedTasks: kLine }) => {
    if (kLine) {
      return true;
    }

    return false;
  });
};

const fromPxToTime = (sizePx: number, resolution: ResolutionData, columnWidth: number): number => {
  return (sizePx * resolution.sizeInUnits) / columnWidth;
};

export const onEndTimeRange = (
  taskDimesion: TaskDimensions,
  resolution: ResolutionData,
  columnWidth: number,
  interval: Interval
): TimeRange => {
  const columnInHrs = resolution.unit === "week" ? (resolution.sizeInUnits === 1 ? 168 : 336) : 24;
  const hrs = 3600000;
  const hrsInPx = columnWidth / columnInHrs;

  const timeOffset = fromPxToTime(taskDimesion.x, resolution, columnWidth);
  const startTaskMillis = interval.start!.plus({ [resolution.unit]: timeOffset }).toMillis();
  const startDate = DateTime.fromMillis(startTaskMillis);

  const startOfBeforeDay = DateTime.fromMillis(startTaskMillis - 3600000).startOf("day");
  const startOfBeforeDayTz = startOfBeforeDay.toISO()!.slice(-5, -3);

  const startOfNextDay = DateTime.fromMillis(startTaskMillis + 3600000)
    .startOf("day")
    .toISO()!
    .slice(-5, -3);

  const intervalStartTZ = interval.start?.toISO().slice(-5, -3); //Interval start TZ
  const taskStartTZ = DateTime.fromMillis(startTaskMillis).startOf("day").toISO()?.slice(-5, -3); //Task start TZ
  const diffTZ = +intervalStartTZ! - +taskStartTZ!;

  const startOfDay = startDate.startOf("day").toISO()?.slice(-5, -3); //Day start TZ
  const nextDay = startDate.startOf("day").plus({ day: 1 }).toISO()?.slice(-5, -3); //Next Day TZ
  const diffTZInDay = +nextDay! - +startOfDay!;

  let gap = 0;
  let hrsSpecialCase = 0;

  if (resolution.unit === "day" || resolution.unit === "week") {
    if (diffTZ === 1) {
      gap = hrsInPx * diffTZ;

      if (+startOfBeforeDayTz - +intervalStartTZ! === 0 && +startOfNextDay - +intervalStartTZ! !== 0) {
        gap = 0;
        hrsSpecialCase = hrs;
      }
    }

    if (+startOfBeforeDayTz - +intervalStartTZ! !== 0 && +startOfNextDay - +intervalStartTZ! === 0) {
      const timeOffsett = fromPxToTime(taskDimesion.x - hrsInPx * 23, resolution, columnWidth);
      const startTaskDayBefore = interval
        .start!.plus({ [resolution.unit]: timeOffsett })
        .startOf("hour")
        .toMillis();
      if (startOfBeforeDay.toMillis() === startTaskDayBefore) {
        hrsSpecialCase = hrs;
      }
    }
    if (diffTZ === -1) {
      gap = hrsInPx * diffTZ;

      if (diffTZInDay === -1) {
        gap = hrsInPx * diffTZInDay;
      }
      const timeOffsett = fromPxToTime(taskDimesion.x - hrsInPx * 23, resolution, columnWidth);
      const startTaskDayBefore = interval.start!.plus({ [resolution.unit]: timeOffsett }).startOf("hour");
      if (startOfBeforeDay.toMillis() === startTaskDayBefore.toMillis()) {
        if (diffTZInDay !== 0) {
          gap = 0;
          hrsSpecialCase = -hrs;
        }
      }
      if (
        startTaskDayBefore.toMillis() + hrs * 23 === startDate.startOf("day").toMillis() &&
        startTaskDayBefore.toISO().slice(-5, -3) === intervalStartTZ
      ) {
        gap = 0;
        hrsSpecialCase = 0;
      }
    }
  }
  const timeOffsetB = fromPxToTime(taskDimesion.x - gap, resolution, columnWidth);

  const start = interval.start!.plus({ [resolution.unit]: timeOffsetB }).toMillis() - hrsSpecialCase;
  const end =
    start +
    Duration.fromObject({
      [resolution.unit]: fromPxToTime(taskDimesion.width, resolution, columnWidth),
    }).toMillis();
  return { start, end };
};

export const connectedTasks = (
  taskData: TaskData,
  allValidTasks: TaskData[],
  addTime: number,
  range: InternalTimeRange
) => {
  const { start, end } = range;
  let allKLine = taskData.relatedTasks ? taskData.relatedTasks : [];
  let newKLine: string[] = [];
  let noKLine = true;
  let iOffset = 0;
  let maxAddTime = addTime;
  do {
    noKLine = false;
    let pushCount = iOffset === 0 ? allKLine.length - 1 : 0;
    for (let i = 0 + iOffset; i < allKLine.length; i++) {
      const val = allValidTasks.find((item) => item.id === allKLine[i]);
      if (val) {
        if (+val.time.start + addTime < start) {
          maxAddTime = start - +val.time.start;
        }
        if (+val.time.end + addTime > end) {
          maxAddTime = end - +val.time.end;
        }
      }
      if (val?.relatedTasks) {
        val.relatedTasks.map((value) => {
          if (!allKLine.includes(value) && !newKLine.includes(value)) {
            newKLine.push(value);
            pushCount++;
          }
        });
      }
    }
    if (newKLine[0]) {
      noKLine = true;
    }
    newKLine.unshift(...allKLine);
    allKLine = [];
    allKLine.push(...newKLine);
    newKLine = [];
    iOffset = iOffset + pushCount;
  } while (noKLine);
  return { allKLine, maxAddTime };
};
