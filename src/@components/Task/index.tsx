import React from "react";
import { Rect } from "react-konva";

import { KonvaDrawable, KonvaMouseEvents, KonvaPoint } from "../../@utils/konva";
import { TaskData } from "../../@utils/tasks";

type TaskProps = Pick<TaskData, "id" | "label"> &
  KonvaDrawable &
  KonvaMouseEvents &
  KonvaPoint & {
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
 * Each task is rendered by `TaskLayer` component, with a loop on each task provided to `KonvaTimeline`.
 * `TaskLayer` is also responsible of handling callback for task components.
 *
 * Supported events (click, leave, over) respond with callbacks of type:
 * <br />
 *  `(e: KonvaEventObject<MouseEvent>) => void`
 *
 * The playground has a simulated canvas with height: 200px and width: 100%
 */
const Task = ({
  fill = TASK_DEFAULT_FILL,
  id,
  onClick,
  onMouseLeave,
  onMouseOver,
  stroke = TASK_DEFAULT_STROKE,
  x,
  y,
  width,
}: TaskProps) => {
  return (
    <Rect
      id={id}
      cornerRadius={TASK_BORDER_RADIUS}
      fill={fill}
      height={TASK_HEIGHT}
      onClick={onClick}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseOver}
      onMouseOver={onMouseOver}
      stroke={stroke}
      x={x}
      y={y}
      width={width}
    />
  );
};

export default Task;
