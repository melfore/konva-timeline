import { KonvaTimelineError, Operation } from "../../utils/operations";
import { getValidTime, InternalTimeRange, TimeRange } from "../../utils/time";

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
   * Comleted Percentage
   */
  completedPercentage?: number;
  /**
   * Task time range
   */
  time: T;
}

type FilteredTasks = Operation<TaskData<InternalTimeRange>>;

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

      if (taskEnd < range.start || taskStart > range.end) {
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
