import React, { FC } from "react";
import { Group, Line, Text } from "react-konva";

export interface Category {
  id: number;
  label: string;
  color: string;
}

interface GridProps {
  categories: Category[];
  columnsCount: number;
  columnWidth: number;
  height: number;
  hoursResolution: number;
  width: number;
}

const Grid: FC<GridProps> = ({ categories, columnsCount, columnWidth, height, hoursResolution, width }) => {
  const columns = new Array(columnsCount).fill("").map((v, index) => (index * hoursResolution) % 24);

  return (
    <Group>
      {[{ id: -1, label: "Header" }, ...categories].map((heading, index) => (
        <Group key={`heading-${heading.id}`}>
          <Line x={0} y={50 * (index + 1)} points={[0, 0, width, 0]} stroke="black" />
        </Group>
      ))}
      <Line points={[0, 0, 0, height]} stroke="blue" />
      {columns.map((column, index) => (
        <Group key={`timeslot-${index}`}>
          <Line x={columnWidth * index} y={0} points={[0, 0, 0, height]} stroke="red" />
          <Text x={10 + columnWidth * index} y={20} text={`${column}:00`} />
        </Group>
      ))}
    </Group>
  );
};

export default Grid;
