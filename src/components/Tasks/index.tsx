import React, { FC, Fragment, useCallback } from "react";

import { Category } from "../Grid";
import { ResolutionSetup, TimeRange } from "../Timeline";

import Task, { TaskData } from "./components/Task";

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
      {tasks.map(({ categoryId, label, time }) => {
        const categoryIndex = getCategoryById(categoryId);
        if (categoryIndex < 0) {
          return null;
        }

        const category = categories[categoryIndex];
        const xBegin = ((time.begin - timeRange.begin) / (1000 * 60 * 60 * resolution.size)) * resolution.columnSize;
        const width = ((time.end - time.begin) / (1000 * 60 * 60 * resolution.size)) * resolution.columnSize;
        return <Task color={category.color} label={label} x={xBegin} y={50 * (categoryIndex + 1) + 5} width={width} />;
      })}
    </Fragment>
  );
};

export default Tasks;
