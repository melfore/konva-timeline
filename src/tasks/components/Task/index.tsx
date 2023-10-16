import React, { memo, useCallback, useMemo, useState } from "react";
import { Group, Rect, useStrictMode as enableStrictMode } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { DateTime, Duration } from "luxon";

import { KonvaText } from "../../../@konva";
import { findResourceByCoordinate, findResourceIndexByCoordinate } from "../../../resources/utils/resources";
import { useTimelineContext } from "../../../timeline/TimelineContext";
import { KonvaDrawable, KonvaPoint } from "../../../utils/konva";
import { logDebug } from "../../../utils/logger";
import { getContrastColor } from "../../../utils/theme";
import { getTaskYCoordinate, TaskData } from "../../utils/tasks";
import TaskResizeHandler from "../TaskResizeHandler";

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

type TaskDimensions = {
  row: number;
  width: number;
  x: number;
  y: number;
};

const TASK_DEFAULT_FILL = "#FFFFFF";
const TASK_DEFAULT_STROKE = "#000000";
const TASK_DEFAULT_STROKE_WIDTH = 1;

const TASK_BORDER_RADIUS = 4;

enableStrictMode(true);

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
const Task = ({ data, fill = TASK_DEFAULT_FILL, onLeave, onOver, x, y, width }: TaskProps) => {
  const {
    columnWidth,
    displayTasksLabel,
    dragResolution: { sizeInUnits: dragSizeInUnits, unit: dragUnit },
    enableDrag,
    enableResize,
    interval,
    onTaskClick,
    onTaskChange,
    resolution: { sizeInUnits, unit },
    resources,
    rowHeight,
  } = useTimelineContext();

  const { id: taskId } = data;

  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);

  const initialTaskDimensions = useMemo((): TaskDimensions => {
    const row = findResourceIndexByCoordinate(y, rowHeight, resources);
    return { row, width, x, y };
  }, [resources, rowHeight, width, x, y]);

  const [taskDimensions, setTaskDimensions] = useState(initialTaskDimensions);

  const dragSnapInPX = useMemo(() => {
    const resolutionInSnapUnit = Duration.fromObject({ [unit]: sizeInUnits }).as(dragUnit);
    const dragSnapInResUnit = dragSizeInUnits / resolutionInSnapUnit;
    const dragSnapInPx = Math.floor(dragSnapInResUnit * columnWidth);
    if (!dragSnapInPx || isNaN(dragSnapInPx)) {
      return 1;
    }

    return dragSnapInPx;
  }, [columnWidth, dragUnit, dragSizeInUnits, sizeInUnits, unit]);

  const getDragPoint = useCallback((e: KonvaEventObject<DragEvent>): KonvaPoint => {
    const { target } = e;
    const dragX = target.x();
    const dragY = target.y();

    return { x: dragX, y: dragY };
  }, []);

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
    (e: KonvaEventObject<MouseEvent>) => {
      e.cancelBubble = true;
      if (resizing) {
        return;
      }

      const stage = e.target.getStage();
      if (!stage) {
        return;
      }

      if (enableDrag) {
        stage.container().style.cursor = "default";
      }

      onTaskMouseEvent(e, onLeave);
    },
    [enableDrag, onLeave, onTaskMouseEvent, resizing]
  );

  const onTaskOver = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      e.cancelBubble = true;
      if (resizing) {
        return;
      }

      const stage = e.target.getStage();
      if (!stage) {
        return;
      }

      if (enableDrag) {
        stage.container().style.cursor = "move";
      }

      onTaskMouseEvent(e, onOver);
    },
    [enableDrag, onOver, onTaskMouseEvent, resizing]
  );

  const onDragStart = useCallback((e: KonvaEventObject<DragEvent>) => {
    console.log("=> onDragStart", e.target);
    setDragging(true);
  }, []);

  const onDragMove = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      // e.cancelBubble = true;
      console.log("=> onDragMove", e.target);
      const { x, y } = getDragPoint(e);
      const dragFinalX = Math.ceil(x / dragSnapInPX) * dragSnapInPX;
      const xCoordinate = dragFinalX < 0 ? 0 : dragFinalX;
      const resourceIndex = findResourceIndexByCoordinate(y, rowHeight, resources);
      const yCoordinate = getTaskYCoordinate(resourceIndex, rowHeight);
      const point = { x: xCoordinate, y: yCoordinate };

      setTaskDimensions((dimensions) => ({ ...dimensions, ...point }));
      onOver(taskId, point);
    },
    [dragSnapInPX, getDragPoint, onOver, resources, rowHeight, taskId]
  );

  const onDragEnd = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      // e.cancelBubble = true;
      console.log("=> onDragEnd", e.target);
      const { x, y } = getDragPoint(e);
      const timeOffset = (x * sizeInUnits) / columnWidth;
      const newStartInMillis = interval.start!.plus({ [unit]: timeOffset }).toMillis();
      const newEndInMillis =
        newStartInMillis + Duration.fromObject({ [unit]: (width * sizeInUnits) / columnWidth }).toMillis();
      const resource = findResourceByCoordinate(y, rowHeight, resources);
      logDebug("Task", `New Start: ${x} /  ${x} / ${timeOffset} / ${newStartInMillis}`);
      logDebug("Task", `StartTime: ${DateTime.fromMillis(newStartInMillis).toISO()}`);
      logDebug("Task", `End: ${DateTime.fromMillis(newEndInMillis).toISO()}`);
      setDragging(false);
      onTaskChange &&
        onTaskChange({
          ...data,
          resourceId: resource.id,
          time: {
            end: newEndInMillis,
            start: newStartInMillis,
          },
        });
    },
    [columnWidth, data, interval.start, onTaskChange, getDragPoint, resources, rowHeight, sizeInUnits, unit, width]
  );

  const opacity = useMemo(() => (dragging || resizing ? 0.5 : 1), [dragging, resizing]);

  const taskHeight = useMemo(() => rowHeight * 0.8, [rowHeight]);

  const textOffsets = useMemo(() => taskHeight / 3, [taskHeight]);

  const textSize = useMemo(() => taskHeight / 2.5, [taskHeight]);

  const textStroke = useMemo(() => getContrastColor(fill), [fill]);

  const textWidth = useMemo(() => taskDimensions.width - textOffsets * 2, [taskDimensions, textOffsets]);

  const onResizeStart = useCallback((e: KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;
    console.log("=> onResizeStart", e.target);
    setResizing(true);
  }, []);

  const onResizeMove = useCallback(
    (e: KonvaEventObject<DragEvent>, handler: "lx" | "rx") => {
      e.cancelBubble = true;

      const { x: dragX } = getDragPoint(e);

      setTaskDimensions((taskDimensions) => {
        const { x: taskX, width: taskWidth } = taskDimensions;
        const handlerX = taskX + dragX;
        const taskEndX = taskX + taskWidth;

        switch (handler) {
          case "rx":
            if (handlerX <= taskX + TASK_BORDER_RADIUS) {
              console.log("=> onResizeMove: abort x lower than task start");
              return { ...taskDimensions };
            }

            return { ...taskDimensions, width: handlerX - taskX };
          case "lx":
            if (handlerX >= taskEndX - TASK_BORDER_RADIUS) {
              console.log("=> onResizeMove: abort x higher than task end");
              return { ...taskDimensions };
            }

            return { ...taskDimensions, x: handlerX, width: taskEndX - handlerX };
        }
      });
    },
    [getDragPoint]
  );

  const onResizeEnd = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      e.cancelBubble = true;
      console.log("=> onResizeEnd", e.target);
      const { x, width } = taskDimensions;
      const timeOffset = (x * sizeInUnits) / columnWidth;
      const newStartInMillis = interval.start!.plus({ [unit]: timeOffset }).toMillis();
      const newEndInMillis =
        newStartInMillis + Duration.fromObject({ [unit]: (width * sizeInUnits) / columnWidth }).toMillis();
      setResizing(false);
      onTaskChange &&
        onTaskChange({
          ...data,
          time: {
            end: newEndInMillis,
            start: newStartInMillis,
          },
        });
    },
    [columnWidth, data, interval, unit, onTaskChange, sizeInUnits, taskDimensions]
  );

  return (
    <Group
      x={taskDimensions.x}
      y={taskDimensions.y}
      draggable={enableDrag}
      onClick={onClick}
      onDragEnd={onDragEnd}
      onDragMove={onDragMove}
      onDragStart={onDragStart}
    >
      <Rect
        id={taskId}
        cornerRadius={TASK_BORDER_RADIUS}
        fill={fill}
        height={taskHeight}
        opacity={opacity}
        onMouseLeave={onTaskLeave}
        onMouseMove={onTaskOver}
        onMouseOver={onTaskOver}
        stroke={TASK_DEFAULT_STROKE}
        strokeWidth={TASK_DEFAULT_STROKE_WIDTH}
        width={taskDimensions.width}
      />
      {enableResize && (
        <TaskResizeHandler
          height={taskHeight}
          onResizeStart={onResizeStart}
          onResizeMove={onResizeMove}
          onResizeEnd={onResizeEnd}
          opacity={opacity}
          position="lx"
          taskId={taskId}
          xCoordinate={-1}
        />
      )}
      {enableResize && (
        <TaskResizeHandler
          height={taskHeight}
          onResizeStart={onResizeStart}
          onResizeMove={onResizeMove}
          onResizeEnd={onResizeEnd}
          opacity={opacity}
          position="rx"
          taskId={taskId}
          xCoordinate={taskDimensions.width}
        />
      )}
      {displayTasksLabel && (
        <KonvaText
          fill={textStroke}
          ellipsis
          fontSize={textSize}
          text={data.label}
          width={textWidth}
          wrap="none"
          x={textOffsets}
          y={textOffsets}
        />
      )}
    </Group>
  );
};

export const TaskDocs = Task;

export default memo(Task);
