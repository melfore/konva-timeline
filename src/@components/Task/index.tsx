import React from "react";
import { Rect } from "react-konva";

import { TaskLayoutData } from "../../@utils/tasks";

interface TaskProps extends TaskLayoutData {
  /**
   * The fill color of the task
   */
  fill?: string;
  /**
   * On mouse leave event handler
   */
  onMouseLeave?: (e: any) => void;
  /**
   * On mouse over event handler
   */
  onMouseOver?: (e: any) => void;
  /**
   * The stroke color of the task
   */
  stroke?: string;
  /**
   * The width of the task
   */
  width: number;
  /**
   * The x coordinate of the task
   */
  x: number;
  /**
   * The y coordinate of the task
   */
  y: number;
}

const TASK_BORDER_RADIUS = 4;
const TASK_HEIGHT = 40;

/**
 * This component renders a task as a rectangle.
 */
const Task = ({ fill = "white", id, onMouseLeave, onMouseOver, stroke = "black", x, y, width }: TaskProps) => {
  return (
    <Rect
      id={id}
      cornerRadius={TASK_BORDER_RADIUS}
      fill={fill}
      height={TASK_HEIGHT}
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
