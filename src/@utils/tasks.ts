import { Interval } from "luxon";

import { KonvaPoint } from "./konva";
import { TimeRange, toInterval } from "./time-range";

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

export interface TaskTooltipData extends KonvaPoint {
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
