import { Resource } from "../../resources/utils/resources";
import { TaskData } from "../../tasks/utils/tasks";
import { InternalTimeRange } from "../time";

interface StoryDataInput {
  resourcesCount: number;
  tasksCount: number;
  timeRangeInDays: number;
  averageTaskDurationInMinutes: number;
}

export interface StoryData {
  resources: Resource[];
  tasks: TaskData[];
  range: InternalTimeRange;
}

export const HOUR_IN_MILLISECONDS = 1000 * 60 * 60;

export const TIME_RANGE_START_DATE = new Date("2019-12-31T23:00:00.000Z");

const getRandomColor = () => {
  let color = "";
  while (color.length !== 6) {
    color = Math.floor(Math.random() * 16777215).toString(16);
  }

  return color;
};

const generateResources = (count: number): Resource[] => {
  const resources: Resource[] = [];

  for (let i = 1; i <= count; i++) {
    resources.push({
      id: `${i}`,
      label: `Resource #${i}`,
      color: `#${getRandomColor()}`,
    });
  }

  return resources;
};

const generateTasks = (
  count: number,
  avgDurationInMinutes: number,
  resourcesCount: number
): TaskData<InternalTimeRange>[] => {
  const tasks: TaskData<InternalTimeRange>[] = [];

  for (let i = 1; i <= count; i++) {
    const resourceId = `${Math.floor(Math.random() * resourcesCount) + 1}`;
    const lastTaskForResource = tasks.reverse().find((task) => task.resourceId === resourceId);

    let start = TIME_RANGE_START_DATE.valueOf();
    if (lastTaskForResource) {
      start =
        lastTaskForResource.time.end +
        Math.floor(avgDurationInMinutes / 2) +
        Math.floor(Math.random() * (avgDurationInMinutes * 2)) * 60 * 1000;
    }

    const end = start + Math.floor(Math.random() * (avgDurationInMinutes * 2)) * 60 * 1000;

    tasks.push({
      id: `${i}`,
      resourceId,
      label: `Task #${i}`,
      time: { start, end },
    });
  }

  return tasks;
};

const generateTimeRange = (durationInDays: number): InternalTimeRange => {
  const start = TIME_RANGE_START_DATE.valueOf();
  const end = TIME_RANGE_START_DATE.setDate(TIME_RANGE_START_DATE.getDate() + durationInDays).valueOf();

  return { start, end };
};

export const generateStoryData = ({
  averageTaskDurationInMinutes,
  resourcesCount,
  tasksCount,
  timeRangeInDays,
}: StoryDataInput): StoryData => {
  const resources = generateResources(resourcesCount);
  const tasks = generateTasks(tasksCount, averageTaskDurationInMinutes, resourcesCount);
  const range = generateTimeRange(timeRangeInDays);

  return { resources, tasks, range };
};
