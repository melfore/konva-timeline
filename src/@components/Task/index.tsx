import React, { FC } from "react";
import { Rect } from "react-konva";

import { TaskLayoutData } from "../../@utils/tasks";

interface TaskProps extends TaskLayoutData {
  color: string;
  onMouseLeave?: (e: any) => void;
  onMouseMove?: (e: any) => void;
  onMouseOver?: (e: any) => void;
  width: number;
  x: number;
  y: number;
}

const Task: FC<TaskProps> = ({ color, id, onMouseLeave, onMouseMove, onMouseOver, x, y, width }) => {
  return (
    <Rect
      id={id}
      fill={color}
      height={40}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onMouseOver={onMouseOver}
      stroke="black"
      x={x}
      y={y}
      width={width}
    />
  );
};

export default Task;
