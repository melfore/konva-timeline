import React, { FC, useCallback, useState } from "react";
import { Layer } from "react-konva";
import { Html } from "react-konva-utils";
import { DateTime } from "luxon";

import { useTimelineContext } from "../../@contexts/Timeline";
import { KonvaPoint } from "../../@utils/konva";
import { TaskTooltipData } from "../../@utils/tasks";
import Task from "../Task";
import TaskTooltip from "../TaskTooltip";

interface TasksLayerProps {}

/**
 * This component renders a set of tasks as a Konva Layer.
 * Tasks are displayed accordingly to their assigned resource (different vertical / row position) and their timing (different horizontal / column position)
 * `TasksLayer` is also responsible of handling callback for task components offering base implementation for click, leave and over.
 *
 * The playground has a canvas that simulates 1 day of data with 1 hour resolution.
 * Depending on your screen size you might be able to test also the horizontal scrolling behaviour.
 */
const TasksLayer: FC<TasksLayerProps> = () => {
  const { drawRange, interval, resolution, resources, tasks, taskTooltipContent } = useTimelineContext();

  const [taskTooltip, setTaskTooltip] = useState<TaskTooltipData | null>(null);

  const getResourceById = useCallback(
    (resourceId: string) => resources.findIndex(({ id }) => resourceId === id),
    [resources]
  );

  const getTaskById = useCallback((taskId: string) => tasks.find(({ id }) => id === taskId), [tasks]);

  const onTaskClick = useCallback(
    (taskId: string, point: KonvaPoint) => {
      const task = getTaskById(taskId);
      if (!task) {
        return;
      }

      // TODO#lb: add real implementation
      alert(`You clicked on task '${task.label}'. Point x: ${point.x}, y: ${point.y}`);
    },
    [getTaskById]
  );

  const onTaskLeave = useCallback(() => setTaskTooltip(null), []);

  const onTaskOver = useCallback(
    (taskId: string, point: KonvaPoint) => {
      const task = getTaskById(taskId);
      if (!task) {
        return setTaskTooltip(null);
      }

      const { x, y } = point;
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
    <Layer>
      {tasks.map(({ id, label, resourceId, time }, index) => {
        const resourceIndex = getResourceById(resourceId);
        if (resourceIndex < 0) {
          return null;
        }

        const { color: resourceColor } = resources[resourceIndex];
        const intervalStart = interval.start;
        const intervalEnd = interval.end;
        if (!intervalStart || !intervalEnd) {
          return null;
        }

        const timeStart = DateTime.fromMillis(time.start);
        const startOffsetInUnit = timeStart.diff(intervalStart).as(resolution.unit);
        const xBegin = (startOffsetInUnit * resolution.columnSize) / resolution.sizeInUnits;
        // console.log("=> startOffset", { startOffsetInUnit, unit: resolution.unit, xBegin });

        const timeEnd = DateTime.fromMillis(time.end);
        const widthOffsetInUnit = timeEnd.diff(timeStart).as(resolution.unit);
        const width = (widthOffsetInUnit * resolution.columnSize) / resolution.sizeInUnits;
        // console.log("=> widthOffset", { widthOffsetInUnit, unit: resolution.unit, width });
        // console.log("====================================");

        // console.log({ xBegin, width });

        if (xBegin > drawRange.end || xBegin + width < drawRange.start) {
          return null;
        }

        return (
          <Task
            key={`task-${index}`}
            id={id}
            fill={resourceColor}
            label={label}
            onClick={onTaskClick}
            onLeave={onTaskLeave}
            onOver={onTaskOver}
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

export default TasksLayer;
