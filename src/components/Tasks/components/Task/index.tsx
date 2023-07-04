import React, { FC } from "react";
import { Rect } from "react-konva";

import { TimeRange } from "../../../Timeline";

export interface TaskData {
  categoryId: string;
  label: string;
  time: TimeRange;
}

interface TaskProps {
  color: string;
  label: string;
  x: number;
  y: number;
  width: number;
}

const Task: FC<TaskProps> = ({ color, label, x, y, width }) => {
  return <Rect fill={color} height={40} x={x} y={y} width={width} />;
};

export default Task;
