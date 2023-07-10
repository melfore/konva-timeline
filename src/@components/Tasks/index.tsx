import React, { FC, useCallback, useState } from "react";
import { Layer } from "react-konva";
import { Html } from "react-konva-utils";
import { KonvaEventObject } from "konva/lib/Node";

import { useTimelineContext } from "../../@contexts/Timeline";
import { TaskTooltipData } from "../../@utils/tasks";
import { TimeRange } from "../../@utils/time-range";
import Task from "../Task";
import TaskTooltip from "../TaskTooltip";

interface TasksProps {
  timeRange: TimeRange;
}

const Tasks: FC<TasksProps> = ({ timeRange }) => {
  const { resolution, resources, tasks, taskTooltipContent } = useTimelineContext();

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

  const renderTaskTooltipContent = useCallback(
    (taskTooltip: TaskTooltipData | null) => {
      if (!taskTooltip) {
        return null;
      }

      return taskTooltipContent ? (
        <Html
          transform={false}
          divProps={{
            style: {
              border: "1px solid black",
              backgroundColor: "white",
              padding: "16px",
              position: "fixed",
              top: 200,
              left: 200,
              zIndex: 100,
            },
          }}
        >
          {taskTooltipContent(taskTooltip.task)}
        </Html>
      ) : (
        <TaskTooltip {...taskTooltip} />
      );
    },
    [taskTooltipContent]
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
            y={50 * resourceIndex + 5}
            width={width}
          />
        );
      })}
      {renderTaskTooltipContent(taskTooltip)}
    </Layer>
  );
};

export default Tasks;
