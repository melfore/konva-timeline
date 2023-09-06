import React, { FC, useCallback, useState } from "react";
import { Layer } from "react-konva";
import { DateTime } from "luxon";

import { useTimelineContext } from "../../@contexts/Timeline";
import { KonvaPoint } from "../../@utils/konva";
import { RESOURCE_HEADER_HEIGHT } from "../../@utils/resources";
import { TimeRange } from "../../@utils/time-range";
import Task from "../Task";
import TaskTooltip, { TaskTooltipProps } from "../TaskTooltip";

interface TasksLayerProps {}

const TASK_PLACEMENT_OFFSET = 5;

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

  if (!intervalStart || !intervalEnd) {
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
        const yCoordinate = RESOURCE_HEADER_HEIGHT * resourceIndex + TASK_PLACEMENT_OFFSET;
        const width = getTaskWidth(time);
        if (xCoordinate > drawRange.end || xCoordinate + width < drawRange.start) {
          return null;
        }

        return (
          <Task
            key={`task-${index}`}
            data={taskData}
            fill={resourceColor}
            onLeave={onTaskLeave}
            onOver={onTaskOver}
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
