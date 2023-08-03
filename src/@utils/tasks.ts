import { Interval } from "luxon";

import { Point } from "./konva";
import { TimeRange, toInterval } from "./time-range";

export interface TaskLayoutData {
  /**
   * Unique identifier of the task
   */
  id: string;
  /**
   * Label of the task
   */
  label: string;
}

export interface TaskData extends TaskLayoutData {
  resourceId: string;
  time: TimeRange;
}

export interface TaskTooltipData extends Point {
  task: TaskData | null;
}

/**
 * Filters out tasks that are not in the given interval
 * @param tasks array of tasks to filter
 * @param interval interval to filter by
 */
export const filterOutOfInterval = (tasks: TaskData[], interval: Interval): TaskData[] =>
  tasks.filter((task) => {
    const taskInterval = toInterval(task.time);
    return !!interval.intersection(taskInterval);
  });
