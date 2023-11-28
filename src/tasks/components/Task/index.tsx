import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Group, Rect, useStrictMode as enableStrictMode } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Duration } from "luxon";

import { TimeRange } from "../../..";
import { KonvaText } from "../../../@konva";
import { findResourceByCoordinate, findResourceIndexByCoordinate } from "../../../resources/utils/resources";
import { useTimelineContext } from "../../../timeline/TimelineContext";
import { KonvaDrawable, KonvaPoint } from "../../../utils/konva";
import { getContrastColor, getRGB, getRGBA } from "../../../utils/theme";
import { getTaskYCoordinate, TASK_BORDER_RADIUS, TASK_HEIGHT_OFFSET, TASK_OFFSET_Y, TaskData } from "../../utils/tasks";
import TaskResizeHandle from "../TaskResizeHandle";

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

const TASK_DEFAULT_FILL = "#000080";
const TASK_DEFAULT_STROKE_WIDTH = 2;

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
const Task = ({ data, fill = TASK_DEFAULT_FILL, onLeave, onOver, x, y, width, fillToComplete }: TaskProps) => {
  const {
    columnWidth,
    timeBlocks,
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
    drawRange,
  } = useTimelineContext();

  const { id: taskId, completedPercentage } = data;

  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);

  const mainColor = useMemo(() => {
    try {
      const rgb = getRGB(fill);
      return ` rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    } catch (error) {
      return "rgb(255,0,0)";
    }
  }, [fill]);

  const initialTaskDimensions = useMemo((): TaskDimensions => {
    const row = findResourceIndexByCoordinate(y, rowHeight, resources);
    return { row, width, x, y };
  }, [resources, rowHeight, width, x, y]);

  const taskHeight = useMemo(() => rowHeight * TASK_HEIGHT_OFFSET, [rowHeight]);

  const [taskDimensions, setTaskDimensions] = useState(initialTaskDimensions);

  const finalPoint = useMemo(
    () => timeBlocks.length * columnWidth - taskDimensions.width,
    [timeBlocks, columnWidth, taskDimensions]
  );

  useEffect(() => {
    const row = findResourceIndexByCoordinate(y, rowHeight, resources);
    setTaskDimensions({ row, width, x, y });
  }, [resources, rowHeight, width, x, y]);

  const fromPxToTime = useCallback(
    (sizePx: number): number => (sizePx * sizeInUnits) / columnWidth,
    [columnWidth, sizeInUnits]
  );

  const onEndTimeRange = useCallback((): TimeRange => {
    const { x, width } = taskDimensions;
    const timeOffset = fromPxToTime(x);
    const start = interval.start!.plus({ [unit]: timeOffset }).toMillis();
    const end = start + Duration.fromObject({ [unit]: fromPxToTime(width) }).toMillis();
    return { start, end };
  }, [fromPxToTime, interval.start, taskDimensions, unit]);

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

      callback(taskId, { ...point, x: point.x + drawRange.start });
    },
    [taskId, drawRange]
  );

  const onClick = useCallback(() => onTaskClick && onTaskClick(data), [data, onTaskClick]);

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

  const onDragStart = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      const { x, y } = getDragPoint(e);
      const dragFinalX = Math.ceil(x / dragSnapInPX) * dragSnapInPX;
      const xCoordinate = dragFinalX < 0 ? 0 : dragFinalX;
      const resourceIndex = findResourceIndexByCoordinate(y, rowHeight, resources);
      const yCoordinate = getTaskYCoordinate(resourceIndex, rowHeight);
      const point = { x: xCoordinate, y: yCoordinate };
      setDragging(true);
      onLeave(taskId, point);
    },
    [getDragPoint, onLeave, resources, rowHeight, taskId, dragSnapInPX]
  );

  const onDragMove = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      const { x, y } = getDragPoint(e);
      const dragFinalX = Math.ceil(x / dragSnapInPX) * dragSnapInPX;
      const xCoordinate = dragFinalX < 0 ? 0 : dragFinalX;
      const minY = rowHeight + rowHeight * TASK_OFFSET_Y;
      const maxY = rowHeight * (resources.length - 1) + rowHeight * TASK_OFFSET_Y;
      let controledY = y;
      let controledX = xCoordinate;
      if (controledY < minY) {
        controledY = minY;
      }
      if (controledY > maxY) {
        controledY = maxY;
      }

      if (dragFinalX >= finalPoint) {
        controledX = finalPoint;
      }

      const point = { x: controledX, y: controledY };

      setTaskDimensions((dimensions) => ({ ...dimensions, ...point }));
    },
    [dragSnapInPX, getDragPoint, resources, finalPoint, rowHeight]
  );

  const onDragEnd = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      setDragging(false);
      if (!onTaskChange) {
        return;
      }

      const { x, y } = getDragPoint(e);
      const dragFinalX = Math.ceil(x / dragSnapInPX) * dragSnapInPX;
      const xCoordinate = dragFinalX < 0 ? 0 : dragFinalX;
      const resourceIndex = findResourceIndexByCoordinate(y + taskHeight / 2, rowHeight, resources);
      const yCoordinate = getTaskYCoordinate(resourceIndex, rowHeight);
      const point = { x: xCoordinate, y: yCoordinate };
      setTaskDimensions((dimensions) => ({ ...dimensions, ...point }));

      const { id: resourceId } = findResourceByCoordinate(y, rowHeight, resources);
      const time = onEndTimeRange();
      onTaskChange({ ...data, resourceId, time });
    },
    [onEndTimeRange, rowHeight, resources, onTaskChange, data, dragSnapInPX, getDragPoint, taskHeight]
  );

  const opacity = useMemo(() => (dragging || resizing ? 0.5 : 1), [dragging, resizing]);

  const textOffsets = useMemo(() => taskHeight / 3, [taskHeight]);

  const textSize = useMemo(() => taskHeight / 2.5, [taskHeight]);

  const textStroke = useMemo(() => {
    try {
      return getContrastColor(fill);
    } catch (error) {
      return "rgb(0,0,0)";
    }
  }, [fill]);

  const textWidth = useMemo(() => taskDimensions.width - textOffsets * 2, [taskDimensions, textOffsets]);

  const onResizeStart = useCallback((e: KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;
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
              return { ...taskDimensions };
            }

            return { ...taskDimensions, width: handlerX - taskX };
          case "lx":
            if (handlerX >= taskEndX - TASK_BORDER_RADIUS) {
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
      setResizing(false);
      if (!onTaskChange) {
        return;
      }

      const time = onEndTimeRange();
      onTaskChange({ ...data, time });
    },
    [onTaskChange, data, onEndTimeRange]
  );
  const percentage = useMemo(() => {
    if (completedPercentage === 0) {
      return 0.1;
    }
    if (completedPercentage) {
      return (taskDimensions.width / 100) * completedPercentage;
    }
    return taskDimensions.width;
  }, [taskDimensions, completedPercentage]);

  const offsetPercentageX = useMemo(() => {
    if (percentage < 22) {
      return percentage;
    }
    if (completedPercentage! === 100) {
      return 30;
    }
    return 20;
  }, [completedPercentage, percentage]);

  const offsetPercentageY = useMemo(() => taskHeight / 4, [taskHeight]);

  const incompleteColor = useMemo(() => {
    try {
      if (fillToComplete) {
        const colorToComplete = getRGBA(fillToComplete);
        if (colorToComplete.a) {
          const rgba = ` rgba(${colorToComplete.r}, ${colorToComplete.g}, ${colorToComplete.b},${colorToComplete.a})`;
          return rgba;
        }
        const rgb = ` rgb(${colorToComplete.r}, ${colorToComplete.g}, ${colorToComplete.b})`;
        return rgb;
      }
      const opacity = "0.6";
      const rgb = getRGB(fill);
      const rgba = ` rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
      return rgba;
    } catch (error) {
      return "rgba(255, 0, 0, 0.6)";
    }
  }, [fill, fillToComplete]);

  const isPercentage = useMemo(() => {
    if (typeof completedPercentage !== "number") {
      return false;
    }
    if (completedPercentage >= 0 && completedPercentage <= 100) {
      return true;
    }
    return false;
  }, [completedPercentage]);

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
      <Group>
        <Rect
          id={taskId}
          cornerRadius={TASK_BORDER_RADIUS}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: percentage, y: 0 }}
          fillLinearGradientColorStops={[1, mainColor, 1, incompleteColor]}
          height={taskHeight}
          opacity={opacity}
          stroke={mainColor}
          strokeWidth={TASK_DEFAULT_STROKE_WIDTH}
          width={taskDimensions.width}
        />
        <Rect
          id={taskId}
          cornerRadius={TASK_BORDER_RADIUS}
          fill="transparent"
          height={taskHeight}
          onMouseLeave={onTaskLeave}
          onMouseMove={onTaskOver}
          onMouseOver={onTaskOver}
          opacity={1}
          stroke="rgb(0,0,0)"
          strokeWidth={1}
          width={taskDimensions.width}
        />
      </Group>
      {isPercentage && (
        <KonvaText
          fill={textStroke}
          ellipsis
          fontSize={10}
          text={completedPercentage + "%"}
          width={textWidth}
          wrap="none"
          x={1 + percentage - offsetPercentageX}
          y={taskHeight - offsetPercentageY}
        />
      )}
      {enableResize && (
        <TaskResizeHandle
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
        <TaskResizeHandle
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
          fill={completedPercentage === 0 ? "black" : textStroke}
          ellipsis
          fontSize={textSize}
          text={data.label}
          width={textWidth}
          wrap="none"
          x={textOffsets}
          y={textOffsets - offsetPercentageY}
        />
      )}
    </Group>
  );
};

export const TaskDocs = Task;

export default memo(Task);
