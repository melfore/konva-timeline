import React, { FC, Fragment, useCallback } from "react";

import { Category, TaskData, TimeRange } from "../../@utils/timeline-utils";
import { ResolutionSetup } from "../Timeline";

import Task from "./components/Task";

interface TasksProps {
  categories: Category[];
  resolution: ResolutionSetup;
  tasks: TaskData[];
  timeRange: TimeRange;
}

const Tasks: FC<TasksProps> = ({ categories, resolution, tasks, timeRange }) => {
  const getCategoryById = useCallback(
    (categoryId: string) => categories.findIndex(({ id }) => categoryId === id),
    [categories]
  );

  return (
    <Fragment>
      {tasks.map(({ categoryId, label, time }, index) => {
        const categoryIndex = getCategoryById(categoryId);
        if (categoryIndex < 0) {
          return null;
        }

        const category = categories[categoryIndex];
        const xBegin = ((time.start - timeRange.start) / (1000 * 60 * 60 * resolution.size)) * resolution.columnSize;
        const width = ((time.end - time.start) / (1000 * 60 * 60 * resolution.size)) * resolution.columnSize;
        return (
          <Task
            key={`task-${index}`}
            color={category.color}
            label={label}
            x={xBegin}
            y={50 * (categoryIndex + 1) + 5}
            width={width}
          />
        );
      })}
    </Fragment>
  );
};

export default Tasks;
