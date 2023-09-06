import React, { memo, useCallback, useMemo, useState } from "react";
import { Rect } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

import { useTimelineContext } from "../../@contexts/Timeline";
import { KonvaDrawable, KonvaPoint } from "../../@utils/konva";
import { RESOURCE_HEADER_HEIGHT, RESOURCE_HEADER_OFFSET } from "../../@utils/resources";
import { TaskData } from "../../@utils/tasks";

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
    interval,
    onTaskClick,
    onTaskDrag,
    resolution: { sizeInUnits, unit },
    resources,
  } = useTimelineContext();

  const { id: taskId } = data;

  const [dragging, setDragging] = useState(false);

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
      const point = getBoundedCoordinates(x, resourceIndex);
      e.target.setPosition(point);
      onOver(taskId, point);
    },
    [getBoundedCoordinates, getDragPoint, getResourceIndexFromYCoordinate, onOver, taskId]
  );

  const onDragEnd = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      const { x, y } = getDragPoint(e);
      const timeOffset = (x * sizeInUnits) / columnWidth;
      const newMillis = interval.start!.plus({ [unit]: timeOffset }).toMillis();
      const resourceIndex = getResourceIndexFromYCoordinate(y);
      const resourceId = `${resourceIndex}`;
      console.log(`New Start: ${x} /  ${x} / ${timeOffset} / ${newMillis}`);
      setDragging(false);
      onTaskDrag && onTaskDrag({ ...data, resourceId, time: { end: newMillis + width, start: newMillis } });
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

  return (
    <Rect
      id={taskId}
      cornerRadius={TASK_BORDER_RADIUS}
      draggable={!!onTaskDrag}
      fill={fill}
      height={TASK_HEIGHT}
      onClick={onClick}
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      onMouseLeave={onTaskLeave}
      onMouseMove={onTaskOver}
      onMouseOver={onTaskOver}
      opacity={opacity}
      stroke={stroke}
      x={x}
      y={y}
      width={width}
    />
  );
};

export const TaskDocs = Task;

export default memo(Task);
