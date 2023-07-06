import React, { FC, useCallback, useState } from "react";
import { Layer } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

import { Resource } from "../../@utils/resources";
import { TaskData, TaskTooltipData } from "../../@utils/tasks";
import { TimeRange } from "../../@utils/time-range";
import { ResolutionData } from "../../@utils/time-resolution";
import Task from "../Task";
import TaskTooltip from "../TaskTooltip";

interface TasksProps {
  resolution: ResolutionData;
  resources: Resource[];
  tasks: TaskData[];
  timeRange: TimeRange;
}

const Tasks: FC<TasksProps> = ({ resolution, resources, tasks, timeRange }) => {
  const [taskTooltip, setTaskTooltip] = useState<TaskTooltipData | null>(null);

  const getResourceById = useCallback(
    (resourceId: string) => resources.findIndex(({ id }) => resourceId === id),
    [resources]
  );

  const getTaskById = useCallback((taskId: string) => tasks.find(({ id }) => id === taskId), [tasks]);

  const onTaskExit = useCallback(() => setTaskTooltip(null), []);

  const onTaskOver = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      const taskShape = e.target;
      const taskStage = taskShape.getStage();
      const task = getTaskById(taskShape.id());
      if (!taskStage || !task) {
        return setTaskTooltip(null);
      }

      const mousePosition = taskStage.getPointerPosition();
      if (!mousePosition) {
        return setTaskTooltip(null);
      }

      const { x, y } = mousePosition;
      setTaskTooltip({ task, x, y });
    },
    [getTaskById]
  );

  return (
    <Layer onMouseOver={onTaskOver} onMouseMove={onTaskOver} onMouseLeave={onTaskExit}>
      {tasks.map(({ id, label, resourceId, time }, index) => {
        const resourceIndex = getResourceById(resourceId);
        if (resourceIndex < 0) {
          return null;
        }

        const { color: resourceColor } = resources[resourceIndex];
        const xBegin = ((time.start - timeRange.start) / (1000 * 60 * 60 * resolution.size)) * resolution.columnSize;
        const width = ((time.end - time.start) / (1000 * 60 * 60 * resolution.size)) * resolution.columnSize;
        return (
          <Task
            key={`task-${index}`}
            id={id}
            color={resourceColor}
            label={label}
            x={xBegin}
            y={50 * (resourceIndex + 1) + 5}
            width={width}
          />
        );
      })}
      {taskTooltip && <TaskTooltip {...taskTooltip} />}
    </Layer>
  );
};

export default Tasks;
