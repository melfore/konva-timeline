import { TimeRange } from "../..";
import { generateStoryData } from "../../KonvaTimeline/stories-data";

import { validateTasks } from "./tasks";

// From: Sunday, 1 January 2023 00:00:00 GMT+01:00
// To: Monday, 2 January 2023 00:00:00 GMT+01:00
const range: TimeRange = { start: 1672527600000, end: 1672614000000 };

describe("validateTasks", () => {
  it("empty", () => {
    const tasks = validateTasks([], range);
    expect(tasks).toEqual({
      errors: [{ entity: "task", level: "warn", message: "No data" }],
      items: [],
    });
  });

  it("task invalid", () => {
    const tasks = validateTasks(
      [{ id: "1", label: "Task #1", resourceId: "1", time: { start: 1672578000000, end: 1672563600000 } }],
      range
    );

    expect(tasks).toEqual({
      errors: [{ entity: "task", level: "error", message: "Invalid time", refId: "1" }],
      items: [],
    });
  });

  it("task out of interval", () => {
    const tasks = validateTasks(
      [{ id: "1", label: "Task #1", resourceId: "1", time: { start: 1672470000000, end: 1672477200000 } }],
      range
    );

    expect(tasks).toEqual({
      errors: [{ entity: "task", level: "warn", message: "Outside range", refId: "1" }],
      items: [],
    });
  });

  it("valid", () => {
    const tasks = validateTasks(
      [{ id: "1", label: "Task #1", resourceId: "1", time: { start: 1672556400000, end: 1672578000000 } }],
      range
    );

    expect(tasks).toEqual({
      errors: [],
      items: [{ id: "1", label: "Task #1", resourceId: "1", time: { start: 1672556400000, end: 1672578000000 } }],
    });
  });

  it("mixed", () => {
    const tasks = validateTasks(
      [
        { id: "1", label: "Task #1", resourceId: "1", time: { start: 1672556400000, end: 1672578000000 } },
        { id: "2", label: "Task #2", resourceId: "1", time: { start: 1672470000000, end: 1672477200000 } },
        { id: "3", label: "Task #3", resourceId: "1", time: { start: 1672578000000, end: 1672563600000 } },
      ],
      range
    );

    expect(tasks).toEqual({
      errors: [
        { entity: "task", level: "warn", message: "Outside range", refId: "2" },
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
    validateTasks(allTasks, range);
    const end = new Date().valueOf();
    const operationLength = end - start;
    console.log(`Filter tasks: ${operationLength} ms`);

    expect(operationLength).toBeLessThan(100);
  });
});
