import React, { memo, useCallback, useMemo, useState } from "react";
import { Group, Rect } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { DateTime, Duration } from "luxon";

import { useTimelineContext } from "../../@contexts/Timeline";
import { KonvaDrawable, KonvaPoint } from "../../@utils/konva";
import { logDebug } from "../../@utils/logger";
import { RESOURCE_HEADER_HEIGHT, RESOURCE_HEADER_OFFSET } from "../../@utils/resources";
import { TaskData } from "../../@utils/tasks";
import { KonvaText } from "../@konva";

type TaskMouseEventHandler = (taskId: string, point: KonvaPoint) => void;

type TaskProps = KonvaDrawable &
  KonvaPoint & {
    /**
     * Task data (id, label, resourceId, time)
     */
    data: TaskData;
    /**
     * On mouse leave event handler
     */
    onLeave: TaskMouseEventHandler;
    /**
     * On mouse over event handler
     */
    onOver: TaskMouseEventHandler;
    /**
     * The width of the task
     */
    width: number;
  };

const TASK_DEFAULT_FILL = "transparent";
const TASK_DEFAULT_STROKE = "black";

const TASK_BORDER_RADIUS = 4;
const TASK_HEIGHT = 40;

/**
 * This component renders a simple task as a rectangle inside a canvas.
 * Each task is rendered by `TasksLayer` component, with a loop on each task provided to `KonvaTimeline`.
 * `TasksLayer` is also responsible of handling callback for task components.
 *
 * Supported events (click, leave, over) respond with callbacks of type:
 * <br />
 *  `(taskId: string, point: KonvaPoint) => void`
 *
 * The playground has a simulated canvas with height: 200px and width: 100%
 */
const Task = ({
  data,
  fill = TASK_DEFAULT_FILL,
  onLeave,
  onOver,
  stroke = TASK_DEFAULT_STROKE,
  x,
  y,
  width,
}: TaskProps) => {
  const {
    columnWidth,
    displayTasksLabel,
    dragResolution: { sizeInUnits: dragSizeInUnits, unit: dragUnit },
    interval,
    onTaskClick,
    onTaskDrag,
    resolution: { sizeInUnits, unit },
    resources,
  } = useTimelineContext();

  const { id: taskId } = data;

  const [dragging, setDragging] = useState(false);

  const dragSnapInPX = useMemo(() => {
    const dragSnapInResolutionUnit = Duration.fromObject({ [dragUnit]: dragSizeInUnits }).as(unit);
    return Math.floor(columnWidth * dragSnapInResolutionUnit);
  }, [columnWidth, dragUnit, dragSizeInUnits, unit]);

  const getBoundedCoordinates = useCallback((xCoordinate: number, resourceIndex: number): KonvaPoint => {
    const boundedX = xCoordinate < 0 ? 0 : xCoordinate;
    const boundedY = resourceIndex * RESOURCE_HEADER_HEIGHT + RESOURCE_HEADER_OFFSET;

    return { x: boundedX, y: boundedY };
  }, []);

  const getDragPoint = useCallback((e: KonvaEventObject<DragEvent>): KonvaPoint => {
    const { target } = e;
    const dragX = target.x();
    const dragY = target.y();

    return { x: dragX, y: dragY };
  }, []);

  const getResourceIndexFromYCoordinate = useCallback(
    (yCoordinate: number) => {
      const rawIndex = Math.floor(yCoordinate / RESOURCE_HEADER_HEIGHT);
      if (rawIndex < 1) {
        return 1;
      }

      const lastResourceIndex = resources.length - 1;
      if (rawIndex > lastResourceIndex) {
        return lastResourceIndex;
      }

      return rawIndex;
    },
    [resources]
  );

  const onTaskMouseEvent = useCallback(
    (e: KonvaEventObject<MouseEvent>, callback: TaskMouseEventHandler) => {
      const stage = e.target.getStage();
      if (!stage) {
        return;
      }

      const point = stage.getPointerPosition();
      if (!point) {
        return;
      }

      callback(taskId, point);
    },
    [taskId]
  );

  const onClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => onTaskClick && onTaskClick(data),
    [data, onTaskClick]
  );

  const onTaskLeave = useCallback(
    (e: KonvaEventObject<MouseEvent>) => onTaskMouseEvent(e, onLeave),
    [onLeave, onTaskMouseEvent]
  );

  const onTaskOver = useCallback(
    (e: KonvaEventObject<MouseEvent>) => onTaskMouseEvent(e, onOver),
    [onOver, onTaskMouseEvent]
  );

  const onDragStart = useCallback((e: KonvaEventObject<DragEvent>) => setDragging(true), []);

  const onDragMove = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      const { x, y } = getDragPoint(e);
      const resourceIndex = getResourceIndexFromYCoordinate(y);
      const dragFinalX = Math.ceil(x / dragSnapInPX) * dragSnapInPX;
      const point = getBoundedCoordinates(dragFinalX, resourceIndex);
      e.target.setPosition(point);
      onOver(taskId, point);
    },
    [dragSnapInPX, getBoundedCoordinates, getDragPoint, getResourceIndexFromYCoordinate, onOver, taskId]
  );

  const onDragEnd = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      const { x, y } = getDragPoint(e);
      const timeOffset = (x * sizeInUnits) / columnWidth;
      const newStartInMillis = interval.start!.plus({ [unit]: timeOffset }).toMillis();
      const newEndInMillis =
        newStartInMillis + Duration.fromObject({ [unit]: (width * sizeInUnits) / columnWidth }).toMillis();
      const resourceIndex = getResourceIndexFromYCoordinate(y);
      const resourceId = `${resourceIndex}`;
      logDebug("Task", `New Start: ${x} /  ${x} / ${timeOffset} / ${newStartInMillis}`);
      logDebug("Task", `StartTime: ${DateTime.fromMillis(newStartInMillis).toISO()}`);
      logDebug("Task", `End: ${DateTime.fromMillis(newEndInMillis).toISO()}`);
      setDragging(false);
      onTaskDrag &&
        onTaskDrag({
          ...data,
          resourceId,
          time: {
            end: newEndInMillis,
            start: newStartInMillis,
          },
        });
    },
    [
      columnWidth,
      data,
      interval.start,
      onTaskDrag,
      getDragPoint,
      getResourceIndexFromYCoordinate,
      sizeInUnits,
      unit,
      width,
    ]
  );

  const opacity = useMemo(() => (dragging ? 0.5 : 1), [dragging]);

  const textSizes = useMemo(() => TASK_HEIGHT / 3, []);

  return (
    <Group
      x={x}
      y={y}
      draggable={!!onTaskDrag}
      onClick={onClick}
      onDragEnd={onDragEnd}
      onDragMove={onDragMove}
      onDragStart={onDragStart}
      onMouseLeave={onTaskLeave}
      onMouseMove={onTaskOver}
      onMouseOver={onTaskOver}
    >
      <Rect
        id={taskId}
        cornerRadius={TASK_BORDER_RADIUS}
        fill={fill}
        height={TASK_HEIGHT}
        opacity={opacity}
        stroke={stroke}
        width={width}
      />
      {displayTasksLabel && (
        <KonvaText
          ellipsis
          fontSize={textSizes}
          text={data.label}
          width={width - textSizes * 2}
          wrap="none"
          x={textSizes}
          y={textSizes}
        />
      )}
    </Group>
  );
};

export const TaskDocs = Task;

export default memo(Task);
