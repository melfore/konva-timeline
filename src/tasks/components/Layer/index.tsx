import React, { FC, useCallback, useState } from "react";
import { Layer } from "react-konva";
import { DateTime } from "luxon";

import { useTimelineContext } from "../../../timeline/TimelineContext";
import { KonvaPoint } from "../../../utils/konva";
import { TimeRange } from "../../../utils/time-range";
import Task from "../Task";
import TaskTooltip, { TaskTooltipProps } from "../Tooltip";

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
  const {
    columnWidth,
    drawRange,
    interval: { start: intervalStart, end: intervalEnd },
    resolution,
    resources,
    rowHeight,
    tasks,
  } = useTimelineContext();

  const [taskTooltip, setTaskTooltip] = useState<TaskTooltipProps | null>(null);

  const getResourceById = useCallback(
    (resourceId: string) => resources.findIndex(({ id }) => resourceId === id),
    [resources]
  );

  const getTaskById = useCallback((taskId: string) => tasks.find(({ id }) => taskId === id), [tasks]);

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

  const getXCoordinate = useCallback(
    (offset: number) => (offset * columnWidth) / resolution.sizeInUnits,
    [columnWidth, resolution.sizeInUnits]
  );

  const getTaskXCoordinate = useCallback(
    (startTime: number) => {
      const timeStart = DateTime.fromMillis(startTime);
      const startOffsetInUnit = timeStart.diff(intervalStart!).as(resolution.unit);
      return getXCoordinate(startOffsetInUnit);
    },
    [getXCoordinate, intervalStart, resolution.unit]
  );

  const getTaskWidth = useCallback(
    ({ start, end }: TimeRange) => {
      const timeStart = DateTime.fromMillis(start);
      const timeEnd = DateTime.fromMillis(end);
      const widthOffsetInUnit = timeEnd.diff(timeStart).as(resolution.unit);
      return getXCoordinate(widthOffsetInUnit);
    },
    [getXCoordinate, resolution.unit]
  );

  const getContrastTextColor = useCallback((hexcolor: string) => {
    var r = parseInt(hexcolor.substring(1, 3), 16);
    var g = parseInt(hexcolor.substring(3, 5), 16);
    var b = parseInt(hexcolor.substring(5, 7), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
  }, []);

  if (!intervalStart || !intervalEnd) {
    return null;
  }

  if (drawRange.end - drawRange.start <= 0) {
    return null;
  }

  return (
    <Layer>
      {tasks.map((taskData, index) => {
        const { resourceId, time } = taskData;
        const resourceIndex = getResourceById(resourceId);
        if (resourceIndex < 0) {
          return null;
        }

        const { color: resourceColor } = resources[resourceIndex];
        const xCoordinate = getTaskXCoordinate(time.start);
        const yCoordinate = rowHeight * resourceIndex + rowHeight * 0.1;
        const width = getTaskWidth(time);
        if (xCoordinate > drawRange.end || xCoordinate + width < drawRange.start) {
          return null;
        }

        const stroke = getContrastTextColor(resourceColor);

        return (
          <Task
            key={`task-${taskData.id}`}
            data={taskData}
            fill={resourceColor}
            onLeave={onTaskLeave}
            onOver={onTaskOver}
            stroke={stroke}
            x={xCoordinate}
            y={yCoordinate}
            width={width}
          />
        );
      })}
      {taskTooltip && <TaskTooltip {...taskTooltip} />}
    </Layer>
  );
};

export default TasksLayer;
