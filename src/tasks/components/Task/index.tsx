import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Group, Rect, useStrictMode as enableStrictMode } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { DateTime, Duration } from "luxon";

import { KonvaText } from "../../../@konva";
import { findResourceByCoordinate, findResourceIndexByCoordinate } from "../../../resources/utils/resources";
import { useTimelineContext } from "../../../timeline/TimelineContext";
import { KonvaDrawable, KonvaPoint } from "../../../utils/konva";
import { getContrastColor, getRGB, getRGBA, RGBFromRGBA } from "../../../utils/theme";
import {
  getTaskYCoordinate,
  onEndTimeRange,
  TASK_BORDER_RADIUS,
  TASK_HEIGHT_OFFSET,
  TASK_OFFSET_Y,
  TaskData,
  TaskDimensions,
} from "../../utils/tasks";
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
    /**
     * Prop that indicate disabled item
     */
    disabled?: boolean;
    /**
     * Prop that indicate an event is executing
     */
    onTaskEvent: (value: boolean) => void;
  };

const TASK_DEFAULT_FILL = "#000080";
const INVALIDFILL_TASK_DEFAULT_FILL = "rgb(255,0,0)";
const DISABLED_TASK_DEFAULT_FILL = "rgba(96,96,96, 0.8)";
const TASK_DEFAULT_STROKE_WIDTH = 2;
const TASK_DEFAULT_STROKE_FILL = "rgb(0,0,0)";

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
const Task = ({
  data,
  fill = TASK_DEFAULT_FILL,
  onLeave,
  onOver,
  x,
  y,
  width,
  fillToComplete,
  disabled,
  onTaskEvent,
}: TaskProps) => {
  const {
    columnWidth,
    externalRangeInMillis,
    displayTasksLabel,
    dragResolution: { sizeInUnits: dragSizeInUnits, unit: dragUnit },
    enableDrag,
    enableResize,
    interval,
    onTaskClick,
    onTaskChange,
    resolution,
    resources,
    rowHeight,
    drawRange,
    enableTaskPattern,
  } = useTimelineContext();

  const { id: taskId, completedPercentage } = data;
  const { sizeInUnits, unit } = resolution;

  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);

  const opacity = useMemo(() => (dragging || resizing ? 0.5 : 1), [dragging, resizing]);

  const mainColor = useMemo(() => {
    if (disabled) {
      return DISABLED_TASK_DEFAULT_FILL;
    }
    try {
      const rgb = getRGB(fill);
      return ` rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    } catch (error) {
      return INVALIDFILL_TASK_DEFAULT_FILL;
    }
  }, [fill, disabled]);

  const mainStroke = useMemo(() => {
    if (disabled) {
      return DISABLED_TASK_DEFAULT_FILL;
    }
    return TASK_DEFAULT_STROKE_FILL;
  }, [disabled]);

  const secondaryStroke = useMemo(() => {
    return opacity < 1 ? mainStroke : mainColor;
  }, [opacity, mainColor, mainStroke]);

  const initialTaskDimensions = useMemo((): TaskDimensions => {
    const row = findResourceIndexByCoordinate(y, rowHeight, resources);
    return { row, width, x, y };
  }, [resources, rowHeight, width, x, y]);

  const taskHeight = useMemo(() => rowHeight * TASK_HEIGHT_OFFSET, [rowHeight]);

  const [taskDimensions, setTaskDimensions] = useState(initialTaskDimensions);

  const finalPoint = useMemo(() => {
    const timeStart = DateTime.fromMillis(externalRangeInMillis.end);
    const startOffsetInUnit = timeStart.diff(interval.start!).as(resolution.unit);
    return (startOffsetInUnit * columnWidth) / resolution.sizeInUnits;
  }, [externalRangeInMillis, columnWidth, resolution, interval]);

  const startPoint = useMemo(() => {
    const timeStart = DateTime.fromMillis(externalRangeInMillis.start);
    const startOffsetInUnit = timeStart.diff(interval.start!).as(resolution.unit);
    return (startOffsetInUnit * columnWidth) / resolution.sizeInUnits;
  }, [externalRangeInMillis, columnWidth, resolution, interval]);

  useEffect(() => {
    const row = findResourceIndexByCoordinate(y, rowHeight, resources);
    setTaskDimensions({ row, width, x, y });
  }, [resources, rowHeight, width, x, y]);

  const dragSnapInPX = useMemo(() => {
    const resolutionInSnapUnit = Duration.fromObject({ [unit]: sizeInUnits }).as(dragUnit);
    const dragSnapInResUnit = dragSizeInUnits / resolutionInSnapUnit;
    const dragSnapInPx = dragSnapInResUnit * columnWidth;
    if (!dragSnapInPx || isNaN(dragSnapInPx)) {
      return 1;
    }

    return dragSnapInPx;
  }, [columnWidth, dragUnit, dragSizeInUnits, sizeInUnits, unit]);

  const taskHandlerBorder = useMemo(() => {
    if (taskDimensions.x + taskDimensions.width >= finalPoint) {
      return 2;
    }
    return 0;
  }, [taskDimensions, finalPoint]);

  const getDragPoint = useCallback((e: KonvaEventObject<DragEvent>): KonvaPoint => {
    const { target } = e;
    const dragX = target.x();
    const dragY = target.y();

    return { x: dragX, y: dragY };
  }, []);

  const onTaskMouseEvent = useCallback(
    (e: KonvaEventObject<MouseEvent>, callback: TaskMouseEventHandler) => {
      onTaskEvent(true);
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
    [taskId, drawRange, onTaskEvent]
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
      onTaskEvent(false);
    },
    [enableDrag, onLeave, onTaskMouseEvent, resizing, onTaskEvent]
  );

  const onTaskOver = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (disabled) {
        return;
      }
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
    [enableDrag, onOver, onTaskMouseEvent, resizing, disabled]
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
      ///ToolTip disappears
      onLeave(taskId, point);
    },
    [getDragPoint, onLeave, resources, rowHeight, taskId, dragSnapInPX]
  );

  const onDragMove = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      const { x, y } = getDragPoint(e);
      const dragFinalX = Math.ceil(x / dragSnapInPX) * dragSnapInPX;
      const xCoordinate = dragFinalX < startPoint ? startPoint : dragFinalX;
      const minY = rowHeight + rowHeight * TASK_OFFSET_Y;
      const maxY = rowHeight * (resources.length - 1) + rowHeight * TASK_OFFSET_Y;
      const taskFinalPoint = finalPoint - taskDimensions.width;
      let controlledY = y;
      let controlledX = xCoordinate;
      if (controlledY < minY) {
        controlledY = minY;
      }
      if (controlledY > maxY) {
        controlledY = maxY;
      }

      if (dragFinalX >= taskFinalPoint) {
        controlledX = taskFinalPoint;
      }

      const point = { x: controlledX, y: controlledY };

      setTaskDimensions((dimensions) => ({ ...dimensions, ...point }));
    },
    [dragSnapInPX, getDragPoint, resources, finalPoint, rowHeight, taskDimensions, startPoint]
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
      const time = onEndTimeRange(taskDimensions, resolution, columnWidth, interval);
      onTaskChange({ ...data, resourceId, time });
    },
    [
      rowHeight,
      resources,
      onTaskChange,
      data,
      dragSnapInPX,
      getDragPoint,
      taskHeight,
      taskDimensions,
      resolution,
      columnWidth,
      interval,
    ]
  );

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

  const onResizeStart = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      onTaskEvent(true);
      e.cancelBubble = true;
      const { x, y } = getDragPoint(e);
      const dragFinalX = Math.ceil(x / dragSnapInPX) * dragSnapInPX;
      const xCoordinate = dragFinalX < 0 ? 0 : dragFinalX;
      const resourceIndex = findResourceIndexByCoordinate(y, rowHeight, resources);
      const yCoordinate = getTaskYCoordinate(resourceIndex, rowHeight);
      const point = { x: xCoordinate, y: yCoordinate };
      onLeave(taskId, point);
      setResizing(true);
    },
    [dragSnapInPX, getDragPoint, onLeave, resources, rowHeight, taskId, onTaskEvent]
  );

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
            if (handlerX >= finalPoint) {
              return { ...taskDimensions, width: finalPoint - taskX };
            }

            return { ...taskDimensions, width: handlerX - taskX };
          case "lx":
            if (handlerX >= taskEndX - TASK_BORDER_RADIUS) {
              return { ...taskDimensions };
            }
            if (handlerX <= startPoint) {
              return { ...taskDimensions };
            }

            return { ...taskDimensions, x: handlerX, width: taskEndX - handlerX };
        }
      });
    },
    [getDragPoint, finalPoint, startPoint]
  );

  const onResizeEnd = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      onTaskEvent(false);
      e.cancelBubble = true;
      setResizing(false);
      if (!onTaskChange) {
        return;
      }

      const time = onEndTimeRange(taskDimensions, resolution, columnWidth, interval);
      onTaskChange({ ...data, time });
    },
    [onTaskChange, data, taskDimensions, resolution, columnWidth, interval, onTaskEvent]
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
      if (disabled) {
        return DISABLED_TASK_DEFAULT_FILL;
      }
      if (fillToComplete) {
        const colorToComplete = getRGBA(fillToComplete);
        if (colorToComplete.a) {
          const rgba = ` rgba(${colorToComplete.r}, ${colorToComplete.g}, ${colorToComplete.b},${colorToComplete.a})`;
          return rgba;
        }
        const rgb = ` rgb(${colorToComplete.r}, ${colorToComplete.g}, ${colorToComplete.b})`;
        return rgb;
      }
      const opacity = 0.6;
      const rgb = getRGB(fill);
      //const rgba = ` rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
      //return rgba;
      return RGBFromRGBA(opacity, rgb);
    } catch (error) {
      return "rgba(255, 0, 0, 0.6)";
    }
  }, [fill, fillToComplete, disabled]);

  const noPatternColor = useMemo(() => {
    if (disabled) {
      return DISABLED_TASK_DEFAULT_FILL;
    }
    if (dragging || resizing) {
      return incompleteColor;
    }
    return enableTaskPattern ? "transparent" : incompleteColor;
  }, [incompleteColor, enableTaskPattern, disabled, dragging, resizing]);

  const isPercentage = useMemo(() => {
    if (typeof completedPercentage !== "number") {
      return false;
    }
    if (completedPercentage >= 0 && completedPercentage <= 100) {
      return true;
    }
    return false;
  }, [completedPercentage]);

  const arrGradientColor: (number | string)[] = useMemo(() => {
    const colors: (number | string)[] = [];
    const length = 300;
    if (dragging || resizing || typeof completedPercentage !== "number" || disabled || !enableTaskPattern) {
      return [];
    }
    const mainColorLineNumber = Number((11 / (taskDimensions.width / 300)).toFixed(0));
    const incompleteColorLineNumber = Number((16 / (taskDimensions.width / 300)).toFixed(0));
    let mainLineColorCount = 0;
    let incompleteLineColorCount = 0;
    let newColor: number = 0;
    Array(length)
      .fill(0)
      .forEach((_, index) => {
        const gradientNumber = index * 0.0033;
        if (mainLineColorCount < mainColorLineNumber && incompleteLineColorCount === 0) {
          newColor = gradientNumber;
          mainLineColorCount++;
        }
        if (incompleteLineColorCount !== 0) {
          incompleteLineColorCount++;
        }
        if (mainLineColorCount === mainColorLineNumber) {
          incompleteLineColorCount++;
          mainLineColorCount = 0;
        }
        if (incompleteLineColorCount === incompleteColorLineNumber) {
          incompleteLineColorCount = 0;
          mainLineColorCount = 0;
        }
        colors.push(gradientNumber, newColor === gradientNumber ? mainColor : incompleteColor);
      });
    return colors;
  }, [
    mainColor,
    incompleteColor,
    dragging,
    resizing,
    taskDimensions,
    completedPercentage,
    disabled,
    enableTaskPattern,
  ]);

  const finalGradientX = useMemo(() => {
    return taskDimensions.width * Math.cos(45);
  }, [taskDimensions]);
  const finalGradientY = useMemo(() => {
    return taskDimensions.width * Math.sin(45);
  }, [taskDimensions]);

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
          fillLinearGradientEndPoint={{ x: finalGradientX, y: finalGradientY }}
          fillLinearGradientColorStops={arrGradientColor}
          height={taskHeight}
          opacity={opacity}
          stroke={secondaryStroke}
          strokeWidth={TASK_DEFAULT_STROKE_WIDTH}
          width={taskDimensions.width}
        />
        <Rect
          id={taskId}
          cornerRadius={TASK_BORDER_RADIUS}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: percentage, y: 0 }}
          fillLinearGradientColorStops={[1, mainColor, 1, noPatternColor]}
          height={taskHeight}
          onMouseLeave={onTaskLeave}
          onMouseMove={onTaskOver}
          onMouseOver={onTaskOver}
          opacity={opacity}
          stroke={mainStroke}
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
          xCoordinate={taskDimensions.width - taskHandlerBorder}
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
