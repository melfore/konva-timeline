import React, { FC, useCallback, useState } from "react";
import { Layer } from "react-konva";
import { DateTime } from "luxon";

import { useTimelineContext } from "../../../timeline/TimelineContext";
import { KonvaPoint } from "../../../utils/konva";
import { InternalTimeRange } from "../../../utils/time";
import { LINE_OFFSET } from "../../utils/line";
import { getTaskYCoordinate, TASK_HEIGHT_OFFSET } from "../../utils/tasks";
import LineKonva from "../Line";
import TaskLine from "../TaskLine";
import TaskTooltip, { TaskTooltipProps } from "../Tooltip";

interface TasksLayerProps {
  taskTooltip: TaskTooltipProps | null;
  setTaskTooltip: (tooltip: TaskTooltipProps | null) => void;
  create?: boolean;
  onTaskEvent: (value: boolean) => void;
}

/**
 * This component renders a set of tasks as a Konva Layer.
 * Tasks are displayed accordingly to their assigned resource (different vertical / row position) and their timing (different horizontal / column position)
 * `TasksLayer` is also responsible of handling callback for task components offering base implementation for click, leave and over.
 *
 * The playground has a canvas that simulates 1 day of data with 1 hour resolution.
 * Depending on your screen size you might be able to test also the horizontal scrolling behaviour.
 */
const LayerLine: FC<TasksLayerProps> = ({ setTaskTooltip, taskTooltip, create, onTaskEvent }) => {
  const { columnWidth, drawRange, interval, resolution, resources, rowHeight, tasks, toolTip, validLine } =
    useTimelineContext();

  const [workLine, setWorkLine] = useState([""]);
  const { start: intervalStart, end: intervalEnd } = interval;

  const getResourceById = useCallback(
    (resourceId: string) => resources.findIndex(({ id }) => resourceId === id),
    [resources]
  );

  const getTaskById = useCallback((taskId: string) => tasks.find(({ id }) => taskId === id), [tasks]);

  const onTaskLeave = useCallback(() => setTaskTooltip(null), [setTaskTooltip]);

  const onTaskOver = useCallback(
    (taskId: string, point: KonvaPoint) => {
      const task = getTaskById(taskId);
      if (!task) {
        return setTaskTooltip(null);
      }

      const { x, y } = point;
      setTaskTooltip({ task, x, y });
    },
    [getTaskById, setTaskTooltip]
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
    ({ start, end }: InternalTimeRange) => {
      const timeStart = DateTime.fromMillis(start);
      const timeEnd = DateTime.fromMillis(end);
      const widthOffsetInUnit = timeEnd.diff(timeStart).as(resolution.unit);
      return getXCoordinate(widthOffsetInUnit);
    },
    [getXCoordinate, resolution]
  );

  if (!intervalStart || !intervalEnd) {
    return null;
  }

  if (drawRange.end - drawRange.start <= 0) {
    return null;
  }
  return (
    <Layer>
      {validLine &&
        validLine.map((data) => {
          const startResourceIndex = getResourceById(data.startResId);
          if (startResourceIndex < 0 || workLine.includes(data.id)) {
            return null;
          }
          //line
          const yCoordinate = getTaskYCoordinate(startResourceIndex, rowHeight) + (rowHeight * TASK_HEIGHT_OFFSET) / 2;
          const endResourceIndex = getResourceById(data.endResId);
          const endY = getTaskYCoordinate(endResourceIndex, rowHeight) + (rowHeight * TASK_HEIGHT_OFFSET) / 2;
          const startLine = getTaskXCoordinate(data.start);
          const endLine = getTaskXCoordinate(data.end);

          return (
            <LineKonva
              key={`Layer${data.id}`}
              points={[
                startLine,
                yCoordinate,
                startLine + LINE_OFFSET,
                yCoordinate,
                endLine - LINE_OFFSET,
                endY,
                endLine,
                endY,
              ]}
            />
          );
        })}
      {tasks.map((taskData) => {
        const { resourceId, time } = taskData;
        const resourceIndex = getResourceById(resourceId);
        if (resourceIndex < 0) {
          return null;
        }

        const { color: resourceColor, toCompleteColor } = resources[resourceIndex];
        const xCoordinate = getTaskXCoordinate(time.start);
        const yCoordinate = getTaskYCoordinate(resourceIndex, rowHeight);
        const width = getTaskWidth(time);
        if (xCoordinate > drawRange.end || xCoordinate + width < drawRange.start) {
          return null;
        }

        return (
          <TaskLine
            key={`task-${taskData.id}`}
            data={taskData}
            fill={resourceColor}
            fillToComplete={toCompleteColor}
            onLeave={onTaskLeave}
            onOver={onTaskOver}
            x={xCoordinate}
            y={yCoordinate}
            width={width}
            disabled={create}
            onTaskEvent={onTaskEvent}
            workLine={setWorkLine}
          />
        );
      })}
      {toolTip && taskTooltip && <TaskTooltip {...taskTooltip} />}
    </Layer>
  );
};

export default LayerLine;
