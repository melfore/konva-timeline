import React, { FC } from "react";
import { Rect } from "react-konva";

interface TaskProps {
  color: string;
  label: string;
  x: number;
  y: number;
  width: number;
}

const Task: FC<TaskProps> = ({ color, label, x, y, width }) => {
  return <Rect id={label} cornerRadius={4} fill={color} height={40} stroke="black" x={x} y={y} width={width} />;
};

export default Task;