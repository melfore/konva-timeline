import React, { FC } from "react";
import { Rect } from "react-konva";

import { TaskLayoutData } from "../../@utils/tasks";

interface TaskProps extends TaskLayoutData {
  color: string;
  width: number;
  x: number;
  y: number;
}

const Task: FC<TaskProps> = ({ color, id, label, x, y, width }) => {
  return <Rect id={id} fill={color} height={40} stroke="black" x={x} y={y} width={width} />;
};

export default Task;
