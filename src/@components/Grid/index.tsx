import React, { FC } from "react";
import { Group, Layer, Line, Text } from "react-konva";

import { useTimelineContext } from "../../@contexts/Timeline";
import { TimeRange } from "../../@utils/time-range";

interface GridProps {
  columnWidth: number;
  height: number;
  timeRange: TimeRange;
  width: number;
}

const Grid: FC<GridProps> = ({ columnWidth, height, width }) => {
  const { resources, timeBlocks } = useTimelineContext();

  return (
    <Layer>
      <Group>
        {resources.map(({ id }, index) => (
          <Group key={`heading-${id}`}>
            <Line x={0} y={50 * (index + 1)} points={[0, 0, width, 0]} stroke="black" />
          </Group>
        ))}
        <Line points={[0, 0, 0, height]} stroke="blue" />
        {timeBlocks.map((column, index) => (
          <Group key={`timeslot-${index}`}>
            <Line x={columnWidth * index} y={0} points={[0, 0, 0, height]} stroke="gray" />
            <Text x={10 + columnWidth * index} y={20} text={`${column.start?.hour}:00`} />
          </Group>
        ))}
        <Group key={`timeslot-last`}>
          <Line x={columnWidth * timeBlocks.length} y={0} points={[0, 0, 0, height]} stroke="gray" />
        </Group>
      </Group>
    </Layer>
  );
};

export default Grid;
