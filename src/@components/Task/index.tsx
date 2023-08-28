import React, { memo, useCallback } from "react";
import { Rect } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

import { KonvaDrawable, KonvaPoint } from "../../@utils/konva";
import { TaskData } from "../../@utils/tasks";

type TaskMouseEventHandler = (taskId: string, point: KonvaPoint) => void;

type TaskProps = Pick<TaskData, "id" | "label"> &
  KonvaDrawable &
  KonvaPoint & {
    /**
     * On mouse click event handler
     */
    onClick: TaskMouseEventHandler;
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

const TASK_DEFAULT_FILL = "white";
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
  fill = TASK_DEFAULT_FILL,
  id,
  onClick,
  onLeave,
  onOver,
  stroke = TASK_DEFAULT_STROKE,
  x,
  y,
  width,
}: TaskProps) => {
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

      callback(id, point);
    },
    [id]
  );

  const onTaskClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => onTaskMouseEvent(e, onClick),
    [onClick, onTaskMouseEvent]
  );

  const onTaskLeave = useCallback(
    (e: KonvaEventObject<MouseEvent>) => onTaskMouseEvent(e, onLeave),
    [onLeave, onTaskMouseEvent]
  );

  const onTaskOver = useCallback(
    (e: KonvaEventObject<MouseEvent>) => onTaskMouseEvent(e, onOver),
    [onOver, onTaskMouseEvent]
  );

  return (
    <Rect
      id={id}
      cornerRadius={TASK_BORDER_RADIUS}
      fill={fill}
      height={TASK_HEIGHT}
      onClick={onTaskClick}
      onMouseLeave={onTaskLeave}
      onMouseMove={onTaskOver}
      onMouseOver={onTaskOver}
      stroke={stroke}
      x={x}
      y={y}
      width={width}
    />
  );
};

export const TaskDocs = Task;

export default memo(Task);
