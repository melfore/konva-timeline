import { Interval } from "luxon";

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
 * @param interval interval as passed to the component
 */
export const filterTasks = (tasks: TaskData[], interval: Interval): FilteredTasks => {
  if (!tasks || !tasks.length) {
    return { items: [], errors: [{ entity: "task", level: "warn", message: "No data" }] };
  }

  const { end: intervalEnd, start: intervalStart } = interval;
  if (!intervalEnd || !intervalStart) {
    return { items: [], errors: [{ entity: "interval", level: "warn", message: "Incomplete" }] };
  }

  const errors: KonvaTimelineError[] = [];
  const items = tasks.filter(({ id: taskId, time: { start: taskStart, end: taskEnd } }) => {
    if (taskStart >= taskEnd) {
      errors.push({ entity: "task", level: "error", message: "Invalid time", refId: taskId });
      return false;
    }

    if (taskEnd < intervalStart.toMillis() || taskStart > intervalEnd.toMillis()) {
      errors.push({ entity: "task", level: "warn", message: "Outside interval", refId: taskId });
      return false;
    }

    return true;
  });

  return { items, errors };
};
