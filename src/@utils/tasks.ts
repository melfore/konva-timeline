import { Interval } from "luxon";

import { TimeRange, toInterval } from "./time-range";

export interface TaskLayoutData {
  id: string;
  label: string;
}

export interface TaskData extends TaskLayoutData {
  resourceId: string;
  time: TimeRange;
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
