import { DateTime, Interval } from "luxon";

import { TimeRange } from "../..";
import { generateStoryData } from "../../KonvaTimeline/stories-data";

import { filterTasks } from "./tasks";

const range: TimeRange = { start: 1672527600000, end: 1672614000000 };

const interval = Interval.fromDateTimes(DateTime.fromMillis(range.start), DateTime.fromMillis(range.end));

describe("filterTasks", () => {
  it("empty", () => {
    const tasks = filterTasks([], interval);
    expect(tasks).toEqual({
      errors: [{ entity: "task", level: "warn", message: "No data" }],
      items: [],
    });
  });

  it("task invalid", () => {
    const tasks = filterTasks(
      [{ id: "1", label: "Task #1", resourceId: "1", time: { start: 1672578000000, end: 1672563600000 } }],
      interval
    );

    expect(tasks).toEqual({
      errors: [{ entity: "task", level: "error", message: "Invalid time", refId: "1" }],
      items: [],
    });
  });

  it("task out of interval", () => {
    const tasks = filterTasks(
      [{ id: "1", label: "Task #1", resourceId: "1", time: { start: 1672470000000, end: 1672477200000 } }],
      interval
    );

    expect(tasks).toEqual({
      errors: [{ entity: "task", level: "warn", message: "Outside interval", refId: "1" }],
      items: [],
    });
  });

  it("valid", () => {
    const tasks = filterTasks(
      [{ id: "1", label: "Task #1", resourceId: "1", time: { start: 1672556400000, end: 1672578000000 } }],
      interval
    );

    expect(tasks).toEqual({
      errors: [],
      items: [{ id: "1", label: "Task #1", resourceId: "1", time: { start: 1672556400000, end: 1672578000000 } }],
    });
  });

  it("mixed", () => {
    const tasks = filterTasks(
      [
        { id: "1", label: "Task #1", resourceId: "1", time: { start: 1672556400000, end: 1672578000000 } },
        { id: "2", label: "Task #2", resourceId: "1", time: { start: 1672470000000, end: 1672477200000 } },
        { id: "3", label: "Task #3", resourceId: "1", time: { start: 1672578000000, end: 1672563600000 } },
      ],
      interval
    );

    expect(tasks).toEqual({
      errors: [
        { entity: "task", level: "warn", message: "Outside interval", refId: "2" },
        { entity: "task", level: "error", message: "Invalid time", refId: "3" },
      ],
      items: [{ id: "1", label: "Task #1", resourceId: "1", time: { start: 1672556400000, end: 1672578000000 } }],
    });
  });

  it("bulk - monthly", () => {
    const { range, tasks: allTasks } = generateStoryData({
      averageTaskDurationInMinutes: 10,
      resourcesCount: 16,
      tasksCount: 100000,
      timeRangeInDays: 60,
    });

    const start = new Date().valueOf();
    filterTasks(allTasks, Interval.fromDateTimes(DateTime.fromMillis(range.start), DateTime.fromMillis(range.end)));
    const end = new Date().valueOf();
    const operationLength = end - start;
    console.log(`Filter tasks: ${operationLength} ms`);

    expect(operationLength).toBeLessThan(100);
  });
});
