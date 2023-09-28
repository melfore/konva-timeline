import { KonvaTimelineError, Operation } from "../../utils/operations";
import { TimeRange } from "../../utils/time-range";

export interface TaskData {
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
   * Task time range
   */
  time: TimeRange;
}

type FilteredTasks = Operation<TaskData>;

/**
 * Filters valid tasks to be shown in the chart
 * @param tasks list of tasks as passed to the component
 * @param intervals intervals as passed to the component
 */
export const validateTasks = (tasks: TaskData[], range: TimeRange | null): FilteredTasks => {
  if (!range || !range.start || !range.end) {
    return { items: [], errors: [{ entity: "task", level: "warn", message: "Invalid range" }] };
  }

  if (!tasks || !tasks.length) {
    return { items: [], errors: [{ entity: "task", level: "warn", message: "No data" }] };
  }

  const errors: KonvaTimelineError[] = [];
  const items = tasks.filter(({ id: taskId, time: { start: taskStart, end: taskEnd } }) => {
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
export const filterTasks = (tasks: TaskData[], range: TimeRange | null): TaskData[] => {
  if (!range || !range.start || !range.end || !tasks || !tasks.length) {
    return [];
  }

  return tasks.filter(({ id: taskId, time: { start: taskStart, end: taskEnd } }) => {
    if (taskStart >= taskEnd) {
      return false;
    }

    if (taskEnd < range.start || taskStart > range.end) {
      return false;
    }

    return true;
  });
};
