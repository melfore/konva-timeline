import React, { FC } from "react";
import { Group, Layer, Line, Text } from "react-konva";

import { Category } from "../../@utils/categories";
import { TimeRange } from "../../@utils/time-range";
import { ResolutionData } from "../../@utils/time-resolution";

interface GridProps {
  categories: Category[];
  columnsCount: number;
  columnWidth: number;
  height: number;
  resolution: ResolutionData;
  timeRange: TimeRange;
  width: number;
}

const Grid: FC<GridProps> = ({ categories, columnsCount, columnWidth, height, resolution, width }) => {
  const { size, scaleUnits } = resolution;

  const columns = new Array(columnsCount).fill("").map((v, index) => (index * size) % scaleUnits);

  return (
    <Layer>
      <Group>
        {[{ id: -1, label: "Header" }, ...categories].map((heading, index) => (
          <Group key={`heading-${heading.id}`}>
            <Line x={0} y={50 * (index + 1)} points={[0, 0, width, 0]} stroke="black" />
          </Group>
        ))}
        <Line points={[0, 0, 0, height]} stroke="blue" />
        {columns.map((column, index) => (
          <Group key={`timeslot-${index}`}>
            <Line x={columnWidth * index} y={0} points={[0, 0, 0, height]} stroke="gray" />
            <Text x={10 + columnWidth * index} y={20} text={`${column}:00`} />
          </Group>
        ))}
        <Group key={`timeslot-last`}>
          <Line x={columnWidth * columns.length} y={0} points={[0, 0, 0, height]} stroke="gray" />
        </Group>
      </Group>
    </Layer>
  );
};

export default Grid;
