import React, { FC } from "react";
import { Group, Line, Text } from "react-konva";

export interface User {
  id: number;
  label: string;
  color: string;
}

interface GridProps {
  height: number;
  width: number;
  resolutionFactor: number;
  users: User[];
}

const Grid: FC<GridProps> = ({ height, width, resolutionFactor, users }) => {
  console.log("=> width", { width });

  const headerRowWidth = 200;

  const timeslots = new Array(resolutionFactor).fill("");

  const slotSize = (width - headerRowWidth) / resolutionFactor;

  return (
    <Group>
      {[{ id: -1, label: "Header" }, ...users].map((heading, index) => (
        <Group key={`heading-${heading.id}`}>
          <Line x={0} y={50 * (index + 1)} points={[0, 0, width, 0]} stroke="black" />
          <Text y={50 * index} text={`Row: ${heading.label}`} />
        </Group>
      ))}
      <Line x={headerRowWidth} y={0} points={[0, 0, 0, height]} stroke="blue" />
      {timeslots.map((slot, index) => (
        <Group key={`timeslot-${index}`}>
          <Line x={headerRowWidth + slotSize * index} y={0} points={[0, 0, 0, height]} stroke="red" />
          <Text x={headerRowWidth + slotSize * index} text={`${index}:00`} />
        </Group>
      ))}
    </Group>
  );
};

export default Grid;
